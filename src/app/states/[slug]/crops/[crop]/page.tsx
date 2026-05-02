import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle, Calendar, Sprout, FileCheck, HelpCircle } from 'lucide-react';
import { counties, getCountyBySlug } from '@/data/counties';
import { crops, getCropBySlug } from '@/data/crops';
import { getStateData } from '@/data/states';
import { getOperatorsByCounty } from '@/data/operators';
import { formatPrice } from '@/lib/utils';
import {
  composeStateCropFAQs,
  composeStateCropIntro,
  findCropSprayWindows,
  getNoindexBreakdown,
  getStateTopCropEntry,
  shouldNoindexStateCrop,
  stateCropFAQSchema,
} from '@/lib/state-crop-content';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { SITE } from '@/data/author';

interface Props {
  params: { slug: string; crop: string };
}

// Build-time logging of the noindex gate distribution. `generateStaticParams`
// is called once during `next build`, so this is a stable single emit.
let logged = false;
function logNoindexBreakdownOnce() {
  if (logged) return;
  logged = true;
  const { total, totalCombos, perCrop } = getNoindexBreakdown();
  // Single console.log so build output stays scannable.
  // eslint-disable-next-line no-console
  console.log(
    `[state-crops] ${total} of ${totalCombos} combos gated as noindex,follow. ` +
      `Per crop: ${Object.entries(perCrop)
        .map(([k, v]) => `${k}=${v.length}`)
        .join(', ')}`,
  );
}

export async function generateStaticParams() {
  logNoindexBreakdownOnce();
  return counties.flatMap((county) =>
    crops.map((crop) => ({ slug: county.slug, crop: crop.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const county = getCountyBySlug(params.slug);
  const crop = getCropBySlug(params.crop);
  if (!county || !crop) return {};

  const noindex = shouldNoindexStateCrop(params.slug, params.crop);
  const desc = `Drone spraying operators for ${crop.name.toLowerCase()} in ${county.name}, 2026 rates ${formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}. Compare verified operators and contact directly for quotes.`;

  return {
    title: `${crop.name} Drone Spraying: ${county.name} 2026`,
    description: desc,
    alternates: {
      canonical: `/states/${params.slug}/crops/${params.crop}`,
    },
    robots: noindex
      ? { index: false, follow: true }
      : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `${crop.name} Drone Spraying in ${county.name} | US Ag Drone Directory`,
      description: desc,
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

  const state = getStateData(county.slug);
  const sprayWindows = findCropSprayWindows(state, crop.slug);
  const topCropEntry = getStateTopCropEntry(state, crop.slug);
  const intro = composeStateCropIntro(county, crop, state, sprayWindows, topCropEntry);
  const faqs = composeStateCropFAQs(county, crop, state, sprayWindows);
  const faqSchema = stateCropFAQSchema(faqs);

  const allCountyOps = getOperatorsByCounty(county.slug);
  const cropOps = allCountyOps.filter((op) => op.crops.includes(crop.slug));
  const displayOps = cropOps.length > 0 ? cropOps : allCountyOps;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          {state?.regionSlug ? (
            <Link href={`/regions/${state.regionSlug}`} className="hover:underline">
              {state.regionName}
            </Link>
          ) : (
            <span>{county.region}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {crop.name} Drone Spraying in {county.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Agricultural drone services for {crop.name.toLowerCase()} in {county.name}.{' '}
          Typical rate:{' '}
          <span className="font-semibold text-green-700">
            {formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}
          </span>
        </p>
      </div>

      {/* State-specific intro paragraph (template enrichment) */}
      <div className="bg-green-50 border-l-4 border-green-600 px-5 py-4 rounded-r-xl mb-8">
        <p className="text-sm text-gray-700 leading-relaxed">{intro}</p>
      </div>

      {/* State spray-window callout (template enrichment) */}
      {sprayWindows.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            {county.name} {crop.name.toLowerCase()} spray windows and rates
          </h2>
          <ul className="space-y-2">
            {sprayWindows.map((w, i) => (
              <li
                key={`${w.crop}-${i}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-sm border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
              >
                <span className="font-semibold text-gray-900">{w.crop}</span>
                <span className="text-gray-600">{w.window}</span>
                <span className="font-semibold text-green-700 whitespace-nowrap">
                  {w.rateRange} per acre
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Source: state custom-rate guidance and operator-reported windows compiled in{' '}
            <Link href={`/states/${county.slug}`} className="text-green-700 underline hover:text-green-800">
              {county.name}
            </Link>
            .
          </p>
        </section>
      )}

      {/* Crop info card — now uses crop.longDescription instead of crop.description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">{crop.icon}</span>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-600" />
              About {crop.name.toLowerCase()} drone spraying
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {crop.longDescription}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-gray-500">Typical rate: </span>
                <span className="font-semibold text-green-700">
                  {formatPrice(crop.priceMinUsd, crop.priceMaxUsd)}
                </span>
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
        <h2 className="font-semibold text-gray-900 mb-4">
          Application calendar for {crop.name.toLowerCase()}
        </h2>
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

      {/* State licensing block (template enrichment) */}
      {state?.aerialCategory && state.licensingAgency && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-green-600" />
            Aerial pesticide licensing in {county.name}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            {county.name} requires{' '}
            <span className="font-medium text-gray-900">{state.aerialCategory}</span>{' '}
            for aerial pesticide application. The licensing authority is{' '}
            <span className="font-medium text-gray-900">{state.licensingAgency}</span>.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Full agency, exam and renewal-cycle details:{' '}
            <Link
              href={`/states/${county.slug}`}
              className="text-green-700 underline hover:text-green-800"
            >
              {county.name} state page
            </Link>
            {' · '}
            <Link
              href="/regulations/state-licensing"
              className="text-green-700 underline hover:text-green-800"
            >
              50-state licensing reference
            </Link>
            {state.extensionUrl && (
              <>
                {' · '}
                <a
                  href={state.extensionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-800"
                >
                  state extension service
                </a>
              </>
            )}
            .
          </p>
        </section>
      )}

      {/* Operators */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {crop.name} drone operators in {county.name}
          {cropOps.length === 0 && allCountyOps.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (all operators in state)
            </span>
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

      {/* FAQ — combined state-crop generic + crop.faqs */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-green-600" />
          FAQ: {crop.name.toLowerCase()} drone spraying in {county.name}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Related crops in state */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Other crops in {county.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {crops
            .filter((c) => c.slug !== crop.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/states/${county.slug}/crops/${c.slug}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {c.name} in {county.name}
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
