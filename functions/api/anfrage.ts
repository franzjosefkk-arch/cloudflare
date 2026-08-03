import { verarbeiteAnfrage, type AnfrageEnv } from '../../lib/anfrage'

/**
 * Cloudflare Pages Function für die Terminanfrage.
 *
 * Nur die Hülle: Die Verarbeitung steht in `lib/anfrage.ts` und wird
 * gleichlautend von `worker/index.ts` benutzt. So funktionieren beide
 * Deployment-Wege — Pages und Worker mit statischen Assets — ohne dass die
 * Logik doppelt gepflegt werden muss.
 *
 * Es wird bewusst nur `onRequestPost` exportiert: Pages beantwortet damit jede
 * andere Methode selbst mit 405.
 */
export const onRequestPost = ({
  request,
  env,
}: {
  request: Request
  env: AnfrageEnv
}): Promise<Response> => verarbeiteAnfrage(request, env)
