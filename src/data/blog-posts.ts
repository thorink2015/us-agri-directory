import { BlogPost } from './types';

/**
 * Programmatic blog posts for SEO.
 * Content is intentionally structured as top lists and deep guides to rank
 * for "top N drone" style queries.
 *
 * To add more posts, extend this array. The [slug]/page.tsx template handles rendering.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'top-10-operatori-drone-agricole-romania-2026',
    title: 'Top 10 Agricultural Drone Operators in the US: 2026 Rankings',
    description:
      'The most active and highly-rated agricultural drone operators in America in 2026: acres treated, fleet size, certifications, and coverage areas.',
    category: 'top-lists',
    publishedAt: '2026-03-01',
    author: 'US Ag Drone Directory',
    readMinutes: 8,
    tags: ['top operators', 'drone spraying', 'US', '2026'],
    relatedServices: ['spraying', 'monitoring'],
    content: 'top-10-operatori-ro',
  },
  {
    slug: 'top-5-operatori-drone-moldova-2026',
    title: 'Top Ag Drone Operators by Region: Southeast, Midwest & Great Plains',
    description:
      'The leading agricultural drone service providers across America\'s key farming regions in 2026: who covers what, fleet size, and specialty crops.',
    category: 'top-lists',
    publishedAt: '2026-03-05',
    author: 'US Ag Drone Directory',
    readMinutes: 6,
    tags: ['top operators', 'regional', 'drone spraying'],
    relatedServices: ['spraying'],
    content: 'top-5-moldova',
  },
  {
    slug: 'top-drone-agricole-2026-comparatie',
    title: 'Top 5 Agricultural Drones in 2026: DJI Agras T50, T100, Hylio AG-272, XAG P100 Compared',
    description:
      'Detailed comparison of the best agricultural spray drones available in 2026: specifications, pricing, NDAA compliance, and which is right for your operation.',
    category: 'top-lists',
    publishedAt: '2026-02-15',
    author: 'US Ag Drone Directory',
    readMinutes: 10,
    tags: ['drone comparison', 'DJI Agras', 'Hylio', 'XAG', '2026'],
    content: 'top-drone-2026',
  },
  {
    slug: 'pulverizare-vita-de-vie-drona-ghid-complet',
    title: 'Drone Spraying for Vineyards and Orchards: Complete Applicator Guide',
    description:
      'Why vineyard and orchard growers are switching to drones in 2026: cost per acre, canopy penetration, terrain access, and recommended spray programs.',
    category: 'guide',
    publishedAt: '2026-03-10',
    author: 'US Ag Drone Directory',
    readMinutes: 12,
    tags: ['vineyard', 'orchard', 'drone spraying', 'specialty crops'],
    relatedCrops: ['grapes', 'orchards'],
    relatedServices: ['spraying'],
    content: 'vita-de-vie-ghid',
  },
  {
    slug: 'top-10-judete-productie-vita-de-vie-drone',
    title: 'Top 10 US Wine States for Drone Spraying: Which Operators Serve Them',
    description:
      'Ranking of America\'s leading wine-producing states by vineyard acreage and the agricultural drone operators serving each region.',
    category: 'top-lists',
    publishedAt: '2026-02-20',
    author: 'US Ag Drone Directory',
    readMinutes: 9,
    tags: ['wine states', 'vineyard', 'drone operators', 'top'],
    relatedCrops: ['grapes'],
    content: 'top-judete-viticole',
  },
  {
    slug: 'cat-costa-drona-agricola-2026',
    title: 'How Much Does an Agricultural Drone Cost in 2026? Complete US Pricing Guide',
    description:
      'Updated 2026 prices for DJI Agras T25P, T50, T100, Hylio AG-272, and XAG P100 Pro — including full system costs and USDA funding options.',
    category: 'guide',
    publishedAt: '2026-01-15',
    author: 'US Ag Drone Directory',
    readMinutes: 7,
    tags: ['drone price', 'DJI Agras cost', 'ag drone 2026'],
    content: 'cat-costa-drona',
  },
  {
    slug: 'top-regiuni-viticole-moldova-drone',
    title: 'Top Corn Belt States for Drone Spraying: Iowa, Illinois, Indiana, Ohio',
    description:
      'The leading corn and soybean producing states and the agricultural drone operators delivering the most acres of fungicide and herbicide programs across the Midwest.',
    category: 'top-lists',
    publishedAt: '2026-02-25',
    author: 'US Ag Drone Directory',
    readMinutes: 7,
    tags: ['corn belt', 'midwest', 'drone spraying', 'top'],
    content: 'top-regiuni-viticole-moldova',
  },
  {
    slug: 'tratamente-cereale-drona-romania',
    title: 'Drone Applications for Corn and Soybeans: What Operators and Growers Need to Know',
    description:
      'Why drones are the best option for corn VT fungicide and soybean R3 applications — and how to choose the right operator for your acres.',
    category: 'guide',
    publishedAt: '2026-03-20',
    author: 'US Ag Drone Directory',
    readMinutes: 8,
    tags: ['corn', 'soybeans', 'fungicide', 'drone spraying'],
    relatedCrops: ['corn', 'soybeans'],
    content: 'tratamente-cereale',
  },
  {
    slug: 'top-5-operatori-moldova-norddanube-dobrogea',
    title: 'Top Ag Drone Operators in the Mid-Atlantic & Southeast: VA, NC, MD, GA',
    description:
      'The most active agricultural drone service providers across the mid-Atlantic and Southeast United States: specialties, coverage, and contact information.',
    category: 'top-lists',
    publishedAt: '2026-04-01',
    author: 'US Ag Drone Directory',
    readMinutes: 7,
    tags: ['mid-atlantic', 'southeast', 'drone operators', 'Virginia', 'North Carolina'],
    relatedServices: ['spraying'],
    content: 'top-dobrogea',
  },
  {
    slug: 'legislatie-drone-agricole-2026-noutati',
    title: 'FAA Part 107 and Part 137 in 2026: What\'s New for Agricultural Drone Operators',
    description:
      'Key regulatory updates affecting commercial agricultural drone operators in 2026: Remote ID enforcement, Part 137 waivers, and state pesticide applicator changes.',
    category: 'legislation',
    publishedAt: '2026-01-20',
    author: 'US Ag Drone Directory',
    readMinutes: 6,
    tags: ['FAA Part 107', 'FAA Part 137', 'drone regulations 2026'],
    content: 'legislatie-2026',
  },
  {
    slug: 'top-5-operatori-transilvania-cluj-mures',
    title: 'Top Ag Drone Operators in the Corn Belt: Illinois, Iowa, Indiana, Ohio',
    description:
      'The most active and largest-volume agricultural drone operators across America\'s corn and soybean heartland in 2026.',
    category: 'top-lists',
    publishedAt: '2026-03-15',
    author: 'US Ag Drone Directory',
    readMinutes: 6,
    tags: ['corn belt', 'illinois', 'iowa', 'indiana', 'ohio'],
    content: 'top-transilvania',
  },
  {
    slug: 'fonduri-afir-drone-2026-succes',
    title: 'USDA EQIP Success Stories: 5 Drone Operators Who Got Cost-Share Funding',
    description:
      '5 US agricultural drone operators and farmers who successfully received USDA EQIP cost-share funding for drone equipment — and the steps they followed.',
    category: 'case-study',
    publishedAt: '2026-02-10',
    author: 'US Ag Drone Directory',
    readMinutes: 11,
    tags: ['USDA EQIP', 'cost share', 'funding', 'drone'],
    content: 'afir-cazuri-succes',
  },
];

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
