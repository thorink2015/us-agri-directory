// ─── Seeded city anchors for /states/[slug]/[city] ───────────────────────
// Hand-curated list of ag-relevant US cities to lift the city-page index
// beyond the 23 operator-derived qualifying cities. Each entry anchors a
// real US city in a county with above-average cropland or pasture acreage,
// drawn from USDA Census of Agriculture county-level data and US Census
// Bureau Places gazetteer references. Cities without an existing operator
// in src/data/operators.ts still surface a state-level operator fallback,
// the broader state crop table, and a noindex gate for the weakest combos.
//
// Selection criteria:
// - Cap at 5 cities per state.
// - Prefer county seats of top cropland-acreage counties first, then large
//   cities sitting in heavy-ag counties.
// - Skip states with no defensible US ag base (Alaska, Hawaii, Nevada, RI,
//   DC) at low or zero counts.
// - Validate every entry against src/data/cities.ts isValidCityName().
//
// Data provenance: cities listed here are ag-relevant US municipalities
// known from primary references (USDA NASS county-level cropland and
// hay-acreage tables, university extension top-county lists, US Census
// Bureau Places gazetteer). County and population fields are best-effort
// from the same source set; mark "pending verification" or omit when
// uncertain rather than guess.
// ──────────────────────────────────────────────────────────────────────────

export interface SeedCity {
  /** Slug of the state (matches counties.ts slug). */
  stateSlug: string;
  /** Display name. Will be slugified by citySlug() for URL building. */
  name: string;
  /** County the city sits in. Used for E-E-A-T copy; safe to omit if uncertain. */
  county?: string;
  /** Census Bureau Places population estimate. Safe to omit if uncertain. */
  population?: number;
  /** Short ag-relevance note, used on the page where the city has zero operators. */
  agNote?: string;
}

