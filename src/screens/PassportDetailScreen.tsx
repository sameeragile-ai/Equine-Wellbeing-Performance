import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Copy,
  Check,
  Clock,
  Sparkles,
  Leaf,
  Calendar,
  Layers,
  ChevronRight,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n/useT';
import { SafeImage } from '../components/SafeImage';
import { EquoraMonogram } from '../components/EquoraMonogram';

export const PassportDetailScreen: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { dict, t } = useT();

  const passports = useAppStore((state) => state.passports);
  const horses = useAppStore((state) => state.horses);

  const [copiedSerial, setCopiedSerial] = useState(false);

  const passport = passports.find((p) => p.id === productId || p.serialNumber === productId);

  if (!passport) {
    return (
      <div className="py-24 text-center px-6">
        <p className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Digital Passport Not Found
        </p>
        <p className="text-xs text-stone-500 mt-1">
          The requested product passport certificate could not be retrieved.
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="mt-4 px-4 py-2 bg-[#1A3326] text-white rounded-xl text-xs"
        >
          Return to Scanner
        </button>
      </div>
    );
  }

  const linkedHorse = horses.find((h) => h.id === passport.linkedHorseId);

  const handleCopySerial = () => {
    navigator.clipboard?.writeText(passport.serialNumber);
    setCopiedSerial(true);
    setTimeout(() => setCopiedSerial(false), 2000);
  };

  return (
    <div className="pb-12 -mt-13">
      {/* 1. Hero Product Photography */}
      <div className="relative h-64 w-full overflow-hidden">
        <SafeImage
          src={passport.heroImage}
          alt={passport.name}
          fallbackText={passport.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-black/40 dark:from-[#121614] dark:via-black/50" />

        {/* Certificate Badge Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-white mb-1.5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{dict.passport.verifiedSeal}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white drop-shadow-sm">
              {passport.name}
            </h1>
            <p className="text-xs text-stone-200 mt-0.5">
              {passport.model}
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
            <EquoraMonogram size={22} className="text-[#E8E2D5]" strokeWidth={2.4} />
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* 2. Cryptographic Passport Seal Box */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1A3326] via-[#244735] to-[#12231A] text-white shadow-xl shadow-[#1A3326]/15 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#C99668] font-semibold">
                {dict.passport.certHashLabel}
              </p>
              <p className="font-mono text-xs text-stone-200 mt-0.5">
                {passport.certHash}
              </p>
            </div>
            <FileCheck2 className="w-6 h-6 text-[#C99668]" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
            <div>
              <p className="text-[10px] text-stone-300 uppercase tracking-wider">Serial Number</p>
              <button
                onClick={handleCopySerial}
                className="flex items-center gap-1 font-mono font-medium text-white hover:text-[#C99668] mt-0.5"
              >
                <span>{passport.serialNumber}</span>
                {copiedSerial ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
              </button>
            </div>

            <div>
              <p className="text-[10px] text-stone-300 uppercase tracking-wider">Origin</p>
              <p className="font-medium text-white mt-0.5">{passport.origin}</p>
            </div>
          </div>
        </div>

        {/* 3. Assigned Equine Partner */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-[#B07A4A] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                {dict.passport.linkedHorse}
              </p>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate mt-0.5">
                {passport.linkedHorseName || 'Unassigned Stable Gear'}
              </p>
            </div>
          </div>

          {linkedHorse && (
            <button
              onClick={() => navigate(`/horses/${linkedHorse.id}`)}
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span>View Horse</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4. Warranty & Craftsmanship */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
              {dict.passport.warrantyLabel}
            </h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t(dict.passport.warrantyActive, { months: 22 })}</span>
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Guaranteed against material and seam defects through {passport.warrantyExpiryDate}. Includes complimentary annual stitching refurbishment at certified Nordic partners.
          </p>
        </div>

        {/* 5. Sustainability & Provenance */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668] flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>{dict.passport.sustainability}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60">
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">{dict.passport.carbonFootprint}</p>
              <p className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {passport.co2FootprintKg} kg CO₂e
              </p>
            </div>
            <div className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60">
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">{dict.passport.recycledContent}</p>
              <p className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {passport.recycledPercent}%
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-semibold text-stone-700 dark:text-stone-300">
              {dict.passport.materialsLabel}
            </p>
            <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400 list-disc list-inside">
              {passport.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6. Ownership & Verification Timeline */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
            {dict.passport.ownershipHistory}
          </h2>

          <div className="relative pl-5 space-y-4 border-l-2 border-stone-200 dark:border-stone-800 ml-1.5">
            {passport.ownershipTimeline.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#1A3326] dark:bg-[#B07A4A] border-2 border-white dark:border-stone-900" />
                <p className="text-[11px] font-medium text-stone-400 tabular-nums">
                  {item.date} · {item.party}
                </p>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                  {item.title}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Care & Maintenance Guide */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B07A4A] dark:text-[#C99668]">
            {dict.passport.careGuide}
          </h2>
          <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400 list-disc list-inside">
            {passport.careInstructions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
