'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import type { Intent } from '@/app/types/quiz';

const ADVANCE_DELAY_MS = 420;

export default function QuizIntent({ onNext }: { onNext: () => void }) {
  const setIntent = useQuizStore((s) => s.setIntent);
  const [picked, setPicked] = useState<Intent>(null);

  const choose = (value: Exclude<Intent, null>) => {
    if (picked) return;
    setPicked(value);
    setIntent(value);
    window.setTimeout(onNext, ADVANCE_DELAY_MS);
  };

  return (
    <div className="max-w-2xl mx-auto px-2">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center leading-snug tracking-tight mb-12">
        Which feels closer{' '}
        <span
          className="italic font-normal text-[#C2624D]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          right now
        </span>
        ?
      </h2>

      <div className="grid gap-5">
        <ChoiceCard
          title="Feel more calm and in control"
          hint="Clear things up and feel more steady day to day"
          isSelected={picked === 'Calm'}
          isDimmed={picked !== null && picked !== 'Calm'}
          onClick={() => choose('Calm')}
        />
        <ChoiceCard
          title="Make progress on something that matters"
          hint="Move forward in a way that feels meaningful"
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
