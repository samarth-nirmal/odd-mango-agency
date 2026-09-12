export type ViewType = 'overview' | 'branding' | 'films' | 'events' | 'roadmap' | 'estimator';

export interface BrandingProject {
  id: string;
  number: string;
  title: string;
  category: 'Identity' | 'Typography' | 'Packaging' | 'Rebrand' | 'Strategy' | 'Digital';
  client: string;
  year: string;
  image: string;
  aspect: string;
  accentColor: string;
  summary: string;
  metrics: string;
  deliverables: string[];
  challenge: string;
  solution: string;
  typography: { primary: string; secondary: string };
  palette: string[];
}

export interface FilmProject {
  id: string;
  number: string;
  title: string;
  category: 'Short Film' | 'Commercial Ad' | 'Docu-Series' | '3D Motion';
  duration: string;
  client: string;
  year: string;
  aspect: string;
  thumbnail: string;
  videoPreviewUrl: string;
  logline: string;
  director: string;
  dop: string;
  techSpecs: {
    camera: string;
    lenses: string;
    aspectRatio: string;
    audioMix: string;
  };
  awards: string[];
  metrics: string;
}

export interface EventProject {
  id: string;
  number: string;
  title: string;
  dates: string;
  location: string;
  themeColor: string;
  textColor: string;
  summary: string;
  attendees: string;
  scale: string;
  image: string;
  highlights: string[];
  techSpecs: string[];
  quote: string;
}

export interface RoadmapPhase {
  phaseNumber: string;
  title: string;
  subtitle: string;
  accentColor: string;
  duration: string;
  summary: string;
  keyActions: string[];
  deliverables: string[];
  clientCheckGate: string;
}

export interface EstimatorDeliverable {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  baseDays: number;
  description: string;
}
