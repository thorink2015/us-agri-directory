import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

import { addUtm } from '@/lib/utm';
const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'How much does it cost to start a drone spraying business?',
    answer:
      '$35,000 to $55,000 for a realistic DJI T50 setup including drone, batteries, generator, trailer, certification, insurance and business formation. USDA EQIP cost-share can reduce the drone cost by 40 to 90 percent, bringing effective entry to $20,000 to $40,000.',
  },
  {
    question: 'How long until I make money?',
    answer:
      'Year 1 is certification and proof-of-concept (200 to 500 acres, typically below break-even). Year 2 targets 800 to 1,500 acres and approaches break-even. Year 3 at 1,500+ acres is where profitability starts. This is not a quick-return business.',
  },
  {
    question: 'Can I do this part-time while keeping my day job?',
    answer:
      'Yes for the first 1 to 2 years. Peak spray windows (corn VT/R1 in late July) are 2 to 3 weeks long. Cover crop seeding adds another 4 to 6 week window. Outside those peaks, the drone sits. Many operators start part-time and go full-time once they exceed 1,500 acres per year.',
  },
  {
    question: 'Should I buy DJI or Hylio to start?',
    answer:
      'DJI T50 for most new operators: lower cost, larger dealer network, more parts availability, bigger operator community. Hylio AG-272 only if you need NDAA compliance for federal or state contracts, or operate in high-wind environments above 13.4 mph.',
  },
  {
    question: 'Do I need farming experience?',
    answer:
      'Not legally, but practically yes. Understanding crop growth stages, spray timing, chemical products and farmer decision-making is critical to winning and keeping customers. Operators with ag backgrounds convert customers faster and make fewer costly mistakes.',
  },
  {
    question: 'What is the biggest risk?',
    answer:
      'A pesticide drift claim without adequate insurance coverage. One drift event onto a neighboring organic or specialty crop field can generate $50,000 to $500,000 in damages. Chemical application and pollution liability insurance is non-negotiable.',
  },
];

const STARTUP_COSTS = [
  { item: 'Drone (DJI T25 or Talos T60X)', low: '$16,000', high: '$28,000', notes: 'Post-tariff pricing. EQIP can cover 40 to 90%.' },
  { item: 'Drone (Hylio AG-272, NDAA)', low: '$55,000', high: '$75,000', notes: 'US-made, NDAA compliant' },
  { item: 'Extra batteries (4 to 6)', low: '$4,800', high: '$7,200', notes: '$1,200 each. Need 4 minimum for continuous operation.' },
  { item: 'Generator + charger', low: '$2,000', high: '$5,000', notes: 'Required for field charging' },
  { item: 'Trailer / transport', low: '$1,500', high: '$8,000', notes: 'Enclosed trailer recommended' },
  { item: 'Mixing station + water tank', low: '$500', high: '$2,000', notes: 'For on-site chemical mixing' },
  { item: 'FAA Part 107 exam', low: '$175', high: '$175', notes: 'One-time' },
  { item: 'Part 137 consultant package', low: '$0 (DIY)', high: '$4,500', notes: 'Strongly recommended' },
  { item: 'State pesticide license', low: '$75', high: '$500', notes: 'Varies by state' },
  { item: 'Manufacturer training', low: '$500', high: '$900', notes: 'DJI or Hylio 2-day course' },
  { item: 'Insurance (year 1)', low: '$2,500', high: '$5,000', notes: 'Hull + liability + chemical' },
  { item: 'Business formation + legal', low: '$500', high: '$2,000', notes: 'LLC, contracts, recordkeeping' },
];

const TIMELINE = [
  { month: 'Month 1 to 2', step: 'FAA Part 107', detail: 'Study 2 to 4 weeks. Take proctored exam at PSI testing center ($175). 60 questions, 70 percent passing. No flight test. Valid 24 months before recurrent.' },
  { month: 'Month 1 to 3', step: 'State pesticide license', detail: 'Contact your state department of agriculture. Study Core manual plus aerial category materials. Schedule and pass exams. Some states have testing windows; others test year-round.' },
  { month: 'Month 1 to 2', step: 'Manufacturer training', detail: '2-day DJI Agras or Hylio operator certification. $500 to $900. Learn safe operation, maintenance, calibration, software setup. Can run concurrently with Part 107 study.' },
  { month: 'Month 2 to 8', step: 'FAA Part 137 + Section 44807', detail: 'Submit application with operations manual, training records, maintenance protocols. 90 to 180 day approval. Consultant packages ($2,500 to $4,500) shorten this by 60 to 120 days.' },
  { month: 'Month 7 to 9', step: 'Insurance + business setup', detail: 'Once Part 137 is approved: bind insurance ($2,500 to $5,000/yr), form LLC, set up recordkeeping, build customer pipeline. Target first paying customer in the next spray window.' },
];

