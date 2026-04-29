import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import MapClient, { type StateSummary } from './MapClient';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { SITE, AUTHOR } from '@/data/author';
import { SERVICE_LABELS, type ServiceType } from '@/data/types';

const LAST_REVIEWED = '2026-04-21';

export const metadata: Metadata = {
  title: 'Agricultural Drone Operator Map | US Ag Drone Directory',
  description:
    'Interactive map of 391+ verified drone operators across all 50 US states. Click any state to browse operators by location.',
  alternates: { canonical: '/map' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Agricultural Drone Operator Map | US Ag Drone Directory',
    description:
      'Interactive map of verified drone operators across all 50 US states. Filter by city, service type and crop.',
    url: `${SITE.domain}/map`,
    siteName: SITE.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Agricultural Drone Operator Map',
      },
    ],
  },
};

export default function MapPage() {
  const operatorCount = operators.length;
  const stateCount = new Set(
    operators.flatMap((op) => op.counties),
  ).size;

  // Precompute per-state summary: count, service union, crop union, city list.
  // Small (~50 entries) — client filtering stays fast with no runtime fetch.
  const statesSummary: StateSummary[] = counties.map((c) => {
    const matches = operators.filter((op) => op.counties.includes(c.slug));
    const servicesSet = new Set<ServiceType>();
    const cropsSet = new Set<string>();
    const citiesSet = new Set<string>();
    for (const op of matches) {
      for (const s of op.services) servicesSet.add(s);
      for (const cr of op.crops) cropsSet.add(cr);
      if (op.city) citiesSet.add(op.city);
    }
    return {
      slug: c.slug,
      name: c.name,
      count: matches.length,
      services: Array.from(servicesSet),
      crops: Array.from(cropsSet),
      cities: Array.from(citiesSet),
    };
  });

  const serviceOptions = (Object.entries(SERVICE_LABELS) as [ServiceType, string][])
    .map(([key, label]) => ({ key, label }));

  const cropOptions = crops.map((c) => ({ slug: c.slug, name: c.name }));

  const aeoBlock = `The US Ag Drone Operator Map shows where to find verified agricultural drone services across the country. The directory currently lists ${operatorCount}+ operators serving farms in ${stateCount} of the 50 US states, with heavy concentration in California, Texas, Iowa and the Corn Belt. Click any state to open its operator directory, or use the search and filter controls below the map to narrow results by city, service type or crop. Darker green shading marks states with more operators, while gray means no listings in that state yet. The map highlights where drone spraying is most active in 2026 under FAA Part 137 rules and state commercial applicator licensing. Every operator shown holds Part 107 and Part 137 credentials, and most work in regions with labeled commercial drone pesticide applications.`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Map', item: `${SITE.domain}/map` },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agricultural Drone Operator Map',
    description:
      'Interactive US map of verified agricultural drone operators. Filter by city, service type and crop.',
    url: `${SITE.domain}/map`,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Map' }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Find Agricultural Drone Operators on the Map
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">{aeoBlock}</p>
        </div>

        <MapClient
          statesSummary={statesSummary}
          serviceOptions={serviceOptions}
          cropOptions={cropOptions}
        />

        <div className="mt-10 text-center bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-gray-700 mb-4">
            Or browse the full operator directory with advanced filters for price, certification and drone model.
          </p>
          <Link
            href="/operators"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
          >
            Browse all operators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
