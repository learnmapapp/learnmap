import { parse } from 'yaml';

/** Small helpers to read untyped YAML safely without casting. */
export type Obj = Record<string, unknown>;

export function isObj(v: unknown): v is Obj {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function obj(v: unknown): Obj {
  return isObj(v) ? v : {};
}

export function str(v: unknown, fallback = ''): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return fallback;
}

export function optStr(v: unknown): string | undefined {
  const s = str(v);
  return s === '' ? undefined : s;
}

export function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

export function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

export function strArr(v: unknown): string[] {
  if (typeof v === 'string') return [v];
  return arr(v).map((x) => str(x)).filter((x) => x !== '');
}

export function parseYaml(src: string): unknown {
  return parse(src);
}

/** Splits `---\nyaml\n---\nbody` into its parts. */
export function splitFrontmatter(src: string): { data: Obj; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);
  if (!m) return { data: {}, body: src };
  return { data: obj(parse(m[1])), body: m[2] };
}
