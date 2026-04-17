import { StateData } from './types';

export const stateData: StateData[] = [
  // ─── IOWA ────────────────────────────────────────────────────────────────
  {
    slug: 'iowa',
    name: 'Iowa',
    abbreviation: 'IA',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'IDALS',
    licensingAgencyUrl: 'https://iowaagriculture.gov/pesticide-bureau',
    aerialCategory: 'Category 11 (Aerial Application)',
    examsRequired: 'Core + Category 11',
    examFees: '$15 per exam; 3-year license cycle',
    uniqueRules: [
      'Aerial applicator consultant required — every aerial applicator must work with an Iowa-resident consultant holding Category 11 plus a commercial or dealer license. Consultant meets in person daily, maintains 3-year compliance checklist.',
      'Iowa DOT aircraft registration required before any aerial application. Unregistered aircraft makes the pesticide license inactive.',
      'Iowa residents cannot use reciprocal licensing from other states and must test in Iowa.',
    ],
    reciprocityStates: ['IL', 'MN', 'MO', 'NE', 'SD', 'WI'],
    renewalCycle: '3-year cycle',
    ceRequirements: 'Annual C-CIC training or re-exam required for renewal',
    droneSpecificCredential: false,
    droneGuidanceUrl: null,
    extensionUrl: 'https://extension.iastate.edu/agdm/crops/pdf/a3-10.pdf',
    topCrops: [
      {
        slug: 'corn',
        name: 'Corn',
        acreage: '12.9 million acres',
        notes: 'VT/R1 fungicide is the #1 drone use case nationally. Tar spot years produce 15 to 25 bu/acre responses.',
      },
      {
        slug: 'soybeans',
        name: 'Soybeans',
        acreage: '9.4 million acres',
        notes: 'R2/R3 fungicide for frogeye leaf spot and white mold.',
      },
      {
        slug: 'cover-crops',
        name: 'Cover Crops',
        acreage: 'Growing rapidly',
        notes: 'NRCS EQIP $25 to $55/acre cost-share. Drone seeding into standing crops gives 3 to 4 weeks extra establishment.',
      },
    ],
    rateRange: '$12 to $17/acre',
    statsRate: '$12 to $17/acre',
    statsTopCrop: 'Corn',
    sprayWindows: [
      { crop: 'Corn fungicide', rateRange: '$12 to $17', window: 'Late Jul to early Aug' },
      { crop: 'Soybean fungicide', rateRange: '$12 to $16', window: 'Mid-Jul to mid-Aug' },
      { crop: 'Cover crop seeding', rateRange: '$12 to $18', window: 'Late Aug to mid-Oct' },
      { crop: 'Wheat heading', rateRange: '$12 to $16', window: 'Late May to mid-Jun' },
    ],
    neighboringStates: ['illinois', 'minnesota', 'missouri', 'nebraska', 'south-dakota', 'wisconsin'],
    aeoBlock:
      'Iowa is the benchmark state for US agricultural drone spraying, with the 2026 Iowa State Custom Rate Survey establishing the first university standard at $12.50 per acre average from 47 operator responses. Operators must hold FAA Part 107, Part 137, and an IDALS Category 11 (Aerial Application) license, plus Iowa uniquely requires an in-state aerial applicator consultant. Corn fungicide at VT/R1 and cover crop seeding are the two dominant drone services.',
    licensingDetails:
      'Iowa pesticide licensing is administered by IDALS (Iowa Department of Agriculture and Land Stewardship) under Category 11 (Aerial Application). Required exams are Core plus Category 11; the private license fee is $15 per exam on a 3-year cycle.\n\nIowa has the most distinctive licensing requirement in the US: every aerial applicator on agricultural land must work with an Iowa-resident aerial applicator consultant. The consultant must hold Category 11 certification plus a commercial license or dealer license. They meet with the operator in person daily, maintain a 3-year compliance checklist, and verify compliance with Iowa rules, FAA regulations, and Iowa DOT aircraft registration requirements.\n\nIowa DOT aircraft registration is required before any aerial application. Failure to register makes the pesticide applicator license inactive for that aircraft.\n\nReciprocity exists with IL, MN, MO, NE, SD, and WI — but Iowa residents cannot use reciprocal licensing from other states and must test in Iowa. Out-of-state operators holding reciprocal licenses may work in Iowa.\n\nRenewal is on a 3-year cycle. Annual C-CIC training or a re-exam is required.',
    authorityLinks: [
      { label: 'IDALS Pesticide Bureau', url: 'https://iowaagriculture.gov/pesticide-bureau' },
      { label: 'Iowa State Custom Rate Survey 2026', url: 'https://extension.iastate.edu/agdm/crops/pdf/a3-10.pdf' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in Iowa?',
        answer:
          'The 2026 Iowa State Custom Rate Survey puts the average at $12.50/acre with a range of $8 to $16. This is the lowest benchmark in the country due to flat terrain, large fields, and high operator density.',
      },
      {
        question: 'What licenses do I need to spray crops by drone in Iowa?',
        answer:
          'FAA Part 107, FAA Part 137 (with Section 44807 exemption for drones over 55 lbs), and IDALS Category 11 (Aerial Application) commercial pesticide applicator license. Iowa also requires an in-state aerial applicator consultant, which is unique nationally.',
      },
      {
        question: 'What is the aerial applicator consultant requirement in Iowa?',
        answer:
          'Iowa law requires every aerial applicator to work with an Iowa-resident consultant who holds Category 11 certification. The consultant meets with you daily in person, maintains compliance records for 3 years, and verifies you follow Iowa rules, FAA regulations, and Iowa DOT aircraft registration requirements.',
      },
      {
        question: 'When is the busiest drone spray season in Iowa?',
        answer:
          'Last two weeks of July through first week of August, when corn VT/R1 and soybean R2/R3 fungicide windows overlap. Cover crop seeding creates a second peak from late August through September. Book 4 to 6 weeks ahead for July slots.',
      },
      {
        question: 'Does Iowa have reciprocal licensing with neighboring states?',
        answer:
          'Yes, with IL, MN, MO, NE, SD, and WI. However, Iowa residents cannot use reciprocal licensing from other states and must test in Iowa. Out-of-state operators can apply their reciprocal license to work in Iowa.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── TEXAS ───────────────────────────────────────────────────────────────
  {
    slug: 'texas',
    name: 'Texas',
    abbreviation: 'TX',
    regionSlug: 'great-plains',
    regionName: 'Great Plains',
    licensingAgency: 'TDA',
    licensingAgencyUrl: 'https://www.texasagriculture.gov/Regulatory-Programs/Pesticides',
    aerialCategory: 'Category 9 (Aerial Application)',
    examsRequired: 'General Standards + Category 9 + at least one use-category exam (e.g. 1A Field Crop). Minimum 3 exams.',
    examFees: '$64 per exam via PSI/Metro testing centers. Commercial license $200/year.',
    uniqueRules: [
      'Category 9 is not standalone — must also certify in at least one use category (1A Field Crop, 1C Pasture and Rangeland, etc.).',
      'Regulated herbicide counties: TDA designates counties where spray permits are required before applying regulated herbicides (primarily 2,4-D and dicamba). Operators must obtain permits before application in these counties.',
      'CE: 5 CEUs annually for both commercial license and aerial category. Must include Laws and Regulations, Drift Minimization, and Pesticide Safety. Excess CEUs do not carry over.',
    ],
    reciprocityStates: ['10 states — all must pass TDA Laws and Regulations exam regardless'],
    renewalCycle: 'Annual',
    ceRequirements: '5 CEUs annually; must include Laws/Regs, Drift Minimization, Pesticide Safety',
    droneSpecificCredential: false,
    droneGuidanceUrl: 'https://www-aes.tamu.edu',
    extensionUrl: 'https://www-aes.tamu.edu',
    topCrops: [
      {
        slug: 'cotton',
        name: 'Cotton',
        acreage: '5 to 6 million acres',
        notes: 'Defoliant in Sep/Oct is the top drone use. Rolling Plains and South Texas.',
      },
      {
        slug: 'corn',
        name: 'Corn',
        acreage: 'Texas Panhandle and Central TX',
        notes: 'Standard VT/R1 fungicide window.',
      },
      {
        slug: 'wheat',
        name: 'Wheat',
        acreage: 'Winter wheat',
        notes: 'Heading spray in late May.',
      },
    ],
    rateRange: '$12 to $20/acre',
    statsRate: '$12 to $20/acre',
    statsTopCrop: 'Cotton',
    sprayWindows: [
      { crop: 'Cotton insecticide', rateRange: '$14 to $18', window: 'Jul to Aug' },
      { crop: 'Cotton defoliant', rateRange: '$14 to $20', window: 'Sep to Oct' },
      { crop: 'Corn fungicide', rateRange: '$14 to $17', window: 'Jul to early Aug' },
      { crop: 'Wheat heading', rateRange: '$12 to $16', window: 'Late May to early Jun' },
      { crop: 'Cover crop seeding', rateRange: '$12 to $18', window: 'Aug to Oct' },
      { crop: 'Pasture / rangeland', rateRange: '$16 to $25', window: 'Variable' },
    ],
    neighboringStates: ['oklahoma', 'new-mexico', 'arkansas', 'louisiana'],
    aeoBlock:
      'Texas is the largest agricultural state by acreage, with cotton (5 to 6 million acres), corn, wheat, sorghum, and cattle operations creating year-round drone demand. TDA requires Category 9 (Aerial Application) plus at least one additional use-category exam, making the minimum three exams. Regulated herbicide counties require spray permits, a restriction unique to Texas.',
    licensingDetails:
      'Texas pesticide licensing is administered by TDA (Texas Department of Agriculture) under Category 9 (Aerial Application). Unlike most states, Category 9 is not standalone — operators must also certify in at least one use category matching their work (1A Field Crop, 1C Pasture and Rangeland, etc.). Minimum 3 exams: General Standards, Category 9, and one use category. Each exam costs $64 through PSI/Metro testing centers. The commercial license costs $200/year.\n\nCE requirements are 5 CEUs annually for both the commercial license and the aerial category. Required topics include Laws and Regulations, Drift Minimization, and Pesticide Safety. Excess CEUs do not carry over.\n\nTexas maintains a list of regulated herbicide counties where spray permits are required before applying regulated herbicides (primarily 2,4-D and dicamba). This applies to all aerial application including drones. Operators must check the TDA regulated herbicide county list before booking work in unfamiliar counties.\n\nRecord keeping: operators must document product name, EPA reg number, application rate, FAA N-number, weather conditions, and spray permit (if applicable) for 2 years.\n\nTexas has reciprocal agreements with 10 states. All reciprocal applicants entering Texas must pass the TDA Laws and Regulations exam regardless of their home state license.',
    authorityLinks: [
      { label: 'TDA Pesticide Categories', url: 'https://www.texasagriculture.gov/Regulatory-Programs/Pesticides' },
      { label: 'Texas A&M AgriLife Drone Licensing Guide', url: 'https://www-aes.tamu.edu' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in Texas?',
        answer:
          'Row crop rates run $12 to $17/acre. Cotton defoliant runs $14 to $20. Pasture and rangeland brush control is $16 to $25. Texas is a large state with significant regional variation.',
      },
      {
        question: 'How many exams do I need for a Texas drone spray license?',
        answer:
          'Minimum 3: General Standards, Category 9 (Aerial Application), plus at least one use category (1A Field Crop, 1C Pasture, etc.). Each exam is $64 through PSI/Metro testing centers.',
      },
      {
        question: 'What are regulated herbicide counties in Texas?',
        answer:
          'TDA designates certain counties where spray permits are required before applying regulated herbicides (primarily 2,4-D and dicamba). This applies to all aerial application including drones. Check the TDA regulated herbicide county list before booking work in unfamiliar counties.',
      },
      {
        question: 'Can I use my Texas license in other states?',
        answer:
          'Texas has reciprocal agreements with 10 states. However, all reciprocal applicants entering Texas must pass the TDA Laws and Regulations exam regardless. Check TDA for the current reciprocity list.',
      },
      {
        question: 'Is wind a problem for drone spraying in Texas?',
        answer:
          'Yes. Daily averages exceed 15 mph across much of Texas for half the year. DJI Agras T50 (rated 13.4 mph) is often grounded by afternoon. Operators running Hylio AG-272 (25 mph) or XAG P100 Pro (22 mph) have wider daily windows. Most Texas operators spray at dawn and early morning.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── CALIFORNIA ──────────────────────────────────────────────────────────
  {
    slug: 'california',
    name: 'California',
    abbreviation: 'CA',
    regionSlug: 'california',
    regionName: 'California',
    licensingAgency: 'CDPR (CalEPA)',
    licensingAgencyUrl: 'https://www.cdpr.ca.gov',
    aerialCategory: 'CDPR Unmanned Pest Control Aircraft Pilot Certificate',
    examsRequired: 'QAC/QAL exams + Pilot Certificate exams (Apprentice or Journeyman tier). Each at 70% pass threshold.',
    examFees: 'QAC application $320 + exam fees. Pilot certificate application $265, $115 per exam.',
    uniqueRules: [
      'CDPR Unmanned Pest Control Aircraft Pilot Certificate required — entirely separate from manned aircraft. Tiers: Apprentice, Journeyman, Private Applicator.',
      'County Agricultural Commissioner registration required in each county of operation — not just the home county.',
      'Restricted Material Permits required for applicable products before each application.',
      'Same-day Notice of Intent filing required for some restricted materials.',
      'Every pesticide application must be reported to the County Agricultural Commissioner — unique statewide reporting requirement.',
    ],
    reciprocityStates: ['None — California does not participate in reciprocal pesticide licensing'],
    renewalCycle: '2-year cycle',
    ceRequirements: 'CE hours vary by credential; QAC and Pilot Certificate have separate requirements',
    droneSpecificCredential: true,
    droneGuidanceUrl: 'https://www.cdpr.ca.gov',
    extensionUrl: 'https://ipm.ucanr.edu/agriculture/grape',
    topCrops: [
      {
        slug: 'grapes',
        name: 'Wine Grapes',
        acreage: '900,000 acres',
        notes: '8 to 12 fungicide passes per season. Hillside blocks over 15% slope cannot use airblast.',
      },
      {
        slug: 'orchards',
        name: 'Almonds',
        acreage: '1.5 million acres',
        notes: 'Dormant oil + early season fungicide. Central Valley.',
      },
      {
        slug: 'orchards',
        name: 'Citrus',
        acreage: 'Southern CA and Central Valley',
        notes: 'Asian citrus psyllid management requires frequent low-volume insecticide.',
      },
    ],
    rateRange: '$15 to $35/acre',
    statsRate: '$15 to $35/acre',
    statsTopCrop: 'Wine grapes',
    sprayWindows: [
      { crop: 'Vineyard fungicide (per pass)', rateRange: '$18 to $30', window: 'Mar to Sep (8–12 passes)' },
      { crop: 'Almond dormant oil', rateRange: '$15 to $21', window: 'Jan to Feb' },
      { crop: 'Almond / pistachio fungicide', rateRange: '$15 to $21', window: 'Mar to Jun' },
      { crop: 'Citrus insecticide', rateRange: '$18 to $25', window: 'Apr to Aug' },
      { crop: 'Walnut fungicide', rateRange: '$20 to $30', window: 'Apr to Jul' },
      { crop: 'Full-season vineyard program', rateRange: '$180 to $300/acre/yr', window: '8–12 passes' },
    ],
    neighboringStates: ['oregon', 'nevada', 'arizona'],
    aeoBlock:
      'California is the highest-value drone spray market in the US at $15 to $35 per acre, driven by 900,000 acres of wine grapes and 1.5 million acres of almonds. CDPR requires the Unmanned Pest Control Aircraft Pilot Certificate (Apprentice or Journeyman tier) in addition to a QAC or QAL, FAA Part 107, and Part 137. Every application must be reported to the County Agricultural Commissioner.',
    licensingDetails:
      'California has the most complex drone spray licensing stack in the US, administered by CDPR (California Department of Pesticide Regulation, under CalEPA).\n\nOperators need: (1) FAA Part 107, (2) FAA Part 137, (3) CDPR Unmanned Pest Control Aircraft Pilot Certificate (Apprentice or Journeyman tier — entirely separate from manned aircraft certification), and (4) a Qualified Applicator Certificate (QAC) for individuals or Qualified Applicator License (QAL) for business owners.\n\nThe Pilot Certificate has two tiers. Apprentice requires passing CDPR written and practical exams. Journeyman requires additional experience hours and a more advanced practical. Fee is $265 application plus $115 per exam at 70% passing score.\n\nCounty Agricultural Commissioner registration is required in each county where you operate — not just your home county. Restricted Material Permits must be obtained before each application where applicable. Some restricted materials also require same-day Notice of Intent filing.\n\nEvery pesticide application must be reported to the County Agricultural Commissioner. This statewide reporting requirement adds significant administrative overhead per job and is unique to California.\n\nRenewal is on a 2-year cycle. California does not participate in reciprocal licensing with other states.',
    authorityLinks: [
      { label: 'CDPR Pesticide Licensing', url: 'https://www.cdpr.ca.gov' },
      { label: 'UC Davis Vineyard IPM', url: 'https://ipm.ucanr.edu/agriculture/grape' },
      { label: 'UC IPM Almond Management', url: 'https://ipm.ucanr.edu/agriculture/almond' },
    ],
    faqs: [
      {
        question: 'What does drone spraying cost in California?',
        answer:
          '$15 to $35 per acre per pass, the highest in the US. A full-season 10-pass vineyard program runs $180 to $300 per acre per year. Rates reflect steep terrain, dense canopy, CDPR compliance overhead, and 8 to 12 passes per season.',
      },
      {
        question: 'What extra licenses do drone operators need in California?',
        answer:
          'Beyond FAA Part 107 and Part 137, California requires the CDPR Unmanned Pest Control Aircraft Pilot Certificate (Apprentice or Journeyman), a QAC or QAL, and County Agricultural Commissioner registration in each county of operation. This is the most complex state licensing stack in the US.',
      },
      {
        question: 'Why is California so much more expensive than the Midwest?',
        answer:
          'Three factors. Steep vineyard slopes and dense orchard canopy slow throughput. CDPR reporting (County Ag Commissioner, Restricted Material Permits, Notice of Intent filings) adds administrative cost per job. And 8 to 12 passes per season versus 1 to 2 for Midwest row crops multiplies everything.',
      },
      {
        question: 'Can drones spray organic vineyards in California?',
        answer:
          'Yes. OMRI-approved sulfur, copper hydroxide, Regalia, and other organic products apply well at 10 to 20 gpa carrier. Organic vineyard spraying is one of the fastest-growing drone niches in California because lower drift and targeted coverage reduce impact on cover crops and beneficial insects.',
      },
      {
        question: 'When should I book a drone operator for my California vineyard?',
        answer:
          'Sign a full-season contract by January or February. Mid-season one-off sprays during powdery mildew spikes are nearly impossible to source without a pre-existing operator relationship. Multi-year contracts trim 10 to 15 percent off spot pricing.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
];

export function getStateData(slug: string): StateData | undefined {
  return stateData.find((s) => s.slug === slug);
}
