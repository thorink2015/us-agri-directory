import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PriceCalculator from './PriceCalculator';

export const metadata: Metadata = {
  title: 'Drone Spray Cost Calculator 2026 | US Ag Drone Directory',
  description:
    'Free calculator to estimate total drone spraying costs for your US farm. Enter your acreage, crop type, and number of applications for an instant estimate.',
  alternates: { canonical: '/tools/spray-cost-calculator' },
};

export default function PriceCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Spray Cost Calculator' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Drone Spray Cost Calculator
        </h1>
        <p className="text-gray-600">
          Estimate the total cost of drone spraying for your operation. Prices are based on 2026
          US market averages across major agricultural regions.
        </p>
      </header>

      <PriceCalculator />

      <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">How to use this calculator</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Select the crop you want to treat</li>
          <li>Enter your total acreage</li>
          <li>Select the number of planned applications for the season</li>
          <li>Get your total cost estimate and compare with ground rig alternatives</li>
        </ol>
        <p className="mt-4 text-xs text-gray-500">
          * Prices are estimates and may vary by operator, region, and field conditions.
          For an actual quote, contact{' '}
          <a href="/operators" className="text-green-700 underline">operators in your state</a> directly.
        </p>
      </section>
    </div>
  );
}
