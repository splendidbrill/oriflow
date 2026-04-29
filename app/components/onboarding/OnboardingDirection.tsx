'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '@/app/store/useQuizStore';
import type { Journey } from '@/app/types/quiz';

interface DirectionOption {
  // The phrase the engine produces in payload.step2 — used for auto-select.
  canonicalStep2: string;
  // What the user actually sees on the card.
  label: string;
}

interface DirectionConfig {
  headline: { lead: string; accent: string; tail: string };
  options: DirectionOption[];
}

const CONFIG: Record<Journey, DirectionConfig> = {
  'Calm / Control': {
    headline: {
      lead: 'What would feel ',
      accent: 'most helpful',
      tail: ' right now?',
    },
    options: [
      {
        canonicalStep2: 'Something I can improve soon',
        label: 'Something I can improve soon',
      },
      {
        canonicalStep2: 'Something I can build steadily over time',
        label: 'Something I can build steadily over time',
      },
    ],
  },
  'Growth / Goals': {
    headline: {
      lead: 'How are you thinking about ',
      accent: 'your goals',
      tail: '?',
    },
    options: [
      {
        canonicalStep2: 'I have something specific I want to achieve soon',
        label: 'I have something specific I want to achieve soon',
      },
      {
        canonicalStep2: 'Building toward something bigger over time',
        label: 'I’m building toward something bigger over time',
      },
    ],
  },
  Explore: {
    headline: {
      lead: 'What feels closest to ',
      accent: 'what you need',
      tail: ' right now?',
    },
    options: [
      {
        canonicalStep2: 'Try a few things and see what helps',
        label: 'Try a few things and see what helps',
      },
      {
        canonicalStep2: 'Gently get more structure over time',
        label: 'Gently get more structure over time',
      },
    ],
  },
};

export default function OnboardingDirection({
  journey,
  initialDirection,
  onContinue,
}: {
  journey: Journey;
  initialDirection: string | null;
  onContinue: (direction: string) => void;
}) {
  const config = CONFIG[journey];
  const [selected, setSelected] = useState<string | null>(initialDirection);

  // Auto-select on first mount: find the option whose canonical phrase matches
  // payload.step2 — but only if it belongs to the currently selected journey's
  // option set, since the user may have changed journey since the quiz.
  useEffect(() => {
    if (selected !== null) return;
    const step2 = useQuizStore.getState().payload?.step2;
    if (!step2) return;
    const match = config.options.find((o) => o.canonicalStep2 === step2);
    if (match) setSelected(match.label);
  }, [selected, config.options]);

  const handleContinue = () => {
    if (!selected) return;
    onContinue(selected);
  };

  return (
    <div className="px-2">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-[1.08] tracking-tight mb-5">
          {config.headline.lead}
          <span
            className="italic font-normal text-[#C2624D]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {config.headline.accent}
          </span>
          {config.headline.tail}
        </h1>
        <p
          className="text-base md:text-lg text-slate-600 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Choose the one that feels closest. You can always shift later.
        </p>
      </div>

      <div className="grid gap-4 mb-10">
        {config.options.map((option) => (
          <DirectionCard
            key={option.label}
            label={option.label}
            isSelected={selected === option.label}
            onClick={() => setSelected(option.label)}
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

function DirectionCard({
  label,
  isSelected,
  onClick,
}: {
  label: string;
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
      className={`relative w-full text-left rounded-3xl px-6 py-6 backdrop-blur-md border shadow-sm transition-colors ${
        isSelected
          ? 'bg-white/70 border-[#F08A5D]/45 ring-1 ring-[#F08A5D]/45'
          : 'bg-white/40 border-white/50 hover:bg-white/55'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-lg md:text-xl font-semibold text-slate-800 leading-snug pr-2">
          {label}
        </span>
        <span
          aria-hidden
          className={`shrink-0 w-5 h-5 rounded-full border transition-colors ${
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
