---
title: Languages and quotes
icon: "🌍"
branch: packages
requires: [typography, packages]
summary: babel for hyphenation and translated names, and csquotes.
---
LaTeX hyphenates English by default. For other languages, load `babel` with the languages you use. The **last** one is the main language:

```latex
\usepackage[english, french, ngerman]{babel}

Das ist ein Beispiel.
\begin{otherlanguage}{french}
  C'est un exemple.
\end{otherlanguage}
\foreignlanguage{english}{A short English phrase.}
```

`babel` sets the right hyphenation patterns, and translates built-in words: "Contents" becomes "Inhaltsverzeichnis", "Figure" becomes "Abbildung", and `\today` gives a German date.

## Typographic rules per language

`babel` also applies local conventions. French adds a thin space before `:`, `;`, `!` and `?`. Some languages get shorthands, like `"a` for ä in German.

With LuaLaTeX or XeLaTeX, `babel` works the same, and also supports right-to-left and non-Latin scripts:

```latex
\usepackage[english, provide=*]{babel}
\babelprovide[import]{greek}
```

(`polyglossia` is an alternative for XeLaTeX, but `babel` is now recommended for every engine.)

## Quotes that follow the language

`csquotes` picks the right quotation marks for the current language: “English”, „Deutsch“, « français »:

```latex
\usepackage[english]{babel}
\usepackage{csquotes}

He said \enquote{hello} and then \enquote{she said \enquote{hi}}.
\begin{displayquote}
  A longer quotation is set off as a block.
\end{displayquote}
```

Nested `\enquote`s switch between double and single quotes automatically. `biblatex` also uses `csquotes` for titles.

```exercise
goal: "Replace the hand-made quotes with `\\enquote`."
code: |
  \usepackage{csquotes}
  \begin{document}
  The sign said ``closed''.
  \end{document}
checks:
  - match: '\\enquote\{closed\}'
    message: "Write \\enquote{closed}."
  - notMatch: "``"
    message: Remove the backtick quotes.
solution: |
  \usepackage{csquotes}
  \begin{document}
  The sign said \enquote{closed}.
  \end{document}
```

```quiz
question: "In `\\usepackage[french, english]{babel}`, which is the main language?"
options:
  - "english, because it's last"
  - "french, because it's first"
  - "Both equally"
answer: 0
explain: "babel uses the last language in the list as the main document language."
```
