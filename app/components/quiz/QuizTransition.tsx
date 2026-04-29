'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

const HOLD_MS = 1200;

export default function QuizTransition({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onNext, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [onNext]);

  return (
    <div className="text-center max-w-xl mx-auto px-2 py-10">
      <motion.p
        className="text-2xl md:text-3xl text-slate-800 italic leading-relaxed"
        style={{ fontFamily: 'var(--font-playfair)' }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
      >
        Got it. Let&apos;s fine-tune this so it fits you better.
      </motion.p>
    </div>
  );
}
