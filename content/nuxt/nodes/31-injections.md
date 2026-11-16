---
title: Use injected helpers
icon: 📋
branch: components
requires:
  - plugins
summary: useNuxtApp exposes capabilities injected by plugins.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. useNuxtApp exposes capabilities injected by plugins. This example depends on the shout plugin from the previous lesson.

```vue
<script setup lang="ts">
const { $shout } = useNuxtApp();
</script>
<template><h1>{{ $shout("Keep learning") }}</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about use injected helpers.
lang: vue
code: |-
  <script setup lang="ts">
  const { $shout } = useNuxtApp();
  </script>
  <template><h1>{{ $shout("Stop") }}</h1></template>
checks:
  - match: \$shout\("Keep\s+learning"\)
    message: Use $shout("Keep learning") for this step.
  - notMatch: \$shout\("Stop"\)
    message: Replace $shout("Stop") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about use injected helpers is correct?
options:
  - useNuxtApp must be called only from a shell script.
  - useNuxtApp exposes capabilities injected by plugins. This example depends on the shout plugin
    from the previous lesson.
  - Injected helpers are automatically HTTP API endpoints.
answer: 1
explain: useNuxtApp exposes capabilities injected by plugins. This example depends on the shout
  plugin from the previous lesson.
```
