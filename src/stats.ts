import { useEffect, useState } from 'react';

/*
 * Score keeping: XP, levels, streaks, daily quests and badges.
 *
 * Everything is stored in localStorage under one key. The core is a set of
 * pure functions (applyEvent, streaks, quests, badges) that take the current
 * date and progress as arguments, so they're easy to test; the bottom of this
 * file wires them to storage and React.
 *
 * Rewards are paid once per lesson and per exercise: un-completing and
 * re-completing a lesson, or resetting a map, never pays out again.
 */

export const XP = {
  lesson: 10,
  exercise: 5,
  quizFirstTry: 5,
  quiz: 2,
  goal: 25,
  map: 100,
  quest: 10,
} as const;

export interface DayLog {
  /** XP earned by learning; quests are judged on this. */
  xp: number;
  /** XP from quest bonuses, kept apart so one quest can't complete another. */
  bonus: number;
  lessons: number;
  exercises: number;
  quizzes: number;
}

export interface Stats {
  xp: number;
  /** Reward keys already paid out, e.g. "lesson:nix:strings". */
  awarded: string[];
  /** Activity per local date (YYYY-MM-DD). */
  days: Record<string, DayLog>;
  totals: { lessons: number; exercises: number; quizzes: number; firstTry: number; goals: number; maps: number };
  /** Badge id → ISO time it was earned. */
  badges: Record<string, string>;
  /** One-off achievements, such as finishing a lesson late at night. */
  flags: string[];
  /** The lesson opened most recently, for "Continue where you left off". */
  last: { course: string; node: string; title: string; at: string } | null;
}

export const EMPTY_STATS: Stats = {
  xp: 0,
  awarded: [],
  days: {},
  totals: { lessons: 0, exercises: 0, quizzes: 0, firstTry: 0, goals: 0, maps: 0 },
  badges: {},
  flags: [],
  last: null,
};

/** What the score engine needs to know about each course. */
export interface CourseInfo {
  id: string;
  name: string;
  logo: string;
  color: string;
  total: number;
  /** Lesson ids that are the destination of a goal. */
  goalNodes: string[];
}

/** Completed lesson ids per course id. */
export type ProgressMap = Record<string, string[]>;

export interface Context {
  now: Date;
  progress: ProgressMap;
  courses: CourseInfo[];
}

export type RewardEvent =
  | { type: 'lesson'; course: string; node: string }
  | { type: 'exercise'; course: string; node: string; index: number }
  | { type: 'quiz'; course: string; node: string; index: number; firstTry: boolean };

export type Reward =
  | { kind: 'xp'; amount: number; label: string }
  | { kind: 'badge'; badge: Badge }
  | { kind: 'level'; level: number };

/* ---------- dates ---------- */

export function dayKey(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/* ---------- levels ---------- */

/** Total XP needed to reach a level: 0, 50, 150, 300, 500, … */
export function xpForLevel(level: number): number {
  return 25 * level * (level - 1);
}

export function levelFor(xp: number): { level: number; into: number; span: number } {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const base = xpForLevel(level);
  return { level, into: xp - base, span: xpForLevel(level + 1) - base };
}

/* ---------- streaks ---------- */

const active = (days: Record<string, DayLog>, d: Date) => (days[dayKey(d)]?.xp ?? 0) > 0;

/**
 * Days in a row with some XP. A streak that ended yesterday still counts:
 * you have until midnight to keep it going.
 */
export function currentStreak(days: Record<string, DayLog>, now: Date): number {
  let d = active(days, now) ? now : addDays(now, -1);
  let n = 0;
  while (active(days, d)) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}

export function longestStreak(days: Record<string, DayLog>): number {
  const keys = Object.keys(days)
    .filter((k) => days[k].xp > 0)
    .sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const k of keys) {
    const [y, m, d] = k.split('-').map(Number);
    run = prev !== null && dayKey(addDays(new Date(y, m - 1, d), -1)) === prev ? run + 1 : 1;
    best = Math.max(best, run);
    prev = k;
  }
  return best;
}

/* ---------- daily quests ---------- */

