import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

/**
 * Der Hero blendet Text ein. Läuft der Kontrastscan mitten in dieser
 * Animation, misst er gegen halbtransparente Farben und meldet Verstöße, die
 * es im Ruhezustand nicht gibt. Also erst warten, bis nichts mehr läuft.
 */
async function animationenAbwarten(page: Page) {
  await page.waitForFunction(
    () => document.getAnimations().every((a) => a.playState !== 'running'),
    undefined,
    { timeout: 5_000 },
  )
}

const zuPruefen = [
  '/',
  '/leistungen/',
  '/leistungen/hu-au/',
  '/kontakt/',
  '/fahrzeuge/',
  '/ueber-uns/',
  '/impressum/',
  '/datenschutz/',
] as const

test.describe('Barrierefreiheit nach WCAG 2.2 AA', () => {
  for (const pfad of zuPruefen) {
    test(`${pfad} ist frei von axe-Verstößen`, async ({ page }) => {
      await page.goto(pfad)
      await animationenAbwarten(page)

      const ergebnis = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()

      // Bei einem Verstoß soll die Meldung sagen, welcher — nicht nur „1 != 0".
      const zusammenfassung = ergebnis.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.help} → ${v.nodes.map((n) => n.target).join(', ')}`,
      )
      expect(zusammenfassung, `axe-Verstöße auf ${pfad}`).toEqual([])
    })
  }
})

test('Das Formular ist mit axe sauber, auch im Fehlerzustand', async ({ page }) => {
  await page.goto('/kontakt/')
  await page.getByRole('button', { name: /Termin anfragen/i }).click()
  await expect(page.locator('form').getByRole('alert')).toBeVisible()

  const ergebnis = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(
    ergebnis.violations.map((v) => `${v.id}: ${v.help}`),
    'axe-Verstöße im Fehlerzustand des Formulars',
  ).toEqual([])
})

test('Der Sprunglink zum Inhalt erscheint beim ersten Tab', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const sprung = page.getByRole('link', { name: /Zum Inhalt springen/i })
  await expect(sprung).toBeFocused()
  await expect(sprung).toBeVisible()
})

test('Die Positionsliste im Hero ist per Tastatur erreichbar', async ({ page }) => {
  await page.goto('/')
  const legende = page.getByRole('navigation', { name: 'Positionen am Fahrzeug' })
  const position = legende.getByRole('link', { name: /Inspektion & Wartung/ })
  await position.focus()
  await expect(position).toBeFocused()
  await position.press('Enter')
  await expect(page).toHaveURL(/\/leistungen\/inspektion-und-wartung\//)
})
