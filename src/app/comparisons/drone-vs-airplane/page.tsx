import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'Are drones actually cheaper than airplanes now?',
    answer:
      'Nearly identical on average. Iowa State 2026: drones $12.50 per acre, airplanes $12.00 per acre. Drones are cheaper on small fields (under 500 acres) because airplane mobilization fees of $200 to $500 spread across fewer acres. Airplanes are cheaper on large acreage (above 1,000 acres) because of faster throughput.',
  },
  {
    question: 'Can a drone fleet match airplane throughput?',
    answer:
      'A 3 to 5 drone fleet approaches single-airplane throughput for fields under 1,000 acres. Above that, airplanes at 300 to 800 acres per hour still outpace even large drone fleets. The economics favor drones for multi-field routes with smaller individual fields.',
  },
  {
    question: 'Why are Delta rice operators switching to drones?',
    answer:
      'Drift control. Delta rice shares borders with dicamba-sensitive soybeans. Drones at 8 to 15 feet above canopy produce a tighter drift corridor than airplanes at 50 to 100 feet. Regulatory pressure on drift makes drones the lower-risk choice near sensitive crops.',
  },
  {
    question: 'Will drones replace crop duster airplanes?',
    answer:
      'Not entirely. Large-acreage applications on flat terrain will continue to favor airplanes on throughput economics. Drones are taking share on sub-500-acre fields, drift-sensitive applications, tall-crop fungicide, and steep terrain where airplanes are impractical. The two methods will coexist, with drones growing share annually.',
  },
];

const COMPARISON = [
  { factor: 'Application rate', drone: '$12.50/acre avg (Iowa State 2026)', airplane: '$12.00/acre avg (Iowa State 2026)' },
  { factor: 'Minimum acreage', drone: '10 to 25 acres', airplane: '100 to 320 acres' },
  { factor: 'Mobilization fee', drone: '$0 to $150', airplane: '$200 to $500+' },
  { factor: 'Throughput', drone: '40 to 60 acres/hr (single)', airplane: '300 to 800 acres/hr' },
  { factor: 'Carrier volume', drone: '2 to 5 gpa', airplane: '2 to 5 gpa' },
  { factor: 'Drift corridor', drone: '8 to 15 ft above canopy', airplane: '50 to 100 ft above canopy' },
  { factor: 'Wet field access', drone: 'Yes (no ground contact)', airplane: 'Yes (no ground contact)' },
  { factor: 'Night operations', drone: 'Part 107 compliant with lighting', airplane: 'Limited by pilot regulations' },
];

export const metadata: Metadata = {
  title: 'Drone Spraying vs Airplane: When Each Method Wins | Ag Drone Directory',
  description:
    'Drones cost $12.50/acre vs airplanes at $12/acre (Iowa State 2026). Drones win under 500 acres; airplanes win over 1,000. Full comparison.',
  alternates: { canonical: '/comparisons/drone-vs-airplane' },
  openGraph: {
    title: 'Drone Spraying vs Airplane: Which Is Right for Your Acreage?',
    description:
      'Iowa State 2026: drones $12.50/acre, airplanes $12.00/acre. Crossover at 500 to 1,000 acres. Drones take share on drift-sensitive and sub-500-acre fields.',
    url: `${SITE.domain}/comparisons/drone-vs-airplane`,
  },
};

