---
title: Colours
icon: "🎨"
branch: packages
requires: [packages]
summary: xcolor's named colours, mixing, HTML and RGB values, and coloured boxes.
---
The `xcolor` package adds colour to text, backgrounds and drawings:

```latex
\usepackage{xcolor}

\textcolor{red}{Red text} and {\color{blue} blue until the group ends}.
\colorbox{yellow}{Highlighted}, \fcolorbox{black}{white}{framed}.
\textcolor{blue!40}{40\% blue}, \textcolor{red!50!black}{dark red}.
\textcolor[HTML]{1E90FF}{Dodger blue} and \textcolor[rgb]{0.2,0.6,0.3}{green}.
```

## Ways to give a colour

- **Names**: `red`, `blue`, `teal`, `gray`, `orange` and more. Load `xcolor` with `[dvipsnames]` for 68 extra names like `ForestGreen`, or `[svgnames]` for web colour names.
- **Mixing**: `blue!40` is 40% blue and 60% white. `red!50!black` is half red, half black. `-red` is the complementary colour.
- **Models** in square brackets: `[HTML]{FF8800}`, `[rgb]{1,0.5,0}` (0–1), `[RGB]{255,128,0}` (0–255), `[gray]{0.7}`, `[cmyk]{0,0.5,1,0}`.

## Defining your own

```latex
\definecolor{brand}{HTML}{3D8B5F}
\colorlet{brandlight}{brand!20}

\textcolor{brand}{Our brand colour} on a \colorbox{brandlight}{light background}.
```

Define colours once, by meaning, so changing the design is a one-line edit.

## \color vs \textcolor

`\textcolor{c}{text}` colours its argument. `\color{c}` is a declaration that colours everything after it until the group ends. Inside other boxes, like a `\rule` or a whole drawing, `\color` is often what you want:

```latex
{\color[HTML]{DEDEDC}\rule{4cm}{1cm}}  % a light grey rectangle
```

```compare javascript
// \textcolor[HTML]{1E90FF}{text}  ~  <span style="color:#1E90FF">text</span>
// blue!40 is like color-mix(in srgb, blue 40%, white)
```

```exercise
goal: "Define a colour called `warning` with the HTML value `E67E22`, and use it for the word `Careful`."
code: |
  \usepackage{xcolor}
  \begin{document}
  Careful: hot surface.
  \end{document}
checks:
  - match: '\\definecolor\{warning\}\{HTML\}\{E67E22\}'
    message: "Add \\definecolor{warning}{HTML}{E67E22}."
  - match: '\\textcolor\{warning\}\{Careful\}'
    message: "Write \\textcolor{warning}{Careful}."
solution: |
  \usepackage{xcolor}
  \definecolor{warning}{HTML}{E67E22}
  \begin{document}
  \textcolor{warning}{Careful}: hot surface.
  \end{document}
```

```quiz
question: "What colour is `green!30`?"
options:
  - "30% green mixed with 70% white, a pale green."
  - "Green with 30% opacity."
  - "A darker green."
answer: 0
explain: "colour!percentage mixes with white; add a third colour (green!30!black) to mix with something else."
```
