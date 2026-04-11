import { BlogPost } from './types';

/**
 * Programmatic blog posts for SEO.
 * Content is intentionally structured as top lists and deep guides to rank
 * for "top N drone" style queries.
 *
 * To add more posts, extend this array. The [slug]/page.tsx template handles rendering.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'top-10-operatori-drone-agricole-romania-2026',
    title: 'Top 10 operatori de drone agricole din România în 2026',
    description:
      'Clasamentul celor mai mari și mai respectați operatori de drone agricole din România în 2026: hectare tratate, flotă, certificări.',
    category: 'top-lists',
    publishedAt: '2026-03-01',
    author: 'Echipa TerraDron.ro',
    readMinutes: 8,
    tags: ['top', 'operatori', 'romania', '2026'],
    relatedServices: ['spraying', 'monitoring'],
    content: 'top-10-operatori-ro',
  },
  {
    slug: 'top-5-operatori-drone-moldova-2026',
    title: 'Top 5 operatori de drone agricole din Republica Moldova (2026)',
    description:
      'Principalii operatori de drone agricole din Moldova în 2026: DRON Assistance, BOSAL, AgroDron.md și alții.',
    category: 'top-lists',
    publishedAt: '2026-03-05',
    author: 'Echipa TerraDron.ro',
    readMinutes: 6,
    country: 'MD',
    tags: ['top', 'moldova', 'operatori'],
    relatedServices: ['spraying'],
    content: 'top-5-moldova',
  },
  {
    slug: 'top-drone-agricole-2026-comparatie',
    title: 'Top 5 drone agricole în 2026: DJI T50, T100, XAG P100 și ADT Falcon',
    description:
      'Comparație detaliată a celor mai bune drone agricole din 2026: specificații, prețuri și recomandări.',
    category: 'top-lists',
    publishedAt: '2026-02-15',
    author: 'Echipa TerraDron.ro',
    readMinutes: 10,
    tags: ['top', 'drone', 'dji', 'xag'],
    content: 'top-drone-2026',
  },
  {
    slug: 'pulverizare-vita-de-vie-drona-ghid-complet',
    title: 'Pulverizarea viței de vie cu drona: ghid complet pentru viticultori',
    description:
      'De ce 80% dintre viticultori aleg drona în 2026: costuri, beneficii, programe de tratament.',
    category: 'guide',
    publishedAt: '2026-03-10',
    author: 'Echipa TerraDron.ro',
    readMinutes: 12,
    tags: ['vita-de-vie', 'pulverizare', 'viticultura'],
    relatedCrops: ['vita-de-vie'],
    relatedServices: ['spraying'],
    content: 'vita-de-vie-ghid',
  },
  {
    slug: 'top-10-judete-productie-vita-de-vie-drone',
    title: 'Top 10 județe din România după producția de viță de vie: ce operatori de drone le deservesc',
    description:
      'Clasamentul județelor viticole din România și operatorii de drone agricole cei mai activi în fiecare zonă.',
    category: 'top-lists',
    publishedAt: '2026-02-20',
    author: 'Echipa TerraDron.ro',
    readMinutes: 9,
    tags: ['judete', 'vita-de-vie', 'top'],
    relatedCrops: ['vita-de-vie'],
    content: 'top-judete-viticole',
  },
  {
    slug: 'cat-costa-drona-agricola-2026',
    title: 'Cât costă o dronă agricolă în 2026? Prețuri complete DJI, XAG, ADT',
    description:
      'Prețurile actualizate ale dronelor agricole în 2026: DJI Agras T25P, T50, T100, XAG P100, inclusiv opțiuni AFIR.',
    category: 'guide',
    publishedAt: '2026-01-15',
    author: 'Echipa TerraDron.ro',
    readMinutes: 7,
    tags: ['pret', 'dji', 'xag', '2026'],
    content: 'cat-costa-drona',
  },
  {
    slug: 'top-regiuni-viticole-moldova-drone',
    title: 'Top 5 regiuni viticole din Moldova și operatorii de drone',
    description:
      'Principalele regiuni viticole din Moldova: Ștefan Vodă, Cahul, UTA Găgăuzia și serviciile disponibile.',
    category: 'top-lists',
    publishedAt: '2026-02-25',
    author: 'Echipa TerraDron.ro',
    readMinutes: 7,
    country: 'MD',
    tags: ['moldova', 'viticultura', 'top'],
    content: 'top-regiuni-viticole-moldova',
  },
  {
    slug: 'tratamente-cereale-drona-romania',
    title: 'Tratamente pentru cereale (grâu, porumb, orz) cu drona: ce operatori să alegi',
    description:
      'De ce dronele sunt ideale pentru tratarea cerealelor în România, plus lista operatorilor specializați.',
    category: 'guide',
    publishedAt: '2026-03-20',
    author: 'Echipa TerraDron.ro',
    readMinutes: 8,
    tags: ['grau', 'porumb', 'cereale', 'operatori'],
    relatedCrops: ['grau', 'porumb', 'cereale'],
    content: 'tratamente-cereale',
  },
  {
    slug: 'top-5-operatori-moldova-norddanube-dobrogea',
    title: 'Top operatori de drone în Dobrogea: Constanța, Tulcea, Brăila',
    description:
      'Cei mai activi operatori de drone agricole din Dobrogea și sudul Moldovei (Galați, Brăila).',
    category: 'top-lists',
    publishedAt: '2026-04-01',
    author: 'Echipa TerraDron.ro',
    readMinutes: 7,
    tags: ['dobrogea', 'constanta', 'braila', 'tulcea'],
    relatedCounties: ['constanta', 'tulcea', 'braila', 'galati'],
    content: 'top-dobrogea',
  },
  {
    slug: 'legislatie-drone-agricole-2026-noutati',
    title: 'Noutăți legislative pentru drone agricole în 2026: ce trebuie să știi',
    description:
      'Actualizări importante ale legislației AACR și EASA pentru operatorii de drone agricole în 2026.',
    category: 'legislation',
    publishedAt: '2026-01-20',
    author: 'Echipa TerraDron.ro',
    readMinutes: 6,
    tags: ['legislatie', 'aacr', '2026'],
    content: 'legislatie-2026',
  },
  {
    slug: 'top-5-operatori-transilvania-cluj-mures',
    title: 'Top operatori drone în Transilvania: Cluj, Mureș, Brașov, Sibiu',
    description:
      'Operatorii de drone agricole cei mai activi din Transilvania: RIAGRO, SkyGrid, Appia Drones și alții.',
    category: 'top-lists',
    publishedAt: '2026-03-15',
    author: 'Echipa TerraDron.ro',
    readMinutes: 6,
    tags: ['transilvania', 'cluj', 'mures', 'brasov', 'sibiu'],
    relatedCounties: ['cluj', 'mures', 'brasov', 'sibiu'],
    content: 'top-transilvania',
  },
  {
    slug: 'fonduri-afir-drone-2026-succes',
    title: 'Cum să obții fonduri AFIR pentru o dronă în 2026: 5 povești de succes',
    description:
      '5 fermieri români care au obținut finanțare AFIR pentru drone agricole: pașii urmați și sumele obținute.',
    category: 'case-study',
    publishedAt: '2026-02-10',
    author: 'Echipa TerraDron.ro',
    readMinutes: 11,
    tags: ['afir', 'finantare', 'succes', 'drone'],
    content: 'afir-cazuri-succes',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export const BLOG_CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  'top-lists': 'Top Liste',
  'guide': 'Ghiduri',
  'news': 'Știri',
  'case-study': 'Studii de caz',
  'legislation': 'Legislație',
};
