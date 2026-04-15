import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Ruler, Zap, Calendar, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Free Calculators for Farmers & Drone Operators | US Ag Drone Directory',
  description:
    'Free online tools: drone spray cost calculator, ROI buy-vs-hire analysis, coverage time estimator, acreage converter, drone comparison, and crop treatment calendar.',
  alternates: { canonical: '/tools' },
};

const tools = [
  {
    slug: 'spray-cost-calculator',
    name: 'Spray Cost Calculator',
    description: 'Estimate total drone spray cost by crop, acreage, and number of applications. Includes comparison against ground rig rates.',
    icon: Calculator,
    color: 'green',
    badge: 'Most popular',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI: Buy vs. Hire',
    description: 'Should you buy a drone or hire an operator? Enter your acreage, crop mix, and budget to get a break-even analysis.',
    icon: TrendingUp,
    color: 'emerald',
    badge: 'New',
  },
  {
    slug: 'coverage-calculator',
    name: 'Coverage Time Estimator',
    description: 'How long will it take to spray your fields? Enter drone model, acres, and field layout to estimate job duration.',
    icon: Clock,
    color: 'orange',
    badge: 'New',
  },
  {
    slug: 'acreage-converter',
    name: 'Acreage Converter',
    description: 'Convert between acres, hectares, and square feet instantly. Useful for quoting and USDA program applications.',
    icon: Ruler,
    color: 'blue',
    badge: null,
  },
  {
    slug: 'drone-comparison',
    name: 'Drone Comparison Tool',
    description: 'Compare DJI Agras T50, T25P, Hylio AG-272, and XAG P100 side by side: price, tank capacity, coverage rate, and NDAA status.',
    icon: Zap,
    color: 'yellow',
    badge: null,
  },
  {
    slug: 'treatment-calendar',
    name: 'Crop Treatment Calendar',
    description: 'Monthly guide to optimal drone application timing for corn, soybeans, wheat, cotton, rice, vineyards, and orchards.',
    icon: Calendar,
    color: 'purple',
    badge: null,
  },
];

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-700 border-green-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function ToolsHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Tools' }]} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Free Tools for Farmers &amp; Drone Operators
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Six free calculators and planning tools to estimate spray costs, compare buy-vs-hire options,
          size your drone fleet, and plan your application season.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${COLOR_MAP[tool.color]} border rounded-xl flex items-center justify-center`}>
                  <Icon className="w-7 h-7" />
                </div>
                {tool.badge && (
                  <span className="text-[11px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex-1">{tool.description}</p>
              <span className="text-sm text-green-700 font-medium group-hover:underline">
                Open tool <ArrowRight className="w-4 h-4 inline" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-2">About these tools</h2>
        <p className="text-sm text-gray-600">
          All calculators use 2025/2026 US market rates sourced from operator surveys and industry reports.
          Figures are estimates only. Contact verified operators via the{' '}
          <Link href="/operators" className="text-green-700 font-medium hover:underline">operator directory</Link>{' '}
          for binding quotes. Rates vary by region, field size, and product type.
        </p>
      </div>
    </div>
  );
}
