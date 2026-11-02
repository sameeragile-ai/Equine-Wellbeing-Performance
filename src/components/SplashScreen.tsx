import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EquoraMonogram } from './EquoraMonogram';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800; // ~1.8 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onFinish, 250);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-[#14261D] via-[#1A3326] to-[#0F1E16] text-[#F5F1E8] select-none"
    >
      <div className="w-full flex justify-end">
        <span className="text-[10px] tracking-widest uppercase text-[#B07A4A] font-semibold opacity-80">
          Equine Intelligence
        </span>
      </div>

      {/* Center Reveal: Monogram & Brand Typography */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
            <EquoraMonogram size={56} className="text-[#F5F1E8]" strokeWidth={2.4} />
          </div>
          {/* Subtle glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-[#B07A4A]/20 blur-xl -z-10" />
        </motion.div>

        {/* Brand Name Mask Reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl tracking-tight text-white font-normal"
          >
            Equora
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs sm:text-sm text-stone-300 mt-2 font-light tracking-wide max-w-[260px]"
        >
          Wellbeing, Climate &amp; Performance
        </motion.p>
      </div>

      {/* Progress Bar & Copyright */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-[#B07A4A] to-[#E8E2D5] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-stone-400 font-mono tracking-wider">
          v2.4.0 · Nordic Edition
        </p>
      </div>
    </motion.div>
  );
};
