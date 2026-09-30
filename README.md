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

The test command builds the site, then runs two validators. `validate-build.mjs`
checks the generated HTML for required routes, profile destinations, metadata,
heading structure, internal links, and linked assets. `validate-a11y.mjs` checks
WCAG 2.2 Level AA. Production output is in `dist/`.

## Accessibility

The site targets WCAG 2.2 Level AA, enforced by `scripts/validate-a11y.mjs`
(also runnable on its own with `pnpm test:a11y`). It has two halves:

- **Contrast.** Every foreground/background pair in the design is declared in
  that file with its font size and weight, and checked against the 1.4.3 and
  1.4.11 thresholds. A coverage guard fails the build if the stylesheet gains a
  text colour or colour token that no pair covers, so a colour change cannot
  quietly stop being tested.
- **Structure.** axe-core runs over the built HTML in jsdom for landmarks,
  headings, ARIA, document language and duplicate ids. Contrast is disabled
  there because jsdom has no layout engine; the pair table covers it instead.

It also asserts a few things neither half catches: the hero image is present
with real alt text, every `<img>` has non-empty alt (nothing on this page is a
decorative image), the marquee ships a pause control, the skip link exists, and
interactive targets declare at least 24px.

Two design decisions follow from this. The era pastiches keep their period
palettes, but several colours are shifted slightly from the source design to
clear AA — the ClimbingNarc call to action in particular uses dark text on its
orange rather than white, which failed at 2.73:1. And the GeoCities marquee only
animates when JavaScript is running, because that is what supplies the pause
control; with no script it is static, so WCAG 2.2.2 has nothing to pause.

## Content

Edit `src/data/site.ts` for the hero and for each era's copy. The page template
is `src/pages/index.astro`, era blocks are in `src/components/eras/`, and shared
styles are in `src/styles/global.css`. `REBUILD-PLAN.md` preserves the initial
brief and subsequent design constraints.

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

The moon itself is drawn in WebGL by `src/scripts/moon-gl.ts`: one full-quad
fragment shader that reconstructs the sphere normal per pixel, samples an
equirectangular lunar albedo map, and lights it from a sun direction derived
from the phase. That gives real lunar features and a curved terminator. There is
no 3D library; a dependency would be far larger than the shader. Where WebGL or
the texture is unavailable the CSS moon underneath stays visible.

## Images

`public/images/longs-dawn.jpeg` is the hero photograph and
`public/images/climbingnarc-logo.jpg` is the ClimbingNarc mark. The hero is
optional at build time: without it the hero falls back to its gradient rather
than rendering a broken image.

`public/images/moon-albedo.jpg` is the lunar texture used by the WebGL moon. It
is `lroc_color_poles_1k.jpg` from NASA's Scientific Visualization Studio CGI
Moon Kit, built from Lunar Reconnaissance Orbiter data. NASA imagery is public
domain and carries no attribution requirement, though crediting the source is
courteous. A Creative Commons alternative was deliberately avoided so the site
takes on no share-alike obligation.

Source: https://svs.gsfc.nasa.gov/4720/

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
