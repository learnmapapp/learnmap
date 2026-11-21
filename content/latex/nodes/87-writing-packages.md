---
title: Writing a package
icon: "🎁"
branch: macros
requires: [document-commands, newenvironment]
summary: Move your macros into a .sty file, with options and internal @ names.
---
When your preamble grows, or you want the same commands in several documents, move them into your own [[package]]. A package is a `.sty` file next to your document:

```latex title=quill.sty
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{quill}[2026/11/22 v1.0 Quill's document helpers]

\RequirePackage{xcolor}
\RequirePackage{tcolorbox}

% Options: \usepackage[draft]{quill}
\newif\ifquill@draft
\DeclareOption{draft}{\quill@drafttrue}
\ProcessOptions\relax

\definecolor{quill@accent}{HTML}{3D8B5F}

\NewDocumentCommand{\keyword}{m}{\textcolor{quill@accent}{\texttt{#1}}}
\newtcolorbox{note}{colframe=quill@accent, colback=quill@accent!5}

\newcommand{\todo}[1]{\ifquill@draft\textcolor{red}{[TODO: #1]}\fi}

\endinput
```

```latex title=main.tex
\documentclass{article}
\usepackage[draft]{quill}
\begin{document}
Use \keyword{for} loops. \todo{add an example}
\end{document}
```

## What's in a package

- `\ProvidesPackage{name}[date version description]` identifies it. The name must match the file name.
- `\RequirePackage` is `\usepackage` for packages.
- `\DeclareOption` and `\ProcessOptions\relax` handle the options in square brackets.
- `\endinput` marks the end.

## The @ in internal names

Inside a `.sty` file, `@` counts as a letter, so names like `\quill@draft` are allowed. Users can't type them by accident in a document, so they're safe for internal helpers. All of LaTeX's own internals use them, like `\@title`.

To use or change such a command in a document's preamble, switch `@` to a letter temporarily:

```latex
\makeatletter
\renewcommand{\@seccntformat}[1]{\csname the#1\endcsname.\quad}   % "1." instead of "1"
\makeatother
```

## Sharing it

- Put a package in the same folder as the document, or in your personal texmf tree (`kpsewhich -var-value TEXMFHOME` shows where), to use it everywhere.
- Classes work the same, with `.cls`, `\ProvidesClass` and `\LoadClass{article}` to build on an existing class.
- To publish a package, upload it to CTAN, the Comprehensive TeX Archive Network, where TeX Live and MiKTeX get their packages.

```exercise
goal: "Give the package its identity line: `\\ProvidesPackage{notes}[2026/01/01 v1.0 My notes]`."
code: |
  \NeedsTeXFormat{LaTeX2e}

  \RequirePackage{xcolor}
  \newcommand{\hl}[1]{\colorbox{yellow}{#1}}
checks:
  - match: '\\ProvidesPackage\{notes\}\[2026/01/01 v1\.0 My notes\]'
    message: "Add \\ProvidesPackage{notes}[2026/01/01 v1.0 My notes]."
  - match: 'LaTeX2e\}\s*\\ProvidesPackage'
    message: Put it right after \NeedsTeXFormat.
solution: |
  \NeedsTeXFormat{LaTeX2e}
  \ProvidesPackage{notes}[2026/01/01 v1.0 My notes]
  \RequirePackage{xcolor}
  \newcommand{\hl}[1]{\colorbox{yellow}{#1}}
```

```quiz
question: "Why do package authors use names with @, like \\quill@draft?"
options:
  - "@ isn't a letter in documents, so users can't clash with these internal names by accident."
  - "@ makes the command global."
  - "It's required by CTAN."
answer: 0
explain: "Only inside .sty files (or after \\makeatletter) is @ treated as a letter."
```
