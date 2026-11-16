---
title: Document head metadata
icon: "🏷️"
branch: production
requires: [templates]
summary: useHead sets the page title, meta tags and html attributes from any component.
---
**Before and after: the browser tab.** Open five pages of a fresh Nuxt app in five tabs. Every tab says the same thing, or nothing at all. Bookmarks, history and search results all show that same unhelpful title.

**After, step 1: a site-wide default** in `nuxt.config.ts`:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Tasks',
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
});
```

`titleTemplate` wraps every page title: `%s` is replaced by the page's own title. `lang` on `<html>` helps screen readers pick the right pronunciation.

**After, step 2: each page names itself** with `useHead`:

```vue title=app/pages/tasks/index.vue
<script setup lang="ts">
useHead({ title: 'My tasks' });
</script>
```

The tab now reads *My tasks · Tasks*.

**After, step 3: titles that follow your data.** Pass a ref or a getter, and the title updates with it:

```vue title=app/pages/tasks/[id].vue
<script setup lang="ts">
const route = useRoute();
const { data: task } = await useFetch(`/api/tasks/${route.params.id}`);

useHead({
  title: () => task.value?.title ?? 'Task',
});
</script>
```

Because this runs during server rendering, the `<title>` is in the HTML the server sends. Search engines and link previews see it without running any JavaScript.

**Who wins when two components set the title?** The one deeper in the tree, rendered last. The layout can set a fallback, and the page overrides it.

**Beyond the title,** `useHead` handles `meta`, `link`, `script`, `htmlAttrs` and `bodyAttrs`. For meta tags specifically, the [next lesson](node:seo) has a nicer tool.

```compare typescript
// Next.js: export const metadata = { title: '...' }
// or generateMetadata() for data-driven titles.
```

```compare python
# Django: {% block title %}My tasks{% endblock %}
# in a template that extends base.html.
```

```exercise
goal: "Give the settings page the title `Settings` with `useHead`."
lang: vue
code: |-
  <script setup lang="ts">
  </script>

  <template>
    <h1>Settings</h1>
  </template>
checks:
  - match: 'useHead\(\{\s*title:\s*''Settings''\s*,?\s*\}\)'
    message: "Call useHead({ title: 'Settings' }) in the script."
solution: |-
  <script setup lang="ts">
  useHead({ title: 'Settings' });
  </script>

  <template>
    <h1>Settings</h1>
  </template>
```

```quiz
question: "The config has `titleTemplate: '%s · Tasks'`, and a page calls `useHead({ title: 'Inbox' })`. What's in the tab?"
options:
  - Inbox
  - Inbox · Tasks
  - "%s · Tasks"
answer: 1
explain: The template replaces %s with the page title.
```
