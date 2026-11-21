---
title: Title, author and abstract
icon: "🎩"
branch: structure
requires: [document-classes]
summary: \title, \author, \date, \maketitle and the abstract environment.
---
Set the title information in the preamble, then print it with `\maketitle`:

```latex title=paper.tex
\documentclass{article}
\title{On the Typesetting of Ducks}
\author{Ada Lovelace \and Charles Babbage\thanks{Thanks to the ducks.}}
\date{\today}

\begin{document}
\maketitle

\begin{abstract}
We show that ducks can be typeset beautifully.
\end{abstract}

\section{Introduction}
Quack.
\end{document}
```

- Separate several authors with `\and`.
- `\thanks{...}` adds a footnote to an author or the title, for affiliations and funding.
- `\date{}` with empty braces removes the date. Without `\date`, LaTeX prints today's date.
- Use `\\` inside `\author` to put an affiliation on the next line.

The `abstract` environment exists in `article` and `report`, but not in `book`.

## A custom title page

`\maketitle` gives a standard look. For a thesis or a report cover, design your own page with the `titlepage` environment, which has no page number:

```latex
\begin{titlepage}
  \centering
  \vspace*{4cm}
  {\Huge\bfseries My Thesis\par}
  \vspace{1cm}
  {\Large Ada Lovelace\par}
  \vfill
  University of Somewhere, \the\year
\end{titlepage}
```

`\vfill` pushes the last line to the bottom of the page.

```exercise
goal: "Set the author to `Grace Hopper`, and print the title block at the start of the document."
code: |
  \documentclass{article}
  \title{Compilers}
  \begin{document}
  Hello.
  \end{document}
checks:
  - match: '\\author\{Grace Hopper\}'
    message: "Add \\author{Grace Hopper} in the preamble."
  - match: '\\begin\{document\}\s*\\maketitle'
    message: "Put \\maketitle right after \\begin{document}."
  - match: '\\author[\s\S]*\\begin\{document\}'
    message: Put \author before \begin{document}.
solution: |
  \documentclass{article}
  \title{Compilers}
  \author{Grace Hopper}
  \begin{document}
  \maketitle
  Hello.
  \end{document}
```

```quiz
question: "How do you list two authors?"
options:
  - "\\author{Ada \\and Grace}"
  - "\\author{Ada} \\author{Grace}"
  - "\\author{Ada, Grace}[2]"
answer: 0
explain: "\\and separates authors so they're set side by side. A second \\author would replace the first."
```
