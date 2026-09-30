/**
 * Content for the Moonrise B v2 homepage: a single scroll-driven timeline of
 * eras. Copy originates in the design file of the same name; see
 * CONTENT-REVIEW.md for the claims that still need Brian's confirmation.
 */

export const profile = {
  name: 'Brian Runnells',
  /** Photo location shown beside the wordmark in the hero. */
  place: 'Longs Peak, CO',
  headline: 'From GeoCities to Helios,',
  /** Rendered in the accent colour as the second half of the headline. */
  headlineAccent: 'one full moon at a time.',
  introduction:
    'I lead frontend engineering and design teams at HashiCorp, now part of IBM. Off the clock: moonlit adventures on two feet or two wheels.',
  description:
    'Brian Runnells leads frontend engineering and design teams at HashiCorp, now part of IBM. A timeline from a GeoCities homepage to the Helios design system.',
};

export const heroImage = {
  src: '/images/longs-dawn.jpeg',
  alt: 'The Diamond on Longs Peak before dawn',
};

export type SocialId = 'github' | 'x' | 'linkedin';

export const socialLinks: { id: SocialId; label: string; url: string }[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/Dhaulagiri' },
  { id: 'x', label: 'X', url: 'https://x.com/climbingnarc' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/brianrunnells' },
];

/** Drives the sticky rail, the mobile dock, and the section order. */
export const eras = [
  { id: 'era-0', name: 'GeoCities', years: '1990s', label: 'GeoCities' },
  { id: 'era-1', name: 'Frontend', years: '2006–2015', label: 'Frontend years' },
  { id: 'era-2', name: 'ClimbingNarc', years: '2007–2015', label: 'ClimbingNarc' },
  { id: 'era-3', name: 'Heroku', years: '2015–2021', label: 'Heroku' },
  { id: 'era-4', name: 'HashiCorp', years: '2021–now', label: 'HashiCorp' },
  { id: 'era-5', name: 'Next', years: 'soon', label: 'Next' },
];

export const geocities = {
  kicker: '1990s · GeoCities',
  marquee:
    '*** UNDER CONSTRUCTION *** Sign my guestbook!!! *** Now with MIDI *** Last updated: new moon ***',
  title: "~*~ Welcome 2 Brian's Homepage ~*~",
  links: ['Cool Sites', 'Climbing Pix', 'Sign Guestbook!!'],
  visitorCount: '000417',
  paragraphs: [
    "My first site went up sometime in the '90s, around when Chris Farley was on SNL. Tiled background, a guestbook, a <marquee> or three, more GIFs than words.",
    'It taught me you could make a thing and put it on the internet.',
  ],
  webring: 'Climbers Webring',
  badges: [
    { text: 'NETSCAPE NOW!', background: '#008080', color: '#fff' },
    { text: '800×600', background: '#800000', color: '#ff0' },
    { text: 'MOON: NEW', background: '#000', color: '#fff' },
  ],
};

export const frontend = {
  kicker: '2006–2015 · Frontend engineer',
  filename: 'résumé.html',
  modified: 'last modified: some time ago',
  summary:
    "Between GeoCities and Heroku I was a frontend engineer at a handful of companies you've never heard of. Table layouts giving way to CSS, IE6 hacks, the arrival of jQuery. It's where I learned the craft.",
  roles: [
    { company: 'Associated Bag Company', role: 'Frontend engineer', years: '2006–2011' },
    { company: 'MCFI', role: 'Frontend engineer', years: '2011–2013' },
    { company: 'Markit', role: 'Frontend engineer', years: '2013–2015' },
  ],
  badges: [
    { prefix: 'W3C', text: 'XHTML 1.0', accent: '#666' },
    { prefix: 'W3C', text: 'CSS valid', accent: '#666' },
    { prefix: 'RSS', text: 'feed', accent: '#c60' },
  ],
};

export const climbingnarc = {
  kicker: '2007–2015 · ClimbingNarc',
  url: 'https://climbingnarc.com/',
  logo: { src: '/images/climbingnarc-logo.jpg', alt: 'ClimbingNarc logo' },
  tagline: 'So obsessed with climbing it hurt.',
  nav: ['News', 'Videos', 'Comps', 'About'],
  posts: [
    {
      meta: 'February 2007 · Posted by Brian · 12 comments',
      title: 'Why I started this site',
      body: 'Keeping up with climbing online meant checking a dozen sites a day. So I built one place for the news, videos and comp coverage, and wrote it for eight years.',
    },
    {
      meta: 'Live coverage',
      title: 'On the mic at USA Climbing Nationals',
      body: 'Covering competitions turned into calling them: live commentary for USA Climbing national championships.',
    },
  ],
  cta: 'Read the archive »',
  stats: '1,332 posts · 9,574 reader comments',
};

export const heroku = {
  kicker: '2015–2021 · Heroku',
  headline: 'Six years learning how a platform feels from the inside.',
  tabs: ['Overview', 'Resources', 'Deploy', 'Metrics', 'Activity'],
  scope: 'brian / 2015–2021',
  dynos: { web: { total: 3, running: 2 }, nightRide: 'on under full moon' },
  /** Bar heights, as percentages of the chart. */
  chart: [30, 45, 38, 60, 52, 74, 68, 90],
  activity: [
    { actor: 'brian', text: 'deployed', code: 'dashboard', suffix: '· v2021' },
    { actor: 'brian', text: 'moved to people leadership · 2018' },
    { actor: 'brian', text: 'joined the team · 2015' },
  ],
  terminal: {
    command: '$ heroku lessons:show --app=brian',
    lesson: 'Where I learned good developer tools come from the people building them.',
    result: '=== 1 lesson · 6 years · 0 regrets · deployed after dark',
  },
};

export const hashicorp = {
  kicker: '2021–now · HashiCorp',
  badge: 'Open source',
  body: 'I joined HashiCorp in 2021 to lead a new design systems team. We released Helios publicly in January 2023. Now I lead frontend engineering and design teams, as part of IBM.',
  actions: [
    { label: 'Documentation', url: 'https://helios.hashicorp.design/', primary: true },
    { label: 'GitHub', url: 'https://github.com/hashicorp/design-system', primary: false },
  ],
  tabs: ['Components', 'Foundations', 'Patterns'],
  callout: {
    title: 'Released publicly',
    body: 'Components, patterns and guidance, open to everyone since January 2023.',
  },
  badges: [
    { text: 'Neutral', background: '#f1f2f3', color: '#3b3d45' },
    { text: 'Highlight', background: '#f2f8ff', color: '#0c56e9' },
    { text: 'Success', background: '#f2fbf6', color: '#006619' },
    { text: 'Warning', background: '#fff9e8', color: '#9e4b00' },
  ],
  toggle: 'Accessible by default',
  tokens: [
    { name: '--token-color-foreground-action', swatch: '#1060ff' },
    { name: '--token-color-foreground-strong', swatch: '#0c0c0e' },
    { name: '--token-color-moon', swatch: '#f0ece2', note: '(unofficial)' },
  ],
};

export const next = {
  kicker: 'Next · Moon: full',
  paragraphs: [
    'Still leading frontend engineering and design teams, still curious about what makes shared foundations actually useful.',
    'Still building websites around whatever I’m obsessed with. And still heading out when the moon is up. Probably',
  ],
  footnote: 'Last updated under a full moon',
};

export { nextFullMoon, formatFullMoon, formatFullMoonShort } from '../lib/moon';
