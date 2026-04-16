import { BlogPost } from './types';

/**
 * Blog posts for the US Ag Drone Directory.
 * Content is written and fed in separately — add entries here when ready.
 * The [slug]/page.tsx template handles rendering automatically.
 *
 * Example entry:
 * {
 *   slug: 'drone-spraying-corn-soybeans',
 *   title: 'Drone Spraying for Corn and Soybeans: Complete Guide',
 *   description: '...',
 *   category: 'guide',
 *   publishedAt: '2026-05-01',
 *   author: 'US Ag Drone Directory',
 *   readMinutes: 10,
 *   tags: ['corn', 'soybeans', 'drone spraying'],
 *   content: 'content-key',
 * }
 */
export const blogPosts: BlogPost[] = [];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export const BLOG_CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  'top-lists': 'Top Lists',
  'guide': 'Guides',
  'news': 'News',
  'case-study': 'Case Studies',
  'legislation': 'Legislation',
};
