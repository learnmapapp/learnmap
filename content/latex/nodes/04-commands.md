---
title: Commands
icon: "⌨️"
branch: basics
requires: [first-document]
summary: Backslash commands, required arguments in braces and optional ones in brackets.
---
A [[command]] starts with a backslash followed by letters. Some commands just produce something:

```latex
\LaTeX\ is fun.  % prints the LaTeX logo
Today is \today. % prints the current date
```

Most commands take an [[argument]] in curly braces:

```latex
This is \textbf{bold} and this is \emph{emphasised}.
\section{Introduction}
```

Some also take an **optional** argument in square brackets, before the required one:

```latex
\documentclass[12pt]{article}
\section[Short title]{A very long title that would not fit in the contents}
```

## Spaces after commands

LaTeX ignores the spaces after a command name, because they're used to tell where the name ends. So `\LaTeX is` prints "LaTeXis". There are two common fixes:

```latex
\LaTeX\ is great.   % a backslash-space forces a space
\LaTeX{} is great.  % empty braces end the command name
```

## Braces group things

Braces also make a **group**. Some commands, called declarations, change everything that follows until the end of the group:

```latex
Normal {\bfseries bold until here} normal again.
```

```compare python
# A command with an argument is like a function call:
#   \textbf{bold}     ~  textbf("bold")
#   \section[s]{long} ~  section("long", short="s")
```

```exercise
goal: "Make the word `important` bold with `\\textbf`."
code: |
  This is an important sentence.
checks:
  - match: '\\textbf\{important\}'
    message: "Wrap the word in \\textbf{...}."
solution: |
  This is an \textbf{important} sentence.
```

```quiz
question: "In `\\section[Intro]{Introduction to the topic}`, what is `Intro`?"
options:
  - "An optional argument"
  - "The required argument"
  - "A comment"
answer: 0
explain: "Square brackets hold optional arguments; braces hold required ones. Here the short title is used in the table of contents."
```
