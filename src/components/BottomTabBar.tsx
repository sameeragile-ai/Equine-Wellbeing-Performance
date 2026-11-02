import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CalendarCheck, QrCode, User, Heart, Sparkles, Layers } from 'lucide-react';
import { useT } from '../i18n/useT';

export const BottomTabBar: React.FC = () => {
  const { dict } = useT();
  const location = useLocation();

  // Hide tab bar on specific immersive sub-routes if needed, or keep persistent
  const isImmersiveModal = false;
  if (isImmersiveModal) return null;

  const tabs = [
    {
      id: 'home',
      label: dict.nav.home,
      path: '/',
      icon: Sparkles,
      exact: true
    },
    {
      id: 'horses',
      label: dict.nav.horses,
      path: '/horses',
      icon: Layers,
      exact: false
    },
    {
      id: 'scan',
      label: dict.nav.scan,
      path: '/scan',
      icon: QrCode,
      isRaised: true,
      exact: false
    },
    {
      id: 'tasks',
      label: dict.nav.tasks,
      path: '/tasks',
      icon: CalendarCheck,
      exact: false
    },
    {
      id: 'profile',
      label: dict.nav.profile,
      path: '/profile',
      icon: User,
      exact: false
    }
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 z-40 px-3 pb-safe pointer-events-none"
      aria-label="Bottom Navigation"
    >
      <div className="pointer-events-auto relative mb-2 flex items-center justify-around h-16 bg-white/92 dark:bg-[#151c17]/92 backdrop-blur-2xl rounded-3xl border border-stone-200/80 dark:border-stone-800/80 shadow-lg shadow-black/5 px-1.5">
        {tabs.map((tab) => {
          const active = isActive(tab.path, tab.exact);
          const Icon = tab.icon;

          if (tab.isRaised) {
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className="relative -top-4 flex flex-col items-center justify-center min-w-[56px] min-h-[56px] group active:scale-92 transition-transform"
                aria-label={tab.label}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                    active
                      ? 'bg-[#1A3326] text-white shadow-[#1A3326]/30 dark:bg-[#B07A4A] dark:text-stone-950'
                      : 'bg-[#1A3326] text-[#F5F1E8] shadow-stone-900/20 hover:brightness-110'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.3]" />
                </div>
                <span className="text-[10px] font-medium tracking-tight text-stone-600 dark:text-stone-400 mt-1 whitespace-nowrap">
                  {tab.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full min-w-[44px] min-h-[44px] py-1 select-none active:scale-95 transition-transform"
              aria-label={tab.label}
            >
              {active && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-x-2 inset-y-1.5 bg-stone-100 dark:bg-stone-800/70 rounded-2xl -z-10"
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  active
                    ? 'text-[#1A3326] dark:text-[#E8E2D5] stroke-[2.4]'
                    : 'text-stone-400 dark:text-stone-500 stroke-[1.8]'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors whitespace-nowrap ${
                  active
                    ? 'text-[#1A3326] dark:text-stone-100 font-semibold'
                    : 'text-stone-400 dark:text-stone-500'
                }`}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
