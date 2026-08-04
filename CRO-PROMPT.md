# CRO-Prompt — Conversion-Audit und Umsetzung

Ein wiederverwendbarer Prompt für einen Coding-Agenten (Claude Code o. Ä.). Er prüft eine
Website gegen neun Conversion-Kriterien, belegt jeden Befund am Code und setzt die
Verbesserungen um.

Herkunft der Kriterien: Alex Hormozis Aussagen zu Conversion und Value Equation, übersetzt
in Web-Design. Die Kriterien sind bewusst wenige — der Kern der Vorlage ist, zwei bis drei
Dinge zu ändern, die zählen, statt vierzig auf einmal.

**Benutzung:** Alles ab `---` kopieren und als Prompt schicken. Die Platzhalter in
`{geschweiften Klammern}` vorher ersetzen.

---

Du prüfst die Website in diesem Repository auf Conversion und setzt anschließend die
wichtigsten Verbesserungen um.

## Kontext

- **Zielhandlung:** {z. B. abgeschickte Terminanfrage über das Formular und Anrufe}
- **Zielgruppe:** {wer die Seite besucht und in welcher Situation}
- **Seiten im Scope:** {z. B. Startseite und Kontaktseite, oder: alle}
- **Was du nicht anfassen sollst:** {z. B. Preise, Rechtstexte, Betriebsdaten}

## Phase 1 — Audit

Geh die neun Kriterien unten der Reihe nach durch. Für jedes Kriterium:

1. Lies die tatsächlich betroffenen Dateien. Rate nicht.
2. Vergib einen Status: **erfüllt** / **teilweise** / **fehlt**.
3. Belege den Status mit `pfad/datei.tsx:zeile` und dem konkreten Text bzw. Markup.
4. Wenn nicht erfüllt: beschreib in einem Satz, was der Besucher dadurch erlebt.

Ein Kriterium gilt nur als erfüllt, wenn du es zeigen kannst. „Wirkt vorhanden" ist kein
Status.

### 1. Klarheit vor Schönheit

Erkennt ein Fremder in unter fünf Sekunden, was hier angeboten wird und was der nächste
Schritt ist? Prüf den Text, den ein Besucher wirklich zuerst liest — nicht das, was im
Code weiter oben steht.

### 2. Above the Fold

Der einzige Bereich, den nachweislich jeder Besucher sieht. Prüf, was ohne Scrollen
sichtbar ist — auf dem Telefon (375 px breit) **und** auf dem Desktop, das sind zwei
verschiedene Antworten.

- Beantwortet die Headline: wer, was, **und was der Besucher davon hat**?
- Der dritte Teil fehlt am häufigsten. Wenn die Headline nur die Leistung nennt, ist das
  Kriterium nicht erfüllt.
- Steht der primäre Call-to-Action ohne Scrollen im Bild?

### 3. Das Bild unter der Headline

- Stockfoto, Symbolbild oder KI-Bild? Dann: nicht erfüllt. Jeder erkennt sie, und in dem
  Moment fragt der Besucher sich, was auf der Seite sonst noch unecht ist.
- Zeigt das Bild den echten Betrieb, echte Menschen, echte Arbeit? Leichte Unperfektion
  ist ein Vorteil, kein Mangel.
- Wenn kein echtes Material vorliegt: sag das als Aufgabe an den Betreiber, erfinde keinen
  Ersatz.

### 4. Ergebnis statt Produkt

Verkauft der Text das Endergebnis, das der Kunde will — oder beschreibt er die Leistung,
die geliefert wird? Sammle die Überschriften und ersten Sätze der Abschnitte und
entscheide je Abschnitt.

### 5. Glaubwürdigkeit (die untere Hälfte der Value Equation)

Hier liegt laut Vorlage das Geld — nicht in größeren Versprechen.

- Gibt es Beweise: Bewertungen, Zahlen, Referenzen, Zertifikate, Meisterbrief, Jahre?
- Sind sie **spezifisch**? „Zufriedene Kunden" zählt nicht, „4,5 von 5 aus 142
  Bewertungen" zählt.
- Gibt es eine Garantie oder Zusage, und steht konkret drin, was passiert, wenn es nicht
  klappt? Vage Siegel überspringt das Gehirn.

