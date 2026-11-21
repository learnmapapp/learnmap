---
title: Your own commands
icon: "🛠️"
kind: hub
branch: macros
requires: [commands, packages]
summary: Define macros with \newcommand, and why they make documents easier to change.
---
A [[macro]] is a command you define yourself. When LaTeX meets it, it replaces it with its definition. The simplest ones are shortcuts:

```latex
\newcommand{\project}{Learnmap}
\newcommand{\R}{\mathbb{R}}
\newcommand{\todo}{\textcolor{red}{\textbf{TODO}}}

\project{} works with any $x \in \R$. \todo
```

## Why bother?

- **Consistency.** If you write `\R` everywhere and later want a bold R instead of a blackboard R, you change one line.
- **Meaning.** `\keyword{for}` says *what* something is; `\textbf{for}` only says how it looks. You can change the look later without hunting for every bold word.
- **Less typing** for long, repeated pieces.

## Rules for names

- Names are letters only: `\myname` works, `\my2name` and `\my_name` don't.
- `\newcommand` refuses to overwrite an existing command, which protects you from accidentally breaking LaTeX. Use `\renewcommand` to change an existing one on purpose:

```latex
\renewcommand{\contentsname}{Overview}   % the table of contents heading
```

- `\providecommand` defines a command only if it doesn't exist yet.

## Spaces after commands

A command name ends at the first non-letter, and LaTeX swallows the spaces after it. So `\project works` prints "Learnmapworks". Write `\project{} works` or `\project\ works`. (The `xspace` package can add the space automatically, but most experts advise against it.)

## What's next

In this branch you'll go from simple shortcuts to commands with arguments, environments, counters, lengths and boxes, and finally down to plain TeX and raw PDF. By the end, you'll understand every line of a photo collage built entirely from code.

```compare javascript
// A macro without arguments is like a constant:
const project = 'Learnmap';
```

```compare python
PROJECT = "Learnmap"  # change it in one place
```

```exercise
goal: "Define a command `\\email` that prints `quill@example.com` in typewriter font (`\\texttt`), and use it in the sentence."
code: |
  \begin{document}
  Write to \texttt{quill@example.com}.
  \end{document}
checks:
  - match: '\\newcommand\{\\email\}\{\\texttt\{quill@example\.com\}\}'
    message: "Add \\newcommand{\\email}{\\texttt{quill@example.com}} before \\begin{document}."
  - match: 'Write to \\email'
    message: "Use \\email in the sentence."
solution: |
  \newcommand{\email}{\texttt{quill@example.com}}
  \begin{document}
  Write to \email.
  \end{document}
```

```quiz
question: "What happens if you \\newcommand a name that already exists?"
options:
  - "LaTeX stops with an error 'Command already defined'."
  - "The old command is silently replaced."
  - "Both versions are kept."
answer: 0
explain: "Use \\renewcommand to replace a command on purpose."
```
