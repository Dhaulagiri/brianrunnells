import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('guestbook and dashboard toys work with the keyboard', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Sign Guestbook!!', { exact: true }).click();
  const sign = page.getByRole('button', { name: 'Brian was here. You were too.' });
  await sign.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-guestbook-status]')).toContainText('Signed!');
  await expect(sign).toHaveAttribute('aria-pressed', 'true');
  await expect(sign).toBeFocused();
  const guestbookAudit = await new AxeBuilder({ page }).include('#era-0').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(guestbookAudit.violations).toEqual([]);
  const deploy = page.getByRole('button', { name: 'Deploy', exact: true });
  await deploy.focus();
  await page.keyboard.press('Enter');
  await expect(deploy).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-heroku-status]')).toContainText('imaginary app');
  await expect(page.locator('[data-heroku-overview]')).toBeHidden();
  for (const view of ['Resources', 'Deploy', 'Metrics', 'Activity']) {
    await page.getByRole('button', { name: view, exact: true }).click();
    const audit = await new AxeBuilder({ page }).include('#era-3').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await expect(page.locator('[data-heroku-overview]')).toBeVisible();
  for (const view of ['Components', 'Patterns', 'Foundations']) {
    await page.getByRole('button', { name: view, exact: true }).click();
    const audit = await new AxeBuilder({ page }).include('#era-4').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(audit.violations).toEqual([]);
  }
  await expect(page.locator('[data-helios-status]')).toContainText('unofficial moon token');
  const moon = page.getByRole('switch', { name: 'Moon mode' });
  await moon.focus();
  await page.keyboard.press('Space');
  await expect(moon).toHaveAttribute('aria-checked', 'true');
  const audit = await new AxeBuilder({ page }).include('#era-4').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press('Space');
  await expect(moon).toHaveAttribute('aria-checked', 'false');
});

test('webring and archive links have real destinations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'random', exact: true }).click();
  await expect(page).toHaveURL(/#era-[1-5]$/);
  for (const link of await page.locator('.cn-nav a').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\/climbingnarc\.com\//);
  }
});
