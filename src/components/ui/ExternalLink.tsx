'use client';

import { addUtmParams } from '@/lib/utils';
import { trackOperatorWebsiteClick } from '@/components/analytics/events';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  operatorSlug: string;
  source?: string;
  children: React.ReactNode;
  withUtm?: boolean;
}

/**
 * UTM-tracked external link component.
 * Automatically appends UTM parameters and fires a GA4 event on click.
 *
 * Usage:
 *   <ExternalLink href={operator.website} operatorSlug={operator.slug} source="profile_page">
 *     Website oficial
 *   </ExternalLink>
 */
export default function ExternalLink({
  href,
  operatorSlug,
  source = 'directory',
  children,
  withUtm = true,
  className,
  ...rest
}: ExternalLinkProps) {
  const trackedHref = withUtm ? addUtmParams(href, operatorSlug) : href;

  function handleClick() {
    trackOperatorWebsiteClick(operatorSlug, source);
  }

  return (
    <a
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
