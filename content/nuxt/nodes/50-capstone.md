---
title: A task dashboard
icon: 🏷️
branch: production
requires:
  - validation
  - use-fetch
  - mutations
  - layouts
  - testing
summary: Connect the course endpoint, validated POST handler, and default layout.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Connect the course endpoint, validated POST handler, and default layout. This accepts tasks without storing them; add a persistence layer and tests for invalid input and request failure as the next milestone.

```vue
<script setup lang="ts">
const title = ref("");
const message = ref("");
const { data: course, error } = await useFetch<{ title: string }>("/api/course");
async function addTask() {
  try {
    const task = await $fetch<{ title: string }>("/api/tasks", { method: "POST", body: { title: title.value } });
    message.value = `Accepted: ${task.title}`;
    title.value = "";
  } catch { message.value = "Please enter a valid title or try again"; }
}
</script>
<template>
  <h1>{{ course?.title ?? "Study dashboard" }}</h1>
  <p v-if="error">Course could not be loaded.</p>
  <form @submit.prevent="addTask"><label>Task <input v-model="title" required /></label><button>Add task</button></form>
  <p role="status">{{ message }}</p>
</template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a task dashboard.
lang: vue
code: >-
  <script setup lang="ts">

  const title = ref("");

  const message = ref("");

  const { data: course, error } = await useFetch<{ title: string }>("/api/course");

  async function addTask() {
    try {
      const task = await $fetch<{ title: string }>("/api/tasks", { method: "GET", body: { title: title.value } });
      message.value = `Accepted: ${task.title}`;
      title.value = "";
    } catch { message.value = "Please enter a valid title or try again"; }
  }

  </script>

  <template>
    <h1>{{ course?.title ?? "Study dashboard" }}</h1>
    <p v-if="error">Course could not be loaded.</p>
    <form @submit.prevent="addTask"><label>Task <input v-model="title" required /></label><button>Add task</button></form>
    <p role="status">{{ message }}</p>
  </template>
checks:
  - match: method:\s+"POST"
    message: 'Use method: "POST" for this step.'
  - notMatch: method:\s+"GET"
    message: 'Replace method: "GET" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about a task dashboard is correct?
options:
  - Returning an accepted task automatically makes it durable.
  - The client form eliminates the need for server validation.
  - Connect the course endpoint, validated POST handler, and default layout. This accepts tasks
    without storing them; add a persistence layer and tests for invalid input and request failure as
    the next milestone.
answer: 2
explain: Connect the course endpoint, validated POST handler, and default layout. This accepts tasks
  without storing them; add a persistence layer and tests for invalid input and request failure as
  the next milestone.
```
