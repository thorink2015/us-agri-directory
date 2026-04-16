export interface Guide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'start' | 'legal' | 'funding' | 'technical';
  readMinutes: number;
  lastUpdated: string;
  keywords: string[];
  icon: string;
}

/**
 * Guides for the US Ag Drone Directory.
 * Add entries here when content is ready.
 */
export const guides: Guide[] = [];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const GUIDE_CATEGORIES: Record<Guide['category'], { label: string; color: string }> = {
  start: { label: 'Getting Started', color: 'green' },
  legal: { label: 'Regulations', color: 'blue' },
  funding: { label: 'Funding', color: 'yellow' },
  technical: { label: 'Equipment', color: 'purple' },
};
