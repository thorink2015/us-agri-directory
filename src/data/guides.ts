export interface Guide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'start' | 'legal' | 'funding' | 'technical';
  country?: 'RO' | 'MD';   // defaults to 'RO' if absent
  readMinutes: number;
  lastUpdated: string;
  keywords: string[];
  icon: string;
}

export const guides: Guide[] = [
  {
    slug: 'cum-sa-devii-operator',
    title: 'How to Start an Ag Drone Business in the US: Complete 2026 Guide',
    shortTitle: 'How to Become an Operator',
    description:
      'Step-by-step guide to launching an agricultural drone business in the United States: FAA licensing, USDA programs, equipment, and finding your first clients.',
    category: 'start',
    readMinutes: 15,
    lastUpdated: '2026-04-01',
    keywords: ['how to start ag drone business', 'drone operator license', 'agricultural drone business'],
    icon: '🚀',
  },
  {
    slug: 'legislatie-drone-agricole',
    title: 'US Agricultural Drone Regulations (2026): FAA Part 107 & Part 137 Complete Guide',
    shortTitle: 'FAA Regulations',
    description:
      'All FAA rules for operating agricultural drones commercially: Part 107 Remote Pilot Certificate, Part 137 Agricultural Aircraft Operator certification, airspace requirements, and penalties.',
    category: 'legal',
    readMinutes: 12,
    lastUpdated: '2026-03-15',
    keywords: ['FAA Part 107 drone', 'FAA Part 137 agricultural', 'ag drone regulations 2026'],
    icon: '⚖️',
  },
  {
    slug: 'fonduri-afir-drone',
    title: 'USDA Funding for Ag Drones 2026: EQIP, RCPP, and State Cost-Share Programs',
    shortTitle: 'USDA Funding Programs',
    description:
      'How to get 50–75% cost-share for purchasing an agricultural drone through USDA EQIP, RCPP, and state precision agriculture programs. Eligibility, application steps, and tips.',
    category: 'funding',
    readMinutes: 10,
    lastUpdated: '2026-02-20',
    keywords: ['USDA EQIP drone', 'ag drone funding', 'RCPP precision agriculture grant'],
    icon: '💰',
  },
  {
    slug: 'licenta-pilot-drona',
    title: 'How to Get Your FAA Part 107 Remote Pilot Certificate in 2026',
    shortTitle: 'FAA Part 107 License',
    description:
      'Complete guide to earning your FAA Part 107 Remote Pilot Certificate for agricultural drone operations: study resources, exam prep, costs, and renewal.',
    category: 'legal',
    readMinutes: 8,
    lastUpdated: '2026-01-10',
    keywords: ['FAA Part 107 exam', 'remote pilot certificate', 'drone pilot license agriculture'],
    icon: '🎓',
  },
  {
    slug: 'alegerea-dronei-agricole',
    title: 'How to Choose the Right Ag Drone: DJI Agras vs Hylio vs XAG (2026)',
    shortTitle: 'Choosing Your Drone',
    description:
      'Compare DJI Agras T25P, T50, T100 with Hylio AG-272 and XAG P100. Budget, spray capacity, NDAA compliance, service network, and parts availability.',
    category: 'technical',
    readMinutes: 14,
    lastUpdated: '2026-03-01',
    keywords: ['DJI Agras T50 review', 'Hylio AG-272', 'best agricultural drone 2026'],
    icon: '🚁',
  },
  {
    slug: 'roi-drona-agricola',
    title: 'Is an Ag Drone Worth It? Complete ROI Calculator for US Operators 2026',
    shortTitle: 'Ag Drone ROI',
    description:
      'Real break-even analysis for purchasing an agricultural spray drone: cost per acre, revenue potential, daily capacity, and payback period for 100–2,000 acre operations.',
    category: 'technical',
    readMinutes: 10,
    lastUpdated: '2026-04-01',
    keywords: ['ag drone ROI', 'drone spraying cost per acre', 'drone vs ground rig comparison'],
    icon: '📊',
  },
  {
    slug: 'subventii-moldova-aipa',
    title: 'USDA EQIP Cost-Share for Precision Agriculture Equipment: 2026 Field Guide',
    shortTitle: 'EQIP Precision Ag Funding',
    description:
      'How to apply for USDA EQIP cost-share payments for precision agriculture equipment including drones, sensors, and variable-rate technology. State-by-state signup windows and practice codes.',
    category: 'funding',
    readMinutes: 9,
    lastUpdated: '2026-02-15',
    keywords: ['USDA EQIP precision agriculture', 'EQIP cost share drone', 'USDA precision ag funding'],
    icon: '💵',
  },
  {
    slug: 'legislatie-ansa-moldova',
    title: 'State-Level Ag Drone Regulations: Pesticide Applicator Laws Operators Must Know',
    shortTitle: 'State Drone Regulations',
    description:
      'State department of agriculture requirements for commercial drone pesticide application: licensing, notification rules, drift management, and buffer zone regulations by state.',
    category: 'legal',
    readMinutes: 8,
    lastUpdated: '2026-03-01',
    keywords: ['state drone pesticide license', 'commercial applicator drone', 'ag drone state regulations'],
    icon: '🗺️',
  },
  {
    slug: 'cum-sa-devii-operator-moldova',
    title: 'Scaling Your Ag Drone Business Across Multiple States: Operations Guide',
    shortTitle: 'Multi-State Operations',
    description:
      'How to grow your agricultural drone operation beyond a single state: crew management, equipment logistics, multi-state licensing, contracts, and revenue optimization.',
    category: 'start',
    readMinutes: 12,
    lastUpdated: '2026-03-10',
    keywords: ['multi-state drone operation', 'scale ag drone business', 'drone crew management'],
    icon: '🗺️',
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const GUIDE_CATEGORIES: Record<Guide['category'], { label: string; color: string }> = {
  start: { label: 'Getting Started', color: 'green' },
  legal: { label: 'Regulations', color: 'blue' },
  funding: { label: 'Funding', color: 'yellow' },
  technical: { label: 'Equipment', color: 'purple' },
};
