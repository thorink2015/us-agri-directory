import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Users, DollarSign, Wheat } from 'lucide-react';
import type { Metadata } from 'next';

import {
  getCity,
  getCitiesInState,
  getQualifyingCities,
  getTopServicesForCity,
  getTopCropsForCity,
  getCityRateRange,
  getCityCenter,
} from '@/data/cities';
import { CROP_NAME_MAP } from '@/data/crops';
import { SERVICE_LABELS } from '@/data/types';
import { AUTHOR, SITE } from '@/data/author';

import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';

const LAST_REVIEWED = '2026-04-21';

interface Props {
  params: { slug: string; city: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getQualifyingCities().map((c) => ({ slug: c.stateSlug, city: c.slug }));
}

function buildAeoBlock(stateSlug: string, citySlugParam: string): string | null {
  const city = getCity(stateSlug, citySlugParam);
  if (!city) return null;
  const { min, max } = getCityRateRange(city);
  const topCrops = getTopCropsForCity(city, 1).map((c) => CROP_NAME_MAP[c] || c);
  const topServices = getTopServicesForCity(city, 3).map((s) => SERVICE_LABELS[s]);

  const cropName = topCrops[0];
  const ratePart =
    min && max
      ? `Average rates run $${min} to $${max} per acre${cropName ? ` for ${cropName.toLowerCase()}` : ''}.`
      : cropName
      ? `Operators in ${city.city} list ${cropName.toLowerCase()} as a primary crop served.`
      : '';
  const servicesPart = topServices.length
    ? ` Services include ${topServices.slice(0, 3).join(', ').toLowerCase()}.`
    : '';

  return `${city.operators.length} verified drone operators serve ${city.city}, ${city.stateName}.${
    ratePart ? ` ${ratePart}` : ''
  }${servicesPart}`.trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.slug, params.city);
  if (!city) return {};
  const title = `Drone Spraying Services in ${city.city}, ${city.stateName} | Ag Drone Directory`;
  const description = `${city.operators.length} verified agricultural drone operators serving ${city.city}, ${city.stateName}. Compare rates, services and contact info.`;
  return {
    title,
    description,
    alternates: { canonical: `/states/${city.stateSlug}/${city.slug}` },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'US Ag Drone Directory',
      title,
      description,
      url: `${SITE.domain}/states/${city.stateSlug}/${city.slug}`,
    },
  };
}

export default function CityPage({ params }: Props) {
  const city = getCity(params.slug, params.city);
  if (!city) notFound();

  const ops = city.operators;
  const aeoBlock = buildAeoBlock(params.slug, params.city)!;
  const topCropSlugs = getTopCropsForCity(city, 2);
  const topCropLinks = topCropSlugs.filter((s) => CROP_NAME_MAP[s]);
  const nearbyCities = getCitiesInState(city.stateSlug).filter((c) => c.slug !== city.slug);
  const { lat, lng } = getCityCenter(city);
  const { min, max } = getCityRateRange(city);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${SITE.domain}/states` },
      { '@type': 'ListItem', position: 3, name: city.stateName, item: `${SITE.domain}/states/${city.stateSlug}` },
      {
        '@type': 'ListItem',
        position: 4,
        name: city.city,
        item: `${SITE.domain}/states/${city.stateSlug}/${city.slug}`,
      },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.domain}/states/${city.stateSlug}/${city.slug}#localbusiness`,
    name: `Agricultural Drone Services in ${city.city}, ${city.stateName}`,
    description: aeoBlock,
    url: `${SITE.domain}/states/${city.stateSlug}/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.city,
      containedInPlace: { '@type': 'State', name: city.stateName },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.city,
      addressRegion: city.stateName,
      addressCountry: 'US',
    },
    ...(typeof lat === 'number' && typeof lng === 'number'
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: Number(lat.toFixed(4)),
            longitude: Number(lng.toFixed(4)),
          },
        }
      : {}),
    ...(typeof min === 'number' && typeof max === 'number'
      ? { priceRange: `$${min}-$${max} per acre` }
      : {}),
    publisher: { '@id': AUTHOR.organizationId },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Drone Operators in ${city.city}, ${city.stateName}`,
    numberOfItems: ops.length,
    itemListElement: ops.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `${SITE.domain}/operators/${op.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'States', href: '/states' },
            { label: city.stateName, href: `/states/${city.stateSlug}` },
            { label: city.city },
          ]}
        />

        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <Link href={`/states/${city.stateSlug}`} className="hover:underline">
            {city.stateName}
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Agricultural Drone Services in {city.city}, {city.stateName}
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">{aeoBlock}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Users className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm">{ops.length}</div>
            <div className="text-xs text-gray-500">Listed operators</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm">
              {min && max ? `$${min} to $${max} / acre` : 'Quote on request'}
            </div>
            <div className="text-xs text-gray-500">Rate range</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Wheat className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm truncate">
              {topCropSlugs.length
                ? topCropSlugs.map((s) => CROP_NAME_MAP[s] || s).slice(0, 2).join(', ')
                : '—'}
            </div>
            <div className="text-xs text-gray-500">Top crops served</div>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Drone operators in {city.city}, {city.stateName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ops.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </section>

        {nearbyCities.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Other cities in {city.stateName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/states/${c.stateSlug}/${c.slug}`}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
                >
                  {c.city} ({c.operators.length})
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs text-green-700 font-medium mb-0.5">Statewide directory</div>
              <div className="font-bold text-gray-900">All operators in {city.stateName}</div>
            </div>
            <Link
              href={`/states/${city.stateSlug}`}
              className="shrink-0 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              View all operators in {city.stateName} &rarr;
            </Link>
          </div>
        </section>

        {topCropLinks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related crops in {city.stateName}</h2>
            <div className="flex flex-wrap gap-2">
              {topCropLinks.map((cropSlug) => (
                <Link
                  key={cropSlug}
                  href={`/states/${city.stateSlug}/crops/${cropSlug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
                >
                  {CROP_NAME_MAP[cropSlug]} in {city.stateName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-4">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
