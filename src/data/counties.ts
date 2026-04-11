import { County } from './types';
import { operators } from './operators';

export const counties: County[] = [
  { slug: 'alba', name: 'Alba', nameRo: 'Județul Alba', region: 'Transilvania', lat: 46.0732, lng: 23.5801, agriculturalLandHa: 183000, mainCrops: ['grau', 'porumb', 'vita-de-vie'], vineyardHa: 2800 },
  { slug: 'arad', name: 'Arad', nameRo: 'Județul Arad', region: 'Banat', lat: 46.1866, lng: 21.3123, agriculturalLandHa: 415000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'arges', name: 'Argeș', nameRo: 'Județul Argeș', region: 'Muntenia', lat: 44.8565, lng: 24.8699, agriculturalLandHa: 248000, mainCrops: ['grau', 'porumb', 'vita-de-vie'], orchardHa: 8000 },
  { slug: 'bacau', name: 'Bacău', nameRo: 'Județul Bacău', region: 'Moldova', lat: 46.5677, lng: 26.9146, agriculturalLandHa: 245000, mainCrops: ['porumb', 'grau', 'vita-de-vie'] },
  { slug: 'bihor', name: 'Bihor', nameRo: 'Județul Bihor', region: 'Crișana', lat: 47.0722, lng: 21.9217, agriculturalLandHa: 352000, mainCrops: ['grau', 'porumb', 'floarea-soarelui'] },
  { slug: 'bistrita-nasaud', name: 'Bistrița-Năsăud', nameRo: 'Județul Bistrița-Năsăud', region: 'Transilvania', lat: 47.1358, lng: 24.4961, agriculturalLandHa: 168000, mainCrops: ['grau', 'porumb', 'ovaz'] },
  { slug: 'botosani', name: 'Botoșani', nameRo: 'Județul Botoșani', region: 'Moldova', lat: 47.7458, lng: 26.6626, agriculturalLandHa: 348000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'braila', name: 'Brăila', nameRo: 'Județul Brăila', region: 'Muntenia', lat: 45.2702, lng: 27.9574, agriculturalLandHa: 418000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita', 'soia'] },
  { slug: 'brasov', name: 'Brașov', nameRo: 'Județul Brașov', region: 'Transilvania', lat: 45.6427, lng: 25.5887, agriculturalLandHa: 165000, mainCrops: ['grau', 'porumb', 'cartofi'] },
  { slug: 'bucuresti', name: 'București', nameRo: 'Municipiul București', region: 'Muntenia', lat: 44.4268, lng: 26.1025, agriculturalLandHa: 18000, mainCrops: ['legume'] },
  { slug: 'buzau', name: 'Buzău', nameRo: 'Județul Buzău', region: 'Muntenia', lat: 45.1502, lng: 26.8208, agriculturalLandHa: 365000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'vita-de-vie'], vineyardHa: 14000 },
  { slug: 'calarasi', name: 'Călărași', nameRo: 'Județul Călărași', region: 'Muntenia', lat: 44.2018, lng: 27.3311, agriculturalLandHa: 440000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita', 'soia'] },
  { slug: 'cluj', name: 'Cluj', nameRo: 'Județul Cluj', region: 'Transilvania', lat: 46.7712, lng: 23.6236, agriculturalLandHa: 330000, mainCrops: ['grau', 'porumb', 'orz'] },
  { slug: 'constanta', name: 'Constanța', nameRo: 'Județul Constanța', region: 'Dobrogea', lat: 44.1765, lng: 28.6499, agriculturalLandHa: 586000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'], vineyardHa: 8500 },
  { slug: 'covasna', name: 'Covasna', nameRo: 'Județul Covasna', region: 'Transilvania', lat: 45.8518, lng: 26.1868, agriculturalLandHa: 113000, mainCrops: ['grau', 'porumb', 'cartofi'] },
  { slug: 'dambovita', name: 'Dâmbovița', nameRo: 'Județul Dâmbovița', region: 'Muntenia', lat: 44.9249, lng: 25.4561, agriculturalLandHa: 215000, mainCrops: ['grau', 'porumb', 'vita-de-vie'], orchardHa: 4500 },
  { slug: 'dolj', name: 'Dolj', nameRo: 'Județul Dolj', region: 'Oltenia', lat: 44.3302, lng: 23.7949, agriculturalLandHa: 555000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'galati', name: 'Galați', nameRo: 'Județul Galați', region: 'Moldova', lat: 45.4353, lng: 28.0073, agriculturalLandHa: 385000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'vita-de-vie'] },
  { slug: 'giurgiu', name: 'Giurgiu', nameRo: 'Județul Giurgiu', region: 'Muntenia', lat: 43.9037, lng: 25.9699, agriculturalLandHa: 290000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'gorj', name: 'Gorj', nameRo: 'Județul Gorj', region: 'Oltenia', lat: 44.9524, lng: 23.3361, agriculturalLandHa: 138000, mainCrops: ['porumb', 'grau', 'vita-de-vie'] },
  { slug: 'harghita', name: 'Harghita', nameRo: 'Județul Harghita', region: 'Transilvania', lat: 46.4897, lng: 25.6060, agriculturalLandHa: 148000, mainCrops: ['cartofi', 'porumb', 'orz'] },
  { slug: 'hunedoara', name: 'Hunedoara', nameRo: 'Județul Hunedoara', region: 'Transilvania', lat: 45.7489, lng: 22.9021, agriculturalLandHa: 185000, mainCrops: ['grau', 'porumb', 'orz'] },
  { slug: 'ialomita', name: 'Ialomița', nameRo: 'Județul Ialomița', region: 'Muntenia', lat: 44.6063, lng: 27.3739, agriculturalLandHa: 416000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita', 'soia'] },
  { slug: 'iasi', name: 'Iași', nameRo: 'Județul Iași', region: 'Moldova', lat: 47.1585, lng: 27.6014, agriculturalLandHa: 365000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'vita-de-vie'], vineyardHa: 12000 },
  { slug: 'ilfov', name: 'Ilfov', nameRo: 'Județul Ilfov', region: 'Muntenia', lat: 44.5376, lng: 26.2096, agriculturalLandHa: 124000, mainCrops: ['grau', 'porumb', 'legume'] },
  { slug: 'maramures', name: 'Maramureș', nameRo: 'Județul Maramureș', region: 'Transilvania', lat: 47.6594, lng: 23.5686, agriculturalLandHa: 178000, mainCrops: ['porumb', 'grau', 'cartofi'] },
  { slug: 'mehedinti', name: 'Mehedinți', nameRo: 'Județul Mehedinți', region: 'Oltenia', lat: 44.6323, lng: 22.6573, agriculturalLandHa: 195000, mainCrops: ['grau', 'porumb', 'vita-de-vie'] },
  { slug: 'mures', name: 'Mureș', nameRo: 'Județul Mureș', region: 'Transilvania', lat: 46.5452, lng: 24.5574, agriculturalLandHa: 345000, mainCrops: ['grau', 'porumb', 'vita-de-vie'], vineyardHa: 3500 },
  { slug: 'neamt', name: 'Neamț', nameRo: 'Județul Neamț', region: 'Moldova', lat: 46.9759, lng: 26.3806, agriculturalLandHa: 202000, mainCrops: ['porumb', 'grau', 'orz'] },
  { slug: 'olt', name: 'Olt', nameRo: 'Județul Olt', region: 'Oltenia', lat: 44.4285, lng: 24.3660, agriculturalLandHa: 426000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'prahova', name: 'Prahova', nameRo: 'Județul Prahova', region: 'Muntenia', lat: 45.0431, lng: 25.9699, agriculturalLandHa: 295000, mainCrops: ['grau', 'porumb', 'vita-de-vie'], vineyardHa: 7500, orchardHa: 5000 },
  { slug: 'satu-mare', name: 'Satu Mare', nameRo: 'Județul Satu Mare', region: 'Crișana', lat: 47.7930, lng: 22.8855, agriculturalLandHa: 275000, mainCrops: ['grau', 'porumb', 'floarea-soarelui'] },
  { slug: 'salaj', name: 'Sălaj', nameRo: 'Județul Sălaj', region: 'Crișana', lat: 47.1921, lng: 23.0570, agriculturalLandHa: 195000, mainCrops: ['grau', 'porumb', 'orz'] },
  { slug: 'sibiu', name: 'Sibiu', nameRo: 'Județul Sibiu', region: 'Transilvania', lat: 45.7983, lng: 24.1256, agriculturalLandHa: 218000, mainCrops: ['grau', 'porumb', 'cartofi'] },
  { slug: 'suceava', name: 'Suceava', nameRo: 'Județul Suceava', region: 'Moldova', lat: 47.6514, lng: 26.2556, agriculturalLandHa: 358000, mainCrops: ['grau', 'porumb', 'cartofi'] },
  { slug: 'teleorman', name: 'Teleorman', nameRo: 'Județul Teleorman', region: 'Muntenia', lat: 43.9766, lng: 25.3337, agriculturalLandHa: 480000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita'] },
  { slug: 'timis', name: 'Timiș', nameRo: 'Județul Timiș', region: 'Banat', lat: 45.7489, lng: 21.2087, agriculturalLandHa: 606000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'rapita', 'soia'] },
  { slug: 'tulcea', name: 'Tulcea', nameRo: 'Județul Tulcea', region: 'Dobrogea', lat: 45.1813, lng: 28.8025, agriculturalLandHa: 312000, mainCrops: ['grau', 'floarea-soarelui', 'porumb'] },
  { slug: 'vaslui', name: 'Vaslui', nameRo: 'Județul Vaslui', region: 'Moldova', lat: 46.6407, lng: 27.7292, agriculturalLandHa: 332000, mainCrops: ['grau', 'porumb', 'floarea-soarelui', 'vita-de-vie'] },
  { slug: 'valcea', name: 'Vâlcea', nameRo: 'Județul Vâlcea', region: 'Oltenia', lat: 45.1063, lng: 24.3661, agriculturalLandHa: 175000, mainCrops: ['vita-de-vie', 'porumb', 'livada'], vineyardHa: 6500, orchardHa: 5500 },
  { slug: 'vrancea', name: 'Vrancea', nameRo: 'Județul Vrancea', region: 'Moldova', lat: 45.7003, lng: 27.1876, agriculturalLandHa: 248000, mainCrops: ['vita-de-vie', 'grau', 'porumb'], vineyardHa: 18000 },
];

export function getCountyBySlug(slug: string): County | undefined {
  return counties.find((c) => c.slug === slug);
}

export function getAdjacentCounties(county: County, count = 4): County[] {
  return counties
    .filter((c) => c.slug !== county.slug && c.region === county.region)
    .slice(0, count);
}

export function getCountyOperatorCount(countySlug: string): number {
  return operators.filter(
    (op) => op.country === 'RO' && op.counties.includes(countySlug)
  ).length;
}
