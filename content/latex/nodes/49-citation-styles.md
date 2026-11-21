---
title: Citation styles
icon: "🎨"
branch: references
requires: [bibliography]
summary: biblatex styles, sorting, and options journals ask for.
---
The same bib file can produce very different-looking citations. In `biblatex` you pick a style when loading the package:

```latex
\usepackage[style=numeric, sorting=none]{biblatex}
```

| Style | Citations look like | Common in |
| --- | --- | --- |
| `numeric` | [1], [2, 5] | physics, engineering, CS |
| `numeric-comp` | [1–3] | the same, compressed |
| `alphabetic` | [Knu84] | maths, CS |
| `authoryear` | (Knuth 1984) | humanities, social sciences |
| `authortitle` | Knuth, *The TeXbook* | footnote styles |
| `ieee`, `apa`, `chicago-authordate`, `nature` | journal-specific | via extra packages |

`style=apa` needs the `biblatex-apa` package, which TeX Live includes. There are styles for almost every journal and university.

## Sorting

| Option | Order |
| --- | --- |
| `sorting=nyt` | name, year, title (default) |
| `sorting=none` | order of first citation |
| `sorting=ydnt` | year, newest first |

## Other options

```latex
\usepackage[
  style=authoryear,
  maxcitenames=2,    % "Knuth et al." after two names
  maxbibnames=99,    % list all authors in the bibliography
  giveninits=true,   % D. E. Knuth
  uniquename=init,   % needed with giveninits in author-year styles
  doi=false, url=false,
  backref=true,      % "Cited on page 3" after each entry
]{biblatex}
\addbibresource{refs.bib}
```

## Footnote citations

With an author-title style, `\footcite{key}` puts the citation in a footnote, as common in history and law:

```latex
As Knuth argued.\footcite[12]{knuth1984}
```

```exercise
goal: "Switch to the `alphabetic` style, and sort entries by year with the newest first."
code: |
  \usepackage[style=numeric]{biblatex}
checks:
  - match: 'style\s*=\s*alphabetic'
    message: Use style=alphabetic.
  - match: 'sorting\s*=\s*ydnt'
    message: Add sorting=ydnt.
  - match: '\\usepackage\[[^\]]*\]\{biblatex\}'
    message: Keep the options on \usepackage{biblatex}.
solution: |
  \usepackage[style=alphabetic, sorting=ydnt]{biblatex}
```

```quiz
question: "You switch from `style=numeric` to `style=authoryear`. What do you change in your bib file?"
options:
  - "Nothing; the style only changes how entries are printed."
  - "Every citation key."
  - "You need a new bib file per style."
answer: 0
explain: "The bib file only stores data. The style turns it into citations."
```
