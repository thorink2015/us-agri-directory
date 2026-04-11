import { Metadata } from 'next';
import Link from 'next/link';
import {
  Droplets, Leaf, Eye, Map, GraduationCap, Plane,
  ShoppingBag, Sprout, Lightbulb, Zap,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Servicii Drone Agricole Moldova 2026 | Pulverizare, Monitorizare MDL',
  description:
    'Serviciile de drone agricole disponibile în Republica Moldova: pulverizare (170–240 MDL/ha), monitorizare NDVI, cartografiere, fertilizare și consultanță.',
  alternates: { canonical: '/moldova/servicii' },
};

const moldovaServices = [
  {
    icon: Droplets,
    name: 'Pulverizare',
    desc: 'Tratamente fitosanitare cu drona: fungicide, insecticide, erbicide autorizate ANSA.',
    price: '170–240 MDL/ha',
    href: '/moldova/servicii/spraying',
    highlight: true,
  },
  {
    icon: Leaf,
    name: 'Fertilizare',
    desc: 'Aplicarea uniformă a fertilizanților foliare și îngrășămintelor lichide pe culturi.',
    price: '150–220 MDL/ha',
    href: '/moldova/servicii/spreading',
  },
  {
    icon: Eye,
    name: 'Monitorizare NDVI',
    desc: 'Supraveghere culturi, identificarea zonelor afectate, hărți de vegetație.',
    price: '100–180 MDL/ha',
    href: '/moldova/servicii/monitoring',
  },
  {
    icon: Map,
    name: 'Cartografiere',
    desc: 'Hărți topografice și ortofotoplanuri pentru planificarea agricolă de precizie.',
    price: '120–200 MDL/ha',
    href: '/moldova/servicii/mapping',
  },
  {
    icon: Sprout,
    name: 'Semănat',
    desc: 'Semănat de precizie cu drona pentru rapiță, iarbă, culturi mici.',
    price: 'La cerere',
    href: '/moldova/servicii/seeding',
  },
  {
    icon: Lightbulb,
    name: 'Consultanță',
    desc: 'Consultanță tehnică pentru achiziția dronei, autorizare ANSA și primii clienți.',
    price: 'La cerere',
    href: '/moldova/servicii/consultancy',
  },
  {
    icon: GraduationCap,
    name: 'Training piloți',
    desc: 'Cursuri de pilotaj și autorizare pentru operatori noi din Moldova.',
    price: 'La cerere',
    href: '/moldova/servicii/training',
  },
  {
    icon: ShoppingBag,
    name: 'Vânzare drone',
    desc: 'Achiziție drone DJI Agras eligibile pentru subvenție AIPA (50%, plafon 200K MDL).',
    price: 'De la €40.000',
    href: '/moldova/servicii/sales',
  },
  {
    icon: Zap,
    name: 'Intervenție rapidă',
    desc: 'Tratamente de urgență la apariția dăunătorilor sau bolilor fungice.',
    price: '+20% urgență',
    href: '/moldova/servicii/emergency',
  },
  {
    icon: Plane,
    name: 'Închiriere dronă',
    desc: 'Închiriere dronă agricolă cu sau fără pilot, pentru ferme care vor flexibilitate.',
    price: 'Zi/sezon',
    href: '/moldova/servicii/rental',
  },
];

export default function MoldovaServiciiPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Servicii' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Servicii drone agricole în Moldova
        </h1>
        <p className="text-gray-600">
          Toate serviciile disponibile de la operatorii de drone agricole din Republica Moldova.
          Prețuri în MDL, autorizare ANSA. Subvenție AIPA 50% la achiziția dronei.
        </p>
      </header>

      {/* Note about ANSA */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-gray-700">
        <strong className="text-blue-800">Autorizare ANSA:</strong> Toți operatorii din Moldova care aplică
        produse fitosanitare cu drona trebuie să fie autorizați de ANSA. Verifică autorizarea operatorului
        înainte de a semna contractul.{' '}
        <Link href="/moldova/ghid" className="text-blue-700 hover:underline font-medium">
          Citește ghidul legislativ Moldova →
        </Link>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {moldovaServices.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.name}
              href={s.href}
              className={`group bg-white rounded-xl p-5 hover:shadow-md transition-all border ${s.highlight ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200 hover:border-blue-200'}`}
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-blue-700" />
              </div>
              <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {s.name}
              </h2>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{s.desc}</p>
              <div className="text-sm font-semibold text-blue-700">{s.price}</div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-gray-900 mb-2">Ești operator de drone din Moldova?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adaugă-ți serviciile gratuit. Ajungi la fermieri din toate cele 35 de raioane.
        </p>
        <Link
          href="/adauga-operator"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Adaugă operator gratuit
        </Link>
      </div>
    </div>
  );
}
