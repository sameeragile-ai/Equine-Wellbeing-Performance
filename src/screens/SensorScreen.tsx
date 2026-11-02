import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Thermometer,
  Droplets,
  Battery,
  Wifi,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  QrCode,
  Radio,
  Sliders,
  Shield,
  ZapOff,
  RotateCcw
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';

export const SensorScreen: React.FC = () => {
  const { dict, t } = useT();

  const sensorDevice = useAppStore((state) => state.sensorDevice);
  const sensorReadings = useAppStore((state) => state.sensorReadings);
  const settings = useAppStore((state) => state.settings);
  const pairSensor = useAppStore((state) => state.pairSensor);
  const disconnectSensor = useAppStore((state) => state.disconnectSensor);
  const reconnectSensor = useAppStore((state) => state.reconnectSensor);
  const readFlashMemory = useAppStore((state) => state.readFlashMemory);
  const isSyncing = useAppStore((state) => state.isSyncing);

  const [timeWindow, setTimeWindow] = useState<'24h' | '7d'>('24h');
  const [pairingModalOpen, setPairingModalOpen] = useState(false);
  const [pairingStep, setPairingStep] = useState<1 | 2 | 3 | 4 | 'failed'>(1);
  const [simulatedDropBanner, setSimulatedDropBanner] = useState(false);

  // Latest telemetry reading
  const latest = sensorReadings[sensorReadings.length - 1] || {
    temperatureC: 18.2,
    temperatureF: 64.8,
    humidityPercent: 64,
    comfort: 'comfortable' as const
  };

  const isImperial = settings.units === 'imperial';
  const displayTemp = isImperial ? `${latest.temperatureF}°F` : `${latest.temperatureC}°C`;

  // Prepare chart data based on 24h or 7d window
  const rawData = timeWindow === '24h' ? sensorReadings.slice(-96) : sensorReadings; // 96 = 24h of 15m intervals
  const chartData = rawData.map((r, i) => ({
    label: timeWindow === '24h' ? r.timeLabel : `Day ${Math.floor(i / 96) + 1}`,
    temp: isImperial ? r.temperatureF : r.temperatureC,
    humidity: r.humidityPercent
  }));

  // Handle simulated drop and auto-reconnect
  const triggerDisconnectSim = () => {
    disconnectSensor();
    setSimulatedDropBanner(true);

    setTimeout(() => {
      reconnectSensor();
      setTimeout(() => {
        setSimulatedDropBanner(false);
      }, 2500);
    }, 3000);
  };

  // Pairing Flow Automation
  const startPairingFlow = () => {
    setPairingStep(1);
    setPairingModalOpen(true);
  };

  const advanceFromScan = () => {
    setPairingStep(2); // Searching
    setTimeout(() => {
      setPairingStep(3); // Discovered
    }, 1500);
  };

  const finalizeConnection = () => {
    setPairingStep(4); // Connecting
    setTimeout(() => {
      pairSensor({
        paired: true,
        isConnected: true,
        batteryPercent: 96,
        lastSyncTime: new Date().toISOString()
      });
      setPairingModalOpen(false);
    }, 1800);
  };

  return (
    <div className="px-4 pt-1 pb-6 space-y-4">
      {/* Auto-reconnect banner */}
      <AnimatePresence>
        {simulatedDropBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-2xl flex items-center gap-2.5 text-xs font-medium ${
              sensorDevice.isConnected
                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
            }`}
          >
            {sensorDevice.isConnected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict.sensor.reconnected}</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                <span>{dict.sensor.reconnecting}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sensor Not Paired State */}
      {!sensorDevice.paired ? (
        <div className="py-16 px-6 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#1A3326]/10 dark:bg-[#B07A4A]/15 text-[#1A3326] dark:text-[#B07A4A] flex items-center justify-center mx-auto">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
              {dict.sensor.notPairedTitle}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
              {dict.sensor.notPairedDesc}
            </p>
          </div>
          <button
            onClick={startPairingFlow}
            className="h-12 px-6 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-xs rounded-2xl inline-flex items-center gap-2 active:scale-95 transition-transform shadow-md"
          >
            <QrCode className="w-4 h-4" />
            <span>{dict.sensor.startPairing}</span>
          </button>
        </div>
      ) : (
        <>
          {/* 1. Device Hardware Status Strip */}
          <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                  sensorDevice.isConnected
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                }`}>
                  <Radio className={`w-4.5 h-4.5 ${sensorDevice.isConnected ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {sensorDevice.name}
                  </h1>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {sensorDevice.serialNumber} · {sensorDevice.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className={`w-2 h-2 rounded-full ${sensorDevice.isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-stone-600 dark:text-stone-300 font-medium">
                  {sensorDevice.isConnected ? 'Connected' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Hardware Metrics: Battery, Signal, Firmware */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-center">
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">{dict.sensor.battery}</p>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mt-0.5 flex items-center justify-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{sensorDevice.batteryPercent}%</span>
                </p>
              </div>
              <div className="border-x border-stone-100 dark:border-stone-800">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">{dict.sensor.signal}</p>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mt-0.5 tabular-nums">
                  {sensorDevice.rssi} dBm
                </p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">{dict.sensor.firmware}</p>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mt-0.5 font-mono text-[11px]">
                  {sensorDevice.firmwareVersion.split('-')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Big Live Stall Telemetry Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1A3326] via-[#214332] to-[#12241B] text-white shadow-xl shadow-[#1A3326]/15 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C99668]">
                {dict.sensor.liveReadings}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-emerald-300">
                {dict.common.comfortStatus[latest.comfort]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-stone-300 font-medium flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#C99668]" />
                  <span>Temperature</span>
                </p>
                <p className="text-4xl font-serif tracking-tight text-white mt-1 tabular-nums">
                  {displayTemp}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-stone-300 font-medium flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>Humidity</span>
                </p>
                <p className="text-4xl font-serif tracking-tight text-white mt-1 tabular-nums">
                  {latest.humidityPercent}%
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
              <span className="text-[11px]">{dict.sensor.comfortRangeNotice}</span>
            </div>
          </div>

          {/* 3. Flash Memory Sync CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => readFlashMemory()}
              disabled={isSyncing}
              className="flex-1 h-11 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-medium text-stone-800 dark:text-stone-200 active:scale-98 transition-transform disabled:opacity-60 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 text-[#B07A4A] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? dict.sensor.syncingDeviceData : dict.sensor.readStoredData}</span>
            </button>

            <button
              onClick={triggerDisconnectSim}
              className="min-w-[44px] h-11 px-3 bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-2xl flex items-center justify-center gap-1 text-xs font-medium active:scale-95 transition-transform"
              title={dict.sensor.disconnectSim}
            >
              <ZapOff className="w-4 h-4" />
              <span className="hidden sm:inline">Drop Sim</span>
            </button>
          </div>

          {/* 4. Climate Trends Interactive Recharts */}
          <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
                {dict.sensor.chartTitle}
              </h2>

              {/* 24h / 7d Toggle */}
              <div className="flex items-center gap-1 p-0.5 bg-stone-100 dark:bg-stone-800 rounded-xl">
                <button
                  onClick={() => setTimeWindow('24h')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    timeWindow === '24h'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {dict.sensor.view24h}
                </button>
                <button
                  onClick={() => setTimeWindow('7d')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    timeWindow === '7d'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {dict.sensor.view7d}
                </button>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="label" stroke="#888" fontSize={9} tickLine={false} interval={timeWindow === '24h' ? 16 : 96} />
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
                  <Line type="monotone" dataKey="temp" stroke="#B07A4A" strokeWidth={2} dot={false} name="Temperature" />
                  <Line type="monotone" dataKey="humidity" stroke="#1A3326" strokeWidth={2} dot={false} name="Humidity %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 pt-1 border-t border-stone-100 dark:border-stone-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B07A4A]" /> Temperature ({isImperial ? '°F' : '°C'})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A3326] dark:bg-emerald-500" /> Humidity (%)
              </span>
            </div>
          </div>
        </>
      )}

      {/* 5. Pairing Modal Dialog */}
      {pairingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-[380px] bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xl text-center space-y-4">
            
            {/* Step 1: Scan QR */}
            {pairingStep === 1 && (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 text-[#1A3326] dark:text-[#B07A4A] flex items-center justify-center mx-auto">
                  <QrCode className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {dict.sensor.pairingSteps.step1Title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {dict.sensor.pairingSteps.step1Desc}
                  </p>
                </div>
                <button
                  onClick={advanceFromScan}
                  className="w-full h-11 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-xl text-xs font-medium active:scale-98"
                >
                  Simulate QR Scan
                </button>
              </div>
            )}

            {/* Step 2: Searching */}
            {pairingStep === 2 && (
              <div className="space-y-4 py-4">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#B07A4A]/20 animate-ping" />
                  <div className="w-12 h-12 rounded-full bg-[#B07A4A] text-stone-950 flex items-center justify-center relative z-10 shadow-lg">
                    <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {dict.sensor.pairingSteps.step2Title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {dict.sensor.pairingSteps.step2Desc}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Discovered */}
            {pairingStep === 3 && (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {dict.sensor.pairingSteps.step3Title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {dict.sensor.pairingSteps.step3Desc}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    RSSI: -58 dBm (Strong proximity)
                  </p>
                </div>
                <button
                  onClick={finalizeConnection}
                  className="w-full h-11 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-xl text-xs font-medium active:scale-98"
                >
                  Connect Device
                </button>
              </div>
            )}

            {/* Step 4: Connecting Progress */}
            {pairingStep === 4 && (
              <div className="space-y-4 py-4">
                <RefreshCw className="w-10 h-10 animate-spin text-[#B07A4A] mx-auto" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {dict.sensor.pairingSteps.step4Title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Negotiating BLE GATT encryption profile...
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setPairingModalOpen(false)}
              className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 pt-2 block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
