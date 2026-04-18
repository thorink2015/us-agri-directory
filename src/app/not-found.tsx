import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Ag Drone Directory',
  description:
    'The page you requested could not be found. Browse operators, states, crops and services on the US Ag Drone Directory.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Plane className="w-8 h-8 text-green-700 rotate-45" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try navigating to one of the pages below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Home
          </Link>
          <Link
            href="/operators"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-green-400 hover:text-green-700 transition-colors"
          >
            <Search className="w-4 h-4" /> Find Operators
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {[
            { href: '/states', label: 'Browse by State' },
            { href: '/crops', label: 'Crops' },
            { href: '/services', label: 'Services' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/guides', label: 'Guides' },
            { href: '/list-your-business', label: 'List Your Business' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
