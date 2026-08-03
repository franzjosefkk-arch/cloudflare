import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Formularfelder in der Katalog-Grammatik: das Feld ist ein Kasten mit
 * kräftiger Unterkante, wie die Eintragszeile eines Werkstattauftrags.
 * Kein Placeholder ersetzt ein Label — Labels bleiben immer sichtbar.
 */

const feldBasis = [
  // Kantig wie ein Formularfeld auf Papier — die kräftige Unterkante ist die
  // Eintragszeile, nicht ein Akzent an einer runden Karte.
  'w-full rounded-none border border-blatt-300 border-b-2 border-b-ink-600 bg-white',
  'px-3.5 py-3 text-base text-ink-900 placeholder:text-blatt-500',
  'transition-[border-color,box-shadow] duration-150',
  'hover:border-b-signal-500',
  'focus:border-b-signal-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-signal-500/25',
  'aria-[invalid=true]:border-b-signal-700 aria-[invalid=true]:bg-signal-500/[0.06]',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ')

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(feldBasis, className)} {...props} />
  ),
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(feldBasis, 'min-h-32 resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<'select'>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(feldBasis, 'appearance-none pr-10', className)} {...props}>
    {children}
  </select>
))
Select.displayName = 'Select'

type FeldProps = {
  /** id des Eingabefelds — verbindet Label, Hilfetext und Fehler. */
  id: string
  label: string
  /** Pflichtfelder werden ausgezeichnet, optionale ausdrücklich als solche benannt. */
  pflicht?: boolean
  /** Kurzer Hinweis, warum wir das brauchen. Nur wenn er wirklich hilft. */
  hinweis?: string
  fehler?: string
  className?: string
  children: React.ReactNode
}

/**
 * Umschlag für ein Formularfeld. Verknüpft Label, Hinweis und Fehlermeldung
 * über aria-describedby, damit Screenreader den Zusammenhang vorlesen.
 */
export function Feld({ id, label, pflicht, hinweis, fehler, className, children }: FeldProps) {
  const hinweisId = hinweis ? `${id}-hinweis` : undefined
  const fehlerId = fehler ? `${id}-fehler` : undefined

  return (
    <div className={cn('grid gap-2', className)}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm font-bold text-ink-900">
        {label}
        {pflicht ? (
          <span aria-hidden className="text-signal-700">
            *
          </span>
        ) : (
          <span className="font-mono text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-ink-500">
            optional
          </span>
        )}
      </label>

      {hinweis ? (
        <p id={hinweisId} className="text-[0.8125rem] leading-snug text-ink-600">
          {hinweis}
        </p>
      ) : null}

      {React.isValidElement<Record<string, unknown>>(children)
        ? React.cloneElement(children, {
            id,
            'aria-describedby': [hinweisId, fehlerId].filter(Boolean).join(' ') || undefined,
            'aria-invalid': fehler ? true : undefined,
            'aria-required': pflicht || undefined,
          })
        : children}

      {fehler ? (
        <p id={fehlerId} className="text-[0.8125rem] font-bold text-signal-700">
          {fehler}
        </p>
      ) : null}
    </div>
  )
}
