---
title: Customising lists
icon: "🔣"
branch: packages
requires: [lists]
summary: enumitem for labels, spacing, inline lists and resuming numbering.
---
The `enumitem` package gives you control over every list:

```latex
\usepackage{enumitem}

\begin{enumerate}[label=(\alph*)]
  \item First
  \item Second
\end{enumerate}

\begin{enumerate}[label=Step \arabic*:, leftmargin=*]
  \item Mix.
  \item Bake.
\end{enumerate}

\begin{itemize}[noitemsep, label=--]
  \item Compact
  \item With dashes
\end{itemize}
```

## Labels

In `label=`, a starred counter stands for the item's number:

| Code | Labels |
| --- | --- |
| `\arabic*` | 1, 2, 3 |
| `\alph*` / `\Alph*` | a, b, c / A, B, C |
| `\roman*` / `\Roman*` | i, ii, iii / I, II, III |

## Spacing

- `noitemsep` removes the space between items; `nosep` removes all vertical space.
- `leftmargin=*` lines the labels up with the surrounding text.
- `topsep`, `itemsep`, `parsep` set individual gaps.

## Continuing a list

Interrupt a numbered list with some text and pick up the numbering again with `resume`:

```latex
\begin{enumerate}
  \item One
\end{enumerate}
Some text in between.
\begin{enumerate}[resume]
  \item Two
\end{enumerate}
```

## Global settings

Set the defaults for the whole document in the preamble:

```latex
\setlist{nosep}
\setlist[enumerate,1]{label=\arabic*.}
```

With the `inline` option, `enumitem` also adds `enumerate*` for lists inside a sentence: (a) like, (b) this.

```exercise
goal: "Number the list with capital Roman numerals followed by a dot, like `I.`, `II.`"
code: |
  \begin{enumerate}
    \item Introduction
    \item Conclusion
  \end{enumerate}
checks:
  - match: '\\begin\{enumerate\}\[\s*label\s*=\s*\\Roman\*\.\s*\]'
    message: "Use \\begin{enumerate}[label=\\Roman*.]."
solution: |
  \begin{enumerate}[label=\Roman*.]
    \item Introduction
    \item Conclusion
  \end{enumerate}
```

```quiz
question: "What does `[resume]` do on an enumerate?"
options:
  - "Continues numbering from the previous enumerate list."
  - "Restarts numbering at 1."
  - "Removes the numbers."
answer: 0
explain: "resume picks up where the last list at the same level stopped."
```
