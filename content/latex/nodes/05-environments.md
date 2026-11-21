---
title: Environments
icon: "📦"
branch: basics
requires: [commands]
summary: Regions between \begin{name} and \end{name}.
---
An [[environment]] wraps part of your document and changes how it's treated. It starts with `\begin{name}` and ends with `\end{name}`:

```latex
\begin{center}
  This text is centred.
\end{center}

\begin{quote}
  A short quotation, indented on both sides.
\end{quote}
```

You've already used one: `document`. Later you'll meet `itemize` for lists, `equation` for maths, `figure` for images and `tabular` for tables.

## Nesting

Environments can be nested, as long as they're closed in the reverse order they were opened:

```latex
\begin{center}
  \begin{tabular}{ll}
    Name & Age \\
    Ada  & 36
  \end{tabular}
\end{center}
```

If you close them in the wrong order you'll get an error like `\begin{center} ended by \end{tabular}`. That message tells you exactly which pair is mismatched.

## Arguments

Some environments take arguments right after `\begin{...}`, just like commands. Above, `{ll}` tells `tabular` that there are two left-aligned columns.

```tip
Indent the contents of an environment in your source. LaTeX ignores the extra spaces, and the structure becomes much easier to see.
```

```compare javascript
// \begin{center} ... \end{center} works like an HTML element:
// <div class="center"> ... </div>
```

```exercise
goal: "Put the sentence inside a `center` environment."
code: |
  The end.
checks:
  - match: '\\begin\{center\}\s*The end\.\s*\\end\{center\}'
    message: "Wrap the sentence in \\begin{center} ... \\end{center}."
solution: |
  \begin{center}
    The end.
  \end{center}
```

```quiz
question: "Which pair of lines is nested correctly?"
options:
  - "\\begin{a} \\begin{b} ... \\end{b} \\end{a}"
  - "\\begin{a} \\begin{b} ... \\end{a} \\end{b}"
  - "\\end{a} \\begin{a}"
answer: 0
explain: "The environment you opened last has to be closed first."
```
