---
title: Refresh fetched data
icon: 🏷️
branch: data
requires:
  - use-fetch
summary: The refresh function reruns the associated data operation.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. The refresh function reruns the associated data operation. Wrap the call in an event handler so the browser event is not mistaken for refresh options.

```vue
<script setup lang="ts">
const { data, refresh, status } = await useFetch("/api/course");
</script>
<template><button :disabled="status === 'pending'" @click="() => refresh()">Refresh</button><pre>{{ data }}</pre></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about refresh fetched data.
lang: vue
code: >-
  <script setup lang="ts">

  const { data, refresh, status } = await useFetch("/api/course");

  </script>

  <template><button :disabled="status === 'pending'" @dblclick="() =>
  refresh()">Refresh</button><pre>{{ data }}</pre></template>
checks:
  - match: '@click="\(\)\s+=>\s+refresh\(\)"'
    message: Use @click="() => refresh()" for this step.
  - notMatch: '@dblclick="\(\)\s+=>\s+refresh\(\)"'
    message: Replace @dblclick="() => refresh()" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about refresh fetched data is correct?
options:
  - refresh requires reloading the whole document.
  - Refreshing data always clears every useState value.
  - The refresh function reruns the associated data operation. Wrap the call in an event handler so
    the browser event is not mistaken for refresh options.
answer: 2
explain: The refresh function reruns the associated data operation. Wrap the call in an event
  handler so the browser event is not mistaken for refresh options.
```
