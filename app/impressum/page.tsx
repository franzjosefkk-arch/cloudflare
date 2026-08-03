import { Luecke, Rechtstext } from '@/components/site/rechtstext'
import { betrieb } from '@/lib/betrieb'
import { seitenMetadata } from '@/lib/seo'

export const metadata = {
  ...seitenMetadata({
    titel: 'Impressum',
    beschreibung: `Impressum und Anbieterkennzeichnung der ${betrieb.rechtsform}, ${betrieb.adresse.strasse}, ${betrieb.adresse.plz} ${betrieb.adresse.ort}.`,
    pfad: '/impressum/',
  }),
  robots: { index: false, follow: true },
}

export default function ImpressumSeite() {
  return (
    <Rechtstext
      titel="Impressum"
      vorspann="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag."
    >
      <h2>Diensteanbieter</h2>
      <p>
        <strong>{betrieb.rechtsform}</strong>
        <br />
        {betrieb.adresse.strasse}
        <br />
        {betrieb.adresse.plz} {betrieb.adresse.ort}
        <br />
        Deutschland
      </p>

      <h2>Vertretungsberechtigte Gesellschafter</h2>
      <p>Stefan Beckmann, Helga Beckmann</p>

      <h2>Kontakt</h2>
      <dl>
        <dt>Telefon</dt>
        <dd>{betrieb.telefon.anzeige}</dd>
        <dt>Telefax</dt>
        <dd>{betrieb.telefax}</dd>
        <dt>E-Mail</dt>
        <dd>
          <a href={`mailto:${betrieb.email}`}>{betrieb.email}</a>
        </dd>
      </dl>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{' '}
        <Luecke>vor Livegang eintragen</Luecke>
      </p>
      <p>
        Als Gesellschaft bürgerlichen Rechts besteht kein Eintrag im Handelsregister; eine
        Registernummer entfällt daher.
      </p>

      <h2>Berufsrechtliche Angaben</h2>
      <dl>
        <dt>Gesetzliche Berufsbezeichnung</dt>
        <dd>Kraftfahrzeugtechniker-Meister (verliehen in der Bundesrepublik Deutschland)</dd>
        <dt>Zuständige Kammer</dt>
        <dd>
          Handwerkskammer Bremen, Ansgaritorstraße 24, 28195 Bremen —{' '}
          <Luecke>Zuständigkeit und Anschrift bestätigen</Luecke>
        </dd>
        <dt>Berufsrechtliche Regelungen</dt>
        <dd>
          Handwerksordnung (HwO), einsehbar unter{' '}
          <a
            href="https://www.gesetze-im-internet.de/hwo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            gesetze-im-internet.de/hwo
          </a>
        </dd>
      </dl>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        Stefan Beckmann
        <br />
        {betrieb.adresse.strasse}, {betrieb.adresse.plz} {betrieb.adresse.ort}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes (VSBG)
        teilzunehmen. <Luecke>Bereitschaft bestätigen oder Text anpassen</Luecke>
      </p>
      <p>
        Die Online-Streitbeilegungsplattform der Europäischen Kommission wurde zum 20. Juli 2025
        eingestellt; ein Verweis darauf entfällt deshalb.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
        eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
        Nutzung von Informationen nach den allgemeinen Gesetzen bleiben davon unberührt. Eine
        diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten
        Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen
        wir diese Inhalte umgehend.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
        übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
        mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar. Eine
        permanente inhaltliche Kontrolle ohne konkrete Anhaltspunkte einer Rechtsverletzung ist
        nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links
        umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
        nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>

      <h2>Hinweis zu diesem Impressum</h2>
      <p>
        Die orange markierten Stellen sind noch nicht bestätigt und müssen vor der
        Veröffentlichung durch den Betrieb geprüft und ergänzt werden. Dieses Impressum ist eine
        sorgfältig erstellte Vorlage und ersetzt keine Rechtsberatung.
      </p>
    </Rechtstext>
  )
}
