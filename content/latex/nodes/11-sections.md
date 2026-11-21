---
title: Sections
icon: "🗂️"
branch: basics
requires: [paragraphs, commands]
summary: Headings at several levels, numbered automatically.
---
Structure your document with sectioning commands. LaTeX numbers them, formats them and keeps track of them for the table of contents:

```latex title=notes.tex
\documentclass{article}
\begin{document}
\section{Introduction}
Why this matters.

\subsection{Background}
What came before.

\subsubsection{Early work}
The first attempts.

\section{Method}
What we did.
\end{document}
```

This prints "1 Introduction", "1.1 Background", "1.1.1 Early work" and "2 Method".

## Levels

| Command | Level | Available in |
| --- | --- | --- |
| `\part` | -1 | all classes |
| `\chapter` | 0 | `book`, `report` |
| `\section` | 1 | all |
| `\subsection` | 2 | all |
| `\subsubsection` | 3 | all |
| `\paragraph` | 4 | all (a run-in heading) |

## Unnumbered sections

Add a star for a heading without a number. Starred sections also don't appear in the table of contents:

```latex
\section*{Acknowledgements}
```

Never number headings by hand. If you add a section in the middle, LaTeX renumbers everything, including references to them.

```compare javascript
// \section{...}       ~ <h2>
// \subsection{...}    ~ <h3>
// but LaTeX also numbers them and builds the contents for you.
```

```exercise
goal: "Add a `\\subsection` called `Results` under the Method section, and make `Thanks` an unnumbered section."
code: |
  \section{Method}
  We measured things.

  \section{Thanks}
  To everyone.
checks:
  - match: '\\subsection\{Results\}'
    message: "Add \\subsection{Results}."
  - match: '\\section\*\{Thanks\}'
    message: "Use \\section*{Thanks}."
solution: |
  \section{Method}
  We measured things.

  \subsection{Results}
  It worked.

  \section*{Thanks}
  To everyone.
```

```quiz
question: "What does `\\section*{Preface}` do differently?"
options:
  - "It has no number and isn't listed in the table of contents."
  - "It makes the heading bold."
  - "It starts a new chapter."
answer: 0
explain: "The star version skips numbering and the table of contents."
```
