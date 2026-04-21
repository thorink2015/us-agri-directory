import { ReactNode } from 'react';

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

      {/* GUIDE-INSERT-POINT: hire-drone-spray-operator-checklist */}
    </>
  ),
};
