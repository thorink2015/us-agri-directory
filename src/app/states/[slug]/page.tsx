import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Wheat, TrendingUp, Users, Shield, DollarSign } from 'lucide-react';
import { Metadata } from 'next';
import { counties, getCountyBySlug, getAdjacentCounties, getCountyOperatorCount } from '@/data/counties';
import { getOperatorsByCounty } from '@/data/operators';
import { CROP_NAME_MAP, crops as allCrops } from '@/data/crops';
import { buildCountyMetadata } from '@/lib/seo';
import { formatAcres } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';
import CountyPageSchema from '@/components/schema/CountyPageSchema';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { getStateData } from '@/data/states';
import { AUTHOR, SITE } from '@/data/author';

import { addUtm } from '@/lib/utm';
interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return counties.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rich = getStateData(params.slug);
  if (rich) {
    return {
      title: `Drone Spraying in ${rich.name}: Rates & Operators 2026`,
      description: `${rich.aeoBlock.slice(0, 155)}`,
      alternates: { canonical: `/states/${rich.slug}` },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'US Ag Drone Directory',
        title: `Agricultural Drone Spraying in ${rich.name} (2026)`,
        description: `Licensing, rates, top crops and verified operators for ${rich.name}. ${rich.rateRange} per acre.`,
        url: `${SITE.domain}/states/${rich.slug}`,
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: `Agricultural Drone Spraying in ${rich.name}`,
          },
        ],
      },
    };
  }
  const county = getCountyBySlug(params.slug);
  if (!county) return {};
  const count = getCountyOperatorCount(params.slug);
  return buildCountyMetadata(county, count);
}

// ─── Rich template for proof states (Iowa, Texas, California) ────────────────

