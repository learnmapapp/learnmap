---
title: Spacing
icon: "↕️"
branch: structure
requires: [paragraphs, page-layout]
summary: \vspace, \hspace, \hfill, line spacing and paragraph settings.
---
Usually LaTeX's spacing is right. When you do need to adjust it, use these commands instead of empty lines and `\\`.

## Space between things

```latex
Left \hspace{2cm} right.     % horizontal space
Left \hfill right.           % pushes "right" to the right margin

First paragraph.

\vspace{1cm}                 % vertical space
Second paragraph, 1 cm lower.

\bigskip  % also \medskip and \smallskip: standard vertical gaps
```

`\hfill` and `\vfill` are **stretchy**: they take up all the remaining space. Two `\hfill`s share it equally.

At the top of a page, LaTeX drops `\vspace`. Use the starred form `\vspace*{2cm}` to keep it, for example on a title page.

## Line spacing

For one-and-a-half or double spacing, which some universities require, use `setspace`:

```latex
\usepackage{setspace}
\onehalfspacing   % or \doublespacing, or \setstretch{1.25}
```

## Paragraph settings

Two lengths control paragraphs: `\parindent` is the indent of the first line, and `\parskip` is the extra space between paragraphs.

```latex
\setlength{\parindent}{0pt}   % no indentation
\setlength{\parskip}{6pt}     % space between paragraphs instead
```

Setting `\parindent` to `0pt` is common in posters and one-page layouts, where indented first lines would look odd. You'll learn all about lengths and units in a later lesson.

```exercise
goal: "Put `Signed:` on the left and `Date:` at the right margin of the same line, using `\\hfill`."
code: |
  Signed: Date:
checks:
  - match: 'Signed:\s*\\hfill\s*Date:'
    message: "Put \\hfill between Signed: and Date:."
solution: |
  Signed: \hfill Date:
```

```quiz
question: "Which command adds vertical space that is kept even at the top of a page?"
options:
  - "\\vspace*{2cm}"
  - "\\vspace{2cm}"
  - "\\hspace{2cm}"
answer: 0
explain: "The starred \\vspace* isn't removed at a page break."
```
