---
title: Flowcharts and diagrams
icon: "🔀"
branch: tikz
requires: [tikz-positioning]
summary: Shapes, arrow tips and edge labels for complete diagrams.
---
With nodes, styles and positioning you can build complete diagrams. Here's a classic flowchart:

```latex
\usetikzlibrary{positioning, shapes.geometric, arrows.meta}

\begin{tikzpicture}[
  node distance = 8mm and 12mm,
  base/.style = {draw, thick, minimum width=26mm, minimum height=9mm, align=center},
  start/.style = {base, rounded corners=4.5mm, fill=green!15},
  process/.style = {base, fill=blue!10},
  decision/.style = {base, diamond, aspect=2.4, fill=orange!20, minimum width=20mm},
  line/.style = {-Stealth, thick},
]
  \node[start] (begin) {Start};
  \node[process, below=of begin] (read) {Read the\\error};
  \node[decision, below=of read] (fixed) {Fixed?};
  \node[process, right=of fixed] (search) {Search\\online};
  \node[start, below=of fixed] (done) {Done};

  \draw[line] (begin) -- (read);
  \draw[line] (read) -- (fixed);
  \draw[line] (fixed) -- node[right] {yes} (done);
  \draw[line] (fixed) -- node[above] {no} (search);
  \draw[line] (search) |- (read);
\end{tikzpicture}
```

## What to notice

- `align=center` lets you break node text with `\\`.
- `diamond` comes from `shapes.geometric`. `aspect` makes it wider than tall.
- A `node` written in the **middle** of a path (`-- node[right] {yes} (done)`) labels that segment.
- Styles build on each other: `start` and `process` both start from `base`.

## Edges

The `edge` operation draws a line from the current node without moving to the target, which is handy for many lines from one node:

```latex
\begin{tikzpicture}
  \node[draw, circle] (hub) {hub};
  \foreach \a in {0, 72, 144, 216, 288}
    \node[draw, circle, fill=gray!20] (n\a) at (\a:2) {};
  \path[->] (hub) edge (n0) edge (n72) edge (n144) edge (n216) edge (n288);
\end{tikzpicture}
```

(You'll learn `\foreach` in the next lesson.)

```tip
For graph-like diagrams of commutative maths, look at tikz-cd. For circuits, circuitikz. For UML, tikz-uml.
```

```exercise
goal: "Label the arrow from `a` to `b` with the text `next`, placed above the line."
code: |
  \begin{tikzpicture}
    \node[draw] (a) {A};
    \node[draw] (b) at (3,0) {B};
    \draw[->] (a) -- (b);
  \end{tikzpicture}
checks:
  - match: '\\draw\[->\]\s*\(a\)\s*--\s*node\[above\]\s*\{next\}\s*\(b\)\s*;'
    message: "Write \\draw[->] (a) -- node[above] {next} (b);"
solution: |
  \begin{tikzpicture}
    \node[draw] (a) {A};
    \node[draw] (b) at (3,0) {B};
    \draw[->] (a) -- node[above] {next} (b);
  \end{tikzpicture}
```

```quiz
question: "How do you allow a line break inside a node's text?"
options:
  - "Give the node align=center (or a text width) and use \\\\"
  - "Press Enter in the text"
  - "Line breaks are impossible in nodes"
answer: 0
explain: "Nodes are a single line unless you set align or text width."
```
