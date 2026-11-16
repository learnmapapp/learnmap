import { useEffect, useMemo, useRef, useState, type MouseEvent, type FocusEvent } from 'react';
import type { Course, GlossaryEntry, LessonNode } from '../types';
import { countTasks, parseLesson, type Segment } from '../content/markdown';
import { createPortal } from 'react-dom';
import { NO_COMPARE } from '../compareLangs';
import { suggestNext } from '../graph';
import { navigate } from '../router';
import { CodeBlock } from './Code';
import { Compare, Exercise, Quiz, Repl } from './Blocks';
import { Icon } from './Icon';
import { record, touchLesson } from '../stats';
import { ThemeButton } from './ThemeSwitch';

interface Props {
  course: Course;
  node: LessonNode;
  done: Set<string>;
  routeIds: string[] | null;
  compare: string | null;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onClose: () => void;
}

interface Tip {
  entry: GlossaryEntry;
  x: number;
  y: number;
  below: boolean;
}

/** With a mouse the tip shows on hover, so one click can open the lesson. */
function canHover() {
  return window.matchMedia('(hover: hover)').matches;
}

/** Keeps only the comparison snippet for the learner's language. */
function visibleSegments(segments: Segment[], compare: string | null): Segment[] {
  return segments.filter((s) => s.kind !== 'compare' || (compare !== null && compare !== NO_COMPARE && s.lang === compare));
}