export default function DroneVsAirplanePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Drone Spraying vs Airplane: Which Is Right for Your Acreage?',
    description:
      'The 2026 Iowa State Custom Rate Survey puts drone application at $12.50 per acre and manned aerial at $12.00 per acre. Drones win under 500 acres; airplanes win above 1,000 acres on throughput.',
    url: `${SITE.domain}/comparisons/drone-vs-airplane`,
    mainEntityOfPage: `${SITE.domain}/comparisons/drone-vs-airplane`,
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
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${SITE.domain}/comparisons` },
      { '@type': 'ListItem', position: 3, name: 'Drone vs Airplane', item: `${SITE.domain}/comparisons/drone-vs-airplane` },
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
        <Breadcrumb items={[{ label: 'Comparisons' }, { label: 'Drone vs Airplane' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Spraying vs Airplane: Which Is Right for Your Acreage?
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            The 2026 Iowa State Custom Rate Survey puts drone application at $12.50 per acre average and manned aerial spraying at $12.00 per acre, making the two methods nearly price-equivalent for the first time. Drones win on fields under 500 acres (airplane mobilization costs push per-acre pricing higher), near drift-sensitive borders, and in wet conditions. Airplanes win above 1,000 acres on throughput (300 to 800 acres per hour versus 40 to 60 for a single drone).
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">Cost comparison</h2>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Factor</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Drone</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Manned airplane</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COMPARISON.map((row) => (
                  <tr key={row.factor}>
                    <td className="px-3 py-2 font-medium text-gray-900">{row.factor}</td>
                    <td className="px-3 py-2 text-gray-700">{row.drone}</td>
                    <td className="px-3 py-2 text-gray-700">{row.airplane}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900">When drones win</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fields under 500 acres where airplane mobilization costs push per-acre rates above $14 to $16</li>
            <li>Near drift-sensitive borders (soybeans next to dicamba-sensitive crops)</li>
            <li>Small, odd-shaped levee fields (rice in the Delta)</li>
            <li>Steep terrain (vineyards, orchards)</li>
            <li>When you need next-day response without waiting for airplane scheduling</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">When airplanes win</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Large contiguous fields above 1,000 acres where throughput matters</li>
            <li>Time-critical windows covering thousands of acres in 1 to 2 days</li>
            <li>Very large ranch and rangeland applications</li>
            <li>When local airplane operators are established and competitively priced</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">The crossover point</h2>
          <p>
            Below 500 acres, drones are usually cheaper because airplane mobilization fees spread across fewer acres. Between 500 and 1,000 acres the two methods are competitive and the winner depends on local operator pricing and field layout. Above 1,000 acres airplanes usually win on per-acre throughput economics. The crossover is shifting lower each year as drone operator supply grows and per-acre rates compress. In markets with dense drone operator coverage (Iowa, Illinois, Nebraska) the crossover has already moved past 700 acres on split-field routes.
          </p>

          <h2 className="text-xl font-bold text-gray-900">The drift advantage</h2>
          <p>
            Drones fly 8 to 15 feet above the canopy versus airplanes at 50 to 100 feet. This dramatically reduces drift corridor width. In the Mississippi Delta, where rice and cotton fields border dicamba-sensitive soybeans, state regulators have tightened aerial drift rules every year. Drones hold drift within a tighter corridor, reducing contamination risk and regulatory exposure for the applicator. This is why Delta rice and cotton operators have moved toward drones for borders and sensitive-crop-adjacent passes even when the field itself is large enough for a plane.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Market trend</h2>
          <p>
            NAAA 2025 survey: 13 percent of aerial application operations now include UAS, up from 5 percent in 2024 (160 percent increase). American Spray Drone Coalition reported 10.3 million US acres sprayed by drones in 2024, roughly 2.5x the 2023 figure. Drones are not replacing airplanes entirely but are taking share steadily on sub-500-acre fields and drift-sensitive applications. The dominant model in the Midwest and Delta is now a mixed fleet: an ag aviation business running planes for large acreage and drones for borders, small fields, and makeup passes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone vs. airplane questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/crops/wheat" className="text-green-700 hover:underline">Wheat spraying guide</Link>
          <Link href="/crops/rice" className="text-green-700 hover:underline">Rice spraying guide</Link>
          <Link href="/regions/great-plains" className="text-green-700 hover:underline">Great Plains region</Link>
          <Link href="/regions/mississippi-delta" className="text-green-700 hover:underline">Mississippi Delta region</Link>
          <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">Spray cost calculator</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/comparisons/drone-vs-ground-rig" className="text-green-700 hover:underline">Drone vs. ground rig</Link>
          <Link href="/buyers-guide" className="text-green-700 hover:underline">Buyer&apos;s guide</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
