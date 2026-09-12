import React, { useState } from 'react';
import { BRANDING_PROJECTS } from '../data/agencyData';
import { BrandingProject } from '../types';
import { soundFx } from '../utils/audio';
import { Filter, ArrowUpRight, Play } from 'lucide-react';

interface BrandingViewProps {
  onSelectProject: (project: BrandingProject) => void;
}

export const BrandingView: React.FC<BrandingViewProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Spatial', 'Identity', 'Packaging', 'Digital', 'Typography', 'Rebrand', 'Strategy', 'Motion & Reels'];

  const filteredProjects = activeCategory === 'ALL'
    ? BRANDING_PROJECTS
    : BRANDING_PROJECTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryClick = (cat: string) => {
    soundFx.playClick(480);
    setActiveCategory(cat);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Filters */}
      <section className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-brutal-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b-2 border-black">
          <div>
            <h1 className="font-syne text-2xl sm:text-4xl font-black text-black">
              DESIGN SYSTEMS & SUBCULTURAL ARTIFACTS
            </h1>
            <p className="font-sans-custom text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
              Featured brand films, spatial walkthroughs, kinetic typography, and high-impact commercial reels.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono-custom text-xs text-neutral-600 shrink-0">
            <span>INDEX: {BRANDING_PROJECTS.length} ARCHIVED COMMISSIONS</span>
            <span>•</span>
            <span>SHOWING: {filteredProjects.length}</span>
          </div>
        </div>

        {/* Category Filters (Fully Responsive: Horizontal Touch-Scroll on Mobile, Wrap on Desktop) */}
        <div className="pt-3 sm:pt-4">
          {/* Mobile Filter Header with Live Count */}
          <div className="flex sm:hidden items-center justify-between pb-2 font-mono-custom">
            <span className="text-[11px] font-bold text-neutral-700 flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-[#FF4400]" />
              <span>FILTER DISCIPLINE</span>
            </span>
            <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'REEL' : 'REELS'}
            </span>
          </div>

          {/* Responsive Pill Group: Horizontal Touch-Scroll on Mobile */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-1.5 sm:gap-2 pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
            <span className="hidden sm:flex font-mono-custom text-xs font-bold text-neutral-500 mr-1 items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER:</span>
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'ALL'
                ? BRANDING_PROJECTS.length
                : BRANDING_PROJECTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`whitespace-nowrap px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-mono-custom text-[11px] sm:text-xs font-bold border-2 border-black transition-colors cursor-pointer select-none shrink-0 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-[#FFDE99]'
                  }`}
                >
                  <span>{cat.toUpperCase()}</span>
                  <span className={`ml-1 text-[10px] ${isActive ? 'text-[#FF4400]' : 'text-neutral-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Grid Showcase in 9:16 Reel Format (1 reel per line on mobile, responsive up to 4 on xl) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-[310px] sm:max-w-none mx-auto w-full">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => { soundFx.playSuccess(); onSelectProject(project); }}
            className="group bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal hover:shadow-brutal-xl transition-all duration-300 flex flex-col cursor-pointer sm:hover:-translate-y-1 relative w-full"
          >
            {/* Media Container in 9:16 Reel Format */}
            <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900 border-b-2 border-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Mobile Tap-to-Play Indicator */}
              <div className="sm:hidden absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg font-mono-custom text-[11px] font-bold flex items-center gap-1.5 border border-white/20 z-10 shadow-md">
                <Play className="w-3 h-3 fill-[#FF4400] text-[#FF4400]" />
                <span>PLAY REEL</span>
              </div>

              {/* Desktop Hover Quick-Inspect Prompt */}
              <div className="hidden sm:flex absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2 text-white font-mono-custom text-xs font-bold z-20 pointer-events-none">
                <div className="bg-white text-black px-4 py-2 rounded-xl border-2 border-black flex items-center gap-2 shadow-brutal">
                  <Play className="w-3.5 h-3.5 fill-[#FF4400] text-[#FF4400]" />
                  <span>PLAY REEL</span>
                </div>
              </div>
            </div>

            {/* Metadata Content */}
            <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 bg-white">
              <div>
                <div className="flex items-center justify-between font-mono-custom text-xs text-neutral-500 mb-1">
                  <span className="truncate pr-2">{project.client}</span>
                  <span className="shrink-0">{project.year}</span>
                </div>
                <h3 className="font-space text-base sm:text-xl font-black text-black tracking-tight group-hover:text-[#FF4400] transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans-custom text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between font-mono-custom text-xs">
                <span className="text-neutral-500 text-[11px] font-bold">
                  {project.duration ? `REEL // ${project.duration}` : project.category}
                </span>
                <span className="flex items-center gap-1 text-black font-extrabold group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>WATCH</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
