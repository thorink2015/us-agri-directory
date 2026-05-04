import { Operator, ServiceType } from './types';
import { operators } from './operators';
import { counties } from './counties';
import { seedCities } from './seed-cities';

const CITY_OPERATOR_THRESHOLD = 2;

const RESERVED_CHILD_SLUGS = new Set(['operators', 'services', 'crops']);
const DIRECTIONAL_OR_STATEWIDE = new Set([
  'central',
  'north',
  'south',
  'east',
  'west',
  'eastern',
  'western',
  'northern',
  'southern',
  'midwest',
  'mid-west',
  'mountain',
  'pacific',
  'plains',
  'delta',
  'statewide',
  'unknown',
  'remote',
  'na',
  'tbd',
]);

// Multi-word prefixes that mark a region rather than a city. Anything
// starting with one of these is rejected (e.g. "Eastern Iowa", "SE Kansas",
// "Northern OK", "West TX"). The trailing space anchors to the start of
// the second token so single words like "West" are still caught above.
const REGIONAL_PREFIXES = [
  'northern ', 'southern ', 'eastern ', 'western ', 'central ',
  'north ', 'south ', 'east ', 'west ',
  'northeast ', 'northwest ', 'southeast ', 'southwest ',
  'ne ', 'nw ', 'se ', 'sw ',
  'mid-', 'mid ',
  'upper ', 'lower ',
];

// Trailing words that mark a region or a county/jurisdiction descriptor
// rather than a city name.
const REGIONAL_SUFFIXES = [
  ' county',
  ' counties',
  ' parish',
  ' shore',
  ' coast',
  ' region',
  ' area',
  ' valley region',  // 'spring valley' alone is a real city, but '... valley region' is regional
  ' watershed',
];

const STATE_NAMES_LOWER = new Set(counties.map((c) => c.name.toLowerCase()));
const STATE_ABBRS = new Set(counties.map((c) => c.slug));
// Matches any 2-letter uppercase token that could be a state abbr embedded
// in the city string (e.g. "Lehi, UT" or "Texas (serves OK and NM)").
const EMBEDDED_STATE_ABBR = /(?:^|\s|,|\()([A-Z]{2})(?:\s|,|\)|\/|$)/;

export function citySlug(city: string): string {
  return city
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface CityData {
  city: string;
  slug: string;
  stateSlug: string;
  stateName: string;
  operators: Operator[];
  /** True when the city was seeded from src/data/seed-cities.ts (USDA NASS +
   *  Census Places anchored), as opposed to being derived from the operator
   *  data alone. Seeded cities qualify for the static-params build even when
   *  their operator count is below the operator-derived threshold. */
  isSeed?: boolean;
  /** County the city sits in (USDA NASS / Census Bureau Places). Only set
   *  for seeded entries; operator-derived cities don't carry this. */
  county?: string;
  /** Census Bureau Places population estimate. Set for seeded entries
   *  where the figure is verified against primary sources. */
  population?: number;
  /** Short ag-relevance note rendered on seeded city pages where the city
   *  has no direct operator coverage. Empty for operator-derived cities. */
  agNote?: string;
}

function isValidCityName(city: string, stateSlug: string): boolean {
  const trimmed = city.trim();
  if (!trimmed) return false;

  // Reject obvious junk before slug normalization eats the signal.
  if (trimmed.includes('/')) return false;            // multi-state e.g. "Iowa/Illinois"
  if (trimmed.includes('(') || trimmed.includes(')')) return false; // parenthetical qualifier
  if (trimmed.includes(';')) return false;            // multi-city blob with semicolons
  if (/\d/.test(trimmed)) return false;               // digits = zip code or address noise
  if (EMBEDDED_STATE_ABBR.test(trimmed)) return false; // "Lehi, UT" or "Texas (serves OK and NM)"
  if (/\s+(and|or|to|via)\s+/i.test(trimmed)) return false; // "Iowa and Illinois", "OK to NM"

  const lower = trimmed.toLowerCase();
  const slug = citySlug(trimmed);
  if (!slug) return false;
  if (RESERVED_CHILD_SLUGS.has(slug)) return false;
  if (DIRECTIONAL_OR_STATEWIDE.has(lower)) return false;
  if (STATE_NAMES_LOWER.has(lower)) return false;
  if (STATE_ABBRS.has(slug)) return false;            // 2-letter state abbr that slugified

  // Disallow regional prefixes ("Eastern Iowa", "SE Kansas", "Northern OK", "West TX").
  for (const prefix of REGIONAL_PREFIXES) {
    if (lower.startsWith(prefix)) return false;
  }
  // Disallow regional suffixes ("Polk County", "Eastern Shore", "Magic Valley region").
  for (const suffix of REGIONAL_SUFFIXES) {
    if (lower.endsWith(suffix)) return false;
  }

  // Reject all-uppercase strings — usually a state abbr or placeholder
  // ("TX", "STATEWIDE", "NA") that survived the prior checks.
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) return false;

  // Disallow "<state-name> City" collision with the state slug itself.
  if (slug === stateSlug) return false;

  return true;
}

const stateBySlug = new Map(counties.map((c) => [c.slug, c]));

