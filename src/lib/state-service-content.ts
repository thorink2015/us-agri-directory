// ─── Auto-generated content helpers for /states/[slug]/services/[service] ──
// Pure, side-effect-free functions that lift the service-state combo template
// above Google's near-duplicate threshold by composing state-specific copy
// and structured data from existing src/data/* records. Mirrors the
// state-crop-content.ts pattern (see _memory/code-patterns.md).
// ────────────────────────────────────────────────────────────────────────────

import type { StateData, Crop, County, ServiceDefinition, ServiceType } from '@/data/types';
import type { FAQ } from '@/data/faqs';
import { SERVICE_LABELS } from '@/data/types';
import { getStateData } from '@/data/states';
import { counties, getCountyBySlug } from '@/data/counties';
import { getCropBySlug } from '@/data/crops';
import { services as servicesList, getServiceBySlug } from '@/data/services';
import { getOperatorsByCounty } from '@/data/operators';
import { formatPrice } from './utils';

// Services that interact with specific crops (vs operational/business services
// like training, rental, sales, consultancy).
const CROP_AFFINITY_SERVICES: ReadonlySet<ServiceType> = new Set<ServiceType>([
  'spraying',
  'seeding',
  'monitoring',
  'spreading',
  'mapping',
  'emergency',
]);

export function hasCropAffinity(serviceSlug: ServiceType): boolean {
  return CROP_AFFINITY_SERVICES.has(serviceSlug);
}

/** Number of operators in the given state whose `services[]` includes the
 *  given service slug. Source of truth for the noindex gate. */
export function countOperatorsForServiceInState(
  stateSlug: string,
  serviceSlug: ServiceType,
): number {
  return getOperatorsByCounty(stateSlug).filter((op) => op.services.includes(serviceSlug)).length;
}

// ─── Crop affinity callout ───────────────────────────────────────────────

export interface CropAffinityEntry {
  slug: string;
  name: string;
  priceMinUsd?: number;
  priceMaxUsd?: number;
}

/** For services with crop affinity, pick up to 3 crops the state cares about
 *  (drawn from county.mainCrops first, then state.topCrops). Each entry is
 *  resolved against crops.ts so the chip set links to real /crops/[slug] and
 *  /states/[slug]/crops/[crop] pages. Returns [] when service has no affinity
 *  or when no qualifying crops exist. */
export function getStateCropsForService(
  county: County,
  state: StateData | undefined,
  service: ServiceDefinition,
): CropAffinityEntry[] {
  if (!hasCropAffinity(service.slug as ServiceType)) return [];
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const slug of county.mainCrops || []) {
    if (!seen.has(slug)) {
      seen.add(slug);
      ordered.push(slug);
    }
  }
  if (state) {
    for (const tc of state.topCrops) {
      if (!seen.has(tc.slug)) {
        seen.add(tc.slug);
        ordered.push(tc.slug);
      }
    }
  }
  return ordered
    .map((slug): CropAffinityEntry | null => {
      const crop = getCropBySlug(slug);
      if (!crop) return null;
      return {
        slug,
        name: crop.name,
        priceMinUsd: crop.priceMinUsd,
        priceMaxUsd: crop.priceMaxUsd,
      };
    })
    .filter((c): c is CropAffinityEntry => c !== null)
    .slice(0, 3);
}

// ─── Intro paragraph ─────────────────────────────────────────────────────

/** Composes a 90–140 word state-specific intro paragraph for the
 *  service-state page. Each sentence is conditional, so the paragraph
 *  shrinks rather than fabricating when state data is thin. */
export function composeStateServiceIntro(
  county: County,
  service: ServiceDefinition,
  state: StateData | undefined,
  opCount: number,
  cropAffinity: CropAffinityEntry[],
): string {
  const sentences: string[] = [];
  const svcLc = service.name.toLowerCase();
  const svcUnit = service.priceUnit || 'per acre';

  // Sentence 1: who offers it in this state, or fallback if zero.
  if (opCount === 1) {
    sentences.push(
      `${service.name} drone services in ${county.name} are listed by 1 operator in this directory.`,
    );
  } else if (opCount > 1) {
    sentences.push(
      `${service.name} drone services in ${county.name} are listed by ${opCount} operators in this directory.`,
    );
  } else {
    sentences.push(
      `${service.name} drone services in ${county.name} are not yet listed by an operator in this directory; the page below covers what to look for and how the service works in ${county.name}.`,
    );
  }

  // Sentence 2: pricing — prefer state.statsRate when available and the
  // service is rate-rated per acre, else use the service-typical band.
  if (state?.statsRate && hasCropAffinity(service.slug as ServiceType)) {
    sentences.push(
      `${county.name}'s state-level custom-rate guidance averages ${state.statsRate}, with the broader ${svcLc} band running ${formatPrice(service.priceMinUsd, service.priceMaxUsd)} ${svcUnit === 'per acre' ? '' : svcUnit}.`.replace(/\s+\./g, '.'),
    );
  } else {
    sentences.push(
      `Typical pricing for ${svcLc} runs ${formatPrice(service.priceMinUsd, service.priceMaxUsd)}${
        svcUnit !== 'per acre' ? ` (${svcUnit})` : ''
      }.`,
    );
  }

  // Sentence 3: crop affinity, only when the service has it and the state has crops.
  if (cropAffinity.length > 0) {
    const list = humanList(cropAffinity.map((c) => c.name.toLowerCase()));
    sentences.push(`In ${county.name}, ${svcLc} most commonly serves ${list}.`);
  }

  // Sentence 4: regional context.
  if (state?.regionName) {
    sentences.push(
      `${county.name} sits in the ${state.regionName} region, which shapes the calendar, weather and competitive pressure local operators plan around.`,
    );
  }

  // Sentence 5: licensing one-liner so the page lands a state-specific
  // regulatory data point alongside the operational context.
  if (state?.aerialCategory && state.licensingAgency) {
    sentences.push(
      `Commercial drone applications in ${county.name} require ${state.aerialCategory} from ${state.licensingAgency} on top of FAA Part 137 certification.`,
    );
  }

  return sentences.join(' ');
}

