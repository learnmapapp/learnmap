---
title: Scopes, clipping and opacity
icon: "🫧"
branch: tikz
requires: [tikz-styles, images]
summary: Group options with scope, clip to a shape, and make things transparent.
---
## Scopes

A `scope` applies options to part of a picture, like a group in a drawing program:

```latex
\begin{tikzpicture}
  \draw (0,0) rectangle (1,1);
  \begin{scope}[xshift=2cm, red, thick, rotate=20]
    \draw (0,0) rectangle (1,1);   % moved, red, thick and rotated
    \draw (0,0) -- (1,1);
  \end{scope}
\end{tikzpicture}
```

`xshift`, `yshift`, `shift={(x,y)}`, `rotate` and `scale` move everything in the scope.

## Clipping

`\clip` sets a path as a stencil: everything drawn after it, until the end of the scope, only shows inside the path. Here's a photo cropped to a circle:

```latex
\begin{tikzpicture}
  \begin{scope}
    \clip (0,0) circle (1.5cm);
    \node at (0,0) {\includegraphics[width=4cm]{photo}};
  \end{scope}
  \draw[white, line width=2mm] (0,0) circle (1.5cm);   % not clipped
\end{tikzpicture}
```

Put the `\clip` in a `scope`, otherwise it clips the rest of the whole picture. Clipping to a rectangle is how you crop photos into tiles of a collage without editing the images.

## Opacity

Any drawing can be transparent:

```latex
\begin{tikzpicture}
  \fill[red, opacity=0.5] (0,0) circle (1);
  \fill[blue, opacity=0.5] (1,0) circle (1);
  \fill[green, fill opacity=0.3, draw opacity=1, draw=black] (0.5,0.8) circle (1);
  \node[fill=white, fill opacity=0.7, text opacity=1] at (0.5,-1.3) {label};
\end{tikzpicture}
```

- `opacity` applies to everything; `fill opacity`, `draw opacity` and `text opacity` to one part.
- For a group to be transparent **as a whole**, so overlapping parts don't add up, use `\begin{scope}[transparency group, opacity=0.5]`.

Behind the scenes, PDF stores opacity in a "graphics state" (an ExtGState). TikZ creates those for you. You'll see how to do it by hand in the PDF primitives lesson.

## Shadows

The `shadows` library adds `drop shadow`, and `shadows.blur` adds soft `blur shadow`:

```latex
\usetikzlibrary{shadows.blur}
\begin{tikzpicture}
  \node[draw, fill=white, blur shadow={shadow blur steps=5}] {A card};
\end{tikzpicture}
```

```exercise
goal: "Clip the image to a rectangle from `(0,0)` to `(3,2)` inside the scope."
code: |
  \begin{tikzpicture}
    \begin{scope}
      \node[anchor=south west] at (0,0) {\includegraphics[width=5cm]{photo}};
    \end{scope}
  \end{tikzpicture}
checks:
  - match: '\\begin\{scope\}\s*\\clip\s*\(0,\s*0\)\s*rectangle\s*\(3,\s*2\)\s*;\s*\\node'
    message: "Add \\clip (0,0) rectangle (3,2); at the start of the scope, before the image."
solution: |
  \begin{tikzpicture}
    \begin{scope}
      \clip (0,0) rectangle (3,2);
      \node[anchor=south west] at (0,0) {\includegraphics[width=5cm]{photo}};
    \end{scope}
  \end{tikzpicture}
```

```quiz
question: "Why put a \\clip inside a scope?"
options:
  - "So the clipping ends with the scope, instead of affecting the rest of the picture."
  - "Because \\clip only works in scopes."
  - "To make the clip transparent."
answer: 0
explain: "A clip lasts until the end of the group it's in."
```
