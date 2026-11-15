import { marked } from 'marked';
import { arr, num, obj, optStr, parseYaml, str } from './yamlish';

/*
 * Lesson bodies are markdown with a few special fenced blocks:
 *
 *   ```repl            > input lines, then output; "error: ..." shows a red error
 *   ```compare python  shown only when the learner picked Python
 *   ```exercise        YAML: goal, code, checks, output, hint
 *   ```quiz            YAML: question, options, answer, explain
 *   ```tip / ```warn   a highlighted note (markdown inside)
 *   ```nix title=x.nix ordinary code with an optional file title
 *
 * Inline: [[term]] or [[term|label]] links to the glossary,
 *         [text](node:id) links to another lesson.
 */

export interface ReplEntry {
  input: string;
  output: string;
  error: boolean;
}

export interface Check {
  pattern: RegExp;
  /** true: code must match. false: code must NOT match. */
  shouldMatch: boolean;
  message: string;
}

export interface ExerciseSpec {
  goalHtml: string;
  code: string;
  checks: Check[];
  output: string;
  hint: string;
  lang: string;
}

export interface QuizSpec {
  questionHtml: string;
  options: string[];
  answer: number;
  explainHtml: string;
}

export type Segment =
  | { kind: 'prose'; html: string }
  | { kind: 'code'; lang: string; title?: string; code: string }
  | { kind: 'repl'; lang: string; entries: ReplEntry[] }
  | { kind: 'compare'; lang: string; code: string; title?: string }
  | { kind: 'exercise'; spec: ExerciseSpec }
  | { kind: 'quiz'; spec: QuizSpec }
  | { kind: 'note'; tone: 'tip' | 'warn'; html: string };

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Turns [[term]] / [[term|label]] into glossary spans before markdown runs. */
export function expandGlossary(md: string): string {
  return md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a: string, b: string | undefined) => {
    const term = a.trim().toLowerCase();
    const label = (b ?? a).trim();
    return `<span class="term" tabindex="0" data-term="${escapeAttr(term)}">${label}</span>`;
  });
}

export function renderInline(md: string): string {
  return marked.parseInline(expandGlossary(md), { async: false });
}

export function renderBlock(md: string): string {
  return marked.parse(expandGlossary(md), { async: false });
}

function parseInfo(info: string): { head: string; rest: string[]; attrs: Record<string, string> } {
  const parts = info.trim().split(/\s+/).filter(Boolean);
  const attrs: Record<string, string> = {};
  const rest: string[] = [];
  for (const p of parts.slice(1)) {
    const eq = p.indexOf('=');
    if (eq > 0) attrs[p.slice(0, eq)] = p.slice(eq + 1).replace(/^"|"$/g, '');
    else rest.push(p);
  }
  return { head: parts[0] ?? '', rest, attrs };
}

export function parseRepl(body: string): ReplEntry[] {
  const entries: ReplEntry[] = [];
  let current: ReplEntry | null = null;
  for (const line of body.split('\n')) {
    if (line.startsWith('> ') || line === '>') {
      if (current && current.output === '') {
        current.input += '\n' + line.slice(2);
        continue;
      }
      current = { input: line.slice(2), output: '', error: false };
      entries.push(current);
    } else if (current) {
      let text = line;
      if (current.output === '' && /^error:\s*/.test(text)) {
        current.error = true;
        text = text.replace(/^error:\s*/, '');
      }
      current.output = current.output === '' ? text : current.output + '\n' + text;
    }
  }
  for (const e of entries) e.output = e.output.replace(/\s+$/, '');
  return entries;
}

function toRegExp(source: string, flags: string): RegExp {
  try {
    return new RegExp(source, flags);
  } catch {
    console.warn(`[learnmap] invalid check pattern: ${source}`);
    return /$^/;
  }
}

export function parseExercise(body: string, lang: string): ExerciseSpec {
  const d = obj(parseYaml(body));
  const checks: Check[] = arr(d.checks).map((c) => {
    const o = obj(c);
    const flags = str(o.flags, 'm');
    const matchSrc = optStr(o.match);
    const notSrc = optStr(o.notMatch);
    return {
      pattern: toRegExp(matchSrc ?? notSrc ?? '', flags),
      shouldMatch: matchSrc !== undefined,
      message: str(o.message, 'Not quite yet.'),
    };
  });
  return {
    goalHtml: renderInline(str(d.goal, 'Make it work.')),
    code: str(d.code).replace(/\n$/, ''),
    checks,
    output: str(d.output).replace(/\n$/, ''),
    hint: str(d.hint),
    lang: str(d.lang, lang),
  };
}

export function parseQuiz(body: string): QuizSpec {
  const d = obj(parseYaml(body));
  return {
    questionHtml: renderInline(str(d.question)),
    options: arr(d.options).map((o) => renderInline(str(o))),
    answer: num(d.answer, 0),
    explainHtml: renderInline(str(d.explain)),
  };
}

/** Result of running an exercise's checks against learner code. */
export function runChecks(spec: ExerciseSpec, code: string): { ok: boolean; message: string } {
  for (const c of spec.checks) {
    c.pattern.lastIndex = 0;
    const matched = c.pattern.test(code);
    if (matched !== c.shouldMatch) return { ok: false, message: c.message };
  }
  return { ok: true, message: '' };
}

const FENCE = /^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm;

export function parseLesson(md: string, courseSyntax: string): Segment[] {
  const segments: Segment[] = [];
  const pushProse = (text: string) => {
    if (text.trim() !== '') segments.push({ kind: 'prose', html: renderBlock(text) });
  };
  let last = 0;
  for (const m of md.matchAll(FENCE)) {
    pushProse(md.slice(last, m.index));
    last = (m.index ?? 0) + m[0].length;
    const { head, rest, attrs } = parseInfo(m[1]);
    const body = m[2].replace(/\n$/, '');
    switch (head) {
      case 'repl':
        segments.push({ kind: 'repl', lang: rest[0] ?? courseSyntax, entries: parseRepl(body) });
        break;
      case 'compare':
        segments.push({ kind: 'compare', lang: rest[0] ?? '', code: body, title: attrs.title });
        break;
      case 'exercise':
        segments.push({ kind: 'exercise', spec: parseExercise(body, courseSyntax) });
        break;
      case 'quiz':
        segments.push({ kind: 'quiz', spec: parseQuiz(body) });
        break;
      case 'tip':
      case 'warn':
        segments.push({ kind: 'note', tone: head, html: renderBlock(body) });
        break;
      default:
        segments.push({ kind: 'code', lang: head || courseSyntax, title: attrs.title, code: body });
    }
  }
  pushProse(md.slice(last));
  return segments;
}

/** Number of things a learner has to solve before completing a lesson. */
export function countTasks(segments: Segment[]): number {
  return segments.filter((s) => s.kind === 'exercise' || s.kind === 'quiz').length;
}

/** Plain text for search indexing. */
export function plainText(md: string): string {
  return md
    .replace(FENCE, ' ')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a: string, b: string | undefined) => b ?? a)
    .replace(/[`*_#>[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
