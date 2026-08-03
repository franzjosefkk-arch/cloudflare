import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next 16 liefert bereits Flat-Config-Arrays; der Umweg über
 * FlatCompat ist nicht mehr nötig (und bricht mit dieser Version).
 */
const config = [
  {
    ignores: [
      'out/**',
      '.next/**',
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
]

export default config
