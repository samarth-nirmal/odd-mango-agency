import React, { useState, useMemo } from 'react';
import { ESTIMATOR_ITEMS } from '../data/agencyData';
import { soundFx } from '../utils/audio';
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Users, ShieldAlert, DollarSign, RefreshCw } from 'lucide-react';
import { CountUp } from './CountUp';

interface ScopeEstimatorViewProps {
  onTransferToContact: (selectedServicesSummary: string, estimatedPrice: number) => void;
}

export const ScopeEstimatorView: React.FC<ScopeEstimatorViewProps> = ({ onTransferToContact }) => {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'd-brand-id',
    'd-commercial-film',
  ]);
  const [isExpedited, setIsExpedited] = useState<boolean>(false);
  const [includeOriginalScore, setIncludeOriginalScore] = useState<boolean>(true);
  const [includeBTSPhotos, setIncludeBTSPhotos] = useState<boolean>(false);

  const toggleItem = (id: string) => {
    soundFx.playClick(460);
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    let subtotal = 0;
    let maxDays = 14;

    selectedItemIds.forEach((id) => {
      const item = ESTIMATOR_ITEMS.find((i) => i.id === id);
      if (item) {
        subtotal += item.basePrice;
        if (item.baseDays > maxDays) maxDays = item.baseDays;
      }
    });

    if (includeOriginalScore) subtotal += 1800;
    if (includeBTSPhotos) subtotal += 1200;

    const rushMultiplier = isExpedited ? 1.25 : 1.0;
    const finalTotal = Math.round(subtotal * rushMultiplier);
    const estimatedWeeks = isExpedited ? Math.ceil(maxDays / 7 * 0.6) : Math.ceil(maxDays / 7);

    return {
      subtotal,
      finalTotal,
      estimatedWeeks,
      selectedCount: selectedItemIds.length,
    };
  }, [selectedItemIds, isExpedited, includeOriginalScore, includeBTSPhotos]);

  const handleExportBrief = () => {
    soundFx.playSuccess();
    const itemNames = selectedItemIds
      .map((id) => ESTIMATOR_ITEMS.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    const addOns = [
      includeOriginalScore ? 'Original Score' : '',
      includeBTSPhotos ? 'Behind-the-scenes Photography' : '',
      isExpedited ? 'Expedited 4-Wk Sprint' : 'Standard Delivery',
    ].filter(Boolean).join(' + ');

    const summary = `${itemNames} | Add-ons: [${addOns}]`;
    onTransferToContact(summary, calculation.finalTotal);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0 animate-in fade-in duration-300">
      {/* Mobile Floating Sticky Action Bar */}
      <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden bg-white/95 backdrop-blur-md border-2 border-black rounded-xl p-2.5 xs:p-3 shadow-brutal flex items-center justify-between gap-2.5">
        <div className="min-w-0 pr-1">
          <div className="font-mono-custom text-[9px] xs:text-[10px] text-neutral-500 font-bold uppercase tracking-wider truncate">
            TOTAL ({calculation.selectedCount} ITEMS)
          </div>
          <div className="font-syne text-lg xs:text-xl font-black text-black leading-none mt-0.5">
            ${calculation.finalTotal.toLocaleString()}
          </div>
        </div>
        <button
          onClick={handleExportBrief}
          className="px-3 py-2 bg-[#FF4400] text-white border-2 border-black rounded-lg font-mono-custom font-extrabold text-xs shadow-brutal-sm flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
        >
          <span>TRANSFER</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header Banner */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-syne text-2xl sm:text-4xl font-black text-black">
            CALCULATE ESTIMATED PROJECT SCOPE & TIMELINE
          </h1>
          <p className="font-sans-custom text-neutral-600 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
            Select the components your brand requires. No hidden retainers, no opaque agency markups. Configure deliverables and receive an instant estimate.
          </p>
        </div>

        <button
          onClick={() => {
            soundFx.playClick(350);
            setSelectedItemIds(['d-brand-id', 'd-commercial-film']);
            setIsExpedited(false);
            setIncludeOriginalScore(true);
            setIncludeBTSPhotos(false);
          }}
          className="px-3.5 py-2 bg-neutral-100 border-2 border-black rounded-xl font-mono-custom text-xs font-bold hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RESET DEFAULTS</span>
        </button>
      </section>

      {/* Main Scoping Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Deliverables List (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="font-mono-custom text-xs font-bold text-neutral-500 uppercase tracking-wider">
            STEP 1: SELECT PRIMARY COMMISSION MODULES
          </div>

          <div className="space-y-3">
            {ESTIMATOR_ITEMS.map((item) => {
              const isChecked = selectedItemIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 sm:gap-4 ${
                    isChecked
                      ? 'bg-white border-black shadow-brutal ring-2 ring-[#FFDE99]'
                      : 'bg-white/70 border-neutral-300 hover:border-black opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 border-black flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked ? 'bg-black text-white' : 'bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 text-[#00D084]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono-custom text-[10px] font-bold text-neutral-500 uppercase">
                        {item.category}
                      </div>
                      <h4 className="font-space text-base sm:text-lg font-black text-black">
                        {item.name}
                      </h4>
                      <p className="font-sans-custom text-xs text-neutral-600 max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono-custom text-sm sm:text-base font-black text-black">
                      ${item.basePrice.toLocaleString()}
                    </div>
                    <div className="font-mono-custom text-[11px] text-neutral-500">
                      ~{Math.ceil(item.baseDays / 7)} WEEKS
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons & Velocity Modifiers */}
          <div className="bg-neutral-50 border-2 border-black rounded-2xl p-5 space-y-4">
            <div className="font-mono-custom text-xs font-bold text-neutral-600 uppercase tracking-wider">
              STEP 2: OPTIONAL ADD-ONS & VELOCITY MODIFIERS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-custom text-xs">
              <label
                onClick={() => { soundFx.playClick(500); setIncludeOriginalScore(!includeOriginalScore); }}
                className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-colors ${
                  includeOriginalScore ? 'bg-white border-black shadow-brutal-sm' : 'border-neutral-300 bg-white/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeOriginalScore}
                    onChange={() => {}}
                    className="accent-[#FF4400]"
                  />
                  <div>
                    <span className="font-bold text-black block">ORIGINAL SOUND SCORE</span>
                    <span className="text-[10px] text-neutral-500">Custom modular audio track</span>
                  </div>
                </div>
                <span className="font-bold text-black">+$1,800</span>
              </label>

              <label
                onClick={() => { soundFx.playClick(500); setIncludeBTSPhotos(!includeBTSPhotos); }}
                className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-colors ${
                  includeBTSPhotos ? 'bg-white border-black shadow-brutal-sm' : 'border-neutral-300 bg-white/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeBTSPhotos}
                    onChange={() => {}}
                    className="accent-[#FF4400]"
                  />
                  <div>
                    <span className="font-bold text-black block">ON-SET BTS 35MM PHOTO PACK</span>
                    <span className="text-[10px] text-neutral-500">100+ analog press shots</span>
                  </div>
                </div>
                <span className="font-bold text-black">+$1,200</span>
              </label>
            </div>

            {/* Rush Toggle */}
            <div
              onClick={() => { soundFx.playThump(); setIsExpedited(!isExpedited); }}
              className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                isExpedited ? 'bg-[#FF4400] text-white border-black shadow-brutal' : 'bg-white border-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isExpedited ? 'bg-white text-black' : 'border-neutral-400'}`}>
                  {isExpedited && <Check className="w-3.5 h-3.5 text-[#FF4400]" />}
                </div>
                <div>
                  <div className="font-mono-custom text-xs font-black tracking-wide">
                    EXPEDITED PRIORITY SPRINT (4-WEEK RAPID LAUNCH)
                  </div>
                  <div className={`text-xs ${isExpedited ? 'text-white/80' : 'text-neutral-500'}`}>
                    Dedicated round-the-clock dual crew allocation + daily build reviews (+25% rush premium)
                  </div>
                </div>
              </div>
              <span className="font-mono-custom text-xs font-bold">+25%</span>
            </div>
          </div>
        </div>

        {/* Live Estimate Receipt Card (4 columns) */}
        <div className="lg:col-span-4 bg-white border-3 border-black rounded-2xl p-6 shadow-brutal-xl sticky top-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black font-mono-custom text-xs">
            <span className="font-black text-black">ESTIMATE SUMMARY</span>
            <span className="bg-neutral-100 border border-black text-black px-2 py-0.5 rounded font-bold text-[10px]">
              CALCULATED
            </span>
          </div>

          <div className="space-y-3">
            <div className="font-mono-custom text-xs text-neutral-500">PROJECTED CAPITAL COMMITMENT</div>
            <div className="font-syne text-4xl sm:text-5xl font-black text-black tracking-tight">
              <CountUp value={calculation.finalTotal} prefix="$" duration={600} />
            </div>
            <div className="font-mono-custom text-xs text-neutral-600">
              *All-inclusive production, staging, post-production & copyright licenses.
            </div>
          </div>

          <div className="space-y-3 border-t-2 border-neutral-200 pt-4 font-mono-custom text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">SELECTED MODULES:</span>
              <span className="font-bold text-black">
                <CountUp value={calculation.selectedCount} duration={400} /> Services
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">ESTIMATED CYCLE:</span>
              <span className="font-bold text-black flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FF4400]" />
                ~<CountUp value={calculation.estimatedWeeks} duration={400} /> Weeks to Market
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">CREW DEDICATION:</span>
              <span className="font-bold text-black flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#00D084]" />
                Lead Dir + 4 Specialists
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#FFDE99] border-2 border-black rounded-xl text-black font-mono-custom text-xs space-y-1">
            <div className="font-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ODD MANGO COMMITMENT</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every production carries our strict zero-template guarantee and fixed-quote assurance.
            </p>
          </div>

          <button
            onClick={handleExportBrief}
            className="w-full py-4 bg-[#FF4400] text-white border-2 border-black rounded-xl font-mono-custom font-extrabold text-sm hover:bg-black transition-colors shadow-brutal cursor-pointer flex items-center justify-center gap-2"
          >
            <span>LOCK ESTIMATE & START INTAKE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
