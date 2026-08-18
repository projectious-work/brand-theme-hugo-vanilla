const { test, expect } = require("@playwright/test");

const contrast = (foreground, background) => {
  const luminance = (color) => {
    const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number);
    const linear = channels.map((channel) => {
      const value = channel / 255;
      return value <= 0.03928
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test("landing page matches the approved theme", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-site-hook", "ready");
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

  await page.goto("docs/features/diagrams/");
  await expect(page.locator('script[src*="mermaid@11.16.1/dist/mermaid.min.js"]'))
    .toHaveCount(1);
  await expect(page.locator(".mermaid svg")).toBeVisible();
  await expect(page.locator(".mermaid svg .node")).not.toHaveCount(0);
  const diagramBox = await page.locator(".mermaid svg").evaluate((svg) => {
    const box = svg.getBoundingClientRect();
    const panel = svg.parentElement.getBoundingClientRect();
    return {
      width: box.width,
      height: box.height,
      availableWidth: panel.width - 42,
      leftInset: box.left - panel.left,
      rightInset: panel.right - box.right,
      viewBox: svg.getAttribute("viewBox"),
    };
  });
  expect(diagramBox.width).toBeGreaterThan(100);
  expect(diagramBox.height).toBeGreaterThan(40);
  expect(Math.abs(diagramBox.width - diagramBox.availableWidth)).toBeLessThan(2);
  expect(Math.abs(diagramBox.leftInset - diagramBox.rightInset)).toBeLessThan(2);
  expect(diagramBox.viewBox).not.toBe("-8 -8 16 16");
  await page.evaluate(() => window.pwTheme.set("dark"));
  await expect(page.locator(".mermaid svg")).toBeVisible();

  await page.goto("docs/features/mathematics/");
  await expect(page.locator(".katex").first()).toBeVisible();

  await page.goto("docs/features/jupyter-notebooks/");
  await expect(page.locator(".notebook[data-notebook='theme-demo']")).toBeVisible();

  await page.goto("docs/guides/");
  await expect(page.locator(".terminal")).toContainText([
    "$ hugo --minify",
    "✓ Content validated",
    "✓ Search index generated",
    "⚠ Review two external links",
    "Build completed in 284 ms",
  ].join("\n"));

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

  await page.goto("docs/features/file-trees/");
  const treeMarkers = await page.locator(".filetree").first().evaluate((tree) => ({
    list: getComputedStyle(tree.querySelector("ul")).listStyleType,
    marker: getComputedStyle(tree.querySelector("li"), "::marker").content,
  }));
  expect(treeMarkers.list).toBe("none");
  expect(["none", '""']).toContain(treeMarkers.marker);

  await page.goto("docs/guides/");
  const lightCode = await page.locator(".terminal").evaluate((node) =>
    getComputedStyle(node).backgroundColor,
  );
  expect(lightCode).toBe("rgb(244, 245, 247)");
  await page.evaluate(() => window.pwTheme.set("dark"));
  const darkCode = await page.locator(".terminal").evaluate((node) =>
    getComputedStyle(node).backgroundColor,
  );
  expect(darkCode).not.toBe(lightCode);

  await page.goto("docs/features/code-blocks/");
  const block = page.locator(".code").filter({ has: page.locator(".k") }).first();
  await block.locator(".chroma code.language-python").evaluate((code) => {
    const fixture = document.createElement("span");
    fixture.dataset.syntaxFixture = "";
    fixture.innerHTML = ["n", "o", "c1", "k", "kt", "nf", "s", "m", "nd", "err"]
      .map((role) => `<span class="${role}">${role}</span>`).join("");
    code.append(fixture);
  });
  const selectedText = await block.locator("[data-syntax-fixture] .k").evaluate((keyword) => {
    const range = document.createRange();
    range.selectNodeContents(keyword);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return selection.toString();
  });
  expect(selectedText).toBe("k");
  const resolvedSyntax = async () => block.evaluate((node) => {
    const fixture = node.querySelector("[data-syntax-fixture]");
    const role = (name) => {
      const style = getComputedStyle(fixture.querySelector(`.${name}`));
      return { color: style.color, weight: style.fontWeight, style: style.fontStyle };
    };
    const panel = getComputedStyle(node);
    return {
      panel: { background: panel.backgroundColor, border: panel.borderColor },
      selection: (() => {
        const style = getComputedStyle(fixture.querySelector(".k"), "::selection");
        return { background: style.backgroundColor, color: style.color };
      })(),
      plain: role("n"), operator: role("o"), comment: role("c1"),
      keyword: role("k"), type: role("kt"), function: role("nf"),
      string: role("s"), number: role("m"), macro: role("nd"),
      invalid: role("err"),
    };
  });
  const faces = {
    plain: { weight: "400", style: "normal" },
    operator: { weight: "400", style: "normal" },
    comment: { weight: "400", style: "italic" },
    keyword: { weight: "700", style: "normal" },
    type: { weight: "600", style: "normal" },
    function: { weight: "500", style: "normal" },
    string: { weight: "400", style: "normal" },
    number: { weight: "400", style: "normal" },
    macro: { weight: "400", style: "italic" },
    invalid: { weight: "600", style: "normal" },
  };
  const expectSyntax = (actual, colors, panel, selection) => {
    expect(actual.panel).toEqual(panel);
    expect(actual.selection).toEqual(selection);
    expect(contrast(actual.selection.color, actual.selection.background))
      .toBeGreaterThanOrEqual(4.5);
    for (const [role, color] of Object.entries(colors)) {
      expect(actual[role]).toEqual({ color, ...faces[role] });
    }
  };

  await page.evaluate(() => window.pwTheme.set("light"));
  expectSyntax(await resolvedSyntax(), {
    plain: "rgb(15, 28, 46)", operator: "rgb(84, 105, 127)",
    comment: "rgb(94, 112, 130)", keyword: "rgb(194, 17, 127)",
    type: "rgb(8, 128, 78)", function: "rgb(22, 104, 216)",
    string: "rgb(201, 66, 8)", number: "rgb(148, 98, 10)",
    macro: "rgb(13, 125, 130)", invalid: "rgb(216, 20, 32)",
  }, { background: "rgb(244, 245, 247)", border: "rgb(205, 208, 213)" },
  { background: "rgb(218, 226, 236)", color: "rgb(20, 36, 56)" });

  const darkColors = {
    plain: "rgb(197, 218, 240)", operator: "rgb(151, 168, 184)",
    comment: "rgb(125, 144, 163)", keyword: "rgb(212, 145, 180)",
    type: "rgb(108, 192, 144)", function: "rgb(138, 172, 200)",
    string: "rgb(234, 117, 88)", number: "rgb(224, 169, 42)",
    macro: "rgb(116, 192, 201)", invalid: "rgb(229, 91, 91)",
  };
  const darkPanel = {
    background: "rgb(19, 30, 43)", border: "rgb(46, 75, 104)",
  };
  await page.evaluate(() => window.pwTheme.set("dark"));
  const darkSelection = {
    background: "rgb(32, 53, 77)", color: "rgb(197, 218, 240)",
  };
  expectSyntax(await resolvedSyntax(), darkColors, darkPanel, darkSelection);
  await page.evaluate(() => window.pwTheme.set("navy"));
  expectSyntax(await resolvedSyntax(), darkColors, darkPanel, darkSelection);

  const fontFaces = await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('italic 400 14px "IBM Plex Mono"'),
      document.fonts.load('normal 600 14px "IBM Plex Mono"'),
      document.fonts.load('normal 700 14px "IBM Plex Mono"'),
    ]);
    return {
      italic: document.fonts.check('italic 400 14px "IBM Plex Mono"'),
      semibold: document.fonts.check('normal 600 14px "IBM Plex Mono"'),
      bold: document.fonts.check('normal 700 14px "IBM Plex Mono"'),
    };
  });
  expect(fontFaces).toEqual({ italic: true, semibold: true, bold: true });
});

