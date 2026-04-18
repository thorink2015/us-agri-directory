import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

const LAST_REVIEWED = '2026-04-16';

const FAQS = [
  {
    question: 'How far ahead should I book a drone operator before my spray window?',
    answer:
      'Book 4 to 6 weeks ahead for corn and soybeans. Book in April for June wheat heading. Book by late July for September cover crop seeding. Book full-season vineyard and orchard contracts in January or February.',
  },
  {
    question: 'What happens if I miss the optimal spray window?',
    answer:
      'Yield response drops significantly. Corn fungicide applied after R2 shows diminishing returns. Wheat fungicide after full bloom reduces both DON control and yield. Late cover crop seeding produces thinner stands. Timing matters more than product choice for most applications.',
  },
  {
    question: 'Does this calendar account for my specific planting date?',
    answer:
      'No. This shows typical windows based on state latitude averages. Your actual spray window depends on your planting date, variety maturity rating, and growing degree day accumulation. Adjust by 5 to 10 days for early or late planting.',
  },
  {
    question: 'Can I use this calendar for organic treatments?',
    answer:
      'Yes. The growth stage timing is the same regardless of product type. Organic sulfur, copper, and biological products follow the same application windows as conventional fungicides and insecticides. The calendar shows when to spray, not what to spray.',
  },
];

interface Treatment {
  month: string;
  monthNumber: number;
  crops: { crop: string; treatment: string; urgency: 'low' | 'medium' | 'high'; bookBy?: string }[];
}

