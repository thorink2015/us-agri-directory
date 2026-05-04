import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle, ArrowRight, Calculator, Clock, DollarSign, Shield,
  ShieldCheck, MapPin, Sprout, Droplets, Map as MapIcon, Radar, Settings, ShoppingCart,
  Search, BarChart3, Ruler, GitCompare, CalendarDays,
} from 'lucide-react';
import HomepageNewsletterForm from '@/components/ui/HomepageNewsletterForm';
import { operators, getFeaturedOperators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { getServiceBySlug } from '@/data/services';
import { blogPosts } from '@/data/blog-posts';
import { getLatestGuides } from '@/data/guides';
import { SITE, organizationSchema, personSchema } from '@/data/author';
import SearchBar from '@/components/search/SearchBar';
import OperatorCard from '@/components/operators/OperatorCard';
import FAQAccordion from '@/components/ui/FAQAccordion';

const SERVICE_CARDS = [
  { slug: 'spraying', icon: Droplets, label: 'Drone Spraying', desc: 'Fungicides, herbicides, insecticides, defoliants', price: '$12 to $22/acre' },
  { slug: 'seeding', icon: Sprout, label: 'Cover Crop Seeding', desc: 'Broadcast cereal rye, ryegrass and clover blends', price: '$12 to $18/acre' },
  { slug: 'mapping', icon: MapIcon, label: 'Aerial Mapping', desc: 'NDVI maps, orthomosaics and prescription files', price: '$2 to $8/acre' },
  { slug: 'monitoring', icon: Radar, label: 'Crop Monitoring', desc: 'Pest pressure, disease, stress identification', price: '$3 to $10/acre' },
  { slug: 'spreading', icon: Settings, label: 'Granular Spreading', desc: 'Urea, gypsum, lime and cover crop seed', price: '$10 to $18/acre' },
  { slug: 'sales', icon: ShoppingCart, label: 'Drone Sales', desc: 'New and used ag drones from authorized dealers', price: '$18K to $75K' },
];

const TRUST_CARDS = [
  {
    title: 'Verified operators only',
    desc: "Every listed operator holds a valid FAA Part 107 certificate and Part 137 agricultural exemption. We confirm credentials so you don't have to chase paperwork.",
  },
  {
    title: 'Search by crop and location',
    desc: 'Filter operators by your state, county, crop type and service needed. Whether you grow corn in Iowa or grapes in Napa, find someone who knows your operation.',
  },
  {
    title: 'Transparent pricing',
    desc: 'See estimated per-acre rates before you reach out. No guessing, no surprise quotes. Know what drone spraying costs in your area before you pick up the phone.',
  },
  {
    title: 'Direct contact',
    desc: 'Reach operators directly by phone, email or web form. No intermediaries, no platform fees, no commission taken from either side.',
  },
];

const TOP_STATES = [
  { label: 'Iowa', slug: 'iowa' },
  { label: 'Texas', slug: 'texas' },
  { label: 'California', slug: 'california' },
  { label: 'Illinois', slug: 'illinois' },
  { label: 'Arkansas', slug: 'arkansas' },
  { label: 'Kansas', slug: 'kansas' },
];

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: 'Search your area',
    desc: 'Enter your state, county or zip code. Add your crop type and the service you need: fungicide spraying, cover crop seeding or aerial mapping.',
  },
  {
    icon: BarChart3,
    title: 'Compare operators',
    desc: 'Browse operator profiles side by side. Review equipment, certifications, coverage area, per-acre rates and farmer ratings.',
  },
  {
    icon: CheckCircle,
    title: 'Contact and book',
    desc: 'Reach out directly to operators that fit your needs. Request quotes, ask questions and schedule your application window.',
  },
];

const DRONE_CARDS = [
  { name: 'DJI Agras T50', tank: '40L', price: '$22K to $28K', ndaa: false, slug: 'dji-agras-t50' },
  { name: 'DJI Agras T100', tank: '100L', price: 'Contact dealer', ndaa: false, slug: 'dji-agras-t100' },
  { name: 'Hylio AG-272', tank: '68L', price: '$55K to $75K est.', ndaa: true, slug: 'hylio-ag-272' },
  { name: 'Talos T60X', tank: '50L', price: 'From $17,899', ndaa: null, slug: 'talos-t60x' },
];

