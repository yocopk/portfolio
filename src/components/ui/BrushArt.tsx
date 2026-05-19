import { cn } from "@/lib/utils";

interface BrushArtProps {
  variant: "mountain" | "wave" | "bamboo" | "circle";
  accent?: "shu" | "sumi" | "gold";
  className?: string;
}

/**
 * Decorative sumi-e style SVG illustrations.
 * Used as project card backgrounds — abstract, brushy, never literal.
 */
export function BrushArt({ variant, accent = "sumi", className }: BrushArtProps) {
  const inkColor =
    accent === "shu"
      ? "var(--color-shu)"
      : accent === "gold"
        ? "var(--color-gold)"
        : "var(--color-sumi)";

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {variant === "mountain" && (
        <g style={{ color: inkColor }}>
          {/* Distant mountain silhouettes */}
          <path
            d="M 0 280 C 60 240, 110 260, 160 230 C 210 200, 250 240, 300 220 C 340 205, 380 230, 400 215 L 400 400 L 0 400 Z"
            fill="currentColor"
            opacity="0.08"
          />
          <path
            d="M 0 320 C 70 290, 130 310, 200 295 C 260 282, 320 305, 400 290 L 400 400 L 0 400 Z"
            fill="currentColor"
            opacity="0.15"
          />
          {/* Sun/Moon */}
          <circle cx="310" cy="120" r="38" fill="var(--color-shu)" opacity="0.85" />
          <circle cx="310" cy="120" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          {/* Stray brush stroke */}
          <path
            d="M 40 100 Q 120 80, 200 105 T 360 95"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.25"
          />
        </g>
      )}

      {variant === "wave" && (
        <g style={{ color: inkColor }}>
          {/* Hokusai-inspired wave abstraction */}
          <path
            d="M 0 260 C 80 220, 130 280, 200 240 C 260 208, 320 270, 400 240 L 400 400 L 0 400 Z"
            fill="currentColor"
            opacity="0.1"
          />
          <path
            d="M 0 300 C 60 270, 140 320, 220 285 C 300 255, 360 305, 400 290 L 400 400 L 0 400 Z"
            fill="currentColor"
            opacity="0.18"
          />
          {/* Foam swirls */}
          <circle cx="120" cy="200" r="6" fill="currentColor" opacity="0.3" />
          <circle cx="150" cy="180" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="240" cy="195" r="4" fill="currentColor" opacity="0.28" />
          <circle cx="280" cy="170" r="2" fill="currentColor" opacity="0.2" />
          {/* Splash brushstroke */}
          <path
            d="M 60 220 C 110 180, 150 230, 200 195 C 250 168, 290 220, 350 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      )}

      {variant === "bamboo" && (
        <g style={{ color: inkColor }}>
          {/* Bamboo stalks */}
          {[80, 160, 240, 320].map((x, i) => (
            <g key={x} opacity={0.18 + i * 0.04}>
              <line
                x1={x}
                y1="20"
                x2={x + (i % 2 === 0 ? -8 : 8)}
                y2="400"
                stroke="currentColor"
                strokeWidth={6 + i}
                strokeLinecap="round"
              />
              {/* Joints */}
              {[80, 160, 240, 320].map((y) => (
                <line
                  key={`${x}-${y}`}
                  x1={x - 8}
                  y1={y}
                  x2={x + 8}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              ))}
            </g>
          ))}
          {/* Stray leaf */}
          <path
            d="M 100 100 Q 130 90, 150 75 Q 130 95, 105 110 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </g>
      )}

      {variant === "circle" && (
        <g style={{ color: inkColor }}>
          {/* Multiple concentric enso circles */}
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="850 30"
            transform="rotate(-90 200 200)"
            opacity="0.15"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="600 30"
            transform="rotate(-70 200 200)"
            opacity="0.25"
          />
          {/* Hanko stamp accent */}
          <rect
            x="280"
            y="280"
            width="48"
            height="48"
            rx="3"
            fill="var(--color-shu)"
            opacity="0.85"
          />
        </g>
      )}
    </svg>
  );
}
