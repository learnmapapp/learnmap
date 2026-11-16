---
title: Markdown pages
icon: 🔁
branch: content
requires:
  - layouts
summary: A .md file under src/pages becomes a page.
---

In your Astro project, save this as `src/pages/note.md`. A .md file under `src/pages` becomes a page. Frontmatter stores metadata; the Markdown heading supplies visible content. A Markdown layout receives metadata through `Astro.props.frontmatter`.

```markdown
---
title: My first note
---
# Practice journal

Keep a short record of what you learn.
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about markdown pages.
lang: markdown
code: |-
  ---
  title: Untitled
  ---
  # Practice journal

  Keep a short record of what you learn.
checks:
  - match: title:\s+My\s+first\s+note
    message: "Use title: My first note for this step."
  - notMatch: title:\s+Untitled
    message: "Replace title: Untitled in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which file creates the `/note` Markdown page?
options:
  - "`src/pages/note.md`"
  - "`src/components/note.md`"
  - "`src/data/note.md` alone."
answer: 0
explain: A Markdown file in pages defines a route; a data file needs a rendering route.
```
