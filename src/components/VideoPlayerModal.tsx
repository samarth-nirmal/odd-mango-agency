import React from 'react';
import { motion } from 'motion/react';
import { FilmProject } from '../types';
import { soundFx } from '../utils/audio';
import { X, Award, ExternalLink } from 'lucide-react';

interface VideoPlayerModalProps {
  film: FilmProject | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ film, onClose }) => {
  if (!film) return null;

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
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={film.videoPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[#FFDE99] hover:underline font-bold text-[11px]"
            >
              <span>YOUTUBE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => { soundFx.playClick(400); onClose(); }}
              className="p-1 hover:text-[#FF4400] transition-colors rounded cursor-pointer shrink-0"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container with YouTube Embed */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={film.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Production Notes & Accolades Footer */}
        <div className="p-5 bg-[#121212] border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-custom text-xs">
          <div className="space-y-1">
            <span className="text-[#FFDE99] font-bold block">// LOGLINE</span>
            <p className="font-sans-custom text-neutral-300 text-sm">{film.logline}</p>
            <div className="text-neutral-400 text-[11px] pt-1">Client: <span className="text-white font-bold">{film.client}</span></div>
          </div>

          <div className="space-y-1">
            <span className="text-[#38BDF8] font-bold block">// CREW & SPECS</span>
            <div className="text-neutral-300">Dir: <span className="text-white font-bold">{film.director}</span></div>
            <div className="text-neutral-300">DoP: <span className="text-white font-bold">{film.dop}</span></div>
            <div className="text-neutral-400 text-[11px] mt-1">{film.techSpecs.aspectRatio} • {film.techSpecs.audioMix}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[#C084FC] font-bold block">// HONORS & SHOWCASE</span>
            <ul className="space-y-0.5 text-neutral-300">
              {film.awards.map((award, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
            <div className="pt-1.5">
              <a
                href={film.videoPreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#FF4400] font-bold text-[11px] hover:underline"
              >
                <span>OPEN ON YOUTUBE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
