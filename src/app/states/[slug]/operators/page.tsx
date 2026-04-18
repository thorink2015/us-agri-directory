import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { counties, getCountyBySlug } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
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
  return {
    title: `${county.name} Drone Operators: Rates & Contact`,
    description: `Full list of agricultural drone operators in ${county.name}. Direct contact and estimated rates.`,
    alternates: { canonical: `/states/${params.slug}/operators` },
    openGraph: {
      type: 'website',
      title: `${county.name} Drone Operators | US Ag Drone Directory`,
      description: `Full list of agricultural drone operators in ${county.name}. Direct contact and estimated rates.`,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
