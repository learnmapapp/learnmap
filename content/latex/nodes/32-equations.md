---
title: Numbered equations
icon: "🔢"
branch: math
requires: [math-mode, cross-references]
summary: The equation environment, labels, \eqref, \tag and unnumbered equations.
---
The `equation` environment displays a formula and numbers it. Label it to refer to it:

```latex
\begin{equation}\label{eq:euler}
  e^{i\pi} + 1 = 0
\end{equation}

Equation~\eqref{eq:euler} connects five constants.
```

`\eqref` (from `amsmath`) prints the number in parentheses, "(1)", the way equations are usually referenced.

## Unnumbered and custom numbers

```latex
\begin{equation*}
  a^2 + b^2 = c^2   % no number, same as \[ ... \]
\end{equation*}

\begin{equation}
  F = ma \tag{Newton}
\end{equation}
```

`\tag{...}` replaces the number with your own label.

## Numbering by section

In a long document you might want equations numbered (2.1), (2.2) within Section 2:

```latex
\numberwithin{equation}{section}
```

## Punctuation

A formula is part of a sentence. If the sentence ends with the equation, put the full stop inside it:

```latex
The energy is
\begin{equation}
  E = mc^2 .
\end{equation}
```

```exercise
goal: "Make this a numbered equation with the label `eq:pythagoras`, and refer to it with `\\eqref`."
code: |
  \[ a^2 + b^2 = c^2 \]
  As shown in the equation above.
checks:
  - match: '\\begin\{equation\}'
    message: "Use \\begin{equation} ... \\end{equation}."
  - match: '\\label\{eq:pythagoras\}'
    message: "Add \\label{eq:pythagoras} inside the equation."
  - match: '\\eqref\{eq:pythagoras\}'
    message: "Refer to it with \\eqref{eq:pythagoras}."
solution: |
  \begin{equation}\label{eq:pythagoras}
    a^2 + b^2 = c^2
  \end{equation}
  As shown in equation~\eqref{eq:pythagoras}.
```

```quiz
question: "What does `\\eqref{eq:x}` add compared with `\\ref{eq:x}`?"
options:
  - "Parentheses around the number, like (3)."
  - "The page number."
  - "The word Equation."
answer: 0
explain: "Equations are traditionally referenced as (3); \\eqref does that for you."
```
