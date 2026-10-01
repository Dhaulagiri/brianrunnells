/**
 * Foreground preview server for the Playwright run.
 *
 * Astro 7's `astro preview` CLI daemonizes: it spawns a detached server, prints
 * the URL and exits straight away. Playwright's `webServer` needs a process
 * that stays put for the life of the test run, so we drive the same preview
 * server through Astro's programmatic API instead and simply never resolve.
 */
import { preview } from 'astro';

const port = Number(process.env.PREVIEW_PORT ?? 4325);

const server = await preview({
  root: process.cwd(),
  logLevel: 'error',
  server: { port },
});

console.log(`Preview server listening on http://localhost:${port}/`);

const shutdown = async () => {
  await server.stop();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep the event loop occupied so the process stays in the foreground.
await new Promise(() => {});
