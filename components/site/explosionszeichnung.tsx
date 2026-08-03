'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { leistungen } from '@/lib/betrieb'
import { cn } from '@/lib/utils'

/**
 * Die Explosionszeichnung — das Signaturstück der Seite.
 *
 * Ein Fahrzeug in Haarlinien auf dem Mikrofiche-Negativ. Sechs Positionen
 * zeigen auf die Stellen, an denen wir arbeiten. Zeichnung und Legende sind
 * dasselbe Steuerelement: Wer eine Position in der Legende berührt, sieht sie
 * in der Zeichnung aufleuchten — und umgekehrt.
 *
 * Die Zeichnung selbst ist dekorativ (aria-hidden). Die zugängliche Fassung
 * ist die Legende darunter: eine gewöhnliche Liste von Links.
 */

/** Wo eine Position am Fahrzeug sitzt und wo ihre Marke steht. */
type Marke = {
  /** Punkt am Fahrzeug */
  px: number
  py: number
  /** Mittelpunkt der Positionsmarke */
  mx: number
  my: number
}

const marken: Record<string, Marke> = {
  '01': { px: 268, py: 342, mx: 196, my: 148 },
  '02': { px: 1016, py: 372, mx: 1116, my: 186 },
  '03': { px: 330, py: 415, mx: 296, my: 528 },
  '04': { px: 512, py: 300, mx: 468, my: 126 },
  '05': { px: 618, py: 274, mx: 706, my: 114 },
  '06': { px: 812, py: 366, mx: 902, my: 528 },
}

/** Karosserie, Verglasung, Räder — alles Haarlinie, nichts gefüllt. */
function Fahrzeug() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Karosserie */}
      <path
        d="M176 415 L176 372 C176 352 188 340 208 336 L424 318 L548 222
           C556 215 566 212 578 212 L792 212 C806 212 816 216 823 225
           L906 292 L1006 306 C1020 309 1030 321 1030 338 L1030 415
           L942 415 A62 62 0 0 0 818 415 L392 415 A62 62 0 0 0 268 415 Z"
        strokeWidth={2.5}
      />

      {/* Verglasung */}
      <path d="M456 314 L570 226 L678 226 L678 314 Z" strokeWidth={1.5} />
      <path d="M694 226 L794 226 L878 292 L694 314 Z" strokeWidth={1.5} />

      {/* Türfugen */}
      <path d="M448 320 L448 415" strokeWidth={1.5} />
      <path d="M686 224 L686 415" strokeWidth={1.5} />

      {/* Türgriffe */}
      <path d="M612 340 h36" strokeWidth={3} />
      <path d="M752 340 h36" strokeWidth={3} />

      {/* Außenspiegel */}
      <path d="M452 306 L428 300 L426 312 L452 314" strokeWidth={1.5} />

      {/* Leuchten */}
      <path d="M178 350 L214 342 L216 362 L178 368" strokeWidth={1.5} />
      <path d="M1010 318 h20 v28 h-20 Z" strokeWidth={1.5} />

      {/* Schweller */}
      <path d="M392 415 L818 415" strokeWidth={1.5} opacity={0.5} />

      {/* Räder */}
      {[330, 880].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={415} r={62} strokeWidth={2.5} />
          <circle cx={cx} cy={415} r={36} strokeWidth={1.5} />
          <circle cx={cx} cy={415} r={7} strokeWidth={1.5} />
          {[0, 72, 144, 216, 288].map((grad) => {
            const rad = (grad * Math.PI) / 180
            return (
              <path
                key={grad}
                d={`M${cx + Math.cos(rad) * 9} ${415 + Math.sin(rad) * 9}
                    L${cx + Math.cos(rad) * 34} ${415 + Math.sin(rad) * 34}`}
                strokeWidth={1.5}
                opacity={0.7}
              />
            )
          })}
        </g>
      ))}

      {/* Standlinie */}
      <path d="M104 478 H1096" strokeWidth={1.5} strokeDasharray="2 9" opacity={0.55} />
    </g>
  )
}

