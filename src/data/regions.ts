export interface Region {
  slug: string;
  name: string;
  tagline: string;
  stateSlugs: string[];      // county slugs in this region
  primaryCrops: string[];    // crop slugs
  totalAcres: number;        // approximate total ag acres
  icon: string;
  aeoBlock: string;          // 2-3 sentence AEO answer with numbers
  description: string;
  keyInsights: string[];     // 3-5 bullet regional insights
  sprayWindow: string;       // e.g. "May through September"
  authorityLinks: { label: string; url: string }[];
}

export const regions: Region[] = [
  {
    slug: 'corn-belt',
    name: 'Corn Belt',
    tagline: 'The heart of US drone fungicide: 180M acres of corn and soybeans',
    stateSlugs: ['iowa', 'illinois', 'indiana', 'ohio', 'missouri'],
    primaryCrops: ['corn', 'soybeans', 'cover-crops'],
    totalAcres: 115000000,
    icon: '🌽',
    aeoBlock:
      'The Corn Belt — Iowa, Illinois, Indiana, Ohio, and Missouri — is the largest agricultural drone services market in America, with over 115 million acres of corn and soybeans treated annually. Drone fungicide application at the VT/R1 corn stage and R2/R3 soybean stage dominates demand in July and August. Average drone spray rates in the region range from $12 to $18 per acre for application only, with farmer-supplied chemical.',
    description:
      'The Corn Belt spans from eastern Nebraska across Iowa, Illinois, Indiana, and Ohio, dipping into northern Missouri. This region grows roughly two-thirds of US corn and soybeans on deep prairie soils. Drone spraying solves two critical issues here: tall corn fungicide at the VT/R1 tassel stage (when plants exceed 8 feet and ground rigs cannot clear the canopy), and wet-field applications during persistent spring and summer rains when soil is too soft for tractors. Cover crop overseeding into standing corn and soybeans is the second-largest use case, driven by USDA NRCS cost-share under EQIP.',
    keyInsights: [
      'VT/R1 corn fungicide in late July delivers 5–8 bushel yield response (Beck\'s Hybrids trials) and is the single largest drone spray use case in the US.',
      'Cover crop overseeding into standing corn (August) gives cereal rye 3–4 extra weeks of establishment vs. post-harvest ground seeding.',
      'Wet-year scenarios (2018, 2019, 2023) pushed Corn Belt drone adoption ahead of other regions — ground rigs simply couldn\'t access fields.',
      'Iowa leads the region in operator density with the highest number of Part 137-certified commercial drone operators.',
      'Fields under 500 acres favor drones economically over airplane application due to mobilization cost.',
    ],
    sprayWindow: 'May through October, peaking in July–August',
    authorityLinks: [
      { label: 'Iowa State Extension: Corn Disease Management', url: 'https://crops.extension.iastate.edu/corn' },
      { label: 'Purdue Extension: Field Crops IPM', url: 'https://extension.entm.purdue.edu/fieldcropsipm' },
      { label: 'USDA NASS: Corn Acreage by State', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/cornac.php' },
    ],
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