test("every documentation code panel follows all colour modes", async (
  { page }, testInfo,
) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/");
  const paths = await page
    .locator(".sidebar a[href*='/docs/']")
    .evaluateAll((links) => [...new Set(links.map((link) => link.href))]);
  expect(paths.length).toBeGreaterThan(10);

  const auditMode = async (mode, expectedToken) => {
    await page.evaluate((selected) => window.pwTheme.set(selected), mode);
    const result = await page.locator(".code").evaluateAll((panels, token) => {
      const probe = document.createElement("span");
      probe.style.backgroundColor = `var(${token})`;
      document.body.append(probe);
      const expected = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return panels.map((panel) => ({
        expected,
        panel: getComputedStyle(panel).backgroundColor,
        pre: getComputedStyle(panel.querySelector("pre")).backgroundColor,
      }));
    }, expectedToken);
    for (const block of result) {
      expect(block.panel).toBe(block.expected);
      expect(["rgba(0, 0, 0, 0)", block.panel]).toContain(block.pre);
    }
  };

  for (const path of paths) {
    await page.goto(path);
    if (await page.locator(".code").count() === 0) { continue; }
    await auditMode("light", "--code-panel-surface-light");
    await auditMode("navy", "--code-panel-surface");
    await auditMode("dark", "--code-panel-surface");
    await page.emulateMedia({ colorScheme: "dark" });
    await auditMode("system", "--code-panel-surface");
  }

  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => window.pwTheme.set("system"));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  for (const fixture of [
    ["docs/features/jupyter-notebooks/", ".notebook pre:not(.mermaid)",
      "--code-panel-surface"],
    ["docs/features/terminal-recordings/", ".cast", "--terminal-surface"],
  ]) {
    await page.goto(fixture[0]);
    await page.evaluate(() => window.pwTheme.set("system"));
    const colours = await page.locator(fixture[1]).first().evaluate((
      node, token,
    ) => {
      const probe = document.createElement("span");
      probe.style.backgroundColor = `var(${token})`;
      document.body.append(probe);
      const result = {
        actual: getComputedStyle(node).backgroundColor,
        expected: getComputedStyle(probe).backgroundColor,
      };
      probe.remove();
      return result;
    }, fixture[2]);
    expect(colours.actual).toBe(colours.expected);
  }
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
    await guidesGroup.locator("summary").click();
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

