---
title: Hydrate when visible
icon: 🏷️
branch: islands
requires:
  - hydration
summary: client:visible waits until the island enters the viewport.
---

In your Astro project, save this as `src/pages/index.astro`. client:visible waits until the island enters the viewport. It suits interactive content farther down the page.

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
question: Which statement about hydrate when visible is correct?
options:
  - client:visible hydrates every offscreen island immediately.
  - Visibility directives remove all initial HTML.
  - client:visible waits until the island enters the viewport. It suits interactive content farther
    down the page.
answer: 2
explain: client:visible waits until the island enters the viewport. It suits interactive content
  farther down the page.
```
