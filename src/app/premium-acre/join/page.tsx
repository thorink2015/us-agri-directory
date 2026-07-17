import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  FileText,
  MapPin,
  Download,
} from 'lucide-react';
import { AUTHOR, SITE } from '@/data/author';
import { PREMIUM_ACRE_STRIPE_URL } from '@/lib/premium-acre';
import FAQAccordion from '@/components/ui/FAQAccordion';

// ─── Founding-member sales page for The Premium Acre (paid newsletter) ───────
// Light, minimal, conversion-focused. Sits below the /premium-acre founding
// list signup: that page collects emails, this one takes the payment. All
// body copy comes from Eugen's Premium Acre deliverable (pillars, binder
// docs, founder stack); founding price set to $17/month per Eugen.
// Uses the same distraction-free chrome as /premium-acre (minimal header +
// footer, no newsletter band, no exit popup).
// -----------------------------------------------------------------------------

// ─── Stripe checkout ─────────────────────────────────────────────────────────
// Every CTA on this page points here. Set NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL
// in the Netlify dashboard to the live Stripe Payment Link
// (https://buy.stripe.com/...) and redeploy. Until it is set, the buttons
// scroll to the founder-deal card so nobody gets bounced off the page.
const STRIPE_CHECKOUT_URL = PREMIUM_ACRE_STRIPE_URL || '#founder-deal';

const PAGE_PATH = '/premium-acre/join';
const DESCRIPTION =
  'The twice-monthly playbook for spray drone operators: one revenue lane, one compliance trap, one binder doc per issue. Get the founding rate, $17 a month.';

