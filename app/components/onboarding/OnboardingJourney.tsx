'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import type { Journey } from '@/app/types/quiz';

interface JourneyOption {
  id: Journey;
  label: string;
  hint: string;
}

const JOURNEY_OPTIONS: JourneyOption[] = [
  {
    id: 'Calm / Control',
    label: 'Find more calm, clarity, and control in daily life',
    hint: 'We’ll help you get things under control and feel more steady, step by step.',
  },
  {
    id: 'Growth / Goals',
    label: 'Push myself further and grow faster toward my goals',
    hint: 'We’ll help you aim higher and build momentum over time.',
  },
  {
    id: 'Explore',
    label: 'Explore what I need and find my rhythm',
    hint: 'We’ll figure it out together, at your pace.',
  },
];

export default function OnboardingJourney({
  initialJourney,
  onContinue,
}: {
  initialJourney: Journey | null;
  onContinue: (journey: Journey) => void;
}) {
  const [selected, setSelected] = useState<Journey | null>(initialJourney);

  // Auto-select from the persisted quiz result on first mount only — read
  // through getState() so the component never renders with payload-derived
  // markup before hydration (avoids SSR/CSR mismatch).
  useEffect(() => {
    if (selected !== null) return;
    const step1 = useQuizStore.getState().payload?.step1;
    if (step1) setSelected(step1);
  }, [selected]);

  const handleContinue = () => {
    if (!selected) return;
    onContinue(selected);
  };

  return (
    <div className="px-2">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-[1.08] tracking-tight mb-5">
          What brings you to{' '}
          <span
            className="italic font-normal text-[#C2624D]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Oriflow
          </span>{' '}
          today?
        </h1>
        <p
          className="text-base md:text-lg text-slate-600 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Start wherever feels right for you. You can always change this later.
        </p>
      </div>

      <div className="grid gap-4 mb-10">
        {JOURNEY_OPTIONS.map((option) => (
          <JourneyCard
            key={option.id}
            label={option.label}
            hint={option.hint}
            isSelected={selected === option.id}
            onClick={() => setSelected(option.id)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={handleContinue}
          disabled={!selected}
          whileHover={{ scale: selected ? 1.05 : 1 }}
          whileTap={{ scale: selected ? 0.95 : 1 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F08A5D] text-white font-semibold text-base tracking-wide px-12 py-4 rounded-full shadow-sm hover:bg-[#ec7e4d] transition-colors disabled:opacity-50 disabled:cursor-default"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function JourneyCard({
  label,
  hint,
  isSelected,
  onClick,
}: {
  label: string;
  hint: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.22 }}
      aria-pressed={isSelected}
      className={`relative w-full text-left rounded-3xl px-6 py-5 backdrop-blur-md border shadow-sm transition-colors ${
        isSelected
          ? 'bg-white/70 border-[#F08A5D]/45 ring-1 ring-[#F08A5D]/45'
          : 'bg-white/40 border-white/50 hover:bg-white/55'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 pr-2">
          <div className="text-lg md:text-xl font-semibold text-slate-800 leading-snug mb-1.5">
            {label}
          </div>
          <div
            className="text-sm md:text-base text-slate-600 italic leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {hint}
          </div>
        </div>
        <span
          aria-hidden
          className={`mt-1 shrink-0 w-5 h-5 rounded-full border transition-colors ${
            isSelected
              ? 'bg-[#F08A5D] border-[#F08A5D]'
              : 'bg-white/60 border-white/80'
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
