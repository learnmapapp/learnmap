---
title: Scoped component CSS
icon: 💬
branch: production
requires:
  - templates
summary: scoped styles target this component’s markup through generated attributes.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. scoped styles target this component’s markup through generated attributes. Global design defaults can be imported separately through Nuxt configuration.

```vue
<template><p class="note">Practice daily.</p></template>
<style scoped>
.note { line-height: 1.6; color: rebeccapurple; }
</style>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scoped component css.
lang: vue
code: |-
  <template><p class="note">Practice daily.</p></template>
  <style>
  .note { line-height: 1.6; color: rebeccapurple; }
  </style>
checks:
  - match: <style\s+scoped>
    message: Use <style scoped> for this step.
  - notMatch: <style>
    message: Replace <style> in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `<style scoped>` limit?
options:
  - All styling to a separate browser iframe.
  - Which component markup its generated selectors target.
  - Every possible inherited CSS effect.
answer: 1
explain: Vue scopes selectors with generated attributes rather than isolating an entire document.
```
