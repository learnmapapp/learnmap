---
title: Loops
icon: "🔁"
branch: tikz
requires: [tikz-nodes]
summary: \foreach for repeated shapes, with lists, ranges and several variables.
---
`\foreach` repeats a command for each value in a list. It's how you draw axes, grids of dots, clocks and patterns without copying lines:

```latex
\begin{tikzpicture}
  \foreach \x in {0,1,...,5}
    \fill[blue!\x 0] (\x,0) circle (0.3);          % 0%, 10%, ... blue

  \foreach \x in {0,...,4}
    \foreach \y in {1,2,3}
      \fill (\x,\y) circle (1pt);                  % a grid of dots
\end{tikzpicture}
```

## Lists

| List | Values |
| --- | --- |
| `{1,2,3}` | 1, 2, 3 |
| `{1,...,5}` | 1 to 5 |
| `{0,0.5,...,2}` | 0, 0.5, 1, 1.5, 2 (the step comes from the first two) |
| `{a,b,c}` | any text |
| `{red,green,blue}` | colour names |

## Several variables

Separate variables with `/` to loop over pairs:

```latex
\begin{tikzpicture}
  \foreach \name/\angle in {N/90, E/0, S/270, W/180}
    \node at (\angle:1.5) {\name};
  \draw (0,0) circle (1.2);
\end{tikzpicture}
```

## Counting and calculating

`count=\i` numbers the iterations, and `evaluate` calculates values:

```latex
\begin{tikzpicture}
  \foreach \h [count=\i] in {12, 3, 6, 9}
    \node at ({90 - (\i-1)*90}:1) {\h};

  \foreach \x [evaluate=\x as \y using \x*\x/4] in {0,...,4}
    \fill[red] (\x+3,\y) circle (2pt);
\end{tikzpicture}
```

Calculations inside coordinates need braces: `({\x*2},0)`, so TikZ doesn't get confused by the commas and parentheses.

`\foreach` works outside TikZ too, since it comes from the `pgffor` package that TikZ loads.

```compare python
for x in range(0, 6):
    circle(x, 0, 0.3)
```

```compare javascript
for (const [name, angle] of [['N', 90], ['E', 0]]) label(name, angle);
```

```exercise
goal: "Replace the four lines with one `\\foreach` over `\\x in {0,...,3}` that draws `(\\x,0) circle (0.2)`."
code: |
  \begin{tikzpicture}
    \draw (0,0) circle (0.2);
    \draw (1,0) circle (0.2);
    \draw (2,0) circle (0.2);
    \draw (3,0) circle (0.2);
  \end{tikzpicture}
checks:
  - match: '\\foreach\s*\\x\s+in\s*\{0,\s*\.\.\.\s*,\s*3\}'
    message: "Use \\foreach \\x in {0,...,3}."
  - match: '\\draw\s*\(\\x,\s*0\)\s*circle\s*\(0\.2\)\s*;'
    message: "Draw (\\x,0) circle (0.2) in the loop."
  - notMatch: '\(2,\s*0\)'
    message: Remove the individual lines.
solution: |
  \begin{tikzpicture}
    \foreach \x in {0,...,3}
      \draw (\x,0) circle (0.2);
  \end{tikzpicture}
```

```quiz
question: "What values does `{0,0.25,...,1}` produce?"
options:
  - "0, 0.25, 0.5, 0.75, 1"
  - "0, 1"
  - "0, 0.25, 1"
answer: 0
explain: "The step is the difference between the first two values."
```
