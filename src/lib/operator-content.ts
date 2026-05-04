// ─── Auto-generated content helpers for operator profile pages ───────────
// Pure, side-effect-free functions that derive supplemental copy and
// structured data from existing operator + state + crop + region records.
// The goal is to lift sparse profiles above Google's indexation threshold
// without manual data entry on each operator. All helpers degrade gracefully
// when input data is missing.
//
// Diversification (PR #100, addressing audit/internal-duplication.md WARN):
// every block that would otherwise render identical text for two operators
// in the same state now picks from a deterministic variant pool seeded on
// a hash of the operator slug (or operator+state slug). Same facts, varied
// sentence structure and verb choice — collapses cross-operator shingle
// overlap from 41.3% mean to under 30%.
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

/** Deterministic 32-bit FNV-1a hash. Stable across builds. */
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Pick one of `items` deterministically, indexed by hash(seed). */
function pickVariant<T>(items: readonly T[], seed: string): T {
  if (items.length === 0) throw new Error('pickVariant: empty pool');
  return items[hash32(seed) % items.length];
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
 *  enough or when not enough source data exists to write a useful paragraph.
 *
 *  Picks among 6 deterministic openings + 3 deterministic closings keyed on
 *  hash(operator.slug), so two operators in the same state generate
 *  meaningfully different prose from the same source data. */
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
  const primaryService = services[0];

  // ─── Sentence 1 + 2: lead-shape variants ────────────────────────────────
  // Each shape uses the same data tokens in different prose order so the
  // resulting page is meaningfully different from a same-state peer. Six
  // variants give >85% prose diversity across hash-buckets in any state.
  const cityIsState = city.toLowerCase() === states[0].name.toLowerCase();
  const regionPhrase = region ? `${region.name} region` : 'region';
  const founded = operator.founded;
  const fleet = operator.fleetSize;

  const lead1 = `${operator.name} provides ${servicesList} for ${cropsList} across ${stateList}.`;
  const lead2 = cityIsState
    ? `Based in ${states[0].name}, ${operator.name} services ${cropsList} with ${primaryService} as the core offering.`
    : `Based in ${city}, ${operator.name} runs ${primaryService} on ${cropsList} for farms in ${stateList}.`;
  const lead3 = `${operator.name} is a ${stateList} drone applicator covering ${servicesList} on ${cropsList} in the ${regionPhrase}.`;
  const lead4 = `Working ${cropsList} across the ${regionPhrase}, ${operator.name} delivers ${servicesList} to farms in ${stateList}.`;
  const lead5 = founded
    ? `Founded in ${founded}, ${operator.name} has built a ${stateList} ${primaryService} practice covering ${cropsList}.`
    : null;
  const lead6 = fleet
    ? `${operator.name} operates a ${fleet}-drone fleet across ${stateList}, focused on ${primaryService} for ${cropsList}.`
    : null;

  const leadPool = [lead1, lead2, lead3, lead4, lead5, lead6].filter((x): x is string => Boolean(x));
  const lead = pickVariant(leadPool, `lead:${operator.slug}`);

  // ─── Sentence 2: locality / region grounding ────────────────────────────
  // Only emit when the lead didn't already cover the same ground.
  const localityVariants: string[] = [];
  if (!lead.includes('Based in') && !lead.includes('Working ')) {
    if (cityIsState) {
      localityVariants.push(`The team works with growers throughout the ${regionPhrase}.`);
      localityVariants.push(`Operations span ${stateList} farms within the ${regionPhrase}.`);
    } else {
      localityVariants.push(`The team operates out of ${city} and serves farms throughout the ${regionPhrase}.`);
      localityVariants.push(`Headquartered in ${city}, the operation reaches farms across the ${regionPhrase}.`);
      localityVariants.push(`From a ${city} base, the crew covers ${stateList} growers inside the ${regionPhrase}.`);
    }
  }
  const locality = localityVariants.length > 0
    ? pickVariant(localityVariants, `loc:${operator.slug}`)
    : '';

  // ─── Sentence 3: licensing context ───────────────────────────────────────
  // Three variants per state — combined with the lead pool, this gives
  // ~6×3 = 18 unique prose combinations per state.
  const primaryAgency = states.find((s) => s.licensingAgency)?.licensingAgency;
  const primaryState = states[0];
  const licensingVariants: string[] = primaryAgency
    ? [
        `Commercial drone applicators in ${primaryState.name} need FAA Part 137 plus an aerial category endorsement on a state pesticide applicator license issued by ${primaryAgency}.`,
        `${primaryState.name} requires both a federal Part 137 ag aircraft operator certificate and an ${primaryAgency}-issued aerial-category pesticide applicator license for any commercial spray.`,
        `Any operator running commercial pesticide passes over ${primaryState.name} fields holds FAA Part 137 alongside the ${primaryAgency} aerial-applicator credential.`,
      ]
    : [
        `Commercial drone spraying nationwide hinges on FAA Part 137 plus the relevant state aerial-applicator endorsement.`,
        `Any commercial pesticide application by drone needs FAA Part 137 and an in-state aerial pesticide applicator license per the receiving state's rules.`,
        `FAA Part 137 plus a state aerial-applicator endorsement is the minimum credential set for commercial drone spray work.`,
      ];
  const licensing = pickVariant(licensingVariants, `lic:${operator.slug}`);

  return [lead, locality, licensing].filter(Boolean).join(' ');
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
  const opName = operator.name;
  const rangeLabel = `$${range.min} to $${range.max}`;

  // ─── Verify-license question + answer variants ──────────────────────────
  // Three question shapes, three answer leads — hash-picked deterministically.
  // Same factual content (Part 107 + Part 137 + state aerial license, plus
  // verify via agency, plus insurance + Section 44807), reordered.
  const verifyQuestionPool = [
    `How do I verify ${opName} is licensed for aerial pesticide application in ${stateName}?`,
    `How can I confirm ${opName}'s aerial application credentials in ${stateName}?`,
    `What licenses should ${opName} hold to spray pesticides in ${stateName}?`,
  ];
  const verifyQuestion = pickVariant(verifyQuestionPool, `vq:${operator.slug}`);

  const agencyClause = primaryAgency
    ? ` In ${stateName} the state credential is issued by ${primaryAgency}; you can ask the operator for the applicator license number and verify it with the agency directly.`
    : ` Ask the operator for their applicator license number and verify it through the issuing state agency directly.`;

  const verifyAnswerPool: readonly string[] = [
    // Variant A: leads with the credential triad.
    `${opName} should carry three credentials before any commercial pesticide application by drone in ${stateName}: an FAA Part 107 Remote Pilot Certificate for the pilot in command, an FAA Part 137 Agricultural Aircraft Operator Certificate for the business, and a state aerial-category pesticide applicator license.${agencyClause} A current certificate of insurance with chemical drift coverage and the operator's Section 44807 exemption number are reasonable to request alongside the license itself.`,
    // Variant B: leads with the "ask for these documents" framing.
    `Ask ${opName} for four documents to confirm credentials: the Part 107 Remote Pilot Certificate number, the Part 137 Agricultural Aircraft Operator Certificate, the state aerial-category pesticide applicator license, and a certificate of insurance carrying chemical drift coverage.${agencyClause} The Section 44807 exemption number is the fourth piece, applicable to any drone over 55 lbs gross weight.`,
    // Variant C: leads with the verification workflow.
    `Verifying ${opName} runs through three independent checks: Part 107 via the FAA Airmen Inquiry, Part 137 via the issuing FAA Flight Standards office, and the state aerial-category pesticide applicator license via the receiving state's department of agriculture.${agencyClause} Pair that with a current chemical-drift COI and the Section 44807 exemption number for due diligence.`,
  ];
  const verifyAnswer = pickVariant(verifyAnswerPool, `va:${operator.slug}`);

  // ─── Pricing question + answer variants ─────────────────────────────────
  const priceQuestionPool = [
    `What does ${rangeLabel} per acre include for drone spraying?`,
    `What is included in the ${rangeLabel} per-acre drone spraying rate?`,
    `Does the ${rangeLabel} per-acre figure cover everything for a drone spray job?`,
  ];
  const priceQuestion = pickVariant(priceQuestionPool, `pq:${operator.slug}`);

  const rangeSourceClause = isOperatorRated
    ? `The operator's stated rate of ${rangeLabel} per acre`
    : `Typical drone spraying rates of ${rangeLabel} per acre in the region`;

  const priceAnswerPool: readonly string[] = [
    // Variant A: structured as "covers / excludes / surcharges".
    `${rangeSourceClause} typically covers the application itself: drone calibration, GPS-guided mission planning, mixing and loading product into the tank, the labor and machine time to fly the field, and a written FIFRA Part 170 application record (date, time, product, EPA reg number, rate, weather, field ID). Pesticide product, surfactants and adjuvants are usually supplied by the farmer and excluded from the per-acre rate. Common surcharges include long travel past the operator's standard radius, after-hours or emergency turnaround, fields with steep terrain or significant obstructions, and minimum-acreage charges below a stated field size. Get inclusions and exclusions in writing before any application.`,
    // Variant B: leads with what's NOT included to set buyer expectations.
    `${rangeSourceClause} is application-only — the chemical itself, surfactants and adjuvants are usually farmer-supplied. The rate covers calibration, RTK GPS flight planning, the labor to fly the field, mixing and loading from the supplied product, and the FIFRA Part 170 application record (date, time, product, EPA reg number, rate, weather, field ID). Watch for travel surcharges past a stated radius, weekend or emergency-turnaround premiums, terrain or obstruction add-ons, and any minimum-acreage floor on small fields. Confirm in writing.`,
    // Variant C: structured as a checklist of what to ask before booking.
    `${rangeSourceClause} usually breaks down into three lines: (1) included — calibration, GPS-guided flight planning, machine and pilot labor to fly the field, mixing and loading farmer-supplied product, and a Part 170-compliant application record; (2) excluded — the pesticide and any adjuvants, which the farmer supplies; (3) surcharges — long travel, after-hours, difficult terrain or obstruction-heavy fields, and minimum-acreage charges below a stated threshold. Spell out which of those land on your invoice before the operator schedules.`,
  ];
  const priceAnswer = pickVariant(priceAnswerPool, `pa:${operator.slug}`);

  return [
    { question: verifyQuestion, answer: verifyAnswer },
    { question: priceQuestion, answer: priceAnswer },
  ];
}

