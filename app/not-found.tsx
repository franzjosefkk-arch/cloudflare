import Link from 'next/link'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { betrieb, leistungen, telHref } from '@/lib/betrieb'

export const metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: false },
}

export default function NichtGefunden() {
  return (
    <section className="auf-negativ raster-negativ bg-ink-900 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[82rem]">
        <p className="pos-nummer text-6xl text-signal-500 sm:text-8xl">404</p>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl leading-tight text-fiche-100 sm:text-5xl">
          Diese Position gibt es im Katalog nicht.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-fiche-300">
          Die Seite wurde verschoben oder hat sie nie gegeben. Was Sie suchen, finden Sie
          vermutlich hier — oder Sie rufen einfach an.
        </p>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button asChild size="lg">
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button asChild size="lg" variant="konturNegativ">
            <a href={telHref()}>
              <Phone aria-hidden className="size-4" strokeWidth={2.5} />
              {betrieb.telefon.anzeige}
            </a>
          </Button>
        </div>

        <nav aria-label="Leistungen" className="mt-16">
          <h2 className="katalog-label text-fiche-400">Positionen</h2>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {leistungen.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/leistungen/${l.slug}/`}
                  className="flex items-center gap-3.5 border-b border-ink-700 py-3.5 text-fiche-200 transition-colors hover:border-signal-500 hover:text-signal-500"
                >
                  <span className="pos-nummer text-xs text-fiche-400">{l.pos}</span>
                  {l.titel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