export function Explosionszeichnung({ className }: { className?: string }) {
  const [aktiv, setAktiv] = React.useState<string | null>(null)

  return (
    <div className={cn('grid gap-8 lg:gap-10', className)}>
      {/* --- Die Zeichnung --- */}
      {/*
        Die Zeichnung hält oben und unten Platz für die Positionsmarken frei.
        Sind die Marken auf kleinen Bildschirmen ausgeblendet, ist dieser Platz
        nur noch Leere — also wird er dort weggeschnitten und das Fahrzeug
        dadurch anderthalbmal so groß.
      */}
      <div className="relative mx-auto w-full overflow-hidden lg:max-w-[64rem]">
        <svg
          viewBox="0 0 1200 560"
          className="-mb-[6%] -mt-[15%] w-full text-fiche-300 sm:mb-0 sm:mt-0"
          role="presentation"
          aria-hidden="true"
          focusable="false"
        >
          <Fahrzeug />

          {leistungen.map((l, i) => {
            const m = marken[l.pos]
            if (!m) return null
            const ist = aktiv === l.pos

            // Leitlinie endet am Rand der Marke, nicht in ihrer Mitte.
            const dx = m.px - m.mx
            const dy = m.py - m.my
            const laenge = Math.hypot(dx, dy) || 1
            const startX = m.mx + (dx / laenge) * 23
            const startY = m.my + (dy / laenge) * 23

            return (
              <g key={l.pos}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={m.px}
                  y2={m.py}
                  pathLength={100}
                  stroke={ist ? 'var(--color-signal-500)' : 'currentColor'}
                  strokeWidth={ist ? 2 : 1.25}
                  strokeDasharray={100}
                  // Unter 640 px wäre die Positionsnummer nur noch fünf Pixel
                  // hoch. Dann trägt die Legende die Nummern allein, und die
                  // Zeichnung bleibt eine ruhige Linienzeichnung.
                  className="animiert-linie hidden transition-[stroke,stroke-width] duration-200 sm:block"
                  style={{
                    // Linien ziehen sich nacheinander auf, wie beim Aufklappen
                    // einer Katalogseite.
                    ['--linien-laenge' as string]: '100',
                    animationDelay: `${320 + i * 90}ms`,
                  }}
                />

                {/* Ansatzpunkt am Fahrzeug — bleibt auch auf dem Telefon */}
                <circle
                  cx={m.px}
                  cy={m.py}
                  r={ist ? 7 : 5}
                  fill="var(--color-signal-500)"
                  className="transition-all duration-200"
                />

                {/* Positionsmarke */}
                <g
                  className="animiert-marke hidden sm:block"
                  style={{
                    ['--von-x' as string]: `${(m.px - m.mx) * 0.55}px`,
                    ['--von-y' as string]: `${(m.py - m.my) * 0.55}px`,
                    animationDelay: `${260 + i * 90}ms`,
                    transformOrigin: `${m.mx}px ${m.my}px`,
                  }}
                >
                  <circle
                    cx={m.mx}
                    cy={m.my}
                    r={22}
                    fill={ist ? 'var(--color-signal-500)' : 'var(--color-ink-900)'}
                    stroke={ist ? 'var(--color-signal-500)' : 'currentColor'}
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                  <text
                    x={m.mx}
                    y={m.my + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pos-nummer"
                    fontSize={16}
                    fill={ist ? 'var(--color-ink-950)' : 'var(--color-fiche-200)'}
                  >
                    {l.pos}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>
      </div>

      {/* --- Die Legende: die zugängliche Fassung derselben Information --- */}
      <nav aria-label="Positionen am Fahrzeug">
        <h2 className="katalog-label mb-4 text-fiche-400">
          Positionen — was wir an Ihrem Fahrzeug machen
        </h2>
        <ul className="grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {leistungen.map((l) => (
            <li key={l.pos}>
              <Link
                href={`/leistungen/${l.slug}/`}
                onMouseEnter={() => setAktiv(l.pos)}
                onMouseLeave={() => setAktiv(null)}
                onFocus={() => setAktiv(l.pos)}
                onBlur={() => setAktiv(null)}
                className={cn(
                  'group flex items-center gap-3 border-b border-ink-700 py-3.5',
                  'transition-colors duration-150 hover:border-signal-500 focus-visible:border-signal-500',
                )}
              >
                <span
                  className={cn(
                    'pos-nummer grid size-7 shrink-0 place-items-center border text-[0.6875rem] transition-colors duration-150',
                    aktiv === l.pos
                      ? 'border-signal-500 bg-signal-500 text-ink-950'
                      : 'border-ink-600 text-fiche-400 group-hover:border-signal-500 group-hover:text-signal-500',
                  )}
                >
                  {l.pos}
                </span>
                <span className="flex-1 text-[0.9375rem] font-semibold text-fiche-100">
                  {l.titel}
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-fiche-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-signal-500"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
