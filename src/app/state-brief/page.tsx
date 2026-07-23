import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AUTHOR, SITE } from '@/data/author';
import StateBriefForm from './StateBriefForm';

// ─── State brief request landing page ─────────────────────────────────────
// Single-purpose form. Reached from the Tank Mix newsletter "Send me my state
// brief" CTA. The header, footer and the site-wide newsletter band are all
// suppressed for this route (see Header.tsx, Footer.tsx, GlobalNewsletter.tsx)
// so the page reads as a focused lead-capture. Posts to Formspree with
// _form_type "state-brief-request".
// -----------------------------------------------------------------------------

const PAGE_PATH = '/state-brief';
const DESCRIPTION =
  "Tell me where you fly and I'll send you a short brief with the local buyers hiring drone operators near you plus what you need to bid on that work.";

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

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Fill this out and I&apos;ll email you back a short brief with:
          </p>

          <ul className="text-left text-base text-gray-800 leading-relaxed mb-8 space-y-2 max-w-md mx-auto">
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-green-700 font-bold">·</span>
              <span>Local buyers hiring drone operators near you (cities, counties, state agencies)</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-green-700 font-bold">·</span>
              <span>Where they post their bids</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="text-green-700 font-bold">·</span>
              <span>What your state or country requires you to have to bid on that work</span>
            </li>
          </ul>

          <div
            id="state-brief-form"
            className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-8 text-left scroll-mt-24"
          >
            <StateBriefForm />
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-6">
            Free. One brief per operator. Your details stay with me and are
            never resold.
          </p>
        </div>
      </div>
    </>
  );
}
