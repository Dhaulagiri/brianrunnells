import { test, expect } from '@playwright/test';

test('the timeline leads into the Helios story and back', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.hc-case-study').click();
  await expect(page).toHaveURL(/\/work\/helios\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Building Helios.',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://brianrunnells.com/work/helios/',
  );
  await expect(
    page.getByRole('link', { name: 'Helios documentation', exact: true }),
  ).toHaveAttribute('href', 'https://helios.hashicorp.design/');
  await page
    .getByRole('link', { name: 'Back to the timeline' })
    .first()
    .click();
  await expect(page).toHaveURL(/\/#era-4$/);
  await expect(page.locator('#era-4')).toBeInViewport();
});

test('the full case study remains readable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/helios/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(10);
  await expect(page.locator('.case-products li')).toHaveText([
    'Terraform',
    'Vault',
    'Consul',
    'Nomad',
    'Boundary',
    'Waypoint',
    'Packer',
    'Vagrant',
  ]);
  await expect(page.locator('#invite-feedback .case-principle')).toContainText(
    'Principle 06 · Invite feedback',
  );
  await expect(page.locator('#quality-by-default .case-cost')).toContainText(
    'The tradeoff.',
  );
  await expect(page.locator('#invite-feedback')).toContainText(
    'engineering, design, and accessibility',
  );
  await expect(page.locator('#design-in-context')).toContainText(
    'we didn’t measure velocity directly',
  );
  await expect(page.locator('.case-note')).toContainText('while I led Helios');
  await expect(page.locator('.case-note')).toContainText('while I led Helios');
  await context.close();
});

test('the case study reflows with increased text spacing and keeps usable targets', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/work/helios/');
  await page.addStyleTag({
    content: `
    * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
    p { margin-bottom: 2em !important; }
  `,
  });
  const geometry = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    smallTargets: [...document.querySelectorAll<HTMLAnchorElement>('a[href]')]
      .filter((a) => !a.classList.contains('skip-link'))
      .filter((a) => {
        const rect = a.getBoundingClientRect();
        return rect.width < 24 || rect.height < 24;
      })
      .map((a) => a.textContent),
  }));
  expect(geometry.overflow).toBe(false);
  expect(geometry.smallTargets).toEqual([]);
});
