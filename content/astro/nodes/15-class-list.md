---
title: Conditional classes
icon: 🔢
branch: styles
requires:
  - conditionals
  - scoped-css
summary: class:list combines strings and conditional object keys into a class attribute during rendering.
---

In your Astro project, save this as `src/pages/index.astro`. class:list combines strings and conditional object keys into a class attribute during rendering. It does not make active a client-side reactive value.

```astro
---
const active = true;
---
<a href="/" class:list={["nav-link", { active }]}>Home</a>
<style>.active { font-weight: bold; }</style>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about conditional classes.
lang: astro
code: |-
  ---
  const active = true;
  ---
  <a href="/" class:list={["nav-link", { active: false }]}>Home</a>
  <style>.active { font-weight: bold; }</style>
checks:
  - match: \{\s+active\s+\}
    message: Use { active } for this step.
  - notMatch: \{\s+active:\s+false\s+\}
    message: "Replace { active: false } in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about conditional classes is correct?
options:
  - class:list combines strings and conditional object keys into a class attribute during rendering.
    It does not make active a client-side reactive value.
  - class:list is a JavaScript event listener.
  - Object keys are included only when their values are false.
answer: 0
explain: class:list combines strings and conditional object keys into a class attribute during
  rendering. It does not make active a client-side reactive value.
```
