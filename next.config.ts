import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Statischer Export nach ./out — wird von Cloudflare Pages ausgeliefert.
  output: 'export',
  // Cloudflare Pages liefert Verzeichnisse aus; trailingSlash hält die URLs stabil.
  trailingSlash: true,
  // Ohne Node-Server gibt es keinen Bildoptimierer. Alle Bilder liegen
  // vorskaliert im Repo bzw. sind handgezeichnetes SVG.
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
