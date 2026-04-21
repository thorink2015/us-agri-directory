import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts, BLOG_CATEGORY_LABELS } from '@/data/blog-posts';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/data/author';

export const metadata: Metadata = {
  title: 'Ag Drone Blog: Lists, Guides & Industry News 2026',
  description:
    'Articles about agricultural drones: operator rankings, application guides, FAA legislation updates, USDA funding case studies and equipment comparisons.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ag Drone Blog: Lists, Guides & Industry News 2026',
    description:
      'Articles about agricultural drones: operator rankings, application guides, FAA legislation updates, USDA funding case studies, and equipment comparisons.',
    url: 'https://agdronedirectory.com/blog',
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'US Ag Drone Directory Blog',
      },
    ],
  },
};

export default function BlogHub() {
  const roPosts = blogPosts.filter((p) => !p.country || p.country === 'RO');
  const sortedPosts = [...roPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featured = sortedPosts[0];
  const rest = sortedPosts.slice(1);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.domain}/blog` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Blog' }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Ag Drone Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Operator rankings, application guides, legislation updates and equipment comparisons for
          the US agricultural drone industry. Updated weekly.
        </p>
      </header>

      {/* Featured */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-gradient-to-br from-green-700 to-green-800 text-white rounded-2xl p-8 mb-10 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs text-green-200 mb-3 uppercase tracking-wide">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
              Featured
            </span>
            <span>{BLOG_CATEGORY_LABELS[featured.category]}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {featured.readMinutes} min
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:underline">
            {featured.title}
          </h2>
          <p className="text-green-100 text-lg mb-4">{featured.description}</p>
          <span className="inline-flex items-center gap-2 text-yellow-300 font-semibold">
            Read article <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all flex flex-col"
          >
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                {BLOG_CATEGORY_LABELS[post.category]}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readMinutes} min
              </span>
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{post.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-green-700 font-medium group-hover:underline">Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
