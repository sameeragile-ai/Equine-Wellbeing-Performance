import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, CloudOff, RefreshCw, X, CheckCircle2, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';

export const SyncQueueSheet: React.FC = () => {
  const { dict, t } = useT();
  const activeSheet = useAppStore((state) => state.activeSheet);
  const setActiveSheet = useAppStore((state) => state.setActiveSheet);
  const syncQueue = useAppStore((state) => state.syncQueue);
  const isOffline = useAppStore((state) => state.isOffline);
  const isSyncing = useAppStore((state) => state.isSyncing);
  const setOffline = useAppStore((state) => state.setOffline);
  const performSync = useAppStore((state) => state.performSync);

  if (activeSheet !== 'syncQueue') return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[85vh] flex flex-col pb-safe"
      >
        {/* Grabber Handle */}
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200">
              {isOffline ? <CloudOff className="w-5 h-5 text-amber-600" /> : <Cloud className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {dict.sync.queueTitle}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isOffline ? 'Offline Mode Active' : 'Connected to Stable Cloud'}
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

        {/* Offline Mode Quick Toggle in Sheet */}
        <div className="my-3 p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
              Simulate Network Offline
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Test queue accumulation and automatic recovery
            </p>
          </div>
          <button
            onClick={() => setOffline(!isOffline)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              isOffline
                ? 'bg-amber-600 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
            }`}
          >
            {isOffline ? 'Offline (On)' : 'Online'}
          </button>
        </div>

        {/* Sync Queue Content */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2.5">
          {syncQueue.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                {dict.sync.allSynced}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-[260px] mx-auto mt-1">
                Any changes made without internet connectivity will appear here.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
                {t(dict.sync.pendingChanges, { count: syncQueue.length })}
              </p>
              <div className="space-y-2">
                {syncQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white dark:bg-stone-800/80 rounded-2xl border border-stone-200/70 dark:border-stone-700/60 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {item.entityName}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 capitalize">
                        {item.type.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {syncQueue.length > 0 && (
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => performSync()}
              disabled={isSyncing}
              className="w-full h-12 rounded-2xl bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-transform disabled:opacity-60 shadow-md"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{dict.common.syncingBanner}</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>{dict.sync.syncNow}</span>
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
