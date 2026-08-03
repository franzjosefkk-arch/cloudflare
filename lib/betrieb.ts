/**
 * Einzige Quelle der Wahrheit für alle Betriebsdaten.
 *
 * Jede Telefonnummer, jede Öffnungszeit und jede Adresse auf der Website kommt
 * aus dieser Datei — inklusive der strukturierten Daten für Google. Ändert sich
 * etwas am Betrieb, wird es hier geändert und nirgends sonst.
 *
 * Quellenlage: siehe PRODUCT.md. Alle Angaben sind recherchiert, nicht vom
 * Betrieb bestätigt. Mit `PRUEFEN` markierte Felder vor dem Livegang klären.
 */

export const betrieb = {
  name: 'Automobile Beckmann',
  rechtsform: 'Automobile Beckmann GbR',
  gruendungsjahr: 1986,
  inhaber: 'Stefan und Helga Beckmann',

  adresse: {
    strasse: 'Arsterdamm 85',
    plz: '28277',
    ort: 'Bremen',
    ortsteil: 'Arsten',
    land: 'DE',
  },

  /** Koordinaten Arsterdamm 85 — PRÜFEN: vor Livegang mit Google Maps abgleichen. */
  geo: { lat: 53.0345, lng: 8.8163 },

  telefon: {
    anzeige: '0421 87 50 40',
    /** E.164 für tel:-Links und strukturierte Daten */
    link: '+49421875040',
  },
  telefax: '0421 87 62 24',
  email: 'info@automobilebeckmann.de',

  domain: 'automobilebeckmann.de',
  url: 'https://automobilebeckmann.de',

  /** Fahrzeugbestand liegt auf den Portalen, nicht auf der eigenen Seite. */
  portale: {
    mobile: 'https://home.mobile.de/',
    autoscout: 'https://www.autoscout24.de/haendler/automobile-beckmann-bremen',
  },

  bewertung: {
    schnitt: 4.5,
    anzahl: 142,
    /** PRÜFEN: Stand der Recherche, Zahl vor Livegang aktualisieren. */
    quelle: 'Google und ProvenExpert',
  },
} as const

/**
 * Öffnungszeiten. `von`/`bis` in 24-Stunden-Notation für die strukturierten
 * Daten, `anzeige` für den Menschen.
 *
 * PRÜFEN: Die Quellen widersprechen sich (Mo–Fr bis 17 oder bis 18 Uhr,
 * Samstag offen oder geschlossen). Übernommen ist die Angabe der Kontaktseite.
 */
export type Zeitraum = {
  tage: string
  kurz: readonly ('Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So')[]
  von: string
  bis: string
  anzeige: string
}

export const werkstattzeiten: readonly Zeitraum[] = [
  {
    tage: 'Montag bis Freitag',
    kurz: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    von: '07:00',
    bis: '17:00',
    anzeige: '07:00 – 17:00 Uhr',
  },
  {
    tage: 'Samstag',
    kurz: ['Sa'],
    von: '09:00',
    bis: '12:00',
    anzeige: '09:00 – 12:00 Uhr',
  },
] as const

export const verkaufszeiten: readonly Zeitraum[] = [
  {
    tage: 'Montag bis Donnerstag',
    kurz: ['Mo', 'Di', 'Mi', 'Do'],
    von: '07:00',
    bis: '17:00',
    anzeige: '07:00 – 17:00 Uhr',
  },
  {
    tage: 'Freitag',
    kurz: ['Fr'],
    von: '07:00',
    bis: '15:00',
    anzeige: '07:00 – 15:00 Uhr',
  },
] as const

/** Für die Anzeige „jetzt geöffnet" ohne Zeitzonen-Bibliothek. */
export const WOCHENTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'] as const

/* ------------------------------------------------------------------
   Leistungen — die Positionen des Katalogs
   ------------------------------------------------------------------ */

