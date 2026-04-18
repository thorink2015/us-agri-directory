import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, ExternalLink, MapPin } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { regions, getRegionBySlug } from '@/data/regions';
import { counties } from '@/data/counties';
import { crops as cropsData } from '@/data/crops';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';

import { addUtm } from '@/lib/utm';
interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getRegionBySlug(params.slug);
  if (!region) return {};
  return {
    title: `${region.name} Drone Spraying: 2026 Rates & Operators`,
    description: region.aeoBlock.slice(0, 155),
    alternates: { canonical: `/regions/${region.slug}` },
    openGraph: {
      title: `${region.name} Agricultural Drone Services | US Ag Drone Directory`,
      description: region.aeoBlock.slice(0, 155),
      url: `${SITE.domain}/regions/${region.slug}`,
    },
  };
}

export default function RegionPage({ params }: Props) {
  const region = getRegionBySlug(params.slug);
  if (!region) notFound();

  const regionStates = counties.filter((c) => region.stateSlugs.includes(c.slug));
  const regionCrops = cropsData.filter((c) => region.primaryCrops.includes(c.slug));
  const regionOperators = operators
    .filter((op) => op.counties.some((stateSlug) => region.stateSlugs.includes(stateSlug)))
    .slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: region.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Regions', item: `${SITE.domain}/regions` },
      { '@type': 'ListItem', position: 3, name: region.name, item: `${SITE.domain}/regions/${region.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${region.name} Agricultural Drone Spraying Guide 2026`,
    description: region.description,
    url: `${SITE.domain}/regions/${region.slug}`,
    mainEntityOfPage: `${SITE.domain}/regions/${region.slug}`,
    datePublished: '2026-01-01',
    dateModified: region.lastReviewedAt,
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
        <Breadcrumb items={[{ label: 'Regions', href: '/regions' }, { label: region.name }]} />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {region.name}: Agricultural Drone Services 2026
          </h1>
          <p className="text-lg text-gray-600">{region.description}</p>
        </div>

        <Byline lastUpdated={region.lastReviewedAt} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">{region.aeoBlock}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{region.stateSlugs.length}</div>
            <div className="text-xs text-gray-600 mt-1">States</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{region.priceRangeUsd}</div>
            <div className="text-xs text-gray-600 mt-1">Per acre</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{regionCrops.length}</div>
            <div className="text-xs text-gray-600 mt-1">Primary crops</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{regionOperators.length}+</div>
            <div className="text-xs text-gray-600 mt-1">Operators</div>
          </div>
        </div>

        {/* Long description */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-gray-700 leading-relaxed">{region.longDescription}</p>
        </div>

        {/* Key insights */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Regional insights</h2>
          <div className="space-y-3">
            {region.keyInsights.map((insight, i) => (
              <div key={i} className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spray windows */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Application windows
            </span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Crop / application</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Timing</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Growth stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {region.sprayWindows.map((w, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-medium text-gray-900">{w.crop}</td>
                    <td className="px-4 py-3 text-gray-600">{w.months}</td>
                    <td className="px-4 py-3 text-gray-600">{w.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* States in region */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">States in {region.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {regionStates.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:text-green-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">{state.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Primary crops */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Primary crops in this region</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {regionCrops.map((crop) => (
              <Link
                key={crop.slug}
                href={`/crops/${crop.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{crop.icon}</span>
                  <span className="font-semibold text-gray-900">{crop.name}</span>
                </div>
                <p className="text-xs text-gray-600">${crop.priceMinUsd} to ${crop.priceMaxUsd}/acre</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Operators */}
        {regionOperators.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Operators serving {region.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {regionOperators.map((op) => (
                <OperatorCard key={op.slug} operator={op} />
              ))}
            </div>
            <div className="text-center mt-5">
              <Link href="/operators" className="text-green-700 font-medium text-sm hover:underline">
                View all operators →
              </Link>
            </div>
          </section>
        )}

        {/* Authority links */}
        {region.authorityLinks.length > 0 && (
          <section className="mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Official resources</p>
            <div className="flex flex-col gap-2">
              {region.authorityLinks.map((link) => (
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
          </section>
        )}

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <FAQAccordion faqs={region.faqs} />
        </div>

        <AuthorCard />
      </div>
    </>
  );
}
