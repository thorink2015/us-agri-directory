import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ROICalculator from './ROICalculator';

export const metadata: Metadata = {
  title: 'Ag Drone ROI Calculator: Buy vs. Hire Analysis 2026 | US Ag Drone Directory',
  description:
    'Should you buy an agricultural drone or hire an operator? Enter your acreage, crop, and drone model to get a break-even year and annual P&L estimate.',
  alternates: { canonical: '/tools/roi-calculator' },
  openGraph: {
    title: 'Ag Drone Buy vs. Hire ROI Calculator',
    description: 'Find your drone investment break-even point with real 2026 US market rates.',
    url: 'https://usagdronedirectory.com/tools/roi-calculator',
  },
};

export default function ROICalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/tools' },
        { label: 'ROI Calculator' },
      ]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Ag Drone ROI: Buy vs. Hire Calculator
        </h1>
        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            A farmer spraying 500 acres of corn twice per year will typically break even on a{' '}
            <strong>DJI Agras T50 ($20,000) in under 2 seasons</strong> when accounting for avoided hire costs at $15/acre.
            Adding just 200 commercial acres per year cuts that break-even to under 12 months.
            Operators who spray 1,500+ commercial acres per year net $40,000 to $60,000 annually per drone after all costs.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          Adjust the sliders to match your operation. All figures use 2026 US market rates.
          For binding quotes, contact operators in the{' '}
          <Link href="/operators" className="text-green-700 hover:underline">directory</Link>.
        </p>
      </header>

      <ROICalculator />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Ag Drone ROI Calculator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Calculate break-even and annual ROI for buying an agricultural drone versus hiring an operator. Uses 2026 US market rates.',
            url: 'https://usagdronedirectory.com/tools/roi-calculator',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@type': 'Organization', name: 'US Ag Drone Directory', url: 'https://usagdronedirectory.com' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://usagdronedirectory.com' },
              { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://usagdronedirectory.com/tools' },
              { '@type': 'ListItem', position: 3, name: 'ROI Calculator', item: 'https://usagdronedirectory.com/tools/roi-calculator' },
            ],
          }),
        }}
      />

      <section className="mt-10 space-y-6 text-sm text-gray-700">
        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">How the calculation works</h2>
          <p>
            The calculator compares two annual cash flows: (1) what you currently pay operators to spray your fields, plus any revenue you could earn spraying for neighbors, minus (2) the full annual cost of owning and operating a spray drone.
          </p>
          <p className="mt-2">
            Ownership costs include a 3-year loan at 7% APR, estimated battery wear and maintenance (~$0.50/acre), commercial liability and hull insurance (~$1,200/year), and annual certification costs (FAA Part 107 renewal, Part 137, state pesticide license).
          </p>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">When buying makes sense</h2>
          <ul className="space-y-1 list-disc list-inside text-gray-600">
            <li>You spray 400+ acres of your own crops two or more times per year</li>
            <li>You can reliably pick up 200+ commercial acres from neighboring farms</li>
            <li>You have a trusted employee who can be trained and certified as a remote pilot</li>
            <li>Your crop mix includes high-value crops (vineyards, orchards) with 5+ applications per year</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">When hiring makes sense</h2>
          <ul className="space-y-1 list-disc list-inside text-gray-600">
            <li>You spray fewer than 300 acres once or twice per year</li>
            <li>You have no interest in managing equipment and certifications</li>
            <li>Your operation needs specialized equipment (multi-drone swarms, specific nozzle configs) that a service provider already owns</li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h2 className="font-bold text-gray-900 text-base mb-2">USDA EQIP financing note</h2>
          <p className="text-gray-600">
            USDA EQIP Practice Code 595 (Precision Land Management) can cover 40 to 90% of drone purchase cost for eligible farmers.
            Funded operators report effective purchase costs as low as $4,000 to $8,000 for a T50-class drone, dramatically improving ROI.
            See <Link href="/guides/fonduri-afir-drone" className="text-green-700 hover:underline">USDA EQIP funding guide</Link> for eligibility and application steps.
          </p>
        </div>
      </section>
    </div>
  );
}
