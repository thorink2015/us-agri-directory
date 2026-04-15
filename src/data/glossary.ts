export interface GlossaryTerm {
  term: string;
  slug: string;        // anchor id
  category: 'regulatory' | 'hardware' | 'application' | 'agronomic' | 'business';
  definition: string;  // 1-3 sentences, plain English
  relatedTerms?: string[]; // slugs of related terms
  relatedLink?: { label: string; href: string }; // internal link to related page
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─── A ───────────────────────────────────────────────────────────────────
  {
    term: 'AAO (Agricultural Aircraft Operator)',
    slug: 'aao',
    category: 'regulatory',
    definition:
      'An FAA-certificated entity authorized to dispense chemicals, seed, or other agricultural products from aircraft under 14 CFR Part 137. Any US commercial drone spraying business must hold a Part 137 AAO certificate in addition to a Part 107 Remote Pilot Certificate.',
    relatedTerms: ['part-137', 'part-107'],
  },
  {
    term: 'AGL (Above Ground Level)',
    slug: 'agl',
    category: 'application',
    definition:
      'Altitude measured from the ground directly below the aircraft, not from sea level. Agricultural spray drones typically operate at 6–15 feet AGL to minimize drift while maintaining coverage.',
  },
  {
    term: 'Airspace Authorization',
    slug: 'airspace-authorization',
    category: 'regulatory',
    definition:
      'FAA permission to fly in controlled airspace (Class B, C, D, or E surface area). Obtained through LAANC for most routine operations, or via DroneZone waiver for more complex requests.',
    relatedTerms: ['laanc'],
  },
  {
    term: 'Application Rate',
    slug: 'application-rate',
    category: 'application',
    definition:
      'The volume of spray mixture applied per acre, typically expressed in gallons per acre (gpa). Agricultural drones usually apply 2–5 gpa, compared to 10–20 gpa for ground sprayers.',
    relatedTerms: ['gpa', 'ulv'],
  },
  {
    term: 'Applicator License',
    slug: 'applicator-license',
    category: 'regulatory',
    definition:
      'State-issued credential required to apply restricted-use pesticides. Agricultural drone operators typically need a commercial applicator license with an aerial or drone category endorsement in each state where they operate.',
  },

  // ─── B ───────────────────────────────────────────────────────────────────
  {
    term: 'Boom Width',
    slug: 'boom-width',
    category: 'hardware',
    definition:
      'The effective spray swath produced by the drone\'s nozzles, typically 20–33 feet for modern agricultural drones. Wider boom width increases coverage rate but requires higher drone hover altitude to achieve even distribution.',
    relatedTerms: ['swath'],
  },
  {
    term: 'BVLOS (Beyond Visual Line of Sight)',
    slug: 'bvlos',
    category: 'regulatory',
    definition:
      'Drone operation where the pilot or visual observer cannot see the aircraft with unaided vision. BVLOS requires a Part 107 waiver from the FAA and is rarely granted for spray operations as of 2026.',
    relatedTerms: ['vlos', 'part-107'],
  },

  // ─── C ───────────────────────────────────────────────────────────────────
  {
    term: 'Carrier Volume',
    slug: 'carrier-volume',
    category: 'application',
    definition:
      'The water (or other liquid) used to dilute and deliver the active ingredient, measured in gallons per acre. Drone operators minimize carrier volume (2–5 gpa) to reduce refill trips while maintaining efficacy.',
    relatedTerms: ['gpa', 'application-rate'],
  },
  {
    term: 'Coverage Rate',
    slug: 'coverage-rate',
    category: 'application',
    definition:
      'The number of acres a drone can spray per hour of flight time, typically 20–40 acres per hour for commercial agricultural drones. Actual daily output depends on battery swaps, tank refills, and turnaround time.',
    relatedTerms: ['swath'],
  },
  {
    term: 'COA (Certificate of Authorization)',
    slug: 'coa',
    category: 'regulatory',
    definition:
      'An older FAA authorization for public aircraft operations, sometimes required for government or university spray research. Most commercial operators use Part 107 + Part 137 instead of a COA.',
  },

  // ─── D ───────────────────────────────────────────────────────────────────
  {
    term: 'Drift',
    slug: 'drift',
    category: 'application',
    definition:
      'The off-target movement of spray droplets caused by wind or evaporation. Agricultural drone operators manage drift by flying in winds under 10 mph, using larger droplet nozzles, and maintaining buffer zones from sensitive areas.',
    relatedTerms: ['droplet-size'],
  },
  {
    term: 'Droplet Size',
    slug: 'droplet-size',
    category: 'application',
    definition:
      'The diameter of spray droplets, measured in microns. Drone applications typically target medium to coarse droplets (250–400 microns) to balance canopy penetration against drift risk.',
    relatedTerms: ['drift'],
  },
  {
    term: 'Down Wash',
    slug: 'down-wash',
    category: 'application',
    definition:
      'The downward airflow generated by a drone\'s rotors that pushes spray droplets into the crop canopy. Rotor downwash improves coverage uniformity on leaf undersides and is a key advantage over fixed-wing aerial application.',
  },

  // ─── E ───────────────────────────────────────────────────────────────────
  {
    term: 'EPA FIFRA',
    slug: 'epa-fifra',
    category: 'regulatory',
    definition:
      'The Federal Insecticide, Fungicide, and Rodenticide Act, administered by the US Environmental Protection Agency. FIFRA requires that pesticide labels be followed exactly, including any aerial application restrictions specific to drone use.',
    relatedTerms: ['label-rate'],
  },
  {
    term: 'EQIP (Environmental Quality Incentives Program)',
    slug: 'eqip',
    category: 'business',
    definition:
      'A USDA NRCS cost-share program that reimburses farmers for conservation practices, including drone-applied cover crop seeding and precision pesticide application. Typical payments cover 50–75% of eligible costs.',
  },

  // ─── F ───────────────────────────────────────────────────────────────────
  {
    term: 'FAA (Federal Aviation Administration)',
    slug: 'faa',
    category: 'regulatory',
    definition:
      'The US government agency that regulates all civil aviation, including commercial drone operations. Agricultural drone operators are primarily governed by FAA rules under 14 CFR Part 107 and Part 137.',
    relatedTerms: ['part-107', 'part-137'],
  },
  {
    term: 'FIFRA',
    slug: 'fifra',
    category: 'regulatory',
    definition:
      'The Federal Insecticide, Fungicide, and Rodenticide Act — the primary federal law governing pesticide use in the US. FIFRA requires applicators to follow every restriction on the pesticide label, including aerial-specific limits.',
    relatedTerms: ['epa-fifra', 'label-rate'],
  },
  {
    term: 'Flight Controller',
    slug: 'flight-controller',
    category: 'hardware',
    definition:
      'The onboard computer that stabilizes the drone and executes flight commands. Modern ag drones use integrated flight controllers with RTK GPS, obstacle avoidance radar, and automated spray-mission execution.',
    relatedTerms: ['rtk'],
  },
  {
    term: 'FSA (Farm Service Agency)',
    slug: 'fsa',
    category: 'business',
    definition:
      'The USDA agency that administers farm loan programs, commodity payments, and disaster assistance. Some operators accept FSA-guaranteed loans for equipment purchases.',
  },

  // ─── G ───────────────────────────────────────────────────────────────────
  {
    term: 'GPA (Gallons Per Acre)',
    slug: 'gpa',
    category: 'application',
    definition:
      'The standard US measure of spray carrier volume. Agricultural drones typically operate at 2–5 gpa; ground rigs use 10–20 gpa; airplanes often use 1–3 gpa.',
    relatedTerms: ['carrier-volume', 'application-rate'],
  },
  {
    term: 'Ground Rig',
    slug: 'ground-rig',
    category: 'application',
    definition:
      'A tractor-mounted or self-propelled sprayer that applies chemicals from the ground. Drones compete with ground rigs in wet-field and tall-crop conditions where tractors cannot operate without damage.',
  },

  // ─── H ───────────────────────────────────────────────────────────────────
  {
    term: 'Hopper',
    slug: 'hopper',
    category: 'hardware',
    definition:
      'The solid-material container on a drone used for spreading dry products like cover crop seed, fertilizer granules, or bait. Capacity typically ranges from 50 to 165 pounds on commercial ag drones.',
    relatedTerms: ['spreader'],
  },

  // ─── I ───────────────────────────────────────────────────────────────────
  {
    term: 'IPM (Integrated Pest Management)',
    slug: 'ipm',
    category: 'agronomic',
    definition:
      'A science-based approach that combines biological, cultural, and chemical tactics to manage pests at economically acceptable levels. Drone scouting and spot spraying support IPM by enabling site-specific applications only where thresholds are exceeded.',
  },

  // ─── L ───────────────────────────────────────────────────────────────────
  {
    term: 'LAANC (Low Altitude Authorization and Notification Capability)',
    slug: 'laanc',
    category: 'regulatory',
    definition:
      'The FAA system that provides near-instant airspace authorization for drone operations in controlled airspace at or below approved altitudes. Most agricultural drones operate via LAANC-approved third-party apps like Aloft or Airmap.',
    relatedTerms: ['airspace-authorization'],
  },
  {
    term: 'Label Rate',
    slug: 'label-rate',
    category: 'application',
    definition:
      'The legally binding application instructions on an EPA-approved pesticide label, including product rate per acre, carrier volume, droplet size, and buffer requirements. Drone operators must follow label rates exactly, including any aerial-specific restrictions.',
    relatedTerms: ['fifra', 'epa-fifra'],
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
