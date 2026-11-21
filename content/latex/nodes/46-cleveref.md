---
title: Smart references
icon: "🧠"
branch: references
requires: [hyperref]
summary: cleveref adds the word Figure, Section or Equation for you.
---
With plain `\ref`, you type the word yourself: `Figure~\ref{fig:a}`. The `cleveref` package knows what kind of thing each label is, so `\cref` adds the right name:

```latex title=cref.tex
\documentclass{article}
\usepackage{amsmath}
\usepackage{hyperref}
\usepackage[capitalise, noabbrev]{cleveref}  % after hyperref!
\begin{document}
\section{Intro}\label{sec:intro}
\begin{equation}\label{eq:one} x = 1 \end{equation}
\begin{equation}\label{eq:two} y = 2 \end{equation}

As \cref{sec:intro} explains, see \cref{eq:one,eq:two}.
\Cref{eq:one} starts a sentence.
\end{document}
```

This prints "As Section 1 explains, see Equations (1) and (2)."

- `\cref{a,b,c}` handles several labels, grouping and ranging them: "Figures 1 to 3".
- `\Cref` is capitalised, for the start of a sentence.
- `\crefrange{a}{b}` gives a range, and `\cpageref` refers to pages.

## Options

- `capitalise` writes "Figure 1" instead of "fig. 1" everywhere.
- `noabbrev` writes "Equation" instead of "eq.".
- `nameinlink` makes the word part of the link.

You can change the names:

```latex
\crefname{lemma}{lemma}{lemmas}
\Crefname{lemma}{Lemma}{Lemmas}
```

```warn
cleveref must be loaded after hyperref, and after amsmath. It's one of the few packages that comes last.
```

```exercise
goal: "Replace the hand-written `Figure~\\ref` with `\\cref`."
code: |
  As Figure~\ref{fig:plot} shows, it works.
checks:
  - match: 'As \\cref\{fig:plot\} shows'
    message: "Write As \\cref{fig:plot} shows."
  - notMatch: 'Figure~'
    message: Remove the word Figure; cleveref adds it.
solution: |
  As \cref{fig:plot} shows, it works.
```

```quiz
question: "What does `\\cref{fig:a,fig:b}` print?"
options:
  - "Figures 1 and 2 (or fig. 1 and 2, depending on options)"
  - "1, 2"
  - "An error, it takes only one label"
answer: 0
explain: "cleveref joins several references of the same kind and adds the plural name."
```
