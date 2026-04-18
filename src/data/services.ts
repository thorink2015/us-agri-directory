import { ServiceDefinition } from './types';

export const services: ServiceDefinition[] = [
  {
    slug: 'spraying',
    name: 'Drone Pesticide Spraying',
    description:
      'Aerial application of fungicides, insecticides, and herbicides by agricultural drone across row crops, vineyards, and orchards in all 50 US states.',
    longDescription:
      'Drone pesticide spraying is the single largest ag drone service in the United States, generating an estimated 60 percent of all commercial drone flight hours in agriculture. Operators run DJI Agras T50 and T40, Hylio AG-272 and AG-230, and XAG P100 Pro class machines to apply EPA-registered crop protection products at 2 to 5 gallons per acre carrier volume. Typical field throughput is 40 to 60 acres per flight hour for a single T50, and large operators run 3 to 8 drone fleets that treat 800 to 1,500 acres per day during peak windows. The three regulatory pillars every commercial drone sprayer must clear are FAA Part 107 (remote pilot certification), FAA Part 137 (agricultural aircraft operator certificate), and a state commercial pesticide applicator license with an aerial endorsement. Labels govern everything: carrier volume minimums, droplet size specs, wind limits, buffer zones, REI (restricted entry interval), and PHI (preharvest interval) all come from the EPA-approved product label, not from operator preference.',
    aeoBlock:
      'Drone pesticide spraying in the US costs $12 to $22 per acre depending on crop, region, and product. It is legally required to hold FAA Part 137 certification plus a state commercial pesticide applicator license with aerial category endorsement. Most commercial operators run DJI Agras T50 or Hylio AG-272 class drones at 2 to 5 gallons per acre carrier volume, treating 40 to 60 acres per flight hour per drone.',
    priceMinUsd: 12,
    priceMaxUsd: 22,
    priceUnit: 'per acre',
    icon: '💧',
    authorityLinks: [
      { label: 'FAA Part 137 Agricultural Aircraft Operations', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
      { label: 'EPA Pesticide Registration and Labeling', url: 'https://www.epa.gov/pesticide-labels' },
      { label: 'USDA NASS: Agricultural Chemical Use Surveys', url: 'https://www.nass.usda.gov/Surveys/Guide_to_NASS_Surveys/Chemical_Use/' },
    ],
    faqs: [
      {
        question: 'Do I need FAA Part 137 to spray crops with a drone commercially?',
        answer:
          'Yes. Any commercial aerial application of pesticides, even by drone, requires a Part 137 Agricultural Aircraft Operator Certificate in addition to Part 107. Farmers spraying only their own crops may qualify for a simplified Part 137 private applicator path, but anyone charging a third party or treating land they do not own must hold the full commercial Part 137.',
      },
      {
        question: 'What does drone spraying cost per acre in 2026?',
        answer:
          'National averages run $12 to $22 per acre for fungicide and insecticide applications on corn, soybeans, and wheat. Orchard, vineyard, and specialty crop work runs $18 to $35 per acre because of dense canopy and more passes per season. Minimum field size is typically 40 to 80 acres, with travel surcharges on fields more than 30 miles from the operator base.',
      },
      {
        question: 'Can drones spray dicamba, paraquat, or other restricted use pesticides?',
        answer:
          'Yes, if the product label permits aerial application and the operator holds a state commercial applicator license in the restricted use category. Dicamba has state-specific drone approval rules, paraquat requires an online certification plus state license, and 2,4-D drone applications follow the label droplet and wind restrictions. Always check the label and your state department of agriculture before booking.',
      },
      {
        question: 'What wind speed and weather stop a drone spray job?',
        answer:
          'Most commercial operators cap wind at 10 mph for standard droplet applications and 7 mph for dicamba and 2,4-D. Inversions, rain within 4 to 8 hours, and temperatures above 85 F with low humidity also pause spraying. Operators use on-drone weather stations plus local mesonet data to document conditions for every application as required by FIFRA recordkeeping.',
      },
      {
        question: 'How far in advance should I book a drone sprayer?',
        answer:
          'For corn fungicide in July, book 4 to 6 weeks out. For wheat heading sprays, book in April for June applications. For orchard and vineyard full-season programs, book an annual contract in January or February. One-off jobs during peak disease or pest spikes are often impossible to source without a pre-existing operator relationship.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'seeding',
    name: 'Aerial Cover Crop Seeding',
    description:
      'Drone aerial broadcast seeding of cover crops into standing corn, soybeans, and specialty crops across the Corn Belt, Chesapeake Bay watershed, and California.',
    longDescription:
      'Aerial cover crop seeding is the fastest-growing ag drone service in the US, with approximately 15 million acres planted to cover crops annually. Drones broadcast cereal rye, annual ryegrass, crimson clover, hairy vetch, oats, and brassicas into standing row crops 2 to 6 weeks before harvest, giving seeds a 3 to 4 week head start over post-harvest ground seeding. The USDA NRCS Cover Crop Practice Standard 340 makes drone seeding eligible for EQIP cost-share payments of $25 to $55 per acre in most states, which often covers 50 to 70 percent of the total cost. Throughput on a DJI Agras T50 or T40 runs 200 to 400 acres per drone per day of broadcast seeding, with seed rate, wind conditions, and field layout as the main variables. Most operators handle the seed procurement themselves and charge a combined seed-plus-application rate, though bring-your-own-seed arrangements are common for farmers enrolled in state cost-share programs with specific species mandates.',
    aeoBlock:
      'Drone cover crop seeding costs $12 to $18 per acre application only, or $22 to $35 per acre seed and application combined. USDA NRCS EQIP cost-share under Cover Crop Practice Standard 340 pays $25 to $55 per acre in most states, reducing net farmer cost to $5 to $12 per acre. A single DJI Agras T50 broadcasts 200 to 400 acres per day during the peak August to October window.',
    priceMinUsd: 12,
    priceMaxUsd: 18,
    priceUnit: 'per acre',
    icon: '🌱',
    authorityLinks: [
      { label: 'USDA NRCS Cover Crop Practice Standard 340', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/cover-crop-ac-340-conservation-practice-standard' },
      { label: 'Midwest Cover Crops Council: Species Selection Tool', url: 'https://midwestcovercrops.org/covercroptool' },
      { label: 'USDA EQIP Environmental Quality Incentives Program', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
    ],
    faqs: [
      {
        question: 'What cover crop species work best for drone seeding?',
        answer:
          'Cereal rye is the workhorse in the Corn Belt and establishes reliably from September aerial seeding. Annual ryegrass, crimson clover, hairy vetch, oats, radishes, and brassicas all broadcast well. Large-seeded crops like soybeans and peas are impractical because of tank capacity and seed damage on impact.',
      },
      {
        question: 'When is the right time to drone-seed cover crops?',
        answer:
          'Late August through early October in the Corn Belt, timed around corn canopy senescence so seed reaches soil. Iowa and Illinois operators typically run August 20 through September 15 for corn. The goal is for corn leaves to drop within a week of seeding so sunlight reaches germinating cover crops.',
      },
      {
        question: 'How much does USDA NRCS EQIP pay for drone cover crop seeding?',
        answer:
          'EQIP cost-share under Practice Standard 340 varies by state but typically pays $25 to $55 per acre for seed plus application combined, which covers 50 to 70 percent of the total drone-seeded cost. Some states layer Regional Conservation Partnership Program (RCPP) funds on top for 80 to 100 percent coverage. Check with your local NRCS field office for state-specific rates.',
      },
      {
        question: 'Does drone cover crop seeding beat post-harvest ground seeding?',
        answer:
          'For early establishment, yes. Drone seeding into standing corn or soybeans gives the cover crop 3 to 4 extra weeks to root before frost. This is critical for cereal rye aiming at full ground cover by November, or for clovers that need time to nodulate before dormancy. Post-harvest drilling after late October corn harvest often produces thinner stands.',
      },
      {
        question: 'How far ahead should I book a drone operator for cover crop seeding?',
        answer:
          'By late July or early August for September slots in the Corn Belt. The cover crop window overlaps with corn fungicide mop-up and soybean pre-harvest, so operator capacity is the real constraint. Late callers usually get pushed into post-harvest ground seeding at higher combined cost.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'mapping',
    name: 'Agricultural Drone Mapping',
    description:
      'Drone-based aerial mapping for field boundaries, elevation, drainage planning, yield zones, and variable-rate prescription maps.',
    longDescription:
      'Agricultural drone mapping produces orthomosaics, digital elevation models, and field boundary data for precision farming, drainage tile design, yield zone analysis, and variable-rate prescriptions. Fixed-wing drones like the senseFly eBee X and quadcopter platforms like the DJI Mavic 3 Multispectral and Phantom 4 RTK cover 200 to 1,500 acres per flight at ground sample distances of 1 to 5 centimeters per pixel. Mapping is the lowest regulatory barrier ag drone service because it does not require Part 137 or a state pesticide license, only FAA Part 107 and the standard airspace authorizations. Typical deliverables include geo-referenced orthomosaics in GeoTIFF or JPEG, digital elevation models for drainage planning, volumetric calculations for silage piles, and vegetation index maps (NDVI, NDRE) as a raw layer. Most operators charge per acre with a minimum flight fee, and prescription-ready outputs (variable-rate fertilizer or seed maps) command a premium over raw orthomosaic output.',
    aeoBlock:
      'Agricultural drone mapping costs $2 to $8 per acre for raw orthomosaics and elevation data, rising to $5 to $15 per acre when prescription maps for variable-rate application are included. Only FAA Part 107 is required, with no Part 137 or state pesticide license needed. Fixed-wing drones cover 500 to 1,500 acres per flight, while quadcopter platforms handle 100 to 400 acres per flight.',
    priceMinUsd: 2,
    priceMaxUsd: 8,
    priceUnit: 'per acre',
    icon: '🗺️',
    authorityLinks: [
      { label: 'FAA Part 107 Small UAS Operations', url: 'https://www.faa.gov/uas/commercial_operators' },
      { label: 'USDA NRCS Soil Survey Resources', url: 'https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soil/soil-survey' },
      { label: 'ASABE Standards for Aerial Sensor Data', url: 'http://asabe.org/Standards' },
    ],
    faqs: [
      {
        question: 'What can I actually do with a drone-mapped field?',
        answer:
          'Design drainage tile layouts from the elevation model, generate variable-rate seed and fertilizer prescriptions from NDVI zones, document stand counts after emergence, calculate storage pile volumes, track crop progress over the season, and produce yield zone maps for post-harvest analysis. Most deliverables import directly into Climate FieldView, John Deere Operations Center, or SMS software.',
      },
      {
        question: 'Do I need Part 137 for drone mapping?',
        answer:
          'No. Mapping does not dispense anything, so Part 107 is sufficient. This is why mapping is often the first commercial ag drone service new operators add, since the regulatory barrier is roughly a weekend of study and a proctored exam compared to the months-long Part 137 exemption process.',
      },
      {
        question: 'How accurate are drone-made elevation maps for tile drainage design?',
        answer:
          'RTK-corrected drone elevation maps typically hit 2 to 5 centimeter vertical accuracy, which is sufficient for tile drainage design in most field conditions. Engineers still verify high-precision designs with ground GPS shots at tile outlet locations, but the drone flight replaces 80 to 90 percent of the traditional grid survey time and cost.',
      },
      {
        question: 'What does drone mapping cost per acre?',
        answer:
          'Raw orthomosaic mapping runs $2 to $5 per acre with a $250 to $500 minimum flight fee. Adding elevation data typically adds $1 to $3 per acre. Full prescription-ready outputs (variable-rate maps in the customer agronomy software of choice) run $5 to $15 per acre. Multi-season contracts often discount these rates 20 to 30 percent.',
      },
      {
        question: 'Can I use a DJI Agras T50 for mapping instead of a separate mapping drone?',
        answer:
          'Technically yes but practically no. T50s are designed for spraying payload and battery use, not long endurance mapping. Most operators who offer both services run a T50 for spraying plus a Mavic 3 Multispectral or Phantom 4 RTK for mapping because the mapping drones deliver better ground sample distance, longer flight times, and better imaging sensors.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'monitoring',
    name: 'Crop Health Monitoring',
    description:
      'In-season drone crop scouting with NDVI, NDRE, and multispectral imagery to detect stress, disease, and pest pressure before visual symptoms appear.',
    longDescription:
      'Drone crop health monitoring uses multispectral and thermal sensors to detect plant stress 7 to 14 days before visual symptoms appear to a scout on the ground. Operators fly the DJI Mavic 3 Multispectral, Phantom 4 Multispectral, or Parrot Bluegrass Fields platforms over corn, soybeans, wheat, vegetable, and specialty crop fields on a weekly or biweekly schedule. Deliverables include NDVI and NDRE vegetation index maps, thermal imagery for irrigation stress detection, and zone-based reports that translate spectral data into specific scouting recommendations. Typical use cases include tracking corn rootworm damage, nitrogen deficiency zones, variable emergence rates, irrigation uniformity, and disease hotspot early warning. The service is typically billed per flight or per season, with per-acre rates $3 to $10 for single flights and $25 to $60 per acre per season for weekly monitoring programs. Unlike spraying, monitoring requires only FAA Part 107 with no Part 137 or state applicator license, though night operations or BVLOS work need specific FAA waivers.',
    aeoBlock:
      'Drone crop health monitoring costs $3 to $10 per acre per flight, or $25 to $60 per acre per season for weekly monitoring programs. Multispectral sensors detect nitrogen stress, disease, and pest damage 7 to 14 days before visual symptoms appear. Only FAA Part 107 is required, and the service is commonly bundled with variable-rate prescription mapping for input savings of $8 to $15 per acre on nitrogen and fungicide.',
    priceMinUsd: 3,
    priceMaxUsd: 10,
    priceUnit: 'per acre per flight',
    icon: '📡',
    authorityLinks: [
      { label: 'USDA NIFA Precision and Sensor Technologies Programs', url: 'https://www.nifa.usda.gov/grants/programs/precision-geospatial-sensor-technologies-programs' },
      { label: 'Purdue Extension: Field Crops and Precision Agriculture Resources', url: 'https://extension.purdue.edu/anr/_teams/field-crops/resources/index.html' },
      { label: 'USGS Earth Resources Observation and Science', url: 'https://www.usgs.gov/centers/eros' },
    ],
    faqs: [
      {
        question: 'What is NDVI and why does it matter for my fields?',
        answer:
          'NDVI (Normalized Difference Vegetation Index) measures the ratio of near-infrared to red light reflected by plants. Healthy plants reflect high near-infrared and absorb red, so high NDVI means healthy dense biomass. Low NDVI zones flag areas with stress, poor emergence, disease, or nitrogen deficiency, all of which a drone sensor picks up 1 to 2 weeks before a ground scout would see symptoms.',
      },
      {
        question: 'Can drone monitoring actually pay for itself?',
        answer:
          'University trials in Illinois and Iowa show targeted variable-rate nitrogen based on drone NDRE data saves $8 to $15 per acre on fertilizer without yield loss. Fungicide-only treatment of hotspot disease zones rather than whole-field applications saves another $4 to $8 per acre on applicable fields. For most corn and wheat operations, one or two targeted in-season applications based on drone data covers the full seasonal monitoring cost.',
      },
      {
        question: 'How often should I fly monitoring missions on my fields?',
        answer:
          'Biweekly from V6 through R3 on corn, weekly from R1 through R5 on soybeans, biweekly from tillering through T3 on wheat. Vegetable and specialty crop growers often run weekly missions during the main growing window. Fewer flights miss the inflection points, more flights add cost without much additional signal.',
      },
      {
        question: 'Do I need Part 137 for crop scouting flights?',
        answer:
          'No. Monitoring dispenses nothing, so Part 107 is sufficient. This is why monitoring is often the first ag drone service new operators offer commercially. BVLOS (beyond visual line of sight) flights for whole-farm efficiency require an additional FAA waiver, which is approved case by case and is still the exception rather than the rule in 2026.',
      },
      {
        question: 'What is the difference between NDVI and NDRE for corn?',
        answer:
          'NDVI saturates on dense corn canopies after V10, meaning the signal flattens and stress differences become invisible. NDRE uses the red edge band and keeps differentiating even in mature canopies. Corn monitoring should use NDRE from V10 onward, and NDVI is still valid for early vegetative stages and for crops with less dense canopy.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'spreading',
    name: 'Dry Granular Spreading',
    description:
      'Drone broadcast of dry granular fertilizer, urea, gypsum, lime, and cover crop seed across fields that are too wet or too tall for ground spreaders.',
    longDescription:
      'Drone dry granular spreading fills a real gap when fields are too wet for ground spreaders but still need fertilizer, lime, gypsum, or rescue nitrogen. The DJI Agras T50 and T40 both offer dry-hopper attachments that broadcast 50 to 80 lbs per acre of urea, cover crop seed, or granular fertilizer at 3 to 5 acre per minute throughput. Typical use cases include rescue nitrogen on pre-tasseling corn after spring rains blocked ground rigs, granular fungicide seed treatment alternatives, sulfur and gypsum top-dress on alfalfa, and targeted lime on soil test zones. The service does not require Part 137 because dry fertilizer and seed are not pesticides, but some states still require a commercial pesticide applicator license if the product being spread is a granular herbicide or restricted use nutrient. Spreading rates are typically $10 to $18 per acre application only, with bring-your-own-product arrangements for fertilizer and all-in pricing for cover crop seed.',
    aeoBlock:
      'Drone dry granular spreading costs $10 to $18 per acre for application only, or $22 to $40 per acre when product is included. A DJI Agras T50 with dry hopper broadcasts urea, cover crop seed, or granular fertilizer at 50 to 80 lbs per acre, covering 150 to 300 acres per day. Only FAA Part 137 plus state pesticide license apply when the product is a granular herbicide; fertilizer-only spreading requires only Part 107.',
    priceMinUsd: 10,
    priceMaxUsd: 18,
    priceUnit: 'per acre',
    icon: '⚙️',
    authorityLinks: [
      { label: 'USDA NRCS Nutrient Management Standard 590', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/nutrient-management-ac-590-conservation-practice-standard' },
      { label: 'Association of American Plant Food Control Officials (AAPFCO)', url: 'https://www.aapfco.org' },
      { label: 'The Fertilizer Institute: 4R Nutrient Stewardship', url: 'https://www.tfi.org/our-industry/stewardship/4r-nutrient-stewardship' },
    ],
    faqs: [
      {
        question: 'Can drones really spread dry fertilizer at rates that matter?',
        answer:
          'Yes for broadcast rates up to about 80 lbs per acre. A DJI Agras T50 with the 80L dry hopper holds enough for 1.0 to 1.5 acres at typical urea rates, and the operator cycles through batteries and hopper refills to keep throughput at 150 to 300 acres per day. Rates above 100 lbs per acre start to make ground spreaders more economical once fields are dry enough for wheels.',
      },
      {
        question: 'What is rescue nitrogen and when do drones shine for it?',
        answer:
          'Rescue nitrogen is a side-dress urea or UAN application after the V8 to V12 window, when corn is too tall for most ground rigs and spring rains have prevented timely fertilization. Drones solve this because the tall corn no longer obstructs access and field soil moisture does not matter since wheels never touch the ground. Yield response to timely rescue N on deficient corn is 15 to 30 bushels per acre.',
      },
      {
        question: 'Do drones need Part 137 to spread fertilizer?',
        answer:
          'Not for pure fertilizer. Urea, potash, gypsum, lime, sulfur, and micronutrients are not pesticides and fall outside FAA Part 137. However, granular herbicides (e.g., Aatrex DF) and combination products that contain any EPA-registered pesticide active ingredient do trigger Part 137 and state pesticide applicator licensing.',
      },
      {
        question: 'How much does drone spreading cost per acre?',
        answer:
          'Application-only rates run $10 to $18 per acre, with bring-your-own-product arrangements standard. All-in rates including product are typically $22 to $40 per acre for cover crop seed or urea. Minimum field size is usually 40 acres, with cover crop seeding often bundled into multi-service contracts at lower net rates.',
      },
      {
        question: 'Can drones broadcast cover crop seed as well as fertilizer?',
        answer:
          'Yes, and cover crop seeding is the most common dry-hopper use. The same DJI Agras T50 that spreads urea also broadcasts cereal rye, ryegrass, clover, and radish seed at 15 to 60 lbs per acre. Many operators run fertilizer spreading during the May through June window and cover crop seeding August through October on the same equipment.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'training',
    name: 'Ag Drone Pilot Training',
    description:
      'Training programs for FAA Part 107, Part 137 exemption prep, state pesticide applicator prep, and manufacturer-specific drone operator certification.',
    longDescription:
      'Ag drone pilot training covers the three certifications a commercial ag drone operator needs: FAA Part 107 remote pilot certificate, FAA Part 137 agricultural aircraft operator certificate prep (including the 44807 exemption path for drones over 55 lbs), and state commercial pesticide applicator licensing with aerial category endorsement. Training providers include manufacturer academies (DJI Agras, Hylio Academy, XAG Training Center), third-party specialists (Rantizo, Precision Aerial Solutions, Drone Pilot Ground School), and state extension universities (Purdue, Iowa State, University of Nebraska, Mississippi State). Typical programs range from a two-day DJI T50 operator certification at $500 to $900 to a full Part 137 exemption bundle at $2,500 to $4,500 that includes FAA paperwork support, operations manual templates, and one on one coaching through the 120-day exemption approval process. State pesticide applicator prep courses are typically offered through state land-grant universities for $75 to $300 per category, with aerial category adding $25 to $100.',
    aeoBlock:
      'Ag drone pilot training courses cost $500 to $900 for basic manufacturer operator certification (DJI T50, Hylio AG-272), $2,500 to $4,500 for full FAA Part 137 exemption prep packages, and $75 to $300 per state pesticide applicator license category. Third-party trainers include Rantizo, Precision Aerial Solutions, and Drone Pilot Ground School, plus manufacturer academies and state extension universities. Total investment for a new commercial ag drone operator typically runs $3,500 to $6,000 across all three certification tracks.',
    priceMinUsd: 500,
    priceMaxUsd: 4500,
    priceUnit: 'per course',
    icon: '🎓',
    authorityLinks: [
      { label: 'FAA Part 107 Knowledge Test Study Materials', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
      { label: 'FAA Part 137 Certification Process for UAS', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
      { label: 'National Pesticide Safety Education Center (NPSEC)', url: 'https://npsec.us' },
    ],
    faqs: [
      {
        question: 'What certifications do I actually need to spray crops commercially with a drone?',
        answer:
          'Three certifications: FAA Part 107 (remote pilot), FAA Part 137 (agricultural aircraft operator certificate), and a state commercial pesticide applicator license with aerial category endorsement. Drones over 55 lbs also require a Section 44807 exemption from FAA, which is part of the Part 137 application package for most operators.',
      },
      {
        question: 'How long does it take to get fully certified?',
        answer:
          'Part 107 runs about 2 to 4 weeks of study plus the proctored exam. State pesticide applicator licensing runs 1 to 3 months depending on state testing schedules. Part 137 plus the 44807 exemption runs 90 to 180 days from FAA submission to approval. Most new operators plan for a 6 to 9 month full certification timeline before taking commercial customers.',
      },
      {
        question: 'Is a manufacturer operator certification required to use a DJI T50?',
        answer:
          'No FAA or state rule requires it, but DJI dealers typically require proof of either manufacturer training or equivalent experience before selling the T50. The 2-day DJI Agras operator certification runs $500 to $900 and covers safe operation, maintenance, software setup, and field workflow. Hylio and XAG have parallel manufacturer academies.',
      },
      {
        question: 'Can I get reimbursed through USDA programs for drone pilot training?',
        answer:
          'Partially, yes. USDA Beginning Farmer and Rancher Development Program (BFRDP) grants, Veterans Farmer Coalition scholarships, and state beginning farmer programs all include ag drone training in their eligible expense categories. Applications are competitive and program availability varies by state and year.',
      },
      {
        question: 'What is the difference between third-party training and state extension training?',
        answer:
          'Third-party trainers (Rantizo, Precision Aerial Solutions) focus on commercial business setup, FAA paperwork support, and operations manual templates. State extension courses (Purdue, Iowa State, University of Nebraska) focus on pesticide safety, IPM, and state regulatory compliance. Most operators end up taking both because they cover different certification tracks with minimal overlap.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'rental',
    name: 'Agricultural Drone Rental',
    description:
      'Short-term agricultural drone rentals for farmers, operators evaluating equipment, and peak-season capacity supplementation.',
    longDescription:
      'Agricultural drone rental serves three main customer segments: farmers wanting to try a drone before buying, operators needing extra capacity during peak spray windows, and researchers or consultants running short-term projects. Typical rental inventory includes DJI Agras T50, T40, and T25 class spray drones and Hylio AG-272 systems. Weekly rentals run $2,000 to $8,000 per drone depending on model, season, and included accessories (batteries, generator, trailer, mixing station). Daily rentals are less common but available at premium rates. Insurance is almost always required (hull plus liability), either through the rental company or a third-party policy like BWI Companies, AssuredPartners Aerospace, or Global Aerospace. Operator liability and pilot certification remain the customer responsibility, which is why rental is typically limited to already-certified commercial pilots. Seasonal rentals during peak wheat heading in June or corn fungicide in July book out 3 to 6 months ahead, and rental companies often give priority to repeat customers and operators with strong insurance records.',
    aeoBlock:
      'Agricultural drone rental runs $2,000 to $8,000 per week for a DJI Agras T50 or Hylio AG-272 class spray drone, plus required insurance (hull and liability typically $100 to $400 per week). Daily rentals are available at premium rates but weekly is standard. Rental customers must already hold Part 107 and Part 137 certification plus state pesticide applicator license; rental companies do not transfer operator credentials.',
    priceMinUsd: 2000,
    priceMaxUsd: 8000,
    priceUnit: 'per week',
    icon: '🚁',
    authorityLinks: [
      { label: 'FAA Part 137 Requirements for Agricultural UAS', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
      { label: 'AUVSI Insurance and Risk Management for UAS Operators', url: 'https://www.auvsi.org' },
      { label: 'USDA Farm Service Agency: Equipment Cost-Share Programs', url: 'https://www.fsa.usda.gov' },
    ],
    faqs: [
      {
        question: 'Can I rent a drone to spray my own crops without a Part 137?',
        answer:
          'No. Commercial aerial pesticide application requires Part 137 regardless of drone ownership. A farmer spraying only their own crops may qualify for a simplified private applicator path, but still must hold a Part 137 private certificate, FAA Part 107, and a state applicator license. Rental companies will ask for proof of these before releasing equipment.',
      },
      {
        question: 'Does rental insurance cover pesticide drift claims?',
        answer:
          'Rental hull insurance covers drone damage, not drift liability. Chemical and pollution liability must be added separately either by the rental company or by the operator directly through AssuredPartners Aerospace, BWI Companies, Global Aerospace, or similar specialist insurers. Typical chemical liability premiums are $600 to $2,000 per year for a single-drone commercial operator.',
      },
      {
        question: 'How far ahead should I book a seasonal rental?',
        answer:
          'For June wheat heading and July corn fungicide, book by March or April. For cover crop seeding in August through October, book by late June. Rental capacity is tight during peak application windows and weekly rates increase 20 to 30 percent as seasonal inventory fills.',
      },
      {
        question: 'What is included in a typical DJI T50 weekly rental?',
        answer:
          'Standard weekly rental packages include the drone body, 2 to 4 batteries, a generator-charger combo, transport case, and controller. Some rental companies add an all-in-one trailer with mixing station and water tank for an additional $500 to $1,500 per week. Chemicals, site-specific mapping, and application mission planning are the customer responsibility.',
      },
      {
        question: 'Is renting worth it if I am only going to spray 200 to 400 acres once?',
        answer:
          'For 200 to 400 acres once per season, custom hire at $12 to $22 per acre is almost always cheaper than a $3,000 to $5,000 weekly rental plus insurance, chemical, and your own labor. Rental typically makes sense above 800 to 1,500 acres per year of self-application or for operators adding capacity to an existing commercial business.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'sales',
    name: 'Agricultural Drone Sales',
    description:
      'New and used agricultural drone sales from authorized dealers of DJI Agras, Hylio, XAG, Guardian Agriculture, and Pyka across the US.',
    longDescription:
      'Agricultural drone sales in the US run through three primary channels: authorized DJI Agras dealers (HSE-UAV, Drone Nerds, AgriSpray Drones), US-manufactured Hylio direct and through resellers, and XAG, Guardian Agriculture, and Pyka through their own channel networks. 2026 post-tariff pricing on the DJI Agras T50 runs $22,000 to $28,000 for the full ready-to-fly kit including batteries, generator, and trailer setup, up from $18,000 pre-tariff. Hylio AG-272 runs $55,000 to $75,000 with NDAA compliance as the primary differentiator for operators working federal, state, or NDAA-restricted contracts. XAG P100 Pro sits at $22,000 to $28,000, Guardian Agriculture SC1 at $250,000 to $350,000 for its larger autonomous platform, and Pyka Pelican in the $300,000 to $500,000 range as a crewed-class alternative. Financing is available through manufacturer programs, farm credit associations, and USDA FSA Farm Loan programs with 2 to 7 year terms and 10 to 25 percent down. USDA EQIP Practice Code 595 (Precision Agriculture) in many states offers 40 to 90 percent cost-share on drone purchases for qualifying farmers.',
    aeoBlock:
      'DJI Agras T50 ready-to-fly kits sell for $22,000 to $28,000 post-tariff in 2026, Hylio AG-272 runs $55,000 to $75,000 with NDAA compliance, and XAG P100 Pro is $22,000 to $28,000. USDA EQIP Practice Code 595 (Precision Agriculture) offers 40 to 90 percent cost-share on qualifying drone purchases in most states. Financing is available through manufacturer programs, farm credit, and USDA FSA Farm Loans with 2 to 7 year terms.',
    priceMinUsd: 22000,
    priceMaxUsd: 75000,
    priceUnit: 'per drone',
    icon: '🛒',
    authorityLinks: [
      { label: 'DJI Agricultural Drone Authorized Dealers', url: 'https://www.dji.com/agriculture/dealers' },
      { label: 'USDA NRCS EQIP Practice Code 595: Precision Agriculture', url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives' },
      { label: 'US Department of Defense NDAA Compliance Drone List', url: 'https://www.diu.mil/solutions/blue-uas' },
    ],
    faqs: [
      {
        question: 'Should I buy DJI or Hylio for commercial ag spraying in 2026?',
        answer:
          'If you contract with federal or state agencies, want long-term NDAA protection, or want a US-manufactured platform, buy Hylio AG-272. If you want the lowest cost per gallon of tank capacity, the fastest dealer network for parts and service, and proven operator track records, buy DJI Agras T50. Most US commercial operators still run DJI, but NDAA pressure is shifting new purchases toward Hylio.',
      },
      {
        question: 'Does USDA cost-share apply to drone purchases?',
        answer:
          'Yes, under EQIP Practice Code 595 (Precision Agriculture) in most states. Payment rates vary from 40 to 90 percent of eligible cost. Beginning farmers, veteran farmers, and socially disadvantaged producers qualify for higher rates. Apply through your local NRCS field office during the state application window, which typically opens November through January for the following year.',
      },
      {
        question: 'How many acres do I need to farm for a drone to pay off?',
        answer:
          'University of Missouri Extension research puts break-even for DJI Agras T40 ownership at approximately 980 acres per year of custom application work, or 600 to 800 acres of own-farm use if you self-apply fungicide and cover crop seeding previously hired out. Below 500 acres per year of flight work, custom hire is typically cheaper.',
      },
      {
        question: 'Can I finance a spray drone purchase?',
        answer:
          'Yes. Manufacturer financing programs, farm credit associations, and USDA FSA Farm Loan programs all offer 2 to 7 year equipment loans for agricultural drones. Typical down payment is 10 to 25 percent, with rates currently running 6 to 9 percent depending on credit and loan program. USDA EQIP reimbursement cannot be assigned to a lender but can be used as the initial down payment.',
      },
      {
        question: 'What does NDAA compliance actually mean for buyers?',
        answer:
          'The National Defense Authorization Act restricts federal agencies and many state agencies from using drones with components from designated foreign manufacturers, which includes DJI and XAG. NDAA-compliant drones are sourced from approved manufacturers on the DoD Blue UAS list, currently including Hylio, Skydio, Parrot, and others. Commercial ag operators working only private farm contracts are not subject to NDAA, but operators doing USDA, state university, or federally funded work often are.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'consultancy',
    name: 'Ag Drone Business Consultancy',
    description:
      'Consulting services for new and expanding ag drone operators covering FAA Part 137 exemption paperwork, state licensing, insurance, operations manuals, and business setup.',
    longDescription:
      'Ag drone business consultancy is a niche but growing service category that helps new and expanding commercial operators work through the FAA Part 137 exemption process, state commercial pesticide applicator licensing, insurance procurement, operations manual drafting, and business structure setup. Primary consulting providers include Rantizo Advisory, Precision Aerial Solutions, Part 137 Experts, and independent consultants with FAA exemption experience. Typical engagements are billed either hourly ($100 to $300 per hour) or as flat-fee packages covering specific deliverables. The most common package is a complete FAA Part 137 exemption prep bundle at $2,500 to $4,500 that includes 44807 exemption petition drafting, operations manual templates, insurance referrals, state licensing guidance, and follow-through coaching until FAA approval comes through. More specialized engagements include custom pricing models for regional markets, operator expansion strategy (single drone to fleet), M&A due diligence for operator acquisitions, and regulatory defense if a state or FAA inquiry arises.',
    aeoBlock:
      'Ag drone business consultancy runs $100 to $300 per hour or $2,500 to $4,500 for a complete FAA Part 137 exemption prep package. Consultants help new operators through the 90 to 180 day FAA Part 137 approval process, state commercial applicator licensing, insurance procurement, and operations manual drafting. Specialist providers include Rantizo Advisory, Precision Aerial Solutions, and Part 137 Experts.',
    priceMinUsd: 100,
    priceMaxUsd: 4500,
    priceUnit: 'per hour or per package',
    icon: '📋',
    authorityLinks: [
      { label: 'FAA Part 137 Agricultural UAS Operations Guidance', url: 'https://www.faa.gov/uas/advanced_operations/dispensing_chemicals' },
      { label: 'SBA Small Business Development Center Locator', url: 'https://www.sba.gov/local-assistance/find' },
      { label: 'National Agricultural Aviation Association (NAAA)', url: 'https://www.agaviation.org' },
    ],
    faqs: [
      {
        question: 'Do I really need a consultant to get Part 137 certification?',
        answer:
          'Not strictly, but most new operators who try the FAA Part 137 exemption process alone experience 30 to 90 day delays from incomplete operations manuals or incorrect 44807 petition formatting. A consultant typically shortens the approval timeline by 60 to 120 days, which easily pays for itself in the first month of operation. DIY makes sense only if you have previous aviation certification experience.',
      },
      {
        question: 'What does a complete Part 137 consulting package include?',
        answer:
          'A typical $2,500 to $4,500 package includes the 44807 exemption petition drafting, Part 137 operations manual drafting, training records templates, maintenance log templates, insurance broker referrals, state commercial applicator licensing guidance for your state, and weekly coaching calls through FAA approval. Some packages also include first-customer contract templates and pricing model worksheets.',
      },
      {
        question: 'Can a consultant help with NDAA compliance strategy?',
        answer:
          'Yes, consultants with federal contracting background help operators decide between DJI (lowest cost, non-NDAA), Hylio (higher cost, NDAA-compliant), and mixed fleets. They also handle the federal contractor certification process if you plan to bid USDA, state, or federally funded work. This specialty consulting typically runs $150 to $300 per hour.',
      },
      {
        question: 'What is the timeline from deciding to become a commercial operator to first paying customer?',
        answer:
          'With consultant support: 6 to 9 months. FAA Part 107 study and exam takes 2 to 4 weeks. State commercial pesticide applicator exam and license takes 1 to 3 months depending on state. FAA Part 137 plus 44807 exemption takes 90 to 180 days. Insurance binder and operations manual finalization adds 2 to 4 weeks. Most new operators target their first customer in the second calendar year after they start the process.',
      },
      {
        question: 'Do consultants help with federal or state grant applications for drone purchases?',
        answer:
          'Yes, specifically for USDA EQIP Practice Code 595 (Precision Agriculture), USDA Beginning Farmer and Rancher Development Program (BFRDP), and state-level precision ag grants. Grant writing support is typically billed separately at $500 to $2,500 per application, with some consultants offering contingency pricing (percentage of awarded grant value) for larger applications.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
  {
    slug: 'emergency',
    name: 'Emergency Spray Services',
    description:
      'Rapid-response drone spraying for sudden pest outbreaks, disease epidemics, hurricane recovery, and other time-sensitive agricultural emergencies.',
    longDescription:
      'Emergency ag drone spray services handle time-sensitive pest outbreaks (fall armyworm invasions, late-season aphid blooms, rapid tar spot development), disease epidemics (sudden Fusarium head blight pressure, rapid-spread late blight), and disaster recovery (post-hurricane defoliation cleanup, flood-damaged crop replant window). Premium pricing applies: emergency rates typically run 20 to 50 percent above standard spraying rates due to short-notice logistics, weekend and night-window operations, and the ferry-time cost of relocating a drone fleet on short notice. Operator capacity is the main constraint: during a regional outbreak, local drone operators book to capacity within 24 to 48 hours, and emergency customers end up relying on operators driving from 100 to 300 miles away. State departments of agriculture maintain pest emergency contact lists in many states, and the USDA Animal and Plant Health Inspection Service (APHIS) sometimes coordinates rapid response spraying for declared quarantine pests. Emergency spraying requires the same Part 137 certification and state applicator license as standard work, with no regulatory shortcuts regardless of the urgency.',
    aeoBlock:
      'Emergency ag drone spraying runs $18 to $35 per acre, which is 20 to 50 percent above standard rates due to short-notice logistics and ferry-time costs. Common triggers include fall armyworm invasions, late-season aphid blooms, rapid tar spot pressure, and post-hurricane defoliation cleanup. During regional outbreaks, local operators book to capacity within 24 to 48 hours, and emergency customers often rely on operators driving 100 to 300 miles.',
    priceMinUsd: 18,
    priceMaxUsd: 35,
    priceUnit: 'per acre',
    icon: '🚨',
    authorityLinks: [
      { label: 'USDA APHIS Plant Pest and Disease Programs', url: 'https://www.aphis.usda.gov/plant-pests-diseases' },
      { label: 'National Plant Diagnostic Network (NPDN)', url: 'https://www.npdn.org' },
      { label: 'USDA Climate Hubs: Weather and Climate Resources', url: 'https://www.climatehubs.usda.gov' },
    ],
    faqs: [
      {
        question: 'How fast can an emergency drone sprayer be on my field?',
        answer:
          'If the operator is local and has open capacity, same day or next day. During regional outbreaks when local capacity is full, expect 3 to 7 day delays as operators from farther away reposition fleets. The fastest emergency responses are usually from operators who already have a prior contract or relationship with the customer.',
      },
      {
        question: 'Why do emergency rates run so much higher than standard?',
        answer:
          'Three reasons. Short-notice field remapping and mission planning add 2 to 4 hours of admin per job. Emergency ferry moves (driving drones 100 to 300 miles) cost operator fuel, lodging, and opportunity cost from canceled local jobs. Emergency windows often require weekend, night, or pre-dawn work that pays pilot premiums above standard day-rates.',
      },
      {
        question: 'What are the most common ag drone emergency calls?',
        answer:
          'Fall armyworm outbreaks in the Southeast and Mid-South, sudden soybean aphid pressure in Minnesota and the Dakotas, late-season tar spot runs in Indiana and Wisconsin, rapid-spread Fusarium head blight during wet wheat heading years, and post-hurricane cotton and soybean defoliation cleanup in the Delta and Southeast.',
      },
      {
        question: 'Does USDA APHIS ever cover emergency spraying costs?',
        answer:
          'For declared quarantine pests (boll weevil resurgence, fruit fly outbreaks, emerald ash borer spread into agricultural margins), APHIS sometimes coordinates and partially funds emergency spray response. For routine pest and disease pressure, even heavy pressure, the farmer bears the cost. State-level pest emergency programs occasionally provide cost-share for declared outbreaks in specialty crops.',
      },
      {
        question: 'Can I get on a drone operator standby list before an emergency hits?',
        answer:
          'Yes, and this is the single most effective way to ensure rapid response. Many operators maintain priority customer lists that include growers who pre-pay a seasonal retainer (typically $500 to $2,500) or sign standby agreements. Standby contracts guarantee a response window (often 48 hours) at predetermined rates, which is particularly valuable for vineyard and orchard growers during high-pressure disease years.',
      },
    ],
    lastReviewedAt: '2026-04-16',
  },
];

export const serviceBySlug: Record<string, ServiceDefinition> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return serviceBySlug[slug];
}
