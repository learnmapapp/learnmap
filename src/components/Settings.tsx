import { useEffect, useState } from 'react';
import type { Course } from '../types';
import { COMPARE_LANGS, NO_COMPARE } from '../compareLangs';
import { Icon, LangBadge } from './Icon';

interface Props {
  course: Course;
  compare: string | null;
  onCompare: (id: string) => void;
  onReplayIntro: () => void;
  onReset: () => void;
  onClose: () => void;
}

export function Settings({ course, compare, onCompare, onReplayIntro, onReset, onClose }: Props) {
  const langs = COMPARE_LANGS.filter((l) => course.comparisons.includes(l.id));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Settings">
        <header>
          <h2>Settings</h2>
          <button className="icon-btn" onClick={onClose} title="Close">
            <Icon name="close" />
          </button>
        </header>
        <section>
          <h3>Compare with</h3>
          <p className="muted">Lessons show a side-by-side snippet in this language.</p>
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
              <Icon name="sprout" size={16} /> None
            </button>
          </div>
        </section>
        <section>
          <h3>Guide</h3>
          <button className="btn" onClick={onReplayIntro}>
            <Icon name="sparkles" size={18} /> Replay the intro
          </button>
        </section>
        <section>
          <h3>Progress</h3>
          <ResetButton onReset={onReset} />
        </section>
      </div>
    </div>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  const [armed, setArmed] = useState(false);
  return armed ? (
    <div className="row">
      <span className="muted">Forget all completed lessons for this course?</span>
      <button className="btn danger" onClick={onReset}>
        Yes, reset
      </button>
      <button className="link-btn" onClick={() => setArmed(false)}>
        Cancel
      </button>
    </div>
  ) : (
    <button className="btn" onClick={() => setArmed(true)}>
      Reset progress
    </button>
  );
}
