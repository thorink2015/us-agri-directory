import { Metadata } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import CountyCard from '@/components/counties/CountyCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Drone Agricole după Județ | Toate cele 41 de Județe',
  description:
    'Găsește operatori de drone agricole în oricare dintre cele 41 de județe ale României. Filtrare după regiune și servicii disponibile.',
  alternates: { canonical: '/judete' },
  openGraph: {
    title: 'Drone Agricole în toate cele 41 de Județe | TerraDron.ro',
    description: 'Harta completă a operatorilor de drone agricole din România. Selectează județul tău.',
    url: 'https://terradron.ro/judete',
  },
};

const regions = Array.from(new Set(counties.map((c) => c.region))).sort();

export default function JudetsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Județe' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Drone Agricole după Județ
        </h1>
        <p className="text-gray-600">
          Caută operatori de drone agricole în toate cele 41 de județe ale României
        </p>
      </div>

      {regions.map((region) => {
        const regionCounties = counties.filter((c) => c.region === region);
        return (
          <div key={region} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {region}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {regionCounties.map((county) => (
                <CountyCard key={county.slug} county={county} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Nu găsești operatori în județul tău?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Fii primul operator listat sau ajută-ne să completăm directorul.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Adaugă operator gratuit
        </Link>
      </div>
    </div>
  );
}