test("sidebar groups default closed and persist reader state", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/guides/template-authoring/");
  const groups = page.locator(".sidebar details[data-sidebar-group]");
  expect(await groups.count()).toBeGreaterThan(2);
  await expect(page.locator(
    ".sidebar details[data-sidebar-group][open]",
  )).toHaveCount(0);

  const toggle = page.locator("[data-sidebar-groups-toggle]");
  await expect(toggle).toHaveAttribute("aria-label", "Expand all");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-label", "Collapse all");
  expect(await groups.evaluateAll((items) => items.every((item) => item.open)))
    .toBeTruthy();

  const guides = groups.filter({ hasText: "Guides" });
  await guides.locator(":scope > summary").click();
  const before = await groups.evaluateAll((items) => items.map((item) => ({
    key: item.dataset.sidebarGroup,
    open: item.open,
  })));
  await page.goto("docs/getting-started/");
  const after = await page
    .locator(".sidebar details[data-sidebar-group]")
    .evaluateAll((items) => items.map((item) => ({
      key: item.dataset.sidebarGroup,
      open: item.open,
    })));
  expect(after).toEqual(before);

  const restoredToggle = page.locator("[data-sidebar-groups-toggle]");
  await restoredToggle.click();
  await expect(restoredToggle).toHaveAttribute("aria-label", "Collapse all");
  await restoredToggle.click();
  expect(await page.locator(".sidebar details[open]").count()).toBe(0);
  await page.reload();
  expect(await page.locator(".sidebar details[open]").count()).toBe(0);
});

