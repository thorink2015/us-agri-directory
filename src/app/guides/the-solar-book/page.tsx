import { Metadata } from 'next';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  FileText,
  Map,
  Split,
  ClipboardList,
  Phone,
  ListChecks,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

// ─── Download landing page for the free Solar Book PDF ───────────────────────
// Static route. Lives beside the dynamic guides/[slug] route, which only
// generates the slugs in src/data/guides.ts, so there is no collision. The
// PDF itself is served from /public/guides/the-solar-book.pdf.
// All copy is drawn from the PDF, which is Eugen's own deliverable.
// -----------------------------------------------------------------------------

const PDF_PATH = '/guides/the-solar-book.pdf';
const PAGE_PATH = '/guides/the-solar-book';
const PUBLISH_DATE = '2026-07-13';
const LAST_REVIEWED = '2026-07-13';

const TITLE = 'The Solar Book';
const SUBTITLE = 'How to win solar farm vegetation work';
const DESCRIPTION =
  'Free PDF for ag drone operators. Three routes into solar farm vegetation spraying: who to call, what to say, the license and insurance you need, and how to price it.';

export const metadata: Metadata = {
  title: 'The Solar Book: Free Solar Vegetation Guide (PDF)',
  description:
    'Download the free PDF: three routes into solar farm vegetation work, who to call, what to say, the license and insurance you need, and how to price it.',
  keywords: [
    'the solar book',
    'solar farm vegetation management',
    'drone spraying solar sites',
    'solar vegetation subcontractor',
    'spray drone solar work',
    'right of way applicator license solar',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'The Solar Book: How to Win Solar Farm Vegetation Work',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    publishedTime: PUBLISH_DATE,
    modifiedTime: LAST_REVIEWED,
    authors: [`${SITE.domain}/about`],
    section: 'Operators',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Solar Book field guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Solar Book: How to Win Solar Farm Vegetation Work',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

const ROUTES = [
  {
    name: 'Route A: The Side Door',
    detail: 'Call a community solar owner direct',
    why: 'Sites of 5 to 40 acres where the owner answers his own phone and the vegetation budget is his own problem. First job in 4 to 8 weeks, small checks, nobody gatekeeping. The place everybody should start.',
    need: 'Insurance, a license and a truck.',
  },
  {
    name: 'Route B: The Sub',
    detail: 'Become the vegetation prime’s drone',
    why: 'You do not beat the prime, you become the tool he hires for the ground his mower cannot reach. Sites of 100 to 2,000 acres, repeat volume, he feeds you work. First job in 2 to 4 months.',
    need: 'ISNetworld, pollution liability, a safety plan and an EMR.',
  },
  {
    name: 'Route C: The Bid',
    detail: 'Answer posted solicitations',
    why: 'The slowest and biggest, on multi-site multi-year contracts posted to SAM.gov, BidNet Direct and FindRFP. Do not start here, but set the alerts today so the work finds you while you work Routes A and B.',
    need: 'Everything Route B needs, plus bid writing.',
  },
];

const GATE = [
  'Part 137 certificate. You already have it. It is the whole reason you can do this work.',
  'A state right-of-way or industrial vegetation license, plus the aerial category. Your ag category does not cover solar, because solar is not agriculture.',
  'General liability at $1M per occurrence and $2M aggregate, plus $1M auto liability for driving a trailer onto their site.',
  'Aviation and hull cover for the aircraft, and pollution liability at $1M per incident, the one policy almost nobody carries. Herbicide work triggers it.',
  'For Routes B and C: ISNetworld prequalification and a written safety plan with electrical language. A farm safety plan will not pass.',
];

const INSIDE = [
  {
    icon: Map,
    title: 'The ten-minute test',
    body: 'Open the free federal USPVDB map, draw your driving radius, and count the solar sites in it. Your number tells you if solar is even worth your time before you spend a dime.',
  },
  {
    icon: Split,
    title: 'Three routes in',
    body: 'The side door (community solar, direct), the sub (become the prime’s drone), and the bid (SAM.gov and portals). What each needs, time to first job, and which to start with.',
  },
  {
    icon: ListChecks,
    title: 'The directory',
    body: 'Who to call on one page: community solar owners like Nexamp and Pivot Energy, and the primes and O and M providers like Omnidian and SOLV, flagged by who actually takes subs.',
  },
  {
    icon: ClipboardList,
    title: 'The gate',
    body: 'The license category, the full insurance stack including the pollution liability nobody carries, ISNetworld, and the label rule that decides whether you can legally fly the job at all.',
  },
  {
    icon: Phone,
    title: 'What to say',
    body: 'Copy-paste proof email, sub email, phone opener and voicemail, plus the seven objections they will throw at you and the exact answer to each one.',
  },
];

export default function SolarBookDownloadPage() {
  const absoluteUrl = `${SITE.domain}${PAGE_PATH}`;
  const pdfUrl = `${SITE.domain}${PDF_PATH}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.domain}/guides` },
      { '@type': 'ListItem', position: 3, name: TITLE, item: absoluteUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Solar Book: a free guide to winning solar farm vegetation work by drone',
    description: DESCRIPTION,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    datePublished: PUBLISH_DATE,
    dateModified: LAST_REVIEWED,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/opengraph-image`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    articleSection: 'Operators',
    associatedMedia: {
      '@type': 'MediaObject',
      name: 'The Solar Book (PDF field guide)',
      contentUrl: pdfUrl,
      encodingFormat: 'application/pdf',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-white">
        {/* Masthead */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumb
            items={[{ label: 'Guides', href: '/guides' }, { label: TITLE }]}
          />
        </div>

        {/* Hero */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-5">
                <FileText className="w-3.5 h-3.5" />
                Free field guide · Tank Mix
              </div>

              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4 text-balance">
                {TITLE}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6 max-w-xl">
                {SUBTITLE}. Three routes into the work, who to call, what to say,
                and what it takes to say yes.
              </p>

              <Byline lastUpdated={LAST_REVIEWED} />

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PDF_PATH}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download the PDF
                </a>
                <a
                  href={PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-900 font-semibold rounded-lg border border-green-200 hover:border-green-400 transition-colors"
                >
                  Open in browser
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Free PDF, no email required. Ten minute read.
              </p>
            </div>

            {/* Cover card */}
            <a
              href={PDF_PATH}
              download
              className="group block bg-gradient-to-br from-green-900 to-green-950 rounded-2xl p-8 text-white shadow-sm hover:shadow-lg transition-shadow"
              aria-label="Download The Solar Book PDF"
            >
              <div className="text-[11px] font-semibold uppercase tracking-widest text-green-300 mb-6">
                A Tank Mix Field Guide
              </div>
              <p className="font-serif text-3xl font-bold leading-tight mb-3">
                The Solar Book
              </p>
              <p className="text-green-100 text-sm leading-relaxed mb-8">
                The vegetation work on solar farms that almost no drone operator
                is chasing. Find the sites near you, the people to call, and the
                license and insurance it takes to win it.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border-t border-green-700/60 pt-5 w-full">
                <Download className="w-4 h-4" />
                Download the field guide
                <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* AEO answer block */}
          <div className="bg-green-50 border-l-4 border-green-700 px-5 py-4 rounded-r-xl mb-10">
            <p className="text-[15px] text-gray-800 leading-relaxed">
              Solar farm vegetation is spray work with almost no drone
              competition. The free federal USPVDB map lists every US ground
              mount solar site over 1 megawatt with the owner&apos;s name on it,
              so you can count the work in your driving radius in about ten
              minutes. There are three ways in: the side door, calling community
              solar owners direct on 5 to 40 acre sites for a first job in 4 to 8
              weeks; the sub, becoming a vegetation prime&apos;s drone on 100 to
              2,000 acre sites; and the bid, answering posted solicitations on
              SAM.gov. Your ag pesticide category does not cover it. Solar needs
              a right of way or industrial vegetation license plus pollution
              liability insurance most operators do not carry. NREL studied 54
              sites and found a median herbicide cost of $293 an acre on gravel.
              This free guide gives the routes, the license and insurance gate,
              the calls, and how to price it.
            </p>
          </div>

          {/* What's inside */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            What is inside
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {INSIDE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-stone-200 rounded-xl p-5"
                >
                  <Icon className="w-5 h-5 text-green-700 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Three routes */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            Three routes into solar vegetation work
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            They are not equal. One is fast and small, one is slow and steady,
            one is slowest and biggest. Start where your paperwork lets you
            start. The guide walks each one step by step.
          </p>
          <div className="space-y-4 mb-12">
            {ROUTES.map((route) => (
              <div
                key={route.name}
                className="border border-stone-200 rounded-xl p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    {route.name}
                  </h3>
                  <span className="text-sm font-semibold text-green-800">
                    {route.detail}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {route.why}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold uppercase tracking-wide">
                    What you need first
                  </span>{' '}
                  {route.need}
                </p>
              </div>
            ))}
          </div>

          {/* The gate */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            The gate: what it takes to say yes
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Route A needs the top of this list. Routes B and C need all of it.
            The guide has the full checklist with costs.
          </p>
          <ul className="grid gap-2.5 mb-4">
            {GATE.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <ArrowRight className="w-3.5 h-3.5 mt-1 text-green-700 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mb-12">
            Read the label before every job. A drone is an aircraft, so if the
            label prohibits aerial application you cannot fly it, no matter how
            good the pitch was. A lot of standard bareground chemistry has no
            clean aerial label. Check it before you bid.
          </p>

          {/* Download CTA */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center mb-12">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Get the full field guide
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              Fourteen pages: the ten-minute test, three routes in, the full
              directory of who to call, the license and insurance gate, the
              copy-paste scripts, the objections and how to price it. Free, no
              email required.
            </p>
            <a
              href={PDF_PATH}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download the PDF
            </a>
          </div>

          {/* Related reading */}
          <section className="pt-8 border-t border-stone-200">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Related reading on this site
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  href: '/guides/premium-acre-playbook',
                  label: 'The Premium Acre Playbook: work that beats commodity corn',
                },
                {
                  href: '/guides/year-round-revenue-ag-drone-operators',
                  label: 'Year-round revenue for ag drone operators',
                },
                {
                  href: '/regulations/faa-part-137',
                  label: 'FAA Part 137 for drone applicators',
                },
                {
                  href: '/premium-acre',
                  label: 'The Premium Acre: join the founding newsletter list',
                },
              ].map((link) => (
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

          <div className="mt-10">
            <AuthorCard />
          </div>
        </div>
      </article>
    </>
  );
}
