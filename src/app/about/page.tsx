import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ExternalLink, AlertTriangle, BookOpen, CheckCircle, DollarSign, MapPin, Clock } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import MailtoLink from '@/components/ui/MailtoLink';
import { operators } from '@/data/operators';
import { AUTHOR, SITE, personSchema, organizationSchema } from '@/data/author';

// ─── FAQ ──────────────────────────────────────────────────────────────────
// Removed the older "How do you make money?" FAQ that read "the directory
// is not monetized" — superseded by the "How we make money" section below
// once display advertising and the affiliate program shipped.
const FAQS = [
  {
    question: 'Is this directory really free for operators?',
    answer:
      'Yes. Listing is free. No commission, no booking fee. We may offer optional premium features (featured placement) in the future but basic listings will always be free, permanently.',
  },
  {
    question: 'How often is information updated?',
    answer:
      'Pricing data is reviewed quarterly, regulatory data is updated when rules change and operator listings are continuously refreshed as new operators apply and existing ones update their information. Every content page displays a "last reviewed" date.',
  },
];

export const metadata: Metadata = {
  title: `About ${SITE.name}: Founded by ${AUTHOR.firstName}`,
  description:
    `${SITE.name}, a single-author directory founded by ${AUTHOR.firstName}. Every page personally researched to connect US farmers with verified ag drone operators.`,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `About ${SITE.name}`,
    description: `Founded and edited by ${AUTHOR.firstName}. Every page personally researched and updated.`,
    url: `${SITE.domain}/about`,
    siteName: SITE.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `About ${SITE.name}`,
      },
    ],
  },
};

// ─── Verification methodology ─────────────────────────────────────────────
// Five-step list, exact wording per the AdSense pre-review spec. Keep this
// list stable; Eugen edits it directly in this file when the methodology
// changes, not via a separate copy file.
const VERIFICATION_STEPS = [
  'FAA Part 107 Remote Pilot Certificate lookup against FAADroneZone.',
  'FAA Part 137 Agricultural Aircraft Operator Certificate verification via the FAA FOIA-released list.',
  'State pesticide applicator license check with the issuing state agency.',
  'Liability insurance certificate review with chemical drift coverage confirmed.',
  'Operator interview by phone or video to confirm equipment, fleet, and service area.',
];

