import Link from 'next/link'
import { ArrowUpRight, BadgeEuro, FileCheck2, Phone, ShieldCheck, Wrench } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sektion, SektionKopf } from '@/components/site/sektion'
import { Fragen } from '@/components/site/fragen'
import { JsonLd } from '@/components/site/json-ld'
import { betrieb, telHref, verkaufszeiten } from '@/lib/betrieb'
import { breadcrumbSchema, faqSchema, seitenMetadata } from '@/lib/seo'

export const metadata = seitenMetadata({
  titel: 'Gebrauchtwagen in Bremen — geprüft, mit Garantie',
  beschreibung:
    'Gebrauchtwagen bei Automobile Beckmann in Bremen-Arsten: geprüfte Fahrzeuge mit Garantie, dazu Finanzierung, Leasing, Versicherung und Zulassungsservice. Werkstatt im selben Haus.',
  pfad: '/fahrzeuge/',
})

const vorteile = [
  {
    pos: '01',
    icon: Wrench,
    titel: 'Die Werkstatt steht daneben',
    text: 'Jedes Fahrzeug geht vor dem Verkauf durch dieselbe Meisterwerkstatt, die es danach wartet. Wer hier etwas übersieht, bekommt es selbst zurück auf die Hebebühne.',
  },
  {
    pos: '02',
    icon: ShieldCheck,
    titel: 'Mit Garantie',
    text: 'Unsere Gebrauchtwagen werden mit Garantie verkauft. Welche Laufzeit und welcher Umfang für ein bestimmtes Fahrzeug gilt, sagen wir Ihnen beim Fahrzeug.',
  },
  {
    pos: '03',
    icon: BadgeEuro,
    titel: 'Finanzierung und Leasing',
    text: 'Wir vermitteln Finanzierung, Leasing und Versicherung — Sie müssen dafür nicht zur Bank und nicht zu einem zweiten Ansprechpartner.',
  },
  {
    pos: '04',
    icon: FileCheck2,
    titel: 'Zulassung übernehmen wir',
    text: 'Auf Wunsch melden wir das Fahrzeug für Sie an. Sie holen es fertig zugelassen ab, mit Kennzeichen dran.',
  },
] as const

const fahrzeugFragen = [
  {
    frage: 'Wo sehe ich, welche Fahrzeuge gerade da sind?',
    antwort:
      'Der aktuelle Bestand steht auf unserem Händlerprofil bei AutoScout24 und mobile.de — dort ist er immer tagesaktuell. Rufen Sie gern an, wenn Sie etwas Bestimmtes suchen: Wir bekommen regelmäßig Fahrzeuge herein, die noch nicht online stehen.',
  },
  {
    frage: 'Kann ich mein altes Auto in Zahlung geben?',
    antwort:
      'Sprechen Sie uns darauf an. Bringen Sie das Fahrzeug mit, dann können wir es uns ansehen und Ihnen sagen, was wir dafür anrechnen können.',
  },
  {
    frage: 'Bekomme ich eine Probefahrt?',
    antwort:
      'Ja. Melden Sie sich vorher kurz an, damit das Fahrzeug bereitsteht und versichert ist. Bringen Sie Ihren Führerschein mit.',
  },
  {
    frage: 'Was ist, wenn nach dem Kauf etwas ist?',
    antwort:
      'Dann kommen Sie damit zu uns. Werkstatt und Verkauf sind derselbe Betrieb — Sie werden nicht zwischen Händler und Werkstatt hin- und hergeschickt.',
  },
] as const

export default function FahrzeugeSeite() {
  return (
    <>
      <Sektion grund="negativ" raster className="py-14 lg:py-20">
        <SektionKopf
          als="h1"
          grund="negativ"
          label="Fahrzeugverkauf"
          titel={
            <>
              Gebrauchtwagen von Leuten,
              <br />
              <span className="text-signal-500">die sie danach reparieren.</span>
            </>
          }
          vorspann="Wir verkaufen seit 1986 Fahrzeuge und schrauben seitdem auch daran. Das ist der ganze Unterschied: Ein Mangel, den wir beim Verkauf übersehen, kommt zu uns zurück — nicht zu jemand anderem."
        />

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button asChild size="lg">
            <a href={betrieb.portale.autoscout} target="_blank" rel="noopener noreferrer">
              Fahrzeugbestand ansehen
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
              <span className="sr-only">(öffnet AutoScout24 in einem neuen Tab)</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="konturNegativ">
            <a href={telHref()}>
              <Phone aria-hidden className="size-4" strokeWidth={2.5} />
              {betrieb.telefon.anzeige}
            </a>
          </Button>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-fiche-400">
          Der Bestand wird auf den Fahrzeugportalen gepflegt und ist dort tagesaktuell — auf
          dieser Seite stünde er unweigerlich veraltet.
        </p>
      </Sektion>

      <Sektion grund="blatt">
        <SektionKopf
          pos="01"
          label="Warum bei uns"
          titel="Vier Gründe, die ein reiner Händler nicht hat."
        />
        <ul className="mt-12 grid gap-px border border-blatt-300 bg-blatt-300 sm:grid-cols-2">
          {vorteile.map((v) => (
            <li key={v.pos} className="bg-white p-7 lg:p-9">
              <div className="flex items-center justify-between">
                <v.icon aria-hidden className="size-7 text-ink-700" strokeWidth={1.75} />
                <span className="pos-nummer text-sm text-blatt-500">{v.pos}</span>
              </div>
              <h2 className="mt-6 text-xl font-extrabold tracking-tight text-ink-900">
                {v.titel}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-700">{v.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      <Sektion grund="positiv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SektionKopf pos="02" label="Verkauf" titel="Wann Sie uns antreffen." />
            <dl className="mt-8">
              {verkaufszeiten.map((z) => (
                <div
                  key={z.tage}
                  className="flex items-baseline justify-between gap-4 border-b border-blatt-300 py-3"
                >
                  <dt className="text-ink-700">{z.tage}</dt>
                  <dd className="pos-nummer whitespace-nowrap font-bold text-ink-900">
                    {z.anzeige}
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-b border-blatt-300 py-3">
                <dt className="text-ink-700">Samstag</dt>
                <dd className="text-ink-600">geschlossen</dd>
              </div>
            </dl>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-700">
              Für eine Probefahrt melden Sie sich am besten vorher an — dann steht das Fahrzeug
              bereit und ist versichert.
            </p>
            <div className="mt-7">
              <Button asChild variant="kontur">
                <Link href="/kontakt/#termin">Fahrzeug anfragen</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="katalog-label text-ink-600">Häufige Fragen zum Fahrzeugkauf</h2>
            <div className="mt-6">
              <Fragen fragen={fahrzeugFragen} />
            </div>
          </div>
        </div>
      </Sektion>

      <JsonLd
        daten={breadcrumbSchema([
          { name: 'Startseite', url: '/' },
          { name: 'Fahrzeuge', url: '/fahrzeuge/' },
        ])}
      />
      <JsonLd daten={faqSchema(fahrzeugFragen)} />
    </>
  )
}
