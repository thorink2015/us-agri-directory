import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Printer } from 'lucide-react';
import {
  guides,
  getGuideBySlug,
  getLatestGuides,
} from '@/data/guides';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import GuideReadingProgress from '@/components/guides/GuideReadingProgress';
import GuideTOC from '@/components/guides/GuideTOC';
import ShareButtons from '@/components/guides/ShareButtons';
import { AUTHOR, SITE } from '@/data/author';
import { guideContent } from './content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  const canonical = `/guides/${guide.slug}`;
  const absoluteUrl = `${SITE.domain}${canonical}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
    alternates: { canonical },
    authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: 'US Ag Drone Directory',
      title: guide.title,
      description: guide.description,
      url: absoluteUrl,
      publishedTime: guide.publishDate,
      modifiedTime: guide.lastUpdated,
      authors: [`${SITE.domain}/about`],
      section: guide.category,
      tags: [guide.primaryKeyword, ...guide.secondaryKeywords],
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: ['/opengraph-image'],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const content = guideContent[guide.slug];
  if (!content) notFound();

  const absoluteUrl = `${SITE.domain}/guides/${guide.slug}`;

  const otherGuides = getLatestGuides(4).filter((g) => g.slug !== guide.slug).slice(0, 3);

  // ── Schemas ────────────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    datePublished: guide.publishDate,
    dateModified: guide.lastUpdated,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/opengraph-image`,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords].join(', '),
    articleSection: guide.category,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.domain}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.shortTitle, item: absoluteUrl },
    ],
  };

  const faqSchema = guide.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  const howToSchema = guide.howToSteps && guide.howToSteps.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.howToTitle ?? guide.title,
        description: guide.description,
        totalTime: `PT${guide.readMinutes}M`,
        step: guide.howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  // Dataset schema for guides anchored on a citable data table. Makes the
  // table individually indexable in Google Dataset Search and quotable by
  // AI engines.
  const datasetSchema = guide.dataset
    ? {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: guide.dataset.name,
        description: guide.dataset.description,
        identifier: guide.dataset.identifier ?? absoluteUrl,
        url: absoluteUrl,
        sameAs: absoluteUrl,
        isAccessibleForFree: true,
        inLanguage: 'en-US',
        dateCreated: guide.dataset.dateCreated,
        datePublished: guide.publishDate,
        dateModified: guide.lastUpdated,
        creator: { '@id': AUTHOR.personId },
        publisher: { '@id': AUTHOR.organizationId },
        license: guide.dataset.license,
        keywords: guide.dataset.keywords,
        variableMeasured: guide.dataset.variableMeasured.map((name) => ({
          '@type': 'PropertyValue',
          name,
        })),
        citation: guide.dataset.citation,
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'text/html',
            contentUrl: `${absoluteUrl}#mega-table`,
          },
        ],
        mainEntityOfPage: absoluteUrl,
      }
    : null;

  return (
    <>
      <GuideReadingProgress />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      {datasetSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      )}

      <article className="bg-white">
        {/* Masthead */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumb
            items={[
              { label: 'Guides', href: '/guides' },
              { label: guide.shortTitle },
            ]}
          />
        </div>

        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold">
              {guide.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {guide.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Last updated {formatDate(guide.lastUpdated)}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 text-balance">
            {guide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mb-6">
            {guide.description}
          </p>

          <Byline lastUpdated={guide.lastUpdated} />

          <div className="mt-5 print:hidden">
            <ShareButtons url={absoluteUrl} title={guide.title} size="sm" />
          </div>
        </header>

        {/* Main two-column layout: sidebar TOC + article */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            <GuideTOC sections={guide.toc} />

            <div className="min-w-0 max-w-[46rem]">
              {/* AEO block */}
              <div className="bg-green-50 border-l-4 border-green-700 px-5 py-4 rounded-r-xl mb-8">
                <p className="text-[15px] text-gray-800 leading-relaxed">{guide.aeoBlock}</p>
              </div>

              {/* Quick facts sidebar-as-strip on mobile, card row on desktop */}
              {guide.quickFacts && guide.quickFacts.length > 0 && (
                <aside
                  className="mb-10 bg-stone-50 border border-stone-200 rounded-xl p-5 print:hidden"
                  aria-label="Quick facts"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">
                    Quick facts
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {guide.quickFacts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-xs font-medium text-gray-500">{f.label}</dt>
                        <dd className="text-sm font-semibold text-gray-900 mt-1 leading-snug">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              )}

              {/* Article body — long-form serif */}
              <div className="guide-body">{content}</div>

              {/* FAQ section */}
              {guide.faqs.length > 0 && (
                <section
                  id="faqs"
                  className="mt-16 pt-10 border-t border-stone-200"
                  aria-label="Frequently asked questions"
                >
                  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                    Frequently asked questions
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Common questions readers ask on this topic.
                  </p>
                  <FAQAccordion faqs={guide.faqs} />
                </section>
              )}

              {/* Related internal links */}
              {guide.relatedInternal && guide.relatedInternal.length > 0 && (
                <section className="mt-12 pt-8 border-t border-stone-200">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    Related reading on this site
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {guide.relatedInternal.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-sm text-green-800 font-medium hover:underline"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Share again at the bottom */}
              <div className="mt-10 pt-6 border-t border-stone-200 print:hidden">
                <ShareButtons url={absoluteUrl} title={guide.title} size="md" />
              </div>

              {/* Print CTA */}
              <div className="mt-8 bg-stone-50 border border-stone-200 rounded-xl p-5 text-sm text-gray-700 flex items-start gap-3 print:hidden">
                <Printer className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Print the short checklist
                  </p>
                  <p className="leading-relaxed">
                    Use your browser&apos;s Print option (Ctrl/Cmd + P) to produce a clean
                    one-page version of the final checklist and carry it into your next
                    operator call.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <AuthorCard />
              </div>
            </div>
          </div>
        </div>

        {/* More guides */}
        {otherGuides.length > 0 && (
          <section className="bg-stone-50 border-t border-stone-200 py-14">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                More pillar guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="group bg-white border border-stone-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-sm transition-all"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">
                      {g.category}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug group-hover:text-green-800 mb-2 line-clamp-3">
                      {g.title}
                    </h3>
                    <div className="text-xs text-gray-500">
                      {g.readMinutes} min · Updated {formatDate(g.lastUpdated)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Operator CTA */}
        <section className="bg-green-900 text-white py-12 print:hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              Ready to hire a verified drone operator?
            </h2>
            <p className="text-green-100 mb-6">
              Every operator in the directory has been cross-checked against the
              public FAA, state pesticide, and business-entity records this guide
              tells you to verify.
            </p>
            <Link
              href="/operators"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-900 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Browse the operator directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
