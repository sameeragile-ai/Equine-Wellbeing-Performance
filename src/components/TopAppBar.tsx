import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronDown, Bell, Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface TopAppBarProps {
  scrollY: number;
  isScrollingDown: boolean;
  title?: string;
  hasHero?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  scrollY,
  isScrollingDown,
  title,
  hasHero = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStable = useAppStore((state) => state.currentStable);
  const isOffline = useAppStore((state) => state.isOffline);
  const isSyncing = useAppStore((state) => state.isSyncing);
  const syncQueue = useAppStore((state) => state.syncQueue);
  const activities = useAppStore((state) => state.activities);
  const setActiveSheet = useAppStore((state) => state.setActiveSheet);

  const unreadCount = activities.filter((a) => !a.read).length;
  const isDetailPage =
    location.pathname.startsWith('/horses/') ||
    location.pathname.startsWith('/passport/') ||
    location.pathname.startsWith('/tasks/');

  // Glass threshold
  const isScrolled = scrollY > (hasHero ? 45 : 15);
  // Auto-hide when scrolling down significantly on long lists, but stay visible near top or on detail
  const isHidden = !isDetailPage && isScrollingDown && scrollY > 120;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -70 : 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 pt-safe select-none ${
        isScrolled
          ? 'bg-stone-50/85 dark:bg-[#121614]/85 backdrop-blur-xl border-b border-stone-200/60 dark:border-stone-800/60 shadow-sm'
          : hasHero
          ? 'bg-transparent text-white'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 h-13">
        {/* Left Slot: Back Button OR Stable Switcher */}
        <div className="flex items-center min-w-[44px]">
          {isDetailPage ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 min-h-[44px] min-w-[44px] -ml-2 px-2 rounded-full text-stone-700 dark:text-stone-200 active:scale-95 transition-transform"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              <span className="text-sm font-medium">Back</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveSheet('stablePicker')}
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-full text-xs font-medium tracking-tight transition-all active:scale-97 ${
                isScrolled
                  ? 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200'
                  : hasHero
                  ? 'bg-black/35 text-white backdrop-blur-md border border-white/20'
                  : 'bg-stone-200/70 dark:bg-stone-800/70 text-stone-800 dark:text-stone-200'
              }`}
              aria-label="Switch stable location"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
              <span className="max-w-[130px] truncate">{currentStable.split('·')[0].trim()}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}
        </div>

        {/* Center Slot: Dynamic Title on Scroll */}
        <div className="flex-1 px-2 text-center overflow-hidden">
          <AnimatePresence>
            {isScrolled && title && (
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100 truncate"
              >
                {title}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Right Slot: Sync Status Indicator & Notification Bell */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Sync Status Button */}
          <button
            onClick={() => setActiveSheet('syncQueue')}
            className={`relative flex items-center justify-center min-w-[40px] min-h-[40px] rounded-full transition-transform active:scale-95 ${
              isScrolled
                ? 'text-stone-700 dark:text-stone-300'
                : hasHero
                ? 'text-white'
                : 'text-stone-700 dark:text-stone-300'
            }`}
            aria-label="Sync status and offline queue"
          >
            {isSyncing ? (
              <RefreshCw className="w-4.5 h-4.5 animate-spin text-amber-600 dark:text-amber-400" />
            ) : isOffline ? (
              <div className="relative">
                <CloudOff className="w-4.5 h-4.5 text-amber-600 dark:text-amber-500" />
                {syncQueue.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold text-white bg-amber-600 rounded-full tabular-nums">
                    {syncQueue.length}
                  </span>
                )}
              </div>
            ) : syncQueue.length > 0 ? (
              <div className="relative">
                <Cloud className="w-4.5 h-4.5 text-amber-600 dark:text-amber-500" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold text-white bg-amber-600 rounded-full tabular-nums">
                  {syncQueue.length}
                </span>
              </div>
            ) : (
              <div className="relative">
                <Cloud className="w-4.5 h-4.5 opacity-80" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
              </div>
            )}
          </button>

          {/* Activity Bell */}
          <button
            onClick={() => setActiveSheet('activity')}
            className={`relative flex items-center justify-center min-w-[40px] min-h-[40px] rounded-full transition-transform active:scale-95 ${
              isScrolled
                ? 'text-stone-700 dark:text-stone-300'
                : hasHero
                ? 'text-white'
                : 'text-stone-700 dark:text-stone-300'
            }`}
            aria-label="Activity notifications"
          >
            <Bell className="w-4.5 h-4.5 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B07A4A]" />
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
