# Operator research priority batches

Top **200** gap/light-coverage cities (`coverage_status` = gap or light) split into 8
research batches of 25 cities each. Batches are ordered by combined `ag_score` so
Batch 1 holds the highest-priority targets.

**Coverage definitions**
- `gap` — 0 operators currently cover this city (page does not exist).
- `light` — 1–2 operators (below the 2-operator publish threshold or only just at it).
- `covered_well` — 3 or more operators (already publishing, excluded from this list).

**Data caveat:** county-level USDA NASS Quick Stats (`cropland_acres`, `farm_count`,
`ag_receipts_usd`) could not be pulled in this build (no network), so `ag_score` here
is a proxy from state-level cropland (`src/data/counties.ts`), operator coverage
signal, and a curated top-ag-hub flag. Re-run the build script with NASS access to
replace the proxy with true county-level metrics.

## Batch 1

**Score range:** 0.673 – 0.873  
**Top states:** Texas (25)  
**Regions:** Southern Plains (25)  
**Why prioritized:** Texas concentration (Texas southern plains); 18 gap and 7 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Lubbock | Texas | Lubbock | 0.873 | 1 | light |
| 2 | Perryton | Texas | Ochiltree | 0.873 | 1 | light |
| 3 | Houston | Texas | — | 0.745 | 2 | light |
| 4 | Plainview | Texas | Hale | 0.700 | 0 | gap |
| 5 | Dumas | Texas | Moore | 0.700 | 0 | gap |
| 6 | Hereford | Texas | Deaf Smith | 0.700 | 0 | gap |
| 7 | Harlingen | Texas | Cameron | 0.700 | 0 | gap |
| 8 | Weslaco | Texas | Hidalgo | 0.700 | 0 | gap |
| 9 | Uvalde | Texas | Uvalde | 0.700 | 0 | gap |
| 10 | Victoria | Texas | Victoria | 0.700 | 0 | gap |
| 11 | Lamesa | Texas | Dawson | 0.700 | 0 | gap |
| 12 | Levelland | Texas | Hockley | 0.700 | 0 | gap |
| 13 | Brownfield | Texas | Terry | 0.700 | 0 | gap |
| 14 | Muleshoe | Texas | Bailey | 0.700 | 0 | gap |
| 15 | Floydada | Texas | Floyd | 0.700 | 0 | gap |
| 16 | Tulia | Texas | Swisher | 0.700 | 0 | gap |
| 17 | Dimmitt | Texas | Castro | 0.700 | 0 | gap |
| 18 | Pampa | Texas | Gray | 0.700 | 0 | gap |
| 19 | Edinburg | Texas | Hidalgo | 0.700 | 0 | gap |
| 20 | Mercedes | Texas | Hidalgo | 0.700 | 0 | gap |
| 21 | Raymondville | Texas | Willacy | 0.700 | 0 | gap |
| 22 | Texas (serves OK and NM) | Texas | — | 0.673 | 1 | light |
| 23 | Grapevine | Texas | — | 0.673 | 1 | light |
| 24 | Llano | Texas | — | 0.673 | 1 | light |
| 25 | Palestine/Longview | Texas | — | 0.673 | 1 | light |

## Batch 2

