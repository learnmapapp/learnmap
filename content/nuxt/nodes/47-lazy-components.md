---
title: Lazy component imports
icon: 🛠️
branch: components
requires:
  - auto-components
summary: The Lazy prefix requests a lazy-loaded component.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. The Lazy prefix requests a lazy-loaded component. Conditional rendering controls when it is needed; test loading behavior in a production build.

```vue
<script setup lang="ts">
const open = ref(false);
</script>
<template><button @click="open = true">Show task</button><LazyTaskCard v-if="open" title="Practice" /></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about lazy component imports.
lang: vue
code: >-
  <script setup lang="ts">

  const open = ref(false);

  </script>

  <template><button @click="open = true">Show task</button><LazyTaskCard v-if="!open"
  title="Practice" /></template>
checks:
  - match: v\-if="open"
    message: Use v-if="open" for this step.
  - notMatch: v\-if="!open"
    message: Replace v-if="!open" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about lazy component imports is correct?
options:
  - Lazy means the component never ships any JavaScript.
  - A Lazy prefix creates a database query automatically.
  - The Lazy prefix requests a lazy-loaded component. Conditional rendering controls when it is
    needed; test loading behavior in a production build.
answer: 2
explain: The Lazy prefix requests a lazy-loaded component. Conditional rendering controls when it is
  needed; test loading behavior in a production build.
```
