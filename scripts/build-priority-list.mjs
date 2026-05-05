#!/usr/bin/env node
/* eslint-disable */
// Builds /audit/research-plan/{master-cities-ranked.csv, priority-batches.md, existing-operators-name-list.txt}
// from src/data/operators.ts + src/data/counties.ts (states data) + a curated list of well-known
// top ag-producing towns per state.
//
// USDA NASS Quick Stats county-level cropland_acres / farm_count / ag_receipts could not be
// fetched from this offline build environment, so those columns are left blank per the
// task instruction "omit the column value rather than guess." ag_score is computed as a
// proxy from state-level cropland (counties.ts), operator coverage, and a curated
// ag-hub tier flag. See PR description for the data caveat.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'audit', 'research-plan');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- 1. Parse operators.ts ----------
function parseOperators() {
  const src = fs.readFileSync(path.join(ROOT, 'src/data/operators.ts'), 'utf8');
  const startIdx = src.indexOf('export const operators');
  const arrStart = src.indexOf('[', startIdx);
  const blocks = [];
  let depth = 0, curStart = -1, inStr = false, q = null, esc = false;
  for (let i = arrStart; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === q) inStr = false;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = true; q = ch; continue; }
    if (ch === '{') { if (depth === 0) curStart = i; depth++; }
    else if (ch === '}') { depth--; if (depth === 0 && curStart >= 0) { blocks.push(src.slice(curStart, i + 1)); curStart = -1; } }
  }
  const ops = [];
  for (const b of blocks) {
    const nameM = b.match(/name:\s*'([^']+)'/);
    const cityM = b.match(/city:\s*'([^']+)'/);
    const countiesM = b.match(/counties:\s*\[([^\]]*)\]/);
    if (!nameM || !cityM || !countiesM) continue;
    const states = countiesM[1].split(',').map((s) => s.replace(/['"\s]/g, '')).filter(Boolean);
    ops.push({ name: nameM[1], city: cityM[1].trim(), homeState: states[0] || '', allStates: states });
  }
  return ops;
}

// ---------- 2. Parse states (counties.ts) ----------
function parseStates() {
  const src = fs.readFileSync(path.join(ROOT, 'src/data/counties.ts'), 'utf8');
  const re = /\{\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*nameRo:[^,]+,\s*region:\s*'([^']+)',[^}]*?agriculturalLandHa:\s*(\d+)/g;
  const states = [];
  let m;
  while ((m = re.exec(src))) {
    states.push({ slug: m[1], name: m[2], region: m[3], cropAcres: parseInt(m[4], 10) });
  }
  return states;
}

