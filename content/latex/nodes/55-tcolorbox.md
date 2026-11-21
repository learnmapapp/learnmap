---
title: Coloured boxes
icon: "🗳️"
branch: packages
requires: [colors]
summary: tcolorbox for callouts, notes and boxes that break across pages.
---
`tcolorbox` makes framed, coloured boxes: notes, warnings, exercises, definitions. It's one of the most versatile packages around.

```latex
\usepackage{tcolorbox}
\tcbuselibrary{skins, breakable}

\begin{tcolorbox}[colback=blue!5, colframe=blue!60!black, title=Note]
  Boxes can have a title, and any content: lists, maths, images.
\end{tcolorbox}

\begin{tcolorbox}[colback=yellow!10, colframe=orange, arc=0mm, boxrule=1pt]
  Square corners and a thin orange frame.
\end{tcolorbox}
```

## Your own box environments

Define a box once and reuse it. `\newtcolorbox` takes the same options:

```latex
\newtcolorbox{tip}[1][]{
  colback=green!5, colframe=green!50!black,
  fonttitle=\bfseries, title=Tip, #1
}

\begin{tip}
  Define boxes by meaning, like tip or warning.
\end{tip}

\begin{tip}[title=Pro tip]
  Extra options override the defaults.
\end{tip}
```

The `#1` at the end passes optional arguments through, so a single box can change its title or colours.

## Useful options

| Option | Effect |
| --- | --- |
| `colback`, `colframe` | background and frame colour |
| `title=...`, `fonttitle` | title bar and its font |
| `arc`, `boxrule` | corner radius and frame thickness |
| `left`, `right`, `top`, `bottom` | inner padding |
| `breakable` | let the box continue on the next page |
| `enhanced, drop shadow` | fancier drawing (skins library) |
| `sidebyside` | split into two parts, like code and output |

```exercise
goal: "Give the box the title `Warning`, a red frame (`red!70!black`) and a light red background (`red!5`)."
code: |
  \begin{tcolorbox}
    Hot surface.
  \end{tcolorbox}
checks:
  - match: '\\begin\{tcolorbox\}\[[^\]]*title\s*=\s*Warning'
    message: Add title=Warning.
  - match: '\\begin\{tcolorbox\}\[[^\]]*colframe\s*=\s*red!70!black'
    message: Add colframe=red!70!black.
  - match: '\\begin\{tcolorbox\}\[[^\]]*colback\s*=\s*red!5'
    message: Add colback=red!5.
solution: |
  \begin{tcolorbox}[title=Warning, colframe=red!70!black, colback=red!5]
    Hot surface.
  \end{tcolorbox}
```

```quiz
question: "What lets a tcolorbox continue onto the next page?"
options:
  - "The breakable option (from the breakable library)"
  - "Putting it inside a figure"
  - "It always breaks automatically"
answer: 0
explain: "By default a tcolorbox is one unbreakable box; breakable allows page breaks."
```
