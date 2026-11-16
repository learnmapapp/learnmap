---
title: Shared page layouts
icon: 🔧
branch: routing
requires:
  - app
  - slots
summary: The default layout wraps pages through its slot.
---

In your Nuxt 4 project, save this as `app/layouts/default.vue`. The default layout wraps pages through its slot. Add named layout files and select one using `definePageMeta` when a section needs a different shell.

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
question: Where should a Nuxt layout render its page content?
options:
  - Through a second root `createApp` call.
  - By importing every page manually.
  - Through a `<slot />`.
answer: 2
explain: NuxtLayout supplies the selected page as layout content.
```
