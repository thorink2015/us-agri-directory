import { Operator } from '@/data/types';
import { SITE } from '@/data/author';
import { getStateAbbr } from '@/lib/utils';

interface Props {
  operator: Operator;
}

export default function OperatorSchema({ operator }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: operator.name,
    description: operator.description,
    url: `${SITE.domain}/operators/${operator.slug}`,
    image: `${SITE.domain}/og-image.png`,
    telephone: operator.phone,
    email: operator.email,
    address: {
      '@type': 'PostalAddress',
      ...(operator.address ? { streetAddress: operator.address } : {}),
      addressLocality: operator.city,
      addressRegion: getStateAbbr(operator.counties),
      addressCountry: 'US',
    },
    geo: operator.lat && operator.lng
      ? {
          '@type': 'GeoCoordinates',
          latitude: operator.lat,
          longitude: operator.lng,
        }
      : undefined,
    areaServed: operator.counties.map((c) => ({
      '@type': 'AdministrativeArea',
      name: c,
    })),
    sameAs: [operator.website, operator.facebook].filter(Boolean),
    priceRange: operator.priceMinUsd
      ? `$${operator.priceMinUsd} to ${operator.priceMaxUsd || operator.priceMinUsd}/acre`
      : undefined,
    foundingDate: operator.founded?.toString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
