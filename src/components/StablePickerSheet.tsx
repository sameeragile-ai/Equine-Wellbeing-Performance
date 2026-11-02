import React from 'react';
import { motion } from 'motion/react';
import { Check, MapPin, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const stables = [
  {
    name: 'Nordlys Stables · Main Barn',
    description: 'Barn A (12 boxes), Indoor Riding Hall, Veterinary Bay',
    boxes: 12
  },
  {
    name: 'Nordlys Stables · Paddock Wing',
    description: 'Barn B (8 boxes), Outdoor Dressage Arena, Paddock 1-4',
    boxes: 8
  },
  {
    name: 'Nordlys Highland Pastures',
    description: 'Barn C (Senior & Resting Herd), Mountain Trailhead',
    boxes: 6
  }
];

export const StablePickerSheet: React.FC = () => {
  const activeSheet = useAppStore((state) => state.activeSheet);
  const setActiveSheet = useAppStore((state) => state.setActiveSheet);
  const currentStable = useAppStore((state) => state.currentStable);
  const setStable = useAppStore((state) => state.setStable);

  if (activeSheet !== 'stablePicker') return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[80vh] flex flex-col pb-safe"
      >
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Select Stable Facility
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Switch location view for climate and tasks
            </p>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 space-y-2.5">
          {stables.map((s) => {
            const isSelected = currentStable === s.name;
            return (
              <button
                key={s.name}
                onClick={() => setStable(s.name)}
                className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-98 flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1A3326]/5 dark:bg-[#B07A4A]/10 border-[#1A3326] dark:border-[#B07A4A]'
                    : 'bg-white dark:bg-stone-800/80 border-stone-200/80 dark:border-stone-700/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950' : 'bg-stone-100 dark:bg-stone-700 text-stone-500'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {s.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                      {s.description}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5 text-[#1A3326] dark:text-[#B07A4A] shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
