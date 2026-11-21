---
title: Command arguments
icon: "🧩"
branch: macros
requires: [newcommand]
summary: Arguments #1 to #9, optional arguments, and % at the end of lines.
---
Put the number of arguments in square brackets. In the definition, `#1`, `#2` and so on stand for them:

```latex
\newcommand{\keyword}[1]{\textbf{\texttt{#1}}}
\newcommand{\vect}[2]{\begin{pmatrix} #1 \\ #2 \end{pmatrix}}

Use \keyword{for} to loop, and add $\vect{1}{2} + \vect{3}{4}$.
```

A command can take up to **nine** arguments. Every argument is just text that gets pasted in where its `#` appears, and the result is read again. That's why arguments can be numbers, lengths or other commands.

## An optional argument

A second number in square brackets gives the **first** argument a default value. It becomes optional, and is written in square brackets when used:

```latex
\newcommand{\greet}[2][Hello]{#1, #2!}

\greet{world}        % Hello, world!
\greet[Goodbye]{world} % Goodbye, world!
```

Only the first argument can be optional with `\newcommand`. For more flexibility, see the next lesson.

## Long definitions and the % trick

Definitions can span several lines. But a line break counts as a space, and spaces inside a definition appear in the output. End lines with `%` to remove them:

```latex
\newcommand{\badge}[1]{
  \fbox{#1}
}
\newcommand{\goodbadge}[1]{%
  \fbox{#1}%
}

[\badge{x}] vs [\goodbadge{x}]   % the first has spaces around the box
```

The `%` comments out the line break. You'll see `%` at the end of many lines in macro-heavy files. That's why.

## Arguments with numbers

Inside a definition you can combine arguments with units. If `#3` is `215`, then `#3bp` becomes `215bp`, a length:

```latex
\newcommand{\databar}[2]{\textcolor{#1}{\rule{#2mm}{3mm}}}
\databar{red}{20}\par \databar{blue}{35}
```

```compare javascript
const greet = (name, greeting = 'Hello') => `${greeting}, ${name}!`;
```

```compare python
def greet(name, greeting="Hello"): return f"{greeting}, {name}!"
```

```exercise
goal: "Define `\\measure` with two arguments, so `\\measure{5}{kg}` prints the number, a thin space `\\,` and the unit: `5\\,kg`."
code: |
  \newcommand{\measure}{}
  \begin{document}
  It weighs \measure{5}{kg}.
  \end{document}
checks:
  - match: '\\newcommand\{\\measure\}\[2\]\{#1\\,#2\}'
    message: "Write \\newcommand{\\measure}[2]{#1\\,#2}."
solution: |
  \newcommand{\measure}[2]{#1\,#2}
  \begin{document}
  It weighs \measure{5}{kg}.
  \end{document}
```

```quiz
question: "Why do macro definitions often end lines with %?"
options:
  - "To stop the line breaks from becoming unwanted spaces in the output."
  - "Because % ends the definition."
  - "To make the macro faster."
answer: 0
explain: "A line break is a space; the % comments it out."
```
