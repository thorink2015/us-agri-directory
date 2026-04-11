import { Metadata } from 'next';
import Link from 'next/link';
import { crops } from '@/data/crops';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Tratamente cu Drona după Cultură | Ghiduri Complete 2026',
  description:
    'Ghiduri complete pentru tratamentele cu drona agricolă pe fiecare tip de cultură: grâu, porumb, rapiță, floarea soarelui, viță de vie, livezi și altele.',
  alternates: { canonical: '/culturi' },
};

export default function CulturiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Culturi' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tratamente cu drona după cultură</h1>
      <p className="text-gray-600 mb-8">
        Ghiduri complete cu parametri de zbor, norme de aplicare, calendar de tratamente și prețuri orientative.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {crops.map((crop) => (
          <Link
            key={crop.slug}
            href={`/culturi/${crop.slug}`}
            className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-green-300 transition-all group"
          >
            <span className="text-4xl flex-shrink-0">{crop.icon}</span>
            <div>
              <h2 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
                {crop.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">{crop.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                <span className="font-medium text-green-700">{crop.priceMinRon}–{crop.priceMaxRon} RON/ha</span>
                {crop.haRomania && (
                  <span>{(crop.haRomania / 1000).toFixed(0)}K ha în România</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
