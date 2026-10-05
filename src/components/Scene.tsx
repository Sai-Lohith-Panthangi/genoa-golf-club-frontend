import { useId, useMemo } from 'react';

/**
 * Procedural landscape artwork used wherever the site needs a photo and no
 * photography has been supplied. Deterministic per `seed`, so the same slot
 * always renders the same picture. With `live` the scene animates (clouds,
 * flag, water glints, a slow camera push) and is also what the video clips in
 * public/media were rendered from (see scripts/render-videos.mjs).
 */
export type Variant = 'lake' | 'ranch' | 'clubhouse' | 'sunset' | 'dawn';
export type Tone = 'green' | 'gold' | 'sky' | 'sand';

const TONE_TO_VARIANT: Record<Tone, Variant> = { green: 'lake', gold: 'ranch', sky: 'dawn', sand: 'sunset' };

interface Theme {
  skyTop: string; skyBot: string; sun: string; sunX: number; sunY: number; sunR: number;
  far: string; mid: string; tree: string; grassA: string; grassB: string; rough: string;
  water?: [string, string]; fog?: boolean; cloud: string;
}

const THEMES: Record<Variant, Theme> = {
  lake: { skyTop: '#3f86c4', skyBot: '#d4ebf5', sun: '#fff7d9', sunX: 610, sunY: 120, sunR: 26, far: '#6d8cab', mid: '#4e7a69', tree: '#1d4a31', grassA: '#67b45a', grassB: '#4a9a47', rough: '#2f7a3b', water: ['#2f78ab', '#9ad0e6'], cloud: '#ffffff' },
  ranch: { skyTop: '#5c9fd4', skyBot: '#f7e6b8', sun: '#fff2c4', sunX: 180, sunY: 130, sunR: 28, far: '#a28f7c', mid: '#8f8d5c', tree: '#4b5a28', grassA: '#c2b45c', grassB: '#a99d47', rough: '#8a7f35', cloud: '#fffaf0' },
  clubhouse: { skyTop: '#4f93cf', skyBot: '#e6f1f6', sun: '#fffbe6', sunX: 130, sunY: 110, sunR: 24, far: '#7b96b0', mid: '#52806c', tree: '#21503a', grassA: '#6fb85f', grassB: '#57a24d', rough: '#357f3d', cloud: '#ffffff' },
  sunset: { skyTop: '#37357a', skyBot: '#f7a063', sun: '#ffd58a', sunX: 520, sunY: 230, sunR: 44, far: '#5d4a78', mid: '#4a3f5d', tree: '#171f2a', grassA: '#3f6a4a', grassB: '#2f5640', rough: '#1f3f33', water: ['#c9654f', '#fbc57d'], cloud: '#ffc79a' },
  dawn: { skyTop: '#8fabd3', skyBot: '#fbdcd2', sun: '#fff1e2', sunX: 430, sunY: 235, sunR: 34, far: '#98a4c0', mid: '#7a9a9a', tree: '#38594f', grassA: '#82b87f', grassB: '#6aa270', rough: '#4a8559', water: ['#86a6c8', '#ecd5d5'], fog: true, cloud: '#fff4ee' },
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);

function buildGeometry(seed: number) {
  const r = rng(seed);
  // jagged distant Sierra ridge
  let far = 'M0 330 ';
  for (let x = 0; x <= 840; x += 34) far += `L${x} ${(190 + r() * 55 - Math.sin(x / 140) * 18).toFixed(1)} `;
  far += 'L800 330Z';
  // rolling mid ridge
  const p1 = r() * 6, p2 = r() * 6;
  let mid = 'M0 330 ';
  for (let x = 0; x <= 800; x += 10) mid += `L${x} ${(238 + Math.sin(x / 90 + p1) * 12 + Math.sin(x / 41 + p2) * 5).toFixed(1)} `;
  mid += 'L800 330Z';
  // pine line
  let trees = '';
  for (let x = -6; x < 810; x += 7 + r() * 9) {
    const edge = Math.max(0, 1 - Math.min(x, 800 - x) / 220);
    const h = 16 + r() * 16 + edge * 26;
    const b = 270 + r() * 7;
    const w = h * 0.3;
    trees += `M${x.toFixed(1)} ${(b - h).toFixed(1)}L${(x + w).toFixed(1)} ${b}L${(x - w).toFixed(1)} ${b}Z`;
  }
  return { far, mid, trees, flagX: 150 + r() * 160, birdY: 90 + r() * 40 };
}

