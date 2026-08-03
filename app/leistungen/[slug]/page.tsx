import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sektion, SektionKopf } from '@/components/site/sektion'
import { Terminformular } from '@/components/site/terminformular'
import { Oeffnungszeiten } from '@/components/site/oeffnungszeiten'
import { JsonLd } from '@/components/site/json-ld'
import { betrieb, ganzeAdresse, leistungen, leistungNachSlug, telHref } from '@/lib/betrieb'
import { breadcrumbSchema, faqSchema, seitenMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return leistungen.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const l = leistungNachSlug(slug)
  if (!l) return {}
  return seitenMetadata({
    titel: l.h1,
    beschreibung: `${l.kurz} Kfz-Meisterwerkstatt Automobile Beckmann, ${ganzeAdresse()}. Termin unter ${betrieb.telefon.anzeige}.`,
    pfad: `/leistungen/${l.slug}/`,
  })
}

export default async function LeistungSeite({ params }: Props) {
  const { slug } = await params
  const l = leistungNachSlug(slug)
  if (!l) notFound()

  const weitere = leistungen.filter((x) => x.slug !== l.slug)

  return (
    <>
      {/* Kopf */}
      <Sektion grund="negativ" raster className="py-14 lg:py-20">
        <nav aria-label="Brotkrumen" className="mb-8">
          <Link
            href="/leistungen/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-fiche-400 transition-colors hover:text-signal-500"
          >
            <ArrowLeft aria-hidden className="size-3.5" strokeWidth={3} />
            Alle Leistungen
          </Link>
        </nav>

        <SektionKopf als="h1" grund="negativ" pos={l.pos} label={l.titel} titel={l.h1} />

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button asChild size="lg">
            <Link href="#termin">Termin anfragen</Link>
          </Button>
          <Button asChild size="lg" variant="konturNegativ">
            <a href={telHref()}>
              <Phone aria-hidden className="size-4" strokeWidth={2.5} />
              {betrieb.telefon.anzeige}
            </a>
          </Button>
        </div>
      </Sektion>

      {/* Umfang + Einwand */}
      <Sektion grund="blatt">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="katalog-label text-ink-600">Was dazugehört</h2>
            <ul className="mt-6 border-t-2 border-ink-900">
              {l.umfang.map((u) => (
                <li key={u} className="flex items-start gap-4 border-b border-blatt-300 py-5">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-signal-600"
                    strokeWidth={3}
                  />
                  <span className="text-[1.0625rem] leading-relaxed text-ink-800">{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Der Einwand — der eigentliche Grund, warum jemand zögert */}
          <div className="lg:col-span-5">
            {/* Merkblatt: Kopfleiste wie bei einem Beiblatt zum Auftrag. */}
            <div className="border-2 border-ink-900 bg-blatt-100 lg:sticky lg:top-28">
              <p className="katalog-label bg-ink-900 px-5 py-3 text-fiche-100">
                Häufigste Frage
              </p>
              <div className="p-6 lg:p-7">
                <h2 className="text-xl font-extrabold leading-snug text-ink-900">
                  {l.einwand.frage}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-700">{l.einwand.antwort}</p>
              </div>
            </div>
          </div>
        </div>
      </Sektion>

      {/* Anfrage */}
      <Sektion grund="positiv" id="termin">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SektionKopf
              label="Terminanfrage"
              titel={`${l.titel} anfragen`}
              vorspann="Wir melden uns innerhalb eines Werktags mit einem Terminvorschlag — und wo möglich mit einer Preisspanne."
            />

            <a
              href={telHref()}
              className="mt-8 flex items-center gap-4 border border-blatt-300 bg-white p-6 transition-colors hover:border-signal-500"
            >
              <Phone aria-hidden className="size-6 shrink-0 text-signal-600" strokeWidth={2.5} />
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-ink-600">
                  Lieber direkt sprechen?
                </span>
                <span className="pos-nummer mt-1 block text-xl font-bold text-ink-900">
                  {betrieb.telefon.anzeige}
                </span>
              </span>
            </a>

            <div className="mt-6 border border-blatt-300 bg-white p-6">
              <Oeffnungszeiten />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Terminformular />
          </div>
        </div>
      </Sektion>

      {/* Weitere Positionen */}
      <Sektion grund="blatt">
        <h2 className="katalog-label text-ink-600">Weitere Positionen</h2>
        <ul className="mt-6 grid gap-px border border-blatt-300 bg-blatt-300 sm:grid-cols-2 lg:grid-cols-5">
          {weitere.map((w) => (
            <li key={w.slug}>
              <Link
                href={`/leistungen/${w.slug}/`}
                className="group flex h-full flex-col justify-between gap-6 bg-white p-6 transition-colors hover:bg-blatt-100"
              >
                <span className="pos-nummer text-xs text-blatt-500 transition-colors group-hover:text-signal-500">
                  {w.pos}
                </span>
                <span className="flex items-center justify-between gap-3 font-bold text-ink-900">
                  {w.titel}
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 text-blatt-500 transition-all group-hover:translate-x-1 group-hover:text-signal-500"
                    strokeWidth={2.5}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      <JsonLd
        daten={breadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Leistungen', url: '/leistungen/' },
          { name: l.titel, url: `/leistungen/${l.slug}/` },
        ])}
      />
      <JsonLd daten={faqSchema([l.einwand])} />
    </>
  )
}
