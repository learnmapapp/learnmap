---
title: Taming floats
icon: "🎈"
branch: floats
requires: [figures]
summary: Why figures end up far away, and how to control them.
---
LaTeX places floats with a set of rules: how much of a page may be floats, how many floats may be at the top, and so on. Most surprises come from those rules.

## Common problems

**My figure went to the end of the document.** Usually it's too big for the space LaTeX allows for top or bottom floats, so it waits for a float-only page. Try `[htbp]` instead of `[h]`, or make the image a bit smaller.

**Figures are out of order.** They can't be. Figures stay in order among themselves, so one stuck figure holds back all later ones. Fix the first one.

**I only wrote `[h]`.** That's very restrictive. If "here" doesn't fit, LaTeX changes it to `[ht]` and warns you. Give it more options.

## Tools

```latex
\usepackage{float}       % adds [H]: exactly here, no floating
\usepackage{placeins}    % adds \FloatBarrier

\section{Results}
\begin{figure}[H]
  \centering
  \includegraphics[width=4cm]{plot}
  \caption{Placed exactly here.}
\end{figure}
\FloatBarrier            % floats can't move past this point
\section{Discussion}
```

- `[!htbp]` tells LaTeX to relax its limits for this float.
- `\clearpage` prints all pending floats on new pages.
- `\usepackage[section]{placeins}` puts a barrier at every section.

## Relaxing the rules

These settings in the preamble make LaTeX more willing to put floats on text pages:

```latex
\renewcommand{\topfraction}{0.85}      % up to 85% of a page for top floats
\renewcommand{\textfraction}{0.1}      % only 10% text required
\renewcommand{\floatpagefraction}{0.75}
```

```tip
Write first, place floats last. Their positions change every time you edit the text, so fine-tuning them early is wasted effort.
```

```exercise
goal: "Let LaTeX place this figure anywhere, trying harder than usual, with `[!htbp]`."
code: |
  \begin{figure}[h]
    \centering
    \includegraphics[width=4cm]{plot}
    \caption{Results.}
  \end{figure}
checks:
  - match: '\\begin\{figure\}\[!htbp\]'
    message: "Use \\begin{figure}[!htbp]."
solution: |
  \begin{figure}[!htbp]
    \centering
    \includegraphics[width=4cm]{plot}
    \caption{Results.}
  \end{figure}
```

```quiz
question: "One figure is stuck and all later figures are at the end too. Why?"
options:
  - "Figures stay in order, so the stuck one holds back the others."
  - "LaTeX only allows one figure per chapter."
  - "The later figures have errors."
answer: 0
explain: "Floats of the same kind can't overtake each other. Fix the first stuck one."
```
