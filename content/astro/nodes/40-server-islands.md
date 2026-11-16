---
title: Deferred server islands
icon: 💬
branch: islands
requires:
  - components
summary: Create Greeting.astro with server-rendered content and configure a compatible adapter.
---

In your Astro project, save this as `src/pages/index.astro`. Create Greeting.astro with server-rendered content and configure a compatible adapter. server:defer loads that server-rendered fragment independently from the surrounding page.

A useful term here is [[server island]]: A server-rendered fragment deferred independently from the surrounding page.

```astro
---
import Greeting from "../components/Greeting.astro";
---
<Greeting server:defer><p slot="fallback">Loading greeting…</p></Greeting>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about deferred server islands.
lang: astro
code: |-
  ---
  import Greeting from "../components/Greeting.astro";
  ---
  <Greeting client:load><p slot="fallback">Loading greeting…</p></Greeting>
checks:
  - match: server:defer
    message: Use server:defer for this step.
  - notMatch: client:load
    message: Replace client:load in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about deferred server islands is correct?
options:
  - Server islands require no server-capable deployment.
  - Create Greeting.astro with server-rendered content and configure a compatible adapter.
    server:defer loads that server-rendered fragment independently from the surrounding page.
  - server:defer means hydrate an Astro component with React.
answer: 1
explain: Create Greeting.astro with server-rendered content and configure a compatible adapter.
  server:defer loads that server-rendered fragment independently from the surrounding page.
```