**Score range:** 0.492 – 0.673  
**Top states:** Texas (12), Kansas (3), Illinois (2)  
**Regions:** Southern Plains (13), Great Plains (9)  
**Why prioritized:** Southern Plains cluster — Texas leads (12 cities); 0 gap and 25 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Robinson | Texas | — | 0.673 | 1 | light |
| 2 | Washington County | Texas | — | 0.673 | 1 | light |
| 3 | Frisco | Texas | — | 0.673 | 1 | light |
| 4 | Palestine | Texas | — | 0.673 | 1 | light |
| 5 | Decatur | Texas | — | 0.673 | 1 | light |
| 6 | Multiple TX offices | Texas | — | 0.673 | 1 | light |
| 7 | Gonzales (Harwood) | Texas | — | 0.673 | 1 | light |
| 8 | Pittsburg | Texas | — | 0.673 | 1 | light |
| 9 | West TX (Lubbock area) | Texas | — | 0.673 | 1 | light |
| 10 | Jackson County | Texas | — | 0.673 | 1 | light |
| 11 | Alvarado | Texas | — | 0.673 | 1 | light |
| 12 | West TX | Texas | — | 0.673 | 1 | light |
| 13 | Sidney | Montana | Richland | 0.600 | 1 | light |
| 14 | Hutchinson | Kansas | Reno | 0.550 | 1 | light |
| 15 | Pratt | Kansas | Pratt | 0.550 | 1 | light |
| 16 | Ulysses | Kansas | Grant | 0.550 | 1 | light |
| 17 | Champaign | Illinois | Champaign | 0.549 | 2 | light |
| 18 | Effingham | Illinois | Effingham | 0.549 | 2 | light |
| 19 | Holdrege | Nebraska | Phelps | 0.546 | 1 | light |
| 20 | Hastings | Nebraska | Adams | 0.546 | 1 | light |
| 21 | Huron | South Dakota | Beadle | 0.538 | 1 | light |
| 22 | Mitchell | South Dakota | Davison | 0.538 | 1 | light |
| 23 | Guymon | Oklahoma | Texas | 0.504 | 1 | light |
| 24 | Jonesboro | Arkansas | Craighead | 0.499 | 2 | light |
| 25 | Wray | Colorado | Yuma | 0.492 | 1 | light |

## Batch 3

**Score range:** 0.418 – 0.488  
**Top states:** Montana (10), Kansas (3), California (2)  
**Regions:** Great Plains (14), Pacific (4)  
**Why prioritized:** Great Plains cluster — Montana leads (10 cities); 9 gap and 16 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Lander | Wyoming | Fremont | 0.488 | 1 | light |
| 2 | Billings | Montana | — | 0.472 | 2 | light |
| 3 | Fresno | California | Fresno | 0.469 | 1 | light |
| 4 | Visalia | California | Tulare | 0.469 | 1 | light |
| 5 | Salem | Oregon | Marion | 0.436 | 1 | light |
| 6 | Marshfield | Wisconsin | Wood | 0.433 | 1 | light |
| 7 | Antigo | Wisconsin | Langlade | 0.433 | 1 | light |
| 8 | Lafayette | Indiana | Tippecanoe | 0.431 | 1 | light |
| 9 | Wenatchee | Washington | Chelan | 0.429 | 1 | light |
| 10 | Bucyrus | Ohio | Crawford | 0.427 | 1 | light |
| 11 | Great Falls | Montana | Cascade | 0.427 | 0 | gap |
| 12 | Havre | Montana | Hill | 0.427 | 0 | gap |
| 13 | Glendive | Montana | Dawson | 0.427 | 0 | gap |
| 14 | Glasgow | Montana | Valley | 0.427 | 0 | gap |
| 15 | Lewistown | Montana | Fergus | 0.427 | 0 | gap |
| 16 | Conrad | Montana | Pondera | 0.427 | 0 | gap |
| 17 | Choteau | Montana | Teton | 0.427 | 0 | gap |
| 18 | Cut Bank | Montana | Glacier | 0.427 | 0 | gap |
| 19 | Plentywood | Montana | Sheridan | 0.427 | 0 | gap |
| 20 | Elizabethtown | Kentucky | Hardin | 0.423 | 1 | light |
| 21 | Overland Park | Kansas | — | 0.422 | 2 | light |
| 22 | Hiawatha | Kansas | — | 0.422 | 2 | light |
| 23 | Wichita | Kansas | — | 0.422 | 2 | light |
| 24 | Twin Falls | Idaho | Twin Falls | 0.418 | 1 | light |
| 25 | Caldwell | Idaho | Canyon | 0.418 | 1 | light |

## Batch 4

