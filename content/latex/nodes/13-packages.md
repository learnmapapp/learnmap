---
title: Packages
icon: "🧩"
branch: basics
requires: [commands]
summary: Loading extra functionality with \usepackage, and package options.
---
A [[package]] adds commands and environments. You load packages in the preamble:

```latex title=paper.tex
\documentclass{article}
\usepackage{amsmath}            % better maths
\usepackage{graphicx}           % images
\usepackage[margin=2cm]{geometry} % page margins, with an option
\usepackage{xcolor,hyperref}    % several at once
\begin{document}
\textcolor{blue}{Blue text}, thanks to xcolor.
\end{document}
```

Options go in square brackets, just like command options. Each package documents which options it understands.

## Finding packages

There are over 6,000 packages on CTAN, the Comprehensive TeX Archive Network. Most of them are already included in TeX Live and MiKTeX. Every package comes with a manual. On a local install you can open it with:

```repl shell
> texdoc geometry
```

## Popular packages

| Package | For |
| --- | --- |
| `amsmath`, `amssymb` | maths environments and symbols |
| `graphicx` | including images |
| `geometry` | page size and margins |
| `hyperref` | clickable links in the PDF |
| `xcolor` | colours |
| `booktabs` | good-looking tables |
| `tikz` | drawing |
| `biblatex` | bibliographies |

## Order matters, sometimes

Packages can change each other's commands. `hyperref` should be loaded near the end, and `cleveref` after `hyperref`. If two packages clash, the manuals usually explain how to combine them.

```compare python
# \usepackage{graphicx} is like an import:
import math
# but packages often also change the behaviour of existing commands.
```

```compare javascript
import { format } from 'date-fns';
```

```exercise
goal: "Load the `amssymb` package, and load `geometry` with the option `a4paper`."
code: |
  \documentclass{article}
  \usepackage{amsmath}
  \begin{document}
  Hi.
  \end{document}
checks:
  - match: '\\usepackage\{amssymb\}'
    message: "Add \\usepackage{amssymb}."
  - match: '\\usepackage\[a4paper\]\{geometry\}'
    message: "Add \\usepackage[a4paper]{geometry}."
  - match: 'geometry\}[\s\S]*\\begin\{document\}'
    message: Load packages before \begin{document}.
solution: |
  \documentclass{article}
  \usepackage{amsmath}
  \usepackage{amssymb}
  \usepackage[a4paper]{geometry}
  \begin{document}
  Hi.
  \end{document}
```

```quiz
question: "How do you find the manual for a package called `siunitx` on a local install?"
options:
  - "Run texdoc siunitx"
  - "Run pdflatex siunitx"
  - "Look in the .aux file"
answer: 0
explain: "texdoc opens a package's documentation. You can also find it on CTAN."
```
