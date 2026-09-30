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

The test command builds the site, checks the generated HTML with
`validate-build.mjs` (required routes, profile destinations, metadata, heading
structure, internal links, linked assets), then runs the accessibility suite in
a browser. Production output is in `dist/`.

## Accessibility

The site targets WCAG 2.2 Level AA, enforced by Playwright tests in `tests/`
(`pnpm test:a11y`, also part of `pnpm test`). They run against the production
build in a real browser, which is the point: axe-core can only evaluate colour
contrast, target size and focus occlusion where there is layout. Nothing here
maintains a list of colour pairs — axe reads the rendered pixels.

The suite runs at three viewports, because the layout changes substantially:
1440x900, 1280x620 (short enough to squeeze the rail), and 375x812 (where the
rail becomes the dock and the phase strip scrolls). It covers axe's wcag2a
through wcag22aa rules on both pages, plus checks those rules cannot express:

- the hero photograph is present and its bytes actually decoded
- every `<img>` has non-empty alt text, since nothing here is decorative
- interactive targets are at least 24x24 (2.5.8)
- the marquee's pause control works and toggles `aria-pressed` (2.2.2)
- tabbing never leaves focus behind the fixed dock (2.4.11)
- reduced motion reveals all content immediately
- the page is complete and static with JavaScript disabled

Two design decisions follow. The era pastiches keep their period palettes, but
several colours are shifted from the source design to clear AA — the
ClimbingNarc call to action uses dark text on its orange rather than white,
which failed at 2.73:1. And the GeoCities marquee only animates when JavaScript
is running, because that is what supplies the pause control; with no script it
is static, so 2.2.2 has nothing to pause.

Playwright uses the Chrome already installed on the machine (`channel:
'chrome'`) rather than downloading its own build.

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
