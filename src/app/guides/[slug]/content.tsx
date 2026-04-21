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

      {/* GUIDE-INSERT-POINT: hire-drone-spray-operator-checklist */}
    </>
  ),
};
