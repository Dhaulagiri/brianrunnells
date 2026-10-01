import { test, expect } from '@playwright/test';

// 320 CSS pixels represents a narrow phone or a 1280px display at 400% zoom.
// Text-spacing overrides follow WCAG 1.4.12 and exercise actual layout.
for (const spacing of [false, true]) {
  test(`timeline reflows at 320px${spacing ? ' with increased text spacing' : ''}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/');
    if (spacing)
      await page.addStyleTag({
        content: `
      * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
      p { margin-bottom: 2em !important; }
    `,
      });
    const outside = await page.locator('.era').evaluateAll((eras) =>
      eras.flatMap((era) => {
        const boundary = era.getBoundingClientRect();
        return [
          ...era.querySelectorAll<HTMLElement>(
            'p, h2, h3, table, td, .hk-tabs li, .hc-panel',
          ),
        ]
          .filter((node) => {
            const r = node.getBoundingClientRect();
            return (
              r.width &&
              (r.left < boundary.left - 1 || r.right > boundary.right + 1)
            );
          })
          .map(
            (node) =>
              `${node.className || node.tagName}: ${node.textContent?.trim().slice(0, 60)}`,
          );
      }),
    );
    expect(outside, outside.join('\n')).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
  });
}

test('light-era keyboard focus rings contrast with their immediate background', async ({
  page,
}) => {
  await page.goto('/');
  for (const selector of ['.gc-real-links a', '.cn-cta a', '.hc-actions a']) {
    const target = page.locator(selector).first();
    await target.focus();
    const colors = await target.evaluate((node) => {
      const ring = getComputedStyle(node).outlineColor;
      let ancestor: Element | null = node.parentElement;
      while (
        ancestor &&
        getComputedStyle(ancestor).backgroundColor === 'rgba(0, 0, 0, 0)'
      )
        ancestor = ancestor.parentElement;
      return {
        ring,
        background: ancestor
          ? getComputedStyle(ancestor).backgroundColor
          : 'rgb(255, 255, 255)',
        width: getComputedStyle(node).outlineWidth,
      };
    });
    const luminance = (color: string) => {
      const channels = color
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((c) => {
          const v = c / 255;
          return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const values = [luminance(colors.ring), luminance(colors.background)].sort(
      (a, b) => a - b,
    );
    expect(
      (values[1] + 0.05) / (values[0] + 0.05),
      `${selector}: ${JSON.stringify(colors)}`,
    ).toBeGreaterThanOrEqual(3);
    expect(parseFloat(colors.width)).toBeGreaterThanOrEqual(2);
  }
});

test('final footer clears the fixed dock at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await expect(page.locator('.era-next .era-inner')).toHaveCSS('opacity', '1');
  const geometry = await page.evaluate(() => ({
    footer: document.querySelector('.nx-footer')!.getBoundingClientRect()
      .bottom,
    dock: document.querySelector('.dock')!.getBoundingClientRect().top,
  }));
  expect(geometry.footer).toBeLessThanOrEqual(geometry.dock);
  const contact = page.locator('.nx-footer a').last();
  await contact.focus();
  const focusedGeometry = await contact.evaluate((node) => ({
    bottom: node.getBoundingClientRect().bottom,
    dockTop: document.querySelector('.dock')!.getBoundingClientRect().top,
  }));
  expect(focusedGeometry.bottom + 6).toBeLessThanOrEqual(
    focusedGeometry.dockTop,
  );
});

test('keyboard focus reveals a section immediately before its scroll animation', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
  await page.evaluate(() => {
    // Hold the section at its unrevealed state to exercise focus independently
    // of scroll-update timing; the real enhancement class is required.
    const section = document.querySelector('.era-hashicorp .era-inner')!;
    section.classList.remove('is-visible');
    const observer = new MutationObserver(() => {
      if (section.classList.contains('is-visible'))
        section.classList.remove('is-visible');
    });
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    (
      window as unknown as { focusTestObserver: MutationObserver }
    ).focusTestObserver = observer;
  });
  const target = page.locator('.hc-actions a').first();
  await target.focus();
  const style = await target.evaluate((node) => {
    const css = getComputedStyle(node.closest('.era-inner')!);
    return {
      opacity: css.opacity,
      transform: css.transform,
      transition: css.transitionDuration,
    };
  });
  expect(style).toEqual({ opacity: '1', transform: 'none', transition: '0s' });
});
