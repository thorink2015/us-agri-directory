import { Metadata } from 'next';
import Link from 'next/link';
import {
  Droplets, Leaf, Eye, Map, GraduationCap, Plane,
  ShoppingBag, Sprout, Lightbulb, Zap, type LucideIcon,
} from 'lucide-react';
import { services } from '@/data/services';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Agricultural Drone Services | Spraying, Seeding, Mapping & More',
  description:
    'Browse all agricultural drone services available through our directory: spraying, cover crop seeding, aerial mapping, crop scouting, pilot training, and equipment rental.',
  alternates: {
    canonical: '/services',
  },
};

const serviceIconMap: Record<string, LucideIcon> = {
  spraying: Droplets,
  spreading: Leaf,
  monitoring: Eye,
  mapping: Map,
  training: GraduationCap,
  rental: Plane,
  sales: ShoppingBag,
  seeding: Sprout,
  consultancy: Lightbulb,
  emergency: Zap,
};

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Services' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Drone Services</h1>
        <p className="text-gray-600">
          Modern ag drones do more than spray. Browse the full range of drone services available from verified operators in our directory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => {
          const Icon = serviceIconMap[service.slug] ?? Droplets;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <h2 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                {service.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{service.description}</p>
              {(service.priceMinUsd || service.priceMaxUsd) && (
                <div className="text-sm font-semibold text-green-700">
                  {formatPrice(service.priceMinUsd, service.priceMaxUsd)}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Are you a drone operator?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Create a free listing and connect with farmers searching for drone services in your state.
        </p>
        <Link
          href="/list-your-business"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          List Your Business Free
        </Link>
      </div>
    </div>
  );
}
