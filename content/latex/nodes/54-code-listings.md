---
title: Source code
icon: "👩‍💻"
branch: packages
requires: [verbatim, colors]
summary: listings and minted for highlighted code with line numbers.
---
For source code with syntax highlighting, use `listings`. It's included everywhere and needs no extra tools:

```latex
\usepackage{listings,xcolor}
\lstset{
  basicstyle = \ttfamily\small,
  keywordstyle = \color{blue}\bfseries,
  commentstyle = \color{gray}\itshape,
  stringstyle = \color{red!60!black},
  numbers = left,
  numberstyle = \tiny\color{gray},
  frame = single,
  breaklines = true,
}

\begin{lstlisting}[language=Python, caption={Fibonacci}, label={lst:fib}]
def fib(n):
    # the classic recursive version
    return n if n < 2 else fib(n - 1) + fib(n - 2)
\end{lstlisting}

Inline: \lstinline|print("hi")|, or a whole file: \lstinputlisting[language=C]{main.c}.
```

`listings` knows dozens of languages: `Python`, `Java`, `C`, `[LaTeX]TeX`, `SQL`, `HTML`, `bash` and more. You can also define your own with `\lstdefinelanguage`.

## minted

`minted` uses the Pygments library for highlighting, which knows hundreds of languages and looks better out of the box:

```latex
\usepackage{minted}

\begin{minted}[linenos, frame=lines]{rust}
fn main() {
    println!("Hello from Rust");
}
\end{minted}
```

Older versions of `minted` needed Python and the `-shell-escape` flag. Since version 3 it comes with its own helper, but check your distribution.

## Unicode in listings

`listings` was written before Unicode. If your code has characters like `é` or `→`, add `literate` replacements, or use `minted` or the `listings` successor `piton` (LuaLaTeX only).

```exercise
goal: "Show the code as a Java listing with line numbers on the left."
code: |
  \begin{lstlisting}
  class Hello {}
  \end{lstlisting}
checks:
  - match: '\\begin\{lstlisting\}\[[^\]]*language\s*=\s*Java'
    message: Add the option language=Java.
  - match: '\\begin\{lstlisting\}\[[^\]]*numbers\s*=\s*left'
    message: Add the option numbers=left.
solution: |
  \begin{lstlisting}[language=Java, numbers=left]
  class Hello {}
  \end{lstlisting}
```

```quiz
question: "Which package uses Pygments for highlighting?"
options:
  - "minted"
  - "listings"
  - "verbatim"
answer: 0
explain: "minted calls Pygments; listings does its own highlighting in TeX."
```
