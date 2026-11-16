---
title: Consistent initial HTML
icon: 🚦
branch: data
requires:
  - state
summary: The server and initial client render should agree.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. The server and initial client render should agree. Move browser-only checks into a mounted hook or use an appropriate client-only boundary.

A useful term here is [[hydration]]: Connecting Vue’s browser runtime to matching server-rendered markup.

```vue
<script setup lang="ts">
const mounted = ref(false);
onMounted(() => { mounted.value = true; });
</script>
<template><p>{{ mounted ? "Browser ready" : "Loading browser features" }}</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about consistent initial html.
lang: vue
code: |-
  <script setup lang="ts">
  const mounted = ref(false);
  onMounted(() => { mounted.value = false; });
  </script>
  <template><p>{{ mounted ? "Browser ready" : "Loading browser features" }}</p></template>
checks:
  - match: mounted\.value\s+=\s+true
    message: Use mounted.value = true for this step.
  - notMatch: mounted\.value\s+=\s+false
    message: Replace mounted.value = false in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about consistent initial html is correct?
options:
  - Random values generated independently always hydrate identically.
  - window is available in every server-rendered setup function.
  - The server and initial client render should agree. Move browser-only checks into a mounted hook
    or use an appropriate client-only boundary.
answer: 2
explain: The server and initial client render should agree. Move browser-only checks into a mounted
  hook or use an appropriate client-only boundary.
```
