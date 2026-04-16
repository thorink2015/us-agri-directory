import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min?: number, max?: number, currency = 'USD'): string {
  if (!min && !max) return 'Price on request';
  if (currency === 'USD') {
    if (min && max) return `$${min}–$${max}/acre`;
    if (min) return `from $${min}/acre`;
    return `up to $${max}/acre`;
  }
  if (min && max) return `${min}–${max} ${currency}/acre`;
  if (min) return `from ${min} ${currency}/acre`;
  return `up to ${max} ${currency}/acre`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function formatAcres(acres?: number): string {
  if (!acres) return 'N/A';
  if (acres >= 1000000) return `${(acres / 1000000).toFixed(1)}M acres`;
  if (acres >= 1000) return `${(acres / 1000).toFixed(0)}K acres`;
  return `${acres} acres`;
}

// Keep formatHa as alias for backwards compatibility
export function formatHa(ha?: number): string {
  return formatAcres(ha);
}

/**
 * Appends UTM tracking parameters to an external URL.
 * All outbound links to operator websites use this to track referral traffic.
 *
 * @param url - The destination URL
 * @param operatorSlug - The operator slug used as utm_content
 * @returns URL with UTM parameters appended
 */
export const STATE_ABBR: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
  'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
  'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
  'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
  'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
  'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
  'new-hampshire': 'NH', 'new-jersey': 'NJ', 'new-mexico': 'NM', 'new-york': 'NY',
  'north-carolina': 'NC', 'north-dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
  'oregon': 'OR', 'pennsylvania': 'PA', 'rhode-island': 'RI', 'south-carolina': 'SC',
  'south-dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
  'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west-virginia': 'WV',
  'wisconsin': 'WI', 'wyoming': 'WY',
};

export function getStateAbbr(counties: string[]): string {
  if (!counties || counties.length === 0) return 'US';
  return STATE_ABBR[counties[0]] || 'US';
}

export function addUtmParams(url: string, operatorSlug: string): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('utm_source', 'agdronedirectory.com');
    parsed.searchParams.set('utm_medium', 'directory');
    parsed.searchParams.set('utm_campaign', 'operator-listing');
    parsed.searchParams.set('utm_content', operatorSlug);
    return parsed.toString();
  } catch {
    return url;
  }
}
