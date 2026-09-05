import type { CSSProperties, SVGProps } from "react";

/**
 * Line-icon paths transcribed from the artboards. Every icon is drawn on
 * a 24x24 grid with a 1.5 stroke in forest green unless overridden.
 */
export const ICON_PATHS = {
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  briefcase: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 7V4h6v3M3 12h18",
  passport:
    "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M8.5 17a3.5 3.5 0 0 1 7 0",
  building: "M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4",
  shield: "M12 3l7 3v5c0 4.5-3 7.8-7 10-4-2.2-7-5.5-7-10V6zM9.5 12l2 2 3.5-4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7v5l3 2",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  compare: "M4 6h16M4 12h16M4 18h10",
  fund: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 7V4h6v3M3 12h18",
  family: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M7 15h4",
  tax: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  points: "M3 17l6-6 4 4 8-8M15 7h6v6",
  route: "M6 3v12a3 3 0 0 0 3 3h9M18 15l3 3-3 3M6 3l-3 3M6 3l3 3",
  cert: "M4 4h16v12H4zM8 20h8M12 16v4M8 9h8M8 12h5",
  home: "M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4",
} as const;

export type IconName = keyof typeof ICON_PATHS;

type IconProps = {
  name: IconName;
  size?: number;
  stroke?: string;
  style?: CSSProperties;
};

export function Icon({ name, size = 24, stroke = "#10413B", style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Individually drawn icons that use more than a single path
   ------------------------------------------------------------------ */

type S = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, stroke: string, width = 1.5) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke,
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export function ArrowRight({ size = 20, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 20, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronDown({ size = 12, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke, 1.8)} {...rest}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Plus({ size = 20, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke, 1.6)} {...rest}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Close({ size = 14, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke, 1.8)} {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Menu({ size = 20, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke, 1.6)} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Search({ size = 18, stroke = "currentColor", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
  );
}

export function Check({ size = 18, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke, 1.8)} {...rest}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function PassportIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8.5 17a3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}

export function BuildingIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4" />
    </svg>
  );
}

export function TrendIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

export function CaseIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V4h6v3M3 12h18" />
    </svg>
  );
}

export function DocIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </svg>
  );
}

export function ClockIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ShieldIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 10-4-2.2-7-5.5-7-10V6z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </svg>
  );
}

export function GlobeIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

export function ChatIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function LanguagesIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M3 5h10M8 3v2M11 5c-1 4-4 7-7 8M5 5c1 3 3 5 6 6M13 21l4-10 4 10M14.5 17h5" />
    </svg>
  );
}

export function SunIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  );
}

export function PeopleIcon({ size = 24, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M15.5 5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3" />
    </svg>
  );
}

export function PinIcon({ size = 20, stroke = "#10413B", ...rest }: S & { stroke?: string }) {
  return (
    <svg {...base(size, stroke)} {...rest}>
      <path d="M12 21s-6-5.2-6-10.5a6 6 0 0 1 12 0C18 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2" />
    </svg>
  );
}

export function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3 6.4 20.3l1.2-6.3L3 9.6l6.3-.8z" />
    </svg>
  );
}

/** The engraved contour field behind every forest-green section. */
export function WaveBg() {
  return (
    <svg
      aria-hidden="true"
      className="wave-bg"
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      fill="none"
      stroke="#fff"
      strokeWidth={1.2}
    >
      <path d="M-40 60C180 0 360 140 600 90S980-20 1240 70s260 60 260 60" />
      <path d="M-40 150C200 90 380 230 620 180S1000 70 1260 160s240 60 240 60" />
      <path d="M-40 240C220 180 400 320 640 270S1020 160 1280 250s220 60 220 60" />
      <path d="M-40 330C240 270 420 410 660 360S1040 250 1300 340s200 60 200 60" />
      <path d="M-40 420C260 360 440 500 680 450S1060 340 1320 430s180 60 180 60" />
      <path d="M-40 510C280 450 460 590 700 540S1080 430 1340 520s160 60 160 60" />
      <path d="M-40 600C300 540 480 680 720 630S1100 520 1360 610s140 60 140 60" />
    </svg>
  );
}

/** Narrower variant used inside the success-story cards. */
export function WaveBgCard() {
  return (
    <svg
      aria-hidden="true"
      className="wave-bg"
      viewBox="0 0 640 600"
      preserveAspectRatio="none"
      fill="none"
      stroke="#fff"
      strokeWidth={1.2}
    >
      <path d="M-20 80C120 20 240 160 400 110S560 0 660 90" />
      <path d="M-20 200C140 140 260 280 420 230S580 120 660 210" />
      <path d="M-20 320C160 260 280 400 440 350S600 240 660 330" />
      <path d="M-20 440C180 380 300 520 460 470S620 360 660 450" />
      <path d="M-20 560C200 500 320 640 480 590S640 480 660 570" />
    </svg>
  );
}
