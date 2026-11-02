import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, Shield, Apple, Sparkles, Building2, User, Award } from 'lucide-react';
import { UserRole } from '../types';
import { useAppStore } from '../store/useAppStore';
import { EquoraMonogram } from './EquoraMonogram';
import { SafeImage } from './SafeImage';

export const OnboardingModal: React.FC = () => {
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const [step, setStep] = useState<number>(0); // 0: cards, 1: signin, 2: role
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [email, setEmail] = useState('karin@nordlysstables.no');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');

  if (hasCompletedOnboarding) return null;

  const introCards = [
    {
      title: 'Know Every Horse',
      subtitle: 'Complete health records, lineage, digital passports, and training cadence unified in one serene place.',
      image: '/src/assets/images/horse_fjord_saga_1793636874142.jpg',
      badge: 'Equine Heritage'
    },
    {
      title: 'Run Your Stable in Harmony',
      subtitle: 'Effortless feed schedules, paddock turnouts, farrier appointments, and seamless crew handover.',
      image: '/src/assets/images/horse_warmblood_marquis_1793636875651.jpg',
      badge: 'Stable Operations'
    },
    {
      title: 'Monitor the Stall Climate',
      subtitle: 'Real-time Bluetooth telemetry tracking temperature, dew point, and humidity inside every stall box.',
      image: '/src/assets/images/sensor_climate_s1_1793636901160.jpg',
      badge: 'Climate Intelligence'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-[420px] bg-stone-900 text-stone-100 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Step 0: Intro Carousel */}
        {step === 0 && (
          <div className="flex flex-col flex-1 min-h-[520px]">
            {/* Card Hero Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <SafeImage
                src={introCards[cardIndex].image}
                alt={introCards[cardIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/15">
                <EquoraMonogram size={16} className="text-[#B07A4A]" />
                <span className="text-[10px] uppercase tracking-wider text-stone-200 font-medium">
                  {introCards[cardIndex].badge}
                </span>
              </div>
            </div>

            {/* Card Text */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 mb-4">
                  {introCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCardIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === cardIndex ? 'w-6 bg-[#B07A4A]' : 'w-1.5 bg-stone-700'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <h2 className="font-serif text-2xl text-white font-medium">
                  {introCards[cardIndex].title}
                </h2>
                <p className="text-xs text-stone-300 mt-2.5 leading-relaxed font-light">
                  {introCards[cardIndex].subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-400 hover:text-white px-2 py-2"
                >
                  Skip to Sign In
                </button>

                <button
                  onClick={() => {
                    if (cardIndex < introCards.length - 1) {
                      setCardIndex(cardIndex + 1);
                    } else {
                      setStep(1);
                    }
                  }}
                  className="px-5 h-12 bg-[#B07A4A] text-stone-950 font-medium text-xs rounded-2xl flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <span>{cardIndex === introCards.length - 1 ? 'Get Started' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Mock Supabase Auth */}
        {step === 1 && (
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1A3326] border border-white/10 flex items-center justify-center mb-4">
                <EquoraMonogram size={28} className="text-[#F5F1E8]" />
              </div>
              <h2 className="font-serif text-2xl text-white font-medium">
                Welcome to Equora
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Nordic stable authentication portal
              </p>

              {/* Apple Sign-in Mock */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full h-11 bg-white text-stone-900 rounded-xl font-medium text-xs flex items-center justify-center gap-2 mt-5 active:scale-98 transition-transform"
              >
                <Apple className="w-4 h-4 fill-current" />
                <span>Continue with Apple</span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-stone-800" />
                <span className="text-[10px] uppercase tracking-wider text-stone-500">or email</span>
                <div className="flex-1 h-px bg-stone-800" />
              </div>

              {/* Email + Password */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-stone-400 mb-1 block">
                    Stable Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#B07A4A]"
                    placeholder="name@stable.no"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-stone-400">
                      Password
                    </label>
                    <span className="text-[10px] text-[#B07A4A] cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-3.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full h-12 bg-[#B07A4A] text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
              >
                <span>Sign In to Stable</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-stone-500 text-center mt-3">
                Mock Supabase authentication · Any credentials will sign in
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Choose Role */}
        {step === 2 && (
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1A3326] border border-white/10 flex items-center justify-center mb-4">
                <EquoraMonogram size={28} className="text-[#F5F1E8]" />
              </div>
              <h2 className="font-serif text-2xl text-white font-medium">
                Choose Your Role
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Customize your stable dashboard view
              </p>

              <div className="space-y-2.5 mt-5">
                {[
                  {
                    id: 'manager' as UserRole,
                    title: 'Stable Manager',
                    desc: 'Full access to daily tasks, climate telemetry, herd oversight, and staff assignment.',
                    icon: Building2
                  },
                  {
                    id: 'rider' as UserRole,
                    title: 'Rider & Trainer',
                    desc: 'Log training sessions, track weekly fitness loads, and review horse health.',
                    icon: Award
                  },
                  {
                    id: 'owner' as UserRole,
                    title: 'Horse Owner',
                    desc: 'Follow your horse’s daily wellbeing, sensor reports, and digital passports.',
                    icon: User
                  }
                ].map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'bg-[#B07A4A]/15 border-[#B07A4A] text-white'
                          : 'bg-stone-800/60 border-stone-700/60 text-stone-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#B07A4A] text-stone-950' : 'bg-stone-700 text-stone-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white">
                          {r.title}
                        </p>
                        <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                          {r.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#B07A4A] shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => completeOnboarding(selectedRole, email)}
                className="w-full h-12 bg-[#B07A4A] text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
              >
                <span>Enter Nordlys Stables</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
