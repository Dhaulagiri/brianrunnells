import type { APIRoute } from 'astro';
import { projects } from '../data/site';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/about/', ...projects.map(project => `/work/${project.slug}/`)];
  const urls = site ? paths.map(path => `<url><loc>${new URL(path, site).href.replaceAll('&', '&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
