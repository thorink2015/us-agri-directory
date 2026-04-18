import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

import { addUtm } from '@/lib/utm';
const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'How long does Part 137 approval take?',
    answer:
      'Typically 90 to 180 days from a complete submission to FAA approval. Incomplete operations manuals are the #1 cause of delays. Using a consultant shortens the timeline by 60 to 120 days on average.',
  },
  {
    question: 'Do I need Part 137 to spray my own farm?',
    answer:
      'If you are spraying only your own crops with your own drone, you may qualify for the simplified Part 137 private applicator path. If you charge anyone else or spray land you do not own, you need the full commercial Part 137.',
  },
  {
    question: 'What is the Section 44807 exemption?',
    answer:
      'An FAA authorization required for any drone over 55 lbs operating commercially. Since most ag spray drones (T50, AG-272, T100) exceed 55 lbs loaded, the 44807 petition is filed as part of the Part 137 application package.',
  },
  {
    question: 'Should I hire a consultant for Part 137?',
    answer:
      'If you have no previous aviation certification experience, yes. Consultant packages ($2,500 to $4,500) include operations manual drafting, 44807 petition, and coaching through approval. DIY attempts average 30 to 90 days longer due to revision cycles.',
  },
];

export const metadata: Metadata = {
  title: 'FAA Part 137 for Drone Spraying: Ag Aircraft Guide',
  description:
    'How to get FAA Part 137 and Section 44807 exemption for agricultural drone spraying. Timeline, operations manual, and what it covers.',
  alternates: { canonical: '/regulations/faa-part-137' },
  openGraph: {
    title: 'FAA Part 137: Agricultural Aircraft Operator Certificate for Drones',
    description:
      '90 to 180 day FAA approval timeline. Section 44807 exemption required for drones over 55 lbs. Operations manual and training records needed.',
    url: `${SITE.domain}/regulations/faa-part-137`,
  },
};

export default function FaaPart137Page() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'FAA Part 137: Agricultural Aircraft Operator Certificate for Drones',
    description:
      'Part 137 is the agricultural aircraft operator certificate required for any commercial aerial pesticide application, including by drone. Approval takes 90 to 180 days, and drones over 55 lbs require a Section 44807 exemption.',
    url: `${SITE.domain}/regulations/faa-part-137`,
    mainEntityOfPage: `${SITE.domain}/regulations/faa-part-137`,
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
      { '@type': 'ListItem', position: 3, name: 'FAA Part 137', item: `${SITE.domain}/regulations/faa-part-137` },
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
        <Breadcrumb items={[{ label: 'Regulations', href: '/regulations' }, { label: 'FAA Part 137' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          FAA Part 137: Agricultural Aircraft Operator Certificate for Drones
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            FAA Part 137 is the agricultural aircraft operator certificate required for any commercial aerial application of pesticides, including by drone. The certification process takes 90 to 180 days from submission to FAA approval. Drones over 55 lbs require an additional Section 44807 exemption as part of the Part 137 application. Most commercial ag drone operators hold both Part 137 and a 44807 exemption.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">What Part 137 is</h2>
          <p>
            14 CFR Part 137 is the agricultural aircraft operator certificate, originally written for manned aircraft (crop dusters and helicopters) and later interpreted by FAA to cover small unmanned aircraft systems (sUAS). Any person or business conducting aerial application of economic poison, seed, or other agricultural substance for hire or for their own agricultural operation must hold a Part 137 certificate. The certificate is issued by the local FAA Flight Standards District Office (FSDO) after review of the operations manual, training records, and any applicable exemption petitions.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Part 137 commercial vs. private</h2>
          <p>
            FAA distinguishes commercial operators (spraying for hire or custom application work) from private operators (a farmer spraying only their own crops on land they own, lease, or rent). Private operators are eligible for a simplified Part 137 with reduced recordkeeping and no commercial-fleet airworthiness requirements. Commercial operators have the full Part 137 obligations including operations manual, crew training documentation, and maintenance records. The commercial certificate is the correct path for any operator who charges customers or sprays for neighbors.
          </p>

          <h2 className="text-xl font-bold text-gray-900">The Section 44807 exemption</h2>
          <p>
            Section 44807 of the FAA Reauthorization Act allows FAA to grant exemptions for unmanned aircraft that fall outside standard Part 107 rules. Drones over 55 lbs and commercial spray operations with sUAS require a 44807 exemption as part of the Part 137 package. The exemption petition documents the specific aircraft, operations manual compliance, pilot training, and maintenance program. Most ag drones (DJI Agras T50 at 90+ lbs loaded, Hylio AG-272 at 140 lbs loaded, DJI T100 at 220 lbs loaded) cross the 55 lb threshold and therefore require 44807.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How to get Part 137</h2>
          <p>
            The application process: (1) complete Part 107 first; (2) draft an operations manual covering the items listed below; (3) prepare training records for each pilot and crew member; (4) submit a Section 44807 petition if applicable; (5) file the Part 137 application package with your local FSDO; (6) complete FSDO review and interview. The FAA target is 90 to 180 days but delays caused by manual revisions and petition corrections often push this to 6 to 9 months for DIY applicants. Consultants (Thrush Aircraft, PrecisionHawk, UAV Coach, RobinAero) charge $2,500 to $4,500 for a complete package and typically cut approval time by 60 to 120 days by submitting a clean package on the first pass.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What the operations manual must include</h2>
          <p>
            FAA requires the operations manual to cover: (1) crew training program and recurrent training schedule; (2) aircraft maintenance program with inspection intervals and service bulletins; (3) chemical handling and personal protective equipment procedures; (4) emergency procedures including lost-link, fly-away, and medical emergencies; (5) recordkeeping for flights, maintenance, chemical applications, and incident reports; (6) congested area operations plan if applicable; (7) weather minimums specific to sUAS; (8) crew fitness and duty time limits. Manuals typically run 60 to 120 pages. Templates are available from consultants and from FAA Advisory Circular AC 137-1 (manned operations, adapted for sUAS).
          </p>

          <h2 className="text-xl font-bold text-gray-900">Common mistakes that delay approval</h2>
          <p>
            The four most common delays: (1) operations manual missing one or more required sections, particularly emergency procedures and maintenance intervals; (2) Section 44807 petition filed in the wrong format (FAA has a specific template); (3) missing or incomplete pilot training documentation, including initial and recurrent records; (4) attempting to file Part 137 before holding Part 107 (FAA requires Part 107 for the responsible remote pilot before issuing Part 137). A consultant who has shepherded 20+ applications through FSDO typically avoids all four.
          </p>
        </section>

        {/* Authority links */}
        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.faa.gov/uas/advanced_operations/agricultural", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA: Agricultural Operations
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.faa.gov/newsroom/ag-operations", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA Newsroom: Ag Operations updates
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-137", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                14 CFR Part 137 (full regulation text)
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Part 137 questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations" className="text-green-700 hover:underline">Regulations hub</Link>
          <Link href="/regulations/faa-part-107" className="text-green-700 hover:underline">FAA Part 107</Link>
          <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">State pesticide licensing</Link>
          <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance</Link>
          <Link href="/training" className="text-green-700 hover:underline">Training providers</Link>
          <Link href="/services/consultancy" className="text-green-700 hover:underline">Consultancy services</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
