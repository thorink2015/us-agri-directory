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
        Agenția de Intervenție și Plăți pentru Agricultură (<ExtLink href="https://aipa.gov.md">AIPA</ExtLink>)
        oferă subvenții pentru achiziția de drone agricole în Republica Moldova prin Fondul Național de
        Dezvoltare a Agriculturii și Mediului Rural (FNDAMR).
      </p>

      <h2>Programul principal: Anexa 3</h2>
      <p>
        Fermierii moldoveni pot beneficia de o subvenție de <strong>50% din costul dronei agricole</strong>,
        plafonată la 200.000 MDL (~10.000 EUR) per beneficiar. Programul este finanțat parțial de UE prin
        <ExtLink href="https://www.eu4moldova.md">EU4Moldova</ExtLink>.
      </p>

      <h2>Eligibilitate</h2>
      <ul>
        <li>Gospodărie țărănească sau SRL agricol înregistrat în Moldova</li>
        <li>Cifra de afaceri &lt; 5 mil. MDL</li>
        <li>Activitate agricolă de minim 12 luni</li>
        <li>Fără datorii la buget</li>
      </ul>

      <h2>Documente necesare</h2>
      <ol>
        <li>Cerere la biroul regional AIPA</li>
        <li>Plan de afaceri simplificat</li>
        <li>Ofertă de la un dealer autorizat</li>
        <li>Copie CUI / extras ONRC (Moldova)</li>
        <li>Certificat ANSA pentru tratamente fitosanitare</li>
      </ol>

      <h2>Dealeri autorizați în Moldova</h2>
      <ul>
        <li><a href="/operatori/bosal-solutions" className="text-green-700 hover:underline font-medium">BOSAL Solutions</a>: dealer oficial DJI</li>
        <li><a href="/operatori/dron-assistance-moldova" className="text-green-700 hover:underline font-medium">DRON Assistance</a>: vânzări + servicii integrate</li>
      </ul>

      <h2>Sfaturi</h2>
      <ul>
        <li>Depune cererea în primele luni ale anului (bugetul se epuizează rapid)</li>
        <li>Folosește consultanți AIPA acreditați</li>
        <li>Asigură-te că drona are certificat ANSA pentru aplicarea pesticidelor</li>
      </ul>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://aipa.gov.md">AIPA: Subvenții agricole Moldova</ExtLink></li>
        <li><ExtLink href="https://www.eu4moldova.md">EU4Moldova: Programul UE</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii și Industriei Alimentare</ExtLink></li>
      </ul>
    </div>
  ),

  'legislatie-ansa-moldova': (
    <div className="space-y-6">
      <p>
        Operarea dronelor agricole în Republica Moldova este reglementată de <strong>ANSA</strong> (Agenția Națională
        pentru Siguranța Alimentelor) și de Autoritatea Aeronautică Civilă a Moldovei (AAC). Spre deosebire de
        România (care aplică regulamentul EASA), Moldova are propriul cadru legislativ adaptat.
      </p>

      <h2>Cadrul legal de bază</h2>
      <ul>
        <li><strong>Hotărârea Guvernului nr. 647/2020</strong>: regulamentul general pentru UAS în Moldova</li>
        <li><strong>ANSA</strong>: autorizează aplicarea produselor fitosanitare cu drona</li>
        <li><strong>AAC Moldova</strong>: înregistrarea și licențierea operatorilor de zbor comercial</li>
      </ul>

      <h2>Autorizarea ANSA pentru tratamente fitosanitare</h2>
      <p>
        Orice operator care dorește să aplice pesticide, fungicide sau fertilizatori cu drona în Moldova
        trebuie să obțină autorizare de la ANSA. Documentele necesare:
      </p>
      <ul>
        <li>Cerere tip ANSA</li>
        <li>Certificat de înregistrare a dronei la AAC</li>
        <li>Licență pilot (sau certificat de competență)</li>
        <li>Contractul cu producătorul/importatorul de drone</li>
        <li>Lista produselor fitosanitare autorizate în Moldova</li>
      </ul>

      <h2>Înregistrarea dronei la AAC Moldova</h2>
      <p>Toate aparatele de zbor cu greutatea peste 250 g trebuie înregistrate. Taxele sunt simbolice (200–500 MDL).</p>

      <h2>Zone restricționate</h2>
      <ul>
        <li>5 km în jurul aeroporturilor (Chișinău, Bălți, Cahul)</li>
        <li>Zonele de frontieră (fâșia de 5 km)</li>
        <li>Zonele Transnistria</li>
      </ul>

      <h2>Diferențe față de România (AACR/EASA)</h2>
      <ul>
        <li>Moldova nu aplică regulamentul european EASA: are cadru propriu</li>
        <li>Nu există clasele Open/Specific/Certified ca în UE</li>
        <li>Autorizarea ANSA pentru pesticide este obligatorie (în RO este MADR)</li>
        <li>Produsele fitosanitare trebuie să fie pe lista ANSA, nu EFSA</li>
      </ul>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://ansa.gov.md">ANSA: Agenția Națională pentru Siguranța Alimentelor</ExtLink></li>
        <li><ExtLink href="https://www.caa.md">AAC Moldova: Autoritatea Aeronautică Civilă</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii Moldova</ExtLink></li>
      </ul>
    </div>
  ),

  'cum-sa-devii-operator-moldova': (
    <div className="space-y-6">
      <p>
        Piața de drone agricole din Republica Moldova este la început, dar crește rapid. Fermele mari de viticultură
        (100.000+ ha) și câmpurile de cereale din nordul și centrul țării reprezintă o oportunitate reală. În 2026,
        mai puțin de 5% din suprafața agricolă este tratată cu drone: restul este piața ta.
      </p>

      <h2>1. Înțelege piața moldovenească</h2>
      <ul>
        <li>1,8 milioane ha teren agricol (câmpuri de cereale, viță de vie, livezi)</li>
        <li>100.000+ ha de viticultură: principala piață pentru drone</li>
        <li>Prețuri: 170–240 MDL/ha (€8.50–12/ha)</li>
        <li>Principali clienți: exploatații mari 200–2000 ha, vinării, asociații agricole</li>
      </ul>

      <h2>2. Forma juridică</h2>
      <ul>
        <li><strong>SRL</strong>: forma recomandată, capital minim 5.400 MDL</li>
        <li><strong>Î.I.</strong> (Întreprindere Individuală): pentru operatori singuri, mai simplu fiscal</li>
        <li>Înregistrare la <ExtLink href="https://egov.md">ASP (Agenția Servicii Publice)</ExtLink>, online sau la ghișeu</li>
      </ul>

      <h2>3. Autorizările necesare</h2>
      <ul>
        <li>Înregistrare dronă la <strong>AAC Moldova</strong></li>
        <li>Autorizare <strong>ANSA</strong> pentru aplicarea produselor fitosanitare</li>
        <li>Curs pilot (cursuri disponibile în Chișinău și Cluj pentru cetățenii moldoveni)</li>
      </ul>

      <h2>4. Finanțarea: subvenție AIPA 50%</h2>
      <p>
        Cel mai important avantaj față de alte piețe: AIPA subvenționează 50% din prețul dronei, cu plafon
        200.000 MDL (~€10.000). O dronă DJI T25P costă ~€45.000 → plătești €22.500, AIPA returnează €10.000.
      </p>
      <ul>
        <li>Depune cerere la AIPA înainte de achiziție</li>
        <li>Drona trebuie să fie pe lista echipamentelor eligibile</li>
        <li>Plata se face după achiziție și prezentarea facturilor</li>
      </ul>

      <h2>5. Primii clienți</h2>
      <ul>
        <li>Contactează direct vinăriile mari (Purcari, Cricova, Mileștii Mici, Château Vartely)</li>
        <li>Asociațiile agricole din nordul Moldovei (Bălți, Edineț, Soroca)</li>
        <li>Postează pe platformele agricole locale și grupurile Facebook de fermieri</li>
        <li>Colaborează cu DRON Assistance pentru subcontractare la început</li>
      </ul>

      <h2>6. Concurența</h2>
      <p>
        Principalii operatori activi: DRON Assistance (lider național), BOSAL Solutions, AgroDron.md.
        Piața are loc pentru mulți operatori noi, în special în zonele rurale și raioanele de sud.
      </p>

      <h2>Resurse oficiale Moldova</h2>
      <ul>
        <li><ExtLink href="https://aipa.gov.md">AIPA: Subvenții pentru echipamente</ExtLink></li>
        <li><ExtLink href="https://ansa.gov.md">ANSA: Autorizare fitosanitară</ExtLink></li>
        <li><ExtLink href="https://asp.gov.md">ASP: Înregistrare firmă</ExtLink></li>
        <li><ExtLink href="https://maia.gov.md">Ministerul Agriculturii Moldova</ExtLink></li>
      </ul>
    </div>
  ),

  'roi-drona-agricola': (
    <div className="space-y-6">
      <p>
        Cea mai frecventă întrebare pe care o pun fermierii este: <strong>merită să cumpăr propria dronă sau
        mai bine apelez la un prestator de servicii?</strong> Răspunsul depinde de suprafața ta, numărul de
        tratamente pe an și disponibilitatea operatorilor din zonă.
      </p>

      <h2>Scenariul 1: Fermă de 200 ha, 3 tratamente/an</h2>
      <ul>
        <li><strong>Cost serviciu extern:</strong> 200 ha × 3 tratamente × 100 RON/ha = <strong>60.000 RON/an</strong></li>
        <li><strong>Investiție DJI Agras T25P:</strong> ~200.000 RON (50.000 EUR)</li>
        <li><strong>Costuri operare anuale:</strong> ~15.000 RON (baterii, mentenanță, asigurare)</li>
        <li><strong>Economie anuală netă:</strong> ~45.000 RON</li>
        <li><strong>Amortizare estimată: 4–5 sezoane</strong></li>
        <li><strong>Beneficiu adăugat:</strong> fără tasare sol (recuperezi 5–8% din recoltă)</li>
      </ul>
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        Concluzie: la 200 ha, drona proprie devine rentabilă dacă tratezi și suprafețele altor fermieri
        din zonă. Poți acoperi 1.000 ha/sezon cu T25P, generând 100.000 RON venituri suplimentare.
      </p>

      <h2>Scenariul 2: Fermă de 500 ha, 3–4 tratamente/an</h2>
      <ul>
        <li><strong>Cost serviciu extern:</strong> 500 ha × 4 × 100 RON/ha = <strong>200.000 RON/an</strong></li>
        <li><strong>Investiție DJI Agras T50 (pachet complet):</strong> ~350.000 RON (85.000 EUR)</li>
        <li><strong>Costuri operare anuale:</strong> ~30.000 RON</li>
        <li><strong>Economie anuală netă:</strong> ~170.000 RON</li>
        <li><strong>Amortizare estimată: 2 sezoane</strong></li>
        <li><strong>Fond AFIR DR-29 (50%):</strong> reducere investiție la ~175.000 RON</li>
      </ul>

      <h2>Scenariul 3: Operator de servicii profesionist</h2>
      <ul>
        <li><strong>Suprafața tratată/sezon:</strong> 3.000 ha (100 ha/zi × 30 zile lucrătoare)</li>
        <li><strong>Venituri brute:</strong> 3.000 ha × 100 RON/ha = <strong>300.000 RON/sezon</strong></li>
        <li><strong>Costuri totale (operare + depreciere):</strong> ~80.000 RON/sezon</li>
        <li><strong>Profit net estimat:</strong> ~220.000 RON/sezon</li>
        <li><strong>Amortizare DJI T50: 1–2 sezoane</strong></li>
      </ul>

      <h2>Beneficii necontabilizate ale dronei proprii</h2>
      <ul>
        <li><strong>Eliminarea tasării solului:</strong> tractorul cu bara de stropit distruge 5–8% din cultură prin călcare. La 500 ha grâu cu recoltă medie de 5 t/ha × 600 RON/t, pierderile sunt 7.500–12.000 RON/sezon.</li>
        <li><strong>Normă ULV:</strong> drona folosește 8–20 L/ha față de 200–300 L/ha la tractor, economie de apă și timp de umplere.</li>
        <li><strong>Flexibilitate maximă:</strong> drona poate trata oricând (noapte, după ploaie, câmpuri izolate) fără dependența de disponibilitatea unui operator extern.</li>
        <li><strong>Date NDVI:</strong> cu o cameră multispectrală atașată, poți monitoriza sănătatea culturilor și aplica tratamente diferențiate (VRA).</li>
      </ul>

      <h2>Când NU merită drona proprie</h2>
      <ul>
        <li>Suprafața sub 150 ha cu un singur tip de cultură</li>
        <li>Nu ai personal instruit sau nu vrei să investești în cursuri pilot AACR</li>
        <li>Există operatori de servicii calificați disponibili rapid în zona ta</li>
        <li>Nu ești eligibil pentru fonduri AFIR și nu ai capital pentru investiție</li>
      </ul>

      <h2>Fonduri AFIR disponibile pentru achiziție dronă</h2>
      <p>
        Prin intervențiile PNS 2023–2027, poți obține 50–80% rambursare din costul dronei. Citește{' '}
        <a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">ghidul complet AFIR pentru drone agricole</a>{' '}
        și consultă{' '}
        <a href="/operatori?service=consultancy" className="text-green-700 hover:underline font-medium">un consultant AFIR din directorul nostru</a>.
      </p>

      <h2>Resurse utile</h2>
      <ul>
        <li><a href="/drone" className="text-green-700 hover:underline font-medium">Comparator drone agricole: DJI, XAG, ADT</a></li>
        <li><a href="/preturi-pulverizare-drona" className="text-green-700 hover:underline font-medium">Prețuri pulverizare cu drona în România 2026</a></li>
        <li><a href="/ghid/fonduri-afir-drone" className="text-green-700 hover:underline font-medium">Ghid fonduri AFIR pentru drone</a></li>
      </ul>
    </div>
  ),
};
