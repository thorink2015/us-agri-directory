import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Terms of Use | US Ag Drone Directory',
  description:
    'Terms governing use of the US Agricultural Drone Directory. Free access, no warranties on listings, operator responsibility.',
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Terms of Use | US Ag Drone Directory',
    description:
      'Terms governing use of the US Agricultural Drone Directory. Free access, no warranties on listings, operator responsibility.',
    url: `${SITE.domain}/terms`,
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory Terms of Use',
      },
    ],
  },
};

const CONTACT_EMAIL = 'contact@agdronedirectory.com';
const LAST_UPDATED = 'April 17, 2026';

export default function TermsPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use',
    url: `${SITE.domain}/terms`,
    description:
      'Terms governing use of the US Agricultural Drone Directory. Free access, no warranties on listings, operator responsibility.',
    dateModified: '2026-04-17',
    publisher: { '@id': `${SITE.domain}/#organization` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Terms of Use', item: `${SITE.domain}/terms` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Terms of Use' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptance</h2>
            <p className="leading-relaxed">
              By using this website (agdronedirectory.com), you agree to these terms. If you do
              not agree, do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What this site is</h2>
            <p className="leading-relaxed">
              The US Agricultural Drone Directory is an informational resource and directory
              listing agricultural drone operators, services, regulations, and related content.
              We are not a booking platform, marketplace, or regulatory authority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">No warranty on listings</h2>
            <p className="leading-relaxed">
              We verify operator credentials (FAA Part 107, Part 137, state pesticide license)
              before publishing listings. However, we do not guarantee the accuracy, completeness,
              or current validity of any listing. Operators are responsible for maintaining their
              own certifications. Farmers should independently verify operator credentials before
              hiring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">No warranty on content</h2>
            <p className="leading-relaxed">
              Regulatory information, pricing data, and technical specifications are researched
              from public sources and updated periodically. Laws and regulations change. Prices
              fluctuate. Drone specifications are updated by manufacturers. Always verify critical
              information with the relevant authority (FAA, state department of agriculture,
              manufacturer) before making decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Not legal, financial, or agronomic advice
            </h2>
            <p className="leading-relaxed">
              Nothing on this site constitutes legal advice, financial advice, or agronomic
              recommendations. Consult a licensed attorney, financial advisor, or certified crop
              advisor for advice specific to your situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Operator responsibilities</h2>
            <p className="leading-relaxed">
              Operators who list on this directory are responsible for: maintaining valid FAA and
              state certifications, maintaining adequate insurance, complying with all federal,
              state, and local regulations, and ensuring the accuracy of their listing
              information. We reserve the right to remove listings that contain inaccurate
              credential information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Intellectual property</h2>
            <p className="leading-relaxed">
              All content on this site (text, data compilations, page designs, logos) is owned by
              the US Agricultural Drone Directory unless otherwise attributed. You may link to
              our pages. You may not scrape, reproduce, or republish our content without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of liability</h2>
            <p className="leading-relaxed">
              The US Agricultural Drone Directory is not liable for any damages arising from the
              use of this site, reliance on directory listings, or decisions made based on
              content published here. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes</h2>
            <p className="leading-relaxed">
              We may update these terms at any time. Continued use of the site after changes
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="leading-relaxed">
              Questions about these terms:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
