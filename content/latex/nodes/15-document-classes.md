---
title: Document classes
icon: "🏛️"
branch: structure
requires: [packages, sections]
summary: article, report, book, memoir, KOMA-Script, and class options.
---
The [[document class]] decides the overall shape of a document: which headings exist, the margins, whether chapters start on a right-hand page, and so on.

| Class | For | Notes |
| --- | --- | --- |
| `article` | papers, short reports, notes | no `\chapter` |
| `report` | longer reports, theses | chapters, title page |
| `book` | books | chapters, two-sided, front and back matter |
| `letter` | letters | addresses, signature |
| `beamer` | slides | has its own lessons |
| `memoir` | books, highly configurable | many features built in |
| `scrartcl`, `scrreprt`, `scrbook` | KOMA-Script versions of the classics | European layout, very configurable |

Journals and universities often provide their own class, like `revtex4-2`, `IEEEtran` or `acmart`. Use theirs when you can.

## Class options

Options in square brackets change the class's defaults:

```latex title=thesis.tex
\documentclass[11pt,a4paper,twoside,openright]{report}
\begin{document}
\chapter{Introduction}
Chapters start on a new page in reports and books.
\end{document}
```

| Option | Effect |
| --- | --- |
| `10pt`, `11pt`, `12pt` | base font size |
| `a4paper`, `letterpaper` | paper size |
| `twoside`, `oneside` | different left and right margins for printing |
| `twocolumn` | two columns of text |
| `landscape` | turn the page |
| `draft` | marks overfull lines and skips images, for speed |

## Book matter

`book` has commands to split the book into parts with different page numbering:

```latex
\frontmatter  % roman page numbers, unnumbered chapters
\mainmatter   % arabic numbers from 1
\appendix     % chapters become Appendix A, B, ...
\backmatter
```

```exercise
goal: "Turn this into a two-column article with a 12pt base font."
code: |
  \documentclass{article}
checks:
  - match: '\\documentclass\[[^\]]*\btwocolumn\b[^\]]*\]\{article\}'
    message: Add the twocolumn option.
  - match: '\\documentclass\[[^\]]*\b12pt\b[^\]]*\]\{article\}'
    message: Add the 12pt option.
solution: |
  \documentclass[12pt,twocolumn]{article}
  \begin{document}
  Some text.
  \end{document}
```

```quiz
question: "You need \\chapter in your document. Which class should you not use?"
options:
  - "article"
  - "report"
  - "book"
answer: 0
explain: "article has no chapters. report and book do."
```
