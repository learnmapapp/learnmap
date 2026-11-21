---
title: Maths mode
icon: "∑"
kind: hub
branch: math
requires: [first-document, special-characters]
summary: Inline maths with $...$ and displayed maths with \[...\].
---
Maths is where LaTeX shines. Switch into [[math mode]] and LaTeX uses different rules: letters become italic variables, spaces in your source are ignored, and operators get the right spacing.

```latex
The area of a circle is $A = \pi r^2$, where $r$ is the radius.

Einstein's famous equation is
\[
  E = mc^2
\]
and it is displayed on its own line.
```

- `$ ... $` is **inline** maths, inside a sentence.
- `\[ ... \]` is **display** maths, centred on its own line.
- Most people load `amsmath` and `amssymb` for every document with maths. They add many environments and symbols.

## Text vs maths

In maths mode, spaces don't matter and every letter is a variable:

```latex
$x+y = y  +  x$ and $the sum$ look odd as text.
$\text{the sum} = x + y$ uses \text for words inside maths.
```

`\text{...}` comes from `amsmath`. Use it for words in formulas.

```warn
Even a single variable in a sentence should be in maths mode: write "let $n$ be the number", so n looks the same as in the formulas.
```

## Avoid $$

You may see `$$ ... $$` for display maths in old documents. It's plain TeX syntax and causes spacing problems in LaTeX. Use `\[ ... \]` or the `equation` environment instead.

```compare python
# Python: area = math.pi * r**2
# LaTeX describes how a formula looks: $A = \pi r^2$
```

```compare javascript
// Web pages often render LaTeX maths with MathJax or KaTeX:
katex.render('A = \\pi r^2', element);
```

```exercise
goal: "Put the variables and the formula in maths mode: `$x$`, `$y$` and `$x + y = 10$`."
code: |
  If x and y are numbers with x + y = 10, then...
checks:
  - match: 'If \$x\$ and \$y\$'
    message: Put x and y each in $...$.
  - match: '\$x \+ y = 10\$'
    message: Write the formula as $x + y = 10$.
solution: |
  If $x$ and $y$ are numbers with $x + y = 10$, then...
```

```quiz
question: "Which is the recommended way to display an equation on its own line?"
options:
  - "\\[ ... \\]"
  - "$$ ... $$"
  - "Put it in \\textbf"
answer: 0
explain: "\\[ ... \\] (or the equation environment) is LaTeX's display maths. $$ is plain TeX and spaces badly."
```
