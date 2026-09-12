import React, { useState } from 'react';
import { ViewType } from '../types';
import { soundFx } from '../utils/audio';
import { CLIENT_LOGOS } from '../data/agencyData';
import { ArrowRight, Play, CheckCircle2, Award, Zap, Layers, Film, TrendingUp, Sparkles, ChevronDown } from 'lucide-react';
import { CountUp } from './CountUp';

interface OverviewViewProps {
  onSelectView: (view: ViewType) => void;
  onOpenVideoModal: (filmId?: string) => void;
  onOpenContact: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectView,
  onOpenVideoModal,
  onOpenContact,
}) => {
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<number | null>(1);

  const pillars = [
    {
      id: 1,
      view: 'branding' as ViewType,
      spec: '01 // STRATEGY & IDENTITY',
      title: 'BRANDING',
      tag: '[ 01-ID ]',
      color: '#FF4400',
      icon: Layers,
      paneClass: 'pane-branding',
      desc: 'Building high-recall, defensible brand identities from scratch.',
      stats: '120+ Brands Launched',
    },
    {
      id: 2,
      view: 'films' as ViewType,
      spec: '02 // MOTION & CINEMA',
      title: 'FILMS',
      tag: '[ 02-PROD ]',
      color: '#38BDF8',
      icon: Film,
      paneClass: 'pane-production',
      desc: 'High-concept commercials, 3D worldbuilding, and music videos.',
      stats: '85M+ Broadcast Views',
    },
    {
      id: 3,
      view: 'roadmap' as ViewType,
      spec: '03 // CHANNELS & GROWTH',
      title: 'SOCIAL',
      tag: '[ 03-SMM ]',
      color: '#00D084',
      icon: TrendingUp,
      paneClass: 'pane-social',
      desc: 'Organic-first audience acquisition and content architecture.',
      stats: '+340% Avg Velocity',
    },
    {
      id: 4,
      view: 'events' as ViewType,
      spec: '04 // EXPERIENTIAL & COVERAGE',
      title: 'EVENTS',
      tag: '[ 04-EVENT ]',
      color: '#C084FC',
      icon: Sparkles,
      paneClass: 'pane-events',
      desc: 'Large-scale spatial activations, projection mapping, and sound.',
      stats: '50K+ In-Person',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Agency Manifesto Banner - Refined, compact tagline */}
      <section className="bg-white border-2 border-black rounded-xl p-5 sm:p-7 shadow-brutal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#FFDE99] rounded-bl-full -z-0 opacity-40 pointer-events-none hidden md:block"></div>
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <h1 className="font-syne text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-black leading-snug">
            WE BUILD CULTURAL ARTIFACTS THAT MAKE BRANDS IMPOSSIBLE TO IGNORE.
          </h1>

          <p className="font-sans-custom text-xs sm:text-sm text-neutral-600 max-w-xl font-medium leading-relaxed">
            Odd Mango is an award-winning creative agency rooted in Pune, operating globally. We bridge obsessive visual typography, raw cinematic filmmaking, and experimental physical activations to turn brands into cult obsessions.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
              className="w-full sm:w-auto justify-center px-4 py-3 sm:py-2.5 bg-[#FF4400] text-white border-2 border-black rounded-lg font-mono-custom font-extrabold text-xs hover:bg-black transition-all shadow-brutal-sm cursor-pointer flex items-center gap-2 group"
            >
              <span>BOOK 2026 PRODUCTION RUN</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { soundFx.playClick(600); onOpenVideoModal('f01'); }}
              className="w-full sm:w-auto justify-center px-3.5 py-3 sm:py-2.5 bg-white text-black border-2 border-black rounded-lg font-mono-custom font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer flex items-center gap-2 shadow-brutal-sm"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>WATCH 2026 SHOWREEL [02:14]</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3D Stack Perspective Section - EXACT REFERENCE HTML INTERACTIVE CASCADE */}
      <section className="bg-[#0e0e0e] border-2 border-neutral-800 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-brutal-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-800/80">
          <div>
            <h2 className="font-space text-base sm:text-lg font-black text-white">
              THE FOUR CORNERSTONES OF ODD MANGO
            </h2>
          </div>
          <span className="font-mono-custom text-[10px] text-neutral-500 hidden sm:inline">
            CLICK ANY PILLAR TO ENTER DEEP ARCHIVE ➔
          </span>
        </div>

        {/* The Exact Reference HTML Stack Container & Pane Elements */}
        <div className="om-stack-container">
          {pillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            const isMobileExpanded = expandedMobilePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                className={`om-pane ${pillar.paneClass}`}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    soundFx.playClick(440 + idx * 40);
                  }
                }}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    soundFx.playClick(440 + idx * 40);
                    setExpandedMobilePillar((prev) => (prev === pillar.id ? null : pillar.id));
                  } else {
                    soundFx.playSuccess();
                    onSelectView(pillar.view);
                  }
                }}
              >
                <div className="om-pane-header">
                  <div className="flex items-center gap-2 min-w-0 truncate pr-2">
                    <div
                      className="hidden sm:flex w-4 h-4 rounded-[3px] border border-black items-center justify-center shrink-0 shadow-[1px_1px_0px_#000000]"
                      style={{ backgroundColor: pillar.color }}
                      aria-hidden="true"
                    >
                      <PillarIcon className="w-2.5 h-2.5 text-black stroke-[2.5]" />
                    </div>
                    <span className="font-bold truncate">{pillar.spec}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-neutral-400 font-normal hidden sm:inline">
                      <CountUp value={pillar.stats} duration={1400} />
                    </span>
                    <span className="font-bold text-neutral-500 text-[10px] sm:text-xs">{pillar.tag}</span>
                    {/* Mobile Expand / Collapse Chevron indicator */}
                    <span className="sm:hidden font-bold text-black flex items-center gap-0.5 text-[10px]">
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isMobileExpanded ? 'rotate-180 text-[#FF4400]' : 'text-neutral-600'
                        }`}
                      />
                    </span>
                  </div>
                </div>

                <div className="om-pane-body">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-1.5 pt-1.5 sm:pt-0">
                      <div className="flex items-center gap-2.5 sm:gap-3.5">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] text-black"
                          style={{ backgroundColor: pillar.color }}
                          aria-hidden="true"
                        >
                          <PillarIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                        </div>
                        <h3 className="m-0">{pillar.title}</h3>
                      </div>

                      {/* Mobile collapsed hint */}
                      <span className="sm:hidden font-mono-custom text-[10px] text-neutral-500 font-bold">
                        {isMobileExpanded ? 'OPEN' : 'TAP TO EXPAND'}
                      </span>
                    </div>

                    {/* Expandable details on mobile, always visible on desktop */}
                    <div className={`${isMobileExpanded ? 'block' : 'hidden sm:block'} pt-1`}>
                      <p>{pillar.desc}</p>
                      <div className="sm:hidden flex items-center justify-between pt-2.5 mt-2 border-t border-neutral-200">
                        <span className="font-mono-custom text-[10px] text-neutral-500">
                          {pillar.stats}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playSuccess();
                            onSelectView(pillar.view);
                          }}
                          className="px-3 py-1.5 bg-black text-white text-[10px] font-mono-custom font-extrabold rounded-md border border-black flex items-center gap-1.5 shadow-[1px_1px_0px_#000]"
                        >
                          <span>EXPLORE {pillar.title}</span>
                          <ArrowRight className="w-3 h-3 text-[#FF4400]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="om-pane-badge mb-1 sm:mb-0 hidden sm:inline-flex">SPECS ➔</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Agency Credibility & Stats Matrix */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'DELIVERED CAMPAIGNS', value: '340+', note: 'Zero missed release dates', color: 'border-l-4 border-l-[#FF4400]' },
          { label: 'MEDIA IMPRESSIONS', value: '185M+', note: 'Earned organic reach', color: 'border-l-4 border-l-[#38BDF8]' },
          { label: 'GLOBAL CLIENT ROSTER', value: '42', note: 'Across 9 timezones', color: 'border-l-4 border-l-[#00D084]' },
          { label: 'INDUSTRY HONORS', value: '18', note: 'TDC, Cannes, Vimeo Picks', color: 'border-l-4 border-l-[#C084FC]' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white border-2 border-black rounded-xl p-3 xs:p-3.5 sm:p-5 shadow-brutal ${stat.color}`}>
            <div className="font-mono-custom text-[9px] xs:text-[10px] sm:text-[11px] text-neutral-500 font-bold tracking-wider leading-tight break-words">{stat.label}</div>
            <div className="font-syne text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-black mt-1 mb-1">
              <CountUp value={stat.value} duration={1600} delay={i * 120} />
            </div>
            <div className="font-mono-custom text-[9px] xs:text-[10px] sm:text-xs text-neutral-600 leading-tight">{stat.note}</div>
          </div>
        ))}
      </section>

      {/* Brand Partners Marquee */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-brutal overflow-hidden">
        <div className="font-mono-custom text-[11px] sm:text-xs font-bold tracking-widest text-neutral-500 uppercase mb-3 sm:mb-4">
          SELECT PARTNERS & CO-CONSPIRATORS
        </div>
        <div className="w-full overflow-hidden">
          <div className="animate-ticker items-center space-x-12 py-1">
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
              <span
                key={idx}
                className="font-space text-lg sm:text-xl font-black tracking-wider text-neutral-800 hover:text-[#FF4400] transition-colors shrink-0 select-none cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Launch CTA Banner */}
      <section className="bg-[#FFDE99] border-2 border-black rounded-2xl p-5 sm:p-8 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-syne text-xl sm:text-3xl font-black text-black leading-tight">
            CALCULATE ESTIMATED SCOPE & TIMELINE IN 60 SECONDS
          </h3>
          <p className="font-sans-custom text-xs sm:text-sm text-neutral-800 max-w-xl font-medium">
            Use our interactive Scope Estimator to configure deliverables, view live pricing breakdowns, and fast-track discovery.
          </p>
        </div>

        <button
          onClick={() => { soundFx.playSuccess(); onSelectView('estimator'); }}
          className="w-full md:w-auto px-6 py-3.5 bg-black text-white border-2 border-black rounded-xl font-mono-custom font-extrabold text-xs sm:text-sm hover:bg-[#FF4400] transition-colors shadow-brutal cursor-pointer shrink-0 text-center"
        >
          LAUNCH SCOPE ESTIMATOR ➔
        </button>
      </section>
    </div>
  );
};
