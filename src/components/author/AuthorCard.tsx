import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUTHOR } from '@/data/author';

export default function AuthorCard() {
  return (
    <aside className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-5">
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
    </aside>
  );
}
