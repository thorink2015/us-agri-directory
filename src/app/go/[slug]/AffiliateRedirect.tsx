'use client';

import { useEffect } from 'react';
import { getAffiliateLink, buildAffiliateUrl } from '@/data/affiliates';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sanitizeReferrerPath(): string {
  if (typeof document === 'undefined') return 'direct';
  try {
    const ref = document.referrer;
    if (!ref) return 'direct';
    const url = new URL(ref);
    const path = url.pathname || '/';
    const cleaned = path.replace(/[^a-zA-Z0-9/-]/g, '').slice(0, 120);
    return cleaned || 'direct';
  } catch {
    return 'direct';
  }
}

interface Props {
  slug: string;
}

export default function AffiliateRedirect({ slug }: Props) {
  const link = getAffiliateLink(slug);
  const finalUrl = link ? buildAffiliateUrl(link) : '';

  useEffect(() => {
    if (!link) return;
    const referrer_path = sanitizeReferrerPath();

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        partner: link.partner,
        affiliate_slug: link.slug,
        destination: link.destination,
        category: link.category,
        referrer_path,
      });
      window.gtag('event', 'affiliate_click_source', {
        partner: link.partner,
        affiliate_slug: link.slug,
        referrer_path,
      });
    }

    // Small delay so the GA4 beacon has a chance to flush before navigation.
    const id = window.setTimeout(() => {
      window.location.replace(finalUrl);
    }, 120);
    return () => window.clearTimeout(id);
  }, [link, finalUrl]);

  if (!link) return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          Redirecting to {link.partnerDisplayName}...
        </h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          If your browser does not redirect automatically within a few seconds,
          click the link below.
        </p>
        <a
          href={finalUrl}
          rel="sponsored nofollow noopener"
          target="_blank"
          className="inline-block px-5 py-2.5 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors"
        >
          Continue to {link.partnerDisplayName}
        </a>
        <p className="text-xs text-gray-500 mt-6">
          This is an affiliate link. If you buy through it we may earn a
          commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
