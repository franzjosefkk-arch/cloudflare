'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-blatt-300', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-start justify-between gap-6 py-6 text-left',
        'text-lg font-bold tracking-tight text-ink-900 sm:text-xl',
        'transition-colors hover:text-signal-700',
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="mt-0.5 grid size-8 shrink-0 place-items-center border-2 border-ink-900 text-ink-900 transition-[transform,background-color,color] duration-300 group-hover:bg-ink-900 group-hover:text-fiche-100 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-signal-500 group-data-[state=open]:border-signal-500 group-data-[state=open]:text-ink-950"
      >
        <Plus className="size-4" strokeWidth={3} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[riss-auf_0.2s_reverse] data-[state=open]:animate-[riss-auf_0.35s_cubic-bezier(0.16,0.84,0.44,1)]"
    {...props}
  >
    <div className={cn('max-w-2xl pb-7 pr-14 text-[0.9375rem] leading-relaxed text-ink-700', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
