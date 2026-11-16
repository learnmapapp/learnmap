---
title: Event-driven mutations
icon: 🧪
branch: data
requires:
  - models
summary: Use $fetch for a mutation triggered by an event.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Use $fetch for a mutation triggered by an event. Implement the server endpoint separately and show a useful failure state instead of assuming the request succeeds.

```vue
<script setup lang="ts">
const title = ref("");
const message = ref("");
async function save() {
  try {
    await $fetch("/api/tasks", { method: "POST", body: { title: title.value } });
    message.value = "Saved";
  } catch { message.value = "Could not save"; }
}
</script>
<template><form @submit.prevent="save"><label>Title <input v-model="title" /></label><button>Save</button><p role="status">{{ message }}</p></form></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about event-driven mutations.
lang: vue
code: >-
  <script setup lang="ts">

  const title = ref("");

  const message = ref("");

  async function save() {
    try {
      await $fetch("/api/tasks", { method: "GET", body: { title: title.value } });
      message.value = "Saved";
    } catch { message.value = "Could not save"; }
  }

  </script>

  <template><form @submit.prevent="save"><label>Title <input v-model="title"
  /></label><button>Save</button><p role="status">{{ message }}</p></form></template>
checks:
  - match: method:\s+"POST"
    message: 'Use method: "POST" for this step.'
  - notMatch: method:\s+"GET"
    message: 'Replace method: "GET" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which request belongs in a user-triggered task creation handler?
options:
  - A call that mutates imported module state for all users.
  - "`$fetch` with a POST body."
  - A GET request that creates data during every setup pass.
answer: 1
explain: An explicit event handler avoids repeating a mutation as part of rendering.
```
