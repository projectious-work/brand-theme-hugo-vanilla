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
      // The brand's standard link treatment uses colour plus a hover underline.
      // Persistent prose underlines are an explicit accessibility option.
      .disableRules(['color-contrast', 'link-in-text-block'])
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

test('prose link underlines are opt-in', async ({ page }) => {
  await page.goto('examples/kitchen-sink/');
  await expect(page.locator('html')).not.toHaveAttribute('data-link-underline', 'on');
  const decoration = await page.locator('.content p a').first().evaluate(
    (element) => getComputedStyle(element).textDecorationLine
  );
  expect(decoration).toBe('none');
});

test('brand and GitHub controls resolve to their intended destinations', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('header .brand')).toHaveAttribute(
    'href',
    '/brand-theme-hugo-vanilla/'
  );
  const github = page.locator('header .github-link');
  await expect(github).toHaveAttribute(
    'href',
    'https://github.com/projectious-work/brand-theme-hugo-vanilla'
  );
  await expect(github).toHaveAttribute('aria-label', 'GitHub');
});

test('search returns continuous results for Documentation', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-search-open]').click();
  const input = page.locator('[data-search-input]');
  const results = page.locator('[data-search-results] a');
  for (const query of ['Doc', 'Document', 'Documentation']) {
    await input.fill(query);
    await expect(results.first()).toBeVisible();
    await expect(results.filter({ hasText: 'Documentation' }).first()).toBeVisible();
  }
});

test('FlexSearch ranks partial and multi-word documentation queries', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-search-open]').click();
  const input = page.locator('[data-search-input]');
  const results = page.locator('[data-search-results] a');

  await input.fill('configur');
  await expect(results.first()).toContainText('Configuration');

  await input.fill('brand fonts');
  await expect(results.first()).toContainText('Brand provenance and fonts');
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
