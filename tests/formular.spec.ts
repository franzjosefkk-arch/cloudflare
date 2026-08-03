import { expect, test, type Page } from '@playwright/test'

/**
 * Next rendert einen eigenen `role="alert"` für Routenansagen. Meldungen des
 * Formulars werden deshalb immer innerhalb des Formulars gesucht.
 */
const meldung = (page: Page) => page.locator('form').getByRole('alert')

/** Das Formular vollständig und gültig ausfüllen. */
async function ausfuellen(page: Page) {
  await page.getByLabel('Worum geht es?').selectOption('HU & AU')
  await page.getByLabel('Ihr Fahrzeug').fill('VW Golf VII 1.6 TDI, 2016')
  await page.getByLabel('Name', { exact: false }).first().fill('Maren Schröder')
  await page.getByLabel('Telefon').fill('0421 1234567')
  await page.getByLabel('E-Mail').fill('maren@beispiel.de')
  await page.getByLabel(/Ich bin damit einverstanden/).check()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/kontakt/')
})

test('Ohne Eingaben nennt das Formular jeden fehlenden Punkt', async ({ page }) => {
  await page.getByRole('button', { name: /Termin anfragen/i }).click()

  const hinweis = meldung(page)
  await expect(hinweis).toBeVisible()
  await expect(hinweis).toContainText(/Bitte prüfen Sie noch/)

  // Vier Pflichtangaben plus die Einwilligung.
  await expect(hinweis.getByRole('listitem')).toHaveCount(5)
  await expect(hinweis).toContainText(/Ohne Telefonnummer können wir Sie nicht zurückrufen/)

  // Und die Felder selbst sind als fehlerhaft ausgezeichnet.
  await expect(page.getByLabel('Ihr Fahrzeug')).toHaveAttribute('aria-invalid', 'true')
})

test('Eine unvollständige Telefonnummer wird erkannt', async ({ page }) => {
  await ausfuellen(page)
  await page.getByLabel('Telefon').fill('12')
  await page.getByRole('button', { name: /Termin anfragen/i }).click()
  await expect(meldung(page)).toContainText(/Telefonnummer sieht unvollständig aus/)
})

test('Eine kaputte E-Mail-Adresse wird erkannt', async ({ page }) => {
  await ausfuellen(page)
  await page.getByLabel('E-Mail').fill('maren@@beispiel')
  await page.getByRole('button', { name: /Termin anfragen/i }).click()
  await expect(meldung(page)).toContainText(/E-Mail-Adresse sieht nicht richtig aus/)
})

test('Eine gültige Anfrage geht an /api/anfrage und wird bestätigt', async ({ page }) => {
  let gesendet: Record<string, string> | null = null

  await page.route('**/api/anfrage', async (route) => {
    gesendet = route.request().postDataJSON()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  })

  await ausfuellen(page)
  // Der Bot-Schutz verwirft alles, was in unter drei Sekunden fertig ist.
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: /Termin anfragen/i }).click()

  const bestaetigung = page.getByRole('heading', { name: /Anfrage ist bei uns/i }).locator('..')
  await expect(bestaetigung).toBeVisible()
  await expect(bestaetigung).toContainText(/innerhalb eines Werktags/i)
  await expect(bestaetigung).toContainText(/0421 87 50 40/)

  expect(gesendet).not.toBeNull()
  expect(gesendet!.anliegen).toBe('HU & AU')
  expect(gesendet!.fahrzeug).toBe('VW Golf VII 1.6 TDI, 2016')
  expect(gesendet!.telefon).toBe('0421 1234567')
})

test('Scheitert die Zustellung, bleiben Eingaben und Alternativen erhalten', async ({ page }) => {
  await page.route('**/api/anfrage', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }),
  )

  await ausfuellen(page)
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: /Termin anfragen/i }).click()

  const fehler = meldung(page)
  await expect(fehler).toContainText(/Absenden hat leider nicht geklappt/)

  // Nichts darf verloren gehen — sonst tippt niemand ein zweites Mal.
  await expect(page.getByLabel('Ihr Fahrzeug')).toHaveValue('VW Golf VII 1.6 TDI, 2016')
  await expect(fehler.getByRole('link', { name: /0421/ })).toBeVisible()
})
