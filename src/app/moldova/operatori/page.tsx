import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { getMdOperators } from '@/data/operators';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorCard from '@/components/operators/OperatorCard';

export const metadata: Metadata = {
  title: 'Operatori Drone Agricole Moldova 2026 | Toți Operatorii Verificați',
  description:
    'Lista completă a operatorilor de drone agricole din Republica Moldova. DRON Assistance, BOSAL Solutions, AgroDron.md și alții. Prețuri 170–240 MDL/ha.',
  alternates: { canonical: '/moldova/operatori' },
};

export default function MoldovaOperatoriPage() {
  const ops = getMdOperators();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Operatori' },
        ]}
      />

      {/* Header */}
      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          <MapPin className="w-3 h-3" />
          Republica Moldova
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Operatori de drone agricole din Moldova
        </h1>
        <p className="text-gray-600">
          {ops.length} operatori verificați cu acoperire națională în Republica Moldova. Prețuri în MDL,
          subvenție AIPA disponibilă. Servicii de pulverizare, monitorizare și consultanță.
        </p>
      </header>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: `${ops.length}`, label: 'Operatori activi' },
          { value: '35', label: 'Raioane acoperite' },
          { value: '50%', label: 'Subvenție AIPA' },
        ].map((s) => (
          <div key={s.label} className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">{s.value}</div>
            <div className="text-xs text-blue-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Operators grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {ops.map((op) => (
          <OperatorCard key={op.slug} operator={op} />
        ))}
      </section>

      {/* Info note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          Prețuri și acoperire
        </h2>
        <p className="text-sm text-gray-600">
          Majoritatea operatorilor din Moldova acoperă întreaga țară. Prețul mediu de pulverizare este{' '}
          <strong>170–240 MDL/ha</strong> (~€8.50–12/ha). Contactează direct operatorul pentru disponibilitate
          și tarife specifice raionului tău.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/moldova"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Toate raioanele Moldova
        </Link>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
        >
          Adaugă operator Moldova
        </Link>
      </div>
    </div>
  );
}
