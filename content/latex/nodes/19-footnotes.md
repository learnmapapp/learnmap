---
title: Footnotes and margin notes
icon: "👣"
branch: structure
requires: [paragraphs]
summary: \footnote, \marginpar and where to put them.
---
A footnote is one command, placed right where the mark should appear:

```latex
LaTeX was first released in 1984.\footnote{By Leslie Lamport, at SRI.}
Footnotes are numbered automatically.\footnote{And renumbered if you add one.}
```

Put the `\footnote` directly after the word or punctuation, with no space before it, or you'll get a gap before the number.

## Margin notes

`\marginpar{...}` puts a note in the margin, next to the current line. It's handy for drafts and comments:

```latex
This claim needs a source.\marginpar{\small Check!}
```

The `todonotes` package builds on this with coloured boxes, `\todo{...}` and a list of open items.

## Footnotes elsewhere

Footnotes don't work inside some places, like tables and section titles. For a table, use `\footnotemark` in the cell and `\footnotetext{...}` after the table, or put table notes in the caption.

```tip
In two-column papers, journals often prefer few footnotes. Put important information in the text.
```

```exercise
goal: "Add a footnote with the text `Or so they say.` right after `best`."
code: |
  TeX has the best line-breaking algorithm.
checks:
  - match: 'best\\footnote\{Or so they say\.\}'
    message: "Write best\\footnote{Or so they say.} with no space before \\footnote."
solution: |
  TeX has the best\footnote{Or so they say.} line-breaking algorithm.
```

```quiz
question: "Why write `word\\footnote{...}` with no space before the command?"
options:
  - "A space would appear between the word and the footnote number."
  - "Spaces aren't allowed before commands."
  - "Otherwise the footnote isn't numbered."
answer: 0
explain: "The space is typeset, leaving a gap before the superscript number."
```
