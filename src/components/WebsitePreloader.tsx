import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Sparkles, ArrowRight, Terminal, Layers, Film, Compass, CheckCircle, Volume2 } from 'lucide-react';

interface WebsitePreloaderProps {
  onComplete: () => void;
}

const LOADING_MILESTONES = [
  { threshold: 18, label: '01 // INITIALIZING STUDIO KERNEL', shortLabel: '01 // SYSTEM BOOT', icon: Terminal, color: '#FF4400' },
  { threshold: 42, label: '02 // COMPILING 3D SERVICE MATRICES', shortLabel: '02 // 3D MATRICES', icon: Layers, color: '#38BDF8' },
  { threshold: 70, label: '03 // CACHING CINEMATIC FILM REELS', shortLabel: '03 // CINEMA REELS', icon: Film, color: '#FF6B9E' },
  { threshold: 90, label: '04 // INGESTING BRAND ARCHIVE ASSETS', shortLabel: '04 // BRAND ARCHIVE', icon: Compass, color: '#00D084' },
  { threshold: 100, label: '05 // ODD MANGO HUB READY // LAUNCH', shortLabel: '05 // STUDIO READY', icon: CheckCircle, color: '#FFDE99' },
];

export const WebsitePreloader: React.FC<WebsitePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const lastSoundPercent = useRef(0);
  const hasFinished = useRef(false);

  const finishLoading = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    setProgress(100);
    setIsCompleted(true);
    soundFx.playSuccess();
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  // Keyboard shortcuts (desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        finishLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Progressive timer animation (slightly snappier duration on mobile)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const startTime = performance.now();
    const duration = isMobile ? 1750 : 2100;

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const linearRatio = Math.min(elapsed / duration, 1);

      // Nonlinear organic easing: starts brisk, pauses slightly in middle, then glides to 100%
      let easedRatio: number;
      if (linearRatio < 0.3) {
        easedRatio = (linearRatio / 0.3) * 0.32;
      } else if (linearRatio < 0.6) {
        easedRatio = 0.32 + ((linearRatio - 0.3) / 0.3) * 0.35;
      } else if (linearRatio < 0.88) {
        easedRatio = 0.67 + ((linearRatio - 0.6) / 0.28) * 0.26;
      } else {
        easedRatio = 0.93 + ((linearRatio - 0.88) / 0.12) * 0.07;
      }

      const currentPercent = Math.min(100, Math.round(easedRatio * 100));
      setProgress(currentPercent);

      // Update milestone step index
      const nextIndex = LOADING_MILESTONES.findIndex((m) => currentPercent <= m.threshold);
      if (nextIndex !== -1) {
        setActiveStepIndex(nextIndex);
      } else {
        setActiveStepIndex(LOADING_MILESTONES.length - 1);
      }

      // Subtle audio click feedback on step shifts
      if (currentPercent - lastSoundPercent.current >= 24 && currentPercent < 95) {
        lastSoundPercent.current = currentPercent;
        soundFx.playClick(400 + currentPercent * 4, 0.03);
      }

      if (linearRatio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        finishLoading();
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const currentMilestone = LOADING_MILESTONES[activeStepIndex] || LOADING_MILESTONES[0];
  const MilestoneIcon = currentMilestone.icon;

  return (
    <motion.div
      id="website-preloader-curtain"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0.95,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={(e) => {
        // Tapping anywhere outside the card on mobile dismisses/skips the loader
        if (e.target === e.currentTarget) {
          finishLoading();
        }
      }}
      className="fixed inset-0 z-[100] bg-[#070707] flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto select-none bg-grid-dark touch-manipulation"
    >
      {/* Top telemetry annotations (responsive for mobile & desktop) */}
      <div className="w-full max-w-xl flex items-center justify-between pb-3 sm:pb-4 font-mono-custom text-[10px] sm:text-[11px] text-neutral-400">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#FF4400] animate-ping shrink-0" />
          <span className="truncate">ODD MANGO (奇妙なマンゴー)</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-[#FFDE99]">
          <span>PUNE, MH</span>
          <span className="text-neutral-600">//</span>
          <span className="text-[#00D084]">LIVE</span>
        </div>
      </div>

      {/* Main Preloader Card */}
      <div className="w-full max-w-xl relative">
        {/* Offset Brutalist Shadow Layer in Vibrant Mango Orange */}
        <div className="absolute inset-0 bg-[#FF4400] rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-black translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 -z-10" />

        {/* Primary Foreground Card */}
        <div className="bg-white border-2 sm:border-3 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          {/* Card Window Top Header Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b-2 border-black/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF4400] border border-black inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFDE99] border border-black inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00D084] border border-black inline-block" />
            </div>

            <div className="flex items-center gap-1.5 font-mono-custom text-[10px] sm:text-xs font-bold text-neutral-700 tracking-wider uppercase">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF4400]" />
              <span>BOOTSTRAP // OM-OS</span>
            </div>

            <div className="px-1.5 sm:px-2 py-0.5 bg-black text-white font-mono-custom text-[9px] sm:text-[10px] font-extrabold rounded">
              v2.6
            </div>
          </div>

          {/* Agency Brand Identity Header */}
          <div className="text-center mb-5 sm:mb-7">
            <div className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-neutral-100 border border-black rounded-md text-[9px] sm:text-[11px] font-mono-custom font-extrabold text-neutral-700 tracking-wider mb-1.5 sm:mb-2">
              奇妙なマンゴー // AGENCY PORTAL
            </div>

            <div className="flex items-center justify-center gap-1 font-syne text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-black leading-none">
              <span>Odd Mango</span>
              <span className="text-[#FF4400] text-xl sm:text-3xl md:text-4xl font-mono-custom transform -translate-y-1.5">®</span>
            </div>

            <p className="font-mono-custom text-[9px] sm:text-xs text-neutral-500 uppercase tracking-wider mt-1.5 sm:mt-2">
              FULL-CYCLE BRANDING • CINEMA REELS • EXPERIENTIAL
            </p>
          </div>

          {/* Neo-brutalist Loading Bar Container */}
          <div className="space-y-2.5 sm:space-y-3">
            {/* Status & Numeric Readout Header */}
            <div className="flex items-center justify-between gap-2 font-mono-custom text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-800 font-bold truncate">
                <MilestoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#FF4400] animate-pulse" />
                {/* Responsive milestone label: short on mobile, full on desktop */}
                <span className="sm:hidden truncate text-[11px]">{currentMilestone.shortLabel}</span>
                <span className="hidden sm:inline truncate">{currentMilestone.label}</span>
              </div>

              <div className="flex items-baseline gap-0.5 sm:gap-1 shrink-0">
                <span className="text-lg sm:text-2xl font-black text-black tracking-tight">
                  {progress.toString().padStart(3, '0')}
                </span>
                <span className="text-xs sm:text-sm font-black text-[#FF4400]">%</span>
              </div>
            </div>

            {/* The Load Bar Track (clean border, no awkward corner shadow) */}
            <div className="relative w-full h-6 sm:h-8 bg-neutral-100 border-2 sm:border-3 border-black rounded-xl overflow-hidden p-0.5">
              {/* Internal Tick Markers for 25%, 50%, 75% */}
              <div className="absolute inset-0 flex justify-between px-[25%] pointer-events-none z-10">
                <span className="h-full w-[1.5px] bg-black/15" />
                <span className="h-full w-[1.5px] bg-black/15" />
              </div>
              <div className="absolute inset-0 flex justify-center pointer-events-none z-10">
                <span className="h-full w-[2px] bg-black/20" />
              </div>

              {/* Animated Progress Fill Bar */}
              <motion.div
                className="h-full rounded-lg bg-gradient-to-r from-[#FF4400] via-[#FF6B9E] to-[#FFB300] border-r-2 border-black relative animate-stripes transition-all duration-75"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing leading spark */}
                {progress > 0 && progress < 100 && (
                  <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 animate-pulse" />
                )}
              </motion.div>
            </div>

            {/* Segmented VU Matrix Blocks (12 steps, perfectly balanced on mobile & desktop) */}
            <div className="flex gap-1 w-full pt-0.5 sm:pt-1">
              {Array.from({ length: 12 }).map((_, idx) => {
                const cellThreshold = (idx + 1) * (100 / 12);
                const isLit = progress >= cellThreshold;
                return (
                  <div
                    key={idx}
                    className={`flex-1 h-2 sm:h-2.5 rounded-[2px] sm:rounded-[3px] border border-black transition-colors duration-150 ${
                      isLit
                        ? idx < 4
                          ? 'bg-[#FF4400]'
                          : idx < 8
                          ? 'bg-[#FF6B9E]'
                          : idx < 10
                          ? 'bg-[#38BDF8]'
                          : 'bg-[#00D084]'
                        : 'bg-neutral-200 opacity-60'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Footer Controls & Skip Trigger (Mobile-first ergonomically sized button) */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-custom text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-[#00D084] shrink-0" />
              <Volume2 className="w-3 h-3 text-neutral-600 hidden sm:inline" />
              <span className="truncate">AUDIO ACTIVE</span>
            </div>

            <button
              id="preloader-btn-skip"
              onClick={() => {
                soundFx.playClick(600);
                finishLoading();
              }}
              className="min-h-[44px] px-4 py-2 bg-black text-white hover:bg-[#FF4400] active:bg-[#FF4400] border-2 border-black rounded-xl font-mono-custom font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none active:scale-[0.98]"
            >
              <span>{isCompleted ? 'ENTER NOW' : 'SKIP LOAD'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-friendly tap indicator hint */}
      <div className="mt-3 text-center sm:hidden font-mono-custom text-[10px] text-neutral-500">
        TAP ANYWHERE TO BYPASS LOAD
      </div>
    </motion.div>
  );
};
