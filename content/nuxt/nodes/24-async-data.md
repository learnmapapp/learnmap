---
title: Named async data
icon: 🌐
branch: data
requires:
  - use-fetch
summary: useAsyncData wraps an asynchronous data operation with a stable key and SSR-aware payload handling.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. useAsyncData wraps an asynchronous data operation with a stable key and SSR-aware payload handling. Keep the handler free from unrelated side effects.

```vue
<script setup lang="ts">
const { data } = await useAsyncData("course-title", async () => {
  return { title: "Nuxt" };
});
</script>
<template><h1>{{ data?.title }}</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named async data.
lang: vue
code: |-
  <script setup lang="ts">
  const { data } = await useAsyncData("course-title", async () => {
    return { title: "Unknown" };
  });
  </script>
  <template><h1>{{ data?.title }}</h1></template>
checks:
  - match: title:\s+"Nuxt"
    message: 'Use title: "Nuxt" for this step.'
  - notMatch: title:\s+"Unknown"
    message: 'Replace title: "Unknown" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named async data is correct?
options:
  - useAsyncData wraps an asynchronous data operation with a stable key and SSR-aware payload
    handling. Keep the handler free from unrelated side effects.
  - Async data handlers are the ideal place for analytics mutations.
  - Keys have no effect on shared async data.
answer: 0
explain: useAsyncData wraps an asynchronous data operation with a stable key and SSR-aware payload
  handling. Keep the handler free from unrelated side effects.
```
