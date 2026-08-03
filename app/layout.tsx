import type { Metadata, Viewport } from 'next'
import { Archivo, Chivo_Mono } from 'next/font/google'

import { Kopfzeile } from '@/components/site/kopfzeile'
import { Fusszeile } from '@/components/site/fusszeile'
import { MobilLeiste } from '@/components/site/mobil-leiste'
import { JsonLd } from '@/components/site/json-ld'
import { Richtungsvertrag } from '@/components/site/richtungsvertrag'
import { betrieb } from '@/lib/betrieb'
import { betriebSchema } from '@/lib/seo'

import './globals.css'

/**
 * Archivo trägt die Stimme des Katalogs: eine Grotesk mit Kante, die in
 * schweren Schnitten laut wird, ohne zu schreien. Chivo Mono setzt die
 * Positionsnummern und technischen Marken — dieselbe Familie, andere Aufgabe.
 */
// Beide sind Variable Fonts. Ohne `weight` lädt next/font eine einzige Datei
// je Familie, die den ganzen Schnittbereich abdeckt, statt sechs Einzeldateien.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--schrift-display',
  display: 'swap',
})

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--schrift-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(betrieb.url),
  title: {
    default:
      'Automobile Beckmann — Kfz-Meisterwerkstatt in Bremen-Arsten für alle Marken',
    template: '%s | Automobile Beckmann Bremen',
  },
  description:
    'Freie Kfz-Meisterwerkstatt in Bremen-Arsten seit 1986. Inspektion mit Garantieerhalt, HU und AU mit DEKRA im Haus, Klimaservice, Bremsen, Diagnose, Unfall und Lack. Kostenloser Ersatzwagen. Termin: 0421 87 50 40.',
  applicationName: betrieb.name,
  authors: [{ name: betrieb.rechtsform }],
  generator: null,
  keywords: [
    'Autowerkstatt Bremen',
    'Kfz-Meisterwerkstatt Bremen',
    'Werkstatt Bremen Arsten',
    'HU AU Bremen',
    'Inspektion Bremen',
    'Klimaservice Bremen',
    'Unfallinstandsetzung Bremen',
    'Freie Werkstatt Bremen',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1826',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${archivo.variable} ${chivoMono.variable}`}>
      <body className="min-h-dvh bg-blatt-100 antialiased">
        <Richtungsvertrag />

        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-signal-500 focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-ink-950"
        >
          Zum Inhalt springen
        </a>

        <Kopfzeile />
        <main id="inhalt">{children}</main>
        <Fusszeile />
        <MobilLeiste />

        <JsonLd daten={betriebSchema()} />
      </body>
    </html>
  )
}
