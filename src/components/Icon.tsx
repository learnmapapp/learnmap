/*
 * One small set of line icons for all UI chrome (buttons, badges, hints), so
 * nothing depends on how a platform happens to draw an emoji or a Unicode
 * symbol. 24×24 grid, 2px round strokes, drawn in currentColor.
 *
 * Emoji stay reserved for content: course logos, lesson icons and the guide.
 */

const PATHS = {
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5 8.5 8.5 0 1 0 20.5 13.1z',
  monitor: 'M4 3h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 16v5M8 21h8',
  home: 'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  settings:
    'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  link: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  close: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  fit: 'M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  external: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
  check: 'M20 6 9 17l-5-5',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9.5A3.5 3.5 0 0 1 9.5 6H16M18 9v5.5a3.5 3.5 0 0 1-3.5 3.5H8',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM16 8l-2 6-6 2 2-6 6-2z',
  flag: 'M4 22V15M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z',
  sprout: 'M7 20h10M12 20v-8M12 12C12 8 9 6 5 6c0 4 3 6 7 6zM12 10c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z',
  file: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6zM14 3v6h6',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.3 1.1 2.2h5c0-.9.3-1.6 1.1-2.2A6 6 0 0 0 12 3z',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
  sparkles: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z',
  map: 'M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  flame: 'M12 22a7 7 0 0 0 7-7c0-4-3-6.5-4.5-10-1.5 2-2.5 3.5-2.5 6-1.5-1-2.2-2.5-2.2-4C7.3 9.5 5 12 5 15a7 7 0 0 0 7 7z',
  award: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM8.5 13.9 7 22l5-3 5 3-1.5-8.1',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 16v-4M12 8h.01',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** A compact language badge (e.g. "Py" on Python blue) instead of an emoji. */
export function LangBadge({ short, color }: { short: string; color: string }) {
  return (
    <span className="lang-badge" style={{ ['--lang-badge-color' as string]: color }} aria-hidden="true">
      {short}
    </span>
  );
}
