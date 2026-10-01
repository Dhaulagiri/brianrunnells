import { test, expect } from '@playwright/test';

test('a blocked enhancement bundle leaves every era readable and marquee still', async ({ page }) => {
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/');
  expect(await page.locator('[data-reveal]').evaluateAll((nodes) =>
    nodes.every((node) => getComputedStyle(node).opacity === '1'),
  )).toBe(true);
  await expect(page.locator('[data-marquee]')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('[data-marquee-pause]')).toBeHidden();
});

test('mobile dock indicates overflow and keeps the current era in view', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.dock-scroll-cue')).toBeVisible();
  await page.locator('[data-era]').last().scrollIntoViewIfNeeded();
  const active = page.locator('.dock-list [aria-current]');
  await expect(active).toHaveAttribute('data-era-link', 'era-5');
  expect(await active.evaluate((link) => {
    const item = link.getBoundingClientRect();
    const list = link.closest('.dock-list')!.getBoundingClientRect();
    return item.left >= list.left && item.right <= list.right;
  })).toBe(true);
});
