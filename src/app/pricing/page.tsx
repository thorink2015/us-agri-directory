import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Info } from 'lucide-react';
import { pricingFAQs } from '@/data/faqs';
import { getFeaturedOperators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import OperatorCard from '@/components/operators/OperatorCard';

export const metadata: Metadata = {
  title: 'How Much Does Drone Spraying Cost? | Agricultural Drone Pricing Guide 2026',
  description:
    'Drone spraying rates in the US: $12–$18/acre for field crops, $20–$35/acre for specialty crops and orchards. Complete pricing guide with tables, factors, and ROI calculator.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Ag Drone Spraying Prices 2026 | $12–$35/acre | US Ag Drone Directory',
    description: 'How much does drone spraying cost? Complete tables by crop, field size, and service type — all in USD per acre.',
    url: 'https://agdronedirectory.com/pricing',
  },
};

const pricingData = [
  { crop: 'Corn', min: 12, med: 15, max: 18, note: 'Season: Jun–Aug' },
  { crop: 'Soybeans', min: 12, med: 15, max: 18, note: 'Season: Jul–Sep' },
  { crop: 'Wheat', min: 12, med: 14, max: 18, note: 'Season: Mar–Jun' },
  { crop: 'Cotton', min: 14, med: 16, max: 20, note: 'Season: Jun–Sep' },
  { crop: 'Rice', min: 14, med: 16, max: 20, note: 'Season: Jul–Sep' },
  { crop: 'Grapes / Vineyards', min: 20, med: 27, max: 35, note: 'Season: Apr–Sep' },
  { crop: 'Orchards (tree fruit)', min: 20, med: 27, max: 35, note: 'Season: Mar–Aug' },
  { crop: 'Cover crops (seeding)', min: 10, med: 13, max: 18, note: 'Season: Aug–Oct' },
];

const factors = [
  { factor: 'Total acreage', impact: 'Fields over 500 acres often receive 10–20% volume discounts', icon: '📐' },
  { factor: 'Crop type', impact: 'Specialty crops (orchards, vineyards) cost 50–100% more than row crops', icon: '🌿' },
  { factor: 'Distance from operator base', impact: 'Locations over 50 miles may add a mobilization surcharge', icon: '🗺️' },
  { factor: 'Product type', impact: 'Viscous or corrosive products may affect rates', icon: '🧪' },
  { factor: 'Field terrain', impact: 'Obstacles, slopes, or small irregular fields increase cost', icon: '⛰️' },
  { factor: 'Peak season', impact: 'High-demand windows (May, July) may have limited availability', icon: '📅' },
];

export default function PricingPage() {
  const featured = getFeaturedOperators().slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pricingFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'Drone Spraying Prices', item: 'https://agdronedirectory.com/pricing' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Drone Spraying Prices' }]} />

        {/* Hero answer capsule */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            How much does agricultural drone spraying cost in the US?
          </h1>
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-xl">
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>The national average for drone spraying is $12–$18 per acre for field crops</strong> (corn, soybeans, wheat) with the farmer supplying the chemical product. Specialty crops like vineyards and orchards typically run $20–$35/acre due to the canopy complexity.
            </p>
          </div>
        </div>

        {/* Pricing table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Drone spraying rates 2026 by crop type</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Crop</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Low</th>
                  <th className="text-center px-4 py-3 font-semibold text-green-800 bg-green-100">Average</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">High</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Season</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pricingData.map((row) => (
                  <tr key={row.crop} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{row.crop}</td>
                    <td className="px-4 py-3 text-center text-gray-600">${row.min}/acre</td>
                    <td className="px-4 py-3 text-center font-bold text-green-700 bg-green-50">${row.med}/acre</td>
                    <td className="px-4 py-3 text-center text-gray-600">${row.max}/acre</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Rates are application-only. Chemical product is typically supplied by the farmer. Contact operators for exact quotes.
          </p>
        </div>

        {/* Factors */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Factors that affect drone spraying prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {factors.map((f) => (
              <div key={f.factor} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{f.factor}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{f.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm-size tiered pricing */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Drone spraying rates by farm size</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { segment: 'Small farm', size: 'under 100 acres', price: '$15–$18/acre', note: 'Fragmented fields, minimum call-out fees may apply' },
              { segment: 'Mid-size farm', size: '100–500 acres', price: '$12–$16/acre', note: 'Standard market rate' },
              { segment: 'Large farm', size: '500–2,000 acres', price: '$10–$14/acre', note: 'Volume discount, seasonal contract' },
              { segment: 'Commercial scale', size: '2,000+ acres', price: '$8–$12/acre', note: 'Annual contract, scheduling priority' },
            ].map((row) => (
              <div key={row.segment} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{row.segment}</span>
                  <span className="text-gray-500 ml-2">({row.size})</span>
                </div>
                <div className="font-bold text-green-700 text-right">{row.price}</div>
                <div className="text-xs text-gray-400 hidden sm:block w-48 text-right">{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI section */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-3">Is hiring a drone operator worth it? Quick ROI check</h2>
          <p className="text-sm text-gray-700 mb-4">
            For a 1,000-acre corn farm with 3 applications per season at $15/acre: total annual cost is <strong>$45,000</strong>. Compared to a pull-behind ground sprayer, drone application eliminates soil compaction losses estimated at 3–5% of yield — worth roughly $15,000–$25,000 per season on corn at current prices. Most growers recoup the cost difference within the first year.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: 'Water savings', value: '90%', sub: 'ULV vs. traditional sprayer' },
              { label: 'Yield improvement', value: '+3–5%', sub: 'no soil compaction' },
              { label: 'Typical payback', value: '1 season', sub: 'vs. compaction losses' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-3 border border-green-100">
                <div className="font-bold text-green-700 text-xl">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Estimates based on industry benchmarks. Actual results vary by crop, field conditions, and season.
          </p>
        </div>

        {/* Comparison: drone vs airplane vs ground */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Drone vs. aerial applicator vs. ground equipment</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Criterion</th>
                  <th className="text-center px-3 py-3 font-semibold text-green-800 bg-green-50">Ag drone</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-700">Fixed-wing airplane</th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-700">Ground sprayer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Avg. rate/acre (service)', '$12–$18', '$8–$14', '$5–$10'],
                  ['Water volume', '2–5 gal/ac', '5–15 gal/ac', '15–30 gal/ac'],
                  ['Soil compaction', '✅ Zero', '✅ Zero', '❌ 3–5% yield loss'],
                  ['Minimum field size', 'Any', '> 50 acres', 'Any'],
                  ['Wet field operation', '✅ Yes', '✅ Yes', '❌ No (rutting)'],
                  ['GPS precision', '> 95%', '85–90%', '> 98%'],
                  ['Vineyards / orchards', '✅ Yes', '❌ No', '❌ Difficult'],
                  ['Tall crops (corn)', '✅ Yes', '✅ Yes', '❌ No'],
                  ['Scheduling lead time', '1–3 days', '1–2 weeks', 'Immediate (if owned)'],
                ].map(([criterion, drone, airplane, ground]) => (
                  <tr key={criterion} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-medium text-sm">{criterion}</td>
                    <td className="px-3 py-3 text-center text-green-700 bg-green-50/50 font-medium">{drone}</td>
                    <td className="px-3 py-3 text-center text-gray-600">{airplane}</td>
                    <td className="px-3 py-3 text-center text-gray-600">{ground}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">FAQ: drone spraying prices</h2>
          <FAQAccordion faqs={pricingFAQs} />
        </div>

        {/* Featured operators */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Get a quote from verified operators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/operators" className="text-green-700 font-medium text-sm hover:underline">
              View all operators →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
