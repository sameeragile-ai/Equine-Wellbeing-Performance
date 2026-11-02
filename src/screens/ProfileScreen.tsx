import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Globe,
  SunMoon,
  Ruler,
  Bell,
  Shield,
  Smartphone,
  Radio,
  WifiOff,
  GitMerge,
  RotateCcw,
  ChevronRight,
  LogOut,
  Building,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';
import { Language, Units, Appearance, TextSize } from '../types';

export const ProfileScreen: React.FC = () => {
  const { dict, currentLanguage } = useT();
  const navigate = useNavigate();

  const userName = useAppStore((state) => state.userName);
  const userEmail = useAppStore((state) => state.userEmail);
  const userRole = useAppStore((state) => state.userRole);
  const currentStable = useAppStore((state) => state.currentStable);
  const teamMembers = useAppStore((state) => state.teamMembers);
  const settings = useAppStore((state) => state.settings);
  const isOffline = useAppStore((state) => state.isOffline);

  const setLanguage = useAppStore((state) => state.setLanguage);
  const setUnits = useAppStore((state) => state.setUnits);
  const setAppearance = useAppStore((state) => state.setAppearance);
  const setTextSize = useAppStore((state) => state.setTextSize);
  const setReduceMotion = useAppStore((state) => state.setReduceMotion);
  const setNotificationToggle = useAppStore((state) => state.setNotificationToggle);
  const setOffline = useAppStore((state) => state.setOffline);
  const triggerConflictDemo = useAppStore((state) => state.triggerConflictDemo);
  const setPushNotification = useAppStore((state) => state.setPushNotification);
  const resetDemoData = useAppStore((state) => state.resetDemoData);

  const handlePushDemo = () => {
    setPushNotification({
      id: `manual-push-${Date.now()}`,
      title: 'Barn A Humidity Alert (83% RH)',
      message: 'Moisture elevated above 80% threshold. Recommended to vent upper paddock side.',
      route: '/sensor',
      time: 'Just now'
    });
  };

  return (
    <div className="px-4 pt-1 pb-10 space-y-5">
      {/* 1. User Profile Header Card */}
      <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-center gap-4">
        <SafeImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
          alt={userName}
          className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-[#1A3326]/10 dark:border-[#B07A4A]/20"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 truncate">
              {userName}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-[#1A3326]/10 dark:bg-[#B07A4A]/15 text-[10px] font-semibold uppercase tracking-wider text-[#1A3326] dark:text-[#C99668]">
              {userRole}
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 truncate">
            {userEmail}
          </p>
          <p className="text-[11px] text-[#B07A4A] dark:text-[#C99668] font-medium mt-1 truncate">
            {currentStable}
          </p>
        </div>
      </div>

      {/* 2. Stable Team Members Carousel */}
      <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
            {dict.profile.teamMembers}
          </h2>
          <span className="text-[11px] text-stone-400 tabular-nums">
            {teamMembers.length} active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 flex items-center gap-2.5"
            >
              <SafeImage
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {member.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-stone-500 truncate">
                  {member.role.split(' ')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Grouped Settings: Preferences */}
      <div className="space-y-1.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-3">
          {dict.profile.sections.preferences}
        </h2>

        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden text-xs">
          {/* Language Switcher */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.language}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              {(['en', 'de', 'nb'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium uppercase transition-colors ${
                    currentLanguage === lang
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {lang === 'nb' ? 'NO' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Units Toggle */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Ruler className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.units}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              {(['metric', 'imperial'] as Units[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnits(u)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    settings.units === u
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {u === 'metric' ? '°C / cm' : '°F / hh'}
                </button>
              ))}
            </div>
          </div>

          {/* Appearance Toggle */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SunMoon className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.appearance}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              {(['light', 'dark', 'system'] as Appearance[]).map((app) => (
                <button
                  key={app}
                  onClick={() => setAppearance(app)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    settings.appearance === app
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {dict.profile.appearanceOptions[app]}
                </button>
              ))}
            </div>
          </div>

          {/* Text Size Accessibility */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.textSize}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              {(['standard', 'large', 'xlarge'] as TextSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                    settings.textSize === size
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {size === 'standard' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Equipment & Sensors Shortcuts */}
      <div className="space-y-1.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-3">
          {dict.profile.sections.devices}
        </h2>

        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden text-xs">
          <button
            onClick={() => navigate('/sensor')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/40"
          >
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.pairedSensors}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => navigate('/scan')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/40"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {dict.profile.myProducts}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>

      {/* 5. Developer & Demo Prototype Controls */}
      <div className="space-y-1.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-3">
          {dict.profile.sections.developer}
        </h2>

        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden text-xs">
          {/* Offline Toggle */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <WifiOff className="w-4 h-4 text-amber-600" />
              <div>
                <p className="font-medium text-stone-800 dark:text-stone-200">
                  {dict.profile.offlineMode}
                </p>
                <p className="text-[10px] text-stone-400">
                  Queue all changes into local sync storage
                </p>
              </div>
            </div>
            <button
              onClick={() => setOffline(!isOffline)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isOffline ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isOffline ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Trigger Climate Alert Push */}
          <button
            onClick={handlePushDemo}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-800 dark:text-stone-200"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#B07A4A]" />
              <span className="font-medium">{dict.profile.triggerPush}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Trigger Sync Conflict */}
          <button
            onClick={triggerConflictDemo}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-800 dark:text-stone-200"
          >
            <div className="flex items-center gap-3">
              <GitMerge className="w-4 h-4 text-rose-500" />
              <span className="font-medium">{dict.profile.triggerConflict}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={resetDemoData}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-600 dark:text-stone-300"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-stone-400" />
              <span className="font-medium">{dict.profile.resetData}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] text-stone-400 font-mono">
          Equora iOS Prototype · Build 2.4.1 (Nordic)
        </p>
      </div>
    </div>
  );
};
