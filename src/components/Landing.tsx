import { useEffect, useMemo, useState } from 'react';
import { comingSoon, courseInfos, courses } from '../content/loader';
import { href } from '../router';
import { AD_MODE, SITE } from '../site';
import {
  XP,
  allBadges,
  currentStreak,
  dayKey,
  isEarned,
  levelFor,
  longestStreak,
  questsFor,
  readProgress,
  resetEverything,
  useStats,
  type Badge,
  type BadgeContext,
  type Stats,
} from '../stats';
import { Icon, type IconName } from './Icon';

export type DashPage = 'learn' | 'badges' | 'about';

const NAV: { page: DashPage; label: string; icon: IconName; href: string }[] = [
  { page: 'learn', label: 'Learn', icon: 'map', href: '#/' },
  { page: 'badges', label: 'Badges', icon: 'award', href: '#/badges' },
  { page: 'about', label: 'About', icon: 'info', href: '#/about' },
];

export function Landing({ page }: { page: DashPage }) {
  const stats = useStats();
  // Progress is read from storage on every render of the dashboard, which is
  // cheap and keeps it in step with what the maps saved.
  const progress = useMemo(() => readProgress(), [stats]);
  const ctx: BadgeContext = { stats, progress, courses: courseInfos };

  useEffect(() => {
    document.title = page === 'learn' ? SITE.name : `${page === 'badges' ? 'Badges' : 'About'} · ${SITE.name}`;
    document.documentElement.style.removeProperty('--accent');
  }, [page]);

  return (
    <div className="dash">
      <nav className="dash-nav" aria-label="Main">
        <a className="dash-brand" href="#/">
          <span className="dash-logo" aria-hidden>
            <Icon name="map" size={22} />
          </span>
          <strong>{SITE.name}</strong>
        </a>
        {NAV.map((n) => (
          <a key={n.page} href={n.href} className={n.page === page ? 'dash-link active' : 'dash-link'} aria-current={n.page === page ? 'page' : undefined}>
            <Icon name={n.icon} size={22} />
            <span>{n.label}</span>
          </a>
        ))}
      </nav>

      <div className="dash-stats">
        <StatsBar stats={stats} />
      </div>

      <main className="dash-main">
        {page === 'learn' && <LearnPage stats={stats} progress={progress} />}
        {page === 'badges' && <BadgesPage ctx={ctx} />}
        {page === 'about' && <AboutPage />}
      </main>

      <aside className="dash-side">
        <LevelCard stats={stats} />
        <QuestsCard stats={stats} />
        <WeekCard stats={stats} />
        {page !== 'badges' && <BadgePreview ctx={ctx} />}
        {AD_MODE && (
          <footer className="dash-footer muted">
            {SITE.footer}{' '}
            <a href={SITE.url} target="_blank" rel="noreferrer">
              {SITE.urlLabel}
            </a>
          </footer>
        )}
      </aside>
    </div>
  );
}

/* ---------- right column ---------- */

function StatsBar({ stats }: { stats: Stats }) {
  const now = new Date();
  const streak = currentStreak(stats.days, now);
  const lit = (stats.days[dayKey(now)]?.xp ?? 0) > 0;
  const { level } = levelFor(stats.xp);
  const badges = Object.keys(stats.badges).length;
  return (
    <div className="stat-row">
      <span className={lit ? 'stat streak lit' : 'stat streak'} title={lit ? 'Day streak' : 'Learn something today to keep your streak'}>
        <Icon name="flame" /> {streak}
        <small>day streak</small>
      </span>
      <span className="stat xp" title="Total XP">
        <Icon name="bolt" /> {stats.xp}
        <small>XP</small>
      </span>
      <span className="stat level" title="Level">
        <Icon name="sparkles" /> {level}
        <small>level</small>
      </span>
      <a className="stat badges" href="#/badges" title="Badges earned">
        <Icon name="award" /> {badges}
        <small>badges</small>
      </a>
    </div>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <span className="bar" style={color ? { ['--bar' as string]: color } : undefined}>
      <span style={{ width: `${pct}%` }} />
    </span>
  );
}

