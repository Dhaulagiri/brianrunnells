import { defineConfig } from 'astro/config';

// Use the confirmed production origin even in builds without environment config.
export default defineConfig({
  site: process.env.SITE_URL || 'https://brianrunnells.com',
  output: 'static',
  trailingSlash: 'always',
});
