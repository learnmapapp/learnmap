---
title: Lists
icon: "📋"
branch: basics
requires: [environments]
summary: itemize, enumerate and description lists, and nesting them.
---
LaTeX has three list environments. Each entry starts with `\item`:

```latex
\begin{itemize}
  \item Bullet points
  \item In any order
\end{itemize}

\begin{enumerate}
  \item First
  \item Second
\end{enumerate}

\begin{description}
  \item[TeX] The typesetting engine.
  \item[LaTeX] The macros on top of it.
\end{description}
```

## Nesting

Put a list inside an item to nest it. LaTeX changes the bullets and numbers automatically at each level, up to four levels deep:

```latex
\begin{enumerate}
  \item Prepare
  \begin{enumerate}
    \item Buy ingredients
    \item Preheat the oven
  \end{enumerate}
  \item Bake
\end{enumerate}
```

The inner list is numbered (a), (b).

## Custom labels

You can give a single item its own label in square brackets, like `\item[--]` or `\item[\checkmark]`. To change all the labels or the spacing, use the `enumitem` package, which has its own lesson.

```compare javascript
// itemize   ~ <ul>
// enumerate ~ <ol>
// \item     ~ <li>
```

```exercise
goal: "Turn the bullet list into a numbered list."
code: |
  \begin{itemize}
    \item Write
    \item Compile
    \item Read the PDF
  \end{itemize}
checks:
  - match: '\\begin\{enumerate\}'
    message: "Use \\begin{enumerate}."
  - match: '\\end\{enumerate\}'
    message: "Close it with \\end{enumerate}."
  - notMatch: 'itemize'
    message: Replace both itemize lines.
solution: |
  \begin{enumerate}
    \item Write
    \item Compile
    \item Read the PDF
  \end{enumerate}
```

```quiz
question: "Which list puts a bold term at the start of each item?"
options:
  - "description"
  - "itemize"
  - "enumerate"
answer: 0
explain: "In a description list, \\item[term] prints the term in bold."
```
