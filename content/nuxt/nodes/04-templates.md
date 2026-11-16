---
title: Single-file components
icon: 💬
branch: basics
requires:
  - setup
summary: A Vue single-file component combines setup logic, a template, and optional styles.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. A Vue single-file component combines setup logic, a template, and optional styles. Double braces render escaped text from setup bindings.

A useful term here is [[single-file component]]: A `.vue` file containing template, script, and optional style sections.

```vue
<script setup lang="ts">
const title = "Study dashboard";
</script>
<template><h1>{{ title }}</h1></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about single-file components.
lang: vue
code: |-
  <script setup lang="ts">
  const title = "Untitled";
  </script>
  <template><h1>{{ title }}</h1></template>
checks:
  - match: '"Study\s+dashboard"'
    message: Use "Study dashboard" for this step.
  - notMatch: '"Untitled"'
    message: Replace "Untitled" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `{{ title }}` in a Vue template render?
options:
  - The literal variable name without evaluation.
  - The binding's value as escaped text.
  - Trusted raw HTML in every case.
answer: 1
explain: Ordinary interpolation displays a value without treating it as arbitrary HTML.
```
