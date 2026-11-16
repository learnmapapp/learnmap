---
title: Shared page layouts
icon: "🖼️"
branch: routing
requires: [app, slots]
summary: Layouts in app/layouts wrap pages with shared chrome; pages pick one with definePageMeta.
---
**A theatre analogy.** The page is the actor; the [[layout]] is the stage set. Most scenes use the same set, a few need a different one, and the actor shouldn't have to build the set every time.

Here's how to design it, one decision at a time.

**Decision 1: what's on every page?** A header and a footer. That's the default layout, and the page goes into its `<slot />`:

```vue title=app/layouts/default.vue
<template>
  <div class="shell">
    <header><NuxtLink to="/">Tasks</NuxtLink></header>
    <main><slot /></main>
    <footer>Made with Nuxt</footer>
  </div>
</template>
```

**Decision 2: tell the app to use layouts.** `app.vue` wraps the page in `<NuxtLayout>`:

```vue title=app/app.vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

Every page now gets the header and footer, with no changes to the pages themselves.

**Decision 3: which pages are different?** The login page should be bare: no header, just a centred form. Give it its own layout:

```vue title=app/layouts/blank.vue
<template>
  <div class="centered"><slot /></div>
</template>
```

And let the page choose it:

```vue title=app/pages/login.vue
<script setup lang="ts">
definePageMeta({ layout: 'blank' });
</script>

<template>
  <LoginForm />
</template>
```

The layout name is the file name: `blank.vue` becomes `'blank'`, and `default.vue` is used when a page doesn't say.

**Why not put the header in `app.vue`?** You could, until the first page that needs a different frame. Layouts give you a named choice per page. And because the layout stays mounted while you move between pages that share it, the header doesn't flicker or reset.

```compare typescript
// Next.js: nested layout.tsx files, chosen by folder.
// Nuxt: named layouts, chosen by each page.
```

```compare python
# Django: {% extends "base.html" %} in each template.
```

```exercise
goal: "Make the admin dashboard use the `admin` layout from `app/layouts/admin.vue`."
lang: vue
code: |-
  <script setup lang="ts">
  </script>

  <template>
    <h1>Dashboard</h1>
  </template>
checks:
  - match: 'definePageMeta\(\{\s*layout:\s*''admin''\s*,?\s*\}\)'
    message: "Call definePageMeta({ layout: 'admin' }) in the script."
solution: |-
  <script setup lang="ts">
  definePageMeta({ layout: 'admin' });
  </script>

  <template>
    <h1>Dashboard</h1>
  </template>
```

```quiz
question: "A layout file is missing `<slot />`. What do pages using it show?"
options:
  - The page, but with no header.
  - The layout's own markup only. The page has nowhere to render.
  - A build error.
answer: 1
explain: The slot is where the page goes. Without one, the page content is dropped.
```
