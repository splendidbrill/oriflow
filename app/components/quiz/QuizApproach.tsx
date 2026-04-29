'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import type { Approach } from '@/app/types/quiz';

const ADVANCE_DELAY_MS = 420;

export default function QuizApproach({ onNext }: { onNext: () => void }) {
  const setApproach = useQuizStore((s) => s.setApproach);
  const [picked, setPicked] = useState<Approach>(null);

  const choose = (value: Exclude<Approach, null>) => {
    if (picked) return;
    setPicked(value);
    setApproach(value);
    window.setTimeout(onNext, ADVANCE_DELAY_MS);
  };

  return (
    <div className="max-w-2xl mx-auto px-2">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center leading-snug tracking-tight mb-12">
        How do you want to{' '}
        <span
          className="italic font-normal text-[#C2624D]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          approach this
        </span>
        ?
      </h2>

      <div className="grid gap-5">
        <ChoiceCard
          title="Get things in order and feel more steady"
          hint="Clear some space and bring structure to things"
          isSelected={picked === 'Steady'}
          isDimmed={picked !== null && picked !== 'Steady'}
          onClick={() => choose('Steady')}
        />
        <ChoiceCard
          title="Start making progress"
          hint="Take a step forward, even if it’s small"
          isSelected={picked === 'Progress'}
          isDimmed={picked !== null && picked !== 'Progress'}
          onClick={() => choose('Progress')}
        />
      </div>
    </div>
  );
}

function ChoiceCard({
  title,
  hint,
  isSelected,
  isDimmed,
  onClick,
}: {
  title: string;
  hint: string;
  isSelected: boolean;
  isDimmed: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      animate={{ opacity: isDimmed ? 0.45 : 1 }}
      className={`w-full text-left rounded-3xl p-6 md:p-7 backdrop-blur-md border shadow-sm transition-colors ${
        isSelected
          ? 'bg-white/65 border-[#F08A5D]/40 ring-1 ring-[#F08A5D]/40'
          : 'bg-white/40 border-white/50 hover:bg-white/55'
      }`}
    >
      <div className="text-lg md:text-xl font-semibold text-slate-800 mb-1.5">
        {title}
      </div>
      <div
        className="text-sm md:text-base text-slate-600 italic"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {hint}
      </div>
    </motion.button>
  );
}
