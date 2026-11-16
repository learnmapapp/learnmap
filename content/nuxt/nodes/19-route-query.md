---
title: Reactive query parameters
icon: "🔍"
branch: routing
requires: [dynamic, computed]
summary: Keep filters in the URL's query string, so a filtered view can be bookmarked and shared.
---
**The scenario.** Your task list has a filter: *All*, *Open*, *Done*. A colleague asks: "Can you send me the link to the open tasks?" If the filter lives in a ref, you can't: the URL is just `/tasks`. Put it in the URL instead, and it's `/tasks?status=open`.

**Reading the query.** `useRoute().query` holds everything after the `?`:

```vue title=app/pages/tasks/index.vue
<script setup lang="ts">
const route = useRoute();

const status = computed(() => {
  const value = route.query.status;
  return typeof value === 'string' ? value : 'all';
});
</script>

<template>
  <p>Showing {{ status }} tasks</p>
</template>
```

Why the `typeof` check? Query values can be a string, an **array** (`?status=open&status=done`), or missing. TypeScript makes you handle that, and you should: anyone can type anything into a URL.

And why `computed`? Changing only the query keeps the same page component on screen. `route` is reactive, so a computed that reads it updates on its own.

**Writing the query.** Filter buttons are just links to the same page with a different query:

```vue
<template>
  <nav>
    <NuxtLink :to="{ query: { status: 'open' } }">Open</NuxtLink>
    <NuxtLink :to="{ query: { status: 'done' } }">Done</NuxtLink>
    <NuxtLink :to="{ query: {} }">All</NuxtLink>
  </nav>
</template>
```

Leaving out `path` keeps the current page. From code, `navigateTo({ query: { status: 'open' } })` does the same.

**Path or query?** A useful rule of thumb: the **path says what** you're looking at (`/tasks/42`), and the **query says how** you're looking at it (`?sort=date&page=2`).

```compare javascript
// new URLSearchParams(location.search).get('status')
// works, but isn't reactive.
```

```compare python
# Flask: request.args.get('status', 'all')
```

```exercise
goal: "Make `page` a computed number from `route.query.page`, defaulting to 1."
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  const page = 1;
  </script>
checks:
  - match: 'const page = computed\('
    message: Use computed, so page follows the URL.
  - match: 'Number\(route\.query\.page'
    message: Convert route.query.page with Number(...).
  - match: '\|\|\s*1|\?\?\s*1'
    message: Fall back to 1 when the parameter is missing.
solution: |-
  <script setup lang="ts">
  const route = useRoute();
  const page = computed(() => Number(route.query.page) || 1);
  </script>
```

```quiz
question: "The user goes from `/tasks?status=open` to `/tasks?status=done`. What happens to the page component?"
options:
  - It's destroyed and created again.
  - It stays mounted. Code reading route.query reactively updates.
  - Nothing updates until a full reload.
answer: 1
explain: The same page is reused, so read query values reactively, for example inside computed.
```