export type Leistung = {
  /** Positionsnummer im Katalog. Stabil, wird nicht neu vergeben. */
  pos: string
  slug: string
  titel: string
  /** Ein Satz, der die Leistung aus Kundensicht beschreibt. */
  kurz: string
  /** Suchbegriff-nahe Überschrift für die Detailseite. */
  h1: string
  /** Was der Kunde konkret bekommt. */
  umfang: readonly string[]
  /** Der häufigste Einwand und die Antwort darauf. */
  einwand: { frage: string; antwort: string }
  /** Auf welche Stelle der Explosionszeichnung diese Position zeigt. */
  markeAufZeichnung: boolean
}

export const leistungen: readonly Leistung[] = [
  {
    pos: '01',
    slug: 'inspektion-und-wartung',
    titel: 'Inspektion & Wartung',
    kurz: 'Inspektion nach Herstellervorgabe — mit Eintrag ins digitale Serviceheft.',
    h1: 'Inspektion in Bremen — nach Herstellervorgabe, ohne Garantieverlust',
    umfang: [
      'Inspektion nach Herstellervorgabe für alle gängigen Marken',
      'Eintrag ins elektronische Serviceheft (Mercedes, VW, Audi, Škoda, Seat, Honda u. a.)',
      'Ölwechsel mit freigegebenem Öl und Original- oder gleichwertigem Filter',
      'Saisoncheck vor Winter und Urlaub',
      'Sichtprüfung mit Befundliste — Sie sehen, was gemacht wurde und was warten kann',
    ],
    einwand: {
      frage: 'Verliere ich meine Herstellergarantie, wenn ich nicht zum Vertragshändler gehe?',
      antwort:
        'Nein. Seit der EU-Gruppenfreistellungsverordnung dürfen Wartung und Inspektion in jeder qualifizierten Werkstatt erfolgen, solange nach Herstellervorgabe gearbeitet und freigegebenes Material verwendet wird. Genau das tun wir — und tragen den Service in das elektronische Serviceheft des Herstellers ein, sodass Ihre Historie lückenlos bleibt.',
    },
    markeAufZeichnung: true,
  },
  {
    pos: '02',
    slug: 'hu-au',
    titel: 'HU & AU',
    kurz: 'Hauptuntersuchung im Haus — Abnahme durch die DEKRA, Mängel direkt behoben.',
    h1: 'HU und AU in Bremen — Prüfung und Reparatur an einem Termin',
    umfang: [
      'Hauptuntersuchung mit Abnahme durch die DEKRA bei uns im Haus',
      'Abgasuntersuchung (AU)',
      'Kostenlose Vorabprüfung: Wir sehen vorher nach, was durchfallen würde',
      'Kleine Mängel beheben wir direkt — ohne zweiten Termin und ohne Nachprüfgebühr',
      'Neue Plakette noch am selben Tag',
    ],
    einwand: {
      frage: 'Was passiert, wenn mein Auto durch die HU fällt?',
      antwort:
        'Bei uns fällt kaum jemand unvorbereitet durch, weil wir vorher nachsehen. Finden wir etwas, bekommen Sie den Preis für die Reparatur, bevor der Prüfer kommt. Sie entscheiden dann. Wird direkt bei uns repariert, entfällt die Nachuntersuchung mitsamt Gebühr.',
    },
    markeAufZeichnung: true,
  },
  {
    pos: '03',
    slug: 'bremsen-und-fahrwerk',
    titel: 'Bremsen & Fahrwerk',
    kurz: 'Bremsen, Stoßdämpfer und Achsvermessung — inklusive Prüfstandsprotokoll.',
    h1: 'Bremsen, Stoßdämpfer und Achsvermessung in Bremen',
    umfang: [
      'Bremsenservice: Beläge, Scheiben, Sättel, Bremsflüssigkeit',
      'Stoßdämpfertest auf dem Prüfstand — mit ausgedrucktem Protokoll',
      'Stoßdämpfer, Federn und Fahrwerkslager erneuern',
      'Achsvermessung mit Einstellung — gegen einseitig abgefahrene Reifen',
      'Reifenservice, Reifenwechsel und Einlagerung',
    ],
    einwand: {
      frage: 'Woher weiß ich, dass die Bremsen wirklich fällig sind?',
      antwort:
        'Weil wir es Ihnen zeigen. Sie bekommen die Restdicke in Millimetern genannt und dürfen jederzeit mit an das Fahrzeug. Ist noch Reserve, sagen wir Ihnen, wie lange sie hält — statt zu tauschen, was noch trägt.',
    },
    markeAufZeichnung: true,
  },
  {
    pos: '04',
    slug: 'klimaservice',
    titel: 'Klimaservice',
    kurz: 'Wartung, Desinfektion und Reparatur — auch für neue R1234yf-Anlagen.',
    h1: 'Klimaservice in Bremen — auch für R1234yf-Anlagen',
    umfang: [
      'Klimaservice mit Kältemittelwechsel für R134a und R1234yf',
      'Dichtheitsprüfung der gesamten Anlage',
      'Desinfektion gegen Gerüche und Keime im Verdampfer',
      'Innenraumfilter erneuern',
      'Reparatur von Kompressor, Kondensator und Leitungen',
    ],
    einwand: {
      frage: 'Meine Klimaanlage kühlt noch — brauche ich den Service trotzdem?',
      antwort:
        'Eine Anlage verliert pro Jahr Kältemittel, auch wenn sie dicht ist. Sinkt der Füllstand zu weit, läuft der Kompressor trocken — und der ist das teuerste Bauteil der Anlage. Der Service alle zwei Jahre kostet einen Bruchteil davon.',
    },
    markeAufZeichnung: true,
  },
  {
    pos: '05',
    slug: 'diagnose-und-elektronik',
    titel: 'Diagnose & Elektronik',
    kurz: 'Fehlerspeicher auslesen, Ursache finden — Motor, Getriebe, Komfortelektronik.',
    h1: 'Fahrzeugdiagnose und Elektronik in Bremen',
    umfang: [
      'Computergestützte Fehlerdiagnose für alle gängigen Marken',
      'Motordiagnose bei Leistungsverlust, Ruckeln und Warnleuchten',
      'Elektrik und Komfortelektronik: Fensterheber, Zentralverriegelung, Sensorik',
      'Automatikgetriebe-Ölwechsel und Getriebespülung',
      'Motorinstandsetzung',
      'Nachrüstungen: Anhängerkupplung, Rückfahrsysteme',
    ],
    einwand: {
      frage: 'Kann eine freie Werkstatt moderne Fahrzeugelektronik überhaupt auslesen?',
      antwort:
        'Ja. Wir haben Zugriff auf die technischen Herstellerinformationen und arbeiten mit markenübergreifender Diagnosetechnik. Was ein Vertragshändler am Fahrzeug ausliest, lesen wir auch aus — der Unterschied liegt im Stundensatz, nicht im Gerät.',
    },
    markeAufZeichnung: true,
  },
  {
    pos: '06',
    slug: 'unfall-und-lackierung',
    titel: 'Unfall & Lackierung',
    kurz: 'Unfallinstandsetzung, Blechschäden und Lack — Abwicklung mit der Versicherung.',
    h1: 'Unfallinstandsetzung und Lackierung in Bremen',
    umfang: [
      'Unfallinstandsetzung von Blech, Rahmen und Anbauteilen',
      'Lackierung und Beilackierung — farbtongenau angemischt',
      'Beulen, Kratzer und Parkschäden',
      'Autoglasservice: Steinschlag und Scheibentausch',
      'Fahrzeugpflege und Aufbereitung',
      'Abwicklung mit Ihrer Versicherung, Gutachter auf Wunsch',
    ],
    einwand: {
      frage: 'Muss ich nach einem Unfall in die Werkstatt, die meine Versicherung nennt?',
      antwort:
        'Nein. Bei einem unverschuldeten Unfall haben Sie in Deutschland die freie Werkstattwahl — der Versicherer des Unfallgegners zahlt die Instandsetzung unabhängig davon, wer sie ausführt. Wir übernehmen den Schriftverkehr und stimmen uns direkt mit dem Gutachter ab.',
    },
    markeAufZeichnung: true,
  },
] as const

