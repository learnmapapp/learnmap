---
title: Step-by-step slides
icon: "🎞️"
branch: tools
requires: [beamer]
summary: \pause, overlay specifications like <2->, and \only vs \onslide.
---
A frame can reveal its content in steps. Each step becomes a separate PDF page, so clicking "next" in a PDF viewer looks like an animation.

```latex
\begin{frame}{Building up}
  First this.
  \pause
  Then this.
  \pause
  And finally this.
\end{frame}
```

`\pause` is the simplest: everything after it appears one step later.

## Overlay specifications

Many commands take a step number in angle brackets:

```latex
\begin{frame}{A list, one by one}
  \begin{itemize}
    \item<1-> Always visible from step 1
    \item<2-> Appears at step 2
    \item<3> Only on step 3
    \item<2,4> On steps 2 and 4
  \end{itemize}
  \alert<3>{Highlighted on step 3}
\end{frame}
```

| Spec | Steps |
| --- | --- |
| `<2>` | only 2 |
| `<2->` | 2 and later |
| `<-3>` | up to 3 |
| `<2-4>` | 2 to 4 |
| `<+->` | the next step; each use counts up |

`\begin{itemize}[<+->]` reveals every item one at a time, without numbering them by hand.

## Showing and hiding

```latex
\begin{frame}{Two ways}
  \onslide<2->{Takes up space from the start, visible from step 2.}

  \only<1>{Shown on step 1.}\only<2>{Replaces it on step 2.}

  \uncover<3>{Like onslide.} \visible<3>{Also like onslide.}
\end{frame}
```

- `\onslide`, `\uncover` and `\visible` keep the space reserved, so nothing jumps.
- `\only` takes no space when hidden, so the content below can move.
- `\alt<2>{on step 2}{otherwise}` shows one or the other.

TikZ commands accept overlays too: `\draw<2->[red] (0,0) -- (1,1);`.

```exercise
goal: "Make the second item appear at step 2 and later with `\\item<2->`."
code: |
  \begin{frame}{Plan}
    \begin{itemize}
      \item Write
      \item Rewrite
    \end{itemize}
  \end{frame}
checks:
  - match: '\\item<2->\s*Rewrite'
    message: "Write \\item<2-> Rewrite."
solution: |
  \begin{frame}{Plan}
    \begin{itemize}
      \item Write
      \item<2-> Rewrite
    \end{itemize}
  \end{frame}
```

```quiz
question: "What's the difference between \\only and \\onslide?"
options:
  - "\\only takes no space when hidden; \\onslide keeps the space."
  - "\\only works on one slide only; \\onslide works on all."
  - "They are identical."
answer: 0
explain: "Use \\onslide (or \\uncover) to avoid content jumping around between steps."
```
