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
        Pentru a opera o dronă agricolă în scop comercial în România, pilotul trebuie să dețină un certificat
        de competență eliberat de AACR. Acest ghid detaliază cursurile, examenul și costurile aferente.
      </p>

      <h2>Tipuri de certificate</h2>
      <ul>
        <li><strong>A1/A3 (Open)</strong>: test online gratuit pe <ExtLink href="https://dronetest.caa.ro">dronetest.caa.ro</ExtLink></li>
        <li><strong>A2 (Open)</strong>: curs teoretic + examen + autoverificare (250 RON taxa examen)</li>
        <li><strong>STS-01 / Specific</strong>: curs complet + examen practic la un centru autorizat</li>
      </ul>

      <h2>Pași pentru certificat STS-01 (recomandat pentru agricultură)</h2>
      <ol>
        <li>Înscriere la un <a href="/operatori?service=training" className="text-green-700 hover:underline font-medium">centru autorizat AACR</a></li>
        <li>Parcurgere curs teoretic (25–40 ore): legislație, meteorologie, operațiuni</li>
        <li>Curs practic pe drona agricolă (8–16 ore): pe teren</li>
        <li>Examen teoretic (60 întrebări, min. 75% corect)</li>
        <li>Examen practic (demonstrație de zbor și proceduri de siguranță)</li>
        <li>Obținere certificat AACR (valid 5 ani)</li>
      </ol>

      <h2>Costuri estimate (2026)</h2>
      <ul>
        <li>Curs teoretic A2: 500–1.200 RON</li>
        <li>Curs STS-01 complet: 2.000–4.500 RON</li>
        <li>Curs DJI Agras avansat: 1.500–3.000 RON</li>
        <li>Taxă examen AACR: 250 RON</li>
        <li>Re-certificare la 5 ani: 500–1.000 RON</li>
      </ul>

      <h2>Centre de formare recomandate</h2>
      <p>
        Vezi lista noastră cu <a href="/operatori?service=training" className="text-green-700 hover:underline font-medium">operatori care oferă cursuri</a>,
        inclusiv Agronix, BOSAL Solutions, La Înălțime Academy.
      </p>

      <h2>Resurse oficiale</h2>
      <ul>
        <li><ExtLink href="https://www.caa.ro">AACR: Certificare piloți drone</ExtLink></li>
        <li><ExtLink href="https://dronetest.caa.ro">DroneTest: Examen online A1/A3</ExtLink></li>
      </ul>
    </div>
  ),

  'alegerea-dronei-agricole': (
    <div className="space-y-6">
      <p>
        Alegerea dronei agricole depinde de suprafața fermei, tipul de cultură, bugetul disponibil și
        disponibilitatea service-ului local. În 2026, piața este dominată de DJI Agras (90% cotă), urmată de
        XAG (6%) și ADT Falcon (3%).
      </p>

      <h2>DJI Agras: Opțiunea populară</h2>
      <ul>
        <li><strong>T25P</strong>: 20L, 17 ha/oră, 45–55.000 EUR. Pentru ferme mici și medii.</li>
        <li><strong>T50</strong>: 40L, 40 ha/oră, 75–95.000 EUR. Cea mai vândută dronă în România.</li>
        <li><strong>T100</strong>: 75L, 70 ha/oră, 110–130.000 EUR. Pentru ferme mari (&gt; 500 ha).</li>
      </ul>
      <p>
        Avantaje DJI: service excelent în România (Nik-ro, BOSAL, RIAGRO), rețea de piese de schimb, software
        matur. Dezavantaje: preț mai mare decât XAG.
      </p>

      <h2>XAG: Alternativa tehnică</h2>
      <ul>
        <li><strong>P100 Pro</strong>: 50L, 32 ha/oră, 70–85.000 EUR. Tehnologie avansată.</li>
        <li><strong>V40</strong>: 16L, 16 ha/oră, 40–50.000 EUR. Pentru începători.</li>
      </ul>
      <p>
        Avantaje XAG: AI integrat, planificare automată, preț mai bun. Dezavantaje: service mai slab în
        România, piese de schimb greu de găsit.
      </p>

      <h2>ADT Falcon: Opțiunea robustă</h2>
      <p>
        Producător chinez mai puțin cunoscut, dar cu drone robuste și prețuri competitive (40–70.000 EUR).
        Reprezentat în România de LandTech și câțiva dealeri regionali.
      </p>

      <h2>Matrice decizională</h2>
      <table className="w-full text-sm border border-gray-200 rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Suprafață</th>
            <th className="p-2 text-left">Dronă recomandată</th>
            <th className="p-2 text-left">Investiție</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t"><td className="p-2">&lt; 100 ha</td><td className="p-2">DJI T25P / XAG V40</td><td className="p-2">45–55K EUR</td></tr>
          <tr className="border-t"><td className="p-2">100–500 ha</td><td className="p-2">DJI T50</td><td className="p-2">75–95K EUR</td></tr>
          <tr className="border-t"><td className="p-2">500–2000 ha</td><td className="p-2">DJI T50 (2 buc) sau T100</td><td className="p-2">150–200K EUR</td></tr>
          <tr className="border-t"><td className="p-2">&gt; 2000 ha</td><td className="p-2">Flotă DJI T100</td><td className="p-2">300K+ EUR</td></tr>
        </tbody>
      </table>

      <h2>Recomandare finală</h2>
      <p>
        Pentru majoritatea fermelor din România, DJI Agras T50 este alegerea optimă: rețea de service extinsă,
        capacitate suficientă, eligibilă AFIR. Cumpără de la dealeri autorizați precum{' '}
        <a href="/operatori/nik-ro" className="text-green-700 hover:underline font-medium">Nik-ro</a> sau{' '}
        <a href="/operatori/riagro" className="text-green-700 hover:underline font-medium">RIAGRO</a>.
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
