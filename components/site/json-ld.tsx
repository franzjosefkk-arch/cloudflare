/**
 * JSON-LD in die Seite schreiben. Der Inhalt kommt ausschließlich aus
 * lib/betrieb.ts und lib/seo.ts — es fließen keine Nutzereingaben hinein.
 */
export function JsonLd({ daten }: { daten: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(daten).replace(/</g, '\\u003c') }}
    />
  )
}
