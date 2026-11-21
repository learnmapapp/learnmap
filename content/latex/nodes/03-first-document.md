---
title: Your first document
icon: "📝"
branch: basics
requires: [setup]
summary: The document class, the preamble and the document body.
---
Every LaTeX document has the same three parts:

```latex title=first.tex
\documentclass{article}   % 1. what kind of document this is

% 2. the preamble: settings and packages
\usepackage{amsmath}

\begin{document}          % 3. the body: your actual content
This is my first document.

It has two paragraphs.
\end{document}
```

1. `\documentclass{article}` comes first. It picks the [[document class]], which sets the general layout. `article` is the one you'll use most.
2. Everything between the class and `\begin{document}` is the [[preamble]]. Here you load packages and change settings. Nothing in the preamble is printed.
3. Everything between `\begin{document}` and `\end{document}` is the content. Anything after `\end{document}` is ignored.

## Comments

A `%` starts a comment that runs to the end of the line. LaTeX ignores it completely. Comments are handy for notes to yourself, and for temporarily switching off a line.

## Blank lines matter

In the body, a single line break is treated like a space. A **blank line** starts a new paragraph. So you can wrap your source text however you like:

```latex
This sentence is written
over three lines
but prints as one line.

This is a new paragraph.
```

Many people write one sentence per line. It makes diffs in version control much easier to read.

```compare javascript
// The structure is a bit like an HTML page:
// <!DOCTYPE html>  ~ \documentclass{article}
// <head>...</head> ~ the preamble
// <body>...</body> ~ \begin{document} ... \end{document}
```

```exercise
goal: "Add a second paragraph that says `Goodbye.`, separated from the first by a blank line."
code: |
  \documentclass{article}
  \begin{document}
  Hello.
  \end{document}
checks:
  - match: 'Hello\.\s*\n\s*\n\s*Goodbye\.'
    message: Put Goodbye. after a blank line.
  - match: 'Goodbye\.\s*\\end\{document\}'
    message: Keep \end{document} last.
solution: |
  \documentclass{article}
  \begin{document}
  Hello.

  Goodbye.
  \end{document}
```

```quiz
question: "Where do you load packages?"
options:
  - "In the preamble, before \\begin{document}."
  - "After \\end{document}."
  - "Anywhere in the body."
answer: 0
explain: "Packages are loaded with \\usepackage in the preamble, between \\documentclass and \\begin{document}."
```
