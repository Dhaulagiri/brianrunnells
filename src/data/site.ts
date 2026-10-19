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

/* Copy for the before/after illustration in the Helios case study. The hex
   values are invented for the reconstruction — they are not HashiCorp's, and
   the component comment explains why they are all still AA against white. */
export const heliosDrift = {
  before: {
    label: 'Before · the system we replaced',
    buttonLabel: 'One primary button, as four teams shipped it',
    buttons: [
      { variant: 1, text: 'Create cluster' },
      { variant: 2, text: 'Create cluster' },
      { variant: 3, text: 'Create Cluster' },
      { variant: 4, text: 'Create cluster' },
    ],
    swatchLabel: 'One brand blue, stored five times',
    swatches: ['#0f4fb8', '#1a56c4', '#2563cf', '#1b60d6', '#1060ff'],
  },
  after: {
    label: 'After · Helios',
    buttonLabel: 'One primary button, shipped once',
    buttons: [
      'Create cluster',
      'Create cluster',
      'Create cluster',
      'Create cluster',
    ],
    swatchLabel: 'One brand blue, stored once',
    swatch: '#1060ff',
    token: '--token-color-palette-blue-300',
  },
  caption:
    'An illustration, not a screenshot: no internal interface is reproduced here. It shows the kind of drift that accumulates when a Figma library and several codebases each hold their own copy of the same decision — which is the argument for replacing a foundation rather than extending it.',
};

/* The closing section of the case study lists the tokens the page itself is
   set with. The names follow Helios conventions; the values are this site's,
   because this is a personal site wearing the system's grammar rather than a
   copy of its palette. */
export const heliosSystemStrip = {
  label: 'The system, applied',
  heading: 'This page is set with the grammar it describes.',
  body: 'Every rule above is declared once, named the way the system names things, and used by reference. The specimens below are painted with those same declarations rather than with copies of their values, so this list cannot drift from the page it documents. That is the entire argument for a design system, rendered at the scale of one page.',
  groups: [
    {
      kind: 'color',
      label: 'Color',
      tokens: [
        {
          name: '--token-color-surface-faint',
          use: 'the paper this section is printed on',
        },
        {
          name: '--token-color-foreground-primary',
          use: 'body copy, at 16px and 1.85 line height',
        },
        {
          name: '--token-color-foreground-faint',
          use: 'margin notes, captions, the costs of decisions',
        },
        {
          name: '--token-color-foreground-action',
          use: 'links, principle citations, every rule in the margin',
        },
        {
          name: '--token-color-border-primary',
          use: 'the line between one decision and the next',
        },
      ],
    },
    {
      kind: 'type',
      label: 'Typography',
      tokens: [
        { name: '--token-typography-display-500', use: 'decision headings' },
        { name: '--token-typography-body-300', use: 'the prose column' },
        { name: '--token-typography-code-100', use: 'labels and token names' },
      ],
    },
    {
      kind: 'space',
      label: 'Spacing',
      tokens: [
        { name: '--token-space-16', use: 'inside a row' },
        {
          name: '--token-space-24',
          use: 'between a heading and its paragraph',
        },
        { name: '--token-space-52', use: 'between one decision and the next' },
      ],
    },
  ],
  link: {
    label: 'Foundations in the Helios documentation',
    url: 'https://helios.hashicorp.design/foundations/tokens',
  },
};

/* The case study is organised by the six principles the Helios team wrote and
   published, in their order, rather than as a chronology or as a list of
   decisions in Brian's words. Each section carries the tradeoff that principle
   demanded, because a principle with no cost attached is a slogan. */