export const metadata: Metadata = {
  title: 'Join The Premium Acre: $17 Founding Member Rate',
  description: DESCRIPTION,
  keywords: [
    'the premium acre',
    'paid newsletter for drone operators',
    'ag drone operator membership',
    'premium acre founding member',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Join The Premium Acre: $17 Founding Member Rate',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Premium Acre newsletter founding membership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join The Premium Acre: $17 Founding Member Rate',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

// ─── Page content (from Eugen's Premium Acre deliverable) ────────────────────

const PILLARS = [
  {
    icon: TrendingUp,
    tag: 'Offense',
    title: 'The Money Lane',
    body: 'One revenue stream broken down to the dollar. Who pays, what to quote, who to call and the words to use. Solar sites pay vegetation contractors five figures a year and almost nobody flies herbicide on them. We dig up lanes like that while everyone else fights over $13 corn acres.',
  },
  {
    icon: Shield,
    tag: 'Defense',
    title: 'The Fine Print',
    body: "One missing line on a spray record is a $750 fine, no questions asked. A label that does not cover drones is your liability, not the manufacturer's. Every issue we take one compliance trap apart so the inspector, the label and the undercutter never cost you a season.",
  },
  {
    icon: FileText,
    tag: 'Paperwork that pays',
    title: 'The Binder Doc',
    body: 'Every issue ships a document straight into your Operator Binder. Quoting sheets. Spray records. Contracts. A year from now you own the binder that survives an audit and wins the job.',
  },
];

const BINDER_DOCS = [
  {
    num: '01',
    title: 'Job Quoting Sheet',
    desc: 'Price on your numbers with a script to defend your rate against the undercutter',
  },
  {
    num: '02',
    title: 'Spray Application Record',
    desc: 'The audit-ready record built on FAA Part 137 plus the fields states fine you for missing',
  },
  {
    num: '03',
    title: 'Spray Service Agreement',
    desc: 'The operator to farmer contract that does the talking before anything goes wrong',
  },
  {
    num: '04',
    title: 'Subcontract Spray Agreement',
    desc: 'Terms for dealer and co-op work: rates, acreage counts and who answers for drift',
  },
  {
    num: '05',
    title: 'Pre-Season Compliance Checklist',
    desc: 'FAA, state licenses, insurance and FCC paperwork checked before the first job',
  },
];

const SAMPLE_GUIDES = [
  {
    href: '/guides/premium-acre-playbook',
    title: 'The Premium Acre Playbook',
    tagline: 'The spray work that never joined the price war',
  },
  {
    href: '/guides/the-solar-book',
    title: 'The Solar Book',
    tagline: 'How to win solar farm vegetation work',
  },
  {
    href: '/guides/fields-only-a-drone-can-fly',
    title: 'Fields Only a Drone Can Fly',
    tagline: 'How to find them and what to charge',
  },
];

const FOUNDER_PERKS = [
  {
    lead: '$17 a month for as long as you stay.',
    rest: 'The public price is $49.',
  },
  {
    lead: 'The Starter Binder the day you join.',
    rest: 'All five documents up front, not a drip.',
  },
  {
    lead: 'A personal Operation Teardown.',
    rest: 'I review how farmers find you and what an inspector would see, then send your three highest-value fixes.',
  },
  {
    lead: 'First look at farmer leads from the directory in your area,',
    rest: 'from day one.',
  },
  {
    lead: 'A founding vote',
    rest: 'on every Money Lane and Fine Print topic we cover.',
  },
];

const FAQS = [
  {
    question: 'When do issues arrive?',
    answer:
      'Twice a month, on the 1st and the 15th, straight to your inbox. Every issue carries one Money Lane, one Fine Print and one Binder Doc.',
  },
  {
    question: 'What do I get the day I join?',
    answer:
      'The full Starter Binder: the Job Quoting Sheet, Spray Application Record, Spray Service Agreement, Subcontract Spray Agreement and Pre-Season Compliance Checklist. All five documents up front, not a drip.',
  },
  {
    question: 'How does payment work?',
    answer:
      'Checkout runs through Stripe with any major card. Membership is month to month with no contract, and you can cancel anytime.',
  },
  {
    question: 'Is the founding rate really locked?',
    answer:
      'Yes. Founding members pay $17 a month for as long as they stay, and the price never goes up while the membership is active. After the founding spots close, the regular rate is $49 a month.',
  },
  {
    question: 'How is this different from Tank Mix?',
    answer:
      'Tank Mix is the free weekly that shows you the industry. The Premium Acre shows you the invoice and the inspection: exact numbers, call scripts and documents built to be used on the job.',
  },
];

// ─── Small shared pieces ─────────────────────────────────────────────────────

function CtaButton({ label, invert = false }: { label: string; invert?: boolean }) {
  return (
    <a
      href={STRIPE_CHECKOUT_URL}
      className={
        invert
          ? 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-900 font-semibold rounded-full hover:bg-green-50 transition-colors text-base'
          : 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white font-semibold rounded-full hover:bg-green-900 transition-colors text-base shadow-sm'
      }
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function CtaNote({ light = false }: { light?: boolean }) {
  return (
    <p className={`text-xs mt-4 ${light ? 'text-green-200' : 'text-gray-500'}`}>
      Secure checkout by Stripe. Cancel anytime. Your rate never goes up as long
      as you stay.
    </p>
  );
}

export default function PremiumAcreJoinPage() {
  const absoluteUrl = `${SITE.domain}${PAGE_PATH}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'The Premium Acre',
        item: `${SITE.domain}/premium-acre`,
      },
      { '@type': 'ListItem', position: 3, name: 'Join', item: absoluteUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Join The Premium Acre',
    description: DESCRIPTION,
    url: absoluteUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white">
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-stone-50 to-white px-4 pt-16 pb-20 sm:pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6">
              <Mail className="w-3.5 h-3.5" />
              The Premium Acre is open
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6 text-balance">
              Make more per acre. Keep every dollar of it.
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              The average spray acre paid $21 last year. Now it pays $13. The
              Premium Acre is the twice-monthly playbook for operators who fight
              back: one revenue lane broken down to the dollar, one compliance
              trap dismantled and one document for your Operator Binder. Every
              issue.
            </p>

            <div className="flex items-baseline justify-center gap-3 mb-6">
              <span className="text-xl text-gray-400 line-through decoration-gray-300">
                $49
              </span>
              <span className="font-serif text-5xl font-bold text-gray-900">
                $17
              </span>
              <span className="text-sm text-gray-500">
                /month, locked for life
              </span>
            </div>

            <CtaButton label="Claim my founding spot for $17" />
            <CtaNote />

            {/* Issue mock: a light stacked-cards graphic of the newsletter */}
            <div className="relative max-w-md mx-auto mt-16" aria-hidden="true">
              <div className="absolute inset-x-8 -top-3 h-full bg-white border border-stone-200 rounded-2xl -rotate-2" />
              <div className="absolute inset-x-4 -top-1.5 h-full bg-white border border-stone-200 rounded-2xl rotate-1" />
              <div className="relative bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-200/70 p-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-900">
                      The Premium Acre
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Twice a month · the 1st and the 15th
                  </span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        The Money Lane
                      </p>
                      <p className="text-xs text-gray-500">
                        One revenue lane, broken down to the dollar
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        The Fine Print
                      </p>
                      <p className="text-xs text-gray-500">
                        One compliance trap, dismantled
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        The Binder Doc
                      </p>
                      <p className="text-xs text-gray-500">
                        One document for your Operator Binder
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The three pillars ─────────────────────────────────────────── */}
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Every issue, the 1st and the 15th
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Tank Mix shows you the industry. The Premium Acre shows you the
                invoice and the inspection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white border border-stone-200 rounded-2xl p-7"
                >
                  <span className="inline-flex w-11 h-11 rounded-full bg-green-50 items-center justify-center mb-5">
                    <pillar.icon className="w-5 h-5 text-green-800" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-green-700 mb-1">
                    {pillar.tag}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The Starter Binder ────────────────────────────────────────── */}
        <section className="px-4 py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Your binder starts with five documents, day one
              </h2>
              <p className="text-gray-600">
                No drip. Founding members get the full Starter Binder the moment
                they join.
              </p>
            </div>

            <ul className="space-y-3">
              {BINDER_DOCS.map((doc) => (
                <li
                  key={doc.num}
                  className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl px-5 py-4"
                >
                  <span className="font-serif text-lg font-bold text-green-700 w-8 flex-shrink-0">
                    {doc.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {doc.title}
                    </p>
                    <p className="text-xs text-gray-500">{doc.desc}</p>
                  </div>
                </li>
              ))}
              <li className="text-center text-sm text-gray-500 pt-2">
                A new document lands in the binder with every issue.
              </li>
            </ul>
          </div>
        </section>

        {/* ─── First look leads ──────────────────────────────────────────── */}
        <section className="px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex w-12 h-12 rounded-full bg-green-50 items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-green-800" />
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">
              First look at directory leads
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When a farmer inquiry comes through agdronedirectory.com in your
              area, I send it to you before it goes anywhere else. It is a
              founding perk, not a quota: leads land when farmers ask, and
              members hear about them first.
            </p>
          </div>
        </section>

        {/* ─── Sneak peek: the free field guides ─────────────────────────── */}
        <section className="px-4 py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                See the work before you pay
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                These three field guides are free Tank Mix downloads. This is
                the standard every paid issue clears, and the paid issues go
                further: exact numbers, call scripts and the documents to close
                the work.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {SAMPLE_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white border border-stone-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-green-700 mb-3">
                    <Download className="w-3.5 h-3.5" />
                    Free PDF
                  </p>
                  <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{guide.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800">
                    Read it free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The founding offer ────────────────────────────────────────── */}
        <section id="founder-deal" className="px-4 py-20 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-3xl px-6 py-12 sm:px-12 text-center text-white">
              <p className="inline-block text-[11px] font-semibold uppercase tracking-widest text-green-300 border border-green-700 rounded-full px-4 py-1.5 mb-6">
                Founding spots are limited
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                The founder deal
              </h2>
              <p className="text-green-200 mb-8">
                The first operators in get terms nobody after them will ever
                see.
              </p>

              <div className="flex items-baseline justify-center gap-3 mb-8">
                <span className="text-2xl text-green-400 line-through decoration-green-600">
                  $49
                </span>
                <span className="font-serif text-6xl font-bold text-white">
                  $17
                </span>
                <span className="text-sm text-green-200">
                  /month, locked for life
                </span>
              </div>

              <ul className="max-w-md mx-auto text-left space-y-4 mb-10">
                {FOUNDER_PERKS.map((perk) => (
                  <li key={perk.lead} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-100 leading-relaxed">
                      <strong className="text-white font-semibold">
                        {perk.lead}
                      </strong>{' '}
                      {perk.rest}
                    </p>
                  </li>
                ))}
              </ul>

              <CtaButton label="Claim my founding spot for $17" invert />
              <CtaNote light />
            </div>
          </div>
        </section>

        {/* ─── Who writes it ─────────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="max-w-xl mx-auto flex items-center gap-5">
            <Image
              src="/images/eugen-author.jpg"
              alt="AgDrone Eugen"
              width={112}
              height={112}
              className="w-14 h-14 rounded-full object-cover flex-shrink-0"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              The Premium Acre is written by{' '}
              <strong className="text-gray-900">AgDrone Eugen</strong>, editor
              of Tank Mix, the weekly newsletter read by 1,000+ drone operators
              across the country, and founder of agdronedirectory.com, the
              national operator directory.
            </p>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
              Questions, answered
            </h2>
            <FAQAccordion faqs={FAQS} />
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────────────────── */}
        <section className="px-4 pb-24">
          <div className="max-w-2xl mx-auto text-center border-t border-stone-200 pt-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Your margin is the whole game
            </h2>
            <p className="text-gray-600 mb-8">
              One revenue lane. One compliance trap. One binder document. Twice
              a month, for the price of a single acre.
            </p>
            <CtaButton label="Become a founding member" />
            <CtaNote />
            <p className="text-xs text-gray-400 mt-10">
              The Premium Acre · A Tank Mix publication ·{' '}
              <Link href="/" className="hover:text-gray-600 transition-colors">
                agdronedirectory.com
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
