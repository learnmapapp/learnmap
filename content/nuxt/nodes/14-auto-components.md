---
title: Auto-imported components
icon: 🏷️
branch: components
requires:
  - props
summary: A TaskCard.vue file under app/components is available through Nuxt component auto-imports.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. A `TaskCard.vue` file under `app/components` is available through Nuxt component auto-imports. A leading colon binds an expression instead of a literal string.

```vue
<template><TaskCard title="Learn Nuxt" :done="false" /></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about auto-imported components.
lang: vue
code: <template><TaskCard title="Learn Nuxt" :done="true" /></template>
checks:
  - match: :done="false"
    message: Use :done="false" for this step.
  - notMatch: :done="true"
    message: Replace :done="true" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where does Nuxt look for the auto-imported `TaskCard.vue` in this course?
options:
  - "`server/api/`."
  - "`public/`."
  - "`app/components/`."
answer: 2
explain: Nuxt 4 uses the app component directory for component auto-imports.
```
