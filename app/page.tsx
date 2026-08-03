import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Stamp,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Explosionszeichnung } from '@/components/site/explosionszeichnung'
import { Sektion, SektionKopf } from '@/components/site/sektion'
import { Oeffnungszeiten } from '@/components/site/oeffnungszeiten'
import { Terminformular } from '@/components/site/terminformular'
import { Bewertungen } from '@/components/site/bewertungen'
import { Fragen } from '@/components/site/fragen'
import { JsonLd } from '@/components/site/json-ld'
import { ablauf, betrieb, ganzeAdresse, leistungen, telHref, versprechen } from '@/lib/betrieb'
import { faqSchema, seitenMetadata } from '@/lib/seo'

export const metadata = seitenMetadata({
  titel: 'Kfz-Meisterwerkstatt in Bremen-Arsten — für alle Marken',
  beschreibung:
    'Freie Werkstatt in Bremen seit 1986: Inspektion ohne Garantieverlust, HU und AU mit DEKRA im Haus, Klimaservice, Bremsen, Diagnose, Unfall und Lack. Kostenloser Ersatzwagen, Preis vor der Reparatur. Termin: 0421 87 50 40.',
  pfad: '/',
})

/** Die drei Wege, die die Seite anbietet — nach Auftragswert geordnet. */
const wege = [
  {
    pos: 'I',
    titel: 'Werkstatt & Wartung',
    text: 'Inspektion, HU, Bremsen, Klima, Diagnose. Alles für alle Marken, mit Eintrag ins digitale Serviceheft.',
    href: '/leistungen/',
    cta: 'Leistungen ansehen',
    icon: Wrench,
  },
  {
    pos: 'II',
    titel: 'Unfall & Lackierung',
    text: 'Blech, Rahmen, Lack und Glas. Wir wickeln mit Ihrer Versicherung ab — bei fremdem Verschulden zahlt die Gegenseite.',
    href: '/leistungen/unfall-und-lackierung/',
    cta: 'Unfallhilfe',
    icon: ShieldCheck,
  },
  {
    pos: 'III',
    titel: 'Gebrauchtwagen',
    text: 'Geprüfte Fahrzeuge mit Garantie, dazu Finanzierung, Versicherung und Zulassung auf Wunsch.',
    href: '/fahrzeuge/',
    cta: 'Fahrzeuge',
    icon: CarFront,
  },
] as const

const startseitenFragen = [
  {
    frage: 'Verliere ich die Herstellergarantie, wenn ich zu einer freien Werkstatt gehe?',
    antwort:
      'Nein. Wartung und Inspektion dürfen in jeder qualifizierten Werkstatt erfolgen, solange nach Herstellervorgabe gearbeitet und freigegebenes Material verwendet wird. Wir tragen den Service in das elektronische Serviceheft des Herstellers ein — Ihre Historie bleibt lückenlos.',
  },
  {
    frage: 'Bekomme ich einen Ersatzwagen, während mein Auto in der Werkstatt ist?',
    antwort:
      'Ja, und er kostet Sie nichts. Bitte geben Sie den Wunsch bei der Terminanfrage mit an, damit wir ein Fahrzeug für Sie reservieren.',
  },
  {
    frage: 'Erfahre ich den Preis, bevor gearbeitet wird?',
    antwort:
      'Ja. Sie bekommen den Preis vor der Reparatur. Stellt sich bei der Arbeit heraus, dass etwas dazukommt, rufen wir an — ohne Ihre Zustimmung wird nichts gemacht.',
  },
  {
    frage: 'Kann ich die Hauptuntersuchung bei Ihnen machen lassen?',
    antwort:
      'Ja. Die DEKRA nimmt bei uns im Haus ab. Wir prüfen vorher, was durchfallen würde, nennen Ihnen den Preis für die Behebung und reparieren direkt — so entfällt die Nachuntersuchung samt Gebühr.',
  },
  {
    frage: 'Welche Marken reparieren Sie?',
    antwort:
      'Alle gängigen. Wir haben Zugriff auf die technischen Herstellerinformationen und markenübergreifende Diagnosetechnik, dazu das elektronische Serviceheft für unter anderem Mercedes, VW, Audi, Škoda, Seat und Honda. Transporter warten wir bis 5 Tonnen.',
  },
  {
    frage: 'Wo genau finde ich Sie?',
    antwort: `${ganzeAdresse()}, im Ortsteil Arsten. Parkplätze gibt es direkt am Hof. Von der A1, Abfahrt Bremen-Arsten, sind es wenige Minuten.`,
  },
] as const

