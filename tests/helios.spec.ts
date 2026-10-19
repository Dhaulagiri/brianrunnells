import { test, expect } from '@playwright/test';
import { heliosCaseStudy as story } from '../src/data/site';

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

test('the full case study renders every piece of its content without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/helios/');

  /* Assert against the content source rather than against strings copied into
     the test: the point is that the page renders everything it is given, and
     that stays true as the copy keeps changing. */
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    story.heading,
  );
  await expect(page.locator('.case-introduction')).toHaveText(
    story.introduction,
  );
  await expect(page.locator('.case-role')).toHaveText(story.role);

  for (const outcome of story.outcomes) {
    const figure = page.locator('.case-outcomes div', {
      hasText: outcome.label,
    });
    await expect(figure).toContainText(outcome.value);
  }

  const principles = page.locator('.case-principles');
  await expect(principles).toContainText(story.principles.heading);
  await expect(principles).toContainText(story.principles.body);

  for (const section of story.sections) {
    const region = page.locator(`#${section.id}`);
    await expect(region).toContainText(section.principle.name);
    await expect(region).toContainText(section.principle.text);
    await expect(region).toContainText(section.heading);
    await expect(region).toContainText(section.lede);
    for (const paragraph of section.paragraphs) {
      await expect(region).toContainText(paragraph);
    }
    await expect(region.locator('.case-cost')).toContainText(section.tradeoff);
  }

  const artifacts = page.locator('.case-artifacts');
  await expect(artifacts).toContainText(story.artifacts.heading);
  await expect(artifacts).toContainText(story.artifacts.body);
  await expect(artifacts).toContainText(story.credit);

  for (const link of story.artifacts.links) {
    await expect(
      artifacts.getByRole('link', { name: link.label, exact: true }),
    ).toHaveAttribute('href', link.url);
    await expect(artifacts).toContainText(link.note);
    await expect(
      page.locator('.case-jump').getByRole('link', { name: link.short }),
    ).toHaveAttribute('href', link.url);
  }

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