export const heliosCaseStudy = {
  title: 'Building Helios',
  description:
    'The story of HashiCorp’s Helios Design System, told through the six principles the team wrote: replacing the system already in place, building one multidisciplinary team, and earning adoption across the product suite.',
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
    body: 'The team wrote six principles and published them. Rather than retell this my way, here it is their way: one section per principle, in their order, each covering the part of the work that principle governed — including what it cost to hold.',
    link: {
      label: 'The six principles',
      url: 'https://helios.hashicorp.design/about/principles',
    },
  },
  sections: [
    {
      id: 'rooted-in-reality',
      label: '01 / Rooted in reality',
      heading: 'We started by looking at what was actually there.',
      principle: {
        number: '01',
        name: 'Rooted in reality',
        text: 'We ground our work and our decisions in reality through data and observations.',
      },
      paragraphs: [
        'A system already existed. Its Figma library and its code implementations disagreed with each other, the code was hard to scale, and adoption varied by team. That was the observation the replacement argument rested on, rather than a preference for building something new.',
        'The same habit applied to the replacement. I built an adoption dashboard that tracked Helios usage alongside the legacy components it was displacing, so migration was something we could watch rather than something we asserted. It showed which teams were moving, which were stuck, and what they were stuck on.',
      ],
      drift: true,
      tradeoff:
        'Months of engineering went into tooling that ships no components, and a replacement starts at zero adoption where extending would have started at whatever the old system already had.',
    },
    {
      id: 'guidance-over-control',
      label: '02 / Guidance over control',
      heading: 'One foundation, across products doing different jobs.',
      principle: {
        number: '02',
        name: 'Guidance over control',
        text: 'We provide balance between configurability and composability while driving consistency.',
      },
      paragraphs: [
        'HashiCorp’s portfolio at the time spanned Terraform, Vault, Consul, Nomad, Boundary, Waypoint, Packer and Vagrant, alongside the growing HashiCorp Cloud Platform: different infrastructure and security workflows, some cloud services and some self-managed tools.',
        'A foundation serving that range has to be opinionated enough to produce consistency and open enough that a team with an unusual problem is not blocked by it. That balance is the standing tension in the work, and it is a balance rather than a solved question.',
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
      tradeoff:
        'Every escape hatch is a place consistency can leak out, and every refusal to add one lands on a team with a deadline. Neither answer is free, and the system has to keep choosing.',
    },
    {
      id: 'quality-by-default',
      label: '03 / Quality by default',
      heading: 'Parity between Figma and code was the floor.',
      principle: {
        number: '03',
        name: 'Quality by default',
        text: 'We recognize that we are providing a service and commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.',
      },
      paragraphs: [
        'The Figma library and the code implementations stayed in full parity. A designer and an engineer opening the same component saw the same component, which is the difference between a system people trust and a system people check.',
        'Held as an aspiration, parity decays within a release or two. Held as a baseline, a component is not finished when it works — it is finished when both sides match. The principle is explicit about which of those the team chose.',
      ],
      tradeoff:
        'Individual releases are slower, and the system says “not yet” more often than a team under delivery pressure would like.',
    },
    {
      id: 'design-in-context',
      label: '04 / Design in context',
      heading: 'Adoption was earned product by product.',
      principle: {
        number: '04',
        name: 'Design in context',
        text: 'We meet consumers where they are and consider both the current and future context in which they use the system.',
      },
      paragraphs: [
        'A replacement has to earn its place in products that already work. Guilds, office hours and direct conversations with product teams did more for migration than any mandate would have, because the obstacles were specific and local.',
        'We reached more than 100 engineers and designers, and the dashboard tracked net adoption of more than 20,000 component instances across roughly eight products. Alongside it I stayed in the technical direction: discovery and proofs of concept for repository modernisation, introducing TypeScript, and moving templates to GTS while the team kept shipping.',
        'Teams reported shipping faster. I treat that as useful feedback rather than a measured number; the adoption figures and the public source are the firmer evidence.',
      ],
      tradeoff:
        'Meeting teams where they are means the migration runs on their timelines, not yours, and the old system stays alive longer than anyone would like.',
    },
    {
      id: 'consider-everyone',
      label: '05 / Consider everyone',
      heading: 'Accessibility had an owner, not a checklist.',
      principle: {
        number: '05',
        name: 'Consider everyone',
        text: 'We take an inclusive approach to our work from the start, considering the context and range of abilities for all customers.',
      },
      paragraphs: [
        'I recruited the leader who built HashiCorp’s accessibility function and backed her to make it a company capability rather than a review step at the end of a project. That expertise went into the components themselves.',
        'Which is the leverage argument for a shared foundation in its clearest form: solve it once, properly, in the thing every product already imports, instead of asking eight teams to each get it right separately.',
      ],
      tradeoff:
        'Headcount on a function with no feature roadmap of its own, and a standard that sometimes blocks work already committed to. The return — stronger VPATs, enterprise deal readiness — arrives well after the argument has to be won.',
    },
    {
      id: 'invite-feedback',
      label: '06 / Invite feedback',
      heading: 'One team, so the conversations happened inside it.',
      principle: {
        number: '06',
        name: 'Invite feedback',
        text: 'We take time to have the right conversations with the appropriate stakeholders, to validate and create trust in the outcome.',
      },
      paragraphs: [
        'Design systems usually live inside one function and negotiate with the other. I built a single multidisciplinary team instead — engineering, design, accessibility, design management — and wrote the roles and hiring profiles around one shared responsibility for the system.',
        'The conversations that normally happen across a handoff happened inside one group. That is the only version of this arrangement that reliably produces a Figma library and a codebase that agree, and it is why the principles above read as a single point of view rather than a treaty.',
      ],
      tradeoff:
        'Hiring is slower when every role has to hold two disciplines in view, and the team is accountable for outcomes it can only influence: adoption happens in other people’s roadmaps.',
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
