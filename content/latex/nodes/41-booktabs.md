---
title: Professional tables
icon: "📊"
branch: floats
requires: [tables]
summary: booktabs rules, no vertical lines, and \multicolumn headers.
---
Most tables in LaTeX look cramped because of `\hline` and vertical lines. The `booktabs` package fixes this with three rules of different weights and better spacing:

```latex
\usepackage{booktabs}

\begin{tabular}{lrr}
  \toprule
  Model   & Accuracy & Time (s) \\
  \midrule
  Baseline & 71.2 & 3.4 \\
  Ours     & 84.9 & 2.1 \\
  \bottomrule
\end{tabular}
```

The booktabs manual has two simple rules for good tables:

1. Never use vertical lines.
2. Never use double lines.

Use whitespace to group things instead, and `\cmidrule` for partial lines under a group of columns.

## Spanning columns

`\multicolumn{number}{alignment}{content}` makes a cell span several columns. Combined with `\cmidrule`, it makes clear group headers:

```latex
\begin{tabular}{lcccc}
  \toprule
  & \multicolumn{2}{c}{2024} & \multicolumn{2}{c}{2025} \\
  \cmidrule(lr){2-3} \cmidrule(lr){4-5}
  Region & Q1 & Q2 & Q1 & Q2 \\
  \midrule
  North  & 10 & 12 & 14 & 15 \\
  South  & 8  & 9  & 11 & 13 \\
  \bottomrule
\end{tabular}
```

`(lr)` trims the ends of the line a little so neighbouring rules don't touch.

## Spacing rows

`\addlinespace` adds a small gap between groups of rows, which often works better than another line.

```exercise
goal: "Replace the `\\hline`s with `\\toprule`, `\\midrule` and `\\bottomrule`."
code: |
  \begin{tabular}{lr}
    \hline
    City & Population \\
    \hline
    Oslo & 709000 \\
    \hline
  \end{tabular}
checks:
  - match: '\\toprule\s*City'
    message: Start with \toprule.
  - match: 'Population \\\\\s*\\midrule'
    message: Put \midrule after the header row.
  - match: '\\bottomrule\s*\\end\{tabular\}'
    message: End with \bottomrule.
  - notMatch: '\\hline'
    message: Remove all \hline commands.
solution: |
  \begin{tabular}{lr}
    \toprule
    City & Population \\
    \midrule
    Oslo & 709000 \\
    \bottomrule
  \end{tabular}
```

```quiz
question: "What does `\\multicolumn{3}{c}{Total}` do?"
options:
  - "Makes one centred cell that spans three columns."
  - "Repeats Total in three columns."
  - "Creates a table with three columns."
answer: 0
explain: "It merges three cells into one with the given alignment."
```
