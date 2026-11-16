---
title: Document head metadata
icon: 🏷️
branch: production
requires:
  - templates
summary: useHead manages document metadata during server rendering and navigation.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. `useHead` manages document metadata during server rendering and navigation. Supply page-specific values so browser tabs and assistive tools describe the current page.

```vue
<script setup lang="ts">
useHead({ title: "Study dashboard", htmlAttrs: { lang: "en" } });
</script>
<template><h1>Study dashboard</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about document head metadata.
lang: vue
code: |-
  <script setup lang="ts">
  useHead({ title: "Untitled", htmlAttrs: { lang: "en" } });
  </script>
  <template><h1>Study dashboard</h1></template>
checks:
  - match: title:\s+"Study\s+dashboard"
    message: 'Use title: "Study dashboard" for this step.'
  - notMatch: title:\s+"Untitled"
    message: 'Replace title: "Untitled" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: 'What does `useHead({ title: "Study dashboard" })` manage?'
options:
  - The visible first heading automatically.
  - The server route's filename.
  - The document title during rendering and navigation.
answer: 2
explain: Head metadata and visible page content are separate responsibilities.
```
