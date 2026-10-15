export interface LandingSite {
  id: string;
  name: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  tier: string;
  sunAzimuth: string;
  sunElevation: string;
  earthAzimuth: string;
  earthElevation: string;
  solarFlux28d: number;
  continuousOverlapHours: number;
  annualIllumination: string;
  dteLineOfSightPct: string;
  terrainSlopeRisk: string;
  slopeDegrees: string;
  psrIceProximity: string;
  roverMobilityRating: string;
  scientificValue: string;
  description: string;
  horizonMaskPeak: { azimuth: number; elevation: number };
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'coords' | 'geometry' | 'terrain' | 'light' | 'comms';
  categoryLabel: string;
  definition: string;
  missionImpact: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

export interface ResearchStage {
  id: number;
  questionNumber: string;
  title: string;
  kernel: string;
  inputData: string;
  method: string;
  output: string;
  assumptions: string;
}

export interface DataSourceItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeType: 'integrated' | 'ready' | 'archive';
  description: string;
  linkUrl: string;
  linkText: string;
}

export interface GalleryItem {
  id: string;
  frameNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
