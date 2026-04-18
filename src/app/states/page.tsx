import { Metadata } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import CountyCard from '@/components/counties/CountyCard';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Drone Spraying by State: Licensing & Rates 2026',
  description:
    'Find ag drone operators, licensing, and 2026 spray rates for all 50 US states. Iowa $12-$17, Texas $12-$20, California $18-$35/acre.',
  alternates: { canonical: '/states' },
  openGraph: {
    title: 'Ag Drone Services by State, Licensing & Rates (2026)',
    description: 'Browse verified operators, state licensing rules, and 2026 per-acre rates for all 50 states.',
    url: `${SITE.domain}/states`,
  },
};

const regions = Array.from(new Set(counties.map((c) => c.region))).sort();

const PROOF_STATES = [
  {
    slug: 'iowa',
    name: 'Iowa',
    rateRange: '$12 to $17/acre',
    topCrop: 'Corn & Soybeans',
    agency: 'IDALS Cat. 11',
    badge: 'Corn Belt benchmark',
  },
  {
    slug: 'texas',
    name: 'Texas',
    rateRange: '$12 to $20/acre',
    topCrop: 'Cotton & Corn',
    agency: 'TDA Cat. 9',
    badge: 'Largest ag state',
  },
  {
    slug: 'california',
    name: 'California',
    rateRange: '$18 to $35/acre',
    topCrop: 'Grapes & Almonds',
    agency: 'CDPR',
    badge: 'Specialty crops',
  },
];

export default function StatesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${SITE.domain}/states` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Drone Spraying by State' }]} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Agricultural Drone Spraying by State (2026)
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Licensing requirements, 2026 spray rates, and verified operators for all 50 US states. Select your state to see local licensing rules, seasonal spray windows, and operators serving your area.
          </p>
        </div>

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-10">
          <p className="text-sm text-gray-700 leading-relaxed">
            Drone spray rates across the US range from $12 per acre in the Corn Belt (Iowa benchmark) to $50 per acre in Alaska for remote logistics work. Every operator must hold FAA Part 107 and a state pesticide applicator license in the aerial category. All 50 states now have detailed guides below covering state-specific licensing rules, reciprocity, seasonal spray windows, top crops, and 2026 rate ranges.
          </p>
        </div>

        {/* Featured state cards (proof states) */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Featured state guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PROOF_STATES.map((ps) => (
              <Link
                key={ps.slug}
                href={`/states/${ps.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900 text-lg">{ps.name}</span>
                  <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">{ps.badge}</span>
                </div>
                <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                  <div><span className="font-medium text-gray-700">Rates:</span> {ps.rateRange}</div>
                  <div><span className="font-medium text-gray-700">Top crops:</span> {ps.topCrop}</div>
                  <div><span className="font-medium text-gray-700">Agency:</span> {ps.agency}</div>
                </div>
                <span className="text-green-700 text-sm font-medium group-hover:underline">
                  View {ps.name} guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All states by region */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">All 50 states</h2>

          {regions.map((region) => {
            const regionStates = counties.filter((c) => c.region === region);
            return (
              <div key={region} className="mb-10">
                <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {region}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {regionStates.map((state) => (
                    <CountyCard key={state.slug} county={state} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
          <h2 className="font-semibold text-gray-900 mb-2">Are you a drone operator?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Create your free listing and reach farmers searching for drone services in your state.
          </p>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            List Your Business Free
          </Link>
        </div>
      </div>
    </>
  );
}
