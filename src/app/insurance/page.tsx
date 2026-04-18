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
    question: 'How much does ag drone insurance cost per year?',
    answer:
      'Total annual premiums for a single-drone commercial operator typically run $2,500 to $5,000 for hull, liability, and chemical application coverage combined. Fleet operators pay less per drone. Part 137 certification and a clean claims history reduce rates.',
  },
  {
    question: 'Does my farm policy cover my spray drone?',
    answer:
      'Almost never. Standard farm and ranch policies exclude commercial UAS operations and chemical application liability. You need a dedicated aviation or drone insurance policy with an agricultural application endorsement.',
  },
  {
    question: 'Can I get insurance without Part 137?',
    answer:
      'Some insurers will write a policy without Part 137, but at higher premiums and potentially with exclusions. Most established ag drone insurers strongly prefer or require Part 137 before binding coverage.',
  },
  {
    question: 'What is pollution liability and do I really need it?',
    answer:
      'Pollution and chemical application liability covers pesticide drift damage to neighboring crops, water contamination, and environmental claims. This is the most likely claim scenario for ag drone operators. Standard drone liability does NOT include it. Yes, you need it.',
  },
];

const COVERAGE = [
  { layer: 'Hull (drone body)', required: 'Required by most rental or lease agreements', covers: 'Physical damage from crash, weather, fire', premium: '$500 to $2,000/yr per drone' },
  { layer: 'Commercial liability', required: 'Required by most states and all Part 137 ops', covers: 'Bodily injury and property damage', premium: '$1,000 to $3,000/yr for $1M per occurrence' },
  { layer: 'Chemical application / pollution', required: 'Required by many states; strongly recommended everywhere', covers: 'Pesticide drift, water contamination, environmental claims', premium: '$600 to $2,000/yr' },
  { layer: 'Payload / cargo', required: 'Optional', covers: 'Chemical and seed payload loss', premium: 'Varies' },
  { layer: 'Completed operations', required: 'Recommended', covers: 'Post-application claims (damage found after operator leaves)', premium: 'Included in some liability policies' },
];

const INSURERS = [
  { name: 'BWI Companies', url: 'https://www.bwifly.com', note: 'Largest aviation insurance broker. Ag drone specialty division.' },
  { name: 'AssuredPartners Aerospace', url: 'https://www.assuredpartners.com', note: 'Broad aviation insurance. Ag drone endorsements.' },
  { name: 'Global Aerospace', url: 'https://www.global-aero.com', note: 'International aviation insurer with US ag drone coverage.' },
  { name: 'Skyward', url: 'https://www.skyward.io', note: 'Drone-specific insurance platform with online quoting.' },
  { name: 'Thimble', url: 'https://www.thimble.com', note: 'On-demand drone insurance: hourly, daily, monthly.' },
];

export const metadata: Metadata = {
  title: 'Drone Insurance for Ag Operators: 2026 Costs & Coverage',
  description:
    'Ag drone operators need hull, liability, and chemical drift coverage. Premiums run $1,200 to $4,000/yr. Top insurers: BWI, AssuredPartners, Global Aerospace.',
  alternates: { canonical: '/insurance' },
  openGraph: {
    type: 'website',
    title: 'Drone Insurance for Agricultural Spray Operators',
    description:
      'Hull ($500 to $2,000/yr), commercial liability ($1,000 to $3,000/yr for $1M), and chemical application/pollution ($600 to $2,000/yr). Part 137 lowers premiums.',
    url: `${SITE.domain}/insurance`,
  },
};

