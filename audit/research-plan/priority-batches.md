# Operator research priority batches

Top 200 gap + light-coverage cities grouped into 8 research batches of
25 each. Ordered by combined ag_score so Batch 1 is the highest-priority
research target. ag_score is derived from Census Places population and
state-level USDA agricultural acreage; county-level cropland / farm-count
/ farm-receipt enrichment was not resolvable in the build environment and
is left blank in the master CSV per the no-fabrication rule.

Source data: `src/data/seed-cities.ts` (196 USDA NASS / Census Places
anchored cities) + operator-derived cities from `src/data/operators.ts`.

## Batch 1 — combined ag_score 10.554

**Theme:** Texas (15), California (3), Tennessee (1), North Carolina (1)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Corpus Christi | Texas | Nueces County | 0.7261 | 0 | gap |
| 2 | Lubbock | Texas | Lubbock County | 0.6734 | 1 | light |
| 3 | Amarillo | Texas | Potter County | 0.6241 | 0 | gap |
| 4 | Memphis | Tennessee | Shelby County | 0.5863 | 0 | gap |
| 5 | Fresno | California | Fresno County | 0.5575 | 1 | light |
| 6 | College Station | Texas | Brazos County | 0.5547 | 0 | gap |
| 7 | Plainview | Texas | Hale County | 0.4672 | 0 | gap |
| 8 | Bakersfield | California | Kern County | 0.4370 | 0 | gap |
| 9 | Raleigh | North Carolina | Wake County | 0.4357 | 1 | light |
| 10 | Lincoln | Nebraska | Lancaster County | 0.4086 | 1 | light |
| 11 | Houston | Texas | — | 0.3760 | 2 | light |
| 12 | Grapevine | Texas | — | 0.3680 | 1 | light |
| 13 | Llano | Texas | — | 0.3680 | 1 | light |
| 14 | Robinson | Texas | — | 0.3680 | 1 | light |
| 15 | Frisco | Texas | — | 0.3680 | 1 | light |
| 16 | Palestine | Texas | — | 0.3680 | 1 | light |
| 17 | Decatur | Texas | — | 0.3680 | 1 | light |
| 18 | Perryton | Texas | — | 0.3680 | 1 | light |
| 19 | Pittsburg | Texas | — | 0.3680 | 1 | light |
| 20 | Alvarado | Texas | — | 0.3680 | 1 | light |
| 21 | Sioux Falls | South Dakota | Minnehaha County | 0.3196 | 0 | gap |
| 22 | Madison | Wisconsin | Dane County | 0.2881 | 0 | gap |
| 23 | Modesto | California | Stanislaus County | 0.2759 | 0 | gap |
| 24 | Great Falls | Montana | Cascade County | 0.2567 | 0 | gap |
| 25 | Fort Collins | Colorado | Larimer County | 0.2548 | 0 | gap |

## Batch 2 — combined ag_score 5.308

**Theme:** Montana (4), Missouri (2), New Mexico (2), North Dakota (2)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Bozeman | Montana | Gallatin County | 0.2505 | 0 | gap |
| 2 | Springfield | Missouri | Greene County | 0.2456 | 0 | gap |
| 3 | Las Cruces | New Mexico | Doña Ana County | 0.2456 | 0 | gap |
| 4 | Boise | Idaho | Ada County | 0.2452 | 0 | gap |
| 5 | Fargo | North Dakota | Cass County | 0.2445 | 0 | gap |
| 6 | Cedar Rapids | Iowa | Linn County | 0.2249 | 0 | gap |
| 7 | Huntsville | Alabama | Madison County | 0.2179 | 0 | gap |
| 8 | Havre | Montana | Hill County | 0.2124 | 0 | gap |
| 9 | Sidney | Montana | Richland County | 0.2098 | 1 | light |
| 10 | Salem | Oregon | Marion County | 0.2096 | 1 | light |
| 11 | Visalia | California | Tulare County | 0.2094 | 1 | light |
| 12 | Glendive | Montana | Dawson County | 0.2085 | 0 | gap |
| 13 | Columbia | Missouri | Boone County | 0.2083 | 0 | gap |
| 14 | Rochester | New York | Monroe County | 0.2078 | 0 | gap |
| 15 | Manhattan | Kansas | Riley County | 0.2062 | 0 | gap |
| 16 | Pueblo | Colorado | Pueblo County | 0.2045 | 0 | gap |
| 17 | Grand Island | Nebraska | Hall County | 0.2019 | 0 | gap |
| 18 | Greeley | Colorado | Weld County | 0.2018 | 0 | gap |
| 19 | Salina | Kansas | Saline County | 0.1997 | 1 | light |
| 20 | Rochester | Minnesota | Olmsted County | 0.1989 | 0 | gap |
| 21 | Davenport | Iowa | Scott County | 0.1936 | 0 | gap |
| 22 | Springfield | Illinois | Sangamon County | 0.1928 | 0 | gap |
| 23 | Peoria | Illinois | Peoria County | 0.1918 | 1 | light |
| 24 | Roswell | New Mexico | Chaves County | 0.1909 | 0 | gap |
| 25 | Grand Forks | North Dakota | Grand Forks County | 0.1864 | 0 | gap |

