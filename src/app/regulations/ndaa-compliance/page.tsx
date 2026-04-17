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
    question: 'Are DJI drones banned in the US?',
    answer:
      'No, as of April 2026. DJI products remain legal to purchase and operate for private commercial use. NDAA restricts federal agency procurement, not private commercial operations. Tariffs of 170 percent have increased landed costs significantly since 2024.',
  },
  {
    question: 'Do I need an NDAA-compliant drone to spray crops?',
    answer:
      'Only if you bid on federal, state, or university-funded contracts. Private farm contracts have no NDAA requirement. Most US commercial ag drone operators still fly DJI for privately contracted work.',
  },
  {
    question: 'What is the Blue UAS list?',
    answer:
      'The Department of Defense Defense Innovation Unit maintains a list of drones cleared for government use. Inclusion means the platform passed a security review. Hylio, Skydio, and Parrot are on the list. DJI and XAG are not.',
  },
  {
    question: 'Should I buy Hylio or DJI in 2026?',
    answer:
      'If you work or plan to work federal or state contracts: Hylio. If you work only private farms and want the lowest per-gallon cost: DJI T50. Many operators run both for different customer segments.',
  },
];

export const metadata: Metadata = {
  title: 'NDAA Compliance for Ag Drones | DJI Ban, Blue UAS List & What It Means',
  description:
    'What drone operators need to know about NDAA restrictions on Chinese drones. DJI status, Blue UAS list, Hylio compliance, and who is affected.',
  alternates: { canonical: '/regulations/ndaa-compliance' },
  openGraph: {
    title: 'NDAA Compliance: What Ag Drone Operators Need to Know',
    description:
      'DJI remains legal for private commercial use but excluded from federal contracts. Hylio AG-272, Pyka Pelican 2, and Blue UAS platforms are the NDAA-compliant alternatives.',
    url: `${SITE.domain}/regulations/ndaa-compliance`,
  },
};

