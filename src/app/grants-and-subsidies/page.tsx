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
    question: 'Can I get EQIP money to buy a DJI T50?',
    answer:
      'Yes, if your state lists drone equipment as an approved practice under EQIP 595. Payment rates vary from 40 to 90 percent. Beginning farmers, veterans, and socially disadvantaged producers qualify for higher rates. Apply through your local NRCS office.',
  },
  {
    question: 'Does EQIP pay for the drone or the spraying service?',
    answer:
      'Both, depending on the practice. EQIP 595 (Precision Agriculture) covers equipment purchases. EQIP 340 (Cover Crop) covers cover crop seeding costs including seed plus application. A farmer can use 340 cost-share to offset the per-acre cost of hiring a drone operator for cover crop seeding.',
  },
  {
    question: 'How long does EQIP approval take?',
    answer:
      'Applications are ranked competitively within the state window. Approval typically comes 3 to 6 months after the application deadline. Funded contracts require the practice to be completed within 1 to 3 years.',
  },
  {
    question: 'Can I use EQIP reimbursement as a down payment on a drone loan?',
    answer:
      'Not directly assigned to a lender, but you can use the reimbursement check once received to pay down the loan principal. Most operators finance the full purchase, then apply EQIP funds when they arrive.',
  },
];

export const metadata: Metadata = {
  title: 'USDA Grants & Cost-Share for Ag Drones: 2026 Guide',
  description:
    'USDA EQIP pays 40 to 90% on drone purchases. Cover crop seeding cost-share $25 to $55/acre. Full guide to federal programs for drone operators and farmers.',
  alternates: { canonical: '/grants-and-subsidies' },
  openGraph: {
    title: 'USDA Grants and Cost-Share Programs for Agricultural Drones',
    description:
      'EQIP 595 covers 40 to 90 percent on drone purchases. EQIP 340 covers cover crop seeding at $25 to $55 per acre. FSA loans at 6 to 9 percent.',
    url: `${SITE.domain}/grants-and-subsidies`,
  },
};

export default function GrantsAndSubsidiesPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'USDA Grants and Cost-Share Programs for Agricultural Drones',
    description:
      'USDA NRCS EQIP Practice Code 595 offers 40 to 90 percent cost-share on drone purchases. EQIP 340 covers cover crop seeding at $25 to $55 per acre. FSA Farm Loans offer 2 to 7 year equipment financing.',
    url: `${SITE.domain}/grants-and-subsidies`,
    mainEntityOfPage: `${SITE.domain}/grants-and-subsidies`,
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
      { '@type': 'ListItem', position: 2, name: 'Grants and Subsidies', item: `${SITE.domain}/grants-and-subsidies` },
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
        <Breadcrumb items={[{ label: 'Grants and Subsidies' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          USDA Grants and Cost-Share Programs for Agricultural Drones
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            USDA NRCS EQIP Practice Code 595 (Precision Agriculture) offers 40 to 90 percent cost-share on qualifying drone purchases in most states, with beginning farmers and socially disadvantaged producers qualifying for higher rates. Cover crop seeding by drone qualifies under EQIP Practice Standard 340 at $25 to $55 per acre. FSA Farm Loan Programs offer 2 to 7 year equipment financing at 6 to 9 percent with 10 to 25 percent down.
          </p>
        </div>

        <section className="prose prose-sm max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-2">EQIP Practice Code 595 (Precision Agriculture)</h2>
          <p>
            EQIP 595 covers drone equipment purchases directly. Payment rates vary by state from 40 to 90 percent of eligible cost. Apply through your local NRCS field office during the state application window, typically November through January for the following fiscal year. Beginning farmers, veteran farmers, and socially disadvantaged producers qualify for enhanced payment rates. Not all states list drones as an approved practice under 595; check with your state conservationist before assuming eligibility. The state technical guide (FOTG) is the authoritative reference for what is and is not covered in your state.
          </p>

          <h2 className="text-xl font-bold text-gray-900">EQIP Cover Crop Practice Standard 340</h2>
          <p>
            Drone seeding qualifies as aerial seeding under Practice Standard 340. Typical payments run $25 to $55 per acre total (seed plus application), covering 50 to 70 percent of drone-seeded cost. Several states layer Regional Conservation Partnership Program (RCPP) funding on top of 340 for 80 to 100 percent coverage on qualifying projects. Net farmer cost after cost-share typically falls to $5 to $12 per acre, which makes drone aerial seeding competitive with ground-applied methods even on flat fields.
          </p>

          <h2 className="text-xl font-bold text-gray-900">CSP (Conservation Stewardship Program)</h2>
          <p>
            CSP pays for ongoing conservation performance rather than equipment. Precision application practices including drone-based variable-rate application may qualify as enhancements within a CSP contract. Payments are calculated from the conservation benefits, not the equipment cost. Contact your local NRCS office for the current list of eligible enhancements under the FY2026 CSP program.
          </p>

          <h2 className="text-xl font-bold text-gray-900">FSA Farm Loan Programs</h2>
          <p>
            Farm Service Agency (FSA) Farm Loan Programs offer 2 to 7 year equipment loans for agricultural drones. Down payment requirements run 10 to 25 percent, with current rates between 6 and 9 percent depending on credit and program. EQIP reimbursement cannot be directly assigned to a lender, but operators routinely finance the full drone purchase through FSA, then apply EQIP reimbursement funds toward loan principal once received. Beginning Farmer and Rancher loans and Youth Loan programs offer more favorable terms than standard Operating or Farm Ownership loans.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Specialty Crop Block Grants</h2>
          <p>
            State-administered Specialty Crop Block Grants (SCBG) fund competitive projects on specialty crop innovation. Several states funded drone spraying pilot projects on vineyards, orchards, and vegetable operations between 2024 and 2026. Awards typically range from $25,000 to $250,000 per project. Check your state department of agriculture for the current SCBG cycle and priority areas.
          </p>

          <h2 className="text-xl font-bold text-gray-900">State-level precision ag programs</h2>
          <p>
            Nebraska Public Service Commission operates a Precision Ag Grant Program that funds drone acquisition for qualifying operations. Other states have emerging precision agriculture programs administered through extension services, state departments of agriculture, or broadband/rural development agencies. Availability, funding level, and eligibility rules change yearly; the state extension service is usually the single best starting point.
          </p>

          <h2 className="text-xl font-bold text-gray-900">How to apply</h2>
          <p>
            The standard application flow: (1) contact your local NRCS field office and ask about EQIP 595 drone equipment eligibility in your state; (2) request the current state payment schedule and confirm drone equipment is listed; (3) apply during the state application window (typically Nov to Jan); (4) if approved and contracted, purchase equipment and submit receipts for reimbursement within the contract timeline. For cover crop work under EQIP 340, the flow is similar but payment is usually per-acre after practice completion rather than per-purchase.
          </p>
        </section>

        <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Primary sources</h3>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href={addUtm("https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                NRCS: EQIP Environmental Quality Incentives Program
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-340", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                NRCS: Cover Crop Practice Standard 340
              </a>
            </li>
            <li>
              <a href={addUtm("https://www.fsa.usda.gov", "authority_link")} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                Farm Service Agency (FSA) Farm Loan Programs
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Grants and cost-share questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/tools/roi-calculator" className="text-green-700 hover:underline">ROI calculator</Link>
          <Link href="/services/sales" className="text-green-700 hover:underline">Drone sales and dealers</Link>
          <Link href="/services/seeding" className="text-green-700 hover:underline">Drone seeding services</Link>
          <Link href="/crops/cover-crops" className="text-green-700 hover:underline">Cover crops guide</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
          <Link href="/insurance" className="text-green-700 hover:underline">Drone insurance</Link>
          <Link href="/training-and-certification" className="text-green-700 hover:underline">Training and certification</Link>
        </div>

        <div className="mt-10">
          <AuthorCard />
        </div>
      </div>
    </>
  );
}
