import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, DollarSign } from 'lucide-react';
import GetMatchedWizard from '@/components/leads/GetMatchedWizard';
import { SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Get 3 Free Quotes from FAA Part 137 Drone Operators',
  description:
    'Tell us your ZIP, crop, and acreage. We will text you up to 3 verified drone spray operators in your area within 24 hours. Free, no spam.',
  alternates: { canonical: '/get-matched' },
  // Page is the lead capture itself; it is canonical and indexable.
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Get 3 Free Quotes from FAA Part 137 Drone Operators',
    description:
      '60-second match request. Up to 3 operators max, never more. Operators pay us, not you. We never sell your info.',
    url: `${SITE.domain}/get-matched`,
  },
};

export default function GetMatchedPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Get matched', item: `${SITE.domain}/get-matched` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-xs px-3 py-1.5 rounded-full mb-5 border border-white/20">
                <CheckCircle className="w-3.5 h-3.5 text-yellow-400" />
                Free, takes 60 seconds
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Get 3 free quotes from <span className="text-yellow-400">FAA Part 137</span> drone operators
              </h1>
              <p className="text-lg text-green-100 mb-6 leading-relaxed">
                Tell us your ZIP, crop, and acreage. We will text you up to 3 verified operators in your area within 24 hours.
              </p>
              <ul className="space-y-2 text-sm text-green-100">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  3 operators max, never more.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  All operators hold FAA Part 107 + Part 137 and a current state pesticide applicator license.
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  Typical row crop: $12 to $18 per acre. Operators pay us, not you.
                </li>
              </ul>
            </div>

            <div>
              <GetMatchedWizard source="get-matched-page" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-sm text-gray-600">
            Want to compare per-acre rates first?{' '}
            <Link href="/pricing" className="text-green-700 font-medium hover:underline">
              Read the full pricing guide
            </Link>{' '}
            or{' '}
            <Link href="/operators" className="text-green-700 font-medium hover:underline">
              browse all 391+ operators
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
