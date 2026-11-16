---
title: File-based routes
icon: 🌐
branch: routing
requires:
  - setup
summary: src/pages/about.astro maps to /about/.
---

In your Astro project, save this as `src/pages/about.astro`. src/pages/about.astro maps to /about/. Use ordinary anchors for navigation and organize nested folders to reflect URL structure.

```astro
<h1>About this study club</h1>
<a href="/">Home</a>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about file-based routes.
lang: astro
code: |-
  <h1>About this study club</h1>
  <a href="/missing/">Home</a>
checks:
  - match: href="/"
    message: Use href="/" for this step.
  - notMatch: href="/missing/"
    message: Replace href="/missing/" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about file-based routes is correct?
options:
  - src/pages/about.astro maps to /about/. Use ordinary anchors for navigation and organize nested
    folders to reflect URL structure.
  - Every component automatically becomes a route.
  - Astro navigation always requires a client router.
answer: 0
explain: src/pages/about.astro maps to /about/. Use ordinary anchors for navigation and organize
  nested folders to reflect URL structure.
```