const FAQS = [
  {
    question: 'How much does drone crop spraying cost per acre?',
    answer: 'Row crop applications (corn, soybeans, wheat) run $12 to $18 per acre for application only, with the farmer supplying the chemical. Vineyard and orchard work runs $18 to $35 per acre because of terrain and more passes per season. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average.',
  },
  {
    question: 'Is drone crop spraying legal in the United States?',
    answer: 'Yes. Commercial drone spraying requires three credentials: FAA Part 107 remote pilot certificate, FAA Part 137 agricultural aircraft operator certificate and a state commercial pesticide applicator license with aerial endorsement. Every operator in this directory holds all three.',
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
    title: 'Find Drone Spraying Near You | US Ag Drone Directory',
    description: `Search ${operatorCount}+ verified ag drone operators in all 50 states. Compare per-acre rates from $12, check FAA credentials and contact operators directly.`,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: 'Find Drone Spraying Services Near You | US Ag Drone Directory',
      description: `${operatorCount}+ verified ag drone operators across all 50 states. Compare rates and contact directly.`,
      url: SITE.domain,
      siteName: SITE.name,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'US Ag Drone Directory, Find Verified Agricultural Drone Operators Near You',
        },
      ],
    },
    other: {
      'impact-site-verification': '9797c758-df9e-4dff-9f78-73f66157b2d5',
      'fo-verify': '31657e9a-7be1-4648-8bec-7cab903551d5',
    },
  };
}

