'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

type FormType = 'contact' | 'listing';

interface Props {
  type: FormType;
}

export default function ContactForm({ type }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const subject = type === 'contact' ? 'Contact inquiry' : 'Directory submission';

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: subject }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please email contact@agdronedirectory.com directly.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {type === 'contact' ? 'Message sent!' : 'Submission received!'}
        </h3>
        <p className="text-sm text-gray-600">
          {type === 'contact'
            ? "We'll respond within 48 business hours."
            : "We'll review and publish your listing within 48 hours."}
        </p>
      </div>
    );
  }

  if (type === 'contact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="_form_type" value="contact" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
          <input
            name="subject"
            type="text"
            placeholder="What is this about?"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Sending…' : 'Send message'}
        </button>
      </form>
    );
  }

  // type === 'listing'
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_form_type" value="list-your-business" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name *</label>
          <input
            name="company"
            type="text"
            required
            placeholder="e.g. AgriForce Drone Services LLC"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
          <input
            name="state"
            type="text"
            required
            placeholder="e.g. Iowa"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="contact@yourcompany.com"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Services &amp; additional info</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Services offered, drone models, certifications (FAA Part 107/137), acres treated per season…"
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Submitting…' : 'Submit listing request'}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Free listing. We review and publish within 48 hours.
      </p>
    </form>
  );
}
