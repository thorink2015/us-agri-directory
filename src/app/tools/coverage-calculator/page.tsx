import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import CoverageCalculator from './CoverageCalculator';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'Why does field shape affect spray time?',
    answer:
      'Irregular and narrow fields require more turns, slower flight lines, and more overlap at edges. A square 160-acre field sprays 15 to 25 percent faster than the same acreage in an L-shaped or strip configuration.',
  },
  {
    question: 'How many batteries do I need to spray all day?',
    answer:
      'For a T50 running 8 hours, plan on 4 to 6 batteries rotating through the charger. With the DJI rapid charging hub, 4 batteries keep a single drone running continuously. Hylio AG-272 longer charge times (28 min) mean you need 6 to 8 batteries for continuous operation.',
  },
  {
    question: 'Does adding a second drone really cut time in half?',
    answer:
      'Close to it, yes. A 2-drone crew shares the same water and chemical supply station, so refill logistics run in parallel. Actual improvement is roughly 1.8x to 1.9x (not a perfect 2x) because of shared logistics bottlenecks.',
  },
];

export const metadata: Metadata = {
  title: 'Drone Coverage Time Calculator: Spray Job Estimator',
  description:
    'How long to drone-spray your fields? Enter acres, drone model, and application rate. Includes battery swaps, refills, and single-day feasibility.',
  alternates: { canonical: '/tools/coverage-calculator' },
  openGraph: {
    type: 'website',
    title: 'How Long Will It Take to Spray Your Fields?',
    description: 'Estimate drone spray job time including tank refills, battery swaps, and field shape adjustments for 7 drone models.',
    url: `${SITE.domain}/tools/coverage-calculator`,
  },
};

export default function CoverageCalculatorPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Drone Coverage Time Estimator',
    applicationCategory: 'Agriculture',
    operatingSystem: 'Web',
    description:
      'Estimate drone spray job duration by acreage, drone model, application rate, field shape, and fleet size. Includes battery swaps, tank refills, and single-day feasibility.',
    url: `${SITE.domain}/tools/coverage-calculator`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Long Will It Take to Spray Your Fields by Drone? (2026)',
    description:
      'A DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre, treating 300 to 600 acres per day. Calculator estimates total spray time for 7 drone models.',
    url: `${SITE.domain}/tools/coverage-calculator`,
    mainEntityOfPage: `${SITE.domain}/tools/coverage-calculator`,
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
      { '@type': 'ListItem', position: 3, name: 'Coverage Time Calculator', item: `${SITE.domain}/tools/coverage-calculator` },
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
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Coverage Time Estimator' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          How Long Will It Take to Spray Your Fields?
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            A single DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre, treating 300 to 600 acres per day. This calculator estimates total spray time including tank refills, battery swaps, and field shape adjustments for 7 drone models.
          </p>
        </div>

        {/* Calculator */}
        <CoverageCalculator />

        {/* How it works */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">How this works</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Coverage rates are based on manufacturer specifications adjusted for real-world efficiency using field shape turn penalties: 5% for rectangular fields, 12% for irregular or L-shaped, and 20% for narrow strips or pivot corners. Battery times and refill windows reflect experienced operators with a two-person ground crew. Solo operators add 15 to 25% to total job time.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Conditions not in the calculator also affect job time. Winds above 10 mph require slower speeds and tighter spray parameters, reducing effective coverage by 15 to 30%. High temperatures (above 90°F) reduce battery life by 10 to 20%. Early morning starts (5:30 to 7:00 AM) improve both battery performance and spray efficacy.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/tools/drone-comparison" className="text-green-700 text-sm font-medium hover:underline">
              Compare drone specs side by side →
            </Link>
            <Link href="/tools/spray-cost-calculator" className="text-green-700 text-sm font-medium hover:underline">
              Estimate spray cost per acre →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Coverage time questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Related tools */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', desc: 'Per-acre cost by crop and state' },
              { href: '/tools/roi-calculator', label: 'Buy vs. Hire ROI Calculator', desc: 'Find your break-even acreage' },
              { href: '/tools/drone-comparison', label: 'Drone Comparison Tool', desc: 'T50 vs T100 vs AG-272 specs' },
              { href: '/tools/treatment-calendar', label: 'Treatment Calendar', desc: 'When to book by crop and state' },
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
          <Link href="/drones/dji-agras-t100" className="text-green-700 hover:underline">DJI Agras T100</Link>
          <Link href="/drones/hylio-ag-272" className="text-green-700 hover:underline">Hylio AG-272</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
