import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Der Seitenrhythmus. Jede Sektion ist entweder Negativ (Mikrofiche) oder
 * Positiv (Katalogblatt); der Wechsel gibt dem Scrollen seinen Takt.
 */
export function Sektion({
  grund = 'positiv',
  raster = false,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'section'> & {
  grund?: 'positiv' | 'negativ' | 'blatt'
  raster?: boolean
}) {
  return (
    <section
      className={cn(
        'px-5 py-sektion sm:px-8 lg:py-sektion-lg',
        grund === 'negativ' && 'auf-negativ bg-ink-900 text-fiche-200',
        grund === 'positiv' && 'bg-blatt-100 text-ink-900',
        grund === 'blatt' && 'bg-white text-ink-900',
        raster && (grund === 'negativ' ? 'raster-negativ' : 'raster-positiv'),
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-[82rem]">{children}</div>
    </section>
  )
}

/**
 * Sektionskopf im Katalogstil: Positionsmarke, technisches Label,
 * Überschrift, Vorspann.
 */
export function SektionKopf({
  pos,
  label,
  titel,
  vorspann,
  grund = 'positiv',
  als = 'h2',
  className,
}: {
  pos?: string
  label?: string
  titel: React.ReactNode
  vorspann?: React.ReactNode
  grund?: 'positiv' | 'negativ'
  als?: 'h1' | 'h2'
  className?: string
}) {
  const Titel = als
  const negativ = grund === 'negativ'

  return (
    <div className={cn('max-w-3xl', className)}>
      {(pos || label) && (
        <div className="mb-5 flex items-center gap-3.5">
          {pos ? (
            <span
              className={cn(
                'pos-nummer grid size-8 shrink-0 place-items-center text-xs',
                negativ ? 'bg-signal-500 text-ink-950' : 'bg-ink-900 text-fiche-100',
              )}
            >
              {pos}
            </span>
          ) : null}
          {label ? (
            <span className={cn('katalog-label', negativ ? 'text-fiche-400' : 'text-ink-600')}>
              {label}
            </span>
          ) : null}
          <span
            aria-hidden
            className={cn('h-px flex-1', negativ ? 'bg-ink-600' : 'bg-blatt-300')}
          />
        </div>
      )}

      <Titel
        className={cn(
          'text-balance',
          als === 'h1'
            ? 'text-[2.5rem] leading-[1.03] sm:text-6xl lg:text-[4.25rem]'
            : 'text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-5xl',
          negativ ? 'text-fiche-100' : 'text-ink-900',
        )}
      >
        {titel}
      </Titel>

      {vorspann ? (
        <div
          className={cn(
            'mt-5 text-lg leading-relaxed',
            negativ ? 'text-fiche-300' : 'text-ink-700',
          )}
        >
          {vorspann}
        </div>
      ) : null}
    </div>
  )
}
