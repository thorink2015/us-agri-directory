import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import PriceCalculator from './PriceCalculator';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'How accurate is this calculator?',
    answer:
      'It uses 2026 university extension benchmarks and regional operator data. Actual quotes vary by field layout, distance from operator base, field accessibility and time of season. Use this as a starting range, then contact operators for firm quotes.',
  },
  {
    question: 'Does this include the cost of the chemical product?',
    answer:
      'By default, no. Toggle "Operator supplies chemical" to add an estimated chemical cost. Most farmers supply their own product and pay the operator for application only.',
  },
  {
    question: 'Why does California cost so much more than Iowa?',
    answer:
      'Terrain complexity (steep vineyard slopes, dense orchard canopy), CDPR regulatory overhead and 8 to 12 spray passes per season versus 1 to 2 for Midwest row crops.',
  },
];

export const metadata: Metadata = {
  title: 'Drone Spraying Cost Calculator: 2026 Rates',
  description:
    'Estimate your drone spraying cost per acre. Enter acres, crop and state for a 2026 rate estimate based on Iowa State Extension and regional operator data.',
  alternates: { canonical: '/tools/spray-cost-calculator' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'How Much Will Drone Spraying Cost on Your Farm?',
    description: 'Instant estimate by crop, state and number of passes. Based on 2026 Iowa State Extension data.',
    url: `${SITE.domain}/tools/spray-cost-calculator`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Drone Spraying Cost Calculator',
      },
    ],
  },
};

export default function SprayCostPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Will Drone Spraying Cost on Your Farm? (2026)',
    description:
      'Drone crop spraying costs $12 to $35 per acre in 2026. Calculator uses Iowa State Custom Rate Survey and regional operator data.',
    url: `${SITE.domain}/tools/spray-cost-calculator`,
    mainEntityOfPage: `${SITE.domain}/tools/spray-cost-calculator`,
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
      { '@type': 'ListItem', position: 3, name: 'Spray Cost Calculator', item: `${SITE.domain}/tools/spray-cost-calculator` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Spray Cost Calculator' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          How Much Will Drone Spraying Cost on Your Farm?
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Drone crop spraying costs $12 to $35 per acre in 2026 depending on crop, region and terrain. This calculator uses the 2026 Iowa State Custom Rate Survey benchmark of $12.50 per acre average plus regional and crop-specific adjustments from university extension data. Enter your acres, crop and state for an instant estimate.
          </p>
        </div>

        {/* Calculator */}
        <PriceCalculator />

        {/* How we calculated this */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">How we calculated this</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Rates are based on the 2026 Iowa State Custom Rate Survey ($12.50/acre average, $8 to $16 range) with crop-specific adjustments from University of Missouri Extension G1274, Indiana Prairie Farmer operator data and regional pricing analysis. The Corn Belt (IA, IL, IN, OH, MO, MI, WI, MN) is the baseline market, the most competitive with the highest operator density. Regional multipliers (0.95× for Great Plains, 1.4× for California) reflect differences in operator supply, terrain complexity, field size and regulatory overhead.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Vineyard and orchard rates reflect UC Davis and Washington State University extension data on specialty crop application requirements. The chemical cost estimates when &ldquo;Operator supplies&rdquo; is selected are midpoints from commodity pricing ranges by product category. Calculator provides estimates only, contact operators directly for actual quotes.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/pricing" className="text-green-700 text-sm font-medium hover:underline">
              See the full 2026 pricing guide →
            </Link>
            <Link href="/operators" className="text-green-700 text-sm font-medium hover:underline">
              Find operators in your state →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing calculator questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Related tools */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/roi-calculator', label: 'Buy vs. Hire ROI Calculator', desc: 'Find your break-even acreage' },
              { href: '/tools/coverage-calculator', label: 'Coverage Time Estimator', desc: 'How long will your spray job take?' },
              { href: '/tools/drone-comparison', label: 'Drone Comparison Tool', desc: 'T50 vs AG-272 vs T100 side by side' },
              { href: '/tools/treatment-calendar', label: 'Treatment Calendar', desc: 'When to book for your crop and state' },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-900">{t.label}</span>
                <span className="text-xs text-gray-500 mt-0.5">{t.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/crops/corn" className="text-green-700 hover:underline">Corn spraying guide</Link>
          <Link href="/crops/soybeans" className="text-green-700 hover:underline">Soybean spraying guide</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/drones/dji-agras-t50" className="text-green-700 hover:underline">DJI Agras T50 specs</Link>
          <Link href="/states" className="text-green-700 hover:underline">Operators by state</Link>
          <Link href="/list-your-business" className="text-green-700 hover:underline">List your business</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
