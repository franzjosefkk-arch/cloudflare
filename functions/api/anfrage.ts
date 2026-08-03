/**
 * Cloudflare Pages Function: nimmt die Terminanfrage entgegen und schickt sie
 * per Resend an den Betrieb.
 *
 * Läuft neben dem statischen Export: Pages liefert `out/` aus und führt alles
 * unter `functions/` als Worker aus. Die Seite bleibt also ein reiner Export,
 * bekommt aber trotzdem einen Endpunkt.
 *
 * Benötigte Umgebungsvariablen (Cloudflare Pages → Settings → Environment
 * variables), siehe DEPLOYMENT.md:
 *   RESEND_API_KEY   Secret. API-Schlüssel von resend.com
 *   EMPFAENGER       z. B. info@automobilebeckmann.de
 *   ABSENDER         verifizierte Absenderadresse, z. B.
 *                    "Website Automobile Beckmann <website@automobilebeckmann.de>"
 *
 * Ohne gesetzten RESEND_API_KEY antwortet der Endpunkt mit 503, und das
 * Formular zeigt dem Besucher Telefonnummer und E-Mail-Link an. Es geht also
 * nie eine Anfrage still verloren.
 */

type Env = {
  RESEND_API_KEY?: string
  EMPFAENGER?: string
  ABSENDER?: string
}

type PagesContext = {
  request: Request
  env: Env
}

type Anfrage = {
  anliegen?: unknown
  fahrzeug?: unknown
  ersatzwagen?: unknown
  wunschtermin?: unknown
  name?: unknown
  telefon?: unknown
  email?: unknown
  nachricht?: unknown
}

const MAX_LAENGE = 2000

function text(wert: unknown, max = 200): string {
  if (typeof wert !== 'string') return ''
  return wert.trim().slice(0, max)
}

function antwort(daten: object, status: number): Response {
  return new Response(JSON.stringify(daten), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

/** Verhindert, dass Eingaben als HTML in der Mail landen. */
function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {
  let roh: Anfrage
  try {
    roh = (await request.json()) as Anfrage
  } catch {
    return antwort({ fehler: 'Ungültige Anfrage.' }, 400)
  }

  const a = {
    anliegen: text(roh.anliegen, 80),
    fahrzeug: text(roh.fahrzeug, 160),
    ersatzwagen: text(roh.ersatzwagen, 10) === 'ja' ? 'Ja, bitte' : 'Nein',
    wunschtermin: text(roh.wunschtermin, 20),
    name: text(roh.name, 120),
    telefon: text(roh.telefon, 40),
    email: text(roh.email, 160),
    nachricht: text(roh.nachricht, MAX_LAENGE),
  }

  // Dieselben Pflichtfelder wie im Formular — der Client ist nie die
  // einzige Prüfinstanz.
  if (!a.anliegen || a.fahrzeug.length < 2 || a.name.length < 2 || a.telefon.length < 5) {
    return antwort({ fehler: 'Bitte füllen Sie die Pflichtfelder aus.' }, 422)
  }
  if (a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email)) {
    return antwort({ fehler: 'Die E-Mail-Adresse ist ungültig.' }, 422)
  }
  // Zeilenumbrüche in Kopfzeilen sind der klassische Weg, eine Mail zu kapern.
  if (/[\r\n]/.test(a.name) || /[\r\n]/.test(a.email)) {
    return antwort({ fehler: 'Ungültige Zeichen in den Angaben.' }, 422)
  }

  const apiKey = env.RESEND_API_KEY
  const empfaenger = env.EMPFAENGER ?? 'info@automobilebeckmann.de'
  const absender = env.ABSENDER ?? 'Website <onboarding@resend.dev>'

  if (!apiKey) {
    return antwort(
      { fehler: 'Der Versand ist noch nicht eingerichtet (RESEND_API_KEY fehlt).' },
      503,
    )
  }

  const zeilen: [string, string][] = [
    ['Anliegen', a.anliegen],
    ['Fahrzeug', a.fahrzeug],
    ['Ersatzwagen', a.ersatzwagen],
    ['Wunschtermin ab', a.wunschtermin || '—'],
    ['Name', a.name],
    ['Telefon', a.telefon],
    ['E-Mail', a.email || '—'],
  ]

  const html = `<!doctype html><html lang="de"><body style="font-family:system-ui,sans-serif;color:#0a1826">
<h2 style="margin:0 0 4px">Terminanfrage über die Website</h2>
<p style="margin:0 0 20px;color:#1f4256">${escape(a.anliegen)} — ${escape(a.fahrzeug)}</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
${zeilen
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="padding:8px 16px 8px 0;border-bottom:1px solid #e5eaee;font-size:13px;color:#1f4256;white-space:nowrap;vertical-align:top">${escape(
        k,
      )}</th><td style="padding:8px 0;border-bottom:1px solid #e5eaee;font-size:15px;font-weight:600">${escape(
        v,
      )}</td></tr>`,
  )
  .join('')}
</table>
${
  a.nachricht
    ? `<h3 style="margin:24px 0 6px;font-size:14px">Nachricht</h3><p style="margin:0;white-space:pre-wrap;line-height:1.6">${escape(
        a.nachricht,
      )}</p>`
    : ''
}
<p style="margin:28px 0 0;font-size:12px;color:#2d5a72">
Der Kunde erwartet einen Rückruf innerhalb eines Werktags.
</p>
</body></html>`

  const klartext = [
    'Terminanfrage über die Website',
    '',
    ...zeilen.map(([k, v]) => `${k}: ${v}`),
    ...(a.nachricht ? ['', 'Nachricht:', a.nachricht] : []),
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: absender,
        to: [empfaenger],
        // Antwortet der Betrieb auf die Mail, landet sie beim Kunden.
        ...(a.email ? { reply_to: a.email } : {}),
        subject: `Terminanfrage: ${a.anliegen} — ${a.name}`,
        html,
        text: klartext,
      }),
    })

    if (!res.ok) {
      return antwort({ fehler: 'Der Versand ist fehlgeschlagen.' }, 502)
    }
  } catch {
    return antwort({ fehler: 'Der Versand ist fehlgeschlagen.' }, 502)
  }

  return antwort({ ok: true }, 200)
}

// Es wird bewusst nur `onRequestPost` exportiert: Pages beantwortet damit jede
// andere Methode selbst mit 405, ohne dass wir einen Catch-all brauchen.
