import { Metadata } from 'next';
import Link from 'next/link';
import { crops } from '@/data/crops';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Drone Services by Crop: Corn, Soybeans, Cotton, Wheat',
  description:
    'Find drone spraying operators with experience in your specific crop. Guides covering application timing, per-acre costs and equipment for every major US crop.',
  alternates: { canonical: '/crops' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Drone Services by Crop: Corn, Soybeans, Cotton, Wheat',
    description:
      'Find drone spraying operators with experience in your specific crop. Guides covering application timing, per-acre costs, and equipment for every major US crop.',
    url: 'https://agdronedirectory.com/crops',
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Drone services by crop type',
      },
    ],
  },
};

export default function CropsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Crops' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Drone spraying by crop type</h1>
      <p className="text-gray-600 mb-8">
        Different crops need different approaches. Browse by crop to find operators with hands-on experience in your production system, plus application timing, typical per-acre rates and equipment recommendations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {crops.map((crop) => (
          <Link
            key={crop.slug}
            href={`/crops/${crop.slug}`}
            className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-green-300 transition-all group"
          >
            <span className="text-4xl flex-shrink-0">{crop.icon}</span>
            <div>
              <h2 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
                {crop.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">{crop.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                <span className="font-medium text-green-700">${crop.priceMinUsd} to ${crop.priceMaxUsd}/acre</span>
                {crop.haUS && (
                  <span>{(crop.haUS / 1000000).toFixed(0)}M+ acres in the US</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
