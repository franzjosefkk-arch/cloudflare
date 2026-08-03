import type { MetadataRoute } from 'next'

import { betrieb } from '@/lib/betrieb'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    // Impressum und Datenschutz tragen noindex im Seitenkopf. Sie hier zu
    // sperren wäre kontraproduktiv: ein ausgesperrter Crawler liest das
    // noindex gar nicht erst — und beide Seiten müssen auffindbar bleiben.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${betrieb.url}/sitemap.xml`,
    host: betrieb.url,
  }
}
