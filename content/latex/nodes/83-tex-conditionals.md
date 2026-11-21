---
title: Conditionals
icon: "🔀"
branch: macros
requires: [tex-boxes, command-arguments]
summary: \ifdim, \ifnum, \ifx and \newif, and choosing between two layouts.
---
TeX has conditional [[primitive|primitives]]: commands built into the engine itself, not defined in any package. They all end with `\fi`, and `\else` is optional:

```latex
\ifnum 3 > 2 three is bigger \else impossible \fi

\ifdim\textwidth > 10cm wide page\else narrow page\fi

\ifodd\value{page} odd page\else even page\fi
```

| Test | Compares |
| --- | --- |
| `\ifnum a<b` | whole numbers (`<`, `=`, `>`) |
| `\ifdim a<b` | lengths |
| `\ifodd n` | whether a number is odd |
| `\ifx\a\b` | whether two commands have the same definition |
| `\ifvoid\box` | whether a box register is empty |

There is no `<=`: write `\ifnum a>b \else ... \fi`, or `\unless\ifnum a>b`.

## A real example: fill a frame with a photo

To fill a frame completely (like CSS `object-fit: cover`), scale the image to the frame's width. If it's then not tall enough, scale it to the height instead:

```latex
\newsavebox{\pic}
\newcommand{\cover}[3]{% width, height, file
  \sbox{\pic}{\includegraphics[width=#1]{#3}}%
  \ifdim\ht\pic<#2
    \sbox{\pic}{\includegraphics[height=#2]{#3}}%
  \fi
  \usebox{\pic}%
}

\cover{3cm}{3cm}{photo}
```

Either way, the image is now at least as big as the frame in both directions. Clipping (next lessons) removes what sticks out.

The line break after `#2` is safe: TeX stops reading a length at its unit and skips one space after it.

## Your own switches

`\newif\ifdraft` creates three commands: `\ifdraft`, `\drafttrue` and `\draftfalse`:

```latex
\newif\ifdraft
\drafttrue

\ifdraft \textcolor{red}{DRAFT} \fi
```

## Friendlier tests

Packages offer readable alternatives: `\ifthenelse{\value{page} > 3}{yes}{no}` (ifthen), `\ifdefempty{\cmd}{...}{...}` (etoolbox), and LaTeX's own `\IfBooleanTF` and `\IfNoValueTF` (document commands lesson). Use whichever reads best; the primitives are fastest and need no package.

```compare javascript
if (img.height < frameHeight) img = scaleToHeight(frameHeight);
```

```exercise
goal: "Print `long` when the counter `section` is more than 5, otherwise `short`, with `\\ifnum\\value{section}>5 ... \\else ... \\fi`."
code: |
  \begin{document}
  This document is short.
  \end{document}
checks:
  - match: '\\ifnum\s*\\value\{section\}\s*>\s*5\s*long\s*\\else\s*short\s*\\fi'
    message: "Write \\ifnum\\value{section}>5 long\\else short\\fi."
solution: |
  \begin{document}
  This document is \ifnum\value{section}>5 long\else short\fi.
  \end{document}
```

```quiz
question: "How does every TeX conditional end?"
options:
  - "With \\fi"
  - "With \\endif"
  - "With a closing brace"
answer: 0
explain: "\\if...\\else...\\fi; a missing \\fi causes confusing errors much later."
```
