'use client';

// ─── AdSense display unit, App Router compatible ─────────────────────────
// Wraps a single <ins class="adsbygoogle"> and pushes (adsbygoogle).push({})
// exactly once per pathname. App Router uses client-side navigation; without
// this re-key/re-push pattern, ads only fill on the first page load.
//
// Renders nothing in non-production builds (Eugen builds locally and on
// Netlify Deploy Previews; we don't want pre-prod traffic counted as
// impressions or trip the "ads in non-content" reviewer signal).
//
// Placeholder slot IDs (TODO_...) render the <ins> but skip the push, so
// the page reserves layout space and the slot becomes live the moment a
// real ID is dropped into adSlots.ts — no redeploy needed beyond that one.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ADSENSE_CLIENT, isPlaceholderSlot } from '@/lib/adSlots';

type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';

interface AdSlotProps {
  slot: string;
  format?: AdFormat;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /** Accessible label rendered on the wrapping <aside>. Defaults to
   *  "Advertisement". Override only when context demands. */
  ariaLabel?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function AdSlot({
  slot,
  format = 'auto',
  layout,
  layoutKey,
  responsive = true,
  style,
  className,
  ariaLabel = 'Advertisement',
}: AdSlotProps) {
  const pathname = usePathname();
  const pushed = useRef(false);

  useEffect(() => {
    pushed.current = false;
  }, [pathname]);

  useEffect(() => {
    if (pushed.current) return;
    if (process.env.NODE_ENV !== 'production') return;
    if (isPlaceholderSlot(slot)) return;

    const tryPush = (attempt = 0) => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        if (attempt < 2) {
          setTimeout(() => tryPush(attempt + 1), 800);
        }
      }
    };
    tryPush();
  }, [pathname, slot]);

  return (
    <aside
      aria-label={ariaLabel}
      className={`my-8 flex justify-center ${className ?? ''}`}
    >
      <ins
        key={`${pathname}-${slot}`}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </aside>
  );
}
