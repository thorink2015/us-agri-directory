'use client';

import { Phone } from 'lucide-react';
import { trackOperatorPhoneClick, trackOperatorEmailClick } from '@/components/analytics/events';

interface Props {
  operatorSlug: string;
  phone?: string;
  email?: string;
}

/**
 * Client component for operator phone/email links.
 * Fires GA4 events on click so we know exactly how many
 * users contacted each operator directly from the profile page.
 */
export default function OperatorContactLinks({ operatorSlug, phone, email }: Props) {
  return (
    <>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition-colors"
          onClick={() => trackOperatorPhoneClick(operatorSlug)}
        >
          <Phone className="w-4 h-4 text-green-600" />
          {phone}
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition-colors break-all"
          onClick={() => trackOperatorEmailClick(operatorSlug)}
        >
          <span className="w-4 h-4 text-green-600 text-center flex-shrink-0">@</span>
          {email}
        </a>
      )}
    </>
  );
}
