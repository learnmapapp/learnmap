---
title: Drawing on the page
icon: "📌"
branch: tikz
requires: [tikz-clip-opacity, tikz-calc, page-layout]
summary: remember picture, overlay and current page for page-wide graphics.
---
Normally a `tikzpicture` sits in the text. With two options, it can draw anywhere on the page instead:

```latex
\begin{tikzpicture}[remember picture, overlay]
  \fill[blue!10] (current page.north west) rectangle ([yshift=-3cm]current page.north east);
  \node[anchor=north east, font=\Huge\bfseries] at ([xshift=-1cm, yshift=-1cm]current page.north east) {Report};
  \node[rotate=45, scale=6, text opacity=0.08] at (current page.center) {DRAFT};
\end{tikzpicture}
```

- `overlay` means the picture takes up no space, so it doesn't push text around.
- `remember picture` lets TikZ find where it is on the page. It needs **two runs**: the first saves positions to the `.aux` file, the second uses them.
- `current page` is a special node around the whole sheet, with anchors like `north west`, `center` and `south`.

This is how you make full-bleed title pages, coloured page edges, watermarks and posters.

## Pointing at text

`\tikzmark` (from the `tikzmark` library) or `\tikz[remember picture] \node (name) {...};` marks places in normal text, so you can draw arrows between them afterwards:

```latex
\usetikzlibrary{tikzmark}

Look \tikzmarknode{a}{here} and then over \tikzmarknode{b}{there}.
\begin{tikzpicture}[remember picture, overlay]
  \draw[->, red, thick] (a.south) to[bend right] (b.south);
\end{tikzpicture}
```

## On every page

For something on every page, like a background image, the `eso-pic` package runs code on each page. Combined with TikZ:

```latex
\usepackage{eso-pic}
\AddToShipoutPictureBG{%
  \begin{tikzpicture}[remember picture, overlay]
    \draw[gray, line width=4mm] (current page.south west) rectangle (current page.north east);
  \end{tikzpicture}%
}
```

LaTeX also has the newer `\AddToHook{shipout/background}{...}` for the same job.

## A whole page as a picture

You can lay out an entire page, like a collage, as one overlay picture: place photos at exact coordinates measured from `current page.south west`. The photo collage lesson does exactly that.

```exercise
goal: "Add the options `remember picture, overlay` and put the node at `current page.center`."
code: |
  \begin{tikzpicture}
    \node at (0,0) {Centred on the page};
  \end{tikzpicture}
checks:
  - match: '\\begin\{tikzpicture\}\[\s*remember picture,\s*overlay\s*\]'
    message: "Use \\begin{tikzpicture}[remember picture, overlay]."
  - match: '\\node at \(current page\.center\)'
    message: "Place the node at (current page.center)."
solution: |
  \begin{tikzpicture}[remember picture, overlay]
    \node at (current page.center) {Centred on the page};
  \end{tikzpicture}
```

```quiz
question: "Why do remember picture drawings need two LaTeX runs?"
options:
  - "The first run records positions in the .aux file; the second run uses them."
  - "TikZ draws half the picture on each run."
  - "They don't; one run is enough."
answer: 0
explain: "Like cross-references, page positions are only known after a page has been built once."
```
