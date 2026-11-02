import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Horse,
  Task,
  TrainingLog,
  SensorReading,
  SensorDevice,
  ProductPassport,
  ActivityItem,
  SyncAction,
  SyncConflict,
  TeamMember,
  Language,
  Units,
  Appearance,
  TextSize,
  UserRole
} from '../types';
import {
  initialHorses,
  initialTasks,
  initialTrainingLogs,
  generate7DaySensorReadings,
  initialSensorDevice,
  initialPassports,
  initialActivities,
  teamMembers
} from '../data/mockData';

interface AppSettings {
  language: Language;
  units: Units;
  appearance: Appearance;
  textSize: TextSize;
  reduceMotion: boolean;
  notifications: {
    climate: boolean;
    tasks: boolean;
    briefing: boolean;
  };
}

interface PushBanner {
  id: string;
  title: string;
  message: string;
  route?: string;
  time?: string;
}

interface AppState {
  // Core Entities
  horses: Horse[];
  tasks: Task[];
  trainingLogs: TrainingLog[];
  sensorReadings: SensorReading[];
  sensorDevice: SensorDevice;
  passports: ProductPassport[];
  activities: ActivityItem[];
  teamMembers: TeamMember[];

  // User & Onboarding
  hasCompletedOnboarding: boolean;
  userRole: UserRole;
  userName: string;
  userEmail: string;
  currentStable: string;

  // Settings
  settings: AppSettings;

  // Offline & Synchronization
  isOffline: boolean;
  isSyncing: boolean;
  syncQueue: SyncAction[];
  syncConflict: SyncConflict | null;

  // Dynamic Modals & Banners
  pushNotification: PushBanner | null;
  activeSheet: 'none' | 'activity' | 'syncQueue' | 'conflict' | 'stablePicker';

  // Actions
  toggleTaskComplete: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  
  addHorse: (horse: Omit<Horse, 'id'>) => void;
  updateHorse: (horse: Horse) => void;

  addTrainingLog: (log: Omit<TrainingLog, 'id'>) => void;

  registerProduct: (passport: ProductPassport) => void;

  setSensorDrift: () => void;
  pairSensor: (device: Partial<SensorDevice>) => void;
  disconnectSensor: () => void;
  reconnectSensor: () => void;
  readFlashMemory: () => Promise<void>;

  setOffline: (offline: boolean) => void;
  performSync: () => Promise<void>;
  triggerConflictDemo: () => void;
  resolveConflict: (choice: 'mine' | 'server' | 'merge') => void;

  markActivityRead: (id: string) => void;
  markAllActivitiesRead: () => void;
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;

  setLanguage: (lang: Language) => void;
  setUnits: (units: Units) => void;
  setAppearance: (appearance: Appearance) => void;
  setTextSize: (size: TextSize) => void;
  setReduceMotion: (reduce: boolean) => void;
  setNotificationToggle: (key: keyof AppSettings['notifications'], val: boolean) => void;
  setStable: (stableName: string) => void;

  setPushNotification: (banner: PushBanner | null) => void;
  setActiveSheet: (sheet: 'none' | 'activity' | 'syncQueue' | 'conflict' | 'stablePicker') => void;

  completeOnboarding: (role: UserRole, email: string) => void;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      horses: initialHorses,
      tasks: initialTasks,
      trainingLogs: initialTrainingLogs,
      sensorReadings: generate7DaySensorReadings(),
      sensorDevice: initialSensorDevice,
      passports: initialPassports,
      activities: initialActivities,
      teamMembers: teamMembers,

      hasCompletedOnboarding: true, // Defaults ready, but allows reset
      userRole: 'manager',
      userName: 'Karin Lindqvist',
      userEmail: 'karin@nordlysstables.no',
      currentStable: 'Nordlys Stables · Main Barn',

      settings: {
        language: 'en',
        units: 'metric',
        appearance: 'system',
        textSize: 'standard',
        reduceMotion: false,
        notifications: {
          climate: true,
          tasks: true,
          briefing: true
        }
      },

      isOffline: false,
      isSyncing: false,
      syncQueue: [],
      syncConflict: null,
      pushNotification: null,
      activeSheet: 'none',

