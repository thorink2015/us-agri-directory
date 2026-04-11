import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { guides, GUIDE_CATEGORIES } from '@/data/guides';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Ghiduri Drone Agricole Moldova 2026 | ANSA, AIPA, Legislație',
  description:
    'Ghiduri complete pentru operatorii de drone agricole din Moldova: legislație ANSA, subvenții AIPA 50%, autorizare AAC și cum pornești o afacere de succes.',
  alternates: { canonical: '/moldova/ghid' },
};

export default function MoldovaGhidPage() {
  const mdGuides = guides.filter((g) => g.country === 'MD');
  const byCategory = (cat: string) => mdGuides.filter((g) => g.category === cat);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Moldova', href: '/moldova' },
          { label: 'Ghiduri' },
        ]}
      />

      <header className="mb-8 border-l-4 border-blue-500 pl-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full mb-2">
          Republica Moldova
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ghiduri drone agricole în Moldova
        </h1>
        <p className="text-gray-600">
          Informații oficiale despre operarea dronelor agricole în Republica Moldova: reglementări ANSA,
          subvenții AIPA, autorizare AAC și cum pornești o afacere profitabilă.
        </p>
      </header>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-gray-700">
        <strong className="text-blue-800">Legislație specifică Moldova:</strong>{' '}
        Spre deosebire de România (AACR/EASA), în Moldova dronele agricole sunt reglementate de{' '}
        <strong>ANSA</strong> (produse fitosanitare) și <strong>AAC Moldova</strong> (Autoritatea Aeronautică Civilă).
        Subvențiile sunt gestionate de <strong>AIPA</strong> prin Ministerul Agriculturii.
      </div>

      {(['start', 'legal', 'funding', 'technical'] as const).map((category) => {
        const categoryGuides = byCategory(category);
        if (categoryGuides.length === 0) return null;
        const meta = GUIDE_CATEGORIES[category];

        return (
          <section key={category} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{meta.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/moldova/ghid/${guide.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                      {guide.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                        {guide.shortTitle}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{guide.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {guide.readMinutes} min
                        </span>
                        <span>•</span>
                        <span className="text-blue-700 font-medium group-hover:underline">
                          Citește ghidul <ArrowRight className="w-3 h-3 inline" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Link
          href="/moldova/operatori"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Operatori autorizați ANSA →
        </Link>
        <Link
          href="/moldova/preturi"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
        >
          Prețuri MDL/ha →
        </Link>
      </div>
    </div>
  );
}
