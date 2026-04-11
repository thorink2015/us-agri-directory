export interface Guide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'start' | 'legal' | 'funding' | 'technical';
  country?: 'RO' | 'MD';   // defaults to 'RO' if absent
  readMinutes: number;
  lastUpdated: string;
  keywords: string[];
  icon: string;
}

export const guides: Guide[] = [
  {
    slug: 'cum-sa-devii-operator',
    title: 'Cum să devii operator de drone agricole în 2026: ghid complet',
    shortTitle: 'Cum să devii operator',
    description:
      'Ghid pas cu pas pentru a începe o afacere cu drone agricole în România: licențe, fonduri, echipament, clienți.',
    category: 'start',
    readMinutes: 15,
    lastUpdated: '2026-04-01',
    keywords: ['cum sa devii operator drone', 'afacere drone agricole', 'start business drone'],
    icon: '🚀',
  },
  {
    slug: 'legislatie-drone-agricole',
    title: 'Legislația dronelor agricole în România (2026): reglementări AACR complete',
    shortTitle: 'Legislație drone',
    description:
      'Toate reglementările AACR și EASA pentru operarea dronelor agricole: clase Open/Specific, zboruri comerciale, sancțiuni.',
    category: 'legal',
    readMinutes: 12,
    lastUpdated: '2026-03-15',
    keywords: ['legislatie drona romania', 'aacr drona', 'autorizare drona comerciala'],
    icon: '⚖️',
  },
  {
    slug: 'fonduri-afir-drone',
    title: 'Fonduri AFIR pentru drone agricole 2026: submăsura 4.1 și intervenția DR-29',
    shortTitle: 'Fonduri AFIR',
    description:
      'Cum obții 50–65% rambursare pentru cumpărarea unei drone agricole prin AFIR. Eligibilitate, documente, pași.',
    category: 'funding',
    readMinutes: 10,
    lastUpdated: '2026-02-20',
    keywords: ['fonduri afir drona', 'subventie drona agricola', 'submasura 4.1 drona'],
    icon: '💰',
  },
  {
    slug: 'licenta-pilot-drona',
    title: 'Cum obții licența de pilot de dronă agricolă în 2026',
    shortTitle: 'Licență pilot dronă',
    description:
      'Ghid complet pentru obținerea brevetului AACR pentru pilot de dronă agricolă: cursuri, examen, costuri, documente.',
    category: 'legal',
    readMinutes: 8,
    lastUpdated: '2026-01-10',
    keywords: ['licenta pilot drona', 'brevet aacr', 'curs pilot drona agricola'],
    icon: '🎓',
  },
  {
    slug: 'alegerea-dronei-agricole',
    title: 'Cum alegi drona agricolă potrivită: DJI vs XAG vs ADT (2026)',
    shortTitle: 'Alegerea dronei',
    description:
      'Compară DJI Agras T25P, T50, T100 cu XAG P100 și ADT Falcon. Bugete, capacitate, service, piese.',
    category: 'technical',
    readMinutes: 14,
    lastUpdated: '2026-03-01',
    keywords: ['dji agras t50', 'xag p100', 'comparatie drone agricole', 'care drona sa cumpar'],
    icon: '🚁',
  },
  {
    slug: 'roi-drona-agricola',
    title: 'Merită să cumperi o dronă agricolă? Calcul ROI complet 2026',
    shortTitle: 'ROI dronă agricolă',
    description:
      'Calculator de rentabilitate pentru drona agricolă: cât costă, cât câștigați, în cât timp se amortizează. Calcul real pentru ferme de 100–1.000 ha.',
    category: 'technical',
    readMinutes: 10,
    lastUpdated: '2026-04-01',
    keywords: ['merita drona agricola', 'amortizare drona', 'roi drona agricola', 'drona vs tractor cost'],
    icon: '📊',
  },
  {
    slug: 'subventii-moldova-aipa',
    title: 'Subvenții AIPA pentru drone agricole în Moldova (2026)',
    shortTitle: 'Subvenții AIPA Moldova',
    description:
      'Cum obții 50% subvenție pentru drona agricolă în Moldova prin AIPA. Anexa 3, documente, plafonul de 200.000 MDL.',
    category: 'funding',
    country: 'MD',
    readMinutes: 9,
    lastUpdated: '2026-02-15',
    keywords: ['aipa moldova drona', 'subventie drona moldova', 'fonduri agricultura moldova'],
    icon: '🇲🇩',
  },
  {
    slug: 'legislatie-ansa-moldova',
    title: 'Legislația dronelor agricole în Moldova (2026): reglementări ANSA',
    shortTitle: 'Legislație ANSA Moldova',
    description:
      'Autorizarea și operarea dronelor agricole în Republica Moldova: cerințele ANSA, înregistrarea aparatelor de zbor și zonele permise.',
    category: 'legal',
    country: 'MD',
    readMinutes: 8,
    lastUpdated: '2026-03-01',
    keywords: ['legislatie drona moldova', 'ansa drona', 'autorizare drona moldova'],
    icon: '⚖️',
  },
  {
    slug: 'cum-sa-devii-operator-moldova',
    title: 'Cum devii operator de drone agricole în Moldova: ghid 2026',
    shortTitle: 'Devii operator în Moldova',
    description:
      'Ghid pentru a lansa o afacere cu drone agricole în Moldova: autorizare ANSA, subvenție AIPA, primii clienți și prețuri.',
    category: 'start',
    country: 'MD',
    readMinutes: 12,
    lastUpdated: '2026-03-10',
    keywords: ['operator drone moldova', 'afacere drone moldova 2026', 'drona agricola moldova start'],
    icon: '🚀',
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const GUIDE_CATEGORIES: Record<Guide['category'], { label: string; color: string }> = {
  start: { label: 'Începere afacere', color: 'green' },
  legal: { label: 'Legislație', color: 'blue' },
  funding: { label: 'Finanțare', color: 'yellow' },
  technical: { label: 'Tehnic', color: 'purple' },
};
