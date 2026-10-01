# Brian Runnells — personal site rebuild

## Implementation steering

Apex Rewatch is excluded from the current site at Brian's request. Keep it out of rendered copy, project pages, navigation, and sitemap; the original research below remains historical context.

Brian's subsequent instructions take precedence over the initial visual proposal: use pnpm throughout, and avoid typical AI design flourishes. The implementation should read as a restrained personal publication. Remove the contour motif, decorative artwork, generic hero slogans, pill labels, and repeated rounded cards proposed or implied below. Favor specific copy, typography, useful text links, and deliberate editorial spacing.

## Direction

Build a personal field guide to the things Brian makes, leads, and cares about. The professional story is about making complex things easier for people to use: shared product foundations, developer tools, useful archives, and the teams behind them.

The site should let a hiring leader understand Brian's contribution in a minute, give a collaborator concrete work to explore, and leave everyone with a sense of the person. LinkedIn supplies the chronology; this site supplies judgment, curiosity, and evidence.

Suggested opening copy, for review:

> I build things that help people do their best work.
>
> I'm Brian Runnells. My work connects frontend engineering, design systems, developer tools, and the teams that make them useful. I've also spent a fair amount of time making corners of the internet for things I can't stop thinking about.

Keep the voice direct, specific, and lightly self-aware. Avoid leadership slogans, skill meters, a wall of company logos, and climbing metaphors stretched across every section.

## Research and implications

