import type { MetadataRoute } from 'next'

import { betrieb, leistungen } from '@/lib/betrieb'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const stand = new Date()

  const seiten: { pfad: string; prioritaet: number; frequenz: 'weekly' | 'monthly' | 'yearly' }[] =
    [
      { pfad: '/', prioritaet: 1, frequenz: 'weekly' },
      { pfad: '/leistungen/', prioritaet: 0.9, frequenz: 'monthly' },
      ...leistungen.map((l) => ({
        pfad: `/leistungen/${l.slug}/`,
        prioritaet: 0.8,
        frequenz: 'monthly' as const,
      })),
      { pfad: '/kontakt/', prioritaet: 0.9, frequenz: 'monthly' },
      { pfad: '/fahrzeuge/', prioritaet: 0.7, frequenz: 'weekly' },
      { pfad: '/ueber-uns/', prioritaet: 0.6, frequenz: 'yearly' },
    ]

  return seiten.map((s) => ({
    url: `${betrieb.url}${s.pfad}`,
    lastModified: stand,
    changeFrequency: s.frequenz,
    priority: s.prioritaet,
  }))
}
