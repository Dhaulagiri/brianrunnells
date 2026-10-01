import { test, expect } from '@playwright/test';

test('visitors can discover current work and a contact destination immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.intro-summary')).toContainText('HashiCorp, now part of IBM');
  const jump = page.getByRole('link', { name: 'Jump to today' });
  await jump.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#era-4$/);
  await expect(page.locator('#era-4')).toBeInViewport();
  await expect(page.locator('#era-4')).toContainText('accessibility');
  const contact = page.locator('.nx-footer').getByRole('link', { name: 'LinkedIn' });
  await expect(contact).toHaveAttribute('href', 'https://www.linkedin.com/in/brianrunnells');
  await expect(page.locator('.nx-headline')).toContainText('The next full moon is around');
});
