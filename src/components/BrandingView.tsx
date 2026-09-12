import React, { useState } from 'react';
import { BRANDING_PROJECTS } from '../data/agencyData';
import { BrandingProject } from '../types';
import { soundFx } from '../utils/audio';
import { Filter, Eye, ArrowUpRight, Check } from 'lucide-react';

interface BrandingViewProps {
  onSelectProject: (project: BrandingProject) => void;
}

export const BrandingView: React.FC<BrandingViewProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Packaging', 'Identity', 'Typography', 'Rebrand', 'Strategy', 'Digital'];

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
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono-custom text-xs text-neutral-600">
            <span>INDEX: 12 ARCHIVED COMMISSIONS</span>
            <span>•</span>
            <span>SHOWING: {filteredProjects.length}</span>
          </div>
        </div>

        {/* Category Filters (Fully Responsive) */}
        <div className="pt-3 sm:pt-4">
          {/* Mobile Filter Header with Live Count */}
          <div className="flex sm:hidden items-center justify-between pb-2.5 font-mono-custom">
            <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#FF4400]" />
              <span>DISCIPLINE FILTER</span>
            </span>
            <span className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'WORK' : 'WORKS'}
            </span>
          </div>

          {/* Responsive Pill Group */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                  className={`px-3 py-1.5 rounded-lg font-mono-custom text-xs font-bold border-2 border-black transition-colors cursor-pointer select-none ${
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

      {/* The 12-Grid Showcase */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => { soundFx.playSuccess(); onSelectProject(project); }}
            className="group bg-white border-2 border-black rounded-2xl overflow-hidden shadow-brutal sm:hover:shadow-brutal-xl transition-all duration-300 flex flex-col cursor-pointer sm:hover:-translate-y-1 relative"
          >
            {/* Image Box */}
            <div className="relative aspect-square overflow-hidden bg-neutral-900 border-b-2 border-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Category Pill Over Image */}
              <div className="absolute top-3 left-3">
                <span
                  className="font-mono-custom text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-black shadow-brutal-sm"
                  style={{ backgroundColor: project.accentColor, color: '#000' }}
                >
                  {project.category.toUpperCase()}
                </span>
              </div>

              {/* Number Badge */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded font-mono-custom text-[10px] font-bold border border-white/20">
                {project.number}
              </div>

              {/* Hover Quick-Inspect Prompt */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono-custom text-xs font-bold">
                <div className="bg-white text-black px-4 py-2 rounded-xl border-2 border-black flex items-center gap-1.5 shadow-brutal-sm">
                  <Eye className="w-4 h-4" />
                  <span>INSPECT SPEC</span>
                </div>
              </div>
            </div>

            {/* Metadata Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <div>
                <div className="flex items-center justify-between font-mono-custom text-[11px] text-neutral-500 mb-1">
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-space text-xl font-black text-black tracking-tight group-hover:text-[#FF4400] transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans-custom text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between font-mono-custom text-xs">
                <span className="font-bold text-[#FF4400] text-[11px] truncate mr-2">
                  {project.metrics}
                </span>
                <span className="flex items-center gap-0.5 text-black font-extrabold group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>SPEC</span>
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
