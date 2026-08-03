import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sektion, SektionKopf } from '@/components/site/sektion'
import { JsonLd } from '@/components/site/json-ld'
import { betrieb, leistungen, telHref, weitereLeistungen } from '@/lib/betrieb'
import { breadcrumbSchema, seitenMetadata } from '@/lib/seo'

export const metadata = seitenMetadata({
  titel: 'Leistungen — Werkstatt für alle Marken in Bremen',
  beschreibung:
    'Inspektion, HU und AU, Bremsen und Fahrwerk, Klimaservice, Diagnose, Unfall und Lackierung. Kfz-Meisterwerkstatt in Bremen-Arsten für alle Marken, Transporter bis 5 t.',
  pfad: '/leistungen/',
})

export default function LeistungenSeite() {
  return (
    <>
      <Sektion grund="negativ" raster className="py-16 lg:py-24">
        <SektionKopf
          als="h1"
          grund="negativ"
          label="Positionsverzeichnis"
          titel="Leistungen"
          vorspann="Sechs Positionen decken ab, weswegen ein Auto in die Werkstatt kommt. Jede Seite beantwortet den Einwand, der bei dieser Arbeit am häufigsten kommt."
        />
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button asChild size="lg">
            <Link href="/kontakt/#termin">Termin anfragen</Link>
          </Button>
          <Button asChild size="lg" variant="konturNegativ">
            <a href={telHref()}>
              <Phone aria-hidden className="size-4" strokeWidth={2.5} />
              {betrieb.telefon.anzeige}
            </a>
          </Button>
        </div>
      </Sektion>

      <Sektion grund="blatt">
        <ul className="grid gap-px border border-blatt-300 bg-blatt-300 md:grid-cols-2">
          {leistungen.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/leistungen/${l.slug}/`}
                className="group relative flex h-full flex-col bg-white p-7 transition-colors duration-200 hover:bg-blatt-50 lg:p-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="pos-nummer text-sm text-blatt-500 transition-colors group-hover:text-signal-500">
                  {l.pos}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">
                  {l.titel}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-700">{l.kurz}</p>

                <ul className="mt-6 grid flex-1 gap-2">
                  {l.umfang.slice(0, 3).map((u) => (
                    <li
                      key={u}
                      className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-700"
                    >
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-signal-500" />
                      {u}
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-signal-700">
                  Alles zu {l.titel}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1.5"
                    strokeWidth={2.5}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      <Sektion grund="positiv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SektionKopf
              label="Ausserdem"
              titel="Was sonst noch bei uns geht."
              vorspann="Nicht jede Arbeit braucht eine eigene Seite. Fragen Sie einfach — wenn wir es nicht machen, sagen wir Ihnen, wer es macht."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-px border border-blatt-300 bg-blatt-300 sm:grid-cols-2">
              {weitereLeistungen.map((w, i) => (
                <li key={w} className="flex items-center gap-4 bg-white px-6 py-5">
                  <span className="pos-nummer text-xs text-blatt-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-ink-900">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sektion>

      <JsonLd
        daten={breadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Leistungen', url: '/leistungen/' },
        ])}
      />
    </>
  )
}
