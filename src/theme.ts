import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';
export const THEME_KEY = 'learnmap:theme';

const DEFAULT = { preference: 'system' as ThemePreference, theme: 'dark' as Theme };
let snapshot = DEFAULT;
let media: MediaQueryList | undefined;
let initialized = false;
const listeners = new Set<() => void>();

function preferenceFrom(value: string | null): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system';
}

function apply(preference: ThemePreference) {
  const theme = preference === 'system' ? (media ? (media.matches ? 'dark' : 'light') : 'dark') : preference;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f4ed' : '#1c1b1a');
  if (snapshot.preference === preference && snapshot.theme === theme) return;
  snapshot = { preference, theme };
  listeners.forEach((listener) => listener());
}

/** Apply before mounting React; listeners live for the lifetime of the app. */
export function initializeTheme() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  let preference: ThemePreference = 'system';
  try {
    preference = preferenceFrom(localStorage.getItem(THEME_KEY));
  } catch {
    // System appearance still works when storage is unavailable.
  }
  media = window.matchMedia?.('(prefers-color-scheme: dark)');
  media?.addEventListener('change', () => apply(snapshot.preference));
  window.addEventListener('storage', (event) => {
    if (event.key === THEME_KEY || event.key === null) apply(preferenceFrom(event.newValue));
  });
  apply(preference);
}

export function setThemePreference(preference: ThemePreference) {
  initializeTheme();
  try {
    localStorage.setItem(THEME_KEY, preference);
  } catch {
    // Switching appearance should work even when it cannot be saved.
  }
  apply(preference);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useTheme() {
  return useSyncExternalStore(subscribe, () => snapshot, () => DEFAULT);
}
