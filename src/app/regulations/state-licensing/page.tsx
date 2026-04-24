import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import AffiliateTextLink from '@/components/affiliate/AffiliateTextLink';
import { counties } from '@/data/counties';
import { AUTHOR, SITE } from '@/data/author';

import { addUtm } from '@/lib/utm';
const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'Which state has the simplest drone licensing?',
    answer:
      'Washington. No standalone aerial category; just the Laws and Safety exam plus a use category exam (2 exams minimum) and a $250 per year commercial license. WSDA has published drone-specific guidance confirming that drones are legal wherever airblast application is legal.',
  },
  {
    question: 'Which state has the hardest drone licensing?',
    answer:
      'Oregon. Fifty hours of flight experience are required before you can apply for the Aerial Pesticide Applicator license, and it is illegal to spray by drone without the APA even under supervision. California is the most administratively complex because of the separate Unmanned Pest Control Aircraft Pilot Certificate.',
  },
  {
    question: 'Can I use one state license in another state?',
    answer:
      'Depends on reciprocity agreements. Minnesota recognizes 18 states. Pennsylvania recognizes 25 or more. Arkansas and Hawaii have no reciprocity. Even with reciprocity in place, most states still require you to pass their own laws and regulations exam.',
  },
  {
    question: 'Do private applicators need a commercial license for drones?',
    answer:
      'In Ohio, yes (unique nationally). In most other states, private applicators can spray their own land with a private applicator license plus an aerial endorsement. Always check the specific rule in your state before flying.',
  },
];

const SORTED_STATES = [...counties].sort((a, b) => a.name.localeCompare(b.name));

export const metadata: Metadata = {
  title: 'State Pesticide Applicator License: 50-State Guide',
  description:
    'Every state requires a commercial pesticide applicator license for drone spraying. See aerial categories, exams, fees and unique rules for all 50 states.',
  alternates: { canonical: '/regulations/state-licensing' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'State Pesticide Applicator Licensing for Drone Operators',
    description:
      'California, North Dakota and Arizona issue drone-specific credentials. Oregon requires 50 hours of flight experience. See every state licensing path.',
    url: `${SITE.domain}/regulations/state-licensing`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'State Pesticide Applicator Licensing for Drone Operators',
      },
    ],
  },
};

