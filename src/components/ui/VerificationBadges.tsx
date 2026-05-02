import { CheckCircle, BadgeCheck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import type { Operator } from '@/data/types';

interface Props {
  operator: Pick<
    Operator,
    | 'verified'
    | 'pendingConfirmation'
    | 'veteranOwned'
    | 'nonProfit'
    | 'womenLed'
    | 'certFAAPart107'
    | 'certFAAPart137'
    | 'ndaaCompliant'
    | 'certDJI'
    | 'certXAG'
    | 'certHylio'
    | 'iso9001'
  >;
  /** Maximum badges to render. Priority: regulatory > compliance > Verified > tags > manufacturer certs. */
  max?: number;
  /** Compact size for list cards — smaller padding and font. */
  compact?: boolean;
  className?: string;
}

const GREEN = 'bg-green-50 text-green-800 border-green-200';
const EMERALD = 'bg-emerald-50 text-emerald-900 border-emerald-300';
const BLUE = 'bg-blue-50 text-blue-800 border-blue-200';
const SLATE = 'bg-slate-50 text-slate-800 border-slate-300';
const PURPLE = 'bg-purple-50 text-purple-800 border-purple-200';
const PINK = 'bg-pink-50 text-pink-800 border-pink-200';
const GRAY = 'bg-gray-50 text-gray-700 border-gray-200';

type BadgeIcon = 'check' | 'badge' | 'shield' | 'hands' | 'sparkles';

export default function VerificationBadges({
  operator,
  max,
  compact = false,
  className = '',
}: Props) {
  const all: { key: string; label: string; color: string; icon?: BadgeIcon }[] = [];

  // Verified Operator pinned first — operator confirmed their listing directly,
  // distinct trust signal that should never be clipped by the `max` slice.
  // pendingConfirmation suppresses Verified (mutually exclusive at data layer).
  if (operator.verified && !operator.pendingConfirmation) {
    all.push({ key: 'verified', label: 'Verified Operator', color: EMERALD, icon: 'badge' });
  }
  // Then regulatory > compliance > identity tags > manufacturer certs.
  if (operator.certFAAPart137) {
    all.push({ key: 'faa137', label: 'FAA Part 137 ✓', color: GREEN });
  }
  if (operator.certFAAPart107) {
    all.push({ key: 'faa107', label: 'FAA Part 107 ✓', color: GREEN });
  }
  if (operator.ndaaCompliant) {
    all.push({ key: 'ndaa', label: 'NDAA Compliant ✓', color: BLUE });
  }
  if (operator.veteranOwned) {
    all.push({ key: 'veteran', label: 'Veteran-Owned', color: SLATE, icon: 'shield' });
  }
  if (operator.nonProfit) {
    all.push({ key: 'nonprofit', label: 'Non-Profit', color: PURPLE, icon: 'hands' });
  }
  if (operator.womenLed) {
    all.push({ key: 'women', label: 'Women-Led', color: PINK, icon: 'sparkles' });
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
  const iconClass = compact ? 'w-2.5 h-2.5' : 'w-3 h-3';

  function renderIcon(kind?: BadgeIcon) {
    switch (kind) {
      case 'badge': return <BadgeCheck className={iconClass} aria-hidden />;
      case 'shield': return <ShieldCheck className={iconClass} aria-hidden />;
      case 'hands': return <HeartHandshake className={iconClass} aria-hidden />;
      case 'sparkles': return <Sparkles className={iconClass} aria-hidden />;
      case 'check': return <CheckCircle className={iconClass} aria-hidden />;
      default: return null;
    }
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`.trim()}>
      {badges.map((b) => (
        <span key={b.key} className={`${pillBase} ${b.color}`}>
          {renderIcon(b.icon)}
          {b.label}
        </span>
      ))}
    </div>
  );
}
