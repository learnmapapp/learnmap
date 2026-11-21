---
title: Matrices
icon: "▦"
branch: math
requires: [align]
summary: matrix, pmatrix, bmatrix, dots and the array environment.
---
`amsmath` has matrix environments with different brackets. Columns are separated by `&` and rows by `\\`:

```latex
\[
  \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
  \quad
  \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}
  \quad
  \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc
\]
```

| Environment | Brackets |
| --- | --- |
| `matrix` | none |
| `pmatrix` | ( ) |
| `bmatrix` | [ ] |
| `Bmatrix` | { } |
| `vmatrix` | \| \| (determinant) |
| `Vmatrix` | ‖ ‖ (norm) |

## Dots

For a general n×n matrix, use dots that point in the right direction:

```latex
\[
  A = \begin{pmatrix}
    a_{11} & a_{12} & \cdots & a_{1n} \\
    a_{21} & a_{22} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} & a_{m2} & \cdots & a_{mn}
  \end{pmatrix}
\]
```

`\cdots` is centred, `\vdots` vertical and `\ddots` diagonal. `\ldots` sits on the baseline, which is right in lists like $x_1, \ldots, x_n$.

## Arrays

When you need control over column alignment or lines, use `array`. It works like a table in maths mode:

```latex
\[
  \left[\begin{array}{cc|c}
    1 & 2 & 5 \\
    3 & 4 & 6
  \end{array}\right]
\]
```

```exercise
goal: "Write the 2×2 identity matrix with square brackets, using `bmatrix`."
code: |
  \[ I = \]
checks:
  - match: '\\begin\{bmatrix\}\s*1\s*&\s*0\s*\\\\\s*0\s*&\s*1\s*\\end\{bmatrix\}'
    message: "Write \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}."
solution: |
  \[ I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \]
```

```quiz
question: "Which environment gives a matrix in round parentheses?"
options:
  - "pmatrix"
  - "bmatrix"
  - "vmatrix"
answer: 0
explain: "p for parentheses, b for brackets, v for vertical bars."
```
