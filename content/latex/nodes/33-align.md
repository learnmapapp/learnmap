---
title: Aligning equations
icon: "⚖️"
branch: math
requires: [equations]
summary: align, gather, split and cases from amsmath.
---
For several related equations, `align` lines them up at a chosen point. Mark the alignment point with `&` and end each line with `\\`:

```latex
\begin{align}
  (a + b)^2 &= (a + b)(a + b) \\
            &= a^2 + ab + ba + b^2 \\
            &= a^2 + 2ab + b^2 \label{eq:square}
\end{align}
```

Each line gets its own number. Use `align*` for no numbers, or `\notag` on a single line.

## Several columns

More `&`s make more alignment columns. They alternate between "aligned to the right" and "aligned to the left", so pairs of equations line up neatly:

```latex
\begin{align*}
  x &= 1  &  y &= 2 \\
  x + y &= 3 & x - y &= -1
\end{align*}
```

## gather and split

- `gather` centres each line without aligning them.
- `split`, inside `equation`, breaks one long equation over several lines with a single number.

```latex
\begin{equation}
  \begin{split}
    f(x) &= (x+1)^3 \\
         &= x^3 + 3x^2 + 3x + 1
  \end{split}
\end{equation}
```

## Cases

```latex
\[
  |x| = \begin{cases}
    x  & \text{if } x \geq 0, \\
    -x & \text{otherwise.}
  \end{cases}
\]
```

```warn
Don't use the old eqnarray environment. It spaces the = signs badly. align does the same job better.
```

```exercise
goal: "Align the two lines at the equals signs inside an `align*` environment."
code: |
  \[ 2x + 3 = 7 \]
  \[ x = 2 \]
checks:
  - match: '\\begin\{align\*\}'
    message: "Use \\begin{align*}."
  - match: '2x \+ 3 &= 7\s*\\\\'
    message: "Put & before the first = and end the line with \\\\."
  - match: 'x &= 2'
    message: "Put & before the second =."
solution: |
  \begin{align*}
    2x + 3 &= 7 \\
         x &= 2
  \end{align*}
```

```quiz
question: "In align, what does `&` mark?"
options:
  - "The point where the lines are aligned."
  - "A new equation number."
  - "A line break."
answer: 0
explain: "Lines are lined up at their & characters; \\\\ ends a line."
```
