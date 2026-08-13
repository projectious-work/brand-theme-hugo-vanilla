const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ||
      'http://127.0.0.1:4174/brand-theme-hugo-vanilla/',
    browserName: 'chromium',
    colorScheme: 'light',
  },
});
