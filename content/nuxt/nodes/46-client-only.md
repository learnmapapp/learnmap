---
title: Client-only UI boundaries
icon: 📦
branch: production
requires:
  - hydration
summary: ClientOnly defers its default content to the browser and supplies fallback markup for
  server output.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. ClientOnly defers its default content to the browser and supplies fallback markup for server output. Put an actual browser-dependent component inside when needed.

```vue
<template>
  <ClientOnly><p>Browser widget area</p><template #fallback><p>Loading widget…</p></template></ClientOnly>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about client-only ui boundaries.
lang: vue
code: >-
  <template>
    <ClientOnly><p>Browser widget area</p><template #fallback><p>Loading…</p></template></ClientOnly>
  </template>
checks:
  - match: Loading\s+widget…
    message: Use Loading widget… for this step.
  - notMatch: Loading…
    message: Replace Loading… in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about client-only ui boundaries is correct?
options:
  - ClientOnly makes private data secure in browser memory.
  - ClientOnly defers its default content to the browser and supplies fallback markup for server
    output. Put an actual browser-dependent component inside when needed.
  - ClientOnly renders its entire default slot on the server.
answer: 1
explain: ClientOnly defers its default content to the browser and supplies fallback markup for
  server output. Put an actual browser-dependent component inside when needed.
```
