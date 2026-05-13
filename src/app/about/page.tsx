import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ExternalLink, AlertTriangle, BookOpen, CheckCircle, DollarSign } from 'lucide-react';
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

      {/* 2. Founder identity — visible page shows first name only.
          Full legal name lives in personSchema()/organizationSchema()
          (JSON-LD) and in <Byline>/<AuthorCard> on content pages. */}
      <section className="mb-10" aria-labelledby="founder-identity">
        <h2 id="founder-identity" className="text-2xl font-bold text-gray-900 mb-4">Founder</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
            {/* TODO[asset]: founder photo. File expected at
                /public/images/authors/eugen-manoli.jpg. Until it's added the
                next/image below will 404 in dev. The existing file at
                /public/images/eugen-author.jpg is the fallback the Byline /
                AuthorCard components still use. */}
            <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src="/images/authors/eugen-manoli.jpg"
                alt={`${AUTHOR.firstName}, ${AUTHOR.jobTitle}`}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xl font-bold text-gray-900">{AUTHOR.firstName}</div>
              <div className="text-sm text-green-700 font-medium mb-4">{AUTHOR.jobTitle}</div>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p>
                  I&apos;m {AUTHOR.firstName}. Solo founder, Florida-based, this is a side project I run after my 9-to-5.
                </p>
                <p>
                  I grew up in an agricultural family. Spent enough time around fields and equipment to
                  know what a hard year does to people. A few years back I started messing around with
                  drones, more out of curiosity than anything, and it hit. I flew commercially for a
                  couple of years and sat on both sides of the transaction, as the operator taking calls
                  and as the buyer trying to find someone reliable in peak season. The two views taught
                  me different things.
                </p>
                <p>
                  I also have about ten years in marketing, mostly B2B and ag tech. That&apos;s the angle
                  I bring here. Operators need farmers. Farmers need verified operators. They don&apos;t
                  always find each other in time.
                </p>
                <p>
                  This directory is my attempt to close that gap. Free for farmers, free baseline listing
                  for operators, verification done by hand.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mt-4">
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
            Sometime in summer 2024 I watched a corn farmer in Iowa spend four nights calling around
            trying to find someone with a real FAA Part 137 to put VT/R1 fungicide on 800 acres before
            the canopy got too tall for the ground rig. He called four operators. Two never returned
            the call. One had let his Part 137 lapse two years earlier and didn&apos;t know it. One
            showed up. The job got done. But the missed window cost him somewhere around four bushels
            per acre.
          </p>
          <p>
            The information was always out there. Just scattered across fifteen different places. The
            FAA&apos;s FOIA-released Part 137 list. State pesticide applicator registries that
            don&apos;t talk to each other. Operator websites that load in 12 seconds on a phone.
            Facebook groups where the same five questions repeat every week.
          </p>
          <p>
            This site is the consolidation work. Verified operators, public, free for any farmer to
            use. Operators who want a featured slot can pay for one. Base listings stay free.
            Verification isn&apos;t tied to payment. If that ever changes, I&apos;ll say so on this
            page first.
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

      {/* 5. How we make money */}
      <section className="mb-10" aria-labelledby="how-we-make-money">
        <h2 id="how-we-make-money" className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" /> How we make money
        </h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>I&apos;ll be direct because farmers ask.</p>
          <p>
            Three revenue streams keep this running. Featured listings at $99 to $499 per year,
            state-locked. Sponsored placements from US ag drone manufacturers (Hylio, Talos, Revolution
            Drones at the moment). Affiliate commissions on Part 107 training, mainly through Pilot
            Institute. Base listings are free for any verified operator and that isn&apos;t changing.
            Featured status doesn&apos;t affect verification, and it doesn&apos;t move anyone up in the
            regular state listings. The quote-form data stays on our servers. I won&apos;t sell those
            names or contact details. Ever.
          </p>
          <p className="text-xs text-gray-500 pt-1">
            Detail in the{' '}
            <Link href="/affiliate-disclosure" className="text-green-700 hover:underline">affiliate disclosure</Link>,{' '}
            the <Link href="/advertise" className="text-green-700 hover:underline">advertising page</Link>{' '}
            and the <Link href="/privacy" className="text-green-700 hover:underline">privacy policy</Link>.
          </p>
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

      {/* 9. Contact — email only on visible page. Mailing address lives in
          organizationSchema() (JSON-LD) so AdSense and Google's Knowledge
          Graph can read it, but it's not exposed in the rendered body. */}
      <section className="mb-10" aria-labelledby="contact">
        <h2 id="contact" className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Reach me at{' '}
          <MailtoLink email={AUTHOR.publicEmail} className="text-green-700 hover:underline font-medium">
            {AUTHOR.publicEmail}
          </MailtoLink>
          . I read every message and reply within 48 hours, faster during spray season (June through
          October).
        </p>
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
