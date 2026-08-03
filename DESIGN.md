# DESIGN.md — Der Ersatzteilkatalog

Beschreibt die gebaute visuelle Welt, nicht die Absicht. Produktwahrheit steht in
`PRODUCT.md`, Betriebsdaten in `lib/betrieb.ts`.

## These

Diese Seite ist ein **Ersatzteilkatalog**, kein Werkstattprospekt.

Was die Kategorie sonst tut: dunkles Hero-Foto, ein Mann mit Schraubenschlüssel, roter Akzent,
„Ihr Partner rund ums Auto". Das Gegenteil davon — viel Weißraum, dünne Groteske,
Tech-Startup-Ruhe — ist genauso vorhersehbar. Beides ist hier ausgeschlossen.

Stattdessen: das Fahrzeug als **nummerierte, nachvollziehbare Position**. Wer ein Auto in die
Werkstatt gibt, will wissen, was gemacht wird und was es kostet. Ein Katalog ist die Form, die
genau das verspricht: alles hat eine Nummer, alles ist auffindbar, nichts ist verhandelbar
vage.

Seed der Richtungsentscheidung: `16ece3cc`, Position 4 der geordneten Kandidatenliste. Der
Richtungsvertrag steht als HTML-Kommentar im ausgelieferten Markup
(`components/site/richtungsvertrag.tsx`) und wird von `tests/seiten.spec.ts` überwacht.

## Zwei Materialien

Die Seite kennt genau zwei Gründe, die sich beim Scrollen abwechseln. Der Wechsel ist der
Takt des Dokuments.

| | **Negativ** — die Mikrofiche | **Positiv** — die Katalogseite |
|---|---|---|
| Grund | `ink-900` #0a1826 | `blatt-100` #f2f5f7 / `blatt-50` #ffffff |
| Zeichnung | Haarlinien in `fiche-300` #a5cbdb | Haarlinien in `blatt-300` #d2dae0 |
| Text | `fiche-100` / `fiche-300` | `ink-900` / `ink-700` |
| Raster | `raster-negativ` | `raster-positiv` |
| Eingesetzt für | Hero, Mechanismus, Vertrauen, Kopf jeder Unterseite, Fußzeile | Leistungen, Ablauf, Formular, FAQ |

Gesteuert über `<Sektion grund="negativ" | "positiv" | "blatt">`.

## Farbe

**Strategie: Committed.** Ein gesättigter Ton trägt die Seite, der Rest ist Tinte und Papier.

Signalorange bedeutet immer dasselbe: **hier ist die Position, hier wird gehandelt.** Es steht
nie dekorativ.

| Token | Wert | Verwendung |
|---|---|---|
| `signal-500` | `#ff6a13` | Flächen und Marken auf dunklem Grund, Hauptschaltfläche |
| `signal-600` | `#e85800` | Zustand beim Überfahren; Symbole auf hellem Grund (3,7:1) |
| `signal-700` | `#b84400` | **Text** auf hellem Grund (5,5:1 auf Weiß) |
| `pruef-500` | `#167d52` | ausschließlich Bestätigung nach dem Absenden |
| `blatt-400` | `#a9b6c0` | Linien und Rahmen — **nie Text** (nur 2,2:1) |
| `blatt-500` | `#5a6873` | gedämpfter Text auf hellem Grund (5,7:1) |

Die Regel, die beim Bau am häufigsten gebrochen wurde und deshalb hier steht: **Orange auf
Weiß ist kein Text.** `signal-500` erreicht auf Weiß nur 2,9:1. Für Text auf hellem Grund gilt
`signal-700`, für Symbole `signal-600`.

Auf der Signalfläche steht Text in `ink-950`, nicht in Weiß — Weiß auf Orange erreicht nur
2,8:1. Schwarz auf Orange ist zugleich die Farbkombination der Warnbeschilderung, aus der die
Welt kommt.

## Schrift

**Archivo** (Omnibus-Type) trägt die Stimme: eine Groteske mit Kante, die in schweren
Schnitten laut wird, ohne zu schreien. **Chivo Mono** aus derselben Werkstatt setzt alles,
was im Katalog eine Kennung ist: Positionsnummern, Uhrzeiten, Telefonnummern, technische
Marken.

Beide sind Variable Fonts und werden von `next/font/google` beim Bauen heruntergeladen und
vom eigenen Server ausgeliefert — zur Laufzeit geht keine Verbindung zu Google.

`hyphens: auto` gilt für Überschriften und Fließtext. Auf einer deutschen Seite ist das keine
Feinheit: „Unfallinstandsetzung" passt auf einem 412 px breiten Telefon in keine Zeile und
schöbe ohne Trennung die ganze Seite zur Seite. `overflow-wrap: break-word` liegt als letztes
Netz darunter. `tests/seiten.spec.ts` prüft auf jeder Seite und in beiden Viewports, dass
nichts über den Rand läuft.

```
Überschriften   Archivo 800, tracking -0.02em, text-wrap balance
H1              2,25rem → 3,375rem (lg), leading 1.0
H2              2rem → 3rem (lg)
Fließtext       Archivo 400, 1rem–1,0625rem, leading relaxed, text-wrap pretty
katalog-label   Chivo Mono 700, 0,6875rem, tracking 0.18em, versal
pos-nummer      Chivo Mono 700, tabular-nums, tracking 0.08em
Schaltflächen   Chivo Mono 700, 0,8125rem, tracking 0.14em, versal
```

## Form

