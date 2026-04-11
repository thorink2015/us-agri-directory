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
  title: 'Servicii Drone Agricole România | Pulverizare, Fertilizare, Cartografiere',
  description:
    'Toate serviciile de drone agricole disponibile în România: pulverizare, fertilizare, monitorizare NDVI, cartografiere, formare piloți și închiriere.',
  alternates: {
    canonical: '/servicii',
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

export default function ServiciiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Servicii' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Servicii Drone Agricole</h1>
        <p className="text-gray-600">
          Descoperă toate serviciile disponibile de la operatorii de drone agricole din România.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => {
          const Icon = serviceIconMap[service.slug] ?? Droplets;
          return (
            <Link
              key={service.slug}
              href={`/servicii/${service.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <h2 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                {service.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{service.description}</p>
              {(service.priceMinRon || service.priceMaxRon) && (
                <div className="text-sm font-semibold text-green-700">
                  {formatPrice(service.priceMinRon, service.priceMaxRon)}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Ești operator de drone?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adaugă-ți serviciile gratuit în cel mai complet director de drone agricole din România.
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
