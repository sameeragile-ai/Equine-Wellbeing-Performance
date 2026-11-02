import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Thermometer,
  Droplets,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ArrowUpRight,
  Activity,
  Plus
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';

export const HomeScreen: React.FC = () => {
  const { dict, t } = useT();
  const navigate = useNavigate();

  const horses = useAppStore((state) => state.horses);
  const tasks = useAppStore((state) => state.tasks);
  const sensorReadings = useAppStore((state) => state.sensorReadings);
  const sensorDevice = useAppStore((state) => state.sensorDevice);
  const trainingLogs = useAppStore((state) => state.trainingLogs);
  const settings = useAppStore((state) => state.settings);
  const toggleTaskComplete = useAppStore((state) => state.toggleTaskComplete);
  const userName = useAppStore((state) => state.userName);

  // Latest reading
  const latestReading = sensorReadings[sensorReadings.length - 1] || {
    temperatureC: 18.2,
    temperatureF: 64.8,
    humidityPercent: 64,
    comfort: 'comfortable' as const
  };

  const isImperial = settings.units === 'imperial';
  const displayTemp = isImperial
    ? `${latestReading.temperatureF}°F`
    : `${latestReading.temperatureC}°C`;

  // Filter tasks for Today (date: 2026-11-02 or tasks marked today)
  const todayTasks = tasks.filter((t) => t.dueDate === '2026-11-02' || !t.completed);
  const doneCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 100;

  // Mini sparkline SVG for last 24h temperature
  const sparklineReadings = sensorReadings.slice(-24);
  const minTemp = Math.min(...sparklineReadings.map((r) => r.temperatureC));
  const maxTemp = Math.max(...sparklineReadings.map((r) => r.temperatureC));
  const range = maxTemp - minTemp || 1;

  const sparklinePoints = sparklineReadings
    .map((r, i) => {
      const x = (i / (sparklineReadings.length - 1)) * 120;
      const y = 32 - ((r.temperatureC - minTemp) / range) * 24;
      return `${x},${y}`;
    })
    .join(' ');

  // Current hour greeting
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? dict.home.greetingMorning
      : currentHour < 17
      ? dict.home.greetingAfternoon
      : dict.home.greetingEvening;

  return (
    <div className="px-4 pt-1 pb-6 space-y-6">
      {/* 1. Warm Greeting & Stable Status */}
      <section>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-wider uppercase text-[#B07A4A] dark:text-[#C99668]">
              {dict.home.weatherSummary}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 mt-0.5">
              {greeting}, {userName.split(' ')[0]}
            </h1>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tabular-nums">
            Mon, 2 Nov
          </span>
        </div>
      </section>

      {/* 2. Hero Sensor Card (Stable Climate Intelligence) */}
      <section>
        <button
          onClick={() => navigate('/sensor')}
          className="w-full text-left p-5 rounded-3xl bg-gradient-to-br from-[#1A3326] via-[#224433] to-[#14291E] text-white shadow-xl shadow-[#1A3326]/20 relative overflow-hidden active:scale-[0.99] transition-transform group"
          aria-label="View climate sensor details"
        >
          {/* Subtle background ambient mesh */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#B07A4A]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="text-xs font-medium text-stone-300">
                {sensorDevice.name} · Barn A
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-emerald-300">
              <span>{dict.common.comfortStatus[latestReading.comfort]}</span>
            </div>
          </div>

          {/* Big Sensor Telemetry */}
          <div className="relative z-10 grid grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-300 font-medium flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#C99668]" />
                <span>{dict.home.temperature}</span>
              </p>
              <p className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-1 tabular-nums">
                {displayTemp}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-300 font-medium flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>{dict.home.humidity}</span>
              </p>
              <p className="text-3xl sm:text-4xl font-serif tracking-tight text-white mt-1 tabular-nums">
                {latestReading.humidityPercent}%
              </p>
            </div>
          </div>

          {/* Bottom Card Footer with Mini Sparkline */}
          <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="84" height="26" className="overflow-visible">
                <polyline
                  fill="none"
                  stroke="#C99668"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={sparklinePoints}
                />
              </svg>
              <span className="text-[10px] text-stone-300 font-medium">
                24h trend
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-stone-200 group-hover:translate-x-0.5 transition-transform">
              <span className="text-[11px]">{dict.home.sensorLastSync}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C99668]" />
            </div>
          </div>
        </button>
      </section>

      {/* 3. Attention Alert Card */}
      <section>
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-start gap-3 text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-amber-950 dark:text-amber-200">
              {dict.home.attentionRequired}
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5 leading-snug">
              {dict.home.humidityAlertDesc}
            </p>
          </div>
          <button
            onClick={() => navigate('/sensor')}
            className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 underline shrink-0 mt-0.5"
          >
            Review
          </button>
        </div>
      </section>

      {/* 4. Today's Tasks Summary with Progress Ring */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {dict.home.todaysTasks}
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
              {t(dict.home.tasksCompleted, { done: doneCount, total: totalCount })}
            </span>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="text-xs font-medium text-[#B07A4A] dark:text-[#C99668] flex items-center gap-0.5"
          >
            <span>{dict.home.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Task Cards Strip */}
        <div className="space-y-2">
          {todayTasks.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-stone-100/70 dark:bg-stone-900/40 border-stone-200/50 dark:border-stone-800/50 opacity-60'
                  : 'bg-white dark:bg-stone-900/80 border-stone-200/80 dark:border-stone-800 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className="flex items-center gap-3 flex-1 text-left min-w-0"
              >
                <div className="shrink-0 text-[#1A3326] dark:text-[#B07A4A]">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 fill-current text-emerald-600 dark:text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 stroke-[1.8] text-stone-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-medium truncate ${
                      task.completed
                        ? 'line-through text-stone-400 dark:text-stone-500'
                        : 'text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {task.horseName && (
                      <span className="font-semibold text-stone-700 dark:text-stone-300">
                        {task.horseName}
                      </span>
                    )}
                    <span>·</span>
                    <span>{task.dueTime}</span>
                    <span>·</span>
                    <span className="capitalize">{task.assigneeName.split(' ')[0]}</span>
                  </div>
                </div>
              </button>

              <div className="shrink-0">
                <SafeImage
                  src={task.assigneeAvatar}
                  alt={task.assigneeName}
                  className="w-6 h-6 rounded-full border border-stone-200 dark:border-stone-700 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Your Horses Horizontal Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {dict.home.yourHorses}
          </h2>
          <button
            onClick={() => navigate('/horses')}
            className="text-xs font-medium text-[#B07A4A] dark:text-[#C99668] flex items-center gap-0.5"
          >
            <span>{dict.home.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {horses.map((horse) => (
            <button
              key={horse.id}
              onClick={() => navigate(`/horses/${horse.id}`)}
              className="flex flex-col w-36 shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800 shadow-sm active:scale-97 transition-transform text-left group"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <SafeImage
                  src={horse.photo}
                  alt={horse.name}
                  fallbackText={horse.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <h3 className="font-serif text-sm font-semibold text-white truncate">
                    {horse.name}
                  </h3>
                  <p className="text-[10px] text-stone-300 truncate">
                    {horse.breed}
                  </p>
                </div>
              </div>
              <div className="p-2.5 flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400">
                <span className="font-medium text-stone-700 dark:text-stone-300">{horse.box.split('·')[1]?.trim() || horse.box}</span>
                <span className="capitalize">{horse.status}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Recent Training Sessions Strip */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {dict.home.recentTraining}
          </h2>
          <button
            onClick={() => navigate('/training')}
            className="text-xs font-medium text-[#B07A4A] dark:text-[#C99668] flex items-center gap-0.5"
          >
            <span>{dict.home.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {trainingLogs.slice(0, 3).map((log) => (
            <div
              key={log.id}
              onClick={() => navigate('/training')}
              className="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-center justify-between cursor-pointer active:scale-99 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#1A3326] dark:text-[#B07A4A] shrink-0 font-medium">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {log.horseName} · {log.type}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {log.durationMinutes} min · Intensity {log.intensity}/5 · {log.rider}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
