import { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MailtoLink from '@/components/ui/MailtoLink';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { blogPosts } from '@/data/blog-posts';
import { AUTHOR, SITE } from '@/data/author';

const TOOL_COUNT = 6;

export const metadata: Metadata = {
  title: `Advertise on the ${SITE.name}`,
  description:
    `Advertising for DJI and Hylio dealers, ag insurers, Part 107 trainers and equipment makers. Reach farmers and ${operators.length}+ verified ag drone operators in all 50 states.`,
  alternates: { canonical: '/advertise' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `Advertise on the ${SITE.name}`,
    description:
      `Sponsored listings, newsletter placements and category sponsorships reaching US farmers and ${operators.length}+ verified ag drone operators.`,
    url: `${SITE.domain}/advertise`,
    siteName: SITE.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `Advertise on the ${SITE.name}`,
      },
    ],
  },
};

export default function AdvertisePage() {
  const operatorCount = operators.length;
  const stateCount = counties.length;
  const cropCount = crops.length;
  const guideCount = blogPosts.length;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Advertise', item: `${SITE.domain}/advertise` },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Advertise on the ${SITE.name}`,
    url: `${SITE.domain}/advertise`,
    description: `Advertising options on ${SITE.name}: sponsored operator listings, newsletter placements, display inventory on tool and pricing pages, and category sponsorships reaching US farmers and ${operatorCount}+ verified ag drone operators across all ${stateCount} states.`,
    isPartOf: { '@id': `${SITE.domain}/#organization` },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ label: 'Advertise' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Advertise on the {SITE.name}</h1>

      {/* AEO block */}
      <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-10">
        <p className="text-sm text-gray-700 leading-relaxed">
          The {SITE.name} reaches US farmers researching drone services and {operatorCount}+ verified
          operators running Part 107 and Part 137 businesses in all {stateCount} states. Advertising options
          include sponsored operator listings, newsletter placements, display inventory on the pricing and
          tool pages, and category sponsorships on individual state or crop sections. Email{' '}
          <MailtoLink email={AUTHOR.publicEmail} className="text-green-700 hover:underline">
            {AUTHOR.publicEmail}
          </MailtoLink>{' '}
          for current availability and rates.
        </p>
      </div>

      {/* Section 1: Audience */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who visits this site</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The directory currently lists {operatorCount}+ verified ag drone operators across all
            {' '}{stateCount} US states. Every operator is checked against the FAA Airmen database for Part 107,
            Part 137 status and state pesticide applicator records before publishing. Visitors arrive through
            search queries for drone spraying costs, operators in a specific state or county, FAA regulations,
            and specific drone models.
          </p>
          <p>
            Three distinct audiences use the site. Farmers researching whether to hire a drone operator for
            fungicide, cover crop seeding or defoliation work, usually with a specific field and a booking
            window in mind. Working drone operators benchmarking rates, comparing airframes, and looking at
            how competitors in neighbouring counties present themselves. Equipment buyers: operators expanding
            a fleet, dealers tracking what models are in use, and growers scoping out a first drone purchase
            through{' '}
            <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">
              the buy versus hire calculator
            </Link>.
          </p>
          <p>
            Beyond the operator listings, the site runs {TOOL_COUNT} interactive tools (spray cost, buy versus
            hire ROI, coverage time, acreage converter,{' '}
            <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">drone comparison</Link>
            {' '}and treatment calendar), a regulations hub covering FAA Part 107 and Part 137 plus EPA FIFRA
            labelling, {guideCount} long-form guides, a{' '}
            <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
            {' '}anchored to the Iowa State Custom Rate Survey ($12.50/acre benchmark) and {cropCount} crop
            hubs covering corn, soybeans, wheat, cotton, rice, orchards, vineyards, cover crops and specialty
            production. This is a decision-stage audience. People reading a crop hub or pulling numbers out of
            the ROI calculator are close to a purchase, not browsing.
          </p>
        </div>
      </section>

      {/* Section 2: Options */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What you can advertise</h2>
        <div className="space-y-5 text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Sponsored operator listing</h3>
            <p>
              Priority placement at the top of{' '}
              <Link href="/states" className="text-green-700 hover:underline">state</Link>,{' '}
              <Link href="/crops" className="text-green-700 hover:underline">crop</Link>{' '}
              and service result pages, with a distinct sponsored label. Sponsored slots are rotated and capped
              so results remain useful; we will not stack paid listings above the entire organic set. Available
              to currently listed operators who already meet the verification standard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Newsletter sponsorship</h3>
            <p>
              A short sponsored block in the monthly farmer and operator newsletter, between the editorial
              sections. One sponsor per send, clearly marked. Good fit for new drone model launches, training
              cohort enrolment windows, or insurance and financing offers tied to a season.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Display placements on high-traffic pages</h3>
            <p>
              In-content placements on the{' '}
              <Link href="/pricing" className="text-green-700 hover:underline">pricing guide</Link>,
              state hubs, the{' '}
              <Link href="/tools" className="text-green-700 hover:underline">tools</Link>
              {' '}directory and individual calculators. The pricing and tool pages are the highest-intent real
              estate on the site: readers are on them because they are actively pricing work or sizing a
              purchase.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Category sponsorship</h3>
            <p>
              Exclusive branding on an individual state or crop section, covering the state hub, operator
              results within that state, and the service pages nested under it. Sold per state or per crop,
              one sponsor at a time, for a defined season or year.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Custom packages</h3>
            <p>
              For drone manufacturers, dealers, insurance providers and training companies that need a
              combined presence across listings, newsletter and display. This is where most conversations end
              up: DJI and Hylio dealers looking for lead flow on the T50, T100 and AG-272, ag insurance
              brokers wanting per-state targeting, Part 107 training providers advertising exam-prep courses,
              trailer and battery-generator manufacturers selling ground-support kit, and chemical and
              adjuvant suppliers targeting drone-specific carrier volumes.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Get started */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get started</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Email{' '}
          <MailtoLink email={AUTHOR.publicEmail} className="text-green-700 hover:underline">
            {AUTHOR.publicEmail}
          </MailtoLink>
          {' '}with the audience you want to reach (state, crop, service or operator segment) and the window
          you are planning for. We will send back current inventory, rates and whatever we already have booked
          against that slot.
        </p>
        <div className="flex flex-wrap gap-3">
          <MailtoLink
            email={AUTHOR.publicEmail}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" /> {AUTHOR.publicEmail}
          </MailtoLink>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors text-sm"
          >
            Use the contact form
          </Link>
        </div>
      </section>
    </div>
  );
}
