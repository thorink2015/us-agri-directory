// ─── Pillar guides (not blog posts) ───────────────────────────────────────
// Long-form farmer-side playbooks. Each guide has a data entry here and a
// matching JSX content block in src/app/guides/[slug]/content.tsx keyed by
// the same slug. Adding a new guide is two drops: (1) append an entry to
// `guides`, (2) add the keyed body content. Sitemap, llms.txt, schemas,
// breadcrumbs and the TOC all derive from the data below.
// --------------------------------------------------------------------------

export interface GuideTOCEntry {
  /** Anchor id used in the content's <h2 id="..."> */
  id: string;
  /** Short label shown in the TOC sidebar + "In this guide" block */
  label: string;
}

export interface GuideQuickFact {
  label: string;
  value: string;
}

export interface GuidePullQuote {
  quote: string;
  attribution: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideHowToStep {
  name: string;
  text: string;
}

/**
 * Optional Dataset (schema.org) payload for guides whose centerpiece is a
 * citable data table, like the 2026 statistics report. Renders as a
 * Dataset JSON-LD block on the guide page so the table is individually
 * indexable in Google Dataset Search and quotable by AI engines.
 */
export interface GuideDataset {
  name: string;
  description: string;
  /** Stable identifier, typically the page URL plus a fragment */
  identifier?: string;
  /** Variable measured names (one entry per column or stat group) */
  variableMeasured: string[];
  /** ISO date when the dataset assembly was first published */
  dateCreated: string;
  /** SPDX-style license URL or label */
  license?: string;
  /** Search keywords for Dataset Search */
  keywords?: string[];
  /** Citation strings for primary upstream sources */
  citation?: string[];
}

export type GuideCategory =
  | 'For Farmers'
  | 'Regulations'
  | 'Equipment'
  | 'Funding'
  | 'Operators';

export interface Guide {
  slug: string;
  title: string;
  /** Used in cards, breadcrumb, "more guides" lists */
  shortTitle: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: GuideCategory;
  publishDate: string;
  lastUpdated: string;
  readMinutes: number;
  /** 80–160 word answer block rendered above the body, quotable by AI Overviews */
  aeoBlock: string;
  toc: GuideTOCEntry[];
  faqs: GuideFAQ[];
  /** Optional extras */
  quickFacts?: GuideQuickFact[];
  pullQuotes?: GuidePullQuote[];
  howToSteps?: GuideHowToStep[];
  /** HowTo schema `name` — used when howToSteps is set. Falls back to guide.title. */
  howToTitle?: string;
  /** Hero-card quote on the /guides hub when this guide is the latest. */
  featuredPullQuote?: GuidePullQuote;
  /** Related internal pages shown in the footer */
  relatedInternal?: { href: string; label: string }[];
  /** Optional Dataset JSON-LD payload for guides anchored on a citable table */
  dataset?: GuideDataset;
}

export const GUIDE_CATEGORY_ORDER: GuideCategory[] = [
  'For Farmers',
  'Regulations',
  'Equipment',
  'Funding',
  'Operators',
];

export const guides: Guide[] = [
  {
    slug: 'hire-drone-spray-operator-checklist',
    title:
      "How to Hire a Drone Spray Operator: The Farmer's Complete Vetting Checklist",
    shortTitle: "Hiring a drone spray operator: farmer's vetting checklist",
    description:
      'Verify Part 137, insurance, and state pesticide licenses before a drone ever lifts off your field. A farmer\'s hiring checklist with 9 red flags worth walking away over.',
    primaryKeyword: 'hire drone spray operator',
    secondaryKeywords: [
      'questions to ask drone spray contractor',
      'drone spray operator checklist',
      'how to verify Part 137 certification',
      'drone applicator insurance requirements',
      'drone spraying service red flags',
    ],
    category: 'For Farmers',
    publishDate: '2026-04-21',
    lastUpdated: '2026-04-21',
    readMinutes: 18,
    aeoBlock:
      'Before hiring a drone applicator, verify three credentials yourself: FAA Part 137 (the agricultural aircraft operator certificate, missing from most operators currently advertising online), FAA Part 107 (the base remote pilot certificate), and a current state commercial pesticide applicator license with an aerial or UAS category for your state. Require a certificate of insurance with a chemical drift endorsement of at least $100,000 (ideally $300,000 in row-crop areas), name yourself as additional insured, and walk away if row-crop pricing drops below $10 per acre in the corn belt. Under 40 CFR 170.9(c), farmers are liable for FIFRA violations committed by hired applicators.',
    toc: [
      { id: 'three-licenses', label: 'The three licenses every operator must show' },
      { id: 'insurance', label: 'Insurance: where most farmers get burned' },
      { id: 'equipment-questions', label: 'Equipment questions that separate pros' },
      { id: 'label-question', label: 'The label question most operators cannot answer' },
      { id: 'pricing', label: 'Pricing sanity check' },
      { id: 'contract-clauses', label: 'Contract clauses to require' },
      { id: 'weather-timing', label: 'Weather and timing realities' },
      { id: 'red-flags', label: 'Nine red flags worth walking away over' },
      { id: 'drift-damage', label: 'What to do if drift or damage happens' },
      { id: 'short-checklist', label: 'The short pre-flight checklist' },
    ],
    quickFacts: [
      { label: 'Registered Part 137 drone operators', value: '~1,082 nationwide (NAAA, fall 2025)' },
      { label: '2025 ASDC custom rate average', value: '$13 per acre, down from $21 in 2024' },
      { label: 'FIFRA civil penalty ceiling', value: '$23,494 per violation (commercial)' },
      { label: 'Minimum drift endorsement to demand', value: '$100,000 ($300,000 in row-crop patchwork)' },
    ],
    pullQuotes: [
      {
        quote:
          'Substantial undercutting by non-Part 137 operators willing to accept lower rates, particularly in the corn belt.',
        attribution: 'Eric Ringer, ASDC President, on the 2025 rate collapse',
      },
      {
        quote:
          'The manufacturer says 30-foot spray width. Your real-world number after you pattern-test it is more like 20.',
        attribution: 'Brady Holst, custom drone operator (AgWeb)',
      },
      {
        quote:
          "You've got to follow the label, no matter what. Some of the more recent label interpretations have created some gray areas or some complete no-go zones for some of our drone applications.",
        attribution: 'Jason Davis, University of Arkansas Extension Specialist (Farm Progress, 2024)',
      },
      {
        quote:
          'The drones are running foliar and fungicide treatments and stink bug spray every day now. We rarely call in an airplane, because we can mix and spray everything ourselves.',
        attribution:
          'Alex Harrell, Leesburg, Georgia, 218.29 bu/A soybean world record holder (Farm Journal)',
      },
    ],
    howToTitle: 'How to vet and hire a drone spray operator',
    featuredPullQuote: {
      quote:
        'In 2024 about 9,000 agricultural drones were sold in the United States. Fewer than 1,200 of them got registered with the FAA.',
      attribution: 'From: the opening data hook on operator verification',
    },
    howToSteps: [
      { name: 'Verify the physical Part 137 certificate', text: 'Ask to see the Commercial (not Private) Part 137 certificate on paper and cross-check the FAA Air Operator FAR Search for that company name.' },
      { name: 'Verify Part 107 on the FAA Airmen Inquiry', text: 'Search by full legal name at amsrvs.registry.faa.gov/airmeninquiry and match the name on the remote pilot card exactly.' },
      { name: 'Confirm the state pesticide applicator license', text: 'Search your state ag department database for a current commercial applicator license with an aerial or UAS category for the state where your field sits.' },
      { name: 'Inspect the certificate of insurance', text: 'Require a minimum $1M per occurrence aviation liability, a named chemical drift endorsement sub-limit, and your farm listed as additional insured on this specific job.' },
      { name: 'Confirm the label and droplet size', text: 'Have the operator send you the current EPA-registered label, highlight the aerial section, and specify carrier volume and droplet size category before mixing chemistry.' },
      { name: 'Sign a written contract with recordkeeping clauses', text: 'Require a 12-clause contract covering GPS boundaries, federal + state license warranties, insurance evidence, chemistry supply, weather cancellation, drift indemnification, and a 30-day recordkeeping delivery clause.' },
    ],
    faqs: [
      {
        question: 'Do I need to verify both Part 107 and Part 137?',
        answer:
          'Yes. Part 107 is the base remote pilot certificate for any commercial drone work. Part 137 is the separate agricultural aircraft operator certificate required for dispensing pesticides from any aircraft, including drones. One without the other is not sufficient for legal commercial ag spraying.',
      },
      {
        question: 'What insurance minimums should I require?',
        answer:
          "$1 million per occurrence aviation liability at minimum, a chemical drift endorsement with at least $100,000 sub-limit, hull coverage matching drone replacement value, and your name listed as additional insured on the specific job. Confirm the policy's chemical coverage tier (XC, LC, or CC) matches what you are applying.",
      },
      {
        question: 'How much should drone spraying cost per acre in 2026?',
        answer:
          'University extension surveys benchmark row-crop custom hire at $13 to $21 per acre for application only. Add chemistry and a typical job runs $25 to $60 per acre. Orchards, vineyards, and specialty crops run 1.5 to 3 times that. Prices below $10 per acre in the corn belt almost always signal an unlicensed operator.',
      },
      {
        question: 'Can I get in trouble if my hired operator violates a pesticide label?',
        answer:
          'Yes. Under 40 CFR 170.9(c), a farmer is liable for FIFRA violations committed by anyone "employed by or acting for" them, which includes hired applicators. Civil penalties can reach $23,494 per violation for commercial-category infractions.',
      },
      {
        question: 'What states require the most paperwork for drone spraying?',
        answer:
          'California is the heaviest lift, requiring a Qualified Applicator License, a Pest Control Aircraft Pilot Certificate, and annual county registration. North Carolina requires a Category P aerial applicator license plus a separate NCDOT UAS permit. Louisiana uniquely issues a separate drone operator license.',
      },
      {
        question: "Does my crop insurance cover a drone operator's mistake on my own field?",
        answer:
          'Almost never. MPCI policies cover natural perils such as drought, hail, and disease. Chemical misapplication damage is typically excluded. Your only recourse is the operator\'s liability policy, which is why verifying their insurance before the job matters more than anything else on the checklist.',
      },
      {
        question: "What's the fastest way to verify Part 137 myself?",
        answer:
          'Go to faa.gov/data/av-info/air-operator-far-search, filter Part 137, and search by the operator\'s company name. Cross-check at aviationdb.com by selecting Part 137 and typing "UAS" into the Aircraft Operating field, which isolates drone operators from manned ag aircraft.',
      },
      {
        question: 'How do I know if a pesticide label allows drone application?',
        answer:
          'Read the aerial application section of the current EPA-registered label at EPA\'s Pesticide Product Label System (PPLS) or at Greenbook.net. Look for explicit prohibition language ("not for aerial application," "ground application only"), minimum carrier volume (gallons per acre), droplet size category requirements, and buffer zone specifications. Call your state ag department if the language is ambiguous.',
      },
    ],
    relatedInternal: [
      { href: '/regulations/faa-part-137', label: 'FAA Part 137 for drones' },
      { href: '/regulations/state-licensing', label: 'State pesticide licensing' },
      { href: '/insurance', label: 'Insurance for drone applicators' },
      { href: '/buyers-guide', label: 'Spray drone buyer\'s guide' },
      { href: '/comparisons/drone-vs-ground-rig', label: 'Drone vs ground rig' },
      { href: '/comparisons/drone-vs-airplane', label: 'Drone vs airplane' },
    ],
  },
  {
    slug: 'year-round-revenue-ag-drone-operators',
    title:
      'Year Round Revenue for Ag Drone Operators: How to Fill Your Calendar in the Off Season',
    shortTitle: 'Year-round revenue for ag drone operators',
    description:
      'How US ag drone operators stack 6 services to earn $150K to $420K per year. Real companies, 2026 pricing, state cost share rates, and the 12 month calendar that actually works.',
    primaryKeyword: 'ag drone business year round revenue',
    secondaryKeywords: [
      'drone spraying off season income',
      'cover crop seeding drone service pricing',
      'drone NDVI mapping service rates',
      'agricultural drone custom operator revenue',
      'spray drone business 12 month calendar',
    ],
    category: 'Operators',
    publishDate: '2026-04-24',
    lastUpdated: '2026-04-24',
    readMinutes: 20,
    aeoBlock:
      'US ag drone operators running a spray-only business typically cap out at $80,000 to $150,000 gross per year even at 4,000 acres, because the Corn Belt spray season is only 120 days long. Operators who stack six services (liquid spray, cover crop seeding, NDVI mapping, granular spreading, livestock thermal, and non-ag RGB mapping) reach $150,000 to $420,000 gross in Year 2 per Financial Models Lab and ASDC 2025 benchmarks. The 2026 Iowa State Farm Custom Rate Survey pegs drone spraying at $12.50 per acre with a University of Missouri cost base of $7.39 per acre. A $1,200 spreader attachment for an existing DJI Agras is the single highest-return expansion, unlocking $30,000 to $50,000 in fall cover crop seeding plus $15,000 to $20,000 in shoulder-season granular fertilizer work.',
    toc: [
      { id: 'spray-season-math', label: 'Spray season math' },
      { id: 'cover-crop-seeding', label: 'Cover crop aerial seeding' },
      { id: 'ndvi-mapping', label: 'NDVI mapping and variable rate' },
      { id: 'livestock-ranch', label: 'Livestock and ranch services' },
      { id: 'mosquito-abatement', label: 'Mosquito abatement contracts' },
      { id: 'granular-spreading', label: 'Granular fertilizer and lime' },
      { id: 'non-ag-mapping', label: 'Non-ag RGB mapping' },
      { id: 'calendar', label: 'The 12 month calendar' },
      { id: 'certifications', label: 'Certification stack' },
      { id: 'subscription-model', label: 'Subscription model' },
      { id: 'action-checklist', label: 'Operator action checklist' },
    ],
    quickFacts: [
      { label: '2025 drone-sprayed US acreage', value: '16.4 million acres (ASDC), up 58.7% YoY' },
      { label: '2026 Iowa State drone spray average', value: '$12.50 per acre ($8 to $16 range)' },
      { label: 'Operator cost base at 4,000 acres', value: '$7.39 per acre (Mizzou Extension 2025)' },
      { label: 'Registered Part 137 drone operators', value: '~1,082 nationwide (NAAA, fall 2025)' },
    ],
    pullQuotes: [
      {
        quote:
          'The American Spray Drone Coalition reported 16.4 million US acres sprayed by drone in 2025, up 58.7 percent year over year.',
        attribution: 'ASDC 2025 annual report',
      },
      {
        quote:
          'A $1,200 spreader attachment for your existing Agras drone. No new FAA certification, no new insurance class, and it unlocks $30,000 to $50,000 in fall cover crop seeding plus $15,000 to $20,000 in shoulder-season granular fertilizer work.',
        attribution: 'On the highest-ROI expansion for a spray-only shop',
      },
      {
        quote: 'The off season is not empty. It is unclaimed.',
        attribution: 'Closing line of the year-round revenue playbook',
      },
    ],
    howToTitle: 'How to stack services for year-round ag drone revenue',
    featuredPullQuote: {
      quote: 'The off season is not empty. It is unclaimed.',
      attribution: 'From: the closing line of the year-round revenue playbook',
    },
    howToSteps: [
      { name: 'Add the spreader attachment', text: 'Buy a spreader kit for the DJI Agras drone you already own. The T50 spreading system, T40 spreader, and T25 spreader all run under $1,200 from US dealers like Drone Nerds, Bestway Ag, and Agri Spray Drones.' },
      { name: 'Learn your state cost-share programs', text: 'Pick your state\'s largest cover crop cost-share program (USDA EQIP, Iowa WQI, Illinois Fall Covers, Ohio H2Ohio, Maryland MACS, Illinois Decatur RCPP). Every rule becomes a sales pitch that turns a price objection into a program enrollment.' },
      { name: 'Prospect ranch operations in December', text: 'Identify three to five ranch operations within 45 minutes of your base that run over 2,000 acres. Introduce yourself before calving and hunting season in December, not in July when they are too busy to talk.' },
      { name: 'Add an NDVI mapping drone', text: 'Order a DJI Mavic 3 Multispectral (typically $4,618 to $5,204) and a Pix4Dfields license at $1,990 annual. Start scouting service the following April with a target of 35 flight days and 400 acres per day.' },
      { name: 'Sit for the CCA exam', text: 'Enroll in the Certified Crop Adviser exam at your next available sitting. Budget 6 to 12 months of study time. The credential pushes NDVI maps from $9 per acre commodity work into $15 to $30 per acre signed prescriptions.' },
      { name: 'Open the mosquito abatement lane', text: 'Get quotes on Public Health Pest Control Operator licensing in your state. In Florida it is Chapter 388, in California it is CDPH Vector Control Technician with Categories A and B. Start paperwork before May so you can bid spring RFPs.' },
      { name: 'Redesign invoices with subscription option', text: 'Rebuild your quote and invoice template to include a monthly subscription option for every farm over 1,000 acres. Ceres Imaging benchmarks show subscription contracts reduce per-acre cost 15 to 25 percent versus one-offs and retain clients year after year.' },
    ],
    faqs: [
      {
        question: 'How much can a solo ag drone operator realistically earn in Year 2?',
        answer:
          'A diversified Year 2 operator running spray plus cover crop seeding plus NDVI mapping plus one shoulder service (thermal ranch or granular spreading) can hit $150,000 to $420,000 gross. Spray-only operators typically max out around $80,000 to $150,000 gross even at 4,000 acres.',
      },
      {
        question: 'Do I need a separate drone for NDVI mapping?',
        answer:
          'Yes. DJI Agras spray drones have basic GPS and limited survey capability. Real NDVI work needs a DJI Mavic 3 Multispectral ($4,618 to $5,204 depending on Care plan) or equivalent. Payback is typically one season if you cover 1,500+ acres of scouting work.',
      },
      {
        question: 'What drone is best for livestock thermal inspection under $6,000?',
        answer:
          'The Autel EVO II Dual 640T V3 at $5,299 manufacturer direct is currently the best value sub-$6K thermal option. DJI Matrice 30T starts around $12,000. FLIR SIRAS starts around $5,000 and is purpose-built for thermal but harder to source through 2026.',
      },
      {
        question: 'Do I need a separate license for mosquito abatement?',
        answer:
          'Yes, in nearly every state. This is a public health category, separate from your ag applicator license. Florida requires Chapter 388 Public Health Pest Control Operator (not the Chapter 487 ag RUP license). California requires CDPH Vector Control Technician Certification with Categories A and B. Most states require $1 to $5 million liability coverage for district contracts.',
      },
      {
        question: 'Can a Northern Plains operator actually make money year round?',
        answer:
          'Yes, but not from drone flying in North Dakota or Minnesota from November through March. The documented strategy is five months of spray, three to four months of crop insurance adjusting (NCIS CAPP licensure) at $225 to $350 per day plus mileage, plus one to two months of southern contract flying in the Delta or Rio Grande Valley through subcontract arrangements with operators like Pro Ag Solutions or Great Plains Drone Co.',
      },
      {
        question: 'What is the single highest ROI addition to a spray-only business?',
        answer:
          'A $1,200 spreader attachment for your existing Agras drone. No new FAA certification, no new insurance class, and it unlocks $30,000 to $50,000 in fall cover crop seeding plus $15,000 to $20,000 in shoulder-season granular fertilizer work. Payback under one season in most markets.',
      },
      {
        question: 'Can I start a ranch thermal service without becoming a licensed vet?',
        answer:
          'Yes, but you cannot diagnose. You can observe, count, locate, and report visible events. You cannot describe an animal as having fever, pneumonia, or BRD on a client report. Partner with a licensed vet who holds the Veterinarian Client Patient Relationship for any diagnostic language.',
      },
    ],
    relatedInternal: [
      { href: '/start-a-drone-business', label: 'Start a drone business' },
      { href: '/training-and-certification', label: 'Training and certification' },
      { href: '/grants-and-subsidies', label: 'Grants and subsidies for cover crops' },
      { href: '/buyers-guide', label: 'Spray drone buyer\'s guide' },
      { href: '/regulations/faa-part-137', label: 'FAA Part 137 for drones' },
      { href: '/insurance', label: 'Insurance for drone applicators' },
    ],
  },
  {
    slug: 'how-to-become-an-agricultural-drone-pilot',
    title:
      'How to Become an Agricultural Drone Pilot in the US: A Step-by-Step 2026 Guide',
    shortTitle: 'How to become an agricultural drone pilot',
    description:
      'The real path to becoming a licensed ag drone pilot in 2026. Part 107, Part 137, state license, startup costs, and what operators actually earn.',
    primaryKeyword: 'how to become an agricultural drone pilot',
    secondaryKeywords: [
      'become an ag drone pilot',
      'agricultural drone pilot license',
      'Part 107 ag drone',
      'Part 137 drone certification',
      'Section 44807 exemption',
      'drone spraying startup cost',
    ],
    category: 'Operators',
    publishDate: '2026-04-25',
    lastUpdated: '2026-04-25',
    readMinutes: 18,
    aeoBlock:
      'To legally fly a commercial ag spray job in the United States you need a Part 107 Remote Pilot Certificate, a Section 44807 exemption if your drone is over 55 pounds, a Part 137 Agricultural Aircraft Operator Certificate, a state pesticide applicator license, FAA aircraft registration, and liability plus chemical coverage. Expect $43,500 to $89,500 in first-season startup, 3 to 6 months from paperwork to first paid flight, and $12 to $35 per acre depending on region and crop. In 2025, US operators sprayed 16.4 million acres by drone across 1,710 Part 137-certified operators (ASDC), while national rates fell from $21 to $13 per acre, a 38% single-year drop. FAA civil penalties were raised to $75,000 per violation in 2025.',
    toc: [
      { id: 'what-pilots-do', label: 'What an ag drone pilot actually does' },
      { id: 'step-1-part-107', label: 'Step 1: Part 107 Remote Pilot Certificate' },
      { id: 'step-2-part-137', label: 'Step 2: Part 137 Agricultural Operator Certificate' },
      { id: 'step-3-state-license', label: 'Step 3: State pesticide applicator license' },
      { id: 'step-4-section-44807', label: 'Step 4: Section 44807 exemption' },
      { id: 'startup-costs', label: 'What it really costs to start' },
      { id: 'earnings', label: 'What you can earn in year 1 and 2' },
      { id: 'who-succeeds', label: 'What separates operators who build a business' },
    ],
    quickFacts: [
      { label: '2025 US acres sprayed by drone', value: '16.4 million (ASDC), up 58.7% YoY' },
      { label: '2025 national average rate', value: '$13 per acre, down from $21 in 2024' },
      { label: 'Registered Part 137 operators', value: '1,710 nationwide (ASDC 2025)' },
      { label: 'First-season startup budget', value: '$43,500 low, $64,000 mid, $89,500 high' },
    ],
    pullQuotes: [
      {
        quote:
          'We had a generator that was not big enough. It took us four days to spray a single 100-acre field.',
        attribution: 'Hayden Crum, Midwest Air, on their first custom job (DroneOn Show Ep. 22)',
      },
      {
        quote:
          'In the Mississippi Delta, the majority of what we do is herbicide. That is 90%.',
        attribution: 'Kam Harper, Macon Ridge Specialty Drone Service (Delta Farm Press)',
      },
      {
        quote:
          'I can\'t cover every acre, and I can\'t always hit perfect timing for every farmer.',
        attribution: 'Hayden Crum, Midwest Air, on subcontracting (DroneOn Show Ep. 22)',
      },
    ],
    howToTitle: 'How to become a licensed agricultural drone pilot in the US',
    featuredPullQuote: {
      quote:
        'In 2025, US operators sprayed 16.4 million acres by drone, up 58.7% from the year before. The opportunity is real. The margin to waste is not.',
      attribution: 'From: the market math opening the step-by-step licensing path',
    },
    howToSteps: [
      {
        name: 'Get your Part 107 Remote Pilot Certificate',
        text: 'Pass the UAG knowledge test ($175 at PSI Services), 60 multiple-choice questions, 70% to pass. Most first-timers put in 15 to 20 hours of study. Apply through IACRA with Form 8710-13 and your 17-digit Knowledge Test Exam ID. Temporary certificate by email in 7 to 14 business days.',
      },
      {
        name: 'Apply for Section 44807 exemption if your drone is over 55 pounds',
        text: 'File on regulations.gov under 14 CFR Part 11 referencing the FAA List of Approved Agricultural UAS (Docket FAA-2023-1271). No FAA filing fee. Industry approval timelines run 30 to 120 days for straightforward ag petitions.',
      },
      {
        name: 'Apply for your Part 137 Agricultural Aircraft Operator Certificate',
        text: 'Email Form 8710-3 plus your Section 44807 exemption number to UAS137Certificates@faa.gov. Five-phase process: Preapplication, Formal Application, Document Compliance, Demonstration and Inspection, and Certification. Most uncomplicated applications take 3 to 6 months.',
      },
      {
        name: 'Get your state pesticide applicator license',
        text: 'Pass your state commercial applicator core exam plus aerial or UAS category. Fees range from $25 Nebraska private to $265 California UAPC. Reciprocity is limited. Budget 3 to 6 months per state if you plan to work across state lines.',
      },
      {
        name: 'Register your aircraft and insure it',
        text: 'Part 47 registration if over 55 pounds, Part 48 if under. Insure with hull, liability, and chemical drift coverage before the AAOC arrives. BWI Aviation sample 2025 policy totaled $10,457 per year on a $40,000 T40; budget $4,000 minimum.',
      },
      {
        name: 'Sign a subcontracting agreement to earn while you wait',
        text: 'Pay the $800 nuWay FastPass fee (or sign with SweetWater Technologies, Ackerspray, or a regional operator) so you can legally spray under their Part 137 certificate while your own application is in review. Cuts time to first revenue from 3-6 months to 1-2 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to start an ag drone spraying business?',
        answer:
          'Budget $43,500 on the low end, $64,000 mid-range, and $89,500 for a fully built-out first-season setup with insurance and compliance. The drone is roughly half of that; batteries, trailer, generator, licensing, and insurance are the other half. Plan on insurance alone being at least $4,000 in year one.',
      },
      {
        question: 'How long until I make my first dollar?',
        answer:
          'If you already have Part 107, most operators are three to six months from their first paid flight: 30 to 120 days for the Section 44807 petition, another two to six months for Part 137. A subcontracting path like nuWay FastPass can get you earning in one to two weeks under another operator\'s certificate while your own is pending.',
      },
      {
        question: 'What is the best drone for a beginner?',
        answer:
          'DJI Agras T40 and T50 are the dominant first-purchase platforms in the US because of dealer support, parts availability, and the size of the trained pilot pool. The T50 has 40L tank capacity and runs about $22,000 to $27,000 base, plus batteries and a generator. For NDAA-compliant alternatives consider Hylio, Talos, or Raptor Dynamic, but budget a premium.',
      },
      {
        question: 'Do I need an LLC before I start?',
        answer:
          'Most state agriculture departments will issue a commercial applicator license to an individual, but Part 137 and your insurance policy will both list an operator entity. Forming an LLC before you file Part 137 saves you a name-change refile later. Costs range from $50 to $500 depending on state.',
      },
      {
        question: 'What is the difference between Part 107 and Part 137?',
        answer:
          'Part 107 authorizes you to commercially operate a small UAS. Part 137 authorizes the operator (your business) to dispense agricultural chemicals. Part 107 is about the pilot and the flight. Part 137 is about the work being done. You need both to legally spray for hire.',
      },
      {
        question: 'What is the minimum insurance I need?',
        answer:
          'Most ag customers will require $1 million liability. If you are spraying chemicals, you also need a chemical liability endorsement, typically with $100,000 limits on the 1/3/1 structure. Hull insurance on a $30,000 to $40,000 drone runs 10 to 15% of the insured value. BWI Aviation and SkyWatch are the two most cited carriers.',
      },
      {
        question: 'What is the best state to start an ag drone business?',
        answer:
          'Underserved markets are Mountain West (Wyoming, Montana, Colorado rangeland and orchards) and specialty California crops where the regulatory load is high enough to deter competition. The Corn Belt is the most saturated and most price-compressed. Start where you already have farmer relationships if you can.',
      },
      {
        question: 'Can I spray my own farm without a commercial license?',
        answer:
          'Yes, but only as a private applicator, and only on land you own or rent for agricultural commodity production. You still need Part 107 and Section 44807 if your drone is over 55 pounds, plus your state\'s private applicator certification with the aerial category. You do not need Part 137 for spraying exclusively on your own operation.',
      },
    ],
    relatedInternal: [
      { href: '/regulations/faa-part-107', label: 'FAA Part 107 for drones' },
      { href: '/regulations/faa-part-137', label: 'FAA Part 137 for drones' },
      { href: '/regulations/state-licensing', label: 'State pesticide licensing' },
      { href: '/insurance', label: 'Insurance for drone applicators' },
      { href: '/buyers-guide', label: 'Spray drone buyer\'s guide' },
      { href: '/start-a-drone-business', label: 'Start a drone business' },
      { href: '/training-and-certification', label: 'Training and certification' },
    ],
  },
  {
    slug: 'agricultural-drone-spraying-statistics-2026',
    title:
      'Agricultural Drone Spraying Statistics 2026: US Market Report',
    shortTitle: 'Agricultural drone spraying statistics 2026',
    description:
      '85+ verified ag drone spraying stats for 2026: 16.4M US acres treated, 1,710 Part 137 operators, $13/acre pricing, peer-reviewed environmental data.',
    primaryKeyword: 'agricultural drone spraying statistics',
    secondaryKeywords: [
      'drone spraying market size',
      'FAA Part 137 operators count',
      'drone spraying cost per acre',
      'ag drone adoption rate',
      'drone vs ground spraying environmental',
    ],
    category: 'For Farmers',
    publishDate: '2026-04-26',
    lastUpdated: '2026-05-02',
    readMinutes: 22,
    aeoBlock:
      'US agricultural spray drones treated 16.4 million acres in 2025, up 58.7% year over year, with 1,710 FAA-certificated Part 137 unmanned aircraft operators flying nationwide as of September 2025. The average per-acre price fell to $13 from $21 in 2024 as new operators entered the market, while peer-reviewed studies show drone spraying cuts pesticide use 46 to 75% and operator chemical exposure 90 to 99% versus ground equipment. This guide compiles 85+ verified statistics from the American Spray Drone Coalition, FAA, NAAA, USDA, and peer-reviewed research, with conflict notes and methodology caveats so you can cite numbers that hold up.',
    toc: [
      { id: 'what-this-guide-covers', label: 'What this guide covers' },
      { id: 'adoption', label: 'Adoption is real and accelerating' },
      { id: 'market-size', label: 'Market size and why it is messy' },
      { id: 'pricing', label: 'Cost per acre and operator economics' },
      { id: 'where-flying', label: 'By crop and by state' },
      { id: 'made-in-america', label: 'Made in America vs Made in China' },
      { id: 'environmental', label: 'Environmental performance' },
      { id: 'regulation-2030', label: 'Regulation and the road to 2030' },
      { id: 'methodology', label: 'Methodology and caveats' },
      { id: 'mega-table', label: '20 highest-signal statistics' },
      { id: 'sources', label: 'Sources' },
    ],
    quickFacts: [
      { label: '2025 US drone-treated acreage', value: '16.4 million acres (ASDC), +58.7% YoY' },
      { label: '2025 average per-acre price', value: '$13 per acre (down from $21 in 2024)' },
      { label: 'Registered Part 137 UAS operators', value: '1,710 (FAA Safety Briefing, Sept 2025)' },
      { label: 'Pesticide use reduction range', value: '46 to 75% (Nature Scientific Reports, 2025)' },
    ],
    pullQuotes: [
      {
        quote:
          'In 2024 about 9,000 ag drones were sold in the US. Only ~1,200 of them got registered with the FAA in the over-55-pound category. An estimated 14% registration rate.',
        attribution: 'ASDC presentation, NAAA Fall Board Meeting',
      },
      {
        quote:
          'New US ag drone unit sales fell 59% in 2025. Treated acreage grew 59% the same year. Existing fleets are flying harder while the supply pipeline tightens.',
        attribution: 'On the 2025 sales-versus-acreage paradox',
      },
      {
        quote:
          'Drone application reduced operator chemical exposure by 90 to 99% versus handheld backpack application. The applicator never handles the spray cloud directly.',
        attribution: 'ACS Agricultural Science and Technology, 2023',
      },
    ],
    featuredPullQuote: {
      quote:
        'The US is third or fourth globally in deployed fleet. There is room.',
      attribution: 'From: the international context section',
    },
    relatedInternal: [
      { href: '/pricing', label: 'Drone spraying pricing 2026' },
      { href: '/regulations/faa-part-137', label: 'FAA Part 137 for drones' },
      { href: '/regulations/state-licensing', label: 'State pesticide licensing' },
      { href: '/regulations/ndaa-compliance', label: 'NDAA compliance' },
      { href: '/insurance', label: 'Insurance for drone applicators' },
      { href: '/comparisons/drone-vs-ground-rig', label: 'Drone vs ground rig' },
    ],
    faqs: [
      {
        question: 'How many US farmers use spray drones?',
        answer:
          'No primary source supports a single national figure. The cleanest verifiable proxy is Iowa, where the Iowa Farm and Rural Life Poll 2025 found 22% of Iowa farmers used a drone or drone service in 2024. National "X% of farmers use drones" claims circulating online are not traceable to primary research.',
      },
      {
        question: 'How much does drone spraying cost per acre in 2026?',
        answer:
          'The average US drone spray service charged $13 per acre in 2025, down from $21 per acre in 2024 (ASDC 2025 Impact Survey). University of Missouri Extension Guide G1274 puts owner-operator cost at $12.27 per acre and typical custom-hire at around $16 per acre. Pricing varies by region, crop, chemical complexity, and field size.',
      },
      {
        question: 'Are spray drones really better for the environment than ground rigs?',
        answer:
          'Peer-reviewed evidence says yes, with specific numbers. Pesticide use drops 46 to 75% (Nature meta-review, 2025), drift drops 65 to 70% at field boundaries (ScienceDirect vineyard study, 2025), operator chemical exposure drops 90 to 99% (ACS, 2023), water use drops 71.8% (PLOS ONE LCA, 2024), and soil compaction is effectively zero. These are the figures that have stood peer review.',
      },
      {
        question: 'How many FAA Part 137 drone operators are there in the US?',
        answer:
          '1,710 as of September 2025, per FAA Safety Briefing. Up from approximately 1,080 a year earlier, a 58.3% one-year increase. The FAA August 2025 BVLOS NPRM cites over 1,700 cumulative ag UAS operator certificates.',
      },
      {
        question: 'Is the Chinese drone ban going to kill the US ag drone industry?',
        answer:
          'The new-unit data shows pressure but not collapse. New US ag drone unit sales fell from 8,950 (2024) to 3,711 (2025), a 59% one-year drop. At the same time, treated acreage grew 59% as existing fleets flew more hours. The FCC waiver path keeps existing equipment legal through January 1, 2027 for Blue UAS-cleared and qualified domestic models. US-made manufacturers (Hylio, AgEagle, Talos, Raptor Dynamic) are scaling, though Guardian Agriculture shut down in August 2025 after building only 8 aircraft against $100M+ in pre-orders. Watch the FCC and BIS rulings through 2026.',
      },
    ],
    dataset: {
      name: 'US Agricultural Drone Spraying Statistics 2026',
      description:
        'A 20-row reference table of the highest-signal US agricultural drone spraying statistics for 2026, sourced from primary documents (ASDC, FAA, NAAA, peer-reviewed journals, university extension) with explicit year and provider attribution per row.',
      identifier:
        'https://agdronedirectory.com/guides/agricultural-drone-spraying-statistics-2026#mega-table',
      variableMeasured: [
        'US acres treated by spray drones',
        'Year-over-year treated-acreage growth',
        'FAA-certificated Part 137 UAS operators',
        'Average acres per operator per year',
        'Average US drone spray price per acre',
        'Rural economic activity from drone services',
        'Chinese-made share of US ag spray drone sales',
        'New US ag drone unit sales',
        'NAAA operators reporting drone use',
        'US ag retailers offering drone applications',
        'Iowa farmers using drone or drone service',
        'US ag drone market size (Grand View, US-specific)',
        'Pesticide use reduction (peer-reviewed range)',
        'Drift reduction at field boundary',
        'Operator pesticide exposure reduction',
        'Water and fluid use reduction (LCA)',
        'Hylio cumulative drones sold and revenue',
        'Section 44807 spray drone exemption CAGR',
        'China drone-treated cropland',
        'NAAA reported manned-vs-drone unsafe encounters',
      ],
      dateCreated: '2026-04-25',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      keywords: [
        'agricultural drone statistics',
        'spray drone market size',
        'FAA Part 137 count',
        'drone vs ground spraying',
        'ASDC 2025 Impact Survey',
        'peer-reviewed drone spraying environmental data',
      ],
      citation: [
        'American Spray Drone Coalition (ASDC) 2025 Impact Survey, January 2026',
        'FAA Safety Briefing, September/October 2025 issue',
        'FAA BVLOS NPRM, Docket FAA-2025-1908, August 2025',
        '2025 CropLife/Purdue Precision Agriculture Dealership Survey',
        'Iowa State University Extension Iowa Farm and Rural Life Poll 2025',
        'University of Missouri Extension Guide G1274',
        'Nature Scientific Reports meta-review (s41598-025-19473-x), 2025',
        'PLOS ONE LCA study (pone.0323779), 2024',
        'ACS Agricultural Science and Technology exposure study, 2023',
        'Grand View Research US Agriculture Drone Market Report, 2025',
      ],
    },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return guides
    .filter((g) => g.category === category)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getLatestGuides(n: number = 6): Guide[] {
  return [...guides]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, n);
}

export const GUIDE_CATEGORIES: Record<GuideCategory, { label: string; blurb: string }> = {
  'For Farmers': {
    label: 'For Farmers',
    blurb: 'Buyer-side playbooks for hiring, vetting, and working with drone spray operators.',
  },
  Regulations: {
    label: 'Regulations',
    blurb: 'Deep dives on FAA, EPA, and state rules that govern agricultural drone work.',
  },
  Equipment: {
    label: 'Equipment',
    blurb: 'How to choose, compare, and maintain commercial spray drones for US row crops.',
  },
  Funding: {
    label: 'Funding',
    blurb: 'USDA programs, state cost-share, and grants that pay toward drone adoption.',
  },
  Operators: {
    label: 'Operators',
    blurb: 'Business-side guides for drone applicators running a custom spray operation.',
  },
};
