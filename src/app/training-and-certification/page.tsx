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
    question: 'How long until I can legally spray crops for hire?',
    answer:
      'Plan 6 to 9 months. Part 107 takes 2 to 4 weeks. State pesticide license takes 1 to 3 months. Part 137 takes 90 to 180 days. Insurance binder adds 2 to 4 weeks. Most new operators target their first customer in the second calendar year.',
  },
  {
    question: 'Is a manufacturer training course legally required?',
    answer:
      'No FAA or state rule requires it. But DJI dealers typically require proof before selling the T50, and the 2-day course ($500 to $900) covers critical safety, maintenance, and software setup. Recommended even if not mandatory.',
  },
  {
    question: 'Can I skip the consultant and do Part 137 myself?',
    answer:
      'Yes, but expect 30 to 90 extra days from revision cycles on your operations manual and 44807 petition. DIY makes sense only if you have previous aviation certification experience. The $2,500 to $4,500 consultant fee typically pays for itself in avoided downtime.',
  },
  {
    question: 'Where do I start if I know nothing about drones?',
    answer:
      'Start with a Part 107 study course (free FAA materials or paid courses from Drone Pilot Ground School or Pilot Institute). Then contact your state extension service for pesticide applicator prep. Then contact a Part 137 consultant. Budget $3,500 to $6,000 total and 6 to 9 months.',
  },
];

const TRACKS = [
  { name: 'FAA Part 107', time: '2 to 4 weeks', cost: '$175 exam', agency: 'FAA' },
  { name: 'State pesticide license', time: '1 to 3 months', cost: '$75 to $500 (varies by state)', agency: 'State Dept. of Agriculture' },
  { name: 'FAA Part 137 + 44807', time: '90 to 180 days', cost: '$2,500 to $4,500 (consultant) or $0 (DIY)', agency: 'FAA' },
];

const PROVIDERS = [
  { name: 'Drone Pilot Ground School', url: 'https://www.dronepilotgroundschool.com', note: 'Part 107 exam prep. Online self-paced.' },
  { name: 'Rantizo Advisory', url: 'https://www.rantizo.com', note: 'Part 137 exemption consulting and full business setup.' },
  { name: 'Precision Aerial Solutions', url: 'https://www.precisionaerial.com', note: 'Part 137 and state licensing bundles.' },
  { name: 'Part 137 Experts', url: 'https://www.part137experts.com', note: 'Focused on FAA exemption paperwork.' },
  { name: 'State extension universities', url: 'https://npsec.us', note: 'Pesticide applicator prep courses (Purdue, Iowa State, Nebraska, Mississippi State, NC State).' },
];

export const metadata: Metadata = {
  title: 'Ag Drone Pilot Training & Certification: 2026 Guide',
  description:
    'From Part 107 to Part 137 to state pesticide license: the complete training pathway for agricultural drone operators. Costs, timeline, and providers.',
  alternates: { canonical: '/training-and-certification' },
  openGraph: {
    type: 'website',
    title: 'Agricultural Drone Pilot Training and Certification Guide',
    description:
      'Complete pathway: Part 107 ($175), state pesticide license ($75 to $500), Part 137 + 44807 ($2,500 to $4,500). Total cost $3,500 to $6,000. Timeline 6 to 9 months.',
    url: `${SITE.domain}/training-and-certification`,
  },
};

