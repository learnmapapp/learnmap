---
title: Plots
icon: "📈"
branch: tikz
requires: [tikz, math-mode]
summary: pgfplots for function plots with axes, legends and styles.
---
`pgfplots` builds on TikZ to draw plots with axes, ticks and legends, in your document's fonts:

```latex
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}

\begin{tikzpicture}
  \begin{axis}[
    xlabel = $x$, ylabel = $f(x)$,
    domain = -2:2, samples = 100,
    grid = major, legend pos = north west,
    width = 9cm, height = 6cm,
  ]
    \addplot[blue, thick] {x^2};
    \addlegendentry{$x^2$}
    \addplot[red, dashed] {exp(x) - 1};
    \addlegendentry{$e^x - 1$}
  \end{axis}
\end{tikzpicture}
```

- Always set `\pgfplotsset{compat=1.18}` (or newer). It picks the modern defaults.
- `\addplot {expression};` plots a function of `x`. `domain` and `samples` say where and how smoothly.
- Functions include `sin`, `cos` (in degrees; write `sin(deg(x))` for radians), `exp`, `ln`, `sqrt` and `abs`.

## Axis types

| Environment | Axes |
| --- | --- |
| `axis` | linear |
| `semilogyaxis` / `semilogxaxis` | one logarithmic axis |
| `loglogaxis` | both logarithmic |
| `polaraxis` | polar (with `\usepgfplotslibrary{polar}`) |

## Useful options

- `xmin`, `xmax`, `ymin`, `ymax` fix the ranges.
- `axis lines = middle` draws the axes through zero, like a school textbook.
- `xtick = {0,1,2}`, `xticklabels = {a,b,c}` set ticks.
- `mark = *`, `only marks` for points instead of lines.
- `\addplot3[surf] {x*y};` makes a 3D surface.

```tip
pgfplots is slow for very large datasets. Use externalization (\usepgfplotslibrary{external}) to cache finished plots as PDFs.
```

```compare python
import numpy as np, matplotlib.pyplot as plt
x = np.linspace(-2, 2, 100); plt.plot(x, x**2, label="$x^2$"); plt.legend()
```

```exercise
goal: "Plot `sin(deg(x))` over the domain `0:6.28` with 50 samples."
code: |
  \begin{tikzpicture}
    \begin{axis}
    \end{axis}
  \end{tikzpicture}
checks:
  - match: '\\addplot[^;{]*\{\s*sin\(deg\(x\)\)\s*\}\s*;'
    message: "Add \\addplot {sin(deg(x))};"
  - match: 'domain\s*=\s*0:6\.28'
    message: Set domain=0:6.28.
  - match: 'samples\s*=\s*50'
    message: Set samples=50.
solution: |
  \begin{tikzpicture}
    \begin{axis}[domain=0:6.28, samples=50]
      \addplot {sin(deg(x))};
    \end{axis}
  \end{tikzpicture}
```

```quiz
question: "Why write sin(deg(x)) in pgfplots?"
options:
  - "Trigonometric functions take degrees, so deg converts x from radians."
  - "deg makes the curve smoother."
  - "It's needed for the legend."
answer: 0
explain: "pgfplots follows TikZ, where angles are in degrees."
```
