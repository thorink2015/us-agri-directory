import { ReactNode } from 'react';

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-green-700 hover:underline font-medium">
    {children} ↗
  </a>
);

export const guideContent: Record<string, ReactNode> = {
  'cum-sa-devii-operator': (
    <div className="space-y-6">
      <p>
        The US agricultural drone services market is growing at 35–45% per year, and demand for
        certified commercial applicators far exceeds supply in most states. This guide walks through
        every step to launching a profitable ag drone operation in 2026 — from FAA certification to
        finding your first clients.
      </p>

      <h2>1. Understand the market opportunity</h2>
      <p>
        The US has over 900 million acres of farmland, with roughly 400 million acres of active cropland.
        Only 3–5% is currently treated by drone annually — meaning the market is still in its early
        growth stage. Target customers are farms between 50 and 2,000 acres, especially for corn VT
        fungicide, soybean R3, winter wheat heading applications, and specialty crops like vineyards
        and orchards where drones outperform ground rigs.
      </p>

      <h2>2. Choose your business structure</h2>
      <ul>
        <li><strong>LLC</strong>: recommended for most operators — limits personal liability, simple taxation, low setup cost ($50–500 depending on state)</li>
        <li><strong>Sole Proprietorship</strong>: lowest cost to start, but no liability protection — suitable only for testing the market</li>
        <li><strong>S-Corp</strong>: worthwhile once revenue exceeds ~$80,000/year for tax savings on self-employment income</li>
      </ul>
      <p>
        Register your LLC through your state Secretary of State portal. Most states process filings in
        1–5 business days online. Get an EIN from the{' '}
        <ExtLink href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online">IRS (free, instant online)</ExtLink>.
      </p>

      <h2>3. Get FAA certified</h2>
      <p>
        Two FAA certifications are required for commercial pesticide application by drone:
      </p>
      <ol>
        <li>
          <strong>FAA Part 107 Remote Pilot Certificate</strong> — required for any commercial UAS operation.
          Pass the aeronautical knowledge test at an FAA-approved testing center ($175 fee). Study time: 20–40 hours.
        </li>
        <li>
          <strong>FAA Part 137 Agricultural Aircraft Operator Certificate</strong> — required specifically for
          commercial pesticide, fertilizer, or seed application. Applied for at your local FSDO (Flight Standards
          District Office). Free to apply.
        </li>
      </ol>

      <h2>4. Get your state pesticide applicator license</h2>
      <p>
        Nearly every state requires a Commercial Pesticide Applicator License to apply EPA-registered products
        for hire. Contact your state department of agriculture for exam requirements — most require a written
        test and 2–4 hours of continuing education annually. Fees: $50–300.
      </p>

      <h2>5. Startup budget (2026)</h2>
      <ul>
        <li>DJI Agras T25P (starter setup): $14,000–18,000</li>
        <li>DJI Agras T50 (production setup): $22,000–28,000</li>
        <li>Batteries (4×) + fast charger: $4,000–6,000</li>
        <li>Portable generator: $1,500–3,000</li>
        <li>PPE + chemical handling equipment: $500–1,000</li>
        <li>Liability insurance (first year): $2,500–5,000</li>
        <li>FAA + state licenses + training: $1,500–3,000</li>
        <li><strong>Total estimated startup cost:</strong> $30,000–55,000</li>
      </ul>

      <h2>6. Reduce costs with USDA EQIP funding</h2>
      <p>
        USDA EQIP can reimburse 30–50% of eligible equipment costs for qualifying operations. See our{' '}
        <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">USDA funding guide</a>{' '}
        for eligibility requirements and how to apply.
      </p>

      <h2>7. Find your first clients</h2>
      <p>
        The most effective customer acquisition channels for new operators in 2026:
      </p>
      <ul>
        <li>List your business for free in the <a href="/adauga-operator" className="text-green-700 hover:underline font-medium">US Ag Drone Directory</a></li>
        <li>Introduce yourself to local ag retailers, co-ops, and crop consultants — they refer dozens of growers per season</li>
        <li>Attend local Farm Bureau meetings and commodity group meetings (corn, soybean, wheat grower associations)</li>
        <li>Partner with agronomists and certified crop advisers (CCAs) who can recommend drone applications to their clients</li>
        <li>Join state drone applicator associations (most major ag states have one)</li>
      </ul>

      <h2>8. Pricing and profitability</h2>
      <p>
        Average market rates run $12–17/acre for row crops and $25–35/acre for vineyards and orchards.
        A single DJI Agras T50 can cover 80–100 acres per day in good conditions. At $14/acre on 90 acres,
        that is $1,260/day gross revenue. Operating costs (fuel, maintenance, depreciation, insurance) run
        approximately $400–600/day, leaving $660–860/day net per drone. A 60-day spray season generates
        roughly $40,000–50,000 net per drone annually.
      </p>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.faa.gov/uas/commercial_operators">FAA: Commercial UAS Operators</ExtLink></li>
        <li><ExtLink href="https://www.faa.gov/uas/agricultural_operations">FAA: Part 137 Agricultural Operations</ExtLink></li>
        <li><ExtLink href="https://www.epa.gov/pesticide-applicator-certification-and-training">EPA: Pesticide Applicator Certification</ExtLink></li>
        <li><ExtLink href="https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives">USDA NRCS: EQIP Program</ExtLink></li>
      </ul>
    </div>
  ),

  'legislatie-drone-agricole': (
    <div className="space-y-6">
      <p>
        Commercial agricultural drone operations in the US are governed by a layered regulatory
        framework spanning federal aviation law, federal pesticide law, and state-level applicator
        licensing. This guide covers every requirement a commercial ag drone operator needs to stay
        fully compliant in 2026.
      </p>

      <h2>Layer 1 — FAA Aviation Regulations</h2>
      <p>
        The FAA governs all UAS flight operations in US airspace regardless of what the drone is
        carrying. Two rules apply to ag drone operators:
      </p>
      <ul>
        <li>
          <strong>14 CFR Part 107 (Small UAS Rule)</strong>: All commercial UAS pilots must hold a
          valid Part 107 Remote Pilot Certificate. Drones must weigh under 55 lbs (25 kg) at takeoff
          and may not fly over people, moving vehicles, or at night without a waiver.
        </li>
        <li>
          <strong>14 CFR Part 137 (Agricultural Aircraft Operations)</strong>: Required for any
          commercial application of pesticides, herbicides, fertilizers, or seed by air. The operator
          business must hold an Agricultural Aircraft Operator (AAO) certificate from the local FAA
          FSDO. Each pilot flying under the certificate must be listed as a worker or have their own
          Part 107 certificate.
        </li>
      </ul>

      <h2>Layer 2 — EPA Pesticide Law (FIFRA)</h2>
      <p>
        The Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA) governs all pesticide
        applications in the US. Key requirements for drone applicators:
      </p>
      <ul>
        <li>Only apply pesticides registered with the EPA for the target use (crop + pest)</li>
        <li>Apply only at label rates and under label conditions — the label is the law</li>
        <li>Maintain application records for 2 years (date, location, product, rate, applicator)</li>
        <li>Restricted Use Pesticides (RUPs) may only be applied by licensed commercial applicators</li>
      </ul>

      <h2>Layer 3 — State Pesticide Applicator License</h2>
      <p>
        Nearly every state requires a Commercial Pesticide Applicator License to apply any pesticide
        for compensation. Requirements vary by state but typically include:
      </p>
      <ol>
        <li>Written knowledge exam (core exam + category exam, e.g. Category 1: Agricultural Pest Control)</li>
        <li>Annual continuing education credits (2–8 hours depending on state)</li>
        <li>License renewal every 1–3 years ($50–300 fee)</li>
      </ol>
      <p>
        Contact your state Department of Agriculture for state-specific exam schedules and reciprocity
        agreements if operating across state lines.
      </p>

      <h2>Airspace restrictions and tools</h2>
      <ul>
        <li>Do not fly in Class B, C, or D airspace without LAANC authorization or an FAA waiver</li>
        <li>Check airspace authorization before every flight using{' '}
          <ExtLink href="https://www.faa.gov/uas/programs_partnerships/data_exchange">FAA LAANC</ExtLink> or the{' '}
          <ExtLink href="https://www.faa.gov/uas/recreational_fliers/where_can_i_fly/b4ufly">B4UFLY app</ExtLink>
        </li>
        <li>Check for active TFRs (Temporary Flight Restrictions) before every flight at{' '}
          <ExtLink href="https://tfr.faa.gov">tfr.faa.gov</ExtLink>
        </li>
        <li>Minimum safe altitude: comply with Part 107 400 ft AGL ceiling in uncontrolled airspace</li>
        <li>Visual line of sight (VLOS) required — BVLOS operations require a separate FAA waiver</li>
      </ul>

      <h2>Required documents to carry during operations</h2>
      <ul>
        <li>FAA Part 107 Remote Pilot Certificate (physical or digital)</li>
        <li>FAA Part 137 Operator Certificate (on file; carry a copy)</li>
        <li>State Commercial Pesticide Applicator License</li>
        <li>Drone registration certificate (FAA registration, $5/3 years)</li>
        <li>Liability insurance certificate ($1M+ general liability recommended)</li>
        <li>Pesticide application records for current season</li>
      </ul>

      <h2>NDAA compliance for government-adjacent work</h2>
      <p>
        NDAA Section 848/899 restricts use of certain foreign-made drones on federally funded projects
        or by federal agencies. DJI and most Chinese-manufactured drones are currently restricted.
        Operators working on USDA program land or with federal contractors should verify equipment
        compliance. The{' '}
        <ExtLink href="https://www.hylio.com">Hylio AG-272</ExtLink> is the leading NDAA-compliant
        US-manufactured option.
      </p>

      <h2>Penalties for non-compliance</h2>
      <p>
        FAA civil penalties for commercial UAS violations start at $1,100 per violation and can reach
        $27,500 per day for continuing violations. Criminal penalties (willful violations) can reach
        $250,000 and imprisonment. State pesticide violations carry separate fines of $500–25,000
        depending on state.
      </p>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.faa.gov/uas/commercial_operators">FAA: Commercial UAS Operations</ExtLink></li>
        <li><ExtLink href="https://www.faa.gov/uas/agricultural_operations">FAA: Part 137 Agricultural Aircraft</ExtLink></li>
        <li><ExtLink href="https://www.epa.gov/pesticide-applicator-certification-and-training">EPA: Pesticide Applicator Certification</ExtLink></li>
        <li><ExtLink href="https://www.epa.gov/enforcement/pesticides-enforcement">EPA: FIFRA Enforcement</ExtLink></li>
        <li><ExtLink href="https://www.faa.gov/uas/programs_partnerships/data_exchange">FAA LAANC: Low Altitude Authorization</ExtLink></li>
      </ul>
    </div>
  ),

  'fonduri-afir-drone': (
    <div className="space-y-6">
      <p>
        US farmers and drone operators can significantly reduce equipment costs through federal and
        state funding programs. The primary source is{' '}
        <ExtLink href="https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives">USDA EQIP</ExtLink>{' '}
        (Environmental Quality Incentives Program), which in 2024–2026 has funded hundreds of
        agricultural drone purchases nationwide. This guide covers every major program available
        in 2026 and how to apply.
      </p>

      <h2>USDA EQIP — Primary funding source</h2>
      <p>
        EQIP is administered by USDA NRCS (Natural Resources Conservation Service) and provides
        cost-share payments for conservation practices, including precision agriculture technology.
        Relevant practice codes for drone equipment:
      </p>
      <ul>
        <li><strong>Practice 595 (Pest Management)</strong>: covers drone spray equipment used for
          Integrated Pest Management (IPM) programs. Payment rates: 40–50% of eligible costs.</li>
        <li><strong>Practice 328 (Conservation Cover) + aerial seeding</strong>: supports cover crop
          drone seeding equipment. Payment rates: 35–50%.</li>
        <li><strong>Beginning Farmer priority</strong>: operators farming fewer than 10 years receive
          a boosted payment rate — up to 90% on the first $50,000 of eligible costs.</li>
        <li><strong>Underserved/Socially Disadvantaged Farmer priority</strong>: same 90% rate applies
          to qualifying producers.</li>
      </ul>

      <h2>USDA FSA Loan Programs</h2>
      <ul>
        <li>
          <strong>FSA Operating Loans</strong>: up to $400,000 at below-market interest rates for
          equipment purchases including drones. Available to beginning and established farmers who
          cannot get commercial credit.
        </li>
        <li>
          <strong>FSA Microloans</strong>: up to $50,000 — streamlined application, ideal for a
          single drone setup. Interest rate: ~5–6% (2026).
        </li>
      </ul>

      <h2>State-level programs</h2>
      <p>
        Many states have their own ag technology cost-share or loan programs. Notable examples:
      </p>
      <ul>
        <li><strong>Iowa:</strong> Beginning Farmer Tax Credit + Iowa Agricultural Development Authority loans</li>
        <li><strong>Illinois:</strong> IDOA Ag Equipment Loan Fund</li>
        <li><strong>California:</strong> CDFA State Conservancy and SWEEP program (water efficiency — applicable for low-drift drone applications)</li>
        <li><strong>Texas:</strong> TADB Beginning Farmer/Rancher Loan Program</li>
      </ul>
      <p>Contact your state Department of Agriculture for current program availability.</p>

      <h2>Eligibility requirements (EQIP)</h2>
      <ul>
        <li>Must be an agricultural producer (owner, tenant, or sharecropper on eligible land)</li>
        <li>Land must be privately owned agricultural land in the US</li>
        <li>Must be in compliance with wetland and highly erodible land provisions</li>
        <li>No delinquent federal debt</li>
        <li>Equipment must be new and installed/used on the farm receiving payment</li>
      </ul>

      <h2>Step-by-step EQIP application process</h2>
      <ol>
        <li>Contact your local{' '}
          <ExtLink href="https://www.nrcs.usda.gov/contact/find-a-service-center">USDA Service Center</ExtLink>{' '}
          to schedule a free eligibility consultation with an NRCS agent</li>
        <li>Complete the EQIP application (Form CCC-1200) — typically 1–2 hours with agent assistance</li>
        <li>Applications are ranked by resource concern priority — apply early in the fiscal year sign-up window</li>
        <li>If selected, receive a contract offer and review payment schedule</li>
        <li>Purchase and install equipment after contract is signed (do not purchase before contract)</li>
        <li>Submit practice payment request with receipts — NRCS will verify installation</li>
        <li>Receive cost-share payment within 30–60 days of approved request</li>
      </ol>

      <h2>Eligible drone models (2026)</h2>
      <p>
        Any commercially available, EPA-FIFRA-compliant spray drone can be included in an EQIP
        application. Most commonly approved models:
      </p>
      <ul>
        <li><a href="/drone/dji-agras-t25p" className="text-green-700 hover:underline font-medium">DJI Agras T25P</a>: $12,000–15,000 (drone only)</li>
        <li><a href="/drone/dji-agras-t50" className="text-green-700 hover:underline font-medium">DJI Agras T50</a>: $18,000–22,000</li>
        <li><a href="/drone/dji-agras-t100" className="text-green-700 hover:underline font-medium">DJI Agras T100</a>: $34,000–42,000</li>
        <li>Hylio AG-272 (NDAA-compliant): $25,000–30,000</li>
      </ul>

      <h2>Tips to maximize your approval odds</h2>
      <ul>
        <li>Apply during the first sign-up window of the federal fiscal year (October–December)</li>
        <li>Include batteries, charger, and generator in the project budget — these are eligible costs</li>
        <li>Document a clear conservation benefit: reduced chemical use, reduced soil compaction, IPM records</li>
        <li>If you qualify as a beginning farmer, underserved producer, or veteran farmer — state that clearly; it raises your ranking score</li>
        <li>Consider working with a farm financial consultant or your ag lender for application assistance</li>
      </ul>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives">USDA NRCS: EQIP Program</ExtLink></li>
        <li><ExtLink href="https://www.fsa.usda.gov/programs-and-services/farm-loan-programs/index">USDA FSA: Farm Loan Programs</ExtLink></li>
        <li><ExtLink href="https://www.nrcs.usda.gov/contact/find-a-service-center">USDA: Find Your Local Service Center</ExtLink></li>
        <li><ExtLink href="https://www.farmers.gov/loans">Farmers.gov: Loan Finder Tool</ExtLink></li>
      </ul>
    </div>
  ),

  'licenta-pilot-drona': (
    <div className="space-y-6">
      <p>
        To apply pesticides commercially by drone in the US, every pilot needs two FAA certifications
        plus a state pesticide applicator license. This guide covers every exam, cost, and study
        resource you need to get certified in 2026 — from the Part 107 knowledge test to the
        ag-specific Part 137 certificate.
      </p>

      <h2>Certificate 1 — FAA Part 107 Remote Pilot Certificate</h2>
      <p>
        The foundational requirement for any commercial UAS pilot. Required before flying any
        drone commercially, regardless of the application type.
      </p>
      <ul>
        <li><strong>Format:</strong> 60 multiple-choice questions, 2 hours, administered at an FAA-approved testing center (PSI/CATS)</li>
        <li><strong>Passing score:</strong> 70% (42 out of 60 correct)</li>
        <li><strong>Fee:</strong> $175 at the testing center</li>
        <li><strong>Valid:</strong> 24 months — renewal via free online recurrent training at{' '}
          <ExtLink href="https://www.faasafety.gov">FAASafety.gov</ExtLink>
        </li>
        <li><strong>No minimum flight hours required</strong> — purely a knowledge exam</li>
      </ul>

      <h2>What the Part 107 exam covers</h2>
      <ul>
        <li>Airspace classifications and operating requirements</li>
        <li>Weather and meteorological effects on UAS flight</li>
        <li>Small unmanned aircraft loading and performance</li>
        <li>Emergency procedures</li>
        <li>Crew resource management</li>
        <li>Radio communication procedures</li>
        <li>Determining the performance of small unmanned aircraft</li>
        <li>Physiological effects on pilots (fatigue, stress)</li>
        <li>Aeronautical decision-making and judgment</li>
        <li>Airport operations</li>
        <li>Maintenance and preflight inspection procedures</li>
      </ul>

      <h2>How to study for Part 107</h2>
      <ol>
        <li>Start with the free{' '}
          <ExtLink href="https://www.faasafety.gov/gslac/ALC/course_content.aspx?cID=451">FAA Remote Pilot Small UAS Study Guide</ExtLink>
        </li>
        <li>Take practice tests at{' '}
          <ExtLink href="https://www.kingschools.com/drone-pilot-training">King Schools</ExtLink>,{' '}
          <ExtLink href="https://www.udemy.com/topic/faa-part-107/">Udemy</ExtLink>, or{' '}
          <ExtLink href="https://www.3dr.com/faa-part-107/">3DR</ExtLink> (paid prep courses, $30–150)
        </li>
        <li>Study airspace charts using{' '}
          <ExtLink href="https://skyvector.com">SkyVector</ExtLink> — you will be tested on reading sectional charts
        </li>
        <li>Most pilots pass with 15–25 hours of dedicated study</li>
      </ol>

      <h2>Certificate 2 — FAA Part 137 Agricultural Aircraft Operator (AAO)</h2>
      <p>
        Required specifically for commercial pesticide, fertilizer, or seed application by air.
        This is a business-level certificate — the company or operator holds it, not the individual pilot.
      </p>
      <ul>
        <li><strong>Apply at:</strong> your local{' '}
          <ExtLink href="https://www.faa.gov/about/office_org/field_offices/fsdo">FAA Flight Standards District Office (FSDO)</ExtLink>
        </li>
        <li><strong>Fee:</strong> Free</li>
        <li><strong>Requirements:</strong> Proof of Part 107 certificate, description of operations (aircraft type, area of operations, product types), and a safety plan</li>
        <li><strong>Processing time:</strong> typically 2–6 weeks depending on FSDO workload</li>
        <li><strong>No written exam required</strong> — reviewed and approved by an FAA inspector</li>
        <li><strong>Valid indefinitely</strong> (but operations must remain as described in the application)</li>
      </ul>

      <h2>Certificate 3 — State Pesticide Applicator License</h2>
      <p>
        Required by nearly every state to apply EPA-registered pesticides for hire. Most states use
        a two-part exam:
      </p>
      <ul>
        <li><strong>Core exam:</strong> general pest management principles, safety, label reading, regulations</li>
        <li><strong>Category exam:</strong> Category 1 (Agricultural Pest Control) is the most common for ag drone operators; some states also require Category 7 (Aerial Application)</li>
        <li><strong>Renewal:</strong> every 1–3 years with continuing education credits (CEUs)</li>
        <li><strong>Fee:</strong> $50–300 depending on state</li>
      </ul>
      <p>
        Contact your state Department of Agriculture for exam dates and approved study materials.
        Many state extension services offer free exam prep workshops.
      </p>

      <h2>Ag drone-specific training</h2>
      <p>
        FAA certification covers flight law — it does not cover crop scouting, nozzle calibration,
        or application timing. Additional training to consider:
      </p>
      <ul>
        <li>
          <strong>DJI Agras flight training:</strong> 1–2 day hands-on courses offered by DJI
          Enterprise dealers across the US. Covers T50/T100 operation, field planning software,
          and maintenance. Cost: $500–1,200.
        </li>
        <li>
          <strong>Hylio operator training:</strong> Required for warranty coverage on Hylio AG-272.
          Offered online + in-person at Hylio HQ (Houston, TX).
        </li>
        <li>
          <strong>NAAA (National Agricultural Aviation Association):</strong>{' '}
          <ExtLink href="https://www.agaviation.org">agaviation.org</ExtLink> — industry resources,
          safety training, and networking for aerial applicators.
        </li>
        <li>
          <strong>State CCA (Certified Crop Adviser) program:</strong> not required, but valuable
          for understanding crop disease timing and fungicide windows that drive demand.
        </li>
      </ul>

      <h2>Estimated costs to get fully certified</h2>
      <ul>
        <li>Part 107 prep course: $50–150 (optional but recommended)</li>
        <li>Part 107 test fee: $175</li>
        <li>Part 137 application: free</li>
        <li>State pesticide license exam: $50–300</li>
        <li>Ag drone manufacturer training: $500–1,200</li>
        <li><strong>Total:</strong> approximately $800–1,800 to be fully certified and operational</li>
      </ul>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot">FAA: Become a Commercial Drone Pilot</ExtLink></li>
        <li><ExtLink href="https://iacra.faa.gov">IACRA: FAA Certificate Application System</ExtLink></li>
        <li><ExtLink href="https://www.faa.gov/uas/agricultural_operations">FAA: Part 137 Agricultural Operations</ExtLink></li>
        <li><ExtLink href="https://www.agaviation.org">NAAA: National Agricultural Aviation Association</ExtLink></li>
        <li><ExtLink href="https://www.epa.gov/pesticide-applicator-certification-and-training">EPA: State Pesticide Applicator Licensing</ExtLink></li>
      </ul>
    </div>
  ),

  'alegerea-dronei-agricole': (
    <div className="space-y-6">
      <p>
        Choosing the right agricultural drone depends on your acreage, crop type, available budget,
        NDAA compliance requirements, and local service support. In 2026, the US market is dominated
        by DJI Agras (~75% share), followed by Hylio (~12%), XAG (~8%), and others. Here is a
        practical breakdown of every major platform to help you decide.
      </p>

      <h2>DJI Agras — Market leader</h2>
      <p>
        The most widely deployed ag spray drones in the US. Excellent dealer network, mature software
        (DJI Agras app with field mapping and prescription layers), and the broadest parts availability.
        <strong> Note: DJI drones are NOT NDAA-compliant</strong> — check your situation before buying
        if you work on federal land or with USDA program participants.
      </p>
      <ul>
        <li>
          <strong><a href="/drone/dji-agras-t25p" className="text-green-700 hover:underline font-medium">DJI Agras T25P</a></strong>:
          20L tank, ~60 acres/hour, $10,000–14,000. Best entry-level option for specialty crops
          (vineyards, orchards) or operators starting on smaller fields.
        </li>
        <li>
          <strong><a href="/drone/dji-agras-t50" className="text-green-700 hover:underline font-medium">DJI Agras T50</a></strong>:
          40L tank, ~100 acres/hour, $18,000–22,000. The most popular production drone in the US.
          Handles corn, soybean, wheat, and cotton at scale.
        </li>
        <li>
          <strong><a href="/drone/dji-agras-t100" className="text-green-700 hover:underline font-medium">DJI Agras T100</a></strong>:
          80L tank, ~175 acres/hour, $34,000–42,000. For high-volume operations (1,000+ acres/season).
          Requires Part 137 certificate and careful logistics due to size and weight.
        </li>
      </ul>

      <h2>Hylio AG-272 — NDAA-compliant US-made option</h2>
      <p>
        Made in Houston, TX. The only commercially available ag spray drone currently meeting NDAA
        Section 848/899 requirements for US-manufactured equipment. Required for federal land operations,
        many USDA program contexts, and defense-adjacent buyers.
      </p>
      <ul>
        <li>
          <strong><a href="/drone/hylio-ag-272" className="text-green-700 hover:underline font-medium">Hylio AG-272</a></strong>:
          10-gallon (~38L) tank, ~50 acres/hour, $25,000–30,000. Growing dealer network; manufacturer
          training required for warranty coverage.
        </li>
      </ul>

      <h2>XAG — Advanced technology alternative</h2>
      <p>
        Competitive technology with integrated AI path planning and obstacle avoidance. Pricing is
        similar to DJI. Dealer and service network in the US is smaller but growing — verify local
        support before buying.
      </p>
      <ul>
        <li>
          <strong><a href="/drone/xag-p100" className="text-green-700 hover:underline font-medium">XAG P100 Pro</a></strong>:
          50L tank, ~80 acres/hour, $20,000–24,000. Strong AI features; good fit for precision
          application on specialty crops.
        </li>
        <li>
          <strong>XAG V40</strong>: 16L tank, ~40 acres/hour, $11,000–14,000. Entry-level option
          with solid autonomous flight capabilities.
        </li>
      </ul>
      <p>
        <strong>Note:</strong> XAG is also not NDAA-compliant as of 2026.
      </p>

      <h2>Decision matrix by operation size</h2>
      <table className="w-full text-sm border border-gray-200 rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Acreage per season</th>
            <th className="p-2 text-left">Recommended drone</th>
            <th className="p-2 text-left">Investment</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t"><td className="p-2">&lt; 500 acres</td><td className="p-2">DJI T25P / XAG V40</td><td className="p-2">$12–18K</td></tr>
          <tr className="border-t"><td className="p-2">500–2,500 acres</td><td className="p-2">DJI T50</td><td className="p-2">$22–30K</td></tr>
          <tr className="border-t"><td className="p-2">2,500–8,000 acres</td><td className="p-2">2× DJI T50 or DJI T100</td><td className="p-2">$40–55K</td></tr>
          <tr className="border-t"><td className="p-2">&gt; 8,000 acres</td><td className="p-2">Fleet of DJI T100 or T50</td><td className="p-2">$80K+</td></tr>
          <tr className="border-t"><td className="p-2">Federal/NDAA required</td><td className="p-2">Hylio AG-272</td><td className="p-2">$28–35K</td></tr>
        </tbody>
      </table>

      <h2>Key buying checklist</h2>
      <ul>
        <li>Verify NDAA compliance requirements for your specific operation before purchasing</li>
        <li>Confirm local dealer and service center availability — downtime during spray season is costly</li>
        <li>Budget 1.5–2× the drone price for a complete field-ready package (batteries, charger, generator)</li>
        <li>Check USDA EQIP eligibility — you may recover 40–50% of costs through{' '}
          <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">EQIP cost-share payments</a>
        </li>
        <li>Buy from an authorized dealer to maintain warranty and access manufacturer training</li>
      </ul>

      <h2>Use our comparison tool</h2>
      <p>
        Compare DJI Agras T50, Hylio AG-272, and XAG P100 side by side on tank size, coverage rate,
        price, and NDAA status using our{' '}
        <a href="/unelte/comparator-drone" className="text-green-700 hover:underline font-medium">interactive drone comparison tool</a>.
      </p>
    </div>
  ),

  'subventii-moldova-aipa': (
    <div className="space-y-6">
      <p>
        Beyond federal USDA programs, many states offer their own grants, loans, and cost-share
        programs for agricultural technology — including drones. This guide covers the most
        significant state-level funding opportunities available to US drone operators and farmers
        in 2026, organized by region.
      </p>

      <h2>Midwest — Corn Belt states</h2>
      <ul>
        <li>
          <strong>Iowa — Beginning Farmer Tax Credit:</strong> Iowa resident farmers who purchase
          agricultural equipment from a qualifying seller may receive a state income tax credit of
          up to 5% of sale price. Contact the{' '}
          <ExtLink href="https://www.iada.iowa.gov">Iowa Agricultural Development Authority (IADA)</ExtLink>.
        </li>
        <li>
          <strong>Illinois — IDOA Ag Technology Grants:</strong> The Illinois Department of
          Agriculture periodically opens grant rounds for precision agriculture equipment including
          drones. Awards typically $5,000–25,000 per applicant.
        </li>
        <li>
          <strong>Indiana — ISDA Beginning Farmer Loan Program:</strong> Below-market interest rate
          loans up to $500,000 for beginning farmers purchasing equipment. Drones and accessories
          are eligible capital items.
        </li>
        <li>
          <strong>Ohio — OAQDA Ag-LINK Loans:</strong> Ohio Agricultural Linked Deposit Program
          offers interest rate reductions of 3% on eligible equipment loans through participating
          lenders.
        </li>
      </ul>

      <h2>South — Cotton Belt and Delta states</h2>
      <ul>
        <li>
          <strong>Texas — TADB Ag Loan Program:</strong> Texas Agricultural Finance Authority loans
          up to $500,000 at reduced rates for new or expanding ag operations purchasing equipment.
        </li>
        <li>
          <strong>Mississippi — MAFES / MSU Extension grants:</strong> Mississippi State University
          Extension periodically offers cost-share programs for precision agriculture adoption on
          row-crop farms through USDA partnerships.
        </li>
        <li>
          <strong>Arkansas — ADFA Rural Development Loans:</strong> Arkansas Development Finance
          Authority offers below-market financing for farm equipment in rural counties.
        </li>
      </ul>

      <h2>West — Specialty crop and wine states</h2>
      <ul>
        <li>
          <strong>California — CDFA SWEEP Program:</strong> State Water Efficiency and Enhancement
          Program. Drone sprayers that demonstrably reduce water use qualify for grants up to
          $200,000. Particularly relevant for vineyard and orchard operators in water-stressed regions.
        </li>
        <li>
          <strong>California — CDFA Specialty Crop Block Grants:</strong> Annual federal pass-through
          grants for projects that enhance competitiveness of California specialty crops — precision
          application technology qualifies.
        </li>
        <li>
          <strong>Washington — WSU Precision Ag Initiative:</strong> Washington State University
          Extension offers subsidized training and equipment demonstration programs for drone
          applicators in tree fruit and wine grape production.
        </li>
        <li>
          <strong>Oregon — ODA Ag Development Fund:</strong> Oregon Department of Agriculture loans
          for beginning farmers purchasing crop protection equipment including drones.
        </li>
      </ul>

      <h2>How to stack multiple funding sources</h2>
      <p>
        The most effective approach is to combine federal USDA EQIP cost-share with a state loan
        program. Example: EQIP covers 45% of a $28,000 T50 package ($12,600), an IADA Beginning
        Farmer loan at below-market rate finances the remaining $15,400. Effective out-of-pocket
        cost in year one can be near zero if revenue from service applications covers loan payments.
      </p>

      <h2>Tips for state program applications</h2>
      <ul>
        <li>Apply to USDA EQIP first — state programs often require proof of federal application</li>
        <li>Contact your state Department of Agriculture early in the calendar year — budgets are limited and sign-up windows close fast</li>
        <li>Your state's land-grant university Extension office often has a precision agriculture specialist who knows every current program available locally</li>
        <li>Farm Bureau membership can give access to additional member-only loan programs and grant alerts</li>
      </ul>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives">USDA NRCS: EQIP (federal baseline)</ExtLink></li>
        <li><ExtLink href="https://www.farmers.gov/loans">Farmers.gov: Loan and Grant Finder</ExtLink></li>
        <li><ExtLink href="https://www.nasda.org/members">NASDA: State Agriculture Department Contacts</ExtLink></li>
        <li><ExtLink href="https://www.extension.org">eXtension: Land-Grant University Resources</ExtLink></li>
      </ul>
    </div>
  ),

  'legislatie-ansa-moldova': (
    <div className="space-y-6">
      <p>
        Crop protection regulations govern what products drone operators can apply, at what rates,
        and under what conditions. This guide covers the EPA and state-level crop protection
        regulatory framework that every US ag drone operator must understand in 2026 — from
        pesticide label law to buffer zone requirements and recordkeeping.
      </p>

      <h2>The pesticide label is federal law (FIFRA)</h2>
      <p>
        Under the Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA), the pesticide label
        is a legally binding document. Violating label directions — including application method,
        rate, timing, or target crop — is a federal violation. Key label elements drone operators
        must check before every application:
      </p>
      <ul>
        <li><strong>Application method:</strong> verify the label permits aerial or UAS application — not all products do</li>
        <li><strong>Rate and volume:</strong> some labels specify minimum carrier volume (gallons/acre) that ULV drone applications may fall below — check for aerial ULV allowances</li>
        <li><strong>Restricted Entry Interval (REI):</strong> how long workers must stay out of treated fields after application</li>
        <li><strong>Pre-Harvest Interval (PHI):</strong> minimum days between application and harvest — critical for specialty crops</li>
        <li><strong>Buffer zones:</strong> many labels require setbacks from water bodies, inhabited structures, or non-target areas</li>
      </ul>

      <h2>Restricted Use Pesticides (RUPs)</h2>
      <p>
        RUPs may only be purchased and applied by a certified commercial pesticide applicator or
        under their direct supervision. Most common ag drone applications (fungicides, herbicides,
        insecticides) include products classified as RUPs. Always verify classification before
        accepting an application job — applying an RUP without a license is a federal violation.
      </p>

      <h2>Drift management requirements</h2>
      <ul>
        <li>Drone applications are generally lower-drift than manned aerial but still subject to label drift restrictions</li>
        <li>Wind speed limits: most labels restrict application above 10–15 mph; check specific product labels</li>
        <li>Temperature inversions (calm, still air at night) can concentrate drift — many operators avoid applications in those conditions</li>
        <li>Notify adjacent organic or sensitive crop neighbors before applications where label requires it</li>
      </ul>

      <h2>Recordkeeping requirements</h2>
      <p>
        Federal law (FIFRA) requires commercial applicators to maintain application records for
        all RUPs for a minimum of 2 years. Best practice is to keep records for all applications,
        RUP or not. Required fields:
      </p>
      <ul>
        <li>Date and location of application (GPS coordinates or field description)</li>
        <li>Product name, EPA registration number, and amount applied</li>
        <li>Crop treated and total acreage</li>
        <li>Name and license number of applicator</li>
        <li>Weather conditions at time of application</li>
      </ul>

      <h2>State crop protection regulations</h2>
      <p>
        Each state maintains its own list of registered pesticides, additional label requirements,
        and notification rules. Some states (e.g. California, New York) have stricter restrictions
        than federal requirements — always check your state Department of Agriculture before
        applying any product in a new state.
      </p>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.epa.gov/pesticides">EPA: Pesticides Program</ExtLink></li>
        <li><ExtLink href="https://www.epa.gov/safepestcontrol/label-review-manual">EPA: Label Review Manual</ExtLink></li>
        <li><ExtLink href="https://www.cdms.net">CDMS: Pesticide Label Database</ExtLink></li>
        <li><ExtLink href="https://www.nasda.org/members">NASDA: State Ag Department Contacts</ExtLink></li>
      </ul>
    </div>
  ),

  'cum-sa-devii-operator-moldova': (
    <div className="space-y-6">
      <p>
        The Southeast US — Alabama, Georgia, Florida, Mississippi, Louisiana, South Carolina, and
        North Carolina — is one of the fastest-growing markets for agricultural drone services in
        2026. Cotton defoliation, peanut late-season disease programs, soybean white mold, and
        rice blast are driving explosive demand. This guide is for operators starting or expanding
        a drone spraying business in the Southeast.
      </p>

      <h2>1. Understand the Southeast market</h2>
      <ul>
        <li>40+ million acres of cropland across the 7-state Southeast region</li>
        <li>Primary demand: cotton defoliation (Aug–Oct), peanut late cercospora (Jul–Sep), soybean R3 fungicide (Jul–Aug), rice blast (Jul–Aug)</li>
        <li>Rates: $14–17/acre for row crops; $25–35/acre for peanuts and specialty crops</li>
        <li>Key clients: 500–5,000-acre cotton and peanut producers, rice farms in the Mississippi Delta, orchard and blueberry operations in GA/FL/NC</li>
        <li>Season length: April–October with peak demand July–September</li>
      </ul>

      <h2>2. State licensing priorities for Southeast operators</h2>
      <ul>
        <li><strong>Multi-state licensing is essential</strong> — most Southeast operators cover 2–4 states. Each state requires its own Commercial Pesticide Applicator License, though many have reciprocity agreements with neighbors.</li>
        <li>Alabama, Georgia, Florida, and Mississippi all have active reciprocity — check with each state DOA before applying.</li>
        <li>North Carolina and South Carolina have a joint reciprocity program for licensed applicators.</li>
      </ul>

      <h2>3. Equipment recommendations for Southeast conditions</h2>
      <ul>
        <li><strong>DJI Agras T50 or T100:</strong> best fit for large-acreage cotton and soybean. Heat and humidity are hard on batteries — plan for reduced flight times in July–August vs. manufacturer specs.</li>
        <li><strong>Spray system setup:</strong> flat-fan nozzles for cotton defoliant; hollow-cone nozzles for fungicide canopy penetration in soybeans and peanuts.</li>
        <li><strong>Logistics:</strong> portable generator + fast charger setup is critical — Southeast fields are often remote with no grid power nearby.</li>
      </ul>

      <h2>4. Finding clients in the Southeast</h2>
      <ul>
        <li>Introduce yourself to local co-op agronomists and independent crop consultants — they are the primary referral source for drone services in the region</li>
        <li>Attend state commodity group meetings: Alabama Cotton Producers, Georgia Peanut Commission, Mississippi Soybean Promotion Board</li>
        <li>List your operation in the{' '}
          <a href="/adauga-operator" className="text-green-700 hover:underline font-medium">US Ag Drone Directory</a>{' '}
          — growers across the Southeast actively search by state
        </li>
        <li>Partner with established operators like{' '}
          <a href="/operatori/osprey-agri-drone-national" className="text-green-700 hover:underline font-medium">Osprey Agri Drones</a> or{' '}
          <a href="/operatori/kdb-land-and-air" className="text-green-700 hover:underline font-medium">KDB Land and Air</a>{' '}
          for subcontracting during peak season
        </li>
      </ul>

      <h2>5. Peak season logistics</h2>
      <p>
        July–September is the highest-pressure window: cotton defoliation, soybean R3, and peanut
        programs all overlap. Successful Southeast operators book their calendar by June 1 and often
        operate 7 days a week during the 6-week peak. Planning tips:
      </p>
      <ul>
        <li>Pre-book fields in May — offer early-commitment discounts to lock in your calendar</li>
        <li>Keep a waitlist — cancellations are rare but last-minute additions are common in peak weeks</li>
        <li>Have a backup pilot or second operator for equipment failures during peak demand</li>
        <li>Monitor Tar Spot and Southern Rust forecasts from{' '}
          <ExtLink href="https://corn.ipmpipe.org">Corn IPM PIPE</ExtLink>{' '}
          and{' '}
          <ExtLink href="https://sbr.ipmpipe.org">SBR PIPE</ExtLink>{' '}
          — disease alerts drive surge demand
        </li>
      </ul>

      <h2>Official resources</h2>
      <ul>
        <li><ExtLink href="https://www.faa.gov/uas/commercial_operators">FAA: Commercial UAS Operators</ExtLink></li>
        <li><ExtLink href="https://www.agaviation.org">NAAA: National Agricultural Aviation Association</ExtLink></li>
        <li><ExtLink href="https://corn.ipmpipe.org">Corn IPM PIPE: Tar Spot & Southern Rust Tracker</ExtLink></li>
        <li><ExtLink href="https://www.nrcs.usda.gov/contact/find-a-service-center">USDA: Find Your Local Service Center</ExtLink></li>
      </ul>
    </div>
  ),

  'roi-drona-agricola': (
    <div className="space-y-6">
      <p>
        The most common question farmers and new operators ask in 2026: <strong>should I buy my own
        ag drone, or hire a service operator?</strong> The answer depends on your acreage, number of
        applications per season, availability of local operators, and whether you want to generate
        service revenue from neighbors. Here are three real-world scenarios with full numbers.
      </p>

      <h2>Scenario 1: 500-acre grain farm, 3 applications per season</h2>
      <ul>
        <li><strong>Cost of hiring an operator:</strong> 500 acres × 3 applications × $14/acre = <strong>$21,000/year</strong></li>
        <li><strong>Investment in DJI Agras T25P (full package):</strong> ~$18,000 (drone + batteries + charger)</li>
        <li><strong>Annual operating costs:</strong> ~$3,500 (battery replacement, maintenance, insurance)</li>
        <li><strong>Annual net savings vs. hiring out:</strong> ~$17,500</li>
        <li><strong>Estimated payback: 1 season</strong></li>
        <li><strong>Added benefit:</strong> no wheel traffic damage — ground rigs compact soil and destroy 3–6% of crop stand at late-season timings</li>
      </ul>
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        Conclusion: at 500 acres with 3 applications, a T25P pays back in a single season. Adding
        neighbor acres at $14/acre generates an additional $7,000–14,000 per season on top of
        your own crop savings.
      </p>

      <h2>Scenario 2: 1,200-acre operation, 3–4 applications per season</h2>
      <ul>
        <li><strong>Cost of hiring an operator:</strong> 1,200 acres × 4 applications × $14/acre = <strong>$67,200/year</strong></li>
        <li><strong>Investment in DJI Agras T50 (full package):</strong> ~$28,000</li>
        <li><strong>Annual operating costs:</strong> ~$6,000</li>
        <li><strong>Annual net savings:</strong> ~$61,200</li>
        <li><strong>Estimated payback: less than 6 months of spray season</strong></li>
        <li><strong>USDA EQIP cost-share (40–50%):</strong> reduces net investment to ~$14,000–17,000</li>
      </ul>

      <h2>Scenario 3: Commercial service operator (dedicated drone business)</h2>
      <ul>
        <li><strong>Acres treated per season:</strong> 5,000 acres (80 acres/day × 60 spray days)</li>
        <li><strong>Gross revenue:</strong> 5,000 acres × $14/acre = <strong>$70,000/season</strong></li>
        <li><strong>Total costs (fuel, maintenance, insurance, depreciation):</strong> ~$18,000/season</li>
        <li><strong>Estimated net profit:</strong> ~$52,000/season per drone</li>
        <li><strong>DJI T50 payback: under 1 season</strong></li>
        <li><strong>Add a second drone:</strong> revenue scales linearly with minimal overhead increase</li>
      </ul>

      <h2>Hidden benefits of owning your own drone</h2>
      <ul>
        <li><strong>No wheel traffic at critical timings:</strong> VT corn and R3 soybean applications by ground rig damage 3–6% of yield through compaction and lodging. At $200/acre corn value, 3% loss on 500 acres = $3,000 per application.</li>
        <li><strong>Ultra-low volume (ULV) application:</strong> drones use 1–3 gallons/acre vs. 10–20 gallons/acre for ground rigs — less water hauling, faster turnaround per load.</li>
        <li><strong>Timing flexibility:</strong> apply at night, immediately after rain, or on isolated field edges without waiting for an external operator's schedule during peak demand weeks.</li>
        <li><strong>NDVI and mapping revenue:</strong> add a multispectral camera and offer variable-rate application (VRA) scouting maps as a premium service to neighboring farms.</li>
      </ul>

      <h2>When owning your own drone does NOT make sense</h2>
      <ul>
        <li>Total treated acreage is under 300 acres per season with only one crop type</li>
        <li>No one on your operation is willing to get FAA Part 107 + Part 137 certified</li>
        <li>Reliable, competitively priced local operators are already available with quick booking</li>
        <li>Capital is better deployed in seed, inputs, or land rent for your operation size</li>
      </ul>

      <h2>Reduce your upfront cost with USDA EQIP</h2>
      <p>
        USDA EQIP cost-share can cover 40–50% of eligible equipment costs for qualifying operations —
        reducing a $28,000 T50 package to a net investment of $14,000–17,000. Read our{' '}
        <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">complete USDA EQIP funding guide</a>{' '}
        before purchasing.
      </p>

      <h2>Useful tools</h2>
      <ul>
        <li><a href="/drone" className="text-green-700 hover:underline font-medium">Ag drone comparison: DJI, Hylio, XAG</a></li>
        <li><a href="/preturi-pulverizare-drona" className="text-green-700 hover:underline font-medium">Drone spray pricing guide 2026</a></li>
        <li><a href="/unelte/calculator-pret-pulverizare" className="text-green-700 hover:underline font-medium">Spray cost calculator</a></li>
      </ul>
    </div>
  ),
};
