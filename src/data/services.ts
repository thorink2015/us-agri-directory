import { ServiceType } from './types';

export interface ServiceDefinition {
  slug: ServiceType;
  name: string;
  nameRo: string;             // English display name (nameRo kept for interface compat)
  description: string;
  longDescription: string;
  aeoBlock: string;           // 2-3 sentence definitive answer for AI engines, contains a number
  icon: string;
  priceMinUsd?: number;
  priceMaxUsd?: number;
  priceUnit: string;
  keywords: string[];
  authorityLinks: { label: string; url: string }[];  // external authority links (FAA, USDA, EPA, .edu)
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
    aeoBlock:
      'Agricultural drone spraying costs $12 to $18 per acre for application only, with the farmer supplying the chemical product. A single commercial spray drone covers 20 to 40 acres per hour at 2 to 5 gallons per acre, completing a 500-acre corn fungicide job in one day with a two-person crew. Operators must hold an FAA Part 107 Remote Pilot Certificate, an FAA Part 137 Agricultural Aircraft Operator Certificate, and their state\'s pesticide applicator license with an aerial endorsement.',
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
    authorityLinks: [
      { label: 'FAA Part 107 Remote Pilot Certificate', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
      { label: 'FAA Part 137 Agricultural Aircraft Operations', url: 'https://www.faa.gov/uas/advanced_operations/agricultural' },
      { label: 'EPA Pesticide Label Compliance (FIFRA)', url: 'https://www.epa.gov/pesticide-labels' },
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
    aeoBlock:
      'Drone cover crop seeding costs $12 to $18 per acre and is the fastest-growing ag drone service in the US Midwest. The optimal window in the Corn Belt is late July through early October, getting cereal rye or crimson clover established 3 to 4 weeks earlier than post-harvest ground seeding. Aerial seeding qualifies for USDA NRCS Cover Crop Practice Standard 340 cost-share payments under the EQIP program.',
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
    authorityLinks: [
      { label: 'USDA NRCS Cover Crop Practice Standard 340', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-340' },
      { label: 'USDA EQIP Program Overview', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
      { label: 'Penn State Extension: Aerial Cover Crop Seeding', url: 'https://extension.psu.edu/cover-crops' },
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
    aeoBlock:
      'Drone aerial mapping costs $10 to $35 per acre and delivers RTK-accurate orthomosaic images, NDVI vegetation index maps, and prescription files within 24 to 48 hours of the flight. A mapping drone covers 300 to 500 acres per day at 1 to 3 cm ground sampling distance. Prescription maps integrate directly with John Deere Operations Center, Climate FieldView, and variable-rate application equipment.',
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
    authorityLinks: [
      { label: 'FAA LAANC Low Altitude Authorization', url: 'https://www.faa.gov/uas/programs_partnerships/data_exchange' },
      { label: 'USDA Precision Agriculture Resources', url: 'https://www.usda.gov/topics/farming/precision-agriculture' },
      { label: 'Purdue Extension: Drone Mapping for Agriculture', url: 'https://www.extension.purdue.edu/agriculture' },
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
    aeoBlock:
      'Drone crop scouting covers 200 to 400 acres per hour with full field visual coverage, compared to 20 to 50 acres per hour for on-foot scouts. Early detection of tar spot, white mold, or western corn rootworm reduces pesticide spend by targeting treatment to affected zones instead of blanket-spraying entire fields. Most drone scouts deliver geotagged photo reports with GPS coordinates within 24 hours of the flight.',
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
    authorityLinks: [
      { label: 'Purdue Extension: Corn and Soybean Scouting', url: 'https://extension.entm.purdue.edu/fieldcropsipm' },
      { label: 'University of Illinois Extension: Crop Scouting', url: 'https://extension.illinois.edu/crops' },
      { label: 'USDA NASS Crop Progress Reports', url: 'https://www.nass.usda.gov/Publications/National_Crop_Progress' },
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
    aeoBlock:
      'Becoming a licensed agricultural drone spray operator requires three credentials: an FAA Part 107 Remote Pilot Certificate (written exam, $175 fee, 70% pass rate), an FAA Part 137 Agricultural Aircraft Operator Certificate (free, 30 to 90-day approval process), and a state pesticide applicator license with an aerial endorsement. Full training programs covering all three requirements typically cost $500 to $3,500 and run 3 to 5 days.',
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
    authorityLinks: [
      { label: 'FAA Part 107 Knowledge Test Information', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
      { label: 'FAA Part 137 Application Process', url: 'https://www.faa.gov/uas/advanced_operations/agricultural' },
      { label: 'DJI Agriculture Training Programs', url: 'https://ag.dji.com/training' },
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
    aeoBlock:
      'Agricultural spray drone rental rates range from $400 to $1,200 per day, depending on the drone model and whether an operator is included. Seasonal contracts for a DJI Agras T50-class drone with operator support typically run $15,000 to $40,000 for a full spray season. Equipment rental is a practical option for operators expanding fleet capacity during peak season without the capital cost of purchasing.',
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
    authorityLinks: [
      { label: 'FAA Drone Operations in Agriculture', url: 'https://www.faa.gov/uas/advanced_operations/agricultural' },
      { label: 'USDA Farm Service Agency Equipment Financing', url: 'https://www.fsa.usda.gov/programs-and-services/farm-loan-programs' },
      { label: 'DJI Agras Authorized Dealers', url: 'https://ag.dji.com/agras-t50' },
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
    aeoBlock:
      'Drone fertilizer application costs $12 to $20 per acre and covers up to 40 acres per hour with granular urea, DAP, or foliar nutrient products. The centrifugal spreading system distributes particles across an 8 to 16-foot swath with over 90% uniformity. Variable-rate prescription spreading reduces nitrogen application by 10 to 25% on fields with high yield variability, improving both return on investment and Clean Water Act compliance.',
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
    authorityLinks: [
      { label: 'EPA Fertilizer and Nutrient Management', url: 'https://www.epa.gov/nutrient-policy-data/nutrient-management' },
      { label: 'USDA NRCS Nutrient Management Practice Standard 590', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/nutrient-management-590' },
      { label: 'University of Nebraska Extension: Nitrogen Management', url: 'https://cropwatch.unl.edu/nitrogen' },
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
    aeoBlock:
      'Agricultural drone consulting services cost $200 to $2,500 per engagement, depending on scope. A typical consulting engagement includes equipment selection, FAA certification roadmap, state licensing requirements, spray program design, and variable-rate prescription map development. Farmers who work with a certified consultant before purchasing equipment report 20 to 40% faster ROI breakeven compared to self-guided purchases.',
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
    authorityLinks: [
      { label: 'USDA Precision Agriculture Initiative', url: 'https://www.usda.gov/topics/farming/precision-agriculture' },
      { label: 'American Society of Agronomy: Precision Ag', url: 'https://www.agronomy.org/learning/precision-agriculture' },
      { label: 'FAA UAS Integration Office', url: 'https://www.faa.gov/uas' },
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
    aeoBlock:
      'Emergency agricultural drone services mobilize within 24 to 48 hours and typically cost $18 to $30 per acre, a 30 to 70% premium over standard rates. A mobile two-drone crew can treat 400 to 600 acres in a single long day, reaching fields that are too wet for any ground equipment. Booking an operator\'s priority list before peak season in July and August reduces response time to 24 hours even during the busiest weeks.',
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
    authorityLinks: [
      { label: 'EPA Emergency Exemption Process (Section 18)', url: 'https://www.epa.gov/pesticide-registration/emergency-exemptions' },
      { label: 'USDA APHIS Pest Emergency Management', url: 'https://www.aphis.usda.gov/plant-pests-diseases' },
      { label: 'Iowa State Extension: Crop Pest Thresholds', url: 'https://crops.extension.iastate.edu' },
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
    aeoBlock:
      'Commercial agricultural spray drones range from $10,000 to $80,000 depending on tank size and model. The DJI Agras T50 (13.2-gallon tank) lists at approximately $18,000 to $22,000, while the NDAA-compliant Hylio AG-272 (7.2-gallon, US-manufactured) lists around $27,500. USDA EQIP Practice Code 595 can cover 40 to 90% of purchase cost for eligible farmers, reducing effective out-of-pocket cost to under $10,000 for a T50-class drone.',
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
    authorityLinks: [
      { label: 'USDA EQIP Precision Agriculture Cost-Share (Code 595)', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
      { label: 'FAA Drone Registration Requirements', url: 'https://www.faa.gov/uas/getting_started/register_drone' },
      { label: 'DJI Agras Agricultural Drone Series', url: 'https://ag.dji.com' },
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
