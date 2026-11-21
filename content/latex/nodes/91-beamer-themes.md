---
title: Beamer themes
icon: "🎭"
branch: tools
requires: [beamer-overlays, colors]
summary: Themes, colour and font themes, the metropolis look, and handouts.
---
A theme changes the whole look of a presentation:

```latex title=themed.tex
\documentclass[aspectratio=169]{beamer}
\usetheme{Madrid}           % layout: headers, footers, blocks
\usecolortheme{beaver}      % colours
\usefonttheme{professionalfonts}

\title{Themes}
\author{Quill}
\begin{document}
\begin{frame}
  \titlepage
\end{frame}
\begin{frame}{A slide}
  \begin{block}{A block}
    Styled by the theme.
  \end{block}
\end{frame}
\end{document}
```

Built-in themes are named after cities: `Madrid`, `Berlin`, `Warsaw`, `CambridgeUS`, `Boadilla` and more. Colour themes are named after animals and plants: `beaver`, `dolphin`, `crane`, `orchid`. Search for "beamer theme matrix" to see them all side by side.

## Metropolis

Many modern talks use the clean `metropolis` theme:

```latex title=modern.tex
% !TeX program = lualatex
\documentclass[aspectratio=169]{beamer}
\usetheme{metropolis}
\title{Clean and simple}
\begin{document}
\begin{frame}
  \titlepage
\end{frame}
\section{Introduction}
\begin{frame}{Flat design}
  Few colours, lots of space.
\end{frame}
\end{document}
```

With XeLaTeX or LuaLaTeX it uses the Fira fonts when they are installed; with pdfLaTeX, the default font.

## Changing details

You can adjust any theme with `\setbeamercolor`, `\setbeamerfont` and `\setbeamertemplate`:

```latex
\definecolor{brand}{HTML}{3D8B5F}
\setbeamercolor{structure}{fg=brand}           % titles, bullets
\setbeamercolor{frametitle}{bg=brand, fg=white}
\setbeamerfont{frametitle}{series=\bfseries}
\setbeamertemplate{navigation symbols}{}       % hide the little icons
\setbeamertemplate{footline}[frame number]
```

## Handouts

`\documentclass[handout]{beamer}` collapses all overlay steps into one page per frame, for printing or sharing. The `pgfpages` package can then put several slides on one sheet.

```exercise
goal: "Use the `Berlin` theme with the `dolphin` colour theme, and hide the navigation symbols."
code: |
  \documentclass{beamer}
  \begin{document}
  \begin{frame}{Hi}Hello\end{frame}
  \end{document}
checks:
  - match: '\\usetheme\{Berlin\}'
    message: "Add \\usetheme{Berlin}."
  - match: '\\usecolortheme\{dolphin\}'
    message: "Add \\usecolortheme{dolphin}."
  - match: '\\setbeamertemplate\{navigation symbols\}\{\}'
    message: "Add \\setbeamertemplate{navigation symbols}{}."
solution: |
  \documentclass{beamer}
  \usetheme{Berlin}
  \usecolortheme{dolphin}
  \setbeamertemplate{navigation symbols}{}
  \begin{document}
  \begin{frame}{Hi}Hello\end{frame}
  \end{document}
```

```quiz
question: "What does the handout class option do?"
options:
  - "Shows each frame once, with all overlay steps combined."
  - "Adds speaker notes."
  - "Prints in black and white."
answer: 0
explain: "Great for printing: no repeated pages for each \\pause."
```
