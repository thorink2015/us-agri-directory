import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { guides, GUIDE_CATEGORIES } from '@/data/guides';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Ghiduri Drone Agricole România 2026 | Legislație AACR, AFIR, Licențe',
  description:
    'Ghiduri complete pentru operatori de drone agricole din România: legislație AACR, fonduri AFIR, licențe pilot, alegerea dronei și cum să devii operator.',
  alternates: { canonical: '/ghid' },
};

export default function GuidesHubPage() {
  const roGuides = guides.filter((g) => !g.country || g.country === 'RO');
  const byCategory = (cat: string) => roGuides.filter((g) => g.category === cat);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Ghiduri' }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Ghiduri complete: drone agricole în România 2026
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Tot ce trebuie să știi pentru a începe și dezvolta o afacere cu drone agricole în România.
          Ghiduri actualizate pentru 2026, bazate pe reglementările oficiale AACR și AFIR.
        </p>
      </header>

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
                  href={`/ghid/${guide.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                      {guide.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
                        {guide.shortTitle}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{guide.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {guide.readMinutes} min
                        </span>
                        <span>•</span>
                        <span className="text-green-700 font-medium group-hover:underline">
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
    </div>
  );
}
