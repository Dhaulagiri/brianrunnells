/** Small, local-only toys for the timeline's nostalgic interfaces. */
const guestbook = document.querySelector<HTMLButtonElement>('[data-guestbook]');
guestbook?.addEventListener('click', () => {
  const status = document.querySelector<HTMLElement>('[data-guestbook-status]');
  if (status) status.textContent = '★ Signed! Your imaginary guestbook entry is certified 1997. (Just for this visit.)';
  guestbook.setAttribute('aria-pressed', 'true');
});
document.querySelector('[data-webring]')?.addEventListener('click', () => {
  const eras = ['era-1', 'era-2', 'era-3', 'era-4', 'era-5'];
  location.hash = eras[Math.floor(Math.random() * eras.length)];
});
const lessons: Record<string, string> = {
  Resources: 'Available resources: curiosity, coffee, and one bike. All running on the free imagination tier.',
  Deploy: '✓ Deployed a tiny imaginary app. Release notes: more moonlight, fewer meetings.',
  Metrics: 'Moonlight uptime: excellent. Coffee consumption: above baseline. These metrics are entirely made up.',
  Activity: 'Just now: you explored the dashboard. Earlier: the moon shipped another phase. No rollback needed.',
};
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-heroku-view]')) {
  button.addEventListener('click', () => {
    const selected = button.dataset.herokuView!;
    for (const peer of document.querySelectorAll('[data-heroku-view]')) {
      peer.setAttribute('aria-pressed', String(peer === button));
      peer.parentElement?.classList.toggle('is-current', peer === button);
    }
    const overview = document.querySelector<HTMLElement>('[data-heroku-overview]');
    const status = document.querySelector<HTMLElement>('[data-heroku-status]');
    if (overview) overview.hidden = selected !== 'Overview';
    if (status) {
      status.hidden = selected === 'Overview';
      status.textContent = lessons[selected] ?? '';
    }
  });
}
const descriptions: Record<string, string> = {
  Components: 'Components: a switch, a callout, and a handful of badges. Tiny demo, big design-system energy.',
  Foundations: 'Foundations: color, typography, spacing. Plus one unofficial moon token, because every system needs a little orbit.',
  Patterns: 'Pattern: try the switch, explore a tab, find your way back. Familiar controls make room for a little fun.',
};
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-helios-view]')) {
  button.addEventListener('click', () => {
    for (const peer of document.querySelectorAll('[data-helios-view]')) {
      peer.setAttribute('aria-pressed', String(peer === button));
      peer.parentElement?.classList.toggle('is-current', peer === button);
    }
    const status = document.querySelector<HTMLElement>('[data-helios-status]');
    if (status) status.textContent = descriptions[button.dataset.heliosView!] ?? '';
  });
}
const moonSwitch = document.querySelector<HTMLButtonElement>('[data-moon-switch]');
moonSwitch?.addEventListener('click', () => {
  const checked = moonSwitch.getAttribute('aria-checked') !== 'true';
  moonSwitch.setAttribute('aria-checked', String(checked));
  moonSwitch.closest('.hc-panel')?.classList.toggle('moon-mode', checked);
  const label = document.querySelector('[data-moon-label]');
  if (label) label.textContent = checked ? 'on ☾' : 'off';
});

// Enable toys only after their listeners have been installed.
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-guestbook], [data-webring], [data-heroku-view], [data-helios-view], [data-moon-switch]')) button.disabled = false;
