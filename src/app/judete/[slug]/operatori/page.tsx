import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { counties, getCountyBySlug } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
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
    title: `Operatori Drone Agricole ${county.name} | Listă Completă`,
    description: `Lista tuturor operatorilor de drone agricole din județul ${county.name}. Contacte directe și prețuri.`,
    alternates: { canonical: `/judete/${params.slug}/operatori` },
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
          { label: 'Județe', href: '/judete' },
          { label: county.name, href: `/judete/${county.slug}` },
          { label: 'Operatori' },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Operatori drone agricole în {county.name}
      </h1>
      <p className="text-gray-600 mb-6">
        {ops.length} operator{ops.length !== 1 ? 'i' : ''} activ{ops.length !== 1 ? 'i' : ''} în {county.name}
      </p>

      {ops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ops.map((op) => (
            <OperatorCard key={op.slug} operator={op} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nu avem operatori listați în {county.name} momentan.</p>
          <Link href="/adauga-operator" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
            Adaugă operator gratuit
          </Link>
        </div>
      )}
    </div>
  );
}
