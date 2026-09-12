import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calculator, Clock, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderTickerProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onReplayLoader?: () => void;
}

export const HeaderTicker: React.FC<HeaderTickerProps> = ({ onOpenEstimator, onOpenContact, onReplayLoader }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timePune, setTimePune] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimePune(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playClick(600);
  };

  return (
    <div id="om-top-ticker" className="w-full bg-[#050505] text-white border border-white/10 rounded-xl mb-3 overflow-hidden px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-mono-custom select-none">
      {/* Marquee area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-ticker items-center space-x-8 text-neutral-300">
          <div className="flex items-center space-x-8 shrink-0">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00D084] animate-pulse"></span>
              <span className="font-bold text-white tracking-wider">ODD MANGO STUDIO HUB</span>
              <span className="text-neutral-400">// PUNE HQ [IST {timePune || 'LIVE'}]</span>
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#FFDE99] font-medium">AVAILABLE FOR Q3 / Q4 PRODUCTION</span>
            <button 
              onClick={() => { soundFx.playClick(500); onOpenContact(); }} 
              className="text-[#FF4400] font-bold hover:underline cursor-pointer tracking-wider"
            >
              [BOOK NOW ➔]
            </button>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300">WORLDWIDE DIGITAL DELIVERY & CINEMA COMMISSIONING</span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#FF6B9E] font-medium">NEW CASE STUDY: KURA CEREMONIAL MATCHA ARCHIVE</span>
            <span className="text-neutral-500">|</span>
          </div>

          {/* Repeat for seamless infinite marquee */}
          <div className="flex items-center space-x-8 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00D084] animate-pulse"></span>
              <span className="font-bold text-white tracking-wider">ODD MANGO STUDIO HUB</span>
              <span className="text-neutral-400">// PUNE HQ [IST {timePune || 'LIVE'}]</span>
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#FFDE99] font-medium">AVAILABLE FOR Q3 / Q4 PRODUCTION</span>
            <button 
              onClick={() => { soundFx.playClick(500); onOpenContact(); }} 
              className="text-[#FF4400] font-bold hover:underline cursor-pointer tracking-wider"
            >
              [BOOK NOW ➔]
            </button>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300">WORLDWIDE DIGITAL DELIVERY & CINEMA COMMISSIONING</span>
            <span className="text-neutral-500">|</span>
            <span className="text-[#FF6B9E] font-medium">NEW CASE STUDY: KURA CEREMONIAL MATCHA ARCHIVE</span>
            <span className="text-neutral-500">|</span>
          </div>
        </div>
      </div>

      {/* Right action controls */}
      <div className="flex items-center gap-3 shrink-0">
        {onReplayLoader && (
          <button
            id="btn-replay-loader"
            onClick={() => { soundFx.playClick(500); onReplayLoader(); }}
            title="Replay website intro loading screen"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <RotateCcw className="w-3 h-3 text-[#FFDE99]" />
            <span>INTRO</span>
          </button>
        )}

        <button
          id="btn-open-rate-calculator"
          onClick={() => { soundFx.playClick(550); onOpenEstimator(); }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#FF4400] text-white rounded-lg font-bold text-[11px] hover:bg-[#ff5519] transition-transform active:scale-95 cursor-pointer shadow-brutal-sm"
        >
          <Calculator className="w-3 h-3" />
          <span>SCOPE ESTIMATOR</span>
        </button>

        <button
          id="btn-toggle-sound"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Interface Sound' : 'Enable Interface Sound'}
          className="flex items-center gap-1 px-2.5 py-1 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer text-[11px]"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#00D084]" />
              <span className="hidden md:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden md:inline text-neutral-500">MUTED</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
