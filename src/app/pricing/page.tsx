import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';

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
    title: 'Drone Spraying Cost Per Acre (2026 Rates) | Ag Drone Directory',
    description: 'Drone crop spraying costs $12 to $35 per acre in 2026. See rates by crop, region, and service type. First university benchmark: $12.50/acre from Iowa State.',
    alternates: { canonical: '/pricing' },
    openGraph: {
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

        {/* Sections 2-9 continue below. Rendered in batch 2. */}

        {/* Author card */}
        <AuthorCard />
      </div>
    </>
  );
}
