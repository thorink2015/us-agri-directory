import { Crop } from './types';

export const crops: Crop[] = [
  {
    slug: 'corn',
    name: 'Corn',
    nameRo: 'Corn',
    description:
      'Corn covers over 90 million US acres. Drone fungicide at the VT to R1 tassel stage is the single largest use case for agricultural drones in America.',
    longDescription:
      'Corn is the largest crop in the United States at over 90 million acres, and drone fungicide application at the VT/R1 tassel stage is the number one use case for agricultural drones in America. Once corn exceeds six to eight feet, ground sprayers cannot clear the canopy without wheel-track damage that costs 3 to 6 bushels per acre in crushed rows. Drones solve this cleanly because they fly 8 to 15 feet above the canopy and never touch the ground. University trials are decisive on efficacy. Beck\'s Practical Farm Research across Iowa, Indiana and Illinois showed drone-applied fungicide at 2 to 3 gallons per acre matched ground rig results at 15 to 20 gallons per acre, with an average yield response of 5 to 8 bushels over untreated corn. Iowa State and Purdue Extension confirm the finding for tar spot, gray leaf spot and southern rust pressure years. Drone operators in the Corn Belt treat 300 to 600 acres per drone per day on DJI Agras T50 or Hylio AG-272 class machines during the peak two-week VT/R1 window in late July, and most book up four to six weeks ahead. Tank mixes combining a strobilurin fungicide with an insecticide for western corn rootworm beetle or western bean cutworm are standard on high-value seed corn and stacked-trait fields.',
    aeoBlock:
      'Drone fungicide on corn costs $12 to $18 per acre and is the single largest use case for agricultural drones in America, covering over 90 million acres annually. The critical application window is the VT to R1 tassel stage in July and August, when corn is too tall for ground rigs and trampling damage from tractor passes costs 3 to 6 bushels per acre. University trials from Beck\'s Hybrids and Iowa State Extension show drone-applied fungicide at 2 to 3 gallons per acre matches ground rig efficacy at 15 to 20 gallons per acre, with an average yield response of 5 to 8 bushels per acre.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8],
    haUS: 90000000,
    icon: '🌽',
    mainPests: [
      'Tar Spot (Phyllachora maydis)',
      'Gray Leaf Spot (Cercospora zeae-maydis)',
      'Northern Corn Leaf Blight',
      'Southern Rust (Puccinia polysora)',
      'Corn Rootworm (Diabrotica)',
    ],
    uvlNormLHa: '2 to 5 gpa',
    yieldGainPct: 8,
    authorityLinks: [
      { label: 'Iowa State Extension: Corn Disease Management', url: 'https://crops.extension.iastate.edu/corn' },
      { label: 'Purdue Extension: Corn Fungicide Timing', url: 'https://extension.entm.purdue.edu/fieldcropsipm/corn.html' },
      { label: 'Beck\'s Practical Farm Research', url: 'https://www.beckshybrids.com/Resources/Practical-Farm-Research' },
      { label: 'USDA NASS: Corn Acreage and Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/cornan.php' },
    ],
    faqs: [
      {
        question: 'When should I spray corn fungicide with a drone?',
        answer:
          'The target window is VT to R1 (tassel emergence through silking), which lands in mid-to-late July across most of the Corn Belt. Spraying earlier than VT gives too little residual coverage; spraying after R2 usually shows diminishing yield response. Most operators run their peak schedule the last two weeks of July and the first week of August.',
      },
      {
        question: 'How much yield bump can I expect from drone fungicide on corn?',
        answer:
          'Published university trials show an average 5 to 8 bushel per acre response on fields with moderate to high disease pressure. In low-pressure years the response is often 2 to 4 bushels. High-pressure tar spot years in Indiana and Wisconsin have produced 15 to 25 bushel responses. Check your state extension service\'s annual trial summaries for local data.',
      },
      {
        question: 'Is 2 gallons per acre really enough carrier volume for corn fungicide?',
        answer:
          'Yes, on drones it is. The rotor downwash pushes droplets deep into the canopy, giving coverage that matches 15 to 20 gpa ground applications. The key is using the right nozzle and droplet size specification for your product label. Some labels require minimum gpa or droplet size that will disqualify low-volume drone application, so read the label before booking.',
      },
      {
        question: 'Can drones spray corn too tall for my ground rig?',
        answer:
          'Yes, and this is the primary reason farmers hire drone operators on corn. Ground sprayers top out at roughly 6 to 8 feet of clearance, and tasseling corn is 8 to 11 feet tall. Flying a drone 8 to 15 feet above the canopy eliminates the height limit and the row-crush yield loss that high-clearance sprayers cause.',
      },
      {
        question: 'What does drone corn fungicide cost per acre in 2026?',
        answer:
          'Most operators charge $12 to $18 per acre for application only, with the farmer supplying the chemical. Rates are lowest in dense Corn Belt counties where operator competition is strongest, and highest in fringe areas with long travel distances. Large-field discounts are common above 200 to 500 acres.',
      },
      {
        question: 'How far ahead should I book a drone operator for corn in my state?',
        answer:
          'Corn Belt operators book out 4 to 6 weeks before the VT/R1 window. Call by early June for late-July slots. Iowa, Illinois and Indiana fill fastest; Ohio and Michigan have more late availability.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'soybeans',
    name: 'Soybeans',
    nameRo: 'Soybeans',
    description:
      'Soybeans cover over 87 million US acres. Drone applications target white mold, frogeye leaf spot and soybean aphids at the R2 to R3 growth stage.',
    longDescription:
      'Soybeans cover more than 87 million US acres and are the second-largest drone spray market in America. The primary target is the R2 to R3 reproductive window in July and August, when canopy closure and soybean aphid, spider mite and frogeye leaf spot pressure peak across the Corn Belt, Mid-South and Mid-Atlantic. Purdue University trials confirmed drone applications at 2 and 5 gallons per acre were equally effective as ground equipment for frogeye leaf spot reduction, and University of Illinois Extension reports similar equivalence for white mold management in the northern soybean belt. The biggest economic argument for drone application on soybeans is avoiding the compaction and lodging damage caused by late-season ground rig passes, which University of Minnesota research puts at 4 to 6 percent yield loss on tall R3-stage canopies. Drone operators treating soybeans typically cover 250 to 500 acres per drone per day on T40 or T50 class drones, with many running tank mixes of fungicide plus insecticide. Cover crop overseeding into standing soybeans in September and October has also become a major secondary use case, especially in states with USDA NRCS EQIP cost-share deadlines for cereal rye establishment.',
    aeoBlock:
      'Drone fungicide on soybeans costs $12 to $18 per acre and targets white mold, frogeye leaf spot and soybean aphids at the R2 to R3 growth stage across 87 million US acres. Purdue University trials confirmed drone applications at 2 and 5 gallons per acre were equally effective as ground equipment for frogeye leaf spot reduction. Eliminating ground rig passes prevents the 4 to 6 percent yield loss from soil compaction and plant lodging in mature canopy.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [7, 8, 9],
    haUS: 87000000,
    icon: '🫘',
    mainPests: [
      'White Mold (Sclerotinia sclerotiorum)',
      'Frogeye Leaf Spot (Cercospora sojina)',
      'Soybean Aphid (Aphis glycines)',
      'Brown Stem Rot',
      'Sudden Death Syndrome',
    ],
    uvlNormLHa: '2 to 5 gpa',
    yieldGainPct: 6,
    authorityLinks: [
      { label: 'Purdue Extension: Soybean Disease Management', url: 'https://extension.entm.purdue.edu/fieldcropsipm/soybeans.html' },
      { label: 'University of Illinois Extension: Soybean Diseases', url: 'https://extension.illinois.edu/crops/soybean-diseases' },
      { label: 'University of Minnesota Extension: Soybean Production', url: 'https://extension.umn.edu/soybean' },
      { label: 'USDA NASS: Soybean Acreage', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/soybeanan.php' },
    ],
    faqs: [
      {
        question: 'What is the best stage to spray fungicide on soybeans by drone?',
        answer:
          'R2 to R3 is the sweet spot. R2 is full flowering, R3 is beginning pod. Applications in this window cover the canopy before pods develop, protect against white mold and frogeye leaf spot and deliver the highest yield response in university trials. Earlier applications at R1 are too short on residual, later applications at R5 rarely pay.',
      },
      {
        question: 'Can drones apply herbicide to soybeans too?',
        answer:
          'Yes, but read the label first. Most post-emerge herbicides labeled for soybeans allow aerial application, but some require minimum carrier volumes of 10 to 15 gallons per acre that are impractical for drone tank sizes. Dicamba-tolerant systems have specific drift-reduction nozzle requirements that some drone operators meet with approved nozzles. Check the product label and your state restrictions before booking.',
      },
      {
        question: 'Does drone application on soybeans hurt yield from spray overlap?',
        answer:
          'Modern drones with RTK GPS and automated mission planning hit overlap rates under 3 percent, which is comparable to the best ground sprayers. The larger yield benefit comes from not running a 30-ton self-propelled sprayer through waist-high soybeans in July. University of Minnesota research puts compaction and lodging loss from late-season ground application at 4 to 6 percent.',
      },
      {
        question: 'How long before the spray window should I book a drone for my soybeans?',
        answer:
          'Two to four weeks ahead for the R2/R3 peak window is standard. In hot fungicide pressure years, good operators book out six weeks or more. If you are waiting to decide based on disease scouting, call your operator early to get on a standby list so you can trigger the application within 48 hours of making the call.',
      },
      {
        question: 'Can drones also seed cover crops into my standing soybeans?',
        answer:
          'Yes, and this is a fast-growing secondary use. Operators broadcast cereal rye, crimson clover or ryegrass into R6 to R7 soybeans in late September and October, giving the cover crop 3 to 4 extra weeks of establishment before harvest frees the ground. USDA NRCS EQIP cost-share under Practice Standard 340 often covers 50 to 70 percent of the seeding cost.',
      },
      {
        question: 'How far ahead should I book a drone operator for soybeans in my state?',
        answer:
          'R2/R3 in mid-July books out 2 to 4 weeks ahead. Call in late June to secure your slot. Tight-window states like Iowa, Illinois and Indiana book earliest; fringe states have more flexibility.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'wheat',
    name: 'Wheat',
    nameRo: 'Wheat',
    description:
      'Winter and spring wheat total about 45 million US acres. Drone fungicide at the T3 heading stage targets Fusarium head blight, stripe rust and leaf rust.',
    longDescription:
      'Winter and spring wheat total approximately 45 million US acres annually, with the Great Plains (Kansas, Oklahoma, Nebraska, North Dakota, South Dakota) and Pacific Northwest (Washington, Idaho) as the primary markets. The critical drone application window is T3 at heading, when Fusarium head blight (scab), stripe rust and leaf rust do their worst damage. The USDA ARS Wheat Scab Initiative estimates proper fungicide timing reduces deoxynivalenol (DON) mycotoxin contamination by 40 to 60 percent, which is the difference between food-grade wheat and discounted feed wheat at the elevator. Drones are rapidly gaining market share against airplane applicators on wheat, with most Great Plains operators running DJI Agras T50 and Hylio AG-272 for the 1,000+ gallons-per-day throughput the heading window demands, especially on fields under 500 acres where airplane mobilization cost makes per-acre pricing uncompetitive. Kansas State Extension trials show drone applications at 2 to 3 gallons per acre match airplane efficacy at 2 to 5 gallons, and NDSU Extension has published similar data for North Dakota hard red spring wheat. The compression of the heading window (often just 5 to 7 days) makes local drone operator capacity a real constraint, and wheat growers who line up their applicator in April for a July spray usually get better pricing than last-minute callers.',
    aeoBlock:
      'Drone fungicide on wheat costs $12 to $16 per acre and targets Fusarium head blight (scab), stripe rust and leaf rust at the T3 heading stage across approximately 45 million US acres. The USDA ARS Wheat Scab Initiative estimates proper fungicide timing reduces deoxynivalenol (DON) mycotoxin contamination by 40 to 60 percent. Drones are gaining market share over airplanes in the Great Plains for fields under 500 acres, where airplane mobilization costs make per-acre pricing uncompetitive.',
    priceMinUsd: 12,
    priceMaxUsd: 16,
    treatmentMonths: [5, 6],
    haUS: 45000000,
    icon: '🌾',
    mainPests: [
      'Fusarium Head Blight / Scab (Fusarium graminearum)',
      'Stripe Rust (Puccinia striiformis)',
      'Leaf Rust (Puccinia triticina)',
      'Wheat Streak Mosaic Virus',
      'Hessian Fly',
    ],
    uvlNormLHa: '2 to 5 gpa',
    yieldGainPct: 5,
    authorityLinks: [
      { label: 'USDA ARS Wheat Scab Initiative (scabusa.org)', url: 'https://www.scabusa.org' },
      { label: 'Kansas State Extension: Wheat Disease Management', url: 'https://www.bookstore.ksre.ksu.edu/pubs/EP130.pdf' },
      { label: 'NDSU Extension: Wheat Production', url: 'https://www.ndsu.edu/agriculture/ag-hub/ag-topics/crop-production/crops/wheat' },
      { label: 'USDA NASS: Wheat Acreage and Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/whtan.php' },
    ],
    faqs: [
      {
        question: 'When is the right time to spray wheat with a drone?',
        answer:
          'T3 at heading is the target, when roughly half the heads have emerged from the boot. This is a 5 to 7 day window that arrives in late May in Texas and southern Oklahoma, early June across Kansas and Nebraska and mid to late June in North Dakota. Spraying earlier than Feekes 10.5 (full head emergence) reduces scab control, spraying after full bloom reduces both DON control and yield response.',
      },
      {
        question: 'Are drones really competitive with airplane applicators on wheat?',
        answer:
          'On fields under 500 acres, yes. Airplane operators have minimum ferry-charge and mobilization cost that pushes per-acre rates up for smaller fields. Drone operators based within an hour of the field can price $12 to $16 per acre comfortably, which is often below airplane quotes for sub-500-acre fields. Above 1,000 acres, airplanes still win on throughput.',
      },
      {
        question: 'Does drone fungicide really reduce DON in wheat?',
        answer:
          'Yes, when timed correctly. USDA ARS research shows T3 heading applications of Prosaro, Caramba or Miravis Ace reduce DON contamination by 40 to 60 percent in high-scab-pressure years. Drone versus airplane delivery method shows no statistical difference in DON reduction when carrier volume, product and timing are matched.',
      },
      {
        question: 'What wheat products can be applied at 2 to 3 gallons per acre by drone?',
        answer:
          'Most heading-stage wheat fungicides allow 2 to 5 gpa aerial application per label: Prosaro, Caramba, Miravis Ace, Preemptor and generics. Some require minimum droplet size specifications (coarse to medium) that certain drone nozzles meet and others do not. Always cross-check the label against your operator\'s nozzle setup.',
      },
      {
        question: 'How early should I book a drone for wheat fungicide?',
        answer:
          'April is the ideal call in the Great Plains. Heading windows across the region overlap badly and local operator capacity is the constraint, not chemical availability. Operators who pre-book their wheat customers in early spring usually pass late-season requests on to airplane or farther-away drones at higher rates.',
      },
      {
        question: 'How far ahead should I book a drone operator for wheat in my state?',
        answer:
          'Book in April for June heading applications. Great Plains operators fill slots by May. Small-acre growers are most likely to get squeezed out as large commercial wheat farms lock in capacity first.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'cotton',
    name: 'Cotton',
    nameRo: 'Cotton',
    description:
      'Cotton covers roughly 10 million US acres. Drone spraying is critical for defoliant applications in September and October when soft Delta soils block ground rigs.',
    longDescription:
      'Cotton covers approximately 10 million US acres across the Southeast, Texas and the Mid-South. Drone spraying has become essential for defoliant and boll-opener applications in September and October, when soft Delta soils stop ground rigs and neighboring soybean fields rule out airplanes due to drift concerns. Mississippi State Extension and the University of Arkansas report cotton growers in the Delta completing defoliant applications 5 to 10 days faster by drone than by waiting for ground to dry out for tractor-mounted sprayers. A two-drone crew commonly treats 400 to 600 acres of cotton defoliant per day. Mid-season applications also matter: tarnished plant bug, cotton aphid and bollworm pressure spike in July and August and drone applicators handle these jobs without the compaction that hurts mid-season cotton yield. Texas cotton, both in the Rolling Plains and South Texas, adds a separate use case: brush control on mesquite and cedar in pasture-adjacent cotton rotations, where drones reach zones ground rigs cannot. Per-acre rates on cotton run higher than row crops because defoliant applications often require complex tank mixes and precise coverage at low carrier volumes.',
    aeoBlock:
      'Drone spraying on cotton costs $14 to $20 per acre and is most critical for defoliant and boll opener applications in September and October, when soft Delta soils make ground rig access impossible on approximately 10 million US cotton acres. A single drone crew can apply defoliants across 400 to 600 acres per day without the field access or neighboring crop contamination risks of airplane applications. Mississippi and Arkansas growers report drone defoliant applications completing 5 to 10 days faster than waiting for dry conditions for ground equipment.',
    priceMinUsd: 14,
    priceMaxUsd: 20,
    treatmentMonths: [6, 7, 9, 10],
    haUS: 10000000,
    icon: '🌿',
    mainPests: [
      'Tarnished Plant Bug (Lygus lineolaris)',
      'Bollworm / Corn Earworm (Helicoverpa zea)',
      'Cotton Aphid (Aphis gossypii)',
      'Whitefly (Bemisia tabaci)',
      'Boll Weevil',
    ],
    uvlNormLHa: '2 to 5 gpa',
    yieldGainPct: 5,
    authorityLinks: [
      { label: 'Mississippi State Extension: Cotton Pest Management', url: 'https://extension.msstate.edu/agriculture/crops/cotton' },
      { label: 'University of Arkansas Extension: Cotton', url: 'https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/cotton' },
      { label: 'Texas A&M AgriLife Extension: Cotton Insects', url: 'https://cottonbugs.tamu.edu' },
      { label: 'USDA NASS: Cotton Production', url: 'https://www.nass.usda.gov/Charts_and_Maps/Field_Crops/cottonan.php' },
    ],
    faqs: [
      {
        question: 'When is the drone defoliant window for cotton?',
        answer:
          'Late September through late October across most of the Cotton Belt, with timing set by at least 60 percent open bolls and a 10 to 14 day lead before harvest. Delta growers often need multiple passes: first a defoliant, then a boll opener 7 to 10 days later, sometimes followed by a desiccant. Drones handle sequential passes faster than any ground or airplane alternative.',
      },
      {
        question: 'Why use drones instead of airplanes for cotton defoliation?',
        answer:
          'Two reasons. First, drift. Cotton defoliants applied from airplanes at 5 to 10 feet above crop height drift onto neighboring soybean, vegetable or organic fields and cost operators their business. Drones at 8 to 15 feet above cotton canopy hold drift to a tighter corridor. Second, field access. Most Delta cotton fields in October are too wet for ground rigs and airplanes cannot stage from short turn rows.',
      },
      {
        question: 'Can a drone handle a tank mix of defoliant plus boll opener plus desiccant?',
        answer:
          'Yes, on most tank-mix combinations. The limiting factor is usually the boll opener product\'s label minimum carrier volume. Some labels specify 5 to 10 gpa for ethephon-based products, which is at the high end of drone tank-mix ratios. Operators running DJI Agras T50 or Hylio AG-272 systems regularly complete 3-way cotton tank mixes at 3 to 5 gpa.',
      },
      {
        question: 'How much does drone cotton defoliation cost per acre?',
        answer:
          'Typical rates run $14 to $20 per acre for a single defoliant pass, rising to $18 to $25 per acre for tank mixes that include a boll opener. Minimum booking of 40 acres is common, and large blocks over 500 acres often negotiate closer to the $14 floor. Prices are higher in Texas and the Southeast than in the Mid-South because of longer ferry distances between fields.',
      },
      {
        question: 'Can drones spray cotton mid-season for insecticide?',
        answer:
          'Yes, and this use is growing fast. Tarnished plant bug and cotton aphid scouting thresholds trigger July and August drone insecticide applications across the Mid-South and Southeast. Drone applications at R1 to R4 flowering avoid the compaction and plant breakage that late-season ground rig passes cause in closed cotton canopy.',
      },
      {
        question: 'How far ahead should I book a drone operator for cotton in my state?',
        answer:
          'Book in August for September and October defoliant runs. Mid-South capacity is the tightest in the country during defoliation season, when cotton, soybean pre-harvest and cover crop seeding all compete for the same drones.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'rice',
    name: 'Rice',
    nameRo: 'Rice',
    description:
      'Rice covers about 2.5 million US acres. Drone spraying is uniquely effective because flooded paddy fields make ground equipment impractical for most of the season.',
    longDescription:
      'Rice is grown on approximately 2.5 million US acres in Arkansas, California, Louisiana, Mississippi and Missouri. It is the single highest-density drone spray crop in America, because the flooded paddy conditions that define rice production make ground equipment impractical from flood-up through drain. Arkansas alone produces 1.2 million acres of rice and is effectively 100 percent aerial-treated for heading-stage fungicide. The University of Arkansas Extension reports 7 percent average yield improvement from fungicide applications timed at R4 to R6 for rice blast and sheath blight control. Drones have rapidly taken share from airplanes in rice over the past three years because they fly lower, produce less drift into sensitive neighboring soybeans and cover small odd-shaped levee fields where airplane turnarounds are inefficient. LSU AgCenter trials in Louisiana also show drone herbicide applications for barnyardgrass control matching ground-rig efficacy pre-flood. Operators serving the Arkansas and Mississippi rice market commonly run fleets of 3 to 8 DJI Agras T50 drones and treat 800 to 1,200 acres per day during the July and August peak heading window. Cal Poly research confirms similar performance for the California Sacramento Valley rice market, which runs a slightly later August and September calendar.',
    aeoBlock:
      'Drone spraying on rice costs $14 to $22 per acre and is uniquely effective on the approximately 2.5 million acres grown in Arkansas, California, Louisiana and Mississippi, where flooded paddy conditions make ground equipment impractical for most of the season. Fungicide applications for rice blast and sheath blight at heading (approximately R4 to R6 stage) show 7 percent average yield improvement in University of Arkansas Extension trials. Drones fly directly over standing water with no field contact, eliminating the primary limitation of all competing application methods.',
    priceMinUsd: 14,
    priceMaxUsd: 22,
    treatmentMonths: [5, 6, 7, 8],
    haUS: 2500000,
    icon: '🌾',
    mainPests: [
      'Rice Blast (Magnaporthe oryzae)',
      'Sheath Blight (Rhizoctonia solani)',
      'Brown Planthopper (Nilaparvata lugens)',
      'Barnyardgrass (Echinochloa crus-galli)',
      'Rice Stink Bug',
    ],
    uvlNormLHa: '2 to 5 gpa',
    yieldGainPct: 7,
    authorityLinks: [
      { label: 'University of Arkansas Extension: Rice Production', url: 'https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/rice' },
      { label: 'LSU AgCenter: Rice Disease Management', url: 'https://www.lsuagcenter.com/topics/crops/rice' },
      { label: 'Mississippi State Extension: Rice', url: 'https://extension.msstate.edu/agriculture/crops/rice' },
      { label: 'USDA NASS: Rice Statistics', url: 'https://www.nass.usda.gov/Statistics_by_Subject/index.php?sector=CROPS' },
    ],
    faqs: [
      {
        question: 'What is the best growth stage to spray rice fungicide?',
        answer:
          'R4 to R6, from late boot through full heading. University of Arkansas trials show the 7 percent yield response peaks in this window because both blast and sheath blight infect heads during panicle emergence. Spraying earlier than R3 is too short on residual coverage, spraying after R7 rarely recovers yield.',
      },
      {
        question: 'Why drones instead of airplanes for rice?',
        answer:
          'Lower drift, smaller turn radius, better access to small levee fields. Arkansas and Mississippi rice fields share borders with dicamba-sensitive and 2,4-D-sensitive soybeans and state regulators have tightened aerial drift rules every year. Drones flying 8 to 15 feet above the canopy with RTK-guided overlap hold drift within a much tighter corridor than airplanes flying 50 to 100 feet up.',
      },
      {
        question: 'Can drones apply rice herbicides pre-flood?',
        answer:
          'Yes, most early-season rice herbicides (Command, Bolero, Facet L, Loyant) allow aerial application including by drone. LSU AgCenter and University of Arkansas Extension have published drone trial data for barnyardgrass control that matches ground-rig efficacy at 3 to 5 gallons per acre carrier.',
      },
      {
        question: 'How much does drone rice fungicide cost in Arkansas?',
        answer:
          'Typical rates in the Arkansas Grand Prairie and Delta regions run $14 to $18 per acre for a single fungicide pass at heading, with large blocks over 500 acres sometimes priced at $12 to $14. California rice runs slightly higher, often $18 to $22 per acre, because of tighter CDPR restricted-material permit rules and fewer operators per acre.',
      },
      {
        question: 'Do I need a special state license to apply rice products by drone?',
        answer:
          'Yes, in every rice-producing state. Arkansas requires a commercial pesticide applicator license plus an aerial sub-classification. California requires the Unmanned Pest Control Aircraft Pilot Certificate plus a QAC or QAL. Louisiana and Mississippi have slightly lighter requirements but still require an aerial applicator category endorsement. Your drone operator handles their own licensing, but you should ask to see certificates before booking.',
      },
      {
        question: 'How far ahead should I book a drone operator for rice in my state?',
        answer:
          'Book by May for July and August heading applications. Arkansas Grand Prairie operators fill first and often have no capacity for late callers by June. California rice has a later August to September window but books similarly fast given the smaller number of licensed operators.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'grapes',
    name: 'Grapes / Vineyards',
    nameRo: 'Vineyards',
    description:
      'Vineyards cover roughly 1.2 million US acres. Drone spraying handles steep hillside applications where tractors cannot safely operate.',
    longDescription:
      'Wine grape vineyards cover approximately 1.2 million US acres, concentrated in California (900,000 acres), Washington, Oregon and New York. Drones have become the preferred spray platform on hillside blocks with slopes over 15 percent, where airblast sprayers either cannot operate safely or produce runoff that violates local water-quality rules. A typical California wine vineyard receives 8 to 12 fungicide passes per season for powdery mildew, downy mildew and botrytis control, making per-acre spray spend the largest single chemical cost in grape production. Rotor downwash from a commercial spray drone (DJI Agras T25P and T50 are the dominant models in California vineyard work) penetrates the vine canopy and covers both upper and lower leaf surfaces, addressing the single biggest weakness of over-row airblast equipment. UC Davis Cooperative Extension research reports drone-applied fungicide on hillside vineyards reduces chemical runoff by 30 to 40 percent compared to conventional airblast sprayers. Per-acre rates are higher than row crops ($18 to $30 per acre) because hillside terrain, multiple passes per season and required carrier volumes of 10 to 20 gallons per acre all push costs up. California vineyards also add regulatory complexity: every application must be reported to the County Agricultural Commissioner, many products require Restricted Material Permits and some pest management products require a same-day Notice of Intent filing.',
    aeoBlock:
      'Drone spraying in vineyards costs $18 to $30 per acre and covers the approximately 1.2 million US wine grape acres in California, Washington, Oregon and New York with 8 to 12 fungicide passes per season for powdery mildew, downy mildew and botrytis control. Rotor downwash penetrates the vine canopy and covers both upper and lower leaf surfaces, addressing the primary weakness of over-row airblast sprayers on steep hillside blocks. UC Davis Cooperative Extension reports that drone-applied fungicides on hillside vineyards reduce chemical runoff by 30 to 40 percent compared to conventional airblast equipment.',
    priceMinUsd: 18,
    priceMaxUsd: 30,
    treatmentMonths: [3, 4, 5, 6, 7, 8, 9],
    haUS: 1200000,
    icon: '🍇',
    mainPests: [
      'Powdery Mildew (Erysiphe necator)',
      'Downy Mildew (Plasmopara viticola)',
      'Botrytis (Gray Mold)',
      'Grape Berry Moth (Paralobesia viteana)',
      'Leafhoppers',
    ],
    uvlNormLHa: '10 to 20 gpa',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'UC Davis Cooperative Extension: Vineyard Pest Management', url: 'https://ipm.ucanr.edu/agriculture/grape' },
      { label: 'Washington State University Extension: Grape Production', url: 'https://extension.wsu.edu/grapes' },
      { label: 'California Department of Pesticide Regulation', url: 'https://www.cdpr.ca.gov' },
      { label: 'USDA NASS: Grape Bearing Acreage', url: 'https://www.nass.usda.gov/Charts_and_Maps/Fruits_and_Tree_Nuts/grapean.php' },
    ],
    faqs: [
      {
        question: 'Why hire a drone operator for vineyard spraying instead of using a tractor?',
        answer:
          'Three reasons. Slopes over 15 percent make tractor-mounted airblast sprayers genuinely dangerous. Drones cover both leaf surfaces via rotor downwash where over-row airblast misses the underside of leaves. And drones reduce chemical runoff by 30 to 40 percent on hillside blocks per UC Davis research, which matters for regulatory compliance in California and Oregon.',
      },
      {
        question: 'How many spray passes does a California vineyard need per season?',
        answer:
          'Most Napa, Sonoma and Paso Robles vineyards run 8 to 12 fungicide passes per season from bud break in March through veraison in August. Powdery mildew alone typically triggers 6 to 9 sprays on susceptible varieties. Washington and Oregon programs are slightly shorter at 6 to 10 passes. Per-acre rates multiply across this many applications, making drone efficiency a real dollars-per-acre decision.',
      },
      {
        question: 'What does it cost to spray a California vineyard by drone?',
        answer:
          'Typical rates run $18 to $30 per acre per pass, with hillside premium blocks running up to $35 per acre. A full-season 10-pass program at $24 average lands at $240 per acre in drone spray costs alone. Large vineyards over 100 acres often negotiate rate floors, and multi-year contracts with a dedicated drone operator can trim 10 to 15 percent off spot pricing.',
      },
      {
        question: 'Can drones spray organic vineyards?',
        answer:
          'Yes, and this is one of the fastest-growing drone spray niches. OMRI-approved sulfur, copper hydroxide, Regalia and other organic products all apply well by drone at 10 to 20 gpa carrier. Some organic growers prefer drones specifically because lower drift and targeted coverage reduce collateral impact on cover crops and beneficial insects between vine rows.',
      },
      {
        question: 'Do California regulations treat drone spraying differently from airblast?',
        answer:
          'Yes. CDPR requires pilots to hold the Unmanned Pest Control Aircraft Pilot Certificate in addition to a standard QAC or QAL, plus county agricultural commissioner registration in each county of operation. Restricted Material Permits and Notice of Intent filings apply the same way as with airblast. Some county regulations also impose mandatory buffer zones around schools and residences that are stricter for aerial application including drones.',
      },
      {
        question: 'How far ahead should I book a drone operator for grapes in my state?',
        answer:
          'Book a full-season contract by February in California. Mid-season one-off sprays during powdery mildew spikes are often impossible to source once the season is underway. Washington and Oregon vineyard operators have slightly more flexibility but full-season programs still fill by March.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'orchards',
    name: 'Orchards',
    nameRo: 'Orchards',
    description:
      'Orchards cover more than 5 million US acres. Apple, cherry, peach, almond and walnut operations use drones for dense plantings and hillside blocks.',
    longDescription:
      'US orchards cover more than 5 million acres, with Washington State apple and cherry blocks, California almond and pistachio plantations, Michigan and New York tree fruit and Florida citrus as the primary markets. Drone spraying has moved from experimental to mainstream in orchards over the past three years, driven by two factors: dense high-density plantings where conventional airblast sprayers struggle to cover the canopy, and hillside blocks in Washington and Oregon that are genuinely unsafe for tractor operation. Washington State University surveys report 95 percent of apple growers are interested in drone spraying, and Michigan State University Extension has published parallel interest data for tart cherry. Typical orchard spray programs include 6 to 12 passes per season for fire blight, powdery mildew, codling moth and brown rot. Per-acre rates are the highest of any US drone spray market ($20 to $35 per acre) because of the dense canopy, higher carrier volumes required (8 to 15 gpa) and the complex navigation around variable tree sizes and row widths. Cornell University Cooperative Extension reports drone pesticide reductions of 25 to 40 percent on high-density apple compared to airblast at equivalent disease and pest control. Almond and pistachio growers in California\'s Central Valley also increasingly use drones for early-season dormant oil and fungicide passes where air movement and orchard floor conditions limit ground equipment effectiveness.',
    aeoBlock:
      'Drone spraying in orchards costs $20 to $35 per acre across more than 5 million US orchard acres in Washington, California, Michigan and New York. Apple, cherry, peach, almond and walnut operations use drones for 6 to 12 spray passes per season targeting codling moth, fire blight, powdery mildew and brown rot. Washington State University surveys show 95 percent of apple growers are interested in drone spraying, primarily to access steep hillside blocks and dense high-density plantings where conventional airblast sprayers cannot operate effectively.',
    priceMinUsd: 20,
    priceMaxUsd: 35,
    treatmentMonths: [3, 4, 5, 6, 7, 8],
    haUS: 5000000,
    icon: '🍎',
    mainPests: [
      'Codling Moth (Cydia pomonella)',
      'Fire Blight (Erwinia amylovora)',
      'Powdery Mildew (Podosphaera leucotricha)',
      'Brown Rot (Monilinia fructicola)',
      'Peach Leaf Curl',
    ],
    uvlNormLHa: '8 to 15 gpa',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'Washington State University Extension: Tree Fruit Pest Management', url: 'https://treefruit.wsu.edu' },
      { label: 'UC IPM: Apple and Pear Pest Management', url: 'https://ipm.ucanr.edu/agriculture/apple' },
      { label: 'Cornell University Extension: Orchard IPM', url: 'https://www.nysipm.cornell.edu/agriculture/tree-fruit' },
      { label: 'Michigan State University Extension: Fruit', url: 'https://www.canr.msu.edu/fruit' },
    ],
    faqs: [
      {
        question: 'Can drones actually penetrate dense orchard canopy?',
        answer:
          'Yes, on most modern high-density plantings. Commercial drones like the DJI Agras T50 and Hylio AG-272 produce rotor downwash that pushes droplets through 8 to 12 feet of apple canopy. Older full-size apple and walnut plantings with deep canopies above 15 feet often still require supplemental ground or airblast application for complete coverage.',
      },
      {
        question: 'How much can I reduce pesticide use by switching from airblast to drone?',
        answer:
          'Cornell University Extension trials on high-density apple report 25 to 40 percent pesticide reduction at equivalent disease and pest control. The main drivers are better target coverage (less off-target drift and runoff to the orchard floor) and precise GPS-guided application that eliminates the overlap inefficiencies of tractor-driven airblast.',
      },
      {
        question: 'Is drone spraying legal in Washington apple orchards?',
        answer:
          'Yes. Washington State Department of Agriculture publishes specific drone pesticide application guidance, and operators must hold the Washington State pesticide applicator license in the relevant use category plus FAA Part 107 and Part 137. WSDA has clarified that drones are legal to use anywhere airblast is legal, as long as the specific product label does not restrict aircraft type.',
      },
      {
        question: 'What does a full-season drone orchard spray program cost per acre?',
        answer:
          'An 8-pass apple program at $26 per pass lands at $208 per acre per season in drone spray costs alone. A 12-pass California stone fruit program can exceed $300 per acre. This sounds high against airblast at $5 to $10 per pass but the accurate comparison also includes the labor, fuel, tractor depreciation and compaction cost of 8 to 12 tractor passes, which many growers find breaks even or favors drone.',
      },
      {
        question: 'Can drones handle almond and walnut orchard spraying?',
        answer:
          'Yes, especially for dormant oil and early-season fungicide passes when trees are leafed down. Dense mid-season walnut and mature almond canopies above 20 feet are harder for current drones to fully penetrate and often still receive airblast. Most California orchard drone operators run hybrid programs, drones for 6 to 8 of 10 annual passes and airblast for the dense mid-summer passes.',
      },
      {
        question: 'How far ahead should I book a drone operator for orchards in my state?',
        answer:
          'Book a full-season program by January in Washington and California. One-off sprays during the season are very hard to find once operators are committed to full-season contracts. Michigan and New York have slightly more spot availability but early booking still saves 10 to 15 percent on per-pass rates.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'cover-crops',
    name: 'Cover Crops',
    nameRo: 'Cover Crops',
    description:
      'Cover crop seeding by drone is one of the fastest-growing ag drone applications in the Midwest, with roughly 15 million acres planted annually.',
    longDescription:
      'Cover crop seeding by drone is the fastest-growing ag drone service in the United States. Approximately 15 million US acres are planted to cover crops annually, with the Corn Belt, Chesapeake Bay watershed and California dominating adoption. Drones broadcast cereal rye, annual ryegrass, crimson clover, hairy vetch, oats and radishes into standing corn and soybeans 2 to 6 weeks before harvest, giving seed the extra establishment time that post-harvest ground seeding does not provide. USDA NRCS Cover Crop Practice Standard 340 and EQIP program rules make drone seeding eligible for federal cost-share payments, reducing effective per-acre cost to $5 to $8 in many states. Penn State Extension, Iowa State and Ohio State Extension have all published data showing drone-seeded cover crops establish 3 to 4 weeks earlier than equivalent post-harvest ground seeding. The most common failure mode is dry conditions after seeding, which delay germination until fall rains arrive and modern operators use radar forecast and soil moisture data to time applications ahead of expected precipitation. Drone capacity is a real constraint, with most Corn Belt cover crop seeders running T50 class drones at 200 to 400 acres per day of broadcast seeding: the Corn Belt seeding window runs late August through mid-October, and most operators book their August and September slots by July. USDA FSA and state conservation districts often coordinate group contracts for cover crop drone seeding that can trim per-acre costs for participating farmers by 20 to 30 percent.',
    aeoBlock:
      'Drone cover crop seeding costs $12 to $18 per acre and is the fastest-growing ag drone market in the US Midwest, with approximately 15 million acres planted to cover crops annually. Aerial seeding into standing corn and soybeans in August and September gives cereal rye and crimson clover 3 to 4 extra weeks of establishment compared to post-harvest ground seeding. USDA NRCS Cover Crop Practice Standard 340 provides cost-share payments for aerial seeding under EQIP, reducing effective farmer cost to $5 to $8 per acre in many states.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    treatmentMonths: [8, 9, 10],
    haUS: 15000000,
    icon: '🌱',
    mainPests: [
      'Stand establishment failure',
      'Slug damage on cereal rye',
      'Delayed germination in dry conditions',
    ],
    uvlNormLHa: '36 to 80 lbs/acre',
    yieldGainPct: 0,
    authorityLinks: [
      { label: 'USDA NRCS Cover Crop Practice Standard 340', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-340' },
      { label: 'Midwest Cover Crops Council: Species Selection', url: 'https://mccc.msu.edu/covercroptool' },
      { label: 'Penn State Extension: Aerial Cover Crop Seeding', url: 'https://extension.psu.edu/cover-crops' },
      { label: 'USDA EQIP Program Overview', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
    ],
    faqs: [
      {
        question: 'What cover crop species work best for drone seeding?',
        answer:
          'Cereal rye is the workhorse and establishes reliably from September drone seeding across the Corn Belt. Annual ryegrass, crimson clover, hairy vetch, oats and radishes all work well. Species with very small seeds (turnips, mustards) broadcast well, while large-seeded crops like soybeans or peas are not practical for drone seeding because of tank capacity and seed damage.',
      },
      {
        question: 'When is the right time to drone-seed cover crops into standing corn?',
        answer:
          'Late August through early October, timed around corn canopy senescence to let seed reach soil. Iowa and Illinois operators typically run August 20 through September 15 for corn fields. Ohio and Indiana extend into early October. The goal is for corn leaves to drop within a week of seeding so sunlight reaches the germinating cover crop.',
      },
      {
        question: 'How much can USDA NRCS EQIP pay for drone cover crop seeding?',
        answer:
          'EQIP cost-share under Cover Crop Practice Standard 340 varies by state but typically pays $25 to $55 per acre total (seed plus application), which often covers 50 to 70 percent of total drone-seeded cost. Some states layer Regional Conservation Partnership Program (RCPP) funding on top for an effective 80 to 100 percent cost coverage. Check with your local NRCS field office for state-specific rates.',
      },
      {
        question: 'Is drone cover crop seeding better than post-harvest ground seeding?',
        answer:
          'For early establishment, yes. Drone seeding into standing corn or soybeans gives the cover crop 3 to 4 extra weeks to root and tiller before frost. This matters most for cereal rye aiming for full ground cover by November, or for clovers that need time to nodulate before dormancy. Post-harvest ground seeding after corn harvest in late October often produces thinner stands.',
      },
      {
        question: 'How far ahead do I need to book a drone operator for cover crop seeding?',
        answer:
          'In the Corn Belt, by late July or early August for September slots. The cover crop seeding window (late August through mid October) overlaps with corn fungicide mop-up and soybean pre-harvest work, so operator capacity is the real constraint. Late callers often end up either paying premium rates or getting pushed into post-harvest ground seeding alternatives.',
      },
      {
        question: 'How far ahead should I book a drone operator for cover crops in my state?',
        answer:
          'Book by late July or early August for September seeding slots in the Corn Belt. Capacity runs out by early August most years as operators fill their windows with confirmed orders. Chesapeake watershed states have more operator availability and can sometimes book into September.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
];

export function getCropBySlug(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}

export const CROP_NAME_MAP: Record<string, string> = Object.fromEntries(
  crops.map((c) => [c.slug, c.name])
);
