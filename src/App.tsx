import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ViewType, BrandingProject, FilmProject } from './types';
import { WebsitePreloader } from './components/WebsitePreloader';
import { HeaderTicker } from './components/HeaderTicker';
import { HeaderNav } from './components/HeaderNav';
import { OverviewView } from './components/OverviewView';
import { BrandingView } from './components/BrandingView';
import { FilmsView } from './components/FilmsView';
import { EventsView } from './components/EventsView';
import { RoadmapView } from './components/RoadmapView';
import { ScopeEstimatorView } from './components/ScopeEstimatorView';
import { AboutUsView } from './components/AboutUsView';
import { ContactFooter } from './components/ContactFooter';
import { CaseStudyModal } from './components/CaseStudyModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { FILM_PROJECTS } from './data/agencyData';

const VALID_VIEWS: ViewType[] = ['overview', 'about', 'branding', 'films', 'events', 'roadmap', 'estimator'];

const getViewFromHash = (): ViewType => {
  const raw = window.location.hash.replace('#', '').toLowerCase();
  return VALID_VIEWS.includes(raw as ViewType) ? (raw as ViewType) : 'overview';
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewType>(() => getViewFromHash());
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<BrandingProject | null>(null);
  const [activeFilm, setActiveFilm] = useState<FilmProject | null>(null);
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledPrice, setPrefilledPrice] = useState<number>(0);

  useEffect(() => {
    const handleHashChange = () => {
      const target = getViewFromHash();
      setCurrentView(target);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact-intake');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectView = (view: ViewType) => {
    setCurrentView(view);
    if (window.location.hash.replace('#', '') !== view) {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideoModal = (filmId?: string) => {
    const targetFilm = filmId
      ? FILM_PROJECTS.find((f) => f.id === filmId) || FILM_PROJECTS[0]
      : FILM_PROJECTS[0];
    setActiveFilm(targetFilm);
  };

  const handleTransferScope = (summary: string, price: number) => {
    setPrefilledScope(summary);
    setPrefilledPrice(price);
    scrollToContact();
  };

  const handleCaseStudyQuoteRequest = (projectTitle: string) => {
    setPrefilledScope(`Commission similar scope to: ${projectTitle}`);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#070707] text-black font-sans-custom p-2 sm:p-4 md:p-6 max-w-[1520px] mx-auto selection:bg-[#FF6B9E] selection:text-white">
      {/* Website Entrance Preloader with Theme Load Bar */}
      <AnimatePresence>
        {isLoading && (
          <WebsitePreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Top Marquee Bar */}
      <HeaderTicker
        onOpenEstimator={() => handleSelectView('estimator')}
        onOpenContact={scrollToContact}
        onReplayLoader={() => setIsLoading(true)}
      />

      {/* Main Agency Header with Navigation Pills */}
      <HeaderNav
        currentView={currentView}
        onSelectView={handleSelectView}
        onOpenContact={scrollToContact}
      />

      {/* Main View Area */}
      <main className="min-h-[60vh] transition-all">
        {currentView === 'overview' && (
          <OverviewView
            onSelectView={handleSelectView}
            onOpenVideoModal={handleOpenVideoModal}
            onOpenContact={scrollToContact}
          />
        )}

        {currentView === 'about' && (
          <AboutUsView
            onSelectView={handleSelectView}
            onOpenContact={scrollToContact}
          />
        )}

        {currentView === 'branding' && (
          <BrandingView
            onSelectProject={(project) => setSelectedCaseStudy(project)}
          />
        )}

        {currentView === 'films' && (
          <FilmsView
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}

        {currentView === 'events' && (
          <EventsView
            onOpenContact={scrollToContact}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            onOpenContact={scrollToContact}
          />
        )}

        {currentView === 'estimator' && (
          <ScopeEstimatorView
            onTransferToContact={handleTransferScope}
          />
        )}
      </main>

      {/* Persistent Project Intake & Studio Footer */}
      <ContactFooter
        prefilledScope={prefilledScope}
        prefilledPrice={prefilledPrice}
        onReplayLoader={() => setIsLoading(true)}
      />

      {/* Deep-Dive Case Study Lightbox Drawer */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <CaseStudyModal
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
            onRequestQuote={handleCaseStudyQuoteRequest}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Film Player Modal */}
      <AnimatePresence>
        {activeFilm && (
          <VideoPlayerModal
            film={activeFilm}
            onClose={() => setActiveFilm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
