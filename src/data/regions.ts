import { Region } from './types';

export const regions: Region[] = [
  {
    slug: 'corn-belt',
    name: 'Corn Belt',
    icon: '🌽',
    tagline: 'Largest US ag-drone market, corn & soybean fungicide at scale.',
    totalAcres: 177000000,
    states: ['Iowa', 'Illinois', 'Indiana', 'Ohio', 'Missouri', 'Michigan', 'Wisconsin', 'Minnesota', 'Kentucky', 'Tennessee'],
    stateSlugs: ['iowa', 'illinois', 'indiana', 'ohio', 'missouri', 'michigan', 'wisconsin', 'minnesota', 'kentucky', 'tennessee'],
    description:
      'The Corn Belt is the largest and most competitive ag drone market in the United States, anchored by corn fungicide at VT/R1, soybean fungicide at R2/R3 and cover crop seeding from August through October.',
    longDescription:
      'The Corn Belt stretches from Ohio through Iowa and covers the densest concentration of agricultural drone activity in the United States. Over 90 million acres of corn and 87 million acres of soybeans drive the core demand: drone fungicide at VT/R1 tassel stage on corn (July) and at R2/R3 on soybeans (July to August) are the two highest-volume spray windows in American agriculture. Cover crop seeding by drone from late August through mid-October is the fastest-growing secondary service, with USDA NRCS EQIP cost-share payments of $25 to $55 per acre making drone seeding economically attractive in every Corn Belt state. Iowa, Illinois and Indiana are the three most competitive markets, with the 2026 Iowa State Custom Rate Survey establishing the first standardized university benchmark at $12.50 per acre average for drone spraying. Operator supply has grown rapidly, with per-acre rates compressing 30 to 45 percent from 2022 to 2026. Most operators run DJI Agras T50 and Hylio AG-272 class machines, treating 300 to 600 acres per drone per day during peak windows. The flat terrain and large contiguous fields make the Corn Belt the easiest geography for drone spray operations, which is why it attracts the most new operators and has the most aggressive pricing.',
    aeoBlock:
      'Corn Belt drone spraying rates run $12 to $17 per acre, the lowest in the US due to flat terrain, large fields and growing operator supply. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average. Peak spray windows are corn fungicide at VT/R1 in July, soybean fungicide at R2/R3 in July to August and cover crop seeding from late August through mid-October.',
    priceRangeUsd: '$12 to $17',
    primaryCrops: ['Corn', 'Soybeans', 'Wheat', 'Cover Crops'],
    sprayWindows: [
      { crop: 'Corn fungicide', months: 'Mid-July to early August', stage: 'VT/R1 tassel' },
      { crop: 'Soybean fungicide', months: 'Mid-July to mid-August', stage: 'R2/R3 bloom to pod' },
      { crop: 'Cover crop seeding', months: 'Late August to mid-October', stage: 'Into standing corn/soybeans' },
      { crop: 'Wheat heading fungicide', months: 'Late May to mid-June', stage: 'T3 heading' },
    ],
    keyInsights: [
      'Iowa, Illinois and Indiana are the three most competitive drone spray markets in the US, with pricing at or below the national floor.',
      'Corn Belt operators book 4 to 6 weeks ahead of the VT/R1 window. Call by early June for late-July slots.',
      'Cover crop seeding is the fastest-growing drone service here, with USDA NRCS EQIP paying $25 to $55 per acre that often covers 50 to 70 percent of the total cost.',
      'Rate compression from $22 to $25 per acre in 2022 to $12 to $17 in 2026 has squeezed operator margins. Some Midwest markets are approaching profitability floors.',
    ],
    authorityLinks: [
      { label: 'Iowa State Extension: Custom Rate Survey 2026', url: 'https://www.extension.iastate.edu/agdm/crops/pdf/a3-10.pdf' },
      { label: 'Purdue Extension: Corn and Soybean IPM', url: 'https://extension.entm.purdue.edu/fieldcropsipm' },
      { label: 'Midwest Cover Crops Council', url: 'https://mccc.msu.edu' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in the Corn Belt?',
        answer:
          'The 2026 Iowa State Custom Rate Survey puts the average at $12.50 per acre, with a range of $8 to $16. Illinois and Indiana are similar. Ohio and Michigan tend to run $1 to $3 higher because of fewer operators and smaller average field sizes.',
      },
      {
        question: 'When is the busiest drone spray period in the Corn Belt?',
        answer:
          'The last two weeks of July through the first week of August, when corn VT/R1 fungicide and soybean R2/R3 fungicide overlap. Operators who also do cover crop seeding run a second peak from late August through September. Book 4 to 6 weeks ahead for July slots.',
      },
      {
        question: 'Is cover crop seeding by drone popular in the Midwest?',
        answer:
          'Yes, it is the fastest-growing ag drone service in the region. Drone seeding into standing corn and soybeans gives cover crops 3 to 4 extra weeks of establishment compared to post-harvest ground seeding. USDA NRCS EQIP cost-share under Practice Standard 340 reduces net farmer cost to $5 to $12 per acre in most Corn Belt states.',
      },
      {
        question: 'Which states in the Corn Belt have the most drone operators?',
        answer:
          'Iowa, Illinois and Indiana lead in operator density. Ohio and Missouri are growing fast. Wisconsin and Minnesota have moderate operator presence with higher per-acre rates. Kentucky and Tennessee are at the southern edge with fewer dedicated row crop drone operators.',
      },
      {
        question: 'Are Corn Belt drone spray rates still dropping?',
        answer:
          'Yes, but the rate of compression is slowing. Midwest rates dropped roughly 30 to 45 percent from 2022 to 2026, and some operators report barely clearing $5 per acre profit at current rates. Further compression is limited by the floor of generator fuel, battery wear and labor costs.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'great-plains',
    name: 'Great Plains',
    icon: '🌾',
    tagline: 'Wheat, cotton & milo across wind-swept terrain, drones vs. airplanes.',
    totalAcres: 210000000,
    states: ['Kansas', 'Nebraska', 'North Dakota', 'South Dakota', 'Montana', 'Wyoming', 'Colorado', 'Oklahoma', 'New Mexico', 'Texas'],
    stateSlugs: ['kansas', 'nebraska', 'north-dakota', 'south-dakota', 'montana', 'wyoming', 'colorado', 'oklahoma', 'new-mexico', 'texas'],
    description:
      'The Great Plains is a wheat and cotton powerhouse where wind resistance and vast acreage define drone operations. Drones are rapidly taking market share from airplane applicators on sub-500-acre wheat fields.',
    longDescription:
      'The Great Plains stretches from the Texas panhandle through the Dakotas and Montana, covering the US wheat belt, cotton country in Texas and Oklahoma and vast cattle ranch acreage with emerging drone applications. Approximately 45 million acres of winter and spring wheat drive the primary spray demand, with the T3 heading window for Fusarium head blight and stripe rust fungicide arriving in late May through late June depending on latitude. Drones are gaining market share over airplane applicators on wheat fields under 500 acres, where airplane mobilization costs make per-acre pricing uncompetitive. Kansas, Nebraska and the Dakotas are the core wheat markets. Texas adds 5 to 6 million acres of cotton, with drone defoliant applications growing fast in the Rolling Plains and South Texas. Wind is the defining operational factor: daily averages exceed 15 mph across much of the region for half the year, making the Hylio AG-272 (rated at 25 mph sustained) and XAG P100 Pro (22 mph) more practical than DJI models rated at 13.4 mph. Per-acre rates run $12 to $16 for wheat and row crops, with cotton and specialty applications higher.',
    aeoBlock:
      'Great Plains drone spraying costs $12 to $16 per acre on wheat and row crops, with cotton defoliant at $14 to $18. Approximately 45 million acres of wheat anchor the market, with the T3 heading window in May through June as the peak spray period. Wind resistance is a defining equipment factor: Hylio AG-272 (25 mph) and XAG P100 Pro (22 mph) outperform DJI (13.4 mph) in this region.',
    priceRangeUsd: '$12 to $16',
    primaryCrops: ['Wheat', 'Cotton', 'Corn', 'Sorghum', 'Soybeans'],
    sprayWindows: [
      { crop: 'Wheat heading fungicide', months: 'Late May to late June', stage: 'T3 heading (varies by latitude)' },
      { crop: 'Cotton defoliant', months: 'September to October', stage: '60%+ open bolls' },
      { crop: 'Corn fungicide', months: 'July to early August', stage: 'VT/R1' },
      { crop: 'Cover crop seeding', months: 'August to October', stage: 'Into standing crops' },
    ],
    keyInsights: [
      'Wind is the single biggest operational constraint. DJI T50 is grounded above 13.4 mph, which happens most afternoons in KS, NE, ND and OK. Hylio AG-272 and XAG P100 Pro handle 22 to 25 mph.',
      'Wheat heading windows are only 5 to 7 days. Operators who pre-book in April get the best rates; late callers often miss the window entirely.',
      'Drones compete directly with airplane applicators on wheat. Drones win on fields under 500 acres; airplanes win above 1,000 acres.',
      'Texas cotton adds a separate demand peak in September and October, with drone defoliant gaining share over airplanes because of drift control near sensitive soybean fields.',
    ],
    authorityLinks: [
      { label: 'Kansas State Extension: Wheat Disease Management', url: 'https://www.bookstore.ksre.ksu.edu/pubs/EP130.pdf' },
      { label: 'NDSU Extension: Wheat Production', url: 'https://www.ndsu.edu/agriculture/ag-hub/ag-topics/crop-production/crops/wheat' },
      { label: 'Texas A&M AgriLife Extension: Cotton', url: 'https://cottonbugs.tamu.edu' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in the Great Plains?',
        answer:
          'Wheat and row crop applications run $12 to $16 per acre. Cotton defoliant in Texas and Oklahoma runs $14 to $18. Large flat acreage pushes rates lower than specialty crop regions, but fewer operators than the Corn Belt means less aggressive pricing pressure.',
      },
      {
        question: 'Can DJI drones handle the wind in Kansas and the Dakotas?',
        answer:
          'DJI Agras T50 is rated for 13.4 mph (6 m/s) maximum wind. Daily averages across the Great Plains exceed this threshold most afternoons from March through October. Operators running DJI spray at dawn and early morning. Those running Hylio AG-272 (25 mph) or XAG P100 Pro (22 mph) have wider daily operating windows.',
      },
      {
        question: 'When is the wheat spray window in Kansas versus North Dakota?',
        answer:
          'Kansas wheat hits T3 heading in late May to early June. Nebraska and South Dakota arrive 1 to 2 weeks later. North Dakota spring wheat heads in late June to early July. The window is 5 to 7 days long regardless of latitude, which is why booking ahead is critical.',
      },
      {
        question: 'Are airplane applicators cheaper than drones on Great Plains wheat?',
        answer:
          'On fields above 1,000 acres, yes. Airplanes fly 300 to 800 acres per hour and amortize mobilization costs over large acreage. On fields under 500 acres, drones win because airplane mobilization costs push per-acre rates above $14 to $16. The crossover point depends on proximity to the nearest airstrip and time of season.',
      },
      {
        question: 'Is cover crop seeding by drone common in the Great Plains?',
        answer:
          'Growing but less established than in the Corn Belt. Kansas, Nebraska and the Dakotas have NRCS EQIP programs that cover drone seeding. Wind is a limiting factor for broadcast accuracy. Most Great Plains cover crop seeding still happens post-harvest by drill, though drone seeding into standing crops is expanding year over year.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'mississippi-delta',
    name: 'Mississippi Delta',
    icon: '🌊',
    tagline: 'Rice & cotton heartland, flooded paddies where ground rigs cannot go.',
    totalAcres: 35000000,
    states: ['Arkansas', 'Louisiana', 'Mississippi', 'Missouri (Bootheel)'],
    stateSlugs: ['arkansas', 'louisiana', 'mississippi', 'missouri'],
    description:
      'The Delta is where drones and manned aerial applicators compete head to head on rice, cotton and soybeans. Flooded rice paddies make drones uniquely effective for the 2.5 million acres that ground rigs cannot reach.',
    longDescription:
      'The Mississippi Delta stretches from the Missouri Bootheel through Arkansas, Mississippi and Louisiana and is the most aerial-application-intensive ag region in the United States. Rice (2.5 million acres, concentrated in Arkansas), cotton (major acreage across all four states) and soybeans anchor the crop mix. The Delta defined aerial application long before drones arrived: manned airplane operators have served this flat, flooded landscape for decades and drone operators compete directly with that established infrastructure. Drones have found their strongest niche in rice, where flooded paddy conditions make ground equipment impractical from flood-up through drain. Arkansas alone produces 1.2 million acres of rice that is effectively 100 percent aerial-treated for heading-stage fungicide. University of Arkansas Extension reports 7 percent average yield improvement from drone fungicide at R4 to R6. Delta fleet operators commonly run 3 to 8 DJI Agras T50 drones and treat 800 to 1,200 acres per day during the July and August rice heading peak. Cotton defoliant in September and October is the second major drone opportunity, especially on soft Delta soils where ground rigs cannot operate. Per-acre rates run $14 to $18, held moderate by strong manned aerial competition.',
    aeoBlock:
      'Delta drone spraying costs $14 to $18 per acre across rice, cotton and soybeans. Arkansas 1.2 million acres of rice is effectively 100 percent aerial-treated, with drones taking rapid share from airplanes due to lower drift and better access to small levee fields. University of Arkansas Extension reports 7 percent average yield improvement from heading-stage fungicide on rice.',
    priceRangeUsd: '$14 to $18',
    primaryCrops: ['Rice', 'Cotton', 'Soybeans', 'Corn'],
    sprayWindows: [
      { crop: 'Rice heading fungicide', months: 'July to August', stage: 'R4 to R6' },
      { crop: 'Cotton defoliant', months: 'September to October', stage: '60%+ open bolls' },
      { crop: 'Soybean fungicide', months: 'July to August', stage: 'R2/R3' },
      { crop: 'Rice herbicide pre-flood', months: 'May to June', stage: 'Pre-flood' },
    ],
    keyInsights: [
      'Manned aerial applicator competition is stronger here than anywhere else in the US, which keeps drone pricing moderate at $14 to $18 per acre.',
      'Rice is the drone sweet spot: flooded fields make ground equipment impossible, and drones outcompete airplanes on drift control near sensitive soybean borders.',
      'Delta fleet operators run 3 to 8 drone crews, treating 800 to 1,200 acres per day during rice heading peak.',
      'Cotton defoliant timing (September to October) hits when Delta soils are still saturated from summer flooding, blocking ground rigs and creating demand for aerial application.',
    ],
    authorityLinks: [
      { label: 'University of Arkansas Extension: Rice Production', url: 'https://www.uaex.uada.edu/farm-ranch/crops-commercial-horticulture/rice' },
      { label: 'LSU AgCenter: Rice Disease Management', url: 'https://www.lsuagcenter.com/topics/crops/rice' },
      { label: 'Mississippi State Extension: Cotton', url: 'https://extension.msstate.edu/agriculture/crops/cotton' },
    ],
    faqs: [
      {
        question: 'Why use drones instead of airplanes in the Delta?',
        answer:
          'Drift control. Delta rice and cotton fields share borders with dicamba-sensitive and 2,4-D-sensitive soybeans. State regulators tighten aerial drift rules every year. Drones flying 8 to 15 feet above canopy hold drift within a tighter corridor than airplanes at 50 to 100 feet. On small levee rice fields, drones also handle turns more efficiently.',
      },
      {
        question: 'What does drone spraying cost in Arkansas and Mississippi?',
        answer:
          'Rice and cotton applications run $14 to $18 per acre. Large blocks over 500 acres sometimes negotiate closer to $12 to $14. Manned airplane competition keeps a ceiling on drone pricing in this region.',
      },
      {
        question: 'How many acres can a Delta drone crew treat per day on rice?',
        answer:
          'Fleet operators with 3 to 8 DJI Agras T50 drones routinely treat 800 to 1,200 acres per day during the July and August rice heading window. Single-drone operators cover 200 to 400 acres per day.',
      },
      {
        question: 'Do I need a special state license to spray rice in Arkansas?',
        answer:
          'Yes. Arkansas requires a commercial pesticide applicator license plus an aerial sub-classification. Louisiana requires an aerial applicator category endorsement. Mississippi has similar requirements. Your drone operator handles their own licensing, but ask to see certificates before booking.',
      },
      {
        question: 'Is drone spraying growing or shrinking in the Delta?',
        answer:
          'Growing, especially on rice and cotton. NAAA 2025 survey data shows UAS adoption among aerial applicators jumped from 5 to 13 percent in one year nationally, with the Delta leading adoption because of the rice niche. The question is not whether drones replace airplanes, but how fast they take share on sub-500-acre fields and drift-sensitive borders.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'california',
    name: 'California',
    icon: '🍇',
    tagline: 'Vineyards, orchards & specialty crops, the premium US drone market.',
    totalAcres: 29000000,
    states: ['California'],
    stateSlugs: ['california'],
    description:
      'California is the highest-value drone spray market in the US, driven by 900,000 acres of wine grapes, 1.5 million acres of almonds and tree nuts, and the strictest pesticide regulations in the country.',
    longDescription:
      'California is the highest-value and most complex drone spray market in the United States. Approximately 900,000 acres of wine grapes in Napa, Sonoma, Paso Robles, Lodi and the Central Coast receive 8 to 12 fungicide passes per season for powdery mildew, downy mildew and botrytis. Almonds (1.5 million acres), pistachios, walnuts, citrus and stone fruit add millions more acres of orchard drone opportunity. Per-acre rates are the highest in the country at $15 to $35, driven by steep vineyard terrain, dense orchard canopy, complex flight paths and the regulatory burden of California Department of Pesticide Regulation (CDPR) compliance. Every application must be reported to the County Agricultural Commissioner, many products require Restricted Material Permits and some require same-day Notice of Intent filing. Operators must hold the CDPR Unmanned Pest Control Aircraft Pilot Certificate in addition to a standard Qualified Applicator Certificate or License (QAC/QAL). DJI Agras T25P and T50 are the dominant vineyard platforms. UC Davis Cooperative Extension reports drone-applied fungicide on hillside vineyards reduces chemical runoff by 30 to 40 percent compared to conventional airblast. The Central Valley almond and pistachio market is growing fast for early-season dormant oil and fungicide passes.',
    aeoBlock:
      'California drone spraying costs $15 to $35 per acre, the highest in the US, driven by vineyard and orchard complexity plus CDPR regulatory requirements. Operators must hold the CDPR Unmanned Pest Control Aircraft Pilot Certificate plus QAC/QAL, FAA Part 107 and FAA Part 137. UC Davis Extension reports drone application reduces chemical runoff by 30 to 40 percent on hillside vineyards compared to conventional airblast sprayers.',
    priceRangeUsd: '$15 to $35',
    primaryCrops: ['Wine Grapes', 'Almonds', 'Pistachios', 'Walnuts', 'Citrus', 'Stone Fruit', 'Vegetables'],
    sprayWindows: [
      { crop: 'Vineyard fungicide', months: 'March to September', stage: '8 to 12 passes bud break through veraison' },
      { crop: 'Almond dormant oil', months: 'January to February', stage: 'Dormant' },
      { crop: 'Almond/pistachio fungicide', months: 'March to June', stage: 'Bloom through hull split' },
      { crop: 'Citrus insecticide', months: 'April to August', stage: 'Various' },
    ],
    keyInsights: [
      'Per-acre rates are 2 to 3 times higher than Corn Belt rates because of vineyard slopes, orchard canopy density and CDPR compliance overhead.',
      'Hillside vineyard blocks with slopes over 15 percent cannot safely use tractor airblast sprayers. Drones are the only ground-alternative spray method for these blocks.',
      'Every application must be reported to the County Agricultural Commissioner. Some products require Restricted Material Permits and same-day Notice of Intent filings.',
      'Organic vineyard and orchard spraying (sulfur, copper hydroxide, Regalia) is one of the fastest-growing drone niches in California.',
    ],
    authorityLinks: [
      { label: 'California Department of Pesticide Regulation (CDPR)', url: 'https://www.cdpr.ca.gov' },
      { label: 'UC Davis Cooperative Extension: Vineyard Pest Management', url: 'https://ipm.ucanr.edu/agriculture/grape' },
      { label: 'UC IPM: Apple and Pear Pest Management', url: 'https://ipm.ucanr.edu/agriculture/apple' },
    ],
    faqs: [
      {
        question: 'What extra licenses do drone operators need in California?',
        answer:
          'Beyond FAA Part 107 and Part 137, California requires the CDPR Unmanned Pest Control Aircraft Pilot Certificate plus either a Qualified Applicator Certificate (QAC) for certified operators or Qualified Applicator License (QAL) for licensed business owners. County Agricultural Commissioner registration is required in each county of operation.',
      },
      {
        question: 'Why is California drone spraying so much more expensive?',
        answer:
          'Three factors: terrain complexity (steep vineyard slopes, dense orchard canopy), regulatory overhead (CDPR reporting, Restricted Material Permits, Notice of Intent filings) and the high number of passes per season (8 to 12 on grapes, 6 to 10 on tree fruit). Corn Belt operators spray flat fields 1 to 2 times per season; California operators spray complex terrain 8 to 12 times.',
      },
      {
        question: 'Can drones spray organic vineyards in California?',
        answer:
          'Yes, and this is a fast-growing niche. OMRI-approved sulfur, copper hydroxide, Regalia and other organic products apply well by drone at 10 to 20 gpa carrier. Some organic growers prefer drones specifically because lower drift and targeted coverage reduce impact on cover crops and beneficial insects between vine rows.',
      },
      {
        question: 'When should I book a drone operator for my California vineyard?',
        answer:
          'Full-season contracts should be signed by January or February for the March through September spray program. Mid-season one-off sprays during powdery mildew spikes are nearly impossible to source without a pre-existing operator relationship. Multi-year contracts with a dedicated operator can trim 10 to 15 percent off spot pricing.',
      },
      {
        question: 'Are drones replacing airblast sprayers in California orchards?',
        answer:
          'Partially. Drones handle 6 to 8 of 10 annual orchard passes well, especially dormant oil, early-season fungicide and late-season insecticide. Dense mid-summer canopy on mature almond and walnut trees above 20 feet still often requires supplemental airblast for full coverage. Most California orchard drone operators run hybrid programs combining both methods.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'southeast',
    name: 'Southeast',
    icon: '🌿',
    tagline: 'Cotton, peanuts & tobacco, diverse crops with healthier operator margins.',
    totalAcres: 67000000,
    states: ['Georgia', 'Alabama', 'Florida', 'South Carolina', 'North Carolina', 'Virginia', 'West Virginia'],
    stateSlugs: ['georgia', 'alabama', 'florida', 'south-carolina', 'north-carolina', 'virginia', 'west-virginia'],
    description:
      'The Southeast is a mixed-crop region where cotton, peanuts, tobacco, peaches, blueberries and citrus create diverse drone demand at $16 to $28 per acre.',
    longDescription:
      'The Southeast spans Georgia through Virginia and features the most diverse crop mix of any US drone spray region. Cotton and peanuts in Georgia and Alabama, tobacco in the Carolinas and Virginia, peaches in Georgia and South Carolina, blueberries in Georgia and Florida and citrus in Florida each create distinct spray windows and drone application requirements. Per-acre rates run $16 to $28, higher than Corn Belt and Great Plains because of variable terrain, mixed crop types, higher chemical costs and fewer operators per acre. The Southeast also has a growing drone application niche in forestry and pine plantation management. Georgia and North Carolina lead in operator density. Florida citrus presents a specialized opportunity with Asian citrus psyllid management requiring frequent low-volume insecticide applications across large acreage. Tobacco applications in the Carolinas and Virginia target blue mold and black shank, with drone access solving the problem of driving through waist-high tobacco in mid-season. The region is less price-competitive than the Midwest, which means operator margins are healthier but customer adoption is earlier-stage.',
    aeoBlock:
      'Southeast drone spraying costs $16 to $28 per acre across cotton, peanuts, tobacco, peaches, blueberries and citrus. Georgia and North Carolina lead the region in operator density. The diverse crop mix creates year-round spray demand from Florida citrus in spring through cotton defoliant in fall, with higher margins than Corn Belt markets due to fewer operators and more complex crop requirements.',
    priceRangeUsd: '$16 to $28',
    primaryCrops: ['Cotton', 'Peanuts', 'Tobacco', 'Peaches', 'Blueberries', 'Citrus', 'Soybeans'],
    sprayWindows: [
      { crop: 'Cotton mid-season insecticide', months: 'July to August', stage: 'R1 to R4 flowering' },
      { crop: 'Cotton defoliant', months: 'September to October', stage: '60%+ open bolls' },
      { crop: 'Tobacco fungicide', months: 'June to August', stage: 'Topping through harvest' },
      { crop: 'Peach/blueberry fungicide', months: 'March to July', stage: 'Bloom through pre-harvest' },
      { crop: 'Citrus insecticide (FL)', months: 'March to August', stage: 'New flush growth' },
    ],
    keyInsights: [
      'The Southeast crop diversity means operators who can serve multiple crop types (row crops plus orchards plus specialty) have stronger year-round utilization than single-crop specialists.',
      'Fewer operators per acre than the Corn Belt means less pricing pressure, healthier margins and more opportunity for new entrants.',
      'Florida citrus (Asian citrus psyllid management) is a growing niche requiring frequent, precise, low-volume insecticide applications that drones handle well.',
      'Tobacco in the Carolinas and Virginia is a high-value crop where drone access solves the problem of mid-season ground rig damage to waist-high plants.',
    ],
    authorityLinks: [
      { label: 'University of Georgia Extension: Cotton and Peanut Pest Management', url: 'https://extension.uga.edu/topic-areas/field-crops.html' },
      { label: 'NC State Extension: Tobacco Production', url: 'https://tobacco.ces.ncsu.edu' },
      { label: 'University of Florida IFAS: Citrus Pest Management', url: 'https://crec.ifas.ufl.edu' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in the Southeast?',
        answer:
          'Typical rates run $16 to $28 per acre depending on crop and terrain. Cotton and soybean applications are at the lower end ($16 to $20). Peach, blueberry, tobacco and citrus applications run higher ($20 to $28) because of canopy complexity, smaller field sizes and more passes per season.',
      },
      {
        question: 'Is the Southeast a good market for new drone operators?',
        answer:
          'Yes, because operator density is lower than the Corn Belt, margins are healthier and the diverse crop mix allows year-round work rather than a single 3-week peak season. Operators who can serve both row crops and specialty crops have the strongest business model here.',
      },
      {
        question: 'Can drones spray tobacco effectively?',
        answer:
          'Yes. Tobacco plants reach waist height by mid-season, making ground sprayer access damaging. Drones apply blue mold and black shank fungicides at R1 through harvest without touching the crop. North Carolina and Virginia tobacco growers increasingly prefer drone application over backpack sprayers for large acreage.',
      },
      {
        question: 'Is drone spraying growing in Florida citrus?',
        answer:
          'Yes, driven by Asian citrus psyllid management. The psyllid vector for citrus greening disease requires frequent low-volume insecticide applications (every 2 to 4 weeks during new flush growth) across large grove acreage. Drones handle this more precisely and with less drift than airblast sprayers, especially near residential areas.',
      },
      {
        question: 'What are the main regulatory differences in the Southeast?',
        answer:
          'Each state has its own commercial pesticide applicator licensing. Georgia, North Carolina and Virginia require specific aerial applicator categories. Florida requires a separate license for each of 24 pest control categories. Alabama and South Carolina have lighter requirements. Check your state department of agriculture for exact categories.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
];

export const regionBySlug: Record<string, Region> = Object.fromEntries(
  regions.map((r) => [r.slug, r])
);

export function getRegionBySlug(slug: string): Region | undefined {
  return regionBySlug[slug];
}

export const REGION_NAME_MAP: Record<string, string> = Object.fromEntries(
  regions.map((r) => [r.slug, r.name])
);
