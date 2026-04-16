import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import GAPageView from '@/components/analytics/GAPageView';
import { defaultMetadata } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2D6A4F',
};

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL('https://agdronedirectory.com'),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION ?? '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? '',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agdronedirectory.com',
    siteName: 'US Ag Drone Directory',
    title: 'US Agricultural Drone Directory | Find Verified Drone Operators',
    description:
      'The largest directory of agricultural drone services in America. Find verified drone operators for spraying, seeding, mapping, and scouting across all 50 states.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory — Find Verified Agricultural Drone Operators Near You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Ag Drone Directory | Find Drone Spraying Operators Near You',
    description:
      'Find verified agricultural drone operators in all 50 states. Compare rates, check certifications, and contact directly.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory — verified operators in all 50 states',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        <link rel="dns-prefetch" href="https://formspree.io" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-700 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to content
        </a>
        <GoogleAnalytics />
        <GAPageView />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
