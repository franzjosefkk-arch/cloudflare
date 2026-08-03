import * as React from 'react'

import { Sektion, SektionKopf } from '@/components/site/sektion'

/**
 * Rahmen für Impressum und Datenschutz: eine schmale, ruhige Lesespalte.
 * Rechtstexte werden gelesen, nicht gescannt — hier tritt der Katalog zurück.
 */
export function Rechtstext({
  titel,
  vorspann,
  children,
}: {
  titel: string
  vorspann?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Sektion grund="negativ" raster className="py-14 lg:py-16">
        <SektionKopf als="h1" grund="negativ" label="Rechtliches" titel={titel} vorspann={vorspann} />
      </Sektion>

      <Sektion grund="blatt">
        <div
          className={[
            'max-w-[46rem] text-[1.0625rem] leading-[1.75] text-ink-800',
            '[&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:first:mt-0',
            '[&_h2]:border-t-2 [&_h2]:border-ink-900 [&_h2]:pt-6',
            '[&_h3]:mt-9 [&_h3]:text-lg [&_h3]:font-extrabold',
            '[&_p]:mt-4',
            '[&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5',
            '[&_li]:list-disc [&_li]:marker:text-signal-500',
            '[&_a]:font-semibold [&_a]:text-ink-900 [&_a]:underline [&_a]:decoration-signal-500 [&_a]:decoration-2 [&_a]:underline-offset-2',
            '[&_dl]:mt-4 [&_dt]:katalog-label [&_dt]:mt-4 [&_dt]:text-ink-600 [&_dd]:mt-1',
            '[&_strong]:font-bold [&_strong]:text-ink-900',
          ].join(' ')}
        >
          {children}
        </div>
      </Sektion>
    </>
  )
}

/** Sichtbar markierte Lücke — nichts wird stillschweigend erfunden. */
export function Luecke({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-signal-500/20 px-1.5 py-0.5 font-mono text-[0.8125rem] font-bold text-ink-900 outline outline-1 outline-signal-500">
      {children}
    </mark>
  )
}
