---
title: Fonts and engines
icon: "🔤"
branch: packages
requires: [setup, text-styles]
summary: Font packages for pdfLaTeX, and fontspec with XeLaTeX or LuaLaTeX.
---
The default LaTeX font is Computer Modern, which Knuth designed. Changing it depends on the [[engine]] you use.

## With pdfLaTeX: font packages

pdfLaTeX can only use fonts that have been prepared for TeX. Many come as packages:

```latex
\usepackage[T1]{fontenc}   % proper accented characters and hyphenation
\usepackage{lmodern}       % Latin Modern, an improved Computer Modern
% or one of:
% \usepackage{libertinus}  % Libertinus, a book face
% \usepackage{tgpagella}   % TeX Gyre Pagella, like Palatino
% \usepackage{newtxtext,newtxmath}  % like Times, with matching maths
```

`\usepackage[T1]{fontenc}` is worth adding to every pdfLaTeX document. Without it, words with accents can't be hyphenated and copy-pasting from the PDF can break.

## With XeLaTeX or LuaLaTeX: fontspec

These engines read Unicode and use any OpenType or TrueType font installed on your system, through `fontspec`:

```latex title=fonts.tex
% !TeX program = lualatex
\documentclass{article}
\usepackage{fontspec}
\setmainfont{TeX Gyre Pagella}
\setsansfont{TeX Gyre Heros}
\setmonofont{Latin Modern Mono}[Scale=MatchLowercase]
\newfontfamily\headingfont{TeX Gyre Heros}[LetterSpace=5]

\begin{document}
Unicode works directly: café, Ελληνικά, “curly quotes”, → arrows.

{\headingfont SPACED HEADING} and \textsf{sans} and \texttt{mono}.
\end{document}
```

- `\setmainfont`, `\setsansfont` and `\setmonofont` set the three families.
- Options in square brackets turn on OpenType features: `Numbers=OldStyle`, `Ligatures=TeX`, `Scale=...`.
- `\newfontfamily` defines a command for an extra font.
- For maths, add `unicode-math` and `\setmathfont{Latin Modern Math}`.

## Which engine?

For new documents with custom fonts, LuaLaTeX is the usual recommendation. If a journal asks for pdfLaTeX, use font packages. The `% !TeX program = lualatex` comment at the top tells editors like TeXShop, TeXstudio and VS Code which engine to run.

```exercise
goal: "Load `fontspec` and set the main font to `Libertinus Serif`."
code: |
  \documentclass{article}
  \begin{document}
  Hello.
  \end{document}
checks:
  - match: '\\usepackage\{fontspec\}'
    message: "Add \\usepackage{fontspec}."
  - match: '\\setmainfont\{Libertinus Serif\}'
    message: "Add \\setmainfont{Libertinus Serif}."
  - match: 'fontspec\}[\s\S]*\\setmainfont[\s\S]*\\begin\{document\}'
    message: Load fontspec, then set the font, both in the preamble.
solution: |
  \documentclass{article}
  \usepackage{fontspec}
  \setmainfont{Libertinus Serif}
  \begin{document}
  Hello.
  \end{document}
```

```quiz
question: "Which engines can use fonts installed on your computer through fontspec?"
options:
  - "XeLaTeX and LuaLaTeX"
  - "Only pdfLaTeX"
  - "All three"
answer: 0
explain: "fontspec requires a Unicode engine. pdfLaTeX uses font packages instead."
```