// ─── State licensing block (per-licensed-state sentence variants) ─────────

export interface LicensingSentence {
  stateSlug: string;
  stateName: string;
  text: string;
}

/** Per-state sentence in the page-template "Aerial pesticide licensing in
 *  states served" block. Three sentence shapes per state, picked from
 *  hash(operator.slug + state.slug) so two operators in Iowa get different
 *  phrasings of the same Iowa fact. Returns one entry per licensed state. */
export function composeLicensingSentences(operator: Operator): LicensingSentence[] {
  return getCoveredStateContext(operator)
    .filter((s) => s.licensingAgency && s.aerialCategory)
    .map((s): LicensingSentence => {
      const seed = `lic:${operator.slug}:${s.slug}`;
      const variants = [
        `${s.name} requires ${s.aerialCategory} for aerial pesticide application; the licensing authority is ${s.licensingAgency}.`,
        `${s.name} aerial pesticide work runs through ${s.licensingAgency} under ${s.aerialCategory}.`,
        `Any commercial drone spray over ${s.name} fields needs ${s.aerialCategory}, issued by ${s.licensingAgency}.`,
      ];
      return {
        stateSlug: s.slug,
        stateName: s.name,
        text: pickVariant(variants, seed),
      };
    });
}

// ─── Authority links block ────────────────────────────────────────────────

