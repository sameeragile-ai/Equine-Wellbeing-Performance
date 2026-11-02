import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Grid, List, ChevronRight, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';
import { Horse } from '../types';

export const HorsesScreen: React.FC = () => {
  const { dict, t } = useT();
  const navigate = useNavigate();

  const horses = useAppStore((state) => state.horses);
  const addHorse = useAppStore((state) => state.addHorse);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'training' | 'resting' | 'retired'>('all');
  const [isGrid, setIsGrid] = useState(true);
  const [showAddSheet, setShowAddSheet] = useState(false);

  // Form state for adding a horse
  const [newHorseName, setNewHorseName] = useState('');
  const [newHorseBreed, setNewHorseBreed] = useState('Warmblood');
  const [newHorseYear, setNewHorseYear] = useState('2019');
  const [newHorseGender, setNewHorseGender] = useState<'Gelding' | 'Mare' | 'Stallion'>('Gelding');
  const [newHorseBox, setNewHorseBox] = useState('Barn A · 05');
  const [newHorseNotes, setNewHorseNotes] = useState('');

  const filteredHorses = horses.filter((horse) => {
    const matchesSearch =
      horse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      horse.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      horse.box.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' || horse.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHorseName.trim()) return;

    const birthYear = parseInt(newHorseYear) || 2018;
    const age = 2026 - birthYear;

    addHorse({
      name: newHorseName.trim(),
      breed: newHorseBreed,
      age: Math.max(1, age),
      birthYear,
      gender: newHorseGender,
      color: 'Bay',
      heightHands: 16.1,
      heightCm: 165,
      microchip: `578098100${Math.floor(100000 + Math.random() * 900000)}`,
      ueln: `NOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      owner: 'Nordlys Stables',
      box: newHorseBox,
      status: 'training',
      photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
      temperament: 'Kind, calm, forward-moving',
      weightKg: 520,
      notes: newHorseNotes || 'Newly arrived to Nordlys Stables herd.',
      feedSchedule: {
        morning: '2.5 kg Meadow hay + Balancer',
        midday: '2.0 kg High-fiber hay',
        evening: '3.0 kg Haylage',
        supplements: 'Equine Mineral Plus'
      },
      careSchedule: {
        nextFarrier: '2026-11-28',
        nextVet: '2026-12-15',
        nextDentist: '2027-04-10',
        vaccinationsUpToDate: true
      }
    });

    setShowAddSheet(false);
    setNewHorseName('');
    setNewHorseNotes('');
  };

  return (
    <div className="px-4 pt-1 pb-6 space-y-4">
      {/* Search Bar & Add Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.horses.searchPlaceholder}
            className="w-full h-11 pl-9 pr-4 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-[#B07A4A]"
          />
        </div>

        <button
          onClick={() => setShowAddSheet(true)}
          className="min-w-[44px] h-11 px-3 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-medium active:scale-95 transition-transform shrink-0 shadow-sm"
          aria-label={dict.horses.addNewHorse}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{dict.horses.addNewHorse}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 dark:bg-stone-800/60 rounded-2xl">
          {(['all', 'training', 'resting', 'retired'] as const).map((key) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {dict.horses.filters[key]}
              </button>
            );
          })}
        </div>

        {/* View Toggle */}
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="min-w-[40px] h-9 p-2 rounded-xl bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0"
          aria-label="Toggle view"
        >
          {isGrid ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
        </button>
      </div>

      {/* Horse List or Grid */}
      {filteredHorses.length === 0 ? (
        <div className="py-16 text-center text-stone-400">
          <p className="text-sm font-medium">No horses found</p>
          <p className="text-xs text-stone-500 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : isGrid ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredHorses.map((horse) => (
            <button
              key={horse.id}
              onClick={() => navigate(`/horses/${horse.id}`)}
              className="text-left rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm active:scale-97 transition-transform group flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <SafeImage
                  src={horse.photo}
                  alt={horse.name}
                  fallbackText={horse.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white border border-white/10 capitalize">
                  {horse.status}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <h3 className="font-serif text-base font-semibold text-white truncate">
                    {horse.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 truncate">
                    {horse.breed}
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {horse.box}
                </span>
                <span>{t(dict.horses.ageYears, { age: horse.age })}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredHorses.map((horse) => (
            <button
              key={horse.id}
              onClick={() => navigate(`/horses/${horse.id}`)}
              className="w-full text-left p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm active:scale-98 transition-transform flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <SafeImage
                  src={horse.photo}
                  alt={horse.name}
                  fallbackText={horse.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {horse.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {horse.breed} · {t(dict.horses.ageYears, { age: horse.age })}
                  </p>
                  <p className="text-[11px] text-[#B07A4A] dark:text-[#C99668] mt-0.5">
                    {horse.box}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Add Horse Bottom Sheet */}
      {showAddSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] flex flex-col pb-safe">
            <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {dict.horses.addHorseSheet.title}
              </h2>
              <button
                onClick={() => setShowAddSheet(false)}
                className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 py-4 flex-1 overflow-y-auto">
              <div>
                <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                  {dict.horses.addHorseSheet.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={newHorseName}
                  onChange={(e) => setNewHorseName(e.target.value)}
                  placeholder="e.g. Saga, Marquis"
                  className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.horses.addHorseSheet.breedLabel}
                  </label>
                  <input
                    type="text"
                    value={newHorseBreed}
                    onChange={(e) => setNewHorseBreed(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.horses.addHorseSheet.birthYearLabel}
                  </label>
                  <input
                    type="number"
                    value={newHorseYear}
                    onChange={(e) => setNewHorseYear(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.horses.addHorseSheet.genderLabel}
                  </label>
                  <select
                    value={newHorseGender}
                    onChange={(e) => setNewHorseGender(e.target.value as any)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="Gelding">Gelding</option>
                    <option value="Mare">Mare</option>
                    <option value="Stallion">Stallion</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.horses.addHorseSheet.boxLabel}
                  </label>
                  <input
                    type="text"
                    value={newHorseBox}
                    onChange={(e) => setNewHorseBox(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                  {dict.horses.addHorseSheet.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={newHorseNotes}
                  onChange={(e) => setNewHorseNotes(e.target.value)}
                  placeholder="Temperament, handling habits, turnout preference..."
                  className="w-full p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform mt-4"
              >
                {dict.horses.addHorseSheet.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
