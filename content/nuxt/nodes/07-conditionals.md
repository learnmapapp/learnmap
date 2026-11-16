---
title: Conditional rendering
icon: 📋
branch: basics
requires:
  - refs
summary: v-if conditionally creates markup; v-else supplies the alternative.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. v-if conditionally creates markup; v-else supplies the alternative. A UI condition does not enforce server-side authorization.

```vue
<script setup lang="ts">
const signedIn = ref(false);
</script>
<template><p v-if="signedIn">Welcome back</p><p v-else>Please sign in</p></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about conditional rendering.
lang: vue
code: |-
  <script setup lang="ts">
  const signedIn = ref(false);
  </script>
  <template><p v-if="!signedIn">Welcome back</p><p v-else>Please sign in</p></template>
checks:
  - match: v\-if="signedIn"
    message: Use v-if="signedIn" for this step.
  - notMatch: v\-if="!signedIn"
    message: Replace v-if="!signedIn" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about conditional rendering is correct?
options:
  - v-if and v-else always render both branches.
  - v-if conditionally creates markup; v-else supplies the alternative. A UI condition does not
    enforce server-side authorization.
  - Hiding a button authorizes the corresponding API securely.
answer: 1
explain: v-if conditionally creates markup; v-else supplies the alternative. A UI condition does not
  enforce server-side authorization.
```
