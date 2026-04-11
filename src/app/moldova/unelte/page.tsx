import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Ruler, Zap, Calendar, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Unelte gratuite drone agricole Moldova 2026 | Calculatoare MDL',
  description:
    'Calculatoare gratuite pentru fermieri și operatori de drone din Moldova: calculator preț în MDL, convertor hectare, comparator drone, calendar tratamente ANSA.',
  alternates: { canonical: '/moldova/unelte' },
};

const tools = [
  {
    slug: 'calculator-pret-pulverizare',
    name: 'Calculator preț pulverizare',
    description:
      'Calculează costul total al pulverizării cu drona în lei moldovenești (MDL): cereale, viță de vie, livezi.',
    icon: Calculator,
    color: 'blue',
    badge: 'MDL',
  },
  {
    slug: 'calculator-hectare',
    name: 'Calculator suprafață',
    description:
      'Convertor rapid între hectare, ari, metri pătrați și km². Util pentru cereri AIPA și planificare.',
    icon: Ruler,
    color: 'teal',
    badge: null,
  },
  {
    slug: 'comparator-drone',
    name: 'Comparator drone',
    description:
      'Compară DJI Agras T25P, T50, T100, XAG P100 și ADT Falcon. Toate eligibile subvenție AIPA.',
    icon: Zap,
    color: 'yellow',
    badge: 'AIPA',
  },
  {
    slug: 'calendar-tratamente',
    name: 'Calendar tratamente',
    description:
      'Calendar lunar cu tratamentele recomandate pentru culturi din Moldova. Produse autorizate ANSA.',
    icon: Calendar,
    color: 'purple',
    badge: 'ANSA',
  },
];

const COLOR_MAP: Record<string, string> = {
  blue:   'bg-blue-100   text-blue-700   border-blue-200',
  teal:   'bg-teal-100   text-teal-700   border-teal-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function MdlToolsHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Unelte' },
        ]}
      />

      <header className="mb-10 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Unelte gratuite pentru Moldova
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Calculatoare și instrumente online gratuite pentru fermieri și operatori de drone din
          Republica Moldova. Prețuri în MDL, referințe AIPA și produse ANSA.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/moldova/unelte/${tool.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 ${COLOR_MAP[tool.color]} border rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                {tool.badge && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <span className="text-sm text-blue-700 font-medium group-hover:underline flex items-center gap-1">
                Deschide unealta <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
        <h2 className="font-semibold text-gray-900 mb-2">Mai multe resurse pentru Moldova</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-3">
          <Link
            href="/moldova/preturi"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            Prețuri MDL/ha
          </Link>
          <Link
            href="/moldova/ghid"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-white transition-colors text-sm"
          >
            Ghiduri ANSA & AIPA →
          </Link>
        </div>
      </div>
    </div>
  );
}
