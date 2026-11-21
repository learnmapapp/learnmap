---
title: Reading errors
icon: "🚨"
branch: basics
requires: [first-document]
summary: How to read LaTeX's error messages and the log file.
---
LaTeX error messages look scary, but they follow a pattern. Here's a typo:

```latex title=broken.tex
\documentclass{article}
\begin{document}
This is \textbf{bold text.
\end{document}
```

```repl shell
> pdflatex broken.tex
! File ended while scanning use of \textbf.
<inserted text>
                \par
<*> broken.tex
```

The line starting with `!` is the error. Further down, a line like `l.3` gives the line number where LaTeX noticed the problem. Here, the brace after `\textbf` is never closed, so LaTeX reads to the end of the file looking for it.

## Common errors

| Message | Usual cause |
| --- | --- |
| `Undefined control sequence` | a typo in a command name, or a missing package |
| `Missing $ inserted` | a `_` or `^` outside maths, or maths commands in text |
| `Missing } inserted` / `Runaway argument` | an unbalanced brace |
| `Environment xyz undefined` | a misspelled environment or missing package |
| `File 'xyz.sty' not found` | the package isn't installed |
| `Misplaced alignment tab character &` | an unescaped `&` outside a table |

## Tips

- Fix the **first** error first. Later errors are often caused by the first one.
- The problem is often a line or two *before* the reported line.
- In an interactive run, type `x` and Enter to stop. Or run with `-interaction=nonstopmode` so LaTeX doesn't stop and ask.
- **Warnings** like `Overfull \hbox` (a line sticks out into the margin) or `Reference undefined` don't stop the build, but they're worth reading in the `.log` file.

```exercise
goal: "This gives `Undefined control sequence`. Fix the misspelled command."
code: |
  This is \textfb{very} important.
checks:
  - match: '\\textbf\{very\}'
    message: "The command for bold is \\textbf."
  - notMatch: 'textfb'
    message: Remove the typo.
solution: |
  This is \textbf{very} important.
```

```quiz
question: "You get `Missing $ inserted` on a line with `my_file.txt`. Why?"
options:
  - "The underscore is a maths character and must be escaped as \\_."
  - "File names aren't allowed in LaTeX."
  - "The line needs a $ at the end."
answer: 0
explain: "_ means subscript, which only exists in maths mode, so LaTeX tries to switch into maths. Write my\\_file.txt."
```
