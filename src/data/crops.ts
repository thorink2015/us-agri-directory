import { Crop } from './types';

export const crops: Crop[] = [
  {
    slug: 'corn',
    name: 'Corn',
    nameRo: 'Corn',
    description:
      'Corn is the largest crop in the United States at over 90 million acres, and fungicide application at the VT/R1 (tassel) stage is the number one use case for drone spraying in America. Drones are the only practical option once corn exceeds 6–8 feet because ground rigs cannot clear the canopy. University research from Beck\'s Hybrids shows drone-applied fungicide at 2–3 gpa matches ground rig results at 15–20 gpa, with no yield loss from trampling.',
    aeoBlock:
      'Drone fungicide on corn costs $12 to $18 per acre and is the single largest use case for agricultural drones in America, covering over 90 million acres annually. The critical application window is the VT to R1 (tassel) stage in July and August, when corn is too tall for ground rigs and the risk of trampling damage from tractor passes is highest. University trials from Beck\'s Hybrids and Iowa State Extension show drone-applied fungicide at 2 to 3 gallons per acre matches ground rig efficacy at 15 to 20 gallons per acre, with an average yield response of 5 to 8 bushels per acre.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8],
    haUS: 90000000,
    icon: '🌽',
    mainPests: ['Tar Spot (Phyllachora maydis)', 'Gray Leaf Spot (Cercospora zeae-maydis)', 'Northern Corn Leaf Blight', 'Southern Rust (Puccinia polysora)', 'Corn Rootworm (Diabrotica)'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 8,
    authorityLinks: [
      { label: 'Iowa State Extension: Corn Disease Management', url: 'https://crops.extension.iastate.edu/corn' },
      { label: 'Purdue Extension: Corn Fungicide Timing', url: 'https://extension.entm.purdue.edu/fieldcropsipm/corn.html' },
      { label: 'USDA NASS: Corn Acreage and Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/cornan.php' },
    ],
  },
  {
    slug: 'soybeans',
    name: 'Soybeans',
    nameRo: 'Soybeans',
    description:
      'Soybeans cover over 87 million acres in the U.S. Drone applications target white mold, frogeye leaf spot, and soybean aphids at the R2–R3 growth stage. Purdue University trials showed drone applications at 2 and 5 gallons per acre were equally effective as ground applications for frogeye leaf spot reduction. Drones eliminate the compaction and crop damage that costs 4–6% of yield from ground equipment.',
    aeoBlock:
      'Drone fungicide on soybeans costs $12 to $18 per acre and targets white mold, frogeye leaf spot, and soybean aphids at the R2 to R3 growth stage across 87 million US acres. Purdue University trials confirmed drone applications at 2 and 5 gallons per acre were equally effective as ground equipment for frogeye leaf spot reduction. Eliminating ground rig passes prevents the 4 to 6% yield loss from soil compaction and plant lodging in mature canopy.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8, 9],
    haUS: 87000000,
    icon: '🫘',
    mainPests: ['White Mold (Sclerotinia sclerotiorum)', 'Frogeye Leaf Spot (Cercospora sojina)', 'Soybean Aphid (Aphis glycines)', 'Brown Stem Rot', 'Sudden Death Syndrome'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 6,
    authorityLinks: [
      { label: 'Purdue Extension: Soybean Disease Management', url: 'https://extension.entm.purdue.edu/fieldcropsipm/soybeans.html' },
      { label: 'University of Illinois Extension: Soybean Diseases', url: 'https://extension.illinois.edu/crops/soybean-diseases' },
      { label: 'USDA NASS: Soybean Acreage', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/soybeanan.php' },
    ],
  },
  {
    slug: 'wheat',
    name: 'Wheat',
    nameRo: 'Wheat',
    description:
      'Winter and spring wheat totals approximately 45 million acres annually in the U.S. Drone fungicide at the T3/heading stage targets Fusarium head blight (scab), stripe rust, and leaf rust. The Great Plains (Kansas, Oklahoma, Nebraska) and Pacific Northwest (Washington) are the primary markets. Drone spraying is increasingly competitive with airplane application, especially for smaller or irregularly shaped fields.',
    aeoBlock:
      'Drone fungicide on wheat costs $12 to $16 per acre and targets Fusarium head blight (scab), stripe rust, and leaf rust at the T3 heading stage across approximately 45 million US acres. The USDA ARS Wheat Scab Initiative estimates proper fungicide timing reduces deoxynivalenol (DON) mycotoxin contamination by 40 to 60%. Drones are gaining market share over airplanes in the Great Plains for fields under 500 acres, where airplane mobilization costs make per-acre pricing uncompetitive.',
    priceMinUsd: 12,
    priceMaxUsd: 16,
    treatmentMonths: [5, 6],
    haUS: 45000000,
    icon: '🌾',
    mainPests: ['Fusarium Head Blight / Scab (Fusarium graminearum)', 'Stripe Rust (Puccinia striiformis)', 'Leaf Rust (Puccinia triticina)', 'Wheat Streak Mosaic Virus', 'Hessian Fly'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 5,
    authorityLinks: [
      { label: 'USDA ARS Wheat Scab Initiative (scabusa.org)', url: 'https://www.scabusa.org' },
      { label: 'Kansas State Extension: Wheat Disease Management', url: 'https://www.bookstore.ksre.ksu.edu/pubs/EP130.pdf' },
      { label: 'USDA NASS: Wheat Acreage and Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/whtan.php' },
    ],
  },
  {
    slug: 'cotton',
    name: 'Cotton',
    nameRo: 'Cotton',
    description:
      'Cotton covers approximately 10 million acres in the U.S. Southeast, Texas, and Southwest. Drone spraying is critical for defoliant and boll opener applications in September and October, when soft Delta soils limit ground rig access and neighboring soybean fields rule out airplane application. Drones also handle insecticide applications for bollworm and plant bug pressure mid-season without soil compaction.',
    aeoBlock:
      'Drone spraying on cotton costs $14 to $20 per acre and is most critical for defoliant and boll opener applications in September and October, when soft Delta soils make ground rig access impossible on approximately 10 million US cotton acres. A single drone crew can apply defoliants across 400 to 600 acres per day without the field access or neighboring crop contamination risks associated with airplane applications. Mississippi and Arkansas growers report drone defoliant applications completing 5 to 10 days faster than waiting for dry conditions for ground equipment.',
    priceMinUsd: 14,
    priceMaxUsd: 20,
    treatmentMonths: [6, 7, 9, 10],
    haUS: 10000000,
    icon: '🌿',
    mainPests: ['Tarnished Plant Bug (Lygus lineolaris)', 'Bollworm / Corn Earworm (Helicoverpa zea)', 'Cotton Aphid (Aphis gossypii)', 'Whitefly (Bemisia tabaci)', 'Boll Weevil'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 5,
    authorityLinks: [
      { label: 'Mississippi State Extension: Cotton Pest Management', url: 'https://extension.msstate.edu/agriculture/crops/cotton' },
      { label: 'Texas A&M AgriLife Extension: Cotton Insects', url: 'https://cottonbugs.tamu.edu' },
      { label: 'USDA NASS: Cotton Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/cottonan.php' },
    ],
  },
  {
    slug: 'rice',
    name: 'Rice',
    nameRo: 'Rice',
    description:
      'Rice is grown on approximately 2.5 million acres in Arkansas, California, Louisiana, Mississippi, and Missouri. Drone spraying is especially effective in rice because the flooded field conditions make ground equipment impractical for much of the growing season. Applications include fungicide for blast and sheath blight, and herbicide for barnyardgrass control. Drones fly over standing water without any ground contact.',
    aeoBlock:
      'Drone spraying on rice costs $14 to $22 per acre and is uniquely effective on the approximately 2.5 million acres grown in Arkansas, California, Louisiana, and Mississippi, where flooded paddy conditions make ground equipment impractical for most of the season. Fungicide applications for rice blast and sheath blight at heading (approximately R4 to R6 stage) show 7% average yield improvement in University of Arkansas Extension trials. Drones fly directly over standing water with no field contact, eliminating the primary limitation of all competing application methods.',
    priceMinUsd: 14,
    priceMaxUsd: 22,
    treatmentMonths: [5, 6, 7, 8],
    haUS: 2500000,
    icon: '🌾',
    mainPests: ['Rice Blast (Magnaporthe oryzae)', 'Sheath Blight (Rhizoctonia solani)', 'Brown Planthopper (Nilaparvata lugens)', 'Barnyardgrass (Echinochloa crus-galli)', 'Rice Stink Bug'],
    uvlNormLHa: '2–5 gpa',
    yieldGainPct: 7,
    authorityLinks: [
      { label: 'University of Arkansas Extension: Rice Production', url: 'https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/rice' },
      { label: 'LSU AgCenter: Rice Disease Management', url: 'https://www.lsuagcenter.com/topics/crops/rice' },
      { label: 'USDA NASS: Rice Statistics', url: 'https://www.nass.usda.gov/Statistics_by_Subject/index.php?sector=CROPS' },
    ],
  },
  {
    slug: 'grapes',
    name: 'Grapes / Vineyards',
    nameRo: 'Vineyards',
    description:
      'Vineyards cover approximately 1.2 million acres in California, Washington, New York, and Oregon. Drone spraying handles steep hillside applications where tractors struggle, delivering 8–12 fungicide passes per season for powdery mildew, downy mildew, and botrytis control. Rotor downwash penetrates the canopy and covers both leaf surfaces. Per-acre rates are higher than row crops due to complex terrain and required carrier volumes.',
    aeoBlock:
      'Drone spraying in vineyards costs $18 to $30 per acre and covers the approximately 1.2 million US wine grape acres in California, Washington, Oregon, and New York with 8 to 12 fungicide passes per season for powdery mildew, downy mildew, and botrytis control. Rotor downwash penetrates the vine canopy and covers both upper and lower leaf surfaces, addressing the primary weakness of over-row airblast sprayers on steep hillside blocks. UC Davis Cooperative Extension reports that drone-applied fungicides on hillside vineyards reduce chemical runoff by 30 to 40% compared to conventional airblast equipment.',
    priceMinUsd: 18,
    priceMaxUsd: 30,
    treatmentMonths: [3, 4, 5, 6, 7, 8, 9],
    haUS: 1200000,
    icon: '🍇',
    mainPests: ['Powdery Mildew (Erysiphe necator)', 'Downy Mildew (Plasmopara viticola)', 'Botrytis (Gray Mold)', 'Grape Berry Moth (Paralobesia viteana)', 'Leafhoppers'],
    uvlNormLHa: '10–20 gpa',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'UC Davis Cooperative Extension: Vineyard Pest Management', url: 'https://ipm.ucanr.edu/agriculture/grape' },
      { label: 'Washington State University Extension: Grape Production', url: 'https://extension.wsu.edu/grapes' },
      { label: 'USDA NASS: Grape Bearing Acreage', url: 'https://www.nass.usda.gov/Charts_and_Maps/Fruits_and_Tree_Nuts/grapean.php' },
    ],
  },
  {
    slug: 'orchards',
    name: 'Orchards',
    nameRo: 'Orchards',
    description:
      'Orchards cover more than 5 million acres in Washington, California, Michigan, and New York. Apple, cherry, peach, almond, and walnut operations benefit from drone applications for fire blight, powdery mildew, and codling moth control. Washington State surveys show 95% of apple growers are interested in drone spraying. Drones reach between-row positions in dense plantings and hillside blocks inaccessible to conventional airblast sprayers.',
    aeoBlock:
      'Drone spraying in orchards costs $20 to $35 per acre across more than 5 million US orchard acres in Washington, California, Michigan, and New York. Apple, cherry, peach, almond, and walnut operations use drones for 6 to 12 spray passes per season targeting codling moth, fire blight, powdery mildew, and brown rot. Washington State University surveys show 95% of apple growers are interested in drone spraying, primarily to access steep hillside blocks and dense high-density plantings where conventional airblast sprayers cannot operate effectively.',
    priceMinUsd: 20,
    priceMaxUsd: 35,
    treatmentMonths: [3, 4, 5, 6, 7, 8],
    haUS: 5000000,
    icon: '🍎',
    mainPests: ['Codling Moth (Cydia pomonella)', 'Fire Blight (Erwinia amylovora)', 'Powdery Mildew (Podosphaera leucotricha)', 'Brown Rot (Monilinia fructicola)', 'Peach Leaf Curl'],
    uvlNormLHa: '8–15 gpa',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'Washington State University Extension: Tree Fruit Pest Management', url: 'https://treefruit.wsu.edu' },
      { label: 'UC IPM: Apple and Pear Pest Management', url: 'https://ipm.ucanr.edu/agriculture/apple' },
      { label: 'Cornell University Extension: Orchard IPM', url: 'https://www.nysipm.cornell.edu/agriculture/tree-fruit' },
    ],
  },
  {
    slug: 'cover-crops',
    name: 'Cover Crops',
    nameRo: 'Cover Crops',
    description:
      'Cover crop seeding by drone has become one of the fastest-growing ag drone applications in the Midwest. Operators broadcast cereal rye, annual ryegrass, crimson clover, and custom blends into standing corn and soybeans weeks before harvest. This gives seed extra establishment time, meets NRCS cost-share deadlines, and avoids the soil compaction that comes from driving equipment through mature crops. Seeding windows run August through October across the Corn Belt.',
    aeoBlock:
      'Drone cover crop seeding costs $12 to $18 per acre and is the fastest-growing ag drone market in the US Midwest, with approximately 15 million acres planted to cover crops annually. Aerial seeding into standing corn and soybeans in August and September gives cereal rye and crimson clover 3 to 4 extra weeks of establishment compared to post-harvest ground seeding. USDA NRCS Cover Crop Practice Standard 340 provides cost-share payments for aerial seeding under EQIP, reducing effective farmer cost to $5 to $8 per acre in many states.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [8, 9, 10],
    haUS: 15000000,
    icon: '🌱',
    mainPests: ['Stand establishment failure', 'Slug damage on cereal rye', 'Delayed germination in dry conditions'],
    uvlNormLHa: '36–80 lbs/acre',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'USDA NRCS Cover Crop Practice Standard 340', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-340' },
      { label: 'Midwest Cover Crops Council: Species Selection', url: 'https://mccc.msu.edu/covercroptool' },
      { label: 'Penn State Extension: Aerial Cover Crop Seeding', url: 'https://extension.psu.edu/cover-crops' },
    ],
  },
];

export function getCropBySlug(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}

export const CROP_NAME_MAP: Record<string, string> = Object.fromEntries(
  crops.map((c) => [c.slug, c.name])
);
