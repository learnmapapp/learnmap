---
title: Special characters
icon: "＃"
branch: basics
requires: [commands]
summary: The ten characters LaTeX reserves, and how to print them.
---
A few characters mean something to LaTeX, so you can't just type them:

| Character | Meaning | To print it |
| --- | --- | --- |
| `\` | starts a command | `\textbackslash` |
| `{` `}` | group / argument | `\{` `\}` |
| `%` | comment | `\%` |
| `$` | maths | `\$` |
| `&` | column separator | `\&` |
| `#` | macro parameter | `\#` |
| `_` | subscript (maths) | `\_` |
| `^` | superscript (maths) | `\^{}` |
| `~` | non-breaking space | `\~{}` |

```latex
Prices rose 5\% to \$20 for R\&D.
File names like \texttt{my\_notes.tex} need escaped underscores.
Use \textbackslash{} for a backslash.
```

Forgetting this is the most common beginner error. An unescaped `%` silently hides the rest of the line, and an unescaped `_` or `&` stops the build with an error.

## Accents and Unicode

Modern LaTeX reads UTF-8 files, so you can type `café`, `naïve` or `Ærø` directly. You may also see the older commands, which still work everywhere:

```latex
caf\'e, na\"ive, \c{c}a va, Stra\ss e
```

```exercise
goal: "Fix the sentence so it compiles and prints `50% off & free shipping`."
code: |
  50% off & free shipping
checks:
  - match: '50\\% off'
    message: "Escape the percent sign: \\%."
  - match: '\\& free'
    message: "Escape the ampersand: \\&."
solution: |
  50\% off \& free shipping
```

```quiz
question: "What happens to `Total: 100% correct` without escaping?"
options:
  - "Everything after % is treated as a comment and disappears."
  - "It prints exactly as written."
  - "LaTeX converts it to a fraction."
answer: 0
explain: "% starts a comment, so ' correct' is dropped from the output."
```
