import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FILM_PROJECTS } from '../data/agencyData';
import { FilmProject } from '../types';
import { soundFx } from '../utils/audio';
import { Play, Film, Award, Camera, Disc, Palette, Volume2, ExternalLink, Youtube } from 'lucide-react';
import { STUDIO_CONTACT } from '../data/agencyData';

interface FilmsViewProps {
  onOpenVideoModal: (filmId: string) => void;
}

export const FilmsView: React.FC<FilmsViewProps> = ({ onOpenVideoModal }) => {
  const [activeSlice, setActiveSlice] = useState<number | null>(0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-syne text-2xl sm:text-4xl font-black text-black">
            HIGH-OCTANE COMMERCIALS & NARRATIVE SHORTS
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0 self-start md:self-auto">
          <a
            href={STUDIO_CONTACT.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-custom text-[11px] sm:text-xs bg-[#FF0000] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-black flex items-center gap-2 hover:bg-black transition-colors shadow-brutal-sm font-bold active:scale-95"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>@ODDMANGOFILMS</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="font-mono-custom text-[11px] sm:text-xs bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-black flex items-center gap-2">
            <Film className="w-4 h-4 text-[#FF4400]" />
            <span>IN-HOUSE CAMERA VAULT: ARRI • RED • 16MM</span>
          </div>
        </div>
      </section>

      {/* The Cinematic Accordion */}
      <section className="bg-[#0e0e0e] border-2 border-neutral-800 rounded-2xl p-3 sm:p-6 shadow-brutal-xl">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[620px] w-full gap-3">
          {FILM_PROJECTS.map((film, idx) => {
            const isExpanded = activeSlice === idx;

            return (
              <div
                key={film.id}
                onMouseEnter={() => {
                  // Strictly desktop hover only
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024 && window.matchMedia('(hover: hover)').matches) {
                    soundFx.playClick(440 + idx * 30);
                    setActiveSlice(idx);
                  }
                }}
                onClick={() => {
                  soundFx.playClick(440 + idx * 30);
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    // Click to expand / collapse toggle on mobile screens
                    setActiveSlice((prev) => (prev === idx ? null : idx));
                  } else {
                    setActiveSlice(idx);
                  }
                }}
                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-between p-4 sm:p-6 ${
                  isExpanded
                    ? 'lg:flex-[3] border-[#FF4400] ring-2 ring-[#FF4400]/40'
                    : 'lg:flex-[1] border-neutral-800 lg:hover:border-neutral-500 min-h-[140px] lg:min-h-0'
                }`}
              >
                {/* Background Poster Image */}
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? 'scale-105 filter brightness-70' : 'filter brightness-40 grayscale-[40%]'
                  }`}
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 pointer-events-none"></div>

                {/* Top Badge (In normal flow to prevent any overlap with content) */}
                <div className="relative z-10 flex items-center justify-between font-mono-custom text-xs mb-3 sm:mb-4">
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 text-[#FFDE99] font-bold text-[10px] sm:text-xs">
                    {film.number}
                  </span>
                  <span className="bg-[#FF4400] text-white px-2.5 py-0.5 rounded font-extrabold text-[10px]">
                    {film.category.toUpperCase()}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2.5 sm:space-y-3">
                  <div className="space-y-1">
                    <div className="font-mono-custom text-xs text-neutral-300 flex items-center gap-2">
                      <span>{film.client}</span>
                      <span>•</span>
                      <span>{film.duration}</span>
                    </div>
                    <h3 className="font-space text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {film.title}
                    </h3>
                  </div>

                  {/* Expanded Content Details */}
                  <AnimatePresence initial={false} mode="wait">
                    {isExpanded ? (
                      <motion.div
                        key={`expanded-${film.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: {
                            height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.3, delay: 0.08 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="space-y-3 sm:space-y-4 pt-1 sm:pt-2 overflow-hidden"
                      >
                        {/* Logline: Hidden on mobile to avoid text chaos, shown on tablet/desktop */}
                        <p className="hidden sm:block font-sans-custom text-xs sm:text-sm text-neutral-300 max-w-xl line-clamp-2">
                          {film.logline}
                        </p>

                        {/* Tech Specs: Hidden on mobile to prevent dense clutter, shown on desktop */}
                        <div className="hidden sm:grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono-custom text-neutral-400 bg-black/60 p-2.5 sm:p-3 rounded-lg border border-white/10 max-w-lg">
                          <div>CAMERA: <span className="text-white font-bold">{film.techSpecs.camera}</span></div>
                          <div>GLASS: <span className="text-white font-bold">{film.techSpecs.lenses}</span></div>
                        </div>

                        {/* Streamlined Action Buttons: Single row on mobile */}
                        <div className="flex items-center gap-2 sm:gap-2.5 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFx.playSuccess();
                              onOpenVideoModal(film.id);
                            }}
                            className="flex-1 sm:flex-initial justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF4400] text-white rounded-xl font-mono-custom font-extrabold text-xs flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-brutal-sm cursor-pointer active:scale-95"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>WATCH FILM</span>
                          </button>

                          <a
                            href={film.videoPreviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 sm:px-4 sm:py-2.5 bg-black/80 border border-white/20 text-[#FFDE99] rounded-xl font-mono-custom font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 hover:text-white transition-all shadow-brutal-sm cursor-pointer shrink-0 active:scale-95"
                            title="Open on YouTube"
                            aria-label="Open on YouTube"
                          >
                            <span className="hidden sm:inline">OPEN ON YOUTUBE</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`collapsed-${film.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="font-mono-custom text-[11px] text-neutral-400 flex items-center gap-1.5"
                      >
                        <span>TAP <span className="hidden lg:inline">/ HOVER</span> TO EXPAND REEL</span>
                        <span className="text-[#FFDE99]">➔</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Production Capabilities Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-custom text-xs">
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal space-y-2">
          <div className="flex items-center gap-2 text-[#FF4400] font-bold">
            <Camera className="w-4 h-4" />
            <span>01 // ON-SET CINEMATOGRAPHY</span>
          </div>
          <p className="font-sans-custom text-neutral-700 text-sm">
            Dual ARRI & RED cinema packages, Phantom high-speed macro rigs, Chapman dollies, and drone flight crews certified for complex urban flights.
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal space-y-2">
          <div className="flex items-center gap-2 text-[#38BDF8] font-bold">
            <Disc className="w-4 h-4" />
            <span>02 // SOUND & DOLBY MASTERING</span>
          </div>
          <p className="font-sans-custom text-neutral-700 text-sm">
            Custom modular audio composition, analog Foley sound design, and 7.1.4 Dolby Atmos spatial audio mastering calibrated for theater & headphone fidelity.
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal space-y-2">
          <div className="flex items-center gap-2 text-[#C084FC] font-bold">
            <Palette className="w-4 h-4" />
            <span>03 // 3D VFX & COLOR SCIENCE</span>
          </div>
          <p className="font-sans-custom text-neutral-700 text-sm">
            DaVinci Resolve color grading on calibrated Sony BVM OLED monitors with custom film stock emulation and photo-real Houdini procedural simulations.
          </p>
        </div>
      </section>
    </div>
  );
};
