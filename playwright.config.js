const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/browser",
  outputDir: ".deploy/playwright-results",
  reporter: [["list"], ["html", {
    outputFolder: ".deploy/playwright-report",
    open: "never",
  }]],
  forbidOnly: true,
  retries: 0,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:1312/brand-theme-hugo-vanilla/",
    colorScheme: "light",
    locale: "en-US",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "./scripts/serve.sh",
    url: "http://127.0.0.1:1312/brand-theme-hugo-vanilla/",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
