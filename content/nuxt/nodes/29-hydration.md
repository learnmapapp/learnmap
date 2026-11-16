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
question: Why set browser-ready state in `onMounted`?
options:
  - The hook runs before server rendering begins.
  - It makes independently generated random markup identical.
  - The initial server and client markup can agree before the browser-only update.
answer: 2
explain: Consistent initial rendering avoids hydration mismatches.
```
