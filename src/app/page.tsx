import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Calculator, Clock, DollarSign, Shield } from 'lucide-react';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { services } from '@/data/services';
import { AUTHOR, SITE, organizationSchema, personSchema } from '@/data/author';
import SearchBar from '@/components/search/SearchBar';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';

const LAST_REVIEWED = '2026-04-16';
const TIER1_STATES = new Set(['iowa', 'illinois', 'indiana', 'texas', 'california', 'arkansas', 'kansas', 'nebraska', 'ohio', 'north-carolina']);

const SERVICE_SLUGS = ['spraying', 'seeding', 'mapping', 'monitoring', 'spreading', 'sales'];

const DRONE_CARDS = [
  { name: 'DJI Agras T50', tank: '40L', price: '$22K to $28K', ndaa: false, slug: 'dji-agras-t50' },
  { name: 'DJI Agras T100', tank: '100L', price: 'Contact dealer', ndaa: false, slug: 'dji-agras-t100' },
  { name: 'Hylio AG-272', tank: '68L', price: '$55K to $75K est.', ndaa: true, slug: 'hylio-ag272' },
  { name: 'Talos T60X', tank: '50L', price: 'From $17,899', ndaa: null, slug: 'talos-t60x' },
];

const FAQS = [
  {
    question: 'How much does drone crop spraying cost per acre?',
    answer: 'Row crop applications (corn, soybeans, wheat) run $12 to $18 per acre for application only, with the farmer supplying the chemical. Vineyard and orchard work runs $18 to $35 per acre because of terrain and more passes per season. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average.',
  },
  {
    question: 'Is drone crop spraying legal in the United States?',
    answer: 'Yes. Commercial drone spraying requires three credentials: FAA Part 107 remote pilot certificate, FAA Part 137 agricultural aircraft operator certificate, and a state commercial pesticide applicator license with aerial endorsement. Every operator in this directory holds all three.',
  },
  {
    question: 'How many acres can a drone spray per day?',
    answer: 'A single DJI Agras T50 covers 40 to 60 acres per flight hour, or 300 to 600 acres per day. Two-drone crews hit 600 to 1,000 acres per day during peak season. The DJI Agras T100 at 100 liters per flight pushes daily throughput higher on large contiguous fields.',
  },
  {
    question: 'Does USDA offer cost-share for drone spraying or drone purchases?',
    answer: 'Yes. USDA NRCS EQIP Practice Code 595 (Precision Agriculture) offers 40 to 90 percent cost-share on qualifying drone purchases. Cover crop seeding by drone qualifies under Practice Standard 340 at $25 to $55 per acre. Beginning farmers and socially disadvantaged producers qualify for higher rates.',
  },
  {
    question: 'How far ahead should I book a drone operator?',
    answer: 'Corn fungicide in July: book 4 to 6 weeks out. Wheat heading in June: book in April. Full-season vineyard and orchard contracts: sign in January or February. Cover crop seeding: book by late July for September slots.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const operatorCount = operators.length;
  return {
    title: 'Find Drone Spraying Services Near You | US Ag Drone Directory',
    description: `Search ${operatorCount}+ verified ag drone operators in all 50 states. Compare per-acre rates from $12, check FAA credentials, and contact operators directly.`,
    alternates: { canonical: '/' },
    openGraph: {
      title: 'Find Drone Spraying Services Near You | US Ag Drone Directory',
      description: `${operatorCount}+ verified ag drone operators across all 50 states. Compare rates and contact directly.`,
      url: SITE.domain,
    },
  };
}

export default function HomePage() {
  const operatorCount = operators.length;
  const stateCount = new Set(operators.flatMap((op) => op.counties)).size;

  const featuredServices = SERVICE_SLUGS
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  // Group counties by region for the state grid
  const regionMap = new Map<string, typeof counties>();
  for (const county of counties) {
    const list = regionMap.get(county.region) ?? [];
    list.push(county);
    regionMap.set(county.region, list);
  }
  const opsByState = Object.fromEntries(
    counties.map((c) => [c.slug, operators.filter((op) => op.counties.includes(c.slug)).length])
  );

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.domain}/operators?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* SECTION 1: Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            {operatorCount} verified operators | {stateCount} states
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            Drone Spraying Services<br />
            <span className="text-yellow-400">Across All 50 States</span>
          </h1>

          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            The US directory of verified agricultural drone operators. Search by state, crop, or service type. Every operator listed holds FAA Part 107 and Part 137 credentials. No booking fees, no commissions. Contact operators directly.
          </p>

          <SearchBar />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-green-200">
            <span className="text-green-300 font-medium">Top states:</span>
            {[
              { label: 'Iowa', slug: 'iowa' },
              { label: 'Texas', slug: 'texas' },
              { label: 'California', slug: 'california' },
              { label: 'Illinois', slug: 'illinois' },
              { label: 'Arkansas', slug: 'arkansas' },
              { label: 'Kansas', slug: 'kansas' },
            ].map((s, i) => (
              <span key={s.slug} className="flex items-center gap-x-3">
                {i > 0 && <span className="text-green-600">|</span>}
                <Link href={`/states/${s.slug}`} className="hover:text-white underline underline-offset-2">
                  {s.label}
                </Link>
              </span>
            ))}
            <span className="text-green-600">|</span>
            <Link href="/states" className="hover:text-white underline underline-offset-2">
              View all states
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: AEO Block */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              US agricultural drone spraying covered an estimated 10.3 million acres in 2024, with per-acre rates ranging from $12 on flat Midwest row crops to $35 on California hillside vineyards. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average for drone application. This directory lists {operatorCount}+ operators across all 50 states with FAA Part 107 and Part 137 credentials verified.
            </p>
          </div>
          <Byline lastUpdated={LAST_REVIEWED} />
        </div>
      </section>

      {/* SECTION 3: Stats Row */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${operatorCount}+`, label: 'Verified operators' },
              { value: stateCount.toString(), label: 'States covered' },
              { value: '10.3M+', label: 'Acres drone-sprayed in 2024' },
              { value: '$12.50/acre', label: 'Iowa State 2026 avg rate' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="text-3xl font-bold text-green-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Acreage: American Spray Drone Coalition. Pricing: Iowa State Extension 2026 Custom Rate Survey.
          </p>
        </div>
      </section>

      {/* SECTION 4: Browse by State */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Find drone operators in your state</h2>
              <p className="text-gray-500 mt-1">Active operators in all 50 states</p>
            </div>
            <Link href="/states" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors">
              All states <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-6">
            {Array.from(regionMap.entries()).map(([region, states]) => (
              <div key={region}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{region}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {states.map((state) => {
                    const count = opsByState[state.slug] ?? 0;
                    const isTier1 = TIER1_STATES.has(state.slug);
                    return (
                      <Link
                        key={state.slug}
                        href={`/states/${state.slug}`}
                        className={`relative flex flex-col items-center p-2 rounded-lg border text-center hover:border-green-400 hover:bg-green-50 transition-colors ${isTier1 ? 'border-green-200 bg-green-50/50' : 'border-gray-200 bg-white'}`}
                      >
                        <span className={`text-xs font-medium leading-tight ${isTier1 ? 'text-green-800' : 'text-gray-700'}`}>{state.name}</span>
                        {count > 0 && (
                          <span className={`mt-1 text-xs px-1.5 py-0.5 rounded-full ${count >= 10 ? 'bg-green-600 text-white' : count >= 5 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'}`}>
                            {count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Browse by Service */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Agricultural drone services</h2>
              <p className="text-gray-500 mt-1">From row crop fungicide to vineyard treatments and precision mapping</p>
            </div>
            <Link href="/services" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <div className="text-3xl flex-shrink-0">{s.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-700 text-sm mb-1">{s.name}</div>
                  <div className="text-xs text-green-700 font-medium mb-1">
                    ${s.priceMinUsd}{s.priceMaxUsd ? ` to $${s.priceMaxUsd}` : '+'}/{s.priceUnit ?? 'acre'}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">{s.description.slice(0, 90)}...</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Browse by Crop */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Operators by crop</h2>
          <p className="text-gray-500 mb-8">Find operators with hands-on experience in your production system</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {crops.map((crop) => {
              const months = crop.treatmentMonths;
              const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const window = months.length >= 2
                ? `${monthNames[months[0] - 1]} to ${monthNames[months[months.length - 1] - 1]}`
                : monthNames[months[0] - 1];
              return (
                <Link
                  key={crop.slug}
                  href={`/crops/${crop.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{crop.icon}</span>
                    <span className="font-semibold text-sm text-gray-900 group-hover:text-green-700">{crop.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{window}</div>
                  <div className="text-xs text-green-700 font-medium">${crop.priceMinUsd} to ${crop.priceMaxUsd}/acre</div>
                  <div className="mt-2 text-xs text-green-700 group-hover:underline">Find operators</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: Tools */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free tools for farmers and operators</h2>
          <p className="text-gray-500 mb-8">Instant calculators for spray cost, ROI, and coverage time</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                href: '/tools/spray-cost-calculator',
                icon: DollarSign,
                title: 'Spray Cost Calculator',
                desc: 'Enter your acres, crop, and state. Get an instant per-acre cost estimate with regional pricing data.',
              },
              {
                href: '/tools/roi-calculator',
                icon: Calculator,
                title: 'Buy vs. Hire ROI Calculator',
                desc: 'Compare owning a drone versus hiring a custom operator. Includes USDA EQIP cost-share and financing scenarios.',
              },
              {
                href: '/tools/coverage-calculator',
                icon: Clock,
                title: 'Coverage Time Estimator',
                desc: 'How long will it take to spray your fields? Enter acres, drone model, and application rate.',
              },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col p-6 bg-green-50 border border-green-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{tool.desc}</p>
                  <span className="mt-4 text-sm text-green-700 font-medium group-hover:underline">Open tool</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Common questions about drone spraying</h2>
          <p className="text-gray-500 text-center mb-8">Straight answers for farmers and operators</p>
          <FAQAccordion faqs={FAQS} />
          <div className="text-center mt-6">
            <Link href="/pricing" className="text-green-700 font-medium text-sm hover:underline">
              View the complete pricing guide
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: Popular Drones */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Agricultural spray drones</h2>
              <p className="text-gray-500 mt-1">The most common models in US commercial ag drone fleets</p>
            </div>
            <Link href="/drones" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors">
              All drones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {DRONE_CARDS.map((drone) => (
              <Link
                key={drone.slug}
                href={`/drones/${drone.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-sm text-gray-900 group-hover:text-green-700 mb-3">{drone.name}</div>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tank</span>
                    <span className="font-medium">{drone.tank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium">{drone.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">NDAA</span>
                    {drone.ndaa === true ? (
                      <span className="inline-flex items-center gap-0.5 text-blue-700 font-medium">
                        <Shield className="w-3 h-3" /> Yes
                      </span>
                    ) : drone.ndaa === false ? (
                      <span className="text-gray-500">No</span>
                    ) : (
                      <span className="text-gray-400">TBC</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Blog */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Guides and news</h2>
              <p className="text-gray-500 mt-1">Research-backed resources for farmers and operators</p>
            </div>
            <Link href="/blog" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors">
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: '/pricing', title: '2026 Drone Spraying Pricing Guide', date: '2026-04-01', excerpt: 'Per-acre rates by crop, state, and service type. Includes Iowa State Extension Custom Rate Survey data.' },
              { href: '/regulations/faa-part-137', title: 'How to Get FAA Part 137 for Drone Spraying', date: '2026-03-15', excerpt: 'Step-by-step guide to the FAA Part 137 Agricultural Aircraft Operator Certificate for drone applicators.' },
              { href: '/start-a-drone-business', title: 'How to Start a Drone Spraying Business', date: '2026-02-20', excerpt: 'Licensing, equipment costs, insurance, and first-season pricing for new ag drone operators.' },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <time className="text-xs text-gray-400">{post.date}</time>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 mt-1 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                <span className="mt-3 inline-block text-xs text-green-700 font-medium group-hover:underline">Read more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: Operator CTA */}
      <section className="py-14 bg-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Are you a drone operator?</h2>
          <p className="text-green-100 mb-6 leading-relaxed">
            List your business for free. Reach farmers searching for drone services in your state. No commission, no booking fee.
          </p>
          <ul className="text-green-100 text-sm mb-8 space-y-1">
            <li><CheckCircle className="inline w-4 h-4 mr-1.5 text-green-300" />Free basic listing with unlimited profile edits</li>
            <li><CheckCircle className="inline w-4 h-4 mr-1.5 text-green-300" />Verified badge after FAA credential review</li>
            <li><CheckCircle className="inline w-4 h-4 mr-1.5 text-green-300" />Featured placement available for your state pages</li>
          </ul>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-colors"
          >
            List Your Business <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SECTION 12: Footer byline */}
      <div className="bg-white border-t border-gray-100 py-4">
        <p className="text-center text-xs text-gray-400">
          Edited by {AUTHOR.fullName}. Every page personally researched and updated. Last reviewed {LAST_REVIEWED}.
        </p>
      </div>
    </>
  );
}
