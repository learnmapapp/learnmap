---
title: Dynamic route files
icon: 🔁
branch: routing
requires:
  - pages
summary: A bracketed filename names a route parameter.
---

In your Nuxt 4 project, save this as `app/pages/courses/[id].vue`. A bracketed filename names a route parameter. Here /courses/vue provides id equal to vue; validate parameters before using them as domain identifiers.

```vue
<script setup lang="ts">
const route = useRoute();
</script>
<template><h1>Course {{ route.params.id }}</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about dynamic route files.
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  </script>
  <template><h1>Course {{ route.params.slug }}</h1></template>
checks:
  - match: route\.params\.id
    message: Use route.params.id for this step.
  - notMatch: route\.params\.slug
    message: Replace route.params.slug in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: In `app/pages/courses/[id].vue`, where is the matched ID available?
options:
  - "`useRoute().params.id`."
  - "`useRoute().query.id` regardless of the URL."
  - "`window.id` as a guaranteed global."
answer: 0
explain: The bracketed filename declares the route parameter name.
```
