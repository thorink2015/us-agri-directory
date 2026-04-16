import { Metadata } from 'next';
import { Operator } from '@/data/types';
import { County } from '@/data/types';

const SITE_URL = 'https://agdronedirectory.com';
const SITE_NAME = 'US Ag Drone Directory';

export function buildOperatorMetadata(operator: Operator): Metadata {
  const price = operator.priceMinUsd
    ? `Rates from $${operator.priceMinUsd}/acre. `
    : '';
  const coverage = `Service area: ${operator.counties.length} state${operator.counties.length !== 1 ? 's' : ''}.`;
  return {
    title: `${operator.name} | Ag Drone Services ${operator.city} | Rates and Contact`,
    description: `${operator.name}, agricultural drone operator based in ${operator.city}. ${price}${operator.services.length} services available. ${coverage} Contact directly.`,
    alternates: { canonical: `/operators/${operator.slug}` },
    openGraph: {
      title: `${operator.name} | US Ag Drone Directory`,
      description: operator.description.slice(0, 155),
      url: `${SITE_URL}/operators/${operator.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${operator.name} | Ag Drone Services, ${operator.city}`,
      description: operator.description.slice(0, 155),
    },
  };
}

export function buildCountyMetadata(county: County, operatorCount: number): Metadata {
  const crops = county.mainCrops.slice(0, 3).join(', ');
  const desc = `Find ${operatorCount} verified drone spraying operator${operatorCount !== 1 ? 's' : ''} in ${county.name}. Compare rates, check certifications, and hire an ag drone service for your ${crops} fields.`;
  return {
    title: `Drone Spraying Services in ${county.name} | Ag Drone Directory`,
    description: desc,
    alternates: { canonical: `/states/${county.slug}` },
    openGraph: {
      title: `Drone Spraying in ${county.name} | US Ag Drone Directory`,
      description: `Verified ag drone operators in ${county.name}. Spraying, seeding, mapping, and scouting for ${crops} growers.`,
      url: `${SITE_URL}/states/${county.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Drone Spraying in ${county.name} | Rates and Operators`,
      description: desc,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'US Agricultural Drone Directory | Find Verified Drone Spraying Operators',
    template: '%s | US Ag Drone Directory',
  },
  description:
    'The largest directory of agricultural drone services in America. Find verified drone operators for spraying, seeding, mapping, and scouting across all 50 states.',
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
