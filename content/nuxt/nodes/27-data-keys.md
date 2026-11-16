---
title: Reactive request keys
icon: "🔑"
branch: data
requires: [dynamic, use-fetch]
summary: Pass refs or getters to useFetch, and it fetches again whenever they change.
---
**Predict the request.** Each snippet runs on a page at `/products/kettle`. Then the user clicks a link to `/products/toaster`, and the **same page component stays mounted**. Does the data follow?

**Puzzle 1.**

```typescript
const route = useRoute();
const { data } = await useFetch(`/api/products/${route.params.slug}`);
```

*Answer: no.* The template string is built **once**, during setup, as `'/api/products/kettle'`. `useFetch` receives a plain string, so it has nothing to watch. You keep seeing the kettle.

**Puzzle 2.**

```typescript
const route = useRoute();
const { data } = await useFetch(
  () => `/api/products/${route.params.slug}`,
);
```

*Answer: yes.* A **getter function** lets `useFetch` re-read the URL. It notices `route.params.slug` change, builds the new URL, and fetches the toaster.

**Puzzle 3.**

```typescript
const page = ref(1);
const { data } = await useFetch('/api/products', {
  query: { page },
});
```

The user clicks *Next*, which runs `page.value++`. *Answer: yes.* Options such as `query` accept refs, and `useFetch` watches them. The request becomes `/api/products?page=2`.

**Puzzle 4.**

```typescript
const page = ref(1);
const { data } = await useFetch('/api/products', {
  query: { page: page.value },
});
```

*Answer: no.* `page.value` is read once, and the number `1` is passed. That's the same trap as puzzle 1.

**The pattern:** give `useFetch` the **ref or a getter**, never a value you've already read out of it. When an input changes, `useFetch` fetches again under a new cache key automatically.

**Need to watch something that isn't part of the request?** Use the `watch` option: `useFetch('/api/stats', { watch: [range] })`.

```compare typescript
// TanStack Query: put the inputs in queryKey,
// e.g. ['product', slug], to refetch on change.
```

```compare javascript
// Manually: watch(slug, load) and call fetch yourself.
```

```exercise
goal: "Make the search reactive: pass the `search` ref itself as the `q` query, not its current value."
lang: typescript
code: |-
  const search = ref('');
  const { data: results } = await useFetch('/api/search', {
    query: { q: search.value },
  });
checks:
  - match: 'query:\s*\{\s*q:\s*search\s*\}'
    message: "Use query: { q: search }, without .value."
solution: |-
  const search = ref('');
  const { data: results } = await useFetch('/api/search', {
    query: { q: search },
  });
```

```quiz
question: "`useFetch(() => '/api/users/' + id.value)`. What happens when `id.value` changes from 3 to 4?"
options:
  - Nothing until you call refresh().
  - It fetches /api/users/4 automatically.
  - It fetches both 3 and 4.
answer: 1
explain: A getter URL is reactive, so useFetch re-evaluates it and fetches again.
```