export interface Quest {
  id: string;
  label: string;
  metric: Exclude<keyof DayLog, 'bonus'>;
  target: number;
  icon: 'bolt' | 'check' | 'code' | 'help';
}

const QUEST_SLOTS: Quest[][] = [
  [
    { id: 'xp20', label: 'Earn 20 XP', metric: 'xp', target: 20, icon: 'bolt' },
    { id: 'xp40', label: 'Earn 40 XP', metric: 'xp', target: 40, icon: 'bolt' },
  ],
  [
    { id: 'lessons1', label: 'Complete a lesson', metric: 'lessons', target: 1, icon: 'check' },
    { id: 'lessons2', label: 'Complete 2 lessons', metric: 'lessons', target: 2, icon: 'check' },
    { id: 'lessons3', label: 'Complete 3 lessons', metric: 'lessons', target: 3, icon: 'check' },
  ],
  [
    { id: 'exercises2', label: 'Solve 2 exercises', metric: 'exercises', target: 2, icon: 'code' },
    { id: 'quizzes3', label: 'Answer 3 quick checks', metric: 'quizzes', target: 3, icon: 'help' },
    { id: 'exercises3', label: 'Solve 3 exercises', metric: 'exercises', target: 3, icon: 'code' },
  ],
];

/** Three quests for the day, the same all day long, different tomorrow. */
export function questsFor(now: Date): Quest[] {
  const key = dayKey(now);
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return QUEST_SLOTS.map((slot, i) => slot[(h >>> (i * 4)) % slot.length]);
}

/* ---------- badges ---------- */

