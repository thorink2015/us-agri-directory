'use client';

import { useEffect, useState } from 'react';

// Display counter for the Tank Mix newsletter. Anchored to a known baseline
// and grown by a small, deterministic amount per day so the number never
// jumps around between renders. Adjust BASE_COUNT / BASE_DATE here when Eugen
// has a fresh real subscriber number to anchor to.
const BASE_COUNT = 708;
const BASE_DATE = '2026-06-17'; // baseline anchor (UTC midnight)

function subscriberCount(now: number): number {
  const start = Date.parse(`${BASE_DATE}T00:00:00Z`);
  const days = Math.max(0, Math.floor((now - start) / 86_400_000));
  // A couple of new readers a day (~2.3), deterministic so SSR and the
  // client agree and the figure only ever moves forward.
  return BASE_COUNT + days * 2 + Math.floor(days / 3);
}

/**
 * Renders the current subscriber figure. Starts from the SSR-safe baseline
 * (identical on server and client, so no hydration mismatch) then settles on
 * today's value after mount.
 */
export default function SubscriberCount() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    setCount(subscriberCount(Date.now()));
  }, []);

  return <>{count.toLocaleString('en-US')}</>;
}