**Score range:** 0.377 – 0.418  
**Top states:** Montana (6), Georgia (2), Alabama (2)  
**Regions:** Great Plains (9), Southeast (9)  
**Why prioritized:** Great Plains cluster — Montana leads (6 cities); 1 gap and 24 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Nebraska City | Nebraska | — | 0.418 | 2 | light |
| 2 | Indianola | Mississippi | Sunflower | 0.415 | 1 | light |
| 3 | Jackson | Tennessee | Madison | 0.413 | 1 | light |
| 4 | Tifton | Georgia | Tift | 0.411 | 1 | light |
| 5 | Sylvester | Georgia | Worth | 0.411 | 1 | light |
| 6 | Sandusky | Michigan | Sanilac | 0.411 | 1 | light |
| 7 | Dothan | Alabama | Houston | 0.408 | 1 | light |
| 8 | Cullman | Alabama | Cullman | 0.408 | 1 | light |
| 9 | Wilson | North Carolina | Wilson | 0.406 | 1 | light |
| 10 | Goldsboro | North Carolina | Wayne | 0.406 | 1 | light |
| 11 | Winnsboro | Louisiana | Franklin Parish | 0.404 | 1 | light |
| 12 | New Iberia | Louisiana | Iberia Parish | 0.404 | 1 | light |
| 13 | Suffolk | Virginia | Suffolk | 0.403 | 1 | light |
| 14 | Carlisle | Pennsylvania | Cumberland | 0.401 | 1 | light |
| 15 | Harrisburg | Montana | — | 0.400 | 1 | light |
| 16 | Livingston | Montana | — | 0.400 | 1 | light |
| 17 | Hamilton | Montana | — | 0.400 | 1 | light |
| 18 | Helena area | Montana | — | 0.400 | 1 | light |
| 19 | Townsend | Montana | — | 0.400 | 1 | light |
| 20 | Southwest Montana | Montana | — | 0.400 | 1 | light |
| 21 | Canandaigua | New York | Ontario | 0.400 | 1 | light |
| 22 | Bismarck | North Dakota | — | 0.395 | 2 | light |
| 23 | Florence | South Carolina | Florence | 0.391 | 1 | light |
| 24 | Hilo | Hawaii | Hawaii | 0.380 | 1 | light |
| 25 | Hays | Kansas | Ellis | 0.377 | 0 | gap |

## Batch 5

**Score range:** 0.365 – 0.377  
**Top states:** Nebraska (12), Kansas (10), New Jersey (1)  
**Regions:** Great Plains (23), Northeast (2)  
**Why prioritized:** Great Plains cluster — Nebraska leads (12 cities); 23 gap and 2 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Garden City | Kansas | Finney | 0.377 | 0 | gap |
| 2 | Liberal | Kansas | Seward | 0.377 | 0 | gap |
| 3 | Dodge City | Kansas | Ford | 0.377 | 0 | gap |
| 4 | Colby | Kansas | Thomas | 0.377 | 0 | gap |
| 5 | Goodland | Kansas | Sherman | 0.377 | 0 | gap |
| 6 | Scott City | Kansas | Scott | 0.377 | 0 | gap |
| 7 | Phillipsburg | Kansas | Phillips | 0.377 | 0 | gap |
| 8 | Beloit | Kansas | Mitchell | 0.377 | 0 | gap |
| 9 | Concordia | Kansas | Cloud | 0.377 | 0 | gap |
| 10 | McPherson | Kansas | McPherson | 0.377 | 0 | gap |
| 11 | Glassboro | New Jersey | Gloucester | 0.376 | 1 | light |
| 12 | Lebanon | Connecticut | New London | 0.374 | 1 | light |
| 13 | Grand Island | Nebraska | Hall | 0.373 | 0 | gap |
| 14 | Kearney | Nebraska | Buffalo | 0.373 | 0 | gap |
| 15 | North Platte | Nebraska | Lincoln | 0.373 | 0 | gap |
| 16 | Norfolk | Nebraska | Madison | 0.373 | 0 | gap |
| 17 | Columbus | Nebraska | Platte | 0.373 | 0 | gap |
| 18 | Scottsbluff | Nebraska | Scotts Bluff | 0.373 | 0 | gap |
| 19 | McCook | Nebraska | Red Willow | 0.373 | 0 | gap |
| 20 | Sidney | Nebraska | Cheyenne | 0.373 | 0 | gap |
| 21 | Imperial | Nebraska | Chase | 0.373 | 0 | gap |
| 22 | Beatrice | Nebraska | Gage | 0.373 | 0 | gap |
| 23 | York | Nebraska | York | 0.373 | 0 | gap |
| 24 | Lexington | Nebraska | Dawson | 0.373 | 0 | gap |
| 25 | Aberdeen | South Dakota | Brown | 0.365 | 0 | gap |

