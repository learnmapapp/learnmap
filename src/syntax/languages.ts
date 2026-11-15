/**
 * Minimal syntax definitions for the tiny built-in highlighter. Adding a new
 * course language usually means adding one entry here.
 */
export interface SyntaxDef {
  keywords: string[];
  constants?: string[];
  builtins?: string[];
  lineComment?: string[];
  blockComment?: [string, string];
  /** String delimiters; multi-char delimiters (e.g. "''" or '"""') are allowed. */
  strings?: string[];
  /** Extra token rules tried first, e.g. Elixir atoms. Must use the sticky (y) flag. */
  extra?: { pattern: RegExp; type: TokenType }[];
  /** Identifier characters beyond [A-Za-z0-9_]. */
  identExtra?: string;
}

export type TokenType =
  | 'plain'
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'constant'
  | 'builtin'
  | 'type'
  | 'function'
  | 'operator'
  | 'punct'
  | 'attr';

const words = (s: string) => s.split(/\s+/).filter(Boolean);

export const SYNTAX: Record<string, SyntaxDef> = {
  nix: {
    keywords: words('let in with rec inherit if then else assert import or'),
    constants: words('true false null'),
    builtins: words('builtins map toString derivation throw abort fetchurl fetchTarball'),
    lineComment: ['#'],
    blockComment: ['/*', '*/'],
    strings: ["''", '"'],
    identExtra: "-'",
    extra: [
      { pattern: /\.{0,2}\/[\w./-]+|<[\w./-]+>/y, type: 'string' },
      { pattern: /\$\{|\}/y, type: 'punct' },
    ],
  },
  rust: {
    keywords: words(
      'as async await break const continue crate dyn else enum extern fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait type unsafe use where while',
    ),
    constants: words('true false None Some Ok Err'),
    builtins: words('println print format vec panic assert assert_eq todo unimplemented matches'),
    lineComment: ['//'],
    blockComment: ['/*', '*/'],
    strings: ['"'],
    extra: [
      { pattern: /'[a-z_]\w*(?!')/y, type: 'attr' },
      { pattern: /'(?:\\.|[^\\'])'/y, type: 'string' },
      { pattern: /#!?\[[^\]]*\]/y, type: 'attr' },
    ],
  },
  elixir: {
    keywords: words('def defp defmodule do end fn case cond with when if else unless import alias use require receive after try rescue raise quote unquote and or not in'),
    constants: words('true false nil'),
    builtins: words('IO Enum List Map String Kernel spawn send self'),
    lineComment: ['#'],
    strings: ['"""', '"'],
    identExtra: '?!',
    extra: [
      { pattern: /:[a-zA-Z_]\w*[?!]?/y, type: 'constant' },
      { pattern: /[a-z_]\w*:(?!:)/y, type: 'constant' },
      { pattern: /@\w+/y, type: 'attr' },
      { pattern: /\|>/y, type: 'keyword' },
    ],
  },
  python: {
    keywords: words('def return if elif else for while in not and or is import from as class with lambda yield try except finally raise pass break continue global nonlocal async await match case'),
    constants: words('True False None'),
    builtins: words('print len range str int float list dict set tuple map filter sorted sum min max open isinstance enumerate zip'),
    lineComment: ['#'],
    strings: ['"""', "'''", '"', "'"],
    extra: [{ pattern: /@\w+/y, type: 'attr' }],
  },
  javascript: {
    keywords: words('const let var function return if else for while do of in new class extends import export from default async await yield try catch finally throw switch case break continue typeof instanceof this'),
    constants: words('true false null undefined NaN'),
    builtins: words('console Object Array Math JSON Promise Map Set String Number'),
    lineComment: ['//'],
    blockComment: ['/*', '*/'],
    strings: ['"', "'", '`'],
  },
  java: {
    keywords: words('public private protected static final class interface enum extends implements new return if else for while do switch case break continue try catch finally throw throws import package void var record this super instanceof default'),
    constants: words('true false null'),
    builtins: words('System String Integer List Map Set Optional Math'),
    lineComment: ['//'],
    blockComment: ['/*', '*/'],
    strings: ['"""', '"', "'"],
    extra: [{ pattern: /@\w+/y, type: 'attr' }],
  },
  kotlin: {
    keywords: words('val var fun return if else when for while do in is as class data object interface sealed enum open override private public internal import package this super null try catch finally throw by'),
    constants: words('true false null'),
    builtins: words('println listOf mapOf setOf mutableListOf require check also let apply run'),
    lineComment: ['//'],
    blockComment: ['/*', '*/'],
    strings: ['"""', '"', "'"],
    extra: [{ pattern: /@\w+/y, type: 'attr' }],
  },
  go: {
    keywords: words('func return if else for range switch case default break continue var const type struct interface map chan go defer select package import'),
    constants: words('true false nil iota'),
    builtins: words('fmt len cap append make new panic recover error string int bool'),
    lineComment: ['//'],
    blockComment: ['/*', '*/'],
    strings: ['"', '`', "'"],
  },
  shell: {
    keywords: words('if then else fi for do done case esac in export'),
    builtins: words('nix cargo mix iex echo cd sudo git'),
    lineComment: ['#'],
    strings: ['"', "'"],
    extra: [{ pattern: /\$ /y, type: 'operator' }],
    identExtra: '-',
  },
};

SYNTAX.typescript = {
  ...SYNTAX.javascript,
  keywords: [...SYNTAX.javascript.keywords, ...words('type interface declare namespace abstract implements public private protected readonly override keyof typeof infer extends is asserts satisfies as unknown never any void string number boolean symbol bigint unique constructor get set accessor')],
  builtins: [...(SYNTAX.javascript.builtins ?? []), ...words('Array ReadonlyArray Partial Required Readonly Pick Omit Record Exclude Extract NonNullable Parameters ReturnType Awaited')],
};

const reactBuiltins = words('useState useReducer useContext createContext useRef useEffect useLayoutEffect useId useMemo useCallback useTransition useDeferredValue useActionState useOptimistic useFormStatus memo lazy Suspense StrictMode Component createRoot createPortal');
const jsxTags: SyntaxDef['extra'] = [{ pattern: /<\/?[A-Za-z][\w.-]*/y, type: 'type' }];
SYNTAX.jsx = {
  ...SYNTAX.javascript,
  builtins: [...(SYNTAX.javascript.builtins ?? []), ...reactBuiltins],
  extra: jsxTags,
};
SYNTAX.tsx = {
  ...SYNTAX.typescript,
  builtins: [...(SYNTAX.typescript.builtins ?? []), ...reactBuiltins],
  extra: jsxTags,
};
SYNTAX.ts = SYNTAX.typescript;
SYNTAX.json = {
  keywords: [],
  constants: words('true false null'),
  strings: ['"'],
};
SYNTAX.js = SYNTAX.javascript;
SYNTAX.sh = SYNTAX.shell;
SYNTAX.bash = SYNTAX.shell;
SYNTAX.toml = {
  keywords: [],
  constants: words('true false'),
  lineComment: ['#'],
  strings: ['"', "'"],
  extra: [{ pattern: /\[[^\]\n]*\]/y, type: 'type' }],
  identExtra: '-',
};

export function syntaxFor(lang: string): SyntaxDef | undefined {
  return SYNTAX[lang.toLowerCase()];
}
