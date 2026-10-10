/**
 * Cut X empty-state illustrations — pure inline SVG, zero network requests.
 * Replaces the old remote Lottie animations (lottie.host), which were slow,
 * login-independent third-party calls and sometimes failed to load entirely.
 */

interface ArtProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

function Frame({ width = 170, height = 170, className, children, label }: ArtProps & { children: React.ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={label}
    >
      <circle cx="100" cy="100" r="86" fill="hsl(var(--muted))" opacity="0.35" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="6 8" opacity="0.8" />
      {children}
    </svg>
  );
}

function XMark({ x, y, s, color = "#E10600" }: { x: number; y: number; s: number; color?: string }) {
  const t = s / 2;
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={s * 0.26} strokeLinecap="round">
      <line x1={-t} y1={-t} x2={t} y2={t} />
      <line x1={t} y1={-t} x2={-t} y2={t} />
    </g>
  );
}

export function EmptyBagArt(props: ArtProps) {
  return (
    <Frame {...props} label="Empty shopping bag">
      <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <path d="M68 82 h64 l-6 62 a8 8 0 0 1 -8 7 h-36 a8 8 0 0 1 -8 -7 Z" />
        <path d="M84 82 v-6 a16 16 0 0 1 32 0 v6" />
      </g>
      <XMark x={100} y={118} s={26} />
    </Frame>
  );
}

export function NoResultsArt(props: ArtProps) {
  return (
    <Frame {...props} label="No results found">
      <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="7" strokeLinecap="round" opacity="0.85">
        <circle cx="92" cy="92" r="34" />
        <line x1="117" y1="117" x2="140" y2="140" />
      </g>
      <XMark x={92} y={92} s={22} />
    </Frame>
  );
}

export function SuccessCheckArt(props: ArtProps) {
  return (
    <Frame {...props} label="Order confirmed">
      <circle cx="100" cy="100" r="44" fill="#16a34a" opacity="0.15" />
      <circle cx="100" cy="100" r="44" fill="none" stroke="#16a34a" strokeWidth="7" />
      <path
        d="M82 101 l13 13 l24 -27"
        fill="none"
        stroke="#16a34a"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}
