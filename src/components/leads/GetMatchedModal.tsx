'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import GetMatchedWizard from './GetMatchedWizard';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultStateSlug?: string;
  source?: string;
  headingOverride?: string;
  subheadingOverride?: string;
  operatorContext?: {
    slug: string;
    name: string;
    stateSlug: string;
    stateName: string;
  };
}

export default function GetMatchedModal({
  open,
  onClose,
  defaultStateSlug,
  source,
  headingOverride,
  subheadingOverride,
  operatorContext,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Esc to close + body scroll lock + focus the dialog on open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog.
    ref.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={
        operatorContext
          ? `Request a quote from ${operatorContext.name}`
          : 'Get matched with a drone operator'
      }
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        className="relative w-full max-w-[520px] my-4 outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-900 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <GetMatchedWizard
          defaultStateSlug={defaultStateSlug}
          source={source}
          headingOverride={headingOverride}
          subheadingOverride={subheadingOverride}
          operatorContext={operatorContext}
          onSubmitted={() => {
            // Auto-close after 4s so the user can read the confirmation.
            window.setTimeout(onClose, 4000);
          }}
        />
      </div>
    </div>
  );
}