test("Examples use the showcase layouts without a Shortcodes section", async (
  { page },
) => {
  await page.goto("docs/");
  const labels = await page.locator(
    ".sidebar > a, .sidebar > details > summary",
  ).allTextContents();
  const examples = labels.findIndex((label) => label.includes("Examples"));
  expect(examples).toBeGreaterThanOrEqual(0);
  expect(labels.some((label) => label.includes("Shortcodes"))).toBeFalsy();

  await page.goto("docs/examples/");
  const cards = page.locator(".docs__main > .cards .card");
  await expect(cards).toHaveCount(7);
  const paths = await cards.evaluateAll((links) => links.map((link) => (
    new URL(link.href).pathname
  )));
  expect(paths).toEqual([
    "/brand-theme-hugo-vanilla/docs/examples/admin/",
    "/brand-theme-hugo-vanilla/docs/examples/dashboard/",
    "/brand-theme-hugo-vanilla/docs/examples/settings/",
    "/brand-theme-hugo-vanilla/docs/examples/pricing/",
    "/brand-theme-hugo-vanilla/docs/examples/run-state/",
    "/brand-theme-hugo-vanilla/docs/examples/article/",
    "/brand-theme-hugo-vanilla/docs/examples/changelog/",
  ]);

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("main.example-page")).toBeVisible();
    await expect(page.locator(".example-stage")).toBeVisible();
    await expect(page.locator(".docs, .sidebar, .toc")).toHaveCount(0);
    await expect(page.locator(".example-page__bar a")).toHaveAttribute(
      "href", "/brand-theme-hugo-vanilla/docs/examples/",
    );
  }

  for (const name of ["admin", "dashboard", "run-state"]) {
    await page.goto(`docs/examples/${name}/`);
    await expect(page.locator(".example-app__sidebar")).toBeVisible();
    await expect(page.locator(".example-app__navgroup [aria-current='page']"))
      .toHaveCount(1);
    const shell = await page.locator(".example-app").evaluate((node) => ({
      width: node.getBoundingClientRect().width,
      viewport: document.documentElement.clientWidth,
    }));
    expect(Math.abs(shell.width - shell.viewport)).toBeLessThan(2);
  }

  await page.goto("docs/examples/pricing/");
  await expect(page.locator(".example-app__sidebar")).toHaveCount(0);
});

test("Steps accept cards as structured content", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/features/steps/");
  const choice = page.locator(".step", {
    hasText: "Choose a starting point",
  });
  await expect(choice.locator(".cards .card")).toHaveCount(2);
  await expect(choice.locator("pre")).toHaveCount(0);
});

test("Features renders image, recording and notebook examples", async (
  { page }, testInfo,
) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("docs/features/images/");
  await expect(page.locator(
    'figure img[src$="/img/sunrise-brand.svg"]',
  )).toBeVisible();
  await page.goto("docs/features/terminal-recordings/");
  await expect(page.locator(".cast[data-cast]")).toBeVisible();
  await expect(page.locator(".cast [data-cast-options]")).toHaveCount(1);
  await page.goto("docs/features/jupyter-notebooks/");
  await expect(page.locator(".notebook[data-notebook='theme-demo']"))
    .toBeVisible();
});

