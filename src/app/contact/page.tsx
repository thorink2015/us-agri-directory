import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ContactForm from './ContactForm';
import { AUTHOR, SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Contact US Ag Drone Directory',
  description:
    'Get in touch with US Ag Drone Directory, submit your listing, ask a question or send us feedback.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: `Contact ${SITE.name}`,
    description: 'Submit your listing, report a correction or send partnership inquiries.',
    url: `${SITE.domain}/contact`,
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE.name}`,
    url: `${SITE.domain}/contact`,
    description: 'Contact the US Agricultural Drone Directory team for listings, corrections, partnerships or media inquiries.',
    isPartOf: { '@id': `${SITE.domain}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE.domain}/#organization`,
      name: SITE.name,
      email: AUTHOR.publicEmail,
      url: SITE.domain,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.domain}/contact` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ label: 'Contact' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Use the forms below to submit your listing or to get in touch with our team.
      </p>

      <div className="grid grid-cols-1 gap-10">

        {/* Submit to directory */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-2">
              For operators
            </span>
            <h2 className="text-xl font-bold text-gray-900">Submit to the Directory</h2>
            <p className="text-sm text-gray-600 mt-1">
              Are you a certified ag drone operator? Get listed for free. We review and publish within 48 hours.
            </p>
          </div>
          <ContactForm type="listing" />
        </section>

        {/* General contact */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full mb-2">
              General
            </span>
            <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
            <p className="text-sm text-gray-600 mt-1">
              Questions, corrections, partnerships or feedback, we respond within 48 business hours.
            </p>
          </div>
          <ContactForm type="contact" />
        </section>

      </div>
    </div>
  );
}
