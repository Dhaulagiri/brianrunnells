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

/* The case study is organised as decisions, not as a chronology. Each one is
   anchored to the principle the team wrote and published, because the
   principles are the most honest account of how the arguments actually got
   settled — and each one carries what it cost, because a decision with no
   cost attached is a slogan. */
export const heliosCaseStudy = {
  title: 'Building Helios',
  description:
    'Six decisions behind HashiCorp’s Helios Design System — replacing the system already in place, building one multidisciplinary team, and earning adoption across the product suite.',
  back: { label: 'Back to the timeline', url: '/#era-4' },
  kicker: 'Case study · HashiCorp',
  heading: 'Building Helios.',
  introduction:
    'I joined HashiCorp with an open-ended mandate to build a better frontend foundation. I argued for replacing the system already in place, built the team that replaced it, and spent three years earning its way into the products.',
  role: 'Team building · Technical direction · Design and engineering partnership · Adoption',
  outcomesLabel: 'Where it got to',
  outcomes: [
    { value: '100+', label: 'designers and engineers building on Helios' },
    {
      value: '20,000+',
      label: 'component instances tracked, net of the legacy system',
    },
    { value: '~8', label: 'products sharing one foundation' },
  ],
  outcomesNote:
    'A snapshot from my time leading Helios, measured by the adoption dashboard I built. Not a current usage count.',
  principles: {
    label: 'How we decided',
    heading: 'We consider the whole when creating the parts.',
    body: 'The team wrote six principles and published them. They are the most honest summary of how the arguments below got settled, so each decision here is filed under the principle it came from.',
    link: {
      label: 'The six principles',
      url: 'https://helios.hashicorp.design/about/principles',
    },
  },
  sections: [
    {
      id: 'replace',
      label: '01 / The decision',
      heading: 'Replace the foundation. Don’t extend it.',
      principle: {
        number: '01',
        name: 'Rooted in reality',
        text: 'We ground our work and our decisions in reality through data and observations.',
      },
      paragraphs: [
        'A system already existed. Its Figma library and its code implementations disagreed with each other, the code was hard to scale, and adoption varied by team. Extending it meant building on all three of those.',
        'My mandate left room to decide what came next, and I argued for replacement: one foundation that design and engineering would develop together, rather than two artefacts that drifted apart between releases. That became Helios.',
      ],
      cost: 'A replacement starts at zero adoption. Extending would have been cheaper and nobody would have had to migrate. We chose to pay the migration cost once, deliberately, instead of paying the inconsistency tax forever.',
    },
    {
      id: 'one-team',
      label: '02 / The team',
      heading: 'One team, not two functions.',
      principle: {
        number: '06',
        name: 'Invite feedback',
        text: 'We take time to have the right conversations with the appropriate stakeholders, to validate and create trust in the outcome.',
      },
      paragraphs: [
        'Design systems usually live inside one function and negotiate with the other. I built a single multidisciplinary team instead — engineering, design, accessibility, design management — and wrote the roles and hiring profiles around one shared responsibility for the system.',
        'The conversations that normally happen between two teams happened inside one. Direction was developed together rather than handed across a boundary, which is the only version of this that produces a Figma library and a codebase that agree.',
      ],
      cost: 'Hiring is slower when every role has to hold two disciplines in view, and a combined team has to be funded as one thing rather than borrowed from two budgets. It also makes the team accountable for outcomes it can only influence: adoption happens in other people’s roadmaps.',
    },
    {
      id: 'parity',
      label: '03 / The constraint',
      heading: 'Parity is a constraint, not an aspiration.',
      principle: {
        number: '03',
        name: 'Quality by default',
        text: 'We commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.',
      },
      paragraphs: [
        'The Figma library and the code implementations stayed in full parity. A designer and an engineer opening the same component saw the same component.',
        'That sentence is easy to write and expensive to hold. Treated as an aspiration, parity decays within two releases. Treated as a constraint, a component isn’t finished when it works — it’s finished when both sides match.',
      ],
      cost: 'Every individual release is slower, and the system says no more often than a team under delivery pressure would like. The return is that nobody downstream has to keep a mental diff between the mock and the component.',
    },
    {
      id: 'accessibility',
      label: '04 / The hire',
      heading: 'Accessibility needs an owner, not a checklist.',
      principle: {
        number: '05',
        name: 'Consider everyone',
        text: 'We take an inclusive approach to our work from the start, considering the context and range of abilities for all customers.',
      },
      paragraphs: [
        'I recruited the leader who built HashiCorp’s accessibility function and backed her to make it a company capability rather than a review step bolted onto the end of a project.',
        'That expertise went into the components themselves, which is the whole leverage argument for a design system: solve it once, correctly, in the thing eight products already import.',
      ],
      cost: 'Headcount spent on a function with no feature roadmap of its own, and a standard that occasionally blocks work other people have already committed to. It paid back as stronger VPATs and enterprise deal readiness — but that argument has to be made before the payback, not after.',
    },
    {
      id: 'adoption',
      label: '05 / The adoption',
      heading: 'Instrument adoption before you ask for it.',
      principle: {
        number: '04',
        name: 'Design in context',
        text: 'We meet consumers where they are and consider both the current and future context in which they use the system.',
      },
      paragraphs: [
        'A replacement has to earn its place in the products that use it. Before asking anyone to migrate, I built an adoption dashboard that tracked Helios usage alongside the legacy components it was replacing.',
        'That turned adoption from an argument into an observation. We could see which teams were moving, which were stuck, and what they were stuck on — and then show up with guilds, office hours and direct help rather than a mandate.',
        'I stayed in the technical direction alongside it: discovery and proofs of concept for repository modernisation, introducing TypeScript, and moving templates to GTS while the team kept shipping.',
      ],
      cost: 'Months of engineering spent on tooling that ships no components. The alternative is negotiating adoption on vibes, one product team at a time, with no way to tell a stalled migration from a slow one.',
    },
    {
      id: 'what-changed',
      label: '06 / What changed',
      heading: 'A foundation teams could share.',
      paragraphs: [
        'Design and engineering worked in sync, because parity made it structurally difficult not to. Accessibility and consistency improved substantially across product interfaces — as a property of the components, not as a late audit.',
        'Teams reported shipping faster. I treat that as useful feedback rather than a measured number; the adoption figures and the public source are the firmer evidence.',
        'The portfolio it was built for spanned HashiCorp’s product suite and the growing HashiCorp Cloud Platform: different infrastructure and security workflows, cloud services and self-managed tools, held to one set of interaction and accessibility patterns.',
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
  ],
  artifacts: {
    label: 'Explore the work',
    heading: 'The system is public.',
    body: 'Components, foundations, patterns and guidance — open since January 2023, and still the best way to judge the work rather than take my word for it.',
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
    'Helios was built by the HashiCorp Design Systems team, with contributions from product teams across the company. The decisions above are mine to answer for; the design and implementation were a team effort, and the principles are theirs.',
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
