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

      {/* GUIDE-INSERT-POINT: hire-drone-spray-operator-checklist */}
    </>
  ),
};
