---
title: Reactive refs
icon: 🚦
branch: basics
requires:
  - templates
summary: ref creates reactive state.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. ref creates reactive state. Use .value in script; Vue unwraps refs when rendering them in templates. Nuxt auto-imports common Vue APIs.

A useful term here is [[ref]]: A reactive value container accessed through .value in script.

```vue
<script setup lang="ts">
const count = ref(0);
function increment() { count.value += 1; }
</script>
<template><button @click="increment">{{ count }}</button></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reactive refs.
lang: vue
code: |-
  <script setup lang="ts">
  const count = ref(0);
  function increment() { count.value -= 1; }
  </script>
  <template><button @click="increment">{{ count }}</button></template>
checks:
  - match: count\.value\s+\+=\s+1
    message: Use count.value += 1 for this step.
  - notMatch: count\.value\s+\-=\s+1
    message: Replace count.value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How do you increment a `ref(0)` named `count` inside script?
options:
  - "`count += 1`"
  - "`count.current += 1`"
  - "`count.value += 1`"
answer: 2
explain: Refs expose their stored value through `.value` in script.
```
