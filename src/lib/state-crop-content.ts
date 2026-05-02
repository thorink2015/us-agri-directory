// ─── Auto-generated content helpers for /states/[slug]/crops/[crop] ──────
// Pure, side-effect-free functions that lift the state-crop combo template
// above Google's near-duplicate threshold by composing state-specific copy
// and structured data from existing src/data/* records. Mirrors the
// operator-content.ts pattern (see _memory/code-patterns.md).
// ─────────────────────────────────────────────────────────────────────────

import type { StateData, Crop, County } from '@/data/types';
import type { FAQ } from '@/data/faqs';
import { stateData, getStateData } from '@/data/states';
import { counties, getCountyBySlug } from '@/data/counties';
import { crops as cropList, getCropBySlug } from '@/data/crops';
import { getOperatorsByCounty } from '@/data/operators';
import { formatPrice } from './utils';

// Spray windows in states.ts use free-form labels like 'Cotton defoliant',
// 'Cover crop seeding', 'Wheat heading' etc. This map drives substring
// matching from a crop slug to the relevant window labels for that crop.
const CROP_KEYWORDS: Record<string, string[]> = {
  corn: ['corn', 'maize'],
  soybeans: ['soybean'],
  wheat: ['wheat'],
  cotton: ['cotton'],
  rice: ['rice'],
  grapes: ['grape', 'vineyard', 'wine'],
  orchards: ['orchard', 'apple', 'cherry', 'almond', 'walnut', 'pecan', 'peach', 'pistachio'],
  'cover-crops': ['cover crop', 'cover-crop', 'cover seed'],
};

export interface MatchedSprayWindow {
  crop: string;       // free-form label from data, e.g. 'Cotton defoliant'
  rateRange: string;  // e.g. '$14 to $20'
  window: string;     // e.g. 'Sep to Oct'
}

/** Returns every sprayWindows[] entry from a state that matches the given
 *  crop slug by keyword. Empty array when state has no entries or no match. */
export function findCropSprayWindows(
  state: StateData | undefined,
  cropSlug: string,
): MatchedSprayWindow[] {
  if (!state || !state.sprayWindows || state.sprayWindows.length === 0) return [];
  const keywords = CROP_KEYWORDS[cropSlug] || [cropSlug.replace(/-/g, ' ')];
  return state.sprayWindows.filter((w) => {
    const lower = w.crop.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  });
}

/** Lookup the matching topCrops[] entry on a state, by crop slug. */
export function getStateTopCropEntry(
  state: StateData | undefined,
  cropSlug: string,
): { slug: string; name: string; acreage: string; notes: string } | undefined {
  if (!state) return undefined;
  return state.topCrops.find((tc) => tc.slug === cropSlug);
}

// ─── Intro paragraph ─────────────────────────────────────────────────────

/** Composes a 90–140 word state-specific intro paragraph for the
 *  state-crop page, drawing only from real fields. Each sentence is
 *  emitted only when the underlying data is present, so the paragraph
 *  shrinks rather than fabricating when a state has thin data. */
export function composeStateCropIntro(
  county: County,
  crop: Crop,
  state: StateData | undefined,
  windows: MatchedSprayWindow[],
  topCropEntry: ReturnType<typeof getStateTopCropEntry>,
): string {
  const sentences: string[] = [];
  const cropLc = crop.name.toLowerCase();

  // Sentence 1: rate context. Prefer state.statsRate framing when present.
  if (state?.statsRate) {
    sentences.push(
      `In ${county.name}, drone spraying for ${cropLc} sits within the broader state custom-rate band of ${state.statsRate}, with the most comparable per-acre range for ${cropLc} applications running ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}.`,
    );
  } else {
    sentences.push(
      `In ${county.name}, drone spraying for ${cropLc} typically runs ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}.`,
    );
  }

  // Sentence 2: spray-window timing if known for this state-crop combo.
  if (windows.length === 1) {
    const w = windows[0];
    sentences.push(
      `Applications target ${w.window.toLowerCase()} for the ${w.crop.toLowerCase()} window, with state rate guidance of ${w.rateRange} per acre.`,
    );
  } else if (windows.length >= 2) {
    const fragments = windows
      .slice(0, 3)
      .map((w) => `${w.crop.toLowerCase()} in ${w.window.toLowerCase()} at ${w.rateRange} per acre`);
    sentences.push(
      `${county.name} ${cropLc} drone services span multiple windows: ${humanList(fragments)}.`,
    );
  }

  // Sentence 3: state-curated acreage and ranking note.
  if (topCropEntry) {
    sentences.push(
      `${county.name} runs ${topCropEntry.acreage} of ${cropLc}; ${trimPeriod(topCropEntry.notes)}.`,
    );
  }

  // Sentence 4: regional context from state.regionName.
  if (state?.regionName) {
    sentences.push(
      `${county.name} sits in the ${state.regionName} region, which shapes the disease, drift and timing pressures local operators plan around.`,
    );
  }

  // Sentence 5: licensing one-liner so the page lands a state-specific
  // regulatory data point alongside the agronomic context.
  if (state?.aerialCategory && state.licensingAgency) {
    sentences.push(
      `Commercial drone applications in ${county.name} require ${state.aerialCategory} from ${state.licensingAgency} on top of FAA Part 137 certification.`,
    );
  }

  return sentences.join(' ');
}

// ─── Combined FAQ block + FAQPage JSON-LD ────────────────────────────────

/** Returns 7–11 FAQ entries: 3 state-crop generic FAQs (rate, timing,
 *  drone-vs-ground) plus the 4–6 crop-specific FAQs already on crop.faqs.
 *  Each generic FAQ interpolates state name and licensing agency where
 *  available. */
