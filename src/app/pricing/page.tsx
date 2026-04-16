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


# Pricing Guide Pillar Page

## Meta
- URL slug: `/pricing`
- Primary keyword: drone spraying cost per acre
- Secondary keywords: drone crop spraying prices, how much does drone spraying cost, agricultural drone spraying rates 2026, drone application cost
- Title tag: `Drone Spraying Cost Per Acre (2026 Rates) | Ag Drone Directory`
- Meta description: `Drone crop spraying costs $12 to $35 per acre in 2026. See rates by crop, region, and service type. First university benchmark: $12.50/acre from Iowa State.`
- Canonical: `https://agdronedirectory.com/pricing`

## Schema
- Article with author (@id) and publisher (@id)
- FAQPage (5 questions)
- BreadcrumbList: Home > Pricing

---

## H1: How Much Does Drone Crop Spraying Cost in 2026?

## Byline
By {{authorName}} | Last updated {{lastReviewedDate}}

## AEO Block (green left-border callout)

Drone crop spraying in the United States costs $12 to $18 per acre for row crops and $18 to $35 per acre for vineyards and orchards in 2026, application only with the farmer supplying chemical. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average ($12.00 median) based on 47 operator responses. Rates have compressed 30 to 45 percent since 2022, driven by rapid growth in operator supply.

---

## Section 1: National Average Rates by Service Type

**H2:** 2026 drone spraying rates by application type

All rates below are application only (farmer supplies chemical).

| Service Type | Rate ($/acre) | Source |
|---|---|---|
| Fungicide application | $13 to $16 | Indiana Prairie Farmer Apr 2025; MU Extension |
| Herbicide application | $12 to $19 | National operator data; nuWay Ag |
| Insecticide application | $13 to $17 | Same rate structure as fungicide |
| Defoliant application | $14 to $18 | Cotton aerial defoliation benchmark |
| Cover crop seeding | $12 to $20 | Iowa State 2026 aerial seeding avg $13.60; WI drone seeding $20 |
| Liquid fertilizer application | $13 to $17 | Iowa State 2026 ground broadcast $9.35; drone rates follow spray pricing |

The University of Missouri Extension G1274 study uses $16 per acre as the custom hire benchmark, with farmer ownership cost dropping to $12.27 per acre at 1,000 acres per year and $7.39 per acre at 4,000 acres per year.

[Use our Spray Cost Calculator to estimate your cost](/tools/spray-cost-calculator)

---

## Section 2: Rates by Region

**H2:** Regional pricing: what you will pay in your area

| Region | Rate Range | Why | Link |
|---|---|---|---|
| Corn Belt (IA, IL, IN, OH, eastern NE) | $12 to $17 | Most competitive market. Large flat fields. Growing operator supply drives compression. | [Corn Belt](/regions/corn-belt) |
| Great Plains (KS, NE, ND, SD, OK, TX panhandle) | $12 to $16 | Large open acreage. Fewer operators than Corn Belt. | [Great Plains](/regions/great-plains) |
| Mississippi Delta (AR, LA, MS, MO bootheel) | $14 to $18 | Strong manned aerial applicator competition. Rice paddy complexity. | [Delta](/regions/mississippi-delta) |
| California (specialty crops) | $15 to $35 | Orchards, vineyards, steep terrain. CDPR compliance overhead. | [California](/regions/california) |
| Southeast (GA, AL, SC, NC, FL) | $16 to $28 | Variable terrain. Mixed crop types. Higher chemical costs. | [Southeast](/regions/southeast) |
| Pacific Northwest (WA, OR, ID) | $14 to $20 | Row crops at the low end, orchards and vineyards at the high end. | |
| Northeast (PA, NY, VA, MD) | $15 to $25 | Smaller irregular fields. Fewer operators. | |

---

## Section 3: Rates by Crop

**H2:** What drone spraying costs on your crop

| Crop | Rate ($/acre) | Notes | Link |
|---|---|---|---|
| Corn | $14 to $17 | VT/R1 tall-crop fungicide commands 15 to 25% premium over flat crops. Beck's 2025 PFR shows $27.26 ROI per acre for drone fungicide on corn. | [Corn](/crops/corn) |
| Soybeans | $12 to $16 | Standard Midwest baseline. Most price-competitive crop. | [Soybeans](/crops/soybeans) |
| Wheat | $12 to $16 | Similar to soybean rates. Lower canopy complexity. | [Wheat](/crops/wheat) |
| Cotton | $14 to $18 | Defoliant rates run higher than mid-season insecticide. | [Cotton](/crops/cotton) |
| Rice | $15 to $20 | Delta region. Wet field conditions add complexity. | [Rice](/crops/rice) |
| Orchards | $15 to $21 | Higher GPA requirements. Complex flight paths. CA almond and walnut primary. | [Orchards](/crops/orchards) |
| Vineyards | $18 to $30 | Steep terrain, trellis systems, 8 to 12 passes per season. | [Grapes](/crops/grapes) |
| Specialty vegetables | $20 to $40 | Higher frequency. Specialty formulations. Smaller fields. | |

