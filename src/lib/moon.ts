/**
 * Moon phase helpers shared by the build-time render and the browser script.
 * Kept apart from `src/data/site.ts` so the client bundle does not pull in the
 * whole content module.
 */

/** Mean synodic month, in days. */
const SYNODIC_MONTH = 29.530588853;
/** A known full moon: 2000-01-21 04:41 UTC. */
const REFERENCE_FULL_MOON = Date.UTC(2000, 0, 21, 4, 41);
const DAY_MS = 864e5;

/** The next full moon at or after `now`. */
export function nextFullMoon(now: number = Date.now()): Date {
  const cycles = Math.ceil((now - REFERENCE_FULL_MOON) / DAY_MS / SYNODIC_MONTH);
  return new Date(REFERENCE_FULL_MOON + cycles * SYNODIC_MONTH * DAY_MS);
}

export function formatFullMoon(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function formatFullMoonShort(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const PHASE_NAMES = [
  'New moon',
  'Waxing crescent',
  'First quarter',
  'Waxing gibbous',
  'Full moon',
] as const;

/** Names the illuminated fraction `progress` (0–1) as a phase. */
export function phaseName(progress: number): string {
  if (progress < 0.04) return PHASE_NAMES[0];
  if (progress < 0.35) return PHASE_NAMES[1];
  if (progress < 0.6) return PHASE_NAMES[2];
  if (progress < 0.96) return PHASE_NAMES[3];
  return PHASE_NAMES[4];
}
