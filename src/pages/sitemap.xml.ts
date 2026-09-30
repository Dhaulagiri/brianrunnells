import type { APIRoute } from 'astro';

// The site is a single page; the remaining routes are redirects and are left
// out deliberately so they are not indexed in their own right.
export const GET: APIRoute = ({ site }) => {
  const urls = site ? `<url><loc>${new URL('/', site).href}</loc></url>` : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
