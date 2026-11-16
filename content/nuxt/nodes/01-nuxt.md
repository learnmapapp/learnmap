---
title: Meet Nuxt
icon: 💚
branch: core
requires: []
summary: Nuxt combines Vue components, routing, server rendering, and server endpoints.
kind: hub
---

In your Nuxt 4 project, save this as `app/app.vue`. Nuxt combines Vue components, routing, server rendering, and server endpoints. This first example uses the root app component before enabling pages.

```vue
<template>
  <main><h1>Hello, Nuxt!</h1></main>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Nuxt 4 with Vue 3**. Check your local tool version before following examples. See the [official reference](https://nuxt.com/docs/4.x/getting-started/introduction) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Repair the starting example using what you learned about meet nuxt.
lang: vue
code: |-
  <template>
    <main><h1>Hello, world!</h1></main>
  </template>
checks:
  - match: Hello,\s+Nuxt!
    message: Use Hello, Nuxt! for this step.
  - notMatch: Hello,\s+world!
    message: Replace Hello, world! in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about meet nuxt is correct?
options:
  - Every page needs a manually configured React router.
  - Nuxt combines Vue components, routing, server rendering, and server endpoints. This first
    example uses the root app component before enabling pages.
  - Nuxt can render only inside a browser.
answer: 1
explain: Nuxt combines Vue components, routing, server rendering, and server endpoints. This first
  example uses the root app component before enabling pages.
```
