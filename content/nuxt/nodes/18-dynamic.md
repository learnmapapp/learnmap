---
title: Dynamic route files
icon: "🎯"
branch: routing
requires: [pages]
summary: "A [param] in a file name matches any value; read it with useRoute().params."
---
**One shelf label, many products.** A shop doesn't print a separate page design for every product. It has *one* product page, and the URL says which product to show: `/products/kettle`, `/products/toaster`. In Nuxt, that's a file with brackets in its name:

```text
app/pages/products/[slug].vue
```

`[slug]` matches any single URL segment. Inside the page, `useRoute()` tells you what it matched:

```vue title=app/pages/products/[slug].vue
<script setup lang="ts">
const route = useRoute();
const { data: product } = await useFetch(
  `/api/products/${route.params.slug}`,
);
</script>

<template>
  <h1>{{ product?.name }}</h1>
</template>
```

For `/products/kettle`, `route.params.slug` is `'kettle'`. Always a string, even for `/products/42`; convert with `Number(...)` if you need a number.

**Variations on the brackets:**

| File | Matches | `params` |
| --- | --- | --- |
| `[slug].vue` | `/kettle` | `{ slug: 'kettle' }` |
| `[...path].vue` | `/a/b/c` | `{ path: ['a', 'b', 'c'] }` |
| `[shop]/[slug].vue` | `/oslo/kettle` | `{ shop: 'oslo', slug: 'kettle' }` |

**A specific file beats a bracket.** If both `products/new.vue` and `products/[slug].vue` exist, `/products/new` goes to `new.vue`.

```warn
Going from `/products/kettle` to `/products/toaster` **reuses** the same page component; it isn't created again. Code that reads `route.params.slug` once, outside anything reactive, keeps showing the kettle. Read it inside `computed`, or pass it to `useFetch` as a getter. The lesson on [reactive request keys](node:data-keys) covers this properly.
```

```compare typescript
// Next.js: app/products/[slug]/page.tsx, with params.slug.
```

```compare python
# Flask: @app.route('/products/<slug>')
```

```exercise
goal: "In `app/pages/users/[id].vue`, read the id from the route into `userId`."
lang: vue
code: |-
  <script setup lang="ts">
  const route = useRoute();
  const userId = '';
  </script>

  <template>
    <h1>User {{ userId }}</h1>
  </template>
checks:
  - match: 'const userId = route\.params\.id'
    message: Set userId to route.params.id.
solution: |-
  <script setup lang="ts">
  const route = useRoute();
  const userId = route.params.id;
  </script>

  <template>
    <h1>User {{ userId }}</h1>
  </template>
```

```quiz
question: "File `app/pages/docs/[...path].vue`, URL `/docs/guide/install`. What is `route.params.path`?"
options:
  - "'guide/install'"
  - "['guide', 'install']"
  - "'install'"
answer: 1
explain: A catch-all [...name] collects every remaining segment into an array.
```