**Harte Regel:** Erfinde keine Testimonials, Bewertungen, Zahlen, Auszeichnungen oder
Garantien und schreib keine Behauptung, die du nicht im Repository belegt findest. Fehlt
ein Beleg, wird das eine offene Aufgabe an den Betreiber — kein Platzhaltertext, der live
gehen könnte.

### 6. Beweis am Entscheidungspunkt

Stehen die Vertrauenselemente **direkt beim Call-to-Action**? Genau dort, die halbe
Sekunde vor dem Klick, steigt der Zweifel. Beweise ganz unten auf der Seite kommen zu spät.

### 7. Reibung und Aufwand

- Wie viele Felder hat das Formular, und ist jedes davon nötig, um den ersten Kontakt
  herzustellen?
- Gibt es einen Weg für Leute, die nicht tippen wollen — Telefonnummer als `tel:`-Link,
  auf dem Telefon in Daumenreichweite?
- Was passiert nach dem Absenden: erfährt der Besucher, wann er eine Antwort bekommt?
- Wie viele Klicks von der Startseite bis zur Zielhandlung?

### 8. Geschwindigkeit

Ladezeit ist Teil der Conversion, nicht Technik-Kosmetik. Prüf, was du statisch sehen
kannst: Bildgrößen und -formate, `priority`/Lazy-Loading beim Bild above the fold,
blockierende Schriften, Bundle-Auffälligkeiten. Wenn Messwerte vorliegen (Lighthouse,
Core Web Vitals), nutz sie statt zu schätzen.

### 9. Unterscheidbarkeit

Könnte diese Seite jedem Wettbewerber der Branche gehören, wenn man Namen und Logo
tauscht? Dann wird der Betrieb wie eine Ware bepreist. Such nach dem, was nur hier gilt:
eigener Prozess, eigene Haltung, eigene Geschichte.

## Phase 2 — Priorisierung

Gib die Ergebnisse als Tabelle aus:

| # | Kriterium | Status | Fundstelle | Befund | Maßnahme | Aufwand |
|---|---|---|---|---|---|---|

Wähl daraus **die zwei bis drei Maßnahmen mit dem größten erwarteten Effekt** und begründe
die Auswahl in je einem Satz. Above the fold hat im Zweifel Vorrang — dort passieren die
größten Sprünge, und es ist der einzige Bereich, den alle sehen.

Schlag kein Komplett-Redesign vor. Wenn du mehr als drei Änderungen für nötig hältst, leg
den Rest als benannte Restliste ab, statt sie mitzuerledigen.

## Phase 3 — Umsetzung

Setz nur die ausgewählten Maßnahmen um.

- Kleine, einzeln nachvollziehbare Änderungen. Eine Maßnahme, ein Commit.
- Bleib im bestehenden Stil des Codes: gleiche Komponenten, gleiche Namensgebung, gleiche
  Sprache und Anrede wie im Rest des Projekts.
- Änder keine Betriebsdaten, Preise oder Rechtstexte.
- Nach jeder Maßnahme die Prüfungen des Projekts laufen lassen (hier:
  `npm run typecheck`, `npm run lint`, `npm run build`, `npm test`) und Fehler beheben,
  bevor du weitermachst.
- Bestehende Tests, die eine geänderte Formulierung erwarten, ziehst du nach — aber nur
  die, und du sagst welche.

## Ausgabe

Zum Schluss:

1. Die Audit-Tabelle aus Phase 2.
2. Was du geändert hast, je Maßnahme ein bis zwei Sätze und die betroffenen Dateien.
3. Das Ergebnis der Prüfungen — wörtlich, auch wenn etwas fehlschlägt.
4. **Offene Aufgaben an den Betreiber**: alles, was du nicht erfinden durftest (echte
   Fotos, Bewertungen, Garantiezusage, Zahlen). Konkret, damit die Person genau weiß, was
   sie liefern muss.
5. Die Restliste der nicht umgesetzten Maßnahmen.

## Wogegen du wirklich antrittst

Nicht gegen den Wettbewerber, sondern gegen Nichtstun. Der Besucher, der den Tab mit
„vielleicht später" schließt, ist der Normalfall. Jede Entscheidung in diesem Audit misst
sich daran, ob sie die Hürde vor dem Klick senkt.
