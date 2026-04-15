import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Wheat, TrendingUp, Users } from 'lucide-react';
import { counties, getCountyBySlug, getAdjacentCounties, getCountyOperatorCount } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
import { CROP_NAME_MAP } from '@/data/crops';
import { buildCountyMetadata } from '@/lib/seo';
import { formatAcres } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import CountyPageSchema from '@/components/schema/CountyPageSchema';
import FAQAccordion from '@/components/ui/FAQAccordion';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return counties.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  if (!county) return {};
  const count = getCountyOperatorCount(params.slug);
  return buildCountyMetadata(county, count);
}

export default function StatePage({ params }: Props) {
  const state = getCountyBySlug(params.slug);
  if (!state) notFound();

  const ops = getOperatorsByCounty(state.slug);
  const adjacent = getAdjacentCounties(state, 5);
  const cropNames = state.mainCrops.map((c) => CROP_NAME_MAP[c] || c);

  const faqs = [
    {
      question: `How many drone operators serve ${state.name}?`,
      answer: ops.length > 0
        ? `There are currently ${ops.length} verified agricultural drone operator${ops.length !== 1 ? 's' : ''} listed for ${state.name}: ${ops.map(o => o.name).join(', ')}. Contact them directly for quotes and availability.`
        : `We don't have any operators listed specifically in ${state.name} yet. Many operators service multiple states. Check neighboring states or list your business if you're a local operator.`,
    },
    {
      question: `How much does drone spraying cost in ${state.name}?`,
      answer: `Drone spraying rates in ${state.name} are in line with the national average of $12 to $18 per acre for application only, with the farmer supplying the chemical product. Rates vary based on field size, terrain, and crop type. Contact listed operators for exact quotes for your operation.`,
    },
    {
      question: `What crops are drone spraying used for in ${state.name}?`,
      answer: `The main crops in ${state.name} that benefit from drone spraying include ${cropNames.join(', ')}. Drone application is especially valuable when fields are too wet for ground rigs, crops are too tall for tractor-mounted sprayers, or fields are small and irregular.`,
    },
  ];

  return (
    <>
      <CountyPageSchema county={state} operators={ops} faqs={faqs} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'States', href: '/states' },
            { label: state.name },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            <span>{state.region}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Drone Spraying Services in {state.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {ops.length > 0
              ? `${ops.length} verified agricultural drone operator${ops.length !== 1 ? 's' : ''} serving ${state.name}.`
              : `Be the first drone operator listed in ${state.name}.`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, value: `${ops.length}`, label: 'Operators' },
            { icon: TrendingUp, value: formatAcres(state.agriculturalLandHa), label: 'Agricultural land' },
            { icon: Wheat, value: cropNames.slice(0, 2).join(', '), label: 'Main crops' },
            ...(state.vineyardHa ? [{ icon: MapPin, value: formatAcres(state.vineyardHa), label: 'Vineyard acreage' }] : [
              { icon: MapPin, value: state.region, label: 'Region' },
            ]),
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm truncate">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Operators */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Drone operators serving {state.name}
          </h2>

          {ops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ops.map((op) => (
                <OperatorCard key={op.slug} operator={op} />
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800 font-medium mb-2">
                No operators listed in {state.name} yet
              </p>
              <p className="text-amber-700 text-sm mb-4">
                Many operators service multiple states and will travel. Check neighboring states or list your business if you operate in {state.name}.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/operators"
                  className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
                >
                  View all operators
                </Link>
                <Link
                  href="/list-your-business"
                  className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                >
                  List your business free
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Crops in this state */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Crops for drone spraying in {state.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {state.mainCrops.map((crop) =>
              CROP_NAME_MAP[crop] ? (
                <Link
                  key={crop}
                  href={`/crops/${crop}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
                >
                  {CROP_NAME_MAP[crop]}
                </Link>
              ) : (
                <span
                  key={crop}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600"
                >
                  {crop}
                </span>
              )
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Drone spraying FAQ for {state.name}
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>

        {/* Adjacent states */}
        {adjacent.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby states</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {adjacent.map((c) => (
                <Link
                  key={c.slug}
                  href={`/states/${c.slug}`}
                  className="text-center p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-all text-sm font-medium text-gray-700"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
