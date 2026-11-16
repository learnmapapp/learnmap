---
title: Named async data
icon: "⏳"
branch: data
requires: [use-fetch]
summary: useAsyncData does what useFetch does for any async function, under a key you choose.
---
**Decision guide: `useFetch` or `useAsyncData`?**

*Are you calling a URL with a plain request?* Use `useFetch`. It's the short form, and Nuxt builds a cache key from the URL for you.

*Is it something else?* A third-party SDK, a CMS client, several requests combined into one result, some processing before you display it? Then use `useAsyncData`. You give it a **key** and **any async function**:

```vue
<script setup lang="ts">
const { data } = await useAsyncData('dashboard', async () => {
  const [tasks, user] = await Promise.all([
    $fetch('/api/tasks'),
    $fetch('/api/me'),
  ]);
  return { user, openCount: tasks.filter((t) => !t.done).length };
});
</script>

<template>
  <p>
    {{ data?.user.name }} has
    {{ data?.openCount }} open tasks.
  </p>
</template>
```

All the benefits from the previous lesson still apply: one run on the server, the result sent as a [[payload]], no second request in the browser.

**In fact, `useFetch` is built on it.** These two lines are close to equivalent:

```typescript
useFetch('/api/tasks');
useAsyncData('/api/tasks', () => $fetch('/api/tasks'));
```

**What's the key for?** It names the result in the payload, so the browser can find it again. It's also a handle: two components that use the same key share the data, and `refreshNuxtData('dashboard')` reloads it from anywhere.

**Pick keys like you'd name a variable:** unique and descriptive. If the data depends on a parameter, put it in the key, like `` `task-${id}` ``, or two different tasks would share one cache entry.

```warn
Don't use `useAsyncData` to *call* something, such as sending an email. It's for reading data you display. Its function may also run again on refresh.
```

```compare typescript
// TanStack Query: useQuery({ queryKey: ['dashboard'],
//   queryFn }) is the same key + function shape.
```

```compare python
# Like a cached function keyed by name. Compare
# Django's cache.get_or_set('dashboard', compute).
```

```exercise
goal: "Load the weather through the SDK with `useAsyncData`, under the key `'weather'`."
lang: typescript
code: |-
  const client = useWeatherClient();
  const forecast = await client.today('Utrecht');
checks:
  - match: 'const \{ data: forecast \} = await useAsyncData\(\s*''weather'','
    message: "Write const { data: forecast } = await useAsyncData('weather', ...)."
  - match: '\(\)\s*=>\s*client\.today\(''Utrecht''\)'
    message: "Pass a function: () => client.today('Utrecht')."
solution: |-
  const client = useWeatherClient();
  const { data: forecast } = await useAsyncData('weather', () =>
    client.today('Utrecht'),
  );
```

```quiz
question: "A product page uses `useAsyncData('product', ...)` for every product id. What goes wrong?"
options:
  - Nothing. Keys are only labels.
  - Different products share one cache entry, so you can see the wrong product.
  - The build fails because keys must be unique.
answer: 1
explain: The key identifies the data. Include the id, like `product-${id}`, so each product gets its own.
```
