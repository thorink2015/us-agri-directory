import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Shield, Globe, TrendingUp, BookOpen, Users, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { operators } from '@/data/operators';

export const metadata: Metadata = {
  title: 'About US Ag Drone Directory | How We Research & Verify Operators',
  description:
    'US Ag Drone Directory connects farmers with verified agricultural drone operators across all 50 states. Learn how we research, verify listings, and keep our data current.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About US Ag Drone Directory',
    description: 'The most complete directory of agricultural drone operators in the United States. Learn how we verify listings and keep data current.',
    url: 'https://usagdronedirectory.com/about',
  },
};

// Editor/Reviewer data moved to src/data/author.ts (single source of truth).
// /about page will be rewritten to the new 8-section structure in G3.
// For now leave existing placeholder rendering intact — unchanged below.
const EDITOR = {
  name: '{{EDITOR_NAME}}',
  title: '{{EDITOR_TITLE}}',
  bio: '{{EDITOR_BIO}}',
  linkedin: '{{EDITOR_LINKEDIN_URL}}',
  photo: '{{EDITOR_PHOTO_URL}}',
};
const REVIEWER = {
  name: '{{REVIEWER_NAME}}',
  credentials: '{{REVIEWER_CREDENTIALS}}',
  bio: '{{REVIEWER_BIO}}',
};

export default function AboutPage() {
  const totalAcres = operators.reduce((sum, op) => sum + (op.haTreated || 0), 0);
  const verifiedCount = operators.filter((op) => op.verified).length;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'US Ag Drone Directory',
    url: 'https://usagdronedirectory.com',
    description: 'The most complete directory of agricultural drone operators in the United States.',
    foundingDate: '2024',
    areaServed: { '@type': 'Country', name: 'United States' },
    sameAs: [],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://usagdronedirectory.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://usagdronedirectory.com/about' },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ label: 'About' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">About US Ag Drone Directory</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        The most complete directory of agricultural drone operators in the United States. We connect farmers with verified drone spraying, seeding, and mapping services in their area — no middlemen, no commissions.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: `${operators.length}+`, label: 'Operators listed' },
          { value: `${verifiedCount}`, label: 'Verified operators' },
          { value: '50', label: 'States covered' },
          { value: `${(totalAcres / 1000).toFixed(0)}K+`, label: 'Acres treated' },
        ].map((s) => (
          <div key={s.label} className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-800">{s.value}</div>
            <div className="text-xs text-green-700 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Why we built this */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why we built this directory</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The US agricultural drone services market is growing at over 30% per year — but farmers searching for local spray operators found generic results, equipment retailers, and outdated forum posts, not service providers. Operators, on the other side, had no cost-effective way to get discovered by farmers in their coverage area.
          </p>
          <p>
            We built US Ag Drone Directory to close that gap: structured operator profiles with verified certifications, service types, estimated per-acre rates, and direct contact — all free for operators to list, and free for farmers to use.
          </p>
        </div>
      </section>

      {/* Mission pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: Target, title: 'Our mission', desc: 'Connect farmers with verified agricultural drone operators across all 50 states, as directly and quickly as possible.' },
          { icon: Shield, title: 'Verified listings', desc: 'Every operator is reviewed before publishing: FAA certifications, services offered, state licensing, and contact information.' },
          { icon: Globe, title: 'Full US coverage', desc: 'All 50 states. Corn Belt fungicide, Delta cotton, California vineyards, Pacific Northwest orchards, and everything in between.' },
          { icon: TrendingUp, title: 'Always current', desc: 'New operators added weekly. Per-acre rate benchmarks updated each season from operator surveys and market data.' },
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

      {/* How we research */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" /> How we research
        </h2>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p><strong>Primary sources only.</strong> Every fact on this site — pricing benchmarks, treatment windows, yield response data, FAA requirements — cites a primary source: FAA.gov, USDA, EPA, land-grant university extension publications, or peer-reviewed research. We do not rely on secondary aggregators or unverified claims.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p><strong>Operator verification.</strong> Each operator listing is reviewed against public FAA airmen records (for Part 107 Remote Pilot Certificate holders), state pesticide applicator license databases where publicly accessible, and direct contact verification. Operators displaying the verified badge have completed our review process.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p><strong>Pricing data.</strong> Per-acre rate ranges are compiled from operator surveys, public quotes, USDA cost-of-production data, and direct interviews. Rates are reviewed each spray season (spring and fall) and updated to reflect current market conditions.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p><strong>Regulatory content.</strong> Pages covering FAA regulations, EPA FIFRA requirements, and state pesticide licensing are reviewed by a licensed Part 137 Agricultural Aircraft Operator before publication and updated quarterly as regulations change.</p>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p><strong>Last-reviewed dates.</strong> Every page on the site displays the date it was last reviewed. Pages older than 90 days for regulatory content and 180 days for pricing content are flagged for refresh before the next season.</p>
          </div>
        </div>
      </section>

      {/* E-E-A-T: Editorial team */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" /> Editorial team
        </h2>

        {/* Managing Editor */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden">
              {/* PLACEHOLDER: Replace with actual photo */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center leading-tight p-1">
                Photo
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900">{EDITOR.name}</div>
              <div className="text-sm text-green-700 font-medium mb-2">{EDITOR.title}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{EDITOR.bio}</p>
              {/* PLACEHOLDER: uncomment when LinkedIn URL is available
              <a href={EDITOR.linkedin} target="_blank" rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                LinkedIn profile
              </a> */}
            </div>
          </div>
        </div>

        {/* Expert Reviewer */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center leading-tight p-1">
                Photo
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900">{REVIEWER.name}</div>
              <div className="text-sm text-green-700 font-medium mb-1">Expert Reviewer</div>
              <div className="text-xs text-gray-500 mb-2">{REVIEWER.credentials}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{REVIEWER.bio}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Regulatory pages (FAA, EPA, state licensing) are reviewed by a credentialed expert before publication.
          All other content is reviewed by the managing editor. Contact us at{' '}
          <Link href="/contact" className="text-green-700 hover:underline">contact page</Link> to flag errors or request corrections.
        </p>
      </section>

      {/* How listings work */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How listings work</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Listing your business in US Ag Drone Directory is and will remain <strong>completely free</strong> for all agricultural drone operators in the US. We do not charge commissions, take referral fees, or hide features behind a paywall. Basic listings are free — permanently.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Featured placement (displayed first in state and service listings) is available for operators who want to increase visibility. Contact us for current availability and pricing.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="font-medium text-gray-900 mb-2">Are you an agricultural drone operator?</p>
          <p className="text-sm text-gray-600 mb-3">
            Add your business for free and connect with farmers in your coverage area.
          </p>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            List your business free
          </Link>
        </div>
      </section>

      {/* Internal links */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore the directory</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {[
            { href: '/operators', label: 'Find Operators' },
            { href: '/states', label: 'Browse by State' },
            { href: '/crops', label: 'Browse by Crop' },
            { href: '/services', label: 'Browse by Service' },
            { href: '/pricing', label: 'Pricing Guide' },
            { href: '/guides', label: 'How-To Guides' },
            { href: '/tools', label: 'Free Calculators' },
            { href: '/glossary', label: 'Ag Drone Glossary' },
            { href: '/contact', label: 'Contact Us' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-green-300 hover:text-green-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
