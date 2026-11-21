---
title: Font sizes
icon: "🔠"
branch: basics
requires: [text-styles]
summary: From \tiny to \Huge, relative to the document's base size.
---
LaTeX has ten size declarations. They're all relative to the base font size of the document, so a whole document scales together:

```latex
{\tiny tiny} {\scriptsize scriptsize} {\footnotesize footnotesize}
{\small small} {\normalsize normalsize} {\large large}
{\Large Large} {\LARGE LARGE} {\huge huge} {\Huge Huge}
```

These are declarations, so wrap them in braces or an environment to limit their effect.

## The base size

The base size is set with a class option. `article` supports `10pt` (the default), `11pt` and `12pt`:

```latex title=report.tex
\documentclass[12pt]{article}
\begin{document}
\section{Results}
Everything, including headings and footnotes, is a bit larger.
\end{document}
```

## Exact sizes

When you need a specific size, use `\fontsize{size}{line spacing}\selectfont`:

```latex
{\fontsize{30}{36}\selectfont Poster title}
```

The second number is the distance between baselines. About 1.2 times the font size is a good rule.

```warn
Size commands end paragraphs badly if you close the group too early. Put the blank line (or \par) inside the braces: {\large Some text.\par}
```

```exercise
goal: "Make `Welcome` print in `\\Large`, using a group so only that word changes."
code: |
  Welcome to the course.
checks:
  - match: '\{\s*\\Large\s+Welcome\s*\}'
    message: "Write {\\Large Welcome}."
solution: |
  {\Large Welcome} to the course.
```

```quiz
question: "What does `\\documentclass[11pt]{article}` change?"
options:
  - "The base size that every other size is relative to."
  - "Only the size of headings."
  - "The paper size."
answer: 0
explain: "The class option sets the normal size; \\small, \\large and friends scale from it."
```
