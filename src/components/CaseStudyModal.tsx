import React from 'react';
import { motion } from 'motion/react';
import { BrandingProject } from '../types';
import { soundFx } from '../utils/audio';
import { X, ExternalLink, ArrowRight, Check, Tag, Layers, Calendar, Palette, Type } from 'lucide-react';

interface CaseStudyModalProps {
  project: BrandingProject | null;
  onClose: () => void;
  onRequestQuote: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onRequestQuote,
}) => {
  const [videoFit, setVideoFit] = React.useState<'contain' | 'cover'>('contain');

  if (!project) return null;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm sm:overflow-y-auto"
    >
      {/* MOBILE REEL POPUP: Centered Popup Player with zero info text, pure reel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="sm:hidden relative w-full max-w-[340px] max-h-[82vh] aspect-[9/16] bg-black border-2 border-white/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Floating Close Button on Popup */}
        <button
          onClick={() => { soundFx.playClick(400); onClose(); }}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white border border-white/40 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-lg"
          aria-label="Close reel popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pure Reel Player inside Popup */}
        <div className="w-full h-full relative flex items-center justify-center bg-black">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.image}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </motion.div>

      {/* DESKTOP & TABLET MODAL: Full Case Study & Spec Inspection */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden sm:flex relative w-full max-w-4xl bg-white border-3 border-black rounded-2xl shadow-brutal-xl overflow-hidden my-auto max-h-[96vh] flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Specification Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-black text-white border-b-2 border-black font-mono-custom text-xs font-bold shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.accentColor }}></span>
            <span>{project.number}</span>
            <span className="text-neutral-400">[{project.category.toUpperCase()}]</span>
            {project.duration && <span className="text-[#FF4400]">• {project.duration}</span>}
          </div>
          <button
            onClick={() => { soundFx.playClick(400); onClose(); }}
            className="p-1 text-white hover:text-[#FF4400] transition-colors rounded cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Title Bar */}
        <div className="px-4 sm:px-6 py-2.5 border-b-2 border-black bg-white flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="font-mono-custom text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              {project.client} • {project.year}
            </div>
            <h2 className="font-syne text-xl sm:text-2xl font-black text-black tracking-tight truncate">
              {project.title}
            </h2>
          </div>
          {project.duration && (
            <span className="shrink-0 font-mono-custom text-[11px] font-bold px-2 py-0.5 rounded border border-black bg-neutral-100">
              REEL // {project.duration}
            </span>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-5">
          {/* Hero Media Showcase: 9:16 Vertical Reel Player or Image */}
          {project.videoUrl ? (
            <div className="flex flex-col items-center justify-center pt-1 pb-1">
              <div className="relative rounded-2xl overflow-hidden border-2 border-black shadow-brutal-xl bg-black h-[min(72vh,640px)] aspect-[9/16] max-w-full flex items-center justify-center group">
                <video
                  src={project.videoUrl}
                  poster={project.image}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className={`w-full h-full ${videoFit === 'cover' ? 'object-cover' : 'object-contain'} bg-black`}
                />

                {/* Framing Mode Toggle Badge */}
                <button
                  type="button"
                  onClick={() => setVideoFit(prev => prev === 'contain' ? 'cover' : 'contain')}
                  className="absolute top-2.5 right-2.5 z-20 bg-black/80 hover:bg-black text-white px-2 py-1 rounded-md border border-white/30 font-mono-custom text-[10px] font-bold opacity-80 hover:opacity-100 transition-all cursor-pointer shadow-md"
                  title="Toggle fit vs fill"
                >
                  {videoFit === 'contain' ? 'FIT: 100%' : 'FILL: REEL'}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border-2 border-black shadow-brutal aspect-[16/9] sm:aspect-[21/9]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white font-mono-custom text-xs">
                FIGURE 1.0 // ARTIFACT COMPONENT VISUAL
              </div>
            </div>
          )}

          {/* Project Summary */}
          <div className="bg-neutral-50 border-2 border-black p-5 rounded-xl">
            <h4 className="font-mono-custom text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              // EXECUTIVE SUMMARY
            </h4>
            <p className="font-sans-custom text-base sm:text-lg text-neutral-900 font-medium leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Challenge vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border-2 border-black rounded-xl bg-white space-y-2 shadow-brutal-sm">
              <div className="font-mono-custom text-xs font-bold text-[#FF4400] flex items-center gap-1.5 uppercase tracking-wider">
                <span>[ THE STRATEGIC OBSTACLE ]</span>
              </div>
              <h4 className="font-space text-base font-bold text-black">Market Friction & Context</h4>
              <p className="font-sans-custom text-sm text-neutral-700 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 border-2 border-black rounded-xl bg-white space-y-2 shadow-brutal-sm">
              <div className="font-mono-custom text-xs font-bold text-[#00D084] flex items-center gap-1.5 uppercase tracking-wider">
                <span>[ OUR CREATIVE INTERVENTION ]</span>
              </div>
              <h4 className="font-space text-base font-bold text-black">Architectural Solution</h4>
              <p className="font-sans-custom text-sm text-neutral-700 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables Suite */}
          <div className="space-y-3">
            <h4 className="font-mono-custom text-xs font-bold text-neutral-500 uppercase tracking-wider">
              // KEY DELIVERABLES PRODUCED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 border border-black rounded-lg text-xs font-mono-custom font-bold text-neutral-900"
                >
                  <Check className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Typography & Palette Inspection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Typography Specimen */}
            <div className="p-4 border-2 border-black rounded-xl bg-neutral-50 space-y-2">
              <div className="flex items-center gap-1.5 font-mono-custom text-xs font-bold text-neutral-600">
                <Type className="w-3.5 h-3.5" />
                <span>TYPOGRAPHIC SPECIMENS</span>
              </div>
              <div className="space-y-1">
                <div className="font-space text-lg font-black text-black">
                  Display: {project.typography.primary}
                </div>
                <div className="font-mono-custom text-xs text-neutral-600">
                  Supporting: {project.typography.secondary}
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="p-4 border-2 border-black rounded-xl bg-neutral-50 space-y-2">
              <div className="flex items-center gap-1.5 font-mono-custom text-xs font-bold text-neutral-600">
                <Palette className="w-3.5 h-3.5" />
                <span>BRAND COLOR MATRIX</span>
              </div>
              <div className="flex items-center gap-2">
                {project.palette.map((colorHex, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-lg border border-black shadow-sm"
                      style={{ backgroundColor: colorHex }}
                      title={colorHex}
                    ></div>
                    <span className="font-mono-custom text-[10px] text-neutral-600 font-bold">{colorHex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-5 bg-neutral-100 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="font-mono-custom text-xs text-neutral-600">
            WANT TO COMMISSION A SIMILAR PRODUCTION FOR YOUR BRAND?
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => { soundFx.playClick(450); onClose(); }}
              className="px-3.5 sm:px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-mono-custom text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer w-1/3 sm:w-auto text-center"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                soundFx.playSuccess();
                onClose();
                onRequestQuote(project.title);
              }}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 bg-[#FF4400] text-white border-2 border-black rounded-lg font-mono-custom text-xs font-extrabold hover:bg-black transition-colors shadow-brutal-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>INQUIRE ABOUT THIS SPEC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
