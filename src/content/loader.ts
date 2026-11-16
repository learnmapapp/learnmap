import type {
  Branch,
  CatalogEntry,
  Course,
  CourseMeta,
  GlossaryEntry,
  Goal,
  GuideConfig,
  LessonNode,
} from '../types';
import { arr, num, obj, optStr, parseYaml, splitFrontmatter, str, strArr } from './yamlish';
import { DEFAULT_COMPARISONS } from '../compareLangs';
import { registerCourses, type CourseInfo } from '../stats';

/*
 * Content lives in /content/<course-id>/:
 *   course.yaml      – metadata, branches, goals, guide lines
 *   glossary.yaml    – terms shown as tooltips
 *   nodes/*.md       – one lesson per file (frontmatter + markdown)
 *
 * Course metadata is bundled eagerly (the landing page needs it); lessons are
 * loaded lazily so adding more languages doesn't grow the initial bundle.
 */
const courseFiles = import.meta.glob<string>('/content/*/course.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const nodeFiles = import.meta.glob<string>('/content/*/nodes/*.md', {
  query: '?raw',
  import: 'default',
});
const glossaryFiles = import.meta.glob<string>('/content/*/glossary.yaml', {
  query: '?raw',
  import: 'default',
});
const catalogFile = import.meta.glob<string>('/content/catalog.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function courseIdFromPath(path: string): string {
  return path.split('/')[2];
}

function fileId(path: string): string {
  const name = path.split('/').pop() ?? path;
  return name.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
}

const DEFAULT_GUIDE: Omit<GuideConfig, 'name' | 'avatar' | 'intro'> = {
  askLanguage:
    "Have you written code before? Pick the language you think in. Whenever {course} does something similar, I'll show you both side by side.",
  askGoal: "Now pick a first goal. I'll hide everything that doesn't lead there.",
  outroRoute: 'There it is: your route. Start at the top and go at your own pace.',
  outroExplore: 'The whole map is yours. Bright nodes are ready to explore; dim ones need a bit more groundwork.',
};

export function parseCourseMeta(id: string, src: string): CourseMeta {
  const d = obj(parseYaml(src));
  const g = obj(d.guide);
  const name = str(d.name, id);
  const fill = (s: string) => s.replaceAll('{course}', name);
  const branches: Branch[] = arr(d.branches).map((b) => {
    const o = obj(b);
    return { id: str(o.id), title: str(o.title, str(o.id)), color: str(o.color, '#e0b84f') };
  });
  const goals: Goal[] = arr(d.goals).map((b) => {
    const o = obj(b);
    return {
      id: str(o.id, str(o.node)),
      title: str(o.title),
      node: str(o.node),
      icon: str(o.icon, '🎯'),
      description: str(o.description),
    };
  });
  return {
    id,
    name,
    tagline: str(d.tagline),
    logo: str(d.logo, '📘'),
    color: str(d.color, '#e0b84f'),
    syntax: str(d.syntax, id),
    extension: str(d.extension, id),
    pluginUrl: optStr(d.pluginUrl),
    branches,
    goals,
    comparisons: d.comparisons === undefined ? DEFAULT_COMPARISONS : strArr(d.comparisons),
    guide: {
      name: str(g.name, 'Guide'),
      avatar: str(g.avatar, '🦉'),
      intro: strArr(g.intro).map(fill),
      askLanguage: fill(str(g.askLanguage, DEFAULT_GUIDE.askLanguage)),
      askGoal: fill(str(g.askGoal, DEFAULT_GUIDE.askGoal)),
      outroRoute: fill(str(g.outroRoute, DEFAULT_GUIDE.outroRoute)),
      outroExplore: fill(str(g.outroExplore, DEFAULT_GUIDE.outroExplore)),
    },
  };
}

