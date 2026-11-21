---
title: Boxes
icon: "🔳"
branch: macros
requires: [lengths]
summary: \mbox, \makebox, \parbox, \raisebox, and saving and measuring boxes.
---
TeX builds pages from [[box|boxes]]: every letter is a box, letters form a line box, lines form a page box. LaTeX lets you make boxes yourself:

```latex
\mbox{never broken}                      % keeps text on one line
\makebox[3cm][r]{right}                  % 3cm wide, aligned right
\fbox{framed}                            % with a frame
\framebox[3cm][c]{centred}               % framed, 3cm wide
\raisebox{1ex}{up} and \raisebox{-1ex}{down}
\parbox[t]{4cm}{A paragraph in a box, with line breaks, 4cm wide.}
```

- A box is never broken across lines or pages.
- `\makebox[width][pos]` positions its content: `l`, `c`, `r`, or `s` to stretch.
- `\parbox` and the `minipage` environment hold whole paragraphs.

## Every box has three sizes

A box has a **width**, a **height** above the baseline and a **depth** below it. The letter "g" has depth; "x" doesn't.

## Saving and measuring

You can build a box once, store it, and look at its size before deciding what to do:

```latex
\newsavebox{\logo}
\sbox{\logo}{\includegraphics[width=3cm]{logo}}

The logo is \the\wd\logo\ wide and \the\ht\logo\ tall.
\usebox{\logo} \usebox{\logo}   % use it twice; it's only built once
```

| Command | Meaning |
| --- | --- |
| `\newsavebox{\b}` | make a box register |
| `\sbox{\b}{content}` | put content in it (`\savebox` also takes a width) |
| `\usebox{\b}` | print it; the box is kept |
| `\wd\b`, `\ht\b`, `\dp\b` | its width, height and depth, as lengths |

Measuring boxes is useful for images: build the image scaled to a width, check whether it's tall enough, and if not, rebuild it scaled to a height. That's exactly what a "cover" crop needs, and you'll see it in the conditionals lesson.

```compare javascript
// Like measuring an element before positioning it:
const { width, height } = el.getBoundingClientRect();
```

```exercise
goal: "Save the word `Hello` in a box `\\word` with `\\newsavebox` and `\\sbox`, then print its width with `\\the\\wd\\word`."
code: |
  \begin{document}
  Hello is some width.
  \end{document}
checks:
  - match: '\\newsavebox\{\\word\}'
    message: "Add \\newsavebox{\\word}."
  - match: '\\sbox\{\\word\}\{Hello\}'
    message: "Fill it with \\sbox{\\word}{Hello}."
  - match: '\\the\\wd\\word'
    message: "Print the width with \\the\\wd\\word."
solution: |
  \newsavebox{\word}
  \begin{document}
  \sbox{\word}{Hello}
  Hello is \the\wd\word\ wide.
  \end{document}
```

```quiz
question: "What are the three sizes of every TeX box?"
options:
  - "Width, height above the baseline, and depth below it"
  - "Width, height and colour"
  - "Left, right and centre"
answer: 0
explain: "\\wd, \\ht and \\dp give the width, height and depth."
```
