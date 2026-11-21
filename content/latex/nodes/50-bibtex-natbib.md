---
title: BibTeX and natbib
icon: "🏺"
branch: references
requires: [bibliography]
summary: The classic workflow journals still use, with .bst styles.
---
Before `biblatex`, there was **BibTeX**: an older program with styles in `.bst` files. Many journal templates still use it, so it's worth recognising:

```latex title=classic.tex
\documentclass{article}
\usepackage[round]{natbib}

\begin{document}
\citet{knuth1984} designed \TeX, building on earlier work \citep{lamport1986}.

\bibliographystyle{plainnat}
\bibliography{refs}   % refs.bib, without the extension
\end{document}
```

```repl shell
> pdflatex classic
> bibtex classic
> pdflatex classic
> pdflatex classic
```

Notice that it's `bibtex` instead of `biber`, and `\bibliography{refs}` instead of `\addbibresource{refs.bib}`.

## natbib commands

| natbib | Output | biblatex equivalent |
| --- | --- | --- |
| `\citet{k}` | Knuth (1984) | `\textcite` |
| `\citep{k}` | (Knuth, 1984) | `\parencite` |
| `\citep[p.~5]{k}` | (Knuth, 1984, p. 5) | `\parencite[p.~5]` |
| `\citeauthor{k}` | Knuth | `\citeauthor` |

Common `.bst` styles are `plain`, `unsrt` (order of citation), `alpha`, `abbrv` and `plainnat`. Journals usually ship their own `.bst`.

## Which should you use?

- Follow the journal's template if it uses BibTeX.
- For your own documents, prefer `biblatex` with biber: it handles Unicode, many more entry types, and is configured with LaTeX commands instead of the `.bst` language.

The bib file is the same in both cases, so you can switch later.

```exercise
goal: "Finish the classic setup: use the `unsrt` style and the bib file `library.bib`."
code: |
  \begin{document}
  Cited \cite{knuth1984}.
  \end{document}
checks:
  - match: '\\bibliographystyle\{unsrt\}'
    message: "Add \\bibliographystyle{unsrt}."
  - match: '\\bibliography\{library\}'
    message: "Add \\bibliography{library}, without .bib."
  - match: '\\bibliography\{library\}\s*\\end\{document\}'
    message: Put the bibliography at the end of the document.
solution: |
  \begin{document}
  Cited \cite{knuth1984}.
  \bibliographystyle{unsrt}
  \bibliography{library}
  \end{document}
```

```quiz
question: "Which program processes the bibliography in the classic natbib workflow?"
options:
  - "bibtex"
  - "biber"
  - "makeindex"
answer: 0
explain: "BibTeX reads .bst styles. biber goes with biblatex."
```
