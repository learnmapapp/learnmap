---
title: Talking to the PDF directly
icon: "🧬"
branch: macros
requires: [picture, tex-boxes, fonts]
summary: Magic comments, page size, \pdfliteral drawing, clipping, opacity and \shipout.
---
pdfTeX, the engine behind `pdflatex`, has primitives that control the PDF file itself. You rarely need them, but they explain a lot of clever tricks.

## The magic comment

```latex
% !TeX program = pdflatex
```

A [[magic comment]] on the first lines tells your editor (TeXShop, TeXstudio, VS Code, Overleaf) which [[engine]] to run. It's an ordinary comment to TeX itself. Use it whenever a file needs a specific engine, like this one: everything below only works in pdfTeX.

## Page size and origin

```latex title=page.tex
% !TeX program = pdflatex
\documentclass{article}
\pagestyle{empty}
\pdfhorigin=0pt
\pdfvorigin=0pt
\begin{document}
\pdfpagewidth=555bp
\pdfpageheight=740bp
Without the 1 inch offset, this text moves up and to the left.
\end{document}
```

- `\pdfpagewidth` and `\pdfpageheight` set the size of the PDF page. Set them after `\begin{document}`, because LaTeX copies its own paper size into them when the document starts.
- By default, TeX places the page's content 1 inch from the top and left edges. `\pdfhorigin` and `\pdfvorigin` change that offset. With 0pt, a page you build yourself with `\shipout` (below) starts exactly at the top-left corner. Normal LaTeX pages still have their own margins on top of this.

## Drawing with PDF operators

`\pdfliteral{...}` writes raw PDF drawing instructions into the page, with the origin at the current position and units of bp:

```latex
A red square: \pdfliteral{q 1 0 0 rg 0 0 20 20 re f Q}\hspace{22bp} done.
```

PDF uses postfix notation: numbers first, then the operator.

| Operator | Meaning |
| --- | --- |
| `q` / `Q` | save / restore the graphics state (colour, clip, opacity) |
| `r g b rg` / `g` | fill colour as RGB, or as grey (`0 g` black, `1 g` white) |
| `x y w h re` | add a rectangle to the path |
| `f` | fill the path |
| `W n` | use the path as a clipping region, without painting it |
| `/Name gs` | apply a named graphics state, for example opacity |

Always pair `q` with `Q`, so your changes don't leak into the rest of the page.

## Clipping

`W n` turns the rectangle into a clip. Everything until the matching `Q` is only visible inside it:

```latex
\pdfliteral{q 0 0 60 40 re W n}%
\includegraphics[width=100bp]{photo}%
\pdfliteral{Q}
```

## Opacity

PDF has no "opacity" operator. Instead, you put a graphics state with a `/ca` value (fill opacity, from 0 to 1) in the page's resources, and switch to it with `gs`:

```latex
\pdfpageresources{/ExtGState << /Faint << /ca 0.2 >> >>}

\pdfliteral{q 0 g /Faint gs 0 0 40 40 re f Q}\hspace{42bp}a faint black square
```

Layering a few slightly bigger, very faint rectangles gives a soft shadow. Note that `\pdfpageresources` replaces what other code put there, so don't mix it with packages that manage resources themselves, like TikZ's opacity.

## Writing a page yourself

LaTeX normally builds pages with its output routine: margins, headers, page numbers. `\shipout` skips all that and writes a box straight to the PDF as a page:

```latex
\shipout\vbox{\offinterlineskip\hbox{\rule{100bp}{50bp}}}
```

## Other engines

These primitives are pdfTeX-specific. In LuaTeX they're called `\pagewidth`, `\pdfextension literal{...}` and so on (the `luatex85` package maps the old names). XeTeX uses `\special{pdf:literal ...}`. For portable drawing, clipping and opacity, use TikZ, which works on every engine.

```exercise
goal: "Draw a 30 by 30 black square with `\\pdfliteral`, wrapped in `q` and `Q`: `q 0 g 0 0 30 30 re f Q`."
code: |
  % !TeX program = pdflatex
  \begin{document}
  Square:
  \end{document}
checks:
  - match: '\\pdfliteral\{q 0 g 0 0 30 30 re f Q\}'
    message: "Add \\pdfliteral{q 0 g 0 0 30 30 re f Q}."
solution: |
  % !TeX program = pdflatex
  \begin{document}
  Square: \pdfliteral{q 0 g 0 0 30 30 re f Q}
  \end{document}
```

```quiz
question: "What does `W n` do in PDF drawing code?"
options:
  - "Makes the current path a clipping region without painting it."
  - "Draws the path in white."
  - "Starts a new page."
answer: 0
explain: "W sets the clip, and n ends the path without filling or stroking it."
```
