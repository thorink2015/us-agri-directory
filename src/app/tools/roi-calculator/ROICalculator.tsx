'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const DRONE_MODELS = [
  { id: 'dji-t25p', name: 'DJI Agras T25P', price: 12000, acresPerHour: 25, tankGal: 6.6, annualMaint: 800 },
  { id: 'dji-t50', name: 'DJI Agras T50', price: 20000, acresPerHour: 40, tankGal: 13.2, annualMaint: 1200 },
  { id: 'dji-t100', name: 'DJI Agras T100', price: 38000, acresPerHour: 75, tankGal: 26.4, annualMaint: 2000 },
  { id: 'hylio-ag272', name: 'Hylio AG-272', price: 27500, acresPerHour: 35, tankGal: 7.2, annualMaint: 1500 },
];

const HIRE_RATES: Record<string, number> = {
  corn: 15, soybeans: 14, wheat: 13, cotton: 17,
  rice: 18, grapes: 26, orchards: 28, 'cover-crops': 14,
};

const CROPS = [
  { id: 'corn', name: 'Corn', applicationsPerYear: 2 },
  { id: 'soybeans', name: 'Soybeans', applicationsPerYear: 2 },
  { id: 'wheat', name: 'Wheat', applicationsPerYear: 2 },
  { id: 'cotton', name: 'Cotton', applicationsPerYear: 3 },
  { id: 'rice', name: 'Rice', applicationsPerYear: 2 },
  { id: 'grapes', name: 'Grapes / Vineyards', applicationsPerYear: 5 },
  { id: 'orchards', name: 'Orchards', applicationsPerYear: 6 },
  { id: 'cover-crops', name: 'Cover Crop Seeding', applicationsPerYear: 1 },
];

