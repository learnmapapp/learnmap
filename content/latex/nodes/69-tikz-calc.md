---
title: Coordinate calculations
icon: "📐"
branch: tikz
requires: [tikz-positioning, tikz-foreach]
summary: The calc library, midpoints, intersections and named coordinates.
---
The `calc` library lets you compute coordinates inside `($ ... $)`:

```latex
\usetikzlibrary{calc}

\begin{tikzpicture}
  \coordinate (A) at (0,0);
  \coordinate (B) at (4,1);
  \coordinate (C) at (1,3);
  \draw (A) -- (B) -- (C) -- cycle;

  \fill[red] ($(A)!0.5!(B)$) circle (2pt);          % midpoint of A and B
  \draw[dashed] (C) -- ($(A)!0.5!(B)$);             % a median
  \fill[blue] ($(B) + (0.5,0.5)$) circle (2pt);     % B shifted
  \node at ($(A)!1.15!(C)$) {beyond C};             % past C on the line A--C
  \draw[green!50!black] (A) -- ($(A)!(C)!(B)$);     % C projected onto A--B
\end{tikzpicture}
```

- `\coordinate (name) at (x,y);` names a point without drawing anything.
- `($(A) + (1,2)$)` adds vectors; `($2*(A)$)` scales.
- `($(A)!0.25!(B)$)` is a quarter of the way from A to B. Values above 1 go past B.
- `($(A)!1cm!(B)$)` is 1 cm from A towards B.
- `($(A)!(C)!(B)$)` is the projection of C onto the line through A and B.

## Points on paths and intersections

Every path can be named and intersected with the `intersections` library:

```latex
\usetikzlibrary{intersections}

\begin{tikzpicture}
  \draw[name path=curve] (0,0) .. controls (1,2) and (2,-1) .. (3,1);
  \draw[name path=line] (0,0.5) -- (3,0.5);
  \fill[name intersections={of=curve and line, name=i}]
    (i-1) circle (2pt) (i-2) circle (2pt) (i-3) circle (2pt);
\end{tikzpicture}
```

## Node coordinates

You can use anchors of nodes in calculations: `($(box.north east) + (0.2,0.2)$)` is a little outside a node's corner, perfect for a badge or annotation.

```exercise
goal: "Put a node with the text `M` at the midpoint of `P` and `Q`, using `($(P)!0.5!(Q)$)`."
code: |
  \begin{tikzpicture}
    \coordinate (P) at (0,0);
    \coordinate (Q) at (4,2);
    \draw (P) -- (Q);
  \end{tikzpicture}
checks:
  - match: '\\node\s*(\[[^\]]*\]\s*)?at\s*\(\$\(P\)!0?\.5!\(Q\)\$\)\s*\{M\}'
    message: "Add \\node at ($(P)!0.5!(Q)$) {M};"
solution: |
  \begin{tikzpicture}
    \coordinate (P) at (0,0);
    \coordinate (Q) at (4,2);
    \draw (P) -- (Q);
    \node[above] at ($(P)!0.5!(Q)$) {M};
  \end{tikzpicture}
```

```quiz
question: "Where is `($(A)!2!(B)$)`?"
options:
  - "On the line from A through B, twice as far from A as B is."
  - "Two centimetres from A."
  - "Halfway between A and B."
answer: 0
explain: "The number is a fraction of the distance from A to B; 2 goes past B by the same distance again."
```
