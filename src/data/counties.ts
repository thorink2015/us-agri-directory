import { County } from './types';
import { operators } from './operators';

export const counties: County[] = [
  // Corn Belt / Heartland
  { slug: 'iowa', name: 'Iowa', nameRo: 'State of Iowa', region: 'Corn Belt', lat: 42.0046, lng: -93.2140, agriculturalLandHa: 30400000, mainCrops: ['corn', 'soybeans', 'cover-crops'] },
  { slug: 'illinois', name: 'Illinois', nameRo: 'State of Illinois', region: 'Corn Belt', lat: 40.6331, lng: -89.3985, agriculturalLandHa: 27000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'indiana', name: 'Indiana', nameRo: 'State of Indiana', region: 'Corn Belt', lat: 40.2672, lng: -86.1349, agriculturalLandHa: 15000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'ohio', name: 'Ohio', nameRo: 'State of Ohio', region: 'Corn Belt', lat: 40.4173, lng: -82.9071, agriculturalLandHa: 14000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'missouri', name: 'Missouri', nameRo: 'State of Missouri', region: 'Corn Belt', lat: 37.9643, lng: -91.8318, agriculturalLandHa: 28500000, mainCrops: ['corn', 'soybeans', 'cotton'] },

  // Northern Great Plains
  { slug: 'kansas', name: 'Kansas', nameRo: 'State of Kansas', region: 'Great Plains', lat: 38.5266, lng: -96.7265, agriculturalLandHa: 46000000, mainCrops: ['wheat', 'corn', 'soybeans'] },
  { slug: 'nebraska', name: 'Nebraska', nameRo: 'State of Nebraska', region: 'Great Plains', lat: 41.4925, lng: -99.9018, agriculturalLandHa: 45000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'north-dakota', name: 'North Dakota', nameRo: 'State of North Dakota', region: 'Great Plains', lat: 47.5515, lng: -101.0020, agriculturalLandHa: 39000000, mainCrops: ['wheat', 'corn', 'soybeans'] },
  { slug: 'south-dakota', name: 'South Dakota', nameRo: 'State of South Dakota', region: 'Great Plains', lat: 43.9695, lng: -99.9018, agriculturalLandHa: 43000000, mainCrops: ['corn', 'wheat', 'soybeans'] },
  { slug: 'minnesota', name: 'Minnesota', nameRo: 'State of Minnesota', region: 'Great Plains', lat: 46.7296, lng: -94.6859, agriculturalLandHa: 27000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'montana', name: 'Montana', nameRo: 'State of Montana', region: 'Great Plains', lat: 46.8797, lng: -110.3626, agriculturalLandHa: 59000000, mainCrops: ['wheat', 'cover-crops'] },
  { slug: 'wyoming', name: 'Wyoming', nameRo: 'State of Wyoming', region: 'Great Plains', lat: 43.0760, lng: -107.2903, agriculturalLandHa: 30000000, mainCrops: ['wheat', 'corn'] },
  { slug: 'colorado', name: 'Colorado', nameRo: 'State of Colorado', region: 'Great Plains', lat: 39.5501, lng: -105.7821, agriculturalLandHa: 31000000, mainCrops: ['wheat', 'corn', 'cover-crops'] },

  // Southern Plains
  { slug: 'texas', name: 'Texas', nameRo: 'State of Texas', region: 'Southern Plains', lat: 31.9686, lng: -99.9018, agriculturalLandHa: 130000000, mainCrops: ['cotton', 'wheat', 'corn'] },
  { slug: 'oklahoma', name: 'Oklahoma', nameRo: 'State of Oklahoma', region: 'Southern Plains', lat: 35.0078, lng: -97.0929, agriculturalLandHa: 34000000, mainCrops: ['wheat', 'cotton', 'corn'] },
  { slug: 'new-mexico', name: 'New Mexico', nameRo: 'State of New Mexico', region: 'Southern Plains', lat: 34.5199, lng: -105.8701, agriculturalLandHa: 43000000, mainCrops: ['cotton', 'wheat'] },

  // Mississippi Delta / Southeast
  { slug: 'mississippi', name: 'Mississippi', nameRo: 'State of Mississippi', region: 'Delta', lat: 32.7673, lng: -89.6812, agriculturalLandHa: 11000000, mainCrops: ['cotton', 'soybeans', 'rice'] },
  { slug: 'arkansas', name: 'Arkansas', nameRo: 'State of Arkansas', region: 'Delta', lat: 35.2010, lng: -91.8318, agriculturalLandHa: 14000000, mainCrops: ['rice', 'soybeans', 'cotton'] },
  { slug: 'louisiana', name: 'Louisiana', nameRo: 'State of Louisiana', region: 'Delta', lat: 31.1695, lng: -91.8678, agriculturalLandHa: 8000000, mainCrops: ['rice', 'soybeans', 'cotton'] },
  { slug: 'tennessee', name: 'Tennessee', nameRo: 'State of Tennessee', region: 'Southeast', lat: 35.7478, lng: -86.6923, agriculturalLandHa: 10500000, mainCrops: ['soybeans', 'corn', 'cotton'] },
  { slug: 'alabama', name: 'Alabama', nameRo: 'State of Alabama', region: 'Southeast', lat: 32.3182, lng: -86.9023, agriculturalLandHa: 9000000, mainCrops: ['cotton', 'corn', 'soybeans'] },
  { slug: 'georgia', name: 'Georgia', nameRo: 'State of Georgia', region: 'Southeast', lat: 32.1656, lng: -82.9001, agriculturalLandHa: 10000000, mainCrops: ['cotton', 'corn', 'soybeans'] },
  { slug: 'florida', name: 'Florida', nameRo: 'State of Florida', region: 'Southeast', lat: 27.6648, lng: -81.5158, agriculturalLandHa: 9500000, mainCrops: ['corn', 'soybeans', 'cover-crops'] },
  { slug: 'south-carolina', name: 'South Carolina', nameRo: 'State of South Carolina', region: 'Southeast', lat: 33.8361, lng: -81.1637, agriculturalLandHa: 4800000, mainCrops: ['soybeans', 'corn', 'cotton'] },
  { slug: 'north-carolina', name: 'North Carolina', nameRo: 'State of North Carolina', region: 'Southeast', lat: 35.7596, lng: -79.0193, agriculturalLandHa: 8500000, mainCrops: ['soybeans', 'corn', 'wheat'] },
  { slug: 'virginia', name: 'Virginia', nameRo: 'State of Virginia', region: 'Southeast', lat: 37.4316, lng: -78.6569, agriculturalLandHa: 7800000, mainCrops: ['soybeans', 'corn', 'wheat'] },
  { slug: 'west-virginia', name: 'West Virginia', nameRo: 'State of West Virginia', region: 'Appalachian', lat: 38.5976, lng: -80.4549, agriculturalLandHa: 3700000, mainCrops: ['corn', 'wheat', 'cover-crops'] },
  { slug: 'kentucky', name: 'Kentucky', nameRo: 'State of Kentucky', region: 'Appalachian', lat: 37.8393, lng: -84.2700, agriculturalLandHa: 13000000, mainCrops: ['corn', 'soybeans', 'wheat'] },

  // Pacific / West
  { slug: 'california', name: 'California', nameRo: 'State of California', region: 'Pacific', lat: 36.7783, lng: -119.4179, agriculturalLandHa: 25000000, mainCrops: ['grapes', 'orchards', 'rice'], vineyardHa: 900000, orchardHa: 1200000 },
  { slug: 'washington', name: 'Washington', nameRo: 'State of Washington', region: 'Pacific', lat: 47.7511, lng: -120.7401, agriculturalLandHa: 14500000, mainCrops: ['orchards', 'wheat', 'grapes'], orchardHa: 500000 },
  { slug: 'oregon', name: 'Oregon', nameRo: 'State of Oregon', region: 'Pacific', lat: 43.8041, lng: -120.5542, agriculturalLandHa: 16500000, mainCrops: ['wheat', 'orchards', 'cover-crops'], orchardHa: 200000 },
  { slug: 'idaho', name: 'Idaho', nameRo: 'State of Idaho', region: 'Mountain', lat: 44.0682, lng: -114.7420, agriculturalLandHa: 11700000, mainCrops: ['wheat', 'corn', 'cover-crops'] },
  { slug: 'nevada', name: 'Nevada', nameRo: 'State of Nevada', region: 'Mountain', lat: 38.8026, lng: -116.4194, agriculturalLandHa: 6000000, mainCrops: ['wheat', 'cover-crops'] },
  { slug: 'utah', name: 'Utah', nameRo: 'State of Utah', region: 'Mountain', lat: 39.3210, lng: -111.0937, agriculturalLandHa: 11000000, mainCrops: ['wheat', 'corn', 'cover-crops'] },
  { slug: 'arizona', name: 'Arizona', nameRo: 'State of Arizona', region: 'Mountain', lat: 34.0489, lng: -111.0937, agriculturalLandHa: 26000000, mainCrops: ['cotton', 'wheat', 'cover-crops'] },

  // Midwest / Lake States
  { slug: 'michigan', name: 'Michigan', nameRo: 'State of Michigan', region: 'Lake States', lat: 44.3148, lng: -85.6024, agriculturalLandHa: 10000000, mainCrops: ['corn', 'soybeans', 'orchards'], orchardHa: 60000 },
  { slug: 'wisconsin', name: 'Wisconsin', nameRo: 'State of Wisconsin', region: 'Lake States', lat: 43.7844, lng: -88.7879, agriculturalLandHa: 15500000, mainCrops: ['corn', 'soybeans', 'cover-crops'] },

  // Northeast
  { slug: 'pennsylvania', name: 'Pennsylvania', nameRo: 'State of Pennsylvania', region: 'Northeast', lat: 41.2033, lng: -77.1945, agriculturalLandHa: 7300000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'new-york', name: 'New York', nameRo: 'State of New York', region: 'Northeast', lat: 42.1657, lng: -74.9481, agriculturalLandHa: 7000000, mainCrops: ['corn', 'grapes', 'orchards'], vineyardHa: 55000, orchardHa: 50000 },
  { slug: 'maryland', name: 'Maryland', nameRo: 'State of Maryland', region: 'Northeast', lat: 39.0458, lng: -76.6413, agriculturalLandHa: 2000000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'new-jersey', name: 'New Jersey', nameRo: 'State of New Jersey', region: 'Northeast', lat: 40.0583, lng: -74.4057, agriculturalLandHa: 733000, mainCrops: ['corn', 'soybeans', 'cover-crops'] },
  { slug: 'connecticut', name: 'Connecticut', nameRo: 'State of Connecticut', region: 'Northeast', lat: 41.6032, lng: -73.0877, agriculturalLandHa: 375000, mainCrops: ['corn', 'cover-crops'] },
  { slug: 'delaware', name: 'Delaware', nameRo: 'State of Delaware', region: 'Northeast', lat: 38.9108, lng: -75.5277, agriculturalLandHa: 494000, mainCrops: ['corn', 'soybeans', 'wheat'] },
  { slug: 'rhode-island', name: 'Rhode Island', nameRo: 'State of Rhode Island', region: 'Northeast', lat: 41.6809, lng: -71.5118, agriculturalLandHa: 68000, mainCrops: ['corn', 'cover-crops'] },
  { slug: 'massachusetts', name: 'Massachusetts', nameRo: 'State of Massachusetts', region: 'Northeast', lat: 42.4072, lng: -71.3824, agriculturalLandHa: 498000, mainCrops: ['corn', 'orchards', 'cover-crops'] },
  { slug: 'vermont', name: 'Vermont', nameRo: 'State of Vermont', region: 'Northeast', lat: 44.5588, lng: -72.5778, agriculturalLandHa: 1300000, mainCrops: ['corn', 'cover-crops'] },
  { slug: 'new-hampshire', name: 'New Hampshire', nameRo: 'State of New Hampshire', region: 'Northeast', lat: 43.1939, lng: -71.5724, agriculturalLandHa: 474000, mainCrops: ['corn', 'cover-crops'] },
  { slug: 'maine', name: 'Maine', nameRo: 'State of Maine', region: 'Northeast', lat: 45.2538, lng: -69.4455, agriculturalLandHa: 1300000, mainCrops: ['wheat', 'cover-crops'] },

  // Non-contiguous
  { slug: 'alaska', name: 'Alaska', nameRo: 'State of Alaska', region: 'Non-contiguous', lat: 64.2008, lng: -153.4937, agriculturalLandHa: 900000, mainCrops: ['wheat', 'cover-crops'] },
  { slug: 'hawaii', name: 'Hawaii', nameRo: 'State of Hawaii', region: 'Non-contiguous', lat: 19.8968, lng: -155.5828, agriculturalLandHa: 1900000, mainCrops: ['cover-crops'] },
];

export function getCountyBySlug(slug: string): County | undefined {
  return counties.find((c) => c.slug === slug);
}

export function getAdjacentCounties(county: County, count = 4): County[] {
  return counties
    .filter((c) => c.slug !== county.slug && c.region === county.region)
    .slice(0, count);
}

export function getCountyOperatorCount(stateSlug: string): number {
  return operators.filter((op) => op.counties.includes(stateSlug)).length;
}
