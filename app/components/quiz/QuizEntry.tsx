'use client';

import { motion } from 'framer-motion';

export default function QuizEntry({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center max-w-xl mx-auto px-2">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-[1.05] tracking-tight mb-7">
        Find a starting point that{' '}
        <span
          className="italic font-normal text-[#C2624D]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          fits you
        </span>
      </h1>
      <p
        className="text-lg md:text-xl text-slate-600 italic mb-12"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Just go with what feels closest. No overthinking.
      </p>
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#F08A5D] text-white font-semibold text-base tracking-wide px-12 py-4 rounded-full shadow-sm hover:bg-[#ec7e4d] transition-colors"
      >
        Start
      </motion.button>
    </div>
  );
}
