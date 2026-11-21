---
title: Positioning nodes
icon: "🧭"
branch: tikz
requires: [tikz-styles]
summary: The positioning library places nodes relative to each other.
---
Placing every node with coordinates gets tedious, and moving one means moving them all. The `positioning` library places nodes relative to each other:

```latex
\usetikzlibrary{positioning}

\begin{tikzpicture}[
  node distance = 1cm and 1.5cm,   % vertical and horizontal
  every node/.style = {draw, rounded corners, minimum width=2cm},
]
  \node (idea) {Idea};
  \node (draft) [right=of idea] {Draft};
  \node (review) [right=of draft] {Review};
  \node (publish) [below=of review] {Publish};
  \node (edit) [below=of draft] {Edit};

  \draw[->] (idea) -- (draft);
  \draw[->] (draft) -- (review);
  \draw[->] (review) -- (publish);
  \draw[->] (review) -- (edit);
  \draw[->] (edit) -- (draft);
\end{tikzpicture}
```

- `right=of idea` places the node to the right of `idea`, with `node distance` between their **edges**.
- Directions: `above`, `below`, `left`, `right`, and combinations like `below right`.
- `right=2cm of idea` gives a specific distance.
- `below=of a.south west` places it relative to an anchor.

## Connecting at right angles

`-|` and `|-` work between nodes too, for neat flowchart lines:

```latex
\begin{tikzpicture}
  \node[draw] (a) {A};
  \node[draw] (b) at (3,-1.5) {B};
  \draw[->] (a) -| (b);    % go right, then down
\end{tikzpicture}
```

## Grouping with fit

The `fit` library draws a node around other nodes, for boxes around a group:

```latex
\usetikzlibrary{fit,positioning}

\begin{tikzpicture}
  \node[draw] (x) {x};
  \node[draw, right=of x] (y) {y};
  \node[draw, dashed, inner sep=6pt, fit=(x) (y), label=above:Group] {};
\end{tikzpicture}
```

```exercise
goal: "Place the `Output` node to the right of `Input` with `right=of input`, instead of using coordinates."
code: |
  \begin{tikzpicture}
    \node[draw] (input) {Input};
    \node[draw] (output) at (3,0) {Output};
  \end{tikzpicture}
checks:
  - match: '\\node\[draw,\s*right\s*=\s*of input\]\s*\(output\)|\\node\[draw\]\s*\(output\)\s*\[right\s*=\s*of input\]'
    message: "Write \\node[draw, right=of input] (output) {Output};"
  - notMatch: 'at \(3,\s*0\)'
    message: Remove the coordinate.
solution: |
  \begin{tikzpicture}
    \node[draw] (input) {Input};
    \node[draw, right=of input] (output) {Output};
  \end{tikzpicture}
```

```quiz
question: "With the positioning library, what does `node distance` measure?"
options:
  - "The gap between the edges of the nodes."
  - "The distance between the centres."
  - "The line width."
answer: 0
explain: "right=of a puts the new node's border node distance away from a's border."
```
