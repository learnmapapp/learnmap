---
title: Splitting into files
icon: "🗃️"
branch: structure
requires: [sections]
summary: \input, \include and \includeonly for large documents.
---
A thesis or book in one file gets unwieldy. Split it up and pull the pieces in from a main file:

```latex title=thesis.tex
\documentclass{report}
\input{preamble}          % reads preamble.tex right here

\begin{document}
\include{chapters/intro}  % chapters/intro.tex
\include{chapters/method}
\include{chapters/results}
\end{document}
```

```latex title=chapters/intro.tex
\chapter{Introduction}
Why this thesis exists.
```

## \input or \include?

- `\input{file}` pastes the file's contents in place, as if you'd typed them there. Use it for anything: preamble settings, a table, a section.
- `\include{file}` is for chapters. It starts a new page, and it lets you use `\includeonly`.

## Compiling only some chapters

Put this in the preamble to compile only the chapter you're working on. Page numbers and references to the other chapters stay correct, because LaTeX keeps their old `.aux` files:

```latex
\includeonly{chapters/method}
```

## Paths

Paths are relative to the main file, use forward slashes on every system, and you leave out `.tex`. Avoid spaces in file names.

```compare python
# \input is like pasting the file in place, closer to exec(open(...).read())
# than to import: there are no separate namespaces.
```

```exercise
goal: "Include the chapter files `ch1` and `ch2` with `\\include`, and compile only `ch2`."
code: |
  \documentclass{report}
  \begin{document}
  \end{document}
checks:
  - match: '\\include\{ch1\}[\s\S]*\\include\{ch2\}'
    message: Include ch1 and then ch2 in the document body.
  - match: '\\includeonly\{ch2\}[\s\S]*\\begin\{document\}'
    message: "Add \\includeonly{ch2} in the preamble."
solution: |
  \documentclass{report}
  \includeonly{ch2}
  \begin{document}
  \include{ch1}
  \include{ch2}
  \end{document}
```

```quiz
question: "What's the difference between `\\input` and `\\include`?"
options:
  - "\\include starts a new page and works with \\includeonly; \\input just pastes the file in."
  - "\\input is only for images."
  - "There is no difference."
answer: 0
explain: "Use \\include for chapters and \\input for everything else."
```
