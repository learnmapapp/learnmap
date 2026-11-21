---
title: Slides with Beamer
icon: "📽️"
kind: hub
branch: tools
requires: [document-classes, lists, images]
summary: Presentations with the beamer class, frames and blocks.
---
`beamer` is a document class for presentations. Each slide is a `frame`:

```latex title=talk.tex
\documentclass{beamer}
\usetheme{default}

\title{Typesetting with \LaTeX}
\author{Quill}
\date{\today}

\begin{document}

\begin{frame}
  \titlepage
\end{frame}

\begin{frame}{Why LaTeX?}
  \begin{itemize}
    \item Beautiful maths: $e^{i\pi} + 1 = 0$
    \item References that update themselves
    \item Plain text, so it works with Git
  \end{itemize}
\end{frame}

\begin{frame}{Two columns}
  \begin{columns}
    \column{0.5\textwidth}
      Text on the left.
    \column{0.5\textwidth}
      \includegraphics[width=\linewidth]{photo}
  \end{columns}
\end{frame}

\end{document}
```

- `\begin{frame}{Title}` makes a slide with a title. `\frametitle{...}` also works.
- `\titlepage` builds a title slide from `\title`, `\author` and `\date`.
- `columns` and `\column{width}` split a slide side by side.
- Slides are 4:3 by default. For widescreen, use `\documentclass[aspectratio=169]{beamer}`.

## Blocks

Blocks are coloured boxes with a title, in the theme's style:

```latex
\begin{frame}{Results}
  \begin{block}{Finding}
    It works.
  \end{block}
  \begin{alertblock}{Careful}
    Only on Tuesdays.
  \end{alertblock}
  \begin{exampleblock}{Example}
    $1 + 1 = 2$
  \end{exampleblock}
\end{frame}
```

Theorems (`theorem`, `definition`, `proof`) are predefined in beamer and look like blocks.

## Sections

`\section{...}` works between frames. It doesn't make a slide, but themes show sections in navigation bars, and `\tableofcontents` in a frame gives an outline slide.

```tip
Code with verbatim or lstlisting inside a frame needs \begin{frame}[fragile].
```

```exercise
goal: "Add a second frame with the title `Summary` containing the text `Thanks!`."
code: |
  \documentclass{beamer}
  \begin{document}
  \begin{frame}{Hello}
    First slide.
  \end{frame}
  \end{document}
checks:
  - match: '\\begin\{frame\}\{Summary\}\s*Thanks!\s*\\end\{frame\}'
    message: "Add \\begin{frame}{Summary} Thanks! \\end{frame}."
solution: |
  \documentclass{beamer}
  \begin{document}
  \begin{frame}{Hello}
    First slide.
  \end{frame}
  \begin{frame}{Summary}
    Thanks!
  \end{frame}
  \end{document}
```

```quiz
question: "Which frame option is needed for verbatim code on a slide?"
options:
  - "fragile"
  - "verbatim"
  - "plain"
answer: 0
explain: "fragile makes beamer process the frame in a way that allows verbatim content."
```