test("design-system component and token contracts are implemented", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("./");
  await page.evaluate(() => window.pwTheme.set("light"));

  const tokens = await page.locator("html").evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    const value = (name) => css.getPropertyValue(name).trim();
    return {
      success: [value("--color-success"), value("--color-success-bg"),
        value("--color-success-fg")],
      warning: [value("--color-warning"), value("--color-warning-bg"),
        value("--color-warning-fg")],
      danger: [value("--color-danger"), value("--color-danger-bg"),
        value("--color-danger-fg")],
      info: [value("--color-info"), value("--color-info-bg"),
        value("--color-info-fg")],
      spacing: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((step) => value(`--space-${step}`)),
      radii: ["sm", "md", "lg", "xl", "full"]
        .map((step) => value(`--radius-${step}`)),
      type: [value("--type-display-size"), value("--type-h1-size"),
        value("--type-h2-size"), value("--type-h3-size"),
        value("--type-body-size"), value("--type-caption-size"),
        value("--type-overline-size"), value("--type-code-size")],
      layout: [value("--container-max"), value("--grid-gutter"),
        value("--touch-target"), value("--measure")],
      motion: [value("--duration-micro"), value("--duration-standard"),
        value("--duration-expand"), value("--duration-page")],
    };
  });
  expect(tokens).toEqual({
    success: ["#17945f", "#d1ebe0", "#17734c"],
    warning: ["#ef8b0b", "#fff1e0", "#b3520c"],
    danger: ["#d92d20", "#fce8e8", "#b3261e"],
    info: ["#2563c9", "#dae2ec", "#2f5fa8"],
    spacing: ["4px", "8px", "12px", "16px", "24px", "32px", "48px",
      "64px", "96px"],
    radii: ["3px", "6px", "9px", "13px", "9999px"],
    type: ["calc(48px * 1)", "calc(36px * 1)", "calc(28px * 1)",
      "calc(24px * 1)", "calc(16px * 1)", "calc(13px * 1)",
      "calc(12px * 1)", "calc(14px * 1)"],
    layout: ["1100px", "16px", "44px", "65ch"],
    motion: ["100ms", "200ms", "300ms", "400ms"],
  });

  const components = await page.locator("main").evaluate((main) => {
    const style = (selector) => getComputedStyle(main.querySelector(selector));
    const hero = style(".hero--landing");
    const card = style(".card");
    const button = style(".btn--primary");
    const icon = style(".card .ico svg");
    return {
      hero: { background: hero.backgroundColor, radius: hero.borderRadius },
      heroTitle: style(".hero--landing h1").color,
      card: { padding: card.padding, radius: card.borderRadius },
      button: { minHeight: button.minHeight, radius: button.borderRadius,
        family: button.fontFamily },
      icon: { width: icon.width, stroke: icon.strokeWidth },
    };
  });
  expect(components).toEqual({
    hero: { background: "rgb(248, 249, 251)", radius: "13px" },
    heroTitle: "rgb(20, 36, 56)",
    card: { padding: "16px 24px", radius: "9px" },
    button: { minHeight: "44px", radius: "6px",
      family: '"Plus Jakarta Sans", system-ui, sans-serif' },
    icon: { width: "24px", stroke: "1.5px" },
  });
  await expect(page.locator(".header__mark--light")).toBeVisible();
  await expect(page.locator(".header__mark--dark")).toBeHidden();

  await page.evaluate(() => window.pwTheme.set("dark"));
  await expect(page.locator(".header__mark--light")).toBeHidden();
  await expect(page.locator(".header__mark--dark")).toBeVisible();
  await expect(page.locator(".hero--landing")).toHaveCSS(
    "background-color", "rgb(19, 30, 43)",
  );
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

  await page.evaluate(() => window.pwTheme.setA11y("data-contrast", "high"));
  const decoration = await page.locator("article.prose a").first().evaluate((node) =>
    getComputedStyle(node).textDecorationLine,
  );
  expect(decoration).not.toContain("underline");
});

test("configuration hierarchy and generated feature overview stay complete", async ({ page }, testInfo) => {
  await page.goto("docs/configuration/");
  await expect(page.locator(".card__title")).toHaveText([
    "Site-wide configuration", "Page configuration (front matter)",
  ]);

  await page.goto("docs/features/");
  await expect(page.locator(".card__title")).toHaveText([
    "Accessibility", "Buttons and badges", "Callouts", "Cards", "Code blocks",
    "Collapsible details", "Data-driven components", "Diagrams",
    "Editing and feedback", "File trees",
    "Header and navigation", "Icons", "Images", "Internationalization",
    "Jupyter notebooks", "Links", "Mathematics", "Search", "Steps", "Tabs",
    "Tags", "Tailwind and design tokens", "Terminal output",
    "Terminal recordings", "Terminology", "Tokens and public API",
    "Versioned documentation",
  ]);

  await page.goto("docs/features/tokens/");
  if (testInfo.project.name.startsWith("desktop")) {
    await expect(page.locator(".sidebar")).toBeVisible();
    await expect(page.locator('.toc a[href="#semantic-tokens"]')).toBeVisible();
  } else {
    await expect(page.locator(".sidebar")).toBeAttached();
    await expect(page.locator('.toc a[href="#semantic-tokens"]')).toBeAttached();
  }
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

test("release notes are ordered newest first in every language", async ({ page }) => {
  for (const path of ["changelog/", "de/changelog/", "fr/changelog/"]) {
    await page.goto(path);
    const releases = await page.locator(".example-changelog h2").allTextContents();
    expect(releases.slice(0, 4).map((title) => title.trim().slice(0, 6)))
      .toEqual(["v0.3.4", "v0.3.3", "v0.3.2", "v0.3.1"]);
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