export default function StateLicensingPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'State Pesticide Applicator Licensing for Drone Operators: All 50 States',
    description:
      'Every US state requires a commercial pesticide applicator license with an aerial category endorsement for drone pesticide application. Requirements vary significantly across all 50 states.',
    url: `${SITE.domain}/regulations/state-licensing`,
    mainEntityOfPage: `${SITE.domain}/regulations/state-licensing`,
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
      { '@type': 'ListItem', position: 2, name: 'Regulations', item: `${SITE.domain}/regulations` },
      { '@type': 'ListItem', position: 3, name: 'State Licensing', item: `${SITE.domain}/regulations/state-licensing` },
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Regulations', href: '/regulations' }, { label: 'State Licensing' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          State Pesticide Applicator Licensing for Drone Operators: All 50 States
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Every US state requires a commercial pesticide applicator license with an aerial category endorsement for drone pesticide application. Requirements vary significantly: California requires a separate Unmanned Pest Control Aircraft Pilot Certificate, Iowa mandates an in-state aerial applicator consultant, North Dakota issues a standalone Unmanned Aerial Applicator License and Ohio requires even private applicators to hold a commercial license for drone use.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">The three-credential stack</h2>
          <p>
            Commercial drone pesticide application is regulated at three levels: FAA Part 107 (pilot certificate), FAA Part 137 (agricultural aircraft operator certificate with Section 44807 exemption for drones over 55 lbs) and a state-issued commercial pesticide applicator license with an aerial category endorsement. The federal credentials are uniform across the country. The state license is the most variable piece of the stack, and it is where most operators spend the longest time on paperwork. No state issues a standalone drone spray license on its own; the state license is an aerial endorsement added to a commercial pesticide applicator credential. Part 107 is a prerequisite for all of this. If you do not have it yet, <AffiliateTextLink slug="pilot-institute-part-107" linkText="start with the Part 107 course" />.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What varies by state</h2>
          <p>
            State-to-state variation covers eight dimensions. First, the aerial category name (Category 11 in Iowa, Category 12 in Kansas, Category 1a in Washington, Aerial Pesticide Applicator in Oregon). Second, the number of exams: most states require 2 or 3 exams (core + category + laws), a few require 4 or more. Third, fees, ranging from $75 per year in North Dakota to $400+ per year in California. Fourth, continuing education: hours per cycle and acceptable course providers. Fifth, reciprocity: whether out-of-state licenses count and which exams must still be retaken. Sixth, unique drone-specific rules. Seventh, experience prerequisites (Oregon 50 hours, Pennsylvania Part 137 required first). Eighth, insurance minimums, which some states enforce at the state level and some leave to customer contracts.
          </p>

          <h2 className="text-xl font-bold text-gray-900">States with drone-specific credentials</h2>
          <p>
            Six states have issued drone-specific paperwork on top of standard aerial category licenses. California Department of Pesticide Regulation (CDPR) issues an Unmanned Pest Control Aircraft Pilot Certificate separate from the aerial applicator license. North Dakota issues an Unmanned Aerial Applicator License as a standalone credential. Arizona publishes a Drone Pilot License through the Department of Agriculture. Michigan MDARD approved specific UAV training courses required for the aerial endorsement. Louisiana mandates completion of the LSU AgCenter Drone Safety Program before issuing the aerial category. Minnesota requires MnDOT registration for the aircraft itself in addition to the Department of Agriculture license.
          </p>

          <h2 className="text-xl font-bold text-gray-900">States with unique restrictions</h2>
          <p>
            Several states impose rules that catch operators off-guard. Ohio uniquely requires private applicators to hold a commercial license for any drone use (no private-applicator-with-drone path). Iowa mandates an in-state aerial applicator consultant to supervise drone operations for new operators. Oregon requires 50 hours of flight experience before applying for the Aerial Pesticide Applicator license and prohibits supervised drone spraying by unlicensed operators. Arkansas does not issue Commercial Applicator Certification for drones at all and operators must use a different Aerial category. Tennessee charges a $150 aircraft decal fee per drone per year. Vermont requires a 30-day public comment period before issuing aerial permits, which can delay first-season operations significantly.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Reciprocity overview</h2>
          <p>
            Reciprocity agreements let you skip some exams when you already hold a license in another state. Minnesota has the broadest network at 18 reciprocal states. Pennsylvania recognizes 25 or more. North Dakota, South Dakota and Nebraska honor most regional licenses. Arkansas, Hawaii and Maine have no reciprocity of any kind. Even in the states that do have agreements, most require you to pass their own laws and regulations exam because pesticide rules are state-specific. Check each states agreement directly before assuming transferability.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Find your state</h2>
          <p>
            Select your state below for licensing agency, specific aerial category, exam and fee details, seasonal spray windows and verified operators serving your area.
          </p>
        </section>

        {/* 50-state grid */}
        <section className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All 50 states</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {SORTED_STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-colors text-center font-medium"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Authority links */}
        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.epa.gov/pesticide-worker-safety", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                EPA: Pesticide Worker Safety and Certification
              </a>
            </li>
            <li>
              <a href={addUtm("https://npsec.us", "operator_profile")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                National Pesticide Safety Education Center (NPSEC)
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.aapse.org", "operator_profile")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                American Association of Pesticide Safety Educators
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">State licensing questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations" className="text-green-700 hover:underline">Regulations hub</Link>
          <Link href="/regulations/faa-part-107" className="text-green-700 hover:underline">FAA Part 107</Link>
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance</Link>
          <Link href="/guides/hire-drone-spray-operator-checklist" className="text-green-700 hover:underline">Hiring a drone spray operator (checklist)</Link>
          <Link href="/guides/year-round-revenue-ag-drone-operators" className="text-green-700 hover:underline">Year-round revenue for drone operators</Link>
          <Link href="/guides/how-to-become-an-agricultural-drone-pilot" className="text-green-700 hover:underline">How to become an ag drone pilot</Link>
          <Link href="/training-and-certification" className="text-green-700 hover:underline">Training providers</Link>
          <Link href="/states" className="text-green-700 hover:underline">All state guides</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
