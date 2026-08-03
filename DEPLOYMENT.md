# Deployment auf Cloudflare

Die Seite ist ein statischer Export in `out/`. Der einzige dynamische Teil ist die
Terminanfrage. Deren Verarbeitung steht in `lib/anfrage.ts` als reine Funktion über `Request`
und `Env` — beide Deployment-Wege benutzen dieselbe Logik, sie unterscheiden sich nur in der
Hülle darum.

| | **Worker mit Assets** *(empfohlen)* | **Pages** |
|---|---|---|
| Hülle | `worker/index.ts` | `functions/api/anfrage.ts` |
| Konfiguration | [`wrangler.jsonc`](wrangler.jsonc) | keine |
| Befehl | `npm run deploy` | `npm run deploy:pages` |
| Token braucht | Workers Scripts · Edit | Pages · Edit |
| Adresse | `automobile-beckmann.<subdomain>.workers.dev` | `automobile-beckmann.pages.dev` |

Der Worker-Weg ist der von Cloudflare inzwischen empfohlene und passt zu den übrigen Seiten in
diesem Konto. Er beantwortet außerdem `GET /api/anfrage` korrekt mit 405; Pages gibt dort 404.
Funktional macht das für die Website keinen Unterschied.

**Konto-ID** ist in `wrangler.jsonc` bereits eingetragen.

---

## Der einfachste Weg: GitHub Actions

`.github/workflows/ci.yml` prüft und veröffentlicht bei jedem Push. Dafür sind lokal weder
Wrangler noch ein Token nötig — es genügt, zwei Werte einmal in GitHub zu hinterlegen:

Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | Wert |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token aus Schritt 1 (Berechtigung **Pages · Edit**) |
| `CLOUDFLARE_ACCOUNT_ID` | `36b159e1e59c2eb2a54b848c0bc75cf3` |

Danach läuft bei jedem Push: Typen, Lint, Build, 70 Tests — und erst wenn alles grün ist, geht
es an Cloudflare. Pushes auf den Standardbranch landen in der Produktion, jeder andere Branch
bekommt eine eigene Vorschauadresse. Die Adresse steht danach in der Zusammenfassung des
Workflow-Laufs.

Schlägt ein Test fehl, wird nicht veröffentlicht und der Playwright-Bericht hängt als Artefakt
am Lauf.

Das Pages-Projekt legt Wrangler beim ersten Lauf selbst an, wenn es noch nicht existiert.

---

## Von Hand: die beiden Wege

## 1. API-Token anlegen

Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token**.

Für den Worker-Weg die Vorlage **„Edit Cloudflare Workers"**:

| Bereich | Berechtigung |
|---|---|
| Account · Workers Scripts | Edit |
| Account · Account Settings | Read |
| Zone · Workers Routes | Edit *(erst nötig, wenn die eigene Domain aufgeschaltet wird)* |
| Zone · DNS | Edit *(dito)* |

Für den Pages-Weg genügen **Pages · Edit** und **Account Settings · Read**.

Token kopieren und als Umgebungsvariable setzen:

```bash
export CLOUDFLARE_API_TOKEN='...'
```

Der Token ist ein Geheimnis. Er gehört nicht ins Repository und nicht in eine Datei, die
committet wird. Ein Token ohne Ablaufdatum sollte widerrufen werden, sobald es nicht mehr
gebraucht wird.

## 2. Deployen

```bash
npm run deploy        # Worker mit statischen Assets
npm run deploy:pages  # oder: Cloudflare Pages
```

Wrangler nennt die genaue Adresse am Ende der Ausgabe.

Vorher lokal ansehen — dafür braucht es keinen Token:

```bash
npm run preview                    # Worker-Weg, http://localhost:8787
npx wrangler pages dev out         # Pages-Weg
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

Worker-Weg:

```bash
npx wrangler secret put RESEND_API_KEY
```

Pages-Weg: Dashboard → das Projekt → **Settings** → **Environment variables** →
`RESEND_API_KEY` als **Secret** anlegen, dazu `EMPFAENGER` und `ABSENDER` als Text.

Empfänger- und Absenderadresse stehen für den Worker-Weg als `vars` in `wrangler.jsonc` und
sind nicht geheim.
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
