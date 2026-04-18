import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Plane, Shield, ExternalLink } from 'lucide-react';
import { drones, getDroneBySlug } from '@/data/drone-model';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';

import { addUtm } from '@/lib/utm';
interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return drones.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const drone = getDroneBySlug(params.slug);
  if (!drone) return {};
  return {
    title: `${drone.name}: Specs, Price & US Operators 2026`,
    description: drone.aeoBlock.slice(0, 155),
    alternates: { canonical: `/drones/${params.slug}` },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'US Ag Drone Directory',
      title: `${drone.name} | ${drone.manufacturer} Agricultural Drone`,
      description: drone.aeoBlock.slice(0, 155),
      url: `${SITE.domain}/drones/${params.slug}`,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${drone.name} by ${drone.manufacturer}`,
        },
      ],
    },
  };
}

export default function DronePage({ params }: Props) {
  const drone = getDroneBySlug(params.slug);
  if (!drone) notFound();

  const droneOps = operators.filter((op) => op.drones.includes(drone.slug));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: drone.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Drone Models', item: `${SITE.domain}/drones` },
      { '@type': 'ListItem', position: 3, name: drone.name, item: `${SITE.domain}/drones/${drone.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${drone.name} Specs, Price & US Operators Guide 2026`,
    description: drone.description,
    url: `${SITE.domain}/drones/${drone.slug}`,
    mainEntityOfPage: `${SITE.domain}/drones/${drone.slug}`,
    datePublished: '2026-01-01',
    dateModified: drone.lastReviewedAt,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  const specsRows = [
    { label: 'Manufacturer', value: drone.manufacturer },
    { label: 'Country of manufacture', value: drone.countryOfManufacture },
    { label: 'Status', value: drone.status === 'active' ? 'Active' : 'Discontinued' },
    { label: 'NDAA compliant', value: drone.ndaaCompliant ? 'Yes' : 'No' },
    ...(drone.specs.emptyWeightKg != null ? [{ label: 'Empty weight', value: `${drone.specs.emptyWeightKg} kg${drone.specs.emptyWeightLbs != null ? ` (${drone.specs.emptyWeightLbs} lbs)` : ''}` }] : []),
    ...(drone.specs.mtowKg != null ? [{ label: 'Max takeoff weight (MTOW)', value: `${drone.specs.mtowKg} kg${drone.specs.mtowLbs != null ? ` (${drone.specs.mtowLbs} lbs)` : ''}` }] : []),
    ...(drone.specs.tankLiters != null ? [{ label: 'Spray tank', value: `${drone.specs.tankLiters} L${drone.specs.tankGallons != null ? ` (${drone.specs.tankGallons} gal)` : ''}` }] : []),
    ...(drone.specs.granularCapacityKg != null ? [{ label: 'Granular / spreading capacity', value: `${drone.specs.granularCapacityKg} kg${drone.specs.granularCapacityLiters != null ? ` (${drone.specs.granularCapacityLiters} L)` : ''}` }] : []),
    ...(drone.specs.swathWidthMeters != null ? [{ label: 'Swath width', value: `${drone.specs.swathWidthMeters} m${drone.specs.swathWidthFeet != null ? ` (${drone.specs.swathWidthFeet} ft)` : ''}` }] : []),
    ...(drone.specs.maxFlowRateLMin != null ? [{ label: 'Max spray flow rate', value: `${drone.specs.maxFlowRateLMin} L/min` }] : []),
    ...(drone.specs.battery != null ? [{ label: 'Battery', value: drone.specs.battery }] : []),
    ...(drone.specs.batteryWh != null ? [{ label: 'Battery capacity', value: `${drone.specs.batteryWh} Wh` }] : []),
    ...(drone.specs.chargeTimeMin != null ? [{ label: 'Charge time', value: `${drone.specs.chargeTimeMin} min` }] : []),
    ...(drone.specs.maxWindMs != null ? [{ label: 'Max wind speed', value: `${drone.specs.maxWindMs} m/s${drone.specs.maxWindMph != null ? ` (${drone.specs.maxWindMph} mph)` : ''}` }] : []),
    ...(drone.specs.ipRating != null ? [{ label: 'IP protection rating', value: drone.specs.ipRating }] : []),
    { label: 'MSRP (USD)', value: drone.msrpUsd },
    { label: 'US dealer presence', value: drone.usDealerPresence },
  ] as { label: string; value: string }[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Drone Models', href: '/drones' }, { label: drone.name }]} />

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Plane className="w-7 h-7 text-blue-700 rotate-45" />
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium mb-1">{drone.manufacturer}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{drone.name}</h1>
            <div className="flex flex-wrap gap-2">
              {drone.ndaaCompliant && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  <Shield className="w-3.5 h-3.5" /> NDAA Compliant
                </span>
              )}
              <span className={`inline-flex items-center px-3 py-1 text-sm rounded-full font-medium ${drone.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {drone.status === 'active' ? 'Active' : 'Discontinued'}
              </span>
            </div>
          </div>
        </div>

        <Byline lastUpdated={drone.lastReviewedAt} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">{drone.aeoBlock}</p>
        </div>

        {/* Description */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-gray-700 leading-relaxed">{drone.longDescription}</p>
        </div>

        {/* Best for */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Best for</p>
          <p className="text-sm text-gray-800">{drone.bestFor}</p>
        </div>

        {/* Specs table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Full technical specifications</h2>
          <div className="divide-y divide-gray-100">
            {specsRows.map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2.5 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Authority links */}
        {drone.authorityLinks.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Official resources</p>
            <div className="flex flex-col gap-2">
              {drone.authorityLinks.map((link) => (
                <a
                  key={link.url}
                  href={addUtm(link.url, "drone_specs")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <FAQAccordion faqs={drone.faqs} />
        </div>

        {/* Operators using this drone */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Operators using {drone.name}
            <span className="text-sm font-normal text-gray-500 ml-2">({droneOps.length})</span>
          </h2>
          {droneOps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {droneOps.map((op) => (
                <OperatorCard key={op.slug} operator={op} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 mb-3">No operators using {drone.name} are listed yet.</p>
              <Link href="/operators" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                All operators
              </Link>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">Do you operate with the {drone.name}?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Add your business to the directory and connect with farmers searching for operators who fly the {drone.name}.
          </p>
          <Link href="/list-your-business" className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm">
            List your business free
          </Link>
        </div>

        <AuthorCard />
      </div>
    </>
  );
}
