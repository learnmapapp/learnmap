---
title: Including images
icon: "🖼️"
branch: floats
requires: [packages]
summary: graphicx's \includegraphics, sizing, rotating, cropping and file formats.
---
The `graphicx` package adds `\includegraphics`:

```latex title=photo.tex
\documentclass{article}
\usepackage{graphicx}
\begin{document}
\includegraphics[width=0.5\textwidth]{photo.jpg}

\includegraphics[height=3cm]{logo}  % finds logo.pdf, logo.png or logo.jpg
\end{document}
```

## Sizing

| Option | Effect |
| --- | --- |
| `width=5cm` | scale to this width, keeping the aspect ratio |
| `height=3cm` | scale to this height |
| `width=5cm, height=3cm` | stretch to exactly this size |
| `width=5cm, height=3cm, keepaspectratio` | as large as possible inside 5×3 cm |
| `scale=0.5` | half the natural size |
| `angle=90` | rotate |

Relative widths like `0.8\textwidth` or `\linewidth` adapt when you change the page layout.

## Cropping

`trim=left bottom right top` cuts away edges. Add `clip` so the trimmed parts are hidden instead of just overlapping the text:

```latex
\includegraphics[trim=1cm 0 1cm 0, clip, width=4cm]{photo}
```

## File formats

With pdfLaTeX, LuaLaTeX and XeLaTeX you can use **PDF**, **PNG** and **JPEG**. Use PDF for diagrams and plots (they're vector graphics and stay sharp), JPEG for photos and PNG for screenshots. EPS needs a conversion step.

Put images in a folder and tell LaTeX where to look:

```latex
\graphicspath{{images/}{photos/}}
```

```exercise
goal: "Include `chart.png` at 80% of the text width."
code: |
  \usepackage{graphicx}
  \begin{document}
  \end{document}
checks:
  - match: '\\includegraphics\[width\s*=\s*0?\.8\\(textwidth|linewidth)\]\{chart(\.png)?\}'
    message: "Use \\includegraphics[width=0.8\\textwidth]{chart.png}."
solution: |
  \usepackage{graphicx}
  \begin{document}
  \includegraphics[width=0.8\textwidth]{chart.png}
  \end{document}
```

```quiz
question: "Which format is best for a plot you want to stay sharp at any zoom level?"
options:
  - "PDF (vector graphics)"
  - "JPEG"
  - "PNG"
answer: 0
explain: "PDF can store vector graphics, which never get blurry. JPEG and PNG are pixels."
```
