export type ServiceType =
  | 'spraying'
  | 'spreading'
  | 'monitoring'
  | 'mapping'
  | 'training'
  | 'rental'
  | 'sales'
  | 'seeding'
  | 'consultancy'
  | 'emergency';

export const SERVICE_LABELS: Record<ServiceType, string> = {
  spraying: 'Drone Spraying',
  spreading: 'Fertilizer Application',
  monitoring: 'Crop Scouting',
  mapping: 'Aerial Mapping',
  training: 'Pilot Training',
  rental: 'Equipment Rental',
  sales: 'Equipment Sales',
  seeding: 'Cover Crop Seeding',
  consultancy: 'Ag Consulting',
  emergency: 'Emergency Response',
};

export interface Operator {
  slug: string;
  name: string;
  shortName?: string;
  tagline?: string;
  description: string;
  country: string;
  counties: string[];           // US state slugs covered
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  founded?: number;
  services: ServiceType[];
  drones: string[];
  crops: string[];
  priceMinUsd?: number;
  priceMaxUsd?: number;
  haTreated?: number;           // cumulative acres treated (we store in "ha" field but mean acres)
  fleetSize?: number;
  pilotsCount?: number;
  clientsCount?: number;
  responseTimeHours?: number;
  coverageRadiusKm?: number;
  languagesSpoken?: string[];
  paymentMethods?: string[];
  acceptsUsdaFunds?: boolean;   // Accepts USDA / FSA program payments
  emergencyService?: boolean;
  certFAAPart107?: boolean;     // FAA Part 107 Remote Pilot Certificate
  certFAAPart137?: boolean;     // FAA Part 137 Agricultural Aircraft Operator
  certDJI?: boolean;
  certXAG?: boolean;
  certHylio?: boolean;
  ndaaCompliant?: boolean;      // NDAA Section 848 compliance
  iso9001?: boolean;
  featured?: boolean;
  verified?: boolean;
  logoUrl?: string;
  lat?: number;
  lng?: number;
}

export interface County {
  slug: string;
  name: string;
  nameRo: string;              // Full state name (e.g. "State of Iowa")
  region: string;
  lat: number;
  lng: number;
  agriculturalLandHa: number;  // agricultural acres (stored as "ha" for compat)
  mainCrops: string[];
  vineyardHa?: number;
  orchardHa?: number;
}

export interface Crop {
  slug: string;
  name: string;
  nameRo: string;             // English display name
  description: string;
  longDescription: string;    // long-form body copy (150-250 words)
  aeoBlock: string;           // 2-3 sentence definitive answer for AI engines, contains a number
  priceMinUsd: number;        // min per-acre rate (USD)
  priceMaxUsd: number;        // max per-acre rate (USD)
  treatmentMonths: number[];
  haUS?: number;              // approximate US acreage
  icon: string;
  mainPests?: string[];
  uvlNormLHa?: string;        // carrier volume per acre (gpa)
  yieldGainPct?: number;
  authorityLinks: { label: string; url: string }[];
  faqs?: { question: string; answer: string }[];  // 4-5 crop-specific FAQs
  lastReviewedAt?: string;    // ISO date (YYYY-MM-DD) of last editorial review
}

export interface DroneModel {
  slug: string;
  name: string;
  manufacturer: string;
  countryOfManufacture: string;
  ndaaCompliant: boolean;
  status: 'active' | 'discontinued';
  description: string;
  longDescription: string;
  aeoBlock: string;
  specs: {
    emptyWeightKg: number | null;
    emptyWeightLbs: number | null;
    mtowKg: number | null;
    mtowLbs: number | null;
    tankLiters: number | null;
    tankGallons: number | null;
    granularCapacityLiters: number | null;
    granularCapacityKg: number | null;
    swathWidthMeters: string | null;
    swathWidthFeet: string | null;
    maxFlowRateLMin: string | null;
    battery: string | null;
    batteryWh: number | null;
    chargeTimeMin: string | null;
    maxWindMs: number | null;
    maxWindMph: number | null;
    ipRating: string | null;
  };
  msrpUsd: string;
  usDealerPresence: string;
  bestFor: string;
  authorityLinks: { label: string; url: string }[];
  faqs: { question: string; answer: string }[];
  lastReviewedAt: string;
}

export interface Region {
  slug: string;
  name: string;
  icon?: string;
  tagline?: string;
  totalAcres?: number;
  states: string[];
  stateSlugs: string[];
  description: string;
  longDescription: string;
  aeoBlock: string;
  priceRangeUsd: string;
  primaryCrops: string[];
  sprayWindows: { crop: string; months: string; stage: string }[];
  keyInsights: string[];
  authorityLinks: { label: string; url: string }[];
  faqs: { question: string; answer: string }[];
  lastReviewedAt: string;
}

export interface ServiceDefinition {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  aeoBlock: string;
  priceMinUsd: number;
  priceMaxUsd: number;
  priceUnit?: string;
  icon?: string;
  keywords?: string[];
  authorityLinks: { label: string; url: string }[];
  faqs?: { question: string; answer: string }[];
  lastReviewedAt?: string;
}

export interface StateData {
  slug: string;
  name: string;
  abbreviation: string;
  regionSlug: string;          // e.g. 'corn-belt'
  regionName: string;          // e.g. 'Corn Belt'
  licensingAgency: string;     // e.g. 'IDALS'
  licensingAgencyUrl: string;
  aerialCategory: string;      // e.g. 'Category 11 (Aerial Application)'
  examsRequired: string;
  examFees: string;
  uniqueRules: string[];
  reciprocityStates: string[]; // abbreviated state names
  renewalCycle: string;
  ceRequirements: string;
  droneSpecificCredential: boolean;
  droneGuidanceUrl: string | null;
  extensionUrl: string;
  topCrops: {
    slug: string;
    name: string;
    acreage: string;
    notes: string;
  }[];
  rateRange: string;           // e.g. '$12 to $17/acre'
  statsRate: string;
  statsTopCrop: string;
  sprayWindows: {
    crop: string;
    rateRange: string;
    window: string;
  }[];
  neighboringStates: string[]; // slugs e.g. ['illinois', 'minnesota']
  aeoBlock: string;
  licensingDetails: string;    // long prose for the licensing section
  authorityLinks: { label: string; url: string }[];
  faqs: { question: string; answer: string }[];
  lastReviewedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'top-lists' | 'guide' | 'news' | 'case-study' | 'legislation';
  country?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readMinutes: number;
  tags: string[];
  relatedCounties?: string[];
  relatedCrops?: string[];
  relatedServices?: ServiceType[];
  content: string;
  featuredImage?: string;
  aeoBlock?: string;
  faqs?: { question: string; answer: string }[];
}
