// Per-domain politeness gate. Ensures we never hit the same hostname
// faster than perDomainDelayMs. Cross-domain parallelism is handled by
// p-limit; this layer only governs same-domain spacing.

const lastHitAt = new Map<string, number>();

function jitter(baseMs: number): number {
  // 50% jitter band: between 0.75x and 1.25x the configured delay.
  const span = baseMs * 0.5;
  return baseMs - span / 2 + Math.random() * span;
}

export async function waitForDomainSlot(
  domain: string,
  delayMs: number,
): Promise<void> {
  const now = Date.now();
  const last = lastHitAt.get(domain) ?? 0;
  const elapsed = now - last;
  const target = jitter(delayMs);
  if (elapsed < target) {
    await new Promise<void>((r) => setTimeout(r, target - elapsed));
  }
  lastHitAt.set(domain, Date.now());
}

export function resetDomainQueue(): void {
  lastHitAt.clear();
}
