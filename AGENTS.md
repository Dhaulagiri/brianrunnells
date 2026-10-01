# Working on brianrunnells.com

A one-page personal site: a scroll-driven timeline from a GeoCities homepage to
the Helios design system, where each era wears the visual language of its own
period. Astro, TypeScript, plain CSS. No UI framework, no CSS framework, no
component library — if you reach for a dependency, that is a conversation, not a
commit.

## House rules

- **WCAG 2.2 AA on every change.** This is the one hard constraint. The era
  pastiches are allowed to look like 1997; they are not allowed to fail
  contrast, target size, or keyboard access. Several period colours are already
  shifted from their sources to clear AA — keep them shifted.
- **Keep things light and fun.** The copy is playful and a little self-aware.
  Match it. No leadership slogans, no skill meters, no climbing metaphors
  stretched across every section.
- **Restrained design.** No decorative gradients-for-the-sake-of-it, no rounded
  card grids, no AI-house-style flourishes. Specific copy, real typography,
  useful links, deliberate spacing.

## Getting oriented

```sh
pnpm install
pnpm dev        # or use the "site" config in .claude/launch.json (port 4322)
```

Node and pnpm versions are pinned in `package.json` (`engines`,
`packageManager`). Use pnpm — never npm or yarn.

| Where                         | What lives there                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`       | The whole site: intro, rail, the six era sections, dock                                                              |
| `src/data/site.ts`            | All content — profile copy, social links, the `eras` array, per-era text                                             |
| `src/components/eras/*.astro` | One component per era, each with its own scoped period styles                                                        |
| `src/components/`             | Shell pieces: `Rail` (desktop nav), `Dock` (mobile nav), `Moon`, `Icon`, link lists                                  |
| `src/layouts/Base.astro`      | `<head>`, metadata, canonical URL, ProfilePage structured data                                                       |
| `src/styles/global.css`       | Shell tokens and layout; the biggest file here by far                                                                |
| `src/scripts/`                | Progressive enhancement only — `moonrise` (scroll + rail tracking), `moon-gl` (WebGL moon), `easter-eggs` (the toys) |
| `src/lib/moon.ts`             | Next-full-moon maths, baked in at build time                                                                         |
| `tests/`                      | Playwright: a11y, easter eggs, reflow/focus, no-JS resilience, visitor journey                                       |
| `scripts/validate-build.mjs`  | Post-build HTML checks on `dist/`                                                                                    |

The `eras` array in `src/data/site.ts` drives the rail, the dock, and the
section order. Adding or reordering an era means touching that array, the
imports in `index.astro`, and probably a test.

## Conventions worth knowing

- **Content lives in `src/data/site.ts`, not in markup.** Copy changes belong
  there.
- **Progressive enhancement is load-bearing, not aspirational.** The page is
  complete, visible, and static with JavaScript off, and a test enforces it. The
  GeoCities marquee only animates when the script runs, because the script is
  what supplies the pause control — that is how 2.2.2 is satisfied. Don't make
  content depend on JS.
- **Era components own their own CSS** in Astro scoped `<style>` blocks. Shell
  tokens (`--ink`, `--paper`, `--accent`, `--serif`, …) are in `global.css`.
- **Scripts find their hooks via `data-*` attributes** (`data-era`,
  `data-marquee-pause`, `data-guestbook`, `data-heroku-view`…). Interactive toys
  ship `disabled` and are enabled only after listeners attach.
- **Comments explain _why_, in prose.** Match that voice — the existing ones are
  the style guide.
- **`prefers-reduced-motion` must reveal everything immediately.**

## Before you call it done

```sh
pnpm format      # Prettier, with the Astro plugin
pnpm check       # astro check — must be zero errors
pnpm test        # build + validate-build.mjs + Playwright
```

`pnpm test` runs the suite at three viewports (1440x900, 1280x620 short enough
to squeeze the rail, 375x812 where the rail becomes the dock). Playwright uses
the Chrome already on the machine (`channel: 'chrome'`), so no download is
needed. `pnpm test:a11y` skips the build if you already have a fresh `dist/`.

CI (`.github/workflows/check.yml`) runs `format:check`, `check`, and `test` on
every PR. Expect the same locally before pushing.

## Pull requests

- When asked to create a PR, you have permission to commit task-related
  changes, push the task branch to
  https://github.com/Dhaulagiri/brianrunnells, and open the PR without asking
  for additional confirmation.
- Keep unrelated changes and private local files out of the commit. This
  permission does not include merging, deploying, or force-pushing.
- Commit subjects read as sentences describing the change ("Rebalance the
  timeline, fix dock contrast, and unbury the lede").

## Deployment, briefly

Vercel, at `https://brianrunnells.com`. `astro.config.mjs` defaults to that
origin; `SITE_URL` overrides it. Canonical URLs, sitemap, structured data, and
social images all follow it. Agents don't deploy.

## Historical docs — read with suspicion

`REBUILD-PLAN.md` and `VERIFICATION.md` describe the earlier multi-page site
(`/about/`, `/projects/`, `/work/<slug>/`) and a seven-page build. Those routes
are gone; the site is one page plus a 404. Both files reference
`CONTENT-SOURCES.md` and `CONTENT-REVIEW.md`, which are not in the repository.
Treat them as background, not as a description of what exists. `README.md` is
current.
