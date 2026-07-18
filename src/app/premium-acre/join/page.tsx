import { Metadata } from 'next';
import { AUTHOR, SITE } from '@/data/author';
import PremiumAcreSalesPage from '@/components/premium-acre/SalesPage';

// ─── The Premium Acre sales page: founding-list wave ─────────────────────────
// Indexable canonical sales page for the paid newsletter, sent to the
// founding-list signups. The full page lives in the shared
// components/premium-acre/SalesPage.tsx so this route and the email-only
// /premium-acre/subscribe copy can never drift apart. This route owns only
// its metadata.
// -----------------------------------------------------------------------------

const PAGE_PATH = '/premium-acre/join';
const DESCRIPTION =
  'A paid newsletter for ag drone operators: the work that pays more, who is buying and how to land it. Get the founding rate, $17 a month.';

export const metadata: Metadata = {
  title: 'Join The Premium Acre: $17 Founding Member Rate',
  description: DESCRIPTION,
  keywords: [
    'the premium acre',
    'paid newsletter for drone operators',
    'ag drone operator membership',
    'premium acre founding member',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Join The Premium Acre: $17 Founding Member Rate',
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
    title: 'Join The Premium Acre: $17 Founding Member Rate',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

export default function PremiumAcreJoinPage() {
  return (
    <PremiumAcreSalesPage
      pagePath={PAGE_PATH}
      pageName="Join The Premium Acre"
      description={DESCRIPTION}
      breadcrumbLeafName="Join"
      variant="founding"
    />
  );
}