const CALENDAR: Treatment[] = [
  {
    month: 'January', monthNumber: 1,
    crops: [
      { crop: 'Orchards', treatment: 'Dormant copper spray for fungal canker and fire blight prevention', urgency: 'low', bookBy: 'December 1' },
      { crop: 'Vineyards (CA)', treatment: 'Book full-season vineyard spray contracts now', urgency: 'medium', bookBy: 'January 15' },
    ],
  },
  {
    month: 'February', monthNumber: 2,
    crops: [
      { crop: 'Vineyards', treatment: 'Dormant pruning + sulfur application for powdery mildew', urgency: 'low', bookBy: 'January 15' },
      { crop: 'Orchards', treatment: 'Pre-bloom copper spray for fire blight and leaf curl', urgency: 'medium', bookBy: 'January 15' },
    ],
  },
  {
    month: 'March', monthNumber: 3,
    crops: [
      { crop: 'Winter Wheat', treatment: 'Spring herbicide + preventive fungicide (T1 timing)', urgency: 'high', bookBy: 'February 1' },
      { crop: 'Orchards', treatment: 'Pink stage fungicide for scab and powdery mildew', urgency: 'medium', bookBy: 'February 1' },
      { crop: 'Vineyards', treatment: 'Early season copper + sulfur application', urgency: 'medium', bookBy: 'February 1' },
    ],
  },
  {
    month: 'April', monthNumber: 4,
    crops: [
      { crop: 'Vineyards', treatment: 'First powdery and downy mildew fungicide', urgency: 'high', bookBy: 'March 1' },
      { crop: 'Winter Wheat', treatment: 'T2 fungicide at flag leaf, scab and stripe rust', urgency: 'high', bookBy: 'March 1' },
      { crop: 'Corn', treatment: 'Pre-emerge herbicide application', urgency: 'high', bookBy: 'March 1' },
      { crop: 'Orchards', treatment: 'Codling moth and scab fungicide program begins', urgency: 'medium', bookBy: 'March 1' },
    ],
  },
  {
    month: 'May', monthNumber: 5,
    crops: [
      { crop: 'Vineyards', treatment: 'Downy mildew and powdery mildew 2-week spray program', urgency: 'high', bookBy: 'April 1' },
      { crop: 'Winter Wheat', treatment: 'T3 fungicide at heading, Fusarium head blight. Book by April.', urgency: 'high', bookBy: 'April 1' },
      { crop: 'Rice', treatment: 'Pre-emerge herbicide for barnyardgrass control', urgency: 'high', bookBy: 'April 1' },
      { crop: 'Soybeans', treatment: 'Pre-emerge herbicide if planting this month', urgency: 'medium', bookBy: 'April 1' },
    ],
  },
  {
    month: 'June', monthNumber: 6,
    crops: [
      { crop: 'Vineyards', treatment: 'Continue mildew fungicide program (every 10 to 14 days)', urgency: 'high', bookBy: 'May 1' },
      { crop: 'Corn', treatment: 'Post-emerge herbicide + early insecticide for rootworm', urgency: 'high', bookBy: 'May 1' },
      { crop: 'Orchards', treatment: 'Codling moth and brown rot fungicide', urgency: 'high', bookBy: 'May 1' },
      { crop: 'Cotton', treatment: 'Early season herbicide + plant bug insecticide', urgency: 'medium', bookBy: 'May 1' },
    ],
  },
  {
    month: 'July', monthNumber: 7,
    crops: [
      { crop: 'Corn', treatment: 'VT/R1 fungicide, Tar Spot, Gray Leaf Spot, Southern Rust', urgency: 'high', bookBy: 'June 1' },
      { crop: 'Soybeans', treatment: 'R3 fungicide, White Mold and Frogeye Leaf Spot', urgency: 'high', bookBy: 'June 1' },
      { crop: 'Rice', treatment: 'Blast and sheath blight fungicide', urgency: 'high', bookBy: 'June 1' },
      { crop: 'Vineyards', treatment: 'Final preventive fungicide applications', urgency: 'medium', bookBy: 'June 1' },
    ],
  },
  {
    month: 'August', monthNumber: 8,
    crops: [
      { crop: 'Soybeans', treatment: 'R5 fungicide if disease pressure warrants; aphid insecticide', urgency: 'medium', bookBy: 'July 1' },
      { crop: 'Cover Crops', treatment: 'Drone seeding into standing corn and soybeans', urgency: 'high', bookBy: 'July 15' },
      { crop: 'Cotton', treatment: 'Bollworm and plant bug insecticide', urgency: 'high', bookBy: 'July 15' },
      { crop: 'Orchards', treatment: 'Pre-harvest fungicide (observe pre-harvest intervals)', urgency: 'medium', bookBy: 'July 15' },
    ],
  },
  {
    month: 'September', monthNumber: 9,
    crops: [
      { crop: 'Cover Crops', treatment: 'Continue drone seeding as corn and soybeans mature', urgency: 'high', bookBy: 'August 1' },
      { crop: 'Cotton', treatment: 'Defoliant and boll opener application', urgency: 'high', bookBy: 'August 1' },
      { crop: 'Winter Wheat', treatment: 'Seedbed prep and planting begins in northern states', urgency: 'high', bookBy: 'August 1' },
      { crop: 'Vineyards', treatment: 'Harvest timing + Botrytis spray if pressure warrants', urgency: 'low' },
    ],
  },
  {
    month: 'October', monthNumber: 10,
    crops: [
      { crop: 'Winter Wheat', treatment: 'Post-emerge herbicide after establishment', urgency: 'medium', bookBy: 'September 1' },
      { crop: 'Cover Crops', treatment: 'Final seeding window before frost, Great Plains', urgency: 'high', bookBy: 'September 1' },
      { crop: 'Orchards', treatment: 'Post-harvest copper spray for disease prevention', urgency: 'medium', bookBy: 'September 1' },
    ],
  },
  {
    month: 'November', monthNumber: 11,
    crops: [
      { crop: 'Orchards', treatment: 'Dormant copper spray after leaf drop', urgency: 'medium', bookBy: 'October 1' },
    ],
  },
  {
    month: 'December', monthNumber: 12,
    crops: [
      { crop: 'Planning', treatment: 'Plan next season applications, sign annual service contracts, inspect equipment', urgency: 'low' },
    ],
  },
];

const URGENCY_STYLE: Record<string, string> = {
  high: 'bg-red-50 border-red-200 text-red-900',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  low: 'bg-blue-50 border-blue-200 text-blue-900',
};

const URGENCY_LABEL: Record<string, string> = {
  high: '● High priority',
  medium: '◐ Medium',
  low: '○ Low / planning',
};

export const metadata: Metadata = {
  title: 'Drone Spray Treatment Calendar: When to Book',
  description:
    'See exactly when to book drone spraying for your crop in your state. Monthly treatment windows for corn, soybeans, wheat, cotton, rice, grapes, and orchards.',
  alternates: { canonical: '/tools/treatment-calendar' },
  openGraph: {
    title: 'When Should You Book Drone Spraying? Treatment Calendar',
    description: 'Monthly drone application windows by crop with booking deadlines. Corn VT/R1 peaks mid-to-late July. Book 4 to 6 weeks ahead.',
    url: `${SITE.domain}/tools/treatment-calendar`,
  },
};

