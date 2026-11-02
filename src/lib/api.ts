/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Equora Client API Layer (Mocked Supabase / PostgREST architecture)
 * Simulates low-latency edge API calls with versioned REST endpoints.
 */

import { Horse, Task, TrainingLog, SensorReading, ProductPassport } from '../types';
import { initialHorses, initialTasks, initialTrainingLogs, generate7DaySensorReadings, initialPassports } from '../data/mockData';

const simulateDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const equoraApi = {
  // GET /v1/horses
  async getHorses(): Promise<Horse[]> {
    await simulateDelay(350);
    return initialHorses;
  },

  // GET /v1/horses/:id
  async getHorseById(id: string): Promise<Horse | undefined> {
    await simulateDelay(280);
    return initialHorses.find((h) => h.id === id);
  },

  // POST /v1/horses
  async createHorse(horse: Omit<Horse, 'id'>): Promise<Horse> {
    await simulateDelay(450);
    return { ...horse, id: `h-${Date.now()}` };
  },

  // GET /v1/tasks?date=YYYY-MM-DD
  async getTasks(): Promise<Task[]> {
    await simulateDelay(300);
    return initialTasks;
  },

  // PATCH /v1/tasks/:id
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await simulateDelay(250);
    const existing = initialTasks.find((t) => t.id === id);
    return { ...(existing || ({} as Task)), ...updates, id };
  },

  // GET /v1/training/logs
  async getTrainingLogs(horseId?: string): Promise<TrainingLog[]> {
    await simulateDelay(320);
    if (horseId) {
      return initialTrainingLogs.filter((l) => l.horseId === horseId);
    }
    return initialTrainingLogs;
  },

  // GET /v1/sensor/readings?window=7d
  async getSensorReadings(): Promise<SensorReading[]> {
    await simulateDelay(500);
    return generate7DaySensorReadings();
  },

  // GET /v1/passports/:serialNumber
  async getPassport(serialNumber: string): Promise<ProductPassport | undefined> {
    await simulateDelay(350);
    return initialPassports.find(
      (p) => p.serialNumber.toLowerCase() === serialNumber.toLowerCase() || p.id === serialNumber
    );
  },

  // POST /v1/sync/batch
  async syncBatch(actions: any[]): Promise<{ success: boolean; syncedCount: number; timestamp: string }> {
    await simulateDelay(700);
    return {
      success: true,
      syncedCount: actions.length,
      timestamp: new Date().toISOString()
    };
  }
};
