---
title: Cross-references
icon: "🔗"
branch: structure
requires: [sections]
summary: \label, \ref and \pageref, so numbers stay correct.
---
Never type "see Section 3" by hand. Give the section a [[label]] and refer to it:

```latex title=refs.tex
\documentclass{article}
\begin{document}
\section{Introduction}\label{sec:intro}
As we'll see in Section~\ref{sec:results} on page~\pageref{sec:results},
it works.

\section{Results}\label{sec:results}
Back to Section~\ref{sec:intro}.
\end{document}
```

- `\label{name}` remembers the number of the most recent numbered thing: a section, equation, figure, table, list item or footnote.
- `\ref{name}` prints that number.
- `\pageref{name}` prints the page it's on.

Like the table of contents, labels are stored in the `.aux` file, so references need a second run. Until then they show as **??**, and you get a warning like `Reference 'sec:results' undefined`.

## Naming labels

A common convention is a prefix for the kind of thing: `sec:`, `fig:`, `tab:`, `eq:`. It makes your source easier to read, and the `cleveref` package can print "Figure" or "Section" automatically.

```warn
For figures and tables, put \label after \caption. The caption is what creates the number, so a label before it would refer to the section instead.
```

```exercise
goal: "Label the Method section `sec:method`, and refer to it with `\\ref` instead of the hard-coded `2`."
code: |
  See Section 2.

  \section{Introduction}
  \section{Method}
checks:
  - match: '\\section\{Method\}\s*\\label\{sec:method\}'
    message: "Add \\label{sec:method} right after the Method heading."
  - match: 'Section~?\\ref\{sec:method\}'
    message: "Replace 2 with \\ref{sec:method}."
  - notMatch: 'Section 2'
    message: Remove the hard-coded number.
solution: |
  See Section~\ref{sec:method}.

  \section{Introduction}
  \section{Method}\label{sec:method}
```

```quiz
question: "A reference prints as ?? What is the most likely fix?"
options:
  - "Compile again, so LaTeX can read the labels from the .aux file."
  - "Install a references package."
  - "Put \\ref before \\label in the file."
answer: 0
explain: "On the first run, labels haven't been recorded yet. If ?? stays after a second run, check the label's spelling."
```