export default function AboutPage() {
  const hasLinkedin = !AUTHOR.linkedin.includes('{{');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.domain}/about` },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    url: `${SITE.domain}/about`,
    description: `${SITE.name} is a single-author directory founded and edited by ${AUTHOR.firstName}.`,
    isPartOf: { '@id': `${SITE.domain}/#organization` },
    about: { '@id': AUTHOR.personId },
    mainEntity: { '@id': AUTHOR.personId },
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />


      <Breadcrumb items={[{ label: 'About' }]} />

      {/* 1. H1 + lead AEO block */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About {SITE.name}</h1>

      <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
        <p className="text-sm text-gray-700 leading-relaxed">
          {SITE.name} is a single-author directory of {operators.length}+ agricultural drone operators
          across all 50 US states, founded and personally edited by {AUTHOR.firstName}. Every listing
          is independently reviewed against FAA Part 107 and Part 137 records, and every regulatory or
          pricing page on this site cites primary sources from the FAA, EPA, USDA or land-grant
          university extension. The directory exists to give US farmers one trusted place to find
          verified ag drone operators, regulations and pricing, without middlemen, commissions or paywalls.
        </p>
      </div>

      {/* 2. Founder identity */}
      <section className="mb-10" aria-labelledby="founder-identity">
        <h2 id="founder-identity" className="text-2xl font-bold text-gray-900 mb-4">Founder</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
            {/* TODO[asset]: confirm canonical author photo path. Current file
                lives at /images/eugen-author.jpg per _memory/project-facts.md.
                The AdSense pre-review spec proposed /images/authors/eugen-manoli.jpg;
                Eugen to either move the file or update this src. */}
            <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src="/images/eugen-author.jpg"
                alt={`${AUTHOR.fullName}, ${AUTHOR.jobTitle}`}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xl font-bold text-gray-900">{AUTHOR.fullName}</div>
              <div className="text-sm text-green-700 font-medium mb-3">{AUTHOR.jobTitle}</div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{AUTHOR.bio}</p>
              {/* TODO[copy]: expand founder bio to 120-180 words. Current
                  AUTHOR.bio in src/data/author.ts is ~95 words. Per
                  standing-rules.md section 11 the bio is canonical there,
                  so Eugen edits src/data/author.ts directly, not this page. */}
              <p className="text-xs text-gray-400 italic">
                TODO[copy]: expand founder bio in <code className="font-mono">src/data/author.ts</code> to 120-180 words
              </p>
              <div className="flex flex-wrap gap-4 text-sm mt-3">
                {hasLinkedin && (
                  <a
                    href={AUTHOR.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-700 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                <MailtoLink
                  email={AUTHOR.publicEmail}
                  className="inline-flex items-center gap-1.5 text-green-700 hover:underline"
                >
                  <Mail className="w-4 h-4" /> {AUTHOR.publicEmail}
                </MailtoLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why this directory exists */}
      <section className="mb-10" aria-labelledby="why-exists">
        <h2 id="why-exists" className="text-2xl font-bold text-gray-900 mb-4">Why this directory exists</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The US agricultural drone services market is growing at over 30% per year. But farmers
            searching for a local spray operator found generic search results, equipment retailers,
            and outdated forum threads, not service providers. Operators, on the other side, had no
            cost-effective way to reach the farmers in their coverage area.
          </p>
          <p>
            I built {SITE.name} after spending years tracking the agricultural drone industry in
            European markets, where operator directories are more mature. The US market is larger and
            more fragmented, but the information problem is the same: farmers need a single trusted
            place to find verified operators, compare pricing and understand the FAA, EPA and state
            regulations that govern every application.
          </p>
          <p>
            This site is free for operators to list, free for farmers to use and will remain that way.
            It is not a lead-generation marketplace, not an affiliate network and not a software
            vendor. It is a directory, researched, verified and maintained by one person who cares
            about getting the facts right.
          </p>
        </div>
      </section>

      {/* 4. Verification methodology — exact 5-step list */}
      <section className="mb-10" aria-labelledby="verification-methodology">
        <h2 id="verification-methodology" className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" /> Verification methodology
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Every operator listed with the verified badge is run through the following five-step check:
        </p>
        <ol className="space-y-3 text-sm text-gray-700 leading-relaxed list-decimal pl-5 marker:font-semibold marker:text-green-700">
          {VERIFICATION_STEPS.map((step, idx) => (
            <li key={idx} className="pl-1">
              <div className="flex gap-2 items-start">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. How we make money — condensed from /affiliate-disclosure and
          /advertise (existing site copy). Required for AdSense reviewer
          transparency now that display ads are live. */}
      <section className="mb-10" aria-labelledby="how-we-make-money">
        <h2 id="how-we-make-money" className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" /> How we make money
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            Base operator listings are free, permanently, and verification is independent of payment.
            Revenue comes from three streams that never influence which operators get verified or how
            regulatory facts are reported.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Featured operator placement</strong> on state and service pages, clearly labeled,
              rotated and capped per page.
            </li>
            <li>
              <strong>Sponsored manufacturer and category placements</strong> on the pricing and tool
              pages and in the newsletter, as set out on the{' '}
              <Link href="/advertise" className="text-green-700 hover:underline">advertising page</Link>.
            </li>
            <li>
              <strong>Affiliate links</strong> to certification courses, insurance carriers and equipment,
              flagged inline and routed through <code className="text-[12px] bg-gray-100 px-1 rounded">/go/</code>,
              detailed in the{' '}
              <Link href="/affiliate-disclosure" className="text-green-700 hover:underline">affiliate disclosure</Link>.
            </li>
            <li>
              <strong>Display advertising</strong> via Google AdSense on a small allow-list of content-rich
              pages (homepage, state hubs with 10+ operators, calculator tools). Never on operator profiles,
              city pages, state-crop or state-service combos. See the{' '}
              <Link href="/privacy" className="text-green-700 hover:underline">privacy policy</Link>{' '}
              for cookie disclosure and opt-out links.
            </li>
          </ul>
        </div>
      </section>

      {/* 6. What this site is not (kept for E-E-A-T honesty) */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-500" /> What this site is not
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            I want to be honest about the limits of what this directory can tell you.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-amber-600 flex-shrink-0">•</span>
              <span>
                I am <strong>not a licensed Part 137 Agricultural Aircraft Operator</strong> and I do not
                hold a US state pesticide applicator license. I research and write about the regulations
                I don&apos;t perform commercial applications.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 flex-shrink-0">•</span>
              <span>
                This site is <strong>not legal advice</strong> and is not a law firm. FAA and EPA rules
                change. State pesticide rules vary widely. Verify every regulatory requirement with the
                FAA, EPA and your state Department of Agriculture before operating commercially.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 flex-shrink-0">•</span>
              <span>
                Operator listings are a good-faith review, not a guarantee. Always verify an
                operator&apos;s current certifications, insurance and references before hiring.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. How operators get listed */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How operators get listed</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Listing a drone-spraying business on {SITE.name} is, and will remain, <strong>completely
          free</strong> for operators anywhere in the United States. There are no commissions, no referral
          fees, and no features hidden behind a paywall. Basic listings are free, permanently.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Featured placement (displayed first in state and service listings) is available separately for
          operators who want additional visibility. Contact me for current availability and pricing.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="font-medium text-gray-900 mb-2">Are you an agricultural drone operator?</p>
          <p className="text-sm text-gray-600 mb-3">
            Add your business for free and connect with farmers in your coverage area.
          </p>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            List your business free
          </Link>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* 9. Contact and address */}
      <section className="mb-10" aria-labelledby="contact-address">
        <h2 id="contact-address" className="text-2xl font-bold text-gray-900 mb-4">Contact and address</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Found an error? Know an operator who should be listed? Want to suggest a page? Email me
          directly or use the contact form.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" /> Email
            </div>
            <MailtoLink email={AUTHOR.publicEmail} className="text-green-700 hover:underline font-medium">
              {AUTHOR.publicEmail}
            </MailtoLink>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" /> Mailing address
            </div>
            {/* TODO[asset]: business mailing address (at minimum city + state).
                AdSense reviewers expect a verifiable address on /about or
                /contact. Eugen to fill in the line below. */}
            <p className="text-gray-400 italic">TODO[asset]: business mailing address (city + state minimum)</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" /> Business hours
            </div>
            {/* TODO[copy]: business hours in the operator's local timezone. */}
            <p className="text-gray-400 italic">TODO[copy]: business hours (timezone + days/hours)</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" /> Response time
            </div>
            {/* TODO[copy]: response-time commitment, e.g. "within 1 business day". */}
            <p className="text-gray-400 italic">TODO[copy]: response-time commitment</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:text-green-700 transition-colors"
          >
            Contact form
          </Link>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:text-green-700 transition-colors"
          >
            List your business
          </Link>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mt-6">
          Running a business that serves US farmers or drone operators? See the{' '}
          <Link href="/advertise" className="text-green-700 hover:underline">advertising options</Link>.
        </p>
      </section>

    </div>
  );
}