/** Was nicht als eigene Position geführt wird, aber gefragt wird. */
export const weitereLeistungen = [
  'Transporterreparatur bis 5 Tonnen',
  'Autoglasservice',
  'Reifeneinlagerung',
  'Zulassungsservice',
  'Finanzierung, Leasing und Versicherung',
  'Fahrzeugpflege und Aufbereitung',
] as const

/** Was den Betrieb von einer Kette und vom Vertragshändler unterscheidet. */
export const versprechen = [
  {
    pos: 'A',
    titel: 'Kostenloser Ersatzwagen',
    text: 'Sie bleiben mobil, während wir arbeiten. Das Werkstattersatzfahrzeug kostet Sie nichts — bitte bei der Terminanfrage mit angeben.',
  },
  {
    pos: 'B',
    titel: 'Preis vor der Reparatur',
    text: 'Sie bekommen den Preis, bevor gearbeitet wird. Kommt bei der Reparatur etwas dazu, rufen wir an — nichts wird ohne Ihr Ja gemacht.',
  },
  {
    pos: 'C',
    titel: 'DEKRA im Haus',
    text: 'Die Hauptuntersuchung findet bei uns statt. Prüfung und Reparatur an einem Termin, statt zweimal Termin und zweimal Anfahrt.',
  },
  {
    pos: 'D',
    titel: 'Garantie bleibt erhalten',
    text: 'Wir warten nach Herstellervorgabe und tragen den Service in das elektronische Serviceheft ein. Ihre Historie bleibt lückenlos.',
  },
] as const

