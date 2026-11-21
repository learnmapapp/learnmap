---
title: Modern command definitions
icon: "🧰"
branch: macros
requires: [command-arguments]
summary: \NewDocumentCommand with optional arguments anywhere and star variants.
---
`\NewDocumentCommand` describes each argument with a letter, which allows things `\newcommand` can't do:

```latex
\NewDocumentCommand{\note}{s O{Note} m}{%
  \IfBooleanTF{#1}
    {\textbf{#2:} \emph{#3}}%   starred: emphasise the text
    {\textbf{#2:} #3}%
}

\note{Plain}. \note[Tip]{Custom label}. \note*{Starred}.
```

| Letter | Argument |
| --- | --- |
| `m` | mandatory, in braces |
| `o` | optional in `[...]`, with no default; test it with `\IfNoValueTF{#1}` |
| `O{default}` | optional, with a default |
| `s` | an optional star; test it with `\IfBooleanTF{#1}` |
| `D(){default}` | optional, with other delimiters, like `(...)` |

The arguments are numbered in order, so in `{s O{Note} m}` the star is `#1`, the label is `#2` and the text is `#3`.

## Several optional arguments

```latex
\NewDocumentCommand{\point}{O{0} O{0} m}{#3 at $(#1, #2)$}

\point{A}, \point[3]{B}, \point[3][4]{C}
```

## Renewing and providing

`\RenewDocumentCommand`, `\ProvideDocumentCommand` and `\DeclareDocumentCommand` (define or redefine) work like their `\newcommand` counterparts. There is also `\NewDocumentEnvironment` for environments.

These commands are part of LaTeX itself since 2020, so no package is needed. (Before that, they came from the `xparse` package.)

```exercise
goal: "Define `\\name` with an optional first name `o` and a mandatory last name `m`. With no first name, print only the last name; otherwise print `#1 #2`, using `\\IfNoValueTF`."
code: |
  \begin{document}
  \name{Lovelace} and \name[Ada]{Lovelace}.
  \end{document}
checks:
  - match: '\\NewDocumentCommand\{\\name\}\{\s*o\s+m\s*\}'
    message: "Start with \\NewDocumentCommand{\\name}{o m}{...}."
  - match: '\\IfNoValueTF\{#1\}\{#2\}\{#1 #2\}'
    message: "Use \\IfNoValueTF{#1}{#2}{#1 #2} as the body."
solution: |
  \NewDocumentCommand{\name}{o m}{\IfNoValueTF{#1}{#2}{#1 #2}}
  \begin{document}
  \name{Lovelace} and \name[Ada]{Lovelace}.
  \end{document}
```

```quiz
question: "In \\NewDocumentCommand, what does the argument letter s mean?"
options:
  - "An optional star, like in \\section*"
  - "A string"
  - "A space"
answer: 0
explain: "s is true if the command is followed by *, tested with \\IfBooleanTF."
```
