import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Plus,
  Calendar,
  Clock,
  Flame,
  Filter,
  X,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { TrainingType } from '../types';

export const TrainingScreen: React.FC = () => {
  const { dict, t } = useT();

  const trainingLogs = useAppStore((state) => state.trainingLogs);
  const horses = useAppStore((state) => state.horses);
  const addTrainingLog = useAppStore((state) => state.addTrainingLog);
  const userName = useAppStore((state) => state.userName);

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedHorseId, setSelectedHorseId] = useState<string>('all');
  const [showLogSheet, setShowLogSheet] = useState(false);

  // Form states
  const [formHorseId, setFormHorseId] = useState(horses[0]?.id || '');
  const [formType, setFormType] = useState<TrainingType>('Dressage');
  const [formDuration, setFormDuration] = useState('45');
  const [formIntensity, setFormIntensity] = useState(4);
  const [formRider, setFormRider] = useState(userName);
  const [formSurface, setFormSurface] = useState<'Indoor arena' | 'Sand arena' | 'Grass' | 'Trail' | 'Field'>('Indoor arena');
  const [formDate, setFormDate] = useState('2026-11-02');
  const [formNotes, setFormNotes] = useState('');

  // Weekly load calculation
  const weeklyDays = [
    { day: 'Mon', minutes: 85, avgIntensity: 4 },
    { day: 'Tue', minutes: 50, avgIntensity: 3 },
    { day: 'Wed', minutes: 75, avgIntensity: 4 },
    { day: 'Thu', minutes: 40, avgIntensity: 2 },
    { day: 'Fri', minutes: 65, avgIntensity: 3 },
    { day: 'Sat', minutes: 95, avgIntensity: 5 },
    { day: 'Sun', minutes: 30, avgIntensity: 1 }
  ];

  const totalWeeklyMinutes = weeklyDays.reduce((acc, d) => acc + d.minutes, 0);

  const filteredLogs = trainingLogs.filter((log) => {
    const matchesDiscipline = selectedDiscipline === 'all' || log.type === selectedDiscipline;
    const matchesHorse = selectedHorseId === 'all' || log.horseId === selectedHorseId;
    return matchesDiscipline && matchesHorse;
  });

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 5:
        return '#B07A4A'; // dark saddle tan
      case 4:
        return '#C88E59'; // warm tan
      case 3:
        return '#2E5240'; // forest
      case 2:
        return '#447259'; // sage
      default:
        return '#8A9A86'; // muted oat
    }
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetHorse = horses.find((h) => h.id === formHorseId) || horses[0];

    addTrainingLog({
      horseId: targetHorse.id,
      horseName: targetHorse.name,
      type: formType,
      durationMinutes: parseInt(formDuration) || 40,
      intensity: formIntensity,
      rider: formRider,
      surface: formSurface,
      date: formDate,
      notes: formNotes || 'Good cadence and willingness throughout session.'
    });

    setShowLogSheet(false);
    setFormNotes('');
  };

  return (
    <div className="px-4 pt-1 pb-6 space-y-4">
      {/* 1. Header & Log Session CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
            {dict.training.title}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {t(dict.training.totalMinutes, { minutes: totalWeeklyMinutes })}
          </p>
        </div>

        <button
          onClick={() => setShowLogSheet(true)}
          className="min-w-[44px] h-10 px-3 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-medium active:scale-95 transition-transform shadow-sm"
          aria-label={dict.training.logSession}
        >
          <Plus className="w-4 h-4" />
          <span>{dict.training.logSession}</span>
        </button>
      </div>

      {/* 2. Weekly Training Load Visualizer */}
      <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#B07A4A]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              {dict.training.weeklyLoad}
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Oct 27 – Nov 2
          </span>
        </div>

        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyDays}>
              <XAxis dataKey="day" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} unit="m" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1917',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                {weeklyDays.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getIntensityColor(entry.avgIntensity)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-500">
          <span>Intensity spectrum:</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#8A9A86]" /> Low
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2E5240]" /> Med
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#B07A4A]" /> High
            </span>
          </div>
        </div>
      </div>

      {/* 3. Filter Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setSelectedDiscipline('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
            selectedDiscipline === 'all'
              ? 'bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950'
              : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400'
          }`}
        >
          All Disciplines
        </button>
        {(['Dressage', 'Jumping', 'Hacking', 'Lunging', 'Groundwork', 'Rest'] as TrainingType[]).map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiscipline(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedDiscipline === d
                ? 'bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400'
            }`}
          >
            {dict.training.disciplines[d]}
          </button>
        ))}
      </div>

      {/* 4. Logs List */}
      <div className="space-y-2.5">
        {filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-stone-400">
            <Activity className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No training sessions found</p>
            <p className="text-xs text-stone-500 mt-1">Tap Log Session above to record work</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {log.horseName}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                    {log.type}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 tabular-nums">
                  {log.date}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {log.notes}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.durationMinutes} min
                </span>
                <span>Surface: {log.surface}</span>
                <span className="flex items-center gap-0.5 font-medium text-[#B07A4A] dark:text-[#C99668]">
                  <Flame className="w-3 h-3 fill-current" />
                  {log.intensity}/5
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Log Session Bottom Sheet */}
      {showLogSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] flex flex-col pb-safe">
            <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {dict.training.logSheet.title}
              </h2>
              <button
                onClick={() => setShowLogSheet(false)}
                className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-3.5 py-4 flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.training.logSheet.horseLabel}
                  </label>
                  <select
                    value={formHorseId}
                    onChange={(e) => setFormHorseId(e.target.value)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    {horses.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.training.logSheet.typeLabel}
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="Dressage">Dressage</option>
                    <option value="Jumping">Jumping</option>
                    <option value="Hacking">Hacking & Trail</option>
                    <option value="Lunging">Lunging</option>
                    <option value="Groundwork">Groundwork</option>
                    <option value="Rest">Active Rest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.training.logSheet.durationLabel}
                  </label>
                  <input
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.training.logSheet.intensityLabel}
                  </label>
                  <select
                    value={formIntensity}
                    onChange={(e) => setFormIntensity(parseInt(e.target.value))}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value={1}>1 - Recovery / Walk</option>
                    <option value={2}>2 - Light Work</option>
                    <option value={3}>3 - Moderate Conditioning</option>
                    <option value={4}>4 - High Collection / Cadence</option>
                    <option value={5}>5 - Maximum Effort / Competition</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.training.logSheet.surfaceLabel}
                  </label>
                  <select
                    value={formSurface}
                    onChange={(e) => setFormSurface(e.target.value as any)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="Indoor arena">Indoor arena</option>
                    <option value="Sand arena">Sand arena</option>
                    <option value="Grass">Grass field</option>
                    <option value="Trail">Mountain trail</option>
                    <option value="Field">Paddock track</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                  {dict.training.logSheet.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Shoulder-in, bend on both reins, breathing recovery..."
                  className="w-full p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform mt-4 shadow-md"
              >
                {dict.training.logSheet.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
