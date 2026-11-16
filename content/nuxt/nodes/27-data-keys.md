---
title: Reactive request keys
icon: 🔢
branch: data
requires:
  - dynamic
  - use-fetch
summary: A reactive request URL lets useFetch follow a changing route parameter.
---

In your Nuxt 4 project, save this as `app/pages/courses/[id].vue`. A reactive request URL lets useFetch follow a changing route parameter. Keep request identity aligned with the actual resource and validate IDs on the server.

```vue
<script setup lang="ts">
const route = useRoute();
const id = computed(() => String(route.params.id));
const { data } = await useFetch(() => `/api/courses/${id.value}`);
</script>
<template><pre>{{ data }}</pre></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reactive request keys.
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  const id = computed(() => String(route.params.id));
  const { data } = await useFetch(() => `/api/courses/static`);
  </script>
  <template><pre>{{ data }}</pre></template>
checks:
  - match: "`/api/courses/\\$\\{id\\.value\\}`"
    message: Use `/api/courses/${id.value}` for this step.
  - notMatch: "`/api/courses/static`"
    message: Replace `/api/courses/static` in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about reactive request keys is correct?
options:
  - A reactive request URL lets useFetch follow a changing route parameter. Keep request identity
    aligned with the actual resource and validate IDs on the server.
  - A plain initial string automatically observes every later parameter change.
  - All course IDs should share one unchanging request URL.
answer: 0
explain: A reactive request URL lets useFetch follow a changing route parameter. Keep request
  identity aligned with the actual resource and validate IDs on the server.
```
