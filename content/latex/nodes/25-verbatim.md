---
title: Verbatim text
icon: "🖥️"
branch: structure
requires: [environments, special-characters]
summary: Printing code and special characters exactly as typed.
---
Sometimes you want to print text exactly as it's typed, special characters and all. That's what verbatim is for:

```latex
Use \verb|\section{...}| to start a section.
The path is \verb+C:\Users\ada\notes_v2.tex+.

\begin{verbatim}
for i in range(3):
    print("100% sure & #1")
\end{verbatim}
```

- `\verb` takes any character as a delimiter. The text runs until the same character appears again. Pick one that isn't in your text, like `|` or `+`.
- The `verbatim` environment prints its contents in monospace, keeping line breaks and spaces.

## Limits

Verbatim text can't be used inside the argument of another command. `\section{\verb|x|}` or `\footnote{\verb|x|}` will fail, because the argument is read before `\verb` can change how characters are treated. For short code in those places, use `\texttt` and escape the special characters.

For URLs, use the `url` package (or `hyperref`) and write `\url{https://example.com/a_b%20c}`. It handles special characters and allows line breaks at sensible places.

For real source code with colours and line numbers, see the lesson on code listings.

```exercise
goal: "Print the shell command `rm -rf build_*` exactly as typed, using `\\verb` with `|` as the delimiter."
code: |
  Clean up with rm -rf build_* first.
checks:
  - match: '\\verb\|rm -rf build_\*\|'
    message: "Write \\verb|rm -rf build_*|."
solution: |
  Clean up with \verb|rm -rf build_*| first.
```

```quiz
question: "Where does `\\verb` not work?"
options:
  - "Inside the argument of another command, like \\footnote{...}"
  - "In a normal paragraph"
  - "At the start of a line"
answer: 0
explain: "Arguments are read before \\verb gets a chance to treat special characters literally."
```