## Batch 3 — combined ag_score 4.301

**Theme:** Montana (5), South Dakota (4), Nebraska (3), Kansas (3)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Kearney | Nebraska | Buffalo County | 0.1851 | 0 | gap |
| 2 | Garden City | Kansas | Finney County | 0.1837 | 0 | gap |
| 3 | Dodge City | Kansas | Ford County | 0.1834 | 0 | gap |
| 4 | Clovis | New Mexico | Curry County | 0.1823 | 0 | gap |
| 5 | Billings | Montana | — | 0.1794 | 2 | light |
| 6 | Norfolk | Nebraska | Madison County | 0.1774 | 0 | gap |
| 7 | Minot | North Dakota | Ward County | 0.1765 | 0 | gap |
| 8 | Liberal | Kansas | Seward County | 0.1762 | 0 | gap |
| 9 | North Platte | Nebraska | Lincoln County | 0.1761 | 0 | gap |
| 10 | Yuma | Arizona | Yuma County | 0.1761 | 0 | gap |
| 11 | Aberdeen | South Dakota | Brown County | 0.1734 | 0 | gap |
| 12 | Harrisburg | Montana | — | 0.1714 | 1 | light |
| 13 | Livingston | Montana | — | 0.1714 | 1 | light |
| 14 | Hamilton | Montana | — | 0.1714 | 1 | light |
| 15 | Townsend | Montana | — | 0.1714 | 1 | light |
| 16 | Brookings | South Dakota | Brookings County | 0.1696 | 0 | gap |
| 17 | Buckeye | Arizona | Maricopa County | 0.1695 | 0 | gap |
| 18 | Murfreesboro | Tennessee | Rutherford County | 0.1691 | 0 | gap |
| 19 | Watertown | South Dakota | Codington County | 0.1685 | 0 | gap |
| 20 | Ames | Iowa | Story County | 0.1629 | 1 | light |
| 21 | Mitchell | South Dakota | Davison County | 0.1625 | 1 | light |
| 22 | Bloomington | Illinois | McLean County | 0.1618 | 0 | gap |
| 23 | Stillwater | Oklahoma | Payne County | 0.1607 | 0 | gap |
| 24 | Enid | Oklahoma | Garfield County | 0.1606 | 0 | gap |
| 25 | Williston | North Dakota | Williams County | 0.1603 | 0 | gap |

## Batch 4 — combined ag_score 3.479

**Theme:** Kansas (12), Nebraska (4), New Mexico (1), Illinois (1)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Portales | New Mexico | Roosevelt County | 0.1593 | 0 | gap |
| 2 | Decatur | Illinois | Macon County | 0.1532 | 0 | gap |
| 3 | Jamestown | North Dakota | Stutsman County | 0.1486 | 0 | gap |
| 4 | Athens | Georgia | Clarke County | 0.1452 | 0 | gap |
| 5 | Davis | California | Yolo County | 0.1446 | 0 | gap |
| 6 | Overland Park | Kansas | — | 0.1434 | 2 | light |
| 7 | Hiawatha | Kansas | — | 0.1434 | 2 | light |
| 8 | Wichita | Kansas | — | 0.1434 | 2 | light |
| 9 | Nebraska City | Nebraska | — | 0.1406 | 2 | light |
| 10 | Casa Grande | Arizona | Pinal County | 0.1397 | 0 | gap |
| 11 | Kansas City | Kansas | — | 0.1354 | 1 | light |
| 12 | Westmoreland | Kansas | — | 0.1354 | 1 | light |
| 13 | Seneca | Kansas | — | 0.1354 | 1 | light |
| 14 | Spring Hill | Kansas | — | 0.1354 | 1 | light |
| 15 | Hutchinson | Kansas | — | 0.1354 | 1 | light |
| 16 | Pratt | Kansas | — | 0.1354 | 1 | light |
| 17 | Thayer | Kansas | — | 0.1354 | 1 | light |
| 18 | Fort Scott | Kansas | — | 0.1354 | 1 | light |
| 19 | Ulysses | Kansas | — | 0.1354 | 1 | light |
| 20 | Yakima | Washington | Yakima County | 0.1344 | 0 | gap |
| 21 | Altus | Oklahoma | Jackson County | 0.1340 | 0 | gap |
| 22 | Lafayette | Louisiana | Lafayette Parish | 0.1331 | 1 | light |
| 23 | Dundee | Nebraska | — | 0.1326 | 1 | light |
| 24 | Spalding | Nebraska | — | 0.1326 | 1 | light |
| 25 | Springfield | Nebraska | — | 0.1326 | 1 | light |

