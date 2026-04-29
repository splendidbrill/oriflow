'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import { calculateOnboardingPayload } from '@/app/lib/quizEngine';
import { createClient } from '@/app/lib/supabase';
import type { SliderValue, StructureValue } from '@/app/types/quiz';

const TRI: SliderValue[] = ['Low', 'Mid', 'High'];
const DI: StructureValue[] = ['Low', 'High'];

export default function QuizSliders() {
  const router = useRouter();
  const intent = useQuizStore((s) => s.intent);
  const approach = useQuizStore((s) => s.approach);
  const direction = useQuizStore((s) => s.direction);
  const pace = useQuizStore((s) => s.pace);
  const structure = useQuizStore((s) => s.structure);
  const setDirection = useQuizStore((s) => s.setDirection);
  const setPace = useQuizStore((s) => s.setPace);
  const setStructure = useQuizStore((s) => s.setStructure);
  const getPayload = useQuizStore((s) => s.getPayload);
  const setPayload = useQuizStore((s) => s.setPayload);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Set true only when we open the auth modal because the user wasn't signed
  // in. We then watch for SIGNED_IN and complete the handoff to /onboarding.
  const awaitingAuthRef = useRef(false);

  useEffect(() => {
    if (direction === null) setDirection('Mid');
    if (pace === null) setPace('Mid');
    if (structure === null) setStructure('Low');
  }, [direction, pace, structure, setDirection, setPace, setStructure]);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session && awaitingAuthRef.current) {
        awaitingAuthRef.current = false;
        router.push('/onboarding');
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const payload = useMemo(
    () =>
      calculateOnboardingPayload({
        intent,
        approach,
        direction,
        pace,
        structure,
      }),
    [intent, approach, direction, pace, structure],
  );

  const handleStart = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const finalPayload = getPayload();
    setPayload(finalPayload);

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push('/onboarding');
      return;
    }

    awaitingAuthRef.current = true;
    setIsSubmitting(false);
    window.dispatchEvent(new Event('open-auth'));
  };

  return (
    <div className="max-w-xl mx-auto px-2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-snug tracking-tight mb-2">
        A little{' '}
        <span
          className="italic font-normal text-[#C2624D]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          fine-tuning
        </span>
        .
      </h2>
      <p
        className="text-center text-sm md:text-base text-slate-600 italic mb-10"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Slide each one to wherever feels closest.
      </p>

      <div className="rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm p-7 md:p-9 space-y-9">
        <TriSlider
          label="Direction"
          caption="How much change do you want?"
          value={direction}
          onChange={setDirection}
        />
        <TriSlider
          label="Pace"
          caption="How soon do you want to feel a shift?"
          value={pace}
          onChange={setPace}
        />
        <DiSlider
          label="Structure"
          caption="How much shape should this have?"
          value={structure}
          onChange={setStructure}
        />
      </div>

      <div className="mt-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2 text-center">
          What this looks like
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${payload.step1}|${payload.step2}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white/55 backdrop-blur-md border border-white/60 shadow-sm px-6 py-5 text-center"
          >
            <p
              className="text-lg md:text-xl text-slate-800 italic leading-snug"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {payload.step2}
            </p>
            <p className="mt-2 text-xs text-slate-500 tracking-wide">
              {payload.step1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          type="button"
          onClick={handleStart}
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F08A5D] text-white font-semibold text-base tracking-wide px-12 py-4 rounded-full shadow-sm hover:bg-[#ec7e4d] transition-colors disabled:opacity-70 disabled:cursor-default"
        >
          {isSubmitting ? 'Just a sec…' : 'Start with this'}
        </motion.button>
      </div>
    </div>
  );
}

function TriSlider({
  label,
  caption,
  value,
  onChange,
}: {
  label: string;
  caption: string;
  value: SliderValue;
  onChange: (v: SliderValue) => void;
}) {
  const idx = value ? TRI.indexOf(value) : 1;
  return (
    <div>
      <SliderHeader label={label} caption={caption} value={value ?? 'Mid'} />
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={idx}
        onChange={(e) => onChange(TRI[Number(e.target.value)])}
        aria-label={label}
        className="quiz-range"
      />
      <SliderTicks labels={['Low', 'Mid', 'High']} active={value ?? 'Mid'} />
    </div>
  );
}

function DiSlider({
  label,
  caption,
  value,
  onChange,
}: {
  label: string;
  caption: string;
  value: StructureValue;
  onChange: (v: StructureValue) => void;
}) {
  const idx = value ? DI.indexOf(value) : 0;
  return (
    <div>
      <SliderHeader label={label} caption={caption} value={value ?? 'Low'} />
      <input
        type="range"
        min={0}
        max={1}
        step={1}
        value={idx}
        onChange={(e) => onChange(DI[Number(e.target.value)])}
        aria-label={label}
        className="quiz-range"
      />
      <SliderTicks labels={['Low', 'High']} active={value ?? 'Low'} />
    </div>
  );
}

function SliderHeader({
  label,
  caption,
  value,
}: {
  label: string;
  caption: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">
          {label}
        </div>
        <div
          className="text-xs text-slate-500 italic mt-0.5"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {caption}
        </div>
      </div>
      <div
        className="text-sm italic text-[#C2624D]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {value}
      </div>
    </div>
  );
}

function SliderTicks({
  labels,
  active,
}: {
  labels: string[];
  active: string;
}) {
  return (
    <div className="flex justify-between mt-3 px-[2px] text-[11px] tracking-wide">
      {labels.map((l) => (
        <span
          key={l}
          className={
            l === active ? 'text-slate-700 font-medium' : 'text-slate-400'
          }
        >
          {l}
        </span>
      ))}
    </div>
  );
}
