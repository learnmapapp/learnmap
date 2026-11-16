---
title: SSR-aware fetching
icon: 🛠️
branch: data
requires:
  - templates
summary: Create a /api/course endpoint returning a title.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Create a /api/course endpoint returning a title. `useFetch` transfers server-fetched data in the Nuxt payload to avoid an unnecessary hydration refetch; handle failure and loading explicitly.

A useful term here is [[payload]]: Data serialized by Nuxt from server rendering for the browser to reuse during hydration.

```vue
<script setup lang="ts">
const { data, status, error } = await useFetch<{ title: string }>("/api/course");
</script>
<template><p v-if="error">Could not load</p><p v-else-if="status === 'pending'">Loading</p><h1 v-else>{{ data?.title }}</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ssr-aware fetching.
lang: vue
code: >-
  <script setup lang="ts">

  const { data, status, error } = await useFetch<{ title: string }>("/api/course");

  </script>

  <template><p v-if="error">Could not load</p><p v-else-if="status === 'pending'">Loading</p><h1
  v-else>{{ data?.name }}</h1></template>
checks:
  - match: data\?\.title
    message: Use data?.title for this step.
  - notMatch: data\?\.name
    message: Replace data?.name in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why use `useFetch` for initial data in server-rendered setup?
options:
  - It makes every remote response trustworthy.
  - It prevents all possible request failures.
  - It transfers fetched data in the payload for hydration reuse.
answer: 2
explain: SSR-aware data handling avoids an unnecessary duplicate fetch during hydration.
```
