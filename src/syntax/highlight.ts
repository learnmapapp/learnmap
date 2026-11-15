import { syntaxFor, type SyntaxDef, type TokenType } from './languages';

export interface Token {
  type: TokenType;
  text: string;
}

const OPERATORS = /(?:==|!=|<=|>=|&&|\|\||->|=>|\+\+|\/\/|::|\.\.|[-+*/%=<>!&|?^~@.:])/y;
const PUNCT = /[()[\]{};,]/y;
const NUMBER = /\d[\d_]*(?:\.\d+)?(?:[eE][-+]?\d+)?\w*/y;

function startsWithAt(code: string, i: number, s: string): boolean {
  return code.startsWith(s, i);
}

function readString(code: string, i: number, delim: string): number {
  let j = i + delim.length;
  while (j < code.length) {
    if (code[j] === '\\' && delim.length === 1) {
      j += 2;
      continue;
    }
    if (startsWithAt(code, j, delim)) return j + delim.length;
    if (delim.length === 1 && delim !== '`' && code[j] === '\n') return j;
    j++;
  }
  return j;
}

/** A deliberately tiny, forgiving tokenizer – good enough for teaching snippets. */
export function tokenize(code: string, lang: string): Token[] {
  const def: SyntaxDef | undefined = syntaxFor(lang);
  if (!def) return [{ type: 'plain', text: code }];
  const tokens: Token[] = [];
  const push = (type: TokenType, text: string) => {
    const prev = tokens[tokens.length - 1];
    if (prev && prev.type === type) prev.text += text;
    else tokens.push({ type, text });
  };
  const keywords = new Set(def.keywords);
  const constants = new Set(def.constants ?? []);
  const builtins = new Set(def.builtins ?? []);
  const identExtra = (def.identExtra ?? '').replace(/[-\\\]^]/g, '\\$&');
  const IDENT = new RegExp(`[A-Za-z_][A-Za-z0-9_${identExtra}]*`, 'y');
  const strings = [...(def.strings ?? [])].sort((a, b) => b.length - a.length);

  let i = 0;
  outer: while (i < code.length) {
    const ch = code[i];
    if (ch === ' ' || ch === '\t' || ch === '\n') {
      push('plain', ch);
      i++;
      continue;
    }
    for (const lc of def.lineComment ?? []) {
      if (startsWithAt(code, i, lc)) {
        const end = code.indexOf('\n', i);
        const stop = end === -1 ? code.length : end;
        push('comment', code.slice(i, stop));
        i = stop;
        continue outer;
      }
    }
    if (def.blockComment && startsWithAt(code, i, def.blockComment[0])) {
      const end = code.indexOf(def.blockComment[1], i + def.blockComment[0].length);
      const stop = end === -1 ? code.length : end + def.blockComment[1].length;
      push('comment', code.slice(i, stop));
      i = stop;
      continue;
    }
    for (const rule of def.extra ?? []) {
      rule.pattern.lastIndex = i;
      const m = rule.pattern.exec(code);
      if (m && m[0].length > 0) {
        push(rule.type, m[0]);
        i += m[0].length;
        continue outer;
      }
    }
    for (const d of strings) {
      if (startsWithAt(code, i, d)) {
        const end = readString(code, i, d);
        push('string', code.slice(i, end));
        i = end;
        continue outer;
      }
    }
    NUMBER.lastIndex = i;
    let m = NUMBER.exec(code);
    if (m) {
      push('number', m[0]);
      i += m[0].length;
      continue;
    }
    IDENT.lastIndex = i;
    m = IDENT.exec(code);
    if (m) {
      const w = m[0];
      const next = code.slice(i + w.length, i + w.length + 32).replace(/^[ \t]*/, '').slice(0, 2);
      let type: TokenType = 'plain';
      if (keywords.has(w)) type = 'keyword';
      else if (constants.has(w)) type = 'constant';
      else if (builtins.has(w)) type = 'builtin';
      else if (/^[A-Z]/.test(w)) type = 'type';
      else if (next[0] === '(') type = 'function';
      else if (next[0] === '=' && next[1] !== '=' && next[1] !== '>') type = 'attr';
      tokens.push({ type, text: w });
      i += w.length;
      continue;
    }
    OPERATORS.lastIndex = i;
    m = OPERATORS.exec(code);
    if (m) {
      push('operator', m[0]);
      i += m[0].length;
      continue;
    }
    PUNCT.lastIndex = i;
    m = PUNCT.exec(code);
    push(m ? 'punct' : 'plain', ch);
    i++;
  }
  return tokens;
}
