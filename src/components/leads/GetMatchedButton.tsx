'use client';

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load the modal so the wizard JS is not in the initial bundle on
// pages that just need a CTA button. This keeps the homepage and state
// pages under their PageSpeed budget.
const GetMatchedModal = dynamic(() => import('./GetMatchedModal'), {
  ssr: false,
});

interface Props {
  defaultStateSlug?: string;
  source?: string;
  headingOverride?: string;
  subheadingOverride?: string;
  className?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'inline';
  ariaLabel?: string;
  /**
   * When set, the modal opens in operator-first mode (skips location step,
   * targets a specific operator, offers an "also broaden to 2 more" toggle).
   * Used on operator profile pages.
   */
  operatorContext?: {
    slug: string;
    name: string;
    stateSlug: string;
    stateName: string;
  };
}

const VARIANTS: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors',
  secondary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-800 font-semibold rounded-xl border border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors',
  inline:
    'inline-flex items-center gap-1 text-green-700 font-semibold hover:text-green-800 underline underline-offset-2',
};

/**
 * Click-triggered button that opens the GetMatched wizard in a modal.
 * Click-triggered popups convert at 22% to 54%+ vs 3 to 5% for exit-intent
 * (per the lead capture research), and the wizard JS is lazy-loaded so
 * pages that no one clicks the button on never pay for it.
 */
export default function GetMatchedButton({
  defaultStateSlug,
  source = 'button',
  headingOverride,
  subheadingOverride,
  className,
  children = 'Get my 3 matches',
  variant = 'primary',
  ariaLabel,
  operatorContext,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel}
        className={className ?? VARIANTS[variant]}
        data-source={source}
      >
        {children}
      </button>
      <GetMatchedModal
        open={open}
        onClose={() => setOpen(false)}
        defaultStateSlug={defaultStateSlug}
        source={source}
        headingOverride={headingOverride}
        subheadingOverride={subheadingOverride}
        operatorContext={operatorContext}
      />
    </>
  );
}
