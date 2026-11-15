import { useCallback, useEffect, useState } from 'react';
import { notifyHost } from './host';

/*
 * Progress lives in localStorage, per course. Inside IntelliJ (JCEF) this is
 * persisted by the embedded Chromium profile, so it survives IDE restarts.
 */

export interface CourseProgress {
  done: string[];
  /** The lesson the learner is heading to; its prerequisites form the route. */
  target: string | null;
  introSeen: boolean;
}

export interface Prefs {
  compare: string | null;
}

const EMPTY: CourseProgress = { done: [], target: null, introSeen: false };
const PREFS_KEY = 'learnmap:prefs';

function read<T>(key: string, fallback: T, validate: (v: unknown) => T | null): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return validate(JSON.parse(raw)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable (private mode); progress just won't persist */
  }
}

/*
 * Exercise code is saved as you type, so a solution is still there when you
 * come back to a lesson. One key per exercise keeps writes small.
 */
const codeKey = (courseId: string, nodeId: string, index: number) => `learnmap:code:${courseId}:${nodeId}:${index}`;

export function loadCode(courseId: string, nodeId: string, index: number): string | null {
  try {
    return localStorage.getItem(codeKey(courseId, nodeId, index));
  } catch {
    return null;
  }
}

export function saveCode(courseId: string, nodeId: string, index: number, code: string | null) {
  try {
    const key = codeKey(courseId, nodeId, index);
    if (code === null) localStorage.removeItem(key);
    else localStorage.setItem(key, code);
  } catch {
    /* storage unavailable: the code just won't be remembered */
  }
}

function clearCode(courseId: string) {
  try {
    const prefix = `learnmap:code:${courseId}:`;
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(prefix)) keys.push(k);
    }
    for (const k of keys) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
}

function validateProgress(v: unknown): CourseProgress | null {
  if (typeof v !== 'object' || v === null) return null;
  const done = 'done' in v && Array.isArray(v.done) ? v.done.filter((x): x is string => typeof x === 'string') : [];
  const target = 'target' in v && typeof v.target === 'string' ? v.target : null;
  const introSeen = 'introSeen' in v && v.introSeen === true;
  return { done, target, introSeen };
}

function validatePrefs(v: unknown): Prefs | null {
  if (typeof v !== 'object' || v === null) return null;
  return { compare: 'compare' in v && typeof v.compare === 'string' ? v.compare : null };
}

export function useCourseProgress(courseId: string) {
  const key = `learnmap:course:${courseId}`;
  const [progress, setProgress] = useState<CourseProgress>(() => read(key, EMPTY, validateProgress));

  useEffect(() => {
    setProgress(read(key, EMPTY, validateProgress));
  }, [key]);

  const update = useCallback(
    (fn: (p: CourseProgress) => CourseProgress) => {
      setProgress((prev) => {
        const next = fn(prev);
        write(key, next);
        return next;
      });
    },
    [key],
  );

  const complete = useCallback(
    (nodeId: string) => {
      update((p) => (p.done.includes(nodeId) ? p : { ...p, done: [...p.done, nodeId] }));
      notifyHost({ type: 'lessonCompleted', course: courseId, node: nodeId });
    },
    [update, courseId],
  );

  const uncomplete = useCallback(
    (nodeId: string) => update((p) => ({ ...p, done: p.done.filter((d) => d !== nodeId) })),
    [update],
  );

  const setTarget = useCallback((target: string | null) => update((p) => ({ ...p, target })), [update]);
  const setIntroSeen = useCallback((introSeen: boolean) => update((p) => ({ ...p, introSeen })), [update]);
  const reset = useCallback(() => {
    clearCode(courseId);
    update(() => ({ ...EMPTY, introSeen: true }));
  }, [update, courseId]);

  return { progress, complete, uncomplete, setTarget, setIntroSeen, reset };
}

export function usePrefs() {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const fromUrl = new URLSearchParams(location.search).get('compare');
    const stored = read(PREFS_KEY, { compare: null }, validatePrefs);
    return fromUrl ? { ...stored, compare: fromUrl } : stored;
  });
  const update = useCallback((p: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...p };
      write(PREFS_KEY, next);
      return next;
    });
  }, []);
  return { prefs, update };
}
