---
title: Indexes and glossaries
icon: "🔤"
branch: references
requires: [cross-references]
summary: Building an index with imakeidx, and a list of terms with glossaries.
---
Books often end with an **index**: an alphabetical list of terms and the pages they're on. Mark each term with `\index` where it's discussed:

```latex title=book.tex
\documentclass{book}
\usepackage{imakeidx}
\makeindex

\begin{document}
\chapter{Typesetting}
Knuth wrote \TeX\index{TeX} in 1978.
Fonts\index{fonts} matter.
Metafont\index{fonts!Metafont} draws them.
Ligatures\index{ligatures|see{fonts}} join letters.

\printindex
\end{document}
```

- `\index{fonts!Metafont}` makes "Metafont" a sub-entry under "fonts".
- `|see{fonts}` makes a cross-reference instead of a page number.
- `\index{Knuth@\textsc{Knuth}}` sorts by the part before `@` and prints the part after it.

The index is sorted by a separate program, `makeindex` or `xindy`. With `imakeidx`, LaTeX runs it automatically.

## Glossaries and acronyms

The `glossaries` package keeps a list of terms and acronyms. You define each term once:

```latex
\usepackage[acronym]{glossaries}
\makeglossaries
\newacronym{cpu}{CPU}{central processing unit}
\newglossaryentry{latex}{name={LaTeX}, description={A document preparation system}}
```

Then `\gls{cpu}` prints "central processing unit (CPU)" the first time and "CPU" after that, and `\printglossaries` prints the lists. A helper program, `makeglossaries`, sorts them.

```exercise
goal: "Add an index entry `Lovelace` right after the name, and print the index at the end."
code: |
  \usepackage{imakeidx}
  \makeindex
  \begin{document}
  Ada Lovelace wrote the first program.
  \end{document}
checks:
  - match: 'Lovelace\\index\{Lovelace\}'
    message: "Write Lovelace\\index{Lovelace}."
  - match: '\\printindex\s*\\end\{document\}'
    message: "Add \\printindex before \\end{document}."
solution: |
  \usepackage{imakeidx}
  \makeindex
  \begin{document}
  Ada Lovelace\index{Lovelace} wrote the first program.
  \printindex
  \end{document}
```

```quiz
question: "What does `\\index{animals!cats}` create?"
options:
  - "A sub-entry cats under the entry animals."
  - "Two separate entries."
  - "An entry that says animals!cats."
answer: 0
explain: "The ! separates levels of an index entry."
```
