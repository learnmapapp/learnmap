---
title: Plotting data
icon: "📊"
branch: tikz
requires: [pgfplots]
summary: Plot coordinates and CSV files, bar charts and error bars.
---
Plotting measurements is just as easy. Give coordinates directly, or read a file:

```latex
\begin{tikzpicture}
  \begin{axis}[xlabel=Year, ylabel=Users (millions), xtick=data,
               x tick label style={/pgf/number format/1000 sep=}]
    \addplot[mark=*, blue] coordinates {
      (2020, 1.2) (2021, 2.0) (2022, 3.5) (2023, 4.1) (2024, 6.0)
    };
  \end{axis}
\end{tikzpicture}
```

## From a file

With a file `data.csv`:

```text
x,y,err
1,2.1,0.3
2,3.9,0.4
3,6.2,0.2
4,7.8,0.5
```

```latex
\begin{tikzpicture}
  \begin{axis}[xlabel=Time (s), ylabel=Distance (m)]
    \addplot+[only marks, error bars/.cd, y dir=both, y explicit]
      table[x=x, y=y, y error=err, col sep=comma] {data.csv};
    \addplot[red, domain=1:4] {1.9*x + 0.2};   % a fitted line
  \end{axis}
\end{tikzpicture}
```

- `table[x=..., y=...]` picks columns by name. `col sep=comma` for CSV; spaces are the default.
- `\addplot+` adds options to the default style, instead of replacing it.
- `error bars/.cd, y dir=both, y explicit` draws error bars from the `y error` column.
- The `pgfplotstable` package can also typeset the same file as a table.

## Bar charts

```latex
\begin{tikzpicture}
  \begin{axis}[ybar, symbolic x coords={Rust, Go, Lean}, xtick=data,
               ymin=0, nodes near coords, bar width=10mm, enlarge x limits=0.3]
    \addplot coordinates {(Rust, 100) (Go, 50) (Lean, 50)};
  \end{axis}
\end{tikzpicture}
```

`ybar` makes vertical bars, `xbar` horizontal ones. `symbolic x coords` allows words on the axis, and `nodes near coords` prints each value above its bar.

```exercise
goal: "Plot the columns `t` and `v` of `data.dat` (space-separated), using `table[x=t, y=v]`."
code: |
  \begin{tikzpicture}
    \begin{axis}
    \end{axis}
  \end{tikzpicture}
checks:
  - match: '\\addplot[^;]*table\s*\[\s*x\s*=\s*t\s*,\s*y\s*=\s*v\s*\]\s*\{data\.dat\}\s*;'
    message: "Add \\addplot table[x=t, y=v] {data.dat};"
solution: |
  \begin{tikzpicture}
    \begin{axis}
      \addplot table[x=t, y=v] {data.dat};
    \end{axis}
  \end{tikzpicture}
```

```quiz
question: "What's the difference between \\addplot[...] and \\addplot+[...]?"
options:
  - "+ adds the options to the default cycle style; without + they replace it."
  - "+ plots two lines."
  - "There is no difference."
answer: 0
explain: "Without +, a plot with options loses its default colour and marks."
```
