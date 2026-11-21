---
title: TikZ
icon: "✏️"
kind: hub
branch: tikz
requires: [colors, figures]
summary: Drawing diagrams with code, in the tikzpicture environment.
---
[[TikZ]] is LaTeX's most popular drawing package. You describe a picture with code, and it's drawn in the same fonts and colours as the rest of your document. It's used for diagrams, graphs, flowcharts, trees, circuits, posters and even whole page layouts.

```latex title=first-tikz.tex
\documentclass{article}
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}
  \draw (0,0) -- (2,0) -- (1,1.5) -- cycle;   % a triangle
  \draw[blue, thick] (3,0.75) circle (0.75);   % a circle
  \fill[orange] (5,0) rectangle (6.5,1.5);     % a filled square
  \node at (1,-0.4) {triangle};
\end{tikzpicture}
\end{document}
```

## How it works

- Everything goes inside a `tikzpicture` environment.
- Each instruction is a **path** that ends with a semicolon: `\draw`, `\fill`, `\filldraw` or `\node`.
- Coordinates like `(2,0)` are in centimetres by default. The y-axis points **up**.
- Options in square brackets change the look: colours, line widths, arrows, and much more.
- The picture is as big as what you draw, and it sits in the text like a big letter. Put it in a `figure` to give it a caption.

## Where to learn more

TikZ's manual is famously thorough: over 1,300 pages, with a tutorial at the start. Run `texdoc tikz`. The site texample.net has hundreds of examples.

In the next lessons you'll learn paths, nodes, styles, positioning, loops and calculations, and finally how to place drawings anywhere on the page.

```compare javascript
// Like drawing on an HTML canvas, but declarative and with LaTeX text:
ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(2, 0); ctx.stroke();
```

```compare python
# matplotlib draws plots; TikZ draws anything, in document fonts:
plt.plot([0, 2, 1, 0], [0, 0, 1.5, 0])
```

```exercise
goal: "Draw a line from `(0,0)` to `(3,2)` with `\\draw`."
code: |
  \begin{tikzpicture}
  \end{tikzpicture}
checks:
  - match: '\\draw[^;]*\(0,\s*0\)\s*--\s*\(3,\s*2\)\s*;'
    message: "Add \\draw (0,0) -- (3,2);"
solution: |
  \begin{tikzpicture}
    \draw (0,0) -- (3,2);
  \end{tikzpicture}
```

```quiz
question: "What does every TikZ path instruction end with?"
options:
  - "A semicolon"
  - "A full stop"
  - "\\end{path}"
answer: 0
explain: "Forgetting the ; is the most common TikZ error; the path keeps going into the next line."
```
