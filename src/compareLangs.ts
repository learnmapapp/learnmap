import type { CompareLang } from './types';

/**
 * Languages a learner can say they already know. Lessons add comparison
 * snippets with ```compare <id> fences; only the learner's pick is shown.
 */
export const COMPARE_LANGS: CompareLang[] = [
  { id: 'python', name: 'Python', short: 'Py', color: '#4b8bbe' },
  { id: 'javascript', name: 'JavaScript', short: 'JS', color: '#e8c33a' },
  { id: 'java', name: 'Java', short: 'Jv', color: '#e76f51' },
  { id: 'kotlin', name: 'Kotlin', short: 'Kt', color: '#a97bff' },
  { id: 'go', name: 'Go', short: 'Go', color: '#00add8' },
  { id: 'rust', name: 'Rust', short: 'Rs', color: '#de7a4b' },
];

export const DEFAULT_COMPARISONS = ['python', 'javascript', 'java', 'kotlin', 'go'];

/** Sentinel for "I haven't programmed before / something else" – hides comparisons. */
export const NO_COMPARE = 'none';

export function compareLang(id: string): CompareLang | undefined {
  return COMPARE_LANGS.find((l) => l.id === id);
}