| Reference                                                     | What works                                                                         | Application here                                                                                |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Frank Chimero](https://frankchimero.com/about/)              | An identifiable person, concise introduction, concrete work, and a durable archive | Lead with a clear point of view; let selected work establish credibility                        |
| [Maggie Appleton's garden](https://maggieappleton.com/garden) | Ongoing curiosity becomes navigable through different kinds of material            | Allow projects and eventual notes to coexist, without requiring a blog at launch                |
| [Tania Rascia](https://www.taniarascia.com/)                  | Professional depth sits alongside hobbies and runnable projects                    | Present personal interests as part of the same person; link directly to things visitors can use |

These are content and structure references, not designs to reproduce. The recommendation is an editorial site with a small, deliberate collection rather than a large garden that needs constant tending.

Public background anchors:

- [LinkedIn](https://www.linkedin.com/in/brianrunnells): frontend engineering and design leadership at HashiCorp, now part of IBM. Confirm title wording before launch.
- [Helios](https://helios.hashicorp.design/): a public system for consistent, accessible product experiences. Its public documentation establishes the product, not Brian's individual contribution.
- [ClimbingNarc](https://climbingnarc.com/): a substantial publishing and community archive, with an explicit preservation role today.
- [Hard Climbs history](https://hardclimbs.info/about-us/): an additional example of turning a personal interest into a useful resource. It need not appear in the first release.

Prior career context informs the proposed platform/people throughline. Detailed historical scope, outcomes, and metrics must be checked against approved source material before becoming public copy. No private career documents should enter the site repository.

## Launch structure

### Home — the whole story at a glance

1. **Introduction:** name and a specific first-person paragraph that introduces the work and the person. Include straightforward LinkedIn/GitHub/Twitter links here.
2. **Selected work:** three substantial editorial entries, each with a visual, a useful description, Brian's role, and a destination. Use varied proportions rather than identical generic cards.
   - **Helios / frontend platforms:** professional anchor. Explain the problem shared foundations solve and how Brian helped create the conditions for adoption. Add a short Heroku/CLI thread where it clarifies continuity.
   - **Apex Rewatch:** current making and product judgment. Explain what a visitor can do, why Brian wanted it, and the choices behind it. Confirm public project description and capture screenshots during implementation.
   - **ClimbingNarc:** publishing, curation, and community. Show that the interests and habit of building useful things predate the management career.
3. **How I work:** three short, concrete observations, each connected to one of the projects. Candidate themes: make the shared path useful; bring design and engineering together; take the people operating a system seriously. Treat these as editorial proposals until Brian reviews the wording.
4. **Outside the org chart:** a small personal passage about climbing, movies, and following a question far enough to make something. Use an authentic photo if available; avoid invented personal anecdotes.
5. **Connect:** clearly labeled profile links and a brief invitation. Add email only when Brian chooses a public address.

### Work details

Create `/work/helios`, `/work/apex-rewatch`, and `/work/climbingnarc`. Each should read as a short story: the problem, Brian's contribution, the important decisions, the result, and something learned. Aim for 400–700 words, only where there is enough real material. Credit collaborators and distinguish team outcomes from individual work.

### About

Create `/about` for a more personal introduction and a compact career throughline. Include Wisconsin if desired. Keep detailed employment chronology at LinkedIn. Writing can be added later when there is something Brian actually wants to publish; do not launch an empty Notes section or fabricated essays.

## Visual direction: an editorial field guide

- Warm ivory background, near-black text, and one restrained accent. Verify contrast for the actual colors selected.
- Serif headings paired with a readable body face. Self-host fonts or use system fallbacks; avoid excessive uppercase or monospace labels.
- Comfortable reading widths, generous spacing, fine rules, and deliberate editorial project layouts on desktop. Collapse naturally into one column on mobile.
- Let the writing and real work carry the personality. No decorative contour motifs, gradients, blobs, pill labels, repeated rounded cards, or generic hero slogans.
- Favor actual project screenshots or a genuine portrait only where available and useful. Text alone is preferable to invented visual evidence.
- Small hover/focus changes and optional brief transitions. Respect reduced motion. Navigation and information must work without animation or client JavaScript.

The intended impression is thoughtful, experienced, curious, and still actively making things.

## Profile destinations

- LinkedIn: https://www.linkedin.com/in/brianrunnells
- GitHub: https://github.com/Dhaulagiri
- Twitter: https://twitter.com/climbingnarc

LinkedIn was located through public search. GitHub and Twitter are present in the old repository. The Twitter handle is historical and should be confirmed before launch. Use visible text labels, with icons only as supplements, in the introduction and footer.

## Implementation plan

1. **Content and design prototype:** create the homepage and one work detail with draft copy and available public assets. Review at desktop and mobile sizes. Settle the voice and layout before expanding.
2. **Fresh implementation:** replace the Ember 1.13/Bower application with a static site. Recommended default: Astro with TypeScript, plain CSS, and structured local content. This site needs little client state; React or an application backend is unnecessary for the initial scope. Verify current official setup instructions when implementation starts.
3. **Complete the content:** add the remaining work stories, About, profile links, metadata, social preview, favicon, sitemap, robots policy, and a helpful 404. Set canonical URLs after confirming the production domain.
4. **Verify:** production build; internal links; keyboard navigation; heading structure; contrast; reduced motion; mobile and desktop visual review; image sizing and loading; metadata. Automation should check meaningful contracts such as profile destinations and generated routes. Report browser checks separately from build checks.
5. **Publish:** inspect the domain, existing hosting, and any old incoming URLs. Add relevant redirects. Choose the deployment target from that evidence, preview the finished site, then publish when authorized.

Use the existing Git history to retain the old site; a rebuild does not require deleting repository history. Remove the obsolete application and CI configuration as part of implementation, once the new build replaces them. Keep this research plan as a project brief.

## Completion criteria

- A new visitor can identify Brian's professional contribution without reading a resume.
- At least one work story explains a real decision and outcome, with defensible attribution.
- Personal projects receive enough space to make the site recognizably Brian's.
- All three requested profile links are visible, correct, and accessible.
- The site is readable on a phone, usable by keyboard, and fast without a heavy JavaScript payload.
- There are no empty sections, invented testimonials, unsupported metrics, or private source material.

## Repository status

On September 29, 2026, the GitHub default branch was renamed from `master` to `main`. The local branch, upstream tracking, and `origin/HEAD` were synchronized and the GitHub default was verified as `main`.

The first implementation is complete in the working tree: a static Astro site using pnpm, with home, About, three work stories, a legacy projects index, and a 404 page. It follows Brian's subsequent restrained-design instructions. Type checks, built HTML checks, and desktop/mobile browser checks passed. See `VERIFICATION.md` for scope and `CONTENT-REVIEW.md` for editorial review items. Deployment has not begun.
