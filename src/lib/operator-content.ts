// ─── Auto-generated content helpers for operator profile pages ───────────
// Pure, side-effect-free functions that derive supplemental copy and
// structured data from existing operator + state + crop + region records.
// The goal is to lift sparse profiles above Google's indexation threshold
// without manual data entry on each operator. All helpers degrade gracefully
// when input data is missing.
// ──────────────────────────────────────────────────────────────────────────

import type { Operator, ServiceType } from '@/data/types';
import { SERVICE_LABELS } from '@/data/types';
import { getCropBySlug, CROP_NAME_MAP } from '@/data/crops';
import { getCountyBySlug } from '@/data/counties';
import { getStateData } from '@/data/states';
import { getRegionBySlug } from '@/data/regions';

export function wordCount(s: string | undefined | null): number {
  if (!s) return 0;
  return s.trim().split(/\s+/).filter(Boolean).length;
}

// counties.ts uses free-form `region` strings. This map lifts the ones that
// have a real /regions/[slug] page in regions.ts; anything not listed here
// renders as plain text without a cross-link.
const COUNTY_REGION_TO_SLUG: Record<string, string> = {
  'Corn Belt': 'corn-belt',
  'Great Plains': 'great-plains',
  'Delta': 'mississippi-delta',
  'Southeast': 'southeast',
};

export interface RegionContext {
  name: string;
  slug: string | null;
}

/** Resolves the operator's primary region (preferring states.ts.regionSlug
 *  when the state has full data, falling back to counties.ts.region). */
export function getOperatorRegion(operator: Operator): RegionContext | null {
  const primarySlug = operator.counties[0];
  if (!primarySlug) return null;

  const stateData = getStateData(primarySlug);
  if (stateData) {
    const region = getRegionBySlug(stateData.regionSlug);
    return {
      name: stateData.regionName,
      slug: region ? stateData.regionSlug : null,
    };
  }

  const county = getCountyBySlug(primarySlug);
  if (!county) return null;
  return {
    name: county.region,
    slug: COUNTY_REGION_TO_SLUG[county.region] || null,
  };
}

/** Returns the operator's covered states with display name, slug, and
 *  optional StateData for licensing copy. */
export interface CoveredStateContext {
  slug: string;
  name: string;
  licensingAgency: string | null;
  aerialCategory: string | null;
}

export function getCoveredStateContext(operator: Operator): CoveredStateContext[] {
  return operator.counties
    .map((slug): CoveredStateContext | null => {
      const county = getCountyBySlug(slug);
      if (!county) return null;
      const stateData = getStateData(slug);
      return {
        slug,
        name: county.name,
        licensingAgency: stateData?.licensingAgency ?? null,
        aerialCategory: stateData?.aerialCategory ?? null,
      };
    })
    .filter((c): c is CoveredStateContext => c !== null);
}

/** Joins a list of strings with proper grammar:
 *   ['a']            -> 'a'
 *   ['a', 'b']       -> 'a and b'
 *   ['a', 'b', 'c']  -> 'a, b and c' */
function humanList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const SERVICE_PHRASE: Partial<Record<ServiceType, string>> = {
  spraying: 'drone pesticide and fungicide spraying',
  seeding: 'aerial cover crop seeding',
  spreading: 'dry granular spreading',
  monitoring: 'multispectral crop scouting',
  mapping: 'aerial field mapping',
  training: 'pilot training',
  rental: 'equipment rental',
  sales: 'drone sales',
  consultancy: 'agronomy consulting',
  emergency: 'emergency response spraying',
};

/** Composes a 2-3 sentence factual paragraph for operators whose description
 *  field is under 30 words. Returns null when description is already long
 *  enough or when not enough source data exists to write a useful paragraph. */
export function composeAutoParagraph(operator: Operator): string | null {
  if (wordCount(operator.description) >= 30) return null;

  const services = operator.services
    .map((s) => SERVICE_PHRASE[s] || SERVICE_LABELS[s].toLowerCase())
    .filter(Boolean);
  if (services.length === 0) return null;

  const states = getCoveredStateContext(operator);
  if (states.length === 0) return null;

  const cropNames = operator.crops
    .map((c) => getCropBySlug(c)?.name || CROP_NAME_MAP[c] || null)
    .filter((n): n is string => Boolean(n));

  const region = getOperatorRegion(operator);
  const city = operator.city || states[0].name;
  const stateList = humanList(states.map((s) => s.name));
  const servicesList = humanList(services);
  const cropsList = cropNames.length > 0 ? humanList(cropNames) : 'row crops grown in the region';

  // Sentence 1: who they are + what they do + where
  const s1 = `${operator.name} provides ${servicesList} for ${cropsList} across ${stateList}.`;

  // Sentence 2: city + region context (when distinct from state)
  const cityIsState = city.toLowerCase() === states[0].name.toLowerCase();
  const regionPhrase = region ? `${region.name} region` : 'region';
  const s2 = cityIsState
    ? `The team works with farms throughout the ${regionPhrase}.`
    : `The team operates out of ${city} and serves farms throughout the ${regionPhrase}.`;

  // Sentence 3: licensing context if available, else operator type framing
  const primaryAgency = states.find((s) => s.licensingAgency)?.licensingAgency;
  const primaryState = states[0];
  const s3 = primaryAgency
    ? `Commercial drone spraying in ${primaryState.name} requires FAA Part 137 certification and a state pesticide applicator license issued by ${primaryAgency} with the aerial category endorsement.`
    : `Commercial drone spraying requires FAA Part 137 certification and a state pesticide applicator license with the aerial category endorsement in every state where work is performed.`;

  return `${s1} ${s2} ${s3}`;
}

