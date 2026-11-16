---
title: Reactive query parameters
icon: 📋
branch: routing
requires:
  - dynamic
  - computed
summary: Query values can be absent or non-scalar.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Query values can be absent or non-scalar. Derive a normalized value reactively so navigation updates the displayed search.

```vue
<script setup lang="ts">
const route = useRoute();
const search = computed(() => typeof route.query.q === "string" ? route.query.q : "");
</script>
<template><p>Search: {{ search }}</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reactive query parameters.
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  const search = computed(() => typeof route.query.q === "number" ? route.query.q : "");
  </script>
  <template><p>Search: {{ search }}</p></template>
checks:
  - match: typeof\s+route\.query\.q\s+===\s+"string"
    message: Use typeof route.query.q === "string" for this step.
  - notMatch: typeof\s+route\.query\.q\s+===\s+"number"
    message: Replace typeof route.query.q === "number" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why normalize `route.query.q` before treating it as a search string?
options:
  - Normalization prevents all network failures.
  - It may be absent or have a non-scalar query shape.
  - Query values are always valid numbers.
answer: 1
explain: Check the value's shape and derive it reactively when navigation can change it.
```
