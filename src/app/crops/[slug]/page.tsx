import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, TrendingUp, Plane, ExternalLink } from 'lucide-react';
import { crops, getCropBySlug } from '@/data/crops';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';

import { addUtm } from '@/lib/utm';
// Default last-reviewed date used when an individual crop entry does not
// supply its own `lastReviewedAt`. Bumped when crop data is reviewed.
const DEFAULT_REVIEWED = '2026-04-01';

interface Props {
  params: { slug: string };
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export async function generateStaticParams() {
  return crops.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const crop = getCropBySlug(params.slug);
  if (!crop) return {};
  return {
    title: `${crop.name}: Drone Spraying Rates 2026`,
    description: crop.aeoBlock.slice(0, 155),
    alternates: { canonical: `/crops/${params.slug}` },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'US Ag Drone Directory',
      title: `Drone Spraying for ${crop.name} | US Ag Drone Directory`,
      description: `$${crop.priceMinUsd} to $${crop.priceMaxUsd}/acre, treatment calendar, key pests, and verified operators across all 50 states.`,
      url: `https://agdronedirectory.com/crops/${crop.slug}`,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `Drone Spraying for ${crop.name}`,
        },
      ],
    },
  };
}

export default function CropPage({ params }: Props) {
  const crop = getCropBySlug(params.slug);
  if (!crop) notFound();

  const cropOperators = operators.filter((op) => op.crops.includes(crop.slug)).slice(0, 6);

  const faqs = [
    {
      question: `How much does drone spraying cost for ${crop.name.toLowerCase()}?`,
      answer: `The typical rate for drone spraying on ${crop.name.toLowerCase()} is $${crop.priceMinUsd} to $${crop.priceMaxUsd} per acre for application only, the farmer supplies the chemical product. Pricing varies based on total acreage, distance from the operator's base, and product type. Larger fields (500+ acres) often qualify for lower per-acre rates.`,
    },
    {
      question: `When is the best time to spray ${crop.name.toLowerCase()} by drone?`,
      answer: `Optimal timing for drone applications on ${crop.name.toLowerCase()} is: ${crop.treatmentMonths.map((m) => MONTH_NAMES[m - 1]).join(', ')}. Applications should be made at low wind speeds (under 10 mph), ideally early morning or evening, to maximize product adhesion and minimize drift.`,
    },
    {
      question: `What are the advantages of drone spraying vs. ground equipment for ${crop.name.toLowerCase()}?`,
      answer: `Key advantages of drone application over ground equipment: (1) zero soil compaction, (2) can operate when fields are too wet for tractors, (3) high-precision GPS coverage with 95%+ uniformity, (4) can treat irregular or small fragmented fields, and (5) can spray tall crops like corn at full canopy. The main trade-off is a smaller tank size compared to pull-behind ground rigs.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'Crops', item: 'https://agdronedirectory.com/crops' },
      { '@type': 'ListItem', position: 3, name: crop.name, item: `https://agdronedirectory.com/crops/${crop.slug}` },
    ],
  };

  const lastReviewed = crop.lastReviewedAt ?? DEFAULT_REVIEWED;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Drone Spraying for ${crop.name}: Guide 2026`,
    description: crop.description,
    url: `${SITE.domain}/crops/${crop.slug}`,
    mainEntityOfPage: `${SITE.domain}/crops/${crop.slug}`,
    datePublished: '2026-01-01',
    dateModified: lastReviewed,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Crops', href: '/crops' },
          { label: crop.name },
        ]}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">{crop.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Drone Spraying for {crop.name}: Rates, Timing &amp; Operators 2026
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              ${crop.priceMinUsd} to ${crop.priceMaxUsd}/acre
            </span>
            {crop.haUS && (
              <span className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Plane className="w-3.5 h-3.5 rotate-45" />
                {(crop.haUS / 1000000).toFixed(0)}M+ acres in the US
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Byline, E-E-A-T signal, drives Google "last updated" parsing */}
      <Byline lastUpdated={lastReviewed} />

      {/* AEO block */}
      <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">{crop.aeoBlock}</p>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <p className="text-gray-700 leading-relaxed">{crop.description}</p>
        {crop.uvlNormLHa && (
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              ULV rate: {crop.uvlNormLHa}
            </span>
            {crop.yieldGainPct && crop.yieldGainPct > 0 ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Yield gain: +{crop.yieldGainPct}% (no soil compaction)
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Pests / diseases */}
      {crop.mainPests && crop.mainPests.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Key pests and diseases</h2>
          <ul className="space-y-1.5">
            {crop.mainPests.map((pest) => (
              <li key={pest} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>
                {pest}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Drone application can respond quickly to any of these threats, even in fields with difficult access.
          </p>
        </div>
      )}

      {/* Treatment calendar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Application calendar
        </h2>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {MONTH_NAMES.map((month, i) => {
            const active = crop.treatmentMonths.includes(i + 1);
            return (
              <div
                key={month}
                className={`p-2 rounded-lg text-center text-xs font-medium ${
                  active
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {month}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Green = optimal application window
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Drone spraying rates 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2 text-gray-600 font-medium">Service type</th>
                <th className="pb-2 text-gray-600 font-medium">Low</th>
                <th className="pb-2 text-gray-600 font-medium">Average</th>
                <th className="pb-2 text-gray-600 font-medium">High</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              <tr>
                <td className="py-2 font-medium text-gray-900">{crop.name}: application only</td>
                <td className="py-2 text-green-700">${crop.priceMinUsd}/acre</td>
                <td className="py-2 text-green-700 font-semibold">${Math.round((crop.priceMinUsd + crop.priceMaxUsd) / 2)}/acre</td>
                <td className="py-2 text-green-700">${crop.priceMaxUsd}/acre</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href="/pricing"
          className="inline-block mt-3 text-sm text-green-700 hover:underline"
        >
          See the full pricing guide →
        </Link>
      </div>

      {/* Authority links */}
      {crop.authorityLinks.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Official resources</p>
          <div className="flex flex-col gap-2">
            {crop.authorityLinks.map((link) => (
              <a
                key={link.url}
                href={addUtm(link.url, "authority_link")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related tools */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-3">Related tools</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools/spray-cost-calculator" className="text-sm text-green-700 hover:underline">Spray Cost Calculator</Link>
          <span className="text-gray-300">|</span>
          <Link href="/tools/roi-calculator" className="text-sm text-green-700 hover:underline">ROI Buy vs. Hire</Link>
          <span className="text-gray-300">|</span>
          <Link href="/tools/treatment-calendar" className="text-sm text-green-700 hover:underline">Treatment Calendar</Link>
          <span className="text-gray-300">|</span>
          <Link href="/pricing" className="text-sm text-green-700 hover:underline">Full Pricing Guide</Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <FAQAccordion faqs={faqs} />
      </div>

      {/* Operators for this crop */}
      {cropOperators.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Operators with {crop.name.toLowerCase()} experience
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cropOperators.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/operators" className="text-green-700 font-medium text-sm hover:underline">
              View all operators →
            </Link>
          </div>
        </div>
      )}

      {/* Author card, E-E-A-T footer */}
      <AuthorCard />
    </div>
    </>
  );
}
