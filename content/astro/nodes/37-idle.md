---
title: Hydrate during idle time
icon: 🧪
branch: islands
requires:
  - hydration
summary: client:idle defers hydration until an idle opportunity.
---

In your Astro project, save this as `src/pages/index.astro`. client:idle defers hydration until an idle opportunity. Use it for interaction that is useful but not immediately required.

```astro
---
import Counter from "../components/Counter.jsx";
---
<Counter client:idle />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about hydrate during idle time.
lang: astro
code: |-
  ---
  import Counter from "../components/Counter.jsx";
  ---
  <Counter client:load />
checks:
  - match: client:idle
    message: Use client:idle for this step.
  - notMatch: client:load
    message: Replace client:load in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about hydrate during idle time is correct?
options:
  - Idle hydration happens only during static compilation.
  - client:idle defers hydration until an idle opportunity. Use it for interaction that is useful
    but not immediately required.
  - client:idle guarantees zero browser JavaScript.
answer: 1
explain: client:idle defers hydration until an idle opportunity. Use it for interaction that is
  useful but not immediately required.
```
