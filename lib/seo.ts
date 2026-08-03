import type { Metadata } from 'next'

import {
  betrieb,
  ganzeAdresse,
  leistungen,
  verkaufszeiten,
  werkstattzeiten,
  type Zeitraum,
} from '@/lib/betrieb'

const WOCHENTAG_SCHEMA: Record<string, string> = {
  Mo: 'Monday',
  Di: 'Tuesday',
  Mi: 'Wednesday',
  Do: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  So: 'Sunday',
}

function oeffnungszeitenSchema(zeiten: readonly Zeitraum[]) {
  return zeiten.map((z) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: z.kurz.map((k) => WOCHENTAG_SCHEMA[k]).filter(Boolean),
    opens: z.von,
    closes: z.bis,
  }))
}

/**
 * Strukturierte Daten für die lokale Suche. `AutoRepair` ist der passende
 * Schema.org-Typ für eine Werkstatt und erbt von LocalBusiness.
 */
export function betriebSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${betrieb.url}/#betrieb`,
    name: betrieb.name,
    legalName: betrieb.rechtsform,
    description:
      'Freie Kfz-Meisterwerkstatt und Gebrauchtwagenhandel in Bremen-Arsten. Inspektion, HU und AU mit DEKRA im Haus, Klimaservice, Bremsen, Diagnose, Unfallinstandsetzung und Lackierung für alle Marken.',
    url: betrieb.url,
    telephone: betrieb.telefon.link,
    faxNumber: betrieb.telefax,
    email: betrieb.email,
    foundingDate: String(betrieb.gruendungsjahr),
    address: {
      '@type': 'PostalAddress',
      streetAddress: betrieb.adresse.strasse,
      postalCode: betrieb.adresse.plz,
      addressLocality: betrieb.adresse.ort,
      addressCountry: betrieb.adresse.land,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: betrieb.geo.lat,
      longitude: betrieb.geo.lng,
    },
    openingHoursSpecification: [
      ...oeffnungszeitenSchema(werkstattzeiten),
      ...oeffnungszeitenSchema(verkaufszeiten),
    ],
    areaServed: [
      { '@type': 'City', name: 'Bremen' },
      { '@type': 'AdministrativeArea', name: 'Bremen-Obervieland' },
      { '@type': 'AdministrativeArea', name: 'Stuhr' },
      { '@type': 'AdministrativeArea', name: 'Weyhe' },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: betrieb.bewertung.schnitt,
      reviewCount: betrieb.bewertung.anzahl,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: leistungen.map((l) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: l.titel,
          description: l.kurz,
          url: `${betrieb.url}/leistungen/${l.slug}/`,
        },
      })),
    },
  }
}

/** FAQ-Strukturdaten. Nur für Fragen, die auf der Seite auch sichtbar sind. */
export function faqSchema(fragen: readonly { frage: string; antwort: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: fragen.map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  }
}

export function breadcrumbSchema(pfad: readonly { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pfad.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      item: `${betrieb.url}${p.url}`,
    })),
  }
}

type SeiteMeta = {
  titel: string
  beschreibung: string
  pfad: string
}

/** Einheitliche Metadaten für jede Seite. */
export function seitenMetadata({ titel, beschreibung, pfad }: SeiteMeta): Metadata {
  const url = `${betrieb.url}${pfad}`
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: url },
    openGraph: {
      title: titel,
      description: beschreibung,
      url,
      siteName: `${betrieb.name} — ${ganzeAdresse()}`,
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titel,
      description: beschreibung,
    },
  }
}
