import { ServiceType } from './types';

export interface ServiceDefinition {
  slug: ServiceType;
  name: string;
  nameRo: string;             // English display name (nameRo kept for interface compat)
  description: string;
  longDescription: string;
  icon: string;
  priceMinUsd?: number;
  priceMaxUsd?: number;
  priceUnit: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceDefinition[] = [
  {
    slug: 'spraying',
    name: 'Drone Spraying',
    nameRo: 'Drone Spraying',
    description: 'Apply fungicides, herbicides, insecticides, and defoliants with precision from the air.',
    longDescription:
      'Drone spraying is the most requested agricultural drone service in the United States. Commercial spray drones fly 8 to 15 feet above the crop canopy at 12 to 15 mph, applying fungicides, herbicides, insecticides, defoliants, and foliar nutrients at carrier volumes of 2 to 5 gallons per acre. Rotor downwash forces droplets into the canopy for coverage comparable to ground rigs at one-fifth the water volume. Drones are most valuable when fields are too wet for ground equipment, crops are too tall for tractor-mounted sprayers, or small and irregular fields make airplane application impractical.',
    icon: '💧',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    priceUnit: '$/acre',
    keywords: [
      'drone spraying near me',
      'agricultural drone spraying',
      'drone crop spraying',
      'hire drone to spray fields',
      'drone applicator near me',
    ],
    faqs: [
      {
        question: 'How much does drone spraying cost per acre?',
        answer:
          'Most operators charge $12 to $18 per acre for application only, with the farmer supplying the chemical product. Rates vary by region, field size, terrain, and product type. Small or irregularly shaped fields typically cost more per acre than large, open tracts.',
      },
      {
        question: 'How many acres can a drone spray per hour?',
        answer:
          'A single commercial spray drone covers 20 to 50 acres per hour depending on the application rate, field layout, and drone model. A DJI Agras T50 averages 30 to 40 acres per hour in real-world conditions. Multi-drone fleets multiply throughput proportionally.',
      },
      {
        question: 'What certifications must a drone spray operator hold?',
        answer:
          'Operators must hold an FAA Part 107 Remote Pilot Certificate, an FAA Part 137 Agricultural Aircraft Operator Certificate or valid exemption, and their state\'s pesticide applicator license with an aerial endorsement. They must also carry liability insurance.',
      },
    ],
  },
  {
    slug: 'seeding',
    name: 'Cover Crop Seeding',
    nameRo: 'Cover Crop Seeding',
    description: 'Broadcast cover crop seed into standing corn and soybeans before harvest.',
    longDescription:
      'Drone seeding has become one of the fastest-growing ag drone applications in the Midwest and Mid-Atlantic. Operators broadcast cereal rye, annual ryegrass, crimson clover, oats, radishes, and custom blends into standing corn and soybeans weeks before harvest. This gets seed established earlier, meets NRCS cost-share program deadlines, and avoids soil compaction from driving equipment through mature crops. Fall seeding windows run August through October across the Corn Belt.',
    icon: '🌱',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    priceUnit: '$/acre',
    keywords: [
      'drone cover crop seeding',
      'drone seeding services',
      'aerial cover crop seeding',
      'drone seed broadcasting',
      'cereal rye seeding by drone',
    ],
    faqs: [
      {
        question: 'What cover crops can be seeded by drone?',
        answer:
          'Cereal rye, annual ryegrass, crimson clover, red clover, hairy vetch, oats, radishes, and custom blends work well with drone seeding. Seed must be sized and prepared for aerial broadcast. Large-seeded crops like soybeans are not practical for drone seeding.',
      },
      {
        question: 'When is the best time to seed cover crops by drone?',
        answer:
          'In the Corn Belt, the optimal window is late July through early October. Iowa operators typically seed August through early September. Ohio operators extend into early October. Timing depends on cash crop maturity, expected rainfall, and NRCS cost-share deadlines.',
      },
    ],
  },
  {
    slug: 'mapping',
    name: 'Aerial Mapping',
    nameRo: 'Aerial Mapping',
    description: 'High-resolution orthomosaic maps, NDVI vegetation indexes, and prescription maps.',
    longDescription:
      'Aerial mapping produces high-resolution orthomosaic images stitched from hundreds of overlapping aerial photos. Operators generate NDVI vegetation index maps showing crop vigor variation, multispectral analysis for nutrient and chlorophyll content, elevation models revealing drainage patterns, and prescription maps that feed variable-rate application equipment. Mapping flights deliver data products in GeoTIFF, KML, and shapefile formats for integration with precision ag platforms.',
    icon: '🗺️',
    priceMinUsd: 10,
    priceMaxUsd: 35,
    priceUnit: '$/acre',
    keywords: [
      'drone mapping farm',
      'NDVI drone mapping service',
      'aerial crop imaging',
      'drone field mapping',
      'multispectral drone mapping',
    ],
    faqs: [
      {
        question: 'What does an aerial mapping flight deliver?',
        answer:
          'A standard mapping flight produces an orthomosaic (georeferenced aerial image), NDVI vegetation index map, elevation model, and field boundary files. Advanced flights add multispectral analysis and prescription maps for variable-rate application equipment.',
      },
      {
        question: 'How accurate are drone mapping products?',
        answer:
          'Drones equipped with RTK/PPK GPS achieve 1 to 3 cm horizontal accuracy and 2 to 5 cm vertical accuracy, sufficient for precision ag applications and field documentation. Standard mapping without RTK achieves 3 to 10 cm accuracy.',
      },
    ],
  },
  {
    slug: 'monitoring',
    name: 'Crop Scouting',
    nameRo: 'Crop Scouting',
    description: 'Aerial scouting for pest pressure, disease outbreaks, storm damage, and stand issues.',
    longDescription:
      'Drone scouting covers more ground faster than walking fields on foot. Operators fly systematic patterns to identify pest infestations (corn rootworm, soybean aphids, spider mites), disease outbreaks (tar spot, white mold, head scab), weed escapes (waterhemp, Palmer amaranth), hail and wind damage, herbicide injury, and emergence issues. High-resolution photos with GPS coordinates let you pinpoint problem areas and respond with targeted treatment instead of blanket-spraying entire fields.',
    icon: '👁️',
    priceMinUsd: 8,
    priceMaxUsd: 20,
    priceUnit: '$/acre',
    keywords: [
      'drone crop scouting services',
      'aerial crop scouting',
      'drone field scouting',
      'ag drone scouting',
      'thermal drone crop monitoring',
    ],
    faqs: [
      {
        question: 'How does drone scouting compare to on-foot scouting?',
        answer:
          'A drone covers 200 to 400 acres per hour with full visual coverage. On-foot scouting covers 20 to 50 acres per hour with spot checks. Drones identify problems earlier and across the entire field, not just sample points, catching outbreaks before they spread across the whole operation.',
      },
      {
        question: 'When should I schedule a scouting flight?',
        answer:
          'Early season stand count flights work best at V2 to V4 stage (2 to 3 weeks after planting). Mid-season health assessments target V8 to VT for corn and R2 to R3 for soybeans. Pre-harvest flights document conditions for insurance and record-keeping.',
      },
    ],
  },
  {
    slug: 'training',
    name: 'Pilot Training',
    nameRo: 'Pilot Training',
    description: 'FAA Part 107 and Part 137 training for agricultural drone operators.',
    longDescription:
      'Ag drone pilot training programs cover FAA Part 107 exam preparation, Part 137 agricultural operator certification, hands-on flight training with commercial spray drones, mission planning, equipment calibration, state pesticide applicator license requirements, and insurance and liability basics. Programs range from weekend courses for students with existing Part 107 certificates to full multi-week programs for new pilots.',
    icon: '🎓',
    priceMinUsd: 500,
    priceMaxUsd: 3500,
    priceUnit: '$/course',
    keywords: [
      'FAA Part 137 drone training',
      'ag drone pilot training',
      'drone spraying certification',
      'agricultural drone operator course',
      'Part 107 agricultural drone',
    ],
    faqs: [
      {
        question: 'What certifications do I need to spray with a drone?',
        answer:
          'You need an FAA Part 107 Remote Pilot Certificate, an FAA Part 137 Agricultural Aircraft Operator Certificate, and your state\'s pesticide applicator license with an aerial endorsement. Training programs prepare you for all three requirements.',
      },
      {
        question: 'How long does it take to get certified?',
        answer:
          'Part 107 exam preparation takes 2 to 4 weeks of self-study. The Part 137 process takes 30 to 90 days after application. State pesticide applicator exam schedules vary. Most training programs cover all requirements in one 3 to 5 day course.',
      },
    ],
  },
  {
    slug: 'rental',
    name: 'Equipment Rental',
    nameRo: 'Equipment Rental',
    description: 'Rent commercial spray drones with or without an operator for your season.',
    longDescription:
      'Equipment rental is an option for farmers and custom operators who want to use drone spraying without the upfront capital investment. Drones are available with or without an operator for daily or seasonal contracts. Rental includes equipment insurance, and technical support. This model works well for operators expanding their fleet for peak season or farmers who want to handle their own applications.',
    icon: '🚁',
    priceMinUsd: 400,
    priceMaxUsd: 1200,
    priceUnit: '$/day',
    keywords: [
      'drone rental agriculture',
      'spray drone rental',
      'agricultural drone rental',
      'DJI Agras rental',
      'rent drone to spray fields',
    ],
    faqs: [
      {
        question: 'What does a drone rental typically cost per day?',
        answer:
          'Daily rental rates for commercial spray drones range from $400 to $1,200 per day, depending on the drone model and whether an operator is included. Seasonal contracts typically run $15,000 to $40,000 for a full spray drone with operator support.',
      },
    ],
  },
  {
    slug: 'spreading',
    name: 'Fertilizer Application',
    nameRo: 'Fertilizer Application',
    description: 'Apply granular and liquid fertilizers with precision from the air.',
    longDescription:
      'Fertilizer application by drone delivers granular nutrients (urea, DAP, MAP) and foliar liquids uniformly across fields. The centrifugal spreading system covers a swath of 8 to 16 feet with consistent distribution. Ideal for variable-rate topdressing, late-season foliar applications, and areas with limited ground equipment access. Same drones used for spraying are fitted with spreader attachments for fertilizer applications.',
    icon: '🌿',
    priceMinUsd: 12,
    priceMaxUsd: 20,
    priceUnit: '$/acre',
    keywords: [
      'drone fertilizer application',
      'aerial fertilizer spreading',
      'drone topdressing',
      'urea spreading drone',
      'foliar application drone',
    ],
    faqs: [
      {
        question: 'What fertilizers can be applied by drone?',
        answer:
          'Liquid foliar fertilizers, granular urea, DAP, MAP, and micronutrient blends with particle sizes of 1 to 4 mm. Dry fertilizers must be free-flowing and compatible with centrifugal spreader systems. Custom blends and biological products also work well.',
      },
    ],
  },
  {
    slug: 'consultancy',
    name: 'Ag Consulting',
    nameRo: 'Ag Consulting',
    description: 'Precision agriculture consulting, NDVI data analysis, and spray program design.',
    longDescription:
      'Agricultural drone consulting helps farmers and agribusinesses develop drone spray programs, interpret aerial data, select equipment, and build the business case for drone integration. Consultants review NDVI and multispectral data, design variable-rate prescription maps, advise on product selection and carrier volumes, and help operators start or grow commercial drone businesses.',
    icon: '📋',
    priceMinUsd: 200,
    priceMaxUsd: 2500,
    priceUnit: '$/session',
    keywords: [
      'precision agriculture consulting',
      'drone agriculture consultant',
      'NDVI data analysis',
      'spray drone business consulting',
      'variable rate prescription maps',
    ],
    faqs: [
      {
        question: 'What does an ag drone consulting session cover?',
        answer:
          'Consulting sessions typically cover equipment selection, FAA certification requirements, state licensing, insurance, business model development, spray program design, and data interpretation from aerial imaging. Rates range from $200 per hour for specific questions to $2,500 for full program development.',
      },
    ],
  },
  {
    slug: 'emergency',
    name: 'Emergency Response',
    nameRo: 'Emergency Response',
    description: '24- to 48-hour emergency response for pest outbreaks, disease flares, and storm damage.',
    longDescription:
      'Emergency response drone service mobilizes within 24 to 48 hours for critical situations: pest outbreaks crossing economic thresholds, disease flares requiring immediate intervention, fields too wet for any other equipment, or post-storm damage documentation. Mobile drone crews travel directly to your farm and complete large-area applications in hours rather than days. Premium rates apply for expedited scheduling and after-hours deployment.',
    icon: '🚨',
    priceMinUsd: 18,
    priceMaxUsd: 30,
    priceUnit: '$/acre',
    keywords: [
      'emergency drone spraying',
      'urgent drone crop application',
      'same day drone spraying',
      'wet field emergency drone',
      'pest outbreak drone spraying',
    ],
    faqs: [
      {
        question: 'How fast can an emergency drone crew respond?',
        answer:
          'Emergency-certified operators respond within 24 to 48 hours for critical situations. During peak season (July–August for corn fungicide), even emergency slots book 5 to 10 days ahead. Contact operators before your situation becomes critical to get on their priority list.',
      },
      {
        question: 'How much extra does emergency drone service cost?',
        answer:
          'Emergency rates are typically 30 to 70% above standard per-acre rates, depending on distance, urgency, and timing. A standard $14/acre job may run $18 to $22/acre for same-week scheduling at the height of spray season.',
      },
    ],
  },
  {
    slug: 'sales',
    name: 'Equipment Sales',
    nameRo: 'Equipment Sales',
    description: 'Buy commercial ag spray drones from authorized DJI, Hylio, and XAG dealers.',
    longDescription:
      'Authorized ag drone dealers sell DJI Agras, Hylio AG-272, XAG P100, and other commercial spray platforms. Purchases include warranty, pilot training support, and service center access. Some dealers offer financing and trade-in programs. When choosing a dealer, look for certified technicians, spare parts inventory, and demonstrated experience with ag spray applications in your region.',
    icon: '🛒',
    priceMinUsd: 15000,
    priceMaxUsd: 80000,
    priceUnit: '$/unit',
    keywords: [
      'buy ag spray drone',
      'DJI Agras dealer',
      'Hylio AG-272 for sale',
      'agricultural drone for sale',
      'commercial spray drone purchase',
    ],
    faqs: [
      {
        question: 'What do commercial ag spray drones cost in 2026?',
        answer:
          'The DJI Agras T50 lists at approximately $17,999. The Hylio AG-272 (US-made, NDAA-compliant) lists around $56,000. The DJI Agras T100 (heavy-duty, 100L tank) costs $35,000 to $45,000. Prices exclude batteries, chargers, and accessories. University of Missouri Extension research shows break-even at approximately 980 acres per year for T50 ownership.',
      },
    ],
  },
];

export const serviceBySlug: Record<string, ServiceDefinition> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return serviceBySlug[slug];
}
