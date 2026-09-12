import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { FilmProject } from '../types';
import { soundFx } from '../utils/audio';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Award, Camera, Film, Disc } from 'lucide-react';

interface VideoPlayerModalProps {
  film: FilmProject | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ film, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
  }, [film]);

  if (!film) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekVal = parseFloat(e.target.value);
    setProgress(seekVal);
    videoRef.current.currentTime = (seekVal / 100) * (videoRef.current.duration || 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playClick(400);
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-[#0d0d0d] border-3 border-neutral-700 rounded-2xl shadow-brutal-xl overflow-hidden flex flex-col text-white"
        role="dialog"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3 bg-[#161616] border-b border-neutral-800 font-mono-custom text-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
            <span className="font-bold tracking-wider truncate">{film.number} // {film.title}</span>
            <span className="text-neutral-400 hidden sm:inline">[{film.category} • {film.duration}]</span>
          </div>
          <button
            onClick={() => { soundFx.playClick(400); onClose(); }}
            className="p-1 hover:text-[#FF4400] transition-colors rounded cursor-pointer shrink-0"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <video
            ref={videoRef}
            src={film.videoPreviewUrl}
            poster={film.thumbnail}
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {/* Center play/pause overlay click area */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors"
          >
            {!isPlaying && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF4400] border-2 border-black flex items-center justify-center shadow-brutal transform transition-transform hover:scale-110">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white translate-x-0.5" />
              </div>
            )}
          </div>

          {/* Floating Live Telemetry Badge */}
          <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 font-mono-custom text-[10px] sm:text-[11px] text-[#00D084] flex items-center gap-1.5 sm:gap-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping"></span>
            <span>4K PRORES 4444 // REC</span>
          </div>

          {/* Floating Tech Specs Pill */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/20 font-mono-custom text-[11px] text-neutral-300 hidden sm:block pointer-events-none">
            {film.techSpecs.camera} + {film.techSpecs.lenses}
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2 opacity-95">
            {/* Scrubber bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#FF4400]"
            />

            <div className="flex items-center justify-between font-mono-custom text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-1 hover:text-[#FF4400] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-[#FF4400] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-neutral-400">DURATION: {film.duration}</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                <span>{film.techSpecs.aspectRatio}</span>
                <span>•</span>
                <span>{film.techSpecs.audioMix}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Production Notes & Accolades Footer */}
        <div className="p-5 bg-[#121212] border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-custom text-xs">
          <div className="space-y-1">
            <span className="text-[#FFDE99] font-bold block">// LOGLINE</span>
            <p className="font-sans-custom text-neutral-300 text-sm">{film.logline}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[#38BDF8] font-bold block">// CREW CREDITS</span>
            <div className="text-neutral-300">Dir: <span className="text-white font-bold">{film.director}</span></div>
            <div className="text-neutral-300">DoP: <span className="text-white font-bold">{film.dop}</span></div>
            <div className="text-neutral-400 text-[11px] mt-1">Metric: {film.metrics}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[#C084FC] font-bold block">// FESTIVAL HONORS</span>
            <ul className="space-y-0.5 text-neutral-300">
              {film.awards.map((award, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
