---
title: Page size and margins
icon: "📐"
branch: structure
requires: [packages]
summary: The geometry package, and changing the layout for one page.
---
LaTeX's default margins look wide, because shorter lines are easier to read. When you need a different layout, use the `geometry` package:

```latex title=layout.tex
\documentclass{article}
\usepackage[a4paper, margin=2.5cm]{geometry}
\begin{document}
A page with 2.5 cm margins on every side.
\end{document}
```

## Common options

```latex
\usepackage[
  a4paper,          % or letterpaper, a5paper, paperwidth=..., paperheight=...
  top=2cm, bottom=3cm,
  left=3cm, right=2cm,
  includefoot,      % count the footer as part of the body
  landscape,
]{geometry}
```

You can also give the size of the text block instead of the margins, with `textwidth=15cm` or `textheight=24cm`. Geometry calculates the rest.

## A custom page size

For posters, cards or artwork, set the paper size directly:

```latex
\usepackage[paperwidth=10cm, paperheight=15cm, margin=0pt]{geometry}
```

## Changing one page

`\newgeometry{...}` changes the layout from the next page on, and `\restoregeometry` changes it back. Use this for a title page or a wide table.

```tip
Add the showframe option while you work, to draw thin lines around the text area, header and margins.
```

```exercise
goal: "Use the `geometry` package for US letter paper with 1 inch margins."
code: |
  \documentclass{article}
  \begin{document}
  Hello.
  \end{document}
checks:
  - match: '\\usepackage\[[^\]]*letterpaper[^\]]*\]\{geometry\}'
    message: Load geometry with the letterpaper option.
  - match: '\\usepackage\[[^\]]*margin\s*=\s*1in[^\]]*\]\{geometry\}'
    message: Add margin=1in.
solution: |
  \documentclass{article}
  \usepackage[letterpaper, margin=1in]{geometry}
  \begin{document}
  Hello.
  \end{document}
```

```quiz
question: "How do you change the margins for just one page in the middle of a document?"
options:
  - "\\newgeometry{...} and then \\restoregeometry"
  - "Load geometry a second time"
  - "It isn't possible"
answer: 0
explain: "\\newgeometry starts a new page with the new layout; \\restoregeometry goes back."
```
