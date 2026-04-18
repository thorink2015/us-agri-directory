import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, Globe } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import SubmitForm from './SubmitForm';
import { operators } from '@/data/operators';
import { AUTHOR, SITE } from '@/data/author';

const FAQS = [
  {
    question: 'Is listing really free?',
    answer:
      'Yes. No listing fee, no commission, no booking fee. We may offer optional premium features (featured placement) in the future but basic listings will always be free.',
  },
  {
    question: 'How long does verification take?',
    answer:
      'Typically 3 to 5 business days. We verify FAA Part 107, Part 137 (or Section 44807 exemption), and your state commercial pesticide applicator credentials before publishing. Profiles with all documentation in order are often live within 48 hours.',
  },
  {
    question: 'Can I update my listing later?',
    answer: `Yes. Email ${AUTHOR.publicEmail} with your updates and we will process changes within 48 hours. There is no limit on how many times you can update your listing.`,
  },
];

export const metadata: Metadata = {
  title: 'List Your Drone Business Free | US Ag Drone Directory',
  description:
    'List your agricultural drone business for free. Reach US farmers searching for drone operators. No commission, no booking fee, no pay-for-placement.',
  alternates: { canonical: '/list-your-business' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'List Your Agricultural Drone Business for Free',
    description:
      'Free listing for verified US agricultural drone operators. Review and publish within 3 to 5 business days.',
    url: `${SITE.domain}/list-your-business`,
    siteName: SITE.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'List Your Agricultural Drone Business for Free',
      },
    ],
  },
};

export default function ListYourBusinessPage() {
  const operatorCount = operators.length;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'List Your Agricultural Drone Business for Free',
    url: `${SITE.domain}/list-your-business`,
    description:
      'Submit your ag drone business to the US Ag Drone Directory. Free listing, no commission, credential verification within 3 to 5 business days.',
    isPartOf: { '@id': `${SITE.domain}/#organization` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'List Your Business', item: `${SITE.domain}/list-your-business` },
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[{ label: 'List Your Business' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        List your agricultural drone business for free
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Listings are <strong>100% free</strong> and published within 3 to 5 business days of credential review.
      </p>

      {/* AEO block */}
      <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-8">
        <p className="text-sm text-gray-700 leading-relaxed">
          The US Agricultural Drone Directory lists {operatorCount}+ verified operators across all 50 states. Listing is free with no commission, no booking fee, and no pay-for-placement. Operators must hold FAA Part 107, FAA Part 137 (or Section 44807 exemption), and a state commercial pesticide applicator license with an aerial or drone endorsement.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: CheckCircle, title: 'Always free', desc: 'No listing fee, no commission, no booking fee.' },
          { icon: Clock, title: 'Fast review', desc: 'Credentials verified in 3 to 5 business days.' },
          { icon: Globe, title: 'SEO visibility', desc: 'Profile appears in state, crop, and service search.' },
        ].map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-green-200">
            <b.icon className="w-7 h-7 text-green-600 mb-2" />
            <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
            <div className="text-xs text-gray-600">{b.desc}</div>
          </div>
        ))}
      </div>

      <section className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-6 mb-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What you get</h2>
          <ul className="list-disc pl-5 space-y-1 not-prose text-sm">
            <li>A dedicated profile page visible to farmers searching by state, crop, and service</li>
            <li>Your contact details (phone, email, website) displayed directly to farmers, no middleman</li>
            <li>No commission on jobs booked through the directory</li>
            <li>Inclusion in state, crop, service, and drone-model filtered search results</li>
            <li>A verified badge once your FAA and state credentials are confirmed</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1 not-prose text-sm">
            <li>Valid FAA Part 107 remote pilot certificate</li>
            <li>Valid FAA Part 137 agricultural aircraft operator certificate (or Section 44807 exemption for drones over 55 lbs)</li>
            <li>Current state commercial pesticide applicator license with aerial or drone category</li>
            <li>Active commercial drone liability insurance</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How it works</h2>
          <ol className="list-decimal pl-5 space-y-1 not-prose text-sm">
            <li>Fill out the form below with your business details and credentials</li>
            <li>We verify FAA Part 107, Part 137, and state pesticide license (typically 3 to 5 business days)</li>
            <li>Your listing goes live on the directory and is indexed in state, crop, and service search</li>
            <li>Farmers find you and contact you directly, no booking fees or commissions</li>
          </ol>
        </div>
      </section>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Business registration form</h2>
        <SubmitForm />
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* Internal links */}
      <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link href="/about" className="text-green-700 hover:underline">About the directory</Link>
        <Link href="/states" className="text-green-700 hover:underline">Browse by state</Link>
        <Link href="/services" className="text-green-700 hover:underline">Browse services</Link>
        <Link href="/regulations" className="text-green-700 hover:underline">Regulations</Link>
        <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
      </div>
    </div>
  );
}
