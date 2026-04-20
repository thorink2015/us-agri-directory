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
  className?: string;
}

const PILL_BASE =
  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border';
const GREEN = 'bg-green-50 text-green-800 border-green-200';
const BLUE = 'bg-blue-50 text-blue-800 border-blue-200';
const GRAY = 'bg-gray-50 text-gray-700 border-gray-200';

export default function VerificationBadges({ operator, className = '' }: Props) {
  const badges: { key: string; label: string; color: string; icon?: boolean }[] = [];

  if (operator.verified) {
    badges.push({ key: 'verified', label: 'Verified', color: GREEN, icon: true });
  }
  if (operator.certFAAPart107) {
    badges.push({ key: 'faa107', label: 'FAA Part 107 ✓', color: GREEN });
  }
  if (operator.certFAAPart137) {
    badges.push({ key: 'faa137', label: 'FAA Part 137 ✓', color: GREEN });
  }
  if (operator.ndaaCompliant) {
    badges.push({ key: 'ndaa', label: 'NDAA Compliant ✓', color: BLUE });
  }
  if (operator.iso9001) {
    badges.push({ key: 'iso9001', label: 'ISO 9001', color: GRAY });
  }
  if (operator.certDJI) {
    badges.push({ key: 'dji', label: 'DJI Certified', color: GRAY });
  }
  if (operator.certXAG) {
    badges.push({ key: 'xag', label: 'XAG Certified', color: GRAY });
  }
  if (operator.certHylio) {
    badges.push({ key: 'hylio', label: 'Hylio Certified', color: GRAY });
  }

  if (badges.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`.trim()}>
      {badges.map((b) => (
        <span key={b.key} className={`${PILL_BASE} ${b.color}`}>
          {b.icon && <CheckCircle className="w-3 h-3" />}
          {b.label}
        </span>
      ))}
    </div>
  );
}