      toggleTaskComplete: (taskId) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const updatedCompleted = !task.completed;
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId
            ? { ...t, completed: updatedCompleted, completedAt: updatedCompleted ? timeStr : undefined }
            : t
        );

        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
          type: 'complete_task',
          entityName: task.title,
          payload: { taskId, completed: updatedCompleted }
        };

        set({
          tasks: updatedTasks,
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      deleteTask: (taskId) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
          type: 'delete_task',
          entityName: task.title,
          payload: { taskId }
        };

        set({
          tasks: state.tasks.filter((t) => t.id !== taskId),
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      addTask: (newTaskData) => {
        const state = get();
        const newTask: Task = {
          ...newTaskData,
          id: `t-${Date.now()}`
        };

        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
          type: 'create_task',
          entityName: newTask.title,
          payload: newTask
        };

        set({
          tasks: [newTask, ...state.tasks],
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      addHorse: (horseData) => {
        const state = get();
        const newHorse: Horse = {
          ...horseData,
          id: `h-${Date.now()}`
        };

        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'update_horse',
          entityName: newHorse.name,
          payload: newHorse
        };

        set({
          horses: [newHorse, ...state.horses],
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      updateHorse: (updatedHorse) => {
        const state = get();
        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'update_horse',
          entityName: updatedHorse.name,
          payload: updatedHorse
        };

        set({
          horses: state.horses.map((h) => (h.id === updatedHorse.id ? updatedHorse : h)),
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      addTrainingLog: (logData) => {
        const state = get();
        const newLog: TrainingLog = {
          ...logData,
          id: `tr-${Date.now()}`
        };

        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'log_training',
          entityName: `${newLog.horseName} · ${newLog.type}`,
          payload: newLog
        };

        set({
          trainingLogs: [newLog, ...state.trainingLogs],
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      registerProduct: (passport) => {
        const state = get();
        const newSyncAction: SyncAction = {
          id: `sync-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'register_product',
          entityName: passport.name,
          payload: passport
        };

        set({
          passports: [passport, ...state.passports],
          syncQueue: state.isOffline ? [...state.syncQueue, newSyncAction] : state.syncQueue
        });
      },

      setSensorDrift: () => {
        const state = get();
        if (!state.sensorDevice.isConnected) return;

        // Subtle realistic drift ±0.1°C and ±1% humidity
        const lastReading = state.sensorReadings[state.sensorReadings.length - 1];
        if (!lastReading) return;

        const deltaTemp = (Math.random() - 0.5) * 0.2;
        const newTempC = Math.round((lastReading.temperatureC + deltaTemp) * 10) / 10;
        const newTempF = Math.round((newTempC * 1.8 + 32) * 10) / 10;
        const deltaHum = Math.round((Math.random() - 0.5) * 2);
        const newHum = Math.min(95, Math.max(45, lastReading.humidityPercent + deltaHum));

        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');

        const newReading: SensorReading = {
          timestamp: now.toISOString(),
          timeLabel: `${hh}:${mm}`,
          temperatureC: newTempC,
          temperatureF: newTempF,
          humidityPercent: newHum,
          comfort: newHum > 80 ? 'humid' : newTempC > 21 ? 'too_warm' : newTempC < 10 ? 'cool' : 'comfortable'
        };

        set({
          sensorReadings: [...state.sensorReadings.slice(1), newReading],
          sensorDevice: {
            ...state.sensorDevice,
            lastSyncTime: now.toISOString()
          }
        });
      },

      pairSensor: (deviceData) => {
        set((state) => ({
          sensorDevice: {
            ...state.sensorDevice,
            ...deviceData,
            paired: true,
            isConnected: true,
            lastSyncTime: new Date().toISOString()
          }
        }));
      },

      disconnectSensor: () => {
        set((state) => ({
          sensorDevice: {
            ...state.sensorDevice,
            isConnected: false
          }
        }));
      },

      reconnectSensor: () => {
        set((state) => ({
          sensorDevice: {
            ...state.sensorDevice,
            isConnected: true,
            lastSyncTime: new Date().toISOString()
          }
        }));
      },

      readFlashMemory: async () => {
        set({ isSyncing: true });
        await new Promise((resolve) => setTimeout(resolve, 1400));
        set({
          isSyncing: false,
          sensorReadings: generate7DaySensorReadings()
        });
      },

      setOffline: (offline) => {
        const state = get();
        if (state.isOffline === offline) return;

        if (!offline && state.syncQueue.length > 0) {
          // Returning online -> auto sync
          set({ isOffline: false, isSyncing: true });
          setTimeout(() => {
            set({
              isSyncing: false,
              syncQueue: [],
              pushNotification: {
                id: `sync-${Date.now()}`,
                title: 'All Changes Synced',
                message: 'Your offline stable updates were successfully synced with the cloud.',
                time: 'Just now'
              }
            });
          }, 1200);
        } else {
          set({ isOffline: offline });
        }
      },

      performSync: async () => {
        set({ isSyncing: true });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        set({
          isSyncing: false,
          syncQueue: [],
          activeSheet: 'none',
          pushNotification: {
            id: `sync-manual-${Date.now()}`,
            title: 'Sync Complete',
            message: 'All queued items were synchronized with zero conflicts.',
            time: 'Just now'
          }
        });
      },

      triggerConflictDemo: () => {
        const state = get();
        const task = state.tasks[1] || state.tasks[0];
        set({
          syncConflict: {
            id: `conflict-${Date.now()}`,
            entityType: 'task',
            entityId: task.id,
            entityTitle: task.title,
            conflictField: 'priority and notes',
            timestamp: new Date().toISOString(),
            localData: {
              priority: 'high',
              notes: 'Local update: Marked urgent due to vet schedule shift at 08:30.'
            },
            serverData: {
              priority: 'normal',
              notes: 'Ingrid Solheim update: Assigned to Barn A tie-stall with normal priority at 08:35.'
            }
          },
          activeSheet: 'conflict'
        });
      },

      resolveConflict: (choice) => {
        const state = get();
        if (!state.syncConflict) return;

        const conflict = state.syncConflict;
        const updatedTasks = state.tasks.map((t) => {
          if (t.id === conflict.entityId) {
            if (choice === 'mine') {
              return { ...t, ...conflict.localData };
            } else if (choice === 'server') {
              return { ...t, ...conflict.serverData };
            } else {
              // Merge
              return {
                ...t,
                priority: 'high',
                notes: `${conflict.localData.notes} | ${conflict.serverData.notes}`
              };
            }
          }
          return t;
        });

        set({
          tasks: updatedTasks,
          syncConflict: null,
          activeSheet: 'none',
          pushNotification: {
            id: `conflict-res-${Date.now()}`,
            title: 'Conflict Resolved',
            message: `Applied ${choice === 'mine' ? 'local' : choice === 'server' ? 'server' : 'merged'} version.`,
            time: 'Just now'
          }
        });
      },

      markActivityRead: (id) => {
        set((state) => ({
          activities: state.activities.map((a) => (a.id === id ? { ...a, read: true } : a))
        }));
      },

      markAllActivitiesRead: () => {
        set((state) => ({
          activities: state.activities.map((a) => ({ ...a, read: true }))
        }));
      },

      addActivity: (activityData) => {
        set((state) => ({
          activities: [
            {
              ...activityData,
              id: `act-${Date.now()}`
            },
            ...state.activities
          ]
        }));
      },

      setLanguage: (lang) => {
        set((state) => ({
          settings: { ...state.settings, language: lang }
        }));
      },

      setUnits: (units) => {
        set((state) => ({
          settings: { ...state.settings, units }
        }));
      },

      setAppearance: (appearance) => {
        set((state) => ({
          settings: { ...state.settings, appearance }
        }));
      },

      setTextSize: (textSize) => {
        set((state) => ({
          settings: { ...state.settings, textSize }
        }));
      },

      setReduceMotion: (reduceMotion) => {
        set((state) => ({
          settings: { ...state.settings, reduceMotion }
        }));
      },

      setNotificationToggle: (key, val) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              [key]: val
            }
          }
        }));
      },

      setStable: (stableName) => {
        set({ currentStable: stableName, activeSheet: 'none' });
      },

      setPushNotification: (banner) => {
        set({ pushNotification: banner });
      },

      setActiveSheet: (sheet) => {
        set({ activeSheet: sheet });
      },

      completeOnboarding: (role, email) => {
        set({
          hasCompletedOnboarding: true,
          userRole: role,
          userEmail: email || 'karin@nordlysstables.no',
          activeSheet: 'none'
        });
      },

      resetDemoData: () => {
        set({
          horses: initialHorses,
          tasks: initialTasks,
          trainingLogs: initialTrainingLogs,
          sensorReadings: generate7DaySensorReadings(),
          sensorDevice: initialSensorDevice,
          passports: initialPassports,
          activities: initialActivities,
          teamMembers: teamMembers,
          syncQueue: [],
          syncConflict: null,
          isOffline: false,
          isSyncing: false
        });
      }
    }),
    {
      name: 'equora-storage-v2',
      partialize: (state) => ({
        horses: state.horses,
        tasks: state.tasks,
        trainingLogs: state.trainingLogs,
        sensorDevice: state.sensorDevice,
        passports: state.passports,
        activities: state.activities,
        settings: state.settings,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        userRole: state.userRole,
        userName: state.userName,
        userEmail: state.userEmail,
        currentStable: state.currentStable,
        syncQueue: state.syncQueue
      })
    }
  )
);
