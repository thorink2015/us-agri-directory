import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Users, DollarSign, Wheat, Shield, ClipboardList } from 'lucide-react';
import type { Metadata } from 'next';

import {
  getCity,
  getCitiesInState,
  getQualifyingCities,
  getCityCenter,
  getCityServiceBreakdown,
  getCityCropBreakdown,
  getCityCredentialCounts,
  type CityData,
} from '@/data/cities';
import { CROP_NAME_MAP, crops as allCrops } from '@/data/crops';
import { SERVICE_LABELS } from '@/data/types';
import { getStateData } from '@/data/states';
import { AUTHOR, SITE } from '@/data/author';

import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

const LAST_REVIEWED = '2026-04-21';
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface Props {
  params: { slug: string; city: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getQualifyingCities().map((c) => ({ slug: c.stateSlug, city: c.slug }));
}

// ─── Local helpers (display-layer copy) ──────────────────────────────────────

interface ResolvedCrop {
  slug: string;
  name: string;
  count: number;
  rateMin?: number;
  rateMax?: number;
  window?: string;
}

function monthsToWindow(months: number[]): string {
  if (!months.length) return '';
  const sorted = [...months].sort((a, b) => a - b);
  const first = MONTH_NAMES[sorted[0] - 1];
  const last = MONTH_NAMES[sorted[sorted.length - 1] - 1];
  return first === last ? first : `${first} to ${last}`;
}

function resolveCityCrops(city: CityData): ResolvedCrop[] {
  const breakdown = getCityCropBreakdown(city);
  return breakdown
    .filter((b) => CROP_NAME_MAP[b.slug])
    .map((b) => {
      const cropMeta = allCrops.find((c) => c.slug === b.slug);
      return {
        slug: b.slug,
        name: CROP_NAME_MAP[b.slug],
        count: b.count,
        rateMin: cropMeta?.priceMinUsd,
        rateMax: cropMeta?.priceMaxUsd,
        window: cropMeta ? monthsToWindow(cropMeta.treatmentMonths) : undefined,
      };
    });
}

function buildAeoBlock(city: CityData): string {
  const stateData = getStateData(city.stateSlug);
  const stateRate = stateData?.rateRange ?? '$12 to $30 per acre nationally';
  const aerialCat = stateData?.aerialCategory ?? 'a state aerial pesticide applicator license';
  const agency = stateData?.licensingAgency ?? 'the state agriculture department';

  const resolvedCrops = resolveCityCrops(city);
  const topCropNames = resolvedCrops.slice(0, 2).map((c) => c.name.toLowerCase());
  const services = getCityServiceBreakdown(city)
    .slice(0, 4)
    .map((s) => SERVICE_LABELS[s.service].toLowerCase());

  const opCountSentence = `${city.city}, ${city.stateName} has ${city.operators.length} verified agricultural drone operators listed in the directory, serving farms across the surrounding area.`;

  const cropsSentence = topCropNames.length
    ? ` Together they list ${topCropNames.join(' and ')} as the primary crops treated by drone, with additional coverage across other regional commodities.`
    : '';

  const rateSentence = ` ${city.stateName} drone application rates run ${stateRate} depending on field size, crop and application timing, in line with 2026 statewide benchmarks.`;

  const servicesSentence = services.length
    ? ` Available services in ${city.city} include ${services.slice(0, 3).join(', ')}${
        services.length > 3 ? ` and ${services[3]}` : ''
      }, giving growers a full menu beyond pesticide application.`
    : '';

  const licensingSentence = ` Every operator working over ${city.stateName} fields must hold FAA Part 107 plus ${aerialCat} from ${agency}, and many also carry FAA Part 137 for commercial agricultural aircraft operations.`;

  const ctaSentence = ` Contact the operators below directly for season availability, exact per-acre pricing and to confirm license and insurance status before booking.`;

  return (
    opCountSentence +
    cropsSentence +
    rateSentence +
    servicesSentence +
    licensingSentence +
    ctaSentence
  ).trim();
}

function buildServiceCopy(
  cityName: string,
  service: string,
  count: number,
  topCrop?: string,
): string {
  const opNoun = `${count} of the ${cityName} operators`;
  switch (service) {
    case 'Drone Spraying':
      return `${opNoun} list drone spraying as a core service${
        topCrop ? `, with most jobs targeting ${topCrop.toLowerCase()} fungicide and herbicide passes` : ''
      }. Typical mission size runs 40 to 800 acres per day per drone.`;
    case 'Fertilizer Application':
      return `${opNoun} apply granular and liquid fertilizer by drone, useful for variable-rate top-dress in tight planting windows or wet ground.`;
    case 'Crop Scouting':
      return `${opNoun} offer aerial crop scouting and disease pressure monitoring, often paired with NDVI maps before booking a spray pass.`;
    case 'Aerial Mapping':
      return `${opNoun} deliver aerial mapping and orthomosaics for stand counts, drainage planning and yield-zone analysis.`;
    case 'Pilot Training':
      return `${opNoun} provide Part 107 prep, agricultural drone training and on-farm operator coaching.`;
    case 'Equipment Rental':
      return `${opNoun} rent agricultural drones by the day or season for farms running their own pilots.`;
    case 'Equipment Sales':
      return `${opNoun} sell ag drones (DJI Agras, XAG, Hylio class) plus support, parts and onboarding.`;
    case 'Cover Crop Seeding':
      return `${opNoun} seed cover crops by drone, typically interseeding into standing corn or soybeans late in the season for a 3 to 4 week establishment head start.`;
    case 'Ag Consulting':
      return `${opNoun} consult on drone program design, label compliance and integrating UAS into existing custom application businesses.`;
    case 'Emergency Response':
      return `${opNoun} list emergency response services for storm-damaged or disease-flare fields where standard booking lead times will not work.`;
    default:
      return `${opNoun} offer ${service.toLowerCase()} services in and around ${cityName}.`;
  }
}

function buildFaqs(city: CityData): { question: string; answer: string }[] {
  const stateData = getStateData(city.stateSlug);
  const stateRate = stateData?.rateRange ?? '$12 to $30 per acre nationally';
  const aerialCat = stateData?.aerialCategory ?? 'a state aerial pesticide applicator license';
  const agency = stateData?.licensingAgency ?? 'the state agriculture department';

  const creds = getCityCredentialCounts(city);
  const resolvedCrops = resolveCityCrops(city);
  const topCrop = resolvedCrops[0]?.name;

  const operatorNames = city.operators.map((o) => o.shortName || o.name);
  const namesText = operatorNames.length <= 3
    ? operatorNames.join(', ')
    : `${operatorNames.slice(0, 3).join(', ')} and ${operatorNames.length - 3} more`;

  return [
    {
      question: `How much does drone spraying cost in ${city.city}, ${city.stateName}?`,
      answer:
        `Drone spraying in ${city.city} typically runs ${stateRate}, in line with the broader ${city.stateName} 2026 benchmark.` +
        ` Application-only rates exclude chemical, and quotes vary based on field size, terrain and crop.` +
        (topCrop
          ? ` ${topCrop} jobs in ${city.stateName} sit toward the lower end of that range when fields are large and contiguous.`
          : '') +
        ` Use the spray cost calculator to model your specific acreage before requesting quotes.`,
    },
    {
      question: `How many drone operators serve ${city.city}?`,
      answer:
        `${city.operators.length} verified agricultural drone operators are listed in the directory for ${city.city}, ${city.stateName}: ${namesText}.` +
        ` All listings are reviewed for licensing claims and contact information before publication.`,
    },
    {
      question: `What certifications do ${city.city} drone operators hold?`,
      answer:
        `Of the ${creds.total} ${city.city} operators listed, ${creds.part107} hold FAA Part 107 (Remote Pilot Certificate) and ${creds.part137} hold FAA Part 137 (Agricultural Aircraft Operator), which is the federal credential required for commercial agricultural application.` +
        ` ${creds.ndaa} list NDAA Section 848 compliant equipment.` +
        ` On the state side, ${city.stateName} requires ${aerialCat} from ${agency} for any commercial drone pesticide application.`,
    },
  ];
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.slug, params.city);
  if (!city) return {};
  const stateData = getStateData(city.stateSlug);
  const abbr = stateData?.abbreviation ?? '';
  const topCrop = resolveCityCrops(city)[0]?.name;
  const rate = stateData?.rateRange;

  const title = `Drone Spraying in ${city.city}, ${abbr || city.stateName} | Rates 2026`;
  const description = topCrop
    ? `${city.operators.length} verified drone operators in ${city.city}, ${abbr || city.stateName}. Top crop: ${topCrop}. ${rate ?? 'Compare rates'} and contact info.`
    : `${city.operators.length} verified agricultural drone operators in ${city.city}, ${abbr || city.stateName}. ${rate ?? 'Compare rates'}, services and contact info.`;

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CityPage({ params }: Props) {
  const city = getCity(params.slug, params.city);
  if (!city) notFound();

  const stateData = getStateData(city.stateSlug);
  const ops = city.operators;
  const aeoBlock = buildAeoBlock(city);
  const faqs = buildFaqs(city);

  const services = getCityServiceBreakdown(city);
  const servicesWithMultiple = services.filter((s) => s.count >= 2);
  const resolvedCrops = resolveCityCrops(city);
  const topCropLinks = resolvedCrops.slice(0, 2);
  const credentials = getCityCredentialCounts(city);
  const nearbyCities = getCitiesInState(city.stateSlug).filter((c) => c.slug !== city.slug);
  const { lat, lng } = getCityCenter(city);

  const stateRate = stateData?.rateRange;
  const stateRateMatch = stateRate?.match(/\$(\d+)\s*to\s*\$(\d+)/);
  const priceRangeMin = stateRateMatch ? Number(stateRateMatch[1]) : undefined;
  const priceRangeMax = stateRateMatch ? Number(stateRateMatch[2]) : undefined;

  // ─── Schemas ───────────────────────────────────────────────────────────────
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
    ...(typeof priceRangeMin === 'number' && typeof priceRangeMax === 'number'
      ? { priceRange: `$${priceRangeMin}-$${priceRangeMax} per acre` }
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

        {/* AEO answer block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">{aeoBlock}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Users className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm">{ops.length}</div>
            <div className="text-xs text-gray-500">Listed operators</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm">{stateRate ?? 'Quote on request'}</div>
            <div className="text-xs text-gray-500">{city.stateName} rate range</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Wheat className="w-5 h-5 text-green-600 mb-2" />
            <div className="font-bold text-gray-900 text-sm truncate">
              {resolvedCrops.length
                ? resolvedCrops.slice(0, 2).map((c) => c.name).join(', ')
                : '—'}
            </div>
            <div className="text-xs text-gray-500">Top crops served</div>
          </div>
        </div>

        {/* Services available */}
        {servicesWithMultiple.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Drone spraying services available in {city.city}
            </h2>
            <ul className="space-y-3">
              {servicesWithMultiple.map((s) => {
                const label = SERVICE_LABELS[s.service];
                const topCropName = resolvedCrops[0]?.name;
                return (
                  <li
                    key={s.service}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{label}</span>
                      <span className="text-xs text-gray-500 shrink-0">
                        {s.count} operator{s.count === 1 ? '' : 's'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {buildServiceCopy(city.city, label, s.count, topCropName)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Operator grid */}
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

        {/* Crops served */}
        {resolvedCrops.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Crops served by {city.city} drone operators
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Crop</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Operators</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate ($/acre)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Window</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedCrops.map((c, i) => (
                    <tr key={c.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/states/${city.stateSlug}/crops/${c.slug}`}
                          className="text-green-700 hover:underline"
                        >
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{c.count}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {c.rateMin && c.rateMax ? `$${c.rateMin} to $${c.rateMax}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.window || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Rate ranges from national crop benchmarks. {city.stateName} statewide range:{' '}
              {stateRate ?? 'see state guide'}.{' '}
              <Link href="/tools/spray-cost-calculator" className="text-green-700 underline">
                Estimate your job →
              </Link>
            </p>
          </section>
        )}

        {/* Operator credentials */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {city.city} drone operator credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <Shield className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm">
                {credentials.part107} of {credentials.total}
              </div>
              <div className="text-xs text-gray-500">FAA Part 107 (Remote Pilot)</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <Shield className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm">
                {credentials.part137} of {credentials.total}
              </div>
              <div className="text-xs text-gray-500">FAA Part 137 (Ag Aircraft)</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <Shield className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm">
                {credentials.ndaa} of {credentials.total}
              </div>
              <div className="text-xs text-gray-500">NDAA Section 848 compliant</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Commercial agricultural drone application in {city.stateName} requires the federal
            FAA Part 137 certificate plus{' '}
            {stateData?.aerialCategory ?? 'a state aerial pesticide applicator license'}
            {stateData ? ` from ${stateData.licensingAgency}` : ''}. Read the federal rules in the{' '}
            <Link href="/regulations/faa-part-137" className="text-green-700 underline">
              FAA Part 137 guide
            </Link>{' '}
            and the state-by-state breakdown on{' '}
            <Link href="/regulations/state-licensing" className="text-green-700 underline">
              state pesticide licensing
            </Link>
            .
          </p>
        </section>

        {/* How to hire */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How to hire a drone operator in {city.city}
          </h2>
          <ol className="space-y-4">
            <li className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">
                    Estimate your acreage and budget
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Use the{' '}
                    <Link href="/tools/spray-cost-calculator" className="text-green-700 underline">
                      spray cost calculator
                    </Link>{' '}
                    to model {city.city} jobs against the {stateRate ?? '$12 to $30 per acre'} state
                    range. Pin down acres, target crop
                    {topCropLinks[0] ? ` (most ${city.city} jobs are ${topCropLinks[0].name.toLowerCase()})` : ''}, and whether you need application only or chemical-included pricing.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">
                    Verify FAA Part 137 and {city.stateName} licensing
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Confirm the operator holds FAA Part 107, FAA Part 137 and{' '}
                    {stateData?.aerialCategory ?? 'the state aerial applicator credential'}.{' '}
                    {credentials.part137} of {credentials.total} {city.city} operators in this directory
                    list Part 137. Ask for a copy of their certificate and state license number
                    before signing.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-sm">
                    Book the application window early
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {topCropLinks[0]?.window
                      ? `${topCropLinks[0].name} treatment in ${city.stateName} typically lands in the ${topCropLinks[0].window} window.`
                      : `Treatment windows are crop and weather dependent.`}{' '}
                    Demand spikes in peak season, so contact 2 to 3 of the {city.city}
                    {' '}operators below 4 to 6 weeks ahead with field maps, target product and a
                    preferred date range. Confirm insurance certificates name your farm as
                    additional insured before the first flight.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </section>

        {/* Nearby cities */}
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

        {/* State link CTA */}
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

        {/* Related crop pages */}
        {topCropLinks.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related crop guides for {city.stateName}</h2>
            <div className="flex flex-wrap gap-2">
              {topCropLinks.map((c) => (
                <Link
                  key={c.slug}
                  href={`/states/${city.stateSlug}/crops/${c.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
                >
                  {c.name} in {city.stateName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-green-600" />
            FAQs about drone spraying in {city.city}
          </h2>
          <FAQAccordion faqs={faqs} />
        </section>

        <div className="mt-4">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
