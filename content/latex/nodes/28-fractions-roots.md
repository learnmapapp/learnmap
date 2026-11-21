---
title: Fractions and roots
icon: "½"
branch: math
requires: [sub-superscripts]
summary: \frac, \dfrac, \tfrac, \sqrt and binomial coefficients.
---
`\frac{numerator}{denominator}` makes a fraction, and `\sqrt{...}` a square root:

```latex
\[
  x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]
The cube root $\sqrt[3]{27} = 3$ takes an optional argument.
```

## Sizes

Fractions in a sentence are made smaller so they don't push lines apart: $\frac{1}{2}$. With `amsmath` you can choose:

- `\dfrac` always uses the large display size.
- `\tfrac` always uses the small text size.

```latex
Half is $\tfrac12$, and in display: $\dfrac{a}{b}$.
```

For single-character arguments you can leave out the braces, like `\frac12`. It works, but braces are clearer.

## Slashes and binomials

For simple fractions in text, `$a/b$` often reads better than a stacked fraction. For binomial coefficients, use `\binom`:

```latex
$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$
```

The `\,` adds a thin space.

```exercise
goal: "Write the formula for the mean, `\\frac{1}{n}` times a sum, and the root of `x^2 + y^2`."
code: |
  \[ m = 1/n (x_1 + x_2) \quad r = sqrt(x^2 + y^2) \]
checks:
  - match: '\\frac\{1\}\{n\}'
    message: "Use \\frac{1}{n}."
  - match: '\\sqrt\{x\^2\s*\+\s*y\^2\}'
    message: "Use \\sqrt{x^2 + y^2}."
solution: |
  \[ m = \frac{1}{n} (x_1 + x_2) \quad r = \sqrt{x^2 + y^2} \]
```

```quiz
question: "How do you write a cube root of x?"
options:
  - "\\sqrt[3]{x}"
  - "\\sqrt{x}^3"
  - "\\root{3}{x}"
answer: 0
explain: "\\sqrt takes the degree as an optional argument in square brackets."
```