export default function InsurancePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Drone Insurance for Agricultural Spray Operators',
    description:
      'Ag drone operators need three insurance layers: hull coverage, commercial liability, and chemical application or pollution liability. Annual premiums typically run $2,500 to $5,000 combined.',
    url: `${SITE.domain}/insurance`,
    mainEntityOfPage: `${SITE.domain}/insurance`,
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
      { '@type': 'ListItem', position: 2, name: 'Insurance', item: `${SITE.domain}/insurance` },
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
        <Breadcrumb items={[{ label: 'Insurance' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Insurance for Agricultural Spray Operators
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Agricultural drone operators need three insurance layers: hull coverage ($500 to $2,000 per year per drone), commercial liability ($1,000 to $3,000 per year for $1M per occurrence), and chemical application or pollution liability ($600 to $2,000 per year). Top US insurers serving ag drone operators include BWI Companies, AssuredPartners Aerospace, and Global Aerospace. Part 137 certification typically reduces premium rates.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">Required vs. recommended coverage</h2>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Coverage</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Required?</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">What it covers</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-800">Typical premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COVERAGE.map((row) => (
                  <tr key={row.layer}>
                    <td className="px-3 py-2 font-medium text-gray-900">{row.layer}</td>
                    <td className="px-3 py-2 text-gray-700">{row.required}</td>
                    <td className="px-3 py-2 text-gray-700">{row.covers}</td>
                    <td className="px-3 py-2 text-gray-700">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900">What standard drone policies do NOT cover</h2>
          <p>
            Standard UAS liability policies written for photography and mapping do not cover chemical drift, pesticide application, or agricultural operations. Operators must verify in writing that their policy explicitly covers agricultural aerial application. A mapping or photography policy used for spray work leaves the operator uninsured for the most likely claim scenario (drift). Read the exclusions page of any quote carefully; most general drone policies contain a blanket exclusion for chemical and pollution events.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How Part 137 affects insurability</h2>
          <p>
            Part 137 certification demonstrates operational standards, crew training records, and maintenance protocols that insurers reward with lower premiums. Some ag drone insurers require Part 137 before writing a policy. Operators without Part 137 pay noticeably higher rates or are declined coverage entirely by the stricter carriers. Along with Part 137, a documented safety management system (SMS), recurrent training records, and 12 months of clean claims history are the biggest rate-reduction levers.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Top insurers for US ag drone operators</h2>
          <ul className="list-disc pl-5 space-y-1">
            {INSURERS.map((ins) => (
              <li key={ins.name}>
                <a href={addUtm(ins.url, "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline font-medium">
                  {ins.name}
                </a>
                <span className="text-gray-700">, {ins.note}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900">Common claim scenarios</h2>
          <p>
            The five most common ag drone insurance claims, in rough frequency order: (1) pesticide drift onto neighboring organic or sensitive crops (often 2A/2B/2ee label violations); (2) drone crash into a power line, tree, or structure during spray lines; (3) chemical runoff into a waterway after application in wet conditions; (4) crop damage from an incorrect application rate or product selection; (5) third-party bodily injury from a fly-away or loss-of-link event. All five scenarios require chemical application or pollution coverage in addition to standard UAS liability.
          </p>

          <h2 className="text-xl font-bold text-gray-900">State insurance requirements</h2>
          <p>
            Several states mandate specific minimum coverage. Ohio requires $100K property plus $100K/$300K bodily injury. Louisiana requires $50K minimum. Massachusetts requires $100K/$300K bodily injury plus $100K property plus chemical drift coverage. South Carolina requires $50K spray insurance. Tennessee requires $100K minimum. Minimums are the floor; operators on real contracts typically carry $1M per occurrence. Check your state page for the current requirement before binding a policy.
          </p>
        </section>

        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.bwifly.com", "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                BWI Companies (aviation insurance broker)
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.assuredpartners.com", "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                AssuredPartners Aerospace
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.global-aero.com", "service_provider")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Global Aerospace
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drone insurance questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
          <Link href="/grants-and-subsidies" className="text-green-700 hover:underline">Grants and cost-share</Link>
          <Link href="/training-and-certification" className="text-green-700 hover:underline">Training and certification</Link>
          <Link href="/regulations" className="text-green-700 hover:underline">Regulations hub</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
