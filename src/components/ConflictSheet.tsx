import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, X, Check, GitMerge, ArrowLeftRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';

export const ConflictSheet: React.FC = () => {
  const { dict } = useT();
  const activeSheet = useAppStore((state) => state.activeSheet);
  const syncConflict = useAppStore((state) => state.syncConflict);
  const resolveConflict = useAppStore((state) => state.resolveConflict);
  const setActiveSheet = useAppStore((state) => state.setActiveSheet);

  if (activeSheet !== 'conflict' || !syncConflict) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-sm">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] flex flex-col pb-safe"
      >
        {/* Grabber */}
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {dict.sync.conflictTitle}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-[240px]">
                {syncConflict.entityTitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveSheet('none')}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 my-3 leading-relaxed">
          {dict.sync.conflictDesc}
        </p>

        {/* Side-by-Side Comparison */}
        <div className="space-y-3 flex-1 overflow-y-auto py-1">
          {/* Local Version Card */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {dict.sync.localVersion}
              </span>
              <span className="text-[10px] text-stone-400">Device</span>
            </div>
            <div className="text-xs text-stone-800 dark:text-stone-200 space-y-1">
              <p><strong className="text-stone-500 dark:text-stone-400">Priority:</strong> {syncConflict.localData.priority}</p>
              <p><strong className="text-stone-500 dark:text-stone-400">Notes:</strong> {syncConflict.localData.notes}</p>
            </div>
          </div>

          {/* Server Version Card */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                {dict.sync.serverVersion}
              </span>
              <span className="text-[10px] text-stone-400">Ingrid (Cloud)</span>
            </div>
            <div className="text-xs text-stone-800 dark:text-stone-200 space-y-1">
              <p><strong className="text-stone-500 dark:text-stone-400">Priority:</strong> {syncConflict.serverData.priority}</p>
              <p><strong className="text-stone-500 dark:text-stone-400">Notes:</strong> {syncConflict.serverData.notes}</p>
            </div>
          </div>
        </div>

        {/* Resolution Actions */}
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => resolveConflict('mine')}
              className="h-11 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-xs flex items-center justify-center gap-1.5 active:scale-97 transition-transform"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{dict.sync.keepMine}</span>
            </button>
            <button
              onClick={() => resolveConflict('server')}
              className="h-11 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-xs flex items-center justify-center gap-1.5 active:scale-97 transition-transform"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{dict.sync.keepServer}</span>
            </button>
          </div>

          <button
            onClick={() => resolveConflict('merge')}
            className="w-full h-12 rounded-xl bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
          >
            <GitMerge className="w-4 h-4" />
            <span>{dict.sync.mergeBoth}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
