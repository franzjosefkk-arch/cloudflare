import Link from 'next/link'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sektion, SektionKopf } from '@/components/site/sektion'
import { JsonLd } from '@/components/site/json-ld'
import { betrieb, ganzeAdresse, telHref, versprechen } from '@/lib/betrieb'
import { breadcrumbSchema, seitenMetadata } from '@/lib/seo'

export const metadata = seitenMetadata({
  titel: 'Der Betrieb — Familienbetrieb in Bremen-Arsten seit 1986',
  beschreibung:
    'Automobile Beckmann: 1986 von Frank und Helga Beckmann gegründet, heute Kfz-Meisterwerkstatt unter Stefan und Helga Beckmann. Am Arsterdamm 85 in Bremen-Arsten.',
  pfad: '/ueber-uns/',
})

const jahre = new Date().getFullYear() - betrieb.gruendungsjahr

/** Was belegbar ist, steht hier. Was nicht, steht nicht hier. */
const chronik = [
  {
    jahr: '1986',
    titel: 'Der Anfang auf dem Tankstellenhof',
    text: 'Frank und Helga Beckmann fangen am Arsterdamm mit dem Handel gebrauchter Fahrzeuge an — auf dem Gelände einer ehemaligen Tankstelle.',
  },
  {
    jahr: 'Später',
    titel: 'Aus dem Handel wird eine Meisterwerkstatt',
    text: 'Stefan Beckmann steigt als gelernter Kfz-Mechaniker in den Betrieb der Eltern ein. Aus dem Fahrzeughandel wird eine Kfz-Meisterwerkstatt für alle Marken.',
  },
  {
    jahr: 'Heute',
    titel: `${jahre} Jahre an derselben Adresse`,
    text: `Werkstatt und Fahrzeughandel unter einem Dach, geführt von Stefan und Helga Beckmann. Immer noch ${ganzeAdresse()}.`,
  },
] as const

export default function UeberUnsSeite() {
  return (
    <>
      <Sektion grund="negativ" raster className="py-14 lg:py-20">
        <SektionKopf
          als="h1"
          grund="negativ"
          label={`Der Betrieb · seit ${betrieb.gruendungsjahr}`}
          titel={
            <>
              Ein Familienbetrieb, der
              <br />
              <span className="text-signal-500">nicht umgezogen ist.</span>
            </>
          }
          vorspann={`Seit ${jahre} Jahren dieselbe Straße, dieselbe Familie. Das ist keine Marketingzeile, sondern der Grund, warum die meisten unserer Kunden wiederkommen: Wer bleiben will, kann es sich nicht leisten, jemanden über den Tisch zu ziehen.`}
        />
      </Sektion>

      <Sektion grund="blatt">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SektionKopf pos="01" label="Chronik" titel="Wie es dazu kam." />
          </div>

          <div className="lg:col-span-8">
            <ol className="border-t-2 border-ink-900">
              {chronik.map((c) => (
                <li
                  key={c.jahr}
                  className="grid gap-x-8 gap-y-2 border-b border-blatt-300 py-7 sm:grid-cols-[7rem_1fr]"
                >
                  <span className="pos-nummer text-sm text-signal-700">{c.jahr}</span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
                      {c.titel}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-700">{c.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Platzhalter für das Team — ehrlich als solcher gekennzeichnet */}
            <div className="mt-10 border-2 border-dashed border-blatt-300 p-7">
              <p className="katalog-label text-signal-700">Platzhalter · Team</p>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-700">
                Hier gehören die Menschen hin, die an den Fahrzeugen arbeiten: Foto, Vorname,
                Funktion und seit wann sie dabei sind. Für einen Betrieb, der von Vertrauen
                lebt, ist das die stärkste Stelle der ganzen Seite — und die einzige, die kein
                Wettbewerber kopieren kann.
              </p>
              <p className="mt-4 text-[0.8125rem] text-ink-600">
                Fotos und Namen liegen beim Bau der Seite nicht vor. Siehe AUSTAUSCHLISTE.md.
              </p>
            </div>
          </div>
        </div>
      </Sektion>

      <Sektion grund="positiv">
        <SektionKopf
          pos="02"
          label="Wofür wir geradestehen"
          titel="Vier Zusagen, die wir schriftlich geben würden."
        />
        <ul className="mt-12 grid gap-px border border-blatt-300 bg-blatt-300 sm:grid-cols-2 lg:grid-cols-4">
          {versprechen.map((v) => (
            <li key={v.pos} className="bg-white p-7">
              <span className="pos-nummer grid size-8 place-items-center bg-ink-900 text-xs text-fiche-100">
                {v.pos}
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">
                {v.titel}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">{v.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      <Sektion grund="negativ">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SektionKopf
            grund="negativ"
            titel="Kommen Sie vorbei — oder rufen Sie vorher an."
            className="lg:max-w-xl"
          />
          <div className="flex flex-wrap gap-3.5">
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
        </div>
      </Sektion>

      <JsonLd
        daten={breadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Der Betrieb', url: '/ueber-uns/' },
        ])}
      />
    </>
  )
}
