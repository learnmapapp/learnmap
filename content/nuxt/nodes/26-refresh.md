---
title: Refresh fetched data
icon: "🔄"
branch: data
requires: [use-fetch]
summary: Call refresh() to reload a useFetch result, or refreshNuxtData() to reload by key from anywhere.
---
**Q&A with Fern about stale data.**

**"I added a task, but the list still shows the old ones. Why?"**

`useFetch` loaded the list once and cached it. It has no idea that a different component just changed the data on the server. You need to tell it to look again.

**"How?"**

Every `useFetch` returns a `refresh` function:

```vue
<script setup lang="ts">
const { data: tasks, status, refresh } = await useFetch('/api/tasks');
</script>

<template>
  <NewTask @added="refresh" />
  <TaskList :tasks="tasks ?? []" />
</template>
```

When `NewTask` emits `added`, the list fetches again.

**"Does the list go blank while it reloads?"**

No. `data` keeps the old value until the new one arrives, and `status` is `'pending'` meanwhile. If you want a hint that something's happening, use that:

```vue
<template>
  <TaskList
    :tasks="tasks ?? []"
    :class="{ dim: status === 'pending' }"
  />
</template>
```

**"The component that changes the data is far away from the list. Do I pass `refresh` down through five components?"**

No need. Refresh by **key**, from anywhere:

```typescript
await refreshNuxtData('tasks');
```

That needs a key you know, so give the `useFetch` one: `useFetch('/api/tasks', { key: 'tasks' })`. Call `refreshNuxtData()` without an argument, and every `useFetch` and `useAsyncData` on the page reloads.

**"Can it refresh on a timer?"**

Use `setInterval` in `onMounted` and clear it in `onUnmounted`. Every few seconds is fine for a dashboard; for real-time updates, look at WebSockets or server-sent events.

```compare typescript
// TanStack Query: refetch(), or
// queryClient.invalidateQueries({ queryKey: ['tasks'] }).
```

```compare javascript
// No cache, no problem: just call your load function
// again and replace the array.
```

```exercise
goal: "After deleting, reload the list: destructure `refresh` and call it."
lang: typescript
code: |-
  const { data: tasks } = await useFetch('/api/tasks');

  async function remove(id: number) {
    await $fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  }
checks:
  - match: 'const \{ data: tasks, refresh \}'
    message: Destructure refresh next to data.
  - match: 'await refresh\(\)'
    message: Call await refresh() after the delete.
solution: |-
  const { data: tasks, refresh } = await useFetch('/api/tasks');

  async function remove(id: number) {
    await $fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    await refresh();
  }
```

```quiz
question: "While `refresh()` runs, what is in `data`?"
options:
  - undefined, until the new result arrives.
  - The previous result, until the new one replaces it.
  - An empty array.
answer: 1
explain: data keeps the last value during a refresh; status tells you a request is pending.
```
