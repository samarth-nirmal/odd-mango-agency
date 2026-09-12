import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROADMAP_PHASES } from '../data/agencyData';
import { soundFx } from '../utils/audio';
import { CheckCircle2, Clock, Flag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface RoadmapViewProps {
  onOpenContact: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onOpenContact }) => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const [isRushMode, setIsRushMode] = useState<boolean>(false);

  const selectedPhase = ROADMAP_PHASES[selectedPhaseIdx];

  const handleSelectPhase = (idx: number) => {
    soundFx.playClick(400 + idx * 50);
    setSelectedPhaseIdx(idx);
  };

  const toggleRushMode = () => {
    soundFx.playThump();
    setIsRushMode(!isRushMode);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Panel */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-syne text-2xl sm:text-4xl font-black text-black">
            HOW AN IDEA TRAVELS FROM BRIEF TO GLOBAL CAMPAIGN
          </h1>
        </div>

        {/* Rush Mode Switcher */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-xl border-2 border-black font-mono-custom text-xs shrink-0 self-start md:self-auto">
          <button
            onClick={() => { if (isRushMode) toggleRushMode(); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              !isRushMode ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            STANDARD 10-WK
          </button>
          <button
            onClick={() => { if (!isRushMode) toggleRushMode(); }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer ${
              isRushMode ? 'bg-[#FF4400] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>EXPEDITED RUSH (4-WK)</span>
          </button>
        </div>
      </section>

      {/* Main Interactive Stage Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Visual Interactive Board & Milestones */}
        <div className="lg:col-span-6 bg-[#080808] border-2 border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-brutal-xl text-white space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 font-mono-custom text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D084] animate-pulse"></span>
              <span className="text-[#FFDE99] font-bold">MISSION PIPELINE // ACTIVE PROGRESSION</span>
            </div>
            <span className="text-neutral-400">STAGE {selectedPhaseIdx + 1} OF 5</span>
          </div>

          {/* S-Curve Timeline Graphic Representation */}
          <div className="relative py-4 space-y-6">
            {ROADMAP_PHASES.map((phase, idx) => {
              const isSelected = selectedPhaseIdx === idx;
              const isPassed = selectedPhaseIdx > idx;

              return (
                <div
                  key={phase.phaseNumber}
                  onClick={() => handleSelectPhase(idx)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-[#FF4400] shadow-brutal-sm'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono-custom text-xs font-black shrink-0 transition-transform ${
                        isSelected
                          ? 'scale-110 border-white text-black'
                          : isPassed
                          ? 'border-[#00D084] bg-[#00D084]/20 text-[#00D084]'
                          : 'border-neutral-700 bg-neutral-900 text-neutral-400'
                      }`}
                      style={{
                        backgroundColor: isSelected ? phase.accentColor : undefined,
                      }}
                    >
                      {phase.phaseNumber}
                    </div>
                    {idx < ROADMAP_PHASES.length - 1 && (
                      <div
                        className={`w-0.5 h-10 my-1 ${
                          isPassed ? 'bg-[#00D084]' : 'bg-neutral-800'
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between font-mono-custom text-xs">
                      <span className="font-bold tracking-wider" style={{ color: phase.accentColor }}>
                        PHASE {phase.phaseNumber}
                      </span>
                      <span className="text-neutral-400 text-[11px]">
                        {isRushMode ? `Wk ${Math.ceil((idx + 1) * 0.8)}` : phase.duration}
                      </span>
                    </div>

                    <h4 className="font-space text-lg font-black text-white">
                      {phase.title}
                    </h4>

                    <p className="font-sans-custom text-xs text-neutral-400 line-clamp-2">
                      {phase.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Flag */}
          <div className="p-3 bg-[#00D084]/15 border border-[#00D084] rounded-xl flex items-center justify-between font-mono-custom text-xs text-[#00D084]">
            <span className="flex items-center gap-2 font-bold">
              <Flag className="w-4 h-4" />
              <span>TERMINAL GATEWAY: WORLDWIDE MULTI-CHANNEL LAUNCH</span>
            </span>
            <span className="font-extrabold">100% WRAPPED</span>
          </div>
        </div>

        {/* Right Side: Detailed Phase Inspector Card */}
        <div className="lg:col-span-6 bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase.phaseNumber}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Active Phase Badge & Title */}
              <div className="space-y-3 pb-4 border-b-2 border-black">
                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 font-mono-custom text-xs">
                  <span
                    className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-md font-black text-[11px] sm:text-xs border-2 border-black shadow-[2px_2px_0px_#000000] whitespace-nowrap"
                    style={{ backgroundColor: selectedPhase.accentColor, color: '#000' }}
                  >
                    PHASE {selectedPhase.phaseNumber} INSPECTION
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-neutral-700 text-[11px] sm:text-xs whitespace-nowrap shrink-0 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                    <span>TIMEFRAME: <span className="text-black font-extrabold">{isRushMode ? '2 Wks (Rush)' : selectedPhase.duration}</span></span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <h3 className="font-syne text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
                    {selectedPhase.title}
                  </h3>
                  <p className="font-mono-custom text-[11px] sm:text-xs text-neutral-500 font-bold uppercase tracking-wider">
                    {selectedPhase.subtitle}
                  </p>
                </div>
              </div>

              {/* Summary Narrative */}
              <p className="font-sans-custom text-base text-neutral-800 font-medium leading-relaxed">
                {selectedPhase.summary}
              </p>

              {/* Key Actions List */}
              <div className="space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-300">
                <div className="font-mono-custom text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  // KEY EXECUTION RIGORS
                </div>
                <ul className="space-y-2">
                  {selectedPhase.keyActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-sans-custom text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Deliverables Artifacts */}
              <div className="space-y-3">
                <div className="font-mono-custom text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  // CLIENT DELIVERABLES PRODUCED
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPhase.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border-2 border-black rounded-lg text-xs font-mono-custom font-bold text-neutral-900 shadow-brutal-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Sign-off Gate */}
              <div className="p-4 bg-[#FFDE99] border-2 border-black rounded-xl space-y-1">
                <div className="font-mono-custom text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>MANDATORY CLIENT APPROVAL GATEWAY</span>
                </div>
                <p className="font-sans-custom text-sm font-bold text-black">
                  {selectedPhase.clientCheckGate}
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
                  className="w-full py-3.5 bg-[#FF4400] text-white border-2 border-black rounded-xl font-mono-custom font-extrabold text-sm hover:bg-black transition-colors shadow-brutal cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>LOCK THIS PRODUCTION PIPELINE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