/** Der Ablauf — beantwortet „was passiert, wenn ich anfrage?" */
export const ablauf = [
  {
    pos: '01',
    titel: 'Sie fragen an',
    text: 'Telefonisch oder über das Formular. Wir brauchen Fahrzeug, Anliegen und wann es Ihnen passt.',
  },
  {
    pos: '02',
    titel: 'Wir melden uns',
    text: 'Innerhalb eines Werktags mit einem Terminvorschlag und, wo möglich, einer Preisspanne.',
  },
  {
    pos: '03',
    titel: 'Sie bringen das Auto',
    text: 'Arsterdamm 85, Parkplätze direkt am Hof. Ersatzwagen steht bereit, wenn Sie einen angemeldet haben.',
  },
  {
    pos: '04',
    titel: 'Wir rufen an, bevor es teuer wird',
    text: 'Kommt etwas dazu, hören Sie es vorher. Zum Abholen bekommen Sie die Befundliste zur Rechnung.',
  },
] as const

/* ------------------------------------------------------------------
   Hilfsfunktionen
   ------------------------------------------------------------------ */

export function ganzeAdresse(): string {
  const { strasse, plz, ort } = betrieb.adresse
  return `${strasse}, ${plz} ${ort}`
}

export function telHref(): string {
  return `tel:${betrieb.telefon.link}`
}

export function mailHref(betreff?: string): string {
  const b = betreff ? `?subject=${encodeURIComponent(betreff)}` : ''
  return `mailto:${betrieb.email}${b}`
}

export function leistungNachSlug(slug: string): Leistung | undefined {
  return leistungen.find((l) => l.slug === slug)
}

/**
 * Ob der Betrieb zu einem gegebenen Zeitpunkt geöffnet hat.
 * Reine Funktion, damit sie ohne Browser testbar ist.
 */
export function istGeoeffnet(jetzt: Date, zeiten: readonly Zeitraum[] = werkstattzeiten): boolean {
  const tag = WOCHENTAGE[jetzt.getDay()]
  if (!tag) return false
  const minuten = jetzt.getHours() * 60 + jetzt.getMinutes()

  return zeiten.some((z) => {
    if (!z.kurz.includes(tag)) return false
    const [vonH, vonM] = z.von.split(':').map(Number)
    const [bisH, bisM] = z.bis.split(':').map(Number)
    if (vonH === undefined || vonM === undefined || bisH === undefined || bisM === undefined) {
      return false
    }
    return minuten >= vonH * 60 + vonM && minuten < bisH * 60 + bisM
  })
}
