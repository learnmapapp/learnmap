---
title: Figures and captions
icon: "🏞️"
branch: floats
requires: [images, cross-references]
summary: The figure environment, \caption, \label and why figures float.
---
Wrap an image in a `figure` environment to give it a caption and a number:

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.6\textwidth]{diagram}
  \caption{The system architecture.}
  \label{fig:architecture}
\end{figure}

Figure~\ref{fig:architecture} shows the overall design.
```

- `\centering` centres the image within the figure.
- `\caption` adds "Figure 1: The system architecture." and an entry for `\listoffigures`.
- `\label` goes **after** `\caption`.

## Figures float

A figure is a [[float]]: LaTeX may move it to a better place, such as the top of the page or the next page, so it never leaves a big gap. That's why you refer to figures by number, never as "the figure below".

The optional argument says where LaTeX may put it:

| Letter | Placement |
| --- | --- |
| `h` | here, if possible |
| `t` | top of a page |
| `b` | bottom of a page |
| `p` | a separate page with only floats |
| `!` | try harder; relax some rules |

`[htbp]` allows everything and is a good default. If you really need it *exactly here*, the `float` package adds `[H]`, but use it sparingly.

## Too many floats

If figures pile up at the end of a chapter, `\clearpage` forces all waiting floats to be printed. The `placeins` package's `\FloatBarrier` stops figures from moving past a point, such as the next section.

```exercise
goal: "Put the image in a figure with the caption `A cat.` and the label `fig:cat`."
code: |
  \includegraphics[width=5cm]{cat}
checks:
  - match: '\\begin\{figure\}'
    message: "Wrap it in \\begin{figure} ... \\end{figure}."
  - match: '\\caption\{A cat\.\}\s*\\label\{fig:cat\}'
    message: "Add \\caption{A cat.} followed by \\label{fig:cat}."
  - match: '\\end\{figure\}'
    message: Close the figure.
solution: |
  \begin{figure}[htbp]
    \centering
    \includegraphics[width=5cm]{cat}
    \caption{A cat.}
    \label{fig:cat}
  \end{figure}
```

```quiz
question: "Why shouldn't you write 'see the figure below'?"
options:
  - "Figures float, so LaTeX may place it somewhere else, like the next page."
  - "LaTeX doesn't allow the word 'below'."
  - "Figures are always at the end of the document."
answer: 0
explain: "Use Figure~\\ref{...}, which is correct wherever the figure lands."
```
