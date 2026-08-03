import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Der Katalog kennt keine abgerundeten Pillen. Handlungen sind Blöcke:
 * kantig, mit einer Kante die nachgibt, wenn man sie drückt.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2.5 rounded-[2px]',
    'font-mono text-[0.8125rem] font-bold uppercase tracking-[0.14em]',
    'transition-[transform,background-color,color,box-shadow] duration-150 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Die Hauptsache: Termin, Anruf. Signalorange, Text in Ink. */
        signal:
          'bg-signal-500 text-ink-950 shadow-[0_2px_0_0_var(--color-signal-600)] hover:bg-signal-600 hover:text-white active:shadow-[0_0px_0_0_var(--color-signal-600)]',
        /** Auf dem Negativgrund: heller Block. */
        fiche:
          'bg-fiche-100 text-ink-900 shadow-[0_2px_0_0_var(--color-ink-600)] hover:bg-white active:shadow-none',
        /** Umrandet, auf hellem Grund. */
        kontur:
          'border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-fiche-100',
        /** Umrandet, auf dunklem Grund. */
        konturNegativ:
          'border-2 border-fiche-300 bg-transparent text-fiche-100 hover:border-fiche-100 hover:bg-fiche-100 hover:text-ink-900',
        /** Textlink im Katalogstil. */
        leise:
          'text-ink-700 underline decoration-blatt-400 decoration-2 underline-offset-4 hover:text-signal-700 hover:decoration-signal-500',
      },
      size: {
        sm: 'h-10 px-4',
        md: 'h-12 px-6',
        lg: 'h-14 px-7 text-sm',
      },
    },
    defaultVariants: { variant: 'signal', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
