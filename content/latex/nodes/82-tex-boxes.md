---
title: Plain TeX boxes
icon: "🧱"
branch: macros
requires: [boxes]
summary: \hbox, \vbox, \kern, \raise, \hss, \copy vs \box, and \offinterlineskip.
---
Under LaTeX's `\mbox` and `\parbox` are TeX's own box [[primitive|primitives]]. They're terse, but they give exact control, which is why you find them in layout code.

## Horizontal and vertical boxes

```latex
\hbox{side by side}                     % a horizontal box, like \mbox
\hbox to 4cm{left\hfil right}           % exactly 4cm wide; \hfil fills the gap
\vbox{\hbox{first line}\hbox{second line}}  % boxes stacked vertically
```

- `\hbox{...}` puts things next to each other. `\hbox to 4cm{...}` forces a width, and glue like `\hfil` stretches to fill it.
- `\vbox{...}` stacks things on top of each other. Its baseline is that of the last line.

## Moving things: \kern, \raise and \lower

```latex
A\kern 1em B\kern -0.5em C            % fixed space; negative moves left
x\raise 1ex\hbox{up}\lower 1ex\hbox{down}
```

`\kern` adds a fixed amount of space that never stretches. In a horizontal box, `\raise` and `\lower` move a box up or down without changing the line.

## Glue that can shrink to anything: \hss

`\hss` is glue that can stretch **or shrink** by any amount. In a box of zero width, it absorbs whatever is too wide, so the content sticks out without taking up space:

```latex
Here\hbox to 0pt{\hss$\downarrow$\hss}is a centred arrow that takes no space.

Start\hbox to 0pt{\kern 2pt overlapping text\hss}end
```

LaTeX's `\rlap` and `\llap` are built exactly like this. A zero-width box with a `\kern` and a `\raise` places something at an offset from the current point: a mini "absolute positioning". With a negative kern, the content starts to the left; that's how you centre a photo that is bigger than its frame:

```latex
\newsavebox{\photo}
\sbox{\photo}{\includegraphics[width=4cm]{photo}}
\hbox to 0pt{\kern.5\dimexpr 3cm-\wd\photo\relax \raise.5\dimexpr 2cm-\ht\photo\relax\copy\photo\hss}
```

Here the photo is 4 cm wide but the frame is 3 cm. `.5\dimexpr 3cm-\wd\photo\relax` is half the difference: −0.5 cm, so the photo is shifted half a centimetre left and its centre lines up with the frame's centre. The `\raise` does the same vertically.

## \copy vs \box

Both print a saved box. `\box` **empties** the register after using it; `\copy` keeps it. (LaTeX's `\usebox` is `\copy`.)

```latex
\newsavebox{\stamp}
\sbox{\stamp}{[ok]}
\copy\stamp \copy\stamp \box\stamp \box\stamp   % prints [ok] three times
```

## Stacking without gaps

When TeX stacks boxes in a `\vbox`, it adds "interline glue" so the baselines are evenly spaced. For pictures and rules that should touch, turn it off:

```latex
\vbox{\offinterlineskip \hbox{\rule{1cm}{5mm}}\hbox{\rule{1cm}{5mm}}}   % one 1cm block
```

```exercise
goal: "Make a zero-width box that centres `X` over the current point: `\\hbox to 0pt{\\hss X\\hss}`."
code: |
  \begin{document}
  A\hbox{X}B
  \end{document}
checks:
  - match: '\\hbox to 0pt\{\\hss\s*X\s*\\hss\}'
    message: "Write \\hbox to 0pt{\\hss X\\hss}."
solution: |
  \begin{document}
  A\hbox to 0pt{\hss X\hss}B
  \end{document}
```

```quiz
question: "What's the difference between \\copy\\b and \\box\\b?"
options:
  - "\\box empties the register after printing; \\copy keeps it for later."
  - "\\copy prints a frame around the box."
  - "\\box is for vertical boxes only."
answer: 0
explain: "Use \\copy (or LaTeX's \\usebox) when you might need the box again."
```
