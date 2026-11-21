---
title: Building with latexmk
icon: "⚙️"
branch: tools
requires: [bibliography, index]
summary: One command that runs LaTeX, biber and makeindex as often as needed.
---
A document with references, an index and a bibliography needs several runs: `pdflatex`, then `biber`, then `pdflatex` twice more. `latexmk` works out what's needed and runs it for you:

```repl shell
> latexmk -pdf paper.tex
Latexmk: applying rule 'pdflatex'...
Latexmk: applying rule 'biber paper'...
Latexmk: applying rule 'pdflatex'...
Latexmk: All targets (paper.pdf) are up-to-date
```

| Command | What it does |
| --- | --- |
| `latexmk -pdf file` | build with pdfLaTeX |
| `latexmk -lualatex file` / `-xelatex` | build with another engine |
| `latexmk -pvc -pdf file` | watch the files and rebuild on every save |
| `latexmk -c` | delete the helper files (`.aux`, `.log`, ...) |
| `latexmk -C` | also delete the PDF |

`latexmk` comes with TeX Live and MiKTeX. It needs Perl, which macOS and Linux have; on Windows, TeX Live includes it.

## A configuration file

Put a `latexmkrc` file next to your document to set the defaults, so a plain `latexmk` does the right thing:

```text
$pdf_mode = 4;              # 1 = pdflatex, 4 = lualatex, 5 = xelatex
$out_dir = 'build';         # put helper files and the PDF in build/
@default_files = ('paper.tex');
```

## Editors

Most editors use latexmk underneath: LaTeX Workshop for VS Code, TeXstudio and Vim's VimTeX can all build with it on save. Overleaf runs latexmk too, which is why references just work there.

## Errors

When a run fails, latexmk stops and shows the error. Read the first `!` line in the `.log` file, as in the errors lesson. `-interaction=nonstopmode` makes it keep going past errors, and `-halt-on-error` stops at the first one.

```compare javascript
// latexmk is to LaTeX what a build tool like make or vite is to code:
// it knows the steps and reruns only what's out of date.
```

```exercise
goal: "Write the latexmk command that builds `thesis.tex` with LuaLaTeX and keeps watching for changes."
lang: shell
code: |
  latexmk thesis.tex
checks:
  - match: '-lualatex'
    message: Add -lualatex.
  - match: '-pvc'
    message: Add -pvc to keep watching.
  - match: 'thesis\.tex\s*$'
    message: End with thesis.tex.
solution: |
  latexmk -lualatex -pvc thesis.tex
```

```quiz
question: "Why use latexmk instead of running pdflatex yourself?"
options:
  - "It runs LaTeX, biber and makeindex as many times as needed, in the right order."
  - "It produces smaller PDFs."
  - "It fixes errors automatically."
answer: 0
explain: "It reads the log files to decide whether another run is needed."
```
