import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  QrCode,
  Flashlight,
  Camera,
  ShieldCheck,
  Check,
  ChevronRight,
  Layers,
  X,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { ProductPassport } from '../types';
import { SafeImage } from '../components/SafeImage';

export const ScanScreen: React.FC = () => {
  const { dict } = useT();
  const navigate = useNavigate();

  const horses = useAppStore((state) => state.horses);
  const passports = useAppStore((state) => state.passports);
  const registerProduct = useAppStore((state) => state.registerProduct);

  const [torchOn, setTorchOn] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ProductPassport | null>(null);
  const [selectedHorseId, setSelectedHorseId] = useState(horses[0]?.id || '');
  const [successCelebration, setSuccessCelebration] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize camera preview if available
  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          setCameraActive(true);
        }
      })
      .catch(() => {
        // Fallback gracefully without throwing
        setCameraActive(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate scan handler
  const handleSimulateScan = () => {
    // Generate a newly scanned Equora gear item
    const mockNewPassport: ProductPassport = {
      id: `prod-nordic-${Date.now()}`,
      serialNumber: `EQ-RUG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'Equora Nordic Wool Stable Rug',
      model: 'VinterVarm 400g Pure Wool',
      category: 'blanket',
      heroImage: '/src/assets/images/product_turnout_blanket_1793636876492.jpg',
      verifiedAuthentic: true,
      certHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      manufactureDate: '2026-09-15',
      origin: 'Røros, Norway',
      materials: [
        '100% Pure Virgin Norwegian Wool fleece',
        'Organic cotton anti-rub shoulder lining',
        'Hand-forged brass belly surcingles'
      ],
      warrantyMonths: 36,
      warrantyExpiryDate: '2029-09-15',
      co2FootprintKg: 3.8,
      recycledPercent: 92,
      careInstructions: [
        'Brush dried mud with stiff dandy brush',
        'Spot clean with mild wool wash',
        'Dry naturally in breezy shade'
      ],
      ownershipTimeline: [
        {
          date: '2026-09-15',
          title: 'Woven in Røros',
          description: 'Loomed using native Norwegian sheep wool fleece.',
          party: 'Equora Wool Atelier'
        },
        {
          date: '2026-10-01',
          title: 'Authenticity Seal Attached',
          description: 'NFC chip embedded in leather patch.',
          party: 'Equora Standards'
        }
      ],
      purchaseDate: new Date().toISOString().split('T')[0]
    };

    setScannedProduct(mockNewPassport);
  };

  const handleConfirmRegistration = () => {
    if (!scannedProduct) return;

    const assignedHorse = horses.find((h) => h.id === selectedHorseId) || horses[0];

    const completedPassport: ProductPassport = {
      ...scannedProduct,
      linkedHorseId: assignedHorse.id,
      linkedHorseName: assignedHorse.name,
      ownershipTimeline: [
        ...scannedProduct.ownershipTimeline,
        {
          date: new Date().toISOString().split('T')[0],
          title: 'Registered to Nordlys Stables',
          description: `Assigned to ${assignedHorse.name} for winter season comfort.`,
          party: 'Karin Lindqvist'
        }
      ]
    };

    registerProduct(completedPassport);
    setSuccessCelebration(true);

    setTimeout(() => {
      setSuccessCelebration(false);
      setScannedProduct(null);
      navigate(`/passport/${completedPassport.id}`);
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-between -mt-13 pt-13 px-4 pb-6">
      {/* 1. Camera Viewfinder Area */}
      <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden bg-stone-900 border border-white/20 shadow-2xl flex items-center justify-center">
        {/* Real video if camera granted */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-90' : 'hidden'}`}
        />

        {/* Viewfinder background when camera inactive */}
        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#14261D] to-[#0A120E] text-stone-300">
            <Camera className="w-12 h-12 text-[#B07A4A] mb-3 opacity-60" />
            <p className="text-xs font-medium text-stone-200">
              Camera Viewfinder
            </p>
            <p className="text-[11px] text-stone-400 mt-1 max-w-[220px]">
              {dict.passport.cameraPermissionNotice}
            </p>
          </div>
        )}

        {/* Viewfinder Reticle Corners */}
        <div className="relative w-64 h-64 border-2 border-white/30 rounded-2xl flex items-center justify-center">
          {/* Animated Laser Scanning Line */}
          <motion.div
            animate={{ y: [-110, 110] }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2,
              ease: 'easeInOut'
            }}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#C99668] to-transparent shadow-[0_0_12px_#C99668]"
          />

          {/* Reticle Corner Highlights */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C99668] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C99668] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C99668] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C99668] rounded-br-lg" />
        </div>

        {/* Torch Toggle Button */}
        <button
          onClick={() => setTorchOn(!torchOn)}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border border-white/20 text-white active:scale-95 transition-transform ${
            torchOn ? 'bg-amber-400 text-stone-950' : 'bg-black/40 text-white'
          }`}
          aria-label="Toggle flashlight"
        >
          <Flashlight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Primary Scan Actions */}
      <div className="mt-6 space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleSimulateScan}
          className="w-full h-13 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 rounded-2xl font-medium text-xs flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-lg shadow-[#1A3326]/20"
        >
          <QrCode className="w-4 h-4" />
          <span>{dict.passport.simulateScan}</span>
        </button>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center">
          {dict.passport.scanDesc}
        </p>
      </div>

      {/* 3. Existing Passports Quick Drawer */}
      <div className="mt-8 space-y-2.5 max-w-sm mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Registered Stable Passports
          </span>
          <span className="text-[11px] text-stone-400 tabular-nums">
            {passports.length} items
          </span>
        </div>

        <div className="space-y-2">
          {passports.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/passport/${p.id}`)}
              className="w-full text-left p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3 shadow-sm active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3 min-w-0">
                <SafeImage
                  src={p.heroImage}
                  alt={p.name}
                  fallbackText={p.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">
                    {p.serialNumber} · {p.linkedHorseName || 'Unassigned'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Registration Confirmation Bottom Sheet */}
      {scannedProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="w-full max-w-[440px] bg-stone-50 dark:bg-[#151c17] rounded-t-[32px] p-5 border-t border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] flex flex-col pb-safe"
          >
            <div className="w-10 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0" />

            {successCelebration ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Passport Registered
                </h3>
                <p className="text-xs text-stone-500">
                  Opening digital certificate...
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                    {dict.passport.registerSheet.title}
                  </h3>
                  <button
                    onClick={() => setScannedProduct(null)}
                    className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4 space-y-4 flex-1 overflow-y-auto">
                  {/* Product Preview Card */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                    <SafeImage
                      src={scannedProduct.heroImage}
                      alt={scannedProduct.name}
                      fallbackText={scannedProduct.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Authentic</span>
                      </span>
                      <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {scannedProduct.name}
                      </p>
                      <p className="text-[10px] text-stone-500 font-mono">
                        {scannedProduct.serialNumber}
                      </p>
                    </div>
                  </div>

                  {/* Assign to Horse */}
                  <div>
                    <label className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block mb-1">
                      {dict.passport.registerSheet.assignToHorse}
                    </label>
                    <select
                      value={selectedHorseId}
                      onChange={(e) => setSelectedHorseId(e.target.value)}
                      className="w-full h-11 px-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#B07A4A]"
                    >
                      {horses.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.breed})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Materials & Sustainability Highlights */}
                  <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 text-xs space-y-1">
                    <p className="font-semibold text-stone-800 dark:text-stone-200">
                      Provenance: {scannedProduct.origin}
                    </p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                      CO₂e Footprint: {scannedProduct.co2FootprintKg} kg · {scannedProduct.recycledPercent}% recycled content
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={handleConfirmRegistration}
                    className="w-full h-12 bg-[#1A3326] text-white dark:bg-[#B07A4A] dark:text-stone-950 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{dict.passport.registerSheet.confirmRegister}</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
