---
title: "Project: a photo collage"
icon: "🏞️"
branch: macros
requires: [pdf-primitives, tex-conditionals, picture, tikz-clip-opacity]
summary: A whole page of overlapping, shadowed photos, built from code, explained line by line.
---
This file makes a single page that looks like a pile of printed photos on a grey table: each photo has a white border and a soft shadow, is cropped to fill its frame, and overlaps the ones before it. It uses nothing but pdfLaTeX, `graphicx` and `xcolor`:

```latex title=collage.tex
% !TeX program = pdflatex
% Build from this directory with: pdflatex collage.tex
\documentclass{article}
\usepackage{graphicx,xcolor}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\unitlength}{1bp}
\pdfhorigin=0pt
\pdfvorigin=0pt
\pdfpageresources{/ExtGState <<
  /ShadowOuter << /ca 0.035 >>
  /ShadowMid   << /ca 0.065 >>
  /ShadowInner << /ca 0.14 >>
  /ShadowCore  << /ca 0.21 >>
>>}

% Coordinates are in PDF points, measured from the upper-left corner.
% Each print takes x, y, width, height, and the JPEG basename.
% Prints drawn later sit above earlier prints. The page trims the outer edges.
\newsavebox{\photo}
\newcommand{\Print}[5]{%
  \sbox{\photo}{\includegraphics[width=#3bp]{photos/#5.jpg}}%
  \ifdim\ht\photo<#4bp
    \sbox{\photo}{\includegraphics[height=#4bp]{photos/#5.jpg}}%
  \fi
  \put(#1,\numexpr740-#2-#4\relax){%
    \pdfliteral{q 0 g
      /ShadowOuter gs -7 -14 \number\numexpr#3+22\relax\space \number\numexpr#4+23\relax\space re f
      /ShadowMid gs -5 -12 \number\numexpr#3+18\relax\space \number\numexpr#4+19\relax\space re f
      /ShadowInner gs -4 -10 \number\numexpr#3+15\relax\space \number\numexpr#4+15\relax\space re f
      /ShadowCore gs -4 -8 \number\numexpr#3+13\relax\space \number\numexpr#4+13\relax\space re f Q
      q 1 g -4 -4 \number\numexpr#3+8\relax\space \number\numexpr#4+8\relax\space re f Q}%
    \pdfliteral{q 0 0 #3 #4 re W n}%
    \hbox to 0pt{\kern.5\dimexpr#3bp-\wd\photo\relax
      \raise.5\dimexpr#4bp-\ht\photo\relax\copy\photo\hss}%
    \pdfliteral{Q}%
  }%
}
\begin{document}
\pdfpagewidth=555bp
\pdfpageheight=740bp
% Ship the single artwork page directly to avoid document margins.
\shipout\vbox{\offinterlineskip\hbox{%
  \begin{picture}(555,740)
    \put(0,0){\color[HTML]{DEDEDC}\rule{555bp}{740bp}}
    \Print{-18}{178}{215}{194}{lake}
    \Print{365}{16}{203}{191}{woods}
    \Print{343}{248}{194}{197}{overlook}
    \Print{30}{-19}{195}{196}{cycling}
    \Print{201}{44}{193}{193}{trail}
    \Print{-17}{401}{202}{193}{backpack}
    \Print{181}{267}{193}{193}{campfire}
    \Print{220}{480}{196}{194}{friends}
    \Print{365}{563}{201}{197}{mountains}
    \Print{404}{401}{180}{194}{camera}
    \Print{46}{535}{194}{194}{portrait}
  \end{picture}%
}}
\end{document}
```

Every piece of it is something from the previous lessons. Here's how it fits together.

## The setup

- `% !TeX program = pdflatex` is a [[magic comment]]: the `\pdfliteral` and `\pdfpage...` primitives only exist in pdfTeX, so the editor must use `pdflatex`.
- `\pagestyle{empty}` and `\setlength{\parindent}{0pt}` remove page numbers and indentation, so nothing appears on the page except the artwork.
- `\setlength{\unitlength}{1bp}` makes every `picture` coordinate a PDF point (lengths lesson).
- `\pdfhorigin=0pt` and `\pdfvorigin=0pt` remove TeX's 1 inch offset, so (0,0) of the page box is the page corner.
- `\pdfpageresources{/ExtGState << ... >>}` registers four named graphics states, each a different fill opacity (`/ca`), from 3.5% to 21%. The shadows use them.

## The \Print command

`\Print{x}{y}{width}{height}{name}` takes five arguments (command arguments lesson). Every line ends with `%`, so the line breaks don't add stray spaces.

**1. Scale the photo to cover the frame.** The photo is put in a box scaled to the frame's width. `\ifdim\ht\photo<#4bp` checks if it's now shorter than the frame; if so, it's rebuilt scaled to the height instead. Either way it covers the frame completely (boxes and conditionals lessons).

**2. Convert the coordinates.** The arguments measure from the **top-left**, like a design tool, but `picture` measures from the bottom-left. `\put(#1,\numexpr740-#2-#4\relax)` converts: page height minus y minus the photo height (picture lesson).

**3. Draw the shadow and border.** The first `\pdfliteral` writes raw PDF (PDF primitives lesson):