export function composeStateCropFAQs(
  county: County,
  crop: Crop,
  state: StateData | undefined,
  windows: MatchedSprayWindow[],
): FAQ[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const cropLc = crop.name.toLowerCase();
  const treatmentMonths = crop.treatmentMonths.map((m) => monthNames[m - 1]).join(', ');

  // Cost FAQ — uses state-specific window rates when available, falls
  // back to crop range when the state has no matching window data.
  const costAnswerOpener = `Drone spraying rates for ${cropLc} in ${county.name} typically run ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)} for application only; the farmer supplies the chemical product.`;
  const costAnswerStateBand = state?.statsRate
    ? ` State-level custom-rate guidance for ${county.name} averages ${state.statsRate}.`
    : '';
  const costAnswerWindow = windows.length > 0
    ? ` Specific window data for ${county.name}: ${windows
      .slice(0, 3)
      .map((w) => `${w.crop.toLowerCase()} at ${w.rateRange} per acre`)
      .join(', ')}.`
    : '';
  const costAnswerVar = ' Pricing varies based on total acreage, distance from the operator base and product type.';

  const timingAnswerOpener = `Optimal drone application timing for ${cropLc} runs ${treatmentMonths}.`;
  const timingAnswerWindow = windows.length > 0
    ? ` In ${county.name} the operator-reported windows are ${windows
      .slice(0, 3)
      .map((w) => `${w.crop.toLowerCase()} (${w.window})`)
      .join(', ')}.`
    : '';
  const timingAnswerWeather = ` Exact timing depends on weather, growth stage and pest or disease pressure each season; contact a local operator in ${county.name} for scheduling at least 4 to 6 weeks ahead of the peak window.`;

  const advAnswer = `Drone spraying on ${cropLc} offers zero soil compaction, the ability to operate when fields are too wet for tractors, GPS-guided uniform coverage at 95%+ accuracy and the ability to treat small or irregularly shaped fields. Peer-reviewed studies (Nature Scientific Reports 2025, ScienceDirect 2025, ACS 2023) report 46 to 75% pesticide use reduction, 65 to 70% drift reduction at field boundaries and 90 to 99% lower operator chemical exposure versus ground equipment.`;

  const licAnswer = state?.licensingAgency && state.aerialCategory
    ? `Commercial drone pesticide application in ${county.name} requires three credentials: an FAA Part 107 Remote Pilot Certificate for the pilot, an FAA Part 137 Agricultural Aircraft Operator Certificate for the business, and ${state.aerialCategory} from ${state.licensingAgency}. Confirm any operator you hire holds all three before any application.`
    : `Commercial drone pesticide application in ${county.name} requires FAA Part 107, FAA Part 137 and a state pesticide applicator license with the aerial category endorsement. Confirm any operator you hire holds all three before any application.`;

  const generic: FAQ[] = [
    {
      question: `How much does drone spraying for ${cropLc} cost in ${county.name}?`,
      answer: costAnswerOpener + costAnswerStateBand + costAnswerWindow + costAnswerVar,
    },
    {
      question: `When should I schedule drone applications for ${cropLc} in ${county.name}?`,
      answer: timingAnswerOpener + timingAnswerWindow + timingAnswerWeather,
    },
    {
      question: `What licenses does an operator need to spray ${cropLc} by drone in ${county.name}?`,
      answer: licAnswer,
    },
    {
      question: `What advantages does drone spraying offer for ${cropLc} versus ground equipment?`,
      answer: advAnswer,
    },
  ];

  return [...generic, ...(crop.faqs || [])];
}

/** FAQPage JSON-LD object for inline <script type="application/ld+json">. */
export function stateCropFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

// ─── Noindex gating for weak combos ──────────────────────────────────────

/** True when the state-crop combo has zero indexation signal:
 *  - The state's top-3 county.mainCrops list does NOT include this crop
 *  - AND the state's curated topCrops[] does NOT include this crop either
 *  - AND no operator covering this state lists this crop in their crops[]
 *
 *  When all three conditions hold, the page renders with
 *  <meta name="robots" content="noindex,follow"> so internal links stay
 *  resolvable but Google stops competing for crawl budget on the combo. */
export function shouldNoindexStateCrop(stateSlug: string, cropSlug: string): boolean {
  const county = getCountyBySlug(stateSlug);
  const state = getStateData(stateSlug);
  const inCountyMain = county?.mainCrops?.includes(cropSlug) ?? false;
  const inStateTop = state?.topCrops.some((tc) => tc.slug === cropSlug) ?? false;
  if (inCountyMain || inStateTop) return false;
  const ops = getOperatorsByCounty(stateSlug).filter((op) => op.crops.includes(cropSlug));
  return ops.length === 0;
}

/** Returns a per-crop breakdown of how many states each crop is gated as
 *  noindex on, and the list of state slugs for each. Used at build time
 *  to log the gate distribution for transparency. */
export function getNoindexBreakdown(): {
  total: number;
  totalCombos: number;
  perCrop: Record<string, string[]>;
} {
  const perCrop: Record<string, string[]> = {};
  let total = 0;
  for (const c of cropList) {
    const list: string[] = [];
    for (const co of counties) {
      if (shouldNoindexStateCrop(co.slug, c.slug)) list.push(co.slug);
    }
    perCrop[c.slug] = list;
    total += list.length;
  }
  return { total, totalCombos: counties.length * cropList.length, perCrop };
}

// ─── Local helpers ───────────────────────────────────────────────────────

function humanList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function trimPeriod(s: string): string {
  return s.replace(/\s*\.\s*$/, '');
}

// Suppress 'imported but unused' diagnostic when consumers only import a subset.
export type StateCropContentExports = {
  stateData: typeof stateData;
  getCropBySlug: typeof getCropBySlug;
};