---

## Section 4: Minimum Charges and Extra Fees

**H2:** Minimums, travel charges, and hidden costs

**Minimum acreage.** Most operators set a 10 to 25 acre minimum for standard service calls. Some will serve smaller plots at elevated per-acre rates. University of Missouri research shows farmer ownership of a drone only beats custom hire at roughly 980 acres per year, which is why small-acreage jobs carry surcharges.

**Travel and mobilization.** Trip charges vary widely. Broken-up or hard-to-reach fields typically add $5 to $10 per acre to base pricing. Some operators charge flat mobilization fees ($50 to $150), others use per-mile rates. Large contiguous fields get the lowest rates; scattered small parcels push toward the upper end.

**Generator fuel.** Drone operations absorb generator diesel for battery charging rather than itemizing it. Iowa State survey estimates diesel at $3.66 per gallon for 2025/2026. Generator fuel cost runs roughly $0.37 to $0.48 per acre, typically built into the base rate.

**Chemical cost.** All rates on this page are application only. Chemical products are an additional cost, either supplied by the farmer or purchased through the operator. Fungicide products run $8 to $25 per acre for the chemical itself, depending on active ingredient and rate.

---

## Section 5: Historical Trend

**H2:** How drone spraying rates have changed: 2022 to 2026

The defining pricing story is rate compression driven by operator supply growth.

| Year | Midwest Drone Rate | Manned Aerial Rate | Context |
|---|---|---|---|
| 2022 | $22 to $25/acre | $10 to $13/acre | Early adopter pricing; few operators |
| 2024 | $15 to $18/acre | $11 to $13/acre | MU Extension benchmark $16/acre |
| 2026 | $12 to $17/acre | $12/acre (Iowa State) | First Iowa State drone category: $12.50 avg |

Midwest rates dropped roughly 30 to 45 percent in three years. Several forces drove this. SweetWater Technologies alone scaled from 32,000 acres in 2022 to an estimated 200,000 by end of 2025. The NAAA 2025 industry survey found 13 percent of aerial application operations now include UAS, up from 5 percent in 2024. The American Spray Drone Coalition reported 10.3 million US acres sprayed by drones in 2024, roughly 2.5 times the 2023 figure.

At current rates, some operators report barely clearing $5 per acre profit. Specialty crop markets (orchards, vineyards, vegetables) remain less compressed at $18 to $40 per acre.

Offsetting downward pressure, cumulative tariffs on Chinese drones reached 170 percent by April 2025. A DJI Agras T50 that sold for roughly $18,000 pre-tariff could effectively cost $25,000 or more post-tariff, narrowing the price gap with US-made alternatives.

---

## Section 6: Drone vs. Ground Rig vs. Airplane

**H2:** How drone rates compare to alternatives

| Method | Typical Rate | Best For | Weaknesses |
|---|---|---|---|
| Drone | $12 to $22/acre | Tall crops, wet fields, small/irregular fields, steep terrain, drift-sensitive borders | Slower than airplanes above 1,000 acres per day |
| Ground self-propelled sprayer | $9.35/acre (Iowa State 2026) | Flat fields under 6 ft crop height, pre-emerge applications | Cannot access wet fields or crops above 8 ft; causes 3 to 6 bu/acre compaction loss on tall corn |
| Manned airplane | $12/acre (Iowa State 2026) | Large fields above 1,000 acres, fast turnaround | Drift risk, minimum acreage requirements, no wet-field advantage |

Drones hold an advantage on fields under 500 acres, tall-crop applications where ground rigs damage yield, fields near sensitive crops requiring precision, and when soft soil blocks ground equipment.

[Compare in detail: Drone vs. Ground Rig](/comparisons/drone-vs-ground-rig) | [Drone vs. Airplane](/comparisons/drone-vs-airplane)

---

## Section 7: USDA Cost-Share That Reduces Your Net Cost

**H2:** USDA programs that lower what you actually pay

**EQIP Practice Code 595 (Precision Agriculture):** 40 to 90 percent cost-share on qualifying drone purchases. Available in most states. Beginning farmers, veteran farmers, and socially disadvantaged producers qualify for higher rates. Apply through your local NRCS field office during the state application window (typically November through January).

