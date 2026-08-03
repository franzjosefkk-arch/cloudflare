/**
 * Der Richtungsvertrag als echter HTML-Kommentar im ausgelieferten Markup.
 *
 * JSX-Kommentare (`{/* … *\/}`) sind JavaScript-Kommentare und landen nie im
 * HTML. Damit die Entwurfsentscheidung im Produktionsbuild prüfbar bleibt,
 * wird sie hier bewusst als Kommentarknoten eingefügt.
 */
const VERTRAG = `
  THESIS: Diese Seite ist ein Ersatzteilkatalog, kein Werkstattprospekt. Sie
  verweigert das Kategorie-Standardbild (dunkles Hero-Foto mit Schraubenschluessel
  und rotem Akzent) und zeigt das Fahrzeug als nummerierte, nachvollziehbare
  Position.

  OWN-WORLD: Mikrofiche-Negativ (Tintenblau #0a1826, Linienzeichnung in Cyanweiss
  #eaf4f8) im Wechsel mit der gedruckten Katalogseite (kuehles Papier #f2f5f7).
  Signalorange #ff6a13 markiert immer dasselbe: Position und Handlung. Archivo
  fuer die Stimme, Chivo Mono fuer Positionsnummern. Kanten statt Rundungen,
  2px Radius, Haarlinienraster.

  STORY: Der Besucher versteht in einem Blick, dass hier jede Arbeit am Auto eine
  benannte Position hat, glaubt dass Preis und Befund vorher auf dem Tisch liegen,
  und fragt einen Termin an.

  FIRST VIEWPORT: Explosionszeichnung des Fahrzeugs ueber die volle Breite auf dem
  Negativ, sechs nummerierte Positionsmarken ziehen sich an Leitlinien auf.
  Darueber links die Zeile, darunter der Signalblock "Termin anfragen" mit der
  Telefonnummer gleichrangig daneben.

  FORM: Ersatzteilkatalog / Mikrofiche, Position 4 der geordneten Liste,
  Seed 16ece3cc.

  FINISH: unreviewed und undocumented ist unfertig; dieser Build endet mit dem
  Finish-Review, dem Verdikt und DESIGN.md.
`
  // Doppelte Bindestriche wuerden den Kommentar vorzeitig schliessen.
  .replace(/--/g, '—')

export function Richtungsvertrag() {
  return <div hidden dangerouslySetInnerHTML={{ __html: `<!--${VERTRAG}-->` }} />
}
