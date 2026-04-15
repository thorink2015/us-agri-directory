import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Plane, CheckCircle, Zap, Droplets, DollarSign, Shield } from 'lucide-react';
import { droneModels, getDroneBySlug } from '@/data/drone-models';
import { operators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return droneModels.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const drone = getDroneBySlug(params.slug);
  if (!drone) return {};

  return {
    title: `${drone.name} | ${drone.manufacturer} Ag Drone: Specs & Operators`,
    description: `${drone.name}: ${drone.tankCapacityL}L tank, ${drone.coverageHaPerHour} ac/hr coverage. Find operators using ${drone.name} across the US.`,
    alternates: {
      canonical: `/drone/${params.slug}`,
    },
  };
}

export default function DronePage({ params }: Props) {
  const drone = getDroneBySlug(params.slug);
  if (!drone) notFound();

  const droneOps = operators.filter((op) => op.drones.includes(drone.slug));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Drone Models', href: '/drone' },
          { label: drone.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
            <Plane className="w-7 h-7 text-blue-700 rotate-45" />
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">{drone.manufacturer}</p>
            <h1 className="text-3xl font-bold text-gray-900">{drone.name}</h1>
          </div>
          {drone.ndaaCompliant && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              <Shield className="w-3.5 h-3.5" /> NDAA Compliant
            </span>
          )}
        </div>
        <p className="text-gray-600 text-lg">
          Technical specifications, pricing, and US operators using the {drone.name}.
        </p>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Droplets className="w-5 h-5 text-blue-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.tankCapacityL}L</div>
          <div className="text-xs text-gray-500">Tank capacity</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Zap className="w-5 h-5 text-green-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.coverageHaPerHour} ac/hr</div>
          <div className="text-xs text-gray-500">Coverage rate</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <DollarSign className="w-5 h-5 text-yellow-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">
            {drone.priceUsdMin ? `$${(drone.priceUsdMin / 1000).toFixed(0)}K` : 'N/A'}
          </div>
          <div className="text-xs text-gray-500">Starting price (USD)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.ndaaCompliant ? 'Yes' : 'No'}</div>
          <div className="text-xs text-gray-500">NDAA compliant</div>
        </div>
      </div>

      {/* Extended specs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Full technical specifications</h2>
        {drone.highlightFeature && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 mb-4 text-sm text-green-800 font-medium">
            {drone.highlightFeature}
          </div>
        )}
        <div className="divide-y divide-gray-100">
          {([
            { label: 'Manufacturer', value: drone.manufacturer },
            { label: 'Model', value: drone.name },
            { label: 'Liquid tank capacity', value: `${drone.tankCapacityL} L` },
            ...(drone.spreadingCapacityKg ? [{ label: 'Spreading capacity (granules/seed)', value: `${drone.spreadingCapacityKg} kg` }] : []),
            ...(drone.flowRateLPerMin ? [{ label: 'Max spray flow rate', value: `${drone.flowRateLPerMin} L/min` }] : []),
            ...(drone.workWidthM ? [{ label: 'Working width', value: `up to ${drone.workWidthM} m` }] : []),
            { label: 'Coverage (optimal conditions)', value: `${drone.coverageHaPerHour} ac/hour` },
            { label: 'Practical daily capacity', value: drone.haPerDay ? `~${drone.haPerDay} ac/day` : `~${drone.coverageHaPerHour * 8} ac/day (estimated)` },
            ...(drone.weightKg ? [{ label: 'Weight (without battery)', value: `${drone.weightKg} kg` }] : []),
            ...(drone.ipRating ? [{ label: 'IP protection rating', value: drone.ipRating }] : []),
            { label: 'Purchase price', value: drone.priceUsdMin && drone.priceUsdMax ? `$${drone.priceUsdMin.toLocaleString()}–$${drone.priceUsdMax.toLocaleString()}` : drone.priceUsdMin ? `From $${drone.priceUsdMin.toLocaleString()}` : 'Contact dealer' },
            { label: 'NDAA compliant', value: drone.ndaaCompliant ? 'Yes — manufactured outside China' : 'No' },
          ] as { label: string; value: string }[]).map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Operators using this drone */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Operators using {drone.name}
          <span className="text-sm font-normal text-gray-500 ml-2">({droneOps.length})</span>
        </h2>

        {droneOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {droneOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-3">
              No operators using {drone.name} are listed yet.
            </p>
            <Link
              href="/operatori"
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              All operators
            </Link>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Do you operate with the {drone.name}?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add your business to the directory for free and connect with farmers searching for operators who fly the {drone.name}.
        </p>
        <Link
          href="/list-your-business"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          List your business free
        </Link>
      </div>
    </div>
  );
}
