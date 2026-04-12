import { Metadata } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import CountyCard from '@/components/counties/CountyCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Drone Spraying Services by State | All 50 States',
  description:
    'Find agricultural drone operators in all 50 states. Browse by region to find verified drone spraying, seeding, and mapping services near your farm.',
  alternates: { canonical: '/judete' },
  openGraph: {
    title: 'Ag Drone Services by State | US Agricultural Drone Directory',
    description: 'Browse verified drone spraying operators in all 50 states. Select your state to see local operators, rates, and certifications.',
    url: 'https://usagdronedirectory.com/judete',
  },
};

const regions = Array.from(new Set(counties.map((c) => c.region))).sort();

export default function StatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Browse by State' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Drone Spraying Services by State
        </h1>
        <p className="text-gray-600">
          Agricultural drone operators are active in all 50 states. Select your state to find verified operators, check local regulations, and compare rates.
        </p>
      </div>

      {regions.map((region) => {
        const regionStates = counties.filter((c) => c.region === region);
        return (
          <div key={region} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {region}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {regionStates.map((state) => (
                <CountyCard key={state.slug} county={state} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Are you a drone operator?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Create your free listing and reach farmers searching for drone services in your state.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          List Your Business Free
        </Link>
      </div>
    </div>
  );
}
