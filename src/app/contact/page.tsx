import { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact | US Ag Drone Directory',
  description: 'Contact the US Ag Drone Directory team with questions, suggestions, or to add or update a listing.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact</h1>
      <p className="text-gray-600 mb-8">
        Have a question or suggestion? Reach us by email.
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <Mail className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">General inquiries</div>
            <a href="mailto:contact@usagdronedirectory.com" className="text-green-700 hover:underline text-sm">
              contact@usagdronedirectory.com
            </a>
          </div>
        </div>

        <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
          <MessageSquare className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Add or update a listing</div>
            <p className="text-sm text-gray-600 mb-2">
              If you&apos;re an operator or have corrections to an existing listing, use the dedicated form.
            </p>
            <Link
              href="/adauga-operator"
              className="text-sm text-green-700 font-medium hover:underline"
            >
              Operator listing form →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-2">Response time</h2>
        <p className="text-sm text-gray-600">
          We respond to emails within 48 business hours. New listing submissions are reviewed and published within the same window.
        </p>
      </div>
    </div>
  );
}