Der Katalog kennt kaum Rundungen. `--radius-katalog: 2px` ist das Maximum; Formularfelder sind
mit `rounded-none` ganz kantig, weil sie Eintragszeilen auf Papier sind.

Wiederkehrende Bauteile:

- **Positionsmarke** — eine Zahl in einem 32-px-Quadrat oder -Kreis. Ordnet Abschnitte
  (`A`–`F`), Leistungen (`01`–`06`), Zusagen (`A`–`D`) und Ablaufschritte.
- **Rasterfuge** — Karten liegen als `gap-px` auf einem eingefärbten Container, sodass die
  Trennlinie zur Fuge zwischen Katalogfeldern wird, nicht zum Rahmen um eine Karte.
- **Kopfleiste** — hervorgehobene Kästen (Merkblatt, „Eilt es?", Formularkopf) tragen eine
  volle Leiste oben, keinen Streifen links. Der linke Akzentstreifen war die erste Lösung und
  wurde ersetzt: er ist das bekannteste Erkennungszeichen generierter Oberflächen.
- **Tabellenzeile** — Leistungen als Zeilen unter einer 2 px starken Oberkante, nicht als
  Kachelraster.

## Bewegung

Die Eigenbewegung eines Ersatzteilkatalogs ist das **Auseinanderziehen**: Teile wandern an
Leitlinien aus der Baugruppe heraus.

- `animiert-marke` — Positionsmarken fahren aus der Fahrzeugmitte an ihren Platz, versetzt um
  90 ms je Position.
- `animiert-linie` — Leitlinien zeichnen sich über `stroke-dashoffset`. Über `pathLength={100}`
  ist die Länge jeder Linie normiert, sodass alle gleich schnell laufen.
- `animiert-auf` — Textblöcke im Hero, 60 ms versetzt.

Dauern liegen zwischen 0,5 s und 0,75 s, alle mit `both` als Füllmodus: Die Endzustände stehen
also auch dann, wenn eine Animation nie startet. `prefers-reduced-motion: reduce` setzt global
alles auf 0,01 ms und schaltet weiches Scrollen ab.

Keine Scroll-Animationen. Nichts blendet beim Scrollen ein — Inhalt, der erst bei Sichtkontakt
erscheint, ist auf einer Seite, die Anfragen bringen soll, ein Risiko ohne Gegenwert.

## Die Explosionszeichnung

`components/site/explosionszeichnung.tsx`. Das Signaturstück und der einzige Ort, an dem die
Welt buchstäblich wird.

Ein Fahrzeug in Haarlinien, von Hand als SVG-Pfade gesetzt (viewBox `0 0 1200 560`). Sechs
Positionsmarken zeigen über Leitlinien auf die Stellen, an denen gearbeitet wird.

Zeichnung und Legende sind **dasselbe Steuerelement**: Wer einen Eintrag der Legende berührt
oder mit der Tastatur anspringt, sieht die zugehörige Marke aufleuchten. Das SVG selbst ist
`aria-hidden` und rein dekorativ — die zugängliche Fassung ist die Legende darunter, eine
gewöhnliche Liste von Links in einem `<nav>`.

Unter 640 px Breite wäre eine Positionsnummer nur noch rund fünf Pixel hoch. Dort werden
Marken und Leitlinien ausgeblendet, die Zeichnung auf das Fahrzeug beschnitten
(`-mt-[15%] -mb-[6%]` in einem `overflow-hidden`-Rahmen) und dadurch anderthalbmal so groß.
Die Nummern trägt dann die Legende allein.

## Raum

Ein Rhythmus für die ganze Seite: `--spacing-sektion: 5.5rem`, ab `lg` `8rem`. Container
`max-w-[82rem]`, Seitenrand `1.25rem` / `2rem` ab `sm`.

Über einer Überschrift steht mehr Raum als darunter. Dichte Abschnitte (Leistungstabelle,
Formular) wechseln sich mit ruhigen ab (Mechanismus, Vertrauen).

## Barrierefreiheit

Keine nachträgliche Prüfliste, sondern Teil der Tokens.

- Fokus ist ein 3 px starker Signal-Umriss mit 2 px Abstand — auf dunklem Grund zusätzlich mit
  weichem Schein, damit er auf beiden Materialien steht.
- Die Kontrastregeln stehen oben unter *Farbe* und werden von `tests/barrierefreiheit.spec.ts`
  mit axe gegen WCAG 2.2 AA geprüft, auf acht Seiten und zusätzlich im Fehlerzustand des
  Formulars.
- Berührflächen mindestens 44 px; die feste Leiste auf dem Telefon ist 64 px hoch.
- Der Sprunglink zum Inhalt ist das erste fokussierbare Element.
- Formularfehler erscheinen als `role="alert"`-Übersicht, die den Fokus erhält und deren
  Einträge auf das jeweilige Feld verweisen.

## Was bewusst fehlt

- **Keine eingebettete Karte.** Ein Google-Maps-iframe überträgt die IP-Adresse des Besuchers,
  bevor er zustimmen konnte. Stattdessen Anfahrtsbeschreibung plus Link.
- **Keine Cookies, kein Tracking, kein Consent-Banner.** Es gibt nichts einzuwilligen.
- **Keine Fotos.** Es lagen keine vor. Wo Bilder hingehören, stehen markierte Platzhalter
  (`AUSTAUSCHLISTE.md`) statt Symbolbilder aus einer Bilddatenbank.
- **Keine erfundenen Kundenstimmen.** Der Bewertungsschnitt ist belegt, die Zitate nicht — also
  stehen dort leere, ausgewiesene Plätze.
