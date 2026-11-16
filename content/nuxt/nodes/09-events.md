---
title: Handle user events
icon: 🧩
branch: basics
requires:
  - refs
summary: The @ shorthand registers an event handler.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. The @ shorthand registers an event handler. Keep complex event logic in a named setup function instead of a long template expression.

```vue
<script setup lang="ts">
const message = ref("Ready");
</script>
<template><button @click="message = 'Saved'">Save</button><p>{{ message }}</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about handle user events.
lang: vue
code: |-
  <script setup lang="ts">
  const message = ref("Ready");
  </script>
  <template><button @dblclick="message = 'Saved'">Save</button><p>{{ message }}</p></template>
checks:
  - match: "@click"
    message: Use @click for this step.
  - notMatch: "@dblclick"
    message: Replace @dblclick in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about handle user events is correct?
options:
  - The @ shorthand registers an event handler. Keep complex event logic in a named setup function
    instead of a long template expression.
  - "@click executes only at static build time."
  - A DOM click requires a server route.
answer: 0
explain: The @ shorthand registers an event handler. Keep complex event logic in a named setup
  function instead of a long template expression.
```
