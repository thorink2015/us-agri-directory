import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Plane, MapPin, Lock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-17';

const FAQS = [
  {
    question: 'Can I spray crops with just a Part 107 license?',
    answer:
      'No. Part 107 authorizes you to fly a drone commercially but does not authorize aerial application of pesticides. You also need Part 137 and a state commercial pesticide applicator license with aerial endorsement.',
  },
  {
    question: 'Is drone crop spraying legal in all 50 states?',
    answer:
      'Yes. Every state has a pathway for licensed commercial drone pesticide application. The specific aerial category, exam requirements, fees, and unique rules vary significantly by state.',
  },
  {
    question: 'Which agency do I contact first?',
    answer:
      'Start with your state department of agriculture for the pesticide applicator license, then FAA for Part 107 (2 to 4 weeks) and Part 137 (90 to 180 days). The state license is often the fastest to obtain and informs your Part 137 application.',
  },
];

const SUBPAGES = [
  {
    href: '/regulations/faa-part-107',
    name: 'FAA Part 107',
    icon: Plane,
    description: 'Remote pilot certification: the baseline for all commercial drone operations.',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    href: '/regulations/faa-part-137',
    name: 'FAA Part 137',
    icon: Shield,
    description: 'Agricultural aircraft operator certificate and Section 44807 exemption for spray drones.',
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    href: '/regulations/state-licensing',
    name: 'State Licensing',
    icon: MapPin,
    description: '50-state commercial pesticide applicator requirements for drone aerial application.',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    href: '/regulations/ndaa-compliance',
    name: 'NDAA Compliance',
    icon: Lock,
    description: 'What drone operators need to know about NDAA restrictions on Chinese-manufactured drones.',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
];

export const metadata: Metadata = {
  title: 'Drone Spraying Regulations: FAA, State & Federal 2026',
  description:
    'Complete guide to FAA Part 107, Part 137, state pesticide licensing, and NDAA compliance for agricultural drone operators in 2026.',
  alternates: { canonical: '/regulations' },
  openGraph: {
    title: 'US Agricultural Drone Spraying Regulations (2026)',
    description:
      'FAA Part 107, Part 137, state pesticide licensing, and NDAA compliance, the three-credential stack required for commercial ag drone spraying.',
    url: `${SITE.domain}/regulations`,
  },
};

export default function RegulationsHubPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'US Agricultural Drone Spraying Regulations',
    description:
      'Commercial drone spraying requires FAA Part 107, FAA Part 137, and a state commercial pesticide applicator license. NDAA compliance is a fourth layer for federal and state-funded work.',
    url: `${SITE.domain}/regulations`,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    datePublished: '2026-01-01',
    dateModified: LAST_REVIEWED,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Regulations', item: `${SITE.domain}/regulations` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Regulations' }]} />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          US Agricultural Drone Spraying Regulations
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Commercial drone spraying in the United States requires three credentials: FAA Part 107 remote pilot certificate, FAA Part 137 agricultural aircraft operator certificate (with Section 44807 exemption for drones over 55 lbs), and a state commercial pesticide applicator license with aerial category endorsement. NDAA compliance adds a fourth layer for operators working federal or state-funded contracts.
          </p>
        </div>

        {/* Body overview */}
        <section className="prose prose-sm max-w-none mb-10 space-y-4 text-gray-700 leading-relaxed">
          <p>
            Agricultural drone spraying is legal in all 50 states but operates under a layered regulatory framework with no single drone spray license. Three separate agencies govern the activity. The FAA controls airspace access and aircraft certification through Part 107 (pilot) and Part 137 (agricultural aircraft operations). The EPA governs pesticide product labels, which dictate carrier volume, droplet size, buffer zones, and wind limits. State departments of agriculture issue commercial pesticide applicator licenses with aerial category endorsements that vary significantly from state to state.
          </p>
          <p>
            Understanding where these layers overlap is critical. A valid Part 107 alone does not authorize commercial spraying. A state pesticide license alone does not authorize flight. Only the complete stack (Part 107 + Part 137 + state license) makes a commercial drone spray operation legal. This guide covers each layer with links to the primary source for every requirement.
          </p>
          <p>
            Start at the state level. Most state departments of agriculture publish the pesticide applicator study manual online and offer the exam within 30 days of request. Submit your FAA Part 107 application in parallel; the online knowledge test is bookable within 2 to 4 weeks at PSI testing centers. Part 137 is the slowest step: an operations manual, training records, and a Section 44807 exemption petition are required, with FAA approval typically taking 90 to 180 days.
          </p>
          <p>
            If your work includes federal contracts, USDA-funded research, or state programs tied to federal dollars, NDAA compliance becomes a fourth requirement. The practical effect is platform choice: DJI and XAG drones are legal in private commercial use but excluded from most federally funded work. Hylio AG-272, Hylio AG-230, and Pyka Pelican 2 are the primary NDAA-compliant spray platforms in 2026.
          </p>
        </section>

        {/* Sub-page cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">The four regulatory layers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SUBPAGES.map((sp) => {
              const Icon = sp.icon;
              return (
                <Link
                  key={sp.href}
                  href={sp.href}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-md transition-all flex flex-col"
                >
                  <div className={`w-12 h-12 ${sp.color} border rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                    {sp.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{sp.description}</p>
                  <span className="text-sm text-green-700 font-medium group-hover:underline inline-flex items-center gap-1">
                    Read guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Regulations questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* Internal links */}
        <div className="mb-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/states" className="text-green-700 hover:underline">State-by-state licensing</Link>
          <Link href="/training" className="text-green-700 hover:underline">Training providers</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/start-a-drone-business" className="text-green-700 hover:underline">Start a drone business</Link>
          <Link href="/tools" className="text-green-700 hover:underline">Free tools and calculators</Link>
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/list-your-business" className="text-green-700 hover:underline">List your business</Link>
        </div>

        <AuthorCard />
      </div>
    </>
  );
}
