export type Language = 'en' | 'de' | 'nb';
export type Units = 'metric' | 'imperial';
export type Appearance = 'light' | 'dark' | 'system';
export type TextSize = 'standard' | 'large' | 'xlarge';
export type UserRole = 'owner' | 'rider' | 'manager';

export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  birthYear: number;
  gender: 'Mare' | 'Gelding' | 'Stallion';
  color: string;
  heightHands: number; // e.g. 16.2
  heightCm: number;    // e.g. 168
  microchip: string;
  ueln: string;
  owner: string;
  box: string;
  status: 'training' | 'resting' | 'retired';
  photo: string;
  notes: string;
  temperament: string;
  weightKg: number;
  feedSchedule: {
    morning: string;
    midday: string;
    evening: string;
    supplements: string;
  };
  careSchedule: {
    nextFarrier: string;
    nextVet: string;
    nextDentist: string;
    vaccinationsUpToDate: boolean;
  };
}

export type TaskPriority = 'high' | 'normal' | 'low';
export type TaskRecurrence = 'daily' | 'weekly' | 'none';

export interface Task {
  id: string;
  title: string;
  horseId?: string;
  horseName?: string;
  assigneeName: string;
  assigneeAvatar: string;
  dueTime: string;
  dueDate: string; // YYYY-MM-DD
  recurrence: TaskRecurrence;
  priority: TaskPriority;
  completed: boolean;
  completedAt?: string;
  notes?: string;
  category: 'feed' | 'turnout' | 'vet' | 'training' | 'stable';
}

export type TrainingType = 'Dressage' | 'Jumping' | 'Hacking' | 'Lunging' | 'Groundwork' | 'Rest';

export interface TrainingLog {
  id: string;
  horseId: string;
  horseName: string;
  type: TrainingType;
  durationMinutes: number;
  intensity: number; // 1 to 5
  rider: string;
  surface: 'Indoor arena' | 'Sand arena' | 'Grass' | 'Trail' | 'Field';
  date: string; // YYYY-MM-DD or ISO
  notes: string;
  rhythmScore?: number; // 1-10
}

export interface SensorReading {
  timestamp: string; // ISO
  timeLabel: string; // e.g. "14:00"
  temperatureC: number;
  temperatureF: number;
  humidityPercent: number;
  comfort: 'comfortable' | 'humid' | 'too_warm' | 'cool';
}

export interface SensorDevice {
  id: string;
  name: string;
  serialNumber: string;
  paired: boolean;
  isConnected: boolean;
  batteryPercent: number;
  firmwareVersion: string;
  rssi: number; // e.g. -58 dBm
  lastSyncTime: string;
  location: string;
}

export interface ProductPassport {
  id: string;
  serialNumber: string;
  name: string;
  model: string;
  category: 'blanket' | 'boots' | 'bridle' | 'sensor' | 'saddle_pad';
  heroImage: string;
  verifiedAuthentic: boolean;
  certHash: string;
  manufactureDate: string;
  origin: string;
  materials: string[];
  warrantyMonths: number;
  warrantyExpiryDate: string;
  co2FootprintKg: number;
  recycledPercent: number;
  careInstructions: string[];
  ownershipTimeline: {
    date: string;
    title: string;
    description: string;
    party: string;
  }[];
  linkedHorseId?: string;
  linkedHorseName?: string;
  purchaseDate: string;
}

export interface ActivityItem {
  id: string;
  type: 'climate' | 'task' | 'sync' | 'team' | 'product';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  targetRoute?: string;
}

export interface SyncAction {
  id: string;
  timestamp: string;
  type: 'create_task' | 'complete_task' | 'delete_task' | 'update_horse' | 'log_training' | 'register_product';
  entityName: string;
  payload: any;
}

export interface SyncConflict {
  id: string;
  entityType: 'task' | 'horse';
  entityId: string;
  entityTitle: string;
  localData: any;
  serverData: any;
  conflictField: string;
  timestamp: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'in_arena' | 'off_duty';
}
