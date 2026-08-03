# Deployment auf Cloudflare

Die Seite läuft als **Worker mit statischen Assets** — so wie die übrigen Seiten in diesem
Konto. Cloudflare liefert den Export aus `out/` direkt aus; der Worker
(`worker/index.ts`) läuft nur für die eine Route, die eine statische Seite nicht selbst
bedienen kann: `POST /api/anfrage`. Alles andere geht an den Assets-Dienst, ohne dass der
Worker überhaupt startet (`run_worker_first`).

Konfiguration steht in [`wrangler.jsonc`](wrangler.jsonc). Konto-ID ist bereits eingetragen.

## 1. API-Token anlegen

Das ist das Einzige, was noch fehlt.

Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token** →
Vorlage **„Edit Cloudflare Workers"**.

| Bereich | Berechtigung |
|---|---|
| Account · Workers Scripts | Edit |
| Account · Account Settings | Read |
| Zone · Workers Routes | Edit *(erst nötig, wenn die eigene Domain aufgeschaltet wird)* |
| Zone · DNS | Edit *(dito)* |

Token kopieren und als Umgebungsvariable setzen:

```bash
export CLOUDFLARE_API_TOKEN='...'
```

Der Token ist ein Geheimnis. Er gehört nicht ins Repository und nicht in eine Datei, die
committet wird.

## 2. Deployen

```bash
npm run deploy      # baut und veröffentlicht in einem Schritt
```

Danach liegt die Seite unter `https://automobile-beckmann.<subdomain>.workers.dev`.
Wrangler nennt die genaue Adresse am Ende der Ausgabe.

Vorher lokal ansehen — dafür braucht es keinen Token:

```bash
npm run preview     # baut und startet wrangler dev auf http://localhost:8787
```

## 3. Formularversand einrichten

Ohne diesen Schritt antwortet `/api/anfrage` mit **503**. Das Formular fängt das ab und zeigt
dem Besucher Telefonnummer und E-Mail-Link — es geht also nie eine Anfrage still verloren.
Trotzdem sollte der Versand vor dem Livegang stehen.

### 3.1 Resend vorbereiten

1. Konto auf [resend.com](https://resend.com) anlegen.
2. Unter **Domains** die Domain `automobilebeckmann.de` hinzufügen und die angezeigten
   DNS-Einträge (SPF, DKIM) setzen. Liegt die Domain bei Cloudflare, geht das im selben
   Dashboard unter **DNS**.
3. Unter **API Keys** einen Schlüssel mit der Berechtigung *Sending access* erzeugen.

Ohne verifizierte Domain versendet Resend nur an die eigene Kontoadresse — zum Testen reicht
das, für den Betrieb nicht.

### 3.2 Schlüssel hinterlegen

```bash
npx wrangler secret put RESEND_API_KEY
```

Empfänger- und Absenderadresse stehen als `vars` in `wrangler.jsonc` und sind nicht geheim.
Die Absenderadresse muss auf der in 3.1 verifizierten Domain liegen. Antwortet der Betrieb auf
die Benachrichtigung, geht die Antwort dank `reply_to` direkt an den Kunden.

### 3.3 Prüfen

```bash
curl -i https://<adresse>/api/anfrage \
  -H 'Content-Type: application/json' \
  -d '{"anliegen":"HU & AU","fahrzeug":"VW Golf, 2016","name":"Test","telefon":"0421123456"}'
```

| Antwort | Bedeutung |
|---|---|
| `200 {"ok":true}` | Versand steht, die Mail sollte im Postfach liegen |
| `503` | `RESEND_API_KEY` ist nicht gesetzt |
| `502` | Resend hat abgelehnt — meist eine nicht verifizierte Absenderdomain |
| `422` | Pflichtfelder fehlen — das ist der erwartete Schutz, kein Fehler |
| `405` | die Route wurde nicht per POST aufgerufen |

Danach einmal das echte Formular auf `/kontakt/` absenden. Der Bot-Schutz verwirft alles, was
in unter drei Sekunden abgeschickt wird — beim Testen also nicht hetzen.

## 4. Domain aufschalten

Erst tun, wenn [`AUSTAUSCHLISTE.md`](AUSTAUSCHLISTE.md) abgearbeitet ist. Solange die
Öffnungszeiten unbestätigt sind und im Impressum Lücken markiert stehen, sollte die Seite
nicht unter der echten Adresse laufen.

In `wrangler.jsonc` ergänzen:

```jsonc
"routes": [
  { "pattern": "automobilebeckmann.de", "custom_domain": true },
  { "pattern": "www.automobilebeckmann.de", "custom_domain": true }
]
```

Cloudflare legt DNS-Eintrag und Zertifikat selbst an. Eine der beiden Varianten sollte per
Weiterleitungsregel auf die andere zeigen, damit die Seite nicht unter zwei Adressen indexiert
wird.

Die kanonischen URLs zeigen auf `https://automobilebeckmann.de` **ohne** `www` — festgelegt in
`lib/betrieb.ts` unter `betrieb.url`. Wird `www` zur Hauptadresse, muss dieser Wert
mitgeändert werden.

## 5. Nach dem Livegang

- [ ] [`AUSTAUSCHLISTE.md`](AUSTAUSCHLISTE.md) abgearbeitet — besonders Impressum und
      Öffnungszeiten
- [ ] Testanfrage über das Formular kam an und die Antwort landete beim Absender
- [ ] Google Search Console eingerichtet, `sitemap.xml` eingereicht
- [ ] Google-Unternehmensprofil: Adresse, Telefonnummer und Öffnungszeiten stimmen mit
      `lib/betrieb.ts` überein — bei lokaler Suche zählt die Übereinstimmung
- [ ] Auftragsverarbeitungsverträge mit Cloudflare und Resend abgeschlossen und in der
      Datenschutzerklärung bestätigt

## Umzug auf einen anderen Anbieter

Der Export in `out/` ist gewöhnliches HTML und läuft auf jedem Webserver. Der einzige
dynamische Teil ist `lib/anfrage.ts` — eine reine Funktion über `Request` und `Env` ohne
Bindung an eine Laufzeit. `worker/index.ts` ist nur die Cloudflare-Hülle darum; für Netlify,
Vercel oder einen eigenen Server genügt eine ebenso kleine Hülle. Das Formular spricht nur
`POST /api/anfrage` an und erwartet `200` bei Erfolg.
