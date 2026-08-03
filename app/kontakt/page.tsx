import { Car, Mail, MapPin, Phone, Printer, TrainFront } from 'lucide-react'

import { Sektion, SektionKopf } from '@/components/site/sektion'
import { Terminformular } from '@/components/site/terminformular'
import { Oeffnungszeiten } from '@/components/site/oeffnungszeiten'
import { JsonLd } from '@/components/site/json-ld'
import { betrieb, ganzeAdresse, mailHref, telHref } from '@/lib/betrieb'
import { breadcrumbSchema, seitenMetadata } from '@/lib/seo'

export const metadata = seitenMetadata({
  titel: 'Kontakt, Anfahrt und Öffnungszeiten',
  beschreibung: `Automobile Beckmann, ${ganzeAdresse()}. Telefon ${betrieb.telefon.anzeige}. Werkstatt Mo–Fr 7–17 Uhr, Sa 9–12 Uhr. Termin online anfragen — Antwort innerhalb eines Werktags.`,
  pfad: '/kontakt/',
})

const kartenLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${betrieb.rechtsform}, ${ganzeAdresse()}`,
)}`

export default function KontaktSeite() {
  return (
    <>
      <Sektion grund="negativ" raster className="py-14 lg:py-20">
        <SektionKopf
          als="h1"
          grund="negativ"
          label="Kontakt"
          titel="Rufen Sie an — oder schreiben Sie uns."
          vorspann="Während der Werkstattzeiten geht jemand ran, der Ihnen sofort sagen kann, ob wir es diese Woche noch schaffen. Außerhalb: Formular ausfüllen, wir melden uns."
        />

        <div className="mt-10 grid gap-px bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={telHref()}
            className="group bg-ink-800 p-6 transition-colors hover:bg-ink-700"
          >
            <Phone aria-hidden className="size-5 text-signal-500" strokeWidth={2.5} />
            <span className="katalog-label mt-4 block text-fiche-400">Telefon</span>
            <span className="pos-nummer mt-1.5 block text-lg font-bold text-fiche-100 group-hover:text-signal-500">
              {betrieb.telefon.anzeige}
            </span>
          </a>

          <a
            href={mailHref('Anfrage über die Website')}
            className="group bg-ink-800 p-6 transition-colors hover:bg-ink-700"
          >
            <Mail aria-hidden className="size-5 text-signal-500" strokeWidth={2.5} />
            <span className="katalog-label mt-4 block text-fiche-400">E-Mail</span>
            <span className="mt-1.5 block break-all text-[0.9375rem] font-semibold text-fiche-100 group-hover:text-signal-500">
              {betrieb.email}
            </span>
          </a>

          <div className="bg-ink-800 p-6">
            <Printer aria-hidden className="size-5 text-fiche-400" strokeWidth={2.5} />
            <span className="katalog-label mt-4 block text-fiche-400">Telefax</span>
            <span className="pos-nummer mt-1.5 block text-lg font-bold text-fiche-100">
              {betrieb.telefax}
            </span>
          </div>

          <a
            href={kartenLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-ink-800 p-6 transition-colors hover:bg-ink-700"
          >
            <MapPin aria-hidden className="size-5 text-signal-500" strokeWidth={2.5} />
            <span className="katalog-label mt-4 block text-fiche-400">Adresse</span>
            <span className="mt-1.5 block text-[0.9375rem] font-semibold text-fiche-100 group-hover:text-signal-500">
              {betrieb.adresse.strasse}
              <br />
              {betrieb.adresse.plz} {betrieb.adresse.ort}
              <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fiche-400">
                Route öffnen ↗
              </span>
            </span>
          </a>
        </div>
      </Sektion>

      {/* Formular + Zeiten */}
      <Sektion grund="blatt" id="termin">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SektionKopf
              pos="01"
              label="Terminanfrage"
              titel="Sagen Sie uns, was los ist."
              vorspann="Zwei Minuten. Wir melden uns innerhalb eines Werktags mit einem Terminvorschlag."
            />

            <div className="mt-9 border border-blatt-300 bg-blatt-100 p-6">
              <h2 className="katalog-label mb-5 text-ink-700">Öffnungszeiten</h2>
              <Oeffnungszeiten />
              <p className="mt-6 border-t border-blatt-300 pt-4 text-[0.8125rem] leading-relaxed text-ink-600">
                Fahrzeugannahme und -abholung bitte innerhalb der Werkstattzeiten. Nach
                Absprache geht auch früher.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Terminformular />
          </div>
        </div>
      </Sektion>

      {/* Anfahrt */}
      <Sektion grund="positiv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SektionKopf
              pos="02"
              label="Anfahrt"
              titel="So finden Sie uns."
              vorspann={`${ganzeAdresse()}, im Ortsteil ${betrieb.adresse.ortsteil} im Bremer Süden.`}
            />
            <p className="mt-7 text-[0.8125rem] leading-relaxed text-ink-600">
              Wir binden hier bewusst keine Google-Karte ein — die würde beim Laden Ihre
              IP-Adresse an Google übertragen, bevor Sie zustimmen konnten. Der Link öffnet die
              Karte erst, wenn Sie es wollen.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px border border-blatt-300 bg-blatt-300">
              <li className="flex gap-5 bg-white p-7">
                <Car aria-hidden className="size-6 shrink-0 text-signal-600" strokeWidth={2} />
                <div>
                  <h3 className="font-extrabold text-ink-900">Mit dem Auto</h3>
                  <p className="mt-2 leading-relaxed text-ink-700">
                    Über die A1, Abfahrt Bremen-Arsten, dann Richtung Kattenturm. Der Arsterdamm
                    ist die Hauptachse durch den Ortsteil. Parkplätze gibt es direkt am Hof —
                    Sie müssen nicht suchen.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 bg-white p-7">
                <TrainFront
                  aria-hidden
                  className="size-6 shrink-0 text-signal-600"
                  strokeWidth={2}
                />
                <div>
                  <h3 className="font-extrabold text-ink-900">Mit Bus und Bahn</h3>
                  <p className="mt-2 leading-relaxed text-ink-700">
                    Bremen-Arsten ist über die Linien Richtung Kattenturm und Arsten
                    angebunden. Wenn Sie das Fahrzeug bei uns lassen und weiter müssen, sagen
                    Sie Bescheid — meistens findet sich eine Mitfahrgelegenheit oder ein
                    Ersatzwagen.
                  </p>
                </div>
              </li>
              <li className="bg-white p-7">
                <a
                  href={kartenLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-signal-700 underline decoration-2 underline-offset-4 hover:text-ink-900"
                >
                  <MapPin aria-hidden className="size-4" strokeWidth={2.5} />
                  Route in Google Maps öffnen
                  <span className="sr-only">(öffnet in einem neuen Tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Sektion>

      <JsonLd
        daten={breadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Kontakt', url: '/kontakt/' },
        ])}
      />
    </>
  )
}
