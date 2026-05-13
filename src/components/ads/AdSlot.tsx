'use client';

// ─── AdSense display unit, App Router compatible ─────────────────────────
// Wraps a single <ins class="adsbygoogle"> and pushes (adsbygoogle).push({})
// exactly once per pathname. App Router uses client-side navigation; without
// this re-key/re-push pattern, ads only fill on the first page load.
//
// Production rendering is gated on the build-time env var
// NEXT_PUBLIC_ADS_ENABLED. The default ("not set" or "false") means the
// component returns null in production — no <ins class="adsbygoogle"> in
// the page source — so AdSense reviewers crawling the site before approval
// see zero ad markup. Flip the env var on Netlify to "true" only after
// AdSense approves the account and real slot IDs are populated in
// `src/lib/adSlots.ts`.
//
// In non-production builds (`npm run dev`, Netlify Deploy Previews) the
// component always renders a dashed dev placeholder so Eugen can see
// exactly where slots live in the layout. The placeholder never makes a
// network call and never invokes the adsbygoogle queue.
//
// When the env var IS true:
//   - Placeholder slot IDs (TODO_...) still render the <ins> but skip the
//     push() call, so the page reserves layout space and the slot becomes
//     live the moment a real ID is dropped into adSlots.ts.
//   - Real slot IDs push exactly once per pathname change, with up to two
//     800 ms retries while the AdSense script is hydrating.
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

// Read once at module scope. `NEXT_PUBLIC_*` env vars are inlined at build
// time so this is effectively a constant per deploy.
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

function DevPlaceholder({ slot }: { slot: string }) {
  return (
    <aside
      aria-label="Ad slot placeholder (dev only)"
      className="my-8 mx-auto max-w-3xl"
    >
      <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg px-4 py-6 text-center">
        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
          Ad slot
        </p>
        <p className="text-xs text-gray-400 mt-1 font-mono break-all">
          {slot}
        </p>
      </div>
    </aside>
  );
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
    if (!ADS_ENABLED) return;
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

  // Master kill switch. In production, render nothing at all — no <ins> tag
  // hits the HTML, so AdSense reviewers and search engines see a clean page
  // until Eugen flips NEXT_PUBLIC_ADS_ENABLED on Netlify.
  if (!ADS_ENABLED) {
    if (process.env.NODE_ENV !== 'production') {
      return <DevPlaceholder slot={slot} />;
    }
    return null;
  }

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
