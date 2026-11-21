---
title: Maths fonts and accents
icon: "𝔸"
branch: math
requires: [symbols]
summary: \mathbb, \mathcal, \mathbf, \boldsymbol, hats, bars and vectors.
---
Maths has its own alphabets, each with a conventional meaning:

```latex
$\mathbb{R}, \mathbb{N}, \mathbb{Z}$  % number sets (needs amssymb)
$\mathcal{L}, \mathcal{O}(n)$         % calligraphic
$\mathbf{v}$, $\boldsymbol{\alpha}$   % bold vectors
$\mathrm{d}x$, $\mathrm{e}$           % upright
$\mathfrak{g}$                        % Fraktur, for Lie algebras
$\mathsf{A}$, $\mathtt{x}$            % sans serif, monospace
```

`\mathbf` only works on Latin letters and digits. For bold Greek or symbols, use `\boldsymbol` from `amsmath` (or the `bm` package's `\bm`).

## Accents

```latex
$\hat{x}$, $\bar{x}$, $\vec{v}$, $\dot{x}$, $\ddot{x}$, $\tilde{x}$
$\widehat{xyz}$, $\overline{AB}$, $\underline{x}$
$\overbrace{1 + \cdots + 1}^{n \text{ times}}$
```

The `wide` versions and `\overline` stretch over several characters.

## Spacing

LaTeX handles spacing in maths automatically, but sometimes needs help:

| Code | Space |
| --- | --- |
| `\,` | thin |
| `\:` | medium |
| `\;` | thick |
| `\quad` | 1 em |
| `\qquad` | 2 em |
| `\!` | negative thin |

```exercise
goal: "Write the set of real numbers as `\\mathbb{R}`, and make `v` a vector with `\\vec`."
code: |
  $v in R^3$
checks:
  - match: '\\vec\{v\}'
    message: "Use \\vec{v}."
  - match: '\\in'
    message: "Use \\in."
  - match: '\\mathbb\{R\}\^3'
    message: "Write \\mathbb{R}^3."
solution: |
  $\vec{v} \in \mathbb{R}^3$
```

```quiz
question: "How do you make a bold Greek letter α?"
options:
  - "\\boldsymbol{\\alpha}"
  - "\\mathbf{\\alpha}"
  - "\\textbf{\\alpha}"
answer: 0
explain: "\\mathbf only affects Latin letters and digits. \\boldsymbol (or \\bm) works for any symbol."
```