export interface BadgeContext {
  stats: Stats;
  progress: ProgressMap;
  courses: CourseInfo[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  /** Current value and target, for a progress bar on locked badges. */
  progress: (c: BadgeContext) => [number, number];
  /** Show progress as a percentage rather than "3 / 10". */
  percent?: boolean;
}

const count = (id: string, name: string, description: string, icon: string, color: string, target: number, value: (c: BadgeContext) => number): Badge => ({
  id,
  name,
  description,
  icon,
  color,
  progress: (c) => [Math.min(value(c), target), target],
});

const flag = (id: string, name: string, description: string, icon: string, color: string): Badge =>
  count(id, name, description, icon, color, 1, (c) => (c.stats.flags.includes(id) ? 1 : 0));

const mapsStarted = (c: BadgeContext) => c.courses.filter((m) => (c.progress[m.id]?.length ?? 0) > 0).length;
const bestShare = (c: BadgeContext) =>
  Math.max(0, ...c.courses.map((m) => (m.total ? (c.progress[m.id]?.length ?? 0) / m.total : 0)));

export function allBadges(courses: CourseInfo[]): Badge[] {
  const lessons = (c: BadgeContext) => c.stats.totals.lessons;
  return [
    count('lessons-1', 'First steps', 'Complete your first lesson.', '🌱', '#a6c94a', 1, lessons),
    count('lessons-10', 'Sprouting', 'Complete 10 lessons.', '🌿', '#7fbf6a', 10, lessons),
    count('lessons-25', 'Deep roots', 'Complete 25 lessons.', '🌳', '#5fa35a', 25, lessons),
    count('lessons-50', 'Summit', 'Complete 50 lessons.', '🏔️', '#7ebae4', 50, lessons),
    count('lessons-100', 'Cartographer', 'Complete 100 lessons.', '🧭', '#e0b84f', 100, lessons),
    count('exercises-1', 'Hello, world', 'Solve your first exercise.', '👋', '#e0b84f', 1, (c) => c.stats.totals.exercises),
    count('exercises-25', 'Tinkerer', 'Solve 25 exercises.', '🛠️', '#c9a27e', 25, (c) => c.stats.totals.exercises),
    count('exercises-100', 'Machinist', 'Solve 100 exercises.', '⚙️', '#a39b8f', 100, (c) => c.stats.totals.exercises),
    count('quizzes-10', 'Quick thinker', 'Answer 10 quick checks.', '🧠', '#d784b8', 10, (c) => c.stats.totals.quizzes),
    count('first-try-25', 'Sharp eye', 'Get 25 quick checks right on the first try.', '🎯', '#e5604d', 25, (c) => c.stats.totals.firstTry),
    count('streak-3', 'Warming up', 'Learn 3 days in a row.', '🔥', '#ff8a3d', 3, (c) => longestStreak(c.stats.days)),
    count('streak-7', 'Week streak', 'Learn 7 days in a row.', '📅', '#ff6a3d', 7, (c) => longestStreak(c.stats.days)),
    count('streak-30', 'Unstoppable', 'Learn 30 days in a row.', '☄️', '#e5604d', 30, (c) => longestStreak(c.stats.days)),
    count('goal-1', 'Goal getter', 'Reach the end of a goal route.', '🚩', '#9b8cf0', 1, (c) => c.stats.totals.goals),
    count('goal-5', 'Pathfinder', 'Reach 5 goals.', '🗺️', '#7b6fd0', 5, (c) => c.stats.totals.goals),
    { ...count('halfway', 'Base camp', 'Finish half of any map.', '⛺', '#6fc2a8', 50, (c) => Math.floor(bestShare(c) * 100)), percent: true },
    count('polyglot', 'Polyglot', 'Complete lessons on 2 different maps.', '💬', '#4a9fd1', 2, mapsStarted),
    count('traveller', 'World traveller', 'Complete lessons on 3 different maps.', '🌍', '#4a6fd1', 3, mapsStarted),
    count('level-5', 'Rising star', 'Reach level 5.', '⭐', '#f7c948', 5, (c) => levelFor(c.stats.xp).level),
    count('level-10', 'Supernova', 'Reach level 10.', '🌟', '#ffe953', 10, (c) => levelFor(c.stats.xp).level),
    flag('night-owl', 'Night shift', 'Complete a lesson between midnight and 5 am.', '🌙', '#4a6fd1'),
    flag('early-bird', 'Early bird', 'Complete a lesson between 5 and 7 am.', '🌅', '#ff9f5a'),
    flag('weekend', 'Weekend warrior', 'Complete a lesson on a Saturday or Sunday.', '☕', '#c9a27e'),
    ...courses.map((m) =>
      count(`map-${m.id}`, `${m.name} master`, `Complete every lesson on the ${m.name} map.`, m.logo, m.color, m.total, (c) => c.progress[m.id]?.length ?? 0),
    ),
  ];
}

export function isEarned(b: Badge, c: BadgeContext): boolean {
  const [have, need] = b.progress(c);
  return need > 0 && have >= need;
}

/* ---------- applying events ---------- */

type Counter = 'lessons' | 'exercises' | 'quizzes';

function bump(stats: Stats, day: string, xp: number, metric?: Counter | 'bonus'): Stats {
  const log = stats.days[day] ?? { xp: 0, bonus: 0, lessons: 0, exercises: 0, quizzes: 0 };
  const next = metric === 'bonus' ? { ...log, bonus: log.bonus + xp } : { ...log, xp: log.xp + xp };
  if (metric && metric !== 'bonus') next[metric] += 1;
  return { ...stats, xp: stats.xp + xp, days: { ...stats.days, [day]: next } };
}

/**
 * Applies one event and returns the new stats plus what to celebrate. For a
 * lesson event, `ctx.progress` must already include the completed lesson.
 */
export function applyEvent(stats: Stats, event: RewardEvent, ctx: Context): { stats: Stats; rewards: Reward[] } {
  const rewards: Reward[] = [];
  const day = dayKey(ctx.now);
  const levelBefore = levelFor(stats.xp).level;
  const paid = new Set(stats.awarded);
  let s = stats;
  const pay = (key: string, xp: number, label: string, metric?: Counter | 'bonus') => {
    if (paid.has(key)) return false;
    paid.add(key);
    s = bump(s, day, xp, metric);
    rewards.push({ kind: 'xp', amount: xp, label });
    return true;
  };

  if (event.type === 'lesson') {
    const base = `${event.course}:${event.node}`;
    if (pay(`lesson:${base}`, XP.lesson, 'Lesson complete', 'lessons')) {
      s = { ...s, totals: { ...s.totals, lessons: s.totals.lessons + 1 } };
      const hour = ctx.now.getHours();
      const weekday = ctx.now.getDay();
      const flags = new Set(s.flags);
      if (hour < 5) flags.add('night-owl');
      else if (hour < 7) flags.add('early-bird');
      if (weekday === 0 || weekday === 6) flags.add('weekend');
      s = { ...s, flags: [...flags] };
    }
    const info = ctx.courses.find((c) => c.id === event.course);
    if (info?.goalNodes.includes(event.node) && pay(`goal:${base}`, XP.goal, 'Goal reached')) {
      s = { ...s, totals: { ...s.totals, goals: s.totals.goals + 1 } };
    }
    const done = ctx.progress[event.course]?.length ?? 0;
    if (info && info.total > 0 && done >= info.total && pay(`map:${event.course}`, XP.map, `${info.name} map complete`)) {
      s = { ...s, totals: { ...s.totals, maps: s.totals.maps + 1 } };
    }
  } else if (event.type === 'exercise') {
    if (pay(`exercise:${event.course}:${event.node}:${event.index}`, XP.exercise, 'Exercise solved', 'exercises')) {
      s = { ...s, totals: { ...s.totals, exercises: s.totals.exercises + 1 } };
    }
  } else {
    const xp = event.firstTry ? XP.quizFirstTry : XP.quiz;
    if (pay(`quiz:${event.course}:${event.node}:${event.index}`, xp, event.firstTry ? 'Right on the first try' : 'Quick check', 'quizzes')) {
      s = {
        ...s,
        totals: { ...s.totals, quizzes: s.totals.quizzes + 1, firstTry: s.totals.firstTry + (event.firstTry ? 1 : 0) },
      };
    }
  }

  const today = s.days[day];
  if (today) {
    for (const q of questsFor(ctx.now)) {
      if (today[q.metric] >= q.target) pay(`quest:${day}:${q.id}`, XP.quest, `Quest done: ${q.label}`, 'bonus');
    }
  }

  s = { ...s, awarded: [...paid] };
  const levelAfter = levelFor(s.xp).level;
  if (levelAfter > levelBefore) rewards.push({ kind: 'level', level: levelAfter });

  const { stats: withBadges, earned } = checkBadges(s, ctx);
  for (const badge of earned) rewards.push({ kind: 'badge', badge });
  return { stats: withBadges, rewards };
}

/** Marks any newly earned badges. Earned badges are kept for good. */
export function checkBadges(stats: Stats, ctx: Context): { stats: Stats; earned: Badge[] } {
  const bc: BadgeContext = { stats, progress: ctx.progress, courses: ctx.courses };
  const earned = allBadges(ctx.courses).filter((b) => !stats.badges[b.id] && isEarned(b, bc));
  if (earned.length === 0) return { stats, earned };
  const badges = { ...stats.badges };
  for (const b of earned) badges[b.id] = ctx.now.toISOString();
  return { stats: { ...stats, badges }, earned };
}

/**
 * Learners who finished lessons before scores existed get credit for them,
 * without a streak or daily activity.
 */
export function seedFromProgress(progress: ProgressMap): Stats {
  const awarded: string[] = [];
  for (const [course, done] of Object.entries(progress)) for (const node of done) awarded.push(`lesson:${course}:${node}`);
  return {
    ...EMPTY_STATS,
    xp: awarded.length * XP.lesson,
    awarded,
    totals: { ...EMPTY_STATS.totals, lessons: awarded.length },
  };
}

function validateStats(v: unknown): Stats | null {
  if (typeof v !== 'object' || v === null) return null;
  const num = (x: unknown) => (typeof x === 'number' && Number.isFinite(x) ? x : 0);
  const rec = (x: unknown): Record<string, unknown> => (typeof x === 'object' && x !== null ? Object.fromEntries(Object.entries(x)) : {});
  const o = rec(v);
  const t = rec(o.totals);
  const days: Record<string, DayLog> = {};
  for (const [k, d] of Object.entries(rec(o.days))) {
    const r = rec(d);
    days[k] = { xp: num(r.xp), bonus: num(r.bonus), lessons: num(r.lessons), exercises: num(r.exercises), quizzes: num(r.quizzes) };
  }
  const badges: Record<string, string> = {};
  for (const [k, d] of Object.entries(rec(o.badges))) if (typeof d === 'string') badges[k] = d;
  const strs = (x: unknown) => (Array.isArray(x) ? x.filter((s): s is string => typeof s === 'string') : []);
  const l = rec(o.last);
  const last =
    typeof l.course === 'string' && typeof l.node === 'string'
      ? { course: l.course, node: l.node, title: typeof l.title === 'string' ? l.title : l.node, at: typeof l.at === 'string' ? l.at : '' }
      : null;
  return {
    xp: num(o.xp),
    awarded: strs(o.awarded),
    days,
    totals: {
      lessons: num(t.lessons),
      exercises: num(t.exercises),
      quizzes: num(t.quizzes),
      firstTry: num(t.firstTry),
      goals: num(t.goals),
      maps: num(t.maps),
    },
    badges,
    flags: strs(o.flags),
    last,
  };
}

/* ---------- storage and React ---------- */

const STATS_KEY = 'learnmap:stats';
const statsListeners = new Set<(s: Stats) => void>();
const rewardListeners = new Set<(r: Reward[]) => void>();
let courseInfos: CourseInfo[] = [];

/** Called once at startup with every playable course. */
export function registerCourses(infos: CourseInfo[]) {
  courseInfos = infos;
}

export function readProgress(): ProgressMap {
  const map: ProgressMap = {};
  for (const c of courseInfos) {
    try {
      const raw = localStorage.getItem(`learnmap:course:${c.id}`);
      const v: unknown = raw ? JSON.parse(raw) : null;
      map[c.id] =
        typeof v === 'object' && v !== null && 'done' in v && Array.isArray(v.done)
          ? v.done.filter((x): x is string => typeof x === 'string')
          : [];
    } catch {
      map[c.id] = [];
    }
  }
  return map;
}

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return validateStats(JSON.parse(raw)) ?? EMPTY_STATS;
    const seeded = seedFromProgress(readProgress());
    return checkBadges(seeded, { now: new Date(), progress: readProgress(), courses: courseInfos }).stats;
  } catch {
    return EMPTY_STATS;
  }
}

