import { Operator } from '@/data/types';
import { SITE } from '@/data/author';
import { counties as countiesData } from '@/data/counties';
import { getStateAbbr, normalizeSocialUrl } from '@/lib/utils';

interface Props {
  operator: Operator;
}

const FALLBACK_IMAGE = `${SITE.domain}/og-image.png`;

const stateNameMap: Record<string, string> = Object.fromEntries(
  countiesData.map((c) => [c.slug, c.name]),
);

// ─── LocalBusiness vs ProfessionalService ────────────────────────────────
// Switched from ProfessionalService -> LocalBusiness to unlock Google's
// geo + priceRange Rich Results on the ~250 operators that ship a full
// address + lat + lng. ProfessionalService is a sibling, not a parent, so
// the change is type-flat (no nested @type needed). The previously emitted
// fields (areaServed, telephone, sameAs, foundingDate, geo) are all valid
// on LocalBusiness and remain in place. Adds `hasCredential` for FAA Part
// 137-verified operators so the credential is machine-readable.
// Tracked in `_memory/pending-items.md` under MEDIUM follow-ups.

export default function OperatorSchema({ operator }: Props) {
  const addressRegion = getStateAbbr(operator.counties);
  const canonicalUrl = `${SITE.domain}/operators/${operator.slug}`;
  const socialLinks = [
    normalizeSocialUrl('website', operator.website),
    normalizeSocialUrl('facebook', operator.facebook),
    normalizeSocialUrl('instagram', operator.instagram),
    normalizeSocialUrl('linkedin', operator.linkedin),
    normalizeSocialUrl('youtube', operator.youtube),
    normalizeSocialUrl('tiktok', operator.tiktok),
  ].filter((u): u is string => Boolean(u));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': canonicalUrl,
    name: operator.name,
    description: operator.description,
    url: canonicalUrl,
    image:
      operator.gallery && operator.gallery.length > 0
        ? operator.gallery.map((g) => `${SITE.domain}${g.src}`)
        : FALLBACK_IMAGE,
    address: {
      '@type': 'PostalAddress',
      ...(operator.address ? { streetAddress: operator.address } : {}),
      addressLocality: operator.city || 'United States',
      addressRegion,
      addressCountry: 'US',
    },
    areaServed: operator.counties.map((c) => ({
      '@type': 'State',
      name: stateNameMap[c] || c,
    })),
    priceRange: operator.priceMinUsd
      ? operator.priceMaxUsd && operator.priceMaxUsd !== operator.priceMinUsd
        ? `$${operator.priceMinUsd}-$${operator.priceMaxUsd}`
        : `$${operator.priceMinUsd}`
      : '$$',
  };

  if (operator.phone) schema.telephone = operator.phone;
  if (operator.email) schema.email = operator.email;
  if (operator.website) schema.sameAs = [operator.website, ...socialLinks];
  else if (socialLinks.length > 0) schema.sameAs = socialLinks;
  if (operator.lat && operator.lng) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: operator.lat,
      longitude: operator.lng,
    };
  }
  if (operator.founded) schema.foundingDate = operator.founded.toString();

  // ── Verified FAA Part 137 credential ────────────────────────────────────
  // Emit hasCredential only when both `verified` and `certFAAPart137` are
  // true on the operator record. Avoids machine-readable claims of a
  // certification we haven't confirmed.
  if (operator.verified && operator.certFAAPart137) {
    schema.hasCredential = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'FAA Part 137 Agricultural Aircraft Operator Certificate',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Federal Aviation Administration',
        url: 'https://www.faa.gov/',
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
