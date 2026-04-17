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

  // ─── ILLINOIS ────────────────────────────────────────────────────────────
  {
    slug: 'illinois',
    name: 'Illinois',
    abbreviation: 'IL',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Illinois Department of Agriculture (IDA)',
    licensingAgencyUrl: 'https://agr.illinois.gov/pesticides/certification-and-licensing.html',
    aerialCategory: 'Aerial General Standards (replaces Core exam) + site categories',
    examsRequired: 'Aerial General Standards (100 questions, 70%) + category exam (50 questions, 70%)',
    examFees: '$300 commercial license, 3-year term',
    uniqueRules: [
      'Illinois uses an Aerial General Standards exam that replaces the standard Core exam for aerial applicators.',
      'No continuing education option. Must re-test every 3 years to maintain certification.',
      'DriftWatch registry participation recommended.',
    ],
    reciprocityStates: ['IA', 'IN', 'MO', 'WI', 'KY'],
    renewalCycle: '3-year cycle. Re-examination required (no CE alternative).',
    ceRequirements: 'None. Must pass exams again every 3 years.',
    droneSpecificCredential: false,
    droneGuidanceUrl: 'https://extension.illinois.edu/psep/special-licensing',
    extensionUrl: 'https://extension.illinois.edu',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '11M acres', notes: 'VT/R1 fungicide peak late July' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '10.5M acres', notes: 'R2/R3 fungicide mid-July to August' },
      { slug: 'cover-crops', name: 'Cover Crops', acreage: 'Growing', notes: 'EQIP cost-share $25 to $55/acre' },
      { slug: 'wheat', name: 'Wheat', acreage: '600K acres', notes: 'Soft red winter wheat heading June' },
    ],
    rateRange: '$12 to $17/acre',
    statsRate: '$12 to $17/acre',
    statsTopCrop: 'Corn',
    sprayWindows: [],
    neighboringStates: ['iowa', 'indiana', 'missouri', 'wisconsin', 'kentucky'],
    aeoBlock:
      'Illinois ranks second nationally in corn (11M acres) and soybeans (10.5M acres), making it one of the highest-volume drone spray markets in the Corn Belt. Rates run $12 to $17 per acre. The Illinois Department of Agriculture requires an Aerial General Standards exam plus category certification, with mandatory re-testing every 3 years and no CE alternative.',
    licensingDetails:
      'Illinois pesticide licensing is administered by the Illinois Department of Agriculture (IDA) under the Aerial General Standards credential. Applicators take two exams: the Aerial General Standards exam (100 questions, 70% passing), which replaces the standard Core exam, plus a category exam (50 questions, 70% passing). The commercial license is $300 for a 3-year term.\n\nIllinois is one of the few states with no continuing education option for aerial applicators. Certification must be maintained by passing both exams again every 3 years — there is no CE alternative. DriftWatch sensitive crop registry participation is recommended. Reciprocity exists with IA, IN, MO, WI, and KY.',
    authorityLinks: [
      { label: 'IDA Pesticide Certification and Licensing', url: 'https://agr.illinois.gov/pesticides/certification-and-licensing.html' },
      { label: 'Illinois Extension PSEP Special Licensing', url: 'https://extension.illinois.edu/psep/special-licensing' },
    ],
    faqs: [
      { question: 'What does drone spraying cost in Illinois?', answer: 'Rates run $12 to $17 per acre for corn and soybean applications, matching the Corn Belt baseline. Operator density is high, especially in central and western Illinois, keeping pricing competitive.' },
      { question: 'What license do I need to spray by drone in Illinois?', answer: 'FAA Part 107, Part 137, and an IDA commercial applicator license with Aerial General Standards exam plus at least one category exam. The Aerial GS exam replaces the standard Core exam and is 100 questions at 70% passing.' },
      { question: 'Does Illinois accept continuing education instead of re-testing?', answer: 'No. Illinois is one of the few states with no CE option for aerial applicators. You must pass the Aerial General Standards and category exams again every 3 years to maintain certification.' },
      { question: 'Can I use my Iowa or Indiana license in Illinois?', answer: 'Illinois has reciprocal agreements with IA, IN, MO, WI, and KY. Contact IDA for current reciprocity requirements and any additional exams needed.' },
      { question: 'When is the busiest drone spray season in Illinois?', answer: 'Late July through early August for corn VT/R1 fungicide, overlapping with soybean R2/R3. Cover crop seeding creates a second peak from late August through September. Book 4 to 6 weeks ahead.' },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── INDIANA ─────────────────────────────────────────────────────────────
  {
    slug: 'indiana',
    name: 'Indiana',
    abbreviation: 'IN',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Office of Indiana State Chemist (OISC) at Purdue University',
    licensingAgencyUrl: 'https://oisc.purdue.edu/pesticide/index.html',
    aerialCategory: 'Category 11: Aerial Application',
    examsRequired: 'Core + Category 11. Exams free at Purdue.',
    examFees: '$45/yr business license + $45/yr applicator license',
    uniqueRules: [
      'OISC exams are administered free of charge at Purdue University.',
      'IPRB Bulletin #143 provides specific drone regulatory guidance.',
      'Indiana participates in DriftWatch sensitive crop registry.',
    ],
    reciprocityStates: ['IL', 'MI', 'OH', 'KY'],
    renewalCycle: '5-year cycle.',
    ceRequirements: '20 CCH (Continuing Certification Hours) per 5-year cycle.',
    droneSpecificCredential: false,
    droneGuidanceUrl: 'https://oisc.purdue.edu/pesticide/iprb/iprb_143_aerial.pdf',
    extensionUrl: 'https://extension.entm.purdue.edu/fieldcropsipm',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '5.6M acres', notes: 'Tar spot pressure high in recent years' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '5.8M acres', notes: 'Frogeye leaf spot and white mold targets' },
      { slug: 'cover-crops', name: 'Cover Crops', acreage: 'Growing', notes: 'Active EQIP participation' },
      { slug: 'wheat', name: 'Wheat', acreage: '450K acres', notes: 'Soft red winter wheat' },
    ],
    rateRange: '$12 to $17/acre',
    statsRate: '$12 to $17/acre',
    statsTopCrop: 'Corn',
    sprayWindows: [],
    neighboringStates: ['illinois', 'ohio', 'michigan', 'kentucky'],
    aeoBlock:
      'Indiana has 5.6 million acres of corn and 5.8 million acres of soybeans, with drone spraying rates of $12 to $17 per acre. The Office of Indiana State Chemist at Purdue administers free licensing exams, and IPRB Bulletin #143 provides specific drone regulatory guidance. Tar spot pressure in recent years has accelerated drone fungicide adoption.',
    licensingDetails:
      'Indiana pesticide licensing is administered by the Office of Indiana State Chemist (OISC) at Purdue University under Category 11 (Aerial Application). Applicators take Core plus Category 11, with exams administered free of charge at Purdue — one of the lowest exam cost structures in the US. Business and applicator licenses are $45 per year each.\n\nIPRB Bulletin #143, published by the Indiana Pesticide Review Board, provides specific drone regulatory guidance and confirms that Category 11 covers unmanned aircraft systems. Indiana participates in the DriftWatch sensitive crop registry. Renewal is on a 5-year cycle with 20 CCH (Continuing Certification Hours) required. Reciprocity exists with IL, MI, OH, and KY.',
    authorityLinks: [
      { label: 'OISC Pesticide Programs', url: 'https://oisc.purdue.edu/pesticide/index.html' },
      { label: 'IPRB Bulletin #143: Drones for Pesticide Application', url: 'https://oisc.purdue.edu/pesticide/iprb/iprb_143_aerial.pdf' },
      { label: 'Purdue Extension Field Crops IPM', url: 'https://extension.entm.purdue.edu/fieldcropsipm' },
    ],
    faqs: [
      { question: 'What does drone spraying cost in Indiana?', answer: 'Rates run $12 to $17 per acre, consistent with the Corn Belt baseline. High tar spot pressure years push demand and can tighten operator availability in July.' },
      { question: 'What license do I need in Indiana?', answer: 'FAA Part 107, Part 137, and OISC Category 11 (Aerial Application) commercial applicator license. Core and Category 11 exams are free at Purdue University.' },
      { question: 'What is IPRB Bulletin #143?', answer: 'The Indiana Pesticide Review Board published Bulletin #143 specifically addressing drones for pesticide application. It clarifies that Category 11 includes UAS and outlines the layered FAA and state requirements.' },
      { question: 'Does Indiana have reciprocal licensing?', answer: 'Yes, with IL, MI, OH, and KY. Contact OISC for current reciprocity requirements.' },
      { question: 'When is peak drone spray season in Indiana?', answer: 'Late July through early August for corn and soybean fungicide. Tar spot outbreaks can trigger emergency demand in late July. Book by mid-June.' },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── OHIO ─────────────────────────────────────────────────────────────────
  {
    slug: 'ohio',
    name: 'Ohio',
    abbreviation: 'OH',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Ohio Department of Agriculture (ODA)',
    licensingAgencyUrl: 'https://agri.ohio.gov/divisions/plant-health/pesticides',
    aerialCategory: 'Category C-1 (commercial license required even for private applicators)',
    examsRequired: 'Core + Category C-1. License $35/yr. Business license $35.',
    examFees: '$35/yr license (exam fee included). Aerial insurance $100K/$300K required.',
    uniqueRules: [
      'Even private applicators must hold a commercial license with Category C-1 to apply any pesticide by drone, including on their own property.',
      'Aerial insurance requirements: $100,000 property damage per occurrence, $100,000 bodily injury per person, $300,000 bodily injury per occurrence.',
      'Certain products prohibited for drone application: Enlist, Acuron (atrazine formulations), Xtend Max (dicamba formulations).',
      'ODA publishes a comprehensive FAQ: "Ohio Requirements for Unmanned Aerial Vehicle Pesticide Applications."',
    ],
    reciprocityStates: ['AL', 'FL', 'GA', 'IL', 'IN', 'LA', 'MI', 'MN'],
    renewalCycle: '3-year cycle.',
    ceRequirements: '5 hours per 3-year cycle (min 1 hr Core, 0.5 hr per category).',
    droneSpecificCredential: false,
    droneGuidanceUrl: 'https://agri.ohio.gov/divisions/plant-health/pesticides',
    extensionUrl: 'https://cfaes.osu.edu',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '3.4M acres', notes: 'Tar spot expanding west to east' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '4.8M acres', notes: 'Frogeye and white mold in NW Ohio' },
      { slug: 'wheat', name: 'Wheat', acreage: '500K acres', notes: 'Soft red winter wheat, heading early June' },
      { slug: 'cover-crops', name: 'Cover Crops', acreage: 'Growing', notes: 'Lake Erie watershed conservation incentives' },
    ],
    rateRange: '$13 to $18/acre',
    statsRate: '$13 to $18/acre',
    statsTopCrop: 'Soybeans',
    sprayWindows: [],
    neighboringStates: ['indiana', 'michigan', 'kentucky', 'west-virginia'],
    aeoBlock:
      'Ohio requires even private applicators to hold a commercial license with Category C-1 for any drone pesticide application, the strictest private applicator rule in the US. Aerial insurance minimums of $100,000 property and $300,000 bodily injury apply. Rates run $13 to $18 per acre across 3.4 million acres of corn and 4.8 million acres of soybeans.',
    licensingDetails:
      'Ohio pesticide licensing is administered by the Ohio Department of Agriculture (ODA) under Category C-1. Ohio has the strictest private applicator rule in the US: every drone pesticide applicator — including farmers spraying their own land — must hold a commercial license with Category C-1. License fees are $35 per year, with exam fee included.\n\nOhio also mandates among the highest aerial insurance minimums in the country: $100,000 property damage per occurrence, $100,000 bodily injury per person, and $300,000 bodily injury per occurrence. ODA explicitly prohibits drone application of Enlist, Acuron (atrazine formulations), and Xtend Max (dicamba formulations). Continuing education is 5 hours per 3-year cycle. Reciprocity exists with AL, FL, GA, IL, IN, LA, MI, and MN.',
    authorityLinks: [
      { label: 'ODA Pesticide Program', url: 'https://agri.ohio.gov/divisions/plant-health/pesticides' },
      { label: 'OSU Extension CFAES', url: 'https://cfaes.osu.edu' },
    ],
    faqs: [
      { question: 'Can I spray my own farm by drone with a private applicator license in Ohio?', answer: 'No. Ohio uniquely requires a commercial license with Category C-1 for all drone pesticide applications, even on your own property. A private applicator license is not sufficient.' },
      { question: 'What insurance do I need for drone spraying in Ohio?', answer: '$100,000 property damage per occurrence, $100,000 bodily injury per person, and $300,000 bodily injury per occurrence. These are among the highest state-mandated aerial insurance minimums nationally.' },
      { question: 'Are any pesticides banned for drone application in Ohio?', answer: 'Yes. ODA specifically prohibits drone application of Enlist, Acuron (atrazine formulations), and Xtend Max (dicamba formulations) due to label restrictions and drift concerns.' },
      { question: 'What does drone spraying cost in Ohio?', answer: 'Rates run $13 to $18 per acre, slightly above the Iowa baseline because Ohio has fewer operators and more variable field sizes than western Corn Belt states.' },
      { question: 'Does Ohio have reciprocal licensing?', answer: 'Yes, with AL, FL, GA, IL, IN, LA, MI, MN and others. Contact ODA for current reciprocity requirements.' },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── MISSOURI ────────────────────────────────────────────────────────────
  {
    slug: 'missouri',
    name: 'Missouri',
    abbreviation: 'MO',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Missouri Department of Agriculture (MDA)',
    licensingAgencyUrl: 'https://agriculture.mo.gov/plants/pesticides',
    aerialCategory: 'Category 13: Aerial Pest Control (commercial/noncommercial). Category 23: Aerial Pest Control (private). Both new as of January 2025.',
    examsRequired: 'Core + Category 13 (or 23) + use categories. $45/exam via Pearson VUE. $65 application fee.',
    examFees: '$45/exam (Pearson VUE). $65 application fee.',
    uniqueRules: [
      'Categories 13 and 23 are new as of January 1, 2025, explicitly including drones.',
      'Provisional applicators (ages 16 to 17) are prohibited from aerial application.',
      'Missouri Bootheel region shares agricultural characteristics with the Mississippi Delta.',
    ],
    reciprocityStates: ['IA', 'IL', 'KS', 'NE', 'AR'],
    renewalCycle: '3-year cycle. Must recertify all categories.',
    ceRequirements: 'Recertification via training or re-exam every 3 years.',
    droneSpecificCredential: false,
    droneGuidanceUrl: null,
    extensionUrl: 'https://extension.missouri.edu',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '3.3M acres', notes: 'Northern Missouri corn belt' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '5.7M acres', notes: '#1 crop by acreage' },
      { slug: 'rice', name: 'Rice', acreage: '200K acres', notes: 'Bootheel region' },
      { slug: 'cotton', name: 'Cotton', acreage: '300K acres', notes: 'Bootheel region' },
    ],
    rateRange: '$12 to $18/acre',
    statsRate: '$12 to $18/acre',
    statsTopCrop: 'Soybeans',
    sprayWindows: [],
    neighboringStates: ['iowa', 'illinois', 'kansas', 'arkansas', 'kentucky', 'tennessee'],
    aeoBlock:
      'Missouri introduced Category 13 (commercial) and Category 23 (private) Aerial Pest Control licensing effective January 2025, explicitly including drones. The state covers 5.7 million acres of soybeans and 3.3 million acres of corn in northern Missouri, plus rice and cotton in the Bootheel. Rates run $12 to $18 per acre.',
    licensingDetails:
      'Missouri pesticide licensing is administered by the Missouri Department of Agriculture (MDA). Effective January 1, 2025, Missouri introduced Category 13 (Aerial Pest Control, commercial and noncommercial) and Category 23 (Aerial Pest Control, private), both explicitly covering drone operations. Applicators take Core plus Category 13 or 23 plus a use category, with exams at $45 each through Pearson VUE and a $65 application fee.\n\nProvisional applicators (ages 16 to 17) are prohibited from aerial application. Recertification via training or re-exam is required every 3 years for all categories. Reciprocity exists with IA, IL, KS, NE, and AR.',
    authorityLinks: [
      { label: 'MDA Pesticide Programs', url: 'https://agriculture.mo.gov/plants/pesticides' },
      { label: 'University of Missouri Extension', url: 'https://extension.missouri.edu' },
    ],
    faqs: [
      { question: 'What changed in Missouri drone licensing in 2025?', answer: 'Missouri introduced Category 13 (Aerial Pest Control, commercial/noncommercial) and Category 23 (Aerial Pest Control, private) effective January 1, 2025. Both explicitly include drone operations. Previously there was no drone-specific aerial category.' },
      { question: 'What does drone spraying cost in Missouri?', answer: 'Northern Missouri row crops run $12 to $17 per acre. Bootheel rice and cotton run $14 to $18. The split reflects the two distinct agricultural regions within the state.' },
      { question: 'Can minors apply for Missouri aerial applicator licensing?', answer: 'No. Provisional applicators (ages 16 to 17) are explicitly prohibited from aerial application under the new Category 13/23 rules.' },
      { question: 'Does Missouri have reciprocal licensing?', answer: 'Yes, with IA, IL, KS, NE, AR and potentially others. Contact MDA for current reciprocity list.' },
      { question: 'What crops drive drone demand in the Missouri Bootheel?', answer: 'Rice (200K acres) and cotton (300K acres) in the Bootheel share characteristics with the Mississippi Delta. Flooded rice paddies and soft fall soils make drones essential for heading-stage fungicide and cotton defoliant.' },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── MICHIGAN ────────────────────────────────────────────────────────────
  {
    slug: 'michigan',
    name: 'Michigan',
    abbreviation: 'MI',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Michigan Department of Agriculture and Rural Development (MDARD)',
    licensingAgencyUrl: 'https://www.michigan.gov/mdard/licensing/pesticide/aerial-pesticide-applications',
    aerialCategory: 'AE (Aerial Standard) + Core + use categories',
    examsRequired: 'Core + AE (Aerial Standard) + use categories. 70% passing. 3 years/200 hours flight experience or MDARD-approved UAV training program.',
    examFees: 'Contact MDARD for current fees.',
    uniqueRules: [
      'MDARD-approved UAV training program required (de facto drone-specific credential).',
      'Mix/Load pad in Michigan required for aerial operations.',
      'Private Aerial Business License (PABL) required.',
      'DriftWatch sensitive crop registry participation required.',
      'Reciprocity with IN, MN, OH, WI includes drone-specific training submission requirement.',
    ],
    reciprocityStates: ['IN', 'MN', 'OH', 'WI'],
    renewalCycle: '3-year cycle. Flight efficiency clinic or re-test.',
    ceRequirements: 'Flight efficiency clinic or re-examination every 3 years.',
    droneSpecificCredential: true,
    droneGuidanceUrl: 'https://www.michigan.gov/mdard/licensing/pesticide/aerial-pesticide-applications',
    extensionUrl: 'https://www.canr.msu.edu',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '2.2M acres', notes: 'Western Michigan concentration' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '2.1M acres', notes: 'Growing drone adoption' },
      { slug: 'orchards', name: 'Cherries/Apples', acreage: '100K acres', notes: 'Traverse City tart cherry, west MI apples' },
      { slug: 'cover-crops', name: 'Cover Crops', acreage: 'Growing', notes: 'Great Lakes watershed incentives' },
    ],
    rateRange: '$14 to $22/acre',
    statsRate: '$14 to $22/acre',
    statsTopCrop: 'Corn',
    sprayWindows: [],
    neighboringStates: ['indiana', 'ohio', 'wisconsin', 'minnesota'],
    aeoBlock:
      'Michigan requires a MDARD-approved UAV training program as a de facto drone-specific credential, plus Core and Aerial Standard (AE) exams and a Private Aerial Business License (PABL). Rates run $14 to $22 per acre across 2.2 million acres of corn, 2.1 million acres of soybeans, and high-value tart cherry and apple orchards in western Michigan.',
    licensingDetails:
      'Michigan pesticide licensing is administered by the Michigan Department of Agriculture and Rural Development (MDARD). Applicators need Core plus AE (Aerial Standard) plus use categories, with a 70% passing score. Before receiving AE certification, operators must complete an MDARD-approved UAV training program or document 200 hours of flight experience — a de facto drone-specific credential.\n\nA Private Aerial Business License (PABL) is required for the business entity in addition to individual certification. Operations require an in-state mix/load pad and mandatory DriftWatch sensitive crop registry participation. Reciprocal applicants from IN, MN, OH, and WI must also submit drone-specific training documentation to MDARD. Renewal is every 3 years via a flight efficiency clinic or re-examination.',
    authorityLinks: [
      { label: 'MDARD Aerial Pesticide Applications', url: 'https://www.michigan.gov/mdard/licensing/pesticide/aerial-pesticide-applications' },
      { label: 'MSU Extension CANR', url: 'https://www.canr.msu.edu' },
    ],
    faqs: [
      { question: 'Does Michigan require drone-specific training?', answer: 'Yes. MDARD requires completion of an approved UAV training program before issuing the AE (Aerial Standard) certification. This is one of the few states with a de facto drone-specific credential requirement.' },
      { question: 'What is the PABL requirement?', answer: 'A Private Aerial Business License (PABL) is required for all aerial pesticide application businesses in Michigan, including drone operators. This is in addition to individual applicator certification.' },
      { question: 'What does drone spraying cost in Michigan?', answer: 'Row crops run $14 to $18 per acre. Cherry and apple orchard work runs $18 to $22 because of canopy complexity and multiple passes. Western Michigan orchards command the highest rates.' },
      { question: 'Can I use my Indiana or Ohio license in Michigan?', answer: 'Michigan has reciprocity with IN, MN, OH, and WI, but reciprocal applicants must still submit drone-specific training documentation to MDARD.' },
      { question: 'What is DriftWatch and do I need it?', answer: 'DriftWatch is a voluntary sensitive crop registry. Michigan requires aerial applicators to check DriftWatch before spraying to identify specialty crop fields (vineyards, orchards, organic) near the application zone.' },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── WISCONSIN ───────────────────────────────────────────────────────────
  {
    slug: 'wisconsin',
    name: 'Wisconsin',
    abbreviation: 'WI',
    regionSlug: 'corn-belt',
    regionName: 'Corn Belt',
    licensingAgency: 'Wisconsin DATCP',
    licensingAgencyUrl: 'https://datcp.wi.gov',
    aerialCategory: 'Category 9.9: Aerial Applicator (supplementary certification under ATCP 29.28)',
    examsRequired: 'Core + Category 9.9 + use categories.',
    examFees: 'Contact DATCP for current fees.',
    uniqueRules: [
      'Category 9.9 explicitly covers "airplanes, helicopters, or unmanned aircraft systems (drones)."',
      'Supplementary certification, not standalone.',
    ],
    reciprocityStates: ['IA', 'IL', 'MI', 'MN'],
    renewalCycle: '5-year cycle.',
    ceRequirements: 'CE hours vary by category per 5-year cycle.',
    droneSpecificCredential: false,
    droneGuidanceUrl: null,
    extensionUrl: 'https://extension.wisc.edu',
    topCrops: [
      { slug: 'corn', name: 'Corn', acreage: '3.9M acres', notes: 'Tar spot expanding into southern WI' },
      { slug: 'soybeans', name: 'Soybeans', acreage: '1.9M acres', notes: 'White mold in northern counties' },
      { slug: 'cover-crops', name: 'Cover Crops', acreage: 'Growing', notes: 'Fox-Wolf Watershed drone seeding programs' },
    ],
    rateRange: '$13 to $18/acre',
    statsRate: '$13 to $18/acre',
    statsTopCrop: 'Corn',
    sprayWindows: [],
    neighboringStates: ['iowa', 'illinois', 'michigan', 'minnesota'],
    aeoBlock:
      'Wisconsin uses Category 9.9 (Aerial Applicator) which explicitly covers drones alongside airplanes and helicopters. Rates run $13 to $18 per acre across 3.9 million acres of corn and 1.9 million acres of soybeans. Cover crop drone seeding is expanding, with the Fox-Wolf Watershed Alliance running programs at $20 per acre.',
    licensingDetails:
      'Wisconsin pesticide licensing is administered by DATCP (Department of Agriculture, Trade and Consumer Protection). Aerial applicators need Core plus Category 9.9 (Aerial Applicator) plus use categories. Category 9.9 is a supplementary certification under ATCP 29.28 and explicitly covers "airplanes, helicopters, or unmanned aircraft systems (drones)" — one of the clearest drone inclusions in any state aerial category.\n\nRenewal is on a 5-year cycle with continuing education hours that vary by category. Reciprocity exists with IA, IL, MI, and MN. Contact DATCP for current fee schedule and reciprocity procedures.',
    authorityLinks: [
      { label: 'Wisconsin DATCP', url: 'https://datcp.wi.gov' },
      { label: 'UW-Madison Extension', url: 'https://extension.wisc.edu' },
    ],
    faqs: [
      { question: 'What aerial category covers drones in Wisconsin?', answer: 'Category 9.9 (Aerial Applicator) under ATCP 29.28. It explicitly covers airplanes, helicopters, and unmanned aircraft systems (drones) as a supplementary certification.' },
      { question: 'What does drone spraying cost in Wisconsin?', answer: 'Row crop rates run $13 to $18 per acre. Cover crop seeding runs $18 to $20. Slightly higher than Iowa due to fewer operators and more variable terrain in western and northern counties.' },
      { question: 'Is cover crop drone seeding popular in Wisconsin?', answer: 'Yes and growing. The Fox-Wolf Watershed Alliance has run pilot drone seeding programs, and NRCS EQIP cost-share makes it economically attractive across the state.' },
      { question: 'Does Wisconsin have reciprocal licensing?', answer: 'Yes, with IA, IL, MI, and MN. Contact DATCP for current reciprocity procedures.' },
      { question: 'When is peak drone spray season in Wisconsin?', answer: 'Late July through early August for corn and soybean fungicide. Wisconsin sits 1 to 2 weeks behind Iowa in timing due to northern latitude. Cover crop seeding runs September through early October.' },
    ],
    lastReviewedAt: '2026-04-16',
  },
];

export function getStateData(slug: string): StateData | undefined {
  return stateData.find((s) => s.slug === slug);
}
