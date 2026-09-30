import { defineConfig } from 'astro/config';

// Supply the confirmed production origin at build time.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'always',
});
