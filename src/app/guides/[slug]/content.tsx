import { ReactNode } from 'react';
import Link from 'next/link';
import AffiliateCard from '@/components/affiliate/AffiliateCard';

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
      <p>A DJI Agras T50 kitted for commercial work runs about $33,000. Finance that over five years at 7 percent and you are paying close to $800 every month, whether the drone flies or sits in a shed. In most of the Corn Belt, the spray season lasts five months. That leaves seven months of loan payments with zero spray revenue coming in, and most new operators learn this the hard way their first winter.</p>

      <p>The irony is that the industry is growing faster than ever. The American Spray Drone Coalition reported 16.4 million US acres sprayed by drone in 2025, up 58.7 percent year over year. Those acres are consolidating into fewer, more utilized operators. The ones earning real money are not running spray-only businesses. They are running three to five stacked services and keeping the calendar full from January through December.</p>

      <p>This guide lays out exactly how they do it, backed by named US companies, real 2026 pricing, and the regulatory details most starter guides skip. If you already have your <Link href="/regulations/faa-part-107">Part 107 certificate</Link> and your <Link href="/regulations/faa-part-137">Part 137 operating certificate</Link>, you have the legal foundation to add most of what follows without going back to square one.</p>

      <h2 id="spray-season-math">The spray season math that forces this decision</h2>

      <p>Here is what most &ldquo;how to start a drone business&rdquo; content never tells you. The 2026 Iowa State Farm Custom Rate Survey, the first year drone spraying was a separate category, pegged drone spraying at $12.50 per acre average with a range of $8 to $16. University of Missouri Extension&apos;s 2025 economic model puts a custom operator&apos;s all-in cost at $7.39 per acre at 4,000 acres per year. Your margin is about $5 to $8 per acre, and the whole thing only works if you actually hit 4,000 acres.</p>

      <p>Here is how that breaks down in reality. A solo operator with one drone covers 150 to 250 acres per field day. SweetWater Technologies, a 25-drone fleet based in Wyanet, Illinois, does 300 to 500 acres per drone per day, but that is with full infrastructure, two-person crews, and a tender truck. First-year operators do not hit that number. Infinity Precision Ag, a three-pilot Nebraska outfit that started in 2024, ended their first partial season at 2,500 to 3,000 acres. Their Year 2 target was 6,000 to 7,000.</p>

      <p>Now run the math. At 3,000 acres in a 120-day Corn Belt spray window at $14 per acre, you gross $42,000. Take out your $7.39 per acre cost base and you net about $19,800. Your drone payment alone ate $9,504 of that for the year. Insurance, trucking, batteries, and fuel take most of what&apos;s left.</p>

      <p>AckerSpray&apos;s benchmark is that spray-only becomes a &ldquo;real business opportunity&rdquo; at 3,000 acres minimum, and that is not a profitable business. That is a survivable one. The operators earning $150,000 to $785,000 per year, according to Financial Models Lab&apos;s December 2025 benchmark, are not spray-only shops. They are running four or five services. Everything below is how you get there.</p>

      <h2 id="cover-crop-seeding">Service 1: Cover crop aerial seeding</h2>

      <p>Between August and late October, most of the Midwest sits in a window where the only way to establish cover crops into standing corn or standing soybeans is aerial. Ground drills cannot go in without destroying the cash crop. Airplane crop dusters prefer large blocks over 500 acres and pass on odd-shaped fields. That leaves a clear lane for drone operators with a spreader hopper.</p>

      <p>Real US operators have built real businesses here. Rantizo, the largest licensed drone-application network in the country, covers 30 states. SweetWater Technologies grew from 32,000 acres in 2022 to a 200,000 acre target in 2025 through a franchise model. Cover Crop Innovations in Concord, Massachusetts holds Part 137 certificate 2OVG250Q and specializes in drone seeding into standing corn, soybeans, and cucurbits. American Drones in Wisconsin documented a $20 per acre application rate for a rye and rape mix at 36 pounds per acre on the Rat River Watershed project. Skytech Solutions in Barren County, Kentucky flies a DJI Agras T40 seeding wheat and turnip mix into standing corn at roughly $12 per acre seed cost plus application fee.</p>

      <p>Pricing lands in a tight band. NRCS cites an aerial application premium of $20 to $30 per acre above seed cost. Your application-only fee sits between $18 and $25 per acre, with seed billed separately or passed through at cost. The DJI Agras T50 Spreading System runs $989 at Drone Nerds and $950 at Bestway Ag Kentucky. The T40 Spreader is $825 at Bestway Ag. The T25 Spreading System is $999 at Agri Spray Drones. For a spray drone you already own, the spreader attachment is a one-time investment under $1,200 that unlocks a $35,000 to $75,000 fall revenue stream for a solo operator covering 2,500 to 4,000 acres.</p>

      <figure className="guide-pullquote">
        <p>A $1,200 spreader attachment unlocks a $35,000 to $75,000 fall revenue stream on the same drone you already spray with.</p>
        <cite>On the highest-ROI expansion for an existing Agras operator</cite>
      </figure>

      <p>The angle most operators miss entirely is state cost-share. USDA EQIP pays farmers $50 to $57 per acre for cover crop establishment. Iowa&apos;s Water Quality Initiative adds $30 per acre for first-time users, $20 returning, with a separate $5 per acre crop insurance premium discount for fall 2025 planting. Illinois&apos; Fall Covers for Spring Savings pays a $5 per acre crop insurance discount capped at 190,000 acres statewide, and the 2024 cap filled inside one hour with 241,650 acres requested. Ohio&apos;s H2Ohio pays $20 to $25 per acre for overwintering covers and expanded to 10 additional counties for 2026-27. Maryland MACS is the most generous at a $35 per acre base with add-ons bringing it to $65 per acre, covering roughly 500,000 acres through a $22 million FY26 appropriation. Illinois&apos; Decatur RCPP pays up to $103.80 per acre for multi-species overwintering mixes.</p>

      <p>What this means for your sales conversation: an operator who understands these programs turns a price objection into a program enrollment. A Maryland farmer pays you $22 per acre to seed, and the state pays him $65 per acre to do it. He nets $43 per acre and builds soil. You just made yourself cost-neutral on a transaction that looked expensive. Point customers to <Link href="/grants-and-subsidies">grants and subsidies</Link> for the broader list.</p>

      <p>Agronomic rules matter. NRCS Illinois Tech Note 21 specifies aerial rates at 1.5 to 2 times drilled rates for most species. Brassicas (radish, turnip, oilseed radish), clovers (red, crimson, balansa), annual ryegrass, and cereal rye work well aerially. Peas, faba bean, and sunflower do not. Iowa State&apos;s Mark Lang documents only about nine days between soybean R6 and R6.5 before leaf drop blocks seed-to-soil contact, which is the tightest timing window in the entire cover crop calendar. Wilson et al. (2013, Agronomy Journal) found broadcast rye emergence ranging from 3 to 54 percent depending on first-week moisture after seeding. Your reputation depends on reading the weather forecast correctly.</p>

      <h2 id="ndvi-mapping">Service 2: NDVI mapping and variable rate prescriptions</h2>

      <p>The NDVI and multispectral mapping service is where operators stop being a commodity sprayer and start being an advisor. The hardware cost is modest. A DJI Mavic 3 Multispectral with integrated RTK runs between $4,618 and $5,204 at US dealers like DSLRPros, Advexure, and CDW.</p>

      <p>The software stack has consolidated around five platforms. DroneDeploy&apos;s Ag Lite plan is $1,908 per year. Pix4Dfields is $1,990 annually or $3,990 for a perpetual license. Sentera FieldAgent is quote-based and typical of enterprise-tier deals. Solvi uses credit-based pricing at about $1.40 per acre for plant counts and $0.80 per acre for weed detection. Taranis bundles through ag retailers at $5 to $20 per acre per season depending on crop.</p>

      <p>The income math is cleaner than spray. At $9 per acre for NDVI mapping and 400 acres per field day, you gross $3,600 per day. Run 35 flight days in a growing season and you are looking at $126,000 in gross revenue from a $5,000 drone. Variable rate prescription work, where you interpret the map and output a shapefile or ISOXML file for the farmer&apos;s sprayer, sits at $10 to $20 per acre. Monthly farm monitoring subscriptions run $1,000 to $3,000 per farm per month during the growing season, per UAV Coach&apos;s 2025 benchmark.</p>

      <p>Real case studies make this an easy sell. DroneDeploy published the Dusty Wilkins case on 185 acres of Idaho sugar beets, where NDVI caught a field-wide aphid infestation that ground scouting missed. Recovered revenue came to about $60,000 at $40 per ton. Sentera&apos;s Aerial WeedScout trial across roughly 10,000 Corn Belt acres produced a 70 percent herbicide cost reduction in beta. Iowa State&apos;s drone weed mapping with Sentera drove around $13.42 per acre in cost savings in targeted herbicide trials. A farmer who saves $13 per acre on chemicals across 2,000 acres saved $26,000. Charging him $9 per acre for the map that produced the saving is a rounding error.</p>

      <p>Prescription compatibility finally works in 2026. Pix4Dfields exports ISOXML and ISOBUS files for Case IH AFS, New Holland, AGCO, Trimble, Raven, CLAAS, Amazone, Müller, Topcon, Kubota, and Valtra terminals. Direct integration with the John Deere Operations Center went live in version 2.5. A few gotchas: older John Deere GS3 2630 displays need shapefiles named &ldquo;JD4600&rdquo; in the Rx folder, ISOBUS zips over 10 MB quarantine on some terminals so keep zone counts reasonable, and older Apex software exports shapefile only not ISOXML. For universal fallback, the Pix4D &ldquo;Generic tractor/sprayer&rdquo; shapefile export lands on almost anything.</p>

      <p>The flywheel this creates is the real reason to bother. You scout the field, find the problem zones, then charge to spray them. The mapping service justifies the spray contract and improves application accuracy, which lets you charge a premium per acre on the spray itself. A Certified Crop Adviser credential on top of this pushes your map price from $9 per acre into the $15 to $30 range, because now you are signing an agronomic recommendation, not producing a pretty image.</p>

      <h2 id="livestock-ranch">Service 3: Livestock and ranch services</h2>

      <p>Ranch work is the most reliable winter and shoulder-season income in the ag drone business, and most operators never touch it. The reason is simple. Ranching has no off-season. Cattle, sheep, and horses need monitoring 12 months a year.</p>

      <p>The US cattle inventory sits at 86.2 million head as of January 2026 per USDA NASS. Texas alone runs 12.2 million head on 90.3 million acres of permanent pasture. Nebraska has 6.05 million, Kansas 5.95 million, California 5.05 million, Oklahoma 4.6 million, Missouri 3.95 million, and South Dakota 3.55 million. DroneDeploy estimates 614 million US acres are in grazing or rangeland. If 5 percent of US ranchers adopt four drone missions per year at $300 to $500 each, the addressable spend is over $200 million annually. Almost nobody is serving it.</p>

      <p>The operators who do run ranch work include Landview Drones in the Montana and Idaho region, Sky Hunter TX running thermal predator and feral hog work, Montana Drone Company and Meadowlark Drones on thermal livestock and wildlife surveys, Tex-Air Drone across Texas and Oklahoma and New Mexico, Montana Ag Drones, and Osprey Agri Drones. At the corporate scale, Cargill&apos;s CattleView program runs autonomous feedlot drones and documents $1 per head labor savings, $1 per head feed waste savings, and $6 per head profit lift.</p>

      <p>Pricing on ranch work runs hourly at $150 to $400 per hour for thermal work, per Drone U&apos;s 2026 pricing guide. A two-hour thermal search for a lost cow on 1,000 acres of brush runs $300 to $800. Utah State Extension&apos;s 2025 study &ldquo;Using Thermal Camera Drones in Beef Cattle Roundup&rdquo; by Clawson et al. documented two Autel EVO II Dual 640T V3 drones working alongside horseback crews in mountain terrain and concluded that drones &ldquo;significantly reduced search time and labor.&rdquo; The Autel EVO II Dual 640T V3 lists at $5,299 manufacturer direct, currently the best sub-$6,000 thermal option on the market.</p>

      <p>One legal line matters here, and ignoring it ends careers. The AVMA Policy on Telehealth explicitly requires an in-person physical examination before any diagnosis. Every state veterinary practice act includes diagnosis within &ldquo;practice of veterinary medicine.&rdquo; You may legally observe, count, locate, and report visible events. You may not describe an animal as having fever, BRD, or pinkeye on a client report. The safer framing is &ldquo;points of interest requiring rancher or veterinarian attention.&rdquo; Partner with a licensed vet who holds the valid Veterinarian Client Patient Relationship for any diagnostic language in reports. On <Link href="/insurance">insurance</Link>, BWI Aviation Insurance dominates ag drone liability, with standard $1 million liability-only policies running $275 to $350 per year.</p>

      <h2 id="mosquito-abatement">Service 4: Mosquito abatement contracts</h2>

      <p>Public mosquito abatement districts and county vector control programs are the most overlooked steady-contract business in the drone economy. One company, Leading Edge Aerial Technologies (now Central UAS Technologies after Central Life Sciences acquired it in 2024), documents over 10,000 completed UAS mosquito control flights and 15+ district client contracts across Florida and California. That scale exists because the work is recurring, multi-year, and bid through RFPs most operators never see.</p>

      <p>Real contracts on the books right now include Sarasota County Mosquito Management Services working with Clarke Environmental, Broward County leasing a Leading Edge drone through Cody Cash&apos;s team (100 acres of Tree Tops Park treated in 4 hours versus 2 to 4 days for foot crews), Santa Clara County Vector Control District running Leading Edge pilot Joseph Daviss on 40-pound payload missions, San Mateo County Mosquito and Vector Control District with three drones and an FAA Certificate of Authorization for 55+ pound aircraft, Collier County Mosquito Control using the PrecisionVision 13 for Wide Area Larvicide Spray of VectoBac WDG, and Florida Keys Mosquito Control District running the world&apos;s first aerial larviciding program for dengue vectors.</p>

      <p>EPA labeling now supports drone work on larvicides. VectoBac WDG (EPA Reg. 73049-56, 2024 and 2025 label revisions) permits aerial application at 1.75 to 14 ounces per acre in 0.25 to 10 gallons water per acre through fixed-wing or helicopter aircraft with boom and nozzle or rotary atomizer systems. UAS applications have been executed and peer-reviewed against this label rate, with published research in the Journal of the Florida Mosquito Control Association showing UAV-mounted systems at 1.6 liters per hectare achieving near 100 percent efficacy within 30 to 40 foot swaths. VectoLex CG and Altosid pellets similarly permit aerial use and have been deployed by drone.</p>

      <p>The barrier to entry is licensing, and it is why incumbents dominate. You need the Public Health Pest Control Operator license for your state, which is separate from your ag applicator license. In Florida this is Chapter 388 of the Florida Statutes, not the Chapter 487 ag Restricted Use Pesticide license. The two are not interchangeable. In California it is the California Department of Public Health Vector Control Technician Certification with Category A (pesticides) and Category B (mosquito biology). New Jersey runs through county mosquito commissions. Most districts require $1 to $5 million liability coverage and often a performance bond. See <Link href="/regulations/state-licensing">state licensing</Link> for your state&apos;s specific requirements.</p>

      <p>The math favors relationships over bids. Drones cover about 35 acres per flight versus 34,000 acres per plane, so you lose on raw area but win in dense vegetation, sensitive habitats, and residential-adjacent work where manned aircraft cannot operate. Private contracts (HOAs, resorts, wedding venues, rice farms) run $15 to $25 per acre for large contracted areas. A small district with 2,000 acres of managed wetlands at $18 per acre is a $36,000 annual contract for one client.</p>

      <h2 id="granular-spreading">Service 5: Granular fertilizer and lime spreading</h2>

      <p>The hopper attachment you bought for cover crop seeding also spreads granular fertilizer, urea, potash, and pelletized lime. The DJI Agras T40 spreader carries 110 pounds of dry payload. The T50 spreading system covers irregular field shapes, waterways, and post-harvest saturated soil that ground equipment cannot touch.</p>

      <p>The timing fills two shoulder windows core spray season leaves open. October through November is post-harvest potassium, phosphorus, and lime on fields trafficable but too tight on timing for a spreader truck. March and April is spring preplant fertilizer on small, wet, or irregular fields before your liquid spray season starts.</p>

      <p>The economics resemble liquid spray. Application fees run $8 to $15 per acre on top of material. Specialty crop work pays a premium. A Massachusetts cranberry grower documented on the DJI Mavic Pilots forum that ground equipment places 100 pounds per acre but only 80 pounds end up on the crop. The drone at 10 feet gets into nooks and crannies of irregular bogs that tractors cannot reach. He applies at night, which is a value proposition ground equipment cannot match at any price.</p>

      <p>For operators already running a spray drone, the spreader attachment is probably the highest-return expansion you can make. Under $1,200 of equipment. No new FAA certification. No new software. Two additional seasonal revenue windows that do not conflict with core spray. You can compare the economics against traditional equipment at <Link href="/comparisons/drone-vs-ground-rig">drone vs ground rig</Link> and <Link href="/comparisons/drone-vs-airplane">drone vs airplane</Link>.</p>

      <h2 id="non-ag-mapping">Service 6: Non ag mapping for year round RGB income</h2>

      <p>Your NDVI drone is also an RGB mapping drone. Construction, real estate, and environmental clients pay year round for the same orthomosaic work that produces NDVI maps in summer.</p>

      <p>Construction mapping runs $35 per acre for basic rural work per Recon Aerial Media, up to $60 to $80 per acre for complex as-built feature extraction. Earthwork volume calculations bill $500 to $2,000 per site. Real estate aerial packages for large rural properties price at $300 to $600, with luxury or farmland listings at $600 to $1,500 per property. Environmental and conservation work (wetland delineation, riparian buffer mapping, invasive species monitoring) prices at $500 to $3,000 per parcel and occasionally comes through state conservation districts or NRCS field offices as contract work.</p>

      <p>One warning. Non-ag client work needs different insurance language. Standard ag UAV policies may not cover construction sites. A rider or separate commercial UAS policy is usually required. Confirm this with your insurer before you accept non-ag work.</p>

      <h2 id="calendar">The 12 month calendar that actually gets built</h2>

      <p>A Corn Belt operator with one spray drone plus a mapping drone can run a real 12-month calendar that looks something like this.</p>

      <p>January is contract calls, fleet teardown, equipment inspection, and non-ag mapping. February is spring marketing, USDA program consultations with customers, and crop insurance adjusting work in southern states. March is spring preplant granular spreading on wet fields, first herbicide sprays in Texas and Oklahoma, and early NDVI mapping of spring stand establishment. April is preplant spray in northern states and NDVI baseline mapping for seasonal subscription clients.</p>

      <p>May through July is core spray season at maximum capacity. August is spray continuing while cover crop seeding begins into standing soybeans. This is peak billing month of the year. September is cover crop seeding peak (into corn, into soybean stubble after cutting) and spray winding down. October is post-harvest NDVI analysis, cover crop establishment verification, and fall granular spreading starting. November is fall granular spreading (potassium, phosphorus, lime), ranch and livestock contracts in Texas and the Plains, and construction mapping. December is fleet maintenance, subscription renewals, proposals for next year, and livestock thermal calls tied to weather-related cattle movement.</p>

      <p>A realistic Year 2 revenue model for a solo operator with one spray drone and one mapping drone, if you actually run all the services, looks like this:</p>

      <figure className="guide-table-callout" aria-label="Year 2 revenue model, solo operator with one spray drone and one mapping drone">
        <table>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Days per year</th>
              <th scope="col">Rate</th>
              <th scope="col">Daily output</th>
              <th scope="col">Gross</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Liquid spray</td>
              <td>85</td>
              <td>$14 per acre</td>
              <td>180 acres</td>
              <td>$214,200</td>
            </tr>
            <tr>
              <td>Cover crop seeding</td>
              <td>25</td>
              <td>$12 per acre</td>
              <td>120 acres</td>
              <td>$36,000</td>
            </tr>
            <tr>
              <td>NDVI mapping</td>
              <td>35</td>
              <td>$9 per acre</td>
              <td>400 acres</td>
              <td>$126,000</td>
            </tr>
            <tr>
              <td>Granular spreading</td>
              <td>20</td>
              <td>$10 per acre</td>
              <td>100 acres</td>
              <td>$20,000</td>
            </tr>
            <tr>
              <td>Livestock thermal</td>
              <td>18</td>
              <td>$225 per hour</td>
              <td>6 hours</td>
              <td>$24,300</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>$420,500</strong></td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>That number aligns with the upper range Financial Models Lab projects for diversified operators in Year 2, and it requires building a client base. Year 1 mapping revenue and ranch revenue will both be lower while you establish the relationships. Year 3 is where the subscription model covered further down starts compounding.</p>

      <h2 id="certifications">The certification stack that prices up every service</h2>

      <p>The difference between a $9 per acre NDVI map and a $25 per acre variable rate prescription is a signature. Specifically, the signature of a Certified Crop Adviser from the American Society of Agronomy on the agronomic recommendation.</p>

      <p>The CCA international exam runs $275 to $280, with a local board exam at $100 to $160. You need two years of experience with a BS degree or four years without, plus 40 continuing education units every two years. CareerExplorer pegs CCA median salary at $59,770 and ZipRecruiter shows $70,000 to over $100,000 for dedicated crop advisors. The value to a drone operator is not the employment number. It is the premium it puts on every map you deliver. A CCA-signed prescription jumps from the commodity $5 to $10 per acre range into the $15 to $30 range, because now you are signing an agronomic recommendation the farmer can use to justify an application decision to a state regulator, a crop insurance adjuster, or a landlord.</p>

      <figure className="guide-pullquote">
        <p>A CCA signature lifts an NDVI map from $9 per acre commodity work into a $15 to $30 per acre signed agronomic recommendation.</p>
        <cite>On the single highest-impact credential in the stack</cite>
      </figure>

      <p>Specialty credentials stack on top. The 4R Nutrient Management Specialty is a CCA add-on at $170 that markets directly for variable rate nitrogen prescription work. ASPRS sUAS Mapping Scientist certification (around $475 exam plus $100 application) is the credential for federal or survey-grade mapping work. Infraspection Institute Certified Infrared Thermographer (32 hours plus exam, no expiration, no renewal fee) unlocks thermography services in agricultural and industrial settings. FLIR ITC Level I is a $2,200 four-day course that also opens this niche.</p>

      <p>State pesticide consultant licenses are required to formally recommend rates and products in nearly every state. Iowa&apos;s Agricultural Consultant license (Category 10) is $75. Illinois CPAdM is $60. Nebraska runs around $25. North Dakota has a separate Unmanned Aerial Applicator License at $200 through the ND Aeronautics Commission. California now has the AB 527 Unmanned Apprentice Pilot Certificate and Journeyman Unmanned Pest Control Aircraft Pilot, which are drone-specific certs requiring a QAC application and 20 CEUs every two years.</p>

      <p>For a state-by-state breakdown of what each credential unlocks, see <Link href="/training-and-certification">training and certification</Link>.</p>

      <h2 id="subscription-model">The subscription model most operators never build</h2>

      <p>One question separates operators earning $150,000 per year from operators earning $500,000. Are your clients paying you once per service, or are they on a monthly retainer?</p>

      <p>Ceres Imaging, a fixed-wing aerial imagery company, publishes a case study on a California vineyard that paid $6,000 for a season of imagery and tracked $150,000 in added grape value. Sentera sells FieldAgent tiered annual subscriptions with specific line items like $0.25 per acre for weed and population maps and $1,200 per year flat for unlimited cotton stand count. Taranis sells &ldquo;Subscribed Acres&rdquo; through ag retailers at $5 to $20 per acre per season. Rantizo&apos;s Bronze, Silver, and Gold subscription tiers for its operator network include AcreConnect software as recurring revenue.</p>

      <p>What triggers a farmer to convert from one-off service to a subscription? Documentation is the biggest driver, not farming nostalgia. USDA Risk Management Agency approves drone-derived measurements for flood and hail loss adjustment, and the policyholder must file a damage notice within 72 hours. That deadline favors operators already on retainer who can fly a claim within a day of a weather event. Repeat disease or pest problems (white mold in soybeans, tar spot in corn, iron chlorosis) convert one-off scouting into annual monitoring. Landlord and tenant compliance on cash-rent leases pushes As Applied and As Covered mapping records into lease terms that renew every year. State pesticide reporting requirements in California and Washington force operators to maintain the mapping tool they already use for internal compliance.</p>

      <p>The sample subscription contract from independent US operators is not publicly posted anywhere. This is a real market gap. Ceres&apos;s published structure specifies weekly or bi-monthly flights with Water Stress plus NDVI base, optional RGB, thermal, and chlorophyll add-ons, 48-hour data turnaround, and per-acre billing. Industry guides consistently show seasonal or subscription contracts reduce effective per-acre cost 15 to 25 percent for the farmer versus one-offs.</p>

      <p>For CRM, small operators cobble together Jobber (350,000+ professionals on the platform) or Housecall Pro (around 200,000 users) for customer management, QuickBooks for invoicing, and either Rantizo AcreConnect or DJI SmartFarm for operational data. Rantizo AcreConnect is purpose-built for drone ag with work orders, product usage reports, As Applied and As Covered maps, and job matching across the Rantizo network. It launched March 2024 and is the closest thing the industry has to a standard.</p>

      <h2 id="action-checklist">Operator action checklist</h2>

      <p>If you run a spray-only business today, the moves are sequential, not simultaneous.</p>

      <ol>
        <li>Buy the spreader attachment for your existing Agras drone. Under $1,200.</li>
        <li>Pick your state&apos;s largest cover crop cost-share program and learn every rule. This becomes your sales pitch.</li>
        <li>Identify three to five ranch operations within 45 minutes that run over 2,000 acres. Introduce yourself in December, not in July.</li>
        <li>Order a DJI Mavic 3 Multispectral and a Pix4Dfields license. Start the scouting service the following April.</li>
        <li>Enroll in the CCA exam at your next available sitting. Budget 6 to 12 months of study time.</li>
        <li>Get quotes on Public Health Pest Control Operator licensing in your state. Start paperwork before May.</li>
        <li>Redesign your quote and invoice template to include a monthly subscription option for every farm over 1,000 acres.</li>
      </ol>

      <p>The operators who win the next three years will not be the ones with the biggest spray drones. They will be the ones with the most services stacked, the most credentials behind their name, and the most recurring-revenue contracts signed before the season starts. If you are still starting out on the licensing side, <Link href="/start-a-drone-business">start a drone business</Link> covers the foundation, <Link href="/regulations/faa-part-137">FAA Part 137</Link> covers the operator certificate you need for spray work, and <Link href="/buyers-guide">buyers guide</Link> covers equipment selection before you spend the money.</p>

      <figure className="guide-pullquote">
        <p>The off season is not empty. It is unclaimed.</p>
        <cite>Closing line</cite>
      </figure>
    </>
  ),
  'how-to-become-an-agricultural-drone-pilot': (
    <>
      <p>Hayden Crum was 16 when he and his brother Conner bought their first DJI Agras T20 and started flying jobs off the back of their family&apos;s Adams County, Ohio farm supply store. Four years later Midwest Air has sprayed close to 100,000 acres and runs four trailer setups. Their first custom job almost broke them. &ldquo;We had a generator that was not big enough.&rdquo; It took them four days to spray a single 100-acre field.</p>

      <p>That gap between the pitch and the reality is what this guide is about.</p>

      <p>In 2025, US operators sprayed 16.4 million acres by drone, up 58.7% from the year before, across a field of 1,710 Part 137-certified operators (ASDC 2025 Impact Survey). In the same year the average price per acre fell from $21 to $13, a 38% single-year collapse. The opportunity is real. The margin to waste is not.</p>

      <p>To legally fly a commercial ag spray job in the United States you need a <Link href="/regulations/faa-part-107">Part 107 Remote Pilot Certificate</Link>, a Section 44807 exemption if your drone is over 55 pounds, a <Link href="/regulations/faa-part-137">Part 137 Agricultural Aircraft Operator Certificate</Link>, a <Link href="/regulations/state-licensing">state pesticide applicator license</Link>, FAA aircraft registration, and liability and chemical coverage. Skip any one of those and you are either grounded or exposed to FAA civil penalties that were raised to $75,000 per violation in 2025.</p>

      <p>Here is the step-by-step path, what each step actually costs, and what the operators who stuck with it did differently from the ones who quit in year one.</p>

      <h2 id="what-pilots-do">What an ag drone pilot actually does</h2>

      <p>Daily work is less Instagram and more logistics. A solo operator flying a DJI Agras T40 or T50 covers 400 to 1,200 acres per good day depending on field size, obstacles, and chemical load. The 2026 Iowa State Custom Rate Survey added drone spraying as its own line for the first time, reflecting how common the service has become in row-crop country. Specialty crops, orchards, and vineyards take longer per acre but pay more.</p>

      <p>The season is short. In the Midwest, most of the fungicide work collapses into a three-to-four week window between corn VT stage and soybean R3. In the Delta, Kam Harper at Macon Ridge Specialty Drone Service sprays herbicide on Mississippi Delta fields roughly 90% of the year. &ldquo;In the Mississippi Delta, the majority of what we do is herbicide. That is 90%.&rdquo; In the Mountain West, weed-district contracts dominate and the calendar stretches wider.</p>

      <p>A Part 107 certificate alone lets you fly a drone commercially, for example for mapping or scouting. It does not let you dispense pesticides. For that you need Part 137. Running a spray business as Part 107 only is the single fastest way to get fined or shut down. The FAA&apos;s 2025 enforcement sweep suspended or fined 18 drone operators with penalties between $1,771 and $36,770.</p>

      <p>Fleet size tells you what this market actually looks like. According to the ASDC&apos;s 2025 survey, 69% of Part 137 operators run two drones or fewer, and the average operator flies 9,584 acres per season. Most of the people doing this are solo or two-person shops, not fleets.</p>

      <h2 id="step-1-part-107">Step 1, get your Part 107 Remote Pilot Certificate</h2>

      <p>Everything else waits on this. Part 107 is the FAA&apos;s foundational commercial small-UAS license. No Part 107, no commercial drone flight.</p>

      <p>The knowledge test, the Unmanned Aircraft General (UAG), costs $175 per attempt, paid to PSI Services at booking. The format is straightforward: 60 multiple-choice questions, 120 minutes to finish, 70% to pass. If you fail, there is a mandatory 14-day wait before you can retest.</p>

      <p>The test content is weighted like this:</p>

      <figure className="guide-table-callout" aria-label="Part 107 UAG knowledge test content weighting">
        <table>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Topic</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I</td>
              <td>Regulations (Parts 89 and 107, waivers, Remote ID)</td>
              <td>15 to 25%</td>
            </tr>
            <tr>
              <td>II</td>
              <td>Airspace and operating requirements</td>
              <td>15 to 25%</td>
            </tr>
            <tr>
              <td>III</td>
              <td>Weather</td>
              <td>11 to 16%</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>Loading and performance</td>
              <td>7 to 11%</td>
            </tr>
            <tr>
              <td>V</td>
              <td>Operations (radio, ADM, physiology, maintenance)</td>
              <td>35 to 45%</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>Source: FAA-S-ACS-10B, current version dated April 2021.</p>

      <p>Most first-time test-takers put in 15 to 20 hours of study over two to three weeks. Agricultural-specific guides suggest 8 to 15 hours once you focus on what ag pilots actually need to know. The 2025 FAA pass rate for Part 107 sits at 82.96%, which is the lowest of any FAA airman group. Study the material. Do not assume you will pass cold.</p>

      <p>To hold the certificate you must be at least 16, able to read, speak, write, and understand English, and self-assessed as free from any physical or mental condition that would interfere with safe flight. No medical certificate is required.</p>

      <p>Once you pass, you apply through IACRA with FAA Form 8710-13 and your 17-digit Knowledge Test Exam ID. TSA security vetting runs in the background. Most applicants get a temporary certificate by email in 7 to 14 business days, with the plastic card following in 6 to 8 weeks. See <Link href="/regulations/faa-part-107">our FAA Part 107 page</Link> for the full breakdown of test topics and scheduling.</p>

      <p>To stay current you complete a free online recurrent training course every 24 calendar months. Course ALC-677 on FAASafety.gov covers Part 107 recurrent topics; it takes about two hours of material plus a 45-question quiz. If you let it lapse, you lose Remote Pilot-in-Command privileges until you complete it, but the certificate itself does not expire.</p>

      <AffiliateCard
        slug="pilot-institute-part-107"
        heading="Get your Part 107 certificate"
        bullets={[
          '15 hours of video taught by an FAA Certified Flight Instructor',
          'Pass guarantee, $175 test fee refunded if you fail',
          'Used by 80,000+ students',
          'Lifetime access so you stay current with FAA changes',
        ]}
        ctaLabel="See the Part 107 course"
      />

      <h2 id="step-2-part-137">Step 2, get your Part 137 Agricultural Aircraft Operator Certificate</h2>

      <p>Part 107 covers the flight. Part 137 covers the dispensing. You need both.</p>

      <p>14 CFR Part 137 governs agricultural aircraft operations, meaning the dispensing of economic poisons (pesticides, herbicides, fungicides), plant regulators, seeds, and soil-treatment substances. Section 137.11(a) is the line you cannot cross: no person may conduct agricultural aircraft operations without a valid Agricultural Aircraft Operator Certificate (AAOC).</p>

      <p>Since June 2023, UAS-only applications no longer go to your local FSDO. You email FAA Form 8710-3 and your Section 44807 exemption number to UAS137Certificates@faa.gov at the centralized 137 UAS Operations Office under AFS-700. The process runs through five phases: Preapplication, Formal Application, Document Compliance, Demonstration and Inspection, and Certification.</p>

      <p>Required documents include your operations manual, your congested-area plan if you will fly within 300 meters of one, chemical-handling and container-disposal procedures, pilot competency records, and aircraft make, model, and registration number. FAA Notice 8900.766, effective January 24, 2024, introduced a mandatory Applicant Readiness Checklist specifically to cut down on applicants entering Phase 3 with gaps in their paperwork.</p>

      <p>Timelines vary. Industry reports place most uncomplicated applications at three to six months. Your mileage depends on how clean your paperwork is and how quickly you respond to an FAA Request for Information. The most common rejection reasons in 2024 to 2026 were: failing to respond to an RFI on time, using a P.O. Box instead of a physical address, name mismatches between Form 8710-3 and the Section 44807 exemption holder, and incomplete chemical-handling procedures in the operations manual. See <Link href="/regulations/faa-part-137">our Part 137 page</Link> for the full document checklist.</p>

      <p>Delays matter more than you might think. Investigate Midwest reported that at the start of the 2024 season, at least 200 pilots were still waiting for their Part 137 certificate. Illinois operator Isaac Strubbe&apos;s advice: &ldquo;Drones can do things planes and helicopters can&apos;t.&rdquo; You cannot dispense a single drop of chemical without the certificate in hand. File in the off-season, not when you already have contracts on the line.</p>

      <p>There is no published FAA fee for the Part 137 AAOC. The hidden cost is time: assembling the operations manual, training program, and Applicant Readiness Checklist takes most first-time applicants 40 to 80 hours of work. Some operators pay aviation attorneys or compliance services to prepare the package. AckerSpray publishes a fixed-price compliance bundle at $3,000 that covers Section 44807, Part 137, and FAA registration.</p>

      <h2 id="step-3-state-license">Step 3, get your state pesticide applicator license</h2>

      <p>The FAA regulates your aircraft and your pilot. Your state agriculture department regulates you as a pesticide applicator. These are two separate, simultaneous licensing tracks.</p>

      <p>The legal basis is the Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA), which delegates applicator certification to the states under EPA-approved plans (40 CFR Part 171). The 2017 revision to Part 171 required all states to offer a dedicated aerial specialization for commercial applicators using restricted-use pesticides.</p>

      <p>Two applicator categories matter for drone work:</p>

      <ul>
        <li>A <strong>private applicator</strong> applies restricted-use pesticides on land owned or rented by the applicator or their employer, for agricultural commodity production.</li>
        <li>A <strong>commercial applicator</strong> applies pesticides on someone else&apos;s land for compensation. This is the category most drone spray businesses fall under.</li>
      </ul>

      <p>Every commercial applicator takes a &ldquo;core&rdquo; or general standards exam covering labels, safety, environmental protection, calibration, and drift. Then they take one or more category exams. Aerial is a mandatory federal category. Some states have added drone-specific sub-categories on top of aerial.</p>

      <p>Costs and renewal cycles vary by state:</p>

      <figure className="guide-table-callout" aria-label="Representative state pesticide applicator fees and renewal cycles">
        <table>
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Representative fee</th>
              <th scope="col">Renewal cycle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>California</td>
              <td>$265 Unmanned Apprentice Pilot Certificate</td>
              <td>2-year</td>
            </tr>
            <tr>
              <td>Texas</td>
              <td>Commercial $200 per year, Private $100 (5-yr)</td>
              <td>Commercial annual</td>
            </tr>
            <tr>
              <td>Nebraska</td>
              <td>Commercial $90 (3-yr), Private $25 (3-yr)</td>
              <td>3-year</td>
            </tr>
            <tr>
              <td>Minnesota</td>
              <td>Private $5 to add General Aerial endorsement</td>
              <td>3-year</td>
            </tr>
            <tr>
              <td>Iowa</td>
              <td>IDALS exam plus cert fees, separate company license</td>
              <td>3-year</td>
            </tr>
            <tr>
              <td>Ohio</td>
              <td>Oct 1 to Sept 30 license year</td>
              <td>Annual</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>Source: state agriculture department websites, 2025-2026 fee schedules.</p>

      <p>Reciprocity is limited and unreliable. Even when two states recognize each other&apos;s core exam, they will typically require you to pass the category-specific exam locally. Jonathan Cottingham at Southern Drone OPS built out dealer and pilot coverage in 11 states; each one required a separate state-level license stack.</p>

      <p>If you plan to operate across state lines, budget for three to six months of testing and paperwork across every state on your list. For the full 50-state breakdown and individual state contacts, see <Link href="/regulations/state-licensing">our state licensing directory</Link>.</p>

      <h2 id="step-4-section-44807">Step 4, Section 44807 exemption for drones over 55 pounds</h2>

      <p>The Part 107 weight limit for small UAS is 55 pounds maximum takeoff weight, including payload. A DJI Agras T50 with a full tank weighs 227 pounds. A DJI T100 weighs 390 pounds. A Hylio AG-272 weighs 400 pounds. None of these are legal to operate commercially under Part 107 alone. You need a Section 44807 exemption.</p>

      <p>Section 44807 of 49 U.S.C. gives the FAA authority to let certain UAS operate safely without full airworthiness certification, case by case. The FAA Reauthorization Act of 2024 extended this authority to September 30, 2033 and continued existing exemptions for up to three years beyond their original termination date.</p>

      <p>A 44807 exemption is also needed when the operation itself falls outside Part 107&apos;s scope, for example multi-UAS swarming or BVLOS beyond the standard waiver. Ag spray operators always need one for Part 107 Section 107.36, which non-waivably prohibits hazmat carriage.</p>

      <p>Since 2023, you can reference the FAA&apos;s &ldquo;List of Approved Agricultural UAS under Section 44807&rdquo; (Docket FAA-2023-1271) instead of starting from scratch. If your aircraft is on the list, your petition is essentially a me-too application. Approved airframes include the DJI Agras T40, T50, and T100, the Hylio AG-172 and AG-272, and the Guardian Agriculture SC1.</p>

      <p>Petitions are filed on regulations.gov under 14 CFR Part 11. Section 11.63(d) requires that you file at least 120 days before your needed effective date. There is no FAA filing fee. Industry-reported approval timelines run 30 to 120 days for straightforward ag petitions. Novel operations like BVLOS or swarming take longer.</p>

      <p>On cost, self-filing is free if you do the work yourself. Attorney-filed petitions for a simple me-too ag 44807 typically run $1,500 to $3,500, with some shops publishing $600 fees for individual add-ons like night operations or BVLOS safety cases. Flat fees for routine Part 107 waivers start around $500, and BVLOS petitions can run $10,000 or more. For the full regulatory breakdown see <Link href="/regulations">our regulations hub</Link>.</p>

      <h2 id="startup-costs">What it really costs to start</h2>

      <p>A field-ready ag drone operation is not a $15,000 side project. Budget honestly or plan to be undercapitalized.</p>

      <p>Here is what a realistic first-season setup looks like in 2026:</p>

      <figure className="guide-table-callout" aria-label="First-season ag drone startup cost breakdown, 2026 budgets">
        <table>
          <thead>
            <tr>
              <th scope="col">Line item</th>
              <th scope="col">Low budget</th>
              <th scope="col">Mid</th>
              <th scope="col">High</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Drone (T40 to T50 class)</td>
              <td>$22,000</td>
              <td>$27,000</td>
              <td>$32,000</td>
            </tr>
            <tr>
              <td>Batteries (3 to 6 packs)</td>
              <td>$6,000</td>
              <td>$9,000</td>
              <td>$13,000</td>
            </tr>
            <tr>
              <td>Generator (14 kW +)</td>
              <td>$4,000</td>
              <td>$5,500</td>
              <td>$7,500</td>
            </tr>
            <tr>
              <td>Trailer and mix station</td>
              <td>$5,000</td>
              <td>$10,000</td>
              <td>$18,000</td>
            </tr>
            <tr>
              <td>Licensing and compliance</td>
              <td>$1,500</td>
              <td>$3,000</td>
              <td>$5,000</td>
            </tr>
            <tr>
              <td>Insurance (year 1 premium)</td>
              <td>$4,000</td>
              <td>$7,500</td>
              <td>$10,500</td>
            </tr>
            <tr>
              <td>PPE, mix tanks, spare nozzles</td>
              <td>$1,000</td>
              <td>$2,000</td>
              <td>$3,500</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>$43,500</strong></td>
              <td><strong>$64,000</strong></td>
              <td><strong>$89,500</strong></td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>Source: NuWay Ag Complete Kit pricing, AckerSpray, Drone Spray Pro, Talos Drones, BWI Aviation Insurance 2025-2026 rates.</p>

      <p>A DJI Agras T50 with four batteries and a generator runs about $27,195 through Drone Spray Pro&apos;s package. NuWay Ag&apos;s T50-C10000 complete kit lists at $22,996. A DJI T40 RTF bundle through AckerSpray runs $30,000 to $38,000 with a Westinghouse generator. Trailers range from a DIY bed setup under $5,000 up to $18,000 for a purpose-built enclosed rig with mixing station, lights, and hydraulic jacks.</p>

      <p>Insurance is the line item most new operators underprice. BWI Aviation published a 2025 sample breakdown for a $40,000 DJI T40 policy with full coverage: $5,000 hull, $1,350 liability, $3,500 chemical liability, $607 terrorism and war, total $10,457 per year. You can come in lower on a smaller drone with thinner chemical limits, but budget at least $4,000 for a year one policy that actually covers drift. See <Link href="/insurance">our insurance page</Link> for carrier options and policy structures.</p>

      <p>A Minneapolis Craigslist listing from 2025 offers a cautionary benchmark: an EAVision J-100 spray drone with 85 acres on it, included in a turn-key Minnesota C-Corp with $35,000 in the business account. Essentially never used. The total investment had been made. The acres had not.</p>

      <p>For equipment comparisons by drone class and price-per-acre economics, see <Link href="/buyers-guide">our spray drone buyer&apos;s guide</Link>.</p>

      <h2 id="earnings">What you can actually earn in year 1 and year 2</h2>

      <p>Honest numbers first. Brandon Beal at Elevation Aerial Application in Galax, Virginia documented his year-one revenue at $50,000 flying Christmas tree farms, corn, and pastures. His year-two revenue, with three drones, landed at $170,000 to $180,000 (Drone to 1K Podcast, S7 Ep. 3). That is the documented progression of a well-run solo-to-small-fleet operation. Not all operators hit it.</p>

      <p>Rates vary by region and by what you fly:</p>

      <figure className="guide-table-callout" aria-label="Regional drone spraying rates by zone, 2026">
        <table>
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">$/acre range</th>
              <th scope="col">Key dynamics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Corn Belt (IA, IL, IN, OH, eastern NE)</td>
              <td>$12 to $17</td>
              <td>Most competitive market, large flat fields, heavy operator supply</td>
            </tr>
            <tr>
              <td>Great Plains (KS, NE, ND, SD)</td>
              <td>$12 to $16</td>
              <td>Large open acreage, fewer operators than Corn Belt</td>
            </tr>
            <tr>
              <td>Delta and South (AR, LA, MS)</td>
              <td>$14 to $18</td>
              <td>Manned aerial competition, rice adds complexity</td>
            </tr>
            <tr>
              <td>California specialty crops</td>
              <td>$15 to $35, pheromone $100 to $300</td>
              <td>Regulatory-locked, margin is strong where you can legally operate</td>
            </tr>
            <tr>
              <td>Southeast (GA, AL, SC, NC, FL)</td>
              <td>$16 to $28</td>
              <td>Mixed terrain, higher chemical costs</td>
            </tr>
            <tr>
              <td>Mountain West (WY, MT, CO, ID)</td>
              <td>$14 to $20</td>
              <td>Underserved commercial market, weed-district contracts</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>Source: Iowa State 2026 Custom Rate Survey, NuWay Ag, Ag Partners Coop, Growing Produce, Drone Spray Pro.</p>

      <p>By crop, corn fungicide and cotton defoliation tend to run 15 to 25% above flat-crop rates. Specialty vegetables and vineyards command $18 to $40 per acre because of complexity, trellis systems, and smaller field sizes.</p>

      <p>Rate compression is the single biggest story in 2025. National average prices fell from $21 per acre in 2024 to $13 per acre in 2025, a 38% drop driven largely by the Corn Belt and by non-Part 137 operators willing to fly cheap. Eric Ringer of the American Spray Drone Coalition attributes most of it to undercutting by unlicensed operators. Specialty crop markets, orchards, and vineyards remain much less compressed.</p>

      <p>Gross margin after chemicals, fuel, batteries, and insurance lands somewhere between $5 and $8 per acre at current Midwest rates. A solo operator flying 9,584 acres per season at a $6 net margin earns about $57,500 in year one before owner&apos;s draw. At Brandon Beal&apos;s year-two pace with three drones flying specialty and row crop combined, you are in six-figure territory. The path from one to the other is not linear, and it is not short.</p>

      <p>A typical solo operator in their first full season flies 4,000 to 8,000 acres. Iowa State&apos;s 2026 survey shows Iowa&apos;s average drone spray rate at $11.85 per acre, so a 6,000-acre Iowa solo operator will gross around $71,000. Most of the margin goes back into the second drone, second generator, or hiring a ground crew. See <Link href="/pricing">our pricing pillar</Link> for the full custom-rate breakdown by service and region.</p>

      <h2 id="who-succeeds">What separates operators who build a business from those who quit</h2>

      <p>Four patterns show up across every successful named operator in the 2024 to 2026 coverage.</p>

      <p><strong>Ag roots or a deliberate substitute.</strong> Hayden and Conner Crum started Midwest Air off their family&apos;s 50-year farm supply business. Jonathan Cottingham is a third-generation aerial applicator; his family&apos;s crop-dusting history was his referral network from day one. Kam Harper was a former farm manager whose first customers were his old employer&apos;s neighbors. &ldquo;I was so busy that I couldn&apos;t keep up.&rdquo; If you do not have ag roots, build a deliberate substitute. Partner with a seed dealer, a chemical retailer, or a co-op. Ackerspray&apos;s founder puts it plainly: start with local seed and chemical dealers, not with farmers directly.</p>

      <p><strong>A subcontracting path for day-one revenue.</strong> nuWay FastPass is the most documented example: for an $800 fee, operators who have bought equipment but are waiting on their own Part 137 approval can legally spray as contractors under nuWay Ag&apos;s existing certificate. That gets you flying in one to two weeks instead of three to six months. SweetWater Technologies runs a similar franchise model, going from 32,000 acres in 2022 to a projected 200,000 acres by end of 2025. &ldquo;What we do is in demand.&rdquo;</p>

      <p><strong>Specialization within 12 months.</strong> Harper runs Delta herbicide, 90%. Beal runs Christmas tree fungicide and corn pastures. Crum layered Ohio H2Ohio cover-crop seeding on top of fungicide, exploiting the state&apos;s roughly $50 per acre cover crop program. Operators who stay generalists get squeezed; operators who specialize find rates that have not compressed.</p>

      <p><strong>Regulatory compliance from day one, usually with a second revenue line by year two.</strong> Every successful named operator in the sample runs at least two revenue lines by year two: spraying plus dealer sales, trailer sales, training, or software. Mike Yoder at nuWay Ag runs spraying plus DJI dealer plus trailer manufacturing plus the DroneOn Show plus FastPass subcontracting. Hayden Crum at Midwest Air runs spraying plus DJI dealer plus cover-crop seeding. Taylor Moreland at Agri Spray Drones runs distribution plus the Spray Drone End User Conference.</p>

      <p>The quitters share a different pattern: wrong drone for the job, no Part 137, no state license, insurance gap after a drift claim, or a single customer that bailed. The 2025 Minneapolis Craigslist listing sells a Minnesota spray operation with 85 acres on the drone. The paper trail tells the story.</p>

      <p>Crum&apos;s summary on the selling-to-your-competition question is the right frame for how this industry actually scales: &ldquo;I can&apos;t cover every acre, and I can&apos;t always hit perfect timing for every farmer.&rdquo; If you go in with that mindset, you will find room. See <Link href="/start-a-drone-business">our start a drone business playbook</Link> for the full breakdown on partnerships, pricing, and first-year contracts.</p>

      <h3>Your 90-day launch checklist</h3>

      <ol>
        <li>Create an IACRA account and reserve a PSI Part 107 test date within 30 days.</li>
        <li>Study 15 to 20 hours for the UAG exam. Pass on the first attempt.</li>
        <li>Receive your temporary Part 107 certificate and register the aircraft under Part 47 if it is over 55 pounds, or Part 48 if under.</li>
        <li>File your Section 44807 petition on regulations.gov, referencing the approved airframe list.</li>
        <li>Start your state pesticide applicator core exam prep while the 44807 is pending.</li>
        <li>Once 44807 is granted, draft your Part 137 operations manual and Applicant Readiness Checklist.</li>
        <li>Submit Form 8710-3 to UAS137Certificates@faa.gov with your 44807 exemption number.</li>
        <li>Get insured before the AAOC comes through. Hull, liability, and chemical drift. Budget $4,000 to $10,500 annually.</li>
        <li>Sign one subcontracting agreement (nuWay FastPass, regional operator) so you can book paid work while your AAOC is in review.</li>
        <li>Pick one specialization by month 12: Delta herbicide, corn fungicide, cover crop seeding, orchards, or pheromones.</li>
      </ol>

      <p>Some ag drone operators go on to get their Private Pilot certificate for manned aerial work, either to fly their own scouting plane or to move into mixed-fleet custom application down the road.</p>

      <AffiliateCard
        slug="pilot-institute-private-pilot"
        heading="Going beyond drones? Study for your Private Pilot"
        bullets={[
          '35 hours of video, 850 practice questions',
          'Instructor endorsement included',
          'Pass guarantee',
        ]}
        ctaLabel="See the Private Pilot course"
        variant="compact"
      />
    </>
  ),
  'agricultural-drone-spraying-statistics-2026': (
    <>
      <h2 id="what-this-guide-covers">What this guide covers</h2>

      <p>The US ag drone spray industry tripled treated acreage in 24 months. New unit sales then collapsed by half in a single year, even as flight volume kept climbing. Both things are true. Both have sources.</p>

      <p>Most &ldquo;drone spraying statistics&rdquo; pages on Google recycle the same 5-year-old DJI marketing numbers and unsourced &ldquo;X% of farmers use drones&rdquo; claims that no primary source supports. This guide does the opposite. Every figure below has a named source, a year, and a tier rating. Conflicting figures are flagged. Claims that cannot be traced are excluded.</p>

      <p>If you are a farmer trying to decide whether to hire a drone operator, an operator pricing your services, a manufacturer building a market deck, or a journalist looking for citable data, the numbers below are the ones to use.</p>

      <figure className="guide-figure" aria-label="Hero image placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="Agricultural spray drone treating US cropland in 2025">
          <span className="guide-figure-label">Figure</span>
          <span className="guide-figure-caption-inline">Hero image, ag spray drone over US row crops at low altitude (placeholder).</span>
        </div>
        <figcaption>Image slot 1 of 6. Real artwork pending. Alt text on swap: &ldquo;Agricultural spray drone treating US cropland in 2025.&rdquo;</figcaption>
      </figure>

      <h2 id="adoption">Adoption is real and accelerating</h2>

      <p>The single most important number in US ag drone spraying right now is <strong>16.4 million acres</strong>. That is how much US cropland was treated by spray drones in 2025, according to the <a href="https://americanspraydronecoalition.com" target="_blank" rel="noopener noreferrer">American Spray Drone Coalition&apos;s 2025 Impact Survey</a>, published January 2026. The figure represents a 58.7% jump from 10.3 million acres in 2024, and roughly 4.4 times the 3.7 million acres ASDC documented in 2023.</p>

      <p>ASDC member-distributors represent about 80% of the US ag spray drone market, so the number is a defensible industry estimate rather than a partial sample. It is the cleanest single proxy for adoption.</p>

      <figure className="guide-figure" aria-label="Adoption curve placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="US ag spray drone treated acreage 2023 to 2025, source ASDC">
          <span className="guide-figure-label">Chart</span>
          <span className="guide-figure-caption-inline">Adoption curve: 3.7M (2023), 10.3M (2024), 16.4M (2025) US acres treated.</span>
        </div>
        <figcaption>Image slot 2 of 6. Source: ASDC 2025 Impact Survey. Alt text on swap: &ldquo;US ag spray drone treated acreage 2023-2025, source ASDC.&rdquo;</figcaption>
      </figure>

      <p>The pilot side of the story tracks the same curve. The FAA had certificated <strong>1,710 Part 137 unmanned aircraft operators</strong> by September 2025, per the agency&apos;s <em>Safety Briefing</em> (Sept/Oct 2025 issue, cited in the ASDC report). That is a 58.3% increase year over year. The same figure is corroborated by the FAA&apos;s <a href="https://www.faa.gov/newsroom/BVLOS_NPRM_website_version.pdf" target="_blank" rel="noopener noreferrer">BVLOS Notice of Proposed Rulemaking</a> (Docket FAA-2025-1908, August 2025), which references over 1,700 cumulative ag UAS operator certificates. For context, this number was effectively zero in 2020. See our breakdown of <Link href="/regulations/faa-part-137">Part 137 certification</Link> for what the certificate covers.</p>

      <p>NAAA, the trade group for manned aerial applicators, reports its own snapshot. At its Fall 2025 board meeting, NAAA counted <strong>1,082 registered Part 137 drone operators</strong> among its tracked universe, alongside 1,560 manned operators and 2,028 manned ag pilots. Two different counting methodologies, both useful, both pointing the same direction.</p>

      <p>Adoption inside the manned-aviation industry itself is moving fast. NAAA&apos;s 2025 Industry Snap Survey found <strong>13% of manned aerial application operators reported using drones in 2025, versus 5% in 2024</strong>. That is a 160% one-year jump. Many traditional crop dusters are adding drones to their fleet rather than competing against them.</p>

      <p>On the ag-retail side, the <a href="https://ag.purdue.edu/idaas" target="_blank" rel="noopener noreferrer">2025 CropLife/Purdue Precision Agriculture Dealership Survey</a> (the 25th annual edition) found <strong>27% of US ag retailers offered drone-applied crop inputs in 2025, down from 35% in 2024</strong>, but up sharply from 14% in 2021. The 2024-to-2025 decline appears to reflect retailers exiting after a year of low-margin competition rather than a permanent retreat. The CropLife/Purdue survey is a dealer survey, not a farmer survey, so do not read it as &ldquo;27% of farmers.&rdquo;</p>

      <p>The cleanest farmer-level data point comes from the <a href="https://extension.iastate.edu" target="_blank" rel="noopener noreferrer">Iowa Farm and Rural Life Poll 2025</a>: <strong>22% of Iowa farmers used a drone or drone service in 2024</strong>. Of those, 51% accessed drones through service providers, 37% through retailer or co-op partnerships, and 62% used drones for monitoring or scouting (often the entry point before spray adoption). For state-specific operator listings, see our <Link href="/states/iowa">Iowa state directory page</Link>.</p>

      <figure className="guide-pullquote">
        <blockquote>
          <p>In 2024 about 9,000 ag drones were sold in the US. Only ~1,200 of them got registered with the FAA in the over-55-pound category. An estimated 14% registration rate.</p>
        </blockquote>
        <cite>ASDC presentation, NAAA Fall Board Meeting</cite>
      </figure>

      <p>Most of the FAA-registered ag drones are still uncounted. ASDC presented data at the NAAA Fall Board meeting showing roughly 9,000 ag drones sold in the US in 2024 versus only ~1,200 registered with the FAA in the over-55-pound category, an estimated 14% registration rate. The implication is that official federal counts substantially understate the deployed fleet.</p>

      <h2 id="market-size">The market-size picture, and why it is so messy</h2>

      <p>If you Google &ldquo;agricultural drone market size,&rdquo; you will get nine different numbers from nine different research firms. They disagree by a factor of 5x. Here is the spread, with the most defensible figure first.</p>

      <figure className="guide-table-callout" aria-label="2025 ag drone market size estimates by research firm">
        <table>
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">2025 Base</th>
              <th scope="col">Forecast</th>
              <th scope="col">CAGR</th>
              <th scope="col">Geography</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="https://www.grandviewresearch.com/industry-analysis/us-agriculture-drone-market-report" target="_blank" rel="noopener noreferrer">Grand View Research</a> (US-specific)</td>
              <td>$614.7M (2025); $506.3M (2024)</td>
              <td>~$1.77B by 2030</td>
              <td>23.5%</td>
              <td>US-only</td>
            </tr>
            <tr>
              <td>Grand View Research (global)</td>
              <td>$3.37B (2025)</td>
              <td>$21.59B by 2033</td>
              <td>26.5%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>Mordor Intelligence (current report)</td>
              <td>$1.5B (2025)</td>
              <td>$3.9B by 2031</td>
              <td>16.72%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>MarketsandMarkets</td>
              <td>$2.63B (2025)</td>
              <td>$10.76B by 2030</td>
              <td>32.6%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>Fortune Business Insights</td>
              <td>~$7.4B (2025 implied)</td>
              <td>$23.78B by 2032</td>
              <td>18.5%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>Precedence Research</td>
              <td>$1.92B (2025)</td>
              <td>$12.05B by 2035</td>
              <td>20.16%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>IMARC Group</td>
              <td>$3.46B (2025)</td>
              <td>$29.46B by 2034</td>
              <td>26.85%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>Business Research Co.</td>
              <td>$3.39B (2025)</td>
              <td>$11.79B by 2030</td>
              <td>27.9%</td>
              <td>Global</td>
            </tr>
            <tr>
              <td>DRONEII</td>
              <td>$3.6B (2024)</td>
              <td>$5.7B by 2030</td>
              <td>~7.7 to 8%</td>
              <td>Global</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <figure className="guide-figure" aria-label="Market-size spread chart placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="2025 global ag drone market size estimates by research firm">
          <span className="guide-figure-label">Chart</span>
          <span className="guide-figure-caption-inline">Bar chart of nine research firms&apos; 2025 ag drone market estimates, $1.5B to $7.4B range.</span>
        </div>
        <figcaption>Image slot 3 of 6. Alt text on swap: &ldquo;2025 global ag drone market size estimates by research firm.&rdquo;</figcaption>
      </figure>

      <p>For a US-focused decision, <strong>use Grand View Research&apos;s US-specific figure: $506.3M in 2024 growing to roughly $1.77B by 2030 at a 23.5% CAGR</strong>. It is the only major firm publishing a dedicated US report rather than estimating a regional split off a global headline.</p>

      <p>Within that US market, Grand View breaks out hardware at 50.1%, crop-management applications at 24.7%, rotary-wing aircraft at 62.2%, and outdoor farming at 82.3% of the segment.</p>

      <p>For ground-truth comparison, ASDC projected roughly $1 billion in total US spend on spray drones plus services in 2025, and Hylio&apos;s CEO has publicly estimated US TAM at 10,000 to 15,000 spray drones per year (DTN/Progressive Farmer, January 2026). Both are operator-side estimates and run higher than Grand View&apos;s hardware-only figure, which is consistent: hardware sales are a fraction of total spend.</p>

      <p>A note on press releases. <strong>Mordor Intelligence&apos;s October 2025 PR claims a $5B 2025 market and $13B by 2030</strong>, which directly contradicts its own current report ($1.5B and $3.9B). When you see Mordor&apos;s numbers cited online, check which document they came from. Cite the report, not the press release.</p>

      <p>Take any global forecast claiming a 30%+ CAGR with skepticism. The US-specific 23.5% Grand View number lines up with what ASDC&apos;s actual 2024-to-2025 unit-sales and treated-acreage curves imply. That is the one to anchor on.</p>

      <h2 id="pricing">Cost per acre and operator economics</h2>

      <p>Pricing is where the market is moving fastest, and not in the direction operators wanted.</p>

      <p>The headline: <strong>the average US drone spray service charged $13 per acre in 2025, down 38% from $21 per acre in 2024</strong>, per ASDC&apos;s 2025 Impact Survey. The price collapse was driven by rapid operator entry plus discounting from non-Part-137 actors competing on price. In a market where Chinese-made drones run roughly $30,000 to $40,000 fully kitted and a single-pilot operation can amortize quickly, new entrants undercut established services to fill schedule.</p>

      <figure className="guide-figure" aria-label="Per-acre price comparison placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="US drone spray price per acre 2024 vs 2025">
          <span className="guide-figure-label">Chart</span>
          <span className="guide-figure-caption-inline">$21 (2024) vs $13 (2025) ASDC average, with MU Extension G1274 reference points.</span>
        </div>
        <figcaption>Image slot 4 of 6. Alt text on swap: &ldquo;US drone spray price per acre 2024 vs 2025.&rdquo;</figcaption>
      </figure>

      <p>Owner-operator economics still pencil out at the new lower price for many. The <a href="https://extension.missouri.edu/publications/g1274" target="_blank" rel="noopener noreferrer">University of Missouri Extension Guide G1274</a> puts owner-operator drone cost at <strong>$12.27 per acre at the Midwest-typical scale</strong>, with custom-hire low end at $7.39 per acre and a typical custom-hire price of around $16 per acre. Pricing varies meaningfully by region, crop, and product complexity. See our <Link href="/pricing">drone spraying cost guide</Link> for current per-acre ranges by service type.</p>

      <p>The volume side is steady. ASDC&apos;s average is <strong>9,584 acres treated per operator per year</strong>, a figure that held flat from 2024 to 2025. Pricing fell, fleet utilization did not. <strong>69% of US drone spray operators run two drones or fewer</strong>, and the typical ASDC-member business has 2 to 5 employees. This is mostly small-operator territory, and the new pricing reality is squeezing margins.</p>

      <p>The Made-in-America premium is not covering the gap. ASDC&apos;s 2024 survey found a Chinese-made spray drone has a payback period of roughly 1.5 years, versus more than 4 years for a US-made equivalent, with US-made hardware priced 2.2 to 2.7 times higher per unit. The 2025 follow-up found <strong>49% of operators refuse to pay any premium for a Made-in-America drone</strong>. That is a tough headwind for domestic manufacturers if Chinese imports stay restricted.</p>

      <p>The publicly traded reference point in the space is AgEagle Aerial Systems (NYSE: UAVS), which reported <strong>$13.39 million in revenue for FY2024</strong> (per its <a href="https://www.sec.gov" target="_blank" rel="noopener noreferrer">10-K filed March 31, 2025</a>). Hylio, the largest US-made spray drone manufacturer, has cumulative revenue exceeding $30 million on 850+ drones sold, with 2025 revenue around $13 million. Hylio&apos;s CEO told DRONELIFE the company is scaling production from 500 to 1,000 units per year currently to 5,000 units per year by 2028.</p>

      <p>Iowa State University Extension is adding drone application as a first-time line item in its 2026 <a href="https://extension.iastate.edu" target="_blank" rel="noopener noreferrer">Iowa Farm Custom Rate Survey</a> (205 respondents, 4,698 rates). When custom-rate surveys start tracking a service category, it is no longer experimental. See our <Link href="/states/iowa">Iowa state directory page</Link> for state-specific operator listings.</p>

      <p>Setup capital for a retailer adding drone services runs around <strong>$62,000 in capex plus $13,000 per month in variable costs</strong>, per the 2024 CropLife/Purdue survey. That is why so many retailers added the offering between 2021 and 2024, then walked some of it back in 2025: easy to start, harder to keep margin once per-acre pricing dropped 38%.</p>

      <h2 id="where-flying">By crop and by state, where drones are actually flying</h2>

      <p>Spray drones treated <strong>50+ crop types</strong> in the US in 2024-2025, per ASDC. The action is concentrated in three regions.</p>

      <p><strong>The Mid-South Delta</strong> is the established market. LSU AgCenter&apos;s rice specialists report drone application &ldquo;exploded&rdquo; from 2023 to 2024, with one Louisiana grower scaling from 40 acres treated by drone to 400 to 500 acres in a single season. The University of Arkansas&apos;s Jason Norsworthy documents that more than 90% of weedy rice in Arkansas is now resistant to Clearfield, which is driving heavy demand for drone spot-spray of Provisia rice. Mississippi State&apos;s MAFES (Crow and Tavares) has published peer-reviewed work showing drone insecticide is equally effective as ground-rig application at lower gallons-per-acre in cotton, soybean, and sorghum. Rice, cotton, and soybean are where Delta operators are flying the most acres.</p>

      <p><strong>California specialty crops</strong> are the highest per-acre revenue market. Vineyards, orchards, and high-value row crops in California account for 41 listed operators in agdronedirectory.com&apos;s California state data, the highest count in any state. The state&apos;s <Link href="/regulations/state-licensing">AB 1016 private-applicator UAV pesticide certificate</Link> is the country&apos;s first state-specific drone applicator certification.</p>

      <p><strong>The Corn Belt</strong> is the fastest-growing region, but still secondary in volume. Iowa&apos;s 22% farmer adoption rate is the headline, but Illinois operators like SweetWater Technologies (Wyanet, IL) report scaling from 32,000 acres in 2022 to a projected ~200,000 acres by end of 2025. Beck&apos;s Hybrids field trials in 2023-2024 found drone-applied corn fungicide produced the highest ROI of treatments tested.</p>

      <p>By operator density, the agdronedirectory.com listing data (April 2026) shows <strong>California 41, Nebraska 32, Tennessee 32, Texas 29, Alabama 26, Illinois 25, Kansas 25, Georgia 25</strong>. Flag this number for what it is: a directory listing count, not a count of FAA-verified Part 137 operators in each state. Treat it as a relative-density signal, not absolute count.</p>

      <p>The pre-spray-drone USDA ERS aerial-imagery adoption data from ARMS gives historical context. By 2016 to 2019: corn 7.0%, soybeans 9.8%, winter wheat 3.5%, cotton 2.8%, sorghum 4.6%. Spray-drone adoption is layering on top of those base rates, but USDA NASS does not yet break out drone application as a distinct precision-ag category in the 2022 Census of Agriculture. Official federal statistics lag operational reality by 3 to 5 years in this space.</p>

      <p>For international context: <strong>China&apos;s ag drones treated approximately 173 million hectares (~427 million acres) in 2024</strong>, per the <a href="https://www.dji.com" target="_blank" rel="noopener noreferrer">DJI/Farmers&apos; Daily White Paper on the Agricultural Drone Industry</a>, reported via <em>China Daily</em> (August 27, 2025). That is roughly one-third of all Chinese cropland, and roughly <strong>26 times the US treated acreage</strong>. Brazil is a closer benchmark with 7,832 registered spray drones in 2024 (versus 2,198 in the US over-55-pound FAA registry) and a market projected to grow from $77.4M in 2024 to $291.9M by 2030 at a 25.1% CAGR (Grand View Research).</p>

      <figure className="guide-pullquote">
        <blockquote>
          <p>The US is third or fourth globally in deployed fleet. There is room.</p>
        </blockquote>
        <cite>From: the international context section</cite>
      </figure>

      <h2 id="made-in-america">Made in America vs Made in China</h2>

      <p>The US ag spray drone fleet is roughly 75% Chinese-made today, down from 93% in 2024. Both numbers come from ASDC.</p>

      <p>Per ASDC&apos;s <a href="https://www.reginfo.gov" target="_blank" rel="noopener noreferrer">comments to the Department of Commerce BIS</a> (filed December 19, 2025): <strong>93.5% of agricultural spray drones sold in the United States in 2024 were Chinese-made (predominantly DJI Agras), and that share fell to 75.75% in 2025</strong> after Customs and Border Protection&apos;s UFLPA enforcement actions and the FCC&apos;s December 22, 2025 Covered List ruling.</p>

      <figure className="guide-figure" aria-label="Made in USA vs China share placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="US ag spray drone manufacturer origin share 2024 vs 2025">
          <span className="guide-figure-label">Chart</span>
          <span className="guide-figure-caption-inline">Stacked bar: 2024 (93.5% Chinese, 6.48% US) vs 2025 (75.75% Chinese, 24.25% US).</span>
        </div>
        <figcaption>Image slot 5 of 6. Alt text on swap: &ldquo;US ag spray drone manufacturer origin share 2024 vs 2025.&rdquo;</figcaption>
      </figure>

      <p>DJI&apos;s specific share dropped harder. ASDC reports <strong>DJI&apos;s US ag drone unit sales fell roughly 95% from 2024 to 2025</strong>. Eric Ringer of ASDC has stated DJI accounts for approximately 80% of US spray drone flights (existing fleet), though new sales have stalled. The fleet is still mostly DJI; the new orders are not.</p>

      <p>The regulatory inflection points are dated. The <a href="https://docs.fcc.gov" target="_blank" rel="noopener noreferrer">FCC Public Notice DA 25-1086</a> (Public Safety and Homeland Security Bureau) added foreign-made UAS and components to the Covered List, effective December 22, 2025. The notice applies to new model authorizations, not existing equipment. DJI filed a 9th Circuit petition challenging the action on February 20, 2026 (per Commercial UAV News). A separate FCC waiver issued in January 2026 (per Morgan Lewis legal alert) extends authorization for Blue UAS-cleared and qualified domestic models through January 1, 2027.</p>

      <p>The Blue UAS Cleared List, transitioned from DIU to DCMA in July 2025, includes <strong>39+ approved platforms and 165+ cleared critical components</strong>. None of the major DJI Agras models appear on it. See our <Link href="/regulations/ndaa-compliance">NDAA compliance guide</Link> for what this means for federal-customer operators.</p>

      <figure className="guide-pullquote">
        <blockquote>
          <p>New US ag drone unit sales fell 59% in 2025. Treated acreage grew 59% the same year. Existing fleets are flying harder while the supply pipeline tightens.</p>
        </blockquote>
        <cite>On the 2025 sales-versus-acreage paradox</cite>
      </figure>

      <p>Total new US ag drone unit sales fell from 8,950 in 2024 to <strong>3,711 in 2025, a 59% one-year decline</strong> (ASDC). At the same time, treated acreage grew 59%. More flying with fewer new drones. Existing fleets are working harder while the supply pipeline has tightened.</p>

      <p>The domestic-manufacturer side is real but uneven. Hylio (Texas) shipped 850+ drones cumulatively for $30M+ revenue and has produced public production-scale targets. AgEagle reported $13.39M FY2024 revenue. Talos Drones, Raptor Dynamic, and Revolution Drones are smaller but operating. The cautionary tale: <strong>Guardian Agriculture (Woburn, MA) closed its doors in August 2025 after raising $51.7 million, having built only 8 aircraft against $100M+ in pre-orders</strong> (per The Robot Report). Capital does not equal execution in hardware.</p>

      <p>The single FAA milestone for US-made hardware: in March 2024, Hylio received the first FAA-approved single-pilot swarm operation for three drones over 55 lb, granted under a Section 44807 exemption.</p>

      <p>The 44807 exemption process itself is the underlying enabler. Per the <a href="https://www.faa.gov/data_research/aviation/aerospace_forecasts/2025_uas_and_aam_full_document.pdf" target="_blank" rel="noopener noreferrer">FAA Aerospace Forecast FY2025-2045</a>: <strong>Section 44807 spray drone exemptions grew at a 115% four-year CAGR (2021 to 2024)</strong>, and registered ag drones over 55 lb grew at 133% CAGR over the same period.</p>

      <h2 id="environmental">Environmental performance</h2>

      <p>This section has the most rigorous peer-reviewed data of anything in the ag drone literature. If you only cite five drone-spraying numbers, three of them should come from this section.</p>

      <p><strong>Pesticide use cuts.</strong> A <a href="https://www.nature.com/articles/s41598-025-19473-x" target="_blank" rel="noopener noreferrer">2025 meta-review in <em>Nature Scientific Reports</em></a> synthesized peer-reviewed studies and found drone spraying reduces pesticide use by <strong>46 to 75% versus conventional ground or airblast application</strong>. The wide range reflects crop, formulation, and target differences. The lower bound is conservative.</p>

      <p><strong>Drift reduction.</strong> A 2025 ScienceDirect vineyard study (<a href="https://www.sciencedirect.com/science/article/pii/S2772375525009724" target="_blank" rel="noopener noreferrer">S2772375525009724</a>) measured optimized UAV application against airblast at field boundaries and recorded <strong>65 to 70% drift reduction</strong>. Drift is the single biggest off-target environmental concern in airblast applications. Drone systems with low-altitude precision targeting cut it dramatically.</p>

      <figure className="guide-pullquote">
        <blockquote>
          <p>Drone application reduced operator chemical exposure by 90 to 99% versus handheld backpack application. The applicator never handles the spray cloud directly.</p>
        </blockquote>
        <cite>ACS Agricultural Science and Technology, 2023</cite>
      </figure>

      <p><strong>Operator exposure.</strong> A 2023 <a href="https://pubs.acs.org/doi/10.1021/acsagscitech.3c00253" target="_blank" rel="noopener noreferrer">ACS <em>Agricultural Science and Technology</em> study</a> measured pesticide exposure to applicators and found <strong>drone application reduced operator chemical exposure by 90 to 99% versus handheld backpack application</strong>. The applicator never handles the spray cloud directly. This is the single biggest worker-safety argument for drone application.</p>

      <p><strong>Water and energy.</strong> A 2024 <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0323779" target="_blank" rel="noopener noreferrer">PLOS ONE Life Cycle Assessment</a> found drone ULV application reduces fluid use by <strong>71.8%</strong> and energy consumption by <strong>30%</strong> versus conventional ground-rig application.</p>

      <p><strong>Carbon and soil.</strong> An LCA case study in Idaho measured drone application at <strong>14.49 kg CO2 per hectare versus 41.28 kg per hectare for ground rig</strong>, roughly a 65% reduction. Soil compaction is effectively zero with drones (no ground contact) versus ground rigs that apply 15,000 to 20,000 lb of pressure per pass (Purdue Extension PPP-154). The same Idaho case documented an ~8% yield improvement after switching from ground to drone application in compacted fields, attributed to compaction relief. Yield numbers from a single case study, so flag accordingly. Pressure and CO2 figures are solid.</p>

      <figure className="guide-figure" aria-label="Environmental performance bar chart placeholder">
        <div className="guide-figure-placeholder" role="img" aria-label="Drone vs ground spraying environmental performance, peer-reviewed studies">
          <span className="guide-figure-label">Chart</span>
          <span className="guide-figure-caption-inline">Pesticide reduction 46 to 75%, drift 65 to 70%, operator exposure 90 to 99%, water 71.8%.</span>
        </div>
        <figcaption>Image slot 6 of 6. Alt text on swap: &ldquo;Drone vs ground spraying environmental performance, peer-reviewed studies.&rdquo;</figcaption>
      </figure>

      <p><strong>Field efficacy.</strong> UC Davis trials at the Rice Experiment Station documented <strong>over 90% weed control efficacy with drone application matching or exceeding ground-rig benchmarks</strong>, though drift was recorded up to 100 feet from sprayed plots in early-stage trials. Mississippi State&apos;s MAFES work on cotton, soybean, and sorghum confirmed drone insecticide application is equally effective as ground rigs at lower gallons-per-acre. See our comparison page on <Link href="/comparisons/drone-vs-ground-rig">drone vs ground rig spraying</Link> for the full performance picture.</p>

      <p>These are the numbers that hold up to scrutiny. Avoid the &ldquo;30% chemical reduction&rdquo; and &ldquo;90% water savings&rdquo; figures that recur in vendor blogs. Both have been superseded by the peer-reviewed numbers above.</p>

      <h2 id="regulation-2030">Regulation, barriers, and the road to 2030</h2>

      <p>Three regulatory pivots will shape the 2026 to 2027 market.</p>

      <p><strong>Part 108 BVLOS, final rule expected Spring 2026.</strong> The <a href="https://www.faa.gov/newsroom/BVLOS_NPRM_website_version.pdf" target="_blank" rel="noopener noreferrer">FAA&apos;s BVLOS NPRM</a> (Docket FAA-2025-1908) was published August 7, 2025 (700+ pages). Comment period closed October 6, 2025. The proposed rule would permit ag operations of <strong>up to 25 drones per single pilot</strong>, with aircraft up to 1,320 lb maximum gross weight, eliminating the per-flight Part 107 waiver process for many ag missions. If finalized as proposed, the operator-economics math changes substantially: one operator running a 25-drone swarm changes the per-acre cost equation in ways the current $13/acre price does not capture.</p>

      <p><strong>FCC Covered List, effective December 22, 2025.</strong> Discussed above. The waiver path through January 1, 2027 keeps existing inventory legal but constrains new model authorizations.</p>

      <p><strong>State pesticide applicator licensing remains fragmented.</strong> California&apos;s AB 1016 created a private-applicator UAV pesticide certificate. Most other states fold drone applications into existing aerial categories. There is no consolidated cross-state count of drone-specific applicators, and operators expanding across state lines need to verify each state&apos;s requirements individually. Our <Link href="/regulations/state-licensing">state licensing hub</Link> tracks current requirements by state.</p>

      <p><strong>Insurance underwriting is tightening but available.</strong> Premium ranges have settled at roughly $3,000 to $10,000+ per year for a single-drone Part 137 operator, varying by chemical liability limits, fleet size, and state. The 1/3/1 structure ($1M aviation, $100K/$300K/$100K chemical) is industry standard. BWI, SkyWatch, VT Insurance Agency, AssuredPartners Aerospace, and (as of January 2026) Coverdrone are the active markets. Verifly/Skyward exited. See our <Link href="/insurance">insurance guide</Link> for current market coverage.</p>

      <p><strong>The safety-encounter line is moving the wrong way.</strong> NAAA&apos;s annual survey of manned aerial applicators reports the share of operators who experienced an unsafe encounter with a drone rose from <strong>11% (2023) to 16% (2024) to 20% (2025)</strong>. NAAA frames this as a basis for stronger separation rules. Most encounters are believed to involve recreational or hobby drones, not Part 137 operators, but the data does not disaggregate. This will be an active regulatory front through 2026 to 2027.</p>

      <p><strong>The substitution effect.</strong> NAAA&apos;s 2025 data shows manned ag aviation declined in the same year drone-using operations rose. Average acres per manned operation fell 17% year over year, and 49% of operators flew fewer acres than in 2024. This is substitution, not pure additive growth. The total ag-aviation pie is roughly stable; drones are taking share from manned aircraft, especially for smaller fields and specialty applications.</p>

      <p><strong>Total cropland treated by all ag aircraft (manned plus unmanned)</strong> is approximately <strong>137 million acres annually</strong>, per NAAA&apos;s 2026 release. Spray drones at 16.4M are about 12% of that total today, up from under 3% in 2023. The trajectory points to drone share crossing 25% before 2030 if the current curves hold and Part 108 lands.</p>

      <h2 id="methodology">Methodology and caveats</h2>

      <p>Every figure in this guide carries a tier label in the master source list below. <strong>Tier 1</strong> sources are primary documents from FAA, USDA, NAAA, ASDC, university extension services, or peer-reviewed journals. <strong>Tier 2</strong> sources are paid market-research firms with disclosed methodology. <strong>Tier 3</strong> sources are aggregator articles or vendor white papers used only when reporting on Tier 1 or 2 material.</p>

      <p>Specific caveats farmers and operators should know:</p>

      <p>ASDC has an advocacy posture. The coalition was formed in 2024 to oppose Chinese-drone bans. Its acreage and economic figures are derived from member-distributor surveys covering ~80% of the US ag spray drone market. Best available, but methodology should be considered. The December 19, 2025 BIS submission and January 2026 Impact Survey are the freshest, most-cited primary documents.</p>

      <p>The CropLife/Purdue Precision Agriculture Dealership Survey is a <strong>dealer survey, not a farmer survey</strong>. The 2025 edition sampled 93 ag retail input suppliers, mostly Midwest field-crop dealers. Statements like &ldquo;X% of farmers use drones&rdquo; cannot be derived from it.</p>

      <p>NAAA membership does not equal industry headcount. NAAA had 1,391 total members in September 2025 but estimates 1,560 manned operators plus 2,028 manned ag pilots plus 1,082 Part 137 drone operators, ~4,670 industry persons. The 1,082 drone-operator figure is NAAA&apos;s count of FAA-issued certificates, not its members.</p>

      <p>USDA NASS does <strong>not</strong> yet break out drone application as a distinct precision-ag category in the 2022 Census of Agriculture. Official federal statistics lag operational reality by 3 to 5 years.</p>

      <p>The FAA does not appear to publish year-end Part 137 holder counts as a public time series. The September 2025 figure (1,710) is via FAA <em>Safety Briefing</em>; the cumulative 1,700+ is from the August 2025 BVLOS NPRM. Year-by-year reconstructions for 2020 to 2024 require FOIA.</p>

      <h2 id="mega-table">The 20 highest-signal statistics</h2>

      <p>The reference table below is the citable core of this guide. It is also the <em>Dataset</em> object emitted in the page schema, so AI engines and Google Dataset Search can index the table directly. Each row carries source and year. Where two sources publish different counts of the same metric, both are shown.</p>

      <figure className="guide-table-callout" aria-label="20 highest-signal US agricultural drone spraying statistics for 2026">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Metric</th>
              <th scope="col">Value</th>
              <th scope="col">Source</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>US acres treated by spray drones</td><td>16.4M (+58.7% YoY)</td><td>ASDC 2025 Impact Survey</td><td>2025</td></tr>
            <tr><td>2</td><td>YoY treated-acreage growth</td><td>+58.7%</td><td>ASDC</td><td>2025 vs 2024</td></tr>
            <tr><td>3</td><td>FAA-approved Part 137 UAS operators</td><td>1,710 (+58.3% YoY)</td><td>FAA <em>Safety Briefing</em></td><td>Sept 2025</td></tr>
            <tr><td>4</td><td>Avg acres per operator per year</td><td>9,584</td><td>ASDC</td><td>2025</td></tr>
            <tr><td>5</td><td>Avg US drone spray price per acre</td><td>$13 (down 38% YoY)</td><td>ASDC</td><td>2025</td></tr>
            <tr><td>6</td><td>Rural economic activity from drone services</td><td>$215M</td><td>ASDC</td><td>2024</td></tr>
            <tr><td>7</td><td>Chinese-made share of US ag spray drone sales</td><td>93.5% to 75.75%</td><td>ASDC</td><td>2024 to 2025</td></tr>
            <tr><td>8</td><td>New US drone unit sales YoY</td><td>8,950 to 3,711 (down 59%)</td><td>ASDC</td><td>2024 to 2025</td></tr>
            <tr><td>9</td><td>NAAA operators using drones</td><td>5% to 13%</td><td>NAAA Snap Survey</td><td>2024 to 2025</td></tr>
            <tr><td>10</td><td>US ag retailers offering drone applications</td><td>27% (down from 35%)</td><td>CropLife/Purdue 2025</td><td>2025</td></tr>
            <tr><td>11</td><td>Iowa farmers using drone or drone service</td><td>22%</td><td>Iowa Farm Poll</td><td>2024</td></tr>
            <tr><td>12</td><td>US ag drone market size</td><td>$506.3M (2024) to $1.76B (2030) at 23.5% CAGR</td><td>Grand View Research</td><td>2025</td></tr>
            <tr><td>13</td><td>Pesticide use reduction (peer-reviewed range)</td><td>46 to 75%</td><td>Nature Sci. Reports meta-review</td><td>2025</td></tr>
            <tr><td>14</td><td>Drift reduction at field boundary</td><td>65 to 70%</td><td>ScienceDirect vineyard study</td><td>2025</td></tr>
            <tr><td>15</td><td>Operator pesticide exposure reduction</td><td>90 to 99%</td><td>ACS Ag Sci and Tech</td><td>2023</td></tr>
            <tr><td>16</td><td>Water/fluid use reduction (LCA)</td><td>71.8%</td><td>PLOS ONE</td><td>2024</td></tr>
            <tr><td>17</td><td>Hylio cumulative drones sold / revenue</td><td>850+ / over $30M</td><td>AgFunderNews / DRONELIFE</td><td>2025</td></tr>
            <tr><td>18</td><td>Section 44807 spray drone exemption CAGR</td><td>115%</td><td>FAA Aerospace Forecast</td><td>2021 to 2024</td></tr>
            <tr><td>19</td><td>China drone-treated cropland</td><td>~173M ha (~1/3 of farmland)</td><td>DJI/Farmers&apos; Daily White Paper</td><td>2024</td></tr>
            <tr><td>20</td><td>NAAA reported manned-vs-drone unsafe encounters</td><td>11% to 16% to 20%</td><td>NAAA</td><td>2023, 2024, 2025</td></tr>
          </tbody>
        </table>
      </figure>

      <h2 id="sources">Sources</h2>

      <p><strong>Tier 1 primary sources used:</strong></p>
      <ul>
        <li>American Spray Drone Coalition (ASDC) 2025 Impact Survey, January 2026</li>
        <li>ASDC Comments to U.S. Department of Commerce BIS, December 19, 2025 (reginfo.gov)</li>
        <li>FAA Aerospace Forecast FY 2025 to 2045</li>
        <li>FAA BVLOS NPRM, Docket FAA-2025-1908, August 7, 2025</li>
        <li>FAA <em>Safety Briefing</em>, September/October 2025 issue</li>
        <li>FCC Public Notice DA 25-1086 (Covered List action), December 22, 2025</li>
        <li>NAAA Fall Board Meeting reports and annual surveys (agaviation.org)</li>
        <li>2025 CropLife/Purdue Precision Agriculture Dealership Survey, 25th edition</li>
        <li>Iowa State University Extension, Iowa Farm and Rural Life Poll 2025</li>
        <li>Iowa State University Extension, Iowa Farm Custom Rate Survey 2026</li>
        <li>University of Missouri Extension Guide G1274</li>
        <li>Mississippi State University MAFES (Crow, Tavares)</li>
        <li>LSU AgCenter rice specialists (Webster, Levy)</li>
        <li>University of Arkansas (Norsworthy, Provisia rice spot-spray)</li>
        <li>UC Davis / UC ANR rice and specialty-crop research</li>
        <li>USDA Economic Research Service ARMS data</li>
        <li>AgEagle Aerial Systems Form 10-K, filed March 31, 2025</li>
        <li><em>Nature Scientific Reports</em> meta-review (s41598-025-19473-x)</li>
        <li>ScienceDirect vineyard drift study (S2772375525009724)</li>
        <li>ACS <em>Agricultural Science and Technology</em> exposure study (10.1021/acsagscitech.3c00253)</li>
        <li>PLOS ONE LCA study (pone.0323779)</li>
      </ul>

      <p><strong>Tier 2 market-research sources:</strong></p>
      <ul>
        <li>Grand View Research (US-specific and global ag drone market reports)</li>
        <li>Mordor Intelligence Agriculture Drones Market Report</li>
        <li>MarketsandMarkets, Fortune Business Insights, Precedence Research, IMARC Group</li>
        <li>DRONEII (Drone Industry Insights)</li>
        <li>DJI Agricultural Drone Industry Insight Report 2025</li>
      </ul>

      <p><strong>Tier 3 (used only when reporting on Tier 1 or 2 material):</strong></p>
      <ul>
        <li>AgFunderNews, DRONELIFE, Farm Progress, AgAirUpdate, Agriculture Dive, Iowa Capital Dispatch, Commercial UAV News, The Robot Report, DTN/Progressive Farmer</li>
      </ul>

      <p>This guide is updated quarterly. If you spot a figure that has been superseded, email Eugen at the address on the <Link href="/about">About page</Link> and we will update it.</p>
    </>
  ),
};