export function parseNode(defaultId: string, src: string, fallbackBranch: string): LessonNode {
  const { data, body } = splitFrontmatter(src);
  const pos = obj(data.pos);
  return {
    id: str(data.id, defaultId),
    title: str(data.title, defaultId),
    icon: str(data.icon, '•'),
    branch: str(data.branch, fallbackBranch),
    requires: strArr(data.requires),
    summary: str(data.summary),
    kind: data.kind === 'hub' ? 'hub' : 'lesson',
    body,
    pos: data.pos === undefined ? undefined : { x: num(pos.x), y: num(pos.y) },
  };
}

export function parseGlossary(src: string): Map<string, GlossaryEntry> {
  const map = new Map<string, GlossaryEntry>();
  const d = obj(parseYaml(src));
  for (const [term, value] of Object.entries(d)) {
    const entry: GlossaryEntry =
      typeof value === 'string'
        ? { term, definition: value }
        : { term, definition: str(obj(value).definition), node: optStr(obj(value).node) };
    map.set(term.toLowerCase(), entry);
  }
  return map;
}

export const courses: CourseMeta[] = Object.entries(courseFiles)
  .map(([path, src]) => parseCourseMeta(courseIdFromPath(path), src))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Lesson count per course, known without loading the lessons themselves. */
export function lessonCount(courseId: string): number {
  return Object.keys(nodeFiles).filter((p) => courseIdFromPath(p) === courseId).length;
}

export const courseInfos: CourseInfo[] = courses.map((c) => ({
  id: c.id,
  name: c.name,
  logo: c.logo,
  color: c.color,
  total: lessonCount(c.id),
  goalNodes: c.goals.map((g) => g.node),
}));
registerCourses(courseInfos);

export function findCourse(id: string): CourseMeta | undefined {
  return courses.find((c) => c.id === id);
}

/** Every language in catalog.yaml, in file order. */
const catalog: CatalogEntry[] = (() => {
  const src = Object.values(catalogFile)[0];
  if (!src) return [];
  return arr(obj(parseYaml(src)).languages)
    .map((x) => {
      const o = obj(x);
      return {
        id: str(o.id),
        name: str(o.name),
        logo: str(o.logo, '📘'),
        color: str(o.color, '#888'),
        blurb: str(o.blurb),
        category: str(o.category, 'Other'),
        pluginUrl: optStr(o.pluginUrl),
      };
    })
    .filter((c) => c.id !== '');
})();

/** Languages listed in catalog.yaml that don't have a course yet. */
export const comingSoon: CatalogEntry[] = catalog.filter((c) => !courses.some((m) => m.id === c.id));

/** The home page group a course belongs to, from catalog.yaml. */
export function categoryOf(courseId: string): string {
  return catalog.find((c) => c.id === courseId)?.category ?? 'Other';
}

/** Categories that have at least one playable course, in catalog order. */
export const categories: string[] = [...new Set(catalog.map((c) => c.category))]
  .concat('Other')
  .filter((cat, i, all) => all.indexOf(cat) === i && courses.some((c) => categoryOf(c.id) === cat));

const loaded = new Map<string, Promise<Course>>();

export function loadCourse(meta: CourseMeta): Promise<Course> {
  const cached = loaded.get(meta.id);
  if (cached) return cached;
  const promise = (async () => {
    const prefix = `/content/${meta.id}/`;
    const fallbackBranch = meta.branches[0]?.id ?? 'main';
    const nodeEntries = Object.entries(nodeFiles).filter(([p]) => p.startsWith(prefix));
    const nodes = await Promise.all(
      nodeEntries.map(async ([path, load]) => parseNode(fileId(path), await load(), fallbackBranch)),
    );
    const glossaryLoader = glossaryFiles[`${prefix}glossary.yaml`];
    const glossary = glossaryLoader ? parseGlossary(await glossaryLoader()) : new Map<string, GlossaryEntry>();
    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    for (const n of nodes) {
      for (const r of n.requires) {
        if (!nodeById.has(r)) console.warn(`[learnmap] ${meta.id}/${n.id} requires unknown node "${r}"`);
      }
    }
    return { ...meta, nodes, nodeById, glossary };
  })();
  loaded.set(meta.id, promise);
  return promise;
}
