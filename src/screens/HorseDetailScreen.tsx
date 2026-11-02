import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Calendar,
  Activity,
  Thermometer,
  ShieldCheck,
  ChevronRight,
  Plus,
  Edit3,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Heart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';

export const HorseDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dict, t } = useT();

  const horses = useAppStore((state) => state.horses);
  const trainingLogs = useAppStore((state) => state.trainingLogs);
  const sensorReadings = useAppStore((state) => state.sensorReadings);
  const passports = useAppStore((state) => state.passports);
  const settings = useAppStore((state) => state.settings);
  const updateHorse = useAppStore((state) => state.updateHorse);

  const [activeTab, setActiveTab] = useState<'overview' | 'training' | 'environment' | 'products'>('overview');
  const [showEditSheet, setShowEditSheet] = useState(false);

  const horse = horses.find((h) => h.id === id);

  if (!horse) {
    return (
      <div className="py-24 text-center px-6">
        <p className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Horse Profile Not Found
        </p>
        <p className="text-xs text-stone-500 mt-1">
          The requested horse id could not be located in Nordlys Stables database.
        </p>
        <button
          onClick={() => navigate('/horses')}
          className="mt-4 px-4 py-2 bg-[#1A3326] text-white rounded-xl text-xs"
        >
          Return to Horses
        </button>
      </div>
    );
  }

  // Horse-specific training logs
  const horseLogs = trainingLogs.filter((l) => l.horseId === horse.id);

  // Group training logs into days for chart
  const weeklyData = [
    { day: 'Mon', minutes: 45, intensity: 4 },
    { day: 'Tue', minutes: 0, intensity: 0 },
    { day: 'Wed', minutes: 35, intensity: 3 },
    { day: 'Thu', minutes: 50, intensity: 4 },
    { day: 'Fri', minutes: 20, intensity: 2 },
    { day: 'Sat', minutes: 40, intensity: 4 },
    { day: 'Sun', minutes: 0, intensity: 0 }
  ];

  // Horse-specific products
  const horseProducts = passports.filter((p) => p.linkedHorseId === horse.id);

  // Climate readings for box
  const boxReadings = sensorReadings.slice(-24).map((r) => ({
    time: r.timeLabel,
    temp: settings.units === 'imperial' ? r.temperatureF : r.temperatureC,
    humidity: r.humidityPercent
  }));

  const heightDisplay =
    settings.units === 'imperial'
      ? t(dict.horses.hands, { height: horse.heightHands })
      : t(dict.horses.centimeters, { height: horse.heightCm });

  return (
    <div className="pb-10 -mt-13">
      {/* 1. Hero Image with Scrim */}
      <div className="relative h-72 w-full overflow-hidden">
        <SafeImage
          src={horse.photo}
          alt={horse.name}
          fallbackText={horse.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/30 to-black/50 dark:from-[#121614] dark:via-black/50" />

        {/* Floating Quick Info on Scrim */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-wider border border-white/15">
              {horse.box}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-wider border border-white/15 capitalize">
              {horse.status}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
            {horse.name}
          </h1>
          <p className="text-xs text-stone-200 mt-0.5">
            {horse.breed} · {t(dict.horses.ageYears, { age: horse.age })} ({horse.birthYear}) · {horse.gender}
          </p>
        </div>
      </div>

      {/* 2. Quick Metrics Row */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-3 gap-2 p-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-center">
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Height</p>
            <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 tabular-nums">
              {heightDisplay}
            </p>
          </div>
          <div className="border-x border-stone-200 dark:border-stone-800">
            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Weight</p>
            <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 tabular-nums">
              {horse.weightKg} kg
            </p>
          </div>
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Next Farrier</p>
            <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {new Date(horse.careSchedule.nextFarrier).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Segmented Navigation Tabs */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-1 p-1 bg-stone-200/60 dark:bg-stone-800/60 rounded-2xl">
          {(['overview', 'training', 'environment', 'products'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-[11px] font-medium rounded-xl transition-all whitespace-nowrap text-center ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {dict.horses.tabs[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Tab Panels */}
      <div className="px-4 mt-4 space-y-4">
        {/* TAB A: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Key Facts Grouped List */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
                {dict.horses.overview.keyFacts}
              </h2>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-[11px] text-stone-400 block">{dict.horses.overview.color}</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{horse.color}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block">{dict.horses.overview.owner}</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{horse.owner}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block">{dict.horses.overview.microchip}</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 font-mono text-[11px]">{horse.microchip}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block">{dict.horses.overview.ueln}</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 font-mono text-[11px]">{horse.ueln}</span>
                </div>
              </div>
            </div>

            {/* Temperament & Stable Notes */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668] mb-1.5">
                {dict.horses.overview.temperament}
              </h2>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {horse.temperament}
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 italic">
                "{horse.notes}"
              </div>
            </div>

            {/* Feeding Routine */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
                {dict.horses.overview.feedSchedule}
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.morningFeed}</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100 text-right max-w-[210px]">{horse.feedSchedule.morning}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.middayFeed}</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100 text-right max-w-[210px]">{horse.feedSchedule.midday}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.eveningFeed}</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100 text-right max-w-[210px]">{horse.feedSchedule.evening}</span>
                </div>
                <div className="flex items-start justify-between pt-1 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.supplements}</span>
                  <span className="font-medium text-[#B07A4A] dark:text-[#C99668] text-right max-w-[210px]">{horse.feedSchedule.supplements}</span>
                </div>
              </div>
            </div>

            {/* Veterinary & Farrier Schedule */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
                {dict.horses.overview.careSchedule}
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.nextFarrier}</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">{horse.careSchedule.nextFarrier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.nextVet}</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">{horse.careSchedule.nextVet}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 dark:text-stone-400">{dict.horses.overview.vaccinations}</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{dict.horses.overview.upToDate}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB B: TRAINING */}
        {activeTab === 'training' && (
          <div className="space-y-4">
            {/* Weekly Load Chart */}
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
                  Weekly Training Load
                </h2>
                <span className="text-[11px] text-stone-500 font-medium tabular-nums">
                  190 min total
                </span>
              </div>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1C1917',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '11px'
                      }}
                    />
                    <Bar dataKey="minutes" fill="#1A3326" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Log List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Past Sessions
                </h3>
                <button
                  onClick={() => navigate('/training')}
                  className="text-xs text-[#B07A4A] font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Session</span>
                </button>
              </div>

              {horseLogs.length === 0 ? (
                <div className="p-6 text-center text-stone-400 text-xs bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800">
                  No sessions recorded for {horse.name} yet.
                </div>
              ) : (
                horseLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {log.type} · {log.durationMinutes} min
                      </span>
                      <span className="text-[10px] text-stone-400">{log.date}</span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 leading-snug">
                      {log.notes}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                      <span>Rider: {log.rider}</span>
                      <span>Intensity: {log.intensity}/5</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB C: ENVIRONMENT */}
        {activeTab === 'environment' && (
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668] mb-1">
                Stall Box Microclimate ({horse.box})
              </h2>
              <p className="text-xs text-stone-500 mb-3">
                Live sensor logging from Barn A ceiling node.
              </p>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={boxReadings}>
                    <XAxis dataKey="time" stroke="#888" fontSize={9} tickLine={false} interval={4} />
                    <YAxis stroke="#888" fontSize={9} tickLine={false} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1C1917',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '11px'
                      }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#B07A4A" strokeWidth={2} dot={false} name="Temp" />
                    <Line type="monotone" dataKey="humidity" stroke="#1A3326" strokeWidth={2} dot={false} name="Humidity %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B07A4A]" /> Temperature
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A3326] dark:bg-emerald-500" /> Humidity %
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB D: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Registered Passports for {horse.name}
              </h2>
              <button
                onClick={() => navigate('/scan')}
                className="text-xs text-[#B07A4A] font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Scan New</span>
              </button>
            </div>

            {horseProducts.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800">
                <ShieldCheck className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  No products registered yet
                </p>
                <p className="text-[11px] text-stone-500 mt-1 max-w-xs mx-auto">
                  Scan an Equora QR code on a blanket, boots, or bridle to link it to {horse.name}.
                </p>
                <button
                  onClick={() => navigate('/scan')}
                  className="mt-3 px-4 py-2 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-xl text-xs font-medium"
                >
                  Scan Product QR
                </button>
              </div>
            ) : (
              horseProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/passport/${p.id}`)}
                  className="w-full text-left p-3.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-center justify-between gap-3 active:scale-98 transition-transform group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <SafeImage
                      src={p.heroImage}
                      alt={p.name}
                      fallbackText={p.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        {p.model} · {p.serialNumber}
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Authentic</span>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
