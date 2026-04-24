'use client';

import { useEffect, useRef } from 'react';
import { getAffiliateLink } from '@/data/affiliates';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface Props {
  slug: string;
  linkText: string;
  className?: string;
}

export default function AffiliateTextLink({
  slug,
  linkText,
  className = '',
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const firedRef = useRef(false);
  const link = getAffiliateLink(slug);

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current || !link) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              window.gtag('event', 'affiliate_impression', {
                partner: link.partner,
                affiliate_slug: link.slug,
                page_path: window.location.pathname,
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [link]);

  function handleClick() {
    if (!link) return;
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        partner: link.partner,
        affiliate_slug: link.slug,
        destination: link.destination,
        category: link.category,
        page_path: window.location.pathname,
      });
    }
  }

  if (!link) return null;

  return (
    <>
      <a
        ref={ref}
        href={`/go/${link.slug}`}
        onClick={handleClick}
        rel="sponsored nofollow noopener"
        target="_blank"
        className={
          className ||
          'text-green-800 underline decoration-green-300 underline-offset-2 hover:decoration-green-700'
        }
      >
        {linkText}
      </a>
      <span className="text-[10px] uppercase tracking-wide text-gray-400 ml-1">
        (affiliate)
      </span>
    </>
  );
}