export default function TrainingAndCertificationPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agricultural Drone Pilot Training and Certification Guide',
    description:
      'The complete certification pathway for a commercial ag drone operator costs $3,500 to $6,000 across FAA Part 107, state pesticide license, and FAA Part 137 with Section 44807 exemption. Total timeline 6 to 9 months.',
    url: `${SITE.domain}/training-and-certification`,
    mainEntityOfPage: `${SITE.domain}/training-and-certification`,
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
      { '@type': 'ListItem', position: 2, name: 'Training and Certification', item: `${SITE.domain}/training-and-certification` },
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
        <Breadcrumb items={[{ label: 'Training and Certification' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Agricultural Drone Pilot Training and Certification Guide
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            The complete certification pathway for a commercial ag drone operator costs $3,500 to $6,000 across three tracks: FAA Part 107 ($175 exam, 2 to 4 weeks study), state commercial pesticide applicator license ($75 to $300 per category), and FAA Part 137 with Section 44807 exemption ($2,500 to $4,500 consultant package or DIY in 90 to 180 days). Total timeline from start to first paying customer: 6 to 9 months.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">The three certification tracks</h2>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Track</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Time</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Cost</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {TRACKS.map((row) => (
                  <tr key={row.name}>
                    <td className="px-3 py-2 font-medium text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-700">{row.time}</td>
                    <td className="px-3 py-2 text-gray-700">{row.cost}</td>
                    <td className="px-3 py-2 text-gray-700">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Manufacturer operator certifications</h2>
          <p>
            Manufacturer certifications are issued by drone OEMs and cover the safe operation, maintenance, software workflow, and in-field handling of a specific platform. DJI Agras operator certification is a 2-day course running $500 to $900, covering the T50 and T100 platforms. Hylio Academy offers a similar program for AG-230 and AG-272. XAG Training Center runs a parallel program for P100 and V40. Manufacturer training is not legally required, but dealers typically require proof before selling a new spray drone, and the hands-on field instruction shortens the real-world learning curve by weeks.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Training providers</h2>
          <ul className="list-disc pl-5 space-y-1">
            {PROVIDERS.map((p) => (
              <li key={p.name}>
                <a href={addUtm(p.url, "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline font-medium">
                  {p.name}
                </a>
                <span className="text-gray-700">, {p.note}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900">State pesticide exam prep</h2>
          <p>
            Most states use the EPA National Pesticide Applicator Certification Core manual plus state-specific aerial materials. Aerial category exams cover drift management, buffer zones, droplet size, equipment calibration, weather minimums, and label interpretation. Some states offer online proctored exams; others require in-person testing at designated sites. Pass rates on aerial category exams tend to run lower than core exams because the aerial-specific material (Weather, Drift, Nozzle selection) is often only covered superficially in general study guides. Plan 20 to 40 hours of focused study for the aerial category on top of the core exam. Check your state page for specific exam format and study manual.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Recommended certification order</h2>
          <p>
            The optimal sequence for most operators: (1) Part 107 first (fastest, foundation for everything else, and required before Part 137); (2) state pesticide license next (state-specific and informs Part 137 application content); (3) manufacturer training concurrent with step 2 while you wait on exam scheduling; (4) Part 137 plus 44807 started as soon as Part 107 is in hand (longest timeline, so start early); (5) insurance binder once Part 137 is approved; (6) first customer contract signed after all credentials and insurance are in force. Running these in parallel where possible cuts total calendar time from 9+ months to about 6.
          </p>

          <h2 className="text-xl font-bold text-gray-900">USDA funding for training</h2>
          <p>
            USDA Beginning Farmer and Rancher Development Program (BFRDP) grants fund training and mentorship for new producers, with several awardees including ag drone training in eligible expenses between 2023 and 2026. The Veterans Farmer Coalition and state-level beginning farmer programs also include ag drone training as an eligible cost. Applications are competitive, vary by state and year, and are usually submitted through a community-based training provider rather than directly by the trainee.
          </p>
        </section>

        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                FAA: Become a Drone Pilot
              </a>
            </li>
            <li>
              <a href={addUtm("https://npsec.us", "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                National Pesticide Safety Education Center (NPSEC)
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.dronepilotgroundschool.com", "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Drone Pilot Ground School (Part 107 prep)
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Training and certification questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations/faa-part-107" className="text-green-700 hover:underline">FAA Part 107</Link>
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">State pesticide licensing</Link>
          <Link href="/services/training" className="text-green-700 hover:underline">Training providers directory</Link>
          <Link href="/services/consultancy" className="text-green-700 hover:underline">Consultancy services</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link>
          <Link href="/insurance" className="text-green-700 hover:underline">Drone insurance</Link>
          <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">Grants and cost-share</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
