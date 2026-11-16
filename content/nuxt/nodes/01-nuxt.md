---
title: Meet Nuxt
icon: "💚"
branch: core
requires: []
summary: What Nuxt adds on top of Vue, and what a first Nuxt page looks like.
kind: hub
---
**Vue gives you components. Nuxt gives you the rest of the app.** If you've used Vue on its own, you've probably spent time wiring things together: a router, a build setup, a way to fetch data, an API server somewhere else. Nuxt makes those decisions for you, using folders and naming conventions:

- **Pages from files.** `app/pages/about.vue` becomes `/about`. No router config.
- **[[server-side rendering|Server rendering]].** Pages arrive in the browser as finished HTML, then Vue takes over. Fast first loads, and search engines see your content.
- **Data fetching that knows about the server.** `useFetch` loads data once on the server and hands it to the browser.
- **A backend in the same project.** A file in `server/api/` is an API endpoint.
- **No import lists.** Components and composables are [[auto-import|auto-imported]].

**Here's the smallest Nuxt app.** In a new project (the [next lesson](node:setup) creates one), the whole app starts at one file:

```vue title=app/app.vue
<script setup lang="ts">
const name = 'Nuxt';
</script>

<template>
  <main>
    <h1>Hello, {{ name }}!</h1>
  </main>
</template>
```

If you know Vue, nothing here is new: a `<script setup>` block and a template with `{{ }}` interpolation. That's on purpose. **Everything you know about Vue still applies**; Nuxt adds conventions around it. If you're new to Vue too, the *Vue foundations* branch covers what you need.

**How this course works.** Each lesson has a small example, an exercise you solve in the browser, and a quick question. The exercises check your code with simple pattern matching, so they won't run it. To see it really work, keep a Nuxt project open next to this map.

```compare javascript
// Plain Vue + Vite: you add vue-router, a fetch layer,
// SSR setup and a separate API server yourself.
```

```compare typescript
// Next.js is the closest relative: the same idea,
// built on React instead of Vue.
```

```compare python
# Django also bundles routing, templates and a server.
# Nuxt does it with Vue components on both sides.
```

```exercise
goal: "Make the page greet Nuxt: set `name` to `'Nuxt'`."
lang: vue
code: |-
  <script setup lang="ts">
  const name = 'world';
  </script>

  <template>
    <main>
      <h1>Hello, {{ name }}!</h1>
    </main>
  </template>
checks:
  - match: "const name = ['\"]Nuxt['\"]"
    message: "Change the value of name to 'Nuxt'."
  - match: '\{\{\s*name\s*\}\}'
    message: Keep {{ name }} in the template.
solution: |-
  <script setup lang="ts">
  const name = 'Nuxt';
  </script>

  <template>
    <main>
      <h1>Hello, {{ name }}!</h1>
    </main>
  </template>
```

```quiz
question: "Where does a Nuxt project put a page that should appear at `/about`?"
options:
  - In a router config file, as a route object.
  - "In `app/pages/about.vue`. The file name is the route."
  - "In `server/api/about.ts`."
answer: 1
explain: Nuxt builds the router from the files in app/pages. server/api is for API endpoints.
```
