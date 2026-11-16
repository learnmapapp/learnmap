---
title: Reactive request keys
icon: 🔢
branch: data
requires:
  - dynamic
  - use-fetch
summary: A reactive request URL lets useFetch follow a changing route parameter.
---

In your Nuxt 4 project, save this as `app/pages/courses/[id].vue`. A reactive request URL lets `useFetch` follow a changing route parameter. Keep request identity aligned with the actual resource and validate IDs on the server.

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
question: Why pass a function returning a reactive course URL to `useFetch`?
options:
  - So the request follows changes to the route's course ID.
  - So all courses always use one fixed response.
  - So route IDs no longer need server validation.
answer: 0
explain: A reactive request identity keeps loaded data aligned with the selected resource.
```
