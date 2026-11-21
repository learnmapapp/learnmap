---
title: Nodes
icon: "🔵"
branch: tikz
requires: [tikz-paths]
summary: Text in drawings, node shapes, names and connecting nodes.
---
A [[node]] puts text in a drawing, optionally with a shape around it. Give it a name in parentheses and you can draw lines between nodes:

```latex
\begin{tikzpicture}
  \node[draw, circle] (a) at (0,0) {A};
  \node[draw, rectangle, rounded corners, fill=blue!10] (b) at (3,0) {Box B};
  \node[draw, ellipse] (c) at (1.5,-2) {C};

  \draw[->] (a) -- (b);
  \draw[->] (b) -- (c);
  \draw[->, dashed] (c) -- (a);
\end{tikzpicture}
```

Lines between named nodes stop at the edge of the shape, not at the centre.

## Node options

| Option | Effect |
| --- | --- |
| `draw`, `fill=...` | draw the outline, fill the inside |
| `circle`, `rectangle`, `ellipse` | the shape (`shapes.geometric` adds `diamond`, `star`, ...) |
| `minimum width=2cm`, `minimum size` | at least this big |
| `inner sep=4pt` | padding inside |
| `text width=3cm` | wrap text, and allow `\\` |
| `font=\small\bfseries` | the font |
| `anchor=north west` | which point of the node goes at the position |

## Anchors

Every node has named points: `(b.north)`, `(b.south east)`, `(b.west)`, `(b.center)`, and angles like `(b.30)`. Use them to start lines at exact places:

```latex
\begin{tikzpicture}
  \node[draw] (box) {Server};
  \draw[->] (box.east) -- ++(1,0) node[right] {client};
  \draw (box.north) -- ++(0,0.5);
\end{tikzpicture}
```

## Labels on lines

A `node` inside a path is placed along it. `midway`, `near start`, `above` and `sloped` position it:

```latex
\begin{tikzpicture}
  \draw[->] (0,0) -- (3,1) node[midway, above, sloped] {request};
\end{tikzpicture}
```

```exercise
goal: "Name the second node `end` and draw an arrow `->` from `start` to `end`."
code: |
  \begin{tikzpicture}
    \node[draw] (start) at (0,0) {Start};
    \node[draw] at (3,0) {End};
  \end{tikzpicture}
checks:
  - match: '\\node\[draw\]\s*\(end\)\s*at\s*\(3,\s*0\)'
    message: "Give the second node a name: \\node[draw] (end) at (3,0) {End};"
  - match: '\\draw\[->\]\s*\(start\)\s*--\s*\(end\)\s*;'
    message: "Add \\draw[->] (start) -- (end);"
solution: |
  \begin{tikzpicture}
    \node[draw] (start) at (0,0) {Start};
    \node[draw] (end) at (3,0) {End};
    \draw[->] (start) -- (end);
  \end{tikzpicture}
```

```quiz
question: "Where does a line drawn to a named node `(b)` end?"
options:
  - "At the edge of b's shape."
  - "At b's centre, crossing the text."
  - "At the origin."
answer: 0
explain: "TikZ cuts lines at the node's border. Use (b.center) to go to the middle."
```
