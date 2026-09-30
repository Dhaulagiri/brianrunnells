import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility tests run against the production build, served by `astro
 * preview`, in a real browser — which is the point: axe can only evaluate
 * colour contrast, target size and focus occlusion where there is layout.
 *
 * `channel: 'chrome'` uses the Chrome already on the machine rather than
 * Playwright's own download, which some networks block.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'list' : [['list']],
  use: {
    baseURL: 'http://localhost:4325',
    channel: 'chrome',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1440, height: 900 } } },
    // The rail collapses to the dock below 820px, so both layouts need
    // covering, along with a short viewport that squeezes the rail.
    { name: 'short', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1280, height: 620 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: 'pnpm preview --port 4325',
    url: 'http://localhost:4325',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
