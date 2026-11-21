---
title: Your own environments
icon: "📦"
branch: macros
requires: [command-arguments, environments]
summary: \newenvironment with begin and end code, and arguments.
---
An environment has code that runs at `\begin` and code that runs at `\end`. `\newenvironment` takes both:

```latex
\newenvironment{important}
  {\par\medskip\noindent\textbf{Important:}\itshape}  % begin code
  {\par\medskip}                                     % end code

\begin{important}
  Save your work before compiling.
\end{important}
```

The begin and end code run in a **group**, so font changes like `\itshape` end automatically with the environment.

## Arguments

Arguments work like `\newcommand`, and can only be used in the begin code:

```latex
\newenvironment{exercise}[1][Exercise]
  {\par\smallskip\noindent\textbf{#1.}\ }
  {\par\smallskip}

\begin{exercise}
  Prove it.
\end{exercise}
\begin{exercise}[Challenge]
  Prove it faster.
\end{exercise}
```

To use an argument in the end code, save it in a macro in the begin code, or use `\NewDocumentEnvironment`, where arguments are available in both parts.

## Wrapping other environments

The most common use is to give a combination a name:

```latex
\newenvironment{centredfigure}
  {\begin{figure}[htbp]\centering}
  {\end{figure}}
```

For boxed environments, `\newtcolorbox` (tcolorbox lesson) is usually easier; for theorem-like ones, `\newtheorem`.

```exercise
goal: "Define an environment `quote2` that starts with `\\begin{quote}\\small` and ends with `\\end{quote}`."
code: |
  \begin{document}
  \begin{quote2}
    Short is sweet.
  \end{quote2}
  \end{document}
checks:
  - match: '\\newenvironment\{quote2\}\s*\{\\begin\{quote\}\\small\}\s*\{\\end\{quote\}\}'
    message: "Add \\newenvironment{quote2}{\\begin{quote}\\small}{\\end{quote}}."
solution: |
  \newenvironment{quote2}{\begin{quote}\small}{\end{quote}}
  \begin{document}
  \begin{quote2}
    Short is sweet.
  \end{quote2}
  \end{document}
```

```quiz
question: "Why does a font change in an environment's begin code stop at \\end?"
options:
  - "Environments are groups, and declarations end with the group."
  - "The end code resets all fonts."
  - "It doesn't stop."
answer: 0
explain: "\\begin starts a group and \\end closes it, so local changes are undone."
```
