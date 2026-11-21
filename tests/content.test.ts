import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { comingSoon, courseInfos, courses, loadCourse, parseCourseMeta, parseGlossary, parseNode } from '../src/content/loader';
import { expandGlossary, parseLesson, parseRepl, runChecks, type ExerciseSpec } from '../src/content/markdown';
import { ancestors, depths, labelWidth, layout, route, routeLayout, type Placed } from '../src/graph';
import { tokenize } from '../src/syntax/highlight';
import { syntaxFor } from '../src/syntax/languages';
import { COMPARE_LANGS } from '../src/compareLangs';
import type { Course } from '../src/types';

const CONTENT = join(__dirname, '..', 'content');

/** Rough label box under a node: 13px labels (17px for hubs), plus room for a route number. */
function labelBox(p: Placed, numbered: boolean) {
  const hub = p.node.kind === 'hub';
  const w = labelWidth(p.node, numbered);
  const top = p.y + p.r + 4;
  return { left: p.x - w / 2, right: p.x + w / 2, top, bottom: top + (hub ? 20 : 16) };
}

function expectNoOverlap(placed: Placed[], numbered = false) {
  for (let i = 0; i < placed.length; i++)
    for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i];
      const b = placed[j];
      const gap = Math.hypot(a.x - b.x, a.y - b.y) - a.r - b.r;
      expect(gap, `${a.node.id} vs ${b.node.id}`).toBeGreaterThan(12);
      const la = labelBox(a, numbered);
      const lb = labelBox(b, numbered);
      const clash = la.left < lb.right && lb.left < la.right && la.top < lb.bottom && lb.top < la.bottom;
      expect(clash, `labels of ${a.node.id} and ${b.node.id} overlap`).toBe(false);
    }
}