**EQIP Cover Crop Practice Standard 340:** $25 to $55 per acre for cover crop seeding, which often covers 50 to 70 percent of the total drone-seeded cost. Some states layer RCPP funding on top for 80 to 100 percent coverage.

**FSA Farm Loan Programs:** 2 to 7 year equipment loans for agricultural drones. 10 to 25 percent down, rates currently 6 to 9 percent depending on credit and program.

After EQIP cost-share, the effective net cost of drone cover crop seeding drops to $5 to $12 per acre in most states.

[Full USDA programs guide](/grants-and-subsidies)

---

## Section 8: FAQ (FAQPage schema)

**H2:** Pricing questions answered

**Q: What is the cheapest drone spraying rate in the US?**
A: The Iowa State 2026 Custom Rate Survey reported a low end of $8 per acre. Rates below $10 per acre are rare and typically found only on very large contiguous fields (500+ acres) in dense Corn Belt markets with multiple competing operators.

**Q: Why does vineyard and orchard spraying cost so much more?**
A: Three factors. Steep terrain and complex flight paths slow drone throughput. Higher carrier volumes (10 to 20 gallons per acre versus 2 to 5 for row crops) mean more refill stops. And 8 to 12 passes per season versus 1 to 2 for row crops multiplies the per-acre total.

**Q: Does the farmer or the operator supply the chemical?**
A: Most common arrangement is farmer-supplied chemical with operator providing application only. Some operators offer all-in pricing that includes chemical procurement, typically at a 10 to 20 percent markup. Cover crop seeding operators often supply seed as part of a combined rate.

**Q: Is it cheaper to buy my own drone or hire an operator?**
A: University of Missouri Extension research puts the break-even for drone ownership at approximately 980 acres per year of custom application work. Below 500 acres per year, hiring a custom operator is almost always cheaper. Above 1,500 acres per year, ownership is clearly more economical. Use our [ROI calculator](/tools/roi-calculator) to model your specific situation.

**Q: Do prices drop if I book multiple passes or a full season?**
A: Yes. Multi-pass season contracts typically reduce per-acre rates by 10 to 15 percent versus spot pricing. Vineyard and orchard growers who sign annual contracts in January or February often negotiate 15 to 20 percent below walk-up rates. Multi-year commitments with the same operator can drop rates further.

---

## Section 9: Find an Operator at These Rates

**H2:** Ready to get a quote?

Search our directory of {{operatorCount}}+ verified operators. Filter by state, crop, and service type. Contact operators directly with no booking fees.

[Search Operators](/operators) | [Browse by State](/states)

---

## Internal links from pricing page (20+)

- /tools/spray-cost-calculator
- /tools/roi-calculator
- /tools/coverage-calculator
- /regions/corn-belt
- /regions/great-plains
- /regions/mississippi-delta
- /regions/california
- /regions/southeast
- /crops/corn
- /crops/soybeans
- /crops/wheat
- /crops/cotton
- /crops/rice
- /crops/grapes
- /crops/orchards
- /comparisons/drone-vs-ground-rig
- /comparisons/drone-vs-airplane
- /grants-and-subsidies
- /operators
- /states
- /list-your-business

---

## Authority links (external)

- Iowa State Extension 2026 Custom Rate Survey: https://www.extension.iastate.edu/agdm/crops/pdf/a3-10.pdf
- University of Missouri Extension G1274 Breakeven Analysis: https://extension.missouri.edu/publications/g1274
- American Spray Drone Coalition: https://www.rantizo.com/our-network
- USDA NRCS EQIP: https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives

---

## Acceptance checklist

- [ ] Title tag <= 60 chars, primary keyword in first 40 chars
- [ ] Meta description <= 155 chars, contains specific number ($12)
- [ ] H1 unique, targets "drone spraying cost" intent with year
- [ ] AEO block: 3 sentences, 4 numbers, AI-citable
- [ ] Pricing tables cover: service type, region, crop, historical trend
- [ ] Minimum charges and hidden costs section (transparency builds trust)
- [ ] Drone vs. alternatives comparison table
- [ ] USDA cost-share section with specific dollar amounts
- [ ] FAQ with FAQPage schema, 5 Q&A
- [ ] 20+ internal links
- [ ] 4 external authority links
- [ ] Schema: Article + FAQPage + BreadcrumbList
- [ ] Author byline and last-reviewed date
- [ ] No double dashes, no em dashes, no Romanian
- [ ] Calculator CTAs embedded in natural reading positions
