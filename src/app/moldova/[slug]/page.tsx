import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, Grape, Apple, Wheat } from 'lucide-react';
import { moldovaRegions, getMoldovaRegionBySlug } from '@/data/regions-moldova';
import { getOperatorsByRaion, getMdOperators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return moldovaRegions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getMoldovaRegionBySlug(params.slug);
  if (!region) return {};
  return {
    title: `Drone Agricole ${region.name}, Moldova | Operatori și Prețuri 2026`,
    description: `Operatori de drone agricole în ${region.name}, Moldova. Servicii de pulverizare${region.vineyardHa && region.vineyardHa >= 3000 ? ', tratamente viticole' : ''} și monitorizare. Prețuri 170–240 MDL/ha.`,
    alternates: { canonical: `/moldova/${region.slug}` },
  };
}

const CROP_LABELS: Record<string, string> = {
  'grau': 'Grâu',
  'porumb': 'Porumb',
  'rapita': 'Rapiță',
  'floarea-soarelui': 'Floarea-soarelui',
  'vita-de-vie': 'Viță de vie',
  'livada': 'Livezi',
  'soia': 'Soia',
  'cereale': 'Cereale',
  'legume': 'Legume',
  'sfecla-de-zahar': 'Sfeclă de zahăr',
  'tutun': 'Tutun',
};

export default function MoldovaRegionPage({ params }: Props) {
  const region = getMoldovaRegionBySlug(params.slug);
  if (!region) notFound();

  // Operators that explicitly cover this raion, plus fall back to all MD operators
  // (since most cover the entire country)
  const specificOps = getOperatorsByRaion(region.slug);
  const ops = specificOps.length > 0 ? specificOps : getMdOperators();

  // Related raioane in same macro region
  const relatedRaioane = moldovaRegions
    .filter((r) => r.region === region.region && r.slug !== region.slug)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Drone Agricole ${region.name}`,
            description: `Operatori de drone agricole în ${region.name}, Republica Moldova`,
            isPartOf: { '@type': 'WebSite', name: 'TerraDron.ro', url: 'https://terradron.ro' },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: ops.length,
              itemListElement: ops.slice(0, 10).map((op, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'ProfessionalService',
                  name: op.name,
                  url: `https://terradron.ro/operatori/${op.slug}`,
                },
              })),
            },
          }),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Moldova', href: '/moldova' },
            { label: region.name },
          ]}
        />

        {/* Header with blue Moldova accent */}
        <header className="mb-6 border-l-4 border-blue-500 pl-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
            <MapPin className="w-3 h-3" />
            {region.region}, Republica Moldova
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Drone agricole în {region.name}, Moldova
          </h1>
          <p className="text-gray-600">
            {ops.length} operatori de drone agricole care acoperă zona {region.name}. Servicii de pulverizare,
            monitorizare și cartografiere pentru culturile locale.
          </p>
        </header>

        {/* Agri badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {region.agriculturalLandHa && (
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 border border-green-200 text-sm px-3 py-1.5 rounded-full">
              <Wheat className="w-4 h-4" />
              {(region.agriculturalLandHa / 1000).toFixed(0)}K ha teren agricol
            </div>
          )}
          {region.vineyardHa && region.vineyardHa >= 1000 && (
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-800 border border-purple-200 text-sm px-3 py-1.5 rounded-full">
              <Grape className="w-4 h-4" />
              {(region.vineyardHa / 1000).toFixed(1)}K ha viticole
            </div>
          )}
          {region.orchardHa && region.orchardHa >= 500 && (
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 border border-orange-200 text-sm px-3 py-1.5 rounded-full">
              <Apple className="w-4 h-4" />
              {(region.orchardHa / 1000).toFixed(1)}K ha livezi
            </div>
          )}
        </div>

        {/* Main crops */}
        {region.mainCrops && region.mainCrops.length > 0 && (
          <section className="mb-8 bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Culturi principale în {region.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {region.mainCrops.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-full text-sm"
                >
                  {CROP_LABELS[c] || c}
                </span>
              ))}
            </div>
          </section>
        )}

        <p className="text-gray-600 mb-6">
          Majoritatea operatorilor de drone agricole din Moldova acoperă întreaga țară, inclusiv {region.name}.
          Contactează direct operatorii de mai jos pentru disponibilitate și prețuri. Prețul mediu:{' '}
          <strong>170–240 MDL/ha</strong>.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {ops.map((op) => (
            <OperatorCard key={op.slug} operator={op} />
          ))}
        </section>

        {relatedRaioane.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Alte raioane din {region.region}
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedRaioane.map((r) => (
                <Link
                  key={r.slug}
                  href={`/moldova/${r.slug}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="text-center mt-8">
          <Link
            href="/moldova"
            className="inline-flex items-center gap-1 text-blue-700 font-medium text-sm hover:underline"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Înapoi la directorul Moldova
          </Link>
        </div>
      </div>
    </>
  );
}
