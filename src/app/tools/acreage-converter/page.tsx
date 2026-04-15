import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import HectareCalculator from './HectareCalculator';

export const metadata: Metadata = {
  title: 'Acreage Converter — Acres, Hectares, Square Feet & More | US Ag Drone Directory',
  description:
    'Free online acreage converter. Instantly convert between acres, hectares, square feet, and square miles. Useful for farmers planning drone spray applications.',
  alternates: { canonical: '/tools/acreage-converter' },
};

export default function HectareCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Acreage Converter' },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Acreage Converter
        </h1>
        <p className="text-gray-600">
          Quickly convert between acres, hectares, square feet, and square miles.
          Enter any value to see all equivalents instantly.
        </p>
      </header>

      <HectareCalculator />

      <section className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-3">Common Equivalents</h2>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>1 acre = 43,560 sq ft</li>
          <li>1 acre = 0.4047 hectares</li>
          <li>1 acre = 4,047 m²</li>
          <li>1 hectare = 2.471 acres</li>
          <li>1 square mile = 640 acres</li>
        </ul>
      </section>
    </div>
  );
}
