'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders the newsletter CTA at the bottom of every page except the homepage.
 * The homepage places its own NewsletterCTA in-flow (a more prominent slot),
 * so suppressing it here avoids a duplicate beehiiv form on `/`.
 *
 * Takes the (server-rendered) NewsletterCTA as children so the marketing copy
 * still ships in the SSR HTML.
 */
export default function GlobalNewsletter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <>{children}</>;
}
