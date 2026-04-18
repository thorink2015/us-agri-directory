import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Shield } from 'lucide-react';
import { drones } from '@/data/drone-model';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Commercial Ag Spray Drones: DJI, Hylio, XAG Specs',
  description:
    'Compare commercial agricultural spray drones used by operators across the US: DJI Agras T50, T25, T100, Hylio AG-272, XAG P100 Pro, and Talos T60X. Specifications and pricing.',
  alternates: {
    canonical: '/drones',
  },
};

export default function DronePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Drone Models' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commercial Ag Spray Drones</h1>
        <p className="text-gray-600">
          Compare the commercial spray drones used by operators in our directory. Specifications, pricing, and key features for each platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {drones.map((drone) => (
          <Link
            key={drone.slug}
            href={`/drones/${drone.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Plane className="w-6 h-6 text-blue-700 rotate-45" />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium">{drone.manufacturer}</p>
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {drone.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-sm font-bold text-gray-900">{drone.specs.tankLiters}L</div>
                <div className="text-xs text-gray-600">Tank</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-sm font-bold text-gray-900">{drone.specs.maxWindMph} mph</div>
                <div className="text-xs text-gray-600">Max wind</div>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-2">{drone.msrpUsd}</div>

            {drone.ndaaCompliant && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                <Shield className="w-3 h-3" /> NDAA Compliant
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Find an operator with the right equipment</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use the operator search filters to find drone applicators by drone model in your state.
        </p>
        <Link
          href="/operators"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Find Operators
        </Link>
      </div>
    </div>
  );
}
