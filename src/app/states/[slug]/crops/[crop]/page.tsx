import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle } from 'lucide-react';
import { counties, getCountyBySlug } from '@/data/counties';
import { crops, getCropBySlug, CROP_NAME_MAP } from '@/data/crops';
import { getOperatorsByCounty } from '@/data/operators';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { SITE } from '@/data/author';

interface Props {
  params: { slug: string; crop: string };
}

export async function generateStaticParams() {
  return counties.flatMap((county) =>
    crops.map((crop) => ({ slug: county.slug, crop: crop.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  const crop = getCropBySlug(params.crop);
  if (!county || !crop) return {};

  return {
    title: `${crop.name} Drone Spraying: ${county.name} 2026`,
    description: `Drone operators for ${crop.name.toLowerCase()} in ${county.name}. Rates ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}/acre, contact verified operators directly.`,
    alternates: {
      canonical: `/states/${params.slug}/crops/${params.crop}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `${crop.name} Drone Spraying in ${county.name} | US Ag Drone Directory`,
      description: `Drone operators for ${crop.name.toLowerCase()} in ${county.name}. Rates ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}/acre, contact verified operators directly.`,
      url: `${SITE.domain}/states/${params.slug}/crops/${params.crop}`,
      siteName: 'US Ag Drone Directory',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${crop.name} drone spraying in ${county.name}`,
        },
      ],
    },
  };
}

export default function CountyCropPage({ params }: Props) {
  const county = getCountyBySlug(params.slug);
  const crop = getCropBySlug(params.crop);
  if (!county || !crop) notFound();

  const allCountyOps = getOperatorsByCounty(county.slug);
  const cropOps = allCountyOps.filter((op) => op.crops.includes(crop.slug));
  const displayOps = cropOps.length > 0 ? cropOps : allCountyOps;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const faqs = [
    {
      question: `How much does drone spraying for ${crop.name.toLowerCase()} cost in ${county.name}?`,
      answer: `Drone spraying rates for ${crop.name.toLowerCase()} in ${county.name} typically run ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)} per acre for application only, the farmer supplies the chemical product. Pricing varies based on total acreage, distance from the operator's base, and product type.`,
    },
    {
      question: `When should I schedule drone applications for ${crop.name.toLowerCase()}?`,
      answer: `Optimal timing for ${crop.name.toLowerCase()} drone applications is: ${crop.treatmentMonths.map((m) => monthNames[m - 1]).join(', ')}. Exact timing depends on weather conditions and pest or disease pressure each season. Contact a local operator in ${county.name} for scheduling.`,
    },
    {
      question: `What advantages does drone spraying offer for ${crop.name.toLowerCase()} vs. ground equipment?`,
      answer: `Drone spraying on ${crop.name.toLowerCase()} offers several advantages: zero soil compaction, ability to operate when fields are too wet for tractors, GPS-guided uniform coverage at 95%+ accuracy, and the ability to treat small or irregularly shaped fields. It also reduces product waste by 20 to 30% compared to ground equipment.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'States', href: '/states' },
          { label: county.name, href: `/states/${county.slug}` },
          { label: crop.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{county.region}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {crop.name} Drone Spraying in {county.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Agricultural drone services for {crop.name.toLowerCase()} in {county.name}.{' '}
          Typical rate: <span className="font-semibold text-green-700">{formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}/acre</span>
        </p>
      </div>

      {/* Crop info card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{crop.icon}</span>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">About {crop.name.toLowerCase()}</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{crop.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-gray-500">Typical rate: </span>
                <span className="font-semibold text-green-700">{formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}/acre</span>
              </div>
              {crop.haUS && (
                <div>
                  <span className="text-gray-500">US acreage: </span>
                  <span className="font-semibold text-gray-900">
                    {(crop.haUS / 1000000).toFixed(0)}M+ acres
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment calendar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Application calendar for {crop.name.toLowerCase()}</h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {monthNames.map((month, idx) => {
            const isActive = crop.treatmentMonths.includes(idx + 1);
            return (
              <div
                key={month}
                className={`text-center py-2 rounded-lg text-xs font-medium ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {month}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <CheckCircle className="w-3 h-3 text-green-600 inline mr-1" />
          Green months = optimal application window
        </p>
      </div>

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {crop.name} drone operators in {county.name}
          {cropOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">(all operators in state)</span>
          )}
        </h2>

        {displayOps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayOps.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">
              No operators listed in {county.name} yet
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/operators"
                className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                All US operators
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

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          FAQ: {crop.name.toLowerCase()} drone spraying in {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Related crops in state */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Other crops in {county.name}</h2>
        <div className="flex flex-wrap gap-2">
          {county.mainCrops
            .filter((c) => c !== crop.slug)
            .map((c) => (
              <Link
                key={c}
                href={`/states/${county.slug}/crops/${c}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {CROP_NAME_MAP[c] || c}
              </Link>
            ))}
          <Link
            href={`/states/${county.slug}`}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-600"
          >
            ← Back to {county.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
