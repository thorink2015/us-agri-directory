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
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
