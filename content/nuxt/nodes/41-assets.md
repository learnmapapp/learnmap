---
title: Public and bundled assets
icon: 🚦
branch: production
requires:
  - setup
summary: Put logo.svg under the root public directory for this URL.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Put logo.svg under the root public directory for this URL. Files under app/assets enter the bundler through imports or stylesheet references.

```vue
<template><img src="/logo.svg" alt="Study club" width="80" height="80" /></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about public and bundled assets.
lang: vue
code: <template><img src="/logo.svg" alt="" width="80" height="80" /></template>
checks:
  - match: alt="Study\s+club"
    message: Use alt="Study club" for this step.
  - notMatch: alt=""
    message: Replace alt="" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about public and bundled assets is correct?
options:
  - All app/assets files are automatically served at /assets unchanged.
  - A public image never needs alternative text.
  - Put logo.svg under the root public directory for this URL. Files under app/assets enter the
    bundler through imports or stylesheet references.
answer: 2
explain: Put logo.svg under the root public directory for this URL. Files under app/assets enter the
  bundler through imports or stylesheet references.
```