export default function TreatmentCalendarPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Drone Spray Treatment Calendar',
    applicationCategory: 'Agriculture',
    operatingSystem: 'Web',
    description:
      'Monthly guide to optimal drone application timing for corn, soybeans, wheat, cotton, rice, vineyards, and orchards across US growing regions, with booking deadline recommendations.',
    url: `${SITE.domain}/tools/treatment-calendar`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'When Should You Book Drone Spraying? Crop Treatment Calendar 2026',
    description:
      'Corn fungicide timing peaks at VT/R1 in mid-to-late July. Wheat heading sprays hit in late May through late June. Cover crop seeding runs late August through mid-October. Monthly windows by crop with booking deadlines.',
    url: `${SITE.domain}/tools/treatment-calendar`,
    mainEntityOfPage: `${SITE.domain}/tools/treatment-calendar`,
    datePublished: '2026-01-01',
    dateModified: LAST_REVIEWED,
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
    image: `${SITE.domain}/images/og-default.jpg`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE.domain}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Treatment Calendar', item: `${SITE.domain}/tools/treatment-calendar` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Treatment Calendar' }]} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          When Should You Book Drone Spraying? Treatment Calendar
        </h1>

        <Byline lastUpdated={LAST_REVIEWED} />

        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Corn fungicide timing peaks at VT/R1 in mid-to-late July. Wheat heading sprays hit in late May through late June depending on latitude. Cover crop seeding runs late August through mid-October. This calendar shows optimal drone application windows by crop with booking deadline recommendations so you know exactly when to contact your operator.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6 text-xs">
          {(['high', 'medium', 'low'] as const).map((u) => (
            <div key={u} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${URGENCY_STYLE[u]}`}>
              {URGENCY_LABEL[u]}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {CALENDAR.map((month) => (
            <section key={month.monthNumber} className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {month.monthNumber}
                </span>
                {month.month}
              </h2>
              <div className="space-y-2">
                {month.crops.map((c, i) => (
                  <div key={i} className={`border rounded-lg p-3 text-sm ${URGENCY_STYLE[c.urgency]}`}>
                    <div className="font-semibold">{c.crop}</div>
                    <div className="text-xs mt-0.5 opacity-90">{c.treatment}</div>
                    {c.bookBy && (
                      <div className="text-xs mt-1 font-medium opacity-75">
                        Book by: {c.bookBy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* How this works */}
        <section className="mb-10 space-y-3">
          <h2 className="text-xl font-bold text-gray-900">How this works</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Treatment windows are based on crop growth stage, not fixed calendar dates. Actual timing varies by variety, planting date, latitude, and weather. Southern states hit each growth stage 2 to 4 weeks earlier than northern states. Corn VT/R1 typically arrives 10 to 14 days earlier in Georgia and Alabama than in Minnesota. The booking deadlines shown assume a 4 to 6 week lead time, which aligns with operator scheduling patterns in peak season (June through September).
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Dates shown are typical ranges based on university extension trial data from Iowa State, Purdue, Kansas State, University of Arkansas, and UC Davis. Always confirm timing with your agronomist or extension agent, especially in years with unusual planting delays or weather patterns.
          </p>
        </section>

        {/* Crop links */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Crop-specific spraying guides</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/crops/corn', name: 'Corn' },
              { href: '/crops/soybeans', name: 'Soybeans' },
              { href: '/crops/wheat', name: 'Wheat' },
              { href: '/crops/cotton', name: 'Cotton' },
              { href: '/crops/rice', name: 'Rice' },
              { href: '/crops/grapes', name: 'Grapes' },
              { href: '/crops/orchards', name: 'Orchards' },
              { href: '/crops/cover-crops', name: 'Cover Crops' },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-green-700 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Treatment timing questions answered</h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        {/* CTA */}
        <div className="mb-10 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">Ready to book your applications?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Find verified drone operators available in your state for this season.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/operators"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
            >
              Find an Operator
            </Link>
            <Link
              href="/states"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors text-sm"
            >
              Operators by State
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/spray-cost-calculator', label: 'Spray Cost Calculator', desc: 'Per-acre cost by crop and state' },
              { href: '/tools/coverage-calculator', label: 'Coverage Time Estimator', desc: 'How long to spray your acres?' },
              { href: '/tools/roi-calculator', label: 'Buy vs. Hire ROI Calculator', desc: 'Find your break-even acreage' },
              { href: '/tools/drone-comparison', label: 'Drone Comparison Tool', desc: 'T50 vs AG-272 vs T100 specs' },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-900">{t.label}</span>
                <span className="text-xs text-gray-500 mt-0.5">{t.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/pricing" className="text-green-700 hover:underline">2026 pricing guide</Link>
          <Link href="/services/spraying" className="text-green-700 hover:underline">Drone spraying services</Link>
          <Link href="/states" className="text-green-700 hover:underline">Find operators by state</Link>
          <Link href="/list-your-business" className="text-green-700 hover:underline">List your business</Link>
        </div>

        <AuthorCard />
      </div>
    </>
  );
}
