'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Wortmarke } from '@/components/site/wortmarke'
import { betrieb, telHref } from '@/lib/betrieb'
import { cn } from '@/lib/utils'

const navigation = [
  { titel: 'Leistungen', href: '/leistungen/' },
  { titel: 'Unfall & Lack', href: '/leistungen/unfall-und-lackierung/' },
  { titel: 'Fahrzeuge', href: '/fahrzeuge/' },
  { titel: 'Betrieb', href: '/ueber-uns/' },
  { titel: 'Kontakt', href: '/kontakt/' },
] as const

export function Kopfzeile() {
  const pfad = usePathname()

  // Das Menü merkt sich, auf welcher Seite es geöffnet wurde. Wechselt die
  // Seite, stimmt der Pfad nicht mehr überein und das Menü ist zu — ohne
  // Effekt, der nach dem Rendern noch einmal den Zustand anfasst.
  const [offenAuf, setOffenAuf] = React.useState<string | null>(null)
  const offen = offenAuf === pfad
  const setOffen = React.useCallback(
    (wert: boolean | ((vorher: boolean) => boolean)) => {
      setOffenAuf((vorher) => {
        const neu = typeof wert === 'function' ? wert(vorher === pfad) : wert
        return neu ? pfad : null
      })
    },
    [pfad],
  )

  // Bei offenem Menü keinen Hintergrund scrollen lassen.
  React.useEffect(() => {
    document.body.style.overflow = offen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [offen])

  return (
    <header className="auf-negativ sticky top-0 z-50 border-b border-ink-700 bg-ink-900/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[4.5rem] max-w-[82rem] items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-[2px] text-fiche-100 transition-colors hover:text-signal-500"
          aria-label={`${betrieb.name} — zur Startseite`}
        >
          <Wortmarke className="h-8 w-auto" />
        </Link>

        <nav aria-label="Hauptnavigation" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((n) => {
              const aktiv = pfad === n.href
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={aktiv ? 'page' : undefined}
                    className={cn(
                      'relative block rounded-[2px] px-3.5 py-2 text-sm font-semibold transition-colors',
                      aktiv ? 'text-signal-500' : 'text-fiche-200 hover:text-white',
                    )}
                  >
                    {n.titel}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-signal-500 transition-transform duration-200',
                        aktiv ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Telefon steht auf gleicher Höhe wie der Termin-Block: in diesem
            Gewerbe konvertiert der Anruf mindestens so gut wie das Formular. */}
        <div className="ml-auto flex items-center gap-2.5 lg:ml-4">
          <a
            href={telHref()}
            data-anruf="sofort"
            className="hidden items-center gap-2 rounded-[2px] px-2 py-1.5 font-mono text-sm font-bold tracking-tight text-fiche-100 transition-colors hover:text-signal-500 sm:flex"
          >
            <Phone aria-hidden className="size-4" strokeWidth={2.5} />
            <span>
              <span className="sr-only">Telefonnummer </span>
              {betrieb.telefon.anzeige}
            </span>
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/kontakt/#termin">Termin anfragen</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOffen((o) => !o)}
            aria-expanded={offen}
            aria-controls="mobilmenue"
            className="grid size-11 place-items-center rounded-[2px] border-2 border-ink-600 text-fiche-100 transition-colors hover:border-signal-500 hover:text-signal-500 lg:hidden"
          >
            {offen ? (
              <X aria-hidden className="size-5" strokeWidth={2.5} />
            ) : (
              <Menu aria-hidden className="size-5" strokeWidth={2.5} />
            )}
            <span className="sr-only">{offen ? 'Menü schließen' : 'Menü öffnen'}</span>
          </button>
        </div>
      </div>

      {/* Mobiles Menü */}
      <div
        id="mobilmenue"
        hidden={!offen}
        className="raster-negativ border-t border-ink-700 bg-ink-900 lg:hidden"
      >
        <nav aria-label="Hauptnavigation mobil" className="mx-auto max-w-[82rem] px-5 py-3 sm:px-8">
          <ul>
            {navigation.map((n, i) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={pfad === n.href ? 'page' : undefined}
                  className="flex items-center gap-4 border-b border-ink-700 py-4 text-base font-semibold text-fiche-100"
                >
                  <span className="pos-nummer text-xs text-fiche-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {n.titel}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 py-5 sm:grid-cols-2">
            <Button asChild variant="signal">
              <Link href="/kontakt/#termin">Termin anfragen</Link>
            </Button>
            <Button asChild variant="konturNegativ">
              <a href={telHref()}>{betrieb.telefon.anzeige}</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
