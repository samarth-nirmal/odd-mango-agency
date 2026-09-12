import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';
import { soundFx } from '../utils/audio';
import { Menu, X, ArrowUpRight, Flame, Film, Compass, Calculator } from 'lucide-react';

interface HeaderNavProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onOpenContact: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onSelectView,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewType) => {
    soundFx.playClick(520);
    onSelectView(view);
    setMobileMenuOpen(false);
  };

  const navItems: { view: ViewType; label: string }[] = [
    { view: 'overview', label: 'OVERVIEW' },
    { view: 'branding', label: 'BRANDING' },
    { view: 'films', label: 'FILMS' },
    { view: 'events', label: 'EVENTS' },
    { view: 'roadmap', label: 'ROADMAP' },
    { view: 'estimator', label: 'ESTIMATOR' },
  ];

  return (
    <header id="om-main-header" className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 mb-4 shadow-brutal-lg transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Logo Block */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex flex-col text-left group cursor-pointer"
          >
            <span className="font-mono-custom text-[10px] sm:text-[11px] font-bold tracking-tight text-neutral-600 group-hover:text-[#FF4400] transition-colors">
              奇妙なマンゴー (AGENCY HUB)
            </span>
            <div className="flex items-baseline font-syne text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-black leading-none mt-0.5">
              <span>Odd Mango</span>
              <span className="text-[#FF4400] text-base sm:text-2xl ml-1 font-mono-custom transform -translate-y-1">®</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-[8px] sm:text-[10px] font-mono-custom tracking-wider text-neutral-500 mt-1 uppercase">
              <span>// PUNE, MH</span>
              <span>// EST. 2026</span>
              <span className="hidden sm:inline">// FULL-CYCLE CREATIVE STUDIO</span>
            </div>
          </button>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => { soundFx.playClick(400); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 border-2 border-black rounded-xl bg-neutral-100 hover:bg-black hover:text-white transition-colors cursor-pointer overflow-hidden"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 flex-wrap" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                id={`nav-pill-${item.view}`}
                onClick={() => handleNavClick(item.view)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-custom font-bold border-2 border-black transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-black text-white shadow-brutal-sm scale-[1.02]'
                    : 'bg-transparent text-black hover:bg-neutral-100 hover:scale-[1.01]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            id="nav-btn-initiate-project"
            onClick={() => { soundFx.playSuccess(); onOpenContact(); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF4400] text-white border-2 border-black rounded-xl text-xs font-mono-custom font-extrabold hover:bg-black transition-colors ml-2 cursor-pointer shadow-brutal-sm"
          >
            <span>START PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>

      {/* Mobile dropdown drawer with smooth animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, ease: 'easeOut' },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25, ease: [0.7, 0, 0.84, 0] },
                opacity: { duration: 0.18 },
              },
            }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t-2 border-black flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono-custom font-bold border-2 border-black transition-colors cursor-pointer select-none ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-neutral-50 text-black hover:bg-neutral-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="font-mono-custom text-xs text-[#FF4400]">● ACTIVE</span>
                    ) : (
                      <span className="text-neutral-400 font-mono-custom text-xs">➔</span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => { soundFx.playSuccess(); setMobileMenuOpen(false); onOpenContact(); }}
                className="w-full flex items-center justify-center gap-2 py-3 mt-1 bg-[#FF4400] text-white border-2 border-black rounded-xl font-mono-custom font-extrabold text-sm hover:bg-black transition-colors cursor-pointer"
              >
                <span>START PROJECT INTAKE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
