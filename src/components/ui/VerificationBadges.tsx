import { CheckCircle } from 'lucide-react';
import type { Operator } from '@/data/types';

interface Props {
  operator: Pick<
    Operator,
    | 'verified'
    | 'certFAAPart107'
    | 'certFAAPart137'
    | 'ndaaCompliant'
    | 'certDJI'
    | 'certXAG'
    | 'certHylio'
    | 'iso9001'
  >;
  /** Maximum badges to render. Prioritised: Part 137 > Part 107 > NDAA > Verified > manufacturer certs. */
  max?: number;
  /** Compact size for list cards — smaller padding and font. */
  compact?: boolean;
  className?: string;
}

const GREEN = 'bg-green-50 text-green-800 border-green-200';
const BLUE = 'bg-blue-50 text-blue-800 border-blue-200';
const GRAY = 'bg-gray-50 text-gray-700 border-gray-200';

export default function VerificationBadges({
  operator,
  max,
  compact = false,
  className = '',
}: Props) {
  const all: { key: string; label: string; color: string; icon?: boolean }[] = [];

  // Priority order: regulatory > compliance > verified > manufacturer certs.
  if (operator.certFAAPart137) {
    all.push({ key: 'faa137', label: 'FAA Part 137 ✓', color: GREEN });
  }
  if (operator.certFAAPart107) {
    all.push({ key: 'faa107', label: 'FAA Part 107 ✓', color: GREEN });
  }
  if (operator.ndaaCompliant) {
    all.push({ key: 'ndaa', label: 'NDAA Compliant ✓', color: BLUE });
  }
  if (operator.verified) {
    all.push({ key: 'verified', label: 'Verified', color: GREEN, icon: true });
  }
  if (operator.certDJI) {
    all.push({ key: 'dji', label: 'DJI Certified', color: GRAY });
  }
  if (operator.certXAG) {
    all.push({ key: 'xag', label: 'XAG Certified', color: GRAY });
  }
  if (operator.certHylio) {
    all.push({ key: 'hylio', label: 'Hylio Certified', color: GRAY });
  }
  if (operator.iso9001) {
    all.push({ key: 'iso9001', label: 'ISO 9001', color: GRAY });
  }

  const badges = typeof max === 'number' ? all.slice(0, max) : all;
  if (badges.length === 0) return null;

  const pillBase = compact
    ? 'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border leading-none'
    : 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border';
  const iconSize = compact ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <div className={`flex flex-wrap gap-1 ${className}`.trim()}>
      {badges.map((b) => (
        <span key={b.key} className={`${pillBase} ${b.color}`}>
          {b.icon && <CheckCircle className={iconSize} />}
          {b.label}
        </span>
      ))}
    </div>
  );
}
