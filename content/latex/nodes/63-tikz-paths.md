---
title: Paths and shapes
icon: "〰️"
branch: tikz
requires: [tikz]
summary: Lines, curves, rectangles, circles, arcs, grids and line styles.
---
A path is a list of coordinates joined by **operations**:

```latex
\begin{tikzpicture}
  \draw[help lines] (0,0) grid (6,3);                % a background grid
  \draw (0,0) -- (1,1) -- (2,0);                     % straight lines
  \draw (2.5,0) -- (2.5,1) -| (3.5,2);               % vertical, then horizontal
  \draw (4,0) .. controls (4,2) and (6,2) .. (6,0);  % a Bézier curve
  \draw (0,2) to[bend left] (2,2);                   % a bent line
  \draw (1,2.5) circle (0.3);
  \draw (3,2.5) ellipse (0.6 and 0.3);
  \draw (5,2) arc (0:180:0.5);                       % start:end angle:radius
\end{tikzpicture}
```

| Operation | Meaning |
| --- | --- |
| `--` | straight line |
| `-|` / `|-` | horizontal then vertical / vertical then horizontal |
| `rectangle` | rectangle with the two corners given |
| `circle (r)`, `ellipse (a and b)` | around the current point |
| `arc (start:end:radius)` | part of a circle |
| `to[...]` | a line with options like `bend left` or `out=90, in=180` |
| `cycle` | back to the start, with a proper corner |

## Line styles

```latex
\begin{tikzpicture}
  \draw[thick, red] (0,0) -- (3,0);
  \draw[ultra thick, dashed] (0,-0.5) -- (3,-0.5);
  \draw[line width=2mm, dotted, gray] (0,-1) -- (3,-1);
  \draw[->, blue] (0,-1.5) -- (3,-1.5);
  \draw[<->, rounded corners] (0,-2) -- (1.5,-2.5) -- (3,-2);
  \filldraw[fill=yellow, draw=black] (4,-2) rectangle (5,0);
\end{tikzpicture}
```

Widths go from `ultra thin` to `ultra thick`, or any `line width`. `\fill` fills without a border; `\filldraw` does both.

## Relative coordinates

`++(1,0)` means "one to the right of the last point". It makes shapes easy to move:

```latex
\begin{tikzpicture}
  \draw (2,1) -- ++(1,0) -- ++(0,1) -- ++(-1,0) -- cycle;  % a unit square at (2,1)
\end{tikzpicture}
```

Polar coordinates are written `(angle:radius)`, like `(30:2)`.

```exercise
goal: "Draw a closed, red triangle through `(0,0)`, `(2,0)` and `(1,2)`, using `cycle` to close it."
code: |
  \begin{tikzpicture}
    \draw (0,0) -- (2,0) -- (1,2);
  \end{tikzpicture}
checks:
  - match: '\\draw\[[^\]]*red[^\]]*\]'
    message: Add the red option to \draw.
  - match: '\(1,\s*2\)\s*--\s*cycle\s*;'
    message: "Close the path with -- cycle."
solution: |
  \begin{tikzpicture}
    \draw[red] (0,0) -- (2,0) -- (1,2) -- cycle;
  \end{tikzpicture}
```

```quiz
question: "What does `++(0,1)` mean in a path?"
options:
  - "One unit above the previous point."
  - "The absolute point (0,1)."
  - "Double the previous point."
answer: 0
explain: "++ makes a coordinate relative to the last point, and moves the current point there."
```
