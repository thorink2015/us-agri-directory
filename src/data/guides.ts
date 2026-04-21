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
  /** Related internal pages shown in the footer */
  relatedInternal?: { href: string; label: string }[];
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
