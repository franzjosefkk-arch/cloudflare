import Link from 'next/link'
import { CalendarCheck, Phone } from 'lucide-react'

import { betrieb, telHref } from '@/lib/betrieb'

/**
 * Auf dem Telefon ist die Handlung immer eine Daumenbreite entfernt.
 * Die Leiste liegt fest am unteren Rand und verschwindet ab lg.
 * Der Footer trägt dafür pb-28, damit nichts verdeckt wird.
 */
export function MobilLeiste() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-signal-500 bg-ink-900 lg:hidden">
      <div className="grid grid-cols-2">
        <a
          href={telHref()}
          data-anruf="sofort"
          className="flex h-16 items-center justify-center gap-2.5 border-r border-ink-700 font-mono text-sm font-bold uppercase tracking-[0.12em] text-fiche-100 active:bg-ink-800"
        >
          <Phone aria-hidden className="size-4" strokeWidth={2.5} />
          Anrufen
          <span className="sr-only">— {betrieb.telefon.anzeige}</span>
        </a>
        <Link
          href="/kontakt/#termin"
          className="flex h-16 items-center justify-center gap-2.5 bg-signal-500 font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink-950 active:bg-signal-600"
        >
          <CalendarCheck aria-hidden className="size-4" strokeWidth={2.5} />
          Termin
        </Link>
      </div>
    </div>
  )
}
