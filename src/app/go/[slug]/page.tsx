import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAffiliateLink, affiliateLinks } from '@/data/affiliates';
import AffiliateRedirect from './AffiliateRedirect';

export const metadata: Metadata = {
  title: 'Redirecting...',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export function generateStaticParams() {
  return affiliateLinks.map((l) => ({ slug: l.slug }));
}

interface Props {
  params: { slug: string };
}

export default function GoPage({ params }: Props) {
  const link = getAffiliateLink(params.slug);
  if (!link) notFound();

  return <AffiliateRedirect slug={link.slug} />;
}
