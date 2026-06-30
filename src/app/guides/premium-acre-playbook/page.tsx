import { Metadata } from 'next';
import Link from 'next/link';
import {
  Download,
  ArrowRight,
  FileText,
  Layers,
  Phone,
  DollarSign,
  ClipboardList,
  Banknote,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

// ─── Download landing page for the free Premium Acre Playbook PDF ────────────
// Static route. Lives beside the dynamic guides/[slug] route, which only
// generates the slugs in src/data/guides.ts, so there is no collision. The
// PDF itself is served from /public/guides/premium-acre-playbook.pdf.
// All copy is drawn from the PDF, which is Eugen's own deliverable.
// ----------------------------------------------------------------------------

const PDF_PATH = '/guides/premium-acre-playbook.pdf';
const PAGE_PATH = '/guides/premium-acre-playbook';
const PUBLISH_DATE = '2026-06-30';
const LAST_REVIEWED = '2026-06-30';

const TITLE = 'The Premium Acre Playbook';
const SUBTITLE = 'The spray work that never joined the price war';
const DESCRIPTION =
  'Free PDF for ag drone operators. The four lanes that pay more than commodity corn, the license stack in plain English, and the one pricing move that protects your whole summer.';

export const metadata: Metadata = {
  title: 'The Premium Acre Playbook: Free PDF for Drone Operators',
  description:
    'Download the free PDF: four ag drone lanes that pay more than $13 corn, the license stack in plain English, and how to charge by the season.',
  keywords: [
    'premium acre playbook',
    'ag drone operator pricing guide',
    'drone spraying high value jobs',
    'cover crop seeding drone rates',
    'specialty crop drone spraying',
    'drone right of way spraying',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'The Premium Acre Playbook: Free Ag Drone Operator Guide',
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
        alt: 'The Premium Acre Playbook field guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Premium Acre Playbook: Free Ag Drone Operator Guide',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

const LANES = [
  {
    name: 'The sensor jobs',
    pays: '$10 to $20 per acre',
    why: 'You are not spraying anything, so you do not need Part 137 or a pesticide license. Part 107 is all it takes, the lowest bar in the guide and the fastest to start. Stand counts, crop-health maps, and storm or flood damage reports that often pay a flat $350 to $500 a field.',
    firstMove:
      'Build one same-day report priced per acre with a job minimum, then take it to the crop insurance agents and ag retailers in your county.',
  },
  {
    name: 'Cover crop seeding',
    pays: '$20 per acre plus seed',
    why: 'Strap a spreader on the bird and fly rye or a cover mix into standing corn before harvest, no field traffic, no waiting on the combine. NRCS cost-share pays the grower $34 to $75 an acre to plant cover, so your seeding bill is often already covered by a government check.',
    firstMove:
      'Walk into your county NRCS or conservation district office, ask to be added to the approved cover crop applicator list, and find out which fall sign-ups are funded this year.',
  },
  {
    name: 'Specialty rows',
    pays: '$18 to $40 per acre',
    why: 'Orchards, vineyards and vegetables never dropped to $13, and these growers spray 6 to 12 times a season, so one customer is a lot of passes. A Penn State survey found 95 percent of apple growers want to try drone spraying, mostly to reach the hillsides and tight blocks an airblast rig cannot touch. The terrain is your moat.',
    firstMove:
      'Pick the top two specialty crops in your county, get the state extension spray guide for each, then call the grower association and offer the wet-field and hillside passes the ground rigs cannot make.',
  },
  {
    name: 'Right-of-way and brush',
    pays: 'About $36 per acre, year-round',
    why: 'Utilities, pipelines and railroads have thousands of miles of weeds and saplings on wet or steep ground a helicopter will not touch and a ground crew cannot reach. ComEd cleared two acres of right-of-way in 45 minutes on three quarters of a gallon. This is the hardest lane to break into: you get approved on ISNetworld and carry heavy insurance. Build toward it.',
    firstMove:
      'Get the right-of-way category on your pesticide license, register on ISNetworld, and call the regional office of Davey, Asplundh or Wright for their subcontractor packet.',
  },
];

const PRICING = [
  {
    title: 'Sell the season, not the pass',
    body: 'Lock a grower into a yearly deal in January and you protect your whole summer instead of chasing him field by field in July. Annual contracts trade 15 to 20 percent off the walk-up rate for guaranteed acres you know are coming.',
  },
  {
    title: 'Mark up the chemical',
    body: 'If you supply the product, add 10 to 20 percent. That is margin you keep on top of the flying.',
  },
  {
    title: 'Price the rush',
    body: 'When tar spot hits and every plane is booked two weeks out, your value is that you can show up tomorrow. Your true cost to fly is about $7 an acre, so there is room to charge for being the one who answers the phone in the busy week.',
  },
  {
    title: 'Charge a setup fee and set a minimum',
    body: 'A flat trip fee or a few dollars an acre on the awkward, broken-up fields is fair. A 10 to 25 acre minimum on a service call keeps the little jobs from eating your day.',
  },
];

const LICENSE = [
  'Part 107, your basic FAA remote pilot certificate. If you fly for money you already have it.',
  'Part 137, the FAA agricultural aircraft operator certificate that lets you dispense spray or seed from a drone.',
  'The 44807 exemption, only if your bird is over 55 pounds, which most spray drones are.',
  'Your state pesticide license with the right category: ag-plant for specialty crops, right-of-way for utility and brush work, aquatic or public health for ponds and mosquitoes.',
];

const INSIDE = [
  {
    icon: Banknote,
    title: 'The $400 acre',
    body: 'Sterile-moth release over orchards runs about $400 an acre, roughly 30 times the $13 you are fighting over, and why it matters even if you cannot fly it tomorrow.',
  },
  {
    icon: Layers,
    title: 'Four premium lanes',
    body: 'Sensor jobs, cover crop seeding, specialty rows, and right-of-way brush. What each pays, who buys it, and the first move, lined up from easiest to hardest to start.',
  },
  {
    icon: ClipboardList,
    title: 'The license stack',
    body: 'Part 107, Part 137, the 44807 exemption, and the one piece that changes by lane, your state pesticide category, in plain English with the label rule that beats them all.',
  },
  {
    icon: DollarSign,
    title: 'How to charge',
    body: 'The four pricing levers the operators who climbed out of the price war used. Sell the season, not the pass, mark up the chemical, price the rush, and set a minimum.',
  },
  {
    icon: Phone,
    title: 'The first calls',
    body: 'Word-for-word scripts for the grower or grower association, the NRCS office, and the vegetation company, plus where the work posts and which lane to start with.',
  },
];

export default function PremiumAcrePlaybookPage() {
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
    headline: 'The Premium Acre Playbook: a free guide to the ag drone work that pays more than commodity corn',
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
      name: 'The Premium Acre Playbook (PDF field guide)',
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
                {SUBTITLE}. Who pays for it, the license you need, and how to
                charge for the whole season instead of one pass at a time.
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
              aria-label="Download The Premium Acre Playbook PDF"
            >
              <div className="text-[11px] font-semibold uppercase tracking-widest text-green-300 mb-6">
                A Tank Mix Field Guide
              </div>
              <p className="font-serif text-3xl font-bold leading-tight mb-3">
                The Premium Acre Playbook
              </p>
              <p className="text-green-100 text-sm leading-relaxed mb-8">
                The spray work that never joined the price war. Four lanes that
                pay more than commodity corn, the license stack, and how to
                charge for the season instead of one pass.
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
              The average drone spray rate fell to about $13 an acre in 2025,
              down from $21 the year before, while your real cost to fly is
              around $7. The way out is not a lower price. It is the spray work
              that never joined the price war. Sterile-moth release over orchards
              pays about $400 an acre. Crop-health and storm-damage maps pay $10
              to $20 an acre and need only a Part 107. Cover crop seeding pays
              $20 an acre plus seed, and an NRCS check often covers the
              grower&apos;s bill. Specialty rows, orchards, vineyards and
              vegetables, pay $18
              to $40 an acre and get sprayed 6 to 12 times a season. Right-of-way
              and brush work runs about $36 an acre, year-round. This free guide
              walks all four lanes, the license you need, and the one pricing
              move that protects your whole summer.
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

          {/* The four lanes */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            Four lanes that pay more than commodity corn
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Lined up from the easiest to start to the hardest to break into. The
            guide gives the rate, the buyer, and the first move for every one.
          </p>
          <div className="space-y-4 mb-12">
            {LANES.map((lane) => (
              <div
                key={lane.name}
                className="border border-stone-200 rounded-xl p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    {lane.name}
                  </h3>
                  <span className="text-sm font-semibold text-green-800">
                    {lane.pays}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {lane.why}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold uppercase tracking-wide">
                    First move
                  </span>{' '}
                  {lane.firstMove}
                </p>
              </div>
            ))}
          </div>

          {/* How to charge */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            The trick is not the lane, it is how you charge
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The operators who climbed out of the price war stopped selling single
            passes and started selling the season. These four levers go with it.
          </p>
          <div className="space-y-4 mb-12">
            {PRICING.map((lever, i) => (
              <div
                key={lever.title}
                className="flex gap-4 border border-stone-200 rounded-xl p-5"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {lever.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lever.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* The license stack */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
            What you need to fly any of this for hire
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The same stack for almost everything in the guide, with one extra
            piece per lane. From a standing start, Part 137 and your license run
            about four to six months, so do not wait for the busy season.
          </p>
          <ul className="grid gap-2.5 mb-4">
            {LICENSE.map((item) => (
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
            Read the label before every job. A product can only be flown if its
            label allows aerial or unmanned use. Never promise a customer
            something is legal. Verify it yourself.
          </p>

          {/* Download CTA */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center mb-12">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Get the full playbook
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              Nine pages: the $400 acre, four premium lanes, the license stack,
              the season-pricing levers, and the first calls to make. Free, no
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
                  href: '/guides/fields-only-a-drone-can-fly',
                  label: 'Free field guide: fields only a drone can fly',
                },
                {
                  href: '/guides/year-round-revenue-ag-drone-operators',
                  label: 'Year-round revenue for ag drone operators',
                },
                { href: '/pricing', label: 'Drone spraying cost per acre: 2026 rates' },
                {
                  href: '/regulations/faa-part-137',
                  label: 'FAA Part 137 for drone applicators',
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
