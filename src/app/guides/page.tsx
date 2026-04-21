import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import {
  guides,
  getLatestGuides,
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_ORDER,
} from '@/data/guides';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { AUTHOR, SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Ag Drone Guides: Farmer Playbooks for Hiring & Vetting Drone Operators',
  description:
    "Long-form farmer-side guides for hiring, vetting, and working with US agricultural drone operators. Written and edited by Eugen Manoli.",
  alternates: { canonical: '/guides' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ag Drone Guides: Farmer Playbooks for Drone Spraying',
    description:
      'Farmer-side playbooks for hiring, vetting, and working with US agricultural drone operators.',
    url: `${SITE.domain}/guides`,
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Agricultural drone guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ag Drone Guides: Farmer Playbooks for Drone Spraying',
    description:
      'Farmer-side playbooks for hiring, vetting, and working with US agricultural drone operators.',
    images: ['/opengraph-image'],
  },
};

const CATEGORY_CHIP_STYLES: Record<string, string> = {
  'For Farmers': 'bg-amber-100 text-amber-900',
  Regulations: 'bg-blue-100 text-blue-900',
  Equipment: 'bg-purple-100 text-purple-900',
  Funding: 'bg-emerald-100 text-emerald-900',
  Operators: 'bg-rose-100 text-rose-900',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function GuidesHubPage() {
  const latest = getLatestGuides(1)[0];
  const categoriesWithGuides = GUIDE_CATEGORY_ORDER.map((cat) => ({
    category: cat,
    guides: guides
      .filter((g) => g.category === cat)
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate)),
  })).filter((c) => c.guides.length > 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.domain}/guides` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Ag Drone Guides',
    description:
      'Long-form farmer-side playbooks for hiring, vetting, and working with US agricultural drone operators.',
    url: `${SITE.domain}/guides`,
    isPartOf: { '@id': `${SITE.domain}/#website` },
    publisher: { '@id': AUTHOR.organizationId },
    hasPart: guides.map((g) => ({
      '@type': 'Article',
      headline: g.title,
      url: `${SITE.domain}/guides/${g.slug}`,
      datePublished: g.publishDate,
      dateModified: g.lastUpdated,
      author: { '@id': AUTHOR.personId },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero band, editorial / premium */}
      <section className="bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          <Breadcrumb items={[{ label: 'Guides' }]} />

          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Ag Drone Directory Guides
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 max-w-4xl">
            Farmer-side playbooks for hiring, vetting, and working with drone spray operators.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Pillar guides, not blog posts. Each one is a 4,000 word reference
            built from primary-source FAA, EPA, university extension, and
            industry data. News and shorter takes live on the{' '}
            <Link href="/blog" className="text-green-800 underline decoration-green-300 underline-offset-4 hover:decoration-green-700">
              blog
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>
              Written by{' '}
              <Link href="/about" className="text-gray-700 font-medium hover:text-green-700">
                {AUTHOR.fullName}
              </Link>
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>{guides.length} guide{guides.length === 1 ? '' : 's'} published</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>More in the pipeline</span>
          </div>
        </div>
      </section>

      {/* Latest / featured guide */}
      {latest && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Latest guide
            </h2>
          </div>
          <Link
            href={`/guides/${latest.slug}`}
            className="group block bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-lg transition-all"
          >
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      CATEGORY_CHIP_STYLES[latest.category] ?? 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {latest.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" /> {latest.readMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" /> Updated {formatDate(latest.lastUpdated)}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-green-800 transition-colors">
                  {latest.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-5">
                  {latest.description}
                </p>
                <span className="inline-flex items-center gap-2 text-green-800 font-semibold">
                  Read the full guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              {latest.featuredPullQuote && (
                <div className="hidden md:flex bg-gradient-to-br from-green-800 to-green-950 p-10 items-center justify-center text-white">
                  <blockquote className="max-w-sm">
                    <p className="font-serif text-xl leading-snug mb-4">
                      &ldquo;{latest.featuredPullQuote.quote}&rdquo;
                    </p>
                    <cite className="not-italic text-sm text-green-200">
                      {latest.featuredPullQuote.attribution}
                    </cite>
                  </blockquote>
                </div>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* Category sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categoriesWithGuides.map(({ category, guides: categoryGuides }) => {
          const meta = GUIDE_CATEGORIES[category];
          return (
            <div key={category} className="mb-14 last:mb-0">
              <div className="mb-6 pb-3 border-b border-stone-200">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                  {meta.label}
                </h2>
                <p className="text-sm text-gray-600">{meta.blurb}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group bg-white border border-stone-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          CATEGORY_CHIP_STYLES[guide.category] ?? 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {guide.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" /> {guide.readMinutes} min
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-green-800 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-5 flex-1">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Updated {formatDate(guide.lastUpdated)}
                      </span>
                      <span className="text-green-800 font-semibold group-hover:underline">
                        Read <ArrowRight className="w-3 h-3 inline" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Coming soon band */}
        <div className="mt-6 bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
            In the pipeline
          </p>
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
            More pillar guides coming through 2026.
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-4">
            New guides cover regulations, equipment, funding, and operator-side
            playbooks as each topic lands. Shorter takes and news are published
            on the blog.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-green-800 font-semibold hover:underline"
          >
            See the blog for shorter pieces <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
