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
    question: 'How hard is the Part 107 exam?',
    answer:
      'Pass rate is approximately 80 to 90 percent with 2 to 4 weeks of study. The hardest sections are airspace classification, sectional chart reading, and weather theory. Free study materials are available from FAA, plus paid courses from Drone Pilot Ground School and other providers.',
  },
  {
    question: 'Do I need Part 107 if I only spray my own farm?',
    answer:
      'Yes for drones over 0.55 lbs (250g) used in any commercial activity. Even spraying your own crops for commercial agriculture qualifies. The recreational exemption does not apply to farming operations.',
  },
  {
    question: 'Can I fly at night with Part 107?',
    answer:
      'Yes, since the April 2021 rule change. Anti-collision lighting visible for 3 statute miles is required. No waiver is needed for night operations under the updated Part 107.',
  },
  {
    question: 'What happens if my Part 107 lapses?',
    answer:
      'You must retake the full initial knowledge exam, not just the recurrent online test. Keep your 24-month renewal current to avoid the full exam.',
  },
];

export const metadata: Metadata = {
  title: 'FAA Part 107: Remote Pilot Certificate for Ag Drones',
  description:
    'How to get FAA Part 107 for agricultural drone spraying. Study time, exam format, cost, renewal, and what Part 107 does and does not authorize.',
  alternates: { canonical: '/regulations/faa-part-107' },
  openGraph: {
    type: 'website',
    title: 'FAA Part 107: Remote Pilot Certificate for Ag Drone Operators',
    description:
      '60 questions, 70% passing, $175 at PSI testing centers. 2 to 4 weeks study. Does not authorize pesticide application on its own.',
    url: `${SITE.domain}/regulations/faa-part-107`,
  },
};

export default function FaaPart107Page() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'FAA Part 107: Remote Pilot Certificate for Ag Drone Operators',
    description:
      'FAA Part 107 is the baseline remote pilot certificate for all commercial drone operations. 60 multiple-choice questions, 70% passing, $175 at PSI centers, 2 to 4 weeks study time.',
    url: `${SITE.domain}/regulations/faa-part-107`,
    mainEntityOfPage: `${SITE.domain}/regulations/faa-part-107`,
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
      { '@type': 'ListItem', position: 3, name: 'FAA Part 107', item: `${SITE.domain}/regulations/faa-part-107` },
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
        <Breadcrumb items={[{ label: 'Regulations', href: '/regulations' }, { label: 'FAA Part 107' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          FAA Part 107: Remote Pilot Certificate for Ag Drone Operators
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            FAA Part 107 is the baseline remote pilot certificate for all commercial drone operations in the US. The exam is 60 multiple-choice questions, 70 percent passing, proctored at PSI testing centers for $175. Study time is 2 to 4 weeks. Part 107 alone does not authorize pesticide application; Part 137 and a state pesticide license are also required.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">What Part 107 covers</h2>
          <p>
            Part 107 grants authority to operate a small unmanned aircraft (under 55 lbs) commercially in the US National Airspace System. It covers airspace rules (Class B through G), visual line of sight (VLOS) operations, weather minimums (3 statute miles visibility, 500 ft below clouds, 2000 ft horizontal), crew requirements (remote pilot-in-command plus optional visual observer), and the waiver process for operations outside standard rules. Maximum altitude is 400 ft AGL above ground or within 400 ft of a structure.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How to get Part 107</h2>
          <p>
            The path is a single knowledge exam: 60 multiple-choice questions, 70 percent passing, 2-hour time limit, $175 at PSI testing centers. There is no flight test. Typical study time is 2 to 4 weeks using the free <a href={addUtm("https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">FAA Remote Pilot study guide</a> and sample test questions. Paid courses from Drone Pilot Ground School, Pilot Institute, and King Schools run $150 to $300 and typically include a pass guarantee. After passing, create an IACRA account, submit Form 8710-13, and receive a temporary certificate within 10 business days. The permanent card arrives by mail in 4 to 6 weeks.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What Part 107 does NOT authorize</h2>
          <p>
            Part 107 is the foundation, not the full stack. It does not authorize: aerial pesticide application (requires Part 137 and a state license), operations of drones over 55 lbs (requires Section 44807 exemption), beyond visual line of sight (BVLOS) flight without a waiver, operations over non-participating people without a waiver or compliant platform, or flight above 400 ft AGL outside of controlled airspace with ATC authorization. Flying a spray drone with just Part 107 is a violation of both FAA and EPA rules.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Part 107 renewal</h2>
          <p>
            Recurrent training is required every 24 months. The renewal is an online recurrent knowledge test (ALC-677 on FAA Safety Team website), free, takes approximately 1 hour. Passing the online module keeps the certificate current; no retest at PSI is required. The renewal focuses on regulatory updates, recent safety incidents, and airspace changes since the last test.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Part 107 waivers for ag drone operators</h2>
          <p>
            The most common waivers requested by ag drone operators are: night operations (no longer required since April 2021 rule change if anti-collision lighting is installed), BVLOS for large field spraying (still requires case-by-case waiver), operations over people (Category 1-4 drones may qualify without a waiver), and altitude above 400 ft AGL (rare for ag work, occasionally requested for mountain orchards). Waivers are submitted through the <a href={addUtm("https://www.faa.gov/uas/commercial_operators/part_107_waivers", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">FAA DroneZone portal</a> and typically take 60 to 90 days for review.
          </p>
        </section>

        {/* Authority links */}
        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA: Become a Drone Pilot
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.faa.gov/uas/commercial_operators/part_107", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA: Part 107 Overview
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                14 CFR Part 107 (full regulation text)
              </a>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Part 107 questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Internal links */}
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations" className="text-green-700 hover:underline">Regulations hub</Link>
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">State pesticide licensing</Link>
          <Link href="/regulations/ndaa-compliance" className="text-green-700 hover:underline">NDAA compliance</Link>
          <Link href="/training" className="text-green-700 hover:underline">Training providers</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/tools" className="text-green-700 hover:underline">Free tools</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
