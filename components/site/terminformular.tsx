'use client'

import * as React from 'react'
import { AlertTriangle, CheckCircle2, Loader2, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Feld, Input, Select, Textarea } from '@/components/ui/feld'
import { betrieb, leistungen, mailHref, telHref } from '@/lib/betrieb'
import { cn } from '@/lib/utils'

/**
 * Die Terminanfrage — der wichtigste Weg auf dieser Seite neben dem Anruf.
 *
 * Aufbau nach dem Werkstattauftrag: erst das Fahrzeug und das Anliegen, dann
 * die Erreichbarkeit. Labels bleiben immer sichtbar, Pflichtfelder sind die
 * vier, ohne die wir nicht zurückrufen können; alles andere ist ausdrücklich
 * als optional gekennzeichnet.
 *
 * Zustellung über die Cloudflare Pages Function unter /api/anfrage.
 * Schlägt sie fehl, verliert der Besucher seine Eingaben nicht: er bekommt
 * Telefonnummer und einen vorausgefüllten E-Mail-Link angeboten.
 */

const anliegen = [
  ...leistungen.map((l) => l.titel),
  'Gebrauchtwagen / Fahrzeugkauf',
  'Etwas anderes',
] as const

type Werte = {
  anliegen: string
  fahrzeug: string
  ersatzwagen: string
  wunschtermin: string
  name: string
  telefon: string
  email: string
  nachricht: string
  einwilligung: boolean
  /** Honigtopf — für Menschen unsichtbar, für Bots verlockend. */
  webseite: string
}

const leer: Werte = {
  anliegen: '',
  fahrzeug: '',
  ersatzwagen: 'nein',
  wunschtermin: '',
  name: '',
  telefon: '',
  email: '',
  nachricht: '',
  einwilligung: false,
  webseite: '',
}

type Fehler = Partial<Record<keyof Werte, string>>

export function pruefe(w: Werte): Fehler {
  const f: Fehler = {}

  if (!w.anliegen) f.anliegen = 'Bitte wählen Sie aus, worum es geht.'

  if (w.fahrzeug.trim().length < 2) {
    f.fahrzeug = 'Bitte nennen Sie Marke und Modell, zum Beispiel „VW Golf, 2016".'
  }

  if (w.name.trim().length < 2) f.name = 'Bitte geben Sie Ihren Namen an.'

  const tel = w.telefon.replace(/[\s/()-]/g, '')
  if (!tel) {
    f.telefon = 'Ohne Telefonnummer können wir Sie nicht zurückrufen.'
  } else if (!/^\+?\d{6,}$/.test(tel)) {
    f.telefon = 'Diese Telefonnummer sieht unvollständig aus. Bitte prüfen Sie sie.'
  }

  if (w.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(w.email.trim())) {
    f.email = 'Diese E-Mail-Adresse sieht nicht richtig aus, zum Beispiel name@beispiel.de.'
  }

  if (!w.einwilligung) {
    f.einwilligung = 'Ohne Ihre Einwilligung dürfen wir die Anfrage nicht bearbeiten.'
  }

  return f
}

type Status = 'ruht' | 'sendet' | 'fertig' | 'fehler'