// ─── Crop-specific pricing context ────────────────────────────────────────

export interface CropPricingLine {
  cropSlug: string;
  cropName: string;
  priceMinUsd: number;
  priceMaxUsd: number;
}

/** Returns one line per crop the operator services, drawing from crops.ts.
 *  Only emits lines for crops that have a real entry in crops.ts (i.e. the
 *  ones where /crops/[slug] exists). Empty when operator has no spraying
 *  service listed, no crops listed, or none of their crops have data. */
export function getCropPricingLines(operator: Operator): CropPricingLine[] {
  if (!operator.services.includes('spraying')) return [];
  return operator.crops
    .map((slug): CropPricingLine | null => {
      const crop = getCropBySlug(slug);
      if (!crop) return null;
      return {
        cropSlug: slug,
        cropName: crop.name,
        priceMinUsd: crop.priceMinUsd,
        priceMaxUsd: crop.priceMaxUsd,
      };
    })
    .filter((c): c is CropPricingLine => c !== null);
}

// ─── Two-FAQ block + FAQPage JSON-LD ──────────────────────────────────────

export interface OperatorFAQ {
  question: string;
  answer: string;
}

/** Returns the operator's effective spraying rate range — operator's stated
 *  rate if present, else the lowest min and highest max across the crops the
 *  operator services that have data, else the spraying service default. */
function getEffectiveSprayingRange(operator: Operator): { min: number; max: number } {
  if (operator.priceMinUsd && operator.priceMaxUsd) {
    return { min: operator.priceMinUsd, max: operator.priceMaxUsd };
  }
  const cropLines = getCropPricingLines(operator);
  if (cropLines.length > 0) {
    const min = Math.min(...cropLines.map((c) => c.priceMinUsd));
    const max = Math.max(...cropLines.map((c) => c.priceMaxUsd));
    return { min, max };
  }
  // Spraying service typical range from src/data/services.ts (slug 'spraying')
  return { min: 12, max: 22 };
}

export function composeOperatorFAQs(operator: Operator): OperatorFAQ[] {
  const states = getCoveredStateContext(operator);
  const primaryState = states[0];
  const primaryAgency = states.find((s) => s.licensingAgency)?.licensingAgency;
  const range = getEffectiveSprayingRange(operator);
  const stateName = primaryState?.name || 'their state';
  const isOperatorRated = Boolean(operator.priceMinUsd && operator.priceMaxUsd);

  const verifyAnswerOpener =
    `${operator.name} should hold three credentials before applying any pesticide by drone in ${stateName}: an FAA Part 107 Remote Pilot Certificate for the pilot in command, an FAA Part 137 Agricultural Aircraft Operator Certificate for the business, and a state pesticide applicator license with the aerial category endorsement.`;

  const verifyAnswerAgency = primaryAgency
    ? ` In ${stateName} the state credential is issued by ${primaryAgency}; you can ask the operator for their applicator license number and verify it through the agency directly.`
    : ` Ask the operator for their applicator license number and verify it through the issuing state agency directly.`;

  const verifyAnswerDocs =
    ` Reputable applicators will also share a current certificate of insurance with chemical drift coverage and the operator's Section 44807 exemption number on request. The site's state licensing reference covers the agency, exam and renewal cycle in every state.`;

  const rangeLabel = `$${range.min} to $${range.max}`;
  const rangeSourcePhrase = isOperatorRated
    ? `The operator's stated rate of ${rangeLabel} per acre`
    : `Typical drone spraying rates of ${rangeLabel} per acre in the region`;

  const includesAnswer =
    `${rangeSourcePhrase} usually covers the application itself: drone calibration, GPS-guided flight planning, mixing and loading product into the tank, the labor and machine time to fly the field, and a written application record (date, time, product, EPA reg number, rate, weather, field ID) consistent with FIFRA Part 170 record-keeping. Pesticide product, surfactants and adjuvants are typically supplied by the farmer and not included in the per-acre rate. Common surcharges include long travel beyond the operator's standard radius, after-hours or emergency turnaround, fields with significant obstructions or steep terrain, and minimum-acreage charges below a stated field size. Confirm what is and is not included in writing before any application.`;

  return [
    {
      question: `How do I verify ${operator.name} is licensed for aerial pesticide application in ${stateName}?`,
      answer: verifyAnswerOpener + verifyAnswerAgency + verifyAnswerDocs,
    },
    {
      question: `What does ${rangeLabel} per acre include for drone spraying?`,
      answer: includesAnswer,
    },
  ];
}

/** FAQPage JSON-LD object for inline <script type="application/ld+json">. */
export function operatorFAQSchema(faqs: OperatorFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
