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
export const blogPosts: BlogPost[] = [
  {
    slug: 'corn-fungicide-drone-spraying-guide',
    title: 'Corn Fungicide by Drone: What the University Data Actually Shows',
    description:
      'Drone fungicide on corn at VT/R1 costs $12 to $18/acre and yields 5 to 8 extra bushels. University trial data, timing guide, and how to book.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 8,
    tags: ['corn', 'fungicide', 'VT/R1', 'tar spot', 'drone spraying'],
    relatedCrops: ['corn'],
    relatedServices: ['spraying'],
    content: 'corn-fungicide-drone-spraying-guide',
    aeoBlock:
      "Drone-applied fungicide on corn at VT/R1 costs $12 to $18 per acre and produces an average 5 to 8 bushel yield response in moderate to high disease pressure years, according to Beck's Practical Farm Research across Iowa, Indiana, and Illinois. Carrier volume of 2 to 3 gallons per acre matches ground rig efficacy at 15 to 20 gpa. High-pressure tar spot years in Indiana and Wisconsin have produced 15 to 25 bushel responses.",
    faqs: [
      {
        question: 'Is 2 gpa really enough for corn fungicide?',
        answer:
          'Yes, for most labeled products. Rotor downwash provides canopy penetration equivalent to 15 to 20 gpa ground application. Some labels require minimum gpa or specific droplet sizes that may exceed drone capability. Always check the label.',
      },
      {
        question: 'Should I spray if disease pressure is low?',
        answer:
          'At 2 to 4 bu/acre response and $5/bu corn, the $10 to $20 return barely covers the $12 to $18 application cost. Moderate to high pressure (5+ bu response) is where drone fungicide clearly pays. Use your state extension disease forecast to decide.',
      },
      {
        question: 'Can I combine fungicide and insecticide in one drone pass?',
        answer:
          'Yes, most operators run tank mixes. Confirm product compatibility and that the combined minimum carrier volume stays within drone range (typically 2 to 5 gpa).',
      },
    ],
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