- `q 0 g` saves the state and sets the fill to black.
- `/ShadowOuter gs -7 -14 w h re f` switches to 3.5% opacity and fills a rectangle a little bigger than the photo and shifted down. Three more, smaller and darker, are stacked on top. Together the four faint rectangles make a shadow that's soft at the edges and darker in the middle.
- `\number\numexpr#3+22\relax` computes the rectangle's width and prints it as digits into the PDF code. `\space` puts a space between the numbers, since a space typed after `\relax` would be swallowed.
- `Q q 1 g -4 -4 w+8 h+8 re f Q` fills a white rectangle 4 bp bigger than the photo on each side: the border of the print.

**4. Clip and centre the photo.** `\pdfliteral{q 0 0 #3 #4 re W n}` sets a clipping rectangle the size of the frame. Then the photo is placed with plain TeX boxes (plain TeX boxes lesson):

- `\hbox to 0pt{...\hss}` takes up no space, so it doesn't move anything else.
- `\kern.5\dimexpr#3bp-\wd\photo\relax` moves left by half of the overflow, and `\raise.5\dimexpr#4bp-\ht\photo\relax` moves down by half of it, so the photo's centre lines up with the frame's centre.
- `\copy\photo` prints the photo box (and keeps it, unlike `\box`).

Finally `\pdfliteral{Q}` restores the graphics state, which ends the clip.

## The page

- `\pdfpagewidth=555bp` and `\pdfpageheight=740bp` set the page size after `\begin{document}`.
- `\shipout\vbox{...}` writes the page directly, skipping LaTeX's margins and headers. `\offinterlineskip` stops TeX from adding space between lines.
- The `picture` is exactly the size of the page. The first `\put` fills it with a grey `\rule` coloured with `\color[HTML]{DEDEDC}` (colours lesson).
- Each `\Print` is drawn on top of the previous ones, so the order of the lines is the order of the pile. Negative positions, like `\Print{-18}...`, make photos run off the edge of the page, which trims them.

## The same collage in TikZ

The pdfTeX version is compact and fast, but it only works with pdfLaTeX and needs raw PDF knowledge. The same design in TikZ works with every engine, and the shadow is a real blur (TikZ lessons):

```latex title=collage-tikz.tex
\documentclass{article}
\usepackage[paperwidth=555bp, paperheight=740bp, margin=0pt]{geometry}
\usepackage{tikz}
\usetikzlibrary{shadows.blur}
\pagestyle{empty}
\definecolor{table}{HTML}{DEDEDC}

\newsavebox{\photo}
\newcommand{\Print}[5]{% x, y from the top-left, width, height, file
  \sbox{\photo}{\includegraphics[width=#3bp]{photos/#5.jpg}}%
  \ifdim\ht\photo<#4bp
    \sbox{\photo}{\includegraphics[height=#4bp]{photos/#5.jpg}}%
  \fi
  \begin{scope}[shift={(#1,#2)}]
    \fill[white, blur shadow={shadow xshift=1bp, shadow yshift=-5bp,
          shadow blur radius=7bp, shadow opacity=35}]
      (-4,-4) rectangle (#3+4,#4+4);
    \begin{scope}
      \clip (0,0) rectangle (#3,#4);
      \node[inner sep=0pt] at (#3/2,#4/2) {\usebox{\photo}};
    \end{scope}
  \end{scope}
}

\begin{document}
\begin{tikzpicture}[remember picture, overlay, x=1bp, y=-1bp,
                    shift={(current page.north west)}]
  \fill[table] (0,0) rectangle (555,740);
  \Print{-18}{178}{215}{194}{lake}
  \Print{365}{16}{203}{191}{woods}
  \Print{201}{44}{193}{193}{trail}
\end{tikzpicture}
\end{document}
```

- `y=-1bp` makes y point **down**, and `shift={(current page.north west)}` puts the origin at the top-left corner. So the coordinates are used as they are, without `740-y-h`.
- The page size comes from `geometry`, and `remember picture, overlay` draws on the page directly (drawing on the page lesson). Compile it twice.
- `\clip` replaces `W n`, and a centred node replaces the kerning.
- `blur shadow` replaces the four rectangles and the hand-made graphics states.

```exercise
goal: "Add one more print on top of the pile: the `camera` photo at x `250`, y `600`, 120 bp wide and 110 bp tall."
code: |
  \Print{-18}{178}{215}{194}{lake}
  \Print{201}{44}{193}{193}{trail}
checks:
  - match: '\\Print\{250\}\{600\}\{120\}\{110\}\{camera\}'
    message: "Add \\Print{250}{600}{120}{110}{camera}."
  - match: 'trail\}\s*\\Print\{250\}'
    message: Put it last, so it's drawn on top.
solution: |
  \Print{-18}{178}{215}{194}{lake}
  \Print{201}{44}{193}{193}{trail}
  \Print{250}{600}{120}{110}{camera}
```

```quiz
question: "Why does the collage use \\put(#1,\\numexpr740-#2-#4\\relax)?"
options:
  - "The arguments are measured from the top-left, but picture coordinates start at the bottom-left."
  - "To make the photos smaller."
  - "Because \\put can only take numbers below 740."
answer: 0
explain: "On a 740 bp page, a photo of height h whose top is y from the top has its bottom at 740 - y - h."
```