export default function ROICalculator() {
  const [droneId, setDroneId] = useState('dji-t50');
  const [cropId, setCropId] = useState('corn');
  const [acres, setAcres] = useState(500);
  const [commercialAcres, setCommercialAcres] = useState(0);
  const [commercialRate, setCommercialRate] = useState(15);
  const [downPayPct, setDownPayPct] = useState(20);
  const [yearsView, setYearsView] = useState(3);

  const drone = useMemo(() => DRONE_MODELS.find((d) => d.id === droneId) || DRONE_MODELS[1], [droneId]);
  const crop = useMemo(() => CROPS.find((c) => c.id === cropId) || CROPS[0], [cropId]);
  const hireRate = HIRE_RATES[cropId] || 14;

  const results = useMemo(() => {
    const totalApplications = crop.applicationsPerYear;
    const annualOwnAcres = acres * totalApplications;
    const annualCommercialAcres = commercialAcres * totalApplications;

    // Annual hire cost (what you'd pay someone else)
    const annualHireCost = annualOwnAcres * hireRate;

    // Annual commercial revenue (if you spray for others)
    const annualCommercialRevenue = annualCommercialAcres * commercialRate;

    // Drone ownership costs
    const downPayment = (downPayPct / 100) * drone.price;
    const financed = drone.price - downPayment;
    // Simple 3-year loan at 7%
    const monthlyRate = 0.07 / 12;
    const months = 36;
    const monthlyPayment = financed > 0
      ? financed * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      : 0;
    const annualLoanPayment = monthlyPayment * 12;

    // Annual operating costs: ~$0.50/acre for battery wear, calibration, consumables
    const annualOpCost = (annualOwnAcres + annualCommercialAcres) * 0.5 + drone.annualMaint;
    // Insurance: ~$1,200/year for commercial coverage
    const annualInsurance = 1200;
    // Part 107 + Part 137 renewal + state license (averaged)
    const annualCerts = 400;

    const totalAnnualCost = annualLoanPayment + annualOpCost + annualInsurance + annualCerts;
    const netAnnualSavings = annualHireCost + annualCommercialRevenue - totalAnnualCost;

    // Year-by-year cumulative P&L
    const yearlyData = Array.from({ length: yearsView }, (_, i) => {
      const yr = i + 1;
      const cumSavings = netAnnualSavings * yr - downPayment;
      return { year: yr, cumulative: Math.round(cumSavings) };
    });

    const breakEvenYears = netAnnualSavings > 0
      ? drone.price / netAnnualSavings
      : null;

    return {
      annualHireCost: Math.round(annualHireCost),
      annualCommercialRevenue: Math.round(annualCommercialRevenue),
      totalAnnualCost: Math.round(totalAnnualCost),
      netAnnualSavings: Math.round(netAnnualSavings),
      downPayment: Math.round(downPayment),
      annualLoanPayment: Math.round(annualLoanPayment),
      annualOpCost: Math.round(annualOpCost),
      breakEvenYears,
      yearlyData,
      positive: netAnnualSavings > 0,
    };
  }, [drone, crop, acres, commercialAcres, commercialRate, downPayPct, hireRate, yearsView]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <h2 className="font-bold text-gray-900">Your Operation</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drone model</label>
            <select
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary crop</label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {CROPS.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your own acres to spray: <span className="text-green-700 font-bold">{acres.toLocaleString()}</span>
            </label>
            <input
              type="range" min={50} max={5000} step={50}
              value={acres}
              onChange={(e) => setAcres(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>50</span><span>5,000</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commercial acres (spraying for others): <span className="text-emerald-700 font-bold">{commercialAcres.toLocaleString()}</span>
            </label>
            <input
              type="range" min={0} max={5000} step={50}
              value={commercialAcres}
              onChange={(e) => setCommercialAcres(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0</span><span>5,000</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commercial charge rate: <span className="text-emerald-700 font-bold">${commercialRate}/acre</span>
            </label>
            <input
              type="range" min={10} max={35} step={1}
              value={commercialRate}
              onChange={(e) => setCommercialRate(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>$10</span><span>$35</span></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down payment: <span className="text-gray-700 font-bold">{downPayPct}%</span>
              <span className="text-gray-400 ml-1">({fmt(results.downPayment)})</span>
            </label>
            <input
              type="range" min={0} max={100} step={5}
              value={downPayPct}
              onChange={(e) => setDownPayPct(Number(e.target.value))}
              className="w-full accent-gray-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0%</span><span>100%</span></div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" /> Annual P&amp;L Summary
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Hire cost avoided</div>
            <div className="font-bold text-green-700 text-lg">{fmt(results.annualHireCost)}</div>
            <div className="text-xs text-gray-400">/year</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Commercial revenue</div>
            <div className="font-bold text-emerald-700 text-lg">{fmt(results.annualCommercialRevenue)}</div>
            <div className="text-xs text-gray-400">/year</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Total ownership cost</div>
            <div className="font-bold text-gray-700 text-lg">{fmt(results.totalAnnualCost)}</div>
            <div className="text-xs text-gray-400">/year</div>
          </div>
          <div className={`rounded-xl p-4 text-center ${results.positive ? 'bg-green-100' : 'bg-red-50'}`}>
            <div className="text-xs text-gray-500 mb-1">Net annual position</div>
            <div className={`font-bold text-lg ${results.positive ? 'text-green-700' : 'text-red-600'}`}>
              {results.netAnnualSavings >= 0 ? '+' : ''}{fmt(results.netAnnualSavings)}
            </div>
            <div className="text-xs text-gray-400">/year</div>
          </div>
        </div>

        {/* Break-even */}
        <div className={`flex items-start gap-3 p-4 rounded-xl mb-5 ${results.positive ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          {results.positive
            ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            : <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          }
          <div>
            {results.positive && results.breakEvenYears !== null ? (
              <p className="text-sm font-semibold text-gray-800">
                Break-even in <span className="text-green-700">{results.breakEvenYears.toFixed(1)} years</span>
                {results.breakEvenYears < 2 && ' — strong case for buying.'}
                {results.breakEvenYears >= 2 && results.breakEvenYears < 4 && ' — reasonable payback period.'}
                {results.breakEvenYears >= 4 && ' — consider increasing commercial acreage to improve ROI.'}
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-800">
                At current acreage, hiring is more cost-effective. Add commercial acres or increase your own operation to cross the break-even threshold.
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Assumes 3-year loan at 7% APR, {crop.applicationsPerYear} application{crop.applicationsPerYear > 1 ? 's' : ''}/year on {crop.name.toLowerCase()}, ${results.annualOpCost.toLocaleString()} operating costs/year.
            </p>
          </div>
        </div>

        {/* Year-by-year table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Cumulative P&amp;L (after down payment)</h3>
            <select
              value={yearsView}
              onChange={(e) => setYearsView(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded px-2 py-1"
            >
              {[3, 5, 7, 10].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
          <div className="space-y-2">
            {results.yearlyData.map((row) => {
              const pct = Math.min(Math.abs(row.cumulative) / (Math.abs(results.netAnnualSavings) * yearsView || 1) * 100, 100);
              return (
                <div key={row.year} className="flex items-center gap-3">
                  <div className="text-xs text-gray-500 w-12 flex-shrink-0">Yr {row.year}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${row.cumulative >= 0 ? 'bg-green-500' : 'bg-red-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className={`text-xs font-semibold w-20 text-right ${row.cumulative >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {row.cumulative >= 0 ? '+' : ''}{fmt(row.cumulative)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-3">Annual ownership cost breakdown</h3>
        <ul className="space-y-1.5">
          <li className="flex justify-between"><span>Loan payment (3-yr, 7% APR)</span><span className="font-medium">{fmt(results.annualLoanPayment)}</span></li>
          <li className="flex justify-between"><span>Operating costs (batteries, maintenance, calibration)</span><span className="font-medium">{fmt(results.annualOpCost)}</span></li>
          <li className="flex justify-between"><span>Commercial insurance (liability + hull)</span><span className="font-medium">$1,200</span></li>
          <li className="flex justify-between"><span>Certifications (Part 107, Part 137, state license)</span><span className="font-medium">$400</span></li>
          <li className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200"><span>Total</span><span>{fmt(results.totalAnnualCost)}</span></li>
        </ul>
      </div>
    </div>
  );
}
