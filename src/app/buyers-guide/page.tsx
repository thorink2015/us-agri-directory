import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';
import { drones } from '@/data/drone-model';

const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'What is the best drone for a beginner commercial operator?',
    answer:
      'DJI Agras T50 for most operators. Largest dealer network, most operator community support, proven reliability. If NDAA compliance is needed for federal or state contracts, Hylio AG-272 is the primary US-made alternative.',
  },
  {
    question: 'Is it worth waiting for tariffs to change before buying DJI?',
    answer:
      'Unpredictable. Tariffs could increase further, decrease, or stay flat. If you need the drone now, buy now and factor current pricing into your ROI calculation. Waiting typically costs you a spray season of revenue.',
  },
  {
    question: 'Can I start with a T25 and upgrade later?',
    answer:
      'Yes. Many operators start with a T25 for their own farm, then add a T50 when custom spray volume justifies the upgrade. The T25 becomes a backup or secondary drone.',
  },
  {
    question: 'Should I buy new or used?',
    answer:
      'New for your primary spray drone (warranty, latest firmware, dealer support). Used can work for a backup or second fleet drone if you can verify flight hours, battery cycles, and maintenance history. DJI T40s are available used at significant discounts since the T50 superseded them.',
  },
  {
    question: 'How many batteries do I really need?',
    answer:
      '4 minimum for continuous single-drone operation with rapid charging. 6 recommended for all-day peak-season work. Each additional battery adds $1,200 and about 1 more hour of field time before hitting a charging bottleneck.',
  },
];

const QUICK_PICKS = [
  { situation: 'First commercial drone, private farm contracts', drone: 'DJI Agras T50', why: 'Largest dealer network, proven platform, most parts availability' },
  { situation: 'Budget-conscious entry', drone: 'Talos T60X or DJI T25', why: '$17,899 to $20,000 entry point' },
  { situation: 'Federal/state contracts, NDAA required', drone: 'Hylio AG-272', why: 'Only large-tank US-made NDAA option' },
  { situation: 'High-wind environment (Great Plains)', drone: 'Hylio AG-272 or XAG P100 Pro', why: '25 mph and 22 mph vs DJI 13.4 mph' },
  { situation: '1,000+ acres per day, replacing airplane', drone: 'DJI Agras T100', why: '100L tank, 2.5x payload of T50' },
  { situation: 'Own-farm only, under 800 acres/yr', drone: 'DJI Agras T25', why: 'Same spray quality as T50, $6K to $8K less' },
  { situation: 'Manned aircraft replacement, 5,000+ acres', drone: 'Pyka Pelican 2', why: 'Fixed-wing, 80 gal, 260 acres/hr. $550K.' },
];

const ACCESSORIES = [
  { item: 'Extra batteries (4 to 6)', budget: '$4,800 to $7,200', notes: '$1,200 each. 4 minimum for continuous ops.' },
  { item: 'Generator + charger', budget: '$2,000 to $5,000', notes: 'Field charging. Match to drone battery system.' },
  { item: 'Enclosed trailer', budget: '$3,000 to $8,000', notes: 'Protects equipment, doubles as mobile office.' },
  { item: 'Mixing station + water tank', budget: '$500 to $2,000', notes: 'On-site chemical mixing.' },
  { item: 'Spare parts kit', budget: '$500 to $1,500', notes: 'Props, motor, ESC, nozzles. Critical during peak season.' },
  { item: 'Mapping drone (Mavic 3 Multi)', budget: '$4,000 to $5,000', notes: 'Optional. Pre-map fields before spray missions.' },
];

export const metadata: Metadata = {
  title: "Best Agricultural Spray Drones (2026 Buyer's Guide) | Ag Drone Directory",
  description:
    'Compare DJI T50, T100, Hylio AG-272, XAG P100 Pro, and Talos T60X. Specs, pricing, NDAA status, and which drone fits your operation.',
  alternates: { canonical: '/buyers-guide' },
  openGraph: {
    title: "2026 Agricultural Spray Drone Buyer's Guide",
    description:
      'DJI Agras T50 ($22K-$28K post-tariff), Hylio AG-272 ($55K-$75K NDAA), DJI T100, XAG P100 Pro, and Talos T60X side by side. Which drone fits your operation.',
    url: `${SITE.domain}/buyers-guide`,
  },
};

