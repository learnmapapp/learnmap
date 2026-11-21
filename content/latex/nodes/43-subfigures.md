---
title: Subfigures
icon: "🎞️"
branch: floats
requires: [figures, alignment]
summary: Images side by side with their own captions, using subcaption.
---
To show several images in one figure, each with its own label (a), (b), use the `subcaption` package:

```latex
\usepackage{subcaption}

\begin{figure}[htbp]
  \centering
  \begin{subfigure}[b]{0.45\textwidth}
    \centering
    \includegraphics[width=\linewidth]{lake}
    \caption{Before.}
    \label{fig:before}
  \end{subfigure}
  \hfill
  \begin{subfigure}[b]{0.45\textwidth}
    \centering
    \includegraphics[width=\linewidth]{woods}
    \caption{After.}
    \label{fig:after}
  \end{subfigure}
  \caption{The lake before and after.}
  \label{fig:lake}
\end{figure}

Figure~\ref{fig:after} shows the result; the whole of Figure~\ref{fig:lake} compares both.
```

- Each `subfigure` is like a `minipage` with a width.
- Inside it, `\linewidth` is the width of the subfigure, so the image fills it.
- `\ref{fig:after}` prints "1b".
- `[b]` aligns the subfigures at their bottoms, so captions line up even if the images differ in height.

## Without separate captions

If you just want images side by side under one caption, you don't need `subfigure` at all:

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.3\textwidth]{lake}\hfill
  \includegraphics[width=0.3\textwidth]{woods}\hfill
  \includegraphics[width=0.3\textwidth]{trail}
  \caption{Three photos from the trip.}
\end{figure}
```

## Caption style

The `caption` package (loaded by `subcaption`) changes how captions look:

```latex
\captionsetup{font=small, labelfont=bf}
```

```exercise
goal: "Give the second subfigure the caption `Night.` and the label `fig:night`."
code: |
  \begin{figure}
    \begin{subfigure}{0.45\textwidth}
      \includegraphics[width=\linewidth]{lake}
      \caption{Day.}
    \end{subfigure}\hfill
    \begin{subfigure}{0.45\textwidth}
      \includegraphics[width=\linewidth]{woods}
    \end{subfigure}
    \caption{A day at the lake.}
  \end{figure}
checks:
  - match: '\{woods\}\s*\\caption\{Night\.\}\s*\\label\{fig:night\}\s*\\end\{subfigure\}'
    message: "Add \\caption{Night.} and \\label{fig:night} inside the second subfigure."
solution: |
  \begin{figure}
    \begin{subfigure}{0.45\textwidth}
      \includegraphics[width=\linewidth]{lake}
      \caption{Day.}
    \end{subfigure}\hfill
    \begin{subfigure}{0.45\textwidth}
      \includegraphics[width=\linewidth]{woods}
      \caption{Night.}
      \label{fig:night}
    \end{subfigure}
    \caption{A day at the lake.}
  \end{figure}
```

```quiz
question: "Inside a subfigure that is 0.45\\textwidth wide, what is \\linewidth?"
options:
  - "The width of the subfigure."
  - "The width of the whole page."
  - "Zero."
answer: 0
explain: "\\linewidth is the width of the current line, which inside a subfigure or minipage is that box's width."
```
