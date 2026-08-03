import { verkaufszeiten, werkstattzeiten, type Zeitraum } from '@/lib/betrieb'
import { cn } from '@/lib/utils'

type Variante = 'negativ' | 'positiv'

function Tabelle({
  titel,
  zeiten,
  variante,
  zusatz,
}: {
  titel: string
  zeiten: readonly Zeitraum[]
  variante: Variante
  zusatz?: string
}) {
  const negativ = variante === 'negativ'
  return (
    <div>
      <h3
        className={cn(
          'katalog-label pb-2.5',
          negativ ? 'text-signal-500' : 'text-signal-700',
        )}
      >
        {titel}
      </h3>
      <dl className="grid">
        {zeiten.map((z) => (
          <div
            key={z.tage}
            className={cn(
              'flex items-baseline justify-between gap-4 border-b py-2.5',
              negativ ? 'border-ink-700' : 'border-blatt-300',
            )}
          >
            <dt className={cn('text-sm', negativ ? 'text-fiche-200' : 'text-ink-700')}>{z.tage}</dt>
            <dd
              className={cn(
                'pos-nummer whitespace-nowrap text-sm font-bold',
                negativ ? 'text-fiche-100' : 'text-ink-900',
              )}
            >
              {z.anzeige}
            </dd>
          </div>
        ))}
        {zusatz ? (
          <div
            className={cn(
              'flex items-baseline justify-between gap-4 border-b py-2.5',
              negativ ? 'border-ink-700' : 'border-blatt-300',
            )}
          >
            <dt className={cn('text-sm', negativ ? 'text-fiche-200' : 'text-ink-700')}>Samstag</dt>
            <dd className={cn('text-sm', negativ ? 'text-fiche-400' : 'text-ink-600')}>{zusatz}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  )
}

export function Oeffnungszeiten({
  variante = 'positiv',
  className,
}: {
  variante?: Variante
  className?: string
}) {
  // Container-Abfrage statt Bildschirmbreite: Die Komponente steht mal in einer
  // schmalen Seitenspalte, mal über die halbe Seite. Nur der eigene Platz
  // entscheidet, ob zwei Spalten nebeneinander passen — sonst läuft
  // „Montag bis Donnerstag  07:00 – 17:00 Uhr" über den Rand.
  return (
    <div className={cn('@container', className)}>
      <div className="grid gap-7 @xl:grid-cols-2">
        <Tabelle titel="Werkstatt" zeiten={werkstattzeiten} variante={variante} />
        <Tabelle titel="Verkauf" zeiten={verkaufszeiten} variante={variante} zusatz="geschlossen" />
      </div>
    </div>
  )
}