function LevelCard({ stats }: { stats: Stats }) {
  const { level, into, span } = levelFor(stats.xp);
  return (
    <section className="side-card level-card">
      <div className="level-medal" aria-hidden>
        {level}
      </div>
      <div className="level-text">
        <h3>Level {level}</h3>
        <Bar value={into} max={span} />
        <small className="muted">
          {span - into} XP to level {level + 1}
        </small>
      </div>
    </section>
  );
}

function QuestsCard({ stats }: { stats: Stats }) {
  const now = new Date();
  const today = stats.days[dayKey(now)];
  const quests = questsFor(now);
  const doneCount = quests.filter((q) => (today?.[q.metric] ?? 0) >= q.target).length;
  return (
    <section className="side-card">
      <header className="side-head">
        <h3>Daily quests</h3>
        <span className="muted">
          {doneCount}/{quests.length}
        </span>
      </header>
      <ul className="quests">
        {quests.map((q) => {
          const have = Math.min(today?.[q.metric] ?? 0, q.target);
          const done = have >= q.target;
          return (
            <li key={q.id} className={done ? 'quest done' : 'quest'}>
              <span className="quest-icon" aria-hidden>
                <Icon name={done ? 'check' : q.icon} size={18} />
              </span>
              <span className="quest-body">
                <span className="quest-label">{q.label}</span>
                <span className="quest-progress">
                  <Bar value={have} max={q.target} />
                  <small>
                    {have}/{q.target}
                  </small>
                </span>
              </span>
              <span className="quest-reward" title={`${XP.quest} XP when done`}>
                +{XP.quest}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="side-note muted">New quests every day.</p>
    </section>
  );
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function WeekCard({ stats }: { stats: Stats }) {
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return { key: dayKey(d), label: WEEKDAYS[d.getDay()], xp: (stats.days[dayKey(d)]?.xp ?? 0) + (stats.days[dayKey(d)]?.bonus ?? 0), today: i === 6 };
  });
  const max = Math.max(20, ...week.map((d) => d.xp));
  const total = week.reduce((n, d) => n + d.xp, 0);
  return (
    <section className="side-card">
      <header className="side-head">
        <h3>This week</h3>
        <span className="muted">{total} XP</span>
      </header>
      <div className="week">
        {week.map((d) => (
          <div key={d.key} className={d.today ? 'week-day today' : 'week-day'} title={`${d.key}: ${d.xp} XP`}>
            <span className="week-bar">
              <span style={{ height: `${(d.xp / max) * 100}%` }} />
            </span>
            <small>{d.label}</small>
          </div>
        ))}
      </div>
      <p className="side-note muted">Longest streak: {plural(longestStreak(stats.days), 'day')}</p>
    </section>
  );
}

function BadgePreview({ ctx }: { ctx: BadgeContext }) {
  const badges = allBadges(ctx.courses);
  const earned = badges
    .filter((b) => ctx.stats.badges[b.id])
    .sort((a, b) => (ctx.stats.badges[b.id] ?? '').localeCompare(ctx.stats.badges[a.id] ?? ''));
  // Show what's been earned lately, topped up with the closest ones to earn.
  const next = badges
    .filter((b) => !ctx.stats.badges[b.id])
    .map((b) => ({ b, share: share(b, ctx) }))
    .sort((x, y) => y.share - x.share)
    .map((x) => x.b);
  const shown = [...earned.slice(0, 2), ...next].slice(0, 4);
  return (
    <section className="side-card">
      <header className="side-head">
        <h3>Badges</h3>
        <a href="#/badges">View all</a>
      </header>
      <div className="badge-mini-row">
        {shown.map((b) => (
          <BadgeMedal key={b.id} badge={b} earned={!!ctx.stats.badges[b.id]} size="small" />
        ))}
      </div>
    </section>
  );
}

function share(b: Badge, ctx: BadgeContext): number {
  const [have, need] = b.progress(ctx);
  return need > 0 ? have / need : 0;
}

/* ---------- learn ---------- */

function LearnPage({ stats, progress }: { stats: Stats; progress: Record<string, string[]> }) {
  const last = stats.last;
  const lastCourse = last ? courses.find((c) => c.id === last.course) : undefined;
  const lastDone = last ? (progress[last.course] ?? []).includes(last.node) : false;
  const sorted = [...courses].sort((a, b) => {
    const pa = progress[a.id]?.length ?? 0;
    const pb = progress[b.id]?.length ?? 0;
    if (a.id === last?.course) return -1;
    if (b.id === last?.course) return 1;
    return pb - pa || a.name.localeCompare(b.name);
  });

  return (
    <>
      {last && lastCourse ? (
        <a
          className="hero-card"
          href={lastDone ? href(lastCourse.id) : href(lastCourse.id, last.node)}
          style={{ ['--card' as string]: lastCourse.color }}
        >
          <span className="hero-logo" aria-hidden>
            {lastCourse.logo}
          </span>
          <span className="hero-text">
            <small>{lastDone ? `Back to the ${lastCourse.name} map` : `Continue ${lastCourse.name}`}</small>
            <strong>{lastDone ? 'Pick your next lesson' : last.title}</strong>
          </span>
          <span className="hero-go">
            {lastDone ? 'Open map' : 'Continue'} <Icon name="arrowRight" size={18} />
          </span>
        </a>
      ) : (
        <header className="welcome">
          <h1>Welcome to {SITE.name}</h1>
          <p>{SITE.tagline}</p>
        </header>
      )}

      <section>
        <h2 className="dash-h2">Your maps</h2>
        <div className="map-list">
          {sorted.map((c) => {
            const total = courseInfos.find((i) => i.id === c.id)?.total ?? 0;
            const n = Math.min(progress[c.id]?.length ?? 0, total);
            const pct = total ? Math.round((n / total) * 100) : 0;
            return (
              <a key={c.id} className="map-card" href={href(c.id)} style={{ ['--card' as string]: c.color }}>
                <span className="map-logo" aria-hidden>
                  {c.logo}
                </span>
                <span className="map-body">
                  <span className="map-title">
                    <strong>{c.name}</strong>
                    {pct === 100 && <span className="map-done">Mastered</span>}
                  </span>
                  <span className="muted map-tagline">{c.tagline}</span>
                  <span className="map-progress">
                    <Bar value={n} max={total} color={c.color} />
                    <small>
                      {n}/{total} lessons
                    </small>
                  </span>
                </span>
                <span className="map-go">
                  {n === 0 ? 'Start' : pct === 100 ? 'Review' : 'Continue'} <Icon name="arrowRight" size={16} />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {comingSoon.length > 0 && (
        <section>
          <h2 className="dash-h2">Coming soon</h2>
          <div className="soon-list">
            {comingSoon.map((c) => (
              <div key={c.id} className="soon-chip" style={{ ['--card' as string]: c.color }} title={c.blurb}>
                <span aria-hidden>{c.logo}</span>
                <span>
                  <strong>{c.name}</strong>
                  <small className="muted">{c.blurb}</small>
                </span>
                {AD_MODE && c.pluginUrl && (
                  <a href={c.pluginUrl} target="_blank" rel="noreferrer" title={`${c.name} plugin`}>
                    <Icon name="external" size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ---------- badges ---------- */

function BadgeMedal({ badge, earned, size }: { badge: Badge; earned: boolean; size?: 'small' }) {
  return (
    <span
      className={`medal${earned ? ' earned' : ''}${size ? ` ${size}` : ''}`}
      style={{ ['--badge' as string]: badge.color }}
      title={`${badge.name}: ${badge.description}`}
    >
      <span className="medal-icon">{badge.icon}</span>
      {!earned && (
        <span className="medal-lock">
          <Icon name="lock" size={size ? 11 : 14} />
        </span>
      )}
    </span>
  );
}

function BadgesPage({ ctx }: { ctx: BadgeContext }) {
  const badges = allBadges(ctx.courses);
  const earnedCount = badges.filter((b) => ctx.stats.badges[b.id] || isEarned(b, ctx)).length;
  return (
    <>
      <header className="page-head">
        <h1>Badges</h1>
        <p className="muted">
          {earnedCount} of {badges.length} earned. Badges are yours to keep, even if you reset a map.
        </p>
      </header>
      <div className="badge-grid">
        {badges.map((b) => {
          const earnedAt = ctx.stats.badges[b.id];
          const [have, need] = b.progress(ctx);
          return (
            <div key={b.id} className={earnedAt ? 'badge-card earned' : 'badge-card'}>
              <BadgeMedal badge={b} earned={!!earnedAt} />
              <strong>{b.name}</strong>
              <span className="muted">{b.description}</span>
              {earnedAt ? (
                <small className="badge-date">Earned {new Date(earnedAt).toLocaleDateString()}</small>
              ) : (
                <span className="badge-progress">
                  <Bar value={have} max={need} color={b.color} />
                  <small>{b.percent ? `${have}%` : `${have}/${need}`}</small>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- about ---------- */

function AboutPage() {
  const [armed, setArmed] = useState(false);
  return (
    <>
      <header className="page-head">
        <h1>About {SITE.name}</h1>
        <p className="muted">{SITE.tagline}</p>
      </header>

      <section className="about-card">
        <h2>How it works</h2>
        <p>
          {SITE.name} teaches a new language by comparing it to one you already know. Each map is a set of short
          lessons, connected by what they build on. Pick a goal and follow the route, or wander wherever looks
          interesting. Every lesson has small exercises or quick checks to try things out.
        </p>
      </section>

      <section className="about-card">
        <h2>Points and badges</h2>
        <ul className="xp-list">
          <li>
            <span>Complete a lesson</span> <b>+{XP.lesson} XP</b>
          </li>
          <li>
            <span>Solve an exercise</span> <b>+{XP.exercise} XP</b>
          </li>
          <li>
            <span>Answer a quick check on the first try</span> <b>+{XP.quizFirstTry} XP</b>
          </li>
          <li>
            <span>Answer it after another go</span> <b>+{XP.quiz} XP</b>
          </li>
          <li>
            <span>Finish a daily quest</span> <b>+{XP.quest} XP</b>
          </li>
          <li>
            <span>Reach a goal</span> <b>+{XP.goal} XP</b>
          </li>
          <li>
            <span>Complete a whole map</span> <b>+{XP.map} XP</b>
          </li>
        </ul>
        <p className="muted">
          Learn something every day to grow your streak. Each lesson pays out once, so going over it again is just for
          fun.
        </p>
      </section>

      <section className="about-card">
        <h2>Thanks</h2>
        <p>
          Inspired by Vimjoyer's{' '}
          <a href="https://vimjoyer.com/nixmap/" target="_blank" rel="noreferrer">
            Nixmap <Icon name="external" size={14} />
          </a>
          , a playful, choose-your-own-adventure guide to Nix. Thank you for the idea!
        </p>
      </section>

      <section className="about-card">
        <h2>Your data</h2>
        <p className="muted">
          There are no accounts. Your progress, points and badges are stored in this browser only, so they won't follow
          you to another device.
        </p>
        {armed ? (
          <div className="row">
            <span className="muted">Forget all progress, points and badges?</span>
            <button
              className="btn danger"
              onClick={() => {
                resetEverything();
                setArmed(false);
              }}
            >
              Yes, start over
            </button>
            <button className="link-btn" onClick={() => setArmed(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn" onClick={() => setArmed(true)}>
            Start over
          </button>
        )}
      </section>
    </>
  );
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}
