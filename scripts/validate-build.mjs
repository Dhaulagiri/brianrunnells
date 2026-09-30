import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(process.argv[2] || 'dist');
const expected = ['index.html', 'about/index.html', 'work/helios/index.html', 'work/climbingnarc/index.html', '404.html', 'projects/index.html'];
const profiles = ['https://www.linkedin.com/in/brianrunnells', 'https://github.com/Dhaulagiri', 'https://twitter.com/climbingnarc'];
const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);
async function exists(file) { try { return (await stat(file)).isFile(); } catch { return false; } }
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
  return files.flat();
}
function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(match => [match[1].toLowerCase(), match[2] ?? match[3]]));
}
function decode(value) { return value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"'); }
let files;
try { files = await walk(output); } catch { console.error(`Build output missing: ${output}. Run the production build first.`); process.exit(1); }
for (const file of expected) if (!await exists(path.join(output, file))) fail(file, 'required route is missing');
const htmlFiles = files.filter(file => file.endsWith('.html'));
for (const fullPath of htmlFiles) {
  const file = path.relative(output, fullPath);
  const html = await readFile(fullPath, 'utf8');
  if (!/<html\b[^>]*\blang=["']en(?:-[\w]+)?["']/i.test(html)) fail(file, 'English document language is missing');
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title || !title.includes('Brian Runnells')) fail(file, 'descriptive title must identify Brian Runnells');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => attrs(match[0]));
  if (!metas.some(meta => meta.name === 'description' && meta.content?.trim().length > 30)) fail(file, 'meaningful meta description is missing');
  if (!metas.some(meta => meta.name === 'viewport' && meta.content?.includes('width=device-width'))) fail(file, 'mobile viewport is missing');
  if ([...html.matchAll(/<h1\b/gi)].length !== 1) fail(file, 'page must have exactly one h1');
  if (!/<main\b/i.test(html)) fail(file, 'main landmark is missing');
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => attrs(match[0]));
  if (['index.html', 'about/index.html'].includes(file)) {
    for (const profile of profiles) if (!anchors.some(anchor => anchor.href?.replace(/\/$/, '') === profile)) fail(file, `missing requested profile: ${profile}`);
  }
  for (const match of html.matchAll(/<(a|img|script|link|source)\b[^>]*>/gi)) {
    const tag = match[1].toLowerCase();
    const attributes = attrs(match[0]);
    if (tag === 'img' && !Object.hasOwn(attributes, 'alt')) fail(file, 'image lacks alt attribute');
    const raw = tag === 'a' || tag === 'link' ? attributes.href : attributes.src;
    if (raw === undefined) continue;
    const value = decode(raw).trim();
    if (!value || value === '#' || /^javascript:/i.test(value)) { fail(file, `empty or placeholder ${tag} destination`); continue; }
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;
    const [urlPath, fragment] = value.split('#');
    if (!urlPath) { if (fragment && !ids.has(fragment)) fail(file, `fragment #${fragment} is missing`); continue; }
    const localPath = decodeURIComponent(urlPath.split('?')[0]);
    let target = localPath.startsWith('/') ? path.join(output, localPath) : path.resolve(path.dirname(fullPath), localPath);
    if (!target.startsWith(output + path.sep) && target !== output) { fail(file, `destination escapes output: ${value}`); continue; }
    if (!await exists(target)) {
      if (await exists(path.join(target, 'index.html'))) target = path.join(target, 'index.html');
      else if (await exists(`${target}.html`)) target += '.html';
      else { fail(file, `missing local destination: ${value}`); continue; }
    }
    if (fragment && target.endsWith('.html')) {
      const destination = await readFile(target, 'utf8');
      const targetIds = [...destination.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
      if (!targetIds.includes(fragment)) fail(file, `destination fragment missing: ${value}`);
    }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${htmlFiles.length} built HTML pages: required routes, profile destinations, metadata, headings, landmarks, image alternatives, internal links, fragments, and local assets.`);
