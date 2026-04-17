import { ReactNode } from 'react';
import Link from 'next/link';

export const blogContent: Record<string, ReactNode> = {
  'drone-spraying-pricing-trends-2026': (
    <>
      <h2>The data</h2>
      <p>
        2022: $22 to $25/acre (early adopter pricing, few operators). 2024: $15 to $18/acre (MU
        Extension benchmark $16). 2026: $12 to $17/acre (Iowa State&apos;s first drone category:
        $12.50 average from 47 responses). Manned aerial: $12/acre in the same survey. Drones and
        airplanes are now price-equivalent for the first time. Full rate tables by service and
        region in the <Link href="/pricing">2026 pricing guide</Link>.
      </p>

      <h2>What drove compression</h2>
      <p>
        Operator supply exploded. SweetWater Technologies alone went from 32,000 acres in 2022 to an
        estimated 200,000 by end of 2025. NAAA&apos;s 2025 survey: 13 percent of aerial application
        operations now include UAS, up from 5 percent in 2024 &mdash; a 160 percent increase in one
        year. The American Spray Drone Coalition counts 10.3 million US acres sprayed by drones in
        2024, roughly 2.5x the 2023 figure.
      </p>

      <h2>Where rates are still high</h2>
      <p>
        Specialty crops remain less compressed. Vineyards: $18 to $30. Orchards: $15 to $21.
        Specialty vegetables: $20 to $40. Fewer operators, more complex terrain, more passes per
        season. Drone <Link href="/services/spraying">spraying services</Link> on specialty blocks
        are where most of the margin left in the market actually lives.
      </p>

      <h2>The tariff counterpressure</h2>
      <p>
        A 170 percent cumulative tariff on Chinese drones by April 2025. The DJI T50 went from
        $18,000 pre-tariff to $22,000 to $28,000 post-tariff. Higher equipment cost means operators
        need higher per-acre revenue to maintain margins, but competitive pressure keeps rates low.
        Squeeze from both sides.
      </p>

      <h2>The profitability floor</h2>
      <p>
        At a $12.50/acre average and MU Extension&apos;s ownership cost of $12.27/acre at 1,000
        acres/year, the margin is $0.23 per acre. At $7.39 ownership cost at 4,000 acres/year,
        margin is $5.11. Volume is the only path to profitability in row crops. Plug your numbers
        into the <Link href="/tools/roi-calculator">ROI calculator</Link> before signing equipment
        financing.
      </p>

      <h2>What this means for farmers</h2>
      <p>
        Rates are near bottom. Do not expect significantly cheaper drone spraying in 2027. Do expect
        stable or slightly rising rates as marginal operators exit and tariffs increase equipment
        replacement costs. Locking in multi-year rates with a reliable operator is worth more than
        chasing the cheapest bid.
      </p>

      <h2>What this means for operators</h2>
      <p>
        Compete on volume and service quality, not on price. Diversify into specialty crops, cover
        crop seeding, and mapping where margins are healthier. Build repeat customer relationships
        that guarantee acreage before the season starts. The full business-launch playbook is at{' '}
        <Link href="/start-a-drone-business">start a drone business</Link>.
      </p>

      <h2>See also</h2>
      <p>
        <Link href="/regions/corn-belt">Corn Belt regional hub</Link> &middot;{' '}
        <Link href="/crops/corn">Corn crop page</Link> &middot;{' '}
        <Link href="/services/spraying">Drone spraying service</Link>
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://www.extension.iastate.edu/agdm/crops/pdf/a3-10.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iowa State Extension &mdash; Custom Rate Survey
          </a>
        </li>
        <li>
          <a
            href="https://extension.missouri.edu/publications/g1274"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Missouri Extension G1274 &mdash; Custom Rates for Farm Services
          </a>
        </li>
      </ul>
    </>
  ),
  'drone-spraying-state-license-guide': (
    <>
      <h2>The baseline</h2>
      <p>
        Every state requires three things: <Link href="/regulations/faa-part-107">FAA Part 107</Link>,{' '}
        <Link href="/regulations/faa-part-137">FAA Part 137</Link>, and a state commercial pesticide
        applicator license with an aerial category endorsement. Beyond that baseline, everything
        varies. Our <Link href="/regulations/state-licensing">state licensing hub</Link> tracks
        every requirement.
      </p>

      <h2>Six states with drone-specific credentials</h2>
      <ul>
        <li>California: Unmanned Pest Control Aircraft Pilot Certificate (Apprentice / Journeyman)</li>
        <li>North Dakota: standalone Unmanned Aerial Applicator License from the Aeronautics Commission</li>
        <li>Arizona: Drone Pilot License (DPL), separate from manned aircraft</li>
        <li>Michigan: MDARD-approved UAV training program required</li>
        <li>Louisiana: mandatory LSU AgCenter Drone Safety Program before certification</li>
        <li>Minnesota: MnDOT aircraft registration plus aerial endorsement</li>
      </ul>

      <h2>States with unique restrictions</h2>
      <ul>
        <li>Ohio: even private applicators need a commercial license for drones</li>
        <li>Iowa: in-state aerial applicator consultant required</li>
        <li>Oregon: 50 hours flight experience before APA license application</li>
        <li>Arkansas: CAT license invalid for drones; ag crops only</li>
        <li>Tennessee: $150 aircraft decal per drone</li>
        <li>Vermont: 30-day public comment aerial permit</li>
        <li>Maine: 80 percent passing score (highest nationally)</li>
        <li>Connecticut: per-application aerial permit with $200 to $565 fees</li>
      </ul>

      <h2>Cheapest states to get licensed</h2>
      <p>
        South Dakota ($35 for two years), Indiana (free exams at Purdue, $45/year), Kentucky
        ($10/exam, $25 license). If you are just testing the business model before committing, these
        three are the lowest-friction paths to a legal first pass. Full business-launch sequence at{' '}
        <Link href="/start-a-drone-business">start a drone business</Link>.
      </p>

      <h2>Most expensive states</h2>
      <p>
        New York ($100/exam, $450 for three years on the first category), California ($265 pilot
        application + $115/exam + $320 QAC), Tennessee ($150 decal + $200 pilot + $150 exam
        application).
      </p>

      <h2>Best reciprocity</h2>
      <p>
        Minnesota: 18 states. Pennsylvania: 25+ states. Worst: Arkansas and Hawaii (zero
        reciprocity). Reciprocity usually requires the host state&apos;s laws-and-regulations exam
        even when the core exam transfers. Pair your home state license with a well-reciprocating
        neighbor for the widest operating region per dollar.
      </p>

      <h2>How to get started</h2>
      <p>
        Pick your home state first. The <Link href="/states">full state directory</Link> links to
        the licensing page and operator listings for every state. Schedule the exam, schedule Part
        107, then submit your Part 137 package. Study plans and test-prep providers live on the{' '}
        <Link href="/training-and-certification">training and certification</Link> page.
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://www.epa.gov/pesticide-worker-safety"
            target="_blank"
            rel="noopener noreferrer"
          >
            EPA &mdash; Pesticide Worker Safety
          </a>
        </li>
        <li>
          <a href="https://npsec.us" target="_blank" rel="noopener noreferrer">
            National Pesticide Safety Education Center
          </a>
        </li>
      </ul>
    </>
  ),
  'dji-vs-hylio-which-spray-drone': (
    <>
      <h2>The two-drone market</h2>
      <p>
        DJI controls roughly 80 percent of the US ag drone market. Hylio is the leading US-made
        alternative. Every other platform is a distant third. Your first drone purchase in 2026 is
        almost certainly one of these two, and our <Link href="/buyers-guide">buyers guide</Link>{' '}
        covers the full fleet-building checklist.
      </p>

      <h2>Price</h2>
      <p>
        <Link href="/drones/dji-agras-t50">DJI T50</Link>: $18,000 pre-tariff, $22,000 to $28,000
        post-tariff (170 percent cumulative tariff).{' '}
        <Link href="/drones/hylio-ag-272">Hylio AG-272</Link>: MSRP not published, estimated $55,000
        to $75,000. The tariff narrowed the gap from 3x to 4x down to 2x to 3x. Run your numbers in
        the <Link href="/tools/roi-calculator">ROI calculator</Link>.
      </p>

      <h2>Tank and payload</h2>
      <p>
        T50: 40L liquid, 50 kg granular. AG-272: 68L liquid, 101 kg granular. The AG-272 holds 70
        percent more liquid per flight, meaning fewer refill stops. Swath width and flow rate
        differences play out in the <Link href="/tools/drone-comparison">drone comparison tool</Link>.
      </p>

      <h2>Wind</h2>
      <p>
        This is the sleeper spec. T50: rated 13.4 mph (6 m/s). AG-272: rated 25 mph sustained, 40
        mph gust. In Kansas, Oklahoma, Nebraska, and the Dakotas, daily wind exceeds 13.4 mph most
        afternoons from March through October. T50 operators spray at dawn. AG-272 operators spray
        all day.
      </p>

      <h2>NDAA compliance</h2>
      <p>
        T50: not compliant. AG-272: fully compliant (FY2019 Section 889, FY2020 Section 848,
        certified by CEO Arthur Erickson October 2024). If you bid federal, state, or
        university-funded work, you need Hylio. Private farm contracts have no NDAA requirement.
        Full detail on the <Link href="/regulations/ndaa-compliance">NDAA compliance page</Link>.
      </p>

      <h2>Dealer and parts</h2>
      <p>
        DJI: dozens of US dealers, same-day parts in many regions. Hylio: direct from Richmond, TX
        plus a distributor network. Smaller parts pipeline. Carry a spare parts kit during peak
        season if running Hylio in remote areas. <Link href="/services/sales">Dealers and sales
        partners</Link> are listed by region in our directory.
      </p>

      <h2>Battery and charging</h2>
      <p>
        T50: 9 to 12 minute charge (DB1560). AG-272: 25 to 30 minutes (14S 42 Ah LiPo). DJI&apos;s
        faster charge means higher daily throughput per drone if battery rotation is your
        bottleneck. Generator sizing and battery rotation count are covered in the buyers guide.
      </p>

      <h2>Swarm</h2>
      <p>
        AG-272 supports up to 3 units from a single GroundLink station. DJI does not offer native
        multi-drone control from one controller. Swarm gives Hylio operators a throughput multiplier
        without adding per-pilot cost.
      </p>

      <h2>The verdict</h2>
      <p>
        Buy DJI T50 if: private farm contracts only, you want lowest entry cost, fastest parts,
        largest operator community. Buy Hylio AG-272 if: federal or state work, Great Plains wind
        conditions, fleet scaling with swarm mode. Many operators run both. Plug either platform
        into our <Link href="/pricing">2026 pricing guide</Link> to see per-acre margins at
        your local rate.
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://ag.dji.com/t50/specs"
            target="_blank"
            rel="noopener noreferrer"
          >
            DJI Agras T50 official specifications
          </a>
        </li>
        <li>
          <a href="https://hyl.io" target="_blank" rel="noopener noreferrer">
            Hylio official site
          </a>
        </li>
      </ul>
    </>
  ),
  'cover-crop-seeding-drone-guide': (
    <>
      <h2>Why drones for cover crops</h2>
      <p>
        The math is simple: drone seeding into standing corn and soybeans in late August or September
        gives cereal rye, clover, and ryegrass 3 to 4 extra weeks of establishment compared to
        waiting for harvest and then drilling. That extra time is the difference between a full
        stand by November and a patchy stand that overwinters poorly.
      </p>

      <h2>Best species for drone seeding</h2>
      <ul>
        <li><strong>Cereal rye</strong> &mdash; the workhorse, establishes reliably</li>
        <li><strong>Annual ryegrass</strong> &mdash; fast germination</li>
        <li><strong>Crimson clover</strong> &mdash; nitrogen fixation</li>
        <li><strong>Hairy vetch</strong> &mdash; nitrogen fixation plus biomass</li>
        <li><strong>Oats</strong> &mdash; winter-kill in northern states, leaving a mulch mat</li>
        <li><strong>Radishes</strong> &mdash; compaction relief</li>
        <li><strong>Brassicas</strong> &mdash; quick canopy</li>
      </ul>
      <p>
        Avoid soybeans and peas &mdash; too large for drone hoppers and seed is damaged on impact.
      </p>

      <h2>Timing by region</h2>
      <p>
        Corn Belt: late August through mid-October. Time around corn canopy senescence so seed reaches
        soil. <Link href="/states/iowa">Iowa</Link> and Illinois operators run August 20 through
        September 15 for corn fields. <Link href="/states/ohio">Ohio</Link> and Indiana extend into
        early October. Southern states: October through November.
      </p>

      <h2>Seed rates</h2>
      <ul>
        <li>Cereal rye: 50 to 60 lbs/acre</li>
        <li>Annual ryegrass: 15 to 25 lbs/acre</li>
        <li>Crimson clover: 15 to 20 lbs/acre</li>
      </ul>
      <p>
        Mixes vary. Drone hopper capacity limits per-load acreage, so operators refill frequently.
      </p>

      <h2>EQIP cost-share</h2>
      <p>
        Practice Standard 340 pays $25 to $55/acre total (seed plus application) in most states. Some
        states layer RCPP for 80 to 100 percent coverage. Net farmer cost after cost-share typically
        lands at $5 to $12/acre. Contact your local NRCS field office for state-specific rates and
        application windows (usually November through January for the following season). Full
        program detail on the <Link href="/grants-and-subsidies">grants and subsidies</Link> page.
      </p>

      <h2>Booking</h2>
      <p>
        Book by late July or early August for September slots. Corn Belt operator capacity fills by
        early August most years. The cover crop window overlaps with corn fungicide mop-up, so
        operators are stretched thin. <Link href="/pricing">Current per-acre rates by region</Link>{' '}
        and the <Link href="/tools/treatment-calendar">treatment calendar</Link> help lock in timing
        ahead of the rush.
      </p>

      <h2>What can go wrong</h2>
      <p>
        Dry conditions after seeding delay germination &mdash; timing seed ahead of expected rain
        solves this. A dense corn canopy can block seed from reaching soil; best results are when
        corn leaves are beginning to senesce within a week of seeding.
      </p>

      <h2>See also</h2>
      <p>
        <Link href="/crops/cover-crops">Cover crops crop page</Link> &middot;{' '}
        <Link href="/services/seeding">Drone cover-crop seeding services</Link> &middot;{' '}
        <Link href="/states/pennsylvania">Pennsylvania</Link>
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-340"
            target="_blank"
            rel="noopener noreferrer"
          >
            USDA NRCS Cover Crop Practice Standard 340
          </a>
        </li>
        <li>
          <a
            href="https://mccc.msu.edu/covercroptool"
            target="_blank"
            rel="noopener noreferrer"
          >
            Midwest Cover Crops Council species selection tool
          </a>
        </li>
      </ul>
    </>
  ),
  'faa-part-137-drone-guide': (
    <>
      <h2>What Part 137 actually is</h2>
      <p>
        Not a pilot license &mdash; that is{' '}
        <Link href="/regulations/faa-part-107">Part 107</Link>. Part 137 is the agricultural aircraft
        operator certificate that authorizes your business to apply pesticides from aircraft.
        Originally written for manned crop dusters, now interpreted for drones through the Section
        44807 exemption pathway.
      </p>

      <h2>Step 1: Get Part 107 first</h2>
      <p>
        Part 137 application references your Part 107. Get the pilot cert before submitting anything
        else. Budget 2 to 4 weeks to study, take the exam, and receive the temporary certificate.
        Study plans and provider list live on our{' '}
        <Link href="/training-and-certification">training and certification</Link> page.
      </p>

      <h2>Step 2: Draft your operations manual</h2>
      <p>
        This is where most applications stall. The manual must cover:
      </p>
      <ul>
        <li>Crew qualifications and training program</li>
        <li>Maintenance schedule and procedures</li>
        <li>Chemical handling and storage</li>
        <li>Emergency procedures (fly-away, chemical spill, medical)</li>
        <li>Recordkeeping (FIFRA compliance)</li>
        <li>Congested area operating procedures</li>
      </ul>
      <p>
        Use a template from a consultant or NAAA. Do not write from scratch unless you have an
        aviation operations background.
      </p>

      <h2>Step 3: File the 44807 exemption petition (if drone exceeds 55 lbs)</h2>
      <p>
        Most commercial spray drones (DJI Agras T50 at 203 lbs MTOW, Hylio AG-272 at 399 lbs) exceed
        55 lbs loaded. The petition describes the drone, operational limitations, and safety
        mitigations. It is filed as part of the Part 137 package.
      </p>

      <h2>Step 4: Assemble training records</h2>
      <p>
        Pilot qualifications (Part 107 cert, flight hours, manufacturer training cert), maintenance
        technician qualifications, and your annual training plan. Document everything.
      </p>

      <h2>Step 5: Submit to FAA</h2>
      <p>
        Complete package to your local FAA Flight Standards District Office (FSDO). Timeline starts
        from complete submission, not from initial contact.
      </p>

      <h2>Step 6: Respond to FAA questions</h2>
      <p>
        Typical 1 to 3 rounds of questions or revision requests. Each round adds 2 to 4 weeks. This
        is why consultants help &mdash; they know what the FSDO will ask and pre-address it.
      </p>

      <h2>Step 7: Receive certificate</h2>
      <p>
        90 to 180 days total. You can now legally spray for hire. Add{' '}
        <Link href="/insurance">commercial drone insurance</Link> before your first paid pass.
      </p>

      <h2>Common mistakes that cause delays</h2>
      <ul>
        <li>Incomplete operations manual (missing emergency procedures)</li>
        <li>Incorrect 44807 format</li>
        <li>No training records</li>
        <li>Submitting before Part 107 is in hand</li>
        <li>Using a generic aviation ops manual not tailored for UAS</li>
      </ul>

      <h2>DIY vs consultant</h2>
      <p>
        DIY: $0 but 30 to 90 extra days from revision cycles. Consultant ($2,500 to $4,500):
        operations manual, 44807 petition, coaching through approval, template library. Pays for
        itself in one month of avoided downtime. <Link href="/services/consultancy">Ag consulting
        operators</Link> in our directory include Part 137 specialists. If Part 137 is the first
        step of building a full business, see the full playbook at{' '}
        <Link href="/start-a-drone-business">start a drone business</Link>.
      </p>

      <h2>See also</h2>
      <p>
        <Link href="/regulations/faa-part-137">FAA Part 137 regulations page</Link> &middot;{' '}
        <Link href="/regulations/faa-part-107">FAA Part 107 pilot certificate</Link>
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://www.faa.gov/uas/advanced_operations/agricultural"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAA &mdash; Agricultural Drone Operations
          </a>
        </li>
        <li>
          <a
            href="https://www.faa.gov/newsroom/ag-operations"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAA Newsroom &mdash; Ag operations guidance
          </a>
        </li>
      </ul>
    </>
  ),
  'corn-fungicide-drone-spraying-guide': (
    <>
      <h2>The single largest ag drone use case</h2>
      <p>
        Over 90 million US acres of corn, and the VT/R1 tassel stage in mid-to-late July is when ground
        rigs can no longer clear the canopy without crushing 3 to 6 bushels per acre in wheel tracks.
        This is why drone fungicide on corn is the #1 commercial ag drone service in America.
      </p>

      <h2>What the university trials show</h2>
      <p>
        Beck&apos;s Practical Farm Research (IA, IN, IL): drone at 2 to 3 gpa matched ground at 15 to
        20 gpa, 5 to 8 bu/acre average yield response. Iowa State and Purdue Extension confirm for tar
        spot, gray leaf spot, and southern rust. High-pressure tar spot years: 15 to 25 bu/acre
        response. Low-pressure years: 2 to 4 bu/acre. The ROI math works at any disease pressure above
        3 bu/acre response at $5/bu corn.
      </p>

      <h2>The timing window</h2>
      <p>
        VT (tassel emergence) to R1 (silking). In the Corn Belt, this lands in the last two weeks of
        July through the first week of August. The window is 5 to 10 days. Spraying before VT gives
        insufficient residual. After R2, yield response drops sharply. Most operators book out 4 to 6
        weeks ahead. Call by early June for late-July slots. Tools like our{' '}
        <Link href="/tools/treatment-calendar">treatment calendar</Link> can help you plan the window.
      </p>

      <h2>The carrier volume question</h2>
      <p>
        Product labels specify minimum gpa and droplet size. Most strobilurin fungicides (Headline,
        Trivapro, Veltyma) allow 2 to 5 gpa aerial. Rotor downwash pushes droplets into the canopy,
        compensating for lower volume. Check your specific product label before booking.
      </p>

      <h2>Tank mixes</h2>
      <p>
        Strobilurin fungicide plus insecticide (for western corn rootworm beetle or western bean
        cutworm) is standard on high-value seed corn and stacked-trait fields. Confirm tank-mix
        compatibility and minimum carrier volume for the combination.
      </p>

      <h2>What it costs</h2>
      <p>
        $12 to $18/acre application only. Farmer supplies the chemical.{' '}
        <Link href="/states/iowa">Iowa</Link> and <Link href="/states/illinois">Illinois</Link> are
        the most competitive at $12 to $14. Ohio, Michigan, Wisconsin run slightly higher at $14 to
        $17. Minimum booking is typically 40 to 80 acres. Large-field discounts kick in above 200 to
        500 acres. Our <Link href="/tools/spray-cost-calculator">spray cost calculator</Link> lets
        you plug in your own acreage for a range. Full state-by-state rate detail is in the{' '}
        <Link href="/pricing">2026 pricing guide</Link>.
      </p>

      <h2>Drone vs. ground rig economics</h2>
      <p>
        At VT/R1 on tall corn, ground rigs cost $9 to $10 per acre plus 3 to 6 bushels per acre of
        compaction and wheel-track yield loss. At $5 corn, that loss is $15 to $30 per acre, so the
        drone premium of $3 to $8 per acre is usually the cheaper option once yield impact is
        counted. See our <Link href="/comparisons/drone-vs-ground-rig">drone vs. ground rig</Link>{' '}
        head-to-head for the full math.
      </p>

      <h2>How to book</h2>
      <p>
        Search our directory by state. Filter by{' '}
        <Link href="/services/spraying">spraying service</Link> and corn crop. Contact operators
        directly. Book 4 to 6 weeks before your expected VT date. <Link href="/states/indiana">
          Indiana
        </Link>{' '}
        and <Link href="/crops/corn">corn-specific</Link> pages list the operators working your
        region.
      </p>

      <h2>Authority sources</h2>
      <ul>
        <li>
          <a
            href="https://www.beckshybrids.com/Resources/Practical-Farm-Research"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beck&apos;s Practical Farm Research
          </a>
        </li>
        <li>
          <a
            href="https://crops.extension.iastate.edu/corn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iowa State Extension — Corn disease management
          </a>
        </li>
      </ul>
    </>
  ),
};
