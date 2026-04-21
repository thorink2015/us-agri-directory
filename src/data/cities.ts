import { Operator, ServiceType } from './types';
import { operators } from './operators';
import { counties } from './counties';

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
  'statewide',
  'unknown',
  'remote',
  'na',
]);

const STATE_NAMES_LOWER = new Set(counties.map((c) => c.name.toLowerCase()));

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
}

function isValidCityName(city: string, stateSlug: string): boolean {
  const trimmed = city.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  const slug = citySlug(trimmed);
  if (!slug) return false;
  if (RESERVED_CHILD_SLUGS.has(slug)) return false;
  if (DIRECTIONAL_OR_STATEWIDE.has(lower)) return false;
  if (STATE_NAMES_LOWER.has(lower)) return false;
  // Disallow "<state-name> City" collision with the state slug itself
  if (slug === stateSlug) return false;
  return true;
}

const stateBySlug = new Map(counties.map((c) => [c.slug, c]));

function buildCityIndex(): CityData[] {
  const map = new Map<string, CityData>();

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

  return Array.from(map.values());
}

const ALL_CITIES = buildCityIndex();

export function getQualifyingCities(threshold: number = CITY_OPERATOR_THRESHOLD): CityData[] {
  return ALL_CITIES.filter((c) => c.operators.length >= threshold);
}

export function getCity(stateSlug: string, citySlugParam: string): CityData | undefined {
  return ALL_CITIES.find(
    (c) => c.stateSlug === stateSlug && c.slug === citySlugParam && c.operators.length >= CITY_OPERATOR_THRESHOLD,
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

export const CITY_OPERATOR_MIN = CITY_OPERATOR_THRESHOLD;
