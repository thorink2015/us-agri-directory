import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Ruler, Zap, Calendar, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Free Tools for Farmers & Drone Operators | US Ag Drone Directory',
  description:
    'Free calculators and tools for farmers and agricultural drone operators: spray cost calculator, acreage converter, drone comparison, and treatment calendar.',
  alternates: { canonical: '/unelte' },
};

const tools = [
  {
    slug: 'calculator-pret-pulverizare',
    name: 'Spray Cost Calculator',
    description: 'Estimate the total cost of drone spraying for your operation based on acreage, crop type, and number of applications.',
    icon: Calculator,
    color: 'green',
  },
  {
    slug: 'calculator-hectare',
    name: 'Acreage Converter',
    description: 'Quick converter between acres, hectares, and square feet for field planning and quoting.',
    icon: Ruler,
    color: 'blue',
  },
  {
    slug: 'comparator-drone',
    name: 'Drone Comparison Tool',
    description: 'Compare DJI Agras, Hylio AG-272, and XAG P100 side by side: price, tank capacity, coverage rate, and NDAA compliance.',
    icon: Zap,
    color: 'yellow',
  },
  {
    slug: 'calendar-tratamente',
    name: 'Crop Treatment Calendar',
    description: 'Monthly guide to recommended drone application timing for corn, soybeans, wheat, cotton, rice, vineyards, and orchards.',
    icon: Calendar,
    color: 'purple',
  },
];

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-700 border-green-200',
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
          Free Tools for Farmers & Drone Operators
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Free online calculators and planning tools to estimate spray costs, compare drone equipment,
          and plan your application season.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/unelte/${tool.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className={`w-14 h-14 ${COLOR_MAP[tool.color]} border rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <span className="text-sm text-green-700 font-medium group-hover:underline">
                Open tool <ArrowRight className="w-4 h-4 inline" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