function RichStatePage({ slug }: { slug: string }) {
  const data = getStateData(slug)!;
  const ops = getOperatorsByCounty(slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Drone Spraying in ${data.name}: Licensing, Rates & Operators (2026)`,
    description: data.aeoBlock,
    url: `${SITE.domain}/states/${slug}`,
    mainEntityOfPage: `${SITE.domain}/states/${slug}`,
    datePublished: '2026-01-01',
    dateModified: data.lastReviewedAt,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${SITE.domain}/states` },
      { '@type': 'ListItem', position: 3, name: data.name, item: `${SITE.domain}/states/${slug}` },
    ],
  };

  const itemListSchema = ops.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Drone Operators in ${data.name}`,
        numberOfItems: ops.length,
        itemListElement: ops.map((op, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: op.name,
          url: `${SITE.domain}/operators/${op.slug}`,
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1, Breadcrumb + H1 + Byline */}
        <Breadcrumb items={[{ label: 'States', href: '/states' }, { label: data.name }]} />

        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <Link href={`/regions/${data.regionSlug}`} className="hover:underline">{data.regionName}</Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Spraying in {data.name}: Licensing, Rates &amp; Operators (2026)
        </h1>

        <Byline lastUpdated={data.lastReviewedAt} />

        {/* 2, AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">{data.aeoBlock}</p>
        </div>

        {/* 3, Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, value: ops.length > 0 ? `${ops.length}` : '0', label: 'Listed operators' },
            { icon: DollarSign, value: data.statsRate, label: 'Rate range / acre' },
            { icon: Wheat, value: data.statsTopCrop, label: 'Top crop' },
            { icon: Shield, value: data.licensingAgency, label: 'Licensing agency' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm truncate">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 4, Operator grid */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Drone operators serving {data.name}
          </h2>

          {ops.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ops.map((op) => (
                  <OperatorCard key={op.slug} operator={op} />
                ))}
              </div>
              <div className="mt-5 text-right">
                <Link
                  href={`/states/${slug}/operators`}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View all operators in {data.name} &rarr;
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800 font-medium mb-2">No operators listed in {data.name} yet</p>
              <p className="text-amber-700 text-sm mb-4">
                Many operators service multiple states and travel. Check neighboring states or list your business.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/states/${slug}/operators`} className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                  {data.name} operators page
                </Link>
                <Link href="/list-your-business" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                  List your business free
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* 5, Spray windows / rates table */}
        {data.sprayWindows.length > 0 && <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            2026 spray windows and rates in {data.name}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Crop / service</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate ($/acre)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Window</th>
                </tr>
              </thead>
              <tbody>
                {data.sprayWindows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{row.crop}</td>
                    <td className="px-4 py-3 text-gray-700">{row.rateRange}</td>
                    <td className="px-4 py-3 text-gray-600">{row.window}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Application only. Chemical cost is additional. Rates based on 2026 operator surveys and university extension data.{' '}
            <Link href="/tools/spray-cost-calculator" className="text-green-700 underline">Use the calculator for a detailed estimate →</Link>
          </p>
        </section>}

        {/* 6, Licensing section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Drone spraying licensing in {data.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Licensing agency</div>
              <div className="font-semibold text-gray-900 text-sm">{data.licensingAgency}</div>
              <Link href={addUtm(data.licensingAgencyUrl, "authority_link")} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 hover:underline mt-1 block">
                Official site →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Aerial category</div>
              <div className="font-semibold text-gray-900 text-sm">{data.aerialCategory}</div>
              <div className="text-xs text-gray-500 mt-1">{data.examsRequired}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Renewal &amp; CE</div>
              <div className="font-semibold text-gray-900 text-sm">{data.renewalCycle}</div>
              <div className="text-xs text-gray-500 mt-1">{data.ceRequirements}</div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700 mb-5">
            {data.licensingDetails.split('\n\n').map((para, i) => (
              <p key={i} className="mb-3 leading-relaxed">{para}</p>
            ))}
          </div>

          {data.uniqueRules.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {data.name}-specific rules operators must know
              </h3>
              <ul className="space-y-2">
                {data.uniqueRules.map((rule, i) => (
                  <li key={i} className="flex gap-2 text-sm text-amber-800">
                    <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.reciprocityStates.length > 0 && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl">
              <div className="text-sm font-medium text-gray-700 mb-1">Reciprocity states</div>
              <div className="text-sm text-gray-600">{data.reciprocityStates.join(', ')}</div>
            </div>
          )}
        </section>

        {/* 7, Top crops */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top crops for drone spraying in {data.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.topCrops.map((crop) => (
              <div key={crop.slug} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-1">
                  {CROP_NAME_MAP[crop.slug]
                    ? <Link href={`/crops/${crop.slug}`} className="hover:text-green-700">{crop.name}</Link>
                    : crop.name
                  }
                </div>
                <div className="text-xs text-green-700 font-medium mb-2">{crop.acreage}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{crop.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7b, All crop guides in this state */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone spraying guides by crop in {data.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {allCrops.map((crop) => (
              <Link
                key={crop.slug}
                href={`/states/${slug}/crops/${crop.slug}`}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {crop.name} in {data.name}
              </Link>
            ))}
          </div>
        </section>

        {/* 8, Region link */}
        <section className="mb-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs text-green-700 font-medium mb-0.5">Region</div>
              <div className="font-bold text-gray-900">{data.regionName}</div>
              <p className="text-sm text-gray-600 mt-1">
                {data.name} is part of the {data.regionName} agricultural region. See rates, crops and operators across the region.
              </p>
            </div>
            <Link
              href={`/regions/${data.regionSlug}`}
              className="shrink-0 px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              Explore {data.regionName} →
            </Link>
          </div>
        </section>

        {/* 9, FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone spraying in {data.name}, frequently asked questions</h2>
          <FAQAccordion faqs={data.faqs} />
        </section>

        {/* 10, CTA */}
        <section className="mb-10">
          <div className="bg-gray-900 text-white rounded-xl p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <div className="font-bold text-lg mb-1">Find a drone operator in {data.name}</div>
              <p className="text-gray-300 text-sm">Get quotes from verified operators. Free, no obligation.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/operators" className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-semibold transition-colors">
                Search operators
              </Link>
              <Link href="/list-your-business" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg text-sm font-semibold transition-colors">
                List your business
              </Link>
            </div>
          </div>
        </section>

        {/* 11, Internal links */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Neighboring states</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {data.neighboringStates.map((neighborSlug) => {
              const county = getCountyBySlug(neighborSlug);
              return (
                <Link
                  key={neighborSlug}
                  href={`/states/${neighborSlug}`}
                  className="text-center p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-all text-sm font-medium text-gray-700"
                >
                  {county ? county.name : neighborSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {data.topCrops.map((crop) =>
              CROP_NAME_MAP[crop.slug] ? (
                <Link key={crop.slug} href={`/crops/${crop.slug}`} className="text-green-700 hover:underline">
                  {crop.name} spraying →
                </Link>
              ) : null
            )}
            <Link href={`/regions/${data.regionSlug}`} className="text-green-700 hover:underline">{data.regionName} region →</Link>
            <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide →</Link>
            <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">Spray cost calculator →</Link>
            <Link href="/tools/treatment-calendar" className="text-green-700 hover:underline">Treatment calendar →</Link>
            {data.authorityLinks.map((link) => (
              <a key={link.url} href={addUtm(link.url, "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                {link.label} →
              </a>
            ))}
          </div>
        </section>

        <div className="mt-4">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}

// ─── Fallback template for non-proof states (uses counties.ts) ───────────────

function FallbackStatePage({ slug }: { slug: string }) {
  const state = getCountyBySlug(slug)!;
  const ops = getOperatorsByCounty(state.slug);
  const adjacent = getAdjacentCounties(state, 5);
  const cropNames = state.mainCrops.map((c) => CROP_NAME_MAP[c] || c);

  const faqs = [
    {
      question: `How many drone operators serve ${state.name}?`,
      answer: ops.length > 0
        ? `There are currently ${ops.length} verified agricultural drone operator${ops.length !== 1 ? 's' : ''} listed for ${state.name}: ${ops.map((o) => o.name).join(', ')}. Contact them directly for quotes and availability.`
        : `We don't have any operators listed specifically in ${state.name} yet. Many operators service multiple states. Check neighboring states or list your business if you're a local operator.`,
    },
    {
      question: `How much does drone spraying cost in ${state.name}?`,
      answer: `Drone spraying rates in ${state.name} are in line with the national average of $12 to $18 per acre for application only. Rates vary based on field size, terrain and crop type. Contact listed operators for exact quotes.`,
    },
    {
      question: `What crops are drone spraying used for in ${state.name}?`,
      answer: `The main crops in ${state.name} that benefit from drone spraying include ${cropNames.join(', ')}. Drone application is especially valuable when fields are too wet for ground rigs, crops are too tall for tractor-mounted sprayers or fields are small and irregular.`,
    },
  ];

  return (
    <>
      <CountyPageSchema county={state} operators={ops} faqs={faqs} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'States', href: '/states' }, { label: state.name }]} />

        <div className="mb-8">
          <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            <span>{state.region}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Drone Spraying Services in {state.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {ops.length > 0
              ? `${ops.length} verified agricultural drone operator${ops.length !== 1 ? 's' : ''} serving ${state.name}.`
              : `Be the first drone operator listed in ${state.name}.`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, value: `${ops.length}`, label: 'Operators' },
            { icon: TrendingUp, value: formatAcres(state.agriculturalLandHa), label: 'Agricultural land' },
            { icon: Wheat, value: cropNames.slice(0, 2).join(', '), label: 'Main crops' },
            ...(state.vineyardHa ? [{ icon: MapPin, value: formatAcres(state.vineyardHa), label: 'Vineyard acreage' }] : [
              { icon: MapPin, value: state.region, label: 'Region' },
            ]),
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-gray-900 text-sm truncate">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone operators serving {state.name}</h2>
          {ops.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ops.map((op) => <OperatorCard key={op.slug} operator={op} />)}
              </div>
              <div className="mt-5 text-right">
                <Link
                  href={`/states/${state.slug}/operators`}
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View all operators in {state.name} &rarr;
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800 font-medium mb-2">No operators listed in {state.name} yet</p>
              <p className="text-amber-700 text-sm mb-4">
                Many operators service multiple states and will travel. Check neighboring states or list your business.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/states/${state.slug}/operators`} className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                  {state.name} operators page
                </Link>
                <Link href="/list-your-business" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                  List your business free
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Crops for drone spraying in {state.name}</h2>
          <div className="flex flex-wrap gap-2">
            {state.mainCrops.map((crop) =>
              CROP_NAME_MAP[crop] ? (
                <Link key={crop} href={`/crops/${crop}`} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700">
                  {CROP_NAME_MAP[crop]}
                </Link>
              ) : (
                <span key={crop} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">{crop}</span>
              )
            )}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone spraying guides by crop in {state.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {allCrops.map((crop) => (
              <Link
                key={crop.slug}
                href={`/states/${state.slug}/crops/${crop.slug}`}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-gray-700"
              >
                {crop.name} in {state.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone spraying FAQ for {state.name}</h2>
          <FAQAccordion faqs={faqs} />
        </div>

        {adjacent.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby states</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {adjacent.map((c) => (
                <Link key={c.slug} href={`/states/${c.slug}`} className="text-center p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:text-green-700 transition-all text-sm font-medium text-gray-700">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Router ──────────────────────────────────────────────────────────────────

export default function StatePage({ params }: Props) {
  const rich = getStateData(params.slug);
  if (rich) return <RichStatePage slug={params.slug} />;

  const county = getCountyBySlug(params.slug);
  if (!county) notFound();

  return <FallbackStatePage slug={params.slug} />;
}
