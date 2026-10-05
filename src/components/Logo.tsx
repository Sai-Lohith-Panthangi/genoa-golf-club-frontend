/** Wordmark: letter-spaced GENOA over a mountain mark over GOLF CLUB. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 132 68" role="img" aria-label="Genoa Golf Club" fill="none">
      <text x="66" y="14" textAnchor="middle" fill="#d9c27a" fontFamily="'Playfair Display Variable', Georgia, serif" fontSize="14" letterSpacing="7" fontWeight="500">GENOA</text>
      <path d="M8 46L36 22L52 36L66 26L86 44L102 30L124 46Z" fill="#5fae6e" />
      <path d="M36 22L52 36L40 46L22 46Z" fill="#a9d6b0" />
      <path d="M66 26L86 44L70 46L50 46Z" fill="#a9d6b0" />
      <path d="M102 30L124 46L98 46L90 40Z" fill="#a9d6b0" />
      <text x="66" y="62" textAnchor="middle" fill="#d9c27a" fontFamily="'Playfair Display Variable', Georgia, serif" fontSize="11" letterSpacing="5" fontWeight="500">GOLF CLUB</text>
    </svg>
  );
}
