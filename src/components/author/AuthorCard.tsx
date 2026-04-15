import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUTHOR } from '@/data/author';

/**
 * AuthorCard — renders at the bottom of every content page, before the footer.
 * Uses the short canonical bio from data/author.ts.
 */
export default function AuthorCard() {
  const hasPhoto = !AUTHOR.photoUrl.includes('{{');

  return (
    <aside className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-5 flex gap-4">
      {hasPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={AUTHOR.photoUrl}
          alt={AUTHOR.photoAlt}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xl font-bold text-green-700">
          {AUTHOR.firstName[0]}
        </div>
      )}
      <div className="flex-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          About the author
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">{AUTHOR.shortBio}</p>
        <Link
          href="/about"
          className="inline-flex items-center gap-1 text-sm text-green-700 font-medium hover:underline"
        >
          More about {AUTHOR.firstName}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
