'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getAffiliateLink } from '@/data/affiliates';
import AffiliateDisclosure from './AffiliateDisclosure';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Variant = 'standard' | 'compact';

interface Props {
  slug: string;
  heading: string;
  bullets: string[];
  ctaLabel: string;
  variant?: Variant;
}

export default function AffiliateCard({
  slug,
  heading,
  bullets,
  ctaLabel,
  variant = 'standard',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
                page_path:
                  typeof window !== 'undefined' ? window.location.pathname : '',
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

  const href = `/go/${link.slug}`;
  const isCompact = variant === 'compact';

  return (
    <div
      ref={ref}
      className={`not-prose bg-white border border-stone-200 rounded-2xl shadow-sm ${
        isCompact ? 'p-5' : 'p-6'
      } my-8`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-green-800 mb-2">
            Recommended course
          </div>
          <h3
            className={`font-serif font-bold text-gray-900 leading-snug ${
              isCompact ? 'text-lg' : 'text-xl md:text-2xl'
            }`}
          >
            {heading}
          </h3>
        </div>
        {link.logoPath && (
          <div className="shrink-0">
            <Image
              src={link.logoPath}
              alt={`${link.partnerDisplayName} logo`}
              width={120}
              height={40}
              style={{ height: 40, width: 'auto' }}
              unoptimized
            />
          </div>
        )}
      </div>

      {bullets.length > 0 && (
        <ul className={`space-y-2 ${isCompact ? 'mb-4' : 'mb-5'}`}>
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed"
            >
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-700 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <a
        href={href}
        onClick={handleClick}
        rel="sponsored nofollow noopener"
        target="_blank"
        className={`inline-flex items-center gap-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors ${
          isCompact ? 'px-4 py-2 text-sm' : 'px-5 py-2.5'
        }`}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </a>

      <div className="mt-4 pt-3 border-t border-stone-100">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
