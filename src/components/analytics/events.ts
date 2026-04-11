/**
 * GA4 event tracking helper functions.
 * Import and call these anywhere in client components to track user interactions.
 *
 * Usage:
 *   import { trackEvent } from '@/components/analytics/events';
 *   trackEvent('operator_click', { operator_slug: 'riagro', source: 'county_page' });
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// Predefined events for consistency

/** Called when a user clicks through to an operator's external website */
export function trackOperatorWebsiteClick(operatorSlug: string, source: string) {
  trackEvent('operator_website_click', { operator_slug: operatorSlug, source });
}

/** Called when a user clicks an operator's phone number */
export function trackOperatorPhoneClick(operatorSlug: string) {
  trackEvent('operator_phone_click', { operator_slug: operatorSlug });
}

/** Called when a user clicks an operator's email */
export function trackOperatorEmailClick(operatorSlug: string) {
  trackEvent('operator_email_click', { operator_slug: operatorSlug });
}

/** Called when a user submits the operator addition form */
export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', { form_name: formName });
}

/** Called when a user applies a filter on the operators page */
export function trackFilterApplied(filterType: string, filterValue: string) {
  trackEvent('filter_applied', { filter_type: filterType, filter_value: filterValue });
}

/** Called when a user searches by county in the hero search bar */
export function trackCountySearch(countySlug: string) {
  trackEvent('county_search', { county_slug: countySlug });
}

/** Called when a user clicks a county from the county grid */
export function trackCountyClick(countySlug: string, source: string) {
  trackEvent('county_click', { county_slug: countySlug, source });
}

/** Called when a user clicks a crop link */
export function trackCropClick(cropSlug: string, source: string) {
  trackEvent('crop_click', { crop_slug: cropSlug, source });
}
