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
    '@type': 'ProfessionalService',
    '@id': canonicalUrl,
    name: operator.name,
    description: operator.description,
    url: canonicalUrl,
    image: FALLBACK_IMAGE,
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
      ? `$${operator.priceMinUsd}-$${operator.priceMaxUsd || operator.priceMinUsd}`
      : '$$',
  };

  if (operator.phone) schema.telephone = operator.phone;
  if (operator.email) schema.email = operator.email;
  if (operator.lat && operator.lng) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: operator.lat,
      longitude: operator.lng,
    };
  }
  if (socialLinks.length > 0) schema.sameAs = socialLinks;
  if (operator.founded) schema.foundingDate = operator.founded.toString();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
