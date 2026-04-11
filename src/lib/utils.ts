import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min?: number, max?: number, currency = 'RON'): string {
  if (!min && !max) return 'Preț la cerere';
  if (min && max) return `${min}–${max} ${currency}/ha`;
  if (min) return `de la ${min} ${currency}/ha`;
  return `până la ${max} ${currency}/ha`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function formatHa(ha?: number): string {
  if (!ha) return 'N/A';
  if (ha >= 1000000) return `${(ha / 1000000).toFixed(1)} mil. ha`;
  if (ha >= 1000) return `${(ha / 1000).toFixed(0)}.000 ha`;
  return `${ha} ha`;
}

/**
 * Appends UTM tracking parameters to an external URL.
 * All outbound links to operator websites use this to track referral traffic.
 *
 * @param url - The destination URL (e.g. https://example.com)
 * @param operatorSlug - The operator slug (e.g. "riagro") used as utm_content
 * @returns URL with UTM parameters appended
 */
export function addUtmParams(url: string, operatorSlug: string): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('utm_source', 'terradron.ro');
    parsed.searchParams.set('utm_medium', 'directory');
    parsed.searchParams.set('utm_campaign', 'operator-listing');
    parsed.searchParams.set('utm_content', operatorSlug);
    return parsed.toString();
  } catch {
    // If URL parsing fails, return original
    return url;
  }
}
