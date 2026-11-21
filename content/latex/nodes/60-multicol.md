---
title: Columns
icon: "📰"
branch: packages
requires: [document-classes]
summary: The multicols environment for balanced columns anywhere.
---
The `twocolumn` class option sets the whole document in two columns. For a section in columns, or more than two, use `multicol`:

```latex
\usepackage{multicol}

\section{News}
\begin{multicols}{3}
  This text flows through three columns. When the environment ends,
  the columns are balanced, so they end at about the same height.
  Lots more text would go here, and LaTeX moves it from one column
  to the next by itself.
\end{multicols}

Back to one column.
```

- Text flows from one column to the next and the last columns are balanced.
- `\columnbreak` forces a break to the next column.
- `multicols*` doesn't balance: the columns fill one after another.
- `\setlength{\columnsep}{1cm}` sets the gap, and `\setlength{\columnseprule}{0.4pt}` draws a line between columns.

## A heading across all columns

The optional argument is set across the full width, above the columns:

```latex
\begin{multicols}{2}[\section{Glossary}]
  \textbf{Box:} a rectangle. \textbf{Glue:} stretchy space.
\end{multicols}
```

## Floats

Normal floats don't work inside `multicols`. Use `figure*` with the class option `twocolumn`, or put figures before or after the columns. Inside the columns, a non-floating image with `\captionof{figure}{...}` from the `caption` package works.

```exercise
goal: "Put the list in two columns with `multicols`."
code: |
  \usepackage{multicol}
  \begin{document}
  \begin{itemize}
    \item Apples \item Pears \item Plums \item Figs
  \end{itemize}
  \end{document}
checks:
  - match: '\\begin\{multicols\}\{2\}\s*\\begin\{itemize\}'
    message: "Put \\begin{multicols}{2} before the list."
  - match: '\\end\{itemize\}\s*\\end\{multicols\}'
    message: "Close with \\end{multicols} after the list."
solution: |
  \usepackage{multicol}
  \begin{document}
  \begin{multicols}{2}
  \begin{itemize}
    \item Apples \item Pears \item Plums \item Figs
  \end{itemize}
  \end{multicols}
  \end{document}
```

```quiz
question: "What's the difference between multicols and multicols*?"
options:
  - "multicols balances the column heights at the end; multicols* doesn't."
  - "multicols* has a line between columns."
  - "multicols* is for three or more columns."
answer: 0
explain: "The starred version fills each column before starting the next one."
```
