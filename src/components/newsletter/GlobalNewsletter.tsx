'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders the newsletter CTA at the bottom of every page except a small
 * suppress list:
 *  - `/` — the homepage places its own NewsletterCTA in-flow (a more prominent
 *    slot), so suppressing it here avoids a duplicate beehiiv form.
 *  - `/premium-acre` and `/premium-acre/join` — these are themselves
 *    newsletter pages; visitors are the newsletter audience already, so the
 *    site-wide band is redundant.
 *
 * Takes the (server-rendered) NewsletterCTA as children so the marketing copy
 * still ships in the SSR HTML.
 */
const SUPPRESS_ON = ['/', '/premium-acre', '/premium-acre/join'];

export default function GlobalNewsletter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (SUPPRESS_ON.includes(pathname)) return null;
  return <>{children}</>;
}
