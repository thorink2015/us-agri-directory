import Link from 'next/link';
import { AUTHOR } from '@/data/author';

interface Props {
  /** ISO date string (YYYY-MM-DD), drives the <time datetime> attr for Google */
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
 * Byline, renders under H1 on every content page, above the AEO block.
 * Drives E-E-A-T author signal and visible "last updated" date.
 */
export default function Byline({ lastUpdated }: Props) {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200">
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
