'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Fires a GA4 page_view event on every client-side route change.
 * Next.js App Router does client-side navigation between pages — without this,
 * GA4 only records the first page load and misses all subsequent navigations.
 *
 * Add <GAPageView /> inside the root layout (after <GoogleAnalytics />).
 */
export default function GAPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    if (window.location.hostname !== 'terradron.ro') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
