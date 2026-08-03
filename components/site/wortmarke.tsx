/**
 * Wortmarke im Katalogstil: der Name als Positionseintrag, mit der
 * Ordnungsnummer davor. Ersetzt das fehlende Logo — und ist so gebaut,
 * dass sie stehen bleiben kann, wenn eine Logodatei nachgeliefert wird.
 *
 * PLATZHALTER: Sobald ein echtes Logo vorliegt, wird diese Komponente durch
 * ein <Image> ersetzt. Die Maße (Höhe 32 px in der Kopfzeile) bleiben gleich.
 */
export function Wortmarke({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 268 40"
      className={className}
      role="img"
      aria-label="Automobile Beckmann"
      fill="none"
    >
      {/* Positionsmarke */}
      <rect x="0" y="4" width="32" height="32" fill="var(--color-signal-500)" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        dominantBaseline="middle"
        className="pos-nummer"
        fontSize="14"
        fill="var(--color-ink-950)"
      >
        AB
      </text>

      <text
        x="43"
        y="17"
        dominantBaseline="middle"
        fontSize="15.5"
        fontWeight="900"
        letterSpacing="-0.02em"
        fill="currentColor"
        fontFamily="var(--font-display)"
      >
        AUTOMOBILE BECKMANN
      </text>
      <text
        x="43.5"
        y="31"
        dominantBaseline="middle"
        className="katalog-label"
        fontSize="8.2"
        fill="currentColor"
        opacity="0.62"
      >
        KFZ-MEISTERBETRIEB BREMEN
      </text>
    </svg>
  )
}
