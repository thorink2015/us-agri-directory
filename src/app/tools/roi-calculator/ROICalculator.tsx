'use client';

import { useMemo, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const DRONE_MODELS = [
  { id: 'dji-t50', name: 'DJI Agras T50', price: 25000 },
  { id: 'dji-t25', name: 'DJI Agras T25', price: 18000 },
  { id: 'hylio-ag272', name: 'Hylio AG-272', price: 65000 },
  { id: 'talos-t60x', name: 'Talos T60X', price: 18000 },
];

const ANNUAL_INSURANCE = 1200;
const MAINTENANCE_PCT = 0.08;
const FUEL_PER_ACRE = 0.43;
const BATTERY_LIFE_YEARS = 2;

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function fmtCents(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function ROICalculator() {
  const [acres, setAcres] = useState(1000);
  const [acresInput, setAcresInput] = useState('1000');
  const [droneId, setDroneId] = useState('dji-t50');
  const [years, setYears] = useState(5);
  const [eqipPct, setEqipPct] = useState(0);
  const [interestRate, setInterestRate] = useState(7);
  const [hireRate, setHireRate] = useState(14);
  const [batteries, setBatteries] = useState(4);
  const [batteryCost, setBatteryCost] = useState(1200);

  const drone = useMemo(() => DRONE_MODELS.find((d) => d.id === droneId) ?? DRONE_MODELS[0], [droneId]);

  const results = useMemo(() => {
    const batteryPackCost = batteries * batteryCost;
    const discountedDrone = drone.price * (1 - eqipPct / 100);
    const financedAmount = discountedDrone + batteryPackCost;

    const rate = interestRate / 100;
    let annualPayment;
    if (rate === 0) {
      annualPayment = financedAmount / years;
    } else {
      annualPayment = financedAmount * (rate * Math.pow(1 + rate, years)) / (Math.pow(1 + rate, years) - 1);
    }

    const annualMaintenance = drone.price * MAINTENANCE_PCT;
    const annualFuel = acres * FUEL_PER_ACRE;
    const annualBatteryReplace = batteryPackCost / BATTERY_LIFE_YEARS;

    const totalAnnualOwnership = annualPayment + ANNUAL_INSURANCE + annualMaintenance + annualFuel + annualBatteryReplace;
    const ownershipCostPerAcre = acres > 0 ? totalAnnualOwnership / acres : 0;

    const annualHireCost = acres * hireRate;
    const savings = annualHireCost - totalAnnualOwnership;
    const breakEvenAcres = hireRate > 0 ? totalAnnualOwnership / hireRate : 0;

    const fiveYearOwn = totalAnnualOwnership * 5;
    const fiveYearHire = annualHireCost * 5;

    const pctDiff = annualHireCost > 0 ? Math.abs(savings) / annualHireCost : 0;
    const isClose = pctDiff < 0.1;

    return {
      financedAmount,
      discountedDrone,
      annualPayment,
      annualMaintenance,
      annualFuel,
      annualBatteryReplace,
      totalAnnualOwnership,
      ownershipCostPerAcre,
      annualHireCost,
      hireCostPerAcre: hireRate,
      savings,
      breakEvenAcres,
      fiveYearOwn,
      fiveYearHire,
      isClose,
    };
  }, [drone, acres, years, eqipPct, interestRate, hireRate, batteries, batteryCost]);

  function handleAcresInput(val: string) {
    setAcresInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 100 && n <= 10000) setAcres(n);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <h2 className="font-bold text-gray-900 text-lg">Your inputs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="roi-acres" className="block text-sm font-medium text-gray-700 mb-1">
              Annual acres you plan to spray
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="roi-acres"
                type="range"
                min={100}
                max={10000}
                step={50}
                value={acres}
                onChange={(e) => { setAcres(Number(e.target.value)); setAcresInput(e.target.value); }}
                className="flex-1 accent-green-700"
                aria-label="Annual acres"
              />
              <input
                type="number"
                min={100}
                max={10000}
                value={acresInput}
                onChange={(e) => handleAcresInput(e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:border-green-500 focus:outline-none"
                aria-label="Annual acres (direct entry)"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>100</span><span>10,000 acres</span>
            </div>
          </div>

          <div>
            <label htmlFor="roi-drone" className="block text-sm font-medium text-gray-700 mb-1">Drone model</label>
            <select
              id="roi-drone"
              value={droneId}
              onChange={(e) => setDroneId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {DRONE_MODELS.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({fmt(d.price)})</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="roi-years" className="block text-sm font-medium text-gray-700 mb-1">Ownership years</label>
            <select
              id="roi-years"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {[3, 5, 7].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="roi-eqip" className="block text-sm font-medium text-gray-700 mb-1">
              EQIP cost-share: <span className="text-emerald-700 font-bold">{eqipPct}%</span>
            </label>
            <input
              id="roi-eqip"
              type="range"
              min={0}
              max={75}
              step={5}
              value={eqipPct}
              onChange={(e) => setEqipPct(Number(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label="EQIP cost-share percentage"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>0%</span><span>75%</span>
            </div>
          </div>

          <div>
            <label htmlFor="roi-interest" className="block text-sm font-medium text-gray-700 mb-1">
              Interest rate: <span className="text-gray-700 font-bold">{interestRate}%</span>
            </label>
            <input
              id="roi-interest"
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-gray-500"
              aria-label="Interest rate"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>0%</span><span>15%</span>
            </div>
          </div>

          <div>
            <label htmlFor="roi-hire-rate" className="block text-sm font-medium text-gray-700 mb-1">
              Custom hire rate: <span className="text-green-700 font-bold">${hireRate}/acre</span>
            </label>
            <input
              id="roi-hire-rate"
              type="range"
              min={8}
              max={40}
              step={1}
              value={hireRate}
              onChange={(e) => setHireRate(Number(e.target.value))}
              className="w-full accent-green-700"
              aria-label="Custom hire rate per acre"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>$8</span><span>$40</span>
            </div>
          </div>

          <div>
            <label htmlFor="roi-batteries" className="block text-sm font-medium text-gray-700 mb-1">
              Batteries included: <span className="text-gray-700 font-bold">{batteries}</span>
            </label>
            <input
              id="roi-batteries"
              type="range"
              min={2}
              max={8}
              step={1}
              value={batteries}
              onChange={(e) => setBatteries(Number(e.target.value))}
              className="w-full accent-gray-500"
              aria-label="Batteries included"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>2</span><span>8</span>
            </div>
          </div>

          <div>
            <label htmlFor="roi-battery-cost" className="block text-sm font-medium text-gray-700 mb-1">
              Battery cost each: <span className="text-gray-700 font-bold">{fmt(batteryCost)}</span>
            </label>
            <input
              id="roi-battery-cost"
              type="range"
              min={500}
              max={3000}
              step={100}
              value={batteryCost}
              onChange={(e) => setBatteryCost(Number(e.target.value))}
              className="w-full accent-gray-500"
              aria-label="Battery cost each"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-0.5">
              <span>$500</span><span>$3,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Own vs Hire results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Own vs. Hire at {acres.toLocaleString()} acres/year</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-3 border border-gray-200 rounded-xl overflow-hidden mb-5">
          <div className="bg-gray-50 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Metric</div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>Annual cost</div>
              <div>Cost per acre</div>
              <div>5-year total</div>
            </div>
          </div>
          <div className={`px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200 ${results.savings > 0 ? 'bg-green-50' : 'bg-white'}`}>
            <div className="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2">Own</div>
            <div className="space-y-3 text-sm">
              <div className="font-bold text-gray-900">{fmt(results.totalAnnualOwnership)}</div>
              <div className="font-bold text-gray-900">{fmtCents(results.ownershipCostPerAcre)}</div>
              <div className="font-bold text-gray-900">{fmt(results.fiveYearOwn)}</div>
            </div>
          </div>
          <div className={`px-4 py-3 ${results.savings < 0 ? 'bg-green-50' : 'bg-white'}`}>
            <div className="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-2">Hire</div>
            <div className="space-y-3 text-sm">
              <div className="font-bold text-gray-900">{fmt(results.annualHireCost)}</div>
              <div className="font-bold text-gray-900">{fmtCents(results.hireCostPerAcre)}</div>
              <div className="font-bold text-gray-900">{fmt(results.fiveYearHire)}</div>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className={`p-4 rounded-xl mb-4 ${
          results.isClose
            ? 'bg-amber-50 border border-amber-200'
            : results.savings > 0
              ? 'bg-green-50 border border-green-200'
              : 'bg-gray-50 border border-gray-200'
        }`}>
          {results.isClose ? (
            <p className="text-sm font-semibold text-gray-800">
              At {acres.toLocaleString()} acres, owning and hiring cost about the same. Ownership makes sense if you value scheduling control and plan to grow acreage.
            </p>
          ) : results.savings > 0 ? (
            <p className="text-sm font-semibold text-gray-800">
              Owning saves you <span className="text-green-700">{fmt(results.savings)}</span> per year
              ({fmtCents(results.savings / acres)} per acre) at {acres.toLocaleString()} acres.
            </p>
          ) : (
            <p className="text-sm font-semibold text-gray-800">
              Hiring is <span className="text-green-700">{fmt(Math.abs(results.savings))}</span> per year cheaper at {acres.toLocaleString()} acres.
              Break-even is approximately <span className="text-green-700">{Math.round(results.breakEvenAcres).toLocaleString()}</span> acres per year.
            </p>
          )}
        </div>

        {/* EQIP callout */}
        {eqipPct > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-4">
            <p className="text-sm text-gray-800">
              <span className="font-semibold text-emerald-700">EQIP cost-share</span> reduces your drone purchase from{' '}
              <span className="font-semibold">{fmt(drone.price)}</span> to{' '}
              <span className="font-semibold">{fmt(results.discountedDrone)}</span>, lowering break-even to{' '}
              <span className="font-semibold">{Math.round(results.breakEvenAcres).toLocaleString()}</span> acres per year.
            </p>
          </div>
        )}
      </div>

      {/* Ownership cost breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-3">Annual ownership cost breakdown</h3>
        <ul className="space-y-1.5">
          <li className="flex justify-between">
            <span>Amortized payment ({years}-yr @ {interestRate}% on {fmt(results.financedAmount)})</span>
            <span className="font-medium">{fmt(results.annualPayment)}</span>
          </li>
          <li className="flex justify-between">
            <span>Insurance</span>
            <span className="font-medium">{fmt(ANNUAL_INSURANCE)}</span>
          </li>
          <li className="flex justify-between">
            <span>Maintenance &amp; repairs (8% of drone price)</span>
            <span className="font-medium">{fmt(results.annualMaintenance)}</span>
          </li>
          <li className="flex justify-between">
            <span>Generator fuel (${FUEL_PER_ACRE}/acre × {acres.toLocaleString()})</span>
            <span className="font-medium">{fmt(results.annualFuel)}</span>
          </li>
          <li className="flex justify-between">
            <span>Battery replacement (every {BATTERY_LIFE_YEARS} years)</span>
            <span className="font-medium">{fmt(results.annualBatteryReplace)}</span>
          </li>
          <li className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total annual ownership</span>
            <span>{fmt(results.totalAnnualOwnership)}</span>
          </li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          From University of Missouri Extension G1274. Assumes owner-operator (no pilot labor cost). Chemical cost excluded (same whether you own or hire).
        </p>
      </div>
    </div>
  );
}
