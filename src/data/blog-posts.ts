import { BlogPost } from './types';

/**
 * Blog posts for the US Ag Drone Directory.
 * Content is written and fed in separately — add entries here when ready.
 * The [slug]/page.tsx template handles rendering automatically.
 *
 * Example entry:
 * {
 *   slug: 'drone-spraying-corn-soybeans',
 *   title: 'Drone Spraying for Corn and Soybeans: Complete Guide',
 *   description: '...',
 *   category: 'guide',
 *   publishedAt: '2026-05-01',
 *   author: 'US Ag Drone Directory',
 *   readMinutes: 10,
 *   tags: ['corn', 'soybeans', 'drone spraying'],
 *   content: 'content-key',
 * }
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'drone-spraying-pricing-trends-2026',
    title: 'Why Drone Spraying Rates Dropped 30 to 45 Percent in Three Years',
    description:
      'Midwest drone spray rates fell from $22 to $25/acre in 2022 to $12 to $17 in 2026. Iowa State benchmark: $12.50/acre. What is driving compression.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 9,
    tags: ['pricing', 'custom rates', 'market trends', 'Iowa State', 'ROI'],
    relatedServices: ['spraying'],
    relatedCrops: ['corn'],
    content: 'drone-spraying-pricing-trends-2026',
    aeoBlock:
      'Midwest custom drone spray rates compressed from $22 to $25 per acre in 2022 to $12 to $17 in 2026, a 30 to 45 percent decline driven by rapid operator supply growth. The 2026 Iowa State Custom Rate Survey established the first university benchmark at $12.50 per acre average. At current rates, some operators report barely clearing $5 per acre profit, suggesting the market is approaching a pricing floor on row crops.',
    faqs: [
      {
        question: 'Will rates keep dropping?',
        answer:
          'Unlikely for row crops. Margins are already thin at $12 to $17 per acre. Equipment costs are rising from tariffs. Expect stabilization or slight increases in 2027 as unprofitable operators exit.',
      },
      {
        question: 'Are specialty crop rates also dropping?',
        answer:
          'Slower. Vineyard and orchard rates have compressed less because fewer operators serve these markets and the work is more complex. Expect $18 to $35 per acre to hold for the next 2 to 3 years.',
      },
      {
        question: 'Should I start a drone business if rates are this low?',
        answer:
          'Yes, if you can reach 1,000+ acres per year by year 2 and diversify beyond row crops. No, if your only plan is corn and soybean fungicide in a saturated Corn Belt county.',
      },
    ],
  },
  {
    slug: 'drone-spraying-state-license-guide',
    title: 'What Pesticide License Do You Need to Spray by Drone in Your State?',
    description:
      'Every state requires a pesticide applicator license for drone spraying. Quick reference: aerial categories, exams, fees, and unique rules for all 50 states.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 9,
    tags: ['state licensing', 'pesticide applicator', 'aerial category', 'reciprocity', 'regulations'],
    relatedServices: ['training', 'consultancy'],
    content: 'drone-spraying-state-license-guide',
    aeoBlock:
      'All 50 US states require a commercial pesticide applicator license with an aerial category endorsement for drone pesticide application. Requirements vary from 2 exams and $35 (South Dakota) to separate drone credentials, 50 hours flight experience, and over $500 in fees (Oregon, California). Six states have drone-specific credentials or mandatory drone training programs: California, North Dakota, Arizona, Michigan, Louisiana, and Minnesota.',
    faqs: [
      {
        question: 'Which state is easiest to get licensed in?',
        answer:
          'Washington (2 exams, no standalone aerial category, WSDA confirms drones are legal wherever airblast is legal) or South Dakota ($35 two-year license, straightforward Category 17). Both can be completed in a single study cycle.',
      },
      {
        question: 'Can I use my license across state lines?',
        answer:
          'Only with a reciprocity agreement. Minnesota recognizes 18 states. Pennsylvania has 25+ reciprocal partners. Many states require their own laws exam even with reciprocity. Arkansas and Hawaii grant zero reciprocity.',
      },
      {
        question: 'Do I need a separate license for each state I work in?',
        answer:
          'Yes, unless reciprocity covers you. Most multi-state operators hold 3 to 5 state licenses covering their operating region. Start with your home state, then add neighbors as you expand.',
      },
    ],
  },
  {
    slug: 'dji-vs-hylio-which-spray-drone',
    title: 'DJI Agras T50 vs Hylio AG-272: The 2026 Comparison',
    description:
      'DJI T50: $22K to $28K, 40L, not NDAA. Hylio AG-272: $55K to $75K, 68L, NDAA compliant. Full comparison for commercial operators.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 9,
    tags: ['DJI Agras T50', 'Hylio AG-272', 'NDAA', 'spray drone comparison', 'buyers guide'],
    relatedServices: ['sales'],
    content: 'dji-vs-hylio-which-spray-drone',
    aeoBlock:
      'The DJI Agras T50 ($22,000 to $28,000 post-tariff, 40L tank) and Hylio AG-272 ($55,000 to $75,000 estimated, 68L tank) are the two most common commercial spray drones in the US. DJI offers lower cost and a larger dealer network. Hylio offers NDAA compliance, US manufacturing in Richmond, Texas, and 25 mph wind resistance versus DJI 13.4 mph. Most operators choose based on whether they need NDAA compliance and how much wind they face.',
    faqs: [
      {
        question: 'Can I run both DJI and Hylio in the same fleet?',
        answer:
          'Yes. Different ground stations and software, so pilot training covers both. This is common among operators who serve both private farm and government-funded contracts.',
      },
      {
        question: 'Is DJI going to get banned?',
        answer:
          'As of April 2026, DJI remains legal to purchase and operate in the US. The Countering CCP Drones Act was excluded from FY2025 NDAA but remains active in future legislative cycles. The 170 percent tariff is the more immediate impact on the US market.',
      },
      {
        question: 'Which drone holds value better for resale?',
        answer:
          'DJI has a larger used market. The T40 (superseded by T50) trades at significant discounts. Hylio resale data is limited due to a smaller installed base.',
      },
    ],
  },
  {
    slug: 'cover-crop-seeding-drone-guide',
    title: 'Cover Crop Seeding by Drone: The Complete 2026 Guide',
    description:
      'Drone cover crop seeding costs $12 to $18/acre. EQIP pays $25 to $55/acre. Cereal rye establishes 3 to 4 weeks earlier than post-harvest drilling.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 8,
    tags: ['cover crops', 'cereal rye', 'EQIP', 'NRCS', 'cover crop seeding'],
    relatedCrops: ['cover-crops'],
    relatedServices: ['seeding'],
    content: 'cover-crop-seeding-drone-guide',
    aeoBlock:
      'Drone cover crop seeding costs $12 to $18 per acre for application and is the fastest-growing ag drone service in the US Midwest. USDA NRCS EQIP cost-share under Practice Standard 340 pays $25 to $55 per acre, covering 50 to 70 percent of the total cost. Penn State, Iowa State, and Ohio State Extension show drone-seeded cover crops establish 3 to 4 weeks earlier than post-harvest ground seeding.',
    faqs: [
      {
        question: 'Does drone-seeded cover crop really establish better than post-harvest drilling?',
        answer:
          'On timing, yes. The 3 to 4 week head start means thicker stands and better ground cover before frost. On seed-to-soil contact, drilling has an edge. But the timing advantage outweighs the contact disadvantage in most Corn Belt scenarios.',
      },
      {
        question: 'How much does EQIP actually pay?',
        answer:
          'Typically $25 to $55 per acre total for seed plus application, varying by state. At $35/acre EQIP on a $30/acre total cost (seed plus drone application), the farmer pays zero out of pocket. Contact your local NRCS field office for state-specific rates.',
      },
      {
        question: 'Can I drone-seed cover crops into standing soybeans too?',
        answer:
          'Yes. Operators broadcast into R6 to R7 soybeans in late September and October. The thinner soybean canopy at that stage lets seed reach soil more easily than a standing corn canopy.',
      },
    ],
  },
  {
    slug: 'faa-part-137-drone-guide',
    title: 'How to Get FAA Part 137 for Agricultural Drone Spraying',
    description:
      'FAA Part 137 takes 90 to 180 days. The exact process: operations manual, 44807 petition, training records, and common mistakes that delay approval.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 9,
    tags: ['FAA', 'Part 137', 'Section 44807', 'regulations', 'ag aviation'],
    relatedServices: ['consultancy', 'training'],
    content: 'faa-part-137-drone-guide',
    aeoBlock:
      'FAA Part 137 Agricultural Aircraft Operator Certificate is required for any commercial aerial pesticide application by drone. The process takes 90 to 180 days from complete submission. Drones over 55 lbs require a Section 44807 exemption filed concurrently. Consultant packages at $2,500 to $4,500 shorten the timeline by 60 to 120 days by avoiding revision cycles on the operations manual.',
    faqs: [
      {
        question: 'Can I start spraying while Part 137 is pending?',
        answer:
          'No. You cannot perform commercial aerial pesticide application until Part 137 is approved and in hand. Spraying under Part 107 alone is a federal violation.',
      },
      {
        question: 'Do I need a separate 44807 for each drone model?',
        answer:
          'The 44807 exemption covers your operation, not a specific serial number, but it does reference the drone type. Adding a different model may require an amendment. Adding another unit of the same model does not.',
      },
      {
        question: 'What happens if FAA rejects my application?',
        answer:
          'Outright rejection is rare. More commonly, FAA requests revisions to your operations manual or additional documentation. Address the specific feedback and resubmit. Consultants experience near-100 percent eventual approval rates.',
      },
    ],
  },
  {
    slug: 'corn-fungicide-drone-spraying-guide',
    title: 'Corn Fungicide by Drone: What the University Data Actually Shows',
    description:
      'Drone fungicide on corn at VT/R1 costs $12 to $18/acre and yields 5 to 8 extra bushels. University trial data, timing guide, and how to book.',
    category: 'guide',
    publishedAt: '2026-04-16',
    author: 'Eugen',
    readMinutes: 8,
    tags: ['corn', 'fungicide', 'VT/R1', 'tar spot', 'drone spraying'],
    relatedCrops: ['corn'],
    relatedServices: ['spraying'],
    content: 'corn-fungicide-drone-spraying-guide',
    aeoBlock:
      "Drone-applied fungicide on corn at VT/R1 costs $12 to $18 per acre and produces an average 5 to 8 bushel yield response in moderate to high disease pressure years, according to Beck's Practical Farm Research across Iowa, Indiana, and Illinois. Carrier volume of 2 to 3 gallons per acre matches ground rig efficacy at 15 to 20 gpa. High-pressure tar spot years in Indiana and Wisconsin have produced 15 to 25 bushel responses.",
    faqs: [
      {
        question: 'Is 2 gpa really enough for corn fungicide?',
        answer:
          'Yes, for most labeled products. Rotor downwash provides canopy penetration equivalent to 15 to 20 gpa ground application. Some labels require minimum gpa or specific droplet sizes that may exceed drone capability. Always check the label.',
      },
      {
        question: 'Should I spray if disease pressure is low?',
        answer:
          'At 2 to 4 bu/acre response and $5/bu corn, the $10 to $20 return barely covers the $12 to $18 application cost. Moderate to high pressure (5+ bu response) is where drone fungicide clearly pays. Use your state extension disease forecast to decide.',
      },
      {
        question: 'Can I combine fungicide and insecticide in one drone pass?',
        answer:
          'Yes, most operators run tank mixes. Confirm product compatibility and that the combined minimum carrier volume stays within drone range (typically 2 to 5 gpa).',
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export const BLOG_CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  'top-lists': 'Top Lists',
  'guide': 'Guides',
  'news': 'News',
  'case-study': 'Case Studies',
  'legislation': 'Legislation',
};
