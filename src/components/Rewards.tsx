import { useEffect, useRef, useState } from 'react';
import { currentStreak, dayKey, levelFor, onRewards, useStats, type Reward } from '../stats';
import { Icon } from './Icon';

interface Toast {
  id: number;
  kind: 'xp' | 'badge' | 'level';
  icon: string;
  color?: string;
  title: string;
  text: string;
}

/** Pops up "+10 XP", new badges and level-ups, wherever you are. */
export function RewardToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  useEffect(
    () =>
      onRewards((rewards: Reward[]) => {
        const add: Toast[] = [];
        const xp = rewards.filter((r) => r.kind === 'xp');
        if (xp.length > 0) {
          add.push({
            id: nextId.current++,
            kind: 'xp',
            icon: '',
            title: `+${xp.reduce((n, r) => n + r.amount, 0)} XP`,
            text: xp.map((r) => r.label).join(' · '),
          });
        }
        for (const r of rewards) {
          if (r.kind === 'level')
            add.push({ id: nextId.current++, kind: 'level', icon: '⬆️', title: `Level ${r.level}!`, text: 'You levelled up. Keep exploring!' });
          if (r.kind === 'badge')
            add.push({
              id: nextId.current++,
              kind: 'badge',
              icon: r.badge.icon,
              color: r.badge.color,
              title: `New badge: ${r.badge.name}`,
              text: r.badge.description,
            });
        }
        setToasts((t) => [...t, ...add]);
        for (const t of add) {
          setTimeout(() => setToasts((all) => all.filter((x) => x.id !== t.id)), t.kind === 'xp' ? 2600 : 5000);
        }
      }),
    [],
  );

  if (toasts.length === 0) return null;
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`} style={t.color ? { ['--badge' as string]: t.color } : undefined}>
          {t.kind === 'xp' ? (
            <span className="toast-icon xp">
              <Icon name="bolt" size={18} />
            </span>
          ) : (
            <span className="toast-icon">{t.icon}</span>
          )}
          <span className="toast-text">
            <strong>{t.title}</strong>
            <small>{t.text}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Streak and XP at a glance, for the map's top bar. */
export function ScoreChip() {
  const stats = useStats();
  const now = new Date();
  const streak = currentStreak(stats.days, now);
  const today = (stats.days[dayKey(now)]?.xp ?? 0) > 0;
  return (
    <a className="score-chip" href="#/" title={`Level ${levelFor(stats.xp).level} · see your progress`}>
      <span className={today ? 'streak lit' : 'streak'}>
        <Icon name="flame" size={16} /> {streak}
      </span>
      <span className="xp">
        <Icon name="bolt" size={16} /> {stats.xp}
      </span>
    </a>
  );
}
