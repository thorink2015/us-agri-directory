import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CoverageCalculator from './CoverageCalculator';

export const metadata: Metadata = {
  title: 'Drone Coverage Time Calculator: How Long to Spray X Acres? | US Ag Drone Directory',
  description:
    'Estimate how long it will take to spray your fields by drone. Enter acreage, drone model, application rate, and number of drones for an accurate job-duration estimate.',
  alternates: { canonical: '/tools/coverage-calculator' },
  openGraph: {
    title: 'Ag Drone Coverage Time Calculator',
    description: 'How long does it take to spray 500 acres by drone? Get a time estimate with real drone performance data.',
    url: 'https://usagdronedirectory.com/tools/coverage-calculator',
  },
};

export default function CoverageCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Coverage Time Calculator' },
      ]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Coverage Time Calculator
        </h1>
        {/* AEO block */}
        <div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            A single <strong>DJI Agras T50 covers 300 acres in approximately 8 to 10 hours</strong> of total job time (flying, refills, battery swaps, setup)
            at 2 gallons per acre. A two-drone team cuts that to 5 hours. At 5 gal/acre for dense canopy crops, the same 300 acres requires
            roughly 20 tank refills and extends job time by 2 to 3 hours.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          Adjust the sliders for your exact job. Times include setup, tank refills, and battery swaps but not drive time to the field.
          For multi-day quotes, contact operators in the{' '}
          <Link href="/operators" className="text-green-700 hover:underline">directory</Link>.
        </p>
      </header>

      <CoverageCalculator />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Ag Drone Coverage Time Calculator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Estimate drone spray job duration by acreage, drone model, application rate, field shape, and fleet size.',
            url: 'https://usagdronedirectory.com/tools/coverage-calculator',
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
              { '@type': 'ListItem', position: 3, name: 'Coverage Time Calculator', item: 'https://usagdronedirectory.com/tools/coverage-calculator' },
            ],
          }),
        }}
      />

      <section className="mt-10 space-y-5 text-sm text-gray-700">
        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">Performance assumptions</h2>
          <p>
            Coverage rates are based on manufacturer specs adjusted for real-world efficiency: field-shape turn penalties of 5% (rectangular), 12% (irregular), and 20% (narrow strips).
            Battery times and refill windows are typical for experienced operators with a two-person ground crew.
            Solo operators add 15 to 25% to total job time.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">Wind and temperature effects</h2>
          <p>
            Conditions not in the calculator also affect job time. Winds above 10 mph require slower speeds and tighter spray parameters, reducing effective coverage by 15 to 30%.
            High temperatures (above 90°F) reduce battery life by 10 to 20%. Early morning starts (5:30 to 7:00 AM) improve both battery performance and spray efficacy.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base mb-2">Drone comparison</h2>
          <p>
            For a detailed side-by-side of drone specifications, see the{' '}
            <Link href="/tools/drone-comparison" className="text-green-700 hover:underline">Drone Comparison Tool</Link>.
            For per-acre cost estimates, use the{' '}
            <Link href="/tools/spray-cost-calculator" className="text-green-700 hover:underline">Spray Cost Calculator</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
