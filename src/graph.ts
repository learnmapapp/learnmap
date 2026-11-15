import type { Course, LessonNode } from './types';

export interface Placed {
  node: LessonNode;
  x: number;
  y: number;
  r: number;
  depth: number;
}

export const ROW = 130;
export const COL = 120;
const HUB_R = 40;
const LESSON_R = 24;

/** Longest-path depth from the roots, so every node sits below all of its prerequisites. */
export function depths(nodes: LessonNode[]): Map<string, number> {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const memo = new Map<string, number>();
  const visiting = new Set<string>();
  const depthOf = (id: string): number => {
    const cached = memo.get(id);
    if (cached !== undefined) return cached;
    const n = byId.get(id);
    if (!n || visiting.has(id)) return 0; // unknown node or cycle: treat as root
    visiting.add(id);
    const reqs = n.requires.filter((r) => byId.has(r));
    const d = reqs.length === 0 ? 0 : Math.max(...reqs.map(depthOf)) + 1;
    visiting.delete(id);
    memo.set(id, d);
    return d;
  };
  for (const n of nodes) depthOf(n.id);
  return memo;
}

/** Stable pseudo-random number in [-1, 1] for a string, so the map looks hand-drawn but never reshuffles. */
function wobble(id: string, salt: number): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return ((h >>> 0) % 2001) / 1000 - 1;
}

/** Estimated rendered width of a node's label (13px text, 17px for hubs), plus a route number. */
export function labelWidth(node: LessonNode, numbered = false): number {
  return node.title.length * (node.kind === 'hub' ? 9.6 : 7.4) + (numbered ? 22 : 0);
}

export interface LayoutOptions {
  /** Group branches into vertical lanes (the full map). Off for a single route. */
  lanes?: boolean;
  /** Nudge lessons a little so the map feels organic rather than a grid. */
  jitter?: boolean;
  /** Space neighbours by their (numbered) label widths instead of a fixed column. */
  fitLabels?: boolean;
}

/**
 * Automatic layout: rows by depth, branches as vertical lanes from left to
 * right (in course.yaml order). Authors can still pin a node with `pos`.
 */
export function layout(
  course: Pick<Course, 'nodes' | 'branches'>,
  { lanes: useLanes = true, jitter = true, fitLabels = false }: LayoutOptions = {},
): Placed[] {
  const d = depths(course.nodes);
  const branchOrder = course.branches.map((b) => b.id);
  const branchIndex = (id: string) => {
    if (!useLanes) return 0;
    const i = branchOrder.indexOf(id);
    return i === -1 ? branchOrder.length : i;
  };
  // Within a cell, keep the order stable and roughly follow the parents' x.
  const cells = new Map<string, LessonNode[]>();
  for (const n of course.nodes) {
    const key = `${branchIndex(n.branch)}:${d.get(n.id) ?? 0}`;
    const list = cells.get(key) ?? [];
    list.push(n);
    cells.set(key, list);
  }
  // Each cell's neighbours are spaced by their label widths, so long titles never touch.
  const parentOrder = (n: LessonNode) => course.nodes.findIndex((m) => n.requires.includes(m.id));
  const spacing = (a: LessonNode, b: LessonNode) => {
    const pad = jitter ? COL * 0.32 : 0; // room for both nodes wobbling towards each other
    return Math.max(COL, (labelWidth(a, fitLabels) + labelWidth(b, fitLabels)) / 2 + 28 + pad);
  };
  const cellSpan = (list: LessonNode[]) => {
    let span = 0;
    for (let i = 1; i < list.length; i++) span += spacing(list[i - 1], list[i]);
    return span;
  };
  const laneWidth = new Map<number, number>();
  for (const [key, list] of cells) {
    const lane = Number(key.split(':')[0]);
    const sorted = [...list].sort((a, b) => parentOrder(a) - parentOrder(b));
    // Leave half a label of room on either side of the outermost nodes.
    const edge = (labelWidth(sorted[0]) + labelWidth(sorted[sorted.length - 1])) / 2;
    laneWidth.set(lane, Math.max(laneWidth.get(lane) ?? COL, cellSpan(sorted) + Math.max(COL, edge)));
  }
  // The first branch (the trailhead) sits in the middle; the others alternate
  // right and left of it, so the map grows like a tree instead of a staircase.
  const lanes: number[] = [];
  [...laneWidth.keys()]
    .sort((a, b) => a - b)
    .forEach((lane, i) => (i % 2 === 1 ? lanes.push(lane) : lanes.unshift(lane)));
  const laneX = new Map<number, number>();
  let cursor = 0;
  for (const lane of lanes) {
    const w = laneWidth.get(lane) ?? COL;
    laneX.set(lane, cursor + w / 2);
    cursor += w + COL * 0.4;
  }
  const totalWidth = cursor - COL * 0.4;

  const placed = new Map<string, Placed>();
  const maxDepth = Math.max(0, ...d.values());
  for (let depth = 0; depth <= maxDepth; depth++) {
    for (const lane of lanes) {
      const list = cells.get(`${lane}:${depth}`);
      if (!list) continue;
      const parentX = (n: LessonNode) => {
        const xs = n.requires.map((r) => placed.get(r)?.x).filter((x): x is number => x !== undefined);
        return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
      };
      const sorted = [...list].sort((a, b) => parentX(a) - parentX(b));
      const cx = laneX.get(lane) ?? 0;
      const offsets: number[] = [];
      sorted.forEach((n, i) => offsets.push(i === 0 ? 0 : offsets[i - 1] + spacing(sorted[i - 1], n)));
      const mid = (offsets[0] + offsets[offsets.length - 1]) / 2;
      sorted.forEach((n, i) => {
        const x = cx + offsets[i] - mid - totalWidth / 2;
        // A gentle zig-zag keeps busy rows from reading as one long line.
        const y = depth * ROW + (sorted.length > 2 && i % 2 === 1 ? ROW * 0.28 : 0);
        const nudge = jitter && n.kind !== 'hub';
        placed.set(n.id, {
          node: n,
          x: n.pos?.x ?? x + (nudge ? wobble(n.id, 1) * COL * 0.16 : 0),
          y: n.pos?.y ?? y + (nudge ? wobble(n.id, 2) * ROW * 0.1 : 0),
          r: n.kind === 'hub' ? HUB_R : LESSON_R,
          depth,
        });
      });
    }
  }
  return course.nodes.map((n) => placed.get(n.id)).filter((p): p is Placed => p !== undefined);
}

