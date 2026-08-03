import { verarbeiteAnfrage, type AnfrageEnv } from '../lib/anfrage'

/**
 * Der Worker vor der Website.
 *
 * Cloudflare liefert den statischen Export aus `out/` über die
 * Assets-Bindung aus. Dieser Worker läuft nur davor, um den einen Endpunkt zu
 * bedienen, den eine statische Seite nicht selbst haben kann: die
 * Terminanfrage. Alles andere reicht er unverändert an die Assets weiter.
 */

type Env = AnfrageEnv & {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/anfrage') {
      if (request.method !== 'POST') {
        return new Response(null, { status: 405, headers: { Allow: 'POST' } })
      }
      return verarbeiteAnfrage(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}

export default worker
