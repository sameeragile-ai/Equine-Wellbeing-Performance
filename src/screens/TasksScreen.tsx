import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  User,
  AlertCircle,
  Calendar,
  X,
  Filter,
  Check
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';
import { Task, TaskPriority, TaskRecurrence } from '../types';

export const TasksScreen: React.FC = () => {
  const { dict, t } = useT();

  const tasks = useAppStore((state) => state.tasks);
  const horses = useAppStore((state) => state.horses);
  const teamMembers = useAppStore((state) => state.teamMembers);
  const toggleTaskComplete = useAppStore((state) => state.toggleTaskComplete);
  const deleteTask = useAppStore((state) => state.deleteTask);
  const addTask = useAppStore((state) => state.addTask);

  const [activeTab, setActiveTab] = useState<'today' | 'overdue' | 'upcoming' | 'done'>('today');
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  // Filter state
  const [selectedHorseFilter, setSelectedHorseFilter] = useState<string>('all');

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskHorseId, setTaskHorseId] = useState<string>('');
  const [taskAssignee, setTaskAssignee] = useState('Ingrid Solheim');
  const [taskDueDate, setTaskDueDate] = useState('2026-11-02');
  const [taskDueTime, setTaskDueTime] = useState('14:00');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('normal');
  const [taskRecurrence, setTaskRecurrence] = useState<TaskRecurrence>('daily');
  const [taskNotes, setTaskNotes] = useState('');

  // Partition tasks
  const todayDateStr = '2026-11-02';

  const overdueTasks = tasks.filter((t) => !t.completed && t.dueDate < todayDateStr);
  const todayTasks = tasks.filter((t) => !t.completed && t.dueDate === todayDateStr);
  const upcomingTasks = tasks.filter((t) => !t.completed && t.dueDate > todayDateStr);
  const doneTasks = tasks.filter((t) => t.completed);

  const currentList =
    activeTab === 'today'
      ? todayTasks
      : activeTab === 'overdue'
      ? overdueTasks
      : activeTab === 'upcoming'
      ? upcomingTasks
      : doneTasks;

  const filteredTasks = currentList.filter((task) => {
    if (selectedHorseFilter === 'all') return true;
    return task.horseId === selectedHorseFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const assignedHorse = horses.find((h) => h.id === taskHorseId);
    const assignedMember = teamMembers.find((m) => m.name === taskAssignee) || teamMembers[0];

    addTask({
      title: taskTitle.trim(),
      horseId: assignedHorse?.id,
      horseName: assignedHorse?.name,
      assigneeName: assignedMember.name,
      assigneeAvatar: assignedMember.avatar,
      dueDate: taskDueDate,
      dueTime: taskDueTime,
      priority: taskPriority,
      recurrence: taskRecurrence,
      completed: false,
      notes: taskNotes || undefined,
      category: 'stable'
    });

    setShowCreateSheet(false);
    setTaskTitle('');
    setTaskNotes('');
  };

  return (
    <div className="px-4 pt-1 pb-6 space-y-4">
      {/* Top Controls: Tabs & New Task Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800/60 rounded-2xl flex-1 overflow-x-auto no-scrollbar">
          {(['today', 'overdue', 'upcoming', 'done'] as const).map((tab) => {
            const count =
              tab === 'today'
                ? todayTasks.length
                : tab === 'overdue'
                ? overdueTasks.length
                : tab === 'upcoming'
                ? upcomingTasks.length
                : doneTasks.length;

            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all text-center flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <span>{dict.tasks.tabs[tab]}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      tab === 'overdue' && count > 0
                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold'
                        : isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                        : 'bg-stone-300/40 dark:bg-stone-700/40 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowCreateSheet(true)}
          className="min-w-[44px] h-10 px-3 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-2xl flex items-center justify-center gap-1 text-xs font-medium active:scale-95 transition-transform shrink-0 shadow-sm"
          aria-label={dict.tasks.createTask}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{dict.tasks.createTask}</span>
        </button>
      </div>

      {/* Horse Filter Dropdown */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[11px] text-stone-400 shrink-0 font-medium flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>
        <button
          onClick={() => setSelectedHorseFilter('all')}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
            selectedHorseFilter === 'all'
              ? 'bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950'
              : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400'
          }`}
        >
          All Horses
        </button>
        {horses.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHorseFilter(h.id)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedHorseFilter === h.id
                ? 'bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400'
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* Task Rows List with Gesture / Swipe Support */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-stone-400"
            >
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {activeTab === 'today' ? dict.tasks.emptyToday : dict.tasks.emptySection}
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: -80, right: 80 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 60) {
                    toggleTaskComplete(task.id);
                  } else if (info.offset.x < -60) {
                    deleteTask(task.id);
                  }
                }}
                className={`relative p-3.5 rounded-2xl border transition-colors flex items-center justify-between gap-3 shadow-sm select-none touch-pan-y ${
                  task.completed
                    ? 'bg-stone-100/70 dark:bg-stone-900/40 border-stone-200/50 dark:border-stone-800/50 opacity-60'
                    : task.priority === 'high'
                    ? 'bg-white dark:bg-stone-900 border-rose-300/60 dark:border-rose-900/40'
                    : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800'
                }`}
              >
                {/* Left check action trigger */}
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#1A3326] dark:text-[#B07A4A] active:scale-90 transition-transform"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 fill-current text-emerald-600 dark:text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 stroke-[1.8] text-stone-400" />
                  )}
                </button>

                {/* Center Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p
                      className={`text-xs font-semibold truncate ${
                        task.completed
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.priority === 'high' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        Urgent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                    {task.horseName && (
                      <span className="font-semibold text-stone-700 dark:text-stone-300">
                        {task.horseName}
                      </span>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {task.dueTime}
                    </span>
                    <span>·</span>
                    <span>{task.assigneeName.split(' ')[0]}</span>
                    {task.recurrence !== 'none' && (
                      <>
                        <span>·</span>
                        <span className="capitalize">{task.recurrence}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Assignee Avatar & Delete button */}
                <div className="flex items-center gap-2 shrink-0">
                  <SafeImage
                    src={task.assigneeAvatar}
                    alt={task.assigneeName}
                    className="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 object-cover"
                  />
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-stone-300 hover:text-rose-500 dark:text-stone-600 dark:hover:text-rose-400 active:scale-90 transition-transform"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Hint */}
      <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center tracking-tight pt-2">
        Swipe right to complete · Swipe left to remove
      </p>

      {/* Create Task Bottom Sheet */}
      {showCreateSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] flex flex-col pb-safe">
            <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                {dict.tasks.createSheet.title}
              </h2>
              <button
                onClick={() => setShowCreateSheet(false)}
                className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 py-4 flex-1 overflow-y-auto">
              <div>
                <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                  {dict.tasks.createSheet.titleLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Turnout paddock 3, Farrier preparation"
                  className="w-full h-11 px-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.horseLabel}
                  </label>
                  <select
                    value={taskHorseId}
                    onChange={(e) => setTaskHorseId(e.target.value)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="">General Barn Task</option>
                    {horses.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.box.split('·')[1]?.trim() || h.box})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.assigneeLabel}
                  </label>
                  <select
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.role.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.dueDateLabel}
                  </label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.dueTimeLabel}
                  </label>
                  <input
                    type="time"
                    value={taskDueTime}
                    onChange={(e) => setTaskDueTime(e.target.value)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.priorityLabel}
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="high">{dict.tasks.priority.high}</option>
                    <option value="normal">{dict.tasks.priority.normal}</option>
                    <option value="low">{dict.tasks.priority.low}</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                    {dict.tasks.createSheet.recurrenceLabel}
                  </label>
                  <select
                    value={taskRecurrence}
                    onChange={(e) => setTaskRecurrence(e.target.value as any)}
                    className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                  >
                    <option value="daily">{dict.tasks.recurrence.daily}</option>
                    <option value="weekly">{dict.tasks.recurrence.weekly}</option>
                    <option value="none">{dict.tasks.recurrence.none}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                  {dict.tasks.createSheet.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="Special instructions, gate codes, pasture details..."
                  className="w-full p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform mt-4 shadow-md"
              >
                {dict.tasks.createSheet.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
