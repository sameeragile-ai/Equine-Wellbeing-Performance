import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Bell, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EquoraMonogram } from './EquoraMonogram';

export const PushNotificationBanner: React.FC = () => {
  const navigate = useNavigate();
  const pushNotification = useAppStore((state) => state.pushNotification);
  const setPushNotification = useAppStore((state) => state.setPushNotification);

  useEffect(() => {
    if (!pushNotification) return;

    const timer = setTimeout(() => {
      setPushNotification(null);
    }, 6000);

    return () => clearTimeout(timer);
  }, [pushNotification, setPushNotification]);

  if (!pushNotification) return null;

  return (
    <aside aria-label="Notifications" className="absolute top-0 left-0 right-0 z-50 px-3 pt-safe pointer-events-none">
      <AnimatePresence>
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 8, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-stone-900/95 dark:bg-stone-900/95 text-white backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1A3326] flex items-center justify-center shrink-0 border border-white/10">
            <EquoraMonogram size={20} className="text-[#F5F1E8]" strokeWidth={2.4} />
          </div>

          <button
            onClick={() => {
              if (pushNotification.route) {
                navigate(pushNotification.route);
              }
              setPushNotification(null);
            }}
            className="flex-1 text-left min-w-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B07A4A]">
                Equora Intelligence
              </span>
              <span className="text-[10px] text-stone-400">
                {pushNotification.time || 'Now'}
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-100 truncate mt-0.5">
              {pushNotification.title}
            </p>
            <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-snug">
              {pushNotification.message}
            </p>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setPushNotification(null);
            }}
            className="text-stone-400 hover:text-white p-1 -mr-1 -mt-1 active:scale-90"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
};
