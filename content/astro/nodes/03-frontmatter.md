---
title: Component frontmatter
icon: 🔢
branch: basics
requires:
  - setup
summary: Code between the opening fences executes during rendering, not as a browser event handler.
---

In your Astro project, save this as `src/pages/index.astro`. Code between the opening fences executes during rendering, not as a browser event handler. Keep browser interaction in a script or an island.

A useful term here is [[frontmatter]]: The fenced server-side script at the start of an Astro component.

```astro
---
const title = "Learning journal";
---
<h1>{title}</h1>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about component frontmatter.
lang: astro
code: |-
  ---
  const title = "Untitled";
  ---
  <h1>{title}</h1>
checks:
  - match: '"Learning\s+journal"'
    message: Use "Learning journal" for this step.
  - notMatch: '"Untitled"'
    message: Replace "Untitled" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where does an Astro component's frontmatter code execute?
options:
  - During rendering on the server or at build time.
  - As a browser click handler.
  - As a global script in every visitor's window.
answer: 0
explain: Frontmatter supplies rendering data rather than live browser event listeners.
```