function loadFromDisk(id: string): Course {
  const dir = join(CONTENT, id);
  const meta = parseCourseMeta(id, readFileSync(join(dir, 'course.yaml'), 'utf8'));
  const nodes = readdirSync(join(dir, 'nodes'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseNode(f.replace(/\.md$/, '').replace(/^\d+[-_]/, ''), readFileSync(join(dir, 'nodes', f), 'utf8'), 'main'));
  const gPath = join(dir, 'glossary.yaml');
  const glossary = existsSync(gPath) ? parseGlossary(readFileSync(gPath, 'utf8')) : new Map();
  return { ...meta, nodes, nodeById: new Map(nodes.map((n) => [n.id, n])), glossary };
}

const courseIds = readdirSync(CONTENT).filter((f) => existsSync(join(CONTENT, f, 'course.yaml')));
const completedCatalogCourses = ['mojo', 'zig', 'swift', 'lua', 'nim', 'astro', 'nuxt', 'go', 'lean'];

describe('markdown', () => {
  it('parses repl blocks with errors', () => {
    const entries = parseRepl('> 1 + 1\n2\n> True\nerror: undefined variable');
    expect(entries).toEqual([
      { input: '1 + 1', output: '2', error: false },
      { input: 'True', output: 'undefined variable', error: true },
    ]);
  });

  it('expands glossary links with optional labels', () => {
    expect(expandGlossary('a [[Flake]] and [[attribute set|sets]]')).toBe(
      'a <span class="term" tabindex="0" data-term="flake">Flake</span> and <span class="term" tabindex="0" data-term="attribute set">sets</span>',
    );
  });

  it('splits a lesson into segments', () => {
    const segs = parseLesson('Hi\n\n```compare python\nx = 1\n```\n\n```nix title=a.nix\n{ }\n```\nBye', 'nix');
    expect(segs.map((s) => s.kind)).toEqual(['prose', 'compare', 'code', 'prose']);
  });

  it('runs exercise checks in order', () => {
    const [seg] = parseLesson(
      "```exercise\ngoal: x\ncode: 'false'\nchecks:\n  - notMatch: 'True'\n    message: lower\n  - match: '^true$'\n    message: flip\n```",
      'nix',
    );
    if (seg.kind !== 'exercise') throw new Error('expected exercise');
    const spec: ExerciseSpec = seg.spec;
    expect(runChecks(spec, 'True')).toEqual({ ok: false, message: 'lower' });
    expect(runChecks(spec, 'false')).toEqual({ ok: false, message: 'flip' });
    expect(runChecks(spec, 'true').ok).toBe(true);
  });

  it('keeps the Zig terminal command distinct from instructions and quiz answers', () => {
    const course = loadFromDisk('zig');
    const lesson = course.nodeById.get('zig')!;
    const segments = parseLesson(lesson.body, course.syntax);
    const prose = segments.filter((segment) => segment.kind === 'prose').map((segment) => segment.html).join('');
    const quiz = segments.find((segment) => segment.kind === 'quiz');
    expect(prose).toContain('run <code>zig run hello.zig</code>');
    if (!quiz || quiz.kind !== 'quiz') throw new Error('Missing Zig introduction quiz');
    expect(quiz.spec.questionHtml).toContain('<code>zig run hello.zig</code>');
    expect(quiz.spec.options[quiz.spec.answer]).toBe('Compiles and runs the source program.');
  });
});

describe('highlighter', () => {
  it('round-trips the source text', () => {
    const code = 'let x = "a ${b}"; # hi\nin x';
    expect(tokenize(code, 'nix').map((t) => t.text).join('')).toBe(code);
  });
  it('recognises keywords and strings', () => {
    const types = tokenize('let s = "x"; in s', 'nix').filter((t) => t.type !== 'plain').map((t) => t.type);
    expect(types).toContain('keyword');
    expect(types).toContain('string');
  });

  it.each(['typescript', 'ts', 'tsx'])('highlights TypeScript contracts in %s', (lang) => {
    const code = 'interface Lesson { readonly title: string }\nconst lesson = { title: "Types" } satisfies Lesson;';
    const tokens = tokenize(code, lang);
    expect(tokens.map((token) => token.text).join('')).toBe(code);
    for (const word of ['interface', 'readonly', 'string', 'satisfies']) {
      expect(tokens.some((token) => token.type === 'keyword' && token.text === word), word).toBe(true);
    }
  });

  it.each(['jsx', 'tsx'])('preserves JSX and highlights tags and Hooks in %s', (lang) => {
    const code = 'const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>;';
    const tokens = tokenize(code, lang);
    expect(tokens.map((token) => token.text).join('')).toBe(code);
    expect(tokens.some((token) => token.type === 'builtin' && token.text === 'useState')).toBe(true);
    expect(tokens.some((token) => token.type === 'type' && token.text === '<button')).toBe(true);
    expect(tokens.some((token) => token.type === 'type' && token.text === '</button')).toBe(true);
  });

  it.each([
    ['lua', 'local values = {1, 2} -- note', 'local'],
    ['nim', 'proc square(n: int): int = n * n # note', 'proc'],
    ['swift', 'guard let value = input else { return } // note', 'guard'],
    ['zig', 'const std = @import("std"); // note', 'const'],
    ['mojo', 'def advance(mut value: Int):\n    value += 1 # note', 'mut'],
    ['go', 'func main() { // note', 'func'],
    ['lean', '#eval double 21 -- note\ndef double (n : Nat) : Nat := n * 2', 'def'],
  ])('highlights %s declarations without changing source', (lang, code, keyword) => {
    const tokens = tokenize(code, lang);
    expect(tokens.map((token) => token.text).join('')).toBe(code);
    expect(tokens.some((token) => token.type === 'keyword' && token.text === keyword)).toBe(true);
    expect(tokens.some((token) => token.type === 'comment')).toBe(true);
  });

  it.each(['astro', 'vue', 'nuxt'])('highlights markup and directives in %s', (lang) => {
    const code = '<!-- note -->\n<Counter client:visible v-if="ready" @click="advance" />';
    const tokens = tokenize(code, lang);
    expect(tokens.map((token) => token.text).join('')).toBe(code);
    expect(tokens.some((token) => token.type === 'comment' && token.text === '<!-- note -->')).toBe(true);
    expect(tokens.some((token) => token.type === 'type' && token.text === '<Counter')).toBe(true);
    for (const directive of ['client:visible', 'v-if', '@click']) {
      expect(tokens.some((token) => token.type === 'attr' && token.text.includes(directive)), directive).toBe(true);
    }
  });

  it.each([
    ['lua', '--[=[first\nsecond]=]', 'comment'],
    ['lua', '[=[first\nsecond]=]', 'string'],
    ['nim', '#[first\nsecond]#', 'comment'],
  ])('keeps multiline %s literals and comments together', (lang, code, type) => {
    expect(tokenize(code, lang)).toEqual([{ type, text: code }]);
  });
});

// Courses rewritten for newcomers: every exercise ships a solution that passes its checks.
const rewrittenCourses = new Set(['zig', 'swift', 'lua', 'mojo', 'nim', 'astro', 'nuxt', 'python', 'go', 'lean']);

describe.each(completedCatalogCourses)('completed catalog course %s', (id) => {
  const course = loadFromDisk(id);

  it('is discovered as playable and loads its lessons', async () => {
    expect(courseInfos.some((info) => info.id === id)).toBe(true);
    expect(comingSoon.some((entry) => entry.id === id)).toBe(false);
    const meta = courses.find((entry) => entry.id === id);
    if (!meta) throw new Error(`Missing course ${id}`);
    expect((await loadCourse(meta)).nodes).toHaveLength(50);
  });

  it('provides fifty complete lessons with solvable exercises', () => {
    expect(course.nodes).toHaveLength(50);
    for (const node of course.nodes) {
      const segments = parseLesson(node.body, course.syntax);
      const examples = segments.filter((segment) => segment.kind === 'code');
      const exercises = segments.filter((segment) => segment.kind === 'exercise');
      const quizzes = segments.filter((segment) => segment.kind === 'quiz');
      expect(examples.length, node.id).toBeGreaterThan(0);
      expect(exercises, node.id).toHaveLength(1);
      expect(quizzes, node.id).toHaveLength(1);
      const { spec } = exercises[0];
      if (rewrittenCourses.has(id)) {
        expect(spec.solution, `${id}/${node.id}: exercise has a solution`).not.toBe('');
        expect(runChecks(spec, spec.solution).ok, `${id}/${node.id}: solution passes`).toBe(true);
      } else {
        expect(runChecks(spec, examples[0].code).ok, `${id}/${node.id}: worked example passes`).toBe(true);
      }
      expect(Number.isInteger(quizzes[0].spec.answer), node.id).toBe(true);
      expect(quizzes[0].spec.answer, node.id).toBeGreaterThanOrEqual(0);
      expect(new Set(quizzes[0].spec.options).size, node.id).toBe(quizzes[0].spec.options.length);
      for (const example of examples) {
        expect(tokenize(example.code, example.lang).map((token) => token.text).join(''), node.id).toBe(example.code);
      }
    }
    for (const entry of course.glossary.values()) {
      if (entry.node) expect(course.nodeById.has(entry.node), entry.node).toBe(true);
    }
  });
});

describe.each(courseIds)('course %s', (id) => {
  const course = loadFromDisk(id);

  it('has nodes with unique ids and known prerequisites', () => {
    expect(course.nodes.length).toBeGreaterThan(0);
    expect(new Set(course.nodes.map((n) => n.id)).size).toBe(course.nodes.length);
    for (const n of course.nodes) for (const r of n.requires) expect(course.nodeById.has(r), `${n.id} requires ${r}`).toBe(true);
  });

  it('uses known branches and a highlightable syntax', () => {
    const branches = new Set(course.branches.map((b) => b.id));
    for (const n of course.nodes) expect(branches.has(n.branch), `${n.id} branch ${n.branch}`).toBe(true);
    expect(syntaxFor(course.syntax)).toBeDefined();
  });

  it('has goals that point at real nodes', () => {
    for (const g of course.goals) {
      expect(course.nodeById.has(g.node), g.id).toBe(true);
      expect(route(course, g.node).at(-1)).toBe(g.node);
    }
  });

  it('has no dependency cycles and lays out every node', () => {
    const d = depths(course.nodes);
    for (const n of course.nodes) for (const r of n.requires) expect(d.get(n.id)! > d.get(r)!).toBe(true);
    const placed = layout(course);
    expect(placed.length).toBe(course.nodes.length);
    expectNoOverlap(placed);
  });

  it('can build a compact route to every lesson', () => {
    for (const n of course.nodes) {
      const ids = route(course, n.id);
      const placed = routeLayout(course, ids);
      expect(placed.map((p) => p.node.id).sort(), n.id).toEqual([...ids].sort());
      const y = new Map(placed.map((p) => [p.node.id, p.y]));
      for (const p of placed) for (const r of p.node.requires) expect(y.get(r)!, `${r} above ${p.node.id}`).toBeLessThan(p.y);
      expectNoOverlap(placed, true);
    }
  });

  it('has exercises whose original code fails and that reference known glossary terms and nodes', () => {
    const known = new Set(COMPARE_LANGS.map((l) => l.id));
    for (const n of course.nodes) {
      for (const s of parseLesson(n.body, course.syntax)) {
        if (s.kind === 'exercise') {
          expect(s.spec.checks.length, `${n.id} exercise has checks`).toBeGreaterThan(0);
          expect(runChecks(s.spec, s.spec.code).ok, `${n.id} exercise already solved`).toBe(false);
          if (s.spec.solution) expect(runChecks(s.spec, s.spec.solution).ok, `${n.id} solution passes`).toBe(true);
        }
        if (s.kind === 'quiz') {
          expect(Number.isInteger(s.spec.answer), `${n.id}: answer index`).toBe(true);
          expect(s.spec.answer, `${n.id}: answer index`).toBeGreaterThanOrEqual(0);
          expect(s.spec.answer).toBeLessThan(s.spec.options.length);
          for (const option of s.spec.options) {
            expect(option.replace(/<[^>]*>/g, '').trim(), `${n.id}: blank quiz option`).not.toBe('');
          }
          expect(new Set(s.spec.options).size, `${n.id}: repeated quiz options`).toBe(s.spec.options.length);
        }
        if (s.kind === 'compare') expect(known.has(s.lang), `${n.id} compare ${s.lang}`).toBe(true);
      }
      const prose = n.body.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, '');
      for (const m of prose.matchAll(/\[\[([^\]|]+)/g)) {
        expect(course.glossary.has(m[1].trim().toLowerCase()), `${n.id}: glossary "${m[1]}"`).toBe(true);
      }
      for (const m of n.body.matchAll(/\(node:([\w-]+)\)/g)) {
        expect(course.nodeById.has(m[1]), `${n.id}: link ${m[1]}`).toBe(true);
      }
    }
    expect(ancestors(course, course.nodes[0].id).size).toBeGreaterThan(0);
  });
});
