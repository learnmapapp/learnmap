---
title: Route errors
icon: 📦
branch: routing
requires:
  - dynamic
summary: createError expresses a failure with an appropriate HTTP status.
---

In your Nuxt 4 project, save this as `app/pages/courses/[id].vue`. createError expresses a failure with an appropriate HTTP status. On server-rendered requests a missing resource should be distinguished from an unexpected server error.

```vue
<script setup lang="ts">
const route = useRoute();
if (route.params.id !== "nuxt") {
  throw createError({ statusCode: 404, statusMessage: "Course not found" });
}
</script>
<template><h1>Nuxt course</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about route errors.
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  if (route.params.id !== "nuxt") {
    throw createError({ statusCode: 500, statusMessage: "Course not found" });
  }
  </script>
  <template><h1>Nuxt course</h1></template>
checks:
  - match: statusCode:\s+404
    message: "Use statusCode: 404 for this step."
  - notMatch: statusCode:\s+500
    message: "Replace statusCode: 500 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about route errors is correct?
options:
  - All failures have the same HTTP meaning.
  - createError expresses a failure with an appropriate HTTP status. On server-rendered requests a
    missing resource should be distinguished from an unexpected server error.
  - Every missing resource should always return 200.
answer: 1
explain: createError expresses a failure with an appropriate HTTP status. On server-rendered
  requests a missing resource should be distinguished from an unexpected server error.
```
