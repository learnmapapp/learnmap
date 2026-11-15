import { useMemo, useRef, type KeyboardEvent } from 'react';
import { tokenize } from '../syntax/highlight';
import { Icon } from './Icon';

export function Highlighted({ code, lang }: { code: string; lang: string }) {
  const tokens = useMemo(() => tokenize(code, lang), [code, lang]);
  return (
    <>
      {tokens.map((t, i) =>
        t.type === 'plain' ? t.text : (
          <span key={i} className={`tok-${t.type}`}>
            {t.text}
          </span>
        ),
      )}
    </>
  );
}

export function CodeLines({ code, lang, numbered = true }: { code: string; lang: string; numbered?: boolean }) {
  const lines = code.split('\n');
  if (!numbered || lines.length === 1) {
    return (
      <pre className="code-body">
        <code>
          <Highlighted code={code} lang={lang} />
        </code>
      </pre>
    );
  }
  return (
    <div className="code-numbered">
      <pre className="code-gutter" aria-hidden>
        {lines.map((_, i) => i + 1).join('\n')}
      </pre>
      <pre className="code-body">
        <code>
          <Highlighted code={code} lang={lang} />
        </code>
      </pre>
    </div>
  );
}

export function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  return (
    <figure className="code-block">
      {title && (
        <figcaption className="code-title">
          <Icon name="file" size={14} className="code-file-icon" /> {title}
          <span className="code-lang">{lang}</span>
        </figcaption>
      )}
      <CodeLines code={code} lang={lang} />
    </figure>
  );
}

/**
 * A textarea layered over highlighted code. Both layers share font metrics and
 * wrap the same way, so the caret lines up with the coloured text.
 */
export function CodeEditor({
  value,
  onChange,
  lang,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: string;
  label: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Tab' || e.shiftKey) return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart, selectionEnd } = el;
    const next = value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd);
    onChange(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = selectionStart + 2;
    });
  };
  return (
    <div className="editor" onClick={() => ref.current?.focus()}>
      <pre className="editor-layer" aria-hidden>
        <Highlighted code={value} lang={lang} />
        {'\n'}
      </pre>
      <textarea
        ref={ref}
        className="editor-input"
        aria-label={label}
        value={value}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