export function Terminformular({ className }: { className?: string }) {
  const [werte, setWerte] = React.useState<Werte>(leer)
  const [fehler, setFehler] = React.useState<Fehler>({})
  const [status, setStatus] = React.useState<Status>('ruht')
  const [abgeschickt, setAbgeschickt] = React.useState(false)

  const zusammenfassungRef = React.useRef<HTMLDivElement>(null)
  const erfolgRef = React.useRef<HTMLDivElement>(null)
  const startzeit = React.useRef<number>(0)

  React.useEffect(() => {
    startzeit.current = Date.now()
  }, [])

  function setzen<K extends keyof Werte>(feld: K, wert: Werte[K]) {
    setWerte((w) => ({ ...w, [feld]: wert }))
    // Fehler verschwinden, sobald der Besucher das Feld anfasst — aber erst
    // nach dem ersten Absendeversuch geprüft wird.
    if (abgeschickt) setFehler((f) => ({ ...f, [feld]: undefined }))
  }

  async function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAbgeschickt(true)

    const gefunden = pruefe(werte)
    setFehler(gefunden)

    if (Object.keys(gefunden).length > 0) {
      // Fokus auf die Fehlerübersicht, damit Screenreader sie vorlesen.
      requestAnimationFrame(() => zusammenfassungRef.current?.focus())
      return
    }

    // Bots füllen das versteckte Feld oder sind in unter drei Sekunden fertig.
    if (werte.webseite || Date.now() - startzeit.current < 3000) {
      setStatus('fertig')
      return
    }

    setStatus('sendet')
    try {
      const antwort = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anliegen: werte.anliegen,
          fahrzeug: werte.fahrzeug,
          ersatzwagen: werte.ersatzwagen,
          wunschtermin: werte.wunschtermin,
          name: werte.name,
          telefon: werte.telefon,
          email: werte.email,
          nachricht: werte.nachricht,
        }),
      })
      if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`)
      setStatus('fertig')
      requestAnimationFrame(() => erfolgRef.current?.focus())
    } catch {
      setStatus('fehler')
    }
  }

  /* --- Bestätigung --- */
  if (status === 'fertig') {
    return (
      <div
        ref={erfolgRef}
        tabIndex={-1}
        className={cn(
          'border-2 border-pruef-500 bg-pruef-100 p-8 sm:p-10',
          'focus-visible:outline-none',
          className,
        )}
      >
        <CheckCircle2 aria-hidden className="size-10 text-pruef-500" strokeWidth={2} />
        <h3 className="mt-5 text-2xl font-extrabold text-ink-900">Anfrage ist bei uns.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-700">
          Wir melden uns innerhalb eines Werktags mit einem Terminvorschlag — telefonisch
          unter der Nummer, die Sie angegeben haben.
        </p>
        <p className="mt-6 text-sm text-ink-600">
          Eilt es? Dann rufen Sie uns einfach direkt an:{' '}
          <a
            href={telHref()}
            className="pos-nummer font-bold text-ink-900 underline decoration-signal-500 decoration-2 underline-offset-4"
          >
            {betrieb.telefon.anzeige}
          </a>
        </p>
      </div>
    )
  }

  const fehlerListe = (Object.entries(fehler) as [keyof Werte, string | undefined][]).filter(
    (e): e is [keyof Werte, string] => Boolean(e[1]),
  )

  return (
    <form
      onSubmit={absenden}
      noValidate
      className={cn('border border-blatt-300 bg-white', className)}
    >
      {/* Kopf des Auftragsblatts */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink-900 bg-blatt-100 px-6 py-4 sm:px-8">
        <span className="katalog-label text-ink-600">Terminanfrage</span>
        <span className="katalog-label text-ink-600">
          Antwort in <span className="text-signal-700">1 Werktag</span>
        </span>
      </div>

      <div className="grid gap-7 px-6 py-8 sm:px-8">
        {/* Fehlerübersicht */}
        {fehlerListe.length > 0 ? (
          <div
            ref={zusammenfassungRef}
            tabIndex={-1}
            role="alert"
            className="border-2 border-signal-700 bg-signal-500/10 p-5 focus-visible:outline-none"
          >
            <p className="flex items-center gap-2.5 font-bold text-ink-900">
              <AlertTriangle aria-hidden className="size-5 text-signal-700" strokeWidth={2.5} />
              Bitte prüfen Sie noch {fehlerListe.length === 1 ? 'eine Angabe' : `${fehlerListe.length} Angaben`}
            </p>
            <ul className="mt-3 grid gap-1.5 pl-8">
              {fehlerListe.map(([feld, text]) => (
                <li key={feld} className="list-disc text-sm text-ink-800">
                  <a href={`#f-${feld}`} className="underline underline-offset-2">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* --- Fahrzeug und Anliegen --- */}
        <fieldset className="grid gap-6">
          <legend className="katalog-label mb-1 text-signal-700">Fahrzeug und Anliegen</legend>

          <Feld id="f-anliegen" label="Worum geht es?" pflicht fehler={fehler.anliegen}>
            <Select
              name="anliegen"
              value={werte.anliegen}
              onChange={(e) => setzen('anliegen', e.target.value)}
            >
              <option value="">Bitte auswählen …</option>
              {anliegen.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </Select>
          </Feld>

          <Feld
            id="f-fahrzeug"
            label="Ihr Fahrzeug"
            pflicht
            hinweis="Marke, Modell und Baujahr genügen — damit wir Teile und Zeit einplanen können."
            fehler={fehler.fahrzeug}
          >
            <Input
              name="fahrzeug"
              autoComplete="off"
              placeholder="z. B. VW Golf VII 1.6 TDI, 2016"
              value={werte.fahrzeug}
              onChange={(e) => setzen('fahrzeug', e.target.value)}
            />
          </Feld>

          <div className="grid gap-6 sm:grid-cols-2">
            <Feld id="f-wunschtermin" label="Ab wann passt es Ihnen?">
              <Input
                name="wunschtermin"
                type="date"
                value={werte.wunschtermin}
                onChange={(e) => setzen('wunschtermin', e.target.value)}
              />
            </Feld>

            <Feld id="f-ersatzwagen" label="Ersatzwagen gewünscht?">
              <Select
                name="ersatzwagen"
                value={werte.ersatzwagen}
                onChange={(e) => setzen('ersatzwagen', e.target.value)}
              >
                <option value="nein">Nein, danke</option>
                <option value="ja">Ja, bitte — kostenlos</option>
              </Select>
            </Feld>
          </div>
        </fieldset>

        {/* --- Erreichbarkeit --- */}
        <fieldset className="grid gap-6 border-t border-blatt-300 pt-7">
          <legend className="katalog-label mb-1 text-signal-700">Wie erreichen wir Sie?</legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <Feld id="f-name" label="Name" pflicht fehler={fehler.name}>
              <Input
                name="name"
                autoComplete="name"
                value={werte.name}
                onChange={(e) => setzen('name', e.target.value)}
              />
            </Feld>

            <Feld
              id="f-telefon"
              label="Telefon"
              pflicht
              hinweis="Wir rufen an — das geht schneller als schreiben."
              fehler={fehler.telefon}
            >
              <Input
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={werte.telefon}
                onChange={(e) => setzen('telefon', e.target.value)}
              />
            </Feld>
          </div>

          <Feld id="f-email" label="E-Mail" fehler={fehler.email}>
            <Input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={werte.email}
              onChange={(e) => setzen('email', e.target.value)}
            />
          </Feld>

          <Feld id="f-nachricht" label="Was sollen wir wissen?">
            <Textarea
              name="nachricht"
              rows={4}
              placeholder="Geräusche, Warnleuchten, wann es auftritt …"
              value={werte.nachricht}
              onChange={(e) => setzen('nachricht', e.target.value)}
            />
          </Feld>
        </fieldset>

        {/*
          Honigtopf — für Menschen unsichtbar, für Bots ein Feld zum Ausfüllen.
          Versteckt über Nullgröße statt über einen negativen Versatz: Letzterer
          ragt aus dem Dokument heraus und erzeugt je nach Browser eine
          waagerechte Scrollleiste.
        */}
        <div aria-hidden className="h-0 w-0 overflow-hidden">
          <label htmlFor="f-webseite">Webseite (bitte frei lassen)</label>
          <input
            id="f-webseite"
            name="webseite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={werte.webseite}
            onChange={(e) => setzen('webseite', e.target.value)}
          />
        </div>

        {/* --- Einwilligung --- */}
        <div className="border-t border-blatt-300 pt-7">
          <div className="flex items-start gap-3.5">
            <input
              id="f-einwilligung"
              name="einwilligung"
              type="checkbox"
              checked={werte.einwilligung}
              onChange={(e) => setzen('einwilligung', e.target.checked)}
              aria-describedby={fehler.einwilligung ? 'f-einwilligung-fehler' : undefined}
              aria-invalid={fehler.einwilligung ? true : undefined}
              className="mt-0.5 size-5 shrink-0 accent-signal-500"
            />
            <label htmlFor="f-einwilligung" className="text-sm leading-relaxed text-ink-700">
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
              gespeichert und verarbeitet werden. Sie werden nicht weitergegeben. Hinweise zum
              Widerruf stehen in der{' '}
              <a
                href="/datenschutz/"
                className="font-semibold text-ink-900 underline decoration-signal-500 decoration-2 underline-offset-2"
              >
                Datenschutzerklärung
              </a>
              .{' '}
              <span aria-hidden className="text-signal-700">
                *
              </span>
            </label>
          </div>
          {fehler.einwilligung ? (
            <p id="f-einwilligung-fehler" className="mt-2 pl-9 text-[0.8125rem] font-bold text-signal-700">
              {fehler.einwilligung}
            </p>
          ) : null}
        </div>

        {/* --- Absenden --- */}
        <div className="grid gap-4">
          <Button type="submit" size="lg" disabled={status === 'sendet'} className="w-full">
            {status === 'sendet' ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Wird gesendet …
              </>
            ) : (
              'Termin anfragen'
            )}
          </Button>

          <p aria-live="polite" className="sr-only">
            {status === 'sendet' ? 'Die Anfrage wird gesendet.' : ''}
          </p>

          <p className="text-center text-[0.8125rem] leading-relaxed text-ink-600">
            Unverbindlich. Sie bekommen einen Terminvorschlag, keinen Vertrag.
          </p>
        </div>

        {/* --- Wenn die Zustellung scheitert --- */}
        {status === 'fehler' ? (
          <div role="alert" className="border-2 border-signal-700 bg-signal-500/10 p-5">
            <p className="font-bold text-ink-900">Das Absenden hat leider nicht geklappt.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Ihre Eingaben stehen noch im Formular. Versuchen Sie es gleich noch einmal — oder
              erreichen Sie uns direkt:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="kontur">
                <a href={telHref()}>
                  <Phone aria-hidden className="size-4" strokeWidth={2.5} />
                  {betrieb.telefon.anzeige}
                </a>
              </Button>
              <Button asChild size="sm" variant="leise">
                <a
                  href={mailHref(
                    `Terminanfrage${werte.fahrzeug ? ` — ${werte.fahrzeug}` : ''}`,
                  )}
                >
                  Per E-Mail schreiben
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  )
}
