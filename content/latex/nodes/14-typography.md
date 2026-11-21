---
title: Quotes, dashes and spaces
icon: "❝"
branch: basics
requires: [special-characters]
summary: Proper quotation marks, three kinds of dash, ellipses and non-breaking spaces.
---
Small typographic details make a document look professional. LaTeX gives you the tools, but you have to type them.

## Quotation marks

The `"` key gives a straight quote, which looks wrong in print. Use backticks and apostrophes instead:

```latex
``Double quotes'' and `single quotes'.
```

(Or use the `csquotes` package and write `\enquote{text}`, which also adapts to the document's language.)

## Dashes

| You type | You get | Used for |
| --- | --- | --- |
| `-` | hyphen | compound words: well-known |
| `--` | en dash | ranges: pages 10--20 |
| `---` | em dash | a break in a sentence---like this |
| `$-$` | minus sign | maths: $-5$ |

## Ellipsis and spaces

```latex
Wait for it\ldots{} and so on.
See Figure~3 on page~12, by Prof.~Knuth.
Dr.\ Who arrived.
```

- `\ldots` gives evenly spaced dots.
- A **tilde** `~` is a non-breaking space. Put it between a word and the number or name that belongs to it, so they never end up on different lines.
- After a full stop, LaTeX adds a slightly bigger space, because it thinks the sentence ended. After abbreviations, use `\ ` (backslash-space) or `~` to get a normal space.

```exercise
goal: "Use an en dash for the page range and a non-breaking space between `page` and its number."
code: |
  The proof is on page 42 (see pages 40-45).
checks:
  - match: 'page~42'
    message: "Write page~42."
  - match: '40--45'
    message: "Use -- for the range: 40--45."
solution: |
  The proof is on page~42 (see pages 40--45).
```

```quiz
question: "What do you type for an en dash, as in 1990–2000?"
options:
  - "--"
  - "-"
  - "---"
answer: 0
explain: "Two hyphens make an en dash, used for ranges. Three make an em dash."
```
