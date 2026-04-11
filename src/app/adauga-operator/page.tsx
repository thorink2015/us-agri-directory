import { Metadata } from 'next';
import { CheckCircle, Clock, Globe } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: 'Adaugă Operator de Drone Agricole | Listare Gratuită',
  description:
    'Adaugă afacerea ta de drone agricole în directorul nostru gratuit. Procesare în 48 de ore. Acoperire în toată România și Moldova.',
  alternates: { canonical: '/adauga-operator' },
};

export default function AdaugaOperatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Adaugă operator' }]} />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Adaugă afacerea ta în director
        </h1>
        <p className="text-gray-600 text-lg">
          Listarea este <strong>100% gratuită</strong> și procesată în maxim 48 de ore.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: CheckCircle, title: 'Gratuit permanent', desc: 'Nicio taxă de listare, acum sau în viitor.' },
          { icon: Clock, title: 'Procesare rapidă', desc: 'Profil publicat în maxim 48 de ore.' },
          { icon: Globe, title: 'Vizibilitate SEO', desc: 'Profil optimizat pentru Google și Bing.' },
        ].map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <b.icon className="w-7 h-7 text-green-600 mb-2" />
            <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
            <div className="text-xs text-gray-600">{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Formular de înregistrare</h2>
        <SubmitForm />
      </div>
    </div>
  );
}
