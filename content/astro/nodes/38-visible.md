---
title: Hydrate when visible
icon: 🏷️
branch: islands
requires:
  - hydration
summary: client:visible waits until the island enters the viewport.
---

In your Astro project, save this as `src/pages/index.astro`. `client:visible` waits until the island enters the viewport. It suits interactive content farther down the page.

```astro
---
import Counter from "../components/Counter.jsx";
---
<Counter client:visible />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about hydrate when visible.
lang: astro
code: |-
  ---
  import Counter from "../components/Counter.jsx";
  ---
  <Counter client:load />
checks:
  - match: client:visible
    message: Use client:visible for this step.
  - notMatch: client:load
    message: Replace client:load in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What triggers `client:visible` hydration?
options:
  - The static compiler starting.
  - Any unrelated click anywhere on the site.
  - The island entering the viewport.
answer: 2
explain: Visibility-based hydration delays work for offscreen interactive content.
```
