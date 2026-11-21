---
title: Alignment and minipages
icon: "⬌"
branch: structure
requires: [environments, spacing]
summary: center, flushleft, flushright, \centering and side-by-side minipages.
---
Paragraphs are justified by default: both edges are straight. Three environments change that:

```latex
\begin{center} Centred text. \end{center}
\begin{flushleft} Ragged right, aligned left. \end{flushleft}
\begin{flushright} Aligned to the right. \end{flushright}
```

Inside another environment, like a figure, use the declarations `\centering`, `\raggedright` and `\raggedleft` instead. They don't add extra vertical space the way `center` does.

## Minipages

A `minipage` is a small page inside the page, with its own width. Put two side by side to make columns:

```latex
\noindent
\begin{minipage}[t]{0.48\textwidth}
  \textbf{Pros}
  \begin{itemize}
    \item Fast
    \item Free
  \end{itemize}
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
  \textbf{Cons}
  \begin{itemize}
    \item Steep learning curve
  \end{itemize}
\end{minipage}
```

- The width is usually a fraction of `\textwidth`, the width of the text area.
- `[t]` aligns the tops of the minipages. `[c]` (the default) aligns their centres, and `[b]` their bottoms.
- The `%` or `\hfill` between them matters: a blank line would start a new paragraph and put them under each other.

Two `0.5\textwidth` boxes plus a space between them are just too wide, so use slightly less, like `0.48`.

```compare javascript
// minipages side by side are like two flex children:
// <div style="display:flex; justify-content:space-between">
//   <div style="width:48%">...</div><div style="width:48%">...</div>
// </div>
```

```exercise
goal: "Put the two minipages side by side by aligning their tops with `[t]`, and use 0.45 of the text width for each."
code: |
  \begin{minipage}{0.6\textwidth}
  Left
  \end{minipage}\hfill
  \begin{minipage}{0.6\textwidth}
  Right
  \end{minipage}
checks:
  - match: '\\begin\{minipage\}\[t\]\{0?\.45\\textwidth\}[\s\S]*\\begin\{minipage\}\[t\]\{0?\.45\\textwidth\}'
    message: "Use \\begin{minipage}[t]{0.45\\textwidth} for both."
solution: |
  \begin{minipage}[t]{0.45\textwidth}
  Left
  \end{minipage}\hfill
  \begin{minipage}[t]{0.45\textwidth}
  Right
  \end{minipage}
```

```quiz
question: "Why use `\\centering` instead of the center environment inside a figure?"
options:
  - "center adds extra vertical space around itself; \\centering doesn't."
  - "center doesn't work inside figures."
  - "\\centering also adds a caption."
answer: 0
explain: "Both centre their contents, but center is a list-like environment with space above and below."
```
