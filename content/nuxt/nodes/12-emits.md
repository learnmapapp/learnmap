---
title: Typed component events
icon: 🌐
branch: components
requires:
  - props
summary: defineEmits declares events a component can send to its parent.
---

In your Nuxt 4 project, save this as `app/components/FinishButton.vue`. defineEmits declares events a component can send to its parent. The parent handles @finish and owns the resulting state change.

```vue
<script setup lang="ts">
const emit = defineEmits<{ finish: [id: string] }>();
</script>
<template><button @click="emit('finish', 'task-1')">Finish task</button></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about typed component events.
lang: vue
code: |-
  <script setup lang="ts">
  const emit = defineEmits<{ finish: [id: string] }>();
  </script>
  <template><button @click="emit('finish', 'task-2')">Finish task</button></template>
checks:
  - match: emit\('finish',\s+'task\-1'\)
    message: Use emit('finish', 'task-1') for this step.
  - notMatch: emit\('finish',\s+'task\-2'\)
    message: Replace emit('finish', 'task-2') in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about typed component events is correct?
options:
  - defineEmits declares events a component can send to its parent. The parent handles @finish and
    owns the resulting state change.
  - Component events automatically update an unrelated global store.
  - Every emitted event becomes an HTTP request.
answer: 0
explain: defineEmits declares events a component can send to its parent. The parent handles @finish
  and owns the resulting state change.
```
