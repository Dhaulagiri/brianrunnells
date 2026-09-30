/**
 * WCAG 2.2 Level AA checks against the built site.
 *
 * Two halves, because neither alone is enough:
 *
 * 1. Colour contrast. jsdom has no layout engine, so axe cannot evaluate
 *    contrast; instead every foreground/background pair the design uses is
 *    declared here with its size and weight, and checked against the 1.4.3
 *    thresholds. Adding a colour to the stylesheet means adding it here.
 *
 * 2. Structure, via axe-core over the built HTML in jsdom: landmarks, headings,
 *    alt text, ARIA, document language, duplicate ids and so on.
 *
 * Plus a few assertions for 2.2 criteria that neither half covers: the marquee
 * pause control (2.2.2), target sizes (2.5.8), and the hero image actually
 * being present (its absence once passed validate-build.mjs silently).
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const output = path.resolve(process.argv[2] || 'dist');
const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

/* ---------------------------------------------------------------- contrast */

function channels(hex) {
  let value = hex.replace('#', '');
  if (value.length === 3) value = [...value].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function relativeLuminance(hex) {
  const [r, g, b] = channels(hex).map((c) => {
    const channel = c / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(foreground, background) {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [light, dark] = a > b ? [a, b] : [b, a];
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Every text colour pair in the design. `px` is the rendered font size and
 * `bold` its weight, which together decide the 1.4.3 threshold: large text
 * (>=24px, or >=18.66px bold) needs 3:1, everything else 4.5:1.
 */
const cssSource = await readFile('src/styles/global.css', 'utf8');

const TEXT_PAIRS = [
  ['shell: muted body', '#b9b5aa', '#050608', 14, false],
  ['shell: dim footnote', '#918d84', '#050608', 14, false],
  ['shell: hero intro', '#d9d5ca', '#050608', 14, false],
  ['rail: era name idle', '#7c7f88', '#07080c', 24, false],
  ['rail: era name past', '#8a877f', '#07080c', 24, false],
  ['rail: era name current', '#f3e6bf', '#07080c', 24, false],
  ['rail: years', '#918d84', '#07080c', 10, false],
  ['rail: phase pct', '#918d84', '#07080c', 11, false],
  ['dock: chip idle', '#7c7f88', '#07080c', 12, false],
  ['dock: chip past', '#8a877f', '#07080c', 12, false],
  ['geocities: base text', '#ffff66', '#000066', 21, false],
  ['geocities: kicker', '#99ccff', '#000066', 12, false],
  ['geocities: body', '#ffffff', '#000066', 21, false],
  ['geocities: marquee', '#00ff66', '#000000', 17, false],
  ['geocities: marquee pause', '#000000', '#c0c0c0', 13, false],
  ['geocities: title', '#ff66ff', '#000066', 32, true],
  ['geocities: panel link', '#0000cc', '#c0c0c0', 16, false],
  ['geocities: visitor', '#ff3333', '#000000', 22, false],
  ['geocities: webring link', '#99ccff', '#000066', 15, false],
  ['geocities: badge netscape', '#ffffff', '#008080', 9, true],
  ['geocities: badge 800x600', '#ffff00', '#800000', 9, true],
  ['frontend: kicker', '#4d5361', '#d6d9de', 12, false],
  ['frontend: body', '#333333', '#d6d9de', 13, false],
  ['frontend: summary', '#222222', '#ffffff', 15, false],
  ['frontend: years cell', '#6b6b6b', '#ffffff', 13, false],
  ['frontend: years alt row', '#6b6b6b', '#fafbfc', 13, false],
  ['frontend: filename sub', '#c8d5ea', '#3b5b8c', 16, false],
  ['frontend: modified', '#dce4f2', '#3b5b8c', 11, false],
  ['frontend: th', '#3b5b8c', '#eef1f5', 11, true],
  ['climbingnarc: kicker', '#637066', '#f4f7ef', 12, false],
  ['climbingnarc: meta', '#637066', '#fffdf8', 11, false],
  ['climbingnarc: post title', '#2f6f3e', '#fffdf8', 28, false],
  ['climbingnarc: body', '#18201b', '#fffdf8', 14, false],
  ['climbingnarc: tagline', '#b9d0bf', '#173f28', 13, false],
  ['climbingnarc: nav', '#b9d0bf', '#173f28', 12, false],
  ['climbingnarc: cta', '#2a1400', '#f47b20', 13, true],
  ['climbingnarc: stats', '#637066', '#fffdf8', 12, false],
  ['heroku: base text', '#2c2a3a', '#f4f3f8', 14, false],
  ['heroku: kicker', '#66627d', '#f4f3f8', 12, false],
  ['heroku: tab idle', '#6e6a86', '#fbfafd', 14, true],
  ['heroku: tab current', '#6b4fa0', '#fbfafd', 14, true],
  ['heroku: scope', '#6e6a86', '#fbfafd', 12, false],
  ['heroku: column title', '#6e6a86', '#ffffff', 12, true],
  ['heroku: dyno status', '#2c7644', '#ffffff', 12, false],
  ['heroku: activity code', '#6b4fa0', '#ffffff', 13, false],
  ['heroku: terminal cmd', '#8f89ad', '#1d1b28', 12, false],
  ['heroku: wordmark', '#430098', '#f4f3f8', 34, true],
  ['hashicorp: base text', '#0c0c0e', '#fafafa', 14, false],
  ['hashicorp: kicker', '#656a76', '#fafafa', 12, false],
  ['hashicorp: body', '#3b3d45', '#fafafa', 17, false],
  ['hashicorp: tab idle', '#656a76', '#ffffff', 14, true],
  ['hashicorp: tab current', '#1060ff', '#ffffff', 14, true],
  ['hashicorp: btn primary', '#ffffff', '#1060ff', 14, true],
  ['hashicorp: btn secondary', '#3b3d45', '#ffffff', 14, true],
  ['hashicorp: badge oss', '#006619', '#f2fbf6', 13, false],
  ['hashicorp: tag highlight', '#0c56e9', '#f2f8ff', 13, true],
  ['hashicorp: tag success', '#006619', '#f2fbf6', 13, true],
  ['hashicorp: tag warning', '#9e4b00', '#fff9e8', 13, true],
  ['hashicorp: tag neutral', '#3b3d45', '#f1f2f3', 13, true],
  ['hashicorp: tokens', '#656a76', '#ffffff', 11, false],
  ['hashicorp: token note', '#70747f', '#ffffff', 11, false],
];

/** 1.4.11 Non-text contrast: UI boundaries and focus rings need 3:1. */
const NON_TEXT_PAIRS = [
  ['focus ring on dark', '#f3e6bf', '#050608'],
  ['focus ring on rail', '#f3e6bf', '#07080c'],
  ['rail dot filled', '#f0ece2', '#07080c'],
  ['dock border', '#5a5e69', '#050608'],
  ['social pill border', '#5a5e69', '#050608'],
  ['rail dot outline', '#5a5e69', '#07080c'],
  ['hashicorp: switch', '#1060ff', '#ffffff'],
  ['heroku: dyno on', '#6b4fa0', '#ffffff'],
];

for (const [label, fg, bg, px, bold] of TEXT_PAIRS) {
  const large = px >= 24 || (bold && px >= 18.66);
  const required = large ? 3 : 4.5;
  const ratio = contrastRatio(fg, bg);
  if (ratio < required) {
    fail('contrast (1.4.3)', `${label}: ${ratio.toFixed(2)}:1, needs ${required}:1 (${fg} on ${bg})`);
  }
}

for (const [label, fg, bg] of NON_TEXT_PAIRS) {
  const ratio = contrastRatio(fg, bg);
  if (ratio < 3) {
    fail('non-text contrast (1.4.11)', `${label}: ${ratio.toFixed(2)}:1, needs 3:1 (${fg} on ${bg})`);
  }
}

/**
 * Every hex the stylesheet uses as a text colour — whether written directly on
 * a `color:` declaration or held in a custom property — has to appear in a pair
 * above. Without this, editing a colour in the CSS would silently stop being
 * tested, because the tables hold literals rather than reading the stylesheet.
 */
/** #abc and #AABBCC must compare equal. */
const normalise = (hex) => {
  let value = hex.toLowerCase().replace('#', '');
  if (value.length === 3) value = [...value].map((c) => c + c).join('');
  return `#${value.slice(0, 6)}`;
};

const declared = new Set(
  [...TEXT_PAIRS, ...NON_TEXT_PAIRS].flatMap(([, fg, bg]) => [fg, bg]).map(normalise),
);

const textColours = new Set();
for (const [, colour] of cssSource.matchAll(/(?<!-)\bcolor:\s*(#[0-9a-fA-F]{3,8})/g)) {
  textColours.add(normalise(colour));
}
// Custom properties that carry text or component colour. `--rule` is excluded:
// it is a hairline divider, which 1.4.11 treats as decorative.
for (const [, name, colour] of cssSource.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  if (/ink|paper|muted|dim|accent|edge/.test(name)) textColours.add(normalise(colour));
}
for (const colour of textColours) {
  if (!declared.has(colour)) {
    fail('contrast coverage', `${colour} is used as a text or token colour but no pair above covers it`);
  }
}

/* --------------------------------------------------------------- structure */

const pages = ['index.html', '404.html'];

for (const page of pages) {
  const html = await readFile(path.join(output, page), 'utf8');
  const dom = new JSDOM(html, {
    url: 'https://example.com/',
    pretendToBeVisual: true,
    runScripts: 'outside-only',
  });
  const { window } = dom;

  // axe binds to globals at import time, so run its own source inside the jsdom
  // realm rather than handing our copy a foreign document.
  window.eval(axe.source);

  // Contrast is excluded because jsdom performs no layout and would report
  // every node as incomplete; it is covered by the pair table above.
  const results = await window.axe.run(window.document, {
    resultTypes: ['violations'],
    rules: { 'color-contrast': { enabled: false } },
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
  });

  for (const violation of results.violations) {
    const where = violation.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ');
    fail(`${page} (${violation.id})`, `${violation.help} [${where}]`);
  }

  const { document } = window;

  if (page === 'index.html') {
    // The hero image must be in the markup; a build that dropped it previously
    // passed validate-build.mjs because a missing <img> checks nothing.
    const hero = document.querySelector('img.hero-photo');
    if (!hero) fail(page, 'hero photograph is missing from the markup');
    else if (!hero.getAttribute('alt')) fail(page, 'hero photograph has no alt text');

    // axe accepts alt="" as "decorative". Nothing on this page is a decorative
    // <img> (decoration is CSS and inline SVG), so require real alt text.
    for (const img of document.querySelectorAll('img')) {
      const alt = img.getAttribute('alt');
      if (alt === null) fail(page, `<img src="${img.getAttribute('src')}"> has no alt attribute`);
      else if (alt.trim() === '') fail(page, `<img src="${img.getAttribute('src')}"> has empty alt text`);
    }

    // 2.2.2: animated marquee must ship a pause control.
    const marquee = document.querySelector('.gc-marquee');
    if (marquee && !marquee.querySelector('[data-marquee-pause]')) {
      fail(page, 'marquee has no pause control (2.2.2)');
    }

    // 2.4.1: a way past the repeated rail/dock navigation.
    if (!document.querySelector('a.skip-link')) fail(page, 'skip link is missing (2.4.1)');

    // 2.5.8: interactive targets declare at least 24px in the stylesheet.
    for (const selector of ['.rail-list a', '.rail-social a', '.dock-list a', '.social-pills a']) {
      const rule = new RegExp(`${selector.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*\\{[^}]*min-height:\\s*(\\d+)px`);
      const match = cssSource.match(rule);
      if (!match || Number(match[1]) < 24) {
        fail('target size (2.5.8)', `${selector} does not declare a min-height of at least 24px`);
      }
    }

    // 3.1.1 / 2.4.2 are covered by axe, but assert the era headings exist so a
    // refactor cannot silently flatten the document outline.
    const h2s = [...document.querySelectorAll('main h2')];
    if (h2s.length < 6) fail(page, `expected a heading per era, found ${h2s.length}`);
    if (document.querySelectorAll('h1').length !== 1) fail(page, 'page must have exactly one h1');
  }

  window.close();
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} WCAG 2.2 AA problem(s).`);
  process.exit(1);
}
console.log(
  `Validated WCAG 2.2 AA: ${TEXT_PAIRS.length} text and ${NON_TEXT_PAIRS.length} non-text contrast pairs, ` +
    `axe-core structural rules on ${pages.length} pages, plus pause control, skip link, target sizes and headings.`,
);