## Batch 6

**Score range:** 0.350 – 0.365  
**Top states:** New Mexico (11), South Dakota (8), Kansas (5)  
**Regions:** Great Plains (14), Southern Plains (11)  
**Why prioritized:** Great Plains cluster — New Mexico leads (11 cities); 19 gap and 6 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Watertown | South Dakota | Codington | 0.365 | 0 | gap |
| 2 | Brookings | South Dakota | Brookings | 0.365 | 0 | gap |
| 3 | Yankton | South Dakota | Yankton | 0.365 | 0 | gap |
| 4 | Pierre | South Dakota | Hughes | 0.365 | 0 | gap |
| 5 | Vermillion | South Dakota | Clay | 0.365 | 0 | gap |
| 6 | Madison | South Dakota | Lake | 0.365 | 0 | gap |
| 7 | Redfield | South Dakota | Spink | 0.365 | 0 | gap |
| 8 | Webster | South Dakota | Day | 0.365 | 0 | gap |
| 9 | Clovis | New Mexico | Curry | 0.365 | 0 | gap |
| 10 | Portales | New Mexico | Roosevelt | 0.365 | 0 | gap |
| 11 | Roswell | New Mexico | Chaves | 0.365 | 0 | gap |
| 12 | Carlsbad | New Mexico | Eddy | 0.365 | 0 | gap |
| 13 | Hatch | New Mexico | Doña Ana | 0.365 | 0 | gap |
| 14 | Las Cruces | New Mexico | Doña Ana | 0.365 | 0 | gap |
| 15 | Deming | New Mexico | Luna | 0.365 | 0 | gap |
| 16 | Tucumcari | New Mexico | Quay | 0.365 | 0 | gap |
| 17 | Hobbs | New Mexico | Lea | 0.365 | 0 | gap |
| 18 | Artesia | New Mexico | Eddy | 0.365 | 0 | gap |
| 19 | Lovington | New Mexico | Lea | 0.365 | 0 | gap |
| 20 | Colorado (Weld County) | Colorado | — | 0.364 | 2 | light |
| 21 | Salina | Kansas | — | 0.350 | 1 | light |
| 22 | Kansas City | Kansas | — | 0.350 | 1 | light |
| 23 | Westmoreland | Kansas | — | 0.350 | 1 | light |
| 24 | Seneca | Kansas | — | 0.350 | 1 | light |
| 25 | Spring Hill | Kansas | — | 0.350 | 1 | light |

## Batch 7

