import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import ROICalculator from './ROICalculator';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'What is the real break-even for owning a spray drone?',
    answer:
      'University of Missouri Extension puts it at roughly 980 acres per year at a $16/acre custom hire rate with no EQIP cost-share. With 50% EQIP cost-share, break-even drops to approximately 600 acres. Below 500 acres per year, hiring is almost always cheaper.',
  },
  {
    question: 'Does this calculator include chemical costs?',
    answer:
      'No. Chemical cost is the same whether you own or hire, so it cancels out. This compares only the application cost: owning your equipment versus paying someone else to apply.',
  },
  {
    question: 'Should I buy a T50 or a T25 to start?',
    answer:
      'If you will spray over 1,000 acres per year, the T50 daily throughput advantage pays for itself. Under 800 acres, the T25 saves $5,000 to $8,000 upfront with identical spray quality.',
  },
];

export const metadata: Metadata = {
  title: 'Buy vs Hire a Spray Drone: ROI Calculator',
  description:
    'Compare owning a spray drone versus hiring a custom operator. Includes USDA EQIP cost-share, financing and break-even acreage from MU Extension data.',
  alternates: { canonical: '/tools/roi-calculator' },
  openGraph: {
    type: 'website',
    title: 'Buy a Drone or Hire an Operator? Find Your Break-Even',
    description: 'MU Extension break-even at ~980 acres/year. EQIP cost-share can lower it to 600 acres. Model your specific situation.',
    url: `${SITE.domain}/tools/roi-calculator`,
  },
};

export default function ROICalculatorPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ag Drone Buy vs. Hire ROI Calculator',
    applicationCategory: 'Agriculture',
    operatingSystem: 'Web',
    description:
      'Calculate break-even and annual ROI for buying an agricultural spray drone versus hiring an operator. Models USDA EQIP cost-share, financing and variable acreage.',
    url: `${SITE.domain}/tools/roi-calculator`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Buy a Drone or Hire an Operator? Find Your Break-Even Acreage',
    description:
      'University of Missouri Extension break-even for spray drone ownership is ~980 acres/year. USDA EQIP cost-share of 40-90% can shift break-even below 600 acres.',
    url: `${SITE.domain}/tools/roi-calculator`,
    mainEntityOfPage: `${SITE.domain}/tools/roi-calculator`,
    datePublished: '2026-01-01',
    dateModified: LAST_REVIEWED,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.domain}/tools` },
      { '@type': 'ListItem', position: 3, name: 'ROI Calculator', item: `${SITE.domain}/tools/roi-calculator` },
    ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'ROI Calculator' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Buy a Drone or Hire an Operator? Find Your Break-Even
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            University of Missouri Extension research puts the break-even for DJI Agras T50 ownership at approximately 980 acres per year of custom application work. Farmer ownership cost drops to $7.39 per acre at 4,000 acres per year. USDA EQIP cost-share of 40 to 90 percent on qualifying purchases can shift break-even below 600 acres. This calculator models your specific situation.
          </p>
        </div>

        {/* Calculator */}
        <ROICalculator />

        {/* How it works */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">How the calculation works</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The calculator compares two annual cash flows: (1) what you currently pay operators to spray your fields, plus any revenue you could earn spraying for neighbors, minus (2) the full annual cost of owning and operating a spray drone. University of Missouri Extension G1274 provides the primary ownership cost framework, with annual operating costs modeled at $0.50/acre for battery wear, calibration and consumables plus fixed costs for insurance ($1,200/year) and certifications ($400/year).
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            USDA EQIP Practice Code 595 (Precision Land Management) can cover 40 to 90 percent of drone purchase cost for eligible farmers, dramatically changing the break-even threshold. Funded operators report effective purchase costs as low as $4,000 to $8,000 for a T50-class drone after EQIP payments. Contact your local NRCS office to check current payment rates for your state.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            The break-even acreage cited in MU Extension G1274 assumes $16/acre custom hire rate, a $20,000 drone (T50-class), 3-year financing at 7% APR and no EQIP cost-share. At the 2026 hire rate compression to $12 to $14/acre, break-even shifts upward toward 1,100 to 1,300 acres unless offset by EQIP.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/pricing" className="text-green-700 text-sm font-medium hover:underline">
              See 2026 custom hire rates →
            </Link>
            <Link href="/drones/dji-agras-t50" className="text-green-700 text-sm font-medium hover:underline">
              DJI Agras T50 specs and pricing →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Buy vs. hire questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Related tools */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', desc: 'Estimate per-acre cost by crop and state' },
              { href: '/tools/coverage-calculator', label: 'Coverage Time Estimator', desc: 'How long to spray your fields?' },
              { href: '/tools/drone-comparison', label: 'Drone Comparison Tool', desc: 'T50 vs AG-272 vs T100 specs' },
              { href: '/tools/acreage-converter', label: 'Acreage Converter', desc: 'Acres, hectares, square feet' },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-900">{t.label}</span>
                <span className="text-xs text-gray-500 mt-0.5">{t.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/drones/dji-agras-t50" className="text-green-700 hover:underline">DJI Agras T50</Link>
          <Link href="/drones/hylio-ag-272" className="text-green-700 hover:underline">Hylio AG-272</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
          <Link href="/list-your-business" className="text-green-700 hover:underline">List your business</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
