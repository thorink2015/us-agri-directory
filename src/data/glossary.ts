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
    term: 'Buffer Zone',
    slug: 'buffer-zone',
    category: 'application',
    definition:
      'A required setback distance between the spray application area and sensitive sites — water bodies, schools, residences, neighboring crops, or organic fields. Set by the product label and sometimes by state or county rule.',
    relatedTerms: ['drift', 'spray-drift-management'],
  },
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
    term: 'CSP (Conservation Stewardship Program)',
    slug: 'csp',
    category: 'business',
    definition:
      'A USDA NRCS program that pays landowners for conservation performance, including precision pesticide application and cover crop practices that can be delivered by drone. Often stacked on top of EQIP for larger total cost-share.',
    relatedTerms: ['eqip', 'nrcs'],
    relatedLink: { label: 'Grants & subsidies for ag drones', href: '/grants-and-subsidies' },
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
      'A USDA NRCS cost-share program that reimburses farmers for conservation practices, including drone-applied cover crop seeding (Practice Standard 340) and drone equipment purchases (Practice Code 595). Typical payments cover 50–75% of eligible costs.',
    relatedLink: { label: 'Grants & subsidies for ag drones', href: '/grants-and-subsidies' },
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

  // ─── H ───────────────────────────────────────────────────────────────────
  {
    term: 'Hull Insurance',
    slug: 'hull-insurance',
    category: 'business',
    definition:
      'Insurance covering physical damage to the drone itself from crashes, weather, or fire. Typically runs $500 to $2,000 per year per drone, and is separate from liability and pollution coverage.',
    relatedLink: { label: 'Drone insurance guide', href: '/insurance' },
  },

  // ─── I ───────────────────────────────────────────────────────────────────
  {
    term: 'IP Rating',
    slug: 'ip-rating',
    category: 'hardware',
    definition:
      'Ingress Protection rating measuring dust and water resistance. IP55 means protected against dust and low-pressure water jets; IPX6K (on drones like the XAG P100 Pro) means protected against high-pressure water for safer wash-down.',
  },
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

  // ─── M ───────────────────────────────────────────────────────────────────
  {
    term: 'Mission Planner',
    slug: 'mission-planner',
    category: 'hardware',
    definition:
      'Software that converts a field boundary and application parameters into an automated flight path for a spray drone. Major ag drone brands ship their own mission planners (DJI Agras, XAG One, Hylio AgraSync).',
  },
  {
    term: 'MTOW (Maximum Takeoff Weight)',
    slug: 'mtow',
    category: 'hardware',
    definition:
      'The maximum weight of the drone including payload, battery, and fuel. MTOW determines the FAA regulatory category — drones over 55 pounds require a Section 44807 exemption in addition to Part 107 and Part 137.',
    relatedTerms: ['part-44807'],
  },
  {
    term: 'MPH (Miles Per Hour)',
    slug: 'mph',
    category: 'application',
    definition:
      'The US measure of drone flight speed during spraying, typically 10–25 mph. Faster speeds increase coverage rate but reduce droplet deposition uniformity.',
  },

  // ─── N ───────────────────────────────────────────────────────────────────
  {
    term: 'NDVI (Normalized Difference Vegetation Index)',
    slug: 'ndvi',
    category: 'agronomic',
    definition:
      'A spectral index computed from drone multispectral imagery that correlates with plant vigor and biomass. High NDVI indicates dense, healthy canopy; low NDVI flags stress, disease, or nutrient deficiency before symptoms are visible.',
    relatedTerms: ['ndre', 'scouting'],
  },
  {
    term: 'NDRE (Normalized Difference Red Edge)',
    slug: 'ndre',
    category: 'agronomic',
    definition:
      'A vegetation index using the red-edge spectral band, more sensitive than NDVI for detecting stress in dense canopy crops like mature corn or orchards. Common on multispectral drone sensors such as MicaSense and DJI P4M.',
    relatedTerms: ['ndvi', 'scouting'],
  },
  {
    term: 'NDAA Compliance',
    slug: 'ndaa-compliance',
    category: 'regulatory',
    definition:
      'Section 848 of the National Defense Authorization Act restricts federal agencies from procuring drones made in covered foreign countries. NDAA-compliant drones (such as Hylio and Skydio models) are required for USDA-funded programs and government contracts.',
    relatedLink: { label: 'NDAA compliance explained', href: '/regulations/ndaa-compliance' },
  },
  {
    term: 'NRCS (Natural Resources Conservation Service)',
    slug: 'nrcs',
    category: 'business',
    definition:
      'The USDA agency that administers conservation cost-share programs including EQIP and CSP. NRCS Practice Standard 340 covers aerial cover crop seeding, making drone seeding eligible for payment in most states.',
    relatedTerms: ['eqip'],
  },
  {
    term: 'Nozzle',
    slug: 'nozzle',
    category: 'hardware',
    definition:
      'The orifice that atomizes spray liquid into droplets of a specific size and pattern. Modern ag drones use rotary atomizers or pressure-swirl nozzles optimized for 2–5 gpa application rates.',
    relatedTerms: ['droplet-size'],
  },

  // ─── P ───────────────────────────────────────────────────────────────────
  {
    term: 'Part 107',
    slug: 'part-107',
    category: 'regulatory',
    definition:
      'The FAA regulation (14 CFR Part 107) governing commercial small drone operations under 55 pounds. Every pilot-in-command of a commercial ag drone must hold a Remote Pilot Certificate issued under Part 107.',
    relatedTerms: ['part-137', 'remote-pilot-certificate'],
    relatedLink: { label: 'FAA Part 107 guide', href: '/regulations/faa-part-107' },
  },
  {
    term: 'Part 137',
    slug: 'part-137',
    category: 'regulatory',
    definition:
      'The FAA regulation (14 CFR Part 137) governing agricultural aircraft operations — any aircraft dispensing pesticides, seed, or other agricultural products. Commercial drone spray operators need a Part 137 Agricultural Aircraft Operator certificate in addition to Part 107.',
    relatedTerms: ['part-107', 'aao'],
    relatedLink: { label: 'FAA Part 137 guide', href: '/regulations/faa-part-137' },
  },
  {
    term: 'Part 137 Private',
    slug: 'part-137-private',
    category: 'regulatory',
    definition:
      'A Part 137 certificate restricted to dispensing on land owned or leased by the operator. Private AAO certification has lower application costs but cannot be used for commercial custom-application work.',
    relatedTerms: ['part-137', 'aao'],
  },
  {
    term: 'Part 44807 Exemption',
    slug: 'part-44807',
    category: 'regulatory',
    definition:
      'An FAA exemption required to fly drones over 55 pounds, which includes most commercial spray drones (DJI Agras T50, T100, Hylio AG-272). Exemption is typically granted for 2 years and must be renewed.',
    relatedLink: { label: 'FAA Part 137 & 44807 guide', href: '/regulations/faa-part-137' },
  },
  {
    term: 'PPE (Personal Protective Equipment)',
    slug: 'ppe',
    category: 'application',
    definition:
      'Safety gear required by pesticide labels, including coveralls, chemical-resistant gloves, respirators, and eye protection. Ag drone operators must wear label-specified PPE during mixing, loading, and nozzle cleaning.',
  },

  // ─── R ───────────────────────────────────────────────────────────────────
  {
    term: 'REI (Restricted-Entry Interval)',
    slug: 'rei',
    category: 'application',
    definition:
      'The label-specified time period after a pesticide application during which unprotected workers may not enter the treated area. Drone operators should document application time and post REI signage per EPA Worker Protection Standard.',
  },
  {
    term: 'Remote ID',
    slug: 'remote-id',
    category: 'regulatory',
    definition:
      'FAA rule requiring most drones to broadcast identification and location during flight, effective September 2023. All commercial ag drones must have built-in Remote ID or a Remote ID broadcast module.',
  },
  {
    term: 'Remote Pilot Certificate',
    slug: 'remote-pilot-certificate',
    category: 'regulatory',
    definition:
      'The FAA-issued credential obtained by passing the Part 107 Aeronautical Knowledge Test. Valid for 2 years; holders must complete recurrent online training to maintain currency.',
    relatedTerms: ['part-107'],
  },
  {
    term: 'RTK (Real-Time Kinematic) GPS',
    slug: 'rtk',
    category: 'hardware',
    definition:
      'A high-precision GPS correction technology that delivers centimeter-level accuracy, compared to meter-level accuracy for standard GPS. RTK is standard on commercial ag drones to ensure even swath alignment and prevent overlap or skips.',
    relatedTerms: ['flight-controller'],
  },

  // ─── S ───────────────────────────────────────────────────────────────────
  {
    term: 'Scouting',
    slug: 'scouting',
    category: 'agronomic',
    definition:
      'Systematic field inspection to identify pest pressure, disease incidence, or nutrient deficiency. Multispectral drone scouting creates NDVI maps that show crop stress days or weeks before it is visible to the human eye.',
    relatedTerms: ['ndvi'],
  },
  {
    term: 'Section 333 / 44807',
    slug: 'section-333',
    category: 'regulatory',
    definition:
      'The legacy exemption process for oversized drones, now codified under 49 USC Section 44807. Ag operators flying drones over 55 pounds must hold a current 44807 exemption from the FAA.',
    relatedTerms: ['part-44807'],
  },
  {
    term: 'Spray Drift Management Plan',
    slug: 'spray-drift-management',
    category: 'application',
    definition:
      'A written plan identifying downwind sensitive areas (schools, waterways, organic farms) and the buffer distances, wind limits, and droplet sizes required to protect them. Many states require drift management plans on file before commercial applications.',
    relatedTerms: ['drift'],
  },
  {
    term: 'Spreader',
    slug: 'spreader',
    category: 'hardware',
    definition:
      'A drone attachment for dispensing dry granular products such as cover crop seed, urea fertilizer, or rodent bait. Most spreaders use a spinning disc and are interchangeable with a spray tank on the same drone airframe.',
    relatedTerms: ['hopper'],
  },
  {
    term: 'Swath',
    slug: 'swath',
    category: 'application',
    definition:
      'The effective width of a single drone pass, typically 20–33 feet on commercial ag drones. Swath alignment and overlap (usually 10–15%) determine whether a field receives uniform coverage or has streaks and skips.',
    relatedTerms: ['boom-width'],
  },

  // ─── T ───────────────────────────────────────────────────────────────────
  {
    term: 'Tank Mix',
    slug: 'tank-mix',
    category: 'application',
    definition:
      'A combination of two or more pesticide products applied in a single spray. Tank-mix compatibility must be verified by label and physical jar test before loading a drone tank, especially at the low carrier volumes used in drone applications.',
  },
  {
    term: 'TRUST (The Recreational UAS Safety Test)',
    slug: 'trust',
    category: 'regulatory',
    definition:
      'A free FAA knowledge test for recreational drone flyers. TRUST is not sufficient for commercial ag operations — commercial operators must hold a Part 107 Remote Pilot Certificate.',
    relatedTerms: ['part-107'],
  },

  // ─── U ───────────────────────────────────────────────────────────────────
  {
    term: 'UAS (Unmanned Aircraft System)',
    slug: 'uas',
    category: 'regulatory',
    definition:
      'The FAA\'s formal term for a drone, including the aircraft, ground control station, and communication links. Used throughout 14 CFR Part 107 and Part 137.',
    relatedTerms: ['uav'],
  },
  {
    term: 'UAV (Unmanned Aerial Vehicle)',
    slug: 'uav',
    category: 'regulatory',
    definition:
      'The aircraft portion of a UAS. In casual usage, UAV is often used interchangeably with "drone."',
    relatedTerms: ['uas'],
  },
  {
    term: 'ULV (Ultra-Low Volume)',
    slug: 'ulv',
    category: 'application',
    definition:
      'Application technique using less than 5 gallons of spray per acre, enabled by highly concentrated formulations and fine droplets. Most drone spray work qualifies as ULV or low-volume (LV).',
    relatedTerms: ['gpa', 'application-rate'],
  },
  {
    term: 'USDA (United States Department of Agriculture)',
    slug: 'usda',
    category: 'business',
    definition:
      'The federal department overseeing farm programs, conservation cost-share, and agricultural research. USDA sub-agencies including NRCS, FSA, and ARS are the primary federal touchpoints for drone operators.',
    relatedTerms: ['nrcs', 'fsa'],
  },

  // ─── V ───────────────────────────────────────────────────────────────────
  {
    term: 'VLOS (Visual Line of Sight)',
    slug: 'vlos',
    category: 'regulatory',
    definition:
      'The default Part 107 requirement that the remote pilot or a visual observer must maintain unaided sight of the drone throughout flight. Most ag spray operations are conducted under VLOS unless a BVLOS waiver has been granted.',
    relatedTerms: ['bvlos', 'part-107'],
  },

  // ─── W ───────────────────────────────────────────────────────────────────
  {
    term: 'Waiver',
    slug: 'waiver',
    category: 'regulatory',
    definition:
      'An FAA-issued exception to a Part 107 rule, granted when the operator demonstrates an equivalent level of safety. Common ag waivers include night operations (107.29) and operations over people (107.39).',
  },
  {
    term: 'WPS (Worker Protection Standard)',
    slug: 'wps',
    category: 'regulatory',
    definition:
      'EPA regulation (40 CFR Part 170) protecting workers and handlers from agricultural pesticide exposure. WPS requires notification, training, PPE, REI signage, and decontamination supplies on farms using agricultural-use pesticides.',
    relatedTerms: ['ppe', 'rei'],
  },
  {
    term: 'Work Width',
    slug: 'work-width',
    category: 'application',
    definition:
      'Synonym for swath — the effective spray width of a single drone pass. Manufacturer-stated work width is based on label-rate droplet size at recommended altitude.',
    relatedTerms: ['swath'],
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
