---
title: Subscripts and superscripts
icon: "x²"
branch: math
requires: [math-mode]
summary: ^ and _, grouping with braces, and primes.
---
`^` makes a superscript and `_` makes a subscript. They apply to the **next single character**, or to a group in braces:

```latex
$x^2$, $x_1$, $x_i^2$, $a_{ij}$, $2^{10}$, $e^{-x^2}$
```

- `$2^10$` gives 2¹0, because only the `1` is raised. Write `$2^{10}$`.
- Combine them in any order: `$x_i^2$` and `$x^2_i$` look the same.
- Superscripts can be nested: `$e^{x^{2}}$`.

## Primes and degrees

```latex
$f'(x)$, $f''(x)$, $90^\circ$
```

An apostrophe gives a prime. For degrees, use `^\circ` (or the `siunitx` package and `\ang{90}`).

## Words in subscripts

A subscript that's a word should be upright, not italic, because it's a label and not a product of variables:

```latex
$T_{\text{max}}$, $v_{\mathrm{initial}}$
```

```compare python
# x**2  ->  $x^2$
# x[i]  ->  $x_i$
```

```exercise
goal: "Fix the formula so the whole exponent `n+1` is raised, and the subscript `max` is upright text."
code: |
  $2^n+1$ is bigger than $T_max$.
checks:
  - match: '2\^\{n\s*\+\s*1\}'
    message: "Group the exponent: 2^{n+1}."
  - match: 'T_\{\\(text|mathrm)\{max\}\}'
    message: "Write T_{\\text{max}}."
solution: |
  $2^{n+1}$ is bigger than $T_{\text{max}}$.
```

```quiz
question: "What does `$x^10$` produce?"
options:
  - "x¹ followed by 0"
  - "x to the power 10"
  - "An error"
answer: 0
explain: "^ only takes the next character. Use braces: $x^{10}$."
```