export const metadata: Metadata = {
  title: 'How to Start a Drone Spraying Business: 2026 Guide',
  description:
    'Step-by-step guide to starting a commercial ag drone spraying business. Licensing, equipment, costs, pricing and first customers. $15K to $80K startup.',
  alternates: { canonical: '/start-a-drone-business' },
  openGraph: {
    type: 'website',
    title: 'How to Start an Agricultural Drone Spraying Business in 2026',
    description:
      '$15K to $80K startup, 6 to 9 month certification pathway, break-even at ~980 acres/yr. Complete 2026 guide to licensing, equipment, pricing and first customers.',
    url: `${SITE.domain}/start-a-drone-business`,
  },
};

export default function StartADroneBusinessPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Start an Agricultural Drone Spraying Business in 2026',
    description:
      'Starting a commercial ag drone spraying business in the US requires $15,000 to $80,000 in startup capital, 6 to 9 months of certification and three credentials: FAA Part 107, FAA Part 137 and a state pesticide applicator license.',
    url: `${SITE.domain}/start-a-drone-business`,
    mainEntityOfPage: `${SITE.domain}/start-a-drone-business`,
    datePublished: '2026-01-01',
    dateModified: LAST_REVIEWED,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Start an Agricultural Drone Spraying Business',
    description: 'The five-step certification and launch pathway for a commercial ag drone spraying business in the United States.',
    totalTime: 'P9M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '35000' },
    step: TIMELINE.map((t, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: t.step,
      text: t.detail,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Start a Drone Business', item: `${SITE.domain}/start-a-drone-business` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Start a Drone Business' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          How to Start an Agricultural Drone Spraying Business in 2026
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Starting a commercial agricultural drone spraying business in the US requires $15,000 to $80,000 in startup capital, 6 to 9 months of certification and three credentials: FAA Part 107, FAA Part 137 with Section 44807 exemption and a state commercial pesticide applicator license. The 2026 Iowa State Custom Rate Survey puts the average custom drone spray rate at $12.50 per acre, with University of Missouri Extension research showing operator break-even at approximately 980 acres per year.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">Is this business right for you?</h2>
          <p>
            This business works for people with: agricultural background or direct connections to farmers, mechanical aptitude (you will maintain the drone yourself), tolerance for seasonal income (80 percent of revenue lands in 3 to 4 months) and $15,000 to $80,000 in startup capital. It does NOT work for people who expect year-round steady income from day one, have zero farming connections (cold-calling farmers without a network is extremely slow), want passive income (this is hands-on physical work in fields) or cannot wait 6 to 9 months for certification before earning revenue. The typical first-year trajectory: 6 to 9 months certifying, 200 to 500 acres in the first spray season, breaking even in year 2 and profitability by year 3 at 1,000+ acres per year.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What it actually costs to start</h2>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Item</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Low end</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">High end</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {STARTUP_COSTS.map((row) => (
                  <tr key={row.item}>
                    <td className="px-3 py-2 font-medium text-gray-900">{row.item}</td>
                    <td className="px-3 py-2 text-gray-700">{row.low}</td>
                    <td className="px-3 py-2 text-gray-700">{row.high}</td>
                    <td className="px-3 py-2 text-gray-700">{row.notes}</td>
                  </tr>
                ))}
                <tr className="bg-green-50">
                  <td className="px-3 py-2 font-bold text-gray-900">Realistic entry (DJI T50 + consultant)</td>
                  <td className="px-3 py-2 font-bold text-gray-900">$35,000</td>
                  <td className="px-3 py-2 font-bold text-gray-900">$55,000</td>
                  <td className="px-3 py-2 text-gray-700">Most common first-year investment</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            After EQIP cost-share (if approved), effective drone cost drops by 40 to 90 percent, bringing realistic entry down to $20,000 to $40,000. See <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">grants and cost-share</Link> for how to apply.
          </p>

          <h2 className="text-xl font-bold text-gray-900">The 6 to 9 month certification pathway</h2>
          <div className="not-prose space-y-3">
            {TIMELINE.map((t) => (
              <div key={t.step} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">{t.month}</span>
                  <span className="font-bold text-gray-900">{t.step}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{t.detail}</p>
              </div>
            ))}
          </div>
          <p>
            <Link href="/training-and-certification" className="text-green-700 hover:underline">Full certification details</Link> | <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">state-specific requirements</Link>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Which drone to buy first</h2>
          <p>
            <strong>DJI Agras T50 ($22,000 to $28,000 post-tariff):</strong> most operators start here. 40L tank, proven dealer network, fastest parts availability, largest operator community for troubleshooting. Not NDAA compliant. <strong>DJI Agras T25 ($16,000 to $20,000):</strong> lower entry cost, same spray quality as T50 (identical pump and nozzle). Best for farmer-operators spraying their own fields at 200 to 800 acres per year. Lower daily throughput limits commercial scalability. <strong>Talos T60X (from $17,899):</strong> lowest price point for a 50L-class drone, but undisclosed specs on battery, wind and IP rating and a shorter field track record. <strong>Hylio AG-272 ($55,000 to $75,000):</strong> buy this if you need NDAA compliance or work in high-wind environments (25 mph vs DJI 13.4 mph). Higher cost but US-made with no tariff exposure. Do NOT buy Pyka Pelican 2 ($550,000) as your first platform; it targets large commercial applicators <Link href="/comparisons/drone-vs-airplane" className="text-green-700 hover:underline">replacing manned aircraft</Link>, not startup operators. <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">Compare all drones side by side</Link>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How to set your per-acre rates</h2>
          <p>
            National 2026 benchmarks: corn and soybean fungicide $12 to $17/acre in the Corn Belt; wheat heading $12 to $16/acre; cotton defoliant $14 to $20/acre; vineyard and orchard $18 to $35/acre; cover crop seeding $12 to $18/acre. Your pricing formula: calculate annual fixed costs (drone payment + insurance + maintenance + batteries + generator fuel), divide by realistic annual acreage, add $3 to $5/acre profit margin, compare to local competitors. University of Missouri Extension breakeven analysis: $12.27/acre at 1,000 acres/yr, $7.39/acre at 4,000 acres/yr. At $16/acre custom hire rate, break-even sits at roughly 980 acres per year.
          </p>
          <p>
            Pricing mistakes to avoid: pricing below your fixed cost per acre to win customers (you will lose money), quoting a flat rate without accounting for field shape, distance and crop complexity, not charging a minimum acreage (10 to 25 acre minimum is standard) and not adding a mobilization fee for fields more than 30 miles from your base. <Link href="/pricing" className="text-green-700 hover:underline">Full pricing data</Link> | <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">spray cost calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How to get your first 500 acres</h2>
          <p>
            <strong>Direct outreach</strong> (highest conversion): call local farmers you know. Ask if they hire aerial applicators for corn fungicide or cover crop seeding. Offer to do their first 40 to 80 acres at a competitive rate so they can see the results. Word of mouth from satisfied customers is the number-one growth driver. <strong>Crop consultant partnerships:</strong> local agronomists and crop consultants recommend spray applicators to their farmer clients. Build relationships with 2 to 3 consultants who cover your target geography. <strong>State extension events:</strong> attend county farm bureau meetings, state extension field days and crop production conferences. Bring your drone. Live demonstrations convert skeptics faster than any brochure. <strong>NRCS field office partnerships:</strong> your local NRCS office administers EQIP cost-share for cover crop seeding and refers farmers to applicators; get on their referral list. <strong>List your business</strong> on this directory: <Link href="/list-your-business" className="text-green-700 hover:underline">list your business for free</Link> to reach farmers actively searching for drone operators in your state. What does NOT work well: cold calling, Facebook ads to farmers (low conversion), printed flyers and bidding on large acreage before you have the throughput to deliver.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What your first spray season looks like</h2>
          <p>
            <strong>Pre-season (March to May):</strong> scout and book customer fields. Map fields with DJI Mavic or equivalent. Calibrate spray system. Stock batteries and spare parts. Verify insurance is current. File crop spray plans with customers. <strong>Peak season (June to August for most Corn Belt operators):</strong> spray 200 to 500 acres total in year 1. Start at dawn (wind is lowest). Battery cycle: fly, swap, charge, repeat. Typical day: 4 to 8 hours of active spraying, 40 to 60 acres per flight hour on T50. Keep FIFRA records for every application (product, rate, weather, field, time). <strong>Post-season (September to November):</strong> cover crop seeding if offered. Equipment maintenance. Customer follow-up for yield results. Book next season commitments. <strong>Year 1 financial reality:</strong> at 400 acres and $15/acre average, $6,000 gross revenue does NOT cover your equipment cost. Year 1 is a certification and proof-of-concept year; profitability starts at 1,000+ acres in year 2 to 3.
          </p>

          <h2 className="text-xl font-bold text-gray-900">When to add a second drone</h2>
          <p>
            Add drone #2 when you consistently turn away work during peak windows (corn VT/R1 in July is the bottleneck). A second drone with a second pilot doubles daily throughput without doubling fixed costs. Most operators add drone #2 in year 2 or 3. Fleet economics: fixed costs (insurance, trailer, generator) spread across 2+ drones; per-acre profit increases because revenue scales faster than overhead. University of Missouri data shows ownership cost drops from $12.27/acre at 1,000 acres to $7.39/acre at 4,000 acres. Hiring pilots: each additional pilot needs their own Part 107. Your Part 137 covers the business. State pesticide license may need to cover each applicator; check your state rules.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Mistakes that kill drone spray startups</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Buying the drone before getting certified.</strong> Your drone sits for 6 to 9 months while you wait for Part 137. Buy after Part 107 is done and Part 137 is submitted.</li>
            <li><strong>Pricing below cost to win customers.</strong> Use the <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link> to find your true cost per acre before quoting.</li>
            <li><strong>Skipping chemical application insurance.</strong> One drift claim without pollution liability coverage can end your business.</li>
            <li><strong>No FIFRA recordkeeping.</strong> Every application must be documented: product, EPA reg number, rate, weather, field, time. State inspectors check records.</li>
            <li><strong>Overpromising acreage capacity.</strong> A single T50 covers 300 to 600 acres per day. Do not book 2,000 acres in one week with one drone.</li>
            <li><strong>Ignoring wind.</strong> DJI T50 is grounded above 13.4 mph. In the Great Plains, that means no spraying after 10 AM most days. Plan your schedule around wind, not calendar.</li>
          </ol>
        </section>

        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://extension.missouri.edu/publications/g1274", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                University of Missouri Extension: Custom Rate and Break-even Analysis
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.extension.iastate.edu/agdm/crops/pdf/a3-10.pdf", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Iowa State Extension: 2026 Custom Rate Survey
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.faa.gov/uas/advanced_operations/agricultural", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA: Agricultural Operations (Part 137)
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                NRCS: Environmental Quality Incentives Program (EQIP)
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Starting a drone business: questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations/faa-part-107" className="text-green-700 hover:underline">FAA Part 107</Link>
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">State pesticide licensing</Link>
          <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance</Link>
          <Link href="/training-and-certification" className="text-green-700 hover:underline">Training and certification</Link>
          <Link href="/insurance" className="text-green-700 hover:underline">Drone insurance</Link>
          <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">Grants and cost-share</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link>
          <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">Spray cost calculator</Link>
          <Link href="/tools/coverage-calculator" className="text-green-700 hover:underline">Coverage time calculator</Link>
          <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">Drone comparison</Link>
          <Link href="/drones/dji-agras-t50" className="text-green-700 hover:underline">DJI Agras T50</Link>
          <Link href="/drones/dji-agras-t25" className="text-green-700 hover:underline">DJI Agras T25</Link>
          <Link href="/drones/hylio-ag-272" className="text-green-700 hover:underline">Hylio AG-272</Link>
          <Link href="/drones/talos-t60x" className="text-green-700 hover:underline">Talos T60X</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/services/seeding" className="text-green-700 hover:underline">Drone seeding services</Link>
          <Link href="/services/consultancy" className="text-green-700 hover:underline">Consultancy services</Link>
          <Link href="/crops/corn" className="text-green-700 hover:underline">Corn spraying guide</Link>
          <Link href="/list-your-business" className="text-green-700 hover:underline">List your business</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
