import { Metadata } from 'next';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  FileText,
  MapPin,
  Phone,
  DollarSign,
  ClipboardList,
  Wrench,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

// ─── Download landing page for the free Tank Mix field guide PDF ────────────
// Static route. Lives beside the dynamic guides/[slug] route, which only
// generates the slugs in src/data/guides.ts, so there is no collision. The
// PDF itself is served from /public/guides/fields-only-a-drone-can-fly.pdf.
// All copy is drawn from the PDF, which is Eugen's own deliverable.
// ----------------------------------------------------------------------------

const PDF_PATH = '/guides/fields-only-a-drone-can-fly.pdf';
const PAGE_PATH = '/guides/fields-only-a-drone-can-fly';
const PUBLISH_DATE = '2026-06-25';
const LAST_REVIEWED = '2026-06-25';

const TITLE = 'Fields Only a Drone Can Fly';
const SUBTITLE = 'How to find them and what to charge';
const DESCRIPTION =
  'Free PDF field guide for ag drone operators. Find the wet bottoms, tall corn, and odd fields a plane and a ground rig cannot touch, then charge real money. 8 free tools, a price guide, and a printable worksheet.';

export const metadata: Metadata = {
  title: 'Fields Only a Drone Can Fly: Free Operator Field Guide (PDF)',
  description:
    'Download the free PDF: find the wet bottoms, tall corn, and odd fields a plane and ground rig cannot reach, and charge real money. 8 free tools and a worksheet.',
  keywords: [
    'ag drone field guide',
    'drone spraying pricing guide',
    'fields only a drone can fly',
    'how to find drone spraying jobs',
    'drone spray operator marketing',
    'free tools to find spray fields',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Fields Only a Drone Can Fly: Free Operator Field Guide',
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
        alt: 'Fields Only a Drone Can Fly field guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fields Only a Drone Can Fly: Free Operator Field Guide',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

const FIELDS = [
  {
    name: 'Wet bottoms',
    why: 'A rig sinks and ruts for days after a rain, and a plane cannot get in. Your drone never touches the ground.',
    when: 'The 3 days after a soaking rain.',
  },
  {
    name: 'Tall corn at tassel',
    why: 'A rig tracks the corn and costs 3 to 6 bushels an acre. A plane cannot get spray down in the canopy. You spray top down where disease starts.',
    when: 'VT to R1, around July.',
  },
  {
    name: 'Small and odd fields',
    why: 'A plane will not turn for an 11-acre triangle and a rig spends more time on the road than in the field. You fly it in one battery.',
    when: 'Any short hop between bigger jobs.',
  },
  {
    name: 'Drift-boxed fields',
    why: 'Next to a subdivision, a school, an organic farm or a creek, one gust off a plane is a lawsuit. Your low, slow, big-droplet spray stays on the field.',
    when: 'Any time, with chemical drift coverage in place.',
  },
];

const TOOLS = [
  'Web Soil Survey for the wet bottoms',
  'SoilWeb GMap for a drainage check from the field',
  'CroplandCROS for corn versus beans',
  'Google Earth Pro to measure and eyeball a field',
  'County GIS to find the owner',
  'Copernicus and NASA Worldview for standing water',
  'NWS radar and rain totals for where it just rained',
  'B4UFLY to check the airspace before you promise a date',
];

const INSIDE = [
  {
    icon: MapPin,
    title: 'The four fields',
    body: 'The wet bottoms, tall corn at tassel, small odd fields, and drift-boxed fields a plane and a ground rig cannot reach.',
  },
  {
    icon: Wrench,
    title: 'Eight free tools',
    body: 'What each one shows you and the exact steps to run it. Most need no login. Build a call list by tonight.',
  },
  {
    icon: Phone,
    title: 'The calls that book',
    body: 'Word-for-word scripts that lead with the field and the problem, not the price, plus what to say to the pushback you will hear.',
  },
  {
    icon: DollarSign,
    title: 'A price guide',
    body: 'A job-by-job rate card so you quote above the flat-corn rate and stop bidding against three other drones.',
  },
  {
    icon: ClipboardList,
    title: 'A printable worksheet',
    body: 'One row per field: location, type, acres, owner, phone, and a fly / call / book checklist you can carry.',
  },
];

export default function FieldGuideDownloadPage() {
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
    headline: 'Fields Only a Drone Can Fly: a free field guide for ag drone operators',
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
      name: 'Fields Only a Drone Can Fly (PDF field guide)',
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
                {SUBTITLE}. The plain playbook for operators done racing to the
                bottom on $13 corn.
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
              aria-label="Download Fields Only a Drone Can Fly PDF"
            >
              <div className="text-[11px] font-semibold uppercase tracking-widest text-green-300 mb-6">
                A Tank Mix Field Guide
              </div>
              <p className="font-serif text-3xl font-bold leading-tight mb-3">
                Fields Only a Drone Can Fly
              </p>
              <p className="text-green-100 text-sm leading-relaxed mb-8">
                Find the wet bottoms, tall corn, odd fields and boxed-in fields a
                plane and a ground rig cannot touch, look up who owns them, and
                charge real money.
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
              The easy, flat, square acres are a price war. The going rate fell
              to about $13 an acre in 2025, down from $21 the year before. The
              money is on the acres a plane and a ground rig cannot reach: wet
              bottoms, tall corn at tassel, small odd fields, and fields boxed in
              by houses, a creek or an organic neighbor. This free field guide
              shows you how to find those fields tonight with eight free tools,
              look up who owns them, and price the job so you stop anchoring to
              $13. Iowa State 2026 put drone spray at $12.50 an acre average, so
              treat that as your cost, not your price. On these fields you are
              the only call.
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

          {/* The four fields */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            The four fields only a drone can fly
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Each one is a field the competition cannot reach, or cannot do at
            all. The guide gives the flight settings and the timing for every
            one.
          </p>
          <div className="space-y-4 mb-12">
            {FIELDS.map((field) => (
              <div
                key={field.name}
                className="border border-stone-200 rounded-xl p-5"
              >
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-1.5">
                  {field.name}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {field.why}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold uppercase tracking-wide">
                    When
                  </span>{' '}
                  {field.when}
                </p>
              </div>
            ))}
          </div>

          {/* The eight tools */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            Eight free tools to find them tonight
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The guide walks each one step by step, in the order to run them.
            Most need no login.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-12">
            {TOOLS.map((tool) => (
              <li
                key={tool}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <ArrowRight className="w-3.5 h-3.5 mt-1 text-green-700 shrink-0" />
                {tool}
              </li>
            ))}
          </ul>

          {/* Download CTA */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center mb-12">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Get the full field guide
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              Nine pages: the four fields, eight free tools, the calls that
              book, a price guide, and a worksheet you can print. Free, no email
              required.
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
                { href: '/pricing', label: 'Drone spraying cost per acre: 2026 rates' },
                {
                  href: '/guides/year-round-revenue-ag-drone-operators',
                  label: 'Year-round revenue for ag drone operators',
                },
                {
                  href: '/guides/how-to-become-an-agricultural-drone-pilot',
                  label: 'How to become an agricultural drone pilot',
                },
                {
                  href: '/premium-acre',
                  label: 'The Premium Acre: join the founding newsletter list',
                },
                { href: '/operators', label: 'Find or list a verified operator' },
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
