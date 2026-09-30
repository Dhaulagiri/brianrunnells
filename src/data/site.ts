export const profile = {
  name: 'Brian Runnells',
  tagline: 'Frontend engineering, design systems, and a few ongoing interests.',
  introduction:
    "I'm Brian. I lead frontend engineering and design teams at HashiCorp, now part of IBM. Outside work, climbing has led me into writing and building websites. This is a small collection of my work.",
  about: [
    "My professional work sits between frontend engineering, design, and the people doing that work. At HashiCorp, I've led design systems work and helped bring Helios into the open. Before that, I worked at Heroku.",
    "I'm interested in what makes a shared foundation useful in practice: whether someone can find what they need, understand the tradeoffs, and get on with their work. A component library is part of that. So are the documentation and the team behind it.",
    "ClimbingNarc started with something I wanted to be able to find on the internet: climbing news gathered in one place. I ended up making that place myself.",
  ],
  interests:
    "I've been climbing since 1999. I also spend time with movies. ClimbingNarc is one example of what happens when an interest turns into something I want to make.",
};

export const socialLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/brianrunnells' },
  { label: 'GitHub', url: 'https://github.com/Dhaulagiri' },
  { label: 'Twitter', url: 'https://twitter.com/climbingnarc' },
];

export const principles = [
  {
    title: 'The work around the work',
    body: "I'm interested in the parts that make good technical work sustainable: useful documentation, clear decisions, and teams that can work well together. Helios is one example. ClimbingNarc shows another side of what I like to make.",
  },
];

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  role: string;
  url: string;
  sections: { title: string; paragraphs: string[] }[];
}

export const projects: Project[] = [
  {
    slug: 'helios',
    title: 'Helios',
    kicker: 'HashiCorp · Design systems',
    summary:
      'Shared foundations for product teams. I led the design systems team behind Helios and coauthored its public launch announcement.',
    role: 'Design systems team leadership',
    url: 'https://helios.hashicorp.design/',
    sections: [
      {
        title: 'A common foundation',
        paragraphs: [
          'Helios is HashiCorp’s open source design system. It brings components, design foundations, patterns, and guidance together so product teams have a common place to start.',
          'Accessibility and consistency are part of that foundation. Shared components give designers and engineers a way to carry those decisions into the interfaces people use.',
        ],
      },
      {
        title: 'My part',
        paragraphs: [
          'I joined HashiCorp to lead its new design systems team. In January 2023, we released Helios publicly. I coauthored the announcement with Misha Dhar.',
          'This was the work of a team of designers and engineers. My role was leading that team; the system itself reflects their expertise and the needs of the product teams using it.',
        ],
      },
      {
        title: 'See the work',
        paragraphs: [
          'The public documentation is the best way to explore Helios: the components themselves, the guidance around them, and the source code behind the system.',
        ],
      },
    ],
  },
  {
    slug: 'climbingnarc',
    title: 'ClimbingNarc',
    kicker: 'Personal project · Climbing',
    summary:
      'A climbing news site I started in 2007, bringing reports and videos into one place. The archive is still online.',
    role: 'Founder and writer',
    url: 'https://climbingnarc.com/',
    sections: [
      {
        title: 'It started with climbing',
        paragraphs: [
          'I started climbing in 1999 and launched ClimbingNarc in February 2007. There was plenty of climbing content online, but keeping up meant checking a lot of different sites.',
          'The idea was straightforward: bring it together. News, videos, competition coverage, and reports on climbs could share one home.',
        ],
      },
      {
        title: 'A place to follow along',
        paragraphs: [
          'I wrote and curated the site, with readers joining the conversation in the comments. Its subjects ranged from bouldering and sport climbing to competitions and the people involved.',
          'It was a publishing project as much as a web project: finding the material, choosing what to cover, and giving people a reason to come back.',
        ],
      },
      {
        title: 'Still there to explore',
        paragraphs: [
          'The archive remains online. It’s a record of that period in climbing and an earlier chapter of my habit of building websites around an interest.',
        ],
      },
    ],
  },
];
