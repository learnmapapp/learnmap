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
question: Does hiding an admin button with `v-if` secure its server endpoint?
options:
  - Only when the button has a unique key.
  - No; the endpoint must enforce authorization itself.
  - Yes; the browser condition cannot be bypassed.
answer: 1
explain: A display condition controls UI, not who can send a server request.
```