/** All transitive prerequisites of `id`, including `id` itself. */
export function ancestors(course: Course, id: string): Set<string> {
  const out = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop();
    if (cur === undefined || out.has(cur)) continue;
    const n = course.nodeById.get(cur);
    if (!n) continue;
    out.add(cur);
    stack.push(...n.requires);
  }
  return out;
}

/** Route to a goal in a sensible reading order (prerequisites first). */
export function route(course: Course, goalNode: string): string[] {
  const set = ancestors(course, goalNode);
  const d = depths(course.nodes);
  const order = course.nodes.map((n) => n.id);
  return [...set].sort((a, b) => (d.get(a) ?? 0) - (d.get(b) ?? 0) || order.indexOf(a) - order.indexOf(b));
}

/** Compact top-down layout of just the nodes on a route, numbered in reading order. */
export function routeLayout(course: Course, routeIds: string[]): Placed[] {
  const keep = new Set(routeIds);
  const nodes = course.nodes
    .filter((n) => keep.has(n.id))
    .map((n) => ({ ...n, pos: undefined, requires: n.requires.filter((r) => keep.has(r)) }));
  const placed = layout({ nodes, branches: course.branches }, { lanes: false, jitter: false, fitLabels: true });
  // Hand the original node objects back, so identity checks keep working.
  return placed.map((p) => ({ ...p, node: course.nodeById.get(p.node.id) ?? p.node }));
}

export function isAvailable(node: LessonNode, done: Set<string>): boolean {
  return node.requires.every((r) => done.has(r));
}

export function children(course: Course, id: string): LessonNode[] {
  return course.nodes.filter((n) => n.requires.includes(id));
}

/** What to suggest after finishing `id`. */
export function suggestNext(course: Course, id: string, done: Set<string>, routeIds: string[] | null): LessonNode[] {
  if (routeIds) {
    const next = routeIds.find((r) => !done.has(r) && r !== id);
    const n = next ? course.nodeById.get(next) : undefined;
    return n ? [n] : [];
  }
  const after = new Set([...done, id]);
  return children(course, id).filter((c) => !after.has(c.id) && isAvailable(c, after));
}
