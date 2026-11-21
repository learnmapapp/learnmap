---
title: Setting up LaTeX
icon: "🧰"
branch: basics
requires: [latex]
summary: TeX distributions, editors, Overleaf and the three engines.
---
To turn a `.tex` file into a PDF you need a **TeX distribution**: the programs plus thousands of packages and fonts.

| System | Distribution |
| --- | --- |
| macOS | MacTeX (TeX Live with a Mac installer) |
| Windows | MiKTeX or TeX Live |
| Linux | TeX Live, usually from your package manager |
| Browser | Overleaf, an online editor with everything installed |

Overleaf is the quickest way to start: nothing to install, and you can share a project with co-authors. A local install is better for offline work and your own editor.

```repl shell
> pdflatex hello.tex
This is pdfTeX, Version 3.141592653-2.6-1.40.28 (TeX Live 2026)
...
Output written on hello.pdf (1 page, 14562 bytes).
Transcript written on hello.log.
```

## Engines

The program that reads your file is called an [[engine]]. There are three you'll meet:

- **pdfLaTeX** is the classic default. It's fast and very stable, but works with 8-bit fonts, so you need packages for accented letters and special fonts.
- **XeLaTeX** reads Unicode directly and can use any font installed on your computer.
- **LuaLaTeX** also supports Unicode and system fonts, and has the Lua programming language built in. It's the modern recommendation for new documents that need custom fonts.

To pick an engine, run a different command (`pdflatex`, `xelatex` or `lualatex`), or put a comment at the top of the file that tells your editor which one to use:

```latex title=hello.tex
% !TeX program = lualatex
\documentclass{article}
\begin{document}
Hello from Lua\LaTeX!
\end{document}
```

The same document usually works with all three. You'll see the differences in the lessons on fonts and on PDF primitives.

## Extra files

A run creates helper files next to your PDF: `.aux` (labels and references), `.log` (everything that happened), `.toc` (the table of contents) and more. You can delete them at any time; LaTeX recreates them.

```tip
Editors like TeXstudio, VS Code with LaTeX Workshop, or IntelliJ with a TeX plugin rebuild the PDF on save and show it side by side.
```

```exercise
lang: shell
goal: "Write the command that builds `report.tex` with LuaLaTeX."
code: |
  pdflatex report.tex
checks:
  - match: '^lualatex\s+report\.tex\s*$'
    message: "Use the lualatex command followed by the file name."
solution: |
  lualatex report.tex
```

```quiz
question: "Which engine is the classic default and doesn't use system fonts directly?"
options:
  - "pdfLaTeX"
  - "XeLaTeX"
  - "LuaLaTeX"
answer: 0
explain: "XeLaTeX and LuaLaTeX can load system fonts and read Unicode directly; pdfLaTeX needs packages for that."
```
