---
title: "Project: a research paper"
icon: "🧪"
branch: references
requires: [title-page, cleveref, bibliography, figures, align]
summary: Put structure, maths, figures, references and a bibliography together.
---
Time to combine what you've learned into a complete short paper. This is a solid starting template for real work:

```latex title=paper.tex
\documentclass[11pt,a4paper]{article}

% Layout and fonts
\usepackage[margin=2.5cm]{geometry}
\usepackage[T1]{fontenc}
\usepackage{lmodern,microtype}

% Content
\usepackage{amsmath,amssymb,amsthm}
\usepackage{graphicx,booktabs}
\usepackage[style=numeric-comp]{biblatex}
\addbibresource{refs.bib}

% Links last
\usepackage[hidelinks]{hyperref}
\usepackage[capitalise]{cleveref}

\newtheorem{theorem}{Theorem}

\title{Fast Sums of Consecutive Integers}
\author{Ada Lovelace\thanks{Analytical Engine Society}}
\date{\today}

\begin{document}
\maketitle

\begin{abstract}
We revisit a classic identity and measure how much faster it is than a loop.
\end{abstract}

\section{Introduction}\label{sec:intro}
Typesetting maths well is hard \cite{knuth1984}. In \cref{sec:method} we prove
\cref{thm:gauss}, and \cref{tab:timing} shows the results.

\section{Method}\label{sec:method}
\begin{theorem}\label{thm:gauss}
For every $n \geq 1$,
\begin{equation}\label{eq:gauss}
  \sum_{i=1}^{n} i = \frac{n(n+1)}{2}.
\end{equation}
\end{theorem}

\begin{proof}
Write the sum forwards and backwards and add: each of the $n$ columns sums to $n+1$.
\end{proof}

\section{Results}
\begin{table}[htbp]
  \centering
  \caption{Time to sum $1, \ldots, n$.}
  \label{tab:timing}
  \begin{tabular}{lrr}
    \toprule
    $n$ & Loop (ms) & \Cref{eq:gauss} (ms) \\
    \midrule
    $10^3$ & 0.01 & 0.001 \\
    $10^6$ & 9.80 & 0.001 \\
    \bottomrule
  \end{tabular}
\end{table}

\printbibliography
\end{document}
```

## What to notice

- The preamble is grouped by purpose, with `hyperref` and `cleveref` last.
- Every number in the text, the section, theorem, equation and table, comes from a label.
- The bibliography comes from `refs.bib`, so adding a citation is one `\cite`.

Build it with `latexmk -pdf paper` (see the latexmk lesson) and you get a numbered, linked, cited paper.

```tip
Many journals publish their own class or template. Start from that, and add your own packages carefully.
```

```exercise
goal: "Add a Conclusion section labelled `sec:conclusion` before the bibliography, which refers back to the introduction with `\\cref{sec:intro}`."
code: |
  \section{Results}
  It was fast.

  \printbibliography
checks:
  - match: '\\section\{Conclusion\}\s*\\label\{sec:conclusion\}'
    message: "Add \\section{Conclusion}\\label{sec:conclusion}."
  - match: '\\cref\{sec:intro\}'
    message: "Refer to the introduction with \\cref{sec:intro}."
  - match: '\\section\{Conclusion\}[\s\S]*\\printbibliography'
    message: Put the conclusion before \printbibliography.
solution: |
  \section{Results}
  It was fast.

  \section{Conclusion}\label{sec:conclusion}
  As \cref{sec:intro} promised, the formula wins.

  \printbibliography
```

```quiz
question: "Why does the template load hyperref and cleveref at the very end?"
options:
  - "They redefine commands from other packages, and cleveref must follow hyperref."
  - "Packages at the end load faster."
  - "LaTeX requires alphabetical order."
answer: 0
explain: "Load order matters for packages that change others; these two should be last, in this order."
```
