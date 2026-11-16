---
title: Typed SEO metadata
icon: 🔢
branch: production
requires:
  - head
summary: useSeoMeta offers typed fields for common metadata.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. useSeoMeta offers typed fields for common metadata. Keep descriptions accurate and include publicly reachable images when adding social previews.

```vue
<script setup lang="ts">
useSeoMeta({ title: "Nuxt notes", description: "Practical notes for learning Nuxt.", ogTitle: "Nuxt notes" });
</script>
<template><h1>Nuxt notes</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about typed seo metadata.
lang: vue
code: >-
  <script setup lang="ts">

  useSeoMeta({ title: "Nuxt notes", description: "Practical notes for learning Nuxt.", ogTitle:
  "Untitled" });

  </script>

  <template><h1>Nuxt notes</h1></template>
checks:
  - match: ogTitle:\s+"Nuxt\s+notes"
    message: 'Use ogTitle: "Nuxt notes" for this step.'
  - notMatch: ogTitle:\s+"Untitled"
    message: 'Replace ogTitle: "Untitled" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about typed seo metadata is correct?
options:
  - useSeoMeta offers typed fields for common metadata. Keep descriptions accurate and include
    publicly reachable images when adding social previews.
  - SEO metadata guarantees a search ranking.
  - All Open Graph images can point to localhost.
answer: 0
explain: useSeoMeta offers typed fields for common metadata. Keep descriptions accurate and include
  publicly reachable images when adding social previews.
```
