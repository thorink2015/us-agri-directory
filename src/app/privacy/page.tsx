import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';
import MailtoLink from '@/components/ui/MailtoLink';

export const metadata: Metadata = {
  title: 'Privacy Policy | US Ag Drone Directory',
  description:
    'How we handle your data. Google Analytics (GA4) for traffic stats, Google AdSense for display ads, cookie disclosure and opt-out links.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Privacy Policy | US Ag Drone Directory',
    description:
      'How we handle your data. Google Analytics (GA4) for traffic stats, Google AdSense for display ads, cookie disclosure and opt-out links.',
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
const LAST_UPDATED = 'May 13, 2026';

export default function PrivacyPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: `${SITE.domain}/privacy`,
    description:
      'Privacy policy for US Ag Drone Directory. Covers Google Analytics (GA4) traffic stats, Google AdSense display advertising, cookies and opt-out links.',
    dateModified: '2026-05-13',
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
              We use Google Analytics (GA4) for traffic statistics. GA4 uses first-party cookies
              to measure page views, referral sources and aggregate device data. We do not use
              Facebook Pixel or any social-media retargeting trackers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Advertising and cookies</h2>
            <p className="leading-relaxed mb-3">
              This site uses Google AdSense to display ads on selected content pages. Google and
              its third-party vendors use cookies (including the DoubleClick DART cookie) and
              similar technologies to serve ads based on a user&rsquo;s prior visits to this site
              or other sites.
            </p>
            <p className="leading-relaxed mb-3">
              Google&rsquo;s use of advertising cookies enables it and its partners to serve ads
              to users based on their visit to this site and other sites on the internet. Users
              may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
            <p className="leading-relaxed mb-3">
              Third-party vendors, including Google, may also use cookies to serve ads based on a
              user&rsquo;s prior visits to this and other websites. Users may opt out of
              third-party vendor cookie use for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                aboutads.info/choices
              </a>{' '}
              or{' '}
              <a
                href="https://www.youronlinechoices.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                youronlinechoices.eu
              </a>{' '}
              (for users in the EU/UK).
            </p>
            <p className="leading-relaxed">
              For more information on how Google uses data from this site, visit{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                How Google uses information from sites or apps that use our services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies on this site</h2>
            <p className="leading-relaxed mb-3">
              This site uses three classes of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Strictly necessary:</strong> set by Next.js and Netlify for site
                functionality (no opt-out available, no personal data collected).
              </li>
              <li>
                <strong>Analytics:</strong> first-party Google Analytics (GA4) cookies for
                aggregate traffic measurement.
              </li>
              <li>
                <strong>Advertising:</strong> Google AdSense and its certified third-party
                vendors may set cookies to serve and measure ads, including personalized ads
                when a user has consented elsewhere on the web. Opt-out links are in the
                section above.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What we do NOT do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not sell your personal data to anyone</li>
              <li>We do not build our own behavioral profiles</li>
              <li>We do not use Facebook Pixel or social retargeting trackers</li>
              <li>We do not share contact-form or List Your Business submissions with advertisers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-party services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics (GA4): aggregate traffic statistics</li>
              <li>Google AdSense: display advertising on selected content pages</li>
              <li>Formspree (formspree.io): contact and List Your Business form delivery</li>
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
