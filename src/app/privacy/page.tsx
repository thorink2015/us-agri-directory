import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';
import MailtoLink from '@/components/ui/MailtoLink';

export const metadata: Metadata = {
  title: 'Privacy Policy | US Ag Drone Directory',
  description:
    'How we handle your data. Google Analytics (GA4) for anonymous traffic stats. No ads, no behavioral profiling, no data sales.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Privacy Policy | US Ag Drone Directory',
    description:
      'How we handle your data. Google Analytics (GA4) for anonymous traffic stats. No ads, no behavioral profiling, no data sales.',
    url: `${SITE.domain}/privacy`,
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory Privacy Policy',
      },
    ],
  },
};

const CONTACT_EMAIL = 'contact@agdronedirectory.com';
const LAST_UPDATED = 'April 17, 2026';

export default function PrivacyPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: `${SITE.domain}/privacy`,
    description:
      'Privacy policy for US Ag Drone Directory. Google Analytics (GA4) for anonymous traffic stats, no ads, no data sales.',
    dateModified: '2026-04-17',
    publisher: { '@id': `${SITE.domain}/#organization` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE.domain}/privacy` },
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
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What we collect</h2>
            <p className="leading-relaxed mb-3">
              When you submit a listing through our List Your Business form, we collect the
              information you provide: business name, contact name, email, phone, website,
              location, services, certifications and drone models. This information is displayed
              publicly on your operator listing page.
            </p>
            <p className="leading-relaxed">
              When you use our contact form, we collect your name, email and message content to
              respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Analytics</h2>
            <p className="leading-relaxed">
              We use Google Analytics (GA4) for anonymous traffic statistics. GA4 uses first-party
              cookies. We do not use advertising trackers, Facebook Pixel or behavioral profiling
              tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What we do NOT do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not sell your data to anyone</li>
              <li>We do not share your data with advertisers</li>
              <li>We do not build behavioral profiles</li>
              <li>We do not serve ads</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies</h2>
            <p className="leading-relaxed">
              This site uses strictly necessary cookies for site functionality and first-party
              cookies from Google Analytics (GA4) for anonymous traffic measurement. No marketing
              or advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-party services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics (GA4): anonymous traffic statistics</li>
              <li>Netlify (netlify.com): hosting</li>
              <li>Cloudflare (cloudflare.com): CDN and security</li>
            </ul>
            <p className="leading-relaxed mt-3">
              These services process data as described in their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Operator listings</h2>
            <p className="leading-relaxed">
              Information submitted through the List Your Business form is published on the
              directory. If you want your listing updated or removed, email{' '}
              <MailtoLink email={CONTACT_EMAIL} className="text-green-700 underline">
                {CONTACT_EMAIL}
              </MailtoLink>{' '}
              with subject &quot;Listing update&quot; or &quot;Listing removal.&quot;
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your rights</h2>
            <p className="leading-relaxed">
              You can request access to, correction of or deletion of any personal data we hold
              by emailing{' '}
              <MailtoLink email={CONTACT_EMAIL} className="text-green-700 underline">
                {CONTACT_EMAIL}
              </MailtoLink>
              . We respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="leading-relaxed">
              Questions about this policy:{' '}
              <MailtoLink email={CONTACT_EMAIL} className="text-green-700 underline">
                {CONTACT_EMAIL}
              </MailtoLink>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
