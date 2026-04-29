'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import { createClient } from '@/app/lib/supabase';
import type { FocusArea, Journey } from '@/app/types/quiz';

const MAX_SELECTIONS = 3;

type OptionId =
  | 'mental'
  | 'physical'
  | 'emotional'
  | 'career'
  | 'money'
  | 'relationships'
  | 'hobbies-routines'
  | 'learning'
  | 'not-sure';

interface FocusOption {
  id: OptionId;
  label: string;
  matches: FocusArea[];
}

const OPTIONS: FocusOption[] = [
  { id: 'mental', label: 'Mental clarity & focus', matches: ['Mental clarity'] },
  { id: 'physical', label: 'Physical health & energy', matches: ['Physical health'] },
  { id: 'emotional', label: 'Emotional balance & wellbeing', matches: ['Emotional wellbeing'] },
  { id: 'career', label: 'Career & work', matches: ['Career'] },
  { id: 'money', label: 'Money & financial life', matches: ['Money'] },
  { id: 'relationships', label: 'Relationships & social life', matches: ['Relationships'] },
  { id: 'hobbies-routines', label: 'Hobbies / routines', matches: ['Hobbies', 'Routines'] },
  { id: 'learning', label: 'Learning & skill growth', matches: ['Learning'] },
  { id: 'not-sure', label: 'Not sure yet', matches: ['Not sure yet'] },
];

export default function OnboardingFocus({
  journey,
  direction,
}: {
  journey: Journey;
  direction: string;
}) {
  const router = useRouter();
  const payload = useQuizStore((s) => s.payload);

  // Avoid SSR/CSR mismatch on the Suggested badges — they should only render
  // once the persisted payload has been read from sessionStorage on the client.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const [selected, setSelected] = useState<Set<OptionId>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestedSet = useMemo<Set<FocusArea>>(() => {
    if (!hydrated || !payload?.step3) return new Set();
    return new Set(payload.step3);
  }, [hydrated, payload]);

  const isSuggested = (option: FocusOption) =>
    option.matches.some((m) => suggestedSet.has(m));

  const toggle = (id: OptionId) => {
    setSelected((prev) => {
      const isOn = prev.has(id);
      if (!isOn && prev.size >= MAX_SELECTIONS) return prev;
      const next = new Set(prev);
      if (isOn) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const count = selected.size;
  const atLimit = count >= MAX_SELECTIONS;
  const canContinue = count > 0;

  const handleContinue = async () => {
    if (!canContinue || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const focusAreas = OPTIONS.filter((o) => selected.has(o.id)).map(
      (o) => o.label,
    );

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError('Your session has expired. Please sign in again.');
        setIsSubmitting(false);
        return;
      }

      const res = await fetch('/api/users/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ journey, direction, focusAreas }),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        setError(
          `We couldn’t save that just now (${res.status}). ${detail}`.trim(),
        );
        setIsSubmitting(false);
        return;
      }

      useQuizStore.persist.clearStorage();
      router.push('/workspace');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'A network hiccup got in the way. Please try again.',
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-[1.08] tracking-tight mb-5">
          What feels{' '}
          <span
            className="italic font-normal text-[#C2624D]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            most important
          </span>{' '}
          to you right now?
        </h1>
        <p
          className="text-base md:text-lg text-slate-600 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Choose up to 3 to begin. You can always change this later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OPTIONS.map((option) => {
          const isSelected = selected.has(option.id);
          const suggested = isSuggested(option);
          const isDisabled = !isSelected && atLimit;
          return (
            <FocusCard
              key={option.id}
              label={option.label}
              isSelected={isSelected}
              isSuggested={suggested}
              isDisabled={isDisabled}
              onClick={() => toggle(option.id)}
            />
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <motion.button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue || isSubmitting}
          whileHover={{ scale: canContinue && !isSubmitting ? 1.05 : 1 }}
          whileTap={{ scale: canContinue && !isSubmitting ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F08A5D] text-white font-semibold text-base tracking-wide px-12 py-4 rounded-full shadow-sm hover:bg-[#ec7e4d] transition-colors disabled:opacity-50 disabled:cursor-default"
        >
          {isSubmitting ? 'Preparing your space…' : 'Enter Oriflow'}
        </motion.button>
        <p
          className="text-xs text-slate-500 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {count === 0
            ? 'Pick at least one to continue.'
            : atLimit
              ? 'That feels like enough to start with.'
              : `You can pick ${MAX_SELECTIONS - count} more, if you’d like.`}
        </p>
        {error && (
          <p
            role="alert"
            className="text-sm text-[#C2624D] italic mt-1 text-center max-w-md"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function FocusCard({
  label,
  isSelected,
  isSuggested,
  isDisabled,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  isSuggested: boolean;
  isDisabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.99 }}
      transition={{ duration: 0.22 }}
      animate={{ opacity: isDisabled ? 0.45 : 1 }}
      aria-pressed={isSelected}
      className={`group relative w-full text-left rounded-3xl px-5 py-5 backdrop-blur-md border shadow-sm transition-colors min-h-[112px] ${
        isSelected
          ? 'bg-white/70 border-[#F08A5D]/45 ring-1 ring-[#F08A5D]/45'
          : isSuggested
            ? 'bg-white/45 border-[#F08A5D]/20 shadow-[0_0_0_1px_rgba(240,138,93,0.18),0_6px_28px_-12px_rgba(240,138,93,0.45)]'
            : 'bg-white/40 border-white/50 hover:bg-white/55'
      } ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {isSuggested && !isSelected && (
        <span
          className="absolute top-3 right-4 text-[11px] italic text-[#C2624D]/85 tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          ✨ Suggested
        </span>
      )}
      <div className="flex items-start justify-between gap-3 h-full">
        <span className="text-base md:text-lg font-semibold text-slate-800 leading-snug pr-4">
          {label}
        </span>
        <span
          aria-hidden
          className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border transition-colors ${
            isSelected
              ? 'bg-[#F08A5D] border-[#F08A5D]'
              : 'bg-white/60 border-white/80 group-hover:border-white'
          }`}
        >
          {isSelected && (
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full p-1 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5L6.5 12L13 5" />
            </svg>
          )}
        </span>
      </div>
    </motion.button>
  );
}
