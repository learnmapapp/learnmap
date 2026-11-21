---
title: Headers and footers
icon: "🎗️"
branch: structure
requires: [page-layout]
summary: \pagestyle, page numbers and the fancyhdr package.
---
Every page has a **page style** that decides what goes in the header and footer:

| Style | Header | Footer |
| --- | --- | --- |
| `plain` | empty | page number (the `article` default) |
| `empty` | empty | empty |
| `headings` | section title and page number | empty |

```latex
\pagestyle{empty}       % no numbers on any page from now on
\thispagestyle{empty}   % only this page
```

`\pagestyle{empty}` is what you want for posters, certificates and artwork: a single page with nothing extra on it.

## Custom headers with fancyhdr

The `fancyhdr` package lets you fill the left, centre and right of the header and footer:

```latex title=fancy.tex
\documentclass{article}
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}                     % clear everything first
\fancyhead[L]{My report}
\fancyhead[R]{\leftmark}       % the current section
\fancyfoot[C]{Page \thepage}
\renewcommand{\headrulewidth}{0.4pt}

\begin{document}
\section{Introduction}
Text.
\end{document}
```

In two-sided documents, use `[LE,RO]` (left on even pages, right on odd pages) so the page number is always on the outside edge.

## Page numbers

`\thepage` is the current page number. Change its style with `\pagenumbering{roman}` (i, ii, iii) or `\pagenumbering{arabic}`, which also restarts the count at 1.

```exercise
goal: "Use `fancyhdr` to put `Draft` in the centre of the header and the page number on the right of the footer."
code: |
  \usepackage{fancyhdr}
  \pagestyle{fancy}
  \fancyhf{}
checks:
  - match: '\\fancyhead\[C\]\{Draft\}'
    message: "Add \\fancyhead[C]{Draft}."
  - match: '\\fancyfoot\[R\]\{\\thepage\}'
    message: "Add \\fancyfoot[R]{\\thepage}."
solution: |
  \usepackage{fancyhdr}
  \pagestyle{fancy}
  \fancyhf{}
  \fancyhead[C]{Draft}
  \fancyfoot[R]{\thepage}
```

```quiz
question: "Which page style prints nothing at all in the header and footer?"
options:
  - "empty"
  - "plain"
  - "headings"
answer: 0
explain: "plain still prints the page number; empty prints nothing."
```
