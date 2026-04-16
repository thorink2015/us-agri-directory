import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { regions } from '@/data/regions';

export const metadata: Metadata = {
  title: 'US Agricultural Drone Regions | Corn Belt, Delta, Great Plains & More',
  description:
    'Browse agricultural drone services by US farming region: Corn Belt, Great Plains, Delta, California, and Southeast. Regional crops, timing, and operators.',
  alternates: { canonical: '/regions' },
  openGraph: {
    title: 'US Agricultural Drone Regions | US Ag Drone Directory',
    description:
      'Regional hubs covering the Corn Belt, Great Plains, Delta, California, and Southeast. Browse operators by region.',
    url: 'https://agdronedirectory.com/regions',
  },
};

export default function RegionsIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'Regions', item: 'https://agdronedirectory.com/regions' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ label: 'Regions' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">US Agricultural Drone Regions</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        American agriculture is built around distinct farming regions — each with its own crop mix, spray timing,
        and drone demand drivers. Pick a region below to see operator options, dominant crops, and regional
        application windows.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {regions.map((r) => (
          <Link
            key={r.slug}
            href={`/regions/${r.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="text-3xl">{r.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {r.name}
                  </h2>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                <p className="text-sm text-gray-500">{r.stateSlugs.length} states · {(r.totalAcres / 1000000).toFixed(0)}M acres</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{r.tagline}</p>
          </Link>
        ))}
      </div>

      {/* Cross-link */}
      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <p className="text-sm text-gray-700">
          Prefer to browse by state or crop?{' '}
          <Link href="/states" className="text-green-700 hover:underline font-medium">All 50 states</Link>
          {' · '}
          <Link href="/crops" className="text-green-700 hover:underline font-medium">All crops</Link>
          {' · '}
          <Link href="/operators" className="text-green-700 hover:underline font-medium">All operators</Link>
        </p>
      </div>
    </div>
  );
}
