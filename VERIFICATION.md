# Verification — September 29, 2026

## Latest revision

Apex Rewatch was removed at Brian's request. The current site has six HTML pages and two work stories. `pnpm test` and `pnpm check` pass after removal, and a search of source, generated output, and validation scripts finds no Apex Rewatch references. The browser review below describes the preceding version; the removal changes shared content and generated routes without changing the layout.

## Initial implementation checks

- `pnpm check`: 13 files, zero errors, warnings, or hints.
- `pnpm test`: production build and generated HTML validation pass for seven pages.
- `SITE_URL=https://brianrunnells.com pnpm test`: configured-origin build passes. Separate assertions confirm five sitemap entries, robots sitemap destination, homepage canonical and social image URLs, and no scripts in the generated homepage.
- `git diff --check`: passes.
- Chromium production-preview review: all seven pages at 1440px, 390px, and 320px widths; no horizontal overflow or JavaScript errors. First Tab reaches the skip link and Enter focuses main at each width. This was the production preview at `http://127.0.0.1:4321/`, not the development server.
- Desktop and mobile homepage screenshots visually inspected. No decorative graphics, gradients, rounded card grid, or faux screenshots. Contrast calculated from actual CSS colors against the paper background: body 13.35:1, muted text 5.66:1, accent 7.62:1.

The build emits two harmless Rollup warnings about annotations in upstream Zod comments; the bundler strips those comments. Application type checking is clean.

The added workflow configuration has not run on GitHub. No deployment, live-domain switch, screen-reader session, or external-link availability audit was performed. Exact social profile destinations are validated against the requested links. Public copy and the historical Twitter handle remain for Brian's review in `CONTENT-REVIEW.md`.
