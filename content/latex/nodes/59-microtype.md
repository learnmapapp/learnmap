---
title: Microtypography
icon: "🔬"
branch: packages
requires: [fonts]
summary: microtype's tiny adjustments that make text look better.
---
Add one line to your preamble and your document will look better:

```latex
\usepackage{microtype}
```

It's hard to see in a single line, but over a whole page the text is more even, with fewer hyphenated words and fewer overfull lines.

## What it does

- **Character protrusion.** Punctuation and some letters stick out into the margin slightly, so the edge *looks* straighter. A full stop at the end of a line is visually smaller than a letter, so pushing it out a bit makes the margin look aligned.
- **Font expansion.** Letters can be stretched or shrunk by a tiny amount, about 2%, so LaTeX has more freedom to break lines well. This reduces large gaps between words.
- **Letter spacing** for small caps and all caps with `\textls`, and better kerning and tracking options.

## Options

```latex
\usepackage[
  protrusion=true,
  expansion=true,     % pdfLaTeX and LuaLaTeX; XeLaTeX only has protrusion
  tracking=true,
  final,              % keep it on even with the class option draft
]{microtype}

\textls[100]{SPACED CAPITALS}
```

Defaults are good; most people just load the package. Font expansion needs scalable fonts, so with pdfLaTeX load `lmodern` or another Type 1 font package as well.

```tip
microtype changes how lines are broken, so add it early. Adding it just before submitting can move your figures and page breaks around.
```

```exercise
goal: "Load `microtype` and use `\\textls` with a value of `80` to letter-space `CHAPTER ONE`."
code: |
  \usepackage{lmodern}
  \begin{document}
  CHAPTER ONE
  \end{document}
checks:
  - match: '\\usepackage(\[[^\]]*\])?\{microtype\}'
    message: "Add \\usepackage{microtype}."
  - match: '\\textls\[80\]\{CHAPTER ONE\}'
    message: "Write \\textls[80]{CHAPTER ONE}."
solution: |
  \usepackage{lmodern}
  \usepackage{microtype}
  \begin{document}
  \textls[80]{CHAPTER ONE}
  \end{document}
```

```quiz
question: "What is character protrusion?"
options:
  - "Letting punctuation hang slightly into the margin so the edge looks straighter."
  - "Making all letters bold."
  - "Adding space between paragraphs."
answer: 0
explain: "Small marks like . and - make the margin look ragged; protrusion compensates for that."
```
