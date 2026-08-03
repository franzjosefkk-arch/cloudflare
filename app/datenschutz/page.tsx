import { Luecke, Rechtstext } from '@/components/site/rechtstext'
import { betrieb } from '@/lib/betrieb'
import { seitenMetadata } from '@/lib/seo'

export const metadata = {
  ...seitenMetadata({
    titel: 'Datenschutzerklärung',
    beschreibung:
      'Wie diese Website mit personenbezogenen Daten umgeht: Hosting, Serverprotokolle, Terminanfrage und Ihre Rechte nach der DSGVO.',
    pfad: '/datenschutz/',
  }),
  robots: { index: false, follow: true },
}

export default function DatenschutzSeite() {
  return (
    <Rechtstext
      titel="Datenschutzerklärung"
      vorspann="Diese Website kommt ohne Cookies, ohne Tracking und ohne Werbenetzwerke aus. Was trotzdem an Daten anfällt, steht hier."
    >
      <h2>Verantwortlicher</h2>
      <p>
        Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        <br />
        <br />
        <strong>{betrieb.rechtsform}</strong>
        <br />
        {betrieb.adresse.strasse}, {betrieb.adresse.plz} {betrieb.adresse.ort}
        <br />
        Telefon {betrieb.telefon.anzeige}
        <br />
        E-Mail <a href={`mailto:${betrieb.email}`}>{betrieb.email}</a>
      </p>
      <p>
        Ein Datenschutzbeauftragter ist nach § 38 BDSG nicht bestellt.{' '}
        <Luecke>Bei mehr als 20 Personen mit Datenverarbeitung prüfen</Luecke>
      </p>

      <h2>Das Wichtigste in Kürze</h2>
      <ul>
        <li>Diese Website setzt keine Cookies.</li>
        <li>Es findet keine Analyse, kein Tracking und kein Retargeting statt.</li>
        <li>
          Schriften werden vom eigenen Server geladen, nicht von Google. Beim Aufruf der Seite
          entsteht keine Verbindung zu Google.
        </li>
        <li>Es sind keine Karten, Videos oder Social-Media-Elemente eingebettet.</li>
        <li>
          Daten geben Sie nur, wenn Sie das Formular selbst ausfüllen oder uns schreiben.
        </li>
      </ul>

      <h2>Hosting und Serverprotokolle</h2>
      <p>
        Diese Website wird bei <strong>Cloudflare Pages</strong> gehostet. Anbieter ist
        Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
      </p>
      <p>
        Beim Aufruf der Seite verarbeitet Cloudflare technisch notwendige Verbindungsdaten,
        insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Adresse,
        die übertragene Datenmenge sowie Browser- und Betriebssystemangaben. Diese Verarbeitung
        ist erforderlich, um die Seite überhaupt ausliefern und vor Angriffen schützen zu
        können.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes
        Interesse an einem sicheren und zuverlässigen Betrieb dieser Website.
      </p>
      <p>
        Mit Cloudflare besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Für
        Übermittlungen in die USA stützt sich Cloudflare auf die Standardvertragsklauseln der
        EU-Kommission sowie auf das EU-U.S. Data Privacy Framework.{' '}
        <Luecke>Auftragsverarbeitungsvertrag abschließen und hier bestätigen</Luecke>
      </p>

      <h2>Terminanfrage über das Formular</h2>
      <p>
        Wenn Sie das Formular auf dieser Website absenden, verarbeiten wir die Angaben, die Sie
        dort machen: Anliegen, Fahrzeug, Wunschtermin, Wunsch nach einem Ersatzwagen, Name,
        Telefonnummer, optional E-Mail-Adresse und Ihre Nachricht.
      </p>
      <p>
        <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage und Rückmeldung mit einem
        Terminvorschlag.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags)
        sowie Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung, die Sie im Formular erteilen).
      </p>
      <p>
        Die Anfrage wird über einen Serverdienst auf der Cloudflare-Plattform entgegengenommen
        und per E-Mail an unser Postfach zugestellt. Für den Versand nutzen wir{' '}
        <strong>Resend</strong> (Resend, Inc., USA) als Auftragsverarbeiter. Dabei werden die
        von Ihnen eingegebenen Daten übertragen. Die Anfrage wird nicht dauerhaft auf dem
        Webserver gespeichert.{' '}
        <Luecke>Auftragsverarbeitungsvertrag mit Resend abschließen</Luecke>
      </p>
      <p>
        <strong>Speicherdauer:</strong> Wir bewahren Ihre Anfrage so lange auf, wie es zur
        Bearbeitung nötig ist, und darüber hinaus, soweit handels- oder steuerrechtliche
        Aufbewahrungsfristen gelten. Danach löschen wir sie.
      </p>
      <p>
        Ihre Einwilligung können Sie jederzeit formlos widerrufen — eine E-Mail an{' '}
        <a href={`mailto:${betrieb.email}`}>{betrieb.email}</a> genügt. Die Rechtmäßigkeit der
        bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
      </p>

      <h2>Anfrage per Telefon, Fax oder E-Mail</h2>
      <p>
        Wenn Sie uns anrufen, faxen oder schreiben, verarbeiten wir Ihre Angaben zur Bearbeitung
        des Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vertragsbezogenen
        Anfragen, sonst Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes Interesse an der
        Beantwortung.
      </p>

      <h2>Schriften</h2>
      <p>
        Die verwendeten Schriften Archivo und Chivo Mono werden beim Erstellen der Website
        heruntergeladen und von unserem eigenen Server ausgeliefert. Beim Besuch dieser Seite
        wird <strong>keine Verbindung zu Google-Servern aufgebaut</strong>, es werden keine
        Daten an Google übertragen.
      </p>

      <h2>Externe Links</h2>
      <p>
        Auf einigen Seiten verlinken wir nach außen, etwa zum Fahrzeugbestand auf AutoScout24
        oder zur Routenplanung bei Google Maps. Diese Links sind gewöhnliche Verweise: Erst wenn
        Sie darauf klicken, wird eine Verbindung zum jeweiligen Anbieter hergestellt und Ihre
        IP-Adresse dorthin übertragen. Auf die Datenverarbeitung dieser Anbieter haben wir
        keinen Einfluss; es gelten deren Datenschutzbestimmungen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>Sie haben uns gegenüber jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>
          Widerspruch gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen
          (Art. 21 DSGVO)
        </li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 DSGVO)</li>
      </ul>
      <p>
        Wenden Sie sich dafür einfach an{' '}
        <a href={`mailto:${betrieb.email}`}>{betrieb.email}</a>.
      </p>

      <h2>Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns
        zuständig ist:
      </p>
      <p>
        Die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt
        Bremen
        <br />
        Arndtstraße 1, 27570 Bremerhaven
        <br />
        <a href="https://www.datenschutz.bremen.de" target="_blank" rel="noopener noreferrer">
          datenschutz.bremen.de
        </a>
      </p>

      <h2>SSL-Verschlüsselung</h2>
      <p>
        Diese Seite wird ausschließlich verschlüsselt über HTTPS ausgeliefert. Sie erkennen das
        am Schloss-Symbol in der Adresszeile Ihres Browsers. Ihre Formulareingaben können damit
        auf dem Übertragungsweg nicht mitgelesen werden.
      </p>

      <h2>Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder die
        Datenverarbeitung auf dieser Website ändert.
      </p>
      <p>
        Die orange markierten Stellen sind vor der Veröffentlichung durch den Betrieb zu prüfen
        und zu ergänzen. Dieser Text ist eine sorgfältig erstellte Vorlage und ersetzt keine
        Rechtsberatung.
      </p>
    </Rechtstext>
  )
}
