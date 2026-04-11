import { Metadata } from 'next';
import Link from 'next/link';
import { droneModels } from '@/data/drone-models';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Comparator drone agricole Moldova 2026 | DJI Agras, XAG, ADT',
  description:
    'Compară specificațiile dronelor agricole disponibile în Moldova: DJI Agras T25P, T50, T100, XAG P100, ADT Falcon. Prețuri EUR, subvenție AIPA 50%.',
  alternates: { canonical: '/moldova/unelte/comparator-drone' },
};

export default function MdlDroneComparator() {
  const sorted = [...droneModels].sort((a, b) => (a.priceEurMin || 0) - (b.priceEurMin || 0));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Unelte', href: '/moldova/unelte' },
          { label: 'Comparator drone' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Comparator drone agricole 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Compară modelele principale de drone agricole disponibile în Moldova. Toate modelele sunt
          eligibile pentru subvenția AIPA (50%, plafon 200.000 MDL). Prețurile sunt în EUR.
        </p>
      </header>

      {/* AIPA note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
        <strong className="text-blue-800">Subvenție AIPA:</strong> Toate modelele de mai jos sunt
        eligibile pentru subvenționarea AIPA prin Anexa 3 (50% din costul achiziției, maximum 200.000 MDL
        per beneficiar). Achiziția se face de la dealeri autorizați: BOSAL Solutions sau DRON Assistance.
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl mb-8">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Model</th>
              <th className="text-left p-4 font-semibold text-gray-700">Producător</th>
              <th className="text-right p-4 font-semibold text-gray-700">Rezervor</th>
              <th className="text-right p-4 font-semibold text-gray-700">Productivitate</th>
              <th className="text-right p-4 font-semibold text-gray-700">Preț (EUR)</th>
              <th className="text-center p-4 font-semibold text-gray-700">AIPA</th>
              <th className="text-left p-4 font-semibold text-gray-700">Detalii</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((drone) => (
              <tr key={drone.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900">{drone.name}</td>
                <td className="p-4 text-gray-700">{drone.manufacturer}</td>
                <td className="p-4 text-right text-gray-700">{drone.tankCapacityL} L</td>
                <td className="p-4 text-right text-gray-700">{drone.coverageHaPerHour} ha/h</td>
                <td className="p-4 text-right text-gray-900 font-semibold">
                  {drone.priceEurMin && drone.priceEurMax
                    ? `${(drone.priceEurMin / 1000).toFixed(0)}–${(drone.priceEurMax / 1000).toFixed(0)}K`
                    : '—'}
                </td>
                <td className="p-4 text-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                    Da
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/drone/${drone.slug}`}
                    className="text-blue-700 text-sm font-medium hover:underline"
                  >
                    Detalii →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Ferme mici (&lt; 100 ha)</h3>
          <p className="text-sm text-gray-700">
            <Link href="/drone/dji-agras-t25p" className="text-blue-700 font-medium hover:underline">
              DJI Agras T25P
            </Link>{' '}
: cel mai bun raport preț-productivitate. Ideal pentru startul în Moldova.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Ferme medii (100–500 ha)</h3>
          <p className="text-sm text-gray-700">
            <Link href="/drone/dji-agras-t50" className="text-blue-700 font-medium hover:underline">
              DJI Agras T50
            </Link>{' '}
: cel mai utilizat model în Moldova. Operatorii mari (DRON Assistance) au flotă întreagă T50.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Operatori profesioniști</h3>
          <p className="text-sm text-gray-700">
            <Link href="/drone/dji-agras-t100" className="text-blue-700 font-medium hover:underline">
              DJI Agras T100
            </Link>{' '}
: 75L rezervor, 40 ha/h. Rentabil pentru suprafețe &gt; 500 ha/sezon.
          </p>
        </div>
      </section>

      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Vrei să achiziționezi o dronă în Moldova?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Contactează BOSAL Solutions sau DRON Assistance pentru ofertă cu subvenție AIPA inclusă.
        </p>
        <Link
          href="/moldova/operatori"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Operatori și dealeri Moldova →
        </Link>
      </div>
    </div>
  );
}
