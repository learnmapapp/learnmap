---
title: File-based pages
icon: "🗂️"
branch: routing
requires: [app]
summary: Every .vue file in app/pages becomes a route; folders become URL segments.
---
**The map game.** Nuxt turns your `app/pages/` folder into routes. Here's the rule set, all of it:

1. Each `.vue` file is a page; its path is the URL.
2. `index.vue` is the folder's own URL.
3. A folder adds a segment.
4. A name in `[brackets]` matches any value (more on that in [dynamic routes](node:dynamic)).

Now cover the right column and work out each URL yourself:

| File | URL |
| --- | --- |
| `app/pages/index.vue` | `/` |
| `app/pages/about.vue` | `/about` |
| `app/pages/tasks/index.vue` | `/tasks` |
| `app/pages/tasks/archive.vue` | `/tasks/archive` |
| `app/pages/tasks/[id].vue` | `/tasks/42`, `/tasks/abc`, … |
| `app/pages/settings/profile.vue` | `/settings/profile` |

**A page is just a component.** Nothing special to export:

```vue title=app/pages/about.vue
<template>
  <main>
    <h1>About</h1>
    <p>A tiny task app, built while learning Nuxt.</p>
  </main>
</template>
```

Remember that pages only appear once `app/app.vue` renders [`<NuxtPage />`](node:app).

**What about a URL nobody made?** If no file matches, Nuxt shows a 404 error page. Want your own? A catch-all file, `app/pages/[...slug].vue`, matches anything not claimed by another file.

**Pages can declare things about themselves** with `definePageMeta`. You'll use it for [layouts](node:layouts) and [middleware](node:route-middleware):

```vue
<script setup lang="ts">
definePageMeta({ layout: 'admin' });
</script>
```

```compare typescript
// Next.js App Router: app/tasks/page.tsx is /tasks.
// Nuxt uses tasks/index.vue for the same idea.
```

```compare python
# Flask: @app.route('/tasks/archive') on a function.
# In Nuxt, the file location is the decorator.
```

```exercise
goal: "Which file serves `/settings/billing`? Write the path, starting with `app/pages/`."
lang: text
code: |-
  app/pages/
checks:
  - match: '^app/pages/settings/billing\.vue$'
    message: A folder per segment, then the file. The path ends in .vue.
solution: |-
  app/pages/settings/billing.vue
```

```quiz
question: "Both `app/pages/tasks.vue` and `app/pages/tasks/index.vue` exist. What is `tasks.vue` now?"
options:
  - A conflict; the build fails.
  - "A parent route: it wraps the pages in tasks/, which render inside its own <NuxtPage />."
  - It's ignored.
answer: 1
explain: A file next to a folder of the same name becomes a parent route with nested children.
```
