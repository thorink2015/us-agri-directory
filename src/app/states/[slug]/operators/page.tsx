import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { counties, getCountyBySlug } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
import { shouldNoindexStateOperators } from '@/lib/indexing-gates';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import { SITE } from '@/data/author';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return counties.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  if (!county) return {};
  const noindex = shouldNoindexStateOperators(params.slug);
  const desc = `Verified agricultural drone operators serving ${county.name} farms. Compare services, coverage areas, and 2026 spray rates, then contact directly.`;
  return {
    title: `${county.name} Drone Operators: Rates & Contact`,
    description: desc,
    alternates: { canonical: `/states/${params.slug}/operators` },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `${county.name} Drone Operators | US Ag Drone Directory`,
      description: desc,
      url: `${SITE.domain}/states/${params.slug}/operators`,
      siteName: 'US Ag Drone Directory',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${county.name} agricultural drone operators`,
        },
      ],
    },
  };
}

export default function CountyOperatorsPage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  if (!county) notFound();

  const ops = getOperatorsByCounty(county.slug);

  // ─── JSON-LD: BreadcrumbList + CollectionPage with ItemList ──────────────
  // PR #100 schema audit flagged this route as zero-schema. Emit always —
  // even on noindex'd thin states the structured data is a useful signal
  // when a user lands via a deep link from outside.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${SITE.domain}/states` },
      { '@type': 'ListItem', position: 3, name: county.name, item: `${SITE.domain}/states/${county.slug}` },
      { '@type': 'ListItem', position: 4, name: 'Operators', item: `${SITE.domain}/states/${county.slug}/operators` },
    ],
  };

  const collectionPageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE.domain}/states/${county.slug}/operators#collection`,
    name: `Agricultural Drone Operators in ${county.name}`,
    description: `${ops.length} verified agricultural drone operator${ops.length === 1 ? '' : 's'} serving ${county.name}`,
    url: `${SITE.domain}/states/${county.slug}/operators`,
    isPartOf: { '@id': `${SITE.domain}/#website` },
    publisher: { '@id': `${SITE.domain}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      name: `Drone Operators in ${county.name}`,
      numberOfItems: ops.length,
      itemListOrder: 'https://schema.org/ItemListUnordered',
      itemListElement: ops.map((op, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.domain}/operators/${op.slug}`,
        name: op.name,
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Breadcrumb
        items={[
          { label: 'States', href: '/states' },
          { label: county.name, href: `/states/${county.slug}` },
          { label: 'Operators' },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Agricultural drone operators in {county.name}
      </h1>
      <p className="text-gray-600 mb-6">
        {ops.length} operator{ops.length !== 1 ? 's' : ''} serving {county.name}
      </p>

      {ops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ops.map((op) => (
            <OperatorCard key={op.slug} operator={op} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No operators listed in {county.name} yet.</p>
          <Link href="/list-your-business" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
            List your business free
          </Link>
        </div>
      )}
    </div>
  );
}
