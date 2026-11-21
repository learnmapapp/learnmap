---
title: LaTeX
icon: "📄"
kind: hub
branch: core
summary: A typesetting system that turns plain text into beautiful documents.
---
LaTeX (say "lay-tech" or "lah-tech") is a system for writing documents as plain text. You describe the **structure** of your document, like titles, sections, lists and equations, and LaTeX decides how to lay it out on the page: line breaks, hyphenation, spacing and numbering.

It's built on **TeX**, a typesetting program Donald Knuth wrote in the late 1970s because he was unhappy with how his books looked. Leslie Lamport added LaTeX on top in the 1980s, so you could write "this is a section" instead of low-level spacing instructions. Today it's the standard for papers in maths, physics and computer science, and it's used for books, theses, slides, CVs and posters.

```latex title=hello.tex
\documentclass{article}

\begin{document}
Hello, \LaTeX! Here is an equation:
\[
  e^{i\pi} + 1 = 0
\]
\end{document}
```

Run this through LaTeX and you get a PDF with a nicely typeset sentence and a centred equation.

## What makes LaTeX different

- **Plain text.** Your source is a `.tex` file. It works with version control, diffs, any editor, and it'll still open in 30 years.
- **Content first.** You mark up *what* things are. Change one setting and every heading in a 300-page thesis changes with it.
- **Superb typography.** TeX's line-breaking looks at whole paragraphs at once, and its maths typesetting is still the best there is.
- **Programmable.** LaTeX is a full macro language. Thousands of packages add tables, diagrams, bibliographies, slides and more.

## This course

You'll start with the basics of a document, then learn maths, figures and tables, references and bibliographies, popular packages, drawing with TikZ, and slides with Beamer. Towards the end you'll look under the hood at boxes, lengths and raw PDF, so you can build completely custom layouts, like a photo collage.

```tip
LaTeX files end in .tex. Most examples here are complete documents or short pieces you'd put inside one.
```

```compare python
# Like Markdown or a template, LaTeX separates content from presentation,
# but its output is a precisely typeset PDF.
print("Hello, LaTeX!")
```

```compare javascript
// HTML + CSS also separate structure from style. LaTeX does both in one file
// and targets the printed page instead of a browser window.
document.body.innerHTML = '<h1>Hello</h1>';
```

```exercise
goal: "Make the document say `Hello, world!` instead of `Hello!`."
code: |
  \documentclass{article}
  \begin{document}
  Hello!
  \end{document}
checks:
  - match: 'Hello, world!'
    message: "Change the text to Hello, world!"
  - match: '\\begin\{document\}[\s\S]*Hello, world![\s\S]*\\end\{document\}'
    message: Keep the text between \begin{document} and \end{document}.
solution: |
  \documentclass{article}
  \begin{document}
  Hello, world!
  \end{document}
```

```quiz
question: "What do you mostly describe when you write LaTeX?"
options:
  - "The structure and meaning of the content, like sections and equations."
  - "The exact pixel position of every letter."
  - "Nothing; you draw the page with the mouse."
answer: 0
explain: "You mark up what things are. LaTeX decides how they're laid out."
```