export function LessonPanel({ course, node, done, routeIds, compare, onComplete, onUncomplete, onClose }: Props) {
  const segments = useMemo(() => parseLesson(node.body, course.syntax), [node.body, course.syntax]);
  const visible = useMemo(() => visibleSegments(segments, compare), [segments, compare]);
  const totalTasks = countTasks(segments);
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [tip, setTip] = useState<Tip | null>(null);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDone = done.has(node.id);
  const remaining = isDone ? 0 : totalTasks - solved.size;
  const next = suggestNext(course, node.id, done, routeIds);
  const missing = node.requires.filter((r) => !done.has(r)).map((r) => course.nodeById.get(r)).filter((n) => n !== undefined);

  useEffect(() => {
    touchLesson(course.id, node.id, node.title);
  }, [course.id, node.id, node.title]);

  useEffect(() => {
    setSolved(new Set());
    setTip(null);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [node.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.target instanceof HTMLTextAreaElement) return;
      // A dialog on top (search, settings) handles its own Escape.
      if (document.querySelector('.modal-backdrop')) return;
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const showTip = (target: EventTarget) => {
    if (!(target instanceof HTMLElement) || !target.classList.contains('term')) return;
    const entry = course.glossary.get(target.dataset.term ?? '');
    if (!entry) return;
    const rect = target.getBoundingClientRect();
    const below = rect.top < 180;
    setTip({ entry, x: rect.left + rect.width / 2, y: below ? rect.bottom + 8 : rect.top - 8, below });
  };
  /** The lesson a glossary term links to, unless it's the one you're reading. */
  const linkedLesson = (entry: GlossaryEntry | undefined) =>
    entry?.node && entry.node !== node.id ? course.nodeById.get(entry.node) : undefined;
  const tipLesson = linkedLesson(tip?.entry);
  const hideTip = (e: MouseEvent | FocusEvent) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('term')) setTip(null);
  };
  const onClick = (e: MouseEvent) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('a');
    const href = link?.getAttribute('href') ?? '';
    if (href.startsWith('node:')) {
      e.preventDefault();
      navigate(course.id, href.slice(5));
      return;
    }
    if (link && /^https?:/.test(href)) link.setAttribute('target', '_blank');
    if (target instanceof HTMLElement && target.classList.contains('term')) {
      const entry = course.glossary.get(target.dataset.term ?? '');
      const lesson = linkedLesson(entry);
      if (lesson && (tip?.entry === entry || canHover())) navigate(course.id, lesson.id);
      else showTip(target);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  };

  const branch = course.branches.find((b) => b.id === node.branch);

  let taskIndex = -1;
  return (
    <aside className="panel" style={{ ['--branch' as string]: branch?.color ?? course.color }} aria-label={node.title}>
      <header className="panel-header">
        <div className="panel-icon" aria-hidden>
          {node.icon}
        </div>
        <div className="panel-titles">
          <h1>{node.title}</h1>
          {branch && <span className="panel-branch">{branch.title}</span>}
        </div>
        <div className="panel-actions">
          <ThemeButton compact />
          <button className="icon-btn" title="Copy link" onClick={copyLink}>
            <Icon name={copied ? 'check' : 'link'} />
          </button>
          <button className="icon-btn" title="Close (Esc)" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
      </header>

      <div
        className="panel-scroll"
        ref={scrollRef}
        onMouseOver={(e) => showTip(e.target)}
        onMouseOut={hideTip}
        onFocus={(e) => showTip(e.target)}
        onBlur={hideTip}
        onClick={onClick}
        onScroll={() => setTip(null)}
      >
        {missing.length > 0 && !isDone && (
          <div className="note warn">
            <p>
              This builds on{' '}
              {missing.map((m, i) => (
                <span key={m.id}>
                  {i > 0 && ', '}
                  <a href={`node:${m.id}`}>{m.title}</a>
                </span>
              ))}
              . Feel free to read on, it might just make more sense afterwards.
            </p>
          </div>
        )}
        <article className="lesson">
          {visible.map((s, i) => {
            switch (s.kind) {
              case 'prose':
                return <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: s.html }} />;
              case 'code':
                return <CodeBlock key={i} code={s.code} lang={s.lang} title={s.title} />;
              case 'repl':
                return <Repl key={i} entries={s.entries} lang={s.lang} />;
              case 'compare':
                return <Compare key={i} lang={s.lang} code={s.code} title={s.title} />;
              case 'note':
                return <div key={i} className={`note ${s.tone}`} dangerouslySetInnerHTML={{ __html: s.html }} />;
              case 'exercise': {
                const idx = ++taskIndex;
                return (
                  <section key={`${node.id}-${i}`} className="task">
                    <div className="task-label">Try it</div>
                    <Exercise
                      spec={s.spec}
                      solved={isDone || solved.has(idx)}
                      onSolved={() => {
                        setSolved((prev) => new Set(prev).add(idx));
                        record({ type: 'exercise', course: course.id, node: node.id, index: idx });
                      }}
                      courseId={course.id}
                      nodeId={node.id}
                      index={idx}
                    />
                  </section>
                );
              }
              case 'quiz': {
                const idx = ++taskIndex;
                return (
                  <section key={`${node.id}-${i}`} className="task">
                    <div className="task-label">Quick check</div>
                    <Quiz
                      spec={s.spec}
                      solved={isDone || solved.has(idx)}
                      onSolved={(firstTry) => {
                        setSolved((prev) => new Set(prev).add(idx));
                        record({ type: 'quiz', course: course.id, node: node.id, index: idx, firstTry });
                      }}
                    />
                  </section>
                );
              }
            }
          })}
        </article>

        <footer className="panel-footer">
          {isDone ? (
            <button className="btn done" onClick={() => onUncomplete(node.id)} title="Mark as not done">
              <Icon name="check" size={18} /> Completed
            </button>
          ) : (
            <button className="btn primary" disabled={remaining > 0} onClick={() => onComplete(node.id)}>
              <Icon name="check" size={18} /> Complete
            </button>
          )}
          {remaining > 0 && (
            <span className="remaining">
              {remaining} {remaining === 1 ? 'exercise' : 'exercises'} left
            </span>
          )}
          {isDone && next.length > 0 && (
            <div className="next">
              <span className="muted">Up next</span>
              {next.slice(0, 3).map((n) => (
                <button key={n.id} className="btn next-btn" onClick={() => navigate(course.id, n.id)}>
                  {n.title} <Icon name="arrowRight" size={18} />
                </button>
              ))}
            </div>
          )}
        </footer>
      </div>

      {tip &&
        createPortal(
          <div
            className={tip.below ? 'tooltip below' : 'tooltip'}
            style={{
              left: Math.max(170, Math.min(window.innerWidth - 170, tip.x)),
              top: tip.y,
              ['--branch' as string]: branch?.color ?? course.color,
            }}
            role="tooltip"
          >
            <strong>{tip.entry.term}</strong>
            <span>{tip.entry.definition}</span>
            {tipLesson && (
              <em>
                {canHover() ? 'Click' : 'Tap again'} to open “{tipLesson.title}”
              </em>
            )}
          </div>,
          document.body,
        )}
    </aside>
  );
}
