import { useState } from 'react';
import { renderInline, runChecks, type ExerciseSpec, type QuizSpec, type ReplEntry } from '../content/markdown';
import { compareLang } from '../compareLangs';
import { hasEditorHost, notifyHost } from '../host';
import { loadCode, saveCode } from '../progress';
import { CodeEditor, CodeLines, Highlighted } from './Code';
import { Icon, LangBadge } from './Icon';

export function Repl({ entries, lang }: { entries: ReplEntry[]; lang: string }) {
  return (
    <div className="repl">
      {entries.map((e, i) => (
        <div key={i} className="repl-entry">
          <div className="repl-in">
            <span className="repl-prompt">›</span>
            <pre>
              <Highlighted code={e.input} lang={lang} />
            </pre>
          </div>
          {e.output !== '' && (
            <div className={e.error ? 'repl-out repl-error' : 'repl-out'}>
              <span className="repl-prompt">{e.error ? '✕' : '→'}</span>
              <pre>{e.error ? e.output : <Highlighted code={e.output} lang={lang} />}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Compare({ lang, code, title }: { lang: string; code: string; title?: string }) {
  const meta = compareLang(lang);
  return (
    <figure className="compare" style={{ ['--lang-color' as string]: meta?.color ?? '#888' }}>
      <figcaption>
        {meta && <LangBadge short={meta.short} color={meta.color} />} {title ?? `In ${meta?.name ?? lang}`}
      </figcaption>
      <CodeLines code={code} lang={lang} />
    </figure>
  );
}

export function Exercise({
  spec,
  solved,
  onSolved,
  courseId,
  nodeId,
  index,
}: {
  spec: ExerciseSpec;
  solved: boolean;
  onSolved: () => void;
  courseId: string;
  nodeId: string;
  /** Position among the lesson's tasks; used to remember the learner's code. */
  index: number;
}) {
  const [code, setCodeState] = useState(() => loadCode(courseId, nodeId, index) ?? spec.code);
  const setCode = (v: string) => {
    setCodeState(v);
    saveCode(courseId, nodeId, index, v === spec.code ? null : v);
  };
  const [showHint, setShowHint] = useState(false);
  const result = runChecks(spec, code);
  const touched = code !== spec.code;
  const ok = result.ok && (touched || spec.checks.length === 0);

  const change = (v: string) => {
    setCode(v);
    if (!solved && runChecks(spec, v).ok) onSolved();
  };

  return (
    <div className={ok || solved ? 'exercise solved' : 'exercise'}>
      <div className="exercise-goal">
        <span className="exercise-badge" aria-hidden>
          <Icon name={ok || solved ? 'check' : 'target'} size={16} />
        </span>
        <span dangerouslySetInnerHTML={{ __html: spec.goalHtml }} />
      </div>
      <CodeEditor value={code} onChange={change} lang={spec.lang} label="Exercise code" />
      <div className={ok ? 'exercise-result ok' : touched ? 'exercise-result fail' : 'exercise-result'}>
        {ok ? (
          <>
            <span className="repl-prompt">→</span>
            <pre>{spec.output ? <Highlighted code={spec.output} lang={spec.lang} /> : 'Nice, that works!'}</pre>
          </>
        ) : solved && !touched ? (
          <>
            <Icon name="check" size={14} className="repl-prompt" />
            <span className="muted">Already solved. Feel free to keep experimenting.</span>
          </>
        ) : touched ? (
          <>
            <span className="repl-prompt">…</span>
            <span>{result.message}</span>
          </>
        ) : (
          <>
            <span className="repl-prompt">?</span>
            <span className="muted">Edit the code above. It's checked as you type.</span>
          </>
        )}
      </div>
      <div className="exercise-tools">
        {spec.hint && !ok && (
          <button className="link-btn" onClick={() => setShowHint((s) => !s)}>
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
        )}
        {touched && (
          <button className="link-btn" onClick={() => setCode(spec.code)}>
            Reset
          </button>
        )}
        {hasEditorHost() && (
          <button
            className="link-btn"
            onClick={() => notifyHost({ type: 'openInEditor', course: courseId, node: nodeId, lang: spec.lang, code })}
          >
            Open in editor <Icon name="external" size={14} />
          </button>
        )}
      </div>
      {showHint && !ok && (
        <p className="hint">
          <Icon name="bulb" size={16} /> <span dangerouslySetInnerHTML={{ __html: renderInline(spec.hint) }} />
        </p>
      )}
    </div>
  );
}

export function Quiz({ spec, solved, onSolved }: { spec: QuizSpec; solved: boolean; onSolved: (firstTry: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(solved ? spec.answer : null);
  const [missed, setMissed] = useState(false);
  const correct = picked === spec.answer;
  return (
    <div className={correct ? 'quiz solved' : 'quiz'}>
      <div className="exercise-goal">
        <span className="exercise-badge" aria-hidden>
          <Icon name={correct ? 'check' : 'help'} size={16} />
        </span>
        <span dangerouslySetInnerHTML={{ __html: spec.questionHtml }} />
      </div>
      <div className="quiz-options">
        {spec.options.map((o, i) => {
          const state = picked === i ? (i === spec.answer ? 'right' : 'wrong') : '';
          return (
            <button
              key={i}
              className={`quiz-option ${state}`}
              onClick={() => {
                setPicked(i);
                if (i !== spec.answer) setMissed(true);
                else if (!solved) onSolved(!missed);
              }}
              dangerouslySetInnerHTML={{ __html: o }}
            />
          );
        })}
      </div>
      {picked !== null && (
        <p className={correct ? 'quiz-explain ok' : 'quiz-explain'}>
          {correct ? 'Correct! ' : 'Not quite. '}
          {correct && <span dangerouslySetInnerHTML={{ __html: spec.explainHtml }} />}
          {!correct && 'Have another look and try again.'}
        </p>
      )}
    </div>
  );
}
