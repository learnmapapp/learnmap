---
title: Trees
icon: "🌳"
branch: tikz
requires: [tikz-styles]
summary: Tree diagrams with child nodes, and the forest package.
---
TikZ can draw trees from a nested description. Each `child` contains a node, and may have children of its own:

```latex
\begin{tikzpicture}[
  every node/.style = {draw, rounded corners, fill=green!10},
  level distance = 12mm,
  level 1/.style = {sibling distance = 30mm},
  level 2/.style = {sibling distance = 15mm},
]
  \node {root}
    child { node {left}
      child { node {a} }
      child { node {b} }
    }
    child { node {right}
      child { node {c} }
    };
\end{tikzpicture}
```

`level distance` is the vertical gap between levels and `sibling distance` the gap between children. You often have to tune them per level so subtrees don't overlap.

## The forest package

For anything bigger, like syntax trees or file trees, `forest` is much easier. It computes the spacing itself, and the bracket syntax is compact:

```latex
\usepackage{forest}

\begin{forest}
  for tree = {draw, rounded corners, fill=blue!5, s sep=4mm, l sep=6mm}
  [S
    [NP [Det [the]] [N [cat]]]
    [VP [V [sat]]
        [PP [P [on]] [NP [Det [the]] [N [mat]]]]]
  ]
\end{forest}
```

- `[label children...]` is a node with its children.
- `for tree={...}` applies options to every node.
- `grow'=0` draws the tree sideways. With the `edges` library, `folder` gives file-tree lines:

```latex
\usepackage[edges]{forest}

\begin{forest}
  for tree = {grow'=0, folder, draw}
  [project/
    [src/ [main.tex] [intro.tex]]
    [refs.bib]
  ]
\end{forest}
```

```exercise
goal: "Give the `right` node a second child `d`, so it has children `c` and `d`."
code: |
  \begin{tikzpicture}
    \node {root}
      child { node {left} }
      child { node {right}
        child { node {c} }
      };
  \end{tikzpicture}
checks:
  - match: 'child\s*\{\s*node\s*\{c\}\s*\}\s*child\s*\{\s*node\s*\{d\}\s*\}'
    message: "Add child { node {d} } after the c child."
solution: |
  \begin{tikzpicture}
    \node {root}
      child { node {left} }
      child { node {right}
        child { node {c} }
        child { node {d} }
      };
  \end{tikzpicture}
```

```quiz
question: "Why use forest instead of TikZ's child syntax for large trees?"
options:
  - "forest works out the spacing so subtrees don't overlap."
  - "TikZ can't draw trees with more than three levels."
  - "forest draws in colour."
answer: 0
explain: "With child syntax you tune sibling distances by hand; forest packs the tree automatically."
```
