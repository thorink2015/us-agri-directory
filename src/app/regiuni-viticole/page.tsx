import { Metadata } from 'next';
import Link from 'next/link';
import { wineRegions } from '@/data/wine-regions';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Drone Agricole Regiuni Viticole România | Tratamente Viță de Vie',
  description:
    'Drone agricole pentru viticultura din România: Dealu Mare, Murfatlar, Cotnari, Drăgășani, Odobești, Recaș. Tratamente fungicide cu drona pentru viță de vie.',
  alternates: {
    canonical: '/regiuni-viticole',
  },
};

export default function WineRegionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Regiuni viticole' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Drone Agricole în Regiunile Viticole din România
        </h1>
        <p className="text-gray-600">
          Tratamente fitosanitare cu drona pentru viță de vie în toate podgoriile importante din România.
          Preț: <span className="font-semibold text-green-700">120–200 RON/ha</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wineRegions.map((region) => (
          <Link
            key={region.slug}
            href={`/regiuni-viticole/${region.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-purple-300 transition-all"
          >
            <div className="text-3xl mb-3">🍇</div>
            <h2 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-purple-700 transition-colors">
              {region.name}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              {region.vineyardHa.toLocaleString('ro')} ha viță de vie
            </p>
            <p className="text-sm text-gray-600 line-clamp-3">{region.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {region.mainGrapes.slice(0, 3).map((grape) => (
                <span key={grape} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                  {grape}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Ești operator de drone pentru viticultură?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adaugă-te gratuit și fii găsit de viticultori din toată România.
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
