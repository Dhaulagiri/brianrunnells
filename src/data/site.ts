/**
 * Content for the Moonrise B v2 homepage: a single scroll-driven timeline of
 * eras. Career details checked against Brian's LinkedIn profile;
 * see CONTENT-SOURCES.md for the source and scope of those claims.
 */

export const profile = {
  name: 'Brian Runnells',
  /** Photo location shown beside the wordmark in the hero. */
  place: 'Longs Peak, CO',
  headline: 'From GeoCities to Helios,',
  /** Rendered in the accent colour as the second half of the headline. */
  headlineAccent: 'one full moon at a time.',
  /** Two lines, not a paragraph: who, then how to read the page. */
  introduction:
    'I build design systems, developer tools, and the teams behind them. Currently frontend engineering and design at HashiCorp, now part of IBM.',
  /** The signpost. Set small and dim; it explains the timeline, it isn’t the bio. */
  introductionMeta: 'Below: twenty-five years of the web, in period dress.',
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
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/brianrunnells',
  },
];

/** Drives the sticky rail, the mobile dock, and the section order. */
export const eras = [
  { id: 'era-0', name: 'GeoCities', years: '1990s', label: 'GeoCities' },
  {
    id: 'era-1',
    name: 'Frontend',
    years: '2006–2015',
    label: 'Frontend years',
  },
  {
    id: 'era-2',
    name: 'ClimbingNarc',
    years: '2007–2015',
    label: 'ClimbingNarc',
  },
  { id: 'era-3', name: 'Heroku', years: '2015–2021', label: 'Heroku' },
  { id: 'era-4', name: 'HashiCorp', years: '2021–now', label: 'HashiCorp' },
  { id: 'era-5', name: 'Next', years: '→', label: 'Next' },
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
    "From user support to application development and frontend engineering. Table layouts giving way to CSS, AJAX, IE6 hacks, the arrival of jQuery. It's where I learned the craft, and how much the people using the software matter.",
  roles: [
    {
      company: 'Associated Bag Company',
      role: 'User support → programmer analyst',
      years: '2006–2011',
    },
    {
      company: 'Milwaukee Center for Independence',
      role: 'Applications developer team lead',
      years: '2011–2013',
    },
    { company: 'Markit on Demand', role: 'Web developer', years: '2013–2015' },
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
      title: 'On the mic for Louder Than 11',
      body: 'Covering competitions turned into calling them: live commentary for USA Climbing National Championships, Portland Boulder Rally and the Psicobloc Masters.',
    },
  ],
  cta: 'Read the archive »',
  stats: '1,332 posts · 9,574 reader comments',
  interviews: [
    {
      title: 'Interview with the ClimbingNarc',
      publication: 'Splitter Choss',
      year: '2010',
      url: 'https://www.splitterchoss.com/2010/03/09/interview-with-the-climbingnarc/',
    },
    {
      title: 'Players: Brian Runnells (aka The Climbing Narc)',
      publication: 'Climbing',
      year: '2011',
      url: 'https://www.climbing.com/news/players-brian-runnells-aka-the-climbing-narc/',
    },
    {
      title: 'The Boys in the Booth, with Chris Weidner',
      publication: 'Thundercling · podcast on iVoox',
      year: '2018',
      url: 'https://www.ivoox.com/episode-4-brian-runnells-and-chris-weidner-8212-audios-mp3_rf_30894463_1.html',
    },
  ],
};

export const heroku = {
  kicker: '2015–2021 · Heroku',
  headline: 'Six years learning how a platform feels from the inside.',
  body: 'I started on the Heroku Dashboard, built a shared component library, and cut test run times by 90%. Later I led a 20+ person organization across Dashboard, CLI and oclif, helping teams build on shared developer tools.',
  tabs: ['Overview', 'Resources', 'Deploy', 'Metrics', 'Activity'],
  scope: 'brian-heroku / 2015–2021',
  dynos: {
    primary: { name: 'people-leader', total: 4, running: 4 },
    nightRide: 'on under full moon',
  },
  /** Bar heights, as percentages of the chart. */
  chart: [30, 45, 38, 60, 52, 74, 68, 90],
  activity: [
    {
      actor: 'brian',
      text: 'scaled',
      code: 'brian-heroku',
      suffix: 'to 0 · 2021',
    },
    {
      actor: 'brian',
      text: 'changed',
      code: 'brian-heroku',
      suffix: 'process type to people-leader · 2018',
    },
    {
      actor: 'brian',
      text: 'scaled',
      code: 'brian-heroku',
      suffix: 'to 1 · 2015',
    },
  ],
  terminal: {
    command: '$ heroku lessons:show --app=brian-heroku',
    lesson:
      'Where I learned good developer tools come from the people building them.',
  },
};

