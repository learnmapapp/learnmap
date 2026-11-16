import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function browser(dark: boolean, saved: string | null = null, blocked = false) {
  const values = new Map<string, string>();
  if (saved !== null) values.set('learnmap:theme', saved);
  const storage = {
    getItem: vi.fn((key: string) => {
      if (blocked) throw new Error('Storage unavailable');
      return values.get(key) ?? null;
    }),
    setItem: vi.fn((key: string, value: string) => {
      if (blocked) throw new Error('Storage unavailable');
      values.set(key, value);
    }),
    removeItem: (key: string) => { values.delete(key); },
    key: (index: number) => [...values.keys()][index] ?? null,
    get length() { return values.size; },
  };
  let changed: (() => void) | undefined;
  let stored: ((event: { key: string | null; newValue: string | null }) => void) | undefined;
  const media = {
    matches: dark,
    addEventListener: vi.fn((_event: string, listener: () => void) => { changed = listener; }),
  };
  const window = {
    matchMedia: vi.fn(() => media),
    addEventListener: vi.fn((_event: string, listener: typeof stored) => { stored = listener; }),
  };
  const meta = { content: '', setAttribute: (_name: string, value: string) => { meta.content = value; } };
  const document = { documentElement: { dataset: {} as Record<string, string> }, querySelector: () => meta };
  vi.stubGlobal('window', window);
  vi.stubGlobal('document', document);
  vi.stubGlobal('localStorage', storage);
  return {
    window, document, storage, media, meta, values,
    setSystemDark(value: boolean) { media.matches = value; changed?.(); },
    receivePreference(value: string | null) { stored?.({ key: 'learnmap:theme', newValue: value }); },
  };
}

beforeEach(() => vi.resetModules());
afterEach(() => vi.unstubAllGlobals());

describe('appearance preferences', () => {
  it.each([
    { dark: true, saved: null, expected: 'dark' },
    { dark: false, saved: null, expected: 'light' },
    { dark: true, saved: 'light', expected: 'light' },
    { dark: false, saved: 'dark', expected: 'dark' },
    { dark: false, saved: 'invalid', expected: 'light' },
  ])('starts with $expected for dark=$dark and saved=$saved', async ({ dark, saved, expected }) => {
    const env = browser(dark, saved);
    const { initializeTheme } = await import('../src/theme');
    initializeTheme();
    expect(env.document.documentElement.dataset.theme).toBe(expected);
    expect(env.meta.content).toBe(expected === 'light' ? '#f7f4ed' : '#1c1b1a');
  });

  it('follows system changes only while System is selected', async () => {
    const env = browser(true);
    const { initializeTheme, setThemePreference } = await import('../src/theme');
    initializeTheme();
    env.setSystemDark(false);
    expect(env.document.documentElement.dataset.theme).toBe('light');
    setThemePreference('dark');
    env.setSystemDark(false);
    expect(env.document.documentElement.dataset.theme).toBe('dark');
    setThemePreference('system');
    expect(env.document.documentElement.dataset.theme).toBe('light');
  });

  it('saves an explicit choice and restores it on the next initialization', async () => {
    const env = browser(true);
    const { setThemePreference } = await import('../src/theme');
    setThemePreference('light');
    expect(env.values.get('learnmap:theme')).toBe('light');
    vi.resetModules();
    const { initializeTheme } = await import('../src/theme');
    initializeTheme();
    expect(env.document.documentElement.dataset.theme).toBe('light');
  });

  it('responds to preferences saved or removed by another tab', async () => {
    const env = browser(true);
    const { initializeTheme } = await import('../src/theme');
    initializeTheme();
    env.receivePreference('light');
    expect(env.document.documentElement.dataset.theme).toBe('light');
    env.receivePreference(null);
    expect(env.document.documentElement.dataset.theme).toBe('dark');
  });

  it('still switches modes when browser storage is blocked', async () => {
    const env = browser(false, null, true);
    const { initializeTheme, setThemePreference } = await import('../src/theme');
    initializeTheme();
    expect(env.document.documentElement.dataset.theme).toBe('light');
    expect(() => setThemePreference('dark')).not.toThrow();
    expect(env.document.documentElement.dataset.theme).toBe('dark');
  });

  it('installs its system and storage listeners only once', async () => {
    const env = browser(true);
    const { initializeTheme } = await import('../src/theme');
    initializeTheme();
    initializeTheme();
    expect(env.media.addEventListener).toHaveBeenCalledTimes(1);
    expect(env.window.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('preserves appearance and comparison preferences when resetting progress', async () => {
    const env = browser(false, 'light');
    env.values.set('learnmap:prefs', '{"compare":"python"}');
    env.values.set('learnmap:course:python', '{"done":["python"]}');
    const { resetEverything } = await import('../src/stats');
    resetEverything();
    expect(env.values.get('learnmap:theme')).toBe('light');
    expect(env.values.get('learnmap:prefs')).toBe('{"compare":"python"}');
    expect(env.values.has('learnmap:course:python')).toBe(false);
  });
});

describe('appearance before the first paint', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

  it.each([
    { dark: true, saved: 'light', blocked: false, expected: 'light' },
    { dark: false, saved: 'dark', blocked: false, expected: 'dark' },
    { dark: false, saved: null, blocked: true, expected: 'light' },
  ])('applies $expected before the application starts', ({ dark, saved, blocked, expected }) => {
    const env = browser(dark, saved, blocked);
    expect(bootstrap).toBeTruthy();
    runInNewContext(bootstrap!, { window: env.window, document: env.document, localStorage: env.storage });
    expect(env.document.documentElement.dataset.theme).toBe(expected);
    expect(env.meta.content).toBe(expected === 'light' ? '#f7f4ed' : '#1c1b1a');
  });
});