**Score range:** 0.346 – 0.350  
**Top states:** North Dakota (12), Nebraska (9), Kansas (4)  
**Regions:** Great Plains (25)  
**Why prioritized:** Great Plains cluster — North Dakota leads (12 cities); 12 gap and 13 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | Kansas City area | Kansas | — | 0.350 | 1 | light |
| 2 | Thayer | Kansas | — | 0.350 | 1 | light |
| 3 | SE Kansas | Kansas | — | 0.350 | 1 | light |
| 4 | Fort Scott | Kansas | — | 0.350 | 1 | light |
| 5 | Fargo | North Dakota | Cass | 0.350 | 0 | gap |
| 6 | Grand Forks | North Dakota | Grand Forks | 0.350 | 0 | gap |
| 7 | Minot | North Dakota | Ward | 0.350 | 0 | gap |
| 8 | Williston | North Dakota | Williams | 0.350 | 0 | gap |
| 9 | Jamestown | North Dakota | Stutsman | 0.350 | 0 | gap |
| 10 | Devils Lake | North Dakota | Ramsey | 0.350 | 0 | gap |
| 11 | Dickinson | North Dakota | Stark | 0.350 | 0 | gap |
| 12 | Wahpeton | North Dakota | Richland | 0.350 | 0 | gap |
| 13 | Valley City | North Dakota | Barnes | 0.350 | 0 | gap |
| 14 | Bottineau | North Dakota | Bottineau | 0.350 | 0 | gap |
| 15 | Cavalier | North Dakota | Pembina | 0.350 | 0 | gap |
| 16 | Carrington | North Dakota | Foster | 0.350 | 0 | gap |
| 17 | Lincoln | Nebraska | — | 0.346 | 1 | light |
| 18 | Dundee | Nebraska | — | 0.346 | 1 | light |
| 19 | Spalding | Nebraska | — | 0.346 | 1 | light |
| 20 | Springfield | Nebraska | — | 0.346 | 1 | light |
| 21 | Belgrade | Nebraska | — | 0.346 | 1 | light |
| 22 | Central NE | Nebraska | — | 0.346 | 1 | light |
| 23 | Lincoln/Brainard | Nebraska | — | 0.346 | 1 | light |
| 24 | Fairfield | Nebraska | — | 0.346 | 1 | light |
| 25 | Greenwood | Nebraska | — | 0.346 | 1 | light |

## Batch 8

**Score range:** 0.319 – 0.346  
**Top states:** Oklahoma (11), Colorado (6), Nebraska (3)  
**Regions:** Great Plains (13), Southern Plains (11)  
**Why prioritized:** Great Plains cluster — Oklahoma leads (11 cities); 17 gap and 8 light-coverage cities to research and seed.

| # | City | State | County | Ag score | Existing ops | Status |
|---|---|---|---|---|---|---|
| 1 | West Point area | Nebraska | — | 0.346 | 1 | light |
| 2 | Leigh | Nebraska | — | 0.346 | 1 | light |
| 3 | Hartington | Nebraska | — | 0.346 | 1 | light |
| 4 | Southern California | California | — | 0.341 | 2 | light |
| 5 | Highmore | South Dakota | — | 0.338 | 1 | light |
| 6 | Alcester | South Dakota | — | 0.338 | 1 | light |
| 7 | Enid | Oklahoma | Garfield | 0.331 | 0 | gap |
| 8 | Woodward | Oklahoma | Woodward | 0.331 | 0 | gap |
| 9 | Altus | Oklahoma | Jackson | 0.331 | 0 | gap |
| 10 | Frederick | Oklahoma | Tillman | 0.331 | 0 | gap |
| 11 | Hobart | Oklahoma | Kiowa | 0.331 | 0 | gap |
| 12 | Stillwater | Oklahoma | Payne | 0.331 | 0 | gap |
| 13 | Ponca City | Oklahoma | Kay | 0.331 | 0 | gap |
| 14 | Ardmore | Oklahoma | Carter | 0.331 | 0 | gap |
| 15 | Lawton | Oklahoma | Comanche | 0.331 | 0 | gap |
| 16 | Elk City | Oklahoma | Beckham | 0.331 | 0 | gap |
| 17 | Weatherford | Oklahoma | Custer | 0.331 | 0 | gap |
| 18 | Kenmare | North Dakota | — | 0.323 | 1 | light |
| 19 | Killdeer | North Dakota | — | 0.323 | 1 | light |
| 20 | Yuma | Colorado | Yuma | 0.319 | 0 | gap |
| 21 | Burlington | Colorado | Kit Carson | 0.319 | 0 | gap |
| 22 | Sterling | Colorado | Logan | 0.319 | 0 | gap |
| 23 | Lamar | Colorado | Prowers | 0.319 | 0 | gap |
| 24 | Holyoke | Colorado | Phillips | 0.319 | 0 | gap |
| 25 | Akron | Colorado | Washington | 0.319 | 0 | gap |