// ─── Combined FAQ block + FAQPage JSON-LD ────────────────────────────────

/** Returns 4–9 FAQ entries: 3 state-service generic FAQs (operator count,
 *  licensing, scheduling) plus the 0–5 service-specific FAQs already on
 *  service.faqs. Each generic FAQ interpolates state name, agency and
 *  operator count where available. */
export function composeStateServiceFAQs(
  county: County,
  service: ServiceDefinition,
  state: StateData | undefined,
  opCount: number,
  cropAffinity: CropAffinityEntry[],
): FAQ[] {
  const svcLc = service.name.toLowerCase();
  const svcUnit = service.priceUnit || 'per acre';

  const opCountFAQ: FAQ = {
    question: `How many operators offer ${svcLc} in ${county.name}?`,
    answer:
      opCount === 0
        ? `${county.name} does not yet have an operator in our directory listing ${svcLc} as a service. Many regional and national operators cover multiple states, so contact operators in neighbouring states or list your business free if you provide ${svcLc} in ${county.name}.`
        : `${opCount} operator${opCount === 1 ? '' : 's'} in our directory list${opCount === 1 ? 's' : ''} ${svcLc} as a service in ${county.name}. Use the operator grid below to compare credentials, fleet, response time and pricing before reaching out.`,
  };

  const licAnswer = state?.licensingAgency && state.aerialCategory
    ? `Commercial ${svcLc} in ${county.name} requires three credentials: an FAA Part 107 Remote Pilot Certificate for the pilot, an FAA Part 137 Agricultural Aircraft Operator Certificate for the business, and ${state.aerialCategory} from ${state.licensingAgency}. Confirm any operator you hire holds all three before any application.`
    : `Commercial ${svcLc} in ${county.name} requires FAA Part 107, FAA Part 137 and a state pesticide applicator license with the aerial category endorsement. Confirm any operator you hire holds all three before any application.`;

  const licensingFAQ: FAQ = {
    question: `What licensing do operators need for ${svcLc} in ${county.name}?`,
    answer: licAnswer,
  };

  const cropContext = cropAffinity.length > 0
    ? ` In ${county.name}, ${svcLc} is most often booked for ${humanList(cropAffinity.map((c) => c.name.toLowerCase()))}, each with its own seasonal window.`
    : '';

  const schedulingFAQ: FAQ = {
    question: `How far ahead should I book ${svcLc} in ${county.name}?`,
    answer: `Most ${county.name} operators book 4 to 6 weeks ahead of peak windows; ${svcUnit === 'per acre' ? 'rate' : 'pricing'} confirmation is contract-bound and operator-specific.${cropContext} For one-off jobs during peak demand spikes, supply tightens fast — establishing the operator relationship in the off-season pays off.`,
  };

  const generic: FAQ[] = [opCountFAQ, licensingFAQ, schedulingFAQ];
  return [...generic, ...(service.faqs || [])];
}

/** FAQPage JSON-LD object for inline <script type="application/ld+json">. */
export function stateServiceFAQSchema(faqs: FAQ[]) {
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

// ─── Noindex gate for weak combos ────────────────────────────────────────

/** True when fewer than 3 operators in the state list this service.
 *  When triggered, the page renders <meta name="robots" content="noindex,
 *  follow"> so internal links stay resolvable but Google stops competing
 *  for crawl budget. URLs remain in generateStaticParams. */
export function shouldNoindexStateService(
  stateSlug: string,
  serviceSlug: string,
): boolean {
  const svc = getServiceBySlug(serviceSlug as ServiceType);
  if (!svc) return false;
  return countOperatorsForServiceInState(stateSlug, svc.slug as ServiceType) < 3;
}

/** Per-service breakdown of how many states each service is gated as
 *  noindex on. Used at build time to log the gate distribution. */
export function getServiceStateNoindexBreakdown(): {
  total: number;
  totalCombos: number;
  perService: Record<string, string[]>;
} {
  const perService: Record<string, string[]> = {};
  let total = 0;
  for (const svc of servicesList) {
    const list: string[] = [];
    for (const co of counties) {
      if (shouldNoindexStateService(co.slug, svc.slug)) list.push(co.slug);
    }
    perService[svc.slug] = list;
    total += list.length;
  }
  return { total, totalCombos: counties.length * servicesList.length, perService };
}

// ─── Local helpers ───────────────────────────────────────────────────────

function humanList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

// Type re-exports for callers that need them alongside helpers.
export type { ServiceDefinition };
export { SERVICE_LABELS };
