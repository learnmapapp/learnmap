---
title: Sums, integrals and functions
icon: "∫"
branch: math
requires: [sub-superscripts, symbols]
summary: \sum, \int, \lim, \prod, function names like \sin, and \operatorname.
---
Big operators take their limits as subscripts and superscripts:

```latex
\[
  \sum_{i=1}^{n} i = \frac{n(n+1)}{2}
  \qquad
  \int_0^\infty e^{-x}\,dx = 1
  \qquad
  \lim_{x \to 0} \frac{\sin x}{x} = 1
  \qquad
  \prod_{k=1}^{n} k = n!
\]
```

In display maths, the limits of `\sum`, `\prod` and `\lim` go above and below. Inline, like $\sum_{i=1}^n i$, they go to the side so the line stays compact.

## Function names

Function names like sin, log and max are upright, not italic. Write them as commands:

```latex
$\sin x$, $\cos^2\theta$, $\log_2 n$, $\ln x$, $\exp(x)$, $\max_{i} a_i$, $\det A$
```

If you write `$sin x$`, LaTeX sees the variables s, i and n multiplied together, in italics.

For a name that doesn't exist yet, use `\operatorname`, or define it once in the preamble:

```latex
\DeclareMathOperator{\argmax}{arg\,max}

$\operatorname{rank} A$ and $\argmax_x f(x)$
```

## Integrals

Put a thin space `\,` before `dx`. Use `\iint` and `\iiint` for multiple integrals, and `\oint` for a contour integral.

```exercise
goal: "Write the sum of `a_k` for k from 1 to n with `\\sum`, and make `log` upright with `\\log`."
code: |
  \[ S = sum a_k + log n \]
checks:
  - match: '\\sum_\{k\s*=\s*1\}\^\{?n\}?\s*a_k'
    message: "Write \\sum_{k=1}^{n} a_k."
  - match: '\\log\s*n'
    message: "Use \\log n."
solution: |
  \[ S = \sum_{k=1}^{n} a_k + \log n \]
```

```quiz
question: "Why write `\\sin x` instead of `sin x`?"
options:
  - "sin would be typeset as three italic variables s·i·n."
  - "sin x is a syntax error."
  - "\\sin computes the value."
answer: 0
explain: "\\sin prints an upright function name with the right spacing."
```
