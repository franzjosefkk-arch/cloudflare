import Link from 'next/link'
import { Mail, MapPin, Phone, Printer } from 'lucide-react'

import { Wortmarke } from '@/components/site/wortmarke'
import { Oeffnungszeiten } from '@/components/site/oeffnungszeiten'
import { betrieb, leistungen, mailHref, telHref } from '@/lib/betrieb'

export function Fusszeile() {
  return (
    <footer className="auf-negativ raster-negativ border-t-4 border-signal-500 bg-ink-950 pb-28 pt-16 text-fiche-200 lg:pb-16">
      <div className="mx-auto max-w-[82rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Betrieb */}
          <div className="lg:col-span-4">
            <Wortmarke className="h-9 w-auto text-fiche-100" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fiche-300">
              Freie Kfz-Meisterwerkstatt und Gebrauchtwagenhandel in Bremen-Arsten.
              Seit {betrieb.gruendungsjahr} in Familienhand — für alle Marken.
            </p>

            <address className="mt-6 grid gap-3 not-italic">
              <a
                href={telHref()}
                className="group flex items-center gap-3 text-fiche-100 transition-colors hover:text-signal-500"
              >
                <Phone aria-hidden className="size-4 shrink-0 text-signal-500" strokeWidth={2.5} />
                <span className="font-mono text-base font-bold">{betrieb.telefon.anzeige}</span>
              </a>
              <a
                href={mailHref('Anfrage über die Website')}
                className="flex items-center gap-3 text-sm text-fiche-200 transition-colors hover:text-signal-500"
              >
                <Mail aria-hidden className="size-4 shrink-0 text-signal-500" strokeWidth={2.5} />
                {betrieb.email}
              </a>
              <p className="flex items-center gap-3 text-sm text-fiche-300">
                <Printer aria-hidden className="size-4 shrink-0 text-fiche-400" strokeWidth={2.5} />
                Fax {betrieb.telefax}
              </p>
              <p className="flex items-start gap-3 text-sm text-fiche-200">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-signal-500"
                  strokeWidth={2.5}
                />
                <span>
                  {betrieb.adresse.strasse}
                  <br />
                  {betrieb.adresse.plz} {betrieb.adresse.ort}-{betrieb.adresse.ortsteil}
                </span>
              </p>
            </address>
          </div>

          {/* Leistungen */}
          <nav aria-labelledby="fuss-leistungen" className="lg:col-span-3">
            <h2 id="fuss-leistungen" className="katalog-label text-fiche-400">
              Leistungen
            </h2>
            <ul className="mt-5 grid gap-3">
              {leistungen.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/leistungen/${l.slug}/`}
                    className="flex gap-3 text-sm text-fiche-200 transition-colors hover:text-signal-500"
                  >
                    <span className="pos-nummer text-[0.6875rem] text-fiche-400">{l.pos}</span>
                    {l.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Öffnungszeiten */}
          <div className="lg:col-span-5">
            <h2 className="katalog-label text-fiche-400">Öffnungszeiten</h2>
            <div className="mt-5">
              <Oeffnungszeiten variante="negativ" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-ink-700 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wide text-fiche-400">
            © {betrieb.gruendungsjahr}–{new Date().getFullYear()} {betrieb.rechtsform}
          </p>
          <nav aria-label="Rechtliches">
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              <li>
                <Link
                  href="/impressum/"
                  className="text-sm text-fiche-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-signal-500 hover:decoration-signal-500"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz/"
                  className="text-sm text-fiche-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-signal-500 hover:decoration-signal-500"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
