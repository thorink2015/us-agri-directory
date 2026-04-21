import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import OperatoriClient from './OperatoriClient';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import type { Operator, County } from '@/data/types';

const DESCRIPTION_LIMIT = 180;

function truncate(text: string, limit: number) {
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, '') + '…';
}

// Strip fields the listing UI never reads, and truncate description to
// what the card actually shows. Cuts the RSC payload from ~114 KB to ~55 KB.
function compact(op: Operator): Operator {
  return {
    slug: op.slug,
    name: op.name,
    shortName: op.shortName,
    tagline: op.tagline,
    description: truncate(op.description, DESCRIPTION_LIMIT),
    country: op.country,
    counties: op.counties,
    city: op.city,
    phone: op.phone,
    website: op.website,
    services: op.services,
    drones: op.drones,
    crops: op.crops,
    priceMinUsd: op.priceMinUsd,
    priceMaxUsd: op.priceMaxUsd,
    haTreated: op.haTreated,
    fleetSize: op.fleetSize,
    certFAAPart107: op.certFAAPart107,
    certFAAPart137: op.certFAAPart137,
    ndaaCompliant: op.ndaaCompliant,
    featured: op.featured,
    verified: op.verified,
  };
}

function compactCounty(c: County): County {
  return {
    slug: c.slug,
    name: c.name,
    nameRo: c.nameRo,
    region: c.region,
    lat: c.lat,
    lng: c.lng,
    agriculturalLandHa: c.agriculturalLandHa,
    mainCrops: c.mainCrops,
  };
}

export const metadata: Metadata = {
  title: 'All Ag Drone Operators | US Agricultural Drone Directory',
  description:
    'Search and filter all verified agricultural drone operators in the US. Filter by state, service type and crop to find the right operator for your fields.',
  alternates: { canonical: '/operators' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'All Ag Drone Operators | US Agricultural Drone Directory',
    description: 'Find verified drone spraying operators across all 50 states. Compare rates, equipment and certifications.',
    url: 'https://agdronedirectory.com/operators',
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'All Ag Drone Operators',
      },
    ],
  },
};

export default function OperatorsPage() {
  return (
    <OperatoriClient
      operators={operators.map(compact)}
      counties={counties.map(compactCounty)}
      mapSection={
        <section aria-labelledby="find-by-state-heading" className="mb-8">
          <Link
            href="/map"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl hover:border-green-400 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2
                  id="find-by-state-heading"
                  className="text-lg font-bold text-gray-900 group-hover:text-green-800"
                >
                  View operators on the map
                </h2>
                <p className="text-sm text-gray-600">
                  Browse verified operators by state with filters for city, service type and crop.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 group-hover:text-green-800 whitespace-nowrap">
              Open map <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </section>
      }
    />
  );
}
