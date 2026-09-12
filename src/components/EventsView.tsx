import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENT_PROJECTS } from '../data/agencyData';
import { soundFx } from '../utils/audio';
import { MapPin, Users, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface EventsViewProps {
  onOpenContact: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onOpenContact }) => {
  // Allow independent toggling so expanding a card never collapses a card above it or pulls this card upwards
  const [openBars, setOpenBars] = useState<Record<string, boolean>>({
    [EVENT_PROJECTS[0].id]: true,
  });

  const toggleBar = (id: string) => {
    const isCurrentlyOpen = !!openBars[id];
    soundFx.playClick(isCurrentlyOpen ? 400 : 560);
    setOpenBars((prev) => ({
      ...prev,
      [id]: !isCurrentlyOpen,
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-lg flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="font-syne text-[1.25rem] xs:text-2xl sm:text-4xl font-black text-black leading-tight tracking-tight break-words">
            IMMERSIVE SCENOGRAPHY & LIVE ARCHITECTURE
          </h1>
        </div>

        <button
          onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
          className="w-full md:w-auto px-4 py-2.5 sm:px-5 sm:py-2.5 bg-[#FF6B9E] text-black font-mono-custom font-extrabold text-xs border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors shadow-brutal-sm cursor-pointer shrink-0 text-center"
        >
          <span className="sm:hidden">COMMISSION ACTIVATION ➔</span>
          <span className="hidden sm:inline">COMMISSION EXPERIENTIAL ACTIVATION ➔</span>
        </button>
      </section>

      {/* The Expandable Event Bars */}
      <section className="space-y-4">
        {EVENT_PROJECTS.map((event) => {
          const isOpen = !!openBars[event.id];

          return (
            <div
              key={event.id}
              onClick={() => toggleBar(event.id)}
              className="border-3 border-black rounded-2xl cursor-pointer transition-shadow duration-200 overflow-hidden shadow-brutal hover:shadow-brutal-xl"
              style={{ backgroundColor: event.themeColor, color: event.textColor }}
            >
              {/* Header Bar Area */}
              <div className="p-4 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-1">
                  <div className="font-mono-custom text-[11px] sm:text-xs font-bold tracking-wider opacity-85 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span>{event.number}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.dates}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  </div>
                  <h2 className="font-space text-xl sm:text-4xl font-black tracking-tight leading-tight pt-1">
                    {event.title}
                  </h2>
                </div>

                <div className="flex items-center justify-between md:justify-start gap-2.5 sm:gap-3 pt-1 md:pt-0">
                  <span className="font-mono-custom text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border-2 border-black bg-white text-black shadow-brutal-sm">
                    {event.attendees}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-mono-custom text-xs sm:text-sm font-bold shrink-0"
                  >
                    {isOpen ? '−' : '+'}
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content Drawer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`drawer-${event.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    style={{ transformOrigin: 'top center' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 sm:px-8 sm:pb-8 space-y-5 sm:space-y-6 border-t-2 border-black/20 pt-5 sm:pt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Visual Photo Card */}
                        <div className="lg:col-span-5 rounded-xl overflow-hidden border-2 border-black shadow-brutal aspect-[16/10]">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Summary & Highlights */}
                        <div className="lg:col-span-7 space-y-4">
                          <p className="font-sans-custom text-base sm:text-lg font-medium leading-relaxed opacity-95">
                            {event.summary}
                          </p>

                          <div className="bg-black/10 p-4 rounded-xl border border-black/20 space-y-2">
                            <div className="font-mono-custom text-xs font-bold uppercase tracking-wider">
                              // KEY SPATIAL HIGHLIGHTS
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans-custom">
                              {event.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Specs */}
                          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-black text-black space-y-1 font-mono-custom text-xs">
                            <div className="font-bold uppercase tracking-wider text-[#FF4400]">
                              HARDWARE & MEDIA SERVER RIG
                            </div>
                            {event.techSpecs.map((spec, i) => (
                              <div key={i} className="text-neutral-700 font-medium">
                                • {spec}
                              </div>
                            ))}
                          </div>

                          <div className="italic text-sm font-serif opacity-90">
                            {event.quote}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </div>
  );
};
