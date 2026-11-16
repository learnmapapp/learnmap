---
title: Enable page rendering
icon: 🔢
branch: routing
requires:
  - setup
summary: NuxtPage renders the active file-based page.
---

In your Nuxt 4 project, save this as `app/app.vue`. NuxtPage renders the active file-based page. NuxtLayout applies the selected layout around it; put application code under app in Nuxt 4.

```vue
<template>
  <NuxtLayout><NuxtPage /></NuxtLayout>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about enable page rendering.
lang: vue
code: |-
  <template>
    <NuxtLayout><NuxtWelcome /></NuxtLayout>
  </template>
checks:
  - match: <NuxtPage\s+/>
    message: Use <NuxtPage /> for this step.
  - notMatch: <NuxtWelcome\s+/>
    message: Replace <NuxtWelcome /> in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about enable page rendering is correct?
options:
  - NuxtPage renders the active file-based page. NuxtLayout applies the selected layout around it;
    put application code under app in Nuxt 4.
  - NuxtPage automatically renders every page at once.
  - Nuxt 4 pages must live inside server/api.
answer: 0
explain: NuxtPage renders the active file-based page. NuxtLayout applies the selected layout around
  it; put application code under app in Nuxt 4.
```
