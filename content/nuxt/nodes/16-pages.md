---
title: File-based pages
icon: 💬
branch: routing
requires:
  - app
summary: The app/pages/about.vue file creates /about.
---

In your Nuxt 4 project, save this as `app/pages/about.vue`. The app/pages/about.vue file creates /about. NuxtPage in the root app renders the selected route’s component.

```vue
<template><main><h1>About this study club</h1></main></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about file-based pages.
lang: vue
code: <template><main><h1>About this website</h1></main></template>
checks:
  - match: About\s+this\s+study\s+club
    message: Use About this study club for this step.
  - notMatch: About\s+this\s+website
    message: Replace About this website in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about file-based pages is correct?
options:
  - Every page route must be listed manually in an array.
  - The app/pages/about.vue file creates /about. NuxtPage in the root app renders the selected
    route’s component.
  - A file in app/components automatically creates /components routes.
answer: 1
explain: The app/pages/about.vue file creates /about. NuxtPage in the root app renders the selected
  route’s component.
```
