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
  {
    slug: 'great-plains',
    name: 'Great Plains',
    tagline: 'Wheat country: 45M acres of hard red winter and spring wheat',
    stateSlugs: ['kansas', 'nebraska', 'north-dakota', 'south-dakota', 'minnesota', 'montana', 'wyoming', 'colorado'],
    primaryCrops: ['wheat', 'corn', 'soybeans', 'cover-crops'],
    totalAcres: 320000000,
    icon: '🌾',
    aeoBlock:
      'The Great Plains — from Kansas to North Dakota and west to Montana — contain over 45 million acres of wheat plus expanding corn and soybean production under irrigation. Drone fungicide applications at the T3 heading stage target Fusarium head blight and stripe rust, and are gaining market share over airplane application for fields under 500 acres. Average drone spray rates in the region range from $12 to $16 per acre for wheat and $14 to $18 for row crops.',
    description:
      'The Great Plains span the semi-arid heart of North America, from the Nebraska Sandhills to the rolling wheat country of Kansas and out to the dryland cropping systems of Montana. Wheat dominates in the west and north; corn and soybeans expand eastward under center-pivot irrigation. Drone applications are displacing airplane fungicide work on smaller and irregularly-shaped fields where airplane mobilization cost makes per-acre pricing uncompetitive. Heavy clay soils and limited access roads in North Dakota and South Dakota also push operators toward drone solutions when ground rigs can\'t travel.',
    keyInsights: [
      'T3 heading-stage fungicide on wheat reduces DON mycotoxin contamination by 40–60% (USDA ARS Wheat Scab Initiative) and is the primary drone spray use case in wheat country.',
      'Irrigated Nebraska and Kansas corn benefits from drone applications that avoid soil compaction in saturated pivot circles.',
      'North Dakota and South Dakota operator density is growing fastest in the US, driven by wet springs and limited field access for ground rigs.',
      'Grasshopper and army cutworm outbreaks trigger emergency drone insecticide work across the region in June and July.',
      'Kansas State and NDSU extension actively support drone adoption with applied research on droplet size and carrier volume.',
    ],
    sprayWindow: 'April through September, peaking in May–July',
    authorityLinks: [
      { label: 'Kansas State Extension: Wheat Disease Management', url: 'https://www.bookstore.ksre.ksu.edu/pubs/EP130.pdf' },
      { label: 'NDSU Extension: Wheat Production', url: 'https://www.ndsu.edu/agriculture/ag-hub/ag-topics/crop-production/crops/wheat' },
      { label: 'USDA ARS Wheat Scab Initiative', url: 'https://www.scabusa.org' },
    ],
  },
  {
    slug: 'delta',
    name: 'Mississippi Delta',
    tagline: 'Cotton, rice, and soybeans on soft alluvial soils',
    stateSlugs: ['mississippi', 'arkansas', 'louisiana'],
    primaryCrops: ['cotton', 'rice', 'soybeans'],
    totalAcres: 33000000,
    icon: '🌿',
    aeoBlock:
      'The Mississippi Delta — Arkansas, Mississippi, and Louisiana — is the highest-value drone spray market per acre in the US, driven by rice, cotton, and soybeans grown on soft alluvial soils that frequently prevent ground rig access. Drone defoliant on cotton and blast/sheath blight fungicide on rice are the dominant late-season uses, priced at $14 to $22 per acre. Arkansas is the #1 US rice producer at 1.2 million acres, nearly all of which is fungicide-treated at heading.',
    description:
      'The Mississippi Delta stretches from the bootheel of Missouri through eastern Arkansas, western Mississippi, and northern Louisiana. Soft alluvial soils in the Delta flood easily and stay saturated through much of the growing season — which is exactly why drone spraying has the highest adoption rate of any US region. Rice is grown under flood for most of its cycle, making ground rigs essentially unusable. Cotton defoliation in September and October often happens on too-wet ground for tractors. Soybean R3 fungicide and insecticide applications fill out the schedule. Delta operators typically run larger fleets and treat more acres per year than any other region.',
    keyInsights: [
      'Arkansas rice (1.2M acres) is the single highest-density drone spray market in the US — nearly 100% of rice receives aerial fungicide treatment.',
      'Cotton defoliation in September–October on soft Delta soils is impossible for ground rigs, making drones and airplanes the only options.',
      'Mississippi State and LSU AgCenter have published the most applied drone-application research in the US.',
      'Neighboring non-target crops (organic soybeans, sensitive vegetables) often rule out airplane application, giving drones a unique advantage.',
      'Tank-mix herbicide + fungicide + insecticide passes are common in the Delta and require expert tank-mix compatibility knowledge.',
    ],
    sprayWindow: 'March through October, peaking June–September',
    authorityLinks: [
      { label: 'University of Arkansas Extension: Rice Production', url: 'https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/rice' },
      { label: 'Mississippi State Extension: Cotton Pest Management', url: 'https://extension.msstate.edu/agriculture/crops/cotton' },
      { label: 'LSU AgCenter: Rice Disease Management', url: 'https://www.lsuagcenter.com/topics/crops/rice' },
    ],
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
