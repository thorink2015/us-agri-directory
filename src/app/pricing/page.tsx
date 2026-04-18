import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';

import { addUtm } from '@/lib/utm';
const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'What is the cheapest drone spraying rate in the US?',
    answer: 'The Iowa State 2026 Custom Rate Survey reported a low end of $8 per acre. Rates below $10 per acre are rare and typically found only on very large contiguous fields (500+ acres) in dense Corn Belt markets with multiple competing operators.',
  },
  {
    question: 'Why does vineyard and orchard spraying cost so much more?',
    answer: 'Three factors. Steep terrain and complex flight paths slow drone throughput. Higher carrier volumes (10 to 20 gallons per acre versus 2 to 5 for row crops) mean more refill stops. And 8 to 12 passes per season versus 1 to 2 for row crops multiplies the per-acre total.',
  },
  {
    question: 'Does the farmer or the operator supply the chemical?',
    answer: 'Most common arrangement is farmer-supplied chemical with operator providing application only. Some operators offer all-in pricing that includes chemical procurement, typically at a 10 to 20 percent markup. Cover crop seeding operators often supply seed as part of a combined rate.',
  },
  {
    question: 'Is it cheaper to buy my own drone or hire an operator?',
    answer: 'University of Missouri Extension research puts the break-even for drone ownership at approximately 980 acres per year of custom application work. Below 500 acres per year, hiring a custom operator is almost always cheaper. Above 1,500 acres per year, ownership is clearly more economical.',
  },
  {
    question: 'Do prices drop if I book multiple passes or a full season?',
    answer: 'Yes. Multi-pass season contracts typically reduce per-acre rates by 10 to 15 percent versus spot pricing. Vineyard and orchard growers who sign annual contracts in January or February often negotiate 15 to 20 percent below walk-up rates. Multi-year commitments with the same operator can drop rates further.',
  },
];

const AUTHORITY_LINKS = [
  { label: 'Iowa State Extension 2026 Custom Rate Survey', url: 'https://www.extension.iastate.edu/agdm/crops/pdf/a3-10.pdf' },
  { label: 'University of Missouri Extension G1274 Breakeven Analysis', url: 'https://extension.missouri.edu/publications/g1274' },
  { label: 'American Spray Drone Coalition', url: 'https://www.rantizo.com/our-network' },
  { label: 'USDA NRCS EQIP', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Drone Spraying Cost Per Acre: 2026 Rates Guide',
    description: 'Drone crop spraying costs $12 to $35 per acre in 2026. See rates by crop, region, and service type. First university benchmark: $12.50/acre from Iowa State.',
    alternates: { canonical: '/pricing' },
    openGraph: {
      type: 'website',
      title: 'Drone Spraying Cost Per Acre (2026 Rates)',
      description: 'Rates by crop, region, and service type. First university benchmark: $12.50/acre from Iowa State 2026 Custom Rate Survey.',
      url: `${SITE.domain}/pricing`,
    },
  };
}

