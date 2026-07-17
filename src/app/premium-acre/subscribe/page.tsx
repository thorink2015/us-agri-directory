import { Metadata } from 'next';
import { AUTHOR, SITE } from '@/data/author';
import PremiumAcreSalesPage from '@/components/premium-acre/SalesPage';

// ─── The Premium Acre sales page: Tank Mix reader wave ───────────────────────
// Identical sales page for the wider Tank Mix newsletter list (the readers
// who did not join the founding list). Eugen sends them a standalone issue
// and links here, so the two waves stay on separate URLs for attribution.
// Content comes from the shared components/premium-acre/SalesPage.tsx, so
// it can never drift from /premium-acre/join. Email-only landing page:
// noindex (avoids duplicate content with /join), excluded from the sitemap,
// no internal links needed (mirrors the /advertising-terms precedent).
// -----------------------------------------------------------------------------

const PAGE_PATH = '/premium-acre/subscribe';
const DESCRIPTION =
  'The Premium Acre for Tank Mix readers: the work that pays more, who is buying and how to land it. Get the founding rate, $17 a month.';

export const metadata: Metadata = {
  title: 'The Premium Acre for Tank Mix Readers: $17/mo',
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'The Premium Acre for Tank Mix Readers: $17/mo',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Premium Acre newsletter founding membership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Premium Acre for Tank Mix Readers: $17/mo',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export default function PremiumAcreSubscribePage() {
  return (
    <PremiumAcreSalesPage
      pagePath={PAGE_PATH}
      pageName="Subscribe to The Premium Acre"
      description={DESCRIPTION}
      breadcrumbLeafName="Subscribe"
    />
  );
}
