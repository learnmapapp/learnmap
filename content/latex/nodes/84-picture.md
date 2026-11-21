---
title: The picture environment
icon: "🖼️"
branch: macros
requires: [lengths, boxes]
summary: Absolute positioning with \put and \unitlength.
---
Before TikZ, LaTeX had the `picture` environment. It's still built in, and it's perfect for one thing: putting things at exact coordinates.

```latex
\setlength{\unitlength}{1mm}
\begin{picture}(60,30)
  \put(0,0){\framebox(60,30){}}           % the outline
  \put(5,20){Top left-ish}
  \put(30,5){\circle{6}}
  \put(40,10){\vector(1,1){10}}
  \put(5,5){\line(1,0){20}}
  \put(45,22){\includegraphics[width=10mm]{logo}}
\end{picture}
```

- `\begin{picture}(width,height)` reserves that much space, measured in `\unitlength`.
- `\put(x,y){thing}` places the thing's **lower-left corner** (its reference point) at (x, y).
- The origin (0,0) is the **bottom-left**, and y goes up.
- Coordinates are plain numbers. Since 2020 they may also be calculations, like `\put(\numexpr 10+5\relax, 0)`, and lengths.

## Laying out in PDF units

Set `\setlength{\unitlength}{1bp}` and every coordinate is a PDF point. A picture of `(555,740)` is then exactly a 555 × 740 bp page.

## From top-left coordinates

Most design tools measure from the **top-left** corner, with y going down. To place a box of height h at top-left position (x, y) on a page of height H, its lower-left corner is at H − y − h:

```latex
\setlength{\unitlength}{1bp}
\newcommand{\Place}[4]{% x, y from the top, height, content
  \put(#1,\numexpr 200-#2-#3\relax){#4}%
}
\begin{picture}(300,200)
  \Place{10}{10}{20}{\rule{50bp}{20bp}}    % 10bp from the top
  \Place{10}{170}{20}{\rule{50bp}{20bp}}   % at the bottom
\end{picture}
```

## Things drawn later are on top

Each `\put` is drawn in order, so later items cover earlier ones. Start with the background, then add layers.

```exercise
goal: "Inside the picture, place the text `Hi` at `(10,20)` with `\\put`."
code: |
  \setlength{\unitlength}{1mm}
  \begin{document}
  \begin{picture}(40,30)
  \end{picture}
  \end{document}
checks:
  - match: '\\put\(10,\s*20\)\{Hi\}'
    message: "Add \\put(10,20){Hi}."
solution: |
  \setlength{\unitlength}{1mm}
  \begin{document}
  \begin{picture}(40,30)
    \put(10,20){Hi}
  \end{picture}
  \end{document}
```

```quiz
question: "Where is (0,0) in a picture environment?"
options:
  - "The bottom-left corner"
  - "The top-left corner"
  - "The centre"
answer: 0
explain: "Like maths and PDF, y goes up from the bottom-left."
```
