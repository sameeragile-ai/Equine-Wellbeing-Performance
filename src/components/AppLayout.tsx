import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopAppBar } from './TopAppBar';
import { BottomTabBar } from './BottomTabBar';
import { PushNotificationBanner } from './PushNotificationBanner';
import { SyncQueueSheet } from './SyncQueueSheet';
import { ConflictSheet } from './ConflictSheet';
import { ActivityCenterSheet } from './ActivityCenterSheet';
import { StablePickerSheet } from './StablePickerSheet';
import { OnboardingModal } from './OnboardingModal';
import { EquoraMonogram } from './EquoraMonogram';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { Smartphone, Shield, Cloud, Wifi, WifiOff } from 'lucide-react';

interface AppLayoutProps {
  currentTitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = () => {
  const { dict } = useT();
  const location = useLocation();

  const isOffline = useAppStore((state) => state.isOffline);
  const settings = useAppStore((state) => state.settings);
  const userRole = useAppStore((state) => state.userRole);
  const currentStable = useAppStore((state) => state.currentStable);
  const setPushNotification = useAppStore((state) => state.setPushNotification);

  // Inner scroll tracking for TopAppBar
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  // Handle title dynamically based on route
  const getRouteTitle = () => {
    const p = location.pathname;
    if (p === '/') return dict.nav.home;
    if (p === '/horses') return dict.nav.horses;
    if (p.startsWith('/horses/')) return 'Horse Profile';
    if (p === '/tasks') return dict.nav.tasks;
    if (p === '/training') return dict.training.title;
    if (p === '/sensor') return dict.sensor.title;
    if (p === '/scan') return dict.passport.scanTitle;
    if (p.startsWith('/passport/')) return dict.passport.title;
    if (p === '/profile') return dict.nav.profile;
    return dict.common.appName;
  };

  const hasHero =
    location.pathname.startsWith('/horses/') ||
    location.pathname.startsWith('/passport/') ||
    location.pathname === '/scan';

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const current = scrollContainerRef.current.scrollTop;
    setIsScrollingDown(current > lastScrollY.current && current > 20);
    setScrollY(current);
    lastScrollY.current = current;
  };

  // Scroll to top on route change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
      setScrollY(0);
    }
  }, [location.pathname]);

  // Periodic sensor micro-drift
  useEffect(() => {
    const interval = setInterval(() => {
      useAppStore.getState().setSensorDrift();
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Demo: trigger climate alert push 3.5 seconds after mounting once
  useEffect(() => {
    const timer = setTimeout(() => {
      if (settings.notifications.climate) {
        setPushNotification({
          id: 'climate-alert-init',
          title: 'Barn A Humidity Alert (84% RH)',
          message: 'Upper louvers recommended open. Tap to view live sensor telemetry.',
          route: '/sensor',
          time: 'Just now'
        });
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark class on document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (settings.appearance === 'dark') {
      root.classList.add('dark');
    } else if (settings.appearance === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [settings.appearance]);

  // Text size scaling
  const textSizeClass =
    settings.textSize === 'large'
      ? 'text-[105%]'
      : settings.textSize === 'xlarge'
      ? 'text-[112%]'
      : 'text-[100%]';

  return (
    <div className={`w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E2DDD3] via-[#D5CEC2] to-[#BDB4A5] dark:from-[#090D0B] dark:via-[#0F1612] dark:to-[#17201B] ${textSizeClass}`}>
      
      {/* DESKTOP BRAND SIDE PANEL (>=1100px only) */}
      <aside aria-label="Equora Brand Info" className="hidden xl:flex flex-col justify-between p-10 max-w-sm mr-8 text-stone-800 dark:text-stone-200 select-none">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#1A3326] dark:bg-[#B07A4A] flex items-center justify-center text-white dark:text-stone-950 shadow-md">
              <EquoraMonogram size={26} strokeWidth={2.4} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
                {dict.common.appName}
              </h2>
              <p className="text-xs text-[#B07A4A] dark:text-[#C99668] font-medium tracking-wide">
                Nordic Equine Platform
              </p>
            </div>
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light mt-3">
            {dict.common.tagline}. Precision stall climate telemetry, digital product passports, and offline-resilient stable logistics.
          </p>

          <div className="mt-8 space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 backdrop-blur-md border border-stone-300/40 dark:border-stone-700/50">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Active Stable
              </p>
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {currentStable}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/60 backdrop-blur-md border border-stone-300/40 dark:border-stone-700/50">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                User Role
              </p>
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 capitalize">
                {userRole} · Karin Lindqvist
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <Smartphone className="w-4 h-4 text-[#B07A4A]" />
          <span>{dict.common.bestViewedOnMobile}</span>
        </div>
      </aside>

      {/* MOBILE APP CONTAINER
          - Phones: 100% width, 100dvh, edge-to-edge
          - Desktop/Tablet: floating sleek phone frame with height less than screen height, rounded corners, shadow
      */}
      <div className="relative w-full h-[100dvh] md:w-[412px] md:h-[min(840px,calc(100vh-56px))] md:rounded-[48px] md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] md:border-[8px] md:border-stone-900/90 dark:md:border-stone-800/90 md:ring-1 md:ring-stone-400/25 bg-stone-50 dark:bg-[#121614] overflow-hidden flex flex-col my-auto transition-all">
        {/* Sleek speaker pill / camera notch on desktop */}
        <div className="hidden md:flex absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-900 dark:bg-stone-950 rounded-full z-50 items-center justify-end px-2 pointer-events-none shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
        </div>
        
        {/* Offline Notice Banner */}
        {isOffline && (
          <div className="bg-amber-600 text-white text-[11px] font-medium py-1 px-4 text-center tracking-tight flex items-center justify-center gap-1.5 shrink-0 select-none z-50">
            <WifiOff className="w-3.5 h-3.5" />
            <span>{dict.common.offlineBanner}</span>
          </div>
        )}

        {/* Top App Bar */}
        <TopAppBar
          scrollY={scrollY}
          isScrollingDown={isScrollingDown}
          title={getRouteTitle()}
          hasHero={hasHero}
        />

        {/* Inner Scroll Container (The ONLY scrolling element) */}
        <main
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar pb-tab-safe"
        >
          <Outlet />
        </main>

        {/* Floating Bottom Tab Bar */}
        <BottomTabBar />

        {/* Global Floating Components */}
        <PushNotificationBanner />
        <SyncQueueSheet />
        <ConflictSheet />
        <ActivityCenterSheet />
        <StablePickerSheet />
        <OnboardingModal />
      </div>
    </div>
  );
};
