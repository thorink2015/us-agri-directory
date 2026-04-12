import { Crop } from './types';

export const crops: Crop[] = [
  {
    slug: 'corn',
    name: 'Corn',
    nameRo: 'Corn',
    description:
      'Corn is the largest crop in the United States at over 90 million acres, and fungicide application at the VT/R1 (tassel) stage is the number one use case for drone spraying in America. Drones are the only practical option once corn exceeds 6–8 feet because ground rigs cannot clear the canopy. University research from Beck\'s Hybrids shows drone-applied fungicide at 2–3 gpa matches ground rig results at 15–20 gpa, with no yield loss from trampling.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8],
    haUS: 90000000,
    icon: '🌽',
    mainPests: ['Tar Spot (Phyllachora maydis)', 'Gray Leaf Spot (Cercospora zeae-maydis)', 'Northern Corn Leaf Blight', 'Southern Rust (Puccinia polysora)', 'Corn Rootworm (Diabrotica)'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 8,
  },
  {
    slug: 'soybeans',
    name: 'Soybeans',
    nameRo: 'Soybeans',
    description:
      'Soybeans cover over 87 million acres in the U.S. Drone applications target white mold, frogeye leaf spot, and soybean aphids at the R2–R3 growth stage. Purdue University trials showed drone applications at 2 and 5 gallons per acre were equally effective as ground applications for frogeye leaf spot reduction. Drones eliminate the compaction and crop damage that costs 4–6% of yield from ground equipment.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8, 9],
    haUS: 87000000,
    icon: '🫘',
    mainPests: ['White Mold (Sclerotinia sclerotiorum)', 'Frogeye Leaf Spot (Cercospora sojina)', 'Soybean Aphid (Aphis glycines)', 'Brown Stem Rot', 'Sudden Death Syndrome'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 6,
  },
  {
    slug: 'wheat',
    name: 'Wheat',
    nameRo: 'Wheat',
    description:
      'Winter and spring wheat totals approximately 45 million acres annually in the U.S. Drone fungicide at the T3/heading stage targets Fusarium head blight (scab), stripe rust, and leaf rust. The Great Plains (Kansas, Oklahoma, Nebraska) and Pacific Northwest (Washington) are the primary markets. Drone spraying is increasingly competitive with airplane application, especially for smaller or irregularly shaped fields.',
    priceMinUsd: 12,
    priceMaxUsd: 16,
    treatmentMonths: [5, 6],
    haUS: 45000000,
    icon: '🌾',
    mainPests: ['Fusarium Head Blight / Scab (Fusarium graminearum)', 'Stripe Rust (Puccinia striiformis)', 'Leaf Rust (Puccinia triticina)', 'Wheat Streak Mosaic Virus', 'Hessian Fly'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 5,
  },
  {
    slug: 'cotton',
    name: 'Cotton',
    nameRo: 'Cotton',
    description:
      'Cotton covers approximately 10 million acres in the U.S. Southeast, Texas, and Southwest. Drone spraying is critical for defoliant and boll opener applications in September and October, when soft Delta soils limit ground rig access and neighboring soybean fields rule out airplane application. Drones also handle insecticide applications for bollworm and plant bug pressure mid-season without soil compaction.',
    priceMinUsd: 14,
    priceMaxUsd: 20,
    treatmentMonths: [6, 7, 9, 10],
    haUS: 10000000,
    icon: '🌿',
    mainPests: ['Tarnished Plant Bug (Lygus lineolaris)', 'Bollworm / Corn Earworm (Helicoverpa zea)', 'Cotton Aphid (Aphis gossypii)', 'Whitefly (Bemisia tabaci)', 'Boll Weevil'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 5,
  },
  {
    slug: 'rice',
    name: 'Rice',
    nameRo: 'Rice',
    description:
      'Rice is grown on approximately 2.5 million acres in Arkansas, California, Louisiana, Mississippi, and Missouri. Drone spraying is especially effective in rice because the flooded field conditions make ground equipment impractical for much of the growing season. Applications include fungicide for blast and sheath blight, and herbicide for barnyardgrass control. Drones fly over standing water without any ground contact.',
    priceMinUsd: 14,
    priceMaxUsd: 22,
    treatmentMonths: [5, 6, 7, 8],
    haUS: 2500000,
    icon: '🌾',
    mainPests: ['Rice Blast (Magnaporthe oryzae)', 'Sheath Blight (Rhizoctonia solani)', 'Brown Planthopper (Nilaparvata lugens)', 'Barnyardgrass (Echinochloa crus-galli)', 'Rice Stink Bug'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 7,
  },
  {
    slug: 'grapes',
    name: 'Grapes / Vineyards',
    nameRo: 'Vineyards',
    description:
      'Vineyards cover approximately 1.2 million acres in California, Washington, New York, and Oregon. Drone spraying handles steep hillside applications where tractors struggle, delivering 8–12 fungicide passes per season for powdery mildew, downy mildew, and botrytis control. Rotor downwash penetrates the canopy and covers both leaf surfaces. Per-acre rates are higher than row crops due to complex terrain and required carrier volumes.',
    priceMinUsd: 18,
    priceMaxUsd: 30,
    treatmentMonths: [3, 4, 5, 6, 7, 8, 9],
    haUS: 1200000,
    icon: '🍇',
    mainPests: ['Powdery Mildew (Erysiphe necator)', 'Downy Mildew (Plasmopara viticola)', 'Botrytis (Gray Mold)', 'Grape Berry Moth (Paralobesia viteana)', 'Leafhoppers'],
    uvlNormLHa: '10–20 gpa',
    yieldGainPct: 0,
  },
  {
    slug: 'orchards',
    name: 'Orchards',
    nameRo: 'Orchards',
    description:
      'Orchards cover more than 5 million acres in Washington, California, Michigan, and New York. Apple, cherry, peach, almond, and walnut operations benefit from drone applications for fire blight, powdery mildew, and codling moth control. Washington State surveys show 95% of apple growers are interested in drone spraying. Drones reach between-row positions in dense plantings and hillside blocks inaccessible to conventional airblast sprayers.',
    priceMinUsd: 20,
    priceMaxUsd: 35,
    treatmentMonths: [3, 4, 5, 6, 7, 8],
    haUS: 5000000,
    icon: '🍎',
    mainPests: ['Codling Moth (Cydia pomonella)', 'Fire Blight (Erwinia amylovora)', 'Powdery Mildew (Podosphaera leucotricha)', 'Brown Rot (Monilinia fructicola)', 'Peach Leaf Curl'],
    uvlNormLHa: '8–15 gpa',
    yieldGainPct: 0,
  },
  {
    slug: 'cover-crops',
    name: 'Cover Crops',
    nameRo: 'Cover Crops',
    description:
      'Cover crop seeding by drone has become one of the fastest-growing ag drone applications in the Midwest. Operators broadcast cereal rye, annual ryegrass, crimson clover, and custom blends into standing corn and soybeans weeks before harvest. This gives seed extra establishment time, meets NRCS cost-share deadlines, and avoids the soil compaction that comes from driving equipment through mature crops. Seeding windows run August through October across the Corn Belt.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [8, 9, 10],
    haUS: 15000000,
    icon: '🌱',
    mainPests: ['Stand establishment failure', 'Slug damage on cereal rye', 'Delayed germination in dry conditions'],
    uvlNormLHa: '36–80 lbs/acre',
    yieldGainPct: 0,
  },
];

export function getCropBySlug(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}

export const CROP_NAME_MAP: Record<string, string> = Object.fromEntries(
  crops.map((c) => [c.slug, c.name])
);