## Batch 5 — combined ag_score 3.191

**Theme:** Nebraska (7), South Dakota (3), Arkansas (2), Iowa (2)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Belgrade | Nebraska | — | 0.1326 | 1 | light |
| 2 | Holdrege | Nebraska | — | 0.1326 | 1 | light |
| 3 | Fairfield | Nebraska | — | 0.1326 | 1 | light |
| 4 | Greenwood | Nebraska | — | 0.1326 | 1 | light |
| 5 | Leigh | Nebraska | — | 0.1326 | 1 | light |
| 6 | Hastings | Nebraska | — | 0.1326 | 1 | light |
| 7 | Hartington | Nebraska | — | 0.1326 | 1 | light |
| 8 | Lansing | Michigan | Ingham County | 0.1325 | 0 | gap |
| 9 | Mankato | Minnesota | Blue Earth County | 0.1321 | 0 | gap |
| 10 | Laramie | Wyoming | Albany County | 0.1311 | 0 | gap |
| 11 | Fayetteville | Arkansas | Washington County | 0.1301 | 1 | light |
| 12 | Mason City | Iowa | Cerro Gordo County | 0.1291 | 0 | gap |
| 13 | Guymon | Oklahoma | Texas County | 0.1290 | 1 | light |
| 14 | Woodward | Oklahoma | Woodward County | 0.1282 | 0 | gap |
| 15 | Quincy | Illinois | Adams County | 0.1277 | 0 | gap |
| 16 | Highmore | South Dakota | — | 0.1271 | 1 | light |
| 17 | Alcester | South Dakota | — | 0.1271 | 1 | light |
| 18 | Huron | South Dakota | — | 0.1271 | 1 | light |
| 19 | Ottumwa | Iowa | Wapello County | 0.1270 | 0 | gap |
| 20 | Bismarck | North Dakota | — | 0.1240 | 2 | light |
| 21 | Pasco | Washington | Franklin County | 0.1202 | 0 | gap |
| 22 | Sterling | Colorado | Logan County | 0.1193 | 0 | gap |
| 23 | Tuscaloosa | Alabama | Tuscaloosa County | 0.1186 | 0 | gap |
| 24 | Jonesboro | Arkansas | Craighead County | 0.1167 | 2 | light |
| 25 | Kenmare | North Dakota | — | 0.1160 | 1 | light |

## Batch 6 — combined ag_score 2.675

**Theme:** Indiana (5), Missouri (3), Minnesota (3), Wyoming (2)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Killdeer | North Dakota | — | 0.1160 | 1 | light |
| 2 | Eau Claire | Wisconsin | Eau Claire County | 0.1140 | 0 | gap |
| 3 | Lamar | Colorado | Prowers County | 0.1138 | 0 | gap |
| 4 | Lafayette | Indiana | Tippecanoe County | 0.1137 | 1 | light |
| 5 | Hannibal | Missouri | Marion County | 0.1135 | 0 | gap |
| 6 | Sikeston | Missouri | Scott County | 0.1127 | 0 | gap |
| 7 | Willmar | Minnesota | Kandiyohi County | 0.1120 | 0 | gap |
| 8 | Marshall | Missouri | Saline County | 0.1099 | 0 | gap |
| 9 | Suffolk | Virginia | Suffolk City | 0.1099 | 1 | light |
| 10 | Powell | Wyoming | Park County | 0.1094 | 0 | gap |
| 11 | Corvallis | Oregon | Benton County | 0.1092 | 0 | gap |
| 12 | Torrington | Wyoming | Goshen County | 0.1091 | 0 | gap |
| 13 | Muncie | Indiana | Delaware County | 0.1085 | 0 | gap |
| 14 | Bowling Green | Kentucky | Warren County | 0.1078 | 1 | light |
| 15 | Worthington | Minnesota | Nobles County | 0.1056 | 0 | gap |
| 16 | Greenville | North Carolina | Pitt County | 0.1055 | 0 | gap |
| 17 | Marshall | Minnesota | Lyon County | 0.1053 | 0 | gap |
| 18 | Kokomo | Indiana | Howard County | 0.1036 | 0 | gap |
| 19 | Terre Haute | Indiana | Vigo County | 0.1026 | 0 | gap |
| 20 | Duncan | Oklahoma | — | 0.1022 | 1 | light |
| 21 | Tulsa | Oklahoma | — | 0.1022 | 1 | light |
| 22 | Kalamazoo | Michigan | Kalamazoo County | 0.0986 | 0 | gap |
| 23 | Owensboro | Kentucky | Daviess County | 0.0973 | 0 | gap |
| 24 | Idaho Falls | Idaho | Bonneville County | 0.0968 | 0 | gap |
| 25 | Columbus | Indiana | Bartholomew County | 0.0958 | 0 | gap |

