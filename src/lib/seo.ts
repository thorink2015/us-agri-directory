import { Metadata } from 'next';
import { Operator } from '@/data/types';
import { County } from '@/data/types';

export const SITE_URL = 'https://agdronedirectory.com';
export const SITE_NAME = 'US Ag Drone Directory';

export function buildOperatorMetadata(operator: Operator): Metadata {
  const price = operator.priceMinUsd
    ? `Rates from $${operator.priceMinUsd}/acre. `
    : '';
  const coverage = `Service area: ${operator.counties.length} state${operator.counties.length !== 1 ? 's' : ''}.`;
  const baseCity = operator.city.split(/[,(/]/)[0].trim();
  const fullTitle = `${operator.name}: Drone Spraying in ${baseCity}`;
  const title = fullTitle.length > 60
    ? `${operator.name.slice(0, 57).trim()}…`
    : fullTitle;
  const fullDesc = `${operator.name}, ag drone operator in ${baseCity}. ${price}${operator.services.length} services. ${coverage} Contact directly.`;
  const description = fullDesc.length > 160 ? `${fullDesc.slice(0, 157).trim()}…` : fullDesc;
  return {
    title,
    description,
    alternates: { canonical: `/operators/${operator.slug}` },
    openGraph: {
      title: `${operator.name} | US Ag Drone Directory`,
      description: operator.description.slice(0, 155),
      url: `${SITE_URL}/operators/${operator.slug}`,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${operator.name}, agricultural drone operator in ${baseCity}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${operator.name} | Ag Drone Services, ${operator.city}`,
      description: operator.description.slice(0, 155),
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${operator.name}, agricultural drone operator in ${baseCity}`,
        },
      ],
    },
  };
}

export function buildCountyMetadata(county: County, operatorCount: number): Metadata {
  const crops = county.mainCrops.slice(0, 3).join(', ');
  const desc = `Find ${operatorCount} verified drone spraying operator${operatorCount !== 1 ? 's' : ''} in ${county.name}. Compare rates, check certifications, and hire an ag drone service for your ${crops} fields.`;
  return {
    title: `${county.name} Drone Spraying: Rates & Operators 2026`,
    description: desc,
    alternates: { canonical: `/states/${county.slug}` },
    openGraph: {
      title: `Drone Spraying in ${county.name} | US Ag Drone Directory`,
      description: `Verified ag drone operators in ${county.name}. Spraying, seeding, mapping, and scouting for ${crops} growers.`,
      url: `${SITE_URL}/states/${county.slug}`,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `Drone Spraying in ${county.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Drone Spraying in ${county.name} | Rates and Operators`,
      description: desc,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `Drone Spraying in ${county.name}`,
        },
      ],
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'US Ag Drone Directory: Find Drone Spraying Operators',
    template: '%s',
  },
  description:
    'The largest US ag drone directory. Find verified operators for spraying, seeding, mapping, and scouting across all 50 states.',
  keywords: [
    'drone spraying near me',
    'agricultural drone services',
    'drone crop spraying',
    'ag drone operator near me',
    'drone spraying cost per acre',
    'drone applicator directory',
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};
