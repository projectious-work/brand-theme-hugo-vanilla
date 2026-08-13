const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const routes = [
  './',
  'docs/shortcodes/',
  'examples/kitchen-sink/',
  'examples/accessibility/',
];

for (const route of routes) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    const serious = results.violations.filter(
      (violation) => ['serious', 'critical'].includes(violation.impact)
    );
    expect(serious).toEqual([]);
  });
}

test('keyboard navigation exposes skip link and focus', async ({ page }) => {
  await page.goto('docs/shortcodes/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('theme toggle persists dark mode', async ({ page }) => {
  await page.goto('examples/kitchen-sink/');
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('reduced motion disables nonessential animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('examples/accessibility/');
  const duration = await page.locator('.skip-link').evaluate(
    (element) => getComputedStyle(element).transitionDuration
  );
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.000001);
});

for (const width of [375, 640, 768, 1024, 1280]) {
  test(`kitchen sink fits ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('examples/kitchen-sink/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

for (const colorScheme of ['light', 'dark']) {
  test(`reviewed ${colorScheme} kitchen-sink baseline`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('examples/kitchen-sink/');
    await expect(page).toHaveScreenshot(`kitchen-sink-${colorScheme}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
}
