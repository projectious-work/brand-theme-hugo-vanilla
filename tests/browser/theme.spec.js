const { test, expect } = require("@playwright/test");

test("landing page matches the approved theme", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator("main")).toBeVisible();
  await expect(page).toHaveScreenshot("landing.png", {
    fullPage: true,
    animations: "disabled",
  });
});

test("documentation page matches the approved theme", async ({ page }) => {
  await page.goto("docs/");
  await expect(page.locator("main")).toBeVisible();
  await expect(page).toHaveScreenshot("docs.png", {
    fullPage: true,
    animations: "disabled",
  });
});

test("pinned CDN media, math and diagrams render", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));

  await page.goto("docs/guides/");
  await expect(page.locator(".katex").first()).toBeVisible();
  await expect(page.locator(".notebook[data-notebook='theme-demo']")).toBeVisible();
  await expect(page.locator(".terminal")).toContainText([
    "$ hugo server --disableFastRender",
    "Watching for changes in content and layouts",
    "Web Server is available at http://localhost:1313/",
    "Press Ctrl+C to stop",
  ].join("\n"));

  await expect(page.locator(".mermaid svg")).toBeVisible();
  await page.evaluate(() => window.pwTheme.set("dark"));
  await expect(page.locator(".mermaid svg")).toBeVisible();
});

test("generated data, navigation and template contracts are valid", async ({ page, request }) => {
  const response = await request.get("index.json");
  expect(response.ok()).toBeTruthy();
  const entries = await response.json();
  const headings = entries.flatMap((entry) => entry.headings);
  expect(headings.length).toBeGreaterThan(0);
  expect(headings.every((heading) => heading.id && heading.title)).toBeTruthy();

  await page.goto("./");
  const actions = await page.locator("[data-palette]").getAttribute("data-palette-actions");
  const parsedActions = JSON.parse(actions);
  expect(parsedActions.map(({ href }) => href)).not.toContain(
    "/brand-theme-hugo-vanilla/brand-theme-hugo-vanilla/docs/",
  );
  expect(parsedActions.map(({ label }) => label)).not.toContain("_Notebooks");
  await expect(page.locator(".header__nav")).not.toContainText("Tags");

  await page.goto("docs/getting-started/");
  await expect(page.locator(".code .highlight").first()).toBeVisible();
});

test("landing and wide documentation rails align", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.setViewportSize({ width: 1600, height: 900 });

  await page.goto("./");
  const heroX = await page.locator(".hero").evaluate((node) =>
    node.getBoundingClientRect().x,
  );
  const contentX = await page.locator("main > .shell").nth(1).evaluate((node) =>
    node.getBoundingClientRect().x,
  );
  expect(Math.abs(heroX - contentX)).toBeLessThanOrEqual(1);

  await page.goto("docs/getting-started/");
  const brandX = await page.locator(".header__brand").evaluate((node) =>
    node.getBoundingClientRect().x,
  );
  const sidebarX = await page.locator(".sidebar").evaluate((node) =>
    node.getBoundingClientRect().x,
  );
  expect(Math.abs(brandX - sidebarX)).toBeLessThanOrEqual(1);
});

test("strong focus is visibly distinct", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/getting-started/");
  await page.getByLabel("Accessibility options").click();
  await page.getByRole("menuitemcheckbox", { name: "Strong focus" }).click();
  await page.locator(".searchbox input").focus();
  await expect(page.locator("html")).toHaveAttribute("data-focus", "strong");
  const style = await page.locator(".searchbox input").evaluate((node) => {
    const computed = getComputedStyle(node);
    return { width: computed.outlineWidth, offset: computed.outlineOffset };
  });
  expect(style).toEqual({ width: "3px", offset: "3px" });
});

test("German and French documentation are complete language sites", async ({ page }) => {
  for (const path of ["de/docs/features/", "fr/docs/features/"]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".sidebar")).toContainText(/Konfiguration|Configuration/);
    await expect(page.locator("[data-palette]")).not.toHaveAttribute(
      "data-palette-actions",
      /_Notebooks|brand-theme-hugo-vanilla\/brand-theme-hugo-vanilla/,
    );
  }
});

test("mobile navigation opens and closes", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));
  await page.goto("docs/getting-started/");
  const toggle = page.locator("[data-sidebar-toggle]");
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator(".sidebar[data-open='true']")).toBeVisible();
  await expect(page).toHaveScreenshot("mobile-navigation.png", {
    fullPage: false,
    animations: "disabled",
  });
});
