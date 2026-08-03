import { existsSync } from 'node:fs'

import { defineConfig, devices } from '@playwright/test'

const PORT = 4321
const BASIS = `http://127.0.0.1:${PORT}`

/**
 * In manchen Umgebungen (etwa vorbereiteten CI-Images) liegt bereits ein
 * Chromium bereit, dessen Build-Nummer nicht zu der von Playwright erwarteten
 * passt. Ist eines da, nutzen wir es; sonst greift Playwrights eigenes.
 */
const VORINSTALLIERT = '/opt/pw-browsers/chromium'
const chromium = existsSync(VORINSTALLIERT)
  ? {
      // `channel` muss weg: sonst sucht Playwright weiter seine eigene
      // Headless-Shell und ignoriert den vorgegebenen Pfad.
      channel: undefined,
      launchOptions: { executablePath: VORINSTALLIERT },
    }
  : {}

/**
 * Getestet wird gegen den fertigen statischen Export in ./out — also gegen
 * genau das, was später auf Cloudflare Pages liegt, nicht gegen den Dev-Server.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: BASIS,
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, ...chromium },
    },
    {
      name: 'mobil',
      use: { ...devices['Pixel 7'], ...chromium },
    },
  ],

  webServer: {
    command: `npx serve out -l ${PORT} --no-clipboard`,
    url: BASIS,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
