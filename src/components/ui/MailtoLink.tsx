'use client';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  email: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/**
 * Renders mailto href only after client mount, so Cloudflare's
 * Email Address Obfuscation never sees a mailto: in the SSR HTML
 * and doesn't rewrite it to /cdn-cgi/l/email-protection (a 404 for crawlers).
 */
export default function MailtoLink({ email, className, onClick, children }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const href = mounted ? `mailto:${email}` : undefined;
  return (
    <a href={href} className={className} onClick={onClick} rel="nofollow">
      {children}
    </a>
  );
}
