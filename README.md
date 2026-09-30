# Brian Runnells

A personal site built with Astro, TypeScript, and plain CSS. One page: a
scroll-driven timeline that runs from a GeoCities homepage to the Helios design
system, with each era borrowing the visual language of its own period.

## Develop

Use Node.js 22.12 or newer and pnpm 12.5.1.

```sh
pnpm install
pnpm dev
```

## Verify and preview

```sh
pnpm check
pnpm test
pnpm preview
```

The test command builds the site and checks the generated HTML for required
routes, profile destinations, metadata, heading structure, internal links, and
linked assets. Browser visual and keyboard review is a separate check.
Production output is in `dist/`.

## Content

Edit `src/data/site.ts` for the hero and for each era's copy. The page template
is `src/pages/index.astro`, era blocks are in `src/components/eras/`, and shared
styles are in `src/styles/global.css`. `CONTENT-REVIEW.md` records sources and
copy that needs Brian's review before publication. `REBUILD-PLAN.md` preserves
the initial brief and subsequent design constraints.

The design is "Moonrise B v2". Each era is a period pastiche rather than a
neutral card, so era blocks deliberately set their own typography and colour
instead of inheriting the shell's.

## JavaScript

The page is complete without JavaScript: every section renders visible, the next
full moon is computed at build time, and the rail and dock are ordinary in-page
anchors. `src/scripts/moonrise.ts` adds the moon filling with scroll progress,
the rail tracking the current era, and sections fading up as they arrive. It
respects `prefers-reduced-motion`.

This is a change from the previous rebuild, which shipped no client JavaScript
at all. The moon is the organising idea of the design and cannot be driven from
CSS alone, so the script is required for the full experience but not for the
content.

## Images

`public/images/longs-dawn.jpeg` is the hero photograph and
`public/images/climbingnarc-logo.jpg` is the ClimbingNarc mark. The hero is
optional at build time: without it the hero falls back to its gradient rather
than rendering a broken image.

## Deployment

This rebuild has not been published. Confirm the production domain and hosting
before deployment. Set `SITE_URL` to the final origin when building so canonical
URLs, sitemap entries, and social image URLs use the correct domain.

```sh
SITE_URL=https://brianrunnells.com pnpm build
```

The site is now a single page. The previous `/about/`, `/projects/`, and
`/work/<slug>/` routes have been removed; review whether hosting should redirect
them to `/` before switching production. Hosting should serve the generated
`404.html` for missing URLs.

The old Ember site remains in Git history. The repository's default branch is
`main`.
