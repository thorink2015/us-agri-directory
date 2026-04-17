export interface FAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: FAQ[] = [
  {
    question: 'How much does drone spraying cost per acre?',
    answer:
      'Most operators charge $12 to $18 per acre for application only, with the farmer supplying the chemical product. Rates vary by region, field size, terrain, and product type. Small or irregularly shaped fields typically cost more per acre than large, open tracts. Cover crop seeding runs in a similar range. These rates have dropped from $22 to $25 per acre just two years ago as more operators have entered the market.',
  },
  {
    question: 'How many acres can a drone spray per hour?',
    answer:
      'A single commercial spray drone covers 20 to 50 acres per hour depending on the application rate, field layout, and drone model. Most operators using a DJI Agras T50 or Hylio AG-272 average 30 to 40 acres per hour in real-world conditions. Multiple-drone fleets increase throughput significantly.',
  },
  {
    question: 'Should I buy a spray drone or hire a custom operator?',
    answer:
      'University of Missouri Extension research shows the break-even between owning a DJI Agras T40 and hiring custom application is approximately 980 acres per year. For fewer than 1,000 acres, hiring custom application is typically more economical. For larger operations or those who offer services to neighboring farms, ownership can pay off within two to three seasons.',
  },
  {
    question: 'Is drone spraying as effective as a ground rig?',
    answer:
      'University research confirms it. Beck\'s Hybrids trials in Iowa and Nebraska showed drone-applied fungicide at 2 to 3 gallons per acre produced yields equal to ground rig applications at 15 to 20 gallons per acre. Purdue University found similar results for soybean fungicide. The lower carrier volume works because rotor downwash pushes droplets into the canopy.',
  },
  {
    question: 'What is the difference between drone spraying and crop dusting?',
    answer:
      'Drones fly 8 to 15 feet above the canopy, while crop dusters fly at 50 to 100 feet or higher. Drones produce less drift, can spray at night, handle small and irregular fields, and do not require a runway. Crop dusters cover more acres per hour and carry larger payloads, making them better for very large open fields. Drone spraying costs $12 to $18 per acre compared to around $12 per acre for airplane application.',
  },
  {
    question: 'What factors affect the per-acre price of drone spraying?',
    answer:
      'Key factors include field size (larger fields get lower per-acre rates), terrain (irregular or hilly fields cost more), product type (viscous or corrosive products may add a surcharge), distance from the operator\'s base, and season timing. Fields over 200 acres can often negotiate rates toward $12 per acre, while small fields under 40 acres typically run toward $18 per acre.',
  },
];

export const legalFAQs: FAQ[] = [
  {
    question: 'Is drone spraying legal in my state?',
    answer:
      'Yes, agricultural drone spraying is legal in all 50 states. Operators must hold an FAA Part 107 Remote Pilot Certificate and an FAA Part 137 Agricultural Aircraft Operator Certificate. Most states also require a state pesticide applicator license with an aerial category. Requirements vary by state, check your state\'s page on this directory for specifics.',
  },
  {
    question: 'What certifications does a drone spray operator need?',
    answer:
      'Every operator must hold: (1) FAA Part 107 Remote Pilot Certificate, passes the Unmanned Aircraft General knowledge exam and renews every 24 months; (2) FAA Part 137 Agricultural Aircraft Operator Certificate, authorizes dispensing chemicals from a drone; (3) a state pesticide applicator license with an aerial endorsement; (4) active liability insurance. For drones over 55 pounds loaded, a Section 44807 exemption is also required.',
  },
  {
    question: 'How much does it cost to get FAA certified for drone spraying?',
    answer:
      'The FAA Part 107 knowledge test costs $175 at approved testing centers. Part 137 applications are free. State pesticide applicator licenses cost $50 to $200 depending on state. Liability insurance runs $3,000 to $6,000 per drone per year. Pilot training programs that cover all requirements cost $500 to $3,500.',
  },
];

export const generalFAQs: FAQ[] = [
  {
    question: 'How do I find a drone spray operator near my farm?',
    answer:
      'Use the state search filter in our directory to find all operators covering your area. Many operators serve multiple states and will travel to your farm. You can contact operators directly through their profile page with no fees or intermediaries.',
  },
  {
    question: 'How far in advance should I book a drone applicator?',
    answer:
      'During peak season (July and August for corn fungicide, September and October for cotton defoliation), operators book up fast. Contact operators at least two to four weeks before your anticipated spray window. For cover crop seeding in the fall, start reaching out in July or August. Off-peak applications can usually be scheduled within a few days.',
  },
  {
    question: 'Can drones spray when my fields are too wet for equipment?',
    answer:
      'This is the number one reason farmers hire drone applicators. Drones fly above the field and never touch the ground, so soil conditions do not matter. If your ground rig would leave ruts or your tractor would get stuck, a drone can still get the job done. Many operators report that wet-field calls make up the majority of their peak-season bookings.',
  },
  {
    question: 'How do I list my drone business in this directory?',
    answer:
      'Creating a listing is completely free. Click "List Your Business" on any page to fill out your profile: service area, equipment, certifications, and rates. Our team reviews the information and publishes your profile within 48 hours.',
  },
];
