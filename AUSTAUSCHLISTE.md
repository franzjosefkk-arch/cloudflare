# Austauschliste — was vor dem Livegang geklärt werden muss

Die Seite ist vollständig gebaut und lauffähig. Alle Inhalte stammen jedoch aus
Websuch-Recherche, **nicht vom Betrieb bestätigt**: `automobilebeckmann.de` und sämtliche
Branchenportale waren aus der Bauumgebung nicht abrufbar (HTTP 403 durch die Netzwerkrichtlinie
der Umgebung).

Nichts auf dieser Seite ist erfunden. Wo eine Angabe fehlte, steht ein sichtbar markierter
Platzhalter — keine plausibel klingende Erfindung.

## Rechtlich — bevor die Seite öffentlich wird

Diese Punkte sind im Impressum und in der Datenschutzerklärung **orange markiert und für jeden
Besucher sichtbar**, bis sie ersetzt werden.

| Was | Wo | Anmerkung |
|---|---|---|
| **USt-IdNr.** nach § 27a UStG | `app/impressum/page.tsx` | unbekannt |
| **Zuständige Handwerkskammer** | `app/impressum/page.tsx` | als Handwerkskammer Bremen, Ansgaritorstraße 24, angenommen — Zuständigkeit und Anschrift bestätigen |
| **Verbraucherstreitbeilegung** | `app/impressum/page.tsx` | derzeit „weder bereit noch verpflichtet" — bestätigen oder anpassen |
| **Datenschutzbeauftragter** | `app/datenschutz/page.tsx` | derzeit „nicht bestellt" — ab 20 Personen mit Datenverarbeitung prüfen |
| **Auftragsverarbeitungsvertrag Cloudflare** | `app/datenschutz/page.tsx` | abschließen, dann Hinweis entfernen |
| **Auftragsverarbeitungsvertrag Resend** | `app/datenschutz/page.tsx` | abschließen, dann Hinweis entfernen |

Beide Texte sind sorgfältig erstellte Vorlagen und ersetzen keine Rechtsberatung.

## Betriebsdaten — alle in `lib/betrieb.ts`

| Feld | Eingetragen | Zu tun |
|---|---|---|
| **Öffnungszeiten Werkstatt** | Mo–Fr 07:00–17:00, Sa 09:00–12:00 | **Die Quellen widersprechen sich** (bis 17 oder bis 18 Uhr, Samstag offen oder geschlossen). Übernommen ist die Angabe der Kontaktseite. Unbedingt bestätigen — falsche Öffnungszeiten kosten unmittelbar Anfragen. |
| **Öffnungszeiten Verkauf** | Mo–Do 07:00–17:00, Fr 07:00–15:00, Sa geschlossen | bestätigen |
| **Bewertung** | 4,5 von 5 aus 142 | Stand der Recherche. Zahl aktualisieren — sie steht im Hero, in der Vertrauenssektion und in den strukturierten Daten. |
| **Koordinaten** | 53.0345 / 8.8163 | grob für Arsterdamm 85 gesetzt. Mit Google Maps abgleichen — sie gehen in die strukturierten Daten für die lokale Suche. |
| **Telefax** | 0421 87 62 24 | bestätigen, oder streichen falls nicht mehr in Betrieb |
| **Fahrzeugportal** | AutoScout24-Händlerprofil | Link prüfen; falls auch mobile.de genutzt wird, `betrieb.portale` ergänzen und auf `/fahrzeuge/` verlinken |

## Inhalte, die noch fehlen

### Kundenstimmen — der größte einzelne Hebel

`components/site/bewertungen.tsx`, Array `kundenstimmen` (derzeit leer).

Der Bewertungsschnitt ist belegt und steht auf der Seite. Einzelne Rezensionstexte lagen im
Wortlaut nicht vor — dort stehen deshalb zwei ausgewiesene Platzhalterkarten. **Es steht kein
erfundener Kunde auf dieser Seite.**

Zwei bis vier echte Google-Rezensionen eintragen, je mit `text`, `name` und `anlass`. Konkret
schlägt allgemein: „Bremsen und HU an einem Termin, Preis wie besprochen" wirkt stärker als
„super Service". Sobald mindestens eine Stimme drin steht, verschwinden die Platzhalter von
selbst.

### Team

`app/ueber-uns/page.tsx` — markierter Platzhalterblock.

Foto, Vorname, Funktion und Zugehörigkeit der Menschen, die an den Fahrzeugen arbeiten. Für
einen Betrieb, der von Vertrauen lebt, ist das die stärkste Stelle der ganzen Seite — und die
einzige, die kein Wettbewerber kopieren kann.

### Logo

`components/site/wortmarke.tsx` ist eine gesetzte Wortmarke im Katalogstil, kein Notbehelf:
Sie funktioniert dauerhaft. Liegt eine Logodatei vor, wird die Komponente durch ein `<Image>`
ersetzt; die Maße (32 px Höhe in der Kopfzeile) bleiben gleich.

### Fotos

Die Seite kommt ohne Fotos aus — die Explosionszeichnung trägt das Bild. Das ist eine
Entscheidung, keine Lücke: Symbolbilder aus einer Bilddatenbank hätten den Betrieb
austauschbar aussehen lassen.

Echte Fotos von Halle, Hebebühne, Hof und Team würden trotzdem gewinnen, besonders auf
`/ueber-uns/`. Sinnvolle Bildmaße: 1600 × 1067 (3:2) für Querformate, als WebP unter 200 KB.

### Chronik

`app/ueber-uns/page.tsx`, Array `chronik`. Der mittlere Eintrag steht auf „Später", weil das
Jahr von Stefan Beckmanns Eintritt in den Betrieb nicht belegt ist. Jahreszahl ergänzen, wenn
bekannt.

## Fachliche Aussagen, die geprüft gehören

Diese Sätze stehen als Zusage auf der Seite und sind aus der Recherche abgeleitet. Stimmt einer
nicht, muss er raus — er wird zum Versprechen, an dem der Betrieb gemessen wird.

- „HU-Abnahme durch die DEKRA im Haus" — steht prominent im Hero
- „Werkstattersatzwagen kostenlos"
- „Preis vor der Reparatur, Rückruf wenn etwas dazukommt"
- „Elektronisches Serviceheft für Mercedes, VW, Audi, Škoda, Seat, Honda u. a."
- „Transporterreparatur bis 5 Tonnen"
- „Gebrauchtwagen mit Garantie" sowie Finanzierung, Leasing, Versicherung, Zulassungsservice
- „Antwort innerhalb eines Werktags" — das ist das Versprechen des Formulars und muss
  organisatorisch gedeckt sein

## Technisch

- [ ] Resend einrichten und Testanfrage durchführen — siehe [DEPLOYMENT.md](DEPLOYMENT.md)
- [ ] `betrieb.url` auf die endgültige Adresse setzen, falls `www` die Hauptadresse wird
- [ ] Google Search Console einrichten, `sitemap.xml` einreichen
- [ ] Google-Unternehmensprofil mit `lib/betrieb.ts` abgleichen — bei lokaler Suche zählt, dass
      Name, Adresse und Telefonnummer überall identisch geschrieben sind
