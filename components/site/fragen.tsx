'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export type Frage = { frage: string; antwort: string }

export function Fragen({ fragen }: { fragen: readonly Frage[] }) {
  return (
    <Accordion type="single" collapsible className="border-t-2 border-ink-900">
      {fragen.map((f, i) => (
        <AccordionItem key={f.frage} value={`f-${i}`}>
          <AccordionTrigger>{f.frage}</AccordionTrigger>
          <AccordionContent>{f.antwort}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
