---
title: Hydrate during idle time
icon: 🧪
branch: islands
requires:
  - hydration
summary: client:idle defers hydration until an idle opportunity.
---

In your Astro project, save this as `src/pages/index.astro`. `client:idle` defers hydration until an idle opportunity. Use it for interaction that is useful but not immediately required.

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
question: When is `client:idle` appropriate?
options:
  - For removing all JavaScript from a framework component.
  - For interaction that can wait for an idle opportunity.
  - For a control that must respond before any JavaScript loads.
answer: 1
explain: Deferring hydration changes timing, not whether interactive code is required.
```
