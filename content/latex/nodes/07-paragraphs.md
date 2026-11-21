---
title: Paragraphs and line breaks
icon: "¶"
branch: basics
requires: [first-document]
summary: Blank lines, indentation, \\ and \newpage.
---
LaTeX is in charge of breaking text into lines and pages. You control the structure with a few simple tools.

```latex
This is the first paragraph. Line breaks in the source
are just spaces, and extra    spaces   count as one.

A blank line starts a new paragraph. By default it is
indented, except right after a heading.

A double backslash forces a line break\\
without starting a new paragraph.
```

## Breaking lines and pages

- `\\` ends the current line. Use it in addresses, poems, and tables, but not to separate paragraphs.
- `\newline` does the same as `\\`.
- `\newpage` starts a new page.
- `\noindent` at the start of a paragraph turns off its indentation.

## Don't fight the layout

Beginners often use `\\` or several blank lines to add space. It looks fine at first, but it makes your document hard to change later, and you'll get warnings like `Underfull \hbox`. When you want space between paragraphs throughout the document, change a setting once instead. You'll see how in the lesson on spacing.

```tip
If you prefer space between paragraphs and no indentation, add \usepackage{parskip} to your preamble.
```

```exercise
goal: "Split the address over three lines with `\\\\`, keeping it one paragraph."
code: |
  Ada Lovelace 12 St James's Square London
checks:
  - match: 'Lovelace\s*\\\\\s*\n?\s*12'
    message: "Put \\\\ after Ada Lovelace."
  - match: 'Square\s*\\\\\s*\n?\s*London'
    message: "Put \\\\ after the street."
  - notMatch: '\n\s*\n'
    message: Don't use blank lines; that would make new paragraphs.
solution: |
  Ada Lovelace\\
  12 St James's Square\\
  London
```

```quiz
question: "How do you start a new paragraph?"
options:
  - "Leave a blank line."
  - "End the line with a single line break."
  - "Type two spaces."
answer: 0
explain: "A blank line ends a paragraph. A single line break is just a space."
```
