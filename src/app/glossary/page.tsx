import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { glossaryTerms, GlossaryTerm } from '@/data/glossary';

export const metadata: Metadata = {
  title: 'Agricultural Drone Glossary 2026 | FAA, EPA & Spraying Terms',
  description:
    'Plain-English definitions of 55+ agricultural drone terms: Part 107, Part 137, LAANC, FIFRA, GPA, ULV, RTK, and more. Updated for 2026 regulations.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: 'Agricultural Drone Glossary | US Ag Drone Directory',
    description:
      'The complete glossary of agricultural drone terminology: FAA regulations, spray application, drone hardware, and ag business terms.',
    url: 'https://agdronedirectory.com/glossary',
  },
};

const CATEGORY_LABELS: Record<GlossaryTerm['category'], string> = {
  regulatory: 'Regulatory',
  hardware: 'Hardware',
  application: 'Application',
  agronomic: 'Agronomic',
  business: 'Business',
};

const CATEGORY_COLORS: Record<GlossaryTerm['category'], string> = {
  regulatory: 'bg-blue-100 text-blue-800',
  hardware: 'bg-gray-100 text-gray-800',
  application: 'bg-green-100 text-green-800',
  agronomic: 'bg-amber-100 text-amber-800',
  business: 'bg-purple-100 text-purple-800',
};

export default function GlossaryPage() {
  // Group terms by first letter
  const termsByLetter = glossaryTerms.reduce<Record<string, GlossaryTerm[]>>((acc, t) => {
    const letter = t.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(t);
    return acc;
  }, {});

  const letters = Object.keys(termsByLetter).sort();

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'US Agricultural Drone Glossary',
    url: 'https://agdronedirectory.com/glossary',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `https://agdronedirectory.com/glossary#${t.slug}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: 'https://agdronedirectory.com/glossary',
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agricultural Drone Glossary',
    url: 'https://agdronedirectory.com/glossary',
    description: `Plain-English definitions of ${glossaryTerms.length}+ agricultural drone terms used across FAA regulations, EPA pesticide rules, drone hardware, and farm business.`,
    isPartOf: { '@id': 'https://agdronedirectory.com/#organization' },
    mainEntity: { '@id': 'https://agdronedirectory.com/glossary#termset' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://agdronedirectory.com/glossary' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ label: 'Glossary' }]} />

      <div className="flex items-center gap-3 mb-3">
        <BookOpen className="w-7 h-7 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">Agricultural Drone Glossary</h1>
      </div>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        Plain-English definitions of {glossaryTerms.length}+ terms used in US agricultural drone
        operations, FAA regulations, EPA pesticide rules, application technique, hardware, and business terminology.
      </p>

      {/* A-Z quick nav */}
      <div className="sticky top-16 z-10 bg-white border border-gray-200 rounded-xl p-3 mb-8 shadow-sm">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => {
            const hasTerms = letters.includes(l);
            return hasTerms ? (
              <a
                key={l}
                href={`#letter-${l}`}
                className="w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold text-green-700 hover:bg-green-100 transition-colors"
              >
                {l}
              </a>
            ) : (
              <span
                key={l}
                className="w-7 h-7 flex items-center justify-center rounded-md text-sm font-medium text-gray-300 cursor-not-allowed"
              >
                {l}
              </span>
            );
          })}
        </div>
      </div>

      {/* Terms by letter */}
      {letters.map((letter) => (
        <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
            {letter}
          </h2>
          <div className="space-y-5">
            {termsByLetter[letter].map((t) => (
              <div
                key={t.slug}
                id={t.slug}
                className="scroll-mt-24 bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{t.term}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${CATEGORY_COLORS[t.category]}`}>
                    {CATEGORY_LABELS[t.category]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{t.definition}</p>
                {t.relatedTerms && t.relatedTerms.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium">See also:</span>
                    {t.relatedTerms.map((relSlug) => (
                      <a
                        key={relSlug}
                        href={`#${relSlug}`}
                        className="text-green-700 hover:underline"
                      >
                        {relSlug}
                      </a>
                    ))}
                  </div>
                )}
                {t.relatedLink && (
                  <div className="mt-3">
                    <Link
                      href={t.relatedLink.href}
                      className="text-xs text-green-700 hover:underline font-medium"
                    >
                      {t.relatedLink.label} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer CTA */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-12">
        <h2 className="font-semibold text-gray-900 mb-2">Missing a term?</h2>
        <p className="text-sm text-gray-700 mb-3">
          This glossary is updated quarterly. If you see a term used on the site that isn&apos;t defined
          here, let us know.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors"
        >
          Suggest a term
        </Link>
      </div>
    </div>
  );
}
