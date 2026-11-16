---
title: SSR-aware fetching
icon: "📡"
branch: data
requires: [templates]
summary: useFetch loads data once during server rendering and reuses it in the browser.
---
**A story about a request that ran twice.** Maya ports a Vue app to Nuxt. Her task list loads data the way she always has:

```vue
<script setup lang="ts">
const tasks = ref<Task[]>([]);
onMounted(async () => {
  tasks.value = await $fetch('/api/tasks');
});
</script>
```

It works, but she notices two things. Viewing the page source shows an **empty list**: `onMounted` only runs in the browser, so the server rendered the page before any data existed. And the page flashes empty for a moment on every load.

She moves the fetch to the top level of setup, so it runs on the server too:

```typescript
const tasks = await $fetch('/api/tasks');
```

Now the server's HTML has the tasks. But the Network tab shows `/api/tasks` being called **again** in the browser. The server fetched, rendered, and threw the data away; then the browser started setup again and fetched once more.

**The fix is `useFetch`:**

```vue title=app/pages/tasks/index.vue
<script setup lang="ts">
const { data: tasks, status, error } = await useFetch('/api/tasks');
</script>

<template>
  <p v-if="status === 'pending'">Loading…</p>
  <p v-else-if="error">Could not load tasks.</p>
  <ul v-else>
    <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
  </ul>
</template>
```

**What happens now:**

1. On the server, `useFetch` calls the API, and the page renders with real data.
2. Nuxt puts the result into the HTML as a [[payload]].
3. In the browser, `useFetch` finds its data in the payload and **skips the request**.

One request, full HTML, no flash.

**What you get back:** `data` (a ref, `undefined` until loaded), `status` (`'idle'`, `'pending'`, `'success'` or `'error'`), `error`, and `refresh` to load again. When the URL is one of your own `server/api` routes, `data` is even typed from what the route returns.

```tip
Use `useFetch` for data a page or component *displays*. For actions like submitting a form, use plain `$fetch`; there's [a lesson on that](node:mutations).
```

```compare typescript
// Next.js: an async server component that awaits fetch().
// TanStack Query: useQuery with SSR hydration.
```

```compare javascript
// The before code above: fetch in onMounted means
// an empty first render.
```

```exercise
goal: "Load the projects with `useFetch` instead of `onMounted`, so they're in the server-rendered HTML."
lang: vue
code: |-
  <script setup lang="ts">
  const projects = ref([]);
  onMounted(async () => {
    projects.value = await $fetch('/api/projects');
  });
  </script>
checks:
  - match: 'const \{ data: projects \} = await useFetch\(''/api/projects''\)'
    message: "Write const { data: projects } = await useFetch('/api/projects');"
  - notMatch: onMounted
    message: Remove the onMounted fetch.
solution: |-
  <script setup lang="ts">
  const { data: projects } = await useFetch('/api/projects');
  </script>
```

```quiz
question: "A page uses `await useFetch('/api/tasks')` and is loaded directly. How many times is `/api/tasks` called?"
options:
  - Twice, once on the server and once in the browser.
  - Once, on the server. The browser reuses the payload.
  - Once, in the browser only.
answer: 1
explain: The server's result travels in the payload, so the browser skips the request during hydration.
```
