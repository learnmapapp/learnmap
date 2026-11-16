---
title: Browser-only components
icon: 🔢
branch: islands
requires:
  - hydration
summary: client:only skips server rendering for that framework component.
---

In your Astro project, save this as `src/pages/index.astro`. client:only skips server rendering for that framework component. Use a renderer hint and provide meaningful fallback content when initial HTML is unavailable.

```astro
---
import Counter from "../components/Counter.jsx";
---
<Counter client:only="react"><p slot="fallback">Loading counter…</p></Counter>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about browser-only components.
lang: astro
code: |-
  ---
  import Counter from "../components/Counter.jsx";
  ---
  <Counter client:only="vue"><p slot="fallback">Loading counter…</p></Counter>
checks:
  - match: client:only="react"
    message: Use client:only="react" for this step.
  - notMatch: client:only="vue"
    message: Replace client:only="vue" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about browser-only components is correct?
options:
  - client:only skips server rendering for that framework component. Use a renderer hint and provide
    meaningful fallback content when initial HTML is unavailable.
  - client:only always provides the component’s server-rendered HTML.
  - A renderer hint is never needed.
answer: 0
explain: client:only skips server rendering for that framework component. Use a renderer hint and
  provide meaningful fallback content when initial HTML is unavailable.
```
