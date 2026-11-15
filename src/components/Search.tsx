import { useEffect, useMemo, useRef, useState } from 'react';
import type { Course, LessonNode } from '../types';
import { plainText } from '../content/markdown';
import { Icon } from './Icon';

interface Hit {
  node: LessonNode;
  snippet: string;
  score: number;
}

function search(index: { node: LessonNode; text: string }[], q: string): Hit[] {
  const query = q.trim().toLowerCase();
  if (!query) return index.slice(0, 12).map(({ node }) => ({ node, snippet: node.summary, score: 0 }));
  const hits: Hit[] = [];
  for (const { node, text } of index) {
    const title = node.title.toLowerCase();
    const lower = text.toLowerCase();
    const inTitle = title.includes(query);
    const at = lower.indexOf(query);
    if (!inTitle && at === -1) continue;
    const start = Math.max(0, at - 40);
    const snippet = at === -1 ? node.summary : (start > 0 ? '…' : '') + text.slice(start, at + query.length + 70) + '…';
    hits.push({ node, snippet, score: (title.startsWith(query) ? 3 : 0) + (inTitle ? 2 : 0) + (at === -1 ? 0 : 1) });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 20);
}

function Mark({ text, q }: { text: string; q: string }) {
  const query = q.trim();
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export function Search({ course, onPick, onClose }: { course: Course; onPick: (id: string) => void; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(
    () => course.nodes.map((node) => ({ node, text: `${node.summary} ${plainText(node.body)}` })),
    [course],
  );
  const hits = useMemo(() => search(index, q), [index, q]);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => setActive(0), [q]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="search" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search lessons">
        <div className="search-input">
          <Icon name="search" />
          <input
            ref={inputRef}
            value={q}
            placeholder={`Search ${course.name} lessons…`}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(hits.length - 1, a + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === 'Enter' && hits[active]) onPick(hits[active].node.id);
              else if (e.key === 'Escape') onClose();
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="search-results">
          {hits.map((h, i) => (
            <li key={h.node.id}>
              <button className={i === active ? 'active' : ''} onMouseEnter={() => setActive(i)} onClick={() => onPick(h.node.id)}>
                <span
                  className="search-icon"
                  style={{ background: course.branches.find((b) => b.id === h.node.branch)?.color ?? course.color }}
                  aria-hidden
                />
                <span>
                  <strong>
                    <Mark text={h.node.title} q={q} />
                  </strong>
                  <small>
                    <Mark text={h.snippet} q={q} />
                  </small>
                </span>
              </button>
            </li>
          ))}
          {hits.length === 0 && <li className="muted search-empty">Nothing found. Try another word?</li>}
        </ul>
      </div>
    </div>
  );
}
