import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Bell, Thermometer, CheckSquare, Cloud, Users, ShieldCheck, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';

export const ActivityCenterSheet: React.FC = () => {
  const { dict } = useT();
  const navigate = useNavigate();
  const activeSheet = useAppStore((state) => state.activeSheet);
  const setActiveSheet = useAppStore((state) => state.setActiveSheet);
  const activities = useAppStore((state) => state.activities);
  const markActivityRead = useAppStore((state) => state.markActivityRead);
  const markAllActivitiesRead = useAppStore((state) => state.markAllActivitiesRead);

  if (activeSheet !== 'activity') return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'climate':
        return <Thermometer className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'task':
        return <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'sync':
        return <Cloud className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'team':
        return <Users className="w-4 h-4 text-[#B07A4A]" />;
      case 'product':
        return <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      default:
        return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[85vh] flex flex-col pb-safe"
      >
        {/* Grabber */}
        <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {dict.activity.title}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Stable updates &amp; climate alarms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => markAllActivitiesRead()}
              className="text-xs font-medium text-[#B07A4A] hover:underline px-2 py-1"
            >
              {dict.activity.markAllRead}
            </button>
            <button
              onClick={() => setActiveSheet('none')}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2">
          {activities.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              {dict.activity.empty}
            </div>
          ) : (
            activities.map((act) => (
              <button
                key={act.id}
                onClick={() => {
                  markActivityRead(act.id);
                  if (act.targetRoute) {
                    setActiveSheet('none');
                    navigate(act.targetRoute);
                  }
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all active:scale-98 flex items-start gap-3 ${
                  act.read
                    ? 'bg-white/60 dark:bg-stone-800/40 border-stone-200/50 dark:border-stone-800/60'
                    : 'bg-white dark:bg-stone-800 border-[#B07A4A]/30 dark:border-[#B07A4A]/40 shadow-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(act.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs ${act.read ? 'font-medium text-stone-800 dark:text-stone-300' : 'font-semibold text-stone-900 dark:text-stone-100'}`}>
                      {act.title}
                    </p>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {act.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                    {act.description}
                  </p>
                </div>
                {!act.read && (
                  <span className="w-2 h-2 rounded-full bg-[#B07A4A] shrink-0 mt-1.5" />
                )}
              </button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
