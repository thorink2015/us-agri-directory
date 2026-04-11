'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface Props {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function NewsletterForm({ variant = 'default', className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formspreeId =
    process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID ||
    process.env.NEXT_PUBLIC_FORMSPREE_ID ||
    '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !formspreeId) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_signup' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-3 ${className}`}>
        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm text-gray-200">
          Mulțumim! Verifică emailul pentru confirmare.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {variant === 'default' && (
        <div className="text-xs text-gray-400 mb-2">
          Primește lunar cele mai bune prețuri și oferte de la operatori
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email-ul tău"
          required
          className="flex-1 min-w-0 bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm placeholder:text-gray-500 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-slate-900 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? '...' : 'Abonează'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-2">A apărut o eroare. Încearcă din nou.</p>
      )}
    </form>
  );
}
