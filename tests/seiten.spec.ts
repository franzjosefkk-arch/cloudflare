import { expect, test } from '@playwright/test'

/** Jede Seite, die im Export liegen muss — mit ihrer erwarteten H1. */
const seiten = [
  { pfad: '/', h1: /Alles an Ihrem Auto/i },
  { pfad: '/leistungen/', h1: /Leistungen/i },
  { pfad: '/leistungen/inspektion-und-wartung/', h1: /Inspektion in Bremen/i },
  { pfad: '/leistungen/hu-au/', h1: /HU und AU in Bremen/i },
  { pfad: '/leistungen/bremsen-und-fahrwerk/', h1: /Bremsen, Stoßdämpfer/i },
  { pfad: '/leistungen/klimaservice/', h1: /Klimaservice in Bremen/i },
  { pfad: '/leistungen/diagnose-und-elektronik/', h1: /Fahrzeugdiagnose/i },
  { pfad: '/leistungen/unfall-und-lackierung/', h1: /Unfallinstandsetzung/i },
  { pfad: '/kontakt/', h1: /Rufen Sie an/i },
  { pfad: '/fahrzeuge/', h1: /Gebrauchtwagen/i },
  { pfad: '/ueber-uns/', h1: /Familienbetrieb/i },
  { pfad: '/impressum/', h1: /Impressum/i },
  { pfad: '/datenschutz/', h1: /Datenschutzerklärung/i },
] as const

test.describe('Seiten laden und sind auffindbar', () => {
  for (const s of seiten) {
    test(`${s.pfad} lädt mit genau einer H1`, async ({ page }) => {
      const antwort = await page.goto(s.pfad)
      expect(antwort?.status(), `HTTP-Status für ${s.pfad}`).toBeLessThan(400)

      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      await expect(h1).toContainText(s.h1)

      // Titel und Beschreibung sind für die lokale Suche das Wichtigste.
      await expect(page).toHaveTitle(/.{20,}/)
      const beschreibung = page.locator('meta[name="description"]')
      await expect(beschreibung).toHaveAttribute('content', /.{80,}/)

      // Sprache muss stimmen, sonst liest der Screenreader Deutsch englisch vor.
      await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    })
  }
})

test('Telefonnummer ist auf jeder Seite ohne Scrollen erreichbar', async ({ page }) => {
  for (const s of seiten) {
    await page.goto(s.pfad)
    // Auf dem Desktop trägt die Kopfzeile die Nummer, auf dem Telefon die
    // feste Leiste am unteren Rand. Beide sind mit data-anruf="sofort"
    // ausgezeichnet: genau eine davon muss ohne Scrollen erreichbar sein.
    const anruf = page.locator('[data-anruf="sofort"]:visible')
    await expect(anruf, `Anrufweg auf ${s.pfad}`).toHaveCount(1)
    await expect(anruf, `Anrufweg im ersten Blickfeld von ${s.pfad}`).toBeInViewport()
    await expect(anruf).toHaveAttribute('href', 'tel:+49421875040')
  }
})

test('Keine Seite scrollt seitwärts oder lässt Inhalt überlaufen', async ({ page }) => {
  for (const s of seiten) {
    await page.goto(s.pfad)
    const ueberlauf = await page.evaluate(() => {
      const d = document.documentElement
      const zuBreit: string[] = []
      // Fest positionierte Elemente hängen am Viewport, nicht am Dokument. Sie
      // spannen über die volle Fensterbreite und lägen gegenüber clientWidth
      // (das die Scrollleiste abzieht) immer scheinbar zu weit rechts — sie und
      // ihr ganzer Inhalt bleiben deshalb außen vor.
      const fest = Array.from(document.querySelectorAll('body *')).filter(
        (el) => getComputedStyle(el).position === 'fixed',
      )

      for (const el of Array.from(document.querySelectorAll('body *'))) {
        if (fest.some((f) => f === el || f.contains(el))) continue
        const r = el.getBoundingClientRect()
        // 1 px Toleranz für Rundungen beim Skalieren.
        if (r.width > 0 && (r.right > d.clientWidth + 1 || r.left < -1)) {
          zuBreit.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`)
        }
      }
      return { seitwaerts: d.scrollWidth > d.clientWidth + 1, zuBreit: zuBreit.slice(0, 5) }
    })
    expect(ueberlauf.zuBreit, `Elemente über dem Rand auf ${s.pfad}`).toEqual([])
    expect(ueberlauf.seitwaerts, `waagerechte Scrollleiste auf ${s.pfad}`).toBe(false)
  }
})

test('404-Seite antwortet und bietet einen Weg zurück', async ({ page }) => {
  await page.goto('/gibt-es-nicht/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Position/i)
  await expect(page.getByRole('link', { name: 'Zur Startseite', exact: true })).toBeVisible()
})

test('Sitemap und robots.txt liegen im Export', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  expect(xml).toContain('/leistungen/hu-au/')

  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Sitemap:')
})

test('Strukturierte Daten für die lokale Suche sind vorhanden', async ({ page }) => {
  await page.goto('/')
  const bloecke = await page.locator('script[type="application/ld+json"]').allTextContents()
  const typen = bloecke.map((b) => JSON.parse(b)['@type'])

  expect(typen).toContain('AutoRepair')
  expect(typen).toContain('FAQPage')

  const betrieb = bloecke.map((b) => JSON.parse(b)).find((d) => d['@type'] === 'AutoRepair')
  expect(betrieb.address.streetAddress).toBe('Arsterdamm 85')
  expect(betrieb.telephone).toBe('+49421875040')
  expect(betrieb.openingHoursSpecification.length).toBeGreaterThan(0)
})

test('Der Richtungsvertrag hat den Produktionsbuild überlebt', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('THESIS:')
  expect(html).toContain('16ece3cc')
})
