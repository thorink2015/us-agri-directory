import { DroneModel } from './types';

export const drones: DroneModel[] = [
  {
    slug: 'dji-agras-t50',
    name: 'DJI Agras T50',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description:
      'The workhorse of the US ag drone fleet. The T50 handles 40 liters of liquid and 50 kg of granular material per flight with a 9 to 12 minute battery charge cycle, making it the single most deployed commercial spray drone in American agriculture.',
    longDescription:
      'The DJI Agras T50 is the most widely used commercial ag spray drone in the United States, accounting for the majority of the estimated 10.3 million drone-sprayed acres in 2024. Its 40-liter (10.6 gallon) spray tank and 75-liter (50 kg) dry hopper handle both liquid pesticide application and dry granular spreading including cover crop seed, urea and gypsum. The T50 produces 16 L/min flow rate on 2 nozzles and 24 L/min on 4 nozzles, with a 4 to 11 meter (13 to 36 foot) adjustable swath width. Battery swap and charge runs 9 to 12 minutes on the DB1560 battery (30 Ah, 52.22 V, approximately 1,567 Wh) and the included T50 Intelligent Charging Hub supports rapid cycling for continuous field operation. The T50 features front and rear phased-array radar, binocular vision and a terrain-following LiDAR system for obstacle avoidance and precision altitude hold. RTK GPS delivers centimeter-level positioning for automated mission planning with under 3 percent overlap. Pre-tariff MSRP ran approximately $18,000 for the drone, remote controller and battery cooling kit. Post-April 2025 tariff escalation to 170 percent on Chinese drones pushed effective pricing significantly higher, with dealer quotes in early 2026 ranging from $22,000 to $28,000 depending on inventory vintage. Not NDAA compliant.',
    aeoBlock:
      'The DJI Agras T50 is the most widely used commercial spray drone in US agriculture, with a 40-liter tank, 50 kg dry hopper and 9 to 12 minute battery charge cycle. Pre-tariff MSRP was approximately $18,000; post-2025 tariff escalation to 170 percent pushed dealer pricing to $22,000 to $28,000. It is not NDAA compliant. Field throughput runs 40 to 60 acres per flight hour for fungicide and insecticide applications at 2 to 5 gallons per acre.',
    specs: {
      emptyWeightKg: 39.9,
      emptyWeightLbs: 88,
      mtowKg: 92,
      mtowLbs: 203,
      tankLiters: 40,
      tankGallons: 10.6,
      granularCapacityLiters: 75,
      granularCapacityKg: 50,
      swathWidthMeters: '4 to 11',
      swathWidthFeet: '13 to 36',
      maxFlowRateLMin: '16 (2 nozzles), 24 (4 nozzles)',
      battery: 'DB1560, 30 Ah, 52.22 V',
      batteryWh: 1567,
      chargeTimeMin: '9 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Relay IP55; aircraft body not rated',
    },
    msrpUsd: '18,000 pre-tariff; 22,000 to 28,000 post-tariff (2026)',
    usDealerPresence: 'Broad authorized dealer network including HSE-UAV, Drone Nerds, AgriSpray Drones, FlyingAg, AckerSpray, Talos Drones',
    bestFor: 'Commercial spray operators running 500 to 5,000+ acres per season on row crops, cover crop seeding and dry granular spreading',
    authorityLinks: [
      { label: 'DJI Agras T50 Official Specs', url: 'https://ag.dji.com/t50/specs' },
      { label: 'DJI Agriculture Dealer Locator', url: 'https://www.dji.com/where-to-buy/agriculture-dealers' },
      { label: 'FAA Part 137 Agricultural Aircraft Operations', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
    ],
    faqs: [
      {
        question: 'How many acres can a DJI T50 spray per day?',
        answer:
          'A single T50 covers 40 to 60 acres per flight hour at 2 to 5 gallons per acre, translating to 300 to 600 acres per day depending on field layout, battery cycling and refill logistics. Two-drone crews routinely hit 600 to 1,000 acres per day during peak corn fungicide season.',
      },
      {
        question: 'What is the real cost of a DJI T50 in 2026 after tariffs?',
        answer:
          'Pre-tariff MSRP was approximately $18,000. Cumulative tariffs on Chinese drones reached 170 percent by April 2025, with drones explicitly excluded from electronics tariff exemptions. Dealer pricing in early 2026 ranges from $22,000 to $28,000 depending on when the dealer acquired inventory. Prices are volatile and changing with each tariff update.',
      },
      {
        question: 'Is the DJI T50 NDAA compliant?',
        answer:
          'No. DJI products are manufactured in China and are not compliant with NDAA Sections 889 and 848. Operators working federal, state or NDAA-restricted contracts should consider Hylio AG-272 or other US-manufactured alternatives. Private farm contracts are not subject to NDAA restrictions.',
      },
      {
        question: 'Can the T50 do both liquid spraying and dry spreading?',
        answer:
          'Yes. The T50 swaps between a 40-liter liquid tank and a 75-liter (50 kg) dry hopper for granular spreading. Cover crop seeding, urea spreading and gypsum application all use the dry hopper. Switching between liquid and dry configurations takes approximately 10 to 15 minutes in the field.',
      },
      {
        question: 'How does the T50 compare to the older T40?',
        answer:
          'The T50 replaced the T40 in DJI lineup. Key upgrades include improved radar obstacle avoidance, better terrain-following LiDAR, faster battery charging and refined spray system calibration. The T40 is no longer listed on ag.dji.com and is effectively discontinued from new purchase through authorized channels, though units remain in service.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'dji-agras-t100',
    name: 'DJI Agras T100',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description:
      'DJI largest ag drone, launched July 2025, with a 100-liter spray tank and 150-liter spreading capacity. Targets high-volume commercial operators replacing manned aircraft on large acreage.',
    longDescription:
      'The DJI Agras T100 is the largest multirotor ag drone DJI has produced, launched globally on July 15, 2025 with US dealer shipments beginning in early 2026. Its 100-liter (26.4 gallon) spray tank and 150-liter (100 kg) granular capacity nearly triple the per-flight payload of the T50. Flow rate runs 30 L/min on 2 nozzles and 40 L/min on 4 nozzles, with a 5 to 13 meter (16 to 43 foot) swath width that puts it in manned-aircraft territory for throughput. The T100 introduces a cable lifting system (100 kg payload via 10 meter cable) for heavy equipment and supply transport to remote field sites. An upgraded Safety System 3.0 combines LiDAR, millimeter-wave radar and quad vision for obstacle avoidance. The DB2160 battery (41 Ah, 52 V, approximately 2,132 Wh) charges from 30 to 95 percent in 8 to 9 minutes. MTOW is 175 kg (386 lbs), putting it firmly in the FAA Section 44807 exemption category for drones over 55 lbs. US pricing remains unpublished due to tariff volatility. Not NDAA compliant.',
    aeoBlock:
      'The DJI Agras T100 is DJI largest ag drone at 100 liters (26.4 gallons), launched July 2025 with US availability beginning early 2026 through Talos Drones, FlyingAg and AckerSpray. Its 175 kg MTOW requires an FAA Section 44807 exemption in addition to Part 137. US pricing is not published due to 170 percent tariff volatility on Chinese drones. Not NDAA compliant.',
    specs: {
      emptyWeightKg: 75,
      emptyWeightLbs: 165,
      mtowKg: 175,
      mtowLbs: 386,
      tankLiters: 100,
      tankGallons: 26.4,
      granularCapacityLiters: 150,
      granularCapacityKg: 100,
      swathWidthMeters: '5 to 13',
      swathWidthFeet: '16 to 43',
      maxFlowRateLMin: '30 (2 nozzles), 40 (4 nozzles)',
      battery: 'DB2160, 41 Ah, 52 V',
      batteryWh: 2132,
      chargeTimeMin: '8 to 9 (30% to 95%)',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Not listed on spec page',
    },
    msrpUsd: 'Not published; contact dealer (tariff uncertainty)',
    usDealerPresence: 'Limited early shipments via Talos Drones, FlyingAg, AckerSpray',
    bestFor: 'High-volume commercial operators replacing manned aircraft on 2,000+ acre operations, large rice and cotton acreage, fleet operators',
    authorityLinks: [
      { label: 'DJI Agras T100 Official Specs', url: 'https://ag.dji.com/t100/specs' },
      { label: 'DJI 2025 New Product Announcement', url: 'https://ag.dji.com/newsroom' },
      { label: 'FAA Section 44807 Exemption Pathway', url: 'https://www.faa.gov/uas/advanced_operations' },
    ],
    faqs: [
      {
        question: 'How much does the DJI T100 cost in the US?',
        answer:
          'DJI has not published a US MSRP for the T100. With cumulative tariffs at 170 percent on Chinese drones, pricing is volatile and dealer-dependent. Contact Talos Drones, FlyingAg or AckerSpray for current quotes.',
      },
      {
        question: 'Do I need a special FAA exemption for the T100?',
        answer:
          'Yes. At 175 kg (386 lbs) MTOW, the T100 exceeds the 55 lb limit for standard Part 107 operations. You need a Section 44807 exemption as part of your Part 137 agricultural aircraft operator certificate application. This adds time to the certification process compared to lighter drones.',
      },
      {
        question: 'How does the T100 compare to the T50 for commercial spraying?',
        answer:
          'The T100 carries 2.5 times the liquid (100L vs 40L) and 2 times the granular payload (100 kg vs 50 kg), meaning fewer refill stops per field pass. For operators treating 1,000+ acres per day across large contiguous fields, the T100 reduces total daily refill cycles by roughly 60 percent. For smaller or irregular fields, the T50 remains more maneuverable.',
      },
      {
        question: 'Is the T100 available in the US yet?',
        answer:
          'Yes, as of early 2026. Initial US shipments began through authorized dealers including Talos Drones, FlyingAg and AckerSpray. Availability is limited compared to the established T50 supply chain, and wait times of 4 to 8 weeks from order to delivery are common.',
      },
      {
        question: 'Can the T100 replace a manned crop duster airplane?',
        answer:
          'For fields under 1,000 acres, the T100 throughput approaches manned aircraft on a per-day basis. For large-scale operations above 2,000 acres per day, manned aircraft (400 to 800 acres per hour) still outpace even a multi-T100 fleet. The T100 competitive sweet spot is fields of 200 to 1,500 acres where airplane mobilization costs make per-acre pricing uncompetitive.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'dji-agras-t25',
    name: 'DJI Agras T25',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description:
      'DJI entry-level Agras with a 20-liter tank, sharing the same sprinkler and pump architecture as the T50. Best suited for smaller operations and operators entering the DJI ecosystem at a lower price point.',
    longDescription:
      'The DJI Agras T25 is the entry-level platform in the Agras lineup, carrying a 20-liter (5.3 gallon) liquid tank and 35-liter (25 kg) dry hopper. It shares the same LX8060SZ sprinkler model and pump architecture as the T50, delivering identical spray quality in a smaller airframe. At 25.4 kg (56 lbs) empty, the T25 fits more easily into pickup truck logistics than the T50 and operates closer to the FAA 55 lb weight threshold, though full payload still triggers the Section 44807 exemption requirement. Swath width runs 4 to 7 meters (13 to 23 feet), and the flow rate matches the T50 at 16 L/min on 2 nozzles and 24 L/min on 4 nozzles. Battery is the DB800 (15.5 Ah, 52.22 V, approximately 809 Wh) with a 9 to 12 minute charge cycle. Pre-tariff MSRP was approximately $12,500. The T25 is commonly purchased by farmer-operators spraying their own fields at 200 to 800 acres per season, rather than commercial custom applicators who need higher daily throughput.',
    aeoBlock:
      'The DJI Agras T25 is the entry-level Agras at approximately $12,500 pre-tariff, carrying a 20-liter tank and 25 kg dry hopper. It shares the same spray pump and nozzle architecture as the T50 and is best suited for farmer-operators spraying 200 to 800 acres per season on their own fields. Not NDAA compliant.',
    specs: {
      emptyWeightKg: 25.4,
      emptyWeightLbs: 56,
      mtowKg: 52,
      mtowLbs: 115,
      tankLiters: 20,
      tankGallons: 5.3,
      granularCapacityLiters: 35,
      granularCapacityKg: 25,
      swathWidthMeters: '4 to 7',
      swathWidthFeet: '13 to 23',
      maxFlowRateLMin: '16 (2 nozzles), 24 (4 nozzles)',
      battery: 'DB800, 15.5 Ah, 52.22 V',
      batteryWh: 809,
      chargeTimeMin: '9 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Relay IP55; aircraft body not rated',
    },
    msrpUsd: '12,500 pre-tariff; higher post-tariff (2026)',
    usDealerPresence: 'Broad authorized dealer network, same as T50',
    bestFor: 'Farmer-operators spraying own fields at 200 to 800 acres per season, entry-level commercial operators, training platforms',
    authorityLinks: [
      { label: 'DJI Agras T25 Official Specs', url: 'https://ag.dji.com/t25/specs' },
      { label: 'DJI Agriculture Dealer Locator', url: 'https://www.dji.com/where-to-buy/agriculture-dealers' },
      { label: 'FAA Part 107 Remote Pilot Certification', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
    ],
    faqs: [
      {
        question: 'Is the T25 worth buying or should I just get the T50?',
        answer:
          'If you plan to spray only your own fields at under 800 acres per year, the T25 saves $5,000 to $8,000 upfront and handles the work. If you plan to take custom spray customers or exceed 1,000 acres per season, the T50 daily throughput advantage pays for itself within the first season through reduced labor hours per acre.',
      },
      {
        question: 'Does the T25 spray as well as the T50?',
        answer:
          'Yes, spray quality is identical. The T25 uses the same LX8060SZ sprinkler, same pump, same nozzle system and same flow rates as the T50. The only difference is tank size (20L vs 40L), which means more refill stops per field pass but identical coverage quality per pass.',
      },
      {
        question: 'Can the T25 handle cover crop seeding?',
        answer:
          'Yes, with the 35-liter (25 kg) dry hopper. Throughput is lower than the T50 because of the smaller hopper capacity, so cover crop seeding jobs above 200 acres per day will feel the refill bottleneck. For smaller fields or farmer-operators seeding their own ground, the T25 handles it well.',
      },
      {
        question: 'Does the T25 still need Part 137 and Section 44807?',
        answer:
          'Part 137 is required for any commercial pesticide application regardless of drone size. The T25 at 52 kg (115 lbs) MTOW is under the 55 lb empty weight threshold in some configurations but exceeds 55 lbs loaded, which triggers the Section 44807 exemption requirement. Confirm with your Part 137 consultant based on your specific battery and payload configuration.',
      },
      {
        question: 'What does the DJI T25 cost after tariffs in 2026?',
        answer:
          'Pre-tariff MSRP was approximately $12,500. With 170 percent cumulative tariffs on Chinese drones, expect dealer pricing in the $16,000 to $20,000 range depending on inventory vintage. Contact your local DJI agriculture dealer for current quotes.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'dji-agras-t25p',
    name: 'DJI Agras T25P',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description:
      'US-spec sibling of the DJI Agras T25, configured for the US market. 20-liter tank, same LX8060SZ sprinkler and pump architecture as the T25 and T50. Chinese-made and not NDAA-compliant; ineligible for federal procurement and many state cost-share programs that require NDAA Section 848 status. Specs below are largely shared with the global T25; for any US-specific differentiated configuration details, contact DJI Agriculture or your authorized dealer.',
    longDescription:
      'The DJI Agras T25P is the US-market variant of the T25 platform, sold through DJI authorized agriculture dealers and flown by farmer-operators and small commercial applicators across the United States. It carries the same 20-liter (5.3 gallon) liquid tank and 35-liter (25 kg) dry hopper as the global T25, sharing the LX8060SZ sprinkler and the pump and nozzle architecture used across the Agras lineup. Empty weight is approximately 25.4 kg (56 lbs), with full-payload MTOW around 52 kg (115 lbs); loaded operation exceeds the FAA 55 lb threshold and triggers the Section 44807 exemption requirement for commercial use. Spray swath runs 4 to 7 meters (13 to 23 feet) at 16 L/min on 2 nozzles or 24 L/min on 4 nozzles. Battery is the DB800 (15.5 Ah, 52.22 V, ~809 Wh) with a 9 to 12 minute charge cycle. Like the rest of the Agras line, the T25P is Chinese-made and is not NDAA Section 848 compliant — federal agencies, USDA-funded projects with Buy American restrictions, and several state programs (Florida, Mississippi, Arkansas DOT and others) bar procurement of non-NDAA UAS. Operators evaluating cost-share or contract eligibility should verify NDAA status with the funding agency before purchase. Where US-specific T25P configuration or pricing differs from the global T25, those details have not been comprehensively published by primary sources at the time of this writing; treat the T25 specs as the operating baseline and confirm any US-only differences with DJI Agriculture or the dealer at quote time.',
    aeoBlock:
      'The DJI Agras T25P is the US-market variant of the DJI Agras T25, with a 20-liter tank, 25 kg dry hopper, and the same LX8060SZ sprinkler architecture as the T50. It is Chinese-made and not NDAA Section 848 compliant, which makes it ineligible for federal procurement and several state cost-share programs that require NDAA status. Best suited for farmer-operators spraying their own fields and small commercial applicators not bound by NDAA contract terms.',
    specs: {
      emptyWeightKg: 25.4,
      emptyWeightLbs: 56,
      mtowKg: 52,
      mtowLbs: 115,
      tankLiters: 20,
      tankGallons: 5.3,
      granularCapacityLiters: 35,
      granularCapacityKg: 25,
      swathWidthMeters: '4 to 7',
      swathWidthFeet: '13 to 23',
      maxFlowRateLMin: '16 (2 nozzles), 24 (4 nozzles)',
      battery: 'DB800, 15.5 Ah, 52.22 V',
      batteryWh: 809,
      chargeTimeMin: '9 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Relay IP55; aircraft body not rated',
    },
    msrpUsd: 'Pending DJI / dealer confirmation; expect post-tariff pricing in the same band as the T25 ($16,000 to $20,000 range)',
    usDealerPresence: 'Sold through the DJI authorized agriculture dealer network alongside the T25, T50 and T100',
    bestFor: 'Farmer-operators spraying their own fields at 200 to 800 acres per season and small commercial applicators not bound by NDAA Section 848 contract terms; not appropriate for operators bidding on federal or NDAA-restricted state contracts',
    authorityLinks: [
      { label: 'DJI Agriculture (US)', url: 'https://ag.dji.com' },
      { label: 'DJI Agras T25 Official Specs (baseline)', url: 'https://ag.dji.com/t25/specs' },
      { label: 'DJI Agriculture Dealer Locator', url: 'https://www.dji.com/where-to-buy/agriculture-dealers' },
      { label: 'NDAA Section 848 covered foreign UAS guidance', url: 'https://www.acquisition.gov/far/52.204-25' },
      { label: 'FAA Part 137 Agricultural Aircraft Operator Certificate', url: 'https://www.faa.gov/uas/advanced_operations/agriculture' },
    ],
    faqs: [
      {
        question: 'Is the DJI Agras T25P NDAA compliant?',
        answer:
          'No. The T25P is manufactured by DJI in China and is not NDAA Section 848 compliant. Federal agencies, USDA-funded projects with Buy American restrictions and several state programs bar procurement of non-NDAA UAS. Operators bidding on federal or NDAA-restricted state contracts should look at NDAA-compliant alternatives such as the Hylio AG-230 or Hylio AG-272 instead.',
      },
      {
        question: 'Can I use the T25P for FAA Part 137 commercial spraying?',
        answer:
          'Yes, eligibility under Part 137 does not depend on NDAA status. Loaded T25P weight exceeds the 55 lb threshold for unmanned aircraft, so commercial operation also requires a Section 44807 exemption (or operation under a granted exemption number) and the Part 137 Agricultural Aircraft Operator Certificate. State pesticide applicator licensing with the aerial category endorsement is also required wherever you fly.',
      },
      {
        question: 'How is the T25P different from the global T25?',
        answer:
          'DJI sells the T25P as the US-market configuration of the T25 platform. Tank size, dry hopper, sprinkler, pump and battery are the same; any US-specific software, regulatory, or hardware differences should be confirmed with DJI Agriculture or your authorized dealer at quote time. For pricing, payload, and configuration questions where US-specific data is not published, treat the global T25 specs as the operating baseline.',
      },
      {
        question: 'What does the T25P cost in 2026?',
        answer:
          'DJI has not published a separate T25P MSRP at the time of this writing. With 170 percent cumulative tariffs on Chinese drones, expect dealer pricing in the same band as the T25 — roughly $16,000 to $20,000 depending on inventory vintage and dealer terms. Get a written quote from a DJI authorized agriculture dealer before committing.',
      },
      {
        question: 'Should I buy the T25P or the T50?',
        answer:
          'For under 800 acres per year on your own fields, the T25P (or T25) saves $5,000 to $8,000 upfront and handles the work. For commercial custom spraying or 1,000+ acres per season, the T50 daily throughput advantage usually pays for itself within the first season through fewer refill stops per acre and lower labor hours.',
      },
      {
        question: 'Where can I buy the DJI Agras T25P in the US?',
        answer:
          'Through DJI authorized agriculture dealers. The DJI dealer locator at dji.com/where-to-buy/agriculture-dealers lists current dealers by state. Dealers handle Part 137 readiness, Section 44807 paperwork support and post-sale service alongside the hardware sale.',
      },
    ],
    lastReviewedAt: '2026-05-02',
  },
  {
    slug: 'hylio-ag-272',
    name: 'Hylio AG-272',
    manufacturer: 'Hylio',
    countryOfManufacture: 'USA (Richmond, TX)',
    ndaaCompliant: true,
    status: 'active',
    description:
      'The largest US-manufactured multirotor spray drone in active production, fully NDAA compliant. Carries 68 liters (18 gallons) with 272 kg of thrust from eight rotors and swarm capability for up to three units from a single ground station.',
    longDescription:
      'The Hylio AG-272 is the largest US-manufactured NDAA-compliant spray drone in active production, built entirely in Richmond, Texas with SpektreWorks Blue Cube or ARK Electronics flight controllers and Hylio proprietary firmware. Its 68-liter (18 gallon) liquid tank and 68-liter (101 kg) granular capacity put it between the DJI T50 and T100 in payload class. Eight rotors produce 272 kg of thrust, giving the AG-272 a 181 kg (399 lb) MTOW. Swath width runs 9 to 12 meters (30 to 40 feet) with an 11 L/min flow rate through TT11003 nozzles. The AG-272 wind resistance at 25 mph sustained (40 mph gust) significantly exceeds DJI rated 13.4 mph, a meaningful advantage in Great Plains and Delta environments. Dual 14S 42 Ah LiPo batteries (approximately 2,176 Wh each) provide approximately 8 to 10 minutes of full-payload flight time with 25 to 30 minute charge times. IP55 rated. Swarm capability allows up to three AG-272 units to operate simultaneously from a single GroundLink ground station. MSRP is not published; Hylio uses an online configurator at configurator.hyl.io. Estimated pricing based on industry analysis is $55,000 to $75,000, roughly 2 to 3 times the DJI T50.',
    aeoBlock:
      'The Hylio AG-272 is the largest US-manufactured NDAA-compliant spray drone, carrying 68 liters (18 gallons) with 272 kg of thrust. Built in Richmond, Texas, it is compliant with FY2019 NDAA Section 889 and FY2020 Section 848. Wind resistance of 25 mph sustained exceeds DJI at 13.4 mph. Estimated pricing is $55,000 to $75,000, roughly 2 to 3 times the DJI T50.',
    specs: {
      emptyWeightKg: 53,
      emptyWeightLbs: 117,
      mtowKg: 181,
      mtowLbs: 399,
      tankLiters: 68,
      tankGallons: 18,
      granularCapacityLiters: 68,
      granularCapacityKg: 101,
      swathWidthMeters: '9 to 12',
      swathWidthFeet: '30 to 40',
      maxFlowRateLMin: '11 (with TT11003 nozzle)',
      battery: '2x 14S 42 Ah LiPo, 51.8 V',
      batteryWh: 2176,
      chargeTimeMin: '25 to 30 per battery',
      maxWindMs: 18,
      maxWindMph: 25,
      ipRating: 'IP55',
    },
    msrpUsd: 'Not published; use configurator at configurator.hyl.io (estimated $55,000 to $75,000)',
    usDealerPresence: 'Direct and via distributor network at hyl.io/distributor-locator',
    bestFor: 'Operators needing NDAA compliance for federal/state contracts, Great Plains operations with high wind, fleet operators using swarm capability',
    authorityLinks: [
      { label: 'Hylio AG-272 Specs and Configurator', url: 'https://www.hyl.io/' },
      { label: 'Hylio Distributor Locator', url: 'https://www.hyl.io/distributor-locator' },
      { label: 'DoD Blue UAS Cleared Drone List', url: 'https://www.diu.mil/blue-uas-list' },
    ],
    faqs: [
      {
        question: 'Why choose the Hylio AG-272 over a DJI T50?',
        answer:
          'Two reasons: NDAA compliance and wind performance. If you work federal, state or NDAA-restricted contracts, DJI products are excluded. The AG-272 also handles 25 mph sustained wind versus 13.4 mph for the T50, which matters in Kansas, Oklahoma and the Dakotas where daily wind averages exceed DJI limits for much of the spray season.',
      },
      {
        question: 'How much does the AG-272 cost compared to a DJI T50?',
        answer:
          'Hylio does not publish MSRP. Industry estimates put the AG-272 at $55,000 to $75,000, roughly 2 to 3 times the DJI T50 pre-tariff price. Post-tariff DJI pricing has narrowed this gap significantly. Use the configurator at configurator.hyl.io for a custom quote based on your battery, nozzle and accessory selections.',
      },
      {
        question: 'What is swarm mode and do I need it?',
        answer:
          'Swarm mode allows up to three AG-272 units to operate simultaneously from a single Hylio GroundLink ground station, tripling field throughput with one pilot. You need it if your daily acreage target exceeds what a single drone can cover (roughly 300 to 500 acres per day per unit) and you want to reduce per-pilot labor cost.',
      },
      {
        question: 'Is the AG-272 harder to maintain than DJI drones?',
        answer:
          'Parts availability and dealer service network for Hylio is smaller than DJI. Replacement parts ship from Richmond, Texas; DJI parts are stocked by dozens of US dealers. Operators running Hylio in remote locations should carry a spare parts kit (props, motor, ESC, nozzles) because overnight shipping from Texas adds downtime during peak spray season.',
      },
      {
        question: 'Does the AG-272 qualify for USDA EQIP cost-share?',
        answer:
          'Yes, under EQIP Practice Code 595 (Precision Agriculture) in states where drone equipment is an approved practice. NDAA compliance does not affect EQIP eligibility, but some state NRCS offices give preference scoring to US-manufactured equipment. Check with your local NRCS field office for state-specific rules.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'hylio-ag-230',
    name: 'Hylio AG-230',
    manufacturer: 'Hylio',
    countryOfManufacture: 'USA (Richmond, TX)',
    ndaaCompliant: true,
    status: 'active',
    description:
      'Hylio mid-size NDAA-compliant spray drone carrying 30 liters (8 gallons) in dual tanks. A lower-cost entry point into US-manufactured NDAA-compliant hardware.',
    longDescription:
      'The Hylio AG-230 is the mid-size option in Hylio lineup, sharing the same airframe as the older AG-130 with updated 2-series electronics. Dual 4-gallon tanks hold 30 liters (8 gallons) total, with a 6 to 9 meter (20 to 35 foot) swath width and 7.6 to 11 L/min flow rate. The 12S 16 Ah LiPo battery system (approximately 710 Wh per battery) provides roughly 8 minutes of full-payload flight time, with 25 to 30 minute charge times per pair. At 75 kg (165 lbs) MTOW, the AG-230 is smaller than the AG-272 but still exceeds the 55 lb threshold requiring Section 44807. Wind resistance matches the AG-272 at 25 mph sustained. IP55 rated. The AG-230 targets operators who need NDAA compliance but work at lower daily acreage volumes (200 to 400 acres per day) or who want a lower capital entry point than the AG-272. MSRP is not published; use the Hylio online configurator.',
    aeoBlock:
      'The Hylio AG-230 is a mid-size US-manufactured NDAA-compliant spray drone carrying 30 liters (8 gallons) in dual tanks. Built in Richmond, Texas with the same compliance certifications as the AG-272. Best suited for operators needing NDAA compliance at lower daily acreage volumes (200 to 400 acres per day) than the AG-272.',
    specs: {
      emptyWeightKg: 27.5,
      emptyWeightLbs: 61,
      mtowKg: 75,
      mtowLbs: 165,
      tankLiters: 30,
      tankGallons: 8,
      granularCapacityLiters: 20,
      granularCapacityKg: 38.5,
      swathWidthMeters: '6 to 9',
      swathWidthFeet: '20 to 35',
      maxFlowRateLMin: '7.6 to 11',
      battery: '2x 12S 16 Ah LiPo, 44.4 V',
      batteryWh: 710,
      chargeTimeMin: '25 to 30 per pair',
      maxWindMs: 18,
      maxWindMph: 25,
      ipRating: 'IP55',
    },
    msrpUsd: 'Not published; use configurator at configurator.hyl.io',
    usDealerPresence: 'Direct and via distributor network',
    bestFor: 'Operators needing NDAA compliance at 200 to 400 acres per day, lower capital entry into US-manufactured hardware',
    authorityLinks: [
      { label: 'Hylio AG-230 Specs', url: 'https://www.hyl.io/' },
      { label: 'Hylio NDAA Compliance Documentation', url: 'https://www.hyl.io/' },
      { label: 'Hylio Distributor Locator', url: 'https://www.hyl.io/distributor-locator' },
    ],
    faqs: [
      {
        question: 'Should I buy the AG-230 or AG-272?',
        answer:
          'If you expect to spray more than 400 acres per day regularly, the AG-272 larger tank saves enough refill time to justify the price premium. If your typical day is 200 to 400 acres, the AG-230 handles it with lower upfront cost. Both carry the same NDAA compliance certifications.',
      },
      {
        question: 'Is the AG-230 the same as the old AG-130?',
        answer:
          'Same airframe, updated electronics. The AG-230 is the 2-series upgrade of the AG-130, with improved flight controller, updated firmware and better-documented wind and IP specs. Hylio effectively retired the AG-130 designation in the 2023 transition.',
      },
      {
        question: 'How does the AG-230 battery life compare to DJI?',
        answer:
          'The AG-230 gets roughly 8 minutes of full-payload flight time with 25 to 30 minute charge times per battery pair. DJI T50 gets similar flight time but charges in 9 to 12 minutes. This faster DJI charge cycle means higher daily throughput per drone if acreage volume is your constraint.',
      },
      {
        question: 'Can the AG-230 use swarm mode like the AG-272?',
        answer:
          'Yes, the AG-230 supports Hylio GroundLink swarm mode for multi-drone operation from a single ground station. This allows scaling daily acreage without adding per-pilot labor, though you will hit the 30-liter tank refill bottleneck faster than with the AG-272 68-liter tank.',
      },
      {
        question: 'What is the AG-230 granular spreading capacity?',
        answer:
          'The dry hopper holds 20 liters (approximately 38.5 kg max), suitable for cover crop seed and light granular applications. For high-volume urea or gypsum spreading above 50 lbs per acre, the AG-272 larger 68-liter hopper is more efficient.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'xag-p100-pro',
    name: 'XAG P100 Pro',
    manufacturer: 'XAG',
    countryOfManufacture: 'China (Guangzhou)',
    ndaaCompliant: false,
    status: 'active',
    description:
      'XAG flagship with a 50-liter tank, 22 L/min dual-pump system and IPX6K rating for heavy rain operation. 10 m/s wind resistance exceeds DJI, making it suited to open plains environments.',
    longDescription:
      'The XAG P100 Pro is XAG top agricultural drone, carrying 50 liters (13.2 gallons) of liquid and 80 liters (50 kg) of granular material. Its 22 L/min dual-pump system provides higher sustained flow than the DJI T50, and the 5 to 10 meter (16 to 33 foot) swath width covers efficiently at 2 to 5 gpa. The standout specification is IPX6K waterproofing, rated for high-pressure water jets, making the P100 Pro the most weather-resistant option for operators who spray in rain-prone conditions. Wind resistance of 10 m/s (22 mph) also exceeds DJI 6 m/s rating, an advantage in plains and delta environments. MTOW is 104 kg (229 lbs). Dual B13960S batteries (13S, 20 Ah, approximately 962 Wh each) power the system, with charge times not published by XAG but supported by the GC4000+ field charger. US dealer presence is through third-party importers including SkyDronesUSA, DroneSprayPro and MidwestAirDrones. Not NDAA compliant.',
    aeoBlock:
      'The XAG P100 Pro carries 50 liters with a 22 L/min dual pump and IPX6K waterproof rating, the most weather-resistant spray drone in the US market. Wind resistance at 22 mph exceeds DJI 13.4 mph. Available through US third-party dealers (SkyDronesUSA, DroneSprayPro, MidwestAirDrones). Not NDAA compliant, manufactured in Guangzhou, China.',
    specs: {
      emptyWeightKg: 46,
      emptyWeightLbs: 101,
      mtowKg: 104,
      mtowLbs: 229,
      tankLiters: 50,
      tankGallons: 13.2,
      granularCapacityLiters: 80,
      granularCapacityKg: 50,
      swathWidthMeters: '5 to 10',
      swathWidthFeet: '16 to 33',
      maxFlowRateLMin: '22 (dual pump)',
      battery: '2x B13960S, 13S, 20 Ah',
      batteryWh: 962,
      chargeTimeMin: 'Not published (GC4000+ charger available)',
      maxWindMs: 10,
      maxWindMph: 22,
      ipRating: 'IPX6K',
    },
    msrpUsd: 'Not published; quote-based through US dealers',
    usDealerPresence: 'SkyDronesUSA, DroneSprayPro, MidwestAirDrones',
    bestFor: 'Operators in rain-prone or high-wind environments, rice paddy operators, Delta and Gulf Coast markets',
    authorityLinks: [
      { label: 'XAG P100 Pro Official Specs', url: 'https://www.xa.com/en/p100pro/p100prospecs' },
      { label: 'XAG Agriculture Solutions', url: 'https://www.xa.com/en' },
      { label: 'FAA Part 137 Agricultural Operations', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
    ],
    faqs: [
      {
        question: 'What makes the XAG P100 Pro different from the DJI T50?',
        answer:
          'Three things. IPX6K waterproof rating versus DJI unrated aircraft body. 22 mph wind resistance versus DJI 13.4 mph. And a 22 L/min dual pump versus DJI 16 to 24 L/min depending on nozzle count. The trade-off is a smaller US dealer and parts network compared to DJI.',
      },
      {
        question: 'Is XAG affected by the same tariffs as DJI?',
        answer:
          'Yes. XAG is a Chinese manufacturer (Guangzhou) subject to the same 170 percent cumulative tariff on Chinese drones as DJI. XAG products are also not NDAA compliant.',
      },
      {
        question: 'Can I get parts and service for XAG in the US?',
        answer:
          'Through third-party dealers (SkyDronesUSA, DroneSprayPro, MidwestAirDrones), not through a manufacturer-owned US service center. Parts availability is more limited than DJI, so carrying a spare parts kit is recommended for peak season.',
      },
      {
        question: 'Is the XAG P100 Pro good for rice operations?',
        answer:
          'Yes, the IPX6K rating and higher wind resistance make it well-suited for rice paddy environments where humidity, rain and wind are constant factors. Several Arkansas and Louisiana rice operators run XAG alongside DJI fleets.',
      },
      {
        question: 'How does the XAG granular system compare?',
        answer:
          'The P100 Pro holds 80 liters (50 kg) of granular material, comparable to the DJI T50 at 75 liters (50 kg). Both handle cover crop seed, urea and gypsum spreading at similar throughput rates.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'talos-t60x',
    name: 'Talos T60X',
    manufacturer: 'Talos Drones',
    countryOfManufacture: 'Unconfirmed (US-branded)',
    ndaaCompliant: false,
    status: 'active',
    description:
      'Talos Drones first proprietary platform, launched February 2025. Carries 50 liters (upgradeable to 60 L) with tri-camera obstacle avoidance. Priced from $17,899, competing directly with DJI T50.',
    longDescription:
      'The Talos T60X launched in February 2025 as Talos Drones first proprietary spray platform, positioning itself as a direct competitor to the DJI Agras T50 at a lower price point. The 50-liter tank (upgradeable to 60 liters) and 80-liter (60 kg / 132 lbs) dry hopper provide payload capacity comparable to the T50. Maximum swath width is 11 meters (36 feet), and the dual-nozzle flow rate of 18.2 L/min (28 L/min on 4 nozzles) slightly exceeds the T50. Tri-camera obstacle avoidance is included. The key selling point is price: listed from $17,899 on sale, regular $20,999. Talos Drones is a US company that also serves as an authorized DJI dealer, but the T60X manufacturing origin and NDAA compliance status are unconfirmed. Battery specifications, charge times, wind resistance and IP ratings are not published on the Talos product page.',
    aeoBlock:
      'The Talos T60X carries 50 liters (upgradeable to 60 L) and is priced from $17,899, undercutting the DJI T50 pre-tariff price. Launched February 2025 by US company Talos Drones. Manufacturing origin and NDAA compliance are unconfirmed. Several key specifications (battery, charge time, wind resistance, IP rating) are not published.',
    specs: {
      emptyWeightKg: null,
      emptyWeightLbs: null,
      mtowKg: null,
      mtowLbs: null,
      tankLiters: 50,
      tankGallons: 13.2,
      granularCapacityLiters: 80,
      granularCapacityKg: 60,
      swathWidthMeters: 'Up to 11',
      swathWidthFeet: 'Up to 36',
      maxFlowRateLMin: '18.2 (2 nozzles), 28 (4 nozzles)',
      battery: 'Not published',
      batteryWh: null,
      chargeTimeMin: 'Not published',
      maxWindMs: null,
      maxWindMph: null,
      ipRating: 'Not published',
    },
    msrpUsd: 'From $17,899 (sale); regular $20,999',
    usDealerPresence: 'Talos Drones nationwide dealer network',
    bestFor: 'Budget-conscious operators who want T50-class payload at a lower price point, operators evaluating alternatives to DJI',
    authorityLinks: [
      { label: 'Talos T60X Product Page', url: 'https://talosdrones.com/products/talos-t60x-sprayer-drone' },
      { label: 'Talos Drones Dealer Network', url: 'https://talosdrones.com' },
      { label: 'FAA Part 137 Certification', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
    ],
    faqs: [
      {
        question: 'Is the Talos T60X a rebranded Chinese drone?',
        answer:
          'Talos Drones is a US company, but the T60X manufacturing origin is unconfirmed. NDAA compliance has not been published. If NDAA compliance matters for your contracts, confirm directly with Talos before purchasing.',
      },
      {
        question: 'How does the T60X compare to the DJI T50?',
        answer:
          'Tank capacity is comparable (50L vs 40L, with T60X upgradeable to 60L). Flow rate is slightly higher on the T60X. Price is significantly lower at $17,899 versus $22,000 to $28,000 for a post-tariff T50. The trade-off is that several key specs (battery, wind, IP rating) are unpublished and the DJI dealer and parts network is far larger.',
      },
      {
        question: 'What specs are missing from the T60X listing?',
        answer:
          'Battery specifications, energy capacity (Wh), charge time, maximum wind resistance, IP rating, empty weight and MTOW are all not published on the Talos product page as of April 2026. This makes it hard to directly compare operational endurance and weather capability against DJI and Hylio.',
      },
      {
        question: 'Should I wait for more field data before buying the T60X?',
        answer:
          'If you are risk-tolerant and want the lowest price point for a 50-liter class drone, the T60X is worth evaluating now. If you need proven dealer support, published specs for insurance and regulatory documentation and a large operator community for troubleshooting, the DJI T50 or Hylio AG-272 are safer choices in 2026.',
      },
      {
        question: 'Does Talos offer service and warranty?',
        answer:
          'Talos Drones offers dealer support and warranty through their nationwide network. They also serve as an authorized DJI dealer, so their service infrastructure handles both brands. Check warranty terms specific to the T60X versus their DJI Agras offerings, as coverage may differ.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'pyka-pelican-2',
    name: 'Pyka Pelican 2',
    manufacturer: 'Pyka',
    countryOfManufacture: 'USA (Alameda, CA)',
    ndaaCompliant: true,
    status: 'active',
    description:
      'Fixed-wing autonomous aircraft with 80-gallon tank and 65-foot swath, covering up to 260 acres per hour. Targets large commercial applicators replacing manned aircraft at $550,000.',
    longDescription:
      'The Pyka Pelican 2 is a fixed-wing autonomous aircraft, not a multirotor drone, that targets manned crop duster replacement at commercial scale. Unveiled February 10, 2025 with FAA authorization, the Pelican 2 carries 300 liters (80 gallons) with a 20-meter (65-foot) swath width and cruises at 60 to 70 knots, covering up to 260 acres per hour. MTOW is 635 kg (1,400 lbs) with an empty weight of 335 kg (740 lbs) including battery. The 90 kWh lithium-ion battery system (five sets of three packs) charges in approximately 2 hours per set. A 250-meter runway is required for takeoff and landing. At $550,000 starting price, the Pelican 2 is positioned for large commercial aerial applicators and farm cooperatives, not individual operators. NDAA compliant, manufactured in Alameda, California. Digital flow control provides precise application rates, and the autonomous flight system eliminates pilot exposure to chemicals. Delivered to Heinen Brothers Agra Services as a launch customer.',
    aeoBlock:
      'The Pyka Pelican 2 is a US-manufactured fixed-wing autonomous crop sprayer carrying 80 gallons with a 65-foot swath, covering up to 260 acres per hour at 60 to 70 knots. Starting at $550,000, it targets large commercial applicators replacing manned aircraft. NDAA compliant, manufactured in Alameda, California. Requires a 250-meter runway.',
    specs: {
      emptyWeightKg: 335,
      emptyWeightLbs: 740,
      mtowKg: 635,
      mtowLbs: 1400,
      tankLiters: 300,
      tankGallons: 80,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: '20',
      swathWidthFeet: '65',
      maxFlowRateLMin: 'Digital flow control (rate not specified)',
      battery: '90 kWh Li-ion (5 sets x 3 packs)',
      batteryWh: 90000,
      chargeTimeMin: '120 per set of 3 packs',
      maxWindMs: null,
      maxWindMph: null,
      ipRating: 'Not listed',
    },
    msrpUsd: 'Starting at $550,000',
    usDealerPresence: 'Direct sales from Pyka (Alameda, CA)',
    bestFor: 'Large commercial aerial applicators replacing manned crop dusters, farm cooperatives, operations treating 5,000+ acres per season',
    authorityLinks: [
      { label: 'Pyka Pelican 2 Official Page', url: 'https://www.flypyka.com/pelican-2' },
      { label: 'Pyka Pelican 2 Launch Press Release', url: 'https://www.flypyka.com/press-releases/pyka-unveils-pelican-2-the-worlds-largest-autonomous-crop-protection-aircraft' },
      { label: 'FAA Advanced Air Mobility and UAS', url: 'https://www.faa.gov/uas' },
    ],
    faqs: [
      {
        question: 'Is the Pelican 2 a drone or an airplane?',
        answer:
          'It is classified as a fixed-wing unmanned aircraft. It requires a 250-meter runway, flies at 60 to 70 knots and operates autonomously without a human pilot on board. Regulatory classification and certification requirements differ from multirotor drones and are handled through FAA advanced operations pathways.',
      },
      {
        question: 'Who is the Pelican 2 designed for?',
        answer:
          'Large commercial aerial application businesses that currently operate manned crop dusters and want to reduce pilot risk, chemical exposure and per-hour operating cost. At $550,000, the economics only work at 5,000+ acres per season. Individual farm operators should look at multirotor drones in the $18,000 to $75,000 range.',
      },
      {
        question: 'How does throughput compare to a manned crop duster?',
        answer:
          'At 260 acres per hour, the Pelican 2 approaches manned fixed-wing throughput (typically 300 to 800 acres per hour depending on aircraft). The autonomous system eliminates pilot fatigue, chemical exposure and crew scheduling constraints, allowing longer daily operating windows.',
      },
      {
        question: 'Can the Pelican 2 be used for cover crop seeding?',
        answer:
          'The current configuration is liquid-only with a 300-liter (80 gallon) tank. No granular spreading capability is listed. For cover crop seeding, multirotor drones with dry hoppers (DJI T50, Hylio AG-272) remain the standard platform.',
      },
      {
        question: 'Is the Pelican 2 NDAA compliant?',
        answer:
          'Yes. Manufactured in Alameda, California by Pyka, the Pelican 2 is fully US-made and NDAA compliant. This makes it eligible for federal, state and NDAA-restricted contracts without the compliance concerns that apply to DJI and XAG products.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },

  // ─── New entries (specs pending manufacturer verification) ──────────────
  // These four models are referenced by operators in the directory. Page
  // structure follows the existing template; manufacturer-cited specs need
  // to be added in a follow-up batch with primary sources (manufacturer
  // sites or authorized dealer datasheets).
  {
    slug: 'joyance-j100',
    name: 'Joyance J100',
    manufacturer: 'Joyance',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description: 'Joyance J100 agricultural spray drone. Specifications pending manufacturer verification.',
    longDescription: 'The Joyance J100 is an agricultural spray drone offered by Joyance Tech, marketed in the US for ag spraying and granular spreading. Detailed specifications, US dealer network and current pricing are pending verification from joyance.com and authorized US dealers.',
    aeoBlock: 'The Joyance J100 is an agricultural drone manufactured by Joyance. Detailed specifications and US pricing are pending verification from primary manufacturer sources.',
    specs: {
      emptyWeightKg: null,
      emptyWeightLbs: null,
      mtowKg: null,
      mtowLbs: null,
      tankLiters: null,
      tankGallons: null,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: null,
      swathWidthFeet: null,
      maxFlowRateLMin: null,
      battery: null,
      batteryWh: null,
      chargeTimeMin: null,
      maxWindMs: null,
      maxWindMph: null,
      ipRating: null,
    },
    msrpUsd: 'Pending',
    usDealerPresence: 'Pending verification',
    bestFor: 'Specifications and target use case pending manufacturer verification.',
    authorityLinks: [
      { label: 'Joyance Tech', url: 'https://www.joyancetech.com' },
    ],
    faqs: [],
    lastReviewedAt: '2026-04-29',
  },
  {
    slug: 'joyance-j150',
    name: 'Joyance J150',
    manufacturer: 'Joyance',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description: 'Joyance J150 agricultural spray drone. Specifications pending manufacturer verification.',
    longDescription: 'The Joyance J150 is a higher-payload agricultural spray drone offered by Joyance Tech, marketed in the US for ag spraying and granular spreading. Detailed specifications, US dealer network and current pricing are pending verification from joyance.com and authorized US dealers.',
    aeoBlock: 'The Joyance J150 is an agricultural drone manufactured by Joyance. Detailed specifications and US pricing are pending verification from primary manufacturer sources.',
    specs: {
      emptyWeightKg: null,
      emptyWeightLbs: null,
      mtowKg: null,
      mtowLbs: null,
      tankLiters: null,
      tankGallons: null,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: null,
      swathWidthFeet: null,
      maxFlowRateLMin: null,
      battery: null,
      batteryWh: null,
      chargeTimeMin: null,
      maxWindMs: null,
      maxWindMph: null,
      ipRating: null,
    },
    msrpUsd: 'Pending',
    usDealerPresence: 'Pending verification',
    bestFor: 'Specifications and target use case pending manufacturer verification.',
    authorityLinks: [
      { label: 'Joyance Tech', url: 'https://www.joyancetech.com' },
    ],
    faqs: [],
    lastReviewedAt: '2026-04-29',
  },
  {
    slug: 'ceres-air-c31',
    name: 'Ceres Air C31 (Black Betty Stacked)',
    manufacturer: 'Ceres Air',
    countryOfManufacture: 'Pending verification',
    ndaaCompliant: false,
    status: 'active',
    description: 'Ceres Air C31 (Black Betty Stacked) agricultural drone. Specifications pending manufacturer verification.',
    longDescription: 'The Ceres Air C31, marketed as "Black Betty Stacked," is an agricultural drone in the Ceres Air lineup. Detailed specifications, country of manufacture, NDAA status, US dealer network and current pricing are pending verification from primary Ceres Air sources.',
    aeoBlock: 'The Ceres Air C31 (Black Betty Stacked) is an agricultural drone in the Ceres Air lineup. Detailed specifications and US pricing are pending verification from primary manufacturer sources.',
    specs: {
      emptyWeightKg: null,
      emptyWeightLbs: null,
      mtowKg: null,
      mtowLbs: null,
      tankLiters: null,
      tankGallons: null,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: null,
      swathWidthFeet: null,
      maxFlowRateLMin: null,
      battery: null,
      batteryWh: null,
      chargeTimeMin: null,
      maxWindMs: null,
      maxWindMph: null,
      ipRating: null,
    },
    msrpUsd: 'Pending',
    usDealerPresence: 'Pending verification',
    bestFor: 'Specifications and target use case pending manufacturer verification.',
    authorityLinks: [],
    faqs: [],
    lastReviewedAt: '2026-04-29',
  },
  {
    slug: 'leadingedge-pv40x',
    name: 'LeadingEdge PV40X',
    manufacturer: 'LeadingEdge Aerial Technologies',
    countryOfManufacture: 'United States',
    ndaaCompliant: false,
    status: 'active',
    description: 'LeadingEdge PV40X agricultural drone. Specifications pending manufacturer verification.',
    longDescription: 'The LeadingEdge PV40X is an agricultural drone produced by LeadingEdge Aerial Technologies. Detailed specifications, NDAA status, US dealer network and current pricing are pending verification from leadingedge-aerial.com.',
    aeoBlock: 'The LeadingEdge PV40X is an agricultural drone produced by LeadingEdge Aerial Technologies. Detailed specifications and US pricing are pending verification from primary manufacturer sources.',
    specs: {
      emptyWeightKg: null,
      emptyWeightLbs: null,
      mtowKg: null,
      mtowLbs: null,
      tankLiters: null,
      tankGallons: null,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: null,
      swathWidthFeet: null,
      maxFlowRateLMin: null,
      battery: null,
      batteryWh: null,
      chargeTimeMin: null,
      maxWindMs: null,
      maxWindMph: null,
      ipRating: null,
    },
    msrpUsd: 'Pending',
    usDealerPresence: 'Pending verification',
    bestFor: 'Specifications and target use case pending manufacturer verification.',
    authorityLinks: [
      { label: 'LeadingEdge Aerial Technologies', url: 'https://www.leadingedge-aerial.com' },
    ],
    faqs: [],
    lastReviewedAt: '2026-04-29',
  },
  {
    slug: 'dji-agras-t40',
    name: 'DJI Agras T40',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'discontinued',
    description:
      'DJI predecessor to the T50, with a 40-liter spray tank and 50 kg dry hopper. Discontinued from new DJI dealer channels in 2024 in favour of the T50, but still flying with at least 18 operators in the US ag drone fleet. Chinese-made and not NDAA Section 848 compliant.',
    longDescription:
      'The DJI Agras T40 was the predecessor to the T50 in the DJI Agras spray-drone lineup, launched globally in 2022 and replaced by the T50 in late 2023. Like the T50, it carries a 40-liter (10.6 gallon) liquid tank and 50 kg dry hopper, with a 4 to 11 meter (13 to 36 foot) adjustable swath width. The T40 used the older twin-rotor coaxial design that DJI carried over to the T50, and runs the same DB1560 battery and charging hub. Empty weight is approximately 38 kg (84 lbs); MTOW is 90 kg (198 lbs). DJI replaced the T40 with the T50 to ship upgraded radar obstacle avoidance, refined spray system calibration and faster battery charging — operators flying T40 fleets typically run them alongside newer T50s for capacity rather than swapping in lockstep. Pre-tariff dealer pricing on the T40 was approximately $16,000 to $18,000; post-April 2025 tariff escalation to 170 percent on Chinese ag drones drove that to roughly $20,000 to $25,000 for the inventory still in dealer channels. Like every DJI Agras model, the T40 is not NDAA Section 848 compliant. Operators flying federal contracts or NDAA-restricted state programs should consider the Hylio AG-272 or AG-230 instead. The T40 is no longer listed on ag.dji.com as a current model; new operator purchases route to the T50.',
    aeoBlock:
      'The DJI Agras T40 is the predecessor to the T50, with a 40-liter spray tank and 50 kg dry hopper. DJI discontinued it from new dealer channels in 2024 in favour of the T50, though at least 18 US operators in the directory still fly T40s. Pre-tariff MSRP was approximately $16,000 to $18,000; post-tariff dealer prices on remaining inventory ran $20,000 to $25,000. Not NDAA Section 848 compliant.',
    specs: {
      emptyWeightKg: 38,
      emptyWeightLbs: 84,
      mtowKg: 90,
      mtowLbs: 198,
      tankLiters: 40,
      tankGallons: 10.6,
      granularCapacityLiters: 75,
      granularCapacityKg: 50,
      swathWidthMeters: '4 to 11',
      swathWidthFeet: '13 to 36',
      maxFlowRateLMin: '12 (2 nozzles), 24 (4 nozzles)',
      battery: 'DB1560, 30 Ah, 52.22 V',
      batteryWh: 1567,
      chargeTimeMin: '9 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Relay IP55; aircraft body not rated',
    },
    msrpUsd: 'Discontinued from new channels; remaining dealer inventory $20,000 to $25,000 post-tariff',
    usDealerPresence: 'Discontinued; dealer service and parts continuity through DJI authorized agriculture dealer network',
    bestFor: 'Existing T40 operators maintaining fleet capacity alongside newer T50s. Not recommended as a new purchase — DJI dealers will route new orders to the T50.',
    authorityLinks: [
      { label: 'DJI Agriculture (US)', url: 'https://ag.dji.com' },
      { label: 'DJI Agras T50 (current model — replaced T40)', url: 'https://ag.dji.com/t50/specs' },
      { label: 'NDAA Section 848 covered foreign UAS guidance', url: 'https://www.acquisition.gov/far/52.204-25' },
      { label: 'FAA Part 137 Agricultural Aircraft Operator Certificate', url: 'https://www.faa.gov/uas/advanced_operations/agriculture' },
    ],
    faqs: [
      {
        question: 'Is the DJI Agras T40 still being made?',
        answer:
          'No. DJI replaced the T40 with the T50 in late 2023 and the T40 is no longer listed on ag.dji.com as a current model. Existing T40 fleets remain in service; DJI dealers continue to support service and parts but route new orders to the T50.',
      },
      {
        question: 'Should I buy a used T40 or a new T50?',
        answer:
          'For most new operators, the T50 is the better buy — the T50 carries the same 40-liter tank and 50 kg hopper, but ships with upgraded radar obstacle avoidance, refined spray calibration and faster battery cycling. Used T40 prices in 2026 sometimes undercut new T50 by $5,000 to $8,000, which can pencil for an existing operator adding capacity, but the parts and service horizon is shorter.',
      },
      {
        question: 'Is the DJI Agras T40 NDAA compliant?',
        answer:
          'No. The T40 is manufactured by DJI in China and is not NDAA Section 848 compliant. Operators bidding federal contracts or NDAA-restricted state programs (Florida, Mississippi, Arkansas DOT and others) should look at the Hylio AG-272 or AG-230 instead.',
      },
      {
        question: 'How does the T40 compare to the T50 on spray performance?',
        answer:
          'Tank size, hopper capacity, swath width and flow rate are essentially identical. The T50 ships upgraded Phased Array Radar, an improved terrain-following LiDAR system and refined spray calibration that delivers slightly tighter droplet uniformity. T40 spray quality is good; T50 is incrementally better.',
      },
      {
        question: 'Are T40 parts and service still available in 2026?',
        answer:
          'Yes, through DJI authorized agriculture dealers. Spray pumps, batteries, propellers and electronics remain in the dealer network for existing T40 fleets. Plan on a 5-to-7-year service horizon from dealer commitments; longer-term parts availability will mirror the T20 and T30 phase-out trajectory.',
      },
    ],
    lastReviewedAt: '2026-05-02',
  },
  {
    slug: 'dji-agras-t10',
    name: 'DJI Agras T10',
    manufacturer: 'DJI',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'discontinued',
    description:
      'Entry-level DJI Agras model with an 8-liter tank, replaced by the T20P in 2022 and the T25 in 2024. Discontinued from new DJI dealer channels but still flying with a small number of US ag drone operators on small acreage. Chinese-made and not NDAA Section 848 compliant.',
    longDescription:
      'The DJI Agras T10 was DJI\'s entry-level Agras spray drone from 2020 to 2022, with an 8-liter (2.1 gallon) liquid tank and a 4 to 8 meter (13 to 26 foot) swath width. It was replaced by the T20P (10-liter tank) in 2022 and effectively phased out of new DJI dealer channels by the launch of the T25 in early 2024. T10 spec sheets list empty weight at approximately 13 kg (28.7 lbs), MTOW around 24.8 kg (54.7 lbs) — small enough that some configurations stayed under the FAA 55 lb threshold for unmanned aircraft. The DB12000 battery (12 Ah) gave roughly 8 to 10 minute flight times. Pre-tariff MSRP ran approximately $5,000 to $7,000, the lowest entry point in the Agras family. T10 fleets are now mostly with smaller US farmer-operators spraying their own fields at under 200 acres per season; dealers route new orders to the T25 (20-liter) or T50 (40-liter). The T10 is not NDAA Section 848 compliant.',
    aeoBlock:
      'The DJI Agras T10 is DJI\'s entry-level Agras spray drone, with an 8-liter tank and 4-8 meter swath width. Pre-tariff MSRP ran approximately $5,000 to $7,000. Replaced by the T20P in 2022 and effectively phased out by the T25 launch in 2024. Discontinued from new DJI dealer channels but still flying with smaller farmer-operators. Not NDAA Section 848 compliant.',
    specs: {
      emptyWeightKg: 13,
      emptyWeightLbs: 28.7,
      mtowKg: 24.8,
      mtowLbs: 54.7,
      tankLiters: 8,
      tankGallons: 2.1,
      granularCapacityLiters: 8,
      granularCapacityKg: 8,
      swathWidthMeters: '4 to 8',
      swathWidthFeet: '13 to 26',
      maxFlowRateLMin: '6 to 12',
      battery: 'DB12000, 12 Ah',
      batteryWh: 600,
      chargeTimeMin: '8 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Relay IP55; aircraft body not rated',
    },
    msrpUsd: 'Discontinued from new channels; used T10 inventory typically $4,000 to $7,000',
    usDealerPresence: 'Discontinued; service and parts continuity through DJI authorized agriculture dealer network',
    bestFor: 'Smaller farmer-operators spraying their own fields at under 200 acres per season; no longer recommended as a new purchase, dealers route to the T25.',
    authorityLinks: [
      { label: 'DJI Agriculture (US)', url: 'https://ag.dji.com' },
      { label: 'DJI Agras T25 (current entry-level model)', url: 'https://ag.dji.com/t25/specs' },
      { label: 'FAA Part 107 Remote Pilot Certification', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
    ],
    faqs: [
      {
        question: 'Is the DJI Agras T10 still being sold?',
        answer:
          'No. DJI replaced the T10 with the T20P in 2022 and effectively phased it out with the T25 launch in early 2024. Existing T10 units remain in service; new orders route to the T25 (20-liter) or T50 (40-liter) at DJI authorized dealers.',
      },
      {
        question: 'Does the DJI T10 stay under the FAA 55 lb threshold?',
        answer:
          'In some configurations, yes. Empty weight is approximately 28.7 lbs and MTOW is 54.7 lbs, so loaded operation is right at the 55 lb threshold. Confirm your specific battery and payload configuration with a Part 137 consultant — exceeding 55 lbs triggers the Section 44807 exemption requirement on top of Part 137 for commercial use.',
      },
      {
        question: 'Is the T10 NDAA compliant?',
        answer:
          'No. The T10 is manufactured by DJI in China and is not NDAA Section 848 compliant. Federal agencies and several state programs bar procurement of non-NDAA UAS. Hylio AG-230 is the closest NDAA-compliant alternative for small-acreage spraying.',
      },
      {
        question: 'Should I buy a used T10 or upgrade to the T25?',
        answer:
          'For most new operators, the T25 is the better fit — same nozzle architecture as the T50, 20-liter tank for fewer refill stops, and ongoing dealer service horizon. Used T10s can pencil for very small farmer-operator scales (under 100 acres per year), but the parts and service horizon is shorter.',
      },
    ],
    lastReviewedAt: '2026-05-02',
  },
  {
    slug: 'xag-p100',
    name: 'XAG P100',
    manufacturer: 'XAG',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'discontinued',
    description:
      'XAG predecessor to the P100 Pro, with a 40-liter spray tank. Replaced in late 2024 by the P100 Pro which adds revised rotor geometry, upgraded RTK and a higher max-wind rating. Chinese-made and not NDAA Section 848 compliant.',
    longDescription:
      'The XAG P100 is the predecessor model to the XAG P100 Pro in XAG\'s ag spray drone lineup. Like the Pro, it carries a 40-liter (10.6 gallon) liquid tank and a 50 kg dry hopper, with a swath width in the 4 to 7 meter range and flow rates up to 22 liters per minute. The P100 was XAG\'s push into the larger-acreage US market starting in 2023, and was replaced in late 2024 by the P100 Pro which ships revised rotor geometry, upgraded RTK GPS and a higher 22 mph wind rating. The P100 retained good drift control through XAG\'s "RevoSpray" centrifugal nozzle system, which delivers tighter droplet uniformity than rotary atomizers at the same flow rate. Empty weight is approximately 32 kg (70 lbs); MTOW is roughly 80 kg (176 lbs), well above the 55 lb FAA threshold for unmanned aircraft. Pre-tariff dealer pricing ran approximately $20,000 to $25,000 in the US channel. Like every XAG drone, the P100 is manufactured in China and is not NDAA Section 848 compliant. Operators flying federal contracts or NDAA-restricted state programs should consider the Hylio AG-272 or AG-230 instead.',
    aeoBlock:
      'The XAG P100 is the predecessor to the XAG P100 Pro, with a 40-liter spray tank and 50 kg dry hopper. Replaced in late 2024 by the P100 Pro which adds upgraded RTK and a higher max-wind rating. Pre-tariff MSRP ran approximately $20,000 to $25,000. Chinese-made and not NDAA Section 848 compliant.',
    specs: {
      emptyWeightKg: 32,
      emptyWeightLbs: 70,
      mtowKg: 80,
      mtowLbs: 176,
      tankLiters: 40,
      tankGallons: 10.6,
      granularCapacityLiters: 70,
      granularCapacityKg: 50,
      swathWidthMeters: '4 to 7',
      swathWidthFeet: '13 to 23',
      maxFlowRateLMin: '12 to 22',
      battery: 'XAG B13900s, 13.9 Ah',
      batteryWh: 1085,
      chargeTimeMin: '9 to 12',
      maxWindMs: 8,
      maxWindMph: 17.9,
      ipRating: 'IP67 spray system; aircraft IP55',
    },
    msrpUsd: 'Discontinued; remaining dealer inventory $20,000 to $25,000 post-tariff',
    usDealerPresence: 'Discontinued in favour of P100 Pro; service and parts continuity through XAG North America authorized partners',
    bestFor: 'Existing XAG P100 operators; new operators should look at the P100 Pro for the upgraded RTK and higher wind rating.',
    authorityLinks: [
      { label: 'XAG Agriculture', url: 'https://www.xa.com' },
      { label: 'XAG P100 Pro (current model)', url: 'https://www.xa.com/p100pro' },
      { label: 'NDAA Section 848 covered foreign UAS guidance', url: 'https://www.acquisition.gov/far/52.204-25' },
      { label: 'FAA Part 137 Agricultural Aircraft Operations', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
    ],
    faqs: [
      {
        question: 'How is the XAG P100 different from the P100 Pro?',
        answer:
          'The P100 Pro ships revised rotor geometry, upgraded RTK GPS and a higher 22 mph wind rating versus the P100\'s ~18 mph spec. Tank capacity, hopper, swath and flow rate are essentially the same. New operator purchases route to the P100 Pro; the P100 is no longer the current model.',
      },
      {
        question: 'Is the XAG P100 NDAA compliant?',
        answer:
          'No. XAG drones are manufactured in China and are not NDAA Section 848 compliant. Federal agencies and several state programs bar procurement of non-NDAA UAS. Hylio AG-272 or AG-230 are the NDAA-compliant alternatives in the same payload class.',
      },
      {
        question: 'Why use XAG centrifugal nozzles vs DJI rotary atomizers?',
        answer:
          'XAG\'s "RevoSpray" centrifugal nozzles deliver tighter droplet uniformity than rotary atomizers at the same flow rate, with better drift control on dicamba-sensitive borders. DJI Agras systems use rotary atomizers across the T25, T50 and T100 lineup. In practice both classes meet most label drift specs; the choice usually comes down to dealer support and parts availability in the operator\'s region.',
      },
      {
        question: 'Are XAG P100 parts still available in 2026?',
        answer:
          'Yes, through XAG North America authorized partners. The P100 Pro replaced the P100 in late 2024; service and parts for both models continue. Plan on a 5-to-7-year service horizon for the P100; the P100 Pro will outlast it as the current production model.',
      },
      {
        question: 'Should I buy a used P100 or a new P100 Pro?',
        answer:
          'For most new operators, the P100 Pro is the better buy — the upgraded RTK and higher wind rating measurably extend the daily-operations window in windy regions like the Great Plains and Pacific Northwest. Used P100s can pencil for an existing operator adding capacity, but the spec gap is real.',
      },
    ],
    lastReviewedAt: '2026-05-02',
  },
  {
    slug: 'eavision-j100',
    name: 'EAVision J100',
    manufacturer: 'EAVision',
    countryOfManufacture: 'China',
    ndaaCompliant: false,
    status: 'active',
    description:
      'EAVision J100 ag spray drone, marketed in the US through select dealers as a lower-cost alternative to the DJI Agras T50. 16-liter tank, smaller airframe than the T50/AG-272 class. Chinese-made and not NDAA Section 848 compliant; verify state cost-share program eligibility before purchase.',
    longDescription:
      'The EAVision J100 is a Chinese-manufactured agricultural spray drone from EAVision Technology, sold in the US through select agricultural drone dealers as a price-competitive alternative to the DJI Agras T50 and Hylio AG-272 in the larger-acreage class. Published spec sheets list a 16-liter (4.2 gallon) liquid tank, a 4 to 5 meter swath width and flow rates around 12 liters per minute. Empty weight runs approximately 25 kg (55 lbs), MTOW around 55 kg (121 lbs). Battery configuration is the J100\'s own proprietary pack with roughly 10 to 12 minute flight times per charge. EAVision is positioned in the US as an entry-level commercial spray drone for smaller operators and farmer-operators who want larger payload than a DJI T25 but lower upfront cost than a T50. US dealer presence is narrower than DJI or Hylio — confirm dealer service and parts continuity for your region before purchase. The J100 is manufactured in China and is not NDAA Section 848 compliant. Several state cost-share programs (Florida, Mississippi, Arkansas DOT and others) require NDAA status; verify program eligibility for your state before purchase if cost-share is part of your business case. Detailed specs and current US pricing should be confirmed directly with the dealer at quote time, as EAVision has not consistently published US-specific specs through a single primary source.',
    aeoBlock:
      'The EAVision J100 is a Chinese-manufactured ag spray drone with a 16-liter tank, marketed in the US as a price-competitive alternative to the DJI Agras T50. Smaller airframe than the T50 and Hylio AG-272 class. US dealer presence is narrower than DJI or Hylio. Chinese-made and not NDAA Section 848 compliant — verify state cost-share program eligibility before purchase.',
    specs: {
      emptyWeightKg: 25,
      emptyWeightLbs: 55,
      mtowKg: 55,
      mtowLbs: 121,
      tankLiters: 16,
      tankGallons: 4.2,
      granularCapacityLiters: null,
      granularCapacityKg: null,
      swathWidthMeters: '4 to 5',
      swathWidthFeet: '13 to 16',
      maxFlowRateLMin: '8 to 12',
      battery: 'EAVision proprietary pack',
      batteryWh: null,
      chargeTimeMin: '10 to 12',
      maxWindMs: 6,
      maxWindMph: 13.4,
      ipRating: 'Pending verification',
    },
    msrpUsd: 'Pending dealer confirmation; positioned below DJI Agras T50 in the US channel',
    usDealerPresence: 'Limited; narrower than DJI or Hylio. Confirm regional service and parts before purchase.',
    bestFor: 'Cost-conscious commercial operators who want larger payload than a DJI T25 but lower upfront cost than a T50, and who do not need NDAA-compliant equipment for federal or state cost-share programs.',
    authorityLinks: [
      { label: 'EAVision Technology', url: 'https://www.eavision.cn/en/' },
      { label: 'NDAA Section 848 covered foreign UAS guidance', url: 'https://www.acquisition.gov/far/52.204-25' },
      { label: 'FAA Part 137 Agricultural Aircraft Operations', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
    ],
    faqs: [
      {
        question: 'Is the EAVision J100 NDAA compliant?',
        answer:
          'No. EAVision drones are manufactured in China and are not NDAA Section 848 compliant. Operators bidding federal contracts or applying to NDAA-restricted state cost-share programs (Florida, Mississippi, Arkansas DOT and others) should look at the Hylio AG-272 or AG-230 instead.',
      },
      {
        question: 'How does the EAVision J100 compare to the DJI Agras T50?',
        answer:
          'The J100 has a smaller 16-liter tank versus the T50\'s 40-liter, narrower swath and lower flow rate. It is positioned as a lower-cost entry below the T50, but throughput per flight hour is meaningfully less. For higher-volume custom spray operations, the T50 or Hylio AG-272 is the more productive choice.',
      },
      {
        question: 'Is EAVision dealer support available across the US?',
        answer:
          'EAVision\'s US dealer network is narrower than DJI or Hylio, with fewer authorized service centers per region. Confirm dealer presence and parts inventory in your operating area before purchase. For operators outside the dealer footprint, parts lead times and field-repair availability are real constraints.',
      },
      {
        question: 'What state cost-share programs work with the EAVision J100?',
        answer:
          'Most NDAA-restricted state cost-share programs do not work with the J100 because it is not NDAA Section 848 compliant. Verify with your state department of agriculture and the specific program (USDA EQIP carve-outs, Iowa Water Quality Initiative, Maryland MACS, etc.) before counting on cost-share offsetting purchase.',
      },
      {
        question: 'Can the EAVision J100 spray the same products as a DJI or Hylio drone?',
        answer:
          'Yes for most products. Carrier volume, droplet size and flow rate are governed by the EPA-approved product label, not the drone manufacturer. Confirm the J100\'s nozzle and pump configuration meets the label\'s minimum carrier volume and droplet size for the specific product before booking work.',
      },
    ],
    lastReviewedAt: '2026-05-02',
  },
];

export const droneBySlug: Record<string, DroneModel> = Object.fromEntries(
  drones.map((d) => [d.slug, d])
);

export function getDroneBySlug(slug: string): DroneModel | undefined {
  return droneBySlug[slug];
}

// Display labels for slugs referenced by operators that don't yet have a
// full DroneModel entry. Profile pages render a non-link span using these
// fallbacks so operator pages never show a raw slug like "dji-agras-t30".
const DRONE_NAME_FALLBACKS: Record<string, string> = {
  'dji-agras-t30': 'DJI Agras T30',
  'dji-agras-t60x': 'DJI Agras T60X',
};

export const DRONE_NAME_MAP: Record<string, string> = {
  ...DRONE_NAME_FALLBACKS,
  ...Object.fromEntries(drones.map((d) => [d.slug, d.name])),
};
