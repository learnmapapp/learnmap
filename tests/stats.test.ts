import { describe, expect, it } from 'vitest';
import {
  EMPTY_STATS,
  XP,
  allBadges,
  applyEvent,
  currentStreak,
  dayKey,
  levelFor,
  longestStreak,
  questsFor,
  seedFromProgress,
  type Context,
  type DayLog,
} from '../src/stats';

const courses = [{ id: 'nix', name: 'Nix', logo: '❄️', color: '#7ebae4', total: 2, goalNodes: ['b'] }];
const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h);
const ctx = (now: Date, done: string[] = []): Context => ({ now, progress: { nix: done }, courses });
const log = (xp: number): DayLog => ({ xp, bonus: 0, lessons: 0, exercises: 0, quizzes: 0 });

describe('levels', () => {
  it('starts at level 1 and grows', () => {
    expect(levelFor(0)).toEqual({ level: 1, into: 0, span: 50 });
    expect(levelFor(49).level).toBe(1);
    expect(levelFor(50)).toEqual({ level: 2, into: 0, span: 100 });
    expect(levelFor(160)).toEqual({ level: 3, into: 10, span: 150 });
  });
});

describe('streaks', () => {
  const days = { '2026-11-10': log(5), '2026-11-11': log(5), '2026-11-12': log(5), '2026-11-14': log(5) };

  it('counts days in a row, and a streak from yesterday is still alive', () => {
    expect(currentStreak(days, at(2026, 11, 14))).toBe(1);
    expect(currentStreak(days, at(2026, 11, 15))).toBe(1);
    expect(currentStreak(days, at(2026, 11, 13))).toBe(3);
    expect(currentStreak(days, at(2026, 11, 16))).toBe(0);
  });

  it('finds the longest run, across months', () => {
    expect(longestStreak(days)).toBe(3);
    expect(longestStreak({ '2026-10-31': log(1), '2026-11-01': log(1) })).toBe(2);
  });
});

describe('quests', () => {
  it('gives three quests that stay the same all day', () => {
    const morning = questsFor(at(2026, 11, 15, 8));
    expect(morning).toHaveLength(3);
    expect(questsFor(at(2026, 11, 15, 22))).toEqual(morning);
  });
});

describe('applyEvent', () => {
  it('pays for a lesson once, however often it is completed', () => {
    const now = at(2026, 11, 15);
    const first = applyEvent(EMPTY_STATS, { type: 'lesson', course: 'nix', node: 'a' }, ctx(now, ['a']));
    expect(first.stats.totals.lessons).toBe(1);
    expect(first.stats.xp).toBeGreaterThanOrEqual(XP.lesson);
    const again = applyEvent(first.stats, { type: 'lesson', course: 'nix', node: 'a' }, ctx(now, ['a']));
    expect(again.stats.xp).toBe(first.stats.xp);
    expect(again.rewards).toEqual([]);
  });

  it('rewards goals, finished maps, and first badges', () => {
    const now = at(2026, 11, 15);
    const a = applyEvent(EMPTY_STATS, { type: 'lesson', course: 'nix', node: 'a' }, ctx(now, ['a']));
    expect(a.rewards.some((r) => r.kind === 'badge' && r.badge.id === 'lessons-1')).toBe(true);
    const b = applyEvent(a.stats, { type: 'lesson', course: 'nix', node: 'b' }, ctx(now, ['a', 'b']));
    expect(b.stats.totals.goals).toBe(1);
    expect(b.stats.totals.maps).toBe(1);
    expect(b.stats.badges['map-nix']).toBeDefined();
    expect(b.stats.badges['goal-1']).toBeDefined();
  });

  it('pays more for a quiz answered on the first try', () => {
    const now = at(2026, 11, 15);
    const first = applyEvent(EMPTY_STATS, { type: 'quiz', course: 'nix', node: 'a', index: 0, firstTry: true }, ctx(now));
    const later = applyEvent(EMPTY_STATS, { type: 'quiz', course: 'nix', node: 'a', index: 0, firstTry: false }, ctx(now));
    expect(first.stats.totals.firstTry).toBe(1);
    expect(later.stats.totals.firstTry).toBe(0);
    expect(first.rewards[0]).toMatchObject({ kind: 'xp', amount: XP.quizFirstTry });
    expect(later.rewards[0]).toMatchObject({ kind: 'xp', amount: XP.quiz });
  });

  it('logs activity on the day it happened and remembers late-night lessons', () => {
    const late = at(2026, 11, 15, 2);
    const r = applyEvent(EMPTY_STATS, { type: 'lesson', course: 'nix', node: 'a' }, ctx(late, ['a']));
    expect(r.stats.days[dayKey(late)].lessons).toBe(1);
    expect(r.stats.flags).toContain('night-owl');
  });
});

describe('badges and seeding', () => {
  it('has unique badge ids, including one per map', () => {
    const ids = allBadges(courses).map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('map-nix');
  });

  it('credits lessons finished before scores existed', () => {
    const s = seedFromProgress({ nix: ['a', 'b'], rust: ['x'] });
    expect(s.totals.lessons).toBe(3);
    expect(s.xp).toBe(3 * XP.lesson);
  });
});
