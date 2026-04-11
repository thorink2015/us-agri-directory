import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Plane, CheckCircle, Zap, Droplets, Euro } from 'lucide-react';
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
    title: `${drone.name} | Dronă Agricolă ${drone.manufacturer}: Specificații și Operatori`,
    description: `${drone.name}: capacitate rezervor ${drone.tankCapacityL}L, acoperire ${drone.coverageHaPerHour} ha/h. Găsește operatori care folosesc ${drone.name} în România.`,
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
          { label: 'Drone agricole', href: '/drone' },
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
        </div>
        <p className="text-gray-600 text-lg">
          Specificații tehnice, prețuri și operatori care utilizează {drone.name} în România.
        </p>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Droplets className="w-5 h-5 text-blue-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.tankCapacityL}L</div>
          <div className="text-xs text-gray-500">Rezervor</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Zap className="w-5 h-5 text-green-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.coverageHaPerHour} ha/h</div>
          <div className="text-xs text-gray-500">Acoperire</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <Euro className="w-5 h-5 text-yellow-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">
            {drone.priceEurMin ? `${(drone.priceEurMin / 1000).toFixed(0)}K` : 'N/A'}
          </div>
          <div className="text-xs text-gray-500">Preț de la (EUR)</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <div className="font-bold text-gray-900 text-xl">{drone.afirEligible ? 'Da' : 'Nu'}</div>
          <div className="text-xs text-gray-500">Eligibil AFIR</div>
        </div>
      </div>

      {/* Extended specs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Specificații tehnice complete</h2>
        {drone.highlightFeature && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 mb-4 text-sm text-green-800 font-medium">
            {drone.highlightFeature}
          </div>
        )}
        <div className="divide-y divide-gray-100">
          {([
            { label: 'Producător', value: drone.manufacturer },
            { label: 'Model', value: drone.name },
            { label: 'Capacitate rezervor lichide', value: `${drone.tankCapacityL} L` },
            ...(drone.spreadingCapacityKg ? [{ label: 'Capacitate granule/semințe', value: `${drone.spreadingCapacityKg} kg` }] : []),
            ...(drone.flowRateLPerMin ? [{ label: 'Debit pulverizare (max)', value: `${drone.flowRateLPerMin} L/min` }] : []),
            ...(drone.workWidthM ? [{ label: 'Lățime de lucru', value: `până la ${drone.workWidthM} m` }] : []),
            { label: 'Productivitate (condiții optime)', value: `${drone.coverageHaPerHour} ha/oră` },
            { label: 'Productivitate practică/zi', value: drone.haPerDay ? `~${drone.haPerDay} ha/zi` : `~${drone.coverageHaPerHour * 8} ha/zi (estimat)` },
            ...(drone.weightKg ? [{ label: 'Greutate fără baterie', value: `${drone.weightKg} kg` }] : []),
            ...(drone.ipRating ? [{ label: 'Grad protecție', value: drone.ipRating }] : []),
            { label: 'Preț achiziție', value: drone.priceEurMin && drone.priceEurMax ? `${drone.priceEurMin.toLocaleString()}–${drone.priceEurMax.toLocaleString()} EUR` : 'Contact dealer' },
            { label: 'Eligibil fonduri AFIR', value: drone.afirEligible ? 'Da, verificați subprogramul aplicabil' : 'Nu (momentan)' },
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
          Operatori care utilizează {drone.name}
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
              Nu avem operatori listați care să utilizeze {drone.name} momentan.
            </p>
            <Link
              href="/operatori"
              className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Toți operatorii
            </Link>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Ești dealer sau operezi cu {drone.name}?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adaugă-ți firma gratuit în director și atrage clienți care caută operatori cu {drone.name}.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Adaugă-te gratuit
        </Link>
      </div>
    </div>
  );
}
