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
  featuredWork: {
    label: 'Read the Helios case study',
    url: '/work/helios/',
    navigationLabel: 'Explore my work',
  },
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
      'Why we replaced the old system, how I built the team, and what changed for product teams.',
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

/* Keep the published principles verbatim. The surrounding copy is Brian’s
   account of the work and the decisions behind it. */
export const heliosCaseStudy = {
  title: 'Building Helios',
  description:
    'How we built HashiCorp’s Helios Design System, from replacing the old system to supporting product teams across the company.',
  back: { label: 'Back to the timeline', url: '/#era-4' },
  kicker: 'Case study · HashiCorp',
  heading: 'Building Helios.',
  introduction:
    'I joined HashiCorp in 2021 to build the design system and accessibility practice. How we would do that was still an open question. I pushed to replace the existing system and hired and led the team behind Helios across engineering, design, and accessibility.',
  role: 'Public launch · January 2023',
  outcomesLabel: 'Helios in use',
  outcomes: [
    { value: '100+', label: 'designers and engineers building on Helios' },
    {
      value: '20,000+',
      label: 'component instances tracked, net of the legacy system',
    },
    { value: '~8', label: 'products sharing one foundation' },
  ],
  principles: {
    heading: 'We consider the whole when creating the parts.',
    body: 'These are the six principles the team wrote for Helios. They guided how we built it and worked with product teams.',
    link: {
      label: 'The six principles',
      url: 'https://helios.hashicorp.design/about/principles',
    },
  },
  sections: [
    {
      id: 'rooted-in-reality',
      label: '01 / Rooted in reality',
      heading: 'Why we replaced the old system.',
      lede: 'Design and code were out of sync, and adoption was uneven.',
      principle: {
        number: '01',
        name: 'Rooted in reality',
        text: 'We ground our work and our decisions in reality through data and observations.',
      },
      paragraphs: [
        'The code was hard to scale, too. I argued for replacing the system rather than continuing to extend it. There was significant internal pushback on that decision.',
        'Once Helios was in use, the dashboard we built tracked its adoption alongside the legacy components it was replacing. We could see where teams had moved over and where they needed help.',
      ],
      tradeoff:
        'Starting over meant spending time on a replacement before teams could use it. It also meant taking on the work of migrating from the old system.',
    },
    {
      id: 'guidance-over-control',
      label: '02 / Guidance over control',
      heading: 'Across the product suite.',
      lede: 'Teams needed consistency and room to handle their own product’s needs.',
      principle: {
        number: '02',
        name: 'Guidance over control',
        text: 'We provide balance between configurability and composability while driving consistency.',
      },
      paragraphs: [
        'HashiCorp’s infrastructure and security products covered different workflows, and HCP was growing. The components needed to work across that range of interfaces.',
        'We had to decide what should be consistent and where teams needed room to adapt.',
      ],
      source: {
        label: 'The product portfolio in 2022',
        url: 'https://www.hashicorp.com/en/blog/hashicorp-2022-year-in-review',
      },
      tradeoff:
        'More customization helped teams handle cases we hadn’t covered, but also made it easier for interfaces to diverge.',
    },
    {
      id: 'quality-by-default',
      label: '03 / Quality by default',
      heading: 'What we expected from a component.',
      lede: 'Documentation, accessibility, and Figma parity were part of the work.',
      principle: {
        number: '03',
        name: 'Quality by default',
        text: 'We recognize that we are providing a service and commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.',
      },
      paragraphs: [
        'A component needed to be documented, accessible, and ready for the different ways teams would use it. The Figma library and the code had to agree.',
      ],
      tradeoff:
        'That took longer than shipping the code alone, and sometimes meant a product team had to wait.',
    },
    {
      id: 'design-in-context',
      label: '04 / Design in context',
      heading: 'We built what the products needed.',
      lede: 'Product teams had work to ship while we were building and changing the system.',
      principle: {
        number: '04',
        name: 'Design in context',
        text: 'We meet consumers where they are and consider both the current and future context in which they use the system.',
      },
      paragraphs: [
        'We worked with teams to understand what they were building and how they would use a component. That shaped what we built and how it worked.',
        'I also led discovery and proofs of concept for our move to TypeScript and GTS.',
        'The move from Helios to IBM Carbon is happening incrementally too, so teams can adopt it alongside their product work without having to rewrite their applications.',
      ],
      tradeoff:
        'Working from current product needs meant some requests had to wait.',
    },
    {
      id: 'consider-everyone',
      label: '05 / Consider everyone',
      heading: 'Accessibility had an owner.',
      lede: 'We hired for accessibility expertise alongside design and engineering.',
      principle: {
        number: '05',
        name: 'Consider everyone',
        text: 'We take an inclusive approach to our work from the start, considering the context and range of abilities for all customers.',
      },
      paragraphs: [
        'I recruited and backed the leader who built HashiCorp’s accessibility function. That work helped us build accessibility into the components and support teams across the company.',
        'An improvement to a shared component could then carry through to the products using it.',
      ],
      tradeoff:
        'This required dedicated people and time, including work that wouldn’t appear on a product’s feature roadmap. It also helped us produce stronger VPATs and support enterprise deals.',
    },
    {
      id: 'invite-feedback',
      label: '06 / Invite feedback',
      heading: 'Working with product teams.',
      lede: 'We needed feedback from the people using Helios.',
      principle: {
        number: '06',
        name: 'Invite feedback',
        text: 'We take time to have the right conversations with the appropriate stakeholders, to validate and create trust in the outcome.',
      },
      paragraphs: [
        'I defined the roles and hiring profiles for engineering, design, and accessibility in one group. The team was responsible for both the Figma library and the code.',
        'Designers and engineers worked through disagreements within the team and kept the two implementations in sync.',
        'Guilds, office hours, and regular conversations with product teams helped us understand the problems they were running into and work through the migration.',
      ],
      tradeoff:
        'Some of those conversations were difficult. We couldn’t always do what a team was asking for, and sometimes we decided not to.',
    },
  ],
  artifacts: {
    heading: 'See what we shipped.',
    body: 'We open sourced Helios in January 2023. The documentation, source code, and launch announcement are linked below.',
    links: [
      {
        label: 'Helios documentation',
        short: 'Documentation',
        note: 'Components, foundations, patterns and guidance',
        url: 'https://helios.hashicorp.design/',
      },
      {
        label: 'Source on GitHub',
        short: 'GitHub',
        note: 'Everything the team shipped, open since 2023',
        url: 'https://github.com/hashicorp/design-system',
      },
      {
        label: 'The launch announcement',
        short: 'Launch post',
        note: 'January 2023',
        url: 'https://www.hashicorp.com/en/blog/introducing-helios-hashicorp-s-new-design-system',
      },
    ],
  },
  credit: 'Helios was built by the HashiCorp Design Systems team.',
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