export default function HomePage() {
  const operatorCount = operators.length;
  const stateCount = new Set(operators.flatMap((op) => op.counties)).size;
  const featuredOperators = getFeaturedOperators().slice(0, 3);
  const topStatesByOps = counties
    .map((c) => ({ ...c, count: operators.filter((op) => op.counties.includes(c.slug)).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const latestBlogPosts = [...blogPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3);
  const latestGuide = getLatestGuides(1)[0];

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
            {operatorCount}+ verified ag drone operators listed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            Find a <span className="text-yellow-400">Drone Spraying Service</span>
            <br />Near Your Farm
          </h1>

          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Search verified ag drone operators across all 50 states. Compare services, check credentials and book the right pilot for your fields.
          </p>

          <SearchBar />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-green-200">
            <span className="text-green-300 font-medium">Top states:</span>
            {TOP_STATES.map((s, i) => (
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

      {/* SECTION 3: Stats Row */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: ShieldCheck, value: `${operatorCount}+`, label: 'Verified operators' },
              { icon: MapPin, value: stateCount.toString(), label: 'States covered' },
              { icon: Sprout, value: '10.3M+', label: 'Acres drone-sprayed in 2024' },
              { icon: DollarSign, value: '$12.50/acre', label: 'Iowa State 2026 avg rate' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <Icon className="w-6 h-6 text-green-600 mb-1" />
                  <div className="text-3xl font-bold text-green-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-gray-600 mt-6">
            Acreage: American Spray Drone Coalition. Pricing: Iowa State Extension 2026 Custom Rate Survey.
          </p>
        </div>
      </section>

      {/* SECTION 4: Why Farmers Use This Directory */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why farmers use this directory</h2>
          <p className="text-gray-500 text-center mb-10">Everything you need to find and hire the right drone applicator</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_CARDS.map((card) => (
              <div key={card.title} className="flex flex-col p-5 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Services */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Drone services for every operation</h2>
              <p className="text-gray-500 mt-1">From corn fungicide to vineyard treatments and aerial imaging</p>
            </div>
            <Link href="/services" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors whitespace-nowrap">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              const service = getServiceBySlug(card.slug);
              const displayName = service?.name ?? card.label;
              return (
                <Link
                  key={card.slug}
                  href={`/services/${card.slug}`}
                  className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-green-700 text-sm mb-1">{displayName}</div>
                    <div className="text-xs text-green-700 font-medium mb-1">{card.price}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{card.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: Crops */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Drone services by crop type</h2>
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

      {/* SECTION 7: Featured Operators */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured operators this season</h2>
              <p className="text-gray-500 mt-1">Verified, insured and actively booking</p>
            </div>
            <Link href="/operators" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors whitespace-nowrap">
              View all operators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredOperators.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: States */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Find drone services in your state</h2>
              <p className="text-gray-500 mt-1">Pick from the top states below or explore the full US map</p>
            </div>
            <Link href="/states" className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors whitespace-nowrap">
              All states <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            {topStatesByOps.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-semibold text-gray-900 group-hover:text-green-700">{state.name}</span>
                <span className="mt-1 text-xs text-gray-500">{state.count} operator{state.count === 1 ? '' : 's'}</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-green-200 text-green-700 font-semibold rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors"
            >
              <MapIcon className="w-4 h-4" /> Explore the map
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: How It Works */}
      <section className="py-14 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">How it works</h2>
          <p className="text-gray-500 text-center mb-12">Find the right drone applicator in 3 steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-green-200 z-0" />
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    Step {i + 1}
                  </div>
                  <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/operators"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Find an Operator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: Tools */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free tools for farmers and operators</h2>
          <p className="text-gray-500 mb-8">Instant calculators for spray cost, ROI, coverage time and more</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                href: '/tools/spray-cost-calculator',
                icon: DollarSign,
                title: 'Spray Cost Calculator',
                desc: 'Enter your acres, crop and state. Get an instant per-acre cost estimate with regional pricing data.',
              },
              {
                href: '/tools/roi-calculator',
                icon: Calculator,
                title: 'Buy vs Hire ROI Calculator',
                desc: 'Compare owning a drone versus hiring a custom operator. Includes USDA EQIP cost-share and financing scenarios.',
              },
              {
                href: '/tools/coverage-calculator',
                icon: Clock,
                title: 'Coverage Time Estimator',
                desc: 'How long will it take to spray your fields? Enter acres, drone model and application rate.',
              },
              {
                href: '/tools/acreage-converter',
                icon: Ruler,
                title: 'Acreage Converter',
                desc: 'Convert between acres, hectares, square meters and square feet. Quick field-size math for quotes and reports.',
              },
              {
                href: '/tools/drone-comparison',
                icon: GitCompare,
                title: 'Drone Comparison Tool',
                desc: 'Compare DJI Agras, Hylio, Talos and XAG models side by side on tank, price, NDAA status and throughput.',
              },
              {
                href: '/tools/treatment-calendar',
                icon: CalendarDays,
                title: 'Treatment Calendar',
                desc: 'Monthly spray windows for corn, soybeans, wheat, vineyards and orchards across US growing regions.',
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
                  <span className="mt-4 text-sm text-green-700 font-medium group-hover:underline">Use tool</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ */}
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

      {/* SECTION 12: Popular Drones */}
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
                    <span className="text-gray-600">Tank</span>
                    <span className="font-medium">{drone.tank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">{drone.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NDAA</span>
                    {drone.ndaa === true ? (
                      <span className="inline-flex items-center gap-0.5 text-blue-700 font-medium">
                        <Shield className="w-3 h-3" /> Yes
                      </span>
                    ) : drone.ndaa === false ? (
                      <span className="text-gray-500">No</span>
                    ) : (
                      <span className="text-gray-600">TBC</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: Blog */}
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

          {latestGuide && (
            <Link
              href={`/guides/${latestGuide.slug}`}
              className="group mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-green-200 rounded-xl p-5 hover:border-green-500 hover:shadow-sm transition-all"
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-green-700 mb-1">
                  New pillar guide
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-800 leading-snug">
                  {latestGuide.shortTitle}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {latestGuide.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 group-hover:underline whitespace-nowrap">
                Read the guide <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {latestBlogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <time className="text-xs text-gray-600">{post.publishedAt}</time>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 mt-1 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.description}</p>
                <span className="mt-3 inline-block text-xs text-green-700 font-medium group-hover:underline">Read more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: Newsletter */}
      <HomepageNewsletterForm />

      {/* SECTION 15: Operator CTA */}
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
    </>
  );
}
