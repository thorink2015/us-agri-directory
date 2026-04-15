import Link from 'next/link';
import { AUTHOR } from '@/data/author';

interface Props {
  /** ISO date string (YYYY-MM-DD) — drives the <time datetime> attr for Google */
  lastUpdated: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Byline — renders under H1 on every content page, above the AEO block.
 * Drives E-E-A-T author signal and visible "last updated" date.
 */
export default function Byline({ lastUpdated }: Props) {
  const hasPhoto = !AUTHOR.photoUrl.includes('{{');

  return (
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
      {hasPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={AUTHOR.photoUrl}
          alt={AUTHOR.photoAlt}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-sm font-bold text-green-700">
          {AUTHOR.firstName[0]}
        </div>
      )}
      <div className="text-sm text-gray-600">
        By{' '}
        <Link href="/about" className="font-semibold text-gray-900 hover:text-green-700 hover:underline">
          {AUTHOR.fullName}
        </Link>
        , {AUTHOR.jobTitle}
        {' · '}
        <span className="text-gray-500">
          Updated{' '}
          <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </span>
      </div>
    </div>
  );
}
