# Automobile Beckmann — Website

Website für die Kfz-Meisterwerkstatt Automobile Beckmann GbR, Arsterdamm 85, Bremen-Arsten.

Ziel der Seite ist nicht Reichweite, sondern **qualifizierte Terminanfragen**: über das
Formular und über den Anruf, der in diesem Gewerbe mindestens genauso gut konvertiert.

| | |
|---|---|
| **Stack** | Next.js 16 (App Router, `output: 'export'`) · TypeScript strict · Tailwind CSS 4 · Radix UI |
| **Deployment** | Cloudflare Pages — siehe [DEPLOYMENT.md](DEPLOYMENT.md) |
| **Sprache** | Deutsch, Sie-Form |
| **Tests** | Playwright, 68 Tests auf Desktop und Telefon, inkl. axe gegen WCAG 2.2 AA |

## Loslegen

```bash
npm install
npm run dev          # Entwicklungsserver auf http://localhost:3000
```

```bash
npm run build        # statischer Export nach ./out
npm run start        # den Export lokal ausliefern (Port 3000)
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm test             # Playwright gegen ./out — setzt einen Build voraus
```

## Aufbau

```
app/                     Seiten (App Router)
  page.tsx               Startseite
  leistungen/            Übersicht und sechs Detailseiten über [slug]
  kontakt/               Formular, Öffnungszeiten, Anfahrt
  fahrzeuge/             Gebrauchtwagen, verlinkt auf die Fahrzeugportale
  ueber-uns/             Chronik und Zusagen
  impressum/             § 5 DDG
  datenschutz/           DSGVO
  sitemap.ts robots.ts   werden beim Bauen statisch erzeugt

components/
  ui/                    Grundbausteine nach shadcn/ui-Konvention (cva + cn)
  site/                  Bausteine dieser Seite

functions/api/anfrage.ts Cloudflare Pages Function: nimmt die Anfrage entgegen,
                         schickt sie per Resend an den Betrieb

lib/betrieb.ts           Einzige Quelle der Wahrheit für alle Betriebsdaten
lib/seo.ts               Metadaten und strukturierte Daten (schema.org)

tests/                   Playwright: Seiten, Formular, Barrierefreiheit
```

### `lib/betrieb.ts` ist die einzige Quelle

Jede Telefonnummer, jede Öffnungszeit, jede Adresse und jede Leistung auf der Seite kommt aus
dieser Datei — auch die strukturierten Daten für Google. **Änderungen am Betrieb werden dort
gemacht und nirgends sonst.** Eine neue Leistung im Array `leistungen` erzeugt automatisch
eine Detailseite, einen Eintrag in der Navigation der Fußzeile, eine Position in der
Explosionszeichnung und einen Eintrag in der Sitemap.

## Vor dem Livegang

Die Betriebsdaten sind recherchiert, nicht vom Betrieb bestätigt — `automobilebeckmann.de` war
aus der Bauumgebung nicht erreichbar. **[AUSTAUSCHLISTE.md](AUSTAUSCHLISTE.md) listet alles
auf, was geprüft oder ergänzt werden muss.** Das Impressum und die Datenschutzerklärung
enthalten orange markierte Lücken, die auf der Seite sichtbar sind, bis sie gefüllt werden.

## Weiterführend

- [PRODUCT.md](PRODUCT.md) — Produktwahrheit, Zielgruppe, Konversionsziele, Quellenlage
- [DESIGN.md](DESIGN.md) — die gebaute visuelle Welt: Farbe, Schrift, Form, Bewegung
- [DEPLOYMENT.md](DEPLOYMENT.md) — Cloudflare Pages einrichten, Formularversand, Domain
- [AUSTAUSCHLISTE.md](AUSTAUSCHLISTE.md) — was noch fehlt
