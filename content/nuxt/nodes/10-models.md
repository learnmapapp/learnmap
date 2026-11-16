---
title: Form bindings
icon: 📦
branch: basics
requires:
  - refs
summary: v-model connects an input with reactive state.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. v-model connects an input with reactive state. The trim modifier normalizes surrounding whitespace, while server validation remains necessary for submitted data.

```vue
<script setup lang="ts">
const title = ref("");
</script>
<template><label>Task title <input v-model.trim="title" /></label><p>{{ title }}</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about form bindings.
lang: vue
code: |-
  <script setup lang="ts">
  const title = ref("");
  </script>
  <template><label>Task title <input v-model="title" /></label><p>{{ title }}</p></template>
checks:
  - match: v\-model\.trim="title"
    message: Use v-model.trim="title" for this step.
  - notMatch: v\-model="title"
    message: Replace v-model="title" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does the `.trim` modifier in `v-model.trim` do?
options:
  - Performs all server-side validation automatically.
  - Removes surrounding whitespace from the bound input text.
  - Converts every input to an integer.
answer: 1
explain: The modifier normalizes input but does not replace validation at the server boundary.
```
