---
title: Citations with biblatex
icon: "🎓"
branch: references
requires: [bib-files]
summary: \addbibresource, \cite, \printbibliography and running biber.
---
`biblatex` is the modern way to turn a bib file into citations and a bibliography:

```latex title=paper.tex
\documentclass{article}
\usepackage[style=authoryear]{biblatex}
\addbibresource{refs.bib}       % with the .bib extension

\begin{document}
\TeX{} was designed by Knuth \parencite{knuth1984}.
\textcite{lamport1986} describes \LaTeX.
See \cite[p.~3]{lamport1986}.

\printbibliography
\end{document}
```

## Building it

The bibliography takes several steps, because LaTeX itself doesn't read the bib file. A separate program, [[biber]], does:

```repl shell
> pdflatex paper     # writes the cited keys to paper.bcf
> biber paper        # reads refs.bib, sorts, writes paper.bbl
> pdflatex paper     # reads paper.bbl and prints the bibliography
```

Editors and `latexmk` run these steps for you. If your citations show as **bold keys**, biber hasn't run yet, or a key is misspelled.

## Citation commands

| Command | authoryear output | numeric output |
| --- | --- | --- |
| `\cite{k}` | Knuth 1984 | [1] |
| `\parencite{k}` | (Knuth 1984) | [1] |
| `\textcite{k}` | Knuth (1984) | Knuth [1] |
| `\cite[p.~5]{k}` | Knuth 1984, p. 5 | [1, p. 5] |
| `\cite{a,b}` | Knuth 1984; Lamport 1986 | [1, 2] |
| `\nocite{k}` | (nothing; listed anyway) | |

`\nocite{*}` lists every entry in the bib file, cited or not.

## The bibliography

`\printbibliography` prints the list where you put it, with a heading. Options change it:

```latex
\printbibliography[title={Further reading}]
\printbibliography[type=book, heading=subbibliography, title={Books}]
```

```exercise
goal: "Load the bib file `sources.bib`, cite `darwin1859` in parentheses, and print the bibliography at the end."
code: |
  \documentclass{article}
  \usepackage{biblatex}
  \begin{document}
  Species change over time.
  \end{document}
checks:
  - match: '\\addbibresource\{sources\.bib\}[\s\S]*\\begin\{document\}'
    message: "Add \\addbibresource{sources.bib} in the preamble."
  - match: '\\parencite\{darwin1859\}'
    message: "Cite with \\parencite{darwin1859}."
  - match: '\\printbibliography\s*\\end\{document\}'
    message: "Put \\printbibliography just before \\end{document}."
solution: |
  \documentclass{article}
  \usepackage{biblatex}
  \addbibresource{sources.bib}
  \begin{document}
  Species change over time \parencite{darwin1859}.
  \printbibliography
  \end{document}
```

```quiz
question: "Your citations appear as bold keys like **knuth1984**. What's missing?"
options:
  - "Running biber (and then LaTeX again)."
  - "The \\usepackage{hyperref} line."
  - "Nothing; that's the normal style."
answer: 0
explain: "LaTeX needs the .bbl file that biber produces. Run biber and then LaTeX, or check the key's spelling."
```
