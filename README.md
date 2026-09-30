# Brian Runnells

A personal site built with Astro, TypeScript, and plain CSS. Static HTML, local content, and no required client JavaScript.

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

The test command builds the site and checks the generated HTML for required routes, profile destinations, metadata, heading structure, internal links, and linked assets. Browser visual and keyboard review is a separate check. Production output is in `dist/`.

## Content

Edit `src/data/site.ts` for introductions, profiles, and project stories. Page templates live in `src/pages/`, with shared styles in `src/styles/`. `CONTENT-REVIEW.md` records sources and copy that needs Brian's review before publication. `REBUILD-PLAN.md` preserves the initial brief and subsequent design constraints.

The intended design is a restrained personal publication: specific writing, readable typography, and useful links. Avoid decorative hero graphics, gradients, generic cards, and invented project imagery.

## Deployment

This rebuild has not been published. Confirm the production domain and hosting before deployment. Set `SITE_URL` to the final origin when building so canonical URLs, sitemap entries, and social image URLs use the correct domain.

```sh
SITE_URL=https://brianrunnells.com pnpm build
```

The historical `/projects` route provides a path to the new selected work. Hosting should serve the generated `404.html` for missing URLs. Review additional historical project URLs before switching production.

The old Ember site remains in Git history. The repository's default branch is `main`.
