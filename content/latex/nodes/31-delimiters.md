---
title: Brackets that grow
icon: "⟮⟯"
branch: math
requires: [fractions-roots]
summary: \left and \right, manual sizes, and absolute values.
---
Normal brackets stay the same size, which looks wrong around tall expressions:

```latex
\[
  ( \frac{a}{b} )^2 \quad \text{vs} \quad \left( \frac{a}{b} \right)^2
\]
```

`\left` and `\right` make a pair of delimiters as tall as what's between them. They work with many delimiters:

```latex
\[
  \left[ x \right], \quad \left\{ x \right\}, \quad \left| x \right|,
  \quad \left\langle u, v \right\rangle, \quad \left. \frac{df}{dx} \right|_{x=0}
\]
```

- Curly braces need a backslash: `\{` and `\}`.
- `\left.` is an invisible delimiter, for when you only want one side.
- Every `\left` needs a matching `\right` in the same line of the formula.

## Manual sizes

`\left` and `\right` sometimes overshoot. You can pick a size yourself with `\big`, `\Big`, `\bigg` and `\Bigg`, plus `l` or `r`:

```latex
\[
  \Bigl( \sum_i x_i \Bigr)^2
\]
```

## Middle

`\middle|` grows a bar between `\left` and `\right`, as in set notation:

```latex
\[
  \left\{ x \in \mathbb{R} \;\middle|\; x^2 < 2 \right\}
\]
```

```exercise
goal: "Make the parentheses grow to fit the fraction, using `\\left(` and `\\right)`."
code: |
  \[ f(x) = (\frac{x+1}{x-1})^2 \]
checks:
  - match: '\\left\(\s*\\frac\{x\+1\}\{x-1\}\s*\\right\)'
    message: "Use \\left( ... \\right) around the fraction."
solution: |
  \[ f(x) = \left(\frac{x+1}{x-1}\right)^2 \]
```

```quiz
question: "How do you print curly braces as delimiters in maths?"
options:
  - "`\\{` and `\\}`"
  - "`{` and `}`"
  - "`\\curly{}`"
answer: 0
explain: "Plain braces group things in LaTeX; you need \\{ and \\} to see them."
```
