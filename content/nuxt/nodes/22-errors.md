---
title: Route errors
icon: "🚨"
branch: routing
requires: [dynamic]
summary: Throw createError for missing data, and design your own app/error.vue page.
---
**A short tour of what happens when things go wrong.**

**Stop 1: the problem.** Someone opens `/tasks/9999`, and that task doesn't exist. Without any handling, your page renders with `task` empty: a blank heading, maybe a crash on `task.title`. The status code is 200, so search engines index an empty page.

**Stop 2: say so.** Throw an error with a status code:

```vue title=app/pages/tasks/[id].vue
<script setup lang="ts">
const route = useRoute();
const { data: task } = await useFetch(`/api/tasks/${route.params.id}`);

if (!task.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Task not found',
  });
}
</script>

<template>
  <h1>{{ task?.title }}</h1>
</template>
```

During server rendering, this sends a real **404** status and shows Nuxt's error page instead.

**Stop 3: the error page.** Nuxt's default error page is plain. Make your own by adding `app/error.vue`. Note: it sits next to `app.vue`, *not* in `pages/`:

```vue title=app/error.vue
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();
const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <main>
    <h1>{{ props.error.statusCode }}</h1>
    <p>{{ props.error.statusMessage }}</p>
    <button @click="handleError">Back to safety</button>
  </main>
</template>
```

`clearError` resets the error state, and with `redirect` it also moves to a safe page. Without it, the error page stays put.

**Stop 4: small failures.** Not every problem deserves a full-page error. A failing comments widget shouldn't take the whole post down. Wrap the risky part in `<NuxtErrorBoundary>`:

```vue
<template>
  <NuxtErrorBoundary>
    <CommentList />
    <template #error="{ clearError }">
      <p>Comments failed to load.</p>
      <button @click="clearError">Retry</button>
    </template>
  </NuxtErrorBoundary>
</template>
```

```compare python
# Django: raise Http404("Task not found")
```

```compare typescript
// Next.js: notFound() plus a not-found.tsx file.
```

```exercise
goal: "When no product is found, throw a 404 with `createError`."
lang: typescript
code: |-
  const { data: product } = await useFetch('/api/products/kettle');

  if (!product.value) {
  }
checks:
  - match: 'throw createError\(\{\s*statusCode:\s*404'
    message: "Inside the if: throw createError({ statusCode: 404, ... })."
solution: |-
  const { data: product } = await useFetch('/api/products/kettle');

  if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' });
  }
```

```quiz
question: "Where does a custom full-page error component live in Nuxt 4?"
options:
  - app/pages/error.vue
  - app/error.vue
  - server/error.ts
answer: 1
explain: error.vue sits next to app.vue. Inside pages/ it would just be a route called /error.
```
