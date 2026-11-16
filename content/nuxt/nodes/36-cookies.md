---
title: Cookie preferences
icon: 🌐
branch: server
requires:
  - state
summary: useCookie exposes an SSR-aware cookie ref for serializable preferences.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. useCookie exposes an SSR-aware cookie ref for serializable preferences. Authentication cookies need appropriate server-only access and security settings.

```vue
<script setup lang="ts">
const theme = useCookie<string>("theme", { default: () => "light", sameSite: "lax" });
</script>
<template><button @click="theme = theme === 'light' ? 'dark' : 'light'">Theme: {{ theme }}</button></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about cookie preferences.
lang: vue
code: >-
  <script setup lang="ts">

  const theme = useCookie<string>("theme", { default: () => "light", sameSite: "none" });

  </script>

  <template><button @click="theme = theme === 'light' ? 'dark' : 'light'">Theme: {{ theme
  }}</button></template>
checks:
  - match: sameSite:\s+"lax"
    message: 'Use sameSite: "lax" for this step.'
  - notMatch: sameSite:\s+"none"
    message: 'Replace sameSite: "none" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about cookie preferences is correct?
options:
  - useCookie exposes an SSR-aware cookie ref for serializable preferences. Authentication cookies
    need appropriate server-only access and security settings.
  - A theme cookie is proof of authentication.
  - Every cookie should be readable by browser JavaScript.
answer: 0
explain: useCookie exposes an SSR-aware cookie ref for serializable preferences. Authentication
  cookies need appropriate server-only access and security settings.
```