function buildCityIndex(): CityData[] {
  const map = new Map<string, CityData>();

  // Pass 1: operator-derived cities (any operator with op.city populated).
  for (const op of operators) {
    if (!op.city || !op.counties || op.counties.length === 0) continue;
    const stateSlug = op.counties[0];
    const stateRow = stateBySlug.get(stateSlug);
    if (!stateRow) continue;
    if (!isValidCityName(op.city, stateSlug)) continue;

    const slug = citySlug(op.city);
    const key = `${stateSlug}__${slug}`;
    if (!map.has(key)) {
      map.set(key, {
        city: op.city.trim(),
        slug,
        stateSlug,
        stateName: stateRow.name,
        operators: [],
      });
    }
    map.get(key)!.operators.push(op);
  }

  // Pass 2: seeded cities (USDA NASS + Census Places anchored). Merges into
  // operator-derived entries where the slug already exists, otherwise adds
  // a new entry with isSeed=true and any operators in the same state who
  // explicitly list this city.
  for (const seed of seedCities) {
    const stateRow = stateBySlug.get(seed.stateSlug);
    if (!stateRow) continue;
    if (!isValidCityName(seed.name, seed.stateSlug)) continue;

    const slug = citySlug(seed.name);
    const key = `${seed.stateSlug}__${slug}`;
    const existing = map.get(key);
    if (existing) {
      // Merge metadata into the operator-derived entry — don't overwrite the
      // operator list. Keep isSeed=true so the page knows this city has
      // curator-confirmed ag relevance even if the operator count is low.
      existing.isSeed = true;
      if (seed.county && !existing.county) existing.county = seed.county;
      if (seed.population && !existing.population) existing.population = seed.population;
      if (seed.agNote && !existing.agNote) existing.agNote = seed.agNote;
      continue;
    }
    map.set(key, {
      city: seed.name.trim(),
      slug,
      stateSlug: seed.stateSlug,
      stateName: stateRow.name,
      operators: [],
      isSeed: true,
      county: seed.county,
      population: seed.population,
      agNote: seed.agNote,
    });
  }

  return Array.from(map.values());
}

const ALL_CITIES = buildCityIndex();

/** A city qualifies for static build if it either has at least
 *  CITY_OPERATOR_THRESHOLD direct operators OR was explicitly seeded as an
 *  ag-relevant city in src/data/seed-cities.ts (NASS + Census Places). */
function qualifies(c: CityData): boolean {
  return c.isSeed === true || c.operators.length >= CITY_OPERATOR_THRESHOLD;
}

export function getQualifyingCities(threshold: number = CITY_OPERATOR_THRESHOLD): CityData[] {
  return ALL_CITIES.filter((c) => c.isSeed === true || c.operators.length >= threshold);
}

export function getCity(stateSlug: string, citySlugParam: string): CityData | undefined {
  return ALL_CITIES.find(
    (c) => c.stateSlug === stateSlug && c.slug === citySlugParam && qualifies(c),
  );
}

export function getCitiesInState(stateSlug: string): CityData[] {
  return getQualifyingCities().filter((c) => c.stateSlug === stateSlug);
}

export function getTopServicesForCity(city: CityData, limit = 3): ServiceType[] {
  const counts = new Map<ServiceType, number>();
  for (const op of city.operators) {
    for (const s of op.services) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([s]) => s);
}

export function getTopCropsForCity(city: CityData, limit = 2): string[] {
  const counts = new Map<string, number>();
  for (const op of city.operators) {
    for (const c of op.crops) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([c]) => c);
}

export function getCityRateRange(city: CityData): { min?: number; max?: number } {
  const mins = city.operators.map((o) => o.priceMinUsd).filter((n): n is number => typeof n === 'number');
  const maxs = city.operators.map((o) => o.priceMaxUsd).filter((n): n is number => typeof n === 'number');
  return {
    min: mins.length ? Math.min(...mins) : undefined,
    max: maxs.length ? Math.max(...maxs) : undefined,
  };
}

export function getCityCenter(city: CityData): { lat?: number; lng?: number } {
  const lats = city.operators.map((o) => o.lat).filter((n): n is number => typeof n === 'number');
  const lngs = city.operators.map((o) => o.lng).filter((n): n is number => typeof n === 'number');
  if (!lats.length || !lngs.length) return {};
  const avg = (arr: number[]) => arr.reduce((s, n) => s + n, 0) / arr.length;
  return { lat: avg(lats), lng: avg(lngs) };
}

export function getCityServiceBreakdown(city: CityData): { service: ServiceType; count: number }[] {
  const counts = new Map<ServiceType, number>();
  for (const op of city.operators) {
    for (const s of op.services) counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCityCropBreakdown(city: CityData): { slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const op of city.operators) {
    for (const c of op.crops) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCityCredentialCounts(city: CityData): {
  part107: number;
  part137: number;
  ndaa: number;
  total: number;
} {
  let part107 = 0;
  let part137 = 0;
  let ndaa = 0;
  for (const op of city.operators) {
    if (op.certFAAPart107) part107 += 1;
    if (op.certFAAPart137) part137 += 1;
    if (op.ndaaCompliant) ndaa += 1;
  }
  return { part107, part137, ndaa, total: city.operators.length };
}

export const CITY_OPERATOR_MIN = CITY_OPERATOR_THRESHOLD;
