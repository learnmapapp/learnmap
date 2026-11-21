---
title: Tables
icon: "🧮"
branch: floats
requires: [environments, figures]
summary: tabular, column types, & and \\, and the table float.
---
Tables are built with the `tabular` environment. Its argument gives one letter per column:

```latex
\begin{tabular}{l c r}
  Name   & Age & Score \\
  \hline
  Ada    & 36  & 98 \\
  Alan   & 41  & 87 \\
\end{tabular}
```

| Column | Meaning |
| --- | --- |
| `l`, `c`, `r` | left, centred or right aligned |
| `p{4cm}` | a paragraph column, 4 cm wide, with line wrapping |
| `\|` | a vertical line between columns |

- `&` separates cells, `\\` ends a row.
- `\hline` draws a horizontal line.
- `@{}` removes the space at the edge, like `{@{}ll@{}}`.

## Table floats

Like images, tables usually go in a float with a caption. For tables the caption traditionally goes **above**:

```latex
\begin{table}[htbp]
  \centering
  \caption{Results of the experiment.}
  \label{tab:results}
  \begin{tabular}{lr}
    Trial & Time (s) \\
    \hline
    1 & 12.3 \\
    2 & 11.8 \\
  \end{tabular}
\end{table}
```

`tabular` is the content, `table` is the floating box with a caption. You can use `tabular` without `table` anywhere in your text.

## Tools

Writing big tables by hand is tedious. Tools like *Tables Generator* (tablesgenerator.com) convert spreadsheets to LaTeX, and `csvsimple` or `pgfplotstable` read CSV files directly.

```compare javascript
// <table><tr><td>Ada</td><td>36</td></tr></table>
// is in LaTeX:  Ada & 36 \\
```

```exercise
goal: "Add a third column, right-aligned, with the header `Price`, and fill it with `3` and `5`."
code: |
  \begin{tabular}{ll}
    Fruit & Colour \\
    Apple & Red \\
    Lime  & Green \\
  \end{tabular}
checks:
  - match: '\\begin\{tabular\}\{llr\}'
    message: "Change the column spec to {llr}."
  - match: 'Colour\s*&\s*Price\s*\\\\'
    message: Add Price to the header row.
  - match: 'Red\s*&\s*3\s*\\\\[\s\S]*Green\s*&\s*5\s*\\\\'
    message: Add 3 and 5 to the rows.
solution: |
  \begin{tabular}{llr}
    Fruit & Colour & Price \\
    Apple & Red    & 3 \\
    Lime  & Green  & 5 \\
  \end{tabular}
```

```quiz
question: "What does the column spec `{p{3cm} r}` mean?"
options:
  - "A 3 cm wide wrapping column, then a right-aligned column."
  - "Three columns, all right-aligned."
  - "A table 3 cm wide."
answer: 0
explain: "p{width} is a paragraph column; r is right-aligned."
```
