import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AUTHOR, SITE } from '@/data/author';
import StateBriefForm from './StateBriefForm';

// ─── State brief request landing page ─────────────────────────────────────
// Single-purpose form. Reached from the Tank Mix newsletter "Send me my state
// brief" CTA. Collects operator location so Eugen can build a personalized
// brief on local buyers (city, county, and state agencies buying drone work
// near them) plus what their state makes them carry to bid on that work.
// Posts to the site's existing Formspree endpoint with
// _form_type "state-brief-request". Copy is Eugen's from the newsletter.
// Chrome matches /premium-acre (minimal, form-first).
// -----------------------------------------------------------------------------

const PAGE_PATH = '/state-brief';
const DESCRIPTION =
  "Everything in the newsletter is national. Your money is local. Give me your state and nearest good sized town and I'll build you a brief on the agencies buying this work near you, where they post bids and what your state makes you carry.";

export const metadata: Metadata = {
  title: 'Get your state brief | AgDroneDirectory',
  description: DESCRIPTION,
  keywords: [
    'ag drone state brief',
    'drone spraying state agencies',
    'local drone spraying bids',
    'state licensing brief',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Get your state brief',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Get your state brief',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get your state brief',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export default function StateBriefPage() {
  const absoluteUrl = `${SITE.domain}${PAGE_PATH}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'State brief', item: absoluteUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Get your state brief',
    description: DESCRIPTION,
    url: absoluteUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Free and new
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 text-balance">
            Tell me where you fly
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Everything in the newsletter is national. Your money is local. Tell
            me your state, your nearest good sized town, and how far you will
            travel. I&apos;ll build you a brief on the agencies buying this
            work near you, where they post bids and what your state makes you
            carry.
          </p>

          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-8 text-left">
            <StateBriefForm />
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-6">
            One brief per operator. Your details stay with me and are never
            resold. Only choosing the state is fine, whole state is fine.
          </p>
        </div>
      </div>
    </>
  );
}
