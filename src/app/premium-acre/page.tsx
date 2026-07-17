import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { AUTHOR, SITE } from '@/data/author';
import PremiumAcreForm from './PremiumAcreForm';

// ─── Coming-soon founding-list landing page for the paid newsletter ──────────
// The Premium Acre. Single-purpose, centered, form-first. Reuses the global
// header/footer from the root layout. The signup posts to the site's existing
// Formspree endpoint (NEXT_PUBLIC_FORMSPREE_ID) with _form_type
// "premium-acre-signup", per the site's form convention. Copy is Eugen's.
// -----------------------------------------------------------------------------

const PAGE_PATH = '/premium-acre';
const DESCRIPTION =
  "A paid newsletter for ag drone operators. I do the digging so you don't have to: the work that pays more than commodity acres, who buys it and how to land it. Join the founding list.";

export const metadata: Metadata = {
  title: 'The Premium Acre | AgDroneDirectory',
  description: DESCRIPTION,
  keywords: [
    'the premium acre',
    'ag drone operator newsletter',
    'drone spraying business newsletter',
    'premium acre founding list',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'The Premium Acre: a paid newsletter for ag drone operators',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Premium Acre newsletter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Premium Acre: a paid newsletter for ag drone operators',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export default function PremiumAcrePage() {
  const absoluteUrl = `${SITE.domain}${PAGE_PATH}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'The Premium Acre', item: absoluteUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The Premium Acre',
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
            <Mail className="w-3.5 h-3.5" />
            Coming soon
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 text-balance">
            The Premium Acre
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            A paid newsletter for ag drone operators.
          </p>
          <p className="text-lg font-bold text-gray-900 leading-relaxed mb-8">
            You do the flying. I do the digging.
          </p>

          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-8 text-left">
            <PremiumAcreForm />
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-6">
            Every month I find the work that pays more than commodity acres, who
            buys it, what it pays and how to land it. Plus how to get your own
            business found online, so farmers come looking for you.
          </p>

          <p className="text-sm text-gray-700 mt-8">
            Ready now? Founding membership is open.{' '}
            <Link
              href="/premium-acre/join"
              className="inline-flex items-center gap-1 font-semibold text-green-800 hover:underline"
            >
              See what is inside
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
