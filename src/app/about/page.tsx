import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ExternalLink, AlertTriangle, BookOpen, Users, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { operators } from '@/data/operators';
import { AUTHOR, SITE, personSchema, organizationSchema } from '@/data/author';

const FAQS = [
  {
    question: 'Is this directory really free for operators?',
    answer:
      'Yes. Listing is free. No commission, no booking fee. We may offer optional premium features (featured placement) in the future but basic listings will always be free, permanently.',
  },
  {
    question: 'How do you make money?',
    answer:
      'Currently, the directory is not monetized. Future revenue may include premium operator listings, manufacturer partnerships, and educational resources. The directory will never charge farmers for access or take commissions on jobs.',
  },
  {
    question: 'How often is information updated?',
    answer:
      'Pricing data is reviewed quarterly, regulatory data is updated when rules change, and operator listings are continuously refreshed as new operators apply and existing ones update their information. Every content page displays a "last reviewed" date.',
  },
];

export const metadata: Metadata = {
  title: `About ${SITE.name} | Founded and Edited by ${AUTHOR.firstName}`,
  description:
    `${SITE.name} is a single-author directory founded and edited by ${AUTHOR.firstName}. Every page is personally researched to connect US farmers with verified agricultural drone operators across all 50 states.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${SITE.name}`,
    description: `Founded and edited by ${AUTHOR.firstName}. Every page personally researched and updated.`,
    url: `${SITE.domain}/about`,
  },
};

export default function AboutPage() {
  const verifiedCount = operators.filter((op) => op.verified).length;
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

      {/* 1. H1 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About {SITE.name}</h1>

      {/* 2. AEO block, what the site is, who runs it, why it exists (contains a number) */}
      <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
        <p className="text-sm text-gray-700 leading-relaxed">
          {SITE.name} is a single-author directory of {operators.length}+ agricultural drone operators
          across all 50 US states, founded and personally edited by {AUTHOR.firstName}. Every listing
          is independently reviewed against FAA Part 107 and Part 137 records, and every regulatory or
          pricing page on this site cites primary sources from the FAA, EPA, USDA, or land-grant
          university extension. The directory exists to give US farmers one trusted place to find
          verified ag drone operators, regulations, and pricing, without middlemen, commissions, or paywalls.
        </p>
      </div>

      {/* 3. Why this directory exists */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why this directory exists</h2>
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
            place to find verified operators, compare pricing, and understand the FAA, EPA, and state
            regulations that govern every application.
          </p>
          <p>
            This site is free for operators to list, free for farmers to use, and will remain that way.
            It is not a lead-generation marketplace, not an affiliate network, and not a software
            vendor. It is a directory, researched, verified, and maintained by one person who cares
            about getting the facts right.
          </p>
        </div>
      </section>

      {/* 4. Who runs this site */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-green-600" /> Who runs this site
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-xl font-bold text-gray-900">{AUTHOR.fullName}</div>
          <div className="text-sm text-green-700 font-medium mb-3">{AUTHOR.jobTitle}</div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{AUTHOR.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm">
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
            <a
              href={`mailto:${AUTHOR.publicEmail}`}
              className="inline-flex items-center gap-1.5 text-green-700 hover:underline"
            >
              <Mail className="w-4 h-4" /> {AUTHOR.publicEmail}
            </a>
          </div>
        </div>
      </section>

      {/* 5. How we research */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" /> How we research
        </h2>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Primary sources only.</strong> Every regulatory fact on this site, FAA Part 107 and
              Part 137 requirements, EPA FIFRA labeling, state pesticide licensing, USDA program rules
              cites its primary source directly. No secondary aggregators, no unverified forum posts.
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Operator verification.</strong> Each listed operator is reviewed against the public
              FAA Airmen database for Part 107 Remote Pilot Certificate, against publicly searchable state
              pesticide applicator records where available, and by direct contact. Operators displaying the
              verified badge have completed this review. {verifiedCount} operators are currently verified.
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Pricing data.</strong> Per-acre rate ranges are compiled from operator surveys, public
              quotes, USDA cost-of-production data, and direct interviews. Rates are reviewed each spray
              season (spring and fall) and updated to reflect current market conditions.
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Last-reviewed dates.</strong> Every content page displays the date it was last
              reviewed. Regulatory pages older than 90 days and pricing pages older than 180 days are
              flagged for refresh before the next season.
            </p>
          </div>
        </div>
      </section>

      {/* 6. What this site is NOT */}
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
                FAA, EPA, and your state Department of Agriculture before operating commercially.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 flex-shrink-0">•</span>
              <span>
                Operator listings are a good-faith review, not a guarantee. Always verify an
                operator&apos;s current certifications, insurance, and references before hiring.
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

      {/* 9. Contact */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Found an error? Know an operator who should be listed? Want to suggest a page? Email me
          directly or use the contact form.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${AUTHOR.publicEmail}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:text-green-700 transition-colors"
          >
            <Mail className="w-4 h-4 text-green-600" /> {AUTHOR.publicEmail}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:text-green-700 transition-colors"
          >
            Contact form
          </Link>
        </div>
      </section>

    </div>
  );
}
