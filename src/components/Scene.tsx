// Placeholder artwork so the project runs with no image assets.
// Swap for real <img> tags (or a CMS image URL) when photography is supplied.
const PALETTE = {
  green: ['#1d4a2e', '#2f7a4b', '#8fc08a'],
  gold: ['#7a5a1e', '#c99a3a', '#f0d89a'],
  sky: ['#1e4f73', '#3f86b3', '#bfe0f0'],
  sand: ['#8a7455', '#cdb994', '#f2e8d5'],
} as const;

export type Tone = keyof typeof PALETTE;

export default function Scene({ tone = 'green', label, className }: { tone?: Tone; label?: string; className?: string }) {
  const [a, b, c] = PALETTE[tone];
  return (
    <svg
      className={className}
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`sky-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c} />
          <stop offset="1" stopColor="#fff" stopOpacity=".6" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#sky-${tone})`} />
      <circle cx="310" cy="60" r="26" fill="#fff" opacity=".65" />
      <path d="M0 150 Q90 100 180 140 T400 120 V260 H0Z" fill={b} />
      <path d="M0 190 Q120 150 230 185 T400 170 V260 H0Z" fill={a} />
      <ellipse cx="120" cy="225" rx="70" ry="12" fill={c} opacity=".55" />
      <path d="M255 190v-48" stroke="#f7f3ea" strokeWidth="2.5" />
      <path d="M255 142l22 9-22 9z" fill="#d9b45b" />
    </svg>
  );
}
