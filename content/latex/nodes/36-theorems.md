---
title: Theorems and proofs
icon: "📜"
branch: math
requires: [equations]
summary: amsthm's \newtheorem, theorem styles and the proof environment.
---
Mathematical writing has theorems, lemmas, definitions and proofs. The `amsthm` package lets you define them once in the preamble:

```latex title=theorems.tex
\documentclass{article}
\usepackage{amsmath,amsthm}

\newtheorem{theorem}{Theorem}[section]    % numbered 1.1, 1.2 within sections
\newtheorem{lemma}[theorem]{Lemma}        % shares the theorem counter
\theoremstyle{definition}
\newtheorem{definition}[theorem]{Definition}

\begin{document}
\section{Primes}

\begin{definition}
A \emph{prime} is a natural number greater than 1 with no divisors other than 1 and itself.
\end{definition}

\begin{theorem}[Euclid]\label{thm:primes}
There are infinitely many primes.
\end{theorem}

\begin{proof}
Suppose there are finitely many, $p_1, \ldots, p_n$. Then $p_1 p_2 \cdots p_n + 1$
has a prime factor that isn't in the list.
\end{proof}
\end{document}
```

## How \newtheorem works

`\newtheorem{name}[shared counter]{Printed name}[numbered within]`:

- `name` is the environment you'll use.
- An optional counter in the **middle** makes it share numbers with another kind, so you get Theorem 1.1, Lemma 1.2, Theorem 1.3.
- An optional argument at the **end** restarts numbering in each section.
- Use `\newtheorem*` for an unnumbered version.

## Styles

`\theoremstyle` applies to the theorems defined after it:

- `plain` (default): bold title, italic text. For theorems, lemmas and corollaries.
- `definition`: upright text. For definitions and examples.
- `remark`: italic title, upright text. For remarks and notes.

The `proof` environment ends with a ∎ box automatically. The text in square brackets after `\begin{theorem}` is a name or a source, printed in parentheses.

```exercise
goal: "Define a `corollary` environment, printed as `Corollary`, that shares the `theorem` counter."
code: |
  \newtheorem{theorem}{Theorem}
checks:
  - match: '\\newtheorem\{corollary\}\[theorem\]\{Corollary\}'
    message: "Add \\newtheorem{corollary}[theorem]{Corollary}."
solution: |
  \newtheorem{theorem}{Theorem}
  \newtheorem{corollary}[theorem]{Corollary}
```

```quiz
question: "In `\\newtheorem{lemma}[theorem]{Lemma}`, what does `[theorem]` do?"
options:
  - "Lemmas share the theorem counter, so they're numbered in one sequence."
  - "Lemmas are numbered within each theorem."
  - "Lemmas look exactly like theorems."
answer: 0
explain: "A counter in the middle position means: use that counter instead of creating a new one."
```
