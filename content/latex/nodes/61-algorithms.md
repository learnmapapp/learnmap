---
title: Pseudocode
icon: "🧮"
branch: packages
requires: [code-listings, figures]
summary: Algorithms with algpseudocode, inside an algorithm float.
---
Computer science papers describe algorithms in pseudocode. The `algorithm` and `algpseudocode` packages typeset it with bold keywords and indentation:

```latex
\usepackage{algorithm}
\usepackage{algpseudocode}

\begin{algorithm}[htbp]
  \caption{Euclid's algorithm}\label{alg:euclid}
  \begin{algorithmic}[1]   % [1]: number every line
    \Procedure{Euclid}{$a, b$}
      \While{$b \neq 0$}
        \State $r \gets a \bmod b$
        \State $a \gets b$
        \State $b \gets r$
      \EndWhile
      \State \Return $a$ \Comment{the greatest common divisor}
    \EndProcedure
  \end{algorithmic}
\end{algorithm}
```

- `algorithm` is a float, like `figure`, with a caption and number.
- `algorithmic` contains the steps. Each plain line starts with `\State`.
- Blocks come in pairs: `\If{...}` ... `\ElsIf{...}` ... `\Else` ... `\EndIf`, `\For{...}` ... `\EndFor`, `\While` ... `\EndWhile`, `\Function` ... `\EndFunction`.
- `\Call{Name}{args}` calls a procedure, and `\Comment{...}` adds a right-aligned comment.

The steps are in maths mode where needed, so `\gets` gives ← and `\bmod` gives "mod".

## Alternatives

`algorithm2e` is a popular package with a different syntax, closer to real code with semicolons. Pick one per document; they don't mix.

```exercise
goal: "Add an `\\If` block that returns `$x$` when `$x > 0$`, closed with `\\EndIf`."
code: |
  \begin{algorithmic}
    \Function{Positive}{$x$}
      \State \Return $0$
    \EndFunction
  \end{algorithmic}
checks:
  - match: '\\If\{\$x > 0\$\}\s*\\State \\Return \$x\$\s*\\EndIf'
    message: "Add \\If{$x > 0$} \\State \\Return $x$ \\EndIf."
solution: |
  \begin{algorithmic}
    \Function{Positive}{$x$}
      \If{$x > 0$}
        \State \Return $x$
      \EndIf
      \State \Return $0$
    \EndFunction
  \end{algorithmic}
```

```quiz
question: "What does `\\begin{algorithmic}[1]` do?"
options:
  - "Numbers every line."
  - "Starts at step 1 and ignores the rest."
  - "Limits the algorithm to one page."
answer: 0
explain: "The number says how often to print line numbers: every 1 line."
```
