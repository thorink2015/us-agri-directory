'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

export default function PremiumAcreForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'The Premium Acre founding-list signup',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again in a moment.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-11 h-11 text-green-600 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-1">
          You&apos;re on the list. I&apos;ll email you the moment The Premium
          Acre opens.
        </p>
        <p className="text-sm text-gray-500">Talk soon, Eugen</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input type="hidden" name="_form_type" value="premium-acre-signup" />
      <div>
        <label htmlFor="full_name" className="sr-only">
          Full name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          placeholder="Full name"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-800 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-60"
      >
        {loading ? 'Joining…' : 'Join the founding list'}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
      <p className="text-xs text-gray-500 text-center pt-1">
        No spam. Just one email when it opens.
      </p>
    </form>
  );
}
