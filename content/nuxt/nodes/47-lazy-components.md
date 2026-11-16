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
question: What does the `Lazy` prefix request for `LazyTaskCard`?
options:
  - Automatic persistence of the component's props.
  - A component that never needs browser code.
  - A lazy-loaded component import.
answer: 2
explain: Conditional use can postpone loading; verify the behavior in a production build.
```
