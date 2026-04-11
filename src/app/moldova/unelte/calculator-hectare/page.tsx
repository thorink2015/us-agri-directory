import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import HectareCalculator from '@/app/unelte/calculator-hectare/HectareCalculator';

export const metadata: Metadata = {
  title: 'Calculator suprafață hectare Moldova | Conversie ha, m², acri',
  description:
    'Calculator online gratuit pentru conversia suprafețelor agricole: hectare, ari, metri pătrați, km², acri. Util pentru fermierii din Moldova.',
  alternates: { canonical: '/moldova/unelte/calculator-hectare' },
};

export default function MdlHectareCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Unelte', href: '/moldova/unelte' },
          { label: 'Calculator hectare' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculator suprafață hectare
        </h1>
        <p className="text-gray-600">
          Convertor rapid între hectare, ari, metri pătrați, kilometri pătrați și acri.
          Introdu o valoare și obții toate echivalențele instant.
        </p>
      </header>

      <HectareCalculator />

      <section className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="font-bold text-gray-900 mb-3">Echivalențe standard</h2>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>1 hectar = 10.000 m²</li>
          <li>1 hectar = 100 ari</li>
          <li>1 hectar = 2,471 acri</li>
          <li>1 hectar = 0,01 km²</li>
          <li>100 ha = 1 km²</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          În Moldova suprafețele agricole sunt măsurate în hectare (ha), conform standardelor
          cadastrale ale Agenției Relații Funciare și Cadastru (ARFC).
        </p>
      </section>
    </div>
  );
}
