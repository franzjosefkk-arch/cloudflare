# Deployment auf Cloudflare Pages

Die Seite ist ein statischer Export. Cloudflare Pages liefert `out/` aus und führt alles unter
`functions/` als Worker aus — so bleibt die Seite ein reiner Export und bekommt trotzdem einen
Endpunkt für das Formular.

## 1. Projekt anlegen

Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** →
dieses Repository auswählen.

| Einstellung | Wert |
|---|---|
| Framework preset | `Next.js (Static HTML Export)` — oder `None` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leer)* |
| Node-Version | `22` (siehe unten) |

Die Node-Version wird über die Umgebungsvariable `NODE_VERSION = 22` gesetzt. Ältere Versionen
scheitern am Build.

`functions/` wird von Pages automatisch erkannt und muss nicht konfiguriert werden.

## 2. Formularversand einrichten

Ohne diesen Schritt antwortet `/api/anfrage` mit **503**. Das Formular fängt das ab und zeigt
dem Besucher Telefonnummer und E-Mail-Link — es geht also nie eine Anfrage still verloren.
Trotzdem sollte der Versand vor dem Livegang stehen.

### 2.1 Resend vorbereiten

1. Konto auf [resend.com](https://resend.com) anlegen.
2. Unter **Domains** die Domain `automobilebeckmann.de` hinzufügen und die angezeigten
   DNS-Einträge (SPF, DKIM) setzen. Liegt die Domain bei Cloudflare, geht das im selben
   Dashboard unter **DNS**.
3. Unter **API Keys** einen Schlüssel mit der Berechtigung *Sending access* erzeugen.

Ohne verifizierte Domain versendet Resend nur an die eigene Kontoadresse — zum Testen reicht
das, für den Betrieb nicht.

### 2.2 Variablen in Pages setzen

**Settings → Environment variables**, für *Production* **und** *Preview*:

| Name | Typ | Wert |
|---|---|---|
| `RESEND_API_KEY` | **Secret** | der Schlüssel aus 2.1 |
| `EMPFAENGER` | Text | `info@automobilebeckmann.de` |
| `ABSENDER` | Text | `Website Automobile Beckmann <website@automobilebeckmann.de>` |
| `NODE_VERSION` | Text | `22` |

`RESEND_API_KEY` muss als **Secret** angelegt werden, nicht als Text — sonst steht er im
Klartext im Dashboard und in den Build-Logs.

Die Absenderadresse muss auf der in 2.1 verifizierten Domain liegen. Antwortet der Betrieb auf
die Benachrichtigung, geht die Antwort dank `reply_to` direkt an den Kunden.

### 2.3 Prüfen

Nach dem Deployment:

```bash
curl -i https://<projekt>.pages.dev/api/anfrage \
  -H 'Content-Type: application/json' \
  -d '{"anliegen":"HU & AU","fahrzeug":"VW Golf, 2016","name":"Test","telefon":"0421123456"}'
```

- `200 {"ok":true}` — Versand steht, die Mail sollte im Postfach liegen.
- `503` — `RESEND_API_KEY` fehlt oder ist nicht auf dieser Umgebung gesetzt.
- `502` — Resend hat abgelehnt: meist eine nicht verifizierte Absenderdomain.
- `422` — Pflichtfelder fehlen (das ist der erwartete Schutz, kein Fehler).

Danach einmal das echte Formular auf `/kontakt/` absenden. Der Bot-Schutz verwirft alles, was
in unter drei Sekunden abgeschickt wird — beim Testen also nicht hetzen.

## 3. Domain aufschalten

**Custom domains** → `automobilebeckmann.de` und `www.automobilebeckmann.de` hinzufügen.
Cloudflare legt die DNS-Einträge und das Zertifikat selbst an.

Eine der beiden Varianten sollte per Weiterleitungsregel auf die andere zeigen, damit die
Seite nicht unter zwei Adressen indexiert wird. Die kanonischen URLs in den Metadaten zeigen
auf `https://automobilebeckmann.de` **ohne** `www` — festgelegt in `lib/betrieb.ts` unter
`betrieb.url`. Wird `www` zur Hauptadresse, muss dieser Wert mitgeändert werden.

## 4. Nach dem Livegang

- [ ] `AUSTAUSCHLISTE.md` abgearbeitet — besonders Impressum und Öffnungszeiten
- [ ] Testanfrage über das Formular kam an und die Antwort landete beim Absender
- [ ] Google Search Console eingerichtet, `sitemap.xml` eingereicht
- [ ] Google-Unternehmensprofil: Adresse, Telefonnummer und Öffnungszeiten stimmen mit
      `lib/betrieb.ts` überein — bei lokaler Suche zählt die Übereinstimmung
- [ ] Auftragsverarbeitungsverträge mit Cloudflare und Resend abgeschlossen und in der
      Datenschutzerklärung bestätigt

## Umzug auf einen anderen Anbieter

Der Export ist gewöhnliches HTML und läuft auf jedem Webserver. Nur `functions/api/anfrage.ts`
ist Cloudflare-spezifisch: Der Code ist eine einzelne `onRequestPost`-Funktion ohne
Cloudflare-Bindings und lässt sich mit wenigen Zeilen auf eine Netlify Function, eine Vercel
Function oder eine Route in einem eigenen Server übersetzen. Das Formular spricht nur
`POST /api/anfrage` an und erwartet `200` bei Erfolg.
