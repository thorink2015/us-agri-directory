import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Shield, Globe, TrendingUp } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { operators } from '@/data/operators';

export const metadata: Metadata = {
  title: 'About Us | US Agricultural Drone Directory',
  description:
    'US Ag Drone Directory is the most complete directory of agricultural drone operators in the United States. Our mission: connect farmers with verified drone spraying services near them.',
  alternates: { canonical: '/despre' },
};

export default function AboutPage() {
  const totalAcres = operators.reduce((sum, op) => sum + (op.haTreated || 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'About' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">About US Ag Drone Directory</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed">
          <strong>US Ag Drone Directory</strong> is the most complete directory of agricultural drone operators in the United States. Our mission is simple: connect farmers with verified drone spraying services in their area — as quickly and easily as possible.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          {[
            { value: `${operators.length}+`, label: 'Operators listed' },
            { value: '50', label: 'States covered' },
            { value: `${(totalAcres / 1000).toFixed(0)}K+`, label: 'Acres treated' },
            { value: '100%', label: 'Free listing' },
          ].map((s) => (
            <div key={s.label} className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-800">{s.value}</div>
              <div className="text-xs text-green-700 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why we built this directory</h2>
        <p className="leading-relaxed">
          The US agricultural drone market is growing fast — but farmers didn&apos;t have a reliable, centralized resource to find vetted local operators. Searching &ldquo;ag drone spraying [state]&rdquo; returned generic results and equipment retailers, not service providers. Operators, on the other hand, had no cost-effective way to get discovered online.
        </p>
        <p className="leading-relaxed">
          We built US Ag Drone Directory to fill that gap: a structured directory with detailed operator profiles, estimated per-acre rates, service filters, and direct contact — no middlemen, no commissions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {[
            { icon: Target, title: 'Our mission', desc: 'Connect farmers with verified agricultural drone operators across all 50 states.' },
            { icon: Shield, title: 'Verified listings', desc: 'Every operator is reviewed before publishing — certifications, services, and contact information.' },
            { icon: Globe, title: 'Full US coverage', desc: 'All 50 states. From the Corn Belt to California vineyards to the Delta rice fields.' },
            { icon: TrendingUp, title: 'Always current', desc: 'New operators added regularly. Pricing benchmarks updated each season.' },
          ].map((b) => (
            <div key={b.title} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <b.icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How listings work</h2>
        <p className="leading-relaxed">
          Listing your business in US Ag Drone Directory is and will remain <strong>completely free</strong> for all agricultural drone operators in the US. We don&apos;t charge commissions, take referral fees, or hide features behind a paywall. Basic listings are free — forever.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <p className="font-medium text-gray-900 mb-2">Are you an agricultural drone operator?</p>
          <p className="text-sm text-gray-600 mb-3">
            Add your business for free and connect with farmers across your state and region.
          </p>
          <Link
            href="/adauga-operator"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            List your business free
          </Link>
        </div>
      </div>
    </div>
  );
}
