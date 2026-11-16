---
title: Derived state
icon: 🔁
branch: basics
requires:
  - refs
summary: computed derives a cached reactive value from dependencies.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. computed derives a cached reactive value from dependencies. Avoid storing a second mutable copy when a result can be derived.

```vue
<script setup lang="ts">
const count = ref(3);
const doubled = computed(() => count.value * 2);
</script>
<template><p>{{ doubled }}</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about derived state.
lang: vue
code: |-
  <script setup lang="ts">
  const count = ref(3);
  const doubled = computed(() => count.value + 2);
  </script>
  <template><p>{{ doubled }}</p></template>
checks:
  - match: count\.value\s+\*\s+2
    message: Use count.value * 2 for this step.
  - notMatch: count\.value\s+\+\s+2
    message: Replace count.value + 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why derive `doubled` with `computed(() => count.value * 2)`?
options:
  - It tracks `count` and updates the derived value when needed.
  - It creates a second unrelated mutable source of truth.
  - It computes once and never follows changes.
answer: 0
explain: Computed values derive reactive state instead of duplicating it manually.
```
