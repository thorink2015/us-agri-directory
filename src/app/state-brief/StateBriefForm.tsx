'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

const RADIUS_OPTIONS = [
  { value: '', label: 'How far will you travel?' },
  { value: 'my-city', label: 'My city only' },
  { value: '25-miles', label: 'Within 25 miles' },
  { value: '50-miles', label: 'Within 50 miles' },
  { value: '100-miles', label: 'Within 100 miles' },
  { value: '250-miles', label: 'Within 250 miles' },
  { value: 'whole-state', label: 'Whole state' },
  { value: 'multi-state', label: 'Multi-state' },
];

const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'New Zealand',
  'Other',
];

export default function StateBriefForm() {
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
          _subject: `State brief request: ${data.state || 'unknown'} (${data.country || 'unknown'})`,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
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
      <div className="text-center py-6">
        <CheckCircle className="w-11 h-11 text-green-600 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Got it. Your brief is on the way.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Give me a few days to pull it together. It lands in your inbox.
        </p>
        <p className="text-sm text-gray-500 mt-4">Talk soon, Eugen</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input type="hidden" name="_form_type" value="state-brief-request" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="first_name" className="sr-only">
            First name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="sr-only">
            Last name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
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

      <div>
        <label htmlFor="phone" className="sr-only">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Phone"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="sr-only">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="City"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="state" className="sr-only">
            State or region
          </label>
          <input
            id="state"
            name="state"
            type="text"
            required
            autoComplete="address-level1"
            placeholder="State or region"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            defaultValue="United States"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service_radius" className="sr-only">
            How far will you travel?
          </label>
          <select
            id="service_radius"
            name="service_radius"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            {RADIUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="sr-only">
          Anything else about the area you fly
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Anything else about the area you fly? Counties, crops, specialty work you want to focus on, or how much of your state you can cover. Whole state is fine."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
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
        {loading ? 'Sending…' : 'Send me my state brief'}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>

      <p className="text-xs text-gray-500 text-center pt-1">
        Free. One brief per operator. Your details stay with me.
      </p>
    </form>
  );
}
