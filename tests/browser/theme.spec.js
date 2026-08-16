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
    "$ hugo --minify",
    "✓ Content validated",
    "✓ Search index generated",
    "⚠ Review two external links",
    "Build completed in 284 ms",
  ].join("\n"));

  await expect(page.locator(".mermaid svg")).toBeVisible();
  await page.evaluate(() => window.pwTheme.set("dark"));
  await expect(page.locator(".mermaid svg")).toBeVisible();
});

test("prose markers and adaptive technical panels follow colour mode", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/maintenance/");
  await page.evaluate(() => window.pwTheme.set("light"));

  const listStyles = await page.locator("article.prose").evaluate((article) => {
    const ul = article.querySelector("ul");
    const ol = article.querySelector("ol");
    return {
      ul: getComputedStyle(ul).listStyleType,
      ol: getComputedStyle(ol).listStyleType,
    };
  });
  expect(listStyles).toEqual({ ul: "disc", ol: "decimal" });

  await page.goto("docs/guides/");
  const lightCode = await page.locator(".terminal").evaluate((node) =>
    getComputedStyle(node).backgroundColor,
  );
  expect(lightCode).toBe("rgb(244, 245, 247)");
  await expect(page.locator(".mermaid")).toHaveCSS("background-color", "rgb(255, 255, 255)");

  await page.evaluate(() => window.pwTheme.set("dark"));
  const darkCode = await page.locator(".terminal").evaluate((node) =>
    getComputedStyle(node).backgroundColor,
  );
  expect(darkCode).not.toBe(lightCode);

  await page.goto("docs/features/code-blocks/");
  await page.evaluate(() => window.pwTheme.set("light"));
  const syntax = await page.locator(".code").filter({ has: page.locator(".k") }).evaluate((block) => {
    const style = (selector) => getComputedStyle(block.querySelector(selector));
    return {
      plain: style("code").color,
      keyword: style(".k").color,
      keywordWeight: style(".k").fontWeight,
      functionColor: style(".nf").color,
      functionWeight: style(".nf").fontWeight,
      commentStyle: style(".c1").fontStyle,
    };
  });
  expect(syntax.keyword).not.toBe(syntax.plain);
  expect(syntax.functionColor).not.toBe(syntax.plain);
  expect(syntax.keywordWeight).toBe("500");
  expect(syntax.functionWeight).toBe("500");
  expect(syntax.commentStyle).toBe("italic");
});

test("generated data, navigation and template contracts are valid", async ({ page, request }, testInfo) => {
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

  await page.goto("docs/guides/template-authoring/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  if (testInfo.project.name.startsWith("desktop")) {
    const guidesGroup = page.locator(".sidebar details").filter({ hasText: "Guides" });
    await expect(guidesGroup.locator("summary")).toHaveText("Guides");
    await expect(guidesGroup.getByRole("link", { name: "Content authoring guide" })).toBeVisible();
    await expect(guidesGroup.getByRole("link", { name: "Template authoring guide" })).toBeVisible();
  }

  await page.goto("docs/guides/");
  await expect(
    page.locator("code.language-md").filter({ hasText: '```python {filename="report.py"' }),
  ).toBeVisible();
  await expect(
    page.locator("code.language-md").filter({ hasText: '```toml {filename="hugo.toml"' }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Code blocks feature guide" })).toBeVisible();

  await page.goto("docs/features/code-blocks/");
  await expect(page.getByRole("heading", { name: "Per-block options" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "anchorlinenos=true" })).toBeVisible();

  await page.goto("docs/features/tokens/");
  await expect(page.getByRole("heading", { name: "Semantic tokens" })).toBeVisible();
  await expect(page.locator("[style*='background:var(--color-bg)']").first()).toBeVisible();

  await page.goto("docs/developer-guide/");
  await expect(page.getByRole("img", { name: "Rocket from Tabler Icons" })).toBeVisible();
});

test("sidebar, table of contents and all three colour modes keep their contracts", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/guides/template-authoring/");

  const sidebarCurrent = page.locator('.sidebar a[aria-current="page"]');
  await expect(sidebarCurrent).toHaveCount(1);
  const currentHref = await sidebarCurrent.getAttribute("href");

  const tocLinks = page.locator('.toc a[href^="#"]');
  expect(await tocLinks.count()).toBeGreaterThan(2);
  await tocLinks.nth(1).click();
  await expect(tocLinks.nth(1)).toHaveAttribute("aria-current", "true");
  await expect(page.locator('.sidebar a[aria-current="page"]')).toHaveAttribute("href", currentHref);
  await expect(page.locator('.sidebar a[aria-current="true"]')).toHaveCount(0);
  await expect(page.locator('[aria-current="false"]')).toHaveCount(0);

  const resolved = async () => page.locator("html").evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    return {
      theme: document.documentElement.dataset.theme || "system",
      surface: document.documentElement.dataset.surface || "deep",
      page: css.getPropertyValue("--color-bg").trim(),
      raised: css.getPropertyValue("--color-surface").trim(),
      subtle: css.getPropertyValue("--surface-2").trim(),
      border: css.getPropertyValue("--color-border").trim(),
      strong: css.getPropertyValue("--border-strong").trim(),
      text: css.getPropertyValue("--color-text-primary").trim(),
    };
  });

  await page.evaluate(() => window.pwTheme.set("light"));
  expect(await resolved()).toEqual({
    theme: "light", surface: "navy", page: "#f8f9fb", raised: "#ffffff",
    subtle: "#f0f3f8", border: "#cdd0d5", strong: "#bec2c8", text: "#142438",
  });

  await page.evaluate(() => window.pwTheme.set("dark"));
  expect(await resolved()).toEqual({
    theme: "dark", surface: "deep", page: "#0e1720", raised: "#131e2b",
    subtle: "#1a2b3e", border: "#263f5a", strong: "#3a5c7e", text: "#c5daf0",
  });

  await page.evaluate(() => window.pwTheme.set("navy"));
  expect(await resolved()).toEqual({
    theme: "dark", surface: "navy", page: "#132440", raised: "#1a2b3e",
    subtle: "#20354d", border: "#2e4b68", strong: "#4d7098", text: "#c5daf0",
  });
});

test("landing and wide documentation rails align", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.setViewportSize({ width: 1600, height: 900 });

  await page.goto("./");
  const heroX = await page.locator(".hero > :first-child").evaluate((node) =>
    node.getBoundingClientRect().x,
  );
  const contentX = await page.locator("main > .shell .prose > :first-child").evaluate((node) =>
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

test("documentation section guides expose heading navigation", async ({ page }, testInfo) => {
  await page.goto("docs/guides/");
  if (testInfo.project.name.startsWith("desktop")) {
    await expect(page.locator(".toc")).toBeVisible();
    await expect(page.locator('.toc a[href="#create-and-order-pages"]')).toBeVisible();
  } else {
    await expect(page.locator(".toc-mobile")).toBeVisible();
    await expect(page.locator('.toc-mobile a[href="#create-and-order-pages"]')).toBeAttached();
  }
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
