'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuizEntry from './QuizEntry';
import QuizIntent from './QuizIntent';
import QuizApproach from './QuizApproach';
import QuizTransition from './QuizTransition';
import QuizSliders from './QuizSliders';

type Step = 0 | 1 | 2 | 3 | 4;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuizFlow() {
  const [step, setStep] = useState<Step>(0);
  const next = () => setStep((s) => Math.min(4, s + 1) as Step);

  const screen = (() => {
    switch (step) {
      case 0:
        return <QuizEntry onNext={next} />;
      case 1:
        return <QuizIntent onNext={next} />;
      case 2:
        return <QuizApproach onNext={next} />;
      case 3:
        return <QuizTransition onNext={next} />;
      case 4:
      default:
        return <QuizSliders />;
    }
  })();

  return (
    <div className="w-full max-w-2xl">
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