export const seedCities: SeedCity[] = [
  // ─── IOWA ───
  { stateSlug: 'iowa', name: 'Ames', county: 'Story County', population: 66427, agNote: 'Home of Iowa State University and ISU Custom Rate Survey publication; central Iowa corn and soybean country.' },
  { stateSlug: 'iowa', name: 'Cedar Rapids', county: 'Linn County', population: 137710, agNote: 'Eastern Iowa hub for grain logistics and ADM/Cargill processing; surrounded by intensive corn-soybean rotation.' },
  { stateSlug: 'iowa', name: 'Davenport', county: 'Scott County', population: 101724, agNote: 'Mississippi River grain port; Quad Cities region anchors river-corridor row-crop production.' },
  { stateSlug: 'iowa', name: 'Mason City', county: 'Cerro Gordo County', population: 27444, agNote: 'North-central Iowa anchor for corn fungicide and cover crop programs in heavy CRP-bordering counties.' },
  { stateSlug: 'iowa', name: 'Ottumwa', county: 'Wapello County', population: 25023, agNote: 'Southeast Iowa center serving the Skunk and Des Moines River valleys; mixed corn, soybeans and pasture.' },

  // ─── ILLINOIS ───
  { stateSlug: 'illinois', name: 'Bloomington', county: 'McLean County', population: 78680, agNote: 'McLean County is one of the top corn-producing counties in the United States; Bloomington is the regional ag-services hub.' },
  { stateSlug: 'illinois', name: 'Decatur', county: 'Macon County', population: 68813, agNote: 'ADM headquarters and major soybean processing; Macon and Sangamon counties combine for very high cropland intensity.' },
  { stateSlug: 'illinois', name: 'Peoria', county: 'Peoria County', population: 113150, agNote: 'Caterpillar headquarters and Illinois River grain corridor; central Illinois corn and soybean basin.' },
  { stateSlug: 'illinois', name: 'Springfield', county: 'Sangamon County', population: 114394, agNote: 'State capital and central Illinois ag-services hub; Sangamon County corn and soybean acreage anchors regional drone demand.' },
  { stateSlug: 'illinois', name: 'Quincy', county: 'Adams County', population: 39463, agNote: 'Western Illinois Mississippi River region; mixed corn-soybean production with rolling-terrain acres that favour drone access.' },

  // ─── INDIANA ───
  { stateSlug: 'indiana', name: 'Lafayette', county: 'Tippecanoe County', population: 71135, agNote: 'Home of Purdue University; central Indiana corn and soybean country with strong land-grant extension presence.' },
  { stateSlug: 'indiana', name: 'Muncie', county: 'Delaware County', population: 65169, agNote: 'East-central Indiana corn and soybean hub; Ball State University region.' },
  { stateSlug: 'indiana', name: 'Terre Haute', county: 'Vigo County', population: 58389, agNote: 'Western Indiana on the Wabash River; Vigo and surrounding counties carry significant corn and soybean acreage.' },
  { stateSlug: 'indiana', name: 'Columbus', county: 'Bartholomew County', population: 50474, agNote: 'South-central Indiana ag and manufacturing hub; surrounding counties anchor row-crop production.' },
  { stateSlug: 'indiana', name: 'Kokomo', county: 'Howard County', population: 59515, agNote: 'North-central Indiana corn and soybean basin; Howard and Tipton counties report strong cropland concentration.' },

  // ─── OHIO ───
  { stateSlug: 'ohio', name: 'Findlay', county: 'Hancock County', population: 41202, agNote: 'Northwest Ohio Maumee River basin; Hancock, Wood and Henry counties carry the heaviest corn and soybean acreage in the state.' },
  { stateSlug: 'ohio', name: 'Lima', county: 'Allen County', population: 35579, agNote: 'Western Ohio hub serving Allen, Auglaize and Putnam counties; significant corn-soybean production.' },
  { stateSlug: 'ohio', name: 'Marion', county: 'Marion County', population: 35988, agNote: 'Central Ohio anchor for the corn-soybean rotation across Marion and Hardin counties.' },
  { stateSlug: 'ohio', name: 'Wooster', county: 'Wayne County', population: 27232, agNote: 'Home of Ohio State Agricultural Technical Institute (OSU/ATI); Wayne County is one of the top dairy and ag counties in Ohio.' },
  { stateSlug: 'ohio', name: 'Defiance', county: 'Defiance County', population: 16494, agNote: 'Northwest Ohio Maumee watershed; H2Ohio cover crop cost-share corridor with high drone adoption potential.' },

  // ─── MISSOURI ───
  { stateSlug: 'missouri', name: 'Columbia', county: 'Boone County', population: 126254, agNote: 'Home of University of Missouri and Mizzou Extension custom-rate publications; central Missouri ag-services hub.' },
  { stateSlug: 'missouri', name: 'Springfield', county: 'Greene County', population: 169176, agNote: 'Southwest Missouri ag center serving Greene, Christian and Webster counties; mixed pasture, beef and row-crop production.' },
  { stateSlug: 'missouri', name: 'Sikeston', county: 'Scott County', population: 16129, agNote: 'Missouri Bootheel Delta region; Scott, New Madrid and Pemiscot counties are the state\'s rice and cotton anchor.' },
  { stateSlug: 'missouri', name: 'Hannibal', county: 'Marion County', population: 17107, agNote: 'Northeast Missouri Mississippi River corridor; row-crop production with established custom-application history.' },
  { stateSlug: 'missouri', name: 'Marshall', county: 'Saline County', population: 12918, agNote: 'Saline County in the Missouri River bottomland; corn-soybean basin with strong custom rate market.' },

  // ─── MINNESOTA ───
  { stateSlug: 'minnesota', name: 'Mankato', county: 'Blue Earth County', population: 44488, agNote: 'South-central Minnesota corn and soybean basin; Blue Earth, Nicollet and Brown counties are top cropland producers.' },
  { stateSlug: 'minnesota', name: 'Rochester', county: 'Olmsted County', population: 121395, agNote: 'Southeast Minnesota anchor for cover crop seeding and dairy support; Olmsted and surrounding counties report significant cropland.' },
  { stateSlug: 'minnesota', name: 'Willmar', county: 'Kandiyohi County', population: 21366, agNote: 'West-central Minnesota; corn-soybean rotation plus strong sugar-beet production in adjacent counties.' },
  { stateSlug: 'minnesota', name: 'Marshall', county: 'Lyon County', population: 13680, agNote: 'Southwestern Minnesota corn and soybean hub; Lyon County is among the top cropland counties in the state.' },
  { stateSlug: 'minnesota', name: 'Worthington', county: 'Nobles County', population: 13947, agNote: 'Far southwest Minnesota; Nobles County carries dense corn-soybean acreage and a heavy livestock-feed corridor.' },

  // ─── WISCONSIN ───
  { stateSlug: 'wisconsin', name: 'Madison', county: 'Dane County', population: 269840, agNote: 'Home of UW-Madison and Wisconsin\'s land-grant ag extension; Dane County combines dairy, corn and forage acreage.' },
  { stateSlug: 'wisconsin', name: 'Eau Claire', county: 'Eau Claire County', population: 69421, agNote: 'West-central Wisconsin dairy and forage hub; Chippewa Valley region.' },
  { stateSlug: 'wisconsin', name: 'Wausau', county: 'Marathon County', population: 39994, agNote: 'Marathon County is the largest ginseng-producing county in the United States and a heavy dairy-forage region.' },
  { stateSlug: 'wisconsin', name: 'Stevens Point', county: 'Portage County', population: 25666, agNote: 'Central Wisconsin Sand Plains; concentrated potato, snap-bean and processing-vegetable production.' },
  { stateSlug: 'wisconsin', name: 'Fond du Lac', county: 'Fond du Lac County', population: 44678, agNote: 'East-central Wisconsin dairy belt; Fond du Lac and Dodge counties combine for high forage and corn silage acreage.' },

  // ─── KANSAS ───
  { stateSlug: 'kansas', name: 'Garden City', county: 'Finney County', population: 28151, agNote: 'Southwest Kansas High Plains; Finney County combines irrigated corn, milo, and large-scale beef feedyard ag.' },
  { stateSlug: 'kansas', name: 'Salina', county: 'Saline County', population: 46550, agNote: 'Central Kansas wheat and milo hub; Saline County and surrounding counties are top winter-wheat producers.' },
  { stateSlug: 'kansas', name: 'Manhattan', county: 'Riley County', population: 54100, agNote: 'Home of Kansas State University, K-State Extension, and the Kansas Wheat Quality Council.' },
  { stateSlug: 'kansas', name: 'Dodge City', county: 'Ford County', population: 27788, agNote: 'Southwest Kansas; Ford County anchors irrigated grain corn, milo and the largest US beef-packing concentration.' },
  { stateSlug: 'kansas', name: 'Liberal', county: 'Seward County', population: 19508, agNote: 'Southwest Kansas High Plains corn and milo basin; National Beef and Seaboard packing region.' },

  // ─── NEBRASKA ───
  { stateSlug: 'nebraska', name: 'Lincoln', county: 'Lancaster County', population: 291082, agNote: 'Home of University of Nebraska-Lincoln and UNL Extension; central Nebraska corn-soybean and beef hub.' },
  { stateSlug: 'nebraska', name: 'Grand Island', county: 'Hall County', population: 53131, agNote: 'Central Nebraska Platte River basin; Hall, Hamilton and Buffalo counties are top irrigated-corn counties.' },
  { stateSlug: 'nebraska', name: 'Kearney', county: 'Buffalo County', population: 33790, agNote: 'South-central Nebraska on the Platte; UNK and intensive irrigated corn production region.' },
  { stateSlug: 'nebraska', name: 'North Platte', county: 'Lincoln County', population: 23390, agNote: 'Western Nebraska; Lincoln County combines irrigated corn, range and significant wheat acreage.' },
  { stateSlug: 'nebraska', name: 'Norfolk', county: 'Madison County', population: 24846, agNote: 'Northeast Nebraska livestock and corn corridor; Madison and Stanton counties anchor regional production.' },

  // ─── NORTH DAKOTA ───
  { stateSlug: 'north-dakota', name: 'Fargo', county: 'Cass County', population: 125990, agNote: 'Cass County is one of the top wheat and soybean producing counties in the United States; Fargo anchors the Red River Valley.' },
  { stateSlug: 'north-dakota', name: 'Grand Forks', county: 'Grand Forks County', population: 59166, agNote: 'Northern Red River Valley; concentrated sugar-beet, wheat and soybean acreage.' },
  { stateSlug: 'north-dakota', name: 'Minot', county: 'Ward County', population: 47822, agNote: 'North-central North Dakota; Ward County wheat, canola and durum production.' },
  { stateSlug: 'north-dakota', name: 'Williston', county: 'Williams County', population: 29160, agNote: 'Western North Dakota Bakken region; Williams and McKenzie counties combine wheat, lentils and pulse-crop production.' },
  { stateSlug: 'north-dakota', name: 'Jamestown', county: 'Stutsman County', population: 15677, agNote: 'Central North Dakota wheat and soybean basin; Stutsman County is a top cropland producer.' },

  // ─── SOUTH DAKOTA ───
  { stateSlug: 'south-dakota', name: 'Sioux Falls', county: 'Minnehaha County', population: 196528, agNote: 'East-central South Dakota corn-soybean hub; Minnehaha and Lincoln counties anchor the state\'s row-crop production.' },
  { stateSlug: 'south-dakota', name: 'Brookings', county: 'Brookings County', population: 23938, agNote: 'Home of South Dakota State University and SDSU Extension; eastern South Dakota corn-soybean basin.' },
  { stateSlug: 'south-dakota', name: 'Aberdeen', county: 'Brown County', population: 28216, agNote: 'Northeast South Dakota wheat and soybean hub; Brown County is one of the top cropland counties in the state.' },
  { stateSlug: 'south-dakota', name: 'Watertown', county: 'Codington County', population: 22655, agNote: 'Northeast South Dakota glacial lakes corn-soybean region; Codington and Hamlin counties carry significant cropland.' },
  { stateSlug: 'south-dakota', name: 'Mitchell', county: 'Davison County', population: 15660, agNote: 'East-central South Dakota; Davison and Hanson counties anchor regional row-crop production.' },

  // ─── TEXAS ───
  { stateSlug: 'texas', name: 'Lubbock', county: 'Lubbock County', population: 257141, agNote: 'High Plains cotton hub; Lubbock and surrounding counties are the top US cotton-producing region with major irrigated production.' },
  { stateSlug: 'texas', name: 'Amarillo', county: 'Potter County', population: 200393, agNote: 'Texas Panhandle ag center; surrounding counties anchor irrigated corn, sorghum, wheat and beef cattle.' },
  { stateSlug: 'texas', name: 'College Station', county: 'Brazos County', population: 120511, agNote: 'Home of Texas A&M University and AgriLife Extension; central Texas ag research and services hub.' },
  { stateSlug: 'texas', name: 'Plainview', county: 'Hale County', population: 19793, agNote: 'Texas High Plains cotton and corn region; Hale County is consistently among the top US cotton-producing counties.' },
  { stateSlug: 'texas', name: 'Corpus Christi', county: 'Nueces County', population: 317863, agNote: 'South Texas Coastal Bend; cotton, sorghum and grain-corn production with significant aerial-application history.' },

  // ─── CALIFORNIA ───
  { stateSlug: 'california', name: 'Fresno', county: 'Fresno County', population: 542107, agNote: 'Fresno County is the highest-grossing ag county in the United States by farm receipts (USDA Census of Agriculture); central San Joaquin Valley.' },
  { stateSlug: 'california', name: 'Bakersfield', county: 'Kern County', population: 403455, agNote: 'Kern County is the second-largest ag county in the US by farm gate receipts; almonds, grapes, citrus and cotton.' },
  { stateSlug: 'california', name: 'Visalia', county: 'Tulare County', population: 141384, agNote: 'Tulare County is one of the top US ag counties; dairy, citrus, almonds and grapes anchor the production base.' },
  { stateSlug: 'california', name: 'Modesto', county: 'Stanislaus County', population: 217946, agNote: 'Northern San Joaquin Valley; almonds, walnuts, dairy and processing tomatoes drive Stanislaus County production.' },
  { stateSlug: 'california', name: 'Davis', county: 'Yolo County', population: 66850, agNote: 'Home of UC Davis and the UC Cooperative Extension network; central Sacramento Valley row-crop and orchard region.' },

  // ─── WASHINGTON ───
  { stateSlug: 'washington', name: 'Yakima', county: 'Yakima County', population: 96968, agNote: 'Yakima County is the top US apple-producing county; concentrated tree-fruit, hops and wine-grape production.' },
  { stateSlug: 'washington', name: 'Wenatchee', county: 'Chelan County', population: 35508, agNote: 'North-central Washington apple and pear country; the historical Apple Capital of the United States.' },
  { stateSlug: 'washington', name: 'Pasco', county: 'Franklin County', population: 80555, agNote: 'Tri-Cities region; Franklin and Benton counties anchor potato, sweet corn and wine-grape production.' },
  { stateSlug: 'washington', name: 'Walla Walla', county: 'Walla Walla County', population: 33927, agNote: 'Southeastern Washington wheat and wine country; Walla Walla AVA hosts substantial vineyard acreage.' },
  { stateSlug: 'washington', name: 'Pullman', county: 'Whitman County', population: 32508, agNote: 'Home of Washington State University and WSU Extension; Whitman County is the top US wheat-producing county by some measures.' },

  // ─── OREGON ───
  { stateSlug: 'oregon', name: 'Salem', county: 'Marion County', population: 175535, agNote: 'Willamette Valley state capital; Marion County is the top Oregon ag county by farm gate receipts.' },
  { stateSlug: 'oregon', name: 'Corvallis', county: 'Benton County', population: 59922, agNote: 'Home of Oregon State University and OSU Extension; central Willamette Valley grass-seed and specialty-crop region.' },
  { stateSlug: 'oregon', name: 'Hermiston', county: 'Umatilla County', population: 19975, agNote: 'Eastern Oregon Columbia Basin; Umatilla and Morrow counties anchor irrigated potato, alfalfa and onion production.' },
  { stateSlug: 'oregon', name: 'Hood River', county: 'Hood River County', population: 8240, agNote: 'Hood River County is one of the top US pear-producing counties; concentrated tree-fruit production.' },
  { stateSlug: 'oregon', name: 'Pendleton', county: 'Umatilla County', population: 17107, agNote: 'Northeast Oregon dryland wheat country; surrounding Umatilla County is among the top US wheat counties.' },

  // ─── IDAHO ───
  { stateSlug: 'idaho', name: 'Boise', county: 'Ada County', population: 235684, agNote: 'Idaho state capital and ag-services hub; Treasure Valley region anchors mixed irrigated production.' },
  { stateSlug: 'idaho', name: 'Idaho Falls', county: 'Bonneville County', population: 64818, agNote: 'Eastern Idaho Snake River Plain; Bonneville and Bingham counties anchor potato, malt-barley and sugar-beet production.' },
  { stateSlug: 'idaho', name: 'Twin Falls', county: 'Twin Falls County', population: 51807, agNote: 'Magic Valley region; Twin Falls and Jerome counties combine for heavy potato, dairy and sugar-beet production.' },
  { stateSlug: 'idaho', name: 'Burley', county: 'Cassia County', population: 11825, agNote: 'South-central Idaho potato, sugar-beet and dry-bean production; Cassia and Minidoka counties.' },
  { stateSlug: 'idaho', name: 'Rexburg', county: 'Madison County', population: 39409, agNote: 'Eastern Idaho Snake River Plain; potato, malt-barley and forage production.' },

  // ─── MONTANA ───
  { stateSlug: 'montana', name: 'Great Falls', county: 'Cascade County', population: 60442, agNote: 'North-central Montana wheat and pulse-crop hub; surrounding counties anchor dryland small-grain production.' },
  { stateSlug: 'montana', name: 'Bozeman', county: 'Gallatin County', population: 53293, agNote: 'Home of Montana State University and MSU Extension; Gallatin Valley wheat, malt-barley and forage region.' },
  { stateSlug: 'montana', name: 'Sidney', county: 'Richland County', population: 6358, agNote: 'Eastern Montana sugar-beet and small-grain hub; Richland County borders the North Dakota Bakken region.' },
  { stateSlug: 'montana', name: 'Havre', county: 'Hill County', population: 9362, agNote: 'Northern Montana Hi-Line wheat country; Hill County is among the top US winter-wheat counties.' },
  { stateSlug: 'montana', name: 'Glendive', county: 'Dawson County', population: 4873, agNote: 'Eastern Montana on the Yellowstone River; Dawson County anchors small-grain and pulse-crop production.' },

  // ─── COLORADO ───
  { stateSlug: 'colorado', name: 'Greeley', county: 'Weld County', population: 108795, agNote: 'Weld County is one of the top US cattle-feeding and dairy counties; surrounding northern Colorado anchors irrigated production.' },
  { stateSlug: 'colorado', name: 'Fort Collins', county: 'Larimer County', population: 169810, agNote: 'Home of Colorado State University and CSU Extension; northern Colorado Front Range ag-research hub.' },
  { stateSlug: 'colorado', name: 'Sterling', county: 'Logan County', population: 13834, agNote: 'Northeastern Colorado Plains; Logan, Sedgwick and Washington counties anchor dryland and irrigated corn and wheat.' },
  { stateSlug: 'colorado', name: 'Lamar', county: 'Prowers County', population: 7449, agNote: 'Southeast Colorado Arkansas Valley; concentrated wheat, milo and irrigated alfalfa production.' },
  { stateSlug: 'colorado', name: 'Pueblo', county: 'Pueblo County', population: 111876, agNote: 'Southern Colorado Arkansas Valley hub; surrounding counties anchor irrigated alfalfa, melon and chile production.' },

  // ─── OKLAHOMA ───
  { stateSlug: 'oklahoma', name: 'Stillwater', county: 'Payne County', population: 49502, agNote: 'Home of Oklahoma State University and OSU Extension; central Oklahoma wheat, beef and forage region.' },
  { stateSlug: 'oklahoma', name: 'Enid', county: 'Garfield County', population: 49379, agNote: 'Northern Oklahoma wheat country; Garfield County is among the top US winter-wheat producing counties.' },
  { stateSlug: 'oklahoma', name: 'Altus', county: 'Jackson County', population: 18729, agNote: 'Southwestern Oklahoma cotton and wheat hub; Jackson County is a top Oklahoma cotton-producing county.' },
  { stateSlug: 'oklahoma', name: 'Woodward', county: 'Woodward County', population: 12080, agNote: 'Northwestern Oklahoma Panhandle; wheat, milo and beef-cattle production.' },
  { stateSlug: 'oklahoma', name: 'Guymon', county: 'Texas County', population: 12961, agNote: 'Oklahoma Panhandle Texas County is a top US irrigated-corn and pork-production county.' },

  // ─── NEW MEXICO ───
  { stateSlug: 'new-mexico', name: 'Las Cruces', county: 'Doña Ana County', population: 111385, agNote: 'Southern New Mexico Mesilla Valley; pecans, cotton, chile and dairy production. Home of New Mexico State University.' },
  { stateSlug: 'new-mexico', name: 'Roswell', county: 'Chaves County', population: 48422, agNote: 'Southeastern New Mexico Pecos Valley; alfalfa hay, cotton and dairy production.' },
  { stateSlug: 'new-mexico', name: 'Clovis', county: 'Curry County', population: 38462, agNote: 'Eastern New Mexico High Plains dairy hub; Curry and Roosevelt counties anchor regional milk production.' },
  { stateSlug: 'new-mexico', name: 'Portales', county: 'Roosevelt County', population: 12028, agNote: 'Eastern New Mexico High Plains; peanut, dairy and alfalfa production.' },

  // ─── ARIZONA ───
  { stateSlug: 'arizona', name: 'Yuma', county: 'Yuma County', population: 99093, agNote: 'Yuma County produces a majority of the winter leafy greens consumed in the United States; concentrated lettuce and vegetable production.' },
  { stateSlug: 'arizona', name: 'Casa Grande', county: 'Pinal County', population: 57232, agNote: 'Pinal County combines cotton, alfalfa hay and dairy production in the Phoenix-Tucson agricultural corridor.' },
  { stateSlug: 'arizona', name: 'Buckeye', county: 'Maricopa County', population: 91502, agNote: 'Maricopa County combines cotton, alfalfa and produce; Buckeye sits in the western edge of the Phoenix ag basin.' },

  // ─── UTAH ───
  { stateSlug: 'utah', name: 'Logan', county: 'Cache County', population: 52778, agNote: 'Home of Utah State University and USU Extension; Cache Valley dairy, alfalfa and grass-hay region.' },
  { stateSlug: 'utah', name: 'Tremonton', county: 'Box Elder County', population: 9986, agNote: 'Northern Utah Bear River Valley; Box Elder County combines dairy, alfalfa hay and small-grain production.' },
  { stateSlug: 'utah', name: 'Vernal', county: 'Uintah County', population: 10656, agNote: 'Eastern Utah Uinta Basin; Uintah County combines alfalfa hay, beef and irrigated forage production.' },

  // ─── ARKANSAS ───
  { stateSlug: 'arkansas', name: 'Stuttgart', county: 'Arkansas County', population: 7975, agNote: 'Arkansas County is the top US rice-producing county; Stuttgart is the headquarters of Riceland Foods.' },
  { stateSlug: 'arkansas', name: 'Jonesboro', county: 'Craighead County', population: 78576, agNote: 'Northeast Arkansas Delta hub; rice, soybean, cotton and corn production. Already in the operator-derived city set.' },
  { stateSlug: 'arkansas', name: 'Pine Bluff', county: 'Jefferson County', population: 41253, agNote: 'Southeast Arkansas; Jefferson County rice, soybean and cotton production with major Riceland Foods presence.' },
  { stateSlug: 'arkansas', name: 'Fayetteville', county: 'Washington County', population: 93949, agNote: 'Home of the University of Arkansas and U of A Extension; northwest Arkansas poultry and forage region.' },
  { stateSlug: 'arkansas', name: 'West Memphis', county: 'Crittenden County', population: 24871, agNote: 'Northeast Arkansas Mississippi River Delta; Crittenden County is among the top US cotton and soybean producers.' },

  // ─── LOUISIANA ───
  { stateSlug: 'louisiana', name: 'Crowley', county: 'Acadia Parish', population: 11969, agNote: 'Acadia Parish is the heart of Louisiana rice country; the International Rice Festival is held annually in Crowley.' },
  { stateSlug: 'louisiana', name: 'Alexandria', county: 'Rapides Parish', population: 45275, agNote: 'Central Louisiana ag hub; Rapides Parish combines cotton, soybean, rice and forestry production.' },
  { stateSlug: 'louisiana', name: 'Monroe', county: 'Ouachita Parish', population: 47702, agNote: 'Northeast Louisiana Delta region; cotton, soybean and rice production along the Ouachita River.' },
  { stateSlug: 'louisiana', name: 'Lafayette', county: 'Lafayette Parish', population: 121374, agNote: 'South Louisiana hub; surrounding parishes anchor sugarcane, rice and crawfish-aquaculture production.' },

  // ─── MISSISSIPPI ───
  { stateSlug: 'mississippi', name: 'Greenville', county: 'Washington County', population: 28635, agNote: 'Mississippi Delta heart; Washington County combines cotton, soybean, rice and corn production along the Mississippi River.' },
  { stateSlug: 'mississippi', name: 'Cleveland', county: 'Bolivar County', population: 11199, agNote: 'Mississippi Delta; Bolivar County anchors cotton, rice and soybean production. Home of Delta State University.' },
  { stateSlug: 'mississippi', name: 'Tupelo', county: 'Lee County', population: 38008, agNote: 'Northeast Mississippi hub; Lee and Pontotoc counties anchor row-crop and pasture production.' },
  { stateSlug: 'mississippi', name: 'Hattiesburg', county: 'Forrest County', population: 47977, agNote: 'South Mississippi Pine Belt; surrounding counties combine forestry, poultry and forage production.' },
  { stateSlug: 'mississippi', name: 'Clarksdale', county: 'Coahoma County', population: 14903, agNote: 'Mississippi Delta; Coahoma County anchors cotton and soybean production with significant Delta drone-spray history.' },

  // ─── ALABAMA ───
  { stateSlug: 'alabama', name: 'Huntsville', county: 'Madison County', population: 215006, agNote: 'North Alabama Tennessee Valley region; cotton, soybean and corn production with strong technology-services overlap.' },
  { stateSlug: 'alabama', name: 'Dothan', county: 'Houston County', population: 71072, agNote: 'Southeast Alabama Wiregrass region; Houston, Dale and Henry counties anchor peanut and cotton production.' },
  { stateSlug: 'alabama', name: 'Tuscaloosa', county: 'Tuscaloosa County', population: 100618, agNote: 'West-central Alabama; cotton, soybean and timber production. University of Alabama region.' },
  { stateSlug: 'alabama', name: 'Decatur', county: 'Morgan County', population: 57938, agNote: 'North Alabama Tennessee Valley cotton, soybean and corn region.' },

  // ─── GEORGIA ───
  { stateSlug: 'georgia', name: 'Tifton', county: 'Tift County', population: 17234, agNote: 'South Georgia ag-research hub; Tift County is among the top US peanut-producing counties. Home of UGA Tifton Campus.' },
  { stateSlug: 'georgia', name: 'Albany', county: 'Dougherty County', population: 69647, agNote: 'Southwest Georgia Plains region; surrounding counties anchor peanut, cotton and pecan production.' },
  { stateSlug: 'georgia', name: 'Athens', county: 'Clarke County', population: 127315, agNote: 'Home of the University of Georgia and UGA Cooperative Extension; central Georgia ag-services hub.' },
  { stateSlug: 'georgia', name: 'Valdosta', county: 'Lowndes County', population: 55378, agNote: 'South Georgia hub; Lowndes and surrounding counties anchor cotton, peanut and pecan production.' },
  { stateSlug: 'georgia', name: 'Vidalia', county: 'Toombs County', population: 10465, agNote: 'Toombs County is the heart of the Vidalia onion appellation; concentrated specialty-vegetable production.' },

  // ─── FLORIDA ───
  { stateSlug: 'florida', name: 'Belle Glade', county: 'Palm Beach County', population: 17467, agNote: 'Lake Okeechobee Everglades Agricultural Area; sugarcane, sweet corn, leafy greens and rice production.' },
  { stateSlug: 'florida', name: 'Immokalee', county: 'Collier County', population: 26928, agNote: 'Southwest Florida tomato, citrus and produce hub; concentrated specialty-crop production.' },
  { stateSlug: 'florida', name: 'Plant City', county: 'Hillsborough County', population: 39764, agNote: 'Plant City is the strawberry capital of the United States; concentrated berry and produce production.' },
  { stateSlug: 'florida', name: 'Lake Wales', county: 'Polk County', population: 16903, agNote: 'Central Florida citrus belt; Polk County is one of the top US citrus-producing counties.' },
  { stateSlug: 'florida', name: 'Quincy', county: 'Gadsden County', population: 8056, agNote: 'North Florida; Gadsden County combines cotton, peanut and tobacco production.' },

  // ─── NORTH CAROLINA ───
  { stateSlug: 'north-carolina', name: 'Raleigh', county: 'Wake County', population: 467665, agNote: 'Home of NC State University and NC Cooperative Extension; eastern North Carolina row-crop and tobacco region.' },
  { stateSlug: 'north-carolina', name: 'Goldsboro', county: 'Wayne County', population: 33438, agNote: 'Eastern North Carolina Coastal Plain; Wayne and surrounding counties anchor sweet potato, tobacco and pork production.' },
  { stateSlug: 'north-carolina', name: 'Greenville', county: 'Pitt County', population: 87521, agNote: 'Eastern North Carolina; Pitt and surrounding counties combine tobacco, sweet potato, cotton and grain production.' },
  { stateSlug: 'north-carolina', name: 'Wilson', county: 'Wilson County', population: 47983, agNote: 'Eastern North Carolina tobacco market town; surrounding counties anchor flue-cured tobacco production.' },
  { stateSlug: 'north-carolina', name: 'Mount Olive', county: 'Wayne County', population: 4300, agNote: 'Mount Olive sits in the heart of NC sweet potato country and is the headquarters of Mt. Olive Pickle Co.' },

  // ─── SOUTH CAROLINA ───
  { stateSlug: 'south-carolina', name: 'Florence', county: 'Florence County', population: 38932, agNote: 'Pee Dee region; Florence and Darlington counties anchor cotton, soybean, peanut and tobacco production.' },
  { stateSlug: 'south-carolina', name: 'Sumter', county: 'Sumter County', population: 43463, agNote: 'Central South Carolina; Sumter and Lee counties combine cotton, soybean, corn and timber production.' },
  { stateSlug: 'south-carolina', name: 'Clemson', county: 'Pickens County', population: 17681, agNote: 'Home of Clemson University and Clemson Cooperative Extension; northwest South Carolina Piedmont region.' },
  { stateSlug: 'south-carolina', name: 'Orangeburg', county: 'Orangeburg County', population: 13964, agNote: 'Central South Carolina; Orangeburg County anchors cotton, soybean, corn and peanut production.' },

  // ─── VIRGINIA ───
  { stateSlug: 'virginia', name: 'Blacksburg', county: 'Montgomery County', population: 44826, agNote: 'Home of Virginia Tech and VT Cooperative Extension; western Virginia ag-research hub.' },
  { stateSlug: 'virginia', name: 'Suffolk', county: 'Suffolk City', population: 95385, agNote: 'Tidewater Virginia; surrounding counties anchor peanut, cotton and soybean production.' },
  { stateSlug: 'virginia', name: 'Winchester', county: 'Frederick County', population: 28078, agNote: 'Northern Shenandoah Valley; Frederick County is among the top US apple-producing counties.' },
  { stateSlug: 'virginia', name: 'Staunton', county: 'Augusta County', population: 25750, agNote: 'Shenandoah Valley dairy, beef and apple region; Augusta County combines pasture and orchard production.' },

  // ─── WEST VIRGINIA ───
  { stateSlug: 'west-virginia', name: 'Morgantown', county: 'Monongalia County', population: 30347, agNote: 'Home of West Virginia University and WVU Extension; northern West Virginia hill-pasture and forage region.' },
  { stateSlug: 'west-virginia', name: 'Martinsburg', county: 'Berkeley County', population: 18773, agNote: 'Eastern Panhandle apple and peach region; Berkeley and Jefferson counties anchor tree-fruit production.' },
  { stateSlug: 'west-virginia', name: 'Lewisburg', county: 'Greenbrier County', population: 3843, agNote: 'Greenbrier Valley; Greenbrier County is among the top West Virginia ag counties for beef and forage.' },

  // ─── KENTUCKY ───
  { stateSlug: 'kentucky', name: 'Bowling Green', county: 'Warren County', population: 72294, agNote: 'South-central Kentucky; surrounding counties anchor corn, soybean, tobacco and beef-cattle production.' },
  { stateSlug: 'kentucky', name: 'Henderson', county: 'Henderson County', population: 28757, agNote: 'Western Kentucky; Henderson County is among the top Kentucky soybean and corn producers.' },
  { stateSlug: 'kentucky', name: 'Hopkinsville', county: 'Christian County', population: 31180, agNote: 'Western Kentucky Pennyroyal region; Christian County is the largest Kentucky soybean producer.' },
  { stateSlug: 'kentucky', name: 'Owensboro', county: 'Daviess County', population: 60179, agNote: 'Western Kentucky Ohio River basin; Daviess County combines corn, soybean, tobacco and bourbon-corn production.' },
  { stateSlug: 'kentucky', name: 'Paducah', county: 'McCracken County', population: 27137, agNote: 'Western Kentucky Mississippi-Ohio confluence; surrounding counties anchor corn, soybean and grain production.' },

  // ─── TENNESSEE ───
  { stateSlug: 'tennessee', name: 'Jackson', county: 'Madison County', population: 67685, agNote: 'West Tennessee hub; Madison and surrounding counties anchor cotton, soybean and corn production.' },
  { stateSlug: 'tennessee', name: 'Dyersburg', county: 'Dyer County', population: 16164, agNote: 'West Tennessee Mississippi River basin; Dyer and Lauderdale counties anchor cotton and soybean production.' },
  { stateSlug: 'tennessee', name: 'Memphis', county: 'Shelby County', population: 633104, agNote: 'Tennessee-Mississippi-Arkansas Delta corner; surrounding counties combine cotton, soybean, rice and corn.' },
  { stateSlug: 'tennessee', name: 'Murfreesboro', county: 'Rutherford County', population: 152769, agNote: 'Middle Tennessee; Rutherford County combines pasture, beef cattle, dairy and grain production.' },

  // ─── MICHIGAN ───
  { stateSlug: 'michigan', name: 'Lansing', county: 'Ingham County', population: 112644, agNote: 'Home of Michigan State University and MSU Extension; central Michigan ag-research hub.' },
  { stateSlug: 'michigan', name: 'Saginaw', county: 'Saginaw County', population: 44202, agNote: 'Saginaw Bay region; sugar-beet, dry-bean and corn-soybean production; Michigan Sugar Company headquarters.' },
  { stateSlug: 'michigan', name: 'Kalamazoo', county: 'Kalamazoo County', population: 73598, agNote: 'Southwestern Michigan; surrounding counties anchor blueberry, asparagus and seed-corn production.' },
  { stateSlug: 'michigan', name: 'Traverse City', county: 'Grand Traverse County', population: 15678, agNote: 'Northwest Lower Michigan; Grand Traverse and Leelanau counties are the top US tart-cherry-producing region.' },
  { stateSlug: 'michigan', name: 'Bay City', county: 'Bay County', population: 32311, agNote: 'Saginaw Bay; Bay and Tuscola counties combine sugar-beet, dry-bean and grain corn production.' },

  // ─── PENNSYLVANIA ───
  { stateSlug: 'pennsylvania', name: 'Lancaster', county: 'Lancaster County', population: 58039, agNote: 'Lancaster County is the top US non-irrigated ag county by farm gate receipts; Plain-community dairy, poultry and produce production.' },
  { stateSlug: 'pennsylvania', name: 'State College', county: 'Centre County', population: 40501, agNote: 'Home of Penn State University and Penn State Extension; central Pennsylvania ag-research hub.' },
  { stateSlug: 'pennsylvania', name: 'Chambersburg', county: 'Franklin County', population: 21903, agNote: 'South-central Pennsylvania Cumberland Valley; Franklin County anchors apple, peach and dairy production.' },
  { stateSlug: 'pennsylvania', name: 'Gettysburg', county: 'Adams County', population: 7106, agNote: 'Adams County is the top US apple-producing county outside Washington state; concentrated tree-fruit production.' },

  // ─── NEW YORK ───
  { stateSlug: 'new-york', name: 'Geneva', county: 'Ontario County', population: 13261, agNote: 'Finger Lakes region; home of Cornell AgriTech and major wine-grape, apple and dairy research.' },
  { stateSlug: 'new-york', name: 'Cortland', county: 'Cortland County', population: 17556, agNote: 'Central New York; surrounding counties anchor dairy, apple and grain production.' },
  { stateSlug: 'new-york', name: 'Watertown', county: 'Jefferson County', population: 24685, agNote: 'Northern New York; Jefferson and Lewis counties anchor dairy and forage production.' },
  { stateSlug: 'new-york', name: 'Rochester', county: 'Monroe County', population: 211328, agNote: 'Western New York Lake Plain; surrounding counties anchor apple, cherry and processing-vegetable production.' },

  // ─── NEW JERSEY ───
  { stateSlug: 'new-jersey', name: 'Bridgeton', county: 'Cumberland County', population: 27116, agNote: 'South Jersey; Cumberland County is one of the top US blueberry, peach and tomato producers.' },
  { stateSlug: 'new-jersey', name: 'Vineland', county: 'Cumberland County', population: 60780, agNote: 'South Jersey Garden State Parkway corridor; concentrated specialty-vegetable and berry production.' },
  { stateSlug: 'new-jersey', name: 'Hammonton', county: 'Atlantic County', population: 14710, agNote: 'Atlantic County is the top US blueberry-producing region after Michigan; Hammonton is the Blueberry Capital.' },

  // ─── DELAWARE ───
  { stateSlug: 'delaware', name: 'Dover', county: 'Kent County', population: 39403, agNote: 'Delaware state capital and Kent County ag hub; soybean, corn and broiler-poultry production.' },
  { stateSlug: 'delaware', name: 'Georgetown', county: 'Sussex County', population: 7488, agNote: 'Sussex County is the top US broiler-chicken producing county; concentrated poultry, soybean and corn production.' },

  // ─── MARYLAND ───
  { stateSlug: 'maryland', name: 'Salisbury', county: 'Wicomico County', population: 33114, agNote: 'Eastern Shore Delmarva region; concentrated broiler-poultry, soybean and grain production.' },
  { stateSlug: 'maryland', name: 'Frederick', county: 'Frederick County', population: 78171, agNote: 'Northern Maryland Piedmont; Frederick County combines dairy, beef, grain and produce production.' },
  { stateSlug: 'maryland', name: 'Easton', county: 'Talbot County', population: 17034, agNote: 'Eastern Shore; Talbot and surrounding counties anchor soybean, corn and produce production.' },

  // ─── VERMONT ───
  { stateSlug: 'vermont', name: 'Burlington', county: 'Chittenden County', population: 44595, agNote: 'Champlain Valley; surrounding counties anchor dairy, apple and maple production. UVM Extension hub.' },
  { stateSlug: 'vermont', name: 'St. Albans', county: 'Franklin County', population: 6918, agNote: 'Northern Vermont Champlain Valley; Franklin County is the top Vermont dairy-producing county.' },
  { stateSlug: 'vermont', name: 'Middlebury', county: 'Addison County', population: 9152, agNote: 'Champlain Valley dairy and forage region; Addison County combines pasture, hay and dairy production.' },

  // ─── NEW HAMPSHIRE ───
  { stateSlug: 'new-hampshire', name: 'Concord', county: 'Merrimack County', population: 43976, agNote: 'New Hampshire state capital; surrounding counties anchor maple-syrup, apple and dairy production.' },
  { stateSlug: 'new-hampshire', name: 'Keene', county: 'Cheshire County', population: 23047, agNote: 'Southwest New Hampshire Connecticut River Valley; apple, hay and forage production.' },

  // ─── MAINE ───
  { stateSlug: 'maine', name: 'Presque Isle', county: 'Aroostook County', population: 9238, agNote: 'Aroostook County is the top US Northeast potato-producing county; concentrated potato and grain production.' },
  { stateSlug: 'maine', name: 'Bangor', county: 'Penobscot County', population: 31753, agNote: 'Central Maine ag-services hub; surrounding counties anchor potato, blueberry and forage production.' },
  { stateSlug: 'maine', name: 'Caribou', county: 'Aroostook County', population: 7396, agNote: 'Northern Maine Aroostook County; major potato-producing region.' },

  // ─── MASSACHUSETTS ───
  { stateSlug: 'massachusetts', name: 'Amherst', county: 'Hampshire County', population: 39263, agNote: 'Home of UMass Amherst and UMass Extension; Connecticut River Valley produce and dairy region.' },
  { stateSlug: 'massachusetts', name: 'Plymouth', county: 'Plymouth County', population: 61217, agNote: 'Southeastern Massachusetts; Plymouth County is among the top US cranberry-producing counties.' },

  // ─── CONNECTICUT ───
  { stateSlug: 'connecticut', name: 'Storrs', county: 'Tolland County', population: 15344, agNote: 'Home of UConn and UConn Extension; northeast Connecticut dairy and apple region.' },
  { stateSlug: 'connecticut', name: 'New Milford', county: 'Litchfield County', population: 28142, agNote: 'Western Connecticut dairy and forage region; Litchfield County combines pasture and small-orchard production.' },

  // ─── WYOMING ───
  { stateSlug: 'wyoming', name: 'Laramie', county: 'Albany County', population: 31407, agNote: 'Home of the University of Wyoming and UW Extension; southeast Wyoming beef and forage region.' },
  { stateSlug: 'wyoming', name: 'Powell', county: 'Park County', population: 6402, agNote: 'Northwest Wyoming Big Horn Basin; sugar-beet, dry-bean and irrigated alfalfa production.' },
  { stateSlug: 'wyoming', name: 'Torrington', county: 'Goshen County', population: 5991, agNote: 'Eastern Wyoming North Platte Valley; sugar-beet, dry-bean and irrigated forage production.' },

  // ─── HAWAII ───
  { stateSlug: 'hawaii', name: 'Hilo', county: 'Hawaii County', population: 44186, agNote: 'Big Island; coffee, macadamia nut and tropical-fruit production.' },

  // ─── ALASKA ───
  { stateSlug: 'alaska', name: 'Palmer', county: 'Matanuska-Susitna Borough', population: 5938, agNote: 'Matanuska Valley; the closest thing to commercial cropland in Alaska, with vegetable, dairy and forage production.' },
];
