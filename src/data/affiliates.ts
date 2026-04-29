// ─── Affiliate partners + link metadata ────────────────────────────────────
// Every outbound affiliate click on the site goes through /go/[slug] which
// fires GA4 events and then redirects to the partner's tracked URL. Never
// hard-code a partner URL in a page. Always reference a slug here and let
// the /go route build the final URL.
//
// The destination field must carry the partner's tracking code exactly as
// provided. Do NOT modify the affcode, refid, or any other partner token.
// --------------------------------------------------------------------------

export type AffiliateCategory = 'training' | 'insurance' | 'equipment' | 'software';

export type AffiliateLink = {
  slug: string;
  partner: string;
  partnerDisplayName: string;
  destination: string;
  commission: string;
  cookieDays: number;
  category: AffiliateCategory;
  logoPath?: string;
  couponCode?: string;
};

export const affiliateLinks: AffiliateLink[] = [
  {
    slug: 'pilot-institute',
    partner: 'pilot-institute',
    partnerDisplayName: 'Pilot Institute',
    destination: 'https://pilotinstitute.com/?affcode=MO3DURF9IB3D9WXNG2',
    commission: '20%',
    cookieDays: 30,
    category: 'training',
    logoPath: '/affiliate-assets/pilot-institute/pilot-institute-logo.svg',
  },
  {
    slug: 'pilot-institute-part-107',
    partner: 'pilot-institute',
    partnerDisplayName: 'Pilot Institute Part 107 Made Easy',
    destination:
      'https://pilotinstitute.com/course/part-107-remote-pilot/?affcode=MO3DURF9IB3D9WXNG2',
    commission: '20%',
    cookieDays: 30,
    category: 'training',
    logoPath: '/affiliate-assets/pilot-institute/pilot-institute-logo.svg',
  },
  {
    slug: 'pilot-institute-private-pilot',
    partner: 'pilot-institute',
    partnerDisplayName: 'Pilot Institute Private Pilot Made Easy',
    destination:
      'https://pilotinstitute.com/course/private-pilot-made-easy/?affcode=MO3DURF9IB3D9WXNG2',
    commission: '20%',
    cookieDays: 30,
    category: 'training',
    logoPath: '/affiliate-assets/pilot-institute/pilot-institute-logo.svg',
  },
];

export function getAffiliateLink(slug: string): AffiliateLink | undefined {
  return affiliateLinks.find((l) => l.slug === slug);
}

/**
 * Build the final outbound URL, preserving the partner's existing query
 * string (affcode, etc.) and appending UTM params and optional coupon.
 */
export function buildAffiliateUrl(link: AffiliateLink): string {
  const url = new URL(link.destination);
  if (link.couponCode) url.searchParams.set('coupon_code', link.couponCode);
  url.searchParams.set('utm_source', 'agdronedirectory');
  url.searchParams.set('utm_medium', 'affiliate');
  url.searchParams.set('utm_campaign', link.slug);
  return url.toString();
}

/**
 * Unique active partners, deduplicated by `partner` key. Used on the
 * /affiliate-disclosure page.
 */
export function getActivePartners(): AffiliateLink[] {
  const seen = new Set<string>();
  return affiliateLinks.filter((l) => {
    if (seen.has(l.partner)) return false;
    seen.add(l.partner);
    return true;
  });
}