function saveStats(s: Stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable: scores just won't persist */
  }
  for (const l of statsListeners) l(s);
}

/** Records an event, saves it and tells any listeners what was earned. */
export function record(event: RewardEvent) {
  const progress = readProgress();
  if (event.type === 'lesson') {
    const done = progress[event.course] ?? [];
    if (!done.includes(event.node)) progress[event.course] = [...done, event.node];
  }
  const { stats, rewards } = applyEvent(loadStats(), event, { now: new Date(), progress, courses: courseInfos });
  saveStats(stats);
  if (rewards.length > 0) for (const l of rewardListeners) l(rewards);
}

/** Remembers the lesson being read, for "Continue where you left off". */
export function touchLesson(course: string, node: string, title: string) {
  saveStats({ ...loadStats(), last: { course, node, title, at: new Date().toISOString() } });
}

/** Forgets everything: scores, badges and progress on every map. */
export function resetEverything() {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith('learnmap:') && k !== 'learnmap:prefs') keys.push(k);
    }
    for (const k of keys) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
  saveStats(EMPTY_STATS);
}

export function onRewards(fn: (r: Reward[]) => void): () => void {
  rewardListeners.add(fn);
  return () => {
    rewardListeners.delete(fn);
  };
}

export function useStats(): Stats {
  const [stats, setStats] = useState<Stats>(loadStats);
  useEffect(() => {
    statsListeners.add(setStats);
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith('learnmap:')) setStats(loadStats());
    };
    window.addEventListener('storage', onStorage);
    return () => {
      statsListeners.delete(setStats);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return stats;
}
