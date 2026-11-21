---
title: Lengths and units
icon: "📏"
branch: macros
requires: [spacing, newcommand]
summary: TeX units (pt vs bp), length registers, and calculating with \dimexpr and \numexpr.
---
A [[length]] is a size: a margin, a gap, an image width. TeX knows many units:

| Unit | Size |
| --- | --- |
| `pt` | TeX point, 1/72.27 inch |
| `bp` | "big point", 1/72 inch: the point used by PDF and PostScript |
| `mm`, `cm`, `in` | as expected |
| `em`, `ex` | width of an M, height of an x, in the current font |
| `sp` | scaled point, 1/65536 pt, TeX's smallest unit |

The difference between `pt` and `bp` is tiny (0.4%), but PDF coordinates are in `bp`. If you lay things out to match a PDF page exactly, use `bp`.

## Length variables

LaTeX has length registers like `\textwidth`, `\parindent` and `\baselineskip`. You can change them and make your own:

```latex
\setlength{\parindent}{0pt}        % no indentation of paragraphs
\newlength{\gap}
\setlength{\gap}{1.5em}
\addtolength{\gap}{2pt}

Before\hspace{\gap}after. Half the text width: \rule{0.5\textwidth}{1pt}
```

A number in front multiplies: `0.5\textwidth`, `2\gap`, `-\parindent`.

## Calculating

`\dimexpr ... \relax` calculates with lengths, and `\numexpr ... \relax` with whole numbers. They're built into the engine:

```latex
\rule{\dimexpr\textwidth-2cm\relax}{1pt}

\the\numexpr 740 - 178 - 194\relax  % prints 368
\number\numexpr 3*4+1\relax          % prints 13
```

- `\relax` marks the end of the expression. Always add it.
- `\the` and `\number` turn a value into printed digits. That's how you get a computed number into text, or into code like a PDF instruction.
- `\numexpr` rounds divisions: `\numexpr 7/2\relax` is 4.
- `\dimexpr` can multiply or divide by a number, but not by another length: `\dimexpr 2\gap/3\relax`.

LaTeX also offers `\setlength{\x}{\widthof{text}}` with the `calc` package, but `\dimexpr` works everywhere.

## The picture unit

`\setlength{\unitlength}{1bp}` sets the unit for the `picture` environment. After that, `\put(215,194)` means 215 bp right and 194 bp up. You'll use this in the picture lesson.

```compare javascript
// \dimexpr\textwidth-2cm\relax is like CSS calc(100% - 2cm)
```

```exercise
goal: "Print the result of `555 - 2*18` with `\\number\\numexpr ... \\relax`."
code: |
  \begin{document}
  The width is 555 - 2*18 bp.
  \end{document}
checks:
  - match: '\\number\\numexpr\s*555\s*-\s*2\s*\*\s*18\s*\\relax'
    message: "Write \\number\\numexpr 555 - 2*18\\relax."
solution: |
  \begin{document}
  The width is \number\numexpr 555 - 2*18\relax\ bp.
  \end{document}
```

```quiz
question: "How many bp are in an inch?"
options:
  - "72"
  - "72.27"
  - "100"
answer: 0
explain: "bp (big points) are PDF's unit, 72 per inch; TeX's pt is 72.27 per inch."
```
