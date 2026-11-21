---
title: Text styles
icon: "𝐁"
branch: basics
requires: [commands]
summary: Bold, italic, emphasis, monospace and small caps.
---
These commands change the style of the text in their argument:

```latex
\textbf{bold}, \textit{italic}, \texttt{monospace},
\textsc{Small Caps}, \textsf{sans serif}, \underline{underlined}.

You can \textbf{\textit{combine}} them.
```

## Prefer \emph

For emphasis, use `\emph` instead of `\textit`. It describes *why* the text is special, and it's smart: inside italic text it switches back to upright, so the emphasis still stands out.

```latex
Read the \emph{whole} manual.
\textit{In italic text, \emph{this} is upright.}
```

## Declarations

Each style also has a declaration form that applies until the end of the current group or environment: `\bfseries`, `\itshape`, `\ttfamily`, `\scshape`, `\sffamily`.

```latex
{\bfseries This whole sentence is bold. So is this one.} Back to normal.
```

Use the `\text...` commands for a few words, and the declarations for longer stretches or inside your own commands.

```compare javascript
// Like HTML, there's a structural tag (<em>) and visual ones (<i>, <b>):
// \emph{word}   ~  <em>word</em>
// \textbf{word} ~  <b>word</b>
```

```exercise
goal: "Emphasise the word `never` with `\\emph`, and put the command name `ls` in monospace with `\\texttt`."
code: |
  You should never run ls as root. (It's harmless, really.)
checks:
  - match: '\\emph\{never\}'
    message: "Use \\emph{never}."
  - match: '\\texttt\{ls\}'
    message: "Use \\texttt{ls}."
solution: |
  You should \emph{never} run \texttt{ls} as root. (It's harmless, really.)
```

```quiz
question: "Why use `\\emph` instead of `\\textit` for emphasis?"
options:
  - "It marks meaning, and automatically switches back to upright inside italic text."
  - "It makes text bold and italic at once."
  - "\\textit doesn't exist."
answer: 0
explain: "\\emph is a semantic command, and it toggles between italic and upright depending on its surroundings."
```