## Batch 7 — combined ag_score 2.321

**Theme:** Iowa (10), Colorado (8), Wyoming (2), Georgia (1)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Albany | Georgia | Dougherty County | 0.0951 | 0 | gap |
| 2 | Jackson | Tennessee | Madison County | 0.0951 | 1 | light |
| 3 | Windsor | Colorado | — | 0.0938 | 1 | light |
| 4 | Eaton | Colorado | — | 0.0938 | 1 | light |
| 5 | Brighton | Colorado | — | 0.0938 | 1 | light |
| 6 | Kersey | Colorado | — | 0.0938 | 1 | light |
| 7 | Wray | Colorado | — | 0.0938 | 1 | light |
| 8 | Loveland | Colorado | — | 0.0938 | 1 | light |
| 9 | Grand Junction | Colorado | — | 0.0938 | 1 | light |
| 10 | Englewood | Colorado | — | 0.0938 | 1 | light |
| 11 | Dothan | Alabama | Houston County | 0.0929 | 1 | light |
| 12 | Fond du Lac | Wisconsin | Fond du Lac County | 0.0925 | 0 | gap |
| 13 | Ely | Iowa | — | 0.0922 | 1 | light |
| 14 | Alden | Iowa | — | 0.0922 | 1 | light |
| 15 | Des Moines | Iowa | — | 0.0922 | 1 | light |
| 16 | Harlan | Iowa | — | 0.0922 | 1 | light |
| 17 | Iowa City | Iowa | — | 0.0922 | 1 | light |
| 18 | Grinnell | Iowa | — | 0.0922 | 1 | light |
| 19 | Runnells | Iowa | — | 0.0922 | 1 | light |
| 20 | Morris | Iowa | — | 0.0922 | 1 | light |
| 21 | Overbrook | Iowa | — | 0.0922 | 1 | light |
| 22 | Nebraska City | Iowa | — | 0.0922 | 1 | light |
| 23 | Dayton | Wyoming | — | 0.0911 | 1 | light |
| 24 | Lander | Wyoming | — | 0.0911 | 1 | light |
| 25 | Champaign | Illinois | — | 0.0908 | 2 | light |

## Batch 8 — combined ag_score 2.103

**Theme:** Illinois (8), Minnesota (8), Missouri (3), Wisconsin (1)

| # | City | State | County | ag_score | Operators | Status |
|---|------|-------|--------|---------:|----------:|--------|
| 1 | Effingham | Illinois | — | 0.0908 | 2 | light |
| 2 | Wausau | Wisconsin | Marathon County | 0.0884 | 0 | gap |
| 3 | Rolla | Missouri | — | 0.0869 | 1 | light |
| 4 | Bonnots Mill | Missouri | — | 0.0869 | 1 | light |
| 5 | Arbela | Missouri | — | 0.0869 | 1 | light |
| 6 | Twin Falls | Idaho | Twin Falls County | 0.0855 | 1 | light |
| 7 | Findlay | Ohio | Hancock County | 0.0843 | 0 | gap |
| 8 | Pine Bluff | Arkansas | Jefferson County | 0.0843 | 0 | gap |
| 9 | Logan | Utah | Cache County | 0.0839 | 0 | gap |
| 10 | Mendon | Illinois | — | 0.0828 | 1 | light |
| 11 | Jacksonville | Illinois | — | 0.0828 | 1 | light |
| 12 | Heyworth | Illinois | — | 0.0828 | 1 | light |
| 13 | El Paso | Illinois | — | 0.0828 | 1 | light |
| 14 | Winfield | Illinois | — | 0.0828 | 1 | light |
| 15 | Elgin | Minnesota | — | 0.0828 | 1 | light |
| 16 | Near Minneapolis | Minnesota | — | 0.0828 | 1 | light |
| 17 | Southwest | Minnesota | — | 0.0828 | 1 | light |
| 18 | Plymouth | Minnesota | — | 0.0828 | 1 | light |
| 19 | New York Mills | Minnesota | — | 0.0828 | 1 | light |
| 20 | Menahga | Minnesota | — | 0.0828 | 1 | light |
| 21 | West-central | Minnesota | — | 0.0828 | 1 | light |
| 22 | Tonica | Illinois | — | 0.0828 | 1 | light |
| 23 | Byron | Minnesota | — | 0.0828 | 1 | light |
| 24 | Seneca | Illinois | — | 0.0828 | 1 | light |
| 25 | Valdosta | Georgia | Lowndes County | 0.0827 | 1 | light |
