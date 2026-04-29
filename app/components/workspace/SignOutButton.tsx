'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/app/lib/supabase';
import { useQuizStore } from '@/app/store/useQuizStore';

export default function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    // Drop any leftover persisted quiz state so the demo loop starts clean.
    useQuizStore.persist.clearStorage();
    router.push('/');
    router.refresh();
  };

  return (
    <motion.button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      whileHover={{ scale: isSigningOut ? 1 : 1.04 }}
      whileTap={{ scale: isSigningOut ? 1 : 0.96 }}
      transition={{ duration: 0.2 }}
      className="text-sm text-slate-600/80 hover:text-slate-800 italic underline-offset-4 hover:underline transition-colors disabled:opacity-50"
      style={{ fontFamily: 'var(--font-playfair)' }}
    >
      {isSigningOut ? 'Signing out…' : 'Sign out'}
    </motion.button>
  );
}
