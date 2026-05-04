// ─── Centralized noindex / shouldIndex gate predicates ────────────────────
// Single source of truth for which pages emit
//   <meta name="robots" content="noindex, follow">
// and (post-PR #101) which URLs are excluded from the sitemap.
//
// Page templates and the sitemap both import from this module so the noindex
// signal and the sitemap entry can never drift apart. Each predicate returns
// `true` when the URL SHOULD be indexed (and listed in the sitemap), `false`
// when it should be noindex,follow gated.
//
// The underlying helpers live in their domain modules (operator-content.ts,
// state-crop-content.ts, state-service-content.ts) and the page-specific
// thresholds (state-operators op count, ultra-thin city) live here so the
// sitemap doesn't have to traverse the page modules to compute them.
// ─────────────────────────────────────────────────────────────────────────

import type { Operator, ServiceType } from '@/data/types';
import { getOperatorsByCounty } from '@/data/operators';
import { shouldNoindexStateCrop } from './state-crop-content';
import { shouldNoindexStateService } from './state-service-content';
import { shouldNoindexUltraThinOperator } from './operator-content';
import type { CityData } from '@/data/cities';

// Re-export the underlying noindex predicates for page-template consumers
// that already import them by their original names.
export { shouldNoindexStateCrop } from './state-crop-content';
export { shouldNoindexStateService } from './state-service-content';
export { shouldNoindexUltraThinOperator } from './operator-content';

// ─── State-operators list page (PR #97) ──────────────────────────────────

/** States with fewer than this many operators render their operators-list
 *  page with noindex,follow. PR #97 captured the 8 thinnest pages from the
 *  audit plus Wisconsin (also <500 words). */
export const STATE_OPERATORS_NOINDEX_BELOW = 9;

export function shouldNoindexStateOperators(stateSlug: string): boolean {
  return getOperatorsByCounty(stateSlug).length < STATE_OPERATORS_NOINDEX_BELOW;
}

export function shouldIndexStateOperators(stateSlug: string): boolean {
  return !shouldNoindexStateOperators(stateSlug);
}

// ─── City page (PR #98) ──────────────────────────────────────────────────

/** Seeded zero-operator cities are gated noindex when the state has fewer
 *  than 3 statewide operators total. Operator-derived cities (>=2 ops in
 *  the city) and seeded cities in any state with 3+ ops stay indexable. */
export function shouldNoindexCity(city: CityData): boolean {
  if (!city.isSeed) return false;
  if (city.operators.length > 0) return false;
  return getOperatorsByCounty(city.stateSlug).length < 3;
}

export function shouldIndexCity(city: CityData): boolean {
  return !shouldNoindexCity(city);
}

// ─── Positive predicates for the sitemap ─────────────────────────────────

export function shouldIndexStateCrop(stateSlug: string, cropSlug: string): boolean {
  return !shouldNoindexStateCrop(stateSlug, cropSlug);
}

export function shouldIndexStateService(stateSlug: string, serviceSlug: ServiceType | string): boolean {
  return !shouldNoindexStateService(stateSlug, serviceSlug as string);
}

export function shouldIndexOperator(operator: Operator): boolean {
  return !shouldNoindexUltraThinOperator(operator);
}
