import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Ruler, Zap, Calendar, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { AUTHOR, SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Free Agricultural Drone Tools & Calculators',
  description:
    'Six free tools for farmers and drone operators. Calculate spray costs, compare drones, estimate coverage time, plan treatment timing, and more.',
  alternates: { canonical: '/tools' },
  openGraph: {
    type: 'website',
    title: 'Free Agricultural Drone Tools & Calculators',
    description:
      'Six free calculators covering spray cost estimation, buy vs hire ROI, field coverage time, acreage conversion, drone comparison, and seasonal treatment planning.',
    url: `${SITE.domain}/tools`,
  },
};

const FAQS = [
  {
    question: 'Are these tools free to use?',
    answer:
      'Yes, all six tools are completely free. No account, no email, no login required.',
  },
  {
    question: 'Where does the data come from?',
    answer:
      'Pricing data from the 2026 Iowa State Extension Custom Rate Survey, University of Missouri Extension G1274, and regional operator data. Drone specs from manufacturer sites (DJI, Hylio, XAG, Talos, Pyka). Treatment timing from university extension trial data (Iowa State, Purdue, Kansas State, University of Arkansas, UC Davis).',
  },
  {
    question: 'Can I use these tools on my phone?',
    answer:
      'Yes. All calculators are mobile-first, with touch-friendly inputs and responsive layouts that work on any screen size.',
  },
];

const tools = [
  {
    slug: 'spray-cost-calculator',
    name: 'Spray Cost Calculator',
    description: 'Estimate per-acre drone spraying cost by crop, state, and number of passes. Uses 2026 Iowa State Extension data.',
    icon: Calculator,
    color: 'green',
    badge: 'Most popular',
  },
  {
    slug: 'roi-calculator',
    name: 'Buy vs. Hire ROI Calculator',
    description: 'Compare owning a drone versus hiring an operator. Find your break-even acreage with USDA EQIP cost-share modeling.',
    icon: TrendingUp,
    color: 'emerald',
    badge: null,
  },
  {
    slug: 'coverage-calculator',
    name: 'Coverage Time Estimator',
    description: 'How long to spray your fields? Includes battery swaps, refill stops, and single-day feasibility for 7 drone models.',
    icon: Clock,
    color: 'orange',
    badge: null,
  },
  {
    slug: 'acreage-converter',
    name: 'Acreage Converter',
    description: 'Convert between acres, hectares, square feet, square meters, and sections instantly. Built for US agricultural work.',
    icon: Ruler,
    color: 'blue',
    badge: null,
  },
  {
    slug: 'drone-comparison',
    name: 'Drone Comparison Tool',
    description: 'Compare DJI Agras, Hylio AG-272, XAG P100 Pro, and Talos T60X specs, pricing, and NDAA status side by side.',
    icon: Zap,
    color: 'yellow',
    badge: null,
  },
  {
    slug: 'treatment-calendar',
    name: 'Treatment Calendar',
    description: 'When to book drone spraying for your crop in your state. Monthly windows with booking deadlines by region.',
    icon: Calendar,
    color: 'purple',
    badge: null,
  },
];

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-700 border-green-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function ToolsHubPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.domain}/tools` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Agricultural Drone Tools and Calculators',
    description:
      'Six free calculators for agricultural drone planning: spray cost estimation, buy vs hire ROI analysis, coverage time, acreage conversion, drone comparison, and seasonal treatment calendar.',
    url: `${SITE.domain}/tools`,
    numberOfItems: 6,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      description: t.description,
      url: `${SITE.domain}/tools/${t.slug}`,
    })),
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

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Agricultural Drone Tools & Calculators',
    description:
      'Six free calculators for agricultural drone planning covering spray cost, ROI, coverage time, acreage conversion, drone comparison, and treatment calendar.',
    url: `${SITE.domain}/tools`,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools' }]} />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Free Tools for Farmers and Drone Operators
        </h1>

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Six free calculators for agricultural drone planning: spray cost estimation using 2026 Iowa State Extension data, buy vs hire ROI analysis with USDA EQIP modeling, field coverage time estimation for 7 drone models, acreage unit conversion, side-by-side drone model comparison, and seasonal treatment calendar by crop and state.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${COLOR_MAP[tool.color]} border rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  {tool.badge && (
                    <span className="text-[11px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">{tool.description}</p>
                <span className="text-sm text-green-700 font-medium group-hover:underline flex items-center gap-1">
                  Open tool <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Questions about these tools</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Footer note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
          All calculators use 2025/2026 US market rates sourced from university extension surveys and verified operator data.
          Figures are estimates only. Contact verified operators via the{' '}
          <Link href="/operators" className="text-green-700 font-medium hover:underline">operator directory</Link>{' '}
          for binding quotes. For pricing benchmarks, see the{' '}
          <Link href="/pricing" className="text-green-700 font-medium hover:underline">pricing guide</Link>.
        </div>
      </div>
    </>
  );
}
