import { Metadata } from 'next';
import { CheckCircle, Clock, Globe } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: 'List Your Ag Drone Business | Free Operator Listing',
  description:
    'Add your agricultural drone business to the US Ag Drone Directory for free. Reviewed and published within 48 hours. Reach farmers searching in your state.',
  alternates: { canonical: '/adauga-operator' },
};

export default function AddOperatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'List Your Business' }]} />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          List your business in the directory
        </h1>
        <p className="text-gray-600 text-lg">
          Listings are <strong>100% free</strong> and published within 48 hours.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: CheckCircle, title: 'Always free', desc: 'No listing fee, now or ever.' },
          { icon: Clock, title: 'Fast publishing', desc: 'Profile live within 48 hours of submission.' },
          { icon: Globe, title: 'SEO visibility', desc: 'Profile optimized for Google and Bing searches.' },
        ].map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <b.icon className="w-7 h-7 text-green-600 mb-2" />
            <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
            <div className="text-xs text-gray-600">{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Business registration form</h2>
        <SubmitForm />
      </div>
    </div>
  );
}