export default function NdaaCompliancePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'NDAA Compliance: What Ag Drone Operators Need to Know',
    description:
      'NDAA restricts federal and many state agencies from using DJI and XAG drones. Private commercial use remains legal. NDAA-compliant alternatives include Hylio AG-272, Pyka Pelican 2, and Blue UAS list platforms.',
    url: `${SITE.domain}/regulations/ndaa-compliance`,
    mainEntityOfPage: `${SITE.domain}/regulations/ndaa-compliance`,
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
      { '@type': 'ListItem', position: 3, name: 'NDAA Compliance', item: `${SITE.domain}/regulations/ndaa-compliance` },
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
        <Breadcrumb items={[{ label: 'Regulations', href: '/regulations' }, { label: 'NDAA Compliance' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          NDAA Compliance: What Ag Drone Operators Need to Know
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            The National Defense Authorization Act restricts federal and many state agencies from purchasing or using drones with components from designated foreign manufacturers, which includes DJI and XAG. As of April 2026, DJI drones remain legal to purchase and operate in the US for private commercial use, but cumulative tariffs of 170 percent and pending legislation (Countering CCP Drones Act) create uncertainty. NDAA-compliant alternatives include Hylio AG-272 ($55,000 to $75,000), Pyka Pelican 2 ($550,000), and platforms on the DoD Blue UAS list.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">What NDAA actually restricts</h2>
          <p>
            The NDAA is an annual defense authorization law. Two provisions are most relevant to drone operators: Section 889 of the FY2019 NDAA prohibits federal agencies from procuring covered telecommunications equipment and services from specified Chinese companies, and Section 848 of the FY2020 NDAA extends the restriction to small unmanned aircraft systems from covered foreign entities. Together they block federal purchase or operational use of DJI and XAG drones. Critically, neither provision bans private commercial use. A farmer, custom operator, or agronomist can still buy, own, and fly DJI drones under current law; the restriction is a procurement rule, not a personal ownership rule.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Who is affected</h2>
          <p>
            The practical impact of NDAA sits in four buckets. First, federal agencies (USDA, Forest Service, Department of the Interior, Department of Defense) cannot buy or use covered drones. Second, state agencies spending federal pass-through dollars (most state agriculture departments, extension offices, and universities running federally funded research) inherit the restriction. Third, university researchers on federal grants must use compliant platforms or risk grant ineligibility. Fourth, private operators bidding USDA cost-share, state-funded treatment programs, or any federally funded work need NDAA-compliant equipment. Private farm contracts with individual growers remain unaffected.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Current DJI status in the US</h2>
          <p>
            As of April 2026, DJI drones remain fully legal to import, purchase, and operate for private commercial use. Section 1709 of the FY2025 NDAA required a national security review of DJI by December 2025; the review was completed and did not trigger an automatic ban, but policy activity remains elevated. The Countering CCP Drones Act, which would add DJI to the FCC Covered List and halt new authorizations, was excluded from the FY2025 NDAA but is active in subsequent legislative cycles. Cumulative tariffs (Section 301, IEEPA, and reciprocal) now total around 170 percent on DJI ag drones, raising landed cost significantly. Uyghur Forced Labor Prevention Act (UFLPA) import holds have also disrupted DJI supply at certain US ports.
          </p>

          <h2 className="text-xl font-bold text-gray-900">NDAA-compliant alternatives</h2>
          <p>
            Three US-manufactured spray drones are the primary NDAA-compliant options in 2026. Hylio AG-272 and AG-230 are built in Richmond, Texas, and carry FY2019 Section 889 and FY2020 Section 848 compliance letters. Hylio pricing runs $55,000 to $75,000 for the AG-272 and $38,000 to $48,000 for the AG-230. Pyka Pelican 2 is a fixed-wing spray aircraft manufactured in Alameda, California, at roughly $550,000 and is the largest compliant spray platform currently in service. For non-spray roles, Skydio X10D and Parrot Anafi USA sit on the DoD Blue UAS list and are commonly used for scouting and mapping on federally funded projects. The Defense Innovation Unit maintains the current Blue UAS list and publishes updates when new platforms pass the security review.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Mixed fleet strategy</h2>
          <p>
            Operators who serve both private farms and federally funded contracts commonly run a mixed fleet: DJI T50 or T100 for high-volume private work where per-gallon cost matters most, and Hylio AG-272 or AG-230 for government and university jobs where NDAA compliance is a contract requirement. The per-acre economics favor DJI for pure private work because hardware cost is lower and replacement parts are readily available. On federally funded work, Hylio pricing is competitive because the federal rate card often reflects compliance overhead. Keeping both platforms lets an operator bid any job without disqualification.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What to watch</h2>
          <p>
            Three policy trajectories matter for 2026 planning. First, the Countering CCP Drones Act continues to be introduced in Congress; if it passes and DJI is added to the FCC Covered List, new equipment authorizations would stop and existing fleets would face eventual grounding on federally licensed spectrum. Second, at least eight states have introduced or passed NDAA-mirror laws that restrict state agency procurement regardless of federal funding source; track your state legislature if you expect state-level contracts. Third, tariff trajectory remains volatile; DJI landed costs have roughly tripled from 2023 pricing and further adjustments are likely. Operators planning a 2026 or 2027 purchase should price both DJI and NDAA-compliant options against their expected customer mix before committing.
          </p>
        </section>

        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.diu.mil/blue-uas", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                DIU: Blue UAS list (DoD cleared platforms)
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.congress.gov/bill/118th-congress/house-bill/2864", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Congress.gov: Countering CCP Drones Act text
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.hyl.io", "drone_specs")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Hylio: NDAA compliance sheet
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">NDAA compliance questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/regulations" className="text-green-700 hover:underline">Regulations hub</Link>
          <Link href="/regulations/faa-part-107" className="text-green-700 hover:underline">FAA Part 107</Link>
          <Link href="/regulations/faa-part-137" className="text-green-700 hover:underline">FAA Part 137</Link>
          <Link href="/regulations/state-licensing" className="text-green-700 hover:underline">State pesticide licensing</Link>
          <Link href="/drones/dji-agras-t50" className="text-green-700 hover:underline">DJI Agras T50</Link>
          <Link href="/drones/hylio-ag-272" className="text-green-700 hover:underline">Hylio AG-272</Link>
          <Link href="/drones/pyka-pelican-2" className="text-green-700 hover:underline">Pyka Pelican 2</Link>
          <Link href="/services/sales" className="text-green-700 hover:underline">Drone sales and dealers</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
