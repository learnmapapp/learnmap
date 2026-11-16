---
title: Shared page layouts
icon: 🔧
branch: routing
requires:
  - app
  - slots
summary: The default layout wraps pages through its slot.
---

In your Nuxt 4 project, save this as `app/layouts/default.vue`. The default layout wraps pages through its slot. Add named layout files and select one using definePageMeta when a section needs a different shell.

```vue
<template>
  <div><header><NuxtLink to="/">Study club</NuxtLink></header><main><slot /></main></div>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about shared page layouts.
lang: vue
code: |-
  <template>
    <div><header><NuxtLink to="/">Study group</NuxtLink></header><main><slot /></main></div>
  </template>
checks:
  - match: Study\s+club
    message: Use Study club for this step.
  - notMatch: Study\s+group
    message: Replace Study group in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about shared page layouts is correct?
options:
  - A layout should render NuxtPage again inside every slot.
  - Layouts are only CSS files.
  - The default layout wraps pages through its slot. Add named layout files and select one using
    definePageMeta when a section needs a different shell.
answer: 2
explain: The default layout wraps pages through its slot. Add named layout files and select one
  using definePageMeta when a section needs a different shell.
```
