import { ReactNode } from 'react';
import Link from 'next/link';

export const blogContent: Record<string, ReactNode> = {
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
