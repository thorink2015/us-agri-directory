import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import AcreageConverter from './HectareCalculator';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'How many acres is a hectare?',
    answer:
      'One hectare equals 2.471 acres. To convert hectares to acres, multiply by 2.471. To convert acres to hectares, multiply by 0.4047.',
  },
  {
    question: 'How big is a quarter section?',
    answer:
      'A quarter section is 160 acres (one quarter of a 640-acre section). This is the standard homestead unit from the Homestead Act of 1862. Many Midwest farm fields are still sized in quarter-section increments.',
  },
  {
    question: 'How many acres can a drone spray per hour?',
    answer:
      'A DJI Agras T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre. Use the Coverage Time Estimator for a detailed estimate for your specific field and drone model.',
  },
];

export const metadata: Metadata = {
  title: 'Acreage Converter: Acres, Hectares, Sq Ft, Sections',
  description:
    'Convert between acres, hectares, square feet, square meters and sections instantly. Built for farmers and ag professionals working with field measurements.',
  alternates: { canonical: '/tools/acreage-converter' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Farm Acreage Converter, Acres, Hectares, Sq Ft & Sections',
    description: '1 acre = 0.4047 hectares = 43,560 sq ft. Instant conversion for all common US and international agricultural land measurements.',
    url: `${SITE.domain}/tools/acreage-converter`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Farm Acreage Converter',
      },
    ],
  },
};

export default function AcreageConverterPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Farm Acreage Converter',
    applicationCategory: 'Agriculture',
    operatingSystem: 'Web',
    description:
      'Convert between acres, hectares, square feet, square meters and sections. Instant conversion using USGS and NIST standard factors.',
    url: `${SITE.domain}/tools/acreage-converter`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Farm Acreage Converter: Acres, Hectares, Square Feet, Sections',
    description:
      'One acre equals 0.4047 hectares, 43,560 square feet or 4,047 square meters. A standard section is 640 acres. Instant conversion for all US agricultural land measurements.',
    url: `${SITE.domain}/tools/acreage-converter`,
    mainEntityOfPage: `${SITE.domain}/tools/acreage-converter`,
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
      { '@type': 'ListItem', position: 3, name: 'Acreage Converter', item: `${SITE.domain}/tools/acreage-converter` },
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
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Acreage Converter' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Farm Acreage Converter
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            One acre equals 0.4047 hectares, 43,560 square feet or 4,047 square meters. A standard section is 640 acres. This converter handles all common agricultural land measurements used in US and international farming, including acres, hectares, square feet, square meters and sections.
          </p>
        </div>

        {/* Calculator */}
        <AcreageConverter />

        {/* How this works */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">How this works</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            All conversions use standard USGS and NIST factors. One acre was historically defined as the amount of land a yoke of oxen could plow in one day. The international acre used in the US equals exactly 4,046.8564224 square meters, the value used in this converter.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Sections (640 acres, or one square mile) are the standard survey unit from the US Public Land Survey System used across the Midwest and West. A quarter section (160 acres) is the standard homestead size from the Homestead Act of 1862 and remains the benchmark field size used by USDA reporting, crop insurance and custom hire rate surveys including the Iowa State Extension Custom Rate Survey.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/tools/coverage-calculator" className="text-green-700 text-sm font-medium hover:underline">
              Estimate spray time for your acreage →
            </Link>
            <Link href="/tools/spray-cost-calculator" className="text-green-700 text-sm font-medium hover:underline">
              Calculate spray cost per acre →
            </Link>
          </div>
        </section>

        {/* Reference table */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Common equivalents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Acres</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Hectares</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Sq Feet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { label: '1 acre', acres: '1', ha: '0.4047', sqft: '43,560' },
                  { label: '1 hectare', acres: '2.471', ha: '1', sqft: '107,639' },
                  { label: 'Quarter section', acres: '160', ha: '64.75', sqft: '6,969,600' },
                  { label: '1 section', acres: '640', ha: '259.0', sqft: '27,878,400' },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.label}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.acres}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.ha}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.sqft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acreage conversion questions</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Related tools */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/coverage-calculator', label: 'Coverage Time Estimator', desc: 'How long to spray your acres?' },
              { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', desc: 'Per-acre cost by crop and state' },
              { href: '/tools/roi-calculator', label: 'Buy vs. Hire ROI Calculator', desc: 'Find your break-even acreage' },
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
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/crops/corn" className="text-green-700 hover:underline">Corn field sizes and rates</Link>
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
