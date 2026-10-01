import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.2 Level AA, checked in a real browser.
 *
 * Running in Chrome rather than jsdom is what makes this worth having: axe can
 * evaluate colour contrast against actual rendered pixels, so there is no
 * hand-maintained table of colour pairs to keep in step with the stylesheet,
 * and target size and focus occlusion are measured from real geometry.
 *
 * Each project runs the whole file at a different viewport, because the layout
 * changes substantially: the rail becomes a dock below 820px and the phase
 * strip starts scrolling below 620px.
 */

const PAGES = ['/', '/404.html'];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Waits for the WebGL moons so contrast is measured against the real hero. */
async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(250);
}

for (const path of PAGES) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path);
    await settle(page);

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    // Report the rule and the element, so a failure is actionable.
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(' ')).join('\n    ')}`,
    );
    expect(summary, summary.join('\n')).toEqual([]);
  });
}

test('introduction leads directly into the eras', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Brian Runnells');
  await expect(page.locator('#era-0')).toBeVisible();
});

test('every image has meaningful alt text', async ({ page }) => {
  await page.goto('/');
  // Nothing here is a decorative <img>; decoration is CSS and inline SVG.
  const alts = await page.locator('img').evaluateAll((imgs) =>
    imgs.map((img) => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') })),
  );
  expect(alts.length).toBeGreaterThan(0);
  for (const { src, alt } of alts) {
    expect(alt, `${src} needs non-empty alt text`).toBeTruthy();
  }
});

test('interactive targets meet the 24px minimum (2.5.8)', async ({ page }) => {
  await page.goto('/');
  await settle(page);

  const tooSmall = await page.evaluate(() => {
    const results: string[] = [];
    const nodes = document.querySelectorAll<HTMLElement>('a[href], button:not([hidden])');
    for (const node of nodes) {
      if (node.closest('.skip-link')) continue; // Off-screen until focused.
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue; // Not rendered at this viewport.
      if (rect.width < 24 || rect.height < 24) {
        results.push(`${node.className || node.tagName} ${Math.round(rect.width)}x${Math.round(rect.height)}`);
      }
    }
    return results;
  });

  expect(tooSmall, tooSmall.join(', ')).toEqual([]);
});

test('the marquee can be paused (2.2.2)', async ({ page }) => {
  await page.goto('/');
  const marquee = page.locator('[data-marquee]');
  const button = page.locator('[data-marquee-pause]');

  await expect(button).toBeVisible();
  await expect(marquee).toHaveCSS('animation-play-state', 'running');

  await button.click();
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await expect(marquee).toHaveCSS('animation-play-state', 'paused');

  await button.click();
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await expect(marquee).toHaveCSS('animation-play-state', 'running');
});

test('keyboard focus is never hidden behind the dock (2.4.11)', async ({ page }) => {
  await page.goto('/');
  await settle(page);

  const obscured: string[] = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const result = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return null;
      const dock = document.querySelector('.dock');
      if (!dock) return null;
      const style = getComputedStyle(dock);
      if (style.display === 'none') return null;
      const d = dock.getBoundingClientRect();
      const hidden =
        rect.bottom > d.top && rect.top < d.bottom && rect.right > d.left && rect.left < d.right;
      // The dock's own links are allowed to sit inside it.
      if (hidden && !dock.contains(el)) return el.className || el.tagName;
      return null;
    });
    if (result) obscured.push(result);
  }

  expect(obscured, obscured.join(', ')).toEqual([]);
});

test('reduced motion stops the animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await settle(page);

  // Era content must be visible immediately rather than waiting on a reveal.
  const hidden = await page.locator('.era-inner[data-reveal]').evaluateAll((els) =>
    els.filter((el) => Number(getComputedStyle(el).opacity) < 1).length,
  );
  expect(hidden).toBe(0);
});

test('the page works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');

  // All six eras readable, the moon static, and no marquee motion to pause.
  await expect(page.locator('.era-inner[data-reveal]')).toHaveCount(6);
  const hidden = await page.locator('.era-inner[data-reveal]').evaluateAll((els) =>
    els.filter((el) => Number(getComputedStyle(el).opacity) < 1).length,
  );
  expect(hidden).toBe(0);

  // The next full moon is baked in at build time, so it is present either way.
  await expect(page.locator('[data-next-full]')).not.toBeEmpty();

  // 2.2.2 is satisfied by there being no animation at all without the control.
  await expect(page.locator('[data-marquee]')).toHaveCSS('animation-name', 'none');

  await context.close();
});
