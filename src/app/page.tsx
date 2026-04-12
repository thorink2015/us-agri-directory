import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'US Agricultural Drone Directory | Find Verified Drone Spraying Operators 2026',
  description:
    'The largest directory of agricultural drone operators in America. Find verified drone spraying, seeding, and mapping services across all 50 states. Compare rates and contact directly.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'US Agricultural Drone Directory | Find Drone Operators Near Your Farm',
    description: 'Verified ag drone operators in all 50 states. Compare rates, check FAA certifications, and book the right pilot for your fields.',
    url: 'https://usagdronedirectory.com',
  },
};
import {
  ArrowRight, MapPin, CheckCircle, Sprout, BarChart3, Plane, Leaf,
  Droplets, Eye, Map, Search,
} from 'lucide-react';
import { getFeaturedOperators, operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { pricingFAQs, generalFAQs } from '@/data/faqs';
import OperatorCard from '@/components/operators/OperatorCard';
import CountyCard from '@/components/counties/CountyCard';
import SearchBar from '@/components/search/SearchBar';
import FAQAccordion from '@/components/ui/FAQAccordion';
import HomeSchema from '@/components/schema/HomeSchema';
import NewsletterCTA from '@/components/ui/NewsletterCTA';

const services = [
  { icon: Droplets, name: 'Drone Spraying', desc: 'Fungicides, herbicides, insecticides, defoliants', href: '/servicii/spraying' },
  { icon: Leaf, name: 'Cover Crop Seeding', desc: 'Broadcast cereal rye, ryegrass, and clover blends', href: '/servicii/seeding' },
  { icon: Map, name: 'Aerial Mapping', desc: 'NDVI maps, orthomosaics, and prescription files', href: '/servicii/mapping' },
  { icon: Eye, name: 'Crop Scouting', desc: 'Pest pressure, disease, hail damage identification', href: '/servicii/monitoring' },
  { icon: Sprout, name: 'Fertilizer Application', desc: 'Granular and foliar nutrient application', href: '/servicii/spreading' },
  { icon: Plane, name: 'Emergency Response', desc: '24–48 hour mobilization for urgent applications', href: '/servicii/emergency' },
];

const howItWorks = [
  {
    step: '01',
    icon: Search,
    title: 'Search your area',
    desc: 'Enter your state, county, or zip code. Add your crop type and the service you need — fungicide spraying, cover crop seeding, or aerial mapping.',
  },
  {
    step: '02',
    icon: BarChart3,
    title: 'Compare operators',
    desc: 'Browse operator profiles side by side. Review equipment, certifications, coverage area, per-acre rates, and farmer ratings.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Contact and book',
    desc: 'Reach out directly to operators that fit your needs. Request quotes, ask questions, and schedule your application window.',
  },
];

export default function HomePage() {
  const featured = getFeaturedOperators();
  const totalAcres = operators.reduce((sum, op) => sum + (op.haTreated || 0), 0);
  const topStates = counties.slice(0, 12);
  const allFaqs = [...pricingFAQs.slice(0, 2), ...generalFAQs.slice(0, 3)];

  return (
    <>
      <HomeSchema />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <CheckCircle className="w-4 h-4 text-yellow-400" />
            {operators.filter((op) => op.verified).length} verified ag drone operators listed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
            Find a
            <span className="text-yellow-400"> Drone Spraying Service</span>
            <br />Near Your Farm
          </h1>

          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Search verified ag drone operators across all 50 states. Compare services, check credentials, and book the right pilot for your fields.
          </p>

          <SearchBar />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-green-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {operators.length}+ operators listed
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-400" />
              All 50 states covered
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-green-400" />
              {(totalAcres / 1000).toFixed(0)}K+ acres serviced
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${operators.length}+`, label: 'Verified operators', icon: Plane },
              { value: '50', label: 'States covered', icon: MapPin },
              { value: `${(totalAcres / 1000).toFixed(0)}K+`, label: 'Acres serviced', icon: Sprout },
              { value: '$12–$18', label: 'Typical per-acre rate', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-6 h-6 text-green-600 mb-1" />
                <div className="text-3xl font-bold text-green-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why farmers use this directory */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Why farmers use this directory</h2>
          <p className="text-gray-500 text-center mb-10">Everything you need to find and hire the right drone applicator</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Verified operators only', desc: 'Every listed operator holds a valid FAA Part 107 certificate and Part 137 agricultural exemption. We confirm credentials so you don\'t have to chase paperwork.' },
              { title: 'Search by crop and location', desc: 'Filter operators by your state, county, crop type, and service needed. Whether you grow corn in Iowa or grapes in Napa, find someone who knows your operation.' },
              { title: 'Transparent pricing', desc: 'See estimated per-acre rates before you reach out. No guessing, no surprise quotes. Know what drone spraying costs in your area before you pick up the phone.' },
              { title: 'Direct contact', desc: 'Reach operators directly by phone, email, or web form. No intermediaries, no platform fees, no commission taken from either side.' },
            ].map((b) => (
              <div key={b.title} className="flex flex-col p-5 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Drone services for every operation</h2>
          <p className="text-gray-500 text-center mb-8">From corn fungicide to vineyard treatments and aerial imaging</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  href={s.href}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all text-center group"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 group-hover:text-green-700 transition-colors">
                    {s.name}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block leading-tight">{s.desc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured operators */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured operators this season</h2>
              <p className="text-gray-500 mt-1">Verified, insured, and actively booking</p>
            </div>
            <Link
              href="/operatori"
              className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors"
            >
              View all operators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </div>
      </section>

      {/* Crops */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Drone services by crop type</h2>
              <p className="text-gray-500 mt-1">Find operators with hands-on experience in your production system</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {crops.map((crop) => (
              <Link
                key={crop.slug}
                href={`/culturi/${crop.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl">{crop.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-green-700 text-sm">
                    {crop.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${crop.priceMinUsd}–${crop.priceMaxUsd}/acre
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Find drone services in your state</h2>
              <p className="text-gray-500 mt-1">Operators active in all 50 states</p>
            </div>
            <Link
              href="/judete"
              className="flex items-center gap-1 text-green-700 font-medium text-sm hover:text-green-800 transition-colors"
            >
              All states <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {topStates.map((state) => (
              <CountyCard key={state.slug} county={state} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">How it works</h2>
          <p className="text-gray-500 text-center mb-12">Find the right drone applicator in 3 steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-green-200 z-0" />

            {howItWorks.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
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
              href="/operatori"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Find an Operator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA variant="ro" />

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Common questions about drone spraying</h2>
          <p className="text-gray-500 text-center mb-8">Straight answers for farmers and operators</p>
          <FAQAccordion faqs={allFaqs} />
          <div className="text-center mt-6">
            <Link
              href="/preturi-pulverizare-drona"
              className="text-green-700 font-medium text-sm hover:underline"
            >
              View the complete pricing guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Operator signup CTA */}
      <section className="py-14 bg-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Grow your drone business. Get listed free.</h2>
          <p className="text-green-100 mb-4 leading-relaxed">
            If you operate an ag drone spraying, seeding, or mapping business, this directory puts you in front of farmers actively searching for your services.
          </p>
          <ul className="text-green-100 text-sm mb-8 space-y-1">
            <li>✓ Free basic listing with unlimited profile edits</li>
            <li>✓ Verified badge after FAA credential review</li>
            <li>✓ Featured placement available for your state pages</li>
          </ul>
          <Link
            href="/adauga-operator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-colors"
          >
            Create Your Free Listing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
