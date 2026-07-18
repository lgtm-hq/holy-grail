import { defineConfig, devices } from "@playwright/test";

const PORT = 4322;
const BASE_PATH = "/holy-grail";
const HOST = "127.0.0.1";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "playwright-report/results.json" }],
  ],
  use: {
    // Trailing slash so relative goto paths (e.g. "guides/homebrew/") resolve
    // under the site's base path rather than replacing it.
    baseURL: `http://${HOST}:${PORT}${BASE_PATH}/`,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `bunx astro preview --host ${HOST} --port ${PORT}`,
    url: `http://${HOST}:${PORT}${BASE_PATH}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