interface Props {
  tone?: Tone;
  variant?: Variant;
  seed?: number;
  label?: string;
  className?: string;
  live?: boolean;
}

export default function Scene({ tone = 'green', variant, seed, label, className, live = false }: Props) {
  const v = variant ?? TONE_TO_VARIANT[tone];
  const t = THEMES[v];
  const uid = useId().replace(/:/g, '');
  const s = seed ?? hash(label ?? v) + 11;
  const g = useMemo(() => buildGeometry(s), [s]);
  const id = (n: string) => `${n}-${uid}`;
  const hasPond = !!t.water;
  const fx = g.flagX;

  return (
    <svg
      className={`scene${live ? ' live' : ''}${className ? ` ${className}` : ''}`}
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.skyTop} /><stop offset=".72" stopColor={t.skyBot} />
        </linearGradient>
        <radialGradient id={id('glow')}>
          <stop offset="0" stopColor={t.sun} stopOpacity=".95" /><stop offset=".35" stopColor={t.sun} stopOpacity=".35" /><stop offset="1" stopColor={t.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('fair')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.grassA} /><stop offset="1" stopColor={t.grassB} />
        </linearGradient>
        <pattern id={id('mow')} width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <rect width="23" height="46" fill="#fff" opacity=".07" />
        </pattern>
        <clipPath id={id('pond')}><path d="M310 324Q430 302 590 318Q665 336 565 354Q425 374 318 352Q268 338 310 324Z" /></clipPath>
        {t.water && (
          <linearGradient id={id('water')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.water[1]} /><stop offset="1" stopColor={t.water[0]} />
          </linearGradient>
        )}
        <linearGradient id={id('refl')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.sun} stopOpacity=".75" /><stop offset="1" stopColor={t.sun} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('vig')} cx=".5" cy=".5" r=".75">
          <stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".34" />
        </radialGradient>
        <linearGradient id={id('haze')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.skyBot} stopOpacity="0" /><stop offset="1" stopColor={t.skyBot} stopOpacity=".85" />
        </linearGradient>
        {live && (
          <filter id={id('grain')} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="3" />
            <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .5 0" />
          </filter>
        )}
      </defs>

      <rect width="800" height="450" fill={`url(#${id('sky')})`} />

      <g className="a-pan">
        <circle cx={t.sunX} cy={t.sunY} r="170" fill={`url(#${id('glow')})`} className="a-glow" />
        <circle cx={t.sunX} cy={t.sunY} r={t.sunR} fill={t.sun} />

        {/* clouds: overlapping ellipses with a soft halo, no filters */}
        <g className="a-drift-a" fill={t.cloud}>
          <g opacity=".25"><ellipse cx="170" cy="92" rx="92" ry="22" /></g>
          <g opacity=".85"><ellipse cx="150" cy="90" rx="62" ry="14" /><ellipse cx="190" cy="82" rx="42" ry="14" /><ellipse cx="120" cy="86" rx="36" ry="10" /></g>
        </g>
        <g className="a-drift-b" fill={t.cloud}>
          <g opacity=".22"><ellipse cx="520" cy="62" rx="110" ry="22" /></g>
          <g opacity=".8"><ellipse cx="520" cy="60" rx="70" ry="12" /><ellipse cx="560" cy="54" rx="40" ry="12" /></g>
        </g>
        <g className="a-drift-a" fill={t.cloud} opacity=".7">
          <ellipse cx="690" cy="140" rx="55" ry="9" /><ellipse cx="720" cy="134" rx="30" ry="9" />
        </g>

        <path d={g.far} fill={t.far} />
        <path d={g.far} fill={`url(#${id('haze')})`} />
        <path d={g.mid} fill={t.mid} />
        <path d={g.trees} fill={t.tree} />
        {t.fog && <rect y="240" width="800" height="60" fill={`url(#${id('haze')})`} opacity=".9" className="a-glow" />}

        {/* fairway */}
        <path d="M0 450V305Q180 268 400 296T800 282V450Z" fill={`url(#${id('fair')})`} />
        <path d="M0 450V305Q180 268 400 296T800 282V450Z" fill={`url(#${id('mow')})`} />

        {hasPond && (
          <g>
            <path d="M300 322Q420 296 600 314Q690 336 570 360Q420 384 310 356Q250 338 300 322Z" fill={t.grassB} opacity=".9" />
            <path d="M310 324Q430 302 590 318Q665 336 565 354Q425 374 318 352Q268 338 310 324Z" fill={`url(#${id('water')})`} />
            <g clipPath={`url(#${id('pond')})`}>
              <rect x={450} y="310" width="80" height="70" fill={`url(#${id('refl')})`} opacity=".85" />
            </g>
            <g stroke="#fff" strokeLinecap="round" strokeWidth="2" opacity=".5">
              <line className="a-shim-a" x1="380" y1="334" x2="430" y2="334" />
              <line className="a-shim-b" x1="470" y1="342" x2="540" y2="342" />
              <line className="a-shim-c" x1="400" y1="350" x2="450" y2="350" />
              <line className="a-shim-a" x1="520" y1="330" x2="560" y2="330" />
            </g>
          </g>
        )}

        {/* green, bunker, flag */}
        <ellipse cx={fx} cy="332" rx="70" ry="12" fill={t.grassA} />
        <ellipse cx={fx} cy="331" rx="58" ry="9" fill="#fff" opacity=".1" />
        <ellipse cx={fx + 84} cy="338" rx="26" ry="6" fill="#e9dfb9" />
        <line x1={fx} y1="332" x2={fx} y2="284" stroke="#f7f3ea" strokeWidth="2.4" />
        <path className="a-flag" d={`M${fx} 284 L${fx + 24} 290 L${fx} 297Z`} fill={v === 'sunset' ? '#ffd58a' : '#e0523f'} />

        {v === 'ranch' && (
          <g>
            <g fill="#6b4a2f">{[560, 600, 640, 680, 720, 760].map((x) => <rect key={x} x={x} y={300 - (x - 560) * 0.03} width="3" height="16" />)}</g>
            <path d="M556 306H762M556 312H762" stroke="#6b4a2f" strokeWidth="2" />
            <g transform="translate(655 262)"><rect width="50" height="30" fill="#a8452f" /><path d="M-5 0L25 -18L55 0Z" fill="#7a2f20" /><rect x="19" y="12" width="12" height="18" fill="#4d1d13" /></g>
            <g transform="translate(70 270)"><rect x="-6" y="30" width="12" height="46" fill="#4a3320" /><circle cx="0" cy="18" r="42" fill="#3d5524" /><circle cx="-28" cy="34" r="26" fill="#486a2a" /><circle cx="28" cy="34" r="28" fill="#44622a" /></g>
          </g>
        )}

        {v === 'clubhouse' && (
          <g transform="translate(520 226)">
            <rect x="-10" y="60" width="240" height="14" fill="#c9bfa4" />
            <rect x="0" y="22" width="220" height="40" fill="#efe6d2" />
            <path d="M-14 24L110 -22L234 24Z" fill="#7a3f2c" />
            <rect x="92" y="-6" width="36" height="30" fill="#efe6d2" /><path d="M86 -6L110 -26L134 -6Z" fill="#7a3f2c" />
            <g fill="#ffd98a" className="a-flicker">{[16, 52, 140, 176].map((x) => <rect key={x} x={x} y="32" width="22" height="22" />)}<rect x="98" y="2" width="24" height="16" /></g>
            <rect x="100" y="38" width="20" height="24" fill="#5b3a28" />
            <g fill="#f7f3ea">{[8, 70, 130, 200].map((x) => <rect key={x} x={x} y="26" width="4" height="36" />)}</g>
          </g>
        )}

        {v === 'sunset' && (
          <g transform="translate(160 262)" fill="none" stroke="#f7efe6" strokeWidth="3" strokeLinecap="round">
            <path d="M0 60V8Q30 -16 60 8V60" />
            <g fill="#f4a6b8" stroke="none">{[[2, 14], [12, 2], [30, -6], [48, 2], [58, 14], [8, 30]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y + 8} r="4" />)}</g>
          </g>
        )}

        {/* foreground rough */}
        <path d="M0 450V392Q200 366 410 398T800 380V450Z" fill={t.rough} />
        <path d="M0 450V420Q220 400 430 424T800 412V450Z" fill="#000" opacity=".18" />

        <g className="a-bird" fill="none" stroke={v === 'sunset' ? '#1c1c2e' : '#2b3a40'} strokeWidth="2" strokeLinecap="round">
          <path d={`M300 ${g.birdY}q7 -8 14 0q7 -8 14 0`} />
          <path d={`M340 ${g.birdY + 18}q5 -6 10 0q5 -6 10 0`} />
        </g>
      </g>

      <rect width="800" height="450" fill={`url(#${id('vig')})`} />
      {live && <rect width="800" height="450" filter={`url(#${id('grain')})`} opacity=".14" />}
    </svg>
  );
}
