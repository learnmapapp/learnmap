---
title: Styles
icon: "💅"
branch: tikz
requires: [tikz-nodes]
summary: Reusable styles with tikzset and every node, scaling pictures.
---
When several nodes share options, give the options a name. A **style** is a list of options:

```latex
\tikzset{
  box/.style = {draw, rounded corners, fill=#1!15, minimum width=2cm, minimum height=8mm},
  box/.default = blue,
  arrow/.style = {-Stealth, thick},
}

\begin{tikzpicture}
  \node[box] (a) at (0,0) {Input};
  \node[box=green] (b) at (3,0) {Process};
  \node[box=red] (c) at (6,0) {Output};
  \draw[arrow] (a) -- (b);
  \draw[arrow] (b) -- (c);
\end{tikzpicture}
```

- `name/.style = {...}` defines a style. Use it like any option.
- `#1` is a parameter: `box=green` passes `green`. `.default` sets the value when none is given.
- Define styles in the preamble with `\tikzset` for the whole document, or as options of one `tikzpicture`.

## Styles for all nodes

```latex
\begin{tikzpicture}[
  every node/.style = {font=\sffamily\small},
  every path/.style = {thick},
]
  \node[draw] at (0,0) {Sans serif};
  \draw (1,0) -- (2,0);
\end{tikzpicture}
```

## Scaling

`[scale=2]` scales coordinates, but not text or line widths. That's usually what you want: the diagram gets bigger, the text stays readable. To scale everything, including text, use `[transform shape]` too, or `\resizebox`.

## Arrow tips

The `arrows.meta` library (`\usetikzlibrary{arrows.meta}`) has modern arrow tips: `-Stealth`, `-Latex`, `-{Triangle[open]}`, `-{Stealth[length=3mm]}`.

```compare javascript
// Styles are like CSS classes:
// .box { border: 1px solid; border-radius: 4px; }
// <div class="box">Input</div>  ~  \node[box] {Input};
```

```exercise
goal: "Define a style `note` with `draw`, `fill=yellow!30` and `rounded corners`, and use it on the node."
code: |
  \tikzset{}
  \begin{tikzpicture}
    \node at (0,0) {Remember};
  \end{tikzpicture}
checks:
  - match: 'note/\.style\s*=\s*\{[^}]*draw'
    message: "Define note/.style = {draw, ...}."
  - match: 'note/\.style\s*=\s*\{[^}]*fill\s*=\s*yellow!30'
    message: Add fill=yellow!30 to the style.
  - match: 'note/\.style\s*=\s*\{[^}]*rounded corners'
    message: Add rounded corners to the style.
  - match: '\\node\[note\]'
    message: "Use it: \\node[note] at (0,0) {Remember};"
solution: |
  \tikzset{note/.style = {draw, fill=yellow!30, rounded corners}}
  \begin{tikzpicture}
    \node[note] at (0,0) {Remember};
  \end{tikzpicture}
```

```quiz
question: "What does `[scale=2]` on a tikzpicture change?"
options:
  - "Coordinates, but not the size of text or line widths."
  - "Everything, including the font size."
  - "Only the line widths."
answer: 0
explain: "Text stays the document's size unless you also add transform shape."
```
