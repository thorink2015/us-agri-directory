import { Metadata } from 'next';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { droneModels } from '@/data/drone-models';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Compare Ag Drones: DJI Agras, Hylio, XAG Specs 2026 | US Ag Drone Directory',
  description:
    'Compare agricultural spray drones: DJI Agras T25P, T50, T100, Hylio AG-272, XAG P100 Pro. Tank size, coverage rate, price, and NDAA compliance.',
  alternates: { canonical: '/tools/drone-comparison' },
};

export default function DroneComparator() {
  const sorted = [...droneModels].sort((a, b) => (a.priceUsdMin || 0) - (b.priceUsdMin || 0));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Drone Comparator' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Compare agricultural spray drones 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Side-by-side specs for the most widely used agricultural drones in the US. Prices shown are starting MSRP for a standard configuration with batteries and charger.
        </p>
      </header>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Model</th>
              <th className="text-left p-4 font-semibold text-gray-700">Manufacturer</th>
              <th className="text-right p-4 font-semibold text-gray-700">Tank</th>
              <th className="text-right p-4 font-semibold text-gray-700">Coverage</th>
              <th className="text-right p-4 font-semibold text-gray-700">Price (USD)</th>
              <th className="text-center p-4 font-semibold text-gray-700">NDAA</th>
              <th className="text-left p-4 font-semibold text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((drone) => (
              <tr key={drone.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">{drone.name}</td>
                <td className="p-4 text-gray-700">{drone.manufacturer}</td>
                <td className="p-4 text-right text-gray-700">{drone.tankCapacityL}L</td>
                <td className="p-4 text-right text-gray-700">{drone.coverageHaPerHour} ac/hr</td>
                <td className="p-4 text-right text-gray-900 font-semibold">
                  {drone.priceUsdMin
                    ? `$${(drone.priceUsdMin / 1000).toFixed(0)}K${drone.priceUsdMax ? `–$${(drone.priceUsdMax / 1000).toFixed(0)}K` : '+'}`
                    : '—'}
                </td>
                <td className="p-4 text-center">
                  {drone.ndaaCompliant ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                      <Shield className="w-3 h-3" /> Yes
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">—</span>
                  )}
                </td>
                <td className="p-4">
                  <Link
                    href={`/drone/${drone.slug}`}
                    className="text-green-700 text-sm font-medium hover:underline"
                  >
                    Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Small farms (&lt; 200 acres)</h3>
          <p className="text-sm text-gray-700">
            The <Link href="/drone/dji-agras-t25p" className="text-green-700 font-medium hover:underline">DJI Agras T25P</Link>
            {' '}offers the best price-to-performance ratio at $11,999.
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Mid-size farms (200–1,000 acres)</h3>
          <p className="text-sm text-gray-700">
            The <Link href="/drone/dji-agras-t50" className="text-green-700 font-medium hover:underline">DJI Agras T50</Link>
            {' '}is the most widely adopted platform by US operators.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-2">Large operations (&gt; 1,000 acres)</h3>
          <p className="text-sm text-gray-700">
            The <Link href="/drone/dji-agras-t100" className="text-green-700 font-medium hover:underline">DJI Agras T100</Link>
            {' '}(75L tank, 40 ac/hr) or the <Link href="/drone/hylio-ag-272" className="text-green-700 font-medium hover:underline">Hylio AG-272</Link> for NDAA-compliant operations.
          </p>
        </div>
      </section>
    </div>
  );
}
