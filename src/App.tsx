import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AppLayout } from './components/AppLayout';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { HorsesScreen } from './screens/HorsesScreen';
import { HorseDetailScreen } from './screens/HorseDetailScreen';
import { TasksScreen } from './screens/TasksScreen';
import { TrainingScreen } from './screens/TrainingScreen';
import { SensorScreen } from './screens/SensorScreen';
import { ScanScreen } from './screens/ScanScreen';
import { PassportDetailScreen } from './screens/PassportDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="horses" element={<HorsesScreen />} />
            <Route path="horses/:id" element={<HorseDetailScreen />} />
            <Route path="tasks" element={<TasksScreen />} />
            <Route path="training" element={<TrainingScreen />} />
            <Route path="sensor" element={<SensorScreen />} />
            <Route path="scan" element={<ScanScreen />} />
            <Route path="passport/:productId" element={<PassportDetailScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
