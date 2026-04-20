import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, XCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { drones } from '@/data/drone-model';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'What is the best spray drone for a new commercial operator in 2026?',
    answer:
      'The DJI Agras T50 remains the most popular choice because of its proven dealer network, parts availability and $22,000 to $28,000 price point post-tariff. If you need NDAA compliance, the Hylio AG-272 is the primary US-made alternative at an estimated $55,000 to $75,000.',
  },
  {
    question: 'Is the DJI T100 worth the upgrade over the T50?',
    answer:
      'For operators treating 1,000+ acres per day across large contiguous fields, the T100 reduces daily refill cycles by roughly 60 percent. For smaller or irregular fields, the T50 is more maneuverable and has a much larger dealer network.',
  },
  {
    question: 'What does NDAA compliant mean for drone buyers?',
    answer:
      'The National Defense Authorization Act restricts federal and many state agencies from using drones with components from designated foreign manufacturers (including DJI and XAG). If you do federal, state or university-funded work, you likely need an NDAA-compliant drone. Private farm contracts are not subject to NDAA.',
  },
  {
    question: 'Why is the Hylio AG-272 so much more expensive than DJI?',
    answer:
      'US manufacturing costs, smaller production volume and NDAA-compliant components (SpektreWorks Blue Cube flight controller, US-sourced electronics). The 170 percent tariff on Chinese drones has narrowed this gap significantly in 2026.',
  },
  {
    question: 'Can I mix DJI and Hylio drones in the same fleet?',
    answer:
      'Yes. Many operators run DJI for private farm contracts (lower cost per unit) and Hylio for federal or state-funded work requiring NDAA compliance. The two platforms use different ground stations and software, so pilot training covers both.',
  },
];

export const metadata: Metadata = {
  title: 'Compare Ag Spray Drones: T50 vs AG-272 vs T100',
  description:
    'Compare DJI Agras T50, T100, Hylio AG-272, XAG P100 Pro and Talos T60X specs side by side. Tank size, price, NDAA, wind rating and throughput.',
  alternates: { canonical: '/tools/drone-comparison' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Compare Agricultural Spray Drones Side by Side (2026)',
    description: 'DJI T50 vs Hylio AG-272 vs T100, tank capacity, NDAA status, MSRP, wind rating and best use case compared.',
    url: `${SITE.domain}/tools/drone-comparison`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Compare Agricultural Spray Drones',
      },
    ],
  },
};

export default function DroneComparisonPage() {
  const sorted = [...drones].sort((a, b) => {
    if (a.ndaaCompliant !== b.ndaaCompliant) return a.ndaaCompliant ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Compare Agricultural Spray Drones Side by Side (2026)',
    description:
      'The US ag drone market in 2026 is led by the DJI Agras T50 ($22,000 to $28,000 post-tariff, 40L tank) and the Hylio AG-272 (estimated $55,000 to $75,000, 68L tank, NDAA compliant). Full spec comparison for 7 models.',
    url: `${SITE.domain}/tools/drone-comparison`,
    mainEntityOfPage: `${SITE.domain}/tools/drone-comparison`,
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
      { '@type': 'ListItem', position: 3, name: 'Drone Comparison', item: `${SITE.domain}/tools/drone-comparison` },
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Drone Comparison' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Compare Agricultural Spray Drones Side by Side
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            The US agricultural spray drone market in 2026 is led by the DJI Agras T50 ($22,000 to $28,000 post-tariff, 40L tank, not NDAA compliant) and the Hylio AG-272 (estimated $55,000 to $75,000, 68L tank, NDAA compliant, US-made). This tool compares all major models on tank capacity, price, NDAA status, wind resistance, throughput and best-fit use case.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl mb-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700 whitespace-nowrap">Model</th>
                <th className="text-left p-4 font-semibold text-gray-700">Mfr / Country</th>
                <th className="text-center p-4 font-semibold text-gray-700">NDAA</th>
                <th className="text-right p-4 font-semibold text-gray-700 whitespace-nowrap">Tank (L)</th>
                <th className="text-right p-4 font-semibold text-gray-700 whitespace-nowrap">Max wind</th>
                <th className="text-right p-4 font-semibold text-gray-700 whitespace-nowrap">IP Rating</th>
                <th className="text-left p-4 font-semibold text-gray-700">MSRP</th>
                <th className="text-left p-4 font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((drone) => (
                <tr key={drone.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">{drone.name}</td>
                  <td className="p-4 text-gray-600 text-xs">
                    {drone.manufacturer}
                    <br />
                    <span className="text-gray-600">{drone.countryOfManufacture}</span>
                  </td>
                  <td className="p-4 text-center">
                    {drone.ndaaCompliant ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                        <Shield className="w-3 h-3" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" /> No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right font-semibold text-green-700">{drone.specs.tankLiters}L</td>
                  <td className="p-4 text-right text-gray-700 whitespace-nowrap">{drone.specs.maxWindMph} mph</td>
                  <td className="p-4 text-right text-gray-600 text-xs">{drone.specs.ipRating}</td>
                  <td className="p-4 text-xs text-gray-700 max-w-xs">{drone.msrpUsd}</td>
                  <td className="p-4">
                    <Link
                      href={`/drones/${drone.slug}`}
                      className="text-green-700 text-sm font-medium hover:underline whitespace-nowrap"
                    >
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Which drone is right for you? */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Which drone is right for you?</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">If you need NDAA compliance:</strong> The Hylio AG-272 (68L tank, US-made in Richmond, TX) is the primary commercially available option for federal contracts, state programs and university-funded work. The Pyka Pelican 2 (fixed-wing, 100+ acres per hour) is an NDAA-compliant option for very large flat fields only.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">If you want the lowest cost of entry:</strong> The DJI Agras T25 ($12,500 pre-tariff) is the most affordable T-series option with a 20L tank. The Talos T60X starts at $17,899 and offers US customer support and parts availability. For established operators, the DJI T50 offers the best parts network and throughput per dollar post-tariff at $22,000 to $28,000.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">If wind is your constraint:</strong> The Hylio AG-272 rated to 25 mph winds significantly outperforms the DJI T50 (13.4 mph max) and XAG P100 Pro (22 mph). For operators in Great Plains, coastal or Mountain West markets where wind regularly exceeds 15 mph, the AG-272 wind rating provides real scheduling advantages.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">If you spray 2,000+ acres per day:</strong> The DJI Agras T100 (100L tank, single-charge 8.8 acres at 3 gpa) dramatically reduces refill stops for high-volume operations. At 1,000+ acres per day, the T100 tank advantage outweighs its higher price and smaller dealer footprint.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone comparison questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Related tools */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/tools/roi-calculator', label: 'Buy vs. Hire ROI Calculator', desc: 'Find your break-even acreage' },
              { href: '/tools/coverage-calculator', label: 'Coverage Time Estimator', desc: 'How long to spray by drone model' },
              { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', desc: 'Per-acre cost by crop and state' },
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
        <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/drones/dji-agras-t50" className="text-green-700 hover:underline">DJI Agras T50</Link>
          <Link href="/drones/dji-agras-t100" className="text-green-700 hover:underline">DJI Agras T100</Link>
          <Link href="/drones/hylio-ag-272" className="text-green-700 hover:underline">Hylio AG-272</Link>
          <Link href="/drones/xag-p100-pro" className="text-green-700 hover:underline">XAG P100 Pro</Link>
          <Link href="/drones/talos-t60x" className="text-green-700 hover:underline">Talos T60X</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/services/sales" className="text-green-700 hover:underline">Drone sales and dealers</Link>
        </div>

        <AuthorCard />
      </div>
    </>
  );
}
