/**
 * Progressive enhancement for the timeline.
 *
 * The page is complete without this script: every section renders visible, the
 * next full moon is baked in at build time, and the rail and dock are ordinary
 * in-page anchors. What this adds is the moon filling with scroll progress, the
 * rail tracking the section you are in, and sections fading up as they arrive.
 */
import {
  nextFullMoon,
  formatFullMoon,
  formatFullMoonShort,
  phaseName,
} from '../lib/moon';
import { initMoonGL } from './moon-gl';

const root = document.documentElement;
const sections = [...document.querySelectorAll<HTMLElement>('[data-era]')];
const eraLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>('[data-era-link]'),
];
const phaseNameEl = document.querySelector<HTMLElement>('[data-phase-name]');
const phasePctEl = document.querySelector<HTMLElement>('[data-phase-pct]');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealed = new Set<HTMLElement>();
let currentEra = -1;
let lastProgress = -1;
let queued = false;
let drawMoons: ((progress: number) => void) | null = null;

/**
 * The marquee only animates when this control exists, so WCAG 2.2.2 (Pause,
 * Stop, Hide) is satisfied: with no script there is no motion to stop.
 */
function initMarqueePause(): void {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-marquee-pause]',
  );
  const marquee = button?.closest<HTMLElement>('.gc-marquee');
  if (!button || !marquee) return;
  button.addEventListener('click', () => {
    const paused = marquee.classList.toggle('is-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Play' : 'Pause';
  });
  button.hidden = false;
  marquee.classList.add('has-pause-control');
}

/** Refresh the baked-in date, in case this page was cached past the last moon. */
function refreshMoonDate(): void {
  const moon = nextFullMoon();
  const full = document.querySelector<HTMLElement>('[data-next-full]');
  const short = document.querySelector<HTMLElement>('[data-next-full-short]');
  if (full) full.textContent = formatFullMoon(moon);
  if (short) short.textContent = formatFullMoonShort(moon);
}

function scrollProgress(): number {
  const max = root.scrollHeight - root.clientHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, root.scrollTop / max));
}

function update(): void {
  queued = false;

  const progress = scrollProgress();
  // Cheap enough to redraw unconditionally: one triangle, and it also picks up
  // size changes after a resize.
  drawMoons?.(progress);

  if (Math.abs(progress - lastProgress) > 0.002) {
    lastProgress = progress;
    root.style.setProperty('--moon-progress', String(progress));
    root.classList.toggle('moon-is-full', progress > 0.9);
    if (phaseNameEl) phaseNameEl.textContent = phaseName(progress);
    if (phasePctEl) phasePctEl.textContent = `${Math.round(progress * 100)}%`;
  }

  const viewport = window.innerHeight;
  let active = -1;

  for (const section of sections) {
    const top = section.getBoundingClientRect().top;
    const index = Number(section.dataset.era);
    if (top < viewport * 0.5) active = index;
    if (top < viewport * 0.9) {
      const target = section.querySelector<HTMLElement>('[data-reveal]');
      if (target && !revealed.has(target)) {
        revealed.add(target);
        target.classList.add('is-visible');
      }
    }
  }

  if (active !== currentEra) {
    currentEra = active;
    for (const link of eraLinks) {
      const index = sections.findIndex(
        (section) => section.id === link.dataset.eraLink,
      );
      link.classList.toggle('is-current', index === active);
      link.classList.toggle('is-past', index < active);
      if (index === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
      if (index === active && link.closest('.dock')) keepDockLinkVisible(link);
    }
  }
}

/** Scroll only the dock, without moving the document or stealing focus. */
function keepDockLinkVisible(link: HTMLAnchorElement): void {
  const list = link.closest<HTMLElement>('.dock-list');
  if (!list || list.clientWidth === 0) return;
  const viewport = list.getBoundingClientRect();
  const item = link.getBoundingClientRect();
  const inset = 8;
  if (item.left < viewport.left + inset) {
    list.scrollLeft += item.left - viewport.left - inset;
  } else if (item.right > viewport.right - inset) {
    list.scrollLeft += item.right - viewport.right + inset;
  }
}

function updateDockOverflow(): void {
  const list = document.querySelector<HTMLElement>('.dock-list');
  const cue = document.querySelector<HTMLElement>('.dock-scroll-cue');
  if (list && cue) cue.hidden = list.scrollWidth <= list.clientWidth;
  const active = list?.querySelector<HTMLAnchorElement>('[aria-current]');
  if (active) keepDockLinkVisible(active);
}

function schedule(): void {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
}

/** With reduced motion, show everything at once and skip the fade entirely. */
function revealAll(): void {
  for (const target of document.querySelectorAll<HTMLElement>(
    '[data-reveal]',
  )) {
    revealed.add(target);
    target.classList.add('is-visible');
  }
}

function applyMotionPreference(): void {
  if (reducedMotion.matches) revealAll();
}

refreshMoonDate();
initMarqueePause();
applyMotionPreference();
update();

void initMoonGL().then((draw) => {
  drawMoons = draw;
  draw?.(scrollProgress());
});

document.addEventListener('scroll', schedule, { passive: true });
window.addEventListener(
  'resize',
  () => {
    updateDockOverflow();
    schedule();
  },
  { passive: true },
);
reducedMotion.addEventListener('change', () => {
  applyMotionPreference();
  schedule();
});

// Content stays visible if the bundle fails to load or initialization throws.
// Install the reveal listeners and mark the initial viewport before opting in.
updateDockOverflow();
root.classList.add('js');
