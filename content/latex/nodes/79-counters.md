---
title: Counters
icon: "🔢"
branch: macros
requires: [newcommand, cross-references]
summary: How LaTeX numbers things, and your own numbered items.
---
Every number LaTeX prints, like section, page, figure, equation and footnote numbers, is a **counter**. You can read, change and create them:

```latex
\newcounter{tip}
\newcommand{\tip}[1]{%
  \refstepcounter{tip}%
  \par\noindent\textbf{Tip \thetip.} #1\par
}

\tip{Save often.}\label{tip:save}
\tip{Compile twice.}
As tip~\ref{tip:save} says\ldots
```

| Command | What it does |
| --- | --- |
| `\newcounter{c}` | create a counter, starting at 0 |
| `\stepcounter{c}` | add one |
| `\refstepcounter{c}` | add one and make it the target for `\label` |
| `\addtocounter{c}{n}` | add n |
| `\setcounter{c}{n}` | set to n |
| `\value{c}` | the number, for calculations |
| `\thec` | the printed form, like `\thesection` |
| `\arabic{c}`, `\roman{c}`, `\alph{c}` | print in a style |

## Changing how numbers look

`\thec` is a command, so you can redefine it:

```latex
\renewcommand{\thesection}{\Roman{section}}    % sections I, II, III
\renewcommand{\thefigure}{\thesection.\arabic{figure}}
\setcounter{page}{0}                           % start numbering at 0
```

## Reset with another counter

`\newcounter{step}[section]` resets `step` to zero at every new section, like figure numbers in a book that restart each chapter. `\counterwithin{figure}{section}` does the same for an existing counter, and also changes `\thefigure` to "2.3".

```exercise
goal: "Create a counter `question` and a command `\\question` that steps it with `\\refstepcounter` and prints `Q\\thequestion.`"
code: |
  \begin{document}
  \question What is TeX?
  \question Who made it?
  \end{document}
checks:
  - match: '\\newcounter\{question\}'
    message: "Add \\newcounter{question}."
  - match: '\\newcommand\{\\question\}\{\\refstepcounter\{question\}\s*Q\\thequestion\.'
    message: "Define \\newcommand{\\question}{\\refstepcounter{question}Q\\thequestion. }"
solution: |
  \newcounter{question}
  \newcommand{\question}{\refstepcounter{question}Q\thequestion.\ }
  \begin{document}
  \question What is TeX?
  \question Who made it?
  \end{document}
```

```quiz
question: "What's the difference between \\stepcounter and \\refstepcounter?"
options:
  - "\\refstepcounter also makes the new value the one a following \\label refers to."
  - "\\refstepcounter counts backwards."
  - "There is none."
answer: 0
explain: "Without \\refstepcounter, a \\label would pick up the previous numbered thing, like the section."
```
