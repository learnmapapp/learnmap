import { useEffect, useState } from 'react';
import type { Course } from '../types';
import { COMPARE_LANGS, NO_COMPARE } from '../compareLangs';
import { Icon, LangBadge } from './Icon';

/*
 * The guide is a short, skippable visual-novel style intro:
 *   intro lines → "which language do you think in?" → "pick a goal" → outro
 * Everything it says comes from course.yaml, so each course has its own voice.
 */

type Step =
  | { kind: 'line'; text: string }
  | { kind: 'language'; text: string }
  | { kind: 'goal'; text: string }
  | { kind: 'outro' };

interface Props {
  course: Course;
  compare: string | null;
  onCompare: (id: string) => void;
  onGoal: (goalId: string | null) => void;
  onDone: () => void;
}

function useTypewriter(text: string, speed = 18) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(text.length);
      return;
    }
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s >= text.length) {
          window.clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return { visible: text.slice(0, shown), finished: shown >= text.length, finish: () => setShown(text.length) };
}

export function Guide({ course, compare, onCompare, onGoal, onDone }: Props) {
  const steps: Step[] = [
    ...course.guide.intro.map((text): Step => ({ kind: 'line', text })),
    { kind: 'language', text: course.guide.askLanguage },
    ...(course.goals.length ? [{ kind: 'goal', text: course.guide.askGoal } satisfies Step] : []),
    { kind: 'outro' },
  ];
  const [index, setIndex] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const step = steps[index];
  const text =
    step.kind === 'outro' ? (goal ? course.guide.outroRoute : course.guide.outroExplore) : step.text;
  const { visible, finished, finish } = useTypewriter(text);
  const langs = COMPARE_LANGS.filter((l) => course.comparisons.includes(l.id));
  const isLast = index === steps.length - 1;

  const needsPick = finished && step.kind === 'language' && compare === null;

  const advance = () => {
    if (!finished) return finish();
    if (needsPick) return;
    if (isLast) return onDone();
    if (step.kind === 'goal') onGoal(goal);
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // A focused button handles Enter/Space itself; don't advance on top of that.
      const onButton = e.target instanceof HTMLButtonElement && e.key !== 'ArrowRight';
      if (!onButton && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
        e.preventDefault();
        advance();
      } else if (e.key === 'Escape') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const mood = step.kind === 'language' || step.kind === 'goal' ? 'thinking' : isLast ? 'happy' : 'talking';

  return (
    <div className="guide-backdrop" role="dialog" aria-label={`${course.guide.name} introduces ${course.name}`}>
      <div className={`guide-avatar ${mood}`} aria-hidden>
        <span>{course.guide.avatar}</span>
      </div>
      <div className="guide-box" onClick={() => !finished && finish()}>
        <div className="guide-name">{course.guide.name}</div>
        <p className="guide-text">
          {visible}
          {!finished && <span className="caret">▍</span>}
        </p>

        {finished && step.kind === 'language' && (
          <div className="chips">
            {langs.map((l) => (
              <button
                key={l.id}
                className={compare === l.id ? 'chip active' : 'chip'}
                style={{ ['--chip' as string]: l.color }}
                onClick={() => onCompare(l.id)}
              >
                <LangBadge short={l.short} color={l.color} /> {l.name}
              </button>
            ))}
            <button className={compare === NO_COMPARE ? 'chip active' : 'chip'} onClick={() => onCompare(NO_COMPARE)}>
              <Icon name="sprout" size={16} /> Something else / nothing yet
            </button>
          </div>
        )}

        {finished && step.kind === 'goal' && (
          <div className="goal-cards">
            {course.goals.map((g) => (
              <button key={g.id} className={goal === g.id ? 'goal-card active' : 'goal-card'} onClick={() => setGoal(g.id)}>
                <span className="goal-icon">
                  <Icon name="flag" />
                </span>
                <span>
                  <strong>{g.title}</strong>
                  <small>{g.description}</small>
                </span>
              </button>
            ))}
            <button className={goal === null ? 'goal-card active' : 'goal-card'} onClick={() => setGoal(null)}>
              <span className="goal-icon">
                <Icon name="compass" />
              </span>
              <span>
                <strong>Just let me explore</strong>
                <small>Show me the whole map.</small>
              </span>
            </button>
          </div>
        )}

        <div className="guide-footer">
          <div className="dots" aria-hidden>
            {steps.map((_, i) => (
              <span key={i} className={i <= index ? 'on' : ''} />
            ))}
          </div>
          {!isLast && (
            <button className="link-btn" onClick={onDone}>
              Skip intro
            </button>
          )}
          <button
            className="btn primary"
            onClick={(e) => {
              e.stopPropagation();
              advance();
            }}
            disabled={needsPick}
          >
            {isLast ? "Let's go" : 'Continue'} <Icon name="arrowRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
