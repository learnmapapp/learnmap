---
title: Hydrate an island
icon: 🌐
branch: islands
requires:
  - react-integration
summary: Create Counter.jsx with React useState and a button.
---

In your Astro project, save this as `src/pages/index.astro`. Create Counter.jsx with React useState and a button. client:load renders initial HTML and hydrates the component promptly in the browser.

A useful term here is [[hydration]]: Attaching browser behavior to framework component HTML rendered on the server.

```astro
---
import Counter from "../components/Counter.jsx";
---
<Counter client:load />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about hydrate an island.
lang: astro
code: |-
  ---
  import Counter from "../components/Counter.jsx";
  ---
  <Counter client:idle />
checks:
  - match: client:load
    message: Use client:load for this step.
  - notMatch: client:idle
    message: Replace client:idle in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about hydrate an island is correct?
options:
  - Create Counter.jsx with React useState and a button. client:load renders initial HTML and
    hydrates the component promptly in the browser.
  - client:load skips server rendering entirely.
  - A React component without a client directive is automatically interactive.
answer: 0
explain: Create Counter.jsx with React useState and a button. client:load renders initial HTML and
  hydrates the component promptly in the browser.
```