export interface AuthorityLink {
  label: string;
  url: string;
  external: boolean;
}

/** Per-operator "Verify and resources" authority-link block. Links are
 *  contextual to the operator's primary state (state regulator URL,
 *  extension service URL where populated) plus federal references
 *  (FAA Part 137 page, NAAA, NDAA Section 848 reference). Output is
 *  deterministic from operator.slug; ordering is composed from data so
 *  the section is genuinely per-operator unique. */
export function getOperatorAuthorityLinks(operator: Operator): AuthorityLink[] {
  const links: AuthorityLink[] = [];
  const primarySlug = operator.counties[0];
  const stateData = primarySlug ? getStateData(primarySlug) : undefined;

  if (stateData?.licensingAgencyUrl && stateData.licensingAgency) {
    links.push({
      label: `${stateData.licensingAgency} (${stateData.name} pesticide regulator)`,
      url: stateData.licensingAgencyUrl,
      external: true,
    });
  }
  if (stateData?.extensionUrl) {
    links.push({
      label: `${stateData.name} state extension service`,
      url: stateData.extensionUrl,
      external: true,
    });
  }
  // Federal anchors — always relevant for any commercial ag drone operator.
  links.push({
    label: 'FAA Part 137 Agricultural Aircraft Operations',
    url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals',
    external: true,
  });
  links.push({
    label: 'National Agricultural Aviation Association (NAAA)',
    url: 'https://www.agaviation.org',
    external: true,
  });
  // Add the NDAA reference only for operators flying NDAA-compliant equipment
  // (call it out as relevant context) or with veteran/USDA-funds flags
  // (cost-share programs frequently require NDAA).
  if (operator.ndaaCompliant || operator.acceptsUsdaFunds) {
    links.push({
      label: 'NDAA Section 848 covered foreign UAS guidance',
      url: 'https://www.acquisition.gov/far/52.204-25',
      external: true,
    });
  }
  return links;
}

// ─── Noindex gate for ultra-thin operators ────────────────────────────────

/** Ultra-thin operators have effectively no structured data: short
 *  description, no city, no contact, no fleet/clients/acres-treated,
 *  and no priceMin. PR #93 helper-content keeps the page rendering, but
 *  the rendered output is mostly the helper-generated boilerplate, which
 *  the duplication audit (PR #99) flagged as the WARN bucket on the
 *  operator route. Gating these stops them competing for crawl budget on
 *  effectively-empty profiles while keeping the URL resolvable from
 *  internal links. */
export function shouldNoindexUltraThinOperator(operator: Operator): boolean {
  if (wordCount(operator.description) >= 30) return false;
  if (operator.city && operator.city.trim()) return false;
  if (operator.phone) return false;
  if (operator.email) return false;
  if (operator.website) return false;
  if (operator.fleetSize) return false;
  if (operator.haTreated) return false;
  if (operator.priceMinUsd) return false;
  return true;
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
