---
title: Table of contents
icon: "📑"
branch: structure
requires: [sections]
summary: \tableofcontents, lists of figures and tables, and why LaTeX runs twice.
---
One command builds the table of contents from your headings:

```latex title=book.tex
\documentclass{report}
\begin{document}
\tableofcontents
\listoffigures
\listoftables

\chapter{Start}
\section{First steps}
\section[Second steps]{Second steps, with a very long title}
\end{document}
```

`\listoffigures` and `\listoftables` do the same for figure and table captions.

## Why it takes two runs

LaTeX reads your file once, from top to bottom. When it reaches `\tableofcontents`, it hasn't seen the headings yet. So it writes them to a `.toc` file during the run, and reads that file at the start of the **next** run. The first time you compile, the contents are empty. Compile again and they appear.

Tools like `latexmk` (see its lesson) rerun LaTeX automatically until everything is stable.

## Controlling the contents

- The optional argument of `\section[short]{long}` is used in the contents and page headers.
- `\setcounter{tocdepth}{1}` shows only sections, not subsections.
- To add an unnumbered section to the contents, add a line yourself:

```latex
\section*{Preface}
\addcontentsline{toc}{section}{Preface}
```

```exercise
goal: "Add a table of contents that only lists sections (depth 1)."
code: |
  \documentclass{article}
  \begin{document}
  \section{One}
  \subsection{One point one}
  \end{document}
checks:
  - match: '\\setcounter\{tocdepth\}\{1\}'
    message: "Add \\setcounter{tocdepth}{1}."
  - match: '\\tableofcontents'
    message: "Add \\tableofcontents."
  - match: '\\tableofcontents[\s\S]*\\section\{One\}'
    message: Put the contents before the first section.
solution: |
  \documentclass{article}
  \setcounter{tocdepth}{1}
  \begin{document}
  \tableofcontents
  \section{One}
  \subsection{One point one}
  \end{document}
```

```quiz
question: "Your table of contents is empty after compiling once. Why?"
options:
  - "LaTeX writes the headings to a .toc file and reads it on the next run."
  - "You need a package for a table of contents."
  - "Only chapters appear in it."
answer: 0
explain: "Compile again (or use latexmk) and the contents will appear."
```