export default function BuyersGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "2026 Agricultural Spray Drone Buyer's Guide",
    description:
      'The US agricultural spray drone market in 2026 is dominated by the DJI Agras T50 with the Hylio AG-272 as the primary US-made NDAA-compliant alternative. 170 percent tariffs have narrowed the price gap.',
    url: `${SITE.domain}/buyers-guide`,
    mainEntityOfPage: `${SITE.domain}/buyers-guide`,
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
      { '@type': 'ListItem', position: 2, name: "Buyer's Guide", item: `${SITE.domain}/buyers-guide` },
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Buyer's Guide" }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          2026 Agricultural Spray Drone Buyer&apos;s Guide
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            The US agricultural spray drone market in 2026 is dominated by the DJI Agras T50 ($22,000 to $28,000 post-tariff, 40L tank, not NDAA compliant) with the Hylio AG-272 ($55,000 to $75,000, 68L, NDAA compliant) as the primary US-made alternative. The DJI T100 (100L) entered the US market in early 2026, while the Talos T60X ($17,899, 50L) competes on price. Cumulative tariffs of 170 percent on Chinese drones have narrowed the price gap between DJI and US-manufactured alternatives.
          </p>
        </div>

        <section className="space-y-5 text-gray-700 leading-relaxed text-sm">
          <h2 className="text-xl font-bold text-gray-900 mt-2">Quick pick guide</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Your situation</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Best drone</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {QUICK_PICKS.map((p) => (
                  <tr key={p.situation}>
                    <td className="px-3 py-2 font-medium text-gray-900">{p.situation}</td>
                    <td className="px-3 py-2 text-gray-700">{p.drone}</td>
                    <td className="px-3 py-2 text-gray-700">{p.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Head-to-head comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Drone</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Country</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">NDAA</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Tank</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Granular</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">MTOW</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Swath</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Flow rate</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Charge</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">Max wind</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">IP</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-800 whitespace-nowrap">MSRP USD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {drones.map((d) => (
                  <tr key={d.slug}>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
                      <Link href={`/drones/${d.slug}`} className="text-green-700 hover:underline">
                        {d.name}
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.countryOfManufacture}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.ndaaCompliant ? 'Yes' : 'No'}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                      {d.specs.tankLiters ? `${d.specs.tankLiters}L / ${d.specs.tankGallons} gal` : '—'}
                    </td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                      {d.specs.granularCapacityKg ? `${d.specs.granularCapacityKg} kg` : '—'}
                    </td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">
                      {d.specs.mtowKg ? `${d.specs.mtowKg} kg (${d.specs.mtowLbs} lb)` : '—'}
                    </td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.specs.swathWidthFeet ? `${d.specs.swathWidthFeet} ft` : '—'}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.specs.maxFlowRateLMin ? `${d.specs.maxFlowRateLMin} L/min` : '—'}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.specs.chargeTimeMin ? `${d.specs.chargeTimeMin} min` : '—'}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.specs.maxWindMph ? `${d.specs.maxWindMph} mph` : '—'}</td>
                    <td className="px-2 py-2 text-gray-700 whitespace-nowrap">{d.specs.ipRating || '—'}</td>
                    <td className="px-2 py-2 text-gray-700">{d.msrpUsd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            For an interactive filterable comparison, see the <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">drone comparison tool</Link>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">The tariff factor</h2>
          <p>
            Cumulative US tariffs on Chinese drones hit 170 percent by April 2025, with drones explicitly excluded from electronics exemptions. A DJI T50 at $18,000 pre-tariff effectively costs $22,000 to $28,000 post-tariff depending on dealer inventory vintage. This has narrowed the gap with Hylio ($55,000 to $75,000) from a 3x to 4x multiple down to roughly 2x to 3x. Tariff trajectory remains uncertain; operators should factor potential further increases into purchase decisions.
          </p>

          <h2 className="text-xl font-bold text-gray-900">NDAA compliance explained</h2>
          <p>
            NDAA restricts federal agency procurement of drones from designated foreign manufacturers (DJI, XAG). Private farm contracts are NOT affected. Operators who bid federal, state, or university-funded work need NDAA-compliant hardware. The DoD Blue UAS list includes Hylio, Skydio, and Parrot. The Countering CCP Drones Act was excluded from FY2025 NDAA but remains active in future legislative cycles. Full detail on the <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance page</Link>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Financing options</h2>
          <p>
            Manufacturer financing programs, farm credit associations, and USDA FSA Farm Loan Programs offer 2 to 7 year terms at 6 to 9 percent with 10 to 25 percent down. USDA EQIP Practice Code 595 cost-share (40 to 90 percent) can offset the purchase price. See <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">grants and cost-share</Link> for application details. Use our <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link> to model ownership cost at your expected annual acreage.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What to buy with the drone</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Accessory</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Budget</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ACCESSORIES.map((a) => (
                  <tr key={a.item}>
                    <td className="px-3 py-2 font-medium text-gray-900">{a.item}</td>
                    <td className="px-3 py-2 text-gray-700">{a.budget}</td>
                    <td className="px-3 py-2 text-gray-700">{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Buyer&apos;s guide questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {drones.map((d) => (
            <Link key={d.slug} href={`/drones/${d.slug}`} className="text-green-700 hover:underline">
              {d.name}
            </Link>
          ))}
          <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">Drone comparison tool</Link>
          <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/services/sales" className="text-green-700 hover:underline">Drone sales and dealers</Link>
          <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">Grants and cost-share</Link>
          <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
