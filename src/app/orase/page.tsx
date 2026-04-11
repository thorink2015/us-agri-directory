import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cities } from '@/data/cities';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Drone Agricole după Oraș | Operatori în Marile Orașe din România',
  description:
    'Găsește operatori de drone agricole în marile orașe din România: București, Cluj-Napoca, Timișoara, Iași, Brașov și altele. Servicii de pulverizare și monitorizare.',
  alternates: { canonical: '/orase' },
};

export default function OraseIndexPage() {
  const roCities = cities.filter((c) => !c.county.includes('-md'));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Orașe' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone agricole după oraș
        </h1>
        <p className="text-gray-600">
          Operatori de drone agricole în marile centre urbane din România. Fiecare pagină listează
          operatorii activi în zona orașului și județele limitrofe.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {roCities.map((city) => (
          <Link
            key={city.slug}
            href={`/orase/${city.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900 group-hover:text-green-700 text-sm transition-colors">
                {city.name}
              </span>
            </div>
            <p className="text-xs text-gray-500">{city.countyName}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Cauți după județ?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Toate cele 41 de județe din România au pagini dedicate cu operatori și prețuri.
        </p>
        <Link
          href="/judete"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Vezi toate județele →
        </Link>
      </div>
    </div>
  );
}
