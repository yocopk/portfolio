import { cn } from "@/lib/utils";

export type EmblemKind =
  | "enso"
  | "sakura"
  | "kikko"
  | "seigaiha"
  | "tomoe"
  | "yagasuri"
  | "shippo"
  | "asanoha"
  | "torii"
  | "hanabishi";

interface JapaneseEmblemProps {
  kind: EmblemKind;
  className?: string;
  strokeWidth?: number;
  accent?: boolean;
}

/**
 * Geometric Japanese emblems — Mon (家紋) inspired SVG marks.
 * Used as section icons, page identifiers, and decorative motifs.
 * No kanji — pure geometry.
 */
export function JapaneseEmblem({
  kind,
  className,
  strokeWidth = 1.4,
  accent = false,
}: JapaneseEmblemProps) {
  const color = accent ? "var(--color-shu)" : "currentColor";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("block", className)}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "enso" && (
        /* 円相 — zen circle, slightly open */
        <g>
          <path
            d="M 50 32 A 18 18 0 1 1 32 14 A 18 18 0 0 1 49.5 28"
            strokeLinecap="round"
          />
          <circle cx="49.5" cy="28" r="0.9" fill={color} stroke="none" />
        </g>
      )}

      {kind === "sakura" && (
        /* 桜 — five-petal cherry blossom */
        <g>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const cx = 32 + Math.cos(angle) * 11;
            const cy = 32 + Math.sin(angle) * 11;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="7"
                ry="10"
                transform={`rotate(${i * 72} ${cx} ${cy})`}
              />
            );
          })}
          <circle cx="32" cy="32" r="2.4" fill={color} stroke="none" />
        </g>
      )}

      {kind === "kikko" && (
        /* 亀甲 — hexagonal tortoise shell */
        <g>
          {[
            [32, 14],
            [32, 50],
            [16, 23],
            [16, 41],
            [48, 23],
            [48, 41],
          ].map(([cx, cy], i) => (
            <polygon
              key={i}
              points={hexPoints(cx, cy, 9)}
            />
          ))}
          <polygon points={hexPoints(32, 32, 9)} stroke={color} fill="none" />
        </g>
      )}

      {kind === "seigaiha" && (
        /* 青海波 — concentric wave arcs */
        <g>
          <circle cx="32" cy="40" r="20" />
          <circle cx="32" cy="40" r="14" />
          <circle cx="32" cy="40" r="8" />
          <circle cx="32" cy="40" r="2.5" />
          <path d="M 8 40 L 56 40" />
        </g>
      )}

      {kind === "tomoe" && (
        /* 三つ巴 — three commas rotating */
        <g transform="translate(32 32)">
          {[0, 120, 240].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path
                d="M 0 0 C 8 -2, 14 -10, 8 -18 C 2 -22, -6 -18, -4 -10 C -2 -4, 0 0, 0 0 Z"
                fill={color}
                stroke="none"
              />
            </g>
          ))}
          <circle cx="0" cy="0" r="20" stroke={color} fill="none" />
        </g>
      )}

      {kind === "yagasuri" && (
        /* 矢絣 — fletched-arrow pattern */
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const x = 10 + col * 18;
              const y = 14 + row * 18;
              return (
                <g key={`${row}-${col}`}>
                  <path d={`M ${x} ${y} L ${x + 6} ${y + 8} L ${x + 12} ${y}`} />
                  <path d={`M ${x} ${y + 4} L ${x + 6} ${y + 12} L ${x + 12} ${y + 4}`} />
                </g>
              );
            }),
          )}
        </g>
      )}

      {kind === "shippo" && (
        /* 七宝 — overlapping circles (seven treasures) */
        <g>
          <circle cx="32" cy="20" r="12" />
          <circle cx="32" cy="44" r="12" />
          <circle cx="20" cy="32" r="12" />
          <circle cx="44" cy="32" r="12" />
          <circle cx="32" cy="32" r="2.5" fill={color} stroke="none" />
        </g>
      )}

      {kind === "asanoha" && (
        /* 麻の葉 — hemp leaf */
        <g transform="translate(32 32)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1="0" y1="0" x2="0" y2="-18" />
              <line x1="0" y1="0" x2="9" y2="-15.6" />
            </g>
          ))}
          <polygon points={hexPoints(0, 0, 18)} stroke={color} fill="none" />
        </g>
      )}

      {kind === "torii" && (
        /* 鳥居 — sacred gate, very simplified */
        <g>
          <path d="M 10 18 L 54 18" />
          <path d="M 6 24 L 58 24" />
          <line x1="18" y1="24" x2="18" y2="48" />
          <line x1="46" y1="24" x2="46" y2="48" />
          <line x1="32" y1="24" x2="32" y2="32" />
          <line x1="22" y1="32" x2="42" y2="32" />
        </g>
      )}

      {kind === "hanabishi" && (
        /* 花菱 — diamond floral, four-petal */
        <g transform="translate(32 32)">
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path d="M 0 0 Q 4 -10, 0 -20 Q -4 -10, 0 0 Z" />
            </g>
          ))}
          <circle cx="0" cy="0" r="2" fill={color} stroke="none" />
        </g>
      )}
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const a = ((i * 60 - 30) * Math.PI) / 180;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    })
    .join(" ");
}
