import { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Guide content keyed by slug (matching guides.ts).
 *
 * Sentinel append loop: a body is built one H2 section at a time by
 * replacing the `{/* GUIDE-INSERT-POINT: <slug> *\/}` comment with
 * `[new section JSX] + [sentinel]`. See
 * _memory/code-patterns.md § Long-form content rollout.
 */
export const guideContent: Record<string, ReactNode> = {
  'hire-drone-spray-operator-checklist': (
    <>
      <p>In September 2025, a woman outside Waterloo, Illinois watched a spray drone work the corn field across from her property. Within hours her two service dogs were vomiting, eyes swollen shut. The operator&apos;s flight logs showed the drone never crossed her property line. Wind was five miles per hour, well under the label limit. It still turned into an insurance claim.</p>

      <p>That case is instructive for a reason that has nothing to do with the dogs. It shows that even operators who fly inside the rules can land you, the farmer who hired them, in the middle of someone else&apos;s damage claim. And right now the American ag drone market has a bigger problem than careful operators making marginal calls.</p>

      <p>In 2024 about 9,000 agricultural drones were sold in the United States. Fewer than 1,200 of them got registered with the FAA. That is not a clerical gap. That is a market where the large majority of active ag drones are being flown by someone who either has not finished paperwork the law requires, or has decided not to bother. The American Spray Drone Coalition&apos;s 2025 custom rate average came in at roughly $13 per acre, down from $21 the year before. ASDC president Eric Ringer attributes the collapse to &ldquo;substantial undercutting by non-Part 137 operators willing to accept lower rates, particularly in the corn belt.&rdquo;</p>

      <p>This guide exists because when a drone operator cuts a corner on your field, you are the one federal regulators can come after. Under 40 CFR 170.9(c), you are liable for FIFRA violations committed by anyone &ldquo;employed by or acting for&rdquo; you. That includes the guy with a DJI Agras who showed up because your neighbor recommended him.</p>

      <p>What follows is the checklist every farmer should run before hiring. Three licenses to verify. Insurance numbers to demand. Equipment questions that expose the Facebook Marketplace operator inside thirty seconds. A pricing sanity check against real university data. Twelve contract clauses. Nine red flags worth walking away over. And what to do when something goes wrong after the job.</p>

      <h2 id="three-licenses">The three licenses every legitimate operator must show you</h2>

      <p>No operator can legally spray your field on a for-hire basis with fewer than three credentials. Many are flying with one or two. You need to confirm all three yourself, not take a screenshot someone texts you.</p>

      <h3>Part 107, the starting point</h3>

      <p>The FAA&apos;s Part 107 Remote Pilot Certificate is the entry credential for any commercial drone flight in the United States. On its own it is not enough to legally apply pesticides from a drone. Plenty of operators show you a Part 107 card and hope you do not know the difference.</p>

      <p>You can verify Part 107 yourself at the FAA&apos;s Airmen Inquiry tool (amsrvs.registry.faa.gov/airmeninquiry). Search by the pilot&apos;s full legal name. The record will show certificate type, level, and issue date. It does not show suspensions prominently, so match the name on the card to the name on the record exactly. Full context on the certificate itself is on our <Link href="/regulations/faa-part-107">FAA Part 107 page</Link>.</p>

      <h3>Part 137, the one most operators are missing</h3>

      <p>The FAA Part 137 Agricultural Aircraft Operator Certificate is the one required to legally dispense &ldquo;economic poisons&rdquo; from an aircraft for hire. Drones included. This is the credential that is missing from most operators currently advertising ag spray work online.</p>

      <p>Two tools verify Part 137. First, the FAA Air Operator FAR Search at faa.gov/data/av-info/air-operator-far-search. Filter Part 137 and search by company name. Second, AviationDB at aviationdb.com/Aviation/AirOperatorQuery.shtm. Select FAR Part 137 and type &ldquo;UAS&rdquo; in the Aircraft Operating field. That second trick isolates drone operators from the manned ag aircraft list, which is otherwise buried in crop dusters and helicopters.</p>

      <p>Look at the certificate type carefully. Part 137 comes in two flavors, Commercial and Private. A Private Part 137 holder may only spray property they own, lease, or hold an ownership interest in. If the operator has a Private certificate and tries to charge you, both of you are out of compliance. Demand the Commercial version.</p>

      <p>Ask to see the actual paper certificate. FAA guidance requires operators to carry all applicable certificates during flight. You will see operator type, Chief Supervisor of Operations, authorized aircraft with N-numbers, authorized economic poisons, geographic area of operations, and the associated Section 44807 exemption number. If the drone weighs more than 55 pounds fully loaded, a 44807 exemption is also required. Confirm the exemption at regulations.gov using the FAA-YYYY-XXXX docket number on the certificate.</p>

      <p>NAAA reports roughly 1,082 registered Part 137 drone operators across the country as of fall 2025. ASDC estimates 16.4 million acres were treated by drone in 2025. That works out to about 15,000 acres per certified pilot. It is mathematically impossible for the industry to have done that work without either heavy subcontracting or substantial unlicensed activity. Ask which side of that math your operator sits on. More on the certificate on our <Link href="/regulations/faa-part-137">FAA Part 137 page</Link>.</p>

      <h3>The state pesticide applicator license</h3>

      <p>Federal certificates cover aviation. Pesticide law is state law. Every operator who sprays on your field needs a current state commercial pesticide applicator license with an aerial or UAS category in the state where your field sits.</p>

      <p>Most states publish a searchable database. Iowa uses Category 11 for aerial. North Carolina uses Category P and requires a separate NCDOT UAS permit. California is the heaviest lift in the country and requires a Qualified Applicator License, a Pest Control Aircraft Pilot Certificate, and annual county registration before a drone lifts off a California field. Missouri and Texas do not publish easy lookup tables, so you call.</p>

      <p>Reciprocity helps some, but not universally. Iowa reciprocates with Illinois, Minnesota, Missouri, Nebraska, South Dakota, and Wisconsin. An Illinois-licensed operator can generally work in Iowa through reciprocity, but has to file the paperwork first. &ldquo;I&apos;m licensed in Indiana&rdquo; does not mean licensed for your Ohio field. Our <Link href="/regulations/state-licensing">state licensing directory</Link> links to every lookup tool we could verify.</p>

      <h2 id="insurance">Insurance. Where most farmers get burned.</h2>

      <p>Drone ag is a specialty insurance line. A standard commercial drone policy does not cover agricultural spraying. SkyWatch, one of the largest aviation insurers working drones, states this directly in their policy language: the base policy &ldquo;does not provide coverage for drone chemical spraying operations (unless approved by underwriters).&rdquo;</p>

      <p>This matters because if an operator hands you a certificate of insurance showing $1 million in general aviation coverage and no chemical endorsement, they are insured for crashing their drone into a shed. They are not insured for spraying the wrong product on your soybeans.</p>

      <h3>Chemical coverage tiers, decoded</h3>

      <p>Aerial insurance splits chemical coverage into tiers that farmers rarely see on any certificate unless they ask. Learn these three letter combinations.</p>

      <p><strong>XC (Excluding Chemical)</strong> covers seeds or fertilizer only. Useless for pesticide work. <strong>LC or RC (Limited or Restricted Chemical)</strong> covers seeds, fertilizer, insecticides, fungicides, and usually rodenticides. Adequate for most foliar fungicide work on corn and soybeans. <strong>CC (Comprehensive Chemical)</strong> covers the full range of aerial applications with a short list of named exclusions. Picloram is almost always excluded. Paraquat, some dicamba-based products, and tree farms are commonly excluded.</p>

      <p>If you are applying restricted-use herbicides, you need CC with a clean exclusion page for your specific product. Ask to see the exclusions schedule itself. Not the summary page. The schedule.</p>

      <h3>The numbers to require</h3>

      <p>Based on published rate sheets from BWI Fly and SkyWatch and interviews with ag aviation brokers, here is the floor a farmer should require before signing.</p>

      <p>Minimum $1 million per occurrence aviation liability. Chemical drift endorsement with a sub-limit of at least $100,000, and $300,000 if you work row crops in a tight-patchwork area. Hull coverage matching drone replacement value, which runs $25,000 to $35,000 for a DJI Agras T40 or T50. Workers&apos; compensation if the operator has employees. And you, the farmer, named as additional insured on this specific job.</p>

      <p>A legitimate drone ag operator pays roughly $3,000 to $10,000 per year in insurance premiums. If the operator is quoting you $7 an acre and claims they carry full drift coverage, ask how. The economics do not work.</p>

      <h3>The FOG endorsement question</h3>

      <p>The Farmer, Owner, Grower endorsement is the old ag aviation instrument that extends coverage or clarifies liability between an aerial applicator and the landowner. On the manned side it has been standard for decades. Drone ag insurance is still maturing and FOG equivalent language varies by carrier. Ask the operator&apos;s agent directly: &ldquo;Does this policy include a Farmer, Owner, Grower endorsement or its equivalent, and does it name me as additional insured on this specific job?&rdquo; If the agent fumbles the question, that tells you something about the policy.</p>

      <p>Nationwide rolled out a farm-side drone endorsement (Form FL70355) in late 2024 that covers farmers who fly their own drones on their own land. It does not cover you when you hire someone else. Your own farm insurance almost certainly will not cover a hired applicator&apos;s mistake. Your MPCI crop policy will not cover chemical misapplication damage either. You are relying entirely on the operator&apos;s policy. Verify it. Full breakdown on our <Link href="/insurance">insurance page</Link>.</p>

      <h2 id="equipment-questions">Equipment questions that separate pros from Facebook Marketplace operators</h2>

      <p>Most farmers do not want to become drone engineers. You do not need to. You need five answers from the operator, and the answers have to be specific.</p>

      <h3>Which drone, and how big is the tank</h3>

      <p>Ask for make, model, tank capacity in gallons, effective swath width, and acres per hour at your field&apos;s application rate. A legitimate operator rattles these off. The most common platforms running US row-crop work right now are the DJI Agras T40 and T50 at around 10.5 gallons, 32 to 36 foot swath, roughly 40 to 50 acres per hour at 2 gallons per acre; the Hylio AG-272 at 18 gallons, 40 foot swath, up to 50 acres per hour, NDAA compliant and Texas-built; and the XAG P100 Pro at around 13 gallons. Consumer grade drones under 5 gallons do not belong on commercial row crops. If someone is proposing to spray a quarter section with a 2-gallon rig, walk away.</p>

      <p>Manufacturer marketing numbers are almost always optimistic. Brady Holst, a custom drone operator interviewed by AgWeb, put it plainly: &ldquo;The manufacturer says 30-foot spray width. Your real-world number after you pattern-test it is more like 20.&rdquo; Ask whether they trust the factory number or have a pattern test that says otherwise.</p>

      <h3>Pattern test certificate</h3>

      <p>NAAA&apos;s Operation S.A.F.E. pattern testing program has adapted to drones over the past two seasons. A pattern test uses water-sensitive paper or fluorescent dye to measure actual swath width, droplet size distribution, and coefficient of variation across the swath. The certificate is usually good for two years. A serious drone operator has one. Ask to see it. Date, product used, and altitude and speed parameters should all be on the certificate.</p>

      <h3>Nozzle setup matched to the product label</h3>

      <p>This is where most operators can be separated from the crowd in one question: &ldquo;What droplet size category does the product label require, and which nozzle and pressure combination will you use to produce it?&rdquo;</p>

      <p>The ASABE S572.3 standard defines droplet size categories from Very Fine (under 150 microns) to Ultra Coarse (over 750 microns). Most auxin herbicide labels, meaning dicamba and 2,4-D choline products, require Extremely Coarse or Ultra Coarse. Fungicide labels often want Medium to Coarse. A DJI Agras uses centrifugal rotary atomizers with an adjustable droplet range of 50 to 500 microns. A Hylio AG-272 uses TeeJet flat fan nozzles that can be swapped for air induction types. An operator who cannot match droplet size category to the label language on your product should not be spraying your field.</p>

      <h3>RTK, terrain following, obstacle avoidance</h3>

      <p>Real-time kinematic GPS brings horizontal positioning accuracy from plus or minus 60 centimeters down to plus or minus 10. Terrain-following radar keeps the drone at consistent height above canopy on rolling ground. Obstacle avoidance catches power lines and wind breaks the operator missed on the pre-flight walk. Purdue&apos;s PPP-154 publication reports that the majority of spray drone crashes have occurred with obstacle avoidance disabled. Confirm it stays on.</p>

      <h3>NDAA compliance only if federal money is involved</h3>

      <p>If no federal money is involved and you are paying out of pocket, NDAA does not apply to you. You can legally hire a DJI-using operator in any state. The restriction kicks in when federal funds pay for the work. Post-December 22, 2025, USDA cost-share programs such as EQIP, CSP, and REAP cannot fund applications done with covered Chinese-made drones. If your application is tied to a USDA program, ask for a Blue UAS Cleared List platform like Hylio. Full background on our <Link href="/regulations/ndaa-compliance">NDAA compliance page</Link>.</p>

      <h2 id="label-question">The label question most operators cannot answer</h2>

      <p>The pesticide label is federal law under FIFRA section 12(a)(2)(G). Using a pesticide &ldquo;in a manner inconsistent with its labeling&rdquo; carries civil penalties up to $23,494 per violation for commercial applicators, and criminal penalties up to $25,000 and a year in prison for knowing violations.</p>

      <p>Labels were written for manned aerial application. Drones complicate them.</p>

      <p>Purdue&apos;s Pesticide Applicator Training publication 154 puts the practical issue plainly: &ldquo;Specific information about the carrier volumes, application heights, nozzle types, and droplet sizes that are typical of drone applications are not incorporated in the aerial application sections on product labels.&rdquo; That regulatory gap is a risk farmers carry.</p>

      <h3>Products with drone restrictions</h3>

      <p>Based on extension guidance from Purdue, Penn State, Kansas State, Ohio State, and the University of Arkansas, the following categories regularly cause drone compliance problems.</p>

      <p><strong>Auxin herbicides.</strong> Dicamba-based XtendiMax, Engenia, and Tavium. 2,4-D choline-based Enlist One and Enlist Duo. Labels require specific air induction nozzles, Ultra Coarse droplets, wind under 10 mph, and buffer distances of 110 to 240 feet. Carrier volumes are tough for most drones to meet.</p>

      <p><strong>Paraquat products.</strong> Gramoxone, Parazone. Closed-system transfer required. Certification every three years. EPA restricts most aerial applications.</p>

      <p><strong>Soil fumigants.</strong> Fumigant management plans are incompatible with drone deployment.</p>

      <p><strong>Any product where the label says &ldquo;ground application only&rdquo; or &ldquo;not for aerial application.&rdquo;</strong> These cannot be applied by drone, period.</p>

      <p>Jason Davis, a University of Arkansas Extension Specialist focused on spray technology, told Farm Progress in 2024: &ldquo;You&apos;ve got to follow the label, no matter what. Some of the more recent label interpretations have created some gray areas or some complete no-go zones for some of our drone applications.&rdquo;</p>

      <h3>The gallons-per-acre mismatch</h3>

      <p>Most US pesticide labels were written assuming ground rig (10 to 20 gallons per acre) or manned aerial (2 to 5 gallons per acre). Drone rigs typically apply 1 to 3 gallons per acre, which is below many label minimums. Glyphosate labels often specify 3 gallons minimum aerial. Liberty labels often specify 10. Most fungicide labels on wheat require at least 2 aerial, with 5 preferred for consistent coverage. If the operator wants to fly at 1 gallon per acre on a product whose label says 2, that is a label violation, and you own the risk.</p>

      <p>Before the application, ask the operator to send you the current EPA-registered label for the product, highlight the carrier volume line, and tell you exactly what gallons per acre they will fly. Cross-check the label yourself at the EPA&apos;s Pesticide Product Label System (PPLS) or at Greenbook.net. The label that came with the jug can be older than the current registration.</p>

      <h3>What &ldquo;aerial&rdquo; means on a label</h3>

      <p>This is the quiet fight inside EPA right now. Some states treat drone application as aerial under existing label language. Others require drone-specific state approval. California, Iowa, and Minnesota have issued guidance. Most other states have not. Ask your operator whether the state ag department allows drone use of this specific product under the existing aerial label section. If they shrug, call the state ag department yourself before approving the job.</p>

      <h2 id="pricing">Pricing sanity check</h2>

      <p>University extension custom rate surveys give you a floor. Here is the 2024 to 2025 data that actually matters.</p>

      <div className="guide-table-callout">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Year</th>
              <th>Rate per acre</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>University of Missouri G1274</td>
              <td>March 2025</td>
              <td>$16</td>
              <td>Benchmark custom hire, chemistry excluded</td>
            </tr>
            <tr>
              <td>Iowa State 2024 Custom Rate Survey</td>
              <td>2024</td>
              <td>$10.70</td>
              <td>Aerial, not drone-specific, 130 responses</td>
            </tr>
            <tr>
              <td>Purdue 2025 Indiana Farm Custom Rates</td>
              <td>April 2025</td>
              <td>$13.31</td>
              <td>Aerial, 18 responses</td>
            </tr>
            <tr>
              <td>ASDC 2024 industry average</td>
              <td>2024</td>
              <td>$21</td>
              <td>Drone-specific, member survey</td>
            </tr>
            <tr>
              <td>ASDC 2025 industry average</td>
              <td>2025</td>
              <td>$13</td>
              <td>Drone-specific, attributed to non-licensed undercutting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Add chemistry supply and the full job price typically runs $25 to $60 per acre on commodity row crops. Orchards, vineyards, and specialty crops run 1.5 to 3 times that because of narrower swath geometry and tighter obstacle avoidance.</p>

      <p>Small field minimums matter. On 10 acres or less, expect a minimum charge of $100 to $300 instead of a per-acre rate. Mobilization distance matters too. If an operator has to drive four hours to reach you, a $15 per acre rate is economically impossible without volume.</p>

      <p>If someone quotes you $7 or $8 per acre in the corn belt for a row-crop job, the odds are overwhelming that they are operating without full licensing and insurance. They are not a bargain. They are an uninsured liability attached to your field.</p>

      <p>For the broader cost picture, see our <Link href="/comparisons/drone-vs-ground-rig">drone versus ground rig comparison</Link> and <Link href="/comparisons/drone-vs-airplane">drone versus airplane comparison</Link>.</p>

      <h2 id="contract-clauses">Contract clauses to require</h2>

      <p>Written contract. Always. Verbal agreements get expensive. Based on UAPASTF&apos;s September 2024 Master BMP and standard extension guidance, here are the twelve clauses to put in every spray contract.</p>

      <ol>
        <li><strong>Scope of work.</strong> Field GPS boundaries, acres, product name and EPA registration number, rate per acre, carrier volume in gallons per acre, growth stage or timing window.</li>
        <li><strong>Federal licensing warranty.</strong> Operator warrants current Part 107, Part 137, and 44807 exemption numbers in the contract text.</li>
        <li><strong>State license warranty.</strong> License number, category, state of issue.</li>
        <li><strong>Insurance evidence.</strong> Certificate of insurance attached, naming you as additional insured, with coverage limits and chemical endorsement tier specified.</li>
        <li><strong>Chemistry supply.</strong> Who buys it, who stores it, who bears EPA registration responsibility, who eats a mix error.</li>
        <li><strong>Weather cancellation.</strong> Defined wind thresholds, inversion exclusion, rain-approach exclusion, rescheduling terms.</li>
        <li><strong>Drift liability and indemnification.</strong> Buffer commitments written in. Responsibility allocation between operator and landowner for drift onto third party property.</li>
        <li><strong>Recordkeeping delivery.</strong> Application records including date, time, product, rate, wind, temperature, relative humidity, and GPS log delivered within 30 days.</li>
        <li><strong>Application window guarantee.</strong> Days and hours between your notification and treatment. Refund or rate adjustment if window is missed.</li>
        <li><strong>Payment terms.</strong> Per-acre rate, minimum acreage, fuel or battery surcharge, mobilization fee. Invoice with W-9 on file.</li>
        <li><strong>Dispute resolution.</strong> Governing law, mediation or arbitration clause.</li>
        <li><strong>Calibration verification.</strong> Most recent pattern test date and coefficient of variation percentage attached.</li>
      </ol>

      <p>If the operator resists a written contract, that is your answer. Our <Link href="/start-a-drone-business">start a drone business guide</Link> walks through the other side of this same contract for operators, which tells you what language a legitimate pro is already familiar with.</p>

      <h2 id="weather-timing">Weather and timing realities</h2>

      <p>The UAPASTF Master BMP recommends spraying only when wind is between 3 and 10 miles per hour at the point of release. Under 3 can indicate a temperature inversion, which traps droplets near the ground and lets them drift horizontally into the next county overnight. Over 10, even professional ag drones degrade in accuracy. The DJI T50 is rated to 15 mph, but most operators work to 10.</p>

      <p>Delta T, the gap between dry bulb and wet bulb temperature, is a drift predictor that Australian grain growers have used for years and that US operators are starting to take seriously. Ideal range 2 to 8. Do not spray if Delta T is over 10 or under 0. A $250 Kestrel 5500 meter handles it. Ask the operator if they use one.</p>

      <p>Beyond weather, crop biology sets hard windows.</p>

      <p>Wheat T3 for Fusarium head blight hits at Feekes 10.5.1, roughly 50% early anthesis. The window is five to seven days. Miss it and application value drops most of the way to zero.</p>

      <p>Soybean R3 fungicide sits between R2 and R3, about five to ten days. White mold narrows that to R1 through R2.</p>

      <p>Corn tassel (VT to R1) fungicide runs five to seven days. Tall corn you cannot drive through with a ground rig, which is exactly why drones have taken over this timing in the last two seasons.</p>

      <p>Rice neck and panicle blast runs late boot to 10 percent heading. Narrow, and the window closes fast.</p>

      <p>Alex Harrell, the Leesburg, Georgia farmer who set the world soybean yield record at 218.29 bushels per acre in 2024 on Pioneer P49Z02E, runs two spray drones to cover roughly 500 acres per day on his 4,000 acre operation. He told Farm Journal: &ldquo;The drones are running foliar and fungicide treatments and stink bug spray every day now. We rarely call in an airplane, because we can mix and spray everything ourselves.&rdquo; Harrell credits the ability to hit timing windows during a wet June in 2023 as a key factor in his first record the prior year. The whole case for hiring a drone applicator, versus calling an airplane and waiting, comes down to this. Time is the most expensive input you cannot buy. Training context on our <Link href="/training-and-certification">training and certification page</Link>.</p>

      <h2 id="red-flags">Nine red flags worth walking away over</h2>

      <ol>
        <li><strong>Cannot produce a physical Part 137 certificate.</strong> Flying ag spray without Part 137 is a federal violation with civil penalties up to $75,000 per violation under the 2024 FAA Reauthorization Act, plus up to three years imprisonment under 49 USC 46306.</li>
        <li><strong>Has Part 107 only.</strong> Part 107 is for commercial drone flight. It is not a spraying credential.</li>
        <li><strong>Refuses to show a certificate of insurance.</strong> Or shows one that excludes chemical operations. Or lists themselves personally rather than the business entity.</li>
        <li><strong>Pricing far below market.</strong> Under $10 per acre in the corn belt is a near-certain sign of undercutting by unlicensed operators. ASDC has flagged this publicly.</li>
        <li><strong>Only on Facebook Marketplace or Craigslist.</strong> No business website, no Google Business Profile, no state ag department registration. The absence of a paper trail is the paper trail.</li>
        <li><strong>Cannot explain droplet size requirements on your product label.</strong> If they cannot tell you whether the label requires Coarse or Ultra Coarse, they cannot match the label in practice.</li>
        <li><strong>Cash only, no receipts, no W-9.</strong> This is not tax efficiency. This is an uninsured operator who will vanish if something goes wrong.</li>
        <li><strong>Will not walk the field before spraying.</strong> Skipping the pre-flight walkthrough means they have not looked for the power lines, the beehives, the pond, the tile outlets, or the organic neighbor.</li>
        <li><strong>Dismisses wind or temperature inversion concerns.</strong> &ldquo;It&apos;ll be fine, I&apos;ve sprayed in worse&rdquo; is the line that precedes most drift claims.</li>
      </ol>

      <p>Any one of these on its own is worth a second conversation. Two of them is your answer.</p>

      <h2 id="drift-damage">What to do if drift or damage happens after the job</h2>

      <p>Ninety-five percent of drone spray jobs go without incident. The remaining five percent is why this section matters.</p>

      <p>If you suspect drift or misapplication on your crop or a neighbor&apos;s, move fast.</p>

      <p>Within 24 hours, document with timestamped, GPS-tagged photos and video. Physical pesticide residue disappears within days. Preserve plant tissue, though most states require a state inspector to collect samples for chain of custody. File a complaint with your state pesticide regulatory agency that same day. Some states have notification statutes that run as short as 30 to 60 days. Miss them and your civil case can be dismissed regardless of the merits.</p>

      <p>Within the first week, notify the applicator and the insurance carrier in writing by certified mail. Contact your own crop insurance agent. Most MPCI policies do not cover chemical misapplication, but document the call in case. Do not accept an informal cash settlement before the state investigation is complete. You are giving away standing.</p>

      <p>If damage exceeds a few thousand dollars, consult an ag attorney. The National Agricultural Law Center publishes a 50-state survey of drift liability law. Request a copy of the operator&apos;s flight log and application record through discovery if voluntary cooperation breaks down.</p>

      <p>Statute of limitations for drift negligence is two to four years in most states. Iowa gives you two years on personal injury and five on property damage. Texas is two. Missouri is five. The shorter clock starts at notification in most states, not at harvest. Move fast.</p>

      <p>Minnesota handles roughly 150 pesticide drift complaints a year through MDA, with inspector visits in one to two business days, lab results in two to three weeks, and full investigations taking three to six months. Illinois handled 241 misuse complaints in 2024, with 21 resulting in fines. The enforcement machinery exists. Use it.</p>

      <h2 id="short-checklist">The short checklist</h2>

      <section className="guide-printable">
        <p>Before the operator&apos;s drone lifts off your field:</p>
        <ul>
          <li>Physical Part 137 certificate (Commercial, not Private)</li>
          <li>FAA Airmen Inquiry verified Part 107</li>
          <li>State commercial pesticide applicator license with aerial or UAS category for your state</li>
          <li>Current certificate of insurance naming you as additional insured, with chemical drift endorsement</li>
          <li>Written contract covering GPS field boundary, product, rate, weather terms, and records clause</li>
          <li>Pattern test certificate dated within the last two years</li>
          <li>Field walkthrough completed, with DriftWatch and beehive check</li>
          <li>Label confirmation covering carrier volume, droplet size category, buffer zones, and current EPA registration</li>
          <li>Weather plan with defined wind and Delta T limits</li>
          <li>Post-application record delivery timeline of 30 days maximum</li>
        </ul>
      </section>

      <p>Our <Link href="/buyers-guide">buyer&apos;s guide</Link> has the full 62-question operator interview list and a one-page printable version of this checklist.</p>

      <h2>Closing thought</h2>

      <p>Most American farmers will hire a drone applicator at some point in the next five years. The industry is growing faster than any other aerial application segment. In 2025 about 16.4 million US acres were treated by drone, up almost 60 percent from the year before. Most of those applications went fine.</p>

      <p>The reason to vet hard is not that drone spraying is dangerous. It is that the current market rewards operators who cut paperwork corners, and the legal framework puts the farmer who hires one of them on the hook. A thirty minute conversation with the right questions filters out the operators who cannot pass them. Once you have found one who can, hold onto them.</p>

    </>
  ),
  'year-round-revenue-ag-drone-operators': (
    <>
      {/* GUIDE-INSERT-POINT: year-round-revenue-ag-drone-operators */}
    </>
  ),
};
