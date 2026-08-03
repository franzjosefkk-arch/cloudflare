import { Star } from 'lucide-react'

import { Sektion, SektionKopf } from '@/components/site/sektion'
import { betrieb } from '@/lib/betrieb'

/**
 * Vertrauensbeleg.
 *
 * Belegt ist nur der Durchschnitt (Recherche: 4,5 von 5 aus 142 Bewertungen).
 * Einzelne Rezensionstexte lagen beim Bau nicht im Wortlaut vor, deshalb sind
 * die Zitatplätze bewusst leer und als Platzhalter ausgewiesen — es steht
 * kein erfundener Kunde auf dieser Seite.
 *
 * ZUM AUSFÜLLEN: echte Google-Rezensionen in `kundenstimmen` eintragen.
 * Sobald mindestens eine drin steht, verschwinden die Platzhalterkarten.
 */
type Stimme = {
  text: string
  name: string
  /** Worum ging es? Konkret ist überzeugender als „super Service". */
  anlass: string
}

export const kundenstimmen: readonly Stimme[] = []

function Sterne({ wert }: { wert: number }) {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= Math.round(wert) ? 'size-5 fill-signal-500 text-signal-500' : 'size-5 text-blatt-500'
          }
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

export function Bewertungen() {
  return (
    <Sektion grund="negativ">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SektionKopf
            grund="negativ"
            pos="E"
            label="Was Kunden sagen"
            titel={
              <>
                {betrieb.bewertung.schnitt.toLocaleString('de-DE')} von 5,
                <br />
                aus {betrieb.bewertung.anzahl} Bewertungen.
              </>
            }
          />

          <div className="mt-7 flex items-center gap-4">
            <Sterne wert={betrieb.bewertung.schnitt} />
            <span className="sr-only">
              {betrieb.bewertung.schnitt.toLocaleString('de-DE')} von 5 Sternen
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-fiche-400">
              {betrieb.bewertung.quelle}
            </span>
          </div>

          <p className="mt-7 max-w-md leading-relaxed text-fiche-300">
            Ein Betrieb, der seit {betrieb.gruendungsjahr} in derselben Straße steht, lebt von
            Leuten, die wiederkommen — und von denen, die er ihnen empfiehlt.
          </p>
        </div>

        <div className="lg:col-span-7">
          {kundenstimmen.length > 0 ? (
            <ul className="grid gap-px bg-ink-700 sm:grid-cols-2">
              {kundenstimmen.map((s) => (
                <li key={s.name + s.anlass} className="flex flex-col bg-ink-800 p-7">
                  <blockquote className="flex-1 text-[1.0625rem] leading-relaxed text-fiche-100">
                    &bdquo;{s.text}&ldquo;
                  </blockquote>
                  <footer className="mt-6 border-t border-ink-600 pt-4">
                    <p className="font-bold text-fiche-100">{s.name}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-fiche-400">
                      {s.anlass}
                    </p>
                  </footer>
                </li>
              ))}
            </ul>
          ) : (
            /* Platzhalter — siehe Kommentar oben und AUSTAUSCHLISTE.md */
            <ul className="grid gap-5 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <li
                  key={i}
                  className="flex min-h-64 flex-col justify-between border-2 border-dashed border-ink-600 p-7"
                >
                  <div>
                    <span className="katalog-label border border-signal-500 px-2 py-1 text-signal-500">
                      Platzhalter
                    </span>
                    <p
                      aria-hidden
                      className="mt-6 select-none font-display text-6xl leading-none text-ink-700"
                    >
                      &bdquo;
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-fiche-400">
                    Hier gehört eine echte Google-Rezension hin — Wortlaut, Vorname und Anlass.
                    Einzutragen in{' '}
                    <code className="font-mono text-fiche-300">
                      components/site/bewertungen.tsx
                    </code>
                    .
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Sektion>
  )
}
