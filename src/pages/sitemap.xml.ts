import type { APIRoute } from 'astro';

// Index the timeline and its case study; the error page is deliberately omitted.
export const GET: APIRoute = ({ site }) => {
  const urls = site
    ? ['/', '/work/helios/']
        .map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`)
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
