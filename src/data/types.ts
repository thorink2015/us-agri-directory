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
  lastReviewedAt?: string;    // ISO date (YYYY-MM-DD) of last editorial review
}

export interface DroneModel {
  slug: string;
  name: string;
  manufacturer: string;
  tankCapacityL: number;
  coverageHaPerHour: number;
  haPerDay?: number;
  flowRateLPerMin?: number;
  workWidthM?: number;
  spreadingCapacityKg?: number;
  weightKg?: number;
  ipRating?: string;
  priceUsdMin?: number;
  priceUsdMax?: number;
  ndaaCompliant?: boolean;
  highlightFeature?: string;
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
}
