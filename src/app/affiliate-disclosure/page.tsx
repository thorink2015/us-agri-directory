import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';
import { getActivePartners } from '@/data/affiliates';
import MailtoLink from '@/components/ui/MailtoLink';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | US Ag Drone Directory',
  description:
    'How the Ag Drone Directory uses affiliate links. Our editorial and recommendation policy, and the partners we currently earn commissions from.',
  alternates: { canonical: '/affiliate-disclosure' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Affiliate Disclosure | US Ag Drone Directory',
    description:
      'How the Ag Drone Directory uses affiliate links and our editorial recommendation policy.',
    url: `${SITE.domain}/affiliate-disclosure`,
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory Affiliate Disclosure',
      },
    ],
  },
};

const LAST_UPDATED = 'April 24, 2026';
const CONTACT_EMAIL = 'eugen@agdronedirectory.com';

const CATEGORY_LABELS: Record<string, string> = {
  training: 'Training and courses',
  insurance: 'Insurance',
  equipment: 'Equipment and drones',
  software: 'Software',
};

export default function AffiliateDisclosurePage() {
  const partners = getActivePartners();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Affiliate Disclosure',
    url: `${SITE.domain}/affiliate-disclosure`,
    description:
      'Affiliate disclosure for US Ag Drone Directory. How we handle recommendations, commissions, and editorial independence.',
    dateModified: '2026-04-24',
    publisher: { '@id': `${SITE.domain}/#organization` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Affiliate Disclosure',
        item: `${SITE.domain}/affiliate-disclosure`,
      },
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
        <Breadcrumb items={[{ label: 'Affiliate Disclosure' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Affiliate Disclosure
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <p className="leading-relaxed">
              US Ag Drone Directory participates in affiliate programs. Some of
              the outbound links on this site are affiliate links, which means
              if you click through and make a purchase, we may earn a
              commission at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How we decide what to recommend
            </h2>
            <p className="leading-relaxed mb-3">
              We only recommend products and services we believe genuinely
              serve farmers and agricultural drone operators. We do not accept
              payment for positive reviews, and we do not include a partner in
              a guide or buyer&apos;s guide unless we would recommend them to a
              working operator without the commission.
            </p>
            <p className="leading-relaxed">
              Affiliate revenue funds the research behind this directory. It
              does not influence which FAA data, EPA rules, or state licensing
              facts we publish. Regulatory coverage is always based on primary
              sources (FAA, EPA, USDA, land-grant extension).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How affiliate links look on the site
            </h2>
            <p className="leading-relaxed mb-3">
              Affiliate links are always marked. Cards include a disclosure
              line. Inline text links carry an &quot;(affiliate)&quot; tag next
              to them. Every affiliate link is flagged with{' '}
              <code className="text-[13px] bg-gray-100 px-1 py-0.5 rounded">
                rel=&quot;sponsored nofollow noopener&quot;
              </code>{' '}
              and routes through our redirect at{' '}
              <code className="text-[13px] bg-gray-100 px-1 py-0.5 rounded">
                /go/[partner]
              </code>
              , which is excluded from search engine indexing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Current active partners
            </h2>
            {partners.length === 0 ? (
              <p className="leading-relaxed">
                No active partners at this time.
              </p>
            ) : (
              <ul className="space-y-3 list-none p-0">
                {partners.map((p) => (
                  <li
                    key={p.partner}
                    className="border border-stone-200 rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {p.partnerDisplayName}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Category:{' '}
                          {CATEGORY_LABELS[p.category] ?? p.category}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Your rights as a reader
            </h2>
            <p className="leading-relaxed">
              You are never required to use our affiliate links. If you prefer,
              you can go directly to any partner&apos;s website and search for
              their product. The recommendation stands either way. Our job is
              to surface real, useful resources for people building an ag drone
              operation or hiring one.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              FTC compliance
            </h2>
            <p className="leading-relaxed">
              This disclosure is published under the FTC&apos;s{' '}
              <a
                href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline"
              >
                Guides Concerning the Use of Endorsements and Testimonials in
                Advertising
              </a>
              . If you have questions about how we use affiliate links, contact
              us at{' '}
              <MailtoLink email={CONTACT_EMAIL}>{CONTACT_EMAIL}</MailtoLink>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