export default function PricingPage() {
  const operatorCount = operators.length;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE.domain}/pricing` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Does Drone Crop Spraying Cost in 2026?',
    description: 'Drone crop spraying costs $12 to $35 per acre in 2026. Complete rate guide by crop, region, service type, and USDA cost-share programs.',
    url: `${SITE.domain}/pricing`,
    mainEntityOfPage: `${SITE.domain}/pricing`,
    datePublished: '2026-01-01',
    dateModified: LAST_REVIEWED,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Pricing' }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          How Much Does Drone Crop Spraying Cost in 2026?
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO Block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Drone crop spraying in the United States costs $12 to $18 per acre for row crops and $18 to $35 per acre for vineyards and orchards in 2026, application only with the farmer supplying chemical. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average ($12.00 median) based on 47 operator responses. Rates have compressed 30 to 45 percent since 2022, driven by rapid growth in operator supply.
          </p>
        </div>

        {/* SECTION 1: National Average Rates by Service Type */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">2026 drone spraying rates by application type</h2>
          <p className="text-sm text-gray-600 mb-4">All rates below are application only (farmer supplies chemical).</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Service Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate ($/acre)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { service: 'Fungicide application', rate: '$13 to $16', source: 'Indiana Prairie Farmer Apr 2025; MU Extension' },
                  { service: 'Herbicide application', rate: '$12 to $19', source: 'National operator data; nuWay Ag' },
                  { service: 'Insecticide application', rate: '$13 to $17', source: 'Same rate structure as fungicide' },
                  { service: 'Defoliant application', rate: '$14 to $18', source: 'Cotton aerial defoliation benchmark' },
                  { service: 'Cover crop seeding', rate: '$12 to $20', source: 'Iowa State 2026 aerial seeding avg $13.60; WI drone seeding $20' },
                  { service: 'Liquid fertilizer application', rate: '$13 to $17', source: 'Iowa State 2026 ground broadcast $9.35; drone rates follow spray pricing' },
                ].map((row) => (
                  <tr key={row.service}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.service}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">{row.rate}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            The University of Missouri Extension G1274 study uses $16 per acre as the custom hire benchmark, with farmer ownership cost dropping to $12.27 per acre at 1,000 acres per year and $7.39 per acre at 4,000 acres per year.
          </p>
          <Link href="/tools/spray-cost-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm">
            Use our Spray Cost Calculator
          </Link>
        </section>

        {/* SECTION 2: Rates by Region */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Regional pricing: what you will pay in your area</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate Range</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { region: 'Corn Belt (IA, IL, IN, OH, eastern NE)', rate: '$12 to $17', why: 'Most competitive market. Large flat fields. Growing operator supply drives compression.', href: '/regions/corn-belt' },
                  { region: 'Great Plains (KS, NE, ND, SD, OK, TX panhandle)', rate: '$12 to $16', why: 'Large open acreage. Fewer operators than Corn Belt.', href: '/regions/great-plains' },
                  { region: 'Mississippi Delta (AR, LA, MS, MO bootheel)', rate: '$14 to $18', why: 'Strong manned aerial applicator competition. Rice paddy complexity.', href: '/regions/mississippi-delta' },
                  { region: 'California (specialty crops)', rate: '$15 to $35', why: 'Orchards, vineyards, steep terrain. CDPR compliance overhead.', href: '/regions/california' },
                  { region: 'Southeast (GA, AL, SC, NC, FL)', rate: '$16 to $28', why: 'Variable terrain. Mixed crop types. Higher chemical costs.', href: '/regions/southeast' },
                  { region: 'Pacific Northwest (WA, OR, ID)', rate: '$14 to $20', why: 'Row crops at the low end, orchards and vineyards at the high end.', href: null },
                  { region: 'Northeast (PA, NY, VA, MD)', rate: '$15 to $25', why: 'Smaller irregular fields. Fewer operators.', href: null },
                ].map((row) => (
                  <tr key={row.region}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.href ? (
                        <Link href={row.href} className="text-green-700 hover:underline">{row.region}</Link>
                      ) : (
                        row.region
                      )}
                    </td>
                    <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">{row.rate}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 leading-relaxed">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Rates by Crop */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What drone spraying costs on your crop</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Crop</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate ($/acre)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { crop: 'Corn', rate: '$14 to $17', notes: "VT/R1 tall-crop fungicide commands 15 to 25% premium over flat crops. Beck's 2025 PFR shows $27.26 ROI per acre for drone fungicide on corn.", href: '/crops/corn' },
                  { crop: 'Soybeans', rate: '$12 to $16', notes: 'Standard Midwest baseline. Most price-competitive crop.', href: '/crops/soybeans' },
                  { crop: 'Wheat', rate: '$12 to $16', notes: 'Similar to soybean rates. Lower canopy complexity.', href: '/crops/wheat' },
                  { crop: 'Cotton', rate: '$14 to $18', notes: 'Defoliant rates run higher than mid-season insecticide.', href: '/crops/cotton' },
                  { crop: 'Rice', rate: '$15 to $20', notes: 'Delta region. Wet field conditions add complexity.', href: '/crops/rice' },
                  { crop: 'Orchards', rate: '$15 to $21', notes: 'Higher GPA requirements. Complex flight paths. CA almond and walnut primary.', href: '/crops/orchards' },
                  { crop: 'Vineyards', rate: '$18 to $30', notes: 'Steep terrain, trellis systems, 8 to 12 passes per season.', href: '/crops/grapes' },
                  { crop: 'Specialty vegetables', rate: '$20 to $40', notes: 'Higher frequency. Specialty formulations. Smaller fields.', href: null },
                ].map((row) => (
                  <tr key={row.crop}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.href ? (
                        <Link href={row.href} className="text-green-700 hover:underline">{row.crop}</Link>
                      ) : (
                        row.crop
                      )}
                    </td>
                    <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">{row.rate}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 leading-relaxed">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: Minimum Charges and Extra Fees */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Minimums, travel charges, and hidden costs</h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">Minimum acreage.</strong> Most operators set a 10 to 25 acre minimum for standard service calls. Some will serve smaller plots at elevated per-acre rates. University of Missouri research shows farmer ownership of a drone only beats custom hire at roughly 980 acres per year, which is why small-acreage jobs carry surcharges.
            </p>
            <p>
              <strong className="text-gray-900">Travel and mobilization.</strong> Trip charges vary widely. Broken-up or hard-to-reach fields typically add $5 to $10 per acre to base pricing. Some operators charge flat mobilization fees ($50 to $150), others use per-mile rates. Large contiguous fields get the lowest rates; scattered small parcels push toward the upper end.
            </p>
            <p>
              <strong className="text-gray-900">Generator fuel.</strong> Drone operations absorb generator diesel for battery charging rather than itemizing it. Iowa State survey estimates diesel at $3.66 per gallon for 2025/2026. Generator fuel cost runs roughly $0.37 to $0.48 per acre, typically built into the base rate.
            </p>
            <p>
              <strong className="text-gray-900">Chemical cost.</strong> All rates on this page are application only. Chemical products are an additional cost, either supplied by the farmer or purchased through the operator. Fungicide products run $8 to $25 per acre for the chemical itself, depending on active ingredient and rate.
            </p>
          </div>
        </section>

        {/* SECTION 5: Historical Trend */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How drone spraying rates have changed: 2022 to 2026</h2>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            The defining pricing story is rate compression driven by operator supply growth.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Midwest Drone Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Manned Aerial Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { year: '2022', drone: '$22 to $25/acre', air: '$10 to $13/acre', ctx: 'Early adopter pricing; few operators' },
                  { year: '2024', drone: '$15 to $18/acre', air: '$11 to $13/acre', ctx: 'MU Extension benchmark $16/acre' },
                  { year: '2026', drone: '$12 to $17/acre', air: '$12/acre (Iowa State)', ctx: 'First Iowa State drone category: $12.50 avg' },
                ].map((row) => (
                  <tr key={row.year}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.year}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{row.drone}</td>
                    <td className="px-4 py-3 text-gray-700">{row.air}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{row.ctx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              Midwest rates dropped roughly 30 to 45 percent in three years. Several forces drove this. SweetWater Technologies alone scaled from 32,000 acres in 2022 to an estimated 200,000 by end of 2025. The NAAA 2025 industry survey found 13 percent of aerial application operations now include UAS, up from 5 percent in 2024. The American Spray Drone Coalition reported 10.3 million US acres sprayed by drones in 2024, roughly 2.5 times the 2023 figure.
            </p>
            <p>
              At current rates, some operators report barely clearing $5 per acre profit. Specialty crop markets (orchards, vineyards, vegetables) remain less compressed at $18 to $40 per acre.
            </p>
            <p>
              Offsetting downward pressure, cumulative tariffs on Chinese drones reached 170 percent by April 2025. A DJI Agras T50 that sold for roughly $18,000 pre-tariff could effectively cost $25,000 or more post-tariff, narrowing the price gap with US-made alternatives.
            </p>
          </div>
        </section>

        {/* SECTION 6: Drone vs. Ground Rig vs. Airplane */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Drone vs. ground rig vs. airplane: cost comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Method</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Typical Rate (custom hire)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Best For</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Weaknesses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    method: 'Agricultural drone',
                    rate: '$12 to $35/acre',
                    best: 'Tall crops at VT/R1; wetlands; precision spot treatment; orchards and vineyards',
                    weak: 'Higher per-acre cost than airplane on large open fields; limited tank capacity requires refill stops',
                  },
                  {
                    method: 'Ground sprayer (custom hire)',
                    rate: '$7 to $11/acre',
                    best: 'Large open row-crop fields; high-volume applications',
                    weak: 'Cannot enter wet or tall crops; compaction risk; GPS drift in complex field shapes',
                  },
                  {
                    method: 'Manned airplane',
                    rate: '$10 to $13/acre',
                    best: 'Very large acreage (500+ acres); ultra-low-volume applications',
                    weak: 'Cannot legally spray near structures or trees; minimum field size; drift risk; scheduling volatility',
                  },
                ].map((row) => (
                  <tr key={row.method}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.method}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">{row.rate}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 leading-relaxed">{row.best}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 leading-relaxed">{row.weak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            For tall-crop fungicide on corn at VT stage, drones are often the only viable option: ground rigs cause canopy damage and airplanes cannot target the upper canopy with enough carrier volume. The Beck&apos;s 2025 Practical Farm Research data shows a $27.26 per-acre ROI on drone-applied fungicide in corn, justifying the premium over ground application.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link href="/tools/roi-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm">
              Calculate buy vs. hire ROI
            </Link>
            <Link href="/tools/coverage-calculator" className="inline-flex items-center gap-2 px-4 py-2 border border-green-700 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors text-sm">
              Estimate coverage time
            </Link>
          </div>
        </section>

        {/* SECTION 7: USDA Cost-Share */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">USDA cost-share programs that offset drone spraying costs</h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">EQIP Practice 595, Integrated Pest Management.</strong> USDA NRCS Environmental Quality Incentives Program (EQIP) Practice 595 provides cost-share payments for adopting precision pest management, which can include drone-applied inputs when documented as reducing chemical use. Payment rates vary by state; typical range is $15 to $35 per acre for qualifying IPM practices.
            </p>
            <p>
              <strong className="text-gray-900">EQIP Practice 340, Cover and Green Manure Crop.</strong> NRCS Practice 340 supports cover crop establishment, including aerial seeding. Drone cover crop seeding qualifies in states where NRCS has approved aerial establishment as an approved method. Cost-share typically covers 50 to 75 percent of the establishment cost.
            </p>
            <p>
              <strong className="text-gray-900">FSA Microloans and Operating Loans.</strong> USDA Farm Service Agency (FSA) microloans (up to $50,000) and regular operating loans can finance drone equipment purchases. These are not cost-share but low-interest financing that reduces ownership cost, relevant to the buy-vs-hire decision at higher acreage volumes.
            </p>
            <p>
              State-level programs supplement federal cost-share in several major ag states. Iowa, Illinois, Indiana, and Minnesota have run targeted cover crop programs that explicitly list drone seeding as an eligible establishment method.
            </p>
          </div>
          <div className="mt-4">
            <Link href="/grants-and-subsidies" className="text-green-700 font-medium text-sm hover:underline">
              See the full USDA grants and subsidies guide →
            </Link>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* SECTION 9: Find an Operator CTA */}
        <section className="mb-10 bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Get an actual quote for your field</h2>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            Rate tables give you a benchmark. The only way to know what you will actually pay is to contact operators serving your county. Our directory lists {operatorCount}+ verified drone applicators across all 50 states.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/operators" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm">
              Browse all operators
            </Link>
            <Link href="/states" className="inline-flex items-center gap-2 px-5 py-2.5 border border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-colors text-sm">
              Find operators by state
            </Link>
          </div>
        </section>

        {/* Authority links */}
        {AUTHORITY_LINKS.length > 0 && (
          <section className="mb-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sources and further reading</p>
            <div className="flex flex-col gap-2">
              {AUTHORITY_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={addUtm(link.url, "authority_link")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Author card */}
        <AuthorCard />
      </div>
    </>
  );
}
