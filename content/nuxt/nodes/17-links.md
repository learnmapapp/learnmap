---
title: Nuxt navigation
icon: 🚦
branch: routing
requires:
  - pages
summary: NuxtLink handles application navigation and can prefetch linked pages.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. NuxtLink handles application navigation and can prefetch linked pages. Use ordinary links when the destination requires ordinary external navigation semantics.

```vue
<template><nav><NuxtLink to="/">Home</NuxtLink><NuxtLink to="/about">About</NuxtLink></nav></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about nuxt navigation.
lang: vue
code: <template><nav><NuxtLink to="/">Home</NuxtLink><NuxtLink
  to="/missing">About</NuxtLink></nav></template>
checks:
  - match: to="/about"
    message: Use to="/about" for this step.
  - notMatch: to="/missing"
    message: Replace to="/missing" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `<NuxtLink to="/about">` provide?
options:
  - Automatic creation of the `/about` page file.
  - A server-side authorization check.
  - Application navigation to an existing route.
answer: 2
explain: NuxtLink supports navigation and prefetching; destinations still need routes.
```