export const hashicorp = {
  kicker: '2021–now · HashiCorp',
  badge: 'Open source',
  headline: 'Putting design and engineering on the same team, in public.',
  body: 'I joined HashiCorp in 2021 to build and lead Helios: designers, engineers and accessibility specialists in one group responsible for the shared UI foundation, rather than two functions negotiating across a handoff. That group is now Frontend Experiences — nearly 40 people setting UI direction across Terraform, HCP and the rest of the product suite.',
  /* Each line is one concrete piece of the role. Keep them short enough to
     scan in a column; the paragraph above carries the connective tissue.
     Attribution is deliberate: the accessibility function was built by the
     leader Brian recruited, so the line credits her rather than claiming it. */
  highlights: [
    {
      label: 'Built and led',
      text: 'the Helios team from its inception — design and engineering strategy developed together, not handed across a function boundary.',
    },
    {
      label: 'Grew it',
      text: 'into a nearly 40-person design engineering organization spanning frontend architecture, design systems, accessibility and developer experience.',
    },
    {
      label: 'Recruited and backed',
      text: 'the leader of HashiCorp’s accessibility function, who turned it into a company capability — stronger VPATs, better enterprise deal readiness.',
    },
    {
      label: 'Now leading',
      text: 'the incremental move from Helios to IBM Carbon: better alignment, without forcing rewrites or stalling product delivery.',
    },
  ],
  actions: [
    {
      label: 'Documentation',
      url: 'https://helios.hashicorp.design/',
      primary: true,
    },
    {
      label: 'GitHub',
      url: 'https://github.com/hashicorp/design-system',
      primary: false,
    },
  ],
  caseStudy: {
    url: '/work/helios/',
    label: 'The story behind the system',
    title: 'Building Helios',
    summary:
      'An open-ended mandate, a team built from scratch, and a shared foundation for design and engineering.',
  },
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

export const heliosCaseStudy = {
  title: 'Building Helios',
  description:
    'How I built the team behind HashiCorp’s Helios Design System and led the replacement of an existing system with a shared foundation for design and engineering.',
  back: { label: 'Back to the timeline', url: '/#era-4' },
  kicker: 'Case study · HashiCorp',
  heading: 'Building Helios.',
  introduction:
    'I joined HashiCorp with an open-ended mandate to build a better frontend foundation. I built the team and led the creation of Helios, replacing an existing system and bringing design and engineering onto the same footing.',
  role: 'Team building · Technical direction · Design and engineering partnership · Adoption',
  outcomesLabel: 'What we built together',
  outcomes: [
    { value: '100%', label: 'parity between Figma and code' },
    { value: '100+', label: 'engineers and designers using Helios' },
    {
      value: '20,000+',
      label: 'component instances tracked across roughly eight products',
    },
  ],
  outcomesNote:
    'A snapshot from my time leading Helios. Adoption figures came from the dashboard I built; they are not a current usage count.',
  sections: [
    {
      id: 'the-portfolio',
      label: '01 / The portfolio',
      heading: 'A shared layer for a broad product suite.',
      paragraphs: [
        'HashiCorp’s portfolio at the time spanned Terraform, Vault, Consul, Nomad, Boundary, Waypoint, Packer, and Vagrant, alongside the growing HashiCorp Cloud Platform (HCP). These products served different infrastructure and security workflows, with a mix of cloud services and self-managed tools.',
        'For the teams building product interfaces, a shared UI foundation was a way to make accessibility, interaction patterns, and visual consistency carry across those different experiences. Each team could focus more of its attention on the problems specific to its product.',
      ],
      products: [
        'Terraform',
        'Vault',
        'Consul',
        'Nomad',
        'Boundary',
        'Waypoint',
        'Packer',
        'Vagrant',
      ],
      source: {
        label: 'The product portfolio in 2022',
        url: 'https://www.hashicorp.com/en/blog/hashicorp-2022-year-in-review',
      },
    },
    {
      id: 'the-decision',
      label: '02 / The decision',
      heading: 'Replace the foundation.',
      paragraphs: [
        'There was already a system in place, but its design library and code implementations were inconsistent. The code was hard to scale, and adoption varied across teams. Extending it would have meant continuing to build on those limitations.',
        'My mandate left room to decide what should come next. I argued for replacing the existing system and pushed for a shared foundation that design and engineering could develop together.',
        'That became Helios: a shared foundation for building HashiCorp’s product interfaces. Getting there meant building the team as well as the system.',
      ],
    },
    {
      id: 'the-team',
      label: '03 / The team',
      heading: 'Design and engineering, together.',
      paragraphs: [
        'I built a multidisciplinary team across engineering, design, accessibility, and design management. I defined the roles and hiring profiles, then brought the people together around a shared responsibility for the system.',
        'Design and engineering developed the direction together. The Figma library and code implementations stayed in full parity, so product designers and engineers could work with the same components and patterns.',
        'The designers, engineers, and accessibility specialists on the team did the detailed work that made Helios good. My responsibility was to establish the direction, build and lead the team, and help the work take hold across products.',
      ],
    },
    {
      id: 'the-adoption',
      label: '04 / The adoption',
      heading: 'Make it useful across products.',
      paragraphs: [
        'A replacement system has to earn its place in the products that use it. I built an adoption dashboard to track Helios usage alongside the legacy components it was replacing. That gave us a concrete view of where migration was progressing and where teams still needed help.',
        'We reached more than 100 engineers and designers. The dashboard tracked net adoption of more than 20,000 component instances across roughly eight products. Guilds, office hours, and product-team conversations helped us work through the practical problems of adoption.',
        'I also stayed involved in the technical direction: discovery and proofs of concept for repository modernization, introducing TypeScript, and moving templates to GTS while the team continued shipping.',
      ],
    },
    {
      id: 'what-changed',
      label: '05 / What changed',
      heading: 'A foundation teams could share.',
      paragraphs: [
        'The biggest change was that Design and Engineering could work in sync. Full parity between Figma and code meant the components designers used corresponded to the components engineers implemented.',
        'We substantially improved accessibility and consistency across product interfaces. I recruited and backed the leader who built HashiCorp’s accessibility function; that expertise became part of how we approached the shared foundation.',
        'Teams reported faster delivery. I regard that as useful qualitative feedback, rather than a measured velocity improvement. The adoption figures, shared components, and public implementation provide more concrete evidence of the system’s reach.',
      ],
    },
  ],
  artifacts: {
    label: 'Explore the work',
    heading: 'The system is public.',
    body: 'The documentation and source show what the team built: components, foundations, patterns, and guidance for consistent, accessible product interfaces.',
    links: [
      {
        label: 'Launch announcement, co-written with Misha Dhar',
        url: 'https://www.hashicorp.com/en/blog/introducing-helios-hashicorp-s-new-design-system',
      },
      {
        label: 'Helios documentation',
        url: 'https://helios.hashicorp.design/',
      },
      {
        label: 'Source on GitHub',
        url: 'https://github.com/hashicorp/design-system',
      },
    ],
  },
  credit:
    'Helios was built by the HashiCorp Design Systems team, with contributions from product teams across the company. This is my account of building and leading that work; the design and implementation were a team effort.',
};

export const next = {
  kicker: 'Next · Moon: full',
  paragraphs: [
    'Want to talk frontend platforms, design systems, or making software easier to use? Find me on LinkedIn or Twitter.',
    'Still building websites around whatever I’m obsessed with. And still heading out when the moon is up. Probably',
  ],
  footnote: 'Built for the web. Best enjoyed under a full moon.',
};

export { nextFullMoon, formatFullMoon, formatFullMoonShort } from '../lib/moon';
