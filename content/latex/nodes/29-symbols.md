---
title: Greek letters and symbols
icon: "α"
branch: math
requires: [math-mode]
summary: Greek letters, relations, arrows, set symbols and finding any symbol.
---
Greek letters are written by name. Capitalise the name for the capital letter:

```latex
$\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \omega$
$\Gamma, \Delta, \Theta, \Lambda, \Pi, \Sigma, \Omega$
$\varepsilon, \vartheta, \varphi$  % alternative shapes
```

There's no `\Alpha`, because it looks exactly like a Latin A.

## Relations and operators

| Code | Symbol | Code | Symbol |
| --- | --- | --- | --- |
| `\leq` | ≤ | `\geq` | ≥ |
| `\neq` | ≠ | `\approx` | ≈ |
| `\equiv` | ≡ | `\sim` | ∼ |
| `\times` | × | `\cdot` | · |
| `\pm` | ± | `\infty` | ∞ |
| `\in` | ∈ | `\subseteq` | ⊆ |
| `\cup` | ∪ | `\cap` | ∩ |
| `\forall` | ∀ | `\exists` | ∃ |
| `\to` | → | `\Rightarrow` | ⇒ |
| `\iff` | ⟺ | `\mapsto` | ↦ |

`amssymb` adds many more, like `\mathbb{R}` for ℝ and `\varnothing` for ∅.

## Finding a symbol

You don't have to remember them all. Draw the symbol on **Detexify** (detexify.kirelabs.org) and it tells you the command. The *Comprehensive LaTeX Symbol List* (`texdoc symbols`) lists thousands.

```latex
\[
  \forall \varepsilon > 0 \; \exists \delta > 0 : |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon
\]
```

```exercise
goal: "Replace the words with symbols: `\\theta`, `\\leq` and `\\pi`."
code: |
  $0 <= theta <= 2 pi$
checks:
  - match: '\\theta'
    message: "Use \\theta."
  - match: '0 \\leq \\theta \\leq 2\s?\\pi'
    message: "Write 0 \\leq \\theta \\leq 2\\pi."
solution: |
  $0 \leq \theta \leq 2\pi$
```

```quiz
question: "How do you get a capital Greek delta, Δ?"
options:
  - "\\Delta"
  - "\\delta"
  - "\\DELTA"
answer: 0
explain: "Capitalising the first letter of the name gives the capital letter."
```
