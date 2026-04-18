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
    question: 'Is drone spraying really as effective as a ground rig at lower carrier volume?',
    answer:
      'Yes. University trials show 2 to 5 gpa by drone matches 15 to 20 gpa by ground rig on yield response. Rotor downwash pushes droplets into the canopy, compensating for lower volume. The key is correct nozzle and droplet size per product label.',
  },
  {
    question: 'Why not just use a high-clearance sprayer on tall corn?',
    answer:
      'Even high-clearance sprayers cause wheel-track damage at VT stage. University of Minnesota research puts compaction loss at 3 to 6 bushels per acre on tall corn. The "free" ground pass costs $15 to $30 per acre in lost yield at $5/bushel corn.',
  },
  {
    question: 'Is the $3 to $9 per acre drone premium worth it?',
    answer:
      'On tall corn at VT/R1, yes. The yield savings from avoiding compaction more than offset the application premium. On short crops with dry field conditions, a ground rig is usually the better economic choice.',
  },
  {
    question: 'Can I use both drones and ground rigs on the same farm?',
    answer:
      'Yes, and many farmers do. Ground rig for pre-emerge and early-season when crops are short. Drone for VT/R1 fungicide when corn is tall and ground access causes damage. This hybrid approach optimizes cost per growth stage.',
  },
];

const COMPARISON = [
  { factor: 'Application rate', drone: '$12 to $18/acre', ground: '$9.35/acre (Iowa State 2026)' },
  { factor: 'Carrier volume', drone: '2 to 5 gpa', ground: '15 to 20 gpa' },
  { factor: 'Crop damage (tall corn)', drone: 'Zero', ground: '3 to 6 bu/acre from wheel tracks' },
  { factor: 'Wet field access', drone: 'Next day after rain', ground: '3 to 14 days wait' },
  { factor: 'Max crop height', drone: 'Unlimited (flies above)', ground: '6 to 8 ft clearance' },
  { factor: 'Throughput', drone: '40 to 60 acres/hr (single drone)', ground: '80 to 150 acres/hr' },
  { factor: 'Compaction', drone: 'Zero', ground: 'Measurable yield impact on heavy soils' },
];

export const metadata: Metadata = {
  title: 'Drone Spraying vs Ground Rig: Cost, Speed, Yield',
  description:
    'Drones cost $12 to $18/acre vs ground rigs at $9.35/acre. But ground rigs crush 3 to 6 bu/acre on tall corn. Full comparison with university data.',
  alternates: { canonical: '/comparisons/drone-vs-ground-rig' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Drone Spraying vs Ground Rig: Which Is Better for Your Fields?',
    description:
      'Ground rigs cost $9.35/acre but damage 3 to 6 bu/acre of tall corn. Drones at $12 to $18/acre cause zero compaction. Iowa State and MU Extension data.',
    url: `${SITE.domain}/comparisons/drone-vs-ground-rig`,
    siteName: SITE.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Drone Spraying vs Ground Rig',
      },
    ],
  },
};

export default function DroneVsGroundRigPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Drone Spraying vs Ground Rig: Which Is Better for Your Fields?',
    description:
      'Ground self-propelled sprayers cost $9.35/acre versus $12 to $18/acre for drone application, but ground rigs cause 3 to 6 bushels per acre of compaction loss on tall corn. Drones eliminate this at a $3 to $9 per acre premium.',
    url: `${SITE.domain}/comparisons/drone-vs-ground-rig`,
    mainEntityOfPage: `${SITE.domain}/comparisons/drone-vs-ground-rig`,
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
      { '@type': 'ListItem', position: 3, name: 'Drone vs Ground Rig', item: `${SITE.domain}/comparisons/drone-vs-ground-rig` },
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
        <Breadcrumb items={[{ label: 'Comparisons' }, { label: 'Drone vs Ground Rig' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Spraying vs Ground Rig: Which Is Better for Your Fields?
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Ground self-propelled sprayers cost $9.35 per acre (Iowa State 2026) versus $12 to $18 per acre for drone application. But ground rigs cause 3 to 6 bushels per acre of compaction and trampling loss on tall corn (University of Minnesota), cannot enter wet fields for days after rain and top out at 6 to 8 feet of crop clearance. Drones eliminate all three limitations at a $3 to $9 per acre premium.
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
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Ground rig</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COMPARISON.map((row) => (
                  <tr key={row.factor}>
                    <td className="px-3 py-2 font-medium text-gray-900">{row.factor}</td>
                    <td className="px-3 py-2 text-gray-700">{row.drone}</td>
                    <td className="px-3 py-2 text-gray-700">{row.ground}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900">When drones win</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Corn above 6 to 8 ft at VT/R1 tassel stage (the single largest drone use case)</li>
            <li>Wet fields after rain when ground rigs are stuck for days</li>
            <li>Fields near sensitive crops where drift from boom sprayers is a risk</li>
            <li>Small or irregular fields where ground rig turnarounds waste time</li>
            <li>Steep terrain (vineyards, orchards, hillsides)</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">When ground rigs win</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pre-emerge herbicide on bare soil (no height or access constraint)</li>
            <li>Fields under 6 ft crop height with dry conditions</li>
            <li>Very large flat fields above 500 acres where ground rig throughput advantage matters</li>
            <li>Burndown applications before planting</li>
            <li>When the farmer already owns the sprayer and marginal cost is fuel only</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">The yield math that changes the equation</h2>
          <p>
            At $5 per bushel corn and 4 bushels per acre of compaction loss from a ground rig pass at VT stage, the yield damage costs $20 per acre. Drone application at $15 per acre with zero compaction saves $5 per acre net versus a cheaper ground rig pass that costs $9.35 in application but $20 in yield loss. University of Minnesota research documents this compaction effect on mature corn canopy. The headline application rate is only half the cost picture; the lost-yield column is what tips the decision toward drones at VT/R1 fungicide timing.
          </p>

          <h2 className="text-xl font-bold text-gray-900">University research</h2>
          <p>
            Beck&apos;s Practical Farm Research (IA, IN, IL): drone-applied fungicide at 2 to 3 gpa matched ground rig at 15 to 20 gpa with a 5 to 8 bushel per acre yield response. Iowa State Extension confirms equivalence at the lower carrier volume. Purdue Extension confirms equivalence for soybeans. The conclusion across all three programs: drone spray efficacy matches ground rigs when the nozzle, droplet size and timing are correct per product label. Operators who fail in the field almost always fail on product labeling or calibration, not on platform choice.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone vs. ground rig questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/crops/corn" className="text-green-700 hover:underline">Corn spraying guide</Link>
          <Link href="/crops/soybeans" className="text-green-700 hover:underline">Soybean spraying guide</Link>
          <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">Spray cost calculator</Link>
          <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/comparisons/drone-vs-airplane" className="text-green-700 hover:underline">Drone vs. airplane</Link>
          <Link href="/buyers-guide" className="text-green-700 hover:underline">Buyer&apos;s guide</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
