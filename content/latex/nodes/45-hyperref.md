---
title: Links and PDF metadata
icon: "🌐"
branch: references
requires: [cross-references, packages]
summary: hyperref makes references, contents and URLs clickable.
---
Load `hyperref` and every cross-reference, citation, footnote mark and table-of-contents entry in your PDF becomes a clickable link. It also adds PDF bookmarks for the sidebar of PDF viewers.

```latex title=links.tex
\documentclass{article}
\usepackage{xcolor}
\usepackage{hyperref}
\hypersetup{
  colorlinks = true,     % coloured text instead of boxes
  linkcolor = blue!60!black,
  urlcolor = teal,
  pdftitle = {My report},
  pdfauthor = {Ada Lovelace},
}
\begin{document}
\tableofcontents
\section{Links}\label{sec:links}
Visit \url{https://ctan.org} or \href{https://www.latex-project.org}{the \LaTeX{} project}.
Email \href{mailto:ada@example.com}{Ada}.
Back to Section~\ref{sec:links}, or \hyperref[sec:links]{click this text}.
\end{document}
```

- `\url{...}` prints a URL in monospace and allows line breaks in it.
- `\href{url}{text}` makes any text a link.
- `\hyperref[label]{text}` links any text to a label.
- `pdftitle` and `pdfauthor` fill in the PDF's document properties.

## Load it late

`hyperref` changes many other packages' commands, so load it near the **end** of the preamble. A few packages must come after it, most notably `cleveref`.

By default, links get coloured boxes on screen that aren't printed. Most people prefer `colorlinks`, or `hidelinks` for no visible marking at all.

```compare javascript
// \href{https://example.com}{text}  ~  <a href="https://example.com">text</a>
```

```exercise
goal: "Turn the text `our website` into a link to `https://example.com` with `\\href`."
code: |
  \usepackage{hyperref}
  \begin{document}
  See our website for more.
  \end{document}
checks:
  - match: '\\href\{https://example\.com\}\{our website\}'
    message: "Write \\href{https://example.com}{our website}."
solution: |
  \usepackage{hyperref}
  \begin{document}
  See \href{https://example.com}{our website} for more.
  \end{document}
```

```quiz
question: "Where should you load hyperref?"
options:
  - "Near the end of the preamble, but before cleveref."
  - "Before \\documentclass."
  - "Inside the document body."
answer: 0
explain: "hyperref redefines commands of other packages, so it should come after most of them."
```
