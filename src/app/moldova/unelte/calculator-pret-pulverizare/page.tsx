import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MdlPriceCalculator from './MdlPriceCalculator';

export const metadata: Metadata = {
  title: 'Calculator preț pulverizare dronă Moldova 2026 | MDL/ha',
  description:
    'Calculează gratuit costul total al pulverizării cu drona agricolă în Moldova (MDL). Introdu hectarele, cultura și numărul de tratamente pentru estimare instantanee.',
  alternates: { canonical: '/moldova/unelte/calculator-pret-pulverizare' },
};

export default function MdlPriceCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Unelte', href: '/moldova/unelte' },
          { label: 'Calculator preț' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculator preț pulverizare cu drona (MDL)
        </h1>
        <p className="text-gray-600">
          Estimează costul total al pulverizării cu drona agricolă pentru ferma ta în Moldova.
          Prețurile sunt în lei moldovenești (MDL) și reflectă tarifele de piață din 2026.
        </p>
      </header>

      <MdlPriceCalculator />

      <section className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="font-bold text-gray-900 mb-3">Cum folosești calculatorul?</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Selectează cultura pe care vrei să o tratezi</li>
          <li>Setează suprafața totală în hectare</li>
          <li>Alege numărul de tratamente planificate pe sezon</li>
          <li>Compară costul dronei față de metodele tradiționale</li>
        </ol>
        <p className="mt-4 text-xs text-gray-500">
          * Prețurile sunt orientative (170–250 MDL/ha). Pentru ofertă exactă, contactează{' '}
          <Link href="/moldova/operatori" className="text-blue-700 underline">
            operatorii verificați din Moldova
          </Link>
          .
        </p>
      </section>

      <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-bold text-gray-900 mb-3">Subvenție AIPA 50%</h2>
        <p className="text-sm text-gray-600 mb-3">
          Dacă vrei să cumperi propria dronă agricolă, AIPA oferă subvenție de{' '}
          <strong>50% din costul achiziției</strong>, plafon 200.000 MDL (~€10.000).
        </p>
        <Link
          href="/moldova/ghid/subventii-moldova-aipa"
          className="inline-flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline"
        >
          Citește ghidul complet AIPA →
        </Link>
      </section>
    </div>
  );
}