// ---------- 3. citySlug + city-validity (mirrors src/data/cities.ts) ----------
function citySlug(city) {
  return city
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const RESERVED_CHILD_SLUGS = new Set(['operators', 'services', 'crops']);
const DIRECTIONAL_OR_STATEWIDE = new Set([
  'central', 'north', 'south', 'east', 'west',
  'eastern', 'western', 'northern', 'southern',
  'statewide', 'unknown', 'remote', 'na',
]);

// ---------- 4. Curated top ag-producing towns per state ----------
// Source: well-known agricultural geography (county seats of major-ag counties, longstanding
// crop-belt towns). Counties given only when the city is the unambiguous county seat. Numeric
// cropland_acres / farm_count / ag_receipts left blank — we have no USDA county data offline.
//
// Format: { city, county? }   (state slug is the map key)
const CURATED = {
  iowa: [
    { c: 'Storm Lake', county: 'Buena Vista' },
    { c: 'Le Mars', county: 'Plymouth' },
    { c: 'Orange City', county: 'Sioux' },
    { c: 'Algona', county: 'Kossuth' },
    { c: 'Carroll', county: 'Carroll' },
    { c: 'Spencer', county: 'Clay' },
    { c: 'Mason City', county: 'Cerro Gordo' },
    { c: 'Atlantic', county: 'Cass' },
    { c: 'Decorah', county: 'Winneshiek' },
    { c: 'Ottumwa', county: 'Wapello' },
    { c: 'Council Bluffs', county: 'Pottawattamie' },
    { c: 'Sioux Center', county: 'Sioux' },
    { c: 'Iowa Falls', county: 'Hardin' },
    { c: 'Newton', county: 'Jasper' },
    { c: 'Oskaloosa', county: 'Mahaska' },
  ],
  illinois: [
    { c: 'Bloomington', county: 'McLean' },
    { c: 'Champaign', county: 'Champaign' },
    { c: 'Decatur', county: 'Macon' },
    { c: 'Springfield', county: 'Sangamon' },
    { c: 'Quincy', county: 'Adams' },
    { c: 'Galesburg', county: 'Knox' },
    { c: 'Effingham', county: 'Effingham' },
    { c: 'Mt. Vernon', county: 'Jefferson' },
    { c: 'Pontiac', county: 'Livingston' },
    { c: 'Mattoon', county: 'Coles' },
    { c: 'Paxton', county: 'Ford' },
    { c: 'Monticello', county: 'Piatt' },
    { c: 'Watseka', county: 'Iroquois' },
    { c: 'Macomb', county: 'McDonough' },
  ],
  indiana: [
    { c: 'Lafayette', county: 'Tippecanoe' },
    { c: 'Kokomo', county: 'Howard' },
    { c: 'Logansport', county: 'Cass' },
    { c: 'Frankfort', county: 'Clinton' },
    { c: 'Crawfordsville', county: 'Montgomery' },
    { c: 'Greensburg', county: 'Decatur' },
    { c: 'Vincennes', county: 'Knox' },
    { c: 'Princeton', county: 'Gibson' },
    { c: 'Rensselaer', county: 'Jasper' },
    { c: 'Rushville', county: 'Rush' },
    { c: 'Tipton', county: 'Tipton' },
    { c: 'Winchester', county: 'Randolph' },
  ],
  ohio: [
    { c: 'Wooster', county: 'Wayne' },
    { c: 'Findlay', county: 'Hancock' },
    { c: 'Lima', county: 'Allen' },
    { c: 'Marion', county: 'Marion' },
    { c: 'Bucyrus', county: 'Crawford' },
    { c: 'Fremont', county: 'Sandusky' },
    { c: 'Defiance', county: 'Defiance' },
    { c: 'Tiffin', county: 'Seneca' },
    { c: 'Bowling Green', county: 'Wood' },
    { c: 'Mansfield', county: 'Richland' },
    { c: 'Upper Sandusky', county: 'Wyandot' },
    { c: 'Van Wert', county: 'Van Wert' },
  ],
  missouri: [
    { c: 'Sikeston', county: 'Scott' },
    { c: 'Cape Girardeau', county: 'Cape Girardeau' },
    { c: 'Sedalia', county: 'Pettis' },
    { c: 'Marshall', county: 'Saline' },
    { c: 'Chillicothe', county: 'Livingston' },
    { c: 'Hannibal', county: 'Marion' },
    { c: 'Kirksville', county: 'Adair' },
    { c: 'Macon', county: 'Macon' },
    { c: 'Bowling Green', county: 'Pike' },
    { c: 'Mexico', county: 'Audrain' },
    { c: 'Carthage', county: 'Jasper' },
    { c: 'Maryville', county: 'Nodaway' },
  ],
  kansas: [
    { c: 'Hays', county: 'Ellis' },
    { c: 'Garden City', county: 'Finney' },
    { c: 'Liberal', county: 'Seward' },
    { c: 'Dodge City', county: 'Ford' },
    { c: 'Pratt', county: 'Pratt' },
    { c: 'Hutchinson', county: 'Reno' },
    { c: 'Colby', county: 'Thomas' },
    { c: 'Goodland', county: 'Sherman' },
    { c: 'Scott City', county: 'Scott' },
    { c: 'Ulysses', county: 'Grant' },
    { c: 'Phillipsburg', county: 'Phillips' },
    { c: 'Beloit', county: 'Mitchell' },
    { c: 'Concordia', county: 'Cloud' },
    { c: 'McPherson', county: 'McPherson' },
  ],
  nebraska: [
    { c: 'Grand Island', county: 'Hall' },
    { c: 'Kearney', county: 'Buffalo' },
    { c: 'North Platte', county: 'Lincoln' },
    { c: 'Norfolk', county: 'Madison' },
    { c: 'Hastings', county: 'Adams' },
    { c: 'Columbus', county: 'Platte' },
    { c: 'Scottsbluff', county: 'Scotts Bluff' },
    { c: 'McCook', county: 'Red Willow' },
    { c: 'Sidney', county: 'Cheyenne' },
    { c: 'Imperial', county: 'Chase' },
    { c: 'Holdrege', county: 'Phelps' },
    { c: 'Beatrice', county: 'Gage' },
    { c: 'York', county: 'York' },
    { c: 'Lexington', county: 'Dawson' },
  ],
  'north-dakota': [
    { c: 'Fargo', county: 'Cass' },
    { c: 'Grand Forks', county: 'Grand Forks' },
    { c: 'Minot', county: 'Ward' },
    { c: 'Williston', county: 'Williams' },
    { c: 'Jamestown', county: 'Stutsman' },
    { c: 'Devils Lake', county: 'Ramsey' },
    { c: 'Dickinson', county: 'Stark' },
    { c: 'Wahpeton', county: 'Richland' },
    { c: 'Valley City', county: 'Barnes' },
    { c: 'Bottineau', county: 'Bottineau' },
    { c: 'Cavalier', county: 'Pembina' },
    { c: 'Carrington', county: 'Foster' },
  ],
  'south-dakota': [
    { c: 'Aberdeen', county: 'Brown' },
    { c: 'Watertown', county: 'Codington' },
    { c: 'Mitchell', county: 'Davison' },
    { c: 'Brookings', county: 'Brookings' },
    { c: 'Huron', county: 'Beadle' },
    { c: 'Yankton', county: 'Yankton' },
    { c: 'Pierre', county: 'Hughes' },
    { c: 'Vermillion', county: 'Clay' },
    { c: 'Madison', county: 'Lake' },
    { c: 'Redfield', county: 'Spink' },
    { c: 'Webster', county: 'Day' },
  ],
  minnesota: [
    { c: 'Marshall', county: 'Lyon' },
    { c: 'Worthington', county: 'Nobles' },
    { c: 'Willmar', county: 'Kandiyohi' },
    { c: 'Mankato', county: 'Blue Earth' },
    { c: 'Owatonna', county: 'Steele' },
    { c: 'Albert Lea', county: 'Freeborn' },
    { c: 'Faribault', county: 'Rice' },
    { c: 'Crookston', county: 'Polk' },
    { c: 'Moorhead', county: 'Clay' },
    { c: 'Fairmont', county: 'Martin' },
    { c: 'Glencoe', county: 'McLeod' },
    { c: 'Hutchinson', county: 'McLeod' },
    { c: 'Olivia', county: 'Renville' },
    { c: 'Redwood Falls', county: 'Redwood' },
  ],
  montana: [
    { c: 'Great Falls', county: 'Cascade' },
    { c: 'Havre', county: 'Hill' },
    { c: 'Glendive', county: 'Dawson' },
    { c: 'Sidney', county: 'Richland' },
    { c: 'Glasgow', county: 'Valley' },
    { c: 'Lewistown', county: 'Fergus' },
    { c: 'Conrad', county: 'Pondera' },
    { c: 'Choteau', county: 'Teton' },
    { c: 'Cut Bank', county: 'Glacier' },
    { c: 'Plentywood', county: 'Sheridan' },
  ],
  wyoming: [
    { c: 'Powell', county: 'Park' },
    { c: 'Worland', county: 'Washakie' },
    { c: 'Torrington', county: 'Goshen' },
    { c: 'Wheatland', county: 'Platte' },
    { c: 'Riverton', county: 'Fremont' },
    { c: 'Lander', county: 'Fremont' },
    { c: 'Lovell', county: 'Big Horn' },
    { c: 'Greybull', county: 'Big Horn' },
  ],
  colorado: [
    { c: 'Yuma', county: 'Yuma' },
    { c: 'Burlington', county: 'Kit Carson' },
    { c: 'Sterling', county: 'Logan' },
    { c: 'Lamar', county: 'Prowers' },
    { c: 'Holyoke', county: 'Phillips' },
    { c: 'Akron', county: 'Washington' },
    { c: 'Wray', county: 'Yuma' },
    { c: 'Greeley', county: 'Weld' },
    { c: 'Fort Morgan', county: 'Morgan' },
    { c: 'La Junta', county: 'Otero' },
    { c: 'Rocky Ford', county: 'Otero' },
    { c: 'Brush', county: 'Morgan' },
  ],
  texas: [
    { c: 'Lubbock', county: 'Lubbock' },
    { c: 'Plainview', county: 'Hale' },
    { c: 'Dumas', county: 'Moore' },
    { c: 'Hereford', county: 'Deaf Smith' },
    { c: 'Harlingen', county: 'Cameron' },
    { c: 'Weslaco', county: 'Hidalgo' },
    { c: 'Uvalde', county: 'Uvalde' },
    { c: 'Victoria', county: 'Victoria' },
    { c: 'Lamesa', county: 'Dawson' },
    { c: 'Levelland', county: 'Hockley' },
    { c: 'Brownfield', county: 'Terry' },
    { c: 'Muleshoe', county: 'Bailey' },
    { c: 'Floydada', county: 'Floyd' },
    { c: 'Tulia', county: 'Swisher' },
    { c: 'Dimmitt', county: 'Castro' },
    { c: 'Pampa', county: 'Gray' },
    { c: 'Perryton', county: 'Ochiltree' },
    { c: 'Edinburg', county: 'Hidalgo' },
    { c: 'Mercedes', county: 'Hidalgo' },
    { c: 'Raymondville', county: 'Willacy' },
  ],
  oklahoma: [
    { c: 'Enid', county: 'Garfield' },
    { c: 'Woodward', county: 'Woodward' },
    { c: 'Altus', county: 'Jackson' },
    { c: 'Frederick', county: 'Tillman' },
    { c: 'Hobart', county: 'Kiowa' },
    { c: 'Stillwater', county: 'Payne' },
    { c: 'Ponca City', county: 'Kay' },
    { c: 'Guymon', county: 'Texas' },
    { c: 'Ardmore', county: 'Carter' },
    { c: 'Lawton', county: 'Comanche' },
    { c: 'Elk City', county: 'Beckham' },
    { c: 'Weatherford', county: 'Custer' },
  ],
  'new-mexico': [
    { c: 'Clovis', county: 'Curry' },
    { c: 'Portales', county: 'Roosevelt' },
    { c: 'Roswell', county: 'Chaves' },
    { c: 'Carlsbad', county: 'Eddy' },
    { c: 'Hatch', county: 'Doña Ana' },
    { c: 'Las Cruces', county: 'Doña Ana' },
    { c: 'Deming', county: 'Luna' },
    { c: 'Tucumcari', county: 'Quay' },
    { c: 'Hobbs', county: 'Lea' },
    { c: 'Artesia', county: 'Eddy' },
    { c: 'Lovington', county: 'Lea' },
  ],
  mississippi: [
    { c: 'Cleveland', county: 'Bolivar' },
    { c: 'Indianola', county: 'Sunflower' },
    { c: 'Greenwood', county: 'Leflore' },
    { c: 'Clarksdale', county: 'Coahoma' },
    { c: 'Grenada', county: 'Grenada' },
    { c: 'Yazoo City', county: 'Yazoo' },
    { c: 'Tunica', county: 'Tunica' },
    { c: 'Belzoni', county: 'Humphreys' },
    { c: 'Rolling Fork', county: 'Sharkey' },
    { c: 'Drew', county: 'Sunflower' },
    { c: 'Ruleville', county: 'Sunflower' },
    { c: 'Hollandale', county: 'Washington' },
  ],
  arkansas: [
    { c: 'Stuttgart', county: 'Arkansas' },
    { c: 'Jonesboro', county: 'Craighead' },
    { c: 'Pine Bluff', county: 'Jefferson' },
    { c: 'Forrest City', county: 'St. Francis' },
    { c: 'Helena-West Helena', county: 'Phillips' },
    { c: 'Brinkley', county: 'Monroe' },
    { c: 'McGehee', county: 'Desha' },
    { c: 'Dumas', county: 'Desha' },
    { c: 'Wynne', county: 'Cross' },
    { c: 'Marianna', county: 'Lee' },
    { c: 'DeWitt', county: 'Arkansas' },
    { c: 'Hazen', county: 'Prairie' },
  ],
  louisiana: [
    { c: 'Crowley', county: 'Acadia Parish' },
    { c: 'Rayville', county: 'Richland Parish' },
    { c: 'Tallulah', county: 'Madison Parish' },
    { c: 'Winnsboro', county: 'Franklin Parish' },
    { c: 'Bunkie', county: 'Avoyelles Parish' },
    { c: 'Marksville', county: 'Avoyelles Parish' },
    { c: 'Opelousas', county: 'St. Landry Parish' },
    { c: 'Lake Providence', county: 'East Carroll Parish' },
    { c: 'Jonesville', county: 'Catahoula Parish' },
    { c: 'New Iberia', county: 'Iberia Parish' },
    { c: 'Eunice', county: 'St. Landry Parish' },
  ],
  tennessee: [
    { c: 'Dyersburg', county: 'Dyer' },
    { c: 'Union City', county: 'Obion' },
    { c: 'Brownsville', county: 'Haywood' },
    { c: 'Ripley', county: 'Lauderdale' },
    { c: 'Humboldt', county: 'Gibson' },
    { c: 'Tiptonville', county: 'Lake' },
    { c: 'Trenton', county: 'Gibson' },
    { c: 'Martin', county: 'Weakley' },
    { c: 'Lexington', county: 'Henderson' },
    { c: 'Jackson', county: 'Madison' },
    { c: 'Covington', county: 'Tipton' },
  ],
  alabama: [
    { c: 'Cullman', county: 'Cullman' },
    { c: 'Decatur', county: 'Morgan' },
    { c: 'Athens', county: 'Limestone' },
    { c: 'Tuscumbia', county: 'Colbert' },
    { c: 'Florence', county: 'Lauderdale' },
    { c: 'Albertville', county: 'Marshall' },
    { c: 'Demopolis', county: 'Marengo' },
    { c: 'Selma', county: 'Dallas' },
    { c: 'Dothan', county: 'Houston' },
    { c: 'Enterprise', county: 'Coffee' },
    { c: 'Ozark', county: 'Dale' },
    { c: 'Headland', county: 'Henry' },
  ],
  georgia: [
    { c: 'Tifton', county: 'Tift' },
    { c: 'Moultrie', county: 'Colquitt' },
    { c: 'Cordele', county: 'Crisp' },
    { c: 'Bainbridge', county: 'Decatur' },
    { c: 'Vidalia', county: 'Toombs' },
    { c: 'Camilla', county: 'Mitchell' },
    { c: 'Donalsonville', county: 'Seminole' },
    { c: 'Sylvester', county: 'Worth' },
    { c: 'Adel', county: 'Cook' },
    { c: 'Quitman', county: 'Brooks' },
    { c: 'Ashburn', county: 'Turner' },
    { c: 'Pelham', county: 'Mitchell' },
    { c: 'Dawson', county: 'Terrell' },
  ],
  florida: [
    { c: 'Plant City', county: 'Hillsborough' },
    { c: 'Immokalee', county: 'Collier' },
    { c: 'Belle Glade', county: 'Palm Beach' },
    { c: 'Wauchula', county: 'Hardee' },
    { c: 'Homestead', county: 'Miami-Dade' },
    { c: 'Lake Wales', county: 'Polk' },
    { c: 'Lake Placid', county: 'Highlands' },
    { c: 'Arcadia', county: 'DeSoto' },
    { c: 'Pahokee', county: 'Palm Beach' },
    { c: 'Florida City', county: 'Miami-Dade' },
    { c: 'Bowling Green', county: 'Hardee' },
    { c: 'Zolfo Springs', county: 'Hardee' },
    { c: 'LaBelle', county: 'Hendry' },
    { c: 'Clewiston', county: 'Hendry' },
  ],
  'south-carolina': [
    { c: 'Florence', county: 'Florence' },
    { c: 'Sumter', county: 'Sumter' },
    { c: 'Orangeburg', county: 'Orangeburg' },
    { c: 'Bamberg', county: 'Bamberg' },
    { c: 'Bishopville', county: 'Lee' },
    { c: 'Walterboro', county: 'Colleton' },
    { c: 'Marion', county: 'Marion' },
    { c: 'Hartsville', county: 'Darlington' },
    { c: 'Allendale', county: 'Allendale' },
    { c: 'Manning', county: 'Clarendon' },
    { c: 'Kingstree', county: 'Williamsburg' },
  ],
  'north-carolina': [
    { c: 'Goldsboro', county: 'Wayne' },
    { c: 'Kinston', county: 'Lenoir' },
    { c: 'Wilson', county: 'Wilson' },
    { c: 'Rocky Mount', county: 'Nash' },
    { c: 'Tarboro', county: 'Edgecombe' },
    { c: 'Williamston', county: 'Martin' },
    { c: 'Edenton', county: 'Chowan' },
    { c: 'Smithfield', county: 'Johnston' },
    { c: 'Clinton', county: 'Sampson' },
    { c: 'Plymouth', county: 'Washington' },
    { c: 'Elizabeth City', county: 'Pasquotank' },
    { c: 'Roanoke Rapids', county: 'Halifax' },
    { c: 'Whiteville', county: 'Columbus' },
  ],
  virginia: [
    { c: 'Suffolk', county: 'Suffolk' },
    { c: 'Tappahannock', county: 'Essex' },
    { c: 'Warsaw', county: 'Richmond' },
    { c: 'Onancock', county: 'Accomack' },
    { c: 'Chase City', county: 'Mecklenburg' },
    { c: 'South Hill', county: 'Mecklenburg' },
    { c: 'Emporia', county: 'Greensville' },
    { c: 'Bowling Green', county: 'Caroline' },
    { c: 'Halifax', county: 'Halifax' },
    { c: 'Lawrenceville', county: 'Brunswick' },
    { c: 'Smithfield', county: 'Isle of Wight' },
  ],
  'west-virginia': [
    { c: 'Moorefield', county: 'Hardy' },
    { c: 'Petersburg', county: 'Grant' },
    { c: 'Romney', county: 'Hampshire' },
    { c: 'Lewisburg', county: 'Greenbrier' },
    { c: 'Buckhannon', county: 'Upshur' },
    { c: 'Elkins', county: 'Randolph' },
    { c: 'Martinsburg', county: 'Berkeley' },
    { c: 'Charles Town', county: 'Jefferson' },
    { c: 'Keyser', county: 'Mineral' },
    { c: 'Franklin', county: 'Pendleton' },
  ],
  kentucky: [
    { c: 'Hopkinsville', county: 'Christian' },
    { c: 'Owensboro', county: 'Daviess' },
    { c: 'Henderson', county: 'Henderson' },
    { c: 'Mayfield', county: 'Graves' },
    { c: 'Madisonville', county: 'Hopkins' },
    { c: 'Russellville', county: 'Logan' },
    { c: 'Murray', county: 'Calloway' },
    { c: 'Princeton', county: 'Caldwell' },
    { c: 'Cadiz', county: 'Trigg' },
    { c: 'Elizabethtown', county: 'Hardin' },
    { c: 'Bardstown', county: 'Nelson' },
    { c: 'Paris', county: 'Bourbon' },
  ],
  california: [
    { c: 'Salinas', county: 'Monterey' },
    { c: 'Fresno', county: 'Fresno' },
    { c: 'Bakersfield', county: 'Kern' },
    { c: 'Modesto', county: 'Stanislaus' },
    { c: 'Stockton', county: 'San Joaquin' },
    { c: 'Visalia', county: 'Tulare' },
    { c: 'Tulare', county: 'Tulare' },
    { c: 'Hanford', county: 'Kings' },
    { c: 'Merced', county: 'Merced' },
    { c: 'Madera', county: 'Madera' },
    { c: 'Yuba City', county: 'Sutter' },
    { c: 'El Centro', county: 'Imperial' },
    { c: 'Brawley', county: 'Imperial' },
    { c: 'Watsonville', county: 'Santa Cruz' },
    { c: 'Santa Maria', county: 'Santa Barbara' },
    { c: 'Lompoc', county: 'Santa Barbara' },
    { c: 'Oxnard', county: 'Ventura' },
    { c: 'Calexico', county: 'Imperial' },
    { c: 'Lodi', county: 'San Joaquin' },
    { c: 'Wasco', county: 'Kern' },
    { c: 'Delano', county: 'Kern' },
    { c: 'Arvin', county: 'Kern' },
    { c: 'Coalinga', county: 'Fresno' },
    { c: 'Mendota', county: 'Fresno' },
    { c: 'Reedley', county: 'Fresno' },
  ],
  washington: [
    { c: 'Pasco', county: 'Franklin' },
    { c: 'Yakima', county: 'Yakima' },
    { c: 'Wenatchee', county: 'Chelan' },
    { c: 'Moses Lake', county: 'Grant' },
    { c: 'Quincy', county: 'Grant' },
    { c: 'Othello', county: 'Adams' },
    { c: 'Walla Walla', county: 'Walla Walla' },
    { c: 'Sunnyside', county: 'Yakima' },
    { c: 'Prosser', county: 'Benton' },
    { c: 'Mount Vernon', county: 'Skagit' },
    { c: 'Connell', county: 'Franklin' },
    { c: 'Royal City', county: 'Grant' },
  ],
  oregon: [
    { c: 'Hermiston', county: 'Umatilla' },
    { c: 'Pendleton', county: 'Umatilla' },
    { c: 'Ontario', county: 'Malheur' },
    { c: 'Klamath Falls', county: 'Klamath' },
    { c: 'Madras', county: 'Jefferson' },
    { c: 'Hood River', county: 'Hood River' },
    { c: 'Salem', county: 'Marion' },
    { c: 'Albany', county: 'Linn' },
    { c: 'Corvallis', county: 'Benton' },
    { c: 'Milton-Freewater', county: 'Umatilla' },
    { c: 'Boardman', county: 'Morrow' },
    { c: 'Nyssa', county: 'Malheur' },
  ],
  idaho: [
    { c: 'Twin Falls', county: 'Twin Falls' },
    { c: 'Burley', county: 'Cassia' },
    { c: 'Rupert', county: 'Minidoka' },
    { c: 'Idaho Falls', county: 'Bonneville' },
    { c: 'Pocatello', county: 'Bannock' },
    { c: 'Caldwell', county: 'Canyon' },
    { c: 'Nampa', county: 'Canyon' },
    { c: 'Jerome', county: 'Jerome' },
    { c: 'Blackfoot', county: 'Bingham' },
    { c: 'Preston', county: 'Franklin' },
    { c: 'American Falls', county: 'Power' },
    { c: 'Buhl', county: 'Twin Falls' },
  ],
  nevada: [
    { c: 'Fallon', county: 'Churchill' },
    { c: 'Lovelock', county: 'Pershing' },
    { c: 'Winnemucca', county: 'Humboldt' },
    { c: 'Yerington', county: 'Lyon' },
    { c: 'Fernley', county: 'Lyon' },
    { c: 'Elko', county: 'Elko' },
    { c: 'Pahrump', county: 'Nye' },
  ],
  utah: [
    { c: 'Logan', county: 'Cache' },
    { c: 'Tremonton', county: 'Box Elder' },
    { c: 'Brigham City', county: 'Box Elder' },
    { c: 'Delta', county: 'Millard' },
    { c: 'Richfield', county: 'Sevier' },
    { c: 'Vernal', county: 'Uintah' },
    { c: 'Roosevelt', county: 'Duchesne' },
    { c: 'Cedar City', county: 'Iron' },
    { c: 'Tooele', county: 'Tooele' },
    { c: 'Spanish Fork', county: 'Utah' },
  ],
  arizona: [
    { c: 'Yuma', county: 'Yuma' },
    { c: 'Casa Grande', county: 'Pinal' },
    { c: 'Maricopa', county: 'Pinal' },
    { c: 'Buckeye', county: 'Maricopa' },
    { c: 'Eloy', county: 'Pinal' },
    { c: 'Marana', county: 'Pima' },
    { c: 'Willcox', county: 'Cochise' },
    { c: 'Safford', county: 'Graham' },
    { c: 'Cottonwood', county: 'Yavapai' },
    { c: 'Camp Verde', county: 'Yavapai' },
    { c: 'Somerton', county: 'Yuma' },
  ],
  michigan: [
    { c: 'Saginaw', county: 'Saginaw' },
    { c: 'Hart', county: 'Oceana' },
    { c: 'Hartford', county: 'Van Buren' },
    { c: 'Sturgis', county: 'St. Joseph' },
    { c: 'Coldwater', county: 'Branch' },
    { c: 'Cassopolis', county: 'Cass' },
    { c: 'Caro', county: 'Tuscola' },
    { c: 'Ithaca', county: 'Gratiot' },
    { c: 'Bad Axe', county: 'Huron' },
    { c: 'Sandusky', county: 'Sanilac' },
    { c: 'Allegan', county: 'Allegan' },
    { c: 'Paw Paw', county: 'Van Buren' },
    { c: 'Traverse City', county: 'Grand Traverse' },
  ],
  wisconsin: [
    { c: 'Wausau', county: 'Marathon' },
    { c: 'Marshfield', county: 'Wood' },
    { c: 'Stevens Point', county: 'Portage' },
    { c: 'Plover', county: 'Portage' },
    { c: 'Fond du Lac', county: 'Fond du Lac' },
    { c: 'Sheboygan', county: 'Sheboygan' },
    { c: 'Manitowoc', county: 'Manitowoc' },
    { c: 'Eau Claire', county: 'Eau Claire' },
    { c: 'Janesville', county: 'Rock' },
    { c: 'Beloit', county: 'Rock' },
    { c: 'Antigo', county: 'Langlade' },
    { c: 'Reedsburg', county: 'Sauk' },
  ],
  pennsylvania: [
    { c: 'Lancaster', county: 'Lancaster' },
    { c: 'Lebanon', county: 'Lebanon' },
    { c: 'Chambersburg', county: 'Franklin' },
    { c: 'York', county: 'York' },
    { c: 'Gettysburg', county: 'Adams' },
    { c: 'Carlisle', county: 'Cumberland' },
    { c: 'Hanover', county: 'York' },
    { c: 'Bedford', county: 'Bedford' },
    { c: 'Honesdale', county: 'Wayne' },
    { c: 'Bloomsburg', county: 'Columbia' },
    { c: 'Lewisburg', county: 'Union' },
    { c: 'Mifflinburg', county: 'Union' },
    { c: 'New Holland', county: 'Lancaster' },
  ],
  'new-york': [
    { c: 'Geneva', county: 'Ontario' },
    { c: 'Canandaigua', county: 'Ontario' },
    { c: 'Penn Yan', county: 'Yates' },
    { c: 'Lockport', county: 'Niagara' },
    { c: 'Batavia', county: 'Genesee' },
    { c: 'Warsaw', county: 'Wyoming' },
    { c: 'Cooperstown', county: 'Otsego' },
    { c: 'Watertown', county: 'Jefferson' },
    { c: 'Auburn', county: 'Cayuga' },
    { c: 'Cobleskill', county: 'Schoharie' },
    { c: 'Lyons', county: 'Wayne' },
    { c: 'Newark', county: 'Wayne' },
    { c: 'Albion', county: 'Orleans' },
    { c: 'Medina', county: 'Orleans' },
  ],
  maryland: [
    { c: 'Salisbury', county: 'Wicomico' },
    { c: 'Easton', county: 'Talbot' },
    { c: 'Cambridge', county: 'Dorchester' },
    { c: 'Denton', county: 'Caroline' },
    { c: 'Princess Anne', county: 'Somerset' },
    { c: 'Centreville', county: 'Queen Anne’s' },
    { c: 'Chestertown', county: 'Kent' },
    { c: 'Federalsburg', county: 'Caroline' },
    { c: 'Pocomoke City', county: 'Worcester' },
    { c: 'Snow Hill', county: 'Worcester' },
    { c: 'Hurlock', county: 'Dorchester' },
  ],
  'new-jersey': [
    { c: 'Vineland', county: 'Cumberland' },
    { c: 'Bridgeton', county: 'Cumberland' },
    { c: 'Hammonton', county: 'Atlantic' },
    { c: 'Salem', county: 'Salem' },
    { c: 'Glassboro', county: 'Gloucester' },
    { c: 'Woodstown', county: 'Salem' },
    { c: 'Pennsville', county: 'Salem' },
    { c: 'Millville', county: 'Cumberland' },
    { c: 'Pemberton', county: 'Burlington' },
  ],
  connecticut: [
    { c: 'Storrs', county: 'Tolland' },
    { c: 'Suffield', county: 'Hartford' },
    { c: 'Lebanon', county: 'New London' },
    { c: 'Windsor', county: 'Hartford' },
    { c: 'East Windsor', county: 'Hartford' },
    { c: 'Ellington', county: 'Tolland' },
    { c: 'Tolland', county: 'Tolland' },
    { c: 'Litchfield', county: 'Litchfield' },
    { c: 'Pomfret', county: 'Windham' },
    { c: 'Woodbury', county: 'Litchfield' },
  ],
  delaware: [
    { c: 'Dover', county: 'Kent' },
    { c: 'Harrington', county: 'Kent' },
    { c: 'Milford', county: 'Sussex' },
    { c: 'Georgetown', county: 'Sussex' },
    { c: 'Seaford', county: 'Sussex' },
    { c: 'Bridgeville', county: 'Sussex' },
    { c: 'Laurel', county: 'Sussex' },
    { c: 'Smyrna', county: 'Kent' },
    { c: 'Greenwood', county: 'Sussex' },
  ],
  'rhode-island': [
    { c: 'Foster', county: 'Providence' },
    { c: 'Burrillville', county: 'Providence' },
    { c: 'Tiverton', county: 'Newport' },
    { c: 'Little Compton', county: 'Newport' },
    { c: 'Glocester', county: 'Providence' },
    { c: 'Exeter', county: 'Washington' },
    { c: 'Charlestown', county: 'Washington' },
    { c: 'Hopkinton', county: 'Washington' },
  ],
  massachusetts: [
    { c: 'Hadley', county: 'Hampshire' },
    { c: 'Hatfield', county: 'Hampshire' },
    { c: 'Deerfield', county: 'Franklin' },
    { c: 'Sunderland', county: 'Franklin' },
    { c: 'Greenfield', county: 'Franklin' },
    { c: 'Northampton', county: 'Hampshire' },
    { c: 'Pittsfield', county: 'Berkshire' },
    { c: 'Carver', county: 'Plymouth' },
    { c: 'Westport', county: 'Bristol' },
  ],
  vermont: [
    { c: 'St. Albans', county: 'Franklin' },
    { c: 'Newport', county: 'Orleans' },
    { c: 'Middlebury', county: 'Addison' },
    { c: 'Vergennes', county: 'Addison' },
    { c: 'Brandon', county: 'Rutland' },
    { c: 'Rutland', county: 'Rutland' },
    { c: 'Bennington', county: 'Bennington' },
    { c: 'St. Johnsbury', county: 'Caledonia' },
    { c: 'Lyndonville', county: 'Caledonia' },
    { c: 'Enosburg Falls', county: 'Franklin' },
  ],
  'new-hampshire': [
    { c: 'Lancaster', county: 'Coos' },
    { c: 'Conway', county: 'Carroll' },
    { c: 'Plymouth', county: 'Grafton' },
    { c: 'Lebanon', county: 'Grafton' },
    { c: 'Keene', county: 'Cheshire' },
    { c: 'Walpole', county: 'Cheshire' },
    { c: 'Rochester', county: 'Strafford' },
    { c: 'Hillsboro', county: 'Hillsborough' },
    { c: 'Peterborough', county: 'Hillsborough' },
  ],
  maine: [
    { c: 'Caribou', county: 'Aroostook' },
    { c: 'Presque Isle', county: 'Aroostook' },
    { c: 'Houlton', county: 'Aroostook' },
    { c: 'Fort Fairfield', county: 'Aroostook' },
    { c: 'Madawaska', county: 'Aroostook' },
    { c: 'Fort Kent', county: 'Aroostook' },
    { c: 'Skowhegan', county: 'Somerset' },
    { c: 'Waterville', county: 'Kennebec' },
    { c: 'Augusta', county: 'Kennebec' },
    { c: 'Newport', county: 'Penobscot' },
  ],
  alaska: [
    { c: 'Palmer', county: 'Matanuska-Susitna Borough' },
    { c: 'Wasilla', county: 'Matanuska-Susitna Borough' },
    { c: 'Delta Junction', county: 'Southeast Fairbanks' },
    { c: 'Fairbanks', county: 'Fairbanks North Star Borough' },
    { c: 'Homer', county: 'Kenai Peninsula Borough' },
    { c: 'Soldotna', county: 'Kenai Peninsula Borough' },
    { c: 'Big Lake', county: 'Matanuska-Susitna Borough' },
  ],
  hawaii: [
    { c: 'Hilo', county: 'Hawaii' },
    { c: 'Waimea', county: 'Hawaii' },
    { c: 'Kahului', county: 'Maui' },
    { c: 'Wailuku', county: 'Maui' },
    { c: 'Lihue', county: 'Kauai' },
    { c: 'Kapaa', county: 'Kauai' },
    { c: 'Kailua-Kona', county: 'Hawaii' },
    { c: 'Honokaa', county: 'Hawaii' },
  ],
};

// ---------- 5. Build city universe ----------
const ops = parseOperators();
const states = parseStates();
const stateBySlug = new Map(states.map((s) => [s.slug, s]));

// Sort all operators alphabetically (by name) for the dedupe list output
const opsAlphabetical = [...ops].sort((a, b) => a.name.localeCompare(b.name));

// Build map: state__cityslug -> { city, state, county?, operators: [names], operator_count }
const cityMap = new Map();

const STATE_NAMES_LOWER = new Set(states.map((s) => s.name.toLowerCase()));
function isValidCityName(city, stateSlug) {
  const trimmed = (city || '').trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  const slug = citySlug(trimmed);
  if (!slug) return false;
  if (RESERVED_CHILD_SLUGS.has(slug)) return false;
  if (DIRECTIONAL_OR_STATEWIDE.has(lower)) return false;
  if (STATE_NAMES_LOWER.has(lower)) return false;
  if (slug === stateSlug) return false;
  return true;
}

function addCity({ city, stateSlug, county }) {
  const stateRow = stateBySlug.get(stateSlug);
  if (!stateRow) return null;
  if (!isValidCityName(city, stateSlug)) return null;
  const slug = citySlug(city);
  if (!slug) return null;
  const key = stateSlug + '__' + slug;
  if (!cityMap.has(key)) {
    cityMap.set(key, {
      city: city.trim(),
      slug,
      stateSlug,
      stateName: stateRow.name,
      stateCropAcres: stateRow.cropAcres,
      stateRegion: stateRow.region,
      county: county || '',
      operatorNames: [],
      operatorCount: 0,
      isCurated: false,
      isOperatorCity: false,
    });
  }
  return cityMap.get(key);
}

// Add operator cities first
for (const op of ops) {
  if (!op.city || !op.homeState) continue;
  const row = addCity({ city: op.city, stateSlug: op.homeState });
  if (!row) continue;
  row.isOperatorCity = true;
  row.operatorNames.push(op.name);
  row.operatorCount++;
}

// Add curated ag-hub cities (won't override operator-derived rows that already exist)
for (const [stateSlug, list] of Object.entries(CURATED)) {
  for (const entry of list) {
    const row = addCity({ city: entry.c, stateSlug, county: entry.county });
    if (!row) continue;
    row.isCurated = true;
    if (!row.county && entry.county) row.county = entry.county;
  }
}

const allCities = [...cityMap.values()];

// ---------- 6. Compute ag_score ----------
// Without USDA county-level data, score uses:
//   state cropland (from counties.ts)        weight 0.5
//   operator coverage signal (count, capped) weight 0.3
//   curated ag-hub flag                      weight 0.2
function normalize(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return (v) => (v - min) / span;
}

const stateNorm = normalize(allCities.map((c) => c.stateCropAcres));
// Operator-count signal: use sqrt to avoid overweighting hub cities
const opSignal = (n) => Math.sqrt(n);
const opNorm = normalize(allCities.map((c) => opSignal(c.operatorCount)));
const hubNorm = (isCurated) => (isCurated ? 1 : 0);

for (const c of allCities) {
  c.agScore = +(
    stateNorm(c.stateCropAcres) * 0.5 +
    opNorm(opSignal(c.operatorCount)) * 0.3 +
    hubNorm(c.isCurated) * 0.2
  ).toFixed(4);
  c.coverageStatus =
    c.operatorCount >= 3 ? 'covered_well' : c.operatorCount >= 1 ? 'light' : 'gap';
  c.inDirectory = c.operatorCount >= 2; // CITY_OPERATOR_THRESHOLD in cities.ts
}

allCities.sort((a, b) => b.agScore - a.agScore || b.operatorCount - a.operatorCount);
allCities.forEach((c, i) => (c.rank = i + 1));

// ---------- 7. Write FILE 1: master-cities-ranked.csv ----------
function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
const HEAD = [
  'rank',
  'city',
  'state',
  'state_slug',
  'city_slug',
  'county',
  'cropland_acres',
  'farm_count',
  'ag_receipts_usd',
  'state_cropland_acres',
  'ag_score',
  'existing_operator_count',
  'coverage_status',
  'in_directory',
];
const csvRows = [HEAD.join(',')];
for (const c of allCities) {
  csvRows.push(
    [
      c.rank,
      csvEscape(c.city),
      csvEscape(c.stateName),
      c.stateSlug,
      c.slug,
      csvEscape(c.county),
      '', // cropland_acres (USDA county) — not fetched
      '', // farm_count                — not fetched
      '', // ag_receipts_usd           — not fetched
      c.stateCropAcres,
      c.agScore,
      c.operatorCount,
      c.coverageStatus,
      c.inDirectory ? 'true' : 'false',
    ].join(','),
  );
}
fs.writeFileSync(path.join(OUT_DIR, 'master-cities-ranked.csv'), csvRows.join('\n') + '\n');

// ---------- 8. Write FILE 2: priority-batches.md ----------
const gapOrLight = allCities.filter((c) => c.coverageStatus === 'gap' || c.coverageStatus === 'light');
const top200 = gapOrLight.slice(0, 200);

// Organize into 8 batches of 25, sorted by agScore desc (already sorted).
const batches = [];
for (let i = 0; i < 8; i++) batches.push(top200.slice(i * 25, (i + 1) * 25));

function batchTheme(rows) {
  const stateCounts = new Map();
  const regionCounts = new Map();
  for (const r of rows) {
    stateCounts.set(r.stateName, (stateCounts.get(r.stateName) || 0) + 1);
    regionCounts.set(r.stateRegion, (regionCounts.get(r.stateRegion) || 0) + 1);
  }
  const topStates = [...stateCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topRegions = [...regionCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
  return {
    states: topStates.map(([n, c]) => `${n} (${c})`).join(', '),
    regions: topRegions.map(([n, c]) => `${n} (${c})`).join(', '),
  };
}

const md = [];
md.push('# Operator research priority batches');
md.push('');
md.push('Top **200** gap/light-coverage cities (`coverage_status` = gap or light) split into 8');
md.push('research batches of 25 cities each. Batches are ordered by combined `ag_score` so');
md.push('Batch 1 holds the highest-priority targets.');
md.push('');
md.push('**Coverage definitions**');
md.push('- `gap` — 0 operators currently cover this city (page does not exist).');
md.push('- `light` — 1–2 operators (below the 2-operator publish threshold or only just at it).');
md.push('- `covered_well` — 3 or more operators (already publishing, excluded from this list).');
md.push('');
md.push('**Data caveat:** county-level USDA NASS Quick Stats (`cropland_acres`, `farm_count`,');
md.push('`ag_receipts_usd`) could not be pulled in this build (no network), so `ag_score` here');
md.push('is a proxy from state-level cropland (`src/data/counties.ts`), operator coverage');
md.push('signal, and a curated top-ag-hub flag. Re-run the build script with NASS access to');
md.push('replace the proxy with true county-level metrics.');
md.push('');

function batchRationale(rows) {
  const stateCounts = new Map();
  const regionCounts = new Map();
  for (const r of rows) {
    stateCounts.set(r.stateName, (stateCounts.get(r.stateName) || 0) + 1);
    regionCounts.set(r.stateRegion, (regionCounts.get(r.stateRegion) || 0) + 1);
  }
  const dominantState = [...stateCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const dominantRegion = [...regionCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const gapCount = rows.filter((r) => r.coverageStatus === 'gap').length;
  const lightCount = rows.length - gapCount;
  const focus =
    dominantState[1] >= 15
      ? `${dominantState[0]} concentration (${dominantState[0]} ${dominantRegion[0].toLowerCase()})`
      : `${dominantRegion[0]} cluster — ${dominantState[0]} leads (${dominantState[1]} cities)`;
  return `${focus}; ${gapCount} gap and ${lightCount} light-coverage cities to research and seed.`;
}

batches.forEach((batch, idx) => {
  const themes = batchTheme(batch);
  const minScore = batch[batch.length - 1]?.agScore ?? 0;
  const maxScore = batch[0]?.agScore ?? 0;
  md.push(`## Batch ${idx + 1}`);
  md.push('');
  md.push(`**Score range:** ${minScore.toFixed(3)} – ${maxScore.toFixed(3)}  `);
  md.push(`**Top states:** ${themes.states}  `);
  md.push(`**Regions:** ${themes.regions}  `);
  md.push(`**Why prioritized:** ${batchRationale(batch)}`);
  md.push('');
  md.push('| # | City | State | County | Ag score | Existing ops | Status |');
  md.push('|---|---|---|---|---|---|---|');
  batch.forEach((c, i) => {
    md.push(
      `| ${i + 1} | ${c.city} | ${c.stateName} | ${c.county || '—'} | ${c.agScore.toFixed(3)} | ${c.operatorCount} | ${c.coverageStatus} |`,
    );
  });
  md.push('');
});

fs.writeFileSync(path.join(OUT_DIR, 'priority-batches.md'), md.join('\n') + '\n');

// ---------- 9. Write FILE 3: existing-operators-name-list.txt ----------
const dedupeRows = opsAlphabetical
  .map((o) => {
    const stateRow = stateBySlug.get(o.homeState);
    const stateName = stateRow ? stateRow.name : o.homeState;
    return `${o.name} | ${o.city}, ${stateName}`;
  })
  .sort((a, b) => a.localeCompare(b));
fs.writeFileSync(path.join(OUT_DIR, 'existing-operators-name-list.txt'), dedupeRows.join('\n') + '\n');

// ---------- 10. Print summary stats ----------
const coveredWell = allCities.filter((c) => c.coverageStatus === 'covered_well');
const light = allCities.filter((c) => c.coverageStatus === 'light');
const gap = allCities.filter((c) => c.coverageStatus === 'gap');

console.log('=== Build summary ===');
console.log('Total cities ranked:', allCities.length);
console.log('  covered_well (3+ ops):', coveredWell.length);
console.log('  light (1–2 ops)     :', light.length);
console.log('  gap (0 ops)         :', gap.length);
console.log('  in_directory (2+)   :', allCities.filter((c) => c.inDirectory).length);
console.log('');
console.log('Top 10 by ag_score:');
allCities.slice(0, 10).forEach((c) =>
  console.log(`  ${c.rank}. ${c.city}, ${c.stateName} — score ${c.agScore} — ${c.operatorCount} ops (${c.coverageStatus})`),
);
console.log('');

// Top 5 priority states by gap-city volume (gap status only; weighted by state cropland to break ties)
const stateGapCounts = new Map();
for (const c of gap) {
  if (!stateGapCounts.has(c.stateName)) stateGapCounts.set(c.stateName, { count: 0, crop: c.stateCropAcres });
  stateGapCounts.get(c.stateName).count++;
}
const topGapStates = [...stateGapCounts.entries()]
  .sort((a, b) => b[1].count - a[1].count || b[1].crop - a[1].crop)
  .slice(0, 5);
console.log('Top 5 priority states by gap-city volume:');
topGapStates.forEach(([s, info]) => console.log(`  ${s} — ${info.count} gap cities`));
console.log('');
console.log('Operators in dedupe list:', dedupeRows.length);
console.log('Wrote files to', OUT_DIR);