export default function Startseite() {
  return (
    <>
      {/* ============================================================
          Erster Blick: die Explosionszeichnung
          ============================================================ */}
      <section className="auf-negativ raster-negativ relative overflow-hidden bg-ink-900 px-5 pb-12 pt-9 sm:px-8 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="katalog-label animiert-auf text-signal-500">
                Kfz-Meisterbetrieb Bremen-Arsten · seit {betrieb.gruendungsjahr}
              </p>

              <h1
                className="animiert-auf mt-4 text-balance text-[2.25rem] leading-[1.0] text-fiche-100 sm:text-5xl lg:text-[3.375rem]"
                style={{ animationDelay: '60ms' }}
              >
                Alles an Ihrem Auto.
                <br />
                <span className="text-signal-500">Eine Werkstatt.</span>
                <br />
                Jede Position benannt.
              </h1>

              <p
                className="animiert-auf mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-fiche-300"
                style={{ animationDelay: '120ms' }}
              >
                Freie Werkstatt für alle Marken — mit DEKRA im Haus, kostenlosem Ersatzwagen
                und dem Preis auf dem Tisch, bevor der Schlüssel gedreht wird. Die
                Herstellergarantie bleibt dabei erhalten.
              </p>

              <div
                className="animiert-auf mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center"
                style={{ animationDelay: '180ms' }}
              >
                <Button asChild size="lg">
                  <Link href="/kontakt/#termin">
                    Termin anfragen
                    <ArrowRight aria-hidden className="size-4" strokeWidth={2.5} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="konturNegativ">
                  <a href={telHref()}>
                    <Phone aria-hidden className="size-4" strokeWidth={2.5} />
                    {betrieb.telefon.anzeige}
                  </a>
                </Button>
              </div>
            </div>

            {/* Vertrauensspalte — direkt neben der Handlung, nicht irgendwo unten */}
            <div className="lg:col-span-5 lg:pb-2">
              <ul
                className="animiert-auf grid gap-x-7 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1"
                style={{ animationDelay: '240ms' }}
              >
                {[
                  {
                    icon: Star,
                    text: (
                      <>
                        <span className="pos-nummer text-fiche-100">
                          {betrieb.bewertung.schnitt.toLocaleString('de-DE')} von 5
                        </span>{' '}
                        aus {betrieb.bewertung.anzahl} Bewertungen
                      </>
                    ),
                  },
                  { icon: Stamp, text: <>HU-Abnahme durch die DEKRA im Haus</> },
                  { icon: CarFront, text: <>Werkstattersatzwagen kostenlos</> },
                  {
                    icon: BadgeCheck,
                    text: (
                      <>
                        Über {new Date().getFullYear() - betrieb.gruendungsjahr} Jahre in
                        Familienhand
                      </>
                    ),
                  },
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-fiche-300">
                    <p.icon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-signal-500"
                      strokeWidth={2.5}
                    />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Die Zeichnung */}
          <Explosionszeichnung className="mt-8 lg:mt-10" />
        </div>
      </section>

      {/* ============================================================
          Die drei Wege
          ============================================================ */}
      <Sektion grund="positiv">
        <SektionKopf
          pos="A"
          label="Weswegen sind Sie hier?"
          titel="Drei Wege — wählen Sie den, der zu Ihnen passt."
        />

        <div className="mt-12 grid gap-px border border-blatt-300 bg-blatt-300 md:grid-cols-3">
          {wege.map((w) => (
            <Link
              key={w.href}
              href={w.href}
              className="group relative flex flex-col bg-white p-7 transition-colors duration-200 hover:bg-blatt-50 lg:p-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <w.icon aria-hidden className="size-7 text-ink-700" strokeWidth={1.75} />
                <span className="pos-nummer text-sm text-blatt-500">{w.pos}</span>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
                {w.titel}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-700">{w.text}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-signal-700">
                {w.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1.5"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          ))}
        </div>
      </Sektion>

      {/* ============================================================
          Der Mechanismus: das digitale Serviceheft
          ============================================================ */}
      <Sektion grund="negativ" raster>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SektionKopf
              grund="negativ"
              pos="B"
              label="Der Unterschied"
              titel={
                <>
                  Freie Werkstatt fahren.
                  <br />
                  <span className="text-signal-500">Herstellergarantie behalten.</span>
                </>
              }
              vorspann={
                <>
                  Der häufigste Grund, beim teuren Vertragshändler zu bleiben, ist ein
                  Missverständnis: dass die Garantie an die Marke gebunden sei. Ist sie nicht.
                  Sie ist an die Vorgabe gebunden.
                </>
              }
            />

            <div className="mt-8 space-y-5 text-fiche-300">
              <p className="leading-relaxed">
                Wir warten nach Herstellervorgabe, verwenden freigegebene Öle und Teile — und
                tragen jeden Service in das <strong className="text-fiche-100">elektronische
                Serviceheft</strong> des Herstellers ein. Für Mercedes, VW, Audi, Škoda, Seat,
                Honda und weitere.
              </p>
              <p className="leading-relaxed">
                Das Ergebnis: Ihre Servicehistorie bleibt lückenlos und beim Wiederverkauf
                nachweisbar. Sie zahlen nur nicht mehr den Stundensatz eines Vertragshändlers.
              </p>
            </div>

            <div className="mt-9">
              <Button asChild variant="fiche">
                <Link href="/leistungen/inspektion-und-wartung/">
                  Wie die Inspektion abläuft
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2.5} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Die vier Versprechen als Katalogpositionen */}
          <div className="lg:col-span-6">
            <ul className="grid gap-px bg-ink-700 sm:grid-cols-2">
              {versprechen.map((v) => (
                <li key={v.pos} className="bg-ink-800 p-7">
                  <span className="pos-nummer grid size-8 place-items-center border border-signal-500 text-xs text-signal-500">
                    {v.pos}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-fiche-100">{v.titel}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fiche-300">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sektion>

      {/* ============================================================
          Leistungen als Katalogtabelle
          ============================================================ */}
      <Sektion grund="blatt">
        <SektionKopf
          pos="C"
          label="Positionsverzeichnis"
          titel="Was wir machen — und was das für Sie heißt."
          vorspann="Sechs Positionen decken ab, weswegen ein Auto in die Werkstatt kommt. Jede führt zu einer Seite, die den häufigsten Einwand dazu beantwortet."
        />

        <ul className="mt-12 border-t-2 border-ink-900">
          {leistungen.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/leistungen/${l.slug}/`}
                className="group grid items-baseline gap-x-6 gap-y-2 border-b border-blatt-300 py-6 transition-colors duration-150 hover:bg-blatt-100 sm:grid-cols-[3.5rem_minmax(0,15rem)_1fr_auto] sm:py-7"
              >
                <span className="pos-nummer text-sm text-blatt-500 transition-colors group-hover:text-signal-500">
                  {l.pos}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900 transition-colors group-hover:text-signal-700">
                  {l.titel}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-700">{l.kurz}</p>
                <ArrowRight
                  aria-hidden
                  className="hidden size-5 self-center text-blatt-500 transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-signal-500 sm:block"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* ============================================================
          Ablauf — was passiert nach der Anfrage
          ============================================================ */}
      <Sektion grund="positiv">
        <SektionKopf
          pos="D"
          label="Ablauf"
          titel="Was passiert, wenn Sie anfragen."
          vorspann="Damit Sie wissen, worauf Sie sich einlassen — bevor Sie das Formular ausfüllen."
        />

        <ol className="mt-12 grid gap-px bg-blatt-300 md:grid-cols-4">
          {ablauf.map((s) => (
            <li key={s.pos} className="bg-white p-7">
              <span className="pos-nummer block text-3xl text-signal-700">{s.pos}</span>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-900">
                {s.titel}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </Sektion>

      {/* ============================================================
          Vertrauen
          ============================================================ */}
      <Bewertungen />

      {/* ============================================================
          Anfrage + Anfahrt
          ============================================================ */}
      <Sektion grund="blatt" id="termin">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SektionKopf
              pos="E"
              label="Terminanfrage"
              titel="Sagen Sie uns, was los ist."
              vorspann="Zwei Minuten. Wir melden uns innerhalb eines Werktags mit einem Terminvorschlag — und wo möglich mit einer Preisspanne."
            />

            <div className="mt-9 border-2 border-ink-900 bg-blatt-100">
              <p className="flex items-center gap-2.5 bg-signal-500 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-950">
                <Clock3 aria-hidden className="size-4" strokeWidth={2.5} />
                Eilt es?
              </p>
              <div className="p-6">
                <p className="leading-relaxed text-ink-800">
                  Rufen Sie an. Während der Werkstattzeiten geht jemand ran, der Ihnen sofort
                  sagen kann, ob wir es diese Woche noch schaffen.
                </p>
                <a
                  href={telHref()}
                  className="pos-nummer mt-4 inline-block text-2xl font-bold text-ink-900 underline decoration-signal-500 decoration-[3px] underline-offset-[6px] transition-colors hover:text-signal-700"
                >
                  {betrieb.telefon.anzeige}
                </a>
              </div>
            </div>

            <div className="mt-10 border border-blatt-300 bg-blatt-100 p-6">
              <h3 className="katalog-label mb-5 flex items-center gap-2.5 text-ink-700">
                <MapPin aria-hidden className="size-4 text-signal-700" strokeWidth={2.5} />
                {ganzeAdresse()}
              </h3>
              <Oeffnungszeiten />
            </div>
          </div>

          <div className="lg:col-span-6">
            <Terminformular />
          </div>
        </div>
      </Sektion>

      {/* ============================================================
          Häufige Fragen
          ============================================================ */}
      <Sektion grund="positiv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SektionKopf pos="F" label="Häufige Fragen" titel="Das werden wir oft gefragt." />
          </div>
          <div className="lg:col-span-8">
            <Fragen fragen={startseitenFragen} />
          </div>
        </div>
      </Sektion>

      <JsonLd daten={faqSchema(startseitenFragen)} />
    </>
  )
}
