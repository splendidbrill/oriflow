'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OnboardingJourney from './OnboardingJourney';
import OnboardingDirection from './OnboardingDirection';
import OnboardingFocus from './OnboardingFocus';
import type { Journey } from '@/app/types/quiz';

type Step = 0 | 1 | 2;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>(0);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [direction, setDirection] = useState<string | null>(null);

  const advance = () => setStep((s) => Math.min(2, s + 1) as Step);

  const handleJourneyContinue = (next: Journey) => {
    // If the user changed journey, the previously chosen direction belongs to
    // a different option set — drop it so Step 2 can re-suggest from payload.
    if (next !== journey) setDirection(null);
    setJourney(next);
    advance();
  };

  const handleDirectionContinue = (next: string) => {
    setDirection(next);
    advance();
  };

  const screen = (() => {
    if (step === 0) {
      return (
        <OnboardingJourney
          initialJourney={journey}
          onContinue={handleJourneyContinue}
        />
      );
    }
    if (step === 1 && journey) {
      return (
        <OnboardingDirection
          journey={journey}
          initialDirection={direction}
          onContinue={handleDirectionContinue}
        />
      );
    }
    if (step === 2 && journey && direction) {
      return <OnboardingFocus journey={journey} direction={direction} />;
    }
    return null;
  })();

  return (
    <div className="w-full max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {screen}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
