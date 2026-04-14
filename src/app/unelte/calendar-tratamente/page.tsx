import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Crop Treatment Calendar 2026: When to Spray? | US Ag Drone Directory',
  description:
    'Monthly guide to recommended drone application timing for corn, soybeans, wheat, cotton, rice, vineyards, and orchards across US growing regions.',
  alternates: { canonical: '/unelte/calendar-tratamente' },
};

interface Treatment {
  month: string;
  monthNumber: number;
  crops: { crop: string; treatment: string; urgency: 'low' | 'medium' | 'high' }[];
}

const CALENDAR: Treatment[] = [
  {
    month: 'January', monthNumber: 1,
    crops: [
      { crop: 'Orchards', treatment: 'Dormant copper spray for fungal canker and fire blight prevention', urgency: 'low' },
    ],
  },
  {
    month: 'February', monthNumber: 2,
    crops: [
      { crop: 'Vineyards', treatment: 'Dormant pruning + sulfur application for powdery mildew', urgency: 'low' },
      { crop: 'Orchards', treatment: 'Pre-bloom copper spray for fire blight and leaf curl', urgency: 'medium' },
    ],
  },
  {
    month: 'March', monthNumber: 3,
    crops: [
      { crop: 'Winter Wheat', treatment: 'Spring herbicide + preventive fungicide (T1 timing)', urgency: 'high' },
      { crop: 'Orchards', treatment: 'Pink stage fungicide for scab and powdery mildew', urgency: 'medium' },
      { crop: 'Vineyards', treatment: 'Early season copper + sulfur application', urgency: 'medium' },
    ],
  },
  {
    month: 'April', monthNumber: 4,
    crops: [
      { crop: 'Vineyards', treatment: 'First powdery and downy mildew fungicide', urgency: 'high' },
      { crop: 'Winter Wheat', treatment: 'T2 fungicide at flag leaf — scab and stripe rust', urgency: 'high' },
      { crop: 'Corn', treatment: 'Pre-emerge herbicide application', urgency: 'high' },
      { crop: 'Orchards', treatment: 'Codling moth and scab fungicide program begins', urgency: 'medium' },
    ],
  },
  {
    month: 'May', monthNumber: 5,
    crops: [
      { crop: 'Vineyards', treatment: 'Downy mildew and powdery mildew 2-week spray program', urgency: 'high' },
      { crop: 'Winter Wheat', treatment: 'T3 fungicide at heading — Fusarium head blight', urgency: 'high' },
      { crop: 'Rice', treatment: 'Pre-emerge herbicide for barnyardgrass control', urgency: 'high' },
      { crop: 'Soybeans', treatment: 'Pre-emerge herbicide if planting this month', urgency: 'medium' },
    ],
  },
  {
    month: 'June', monthNumber: 6,
    crops: [
      { crop: 'Vineyards', treatment: 'Continue mildew fungicide program (every 10–14 days)', urgency: 'high' },
      { crop: 'Corn', treatment: 'Post-emerge herbicide + early insecticide for rootworm', urgency: 'high' },
      { crop: 'Orchards', treatment: 'Codling moth and brown rot fungicide', urgency: 'high' },
      { crop: 'Cotton', treatment: 'Early season herbicide + plant bug insecticide', urgency: 'medium' },
    ],
  },
  {
    month: 'July', monthNumber: 7,
    crops: [
      { crop: 'Corn', treatment: 'VT/R1 fungicide — Tar Spot, Gray Leaf Spot, Southern Rust', urgency: 'high' },
      { crop: 'Soybeans', treatment: 'R3 fungicide — White Mold and Frogeye Leaf Spot', urgency: 'high' },
      { crop: 'Rice', treatment: 'Blast and sheath blight fungicide', urgency: 'high' },
      { crop: 'Vineyards', treatment: 'Final preventive fungicide applications', urgency: 'medium' },
    ],
  },
  {
    month: 'August', monthNumber: 8,
    crops: [
      { crop: 'Soybeans', treatment: 'R5 fungicide if pressure warrants; aphid insecticide', urgency: 'medium' },
      { crop: 'Cover Crops', treatment: 'Drone seeding into standing corn and soybeans', urgency: 'high' },
      { crop: 'Cotton', treatment: 'Bollworm and plant bug insecticide', urgency: 'high' },
      { crop: 'Orchards', treatment: 'Pre-harvest fungicide (observe pre-harvest intervals)', urgency: 'medium' },
    ],
  },
  {
    month: 'September', monthNumber: 9,
    crops: [
      { crop: 'Cover Crops', treatment: 'Continue drone seeding as corn and soybeans mature', urgency: 'high' },
      { crop: 'Cotton', treatment: 'Defoliant and boll opener application', urgency: 'high' },
      { crop: 'Winter Wheat', treatment: 'Seedbed prep and planting begins in northern states', urgency: 'high' },
      { crop: 'Vineyards', treatment: 'Harvest timing + Botrytis spray if pressure warrants', urgency: 'low' },
    ],
  },
  {
    month: 'October', monthNumber: 10,
    crops: [
      { crop: 'Winter Wheat', treatment: 'Post-emerge herbicide after establishment', urgency: 'medium' },
      { crop: 'Cover Crops', treatment: 'Final seeding window before frost — Great Plains', urgency: 'high' },
      { crop: 'Orchards', treatment: 'Post-harvest copper spray for disease prevention', urgency: 'medium' },
    ],
  },
  {
    month: 'November', monthNumber: 11,
    crops: [
      { crop: 'Orchards', treatment: 'Dormant copper spray after leaf drop', urgency: 'medium' },
    ],
  },
  {
    month: 'December', monthNumber: 12,
    crops: [{ crop: '—', treatment: 'Plan next season applications + equipment maintenance and inspection', urgency: 'low' }],
  },
];

const URGENCY_STYLE: Record<string, string> = {
  high: 'bg-red-50 border-red-200 text-red-900',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  low: 'bg-blue-50 border-blue-200 text-blue-900',
};

export default function TreatmentCalendarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/unelte' },
        { label: 'Treatment Calendar' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Crop Treatment Calendar 2026
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Monthly guide to recommended drone application timing for major US crops. Exact timing
          will vary by region, variety, and weather conditions — always scout fields and consult
          your agronomist before application.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CALENDAR.map((month) => (
          <section key={month.monthNumber} className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {month.monthNumber}
              </span>
              {month.month}
            </h2>
            <div className="space-y-2">
              {month.crops.map((c, i) => (
                <div key={i} className={`border rounded-lg p-3 text-sm ${URGENCY_STYLE[c.urgency]}`}>
                  <div className="font-semibold">{c.crop}</div>
                  <div className="text-xs mt-0.5 opacity-90">{c.treatment}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Ready to schedule your applications?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Find verified drone operators available in your state for this season.
        </p>
        <a
          href="/operatori"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          Find an Operator →
        </a>
      </div>
    </div>
  );
}
