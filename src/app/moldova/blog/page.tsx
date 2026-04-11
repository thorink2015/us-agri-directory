import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts, BLOG_CATEGORY_LABELS } from '@/data/blog-posts';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Blog Drone Agricole Moldova 2026 | Topuri și Noutăți',
  description:
    'Articole și topuri despre dronele agricole în Republica Moldova: top operatori, regiuni viticole, prețuri MDL, ghiduri practice actualizate 2026.',
  alternates: { canonical: '/moldova/blog' },
};

export default function MoldovaBlogPage() {
  const mdPosts = blogPosts.filter((p) => p.country === 'MD');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Blog' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Blog drone agricole Moldova
        </h1>
        <p className="text-gray-600">
          Articole, topuri și ghiduri practice despre dronele agricole în Republica Moldova.
          Conținut actualizat 2026 dedicat pieței moldovenești.
        </p>
      </header>

      {mdPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {mdPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                  {BLOG_CATEGORY_LABELS[post.category]}
                </span>
                <span className="text-xs text-gray-400">{post.publishedAt}</span>
              </div>
              <h2 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readMinutes} min citire
                </span>
                <span className="text-blue-700 font-medium flex items-center gap-1 group-hover:underline">
                  Citește <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl mb-10">
          <p>Articolele pentru Moldova sunt în pregătire. Revino curând.</p>
        </div>
      )}

      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Mai multe resurse pentru Moldova</h2>
        <p className="text-sm text-gray-600 mb-4">
          Descoperă ghidurile practice, operatorii verificați și prețurile actuale din Moldova.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/moldova/ghid"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            Ghiduri Moldova
          </Link>
          <Link
            href="/moldova/operatori"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Operatori verificați →
          </Link>
        </div>
      </div>
    </div>
  );
}
