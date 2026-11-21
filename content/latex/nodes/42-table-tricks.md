---
title: Wide and complex tables
icon: "🧱"
branch: floats
requires: [booktabs]
summary: tabularx, multirow, long tables and making tables fit.
---
## Fit the text width with tabularx

A `tabular` is as wide as its content. `tabularx` from the package of the same name has a fixed total width, and its `X` columns share the remaining space and wrap their text:

```latex
\usepackage{tabularx}

\begin{tabularx}{\textwidth}{l X r}
  \toprule
  Item & Description & Price \\
  \midrule
  Pen  & A blue ballpoint pen that writes smoothly on most paper. & 2 \\
  Book & The \TeX book, by Donald Knuth. & 40 \\
  \bottomrule
\end{tabularx}
```

To right-align or centre an `X` column, use `>{\raggedleft\arraybackslash}X` or `>{\centering\arraybackslash}X`.

## Rows that span with multirow

`\multirow{rows}{width}{text}` from `multirow` merges cells vertically. Use `*` as the width to use the natural width:

```latex
\usepackage{multirow}

\begin{tabular}{llr}
  \toprule
  Group & Name & Score \\
  \midrule
  \multirow{2}{*}{A} & Ada  & 98 \\
                     & Alan & 87 \\
  \midrule
  B & Grace & 91 \\
  \bottomrule
\end{tabular}
```

Leave the cells below a `\multirow` empty.

## Tables longer than a page

A `tabular` can't break across pages. For that, use `longtable`, which repeats the header on each page. Its syntax is like `tabular`, with `\endhead` marking the end of the repeated rows.

## Making a table smaller

- Use `\small` or `\footnotesize` inside the `table` environment.
- Reduce the space between columns: `\setlength{\tabcolsep}{4pt}`.
- As a last resort, `\resizebox{\textwidth}{!}{...}` scales the whole table. It also scales the font, which can look inconsistent.

```exercise
goal: "Make this table fill the text width, with the middle column as a wrapping `X` column."
code: |
  \begin{tabular}{l l r}
    Step & What happens & Time \\
  \end{tabular}
checks:
  - match: '\\begin\{tabularx\}\{\\(textwidth|linewidth)\}\{\s*l\s*X\s*r\s*\}'
    message: "Use \\begin{tabularx}{\\textwidth}{l X r}."
  - match: '\\end\{tabularx\}'
    message: "Close it with \\end{tabularx}."
solution: |
  \begin{tabularx}{\textwidth}{l X r}
    Step & What happens & Time \\
  \end{tabularx}
```

```quiz
question: "What is special about an X column in tabularx?"
options:
  - "It takes the leftover width and wraps its text."
  - "It hides the column."
  - "It draws a cross in each cell."
answer: 0
explain: "X columns share whatever space remains to reach the table's given width."
```
