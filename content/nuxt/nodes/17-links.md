---
title: Nuxt navigation
icon: "🔗"
branch: routing
requires: [pages]
summary: NuxtLink moves between pages without a full reload, and prefetches the next page's code.
---
**Try this in your project.** Open the browser's DevTools on the Network tab, then click two kinds of links:

```vue
<template>
  <nav>
    <a href="/about">About (plain link)</a>
    <NuxtLink to="/about">About (NuxtLink)</NuxtLink>
  </nav>
</template>
```

**What you'll see:**

| | `<a href>` | `<NuxtLink to>` |
| --- | --- | --- |
| Network | Full HTML document, all JS again | Only the new page's code, often already cached |
| Screen | White flash while reloading | Instant swap |
| App state | Gone; refs start over | Kept; a playing video keeps playing |

A plain link makes the browser throw the app away and load it again. `<NuxtLink>` asks the client-side router to switch pages *inside* the running app.

**It's still a real `<a>`.** NuxtLink renders a normal anchor with an `href`, so ctrl-click, "open in new tab" and search engines all work.

**It prefetches.** When a link scrolls into view, Nuxt quietly downloads the code for that page. By the time you click, it's ready.

**It handles external links too.** `<NuxtLink to="https://vuejs.org">` notices the link leaves your site and renders a plain anchor. So you can use NuxtLink for every link and not think about it.

**Styling the current page.** The link to the page you're on gets the `router-link-active` class, so a nav bar can highlight it:

```vue
<style scoped>
.router-link-active { font-weight: bold; }
</style>
```

**Navigating from code,** after saving a form for example, use `navigateTo`:

```typescript
async function save() {
  await $fetch('/api/tasks', { method: 'POST', body: form });
  await navigateTo('/tasks');
}
```

```compare typescript
// Next.js: <Link href="/about"> and router.push('/about').
```

```compare javascript
// vue-router: <RouterLink to="/about"> and router.push().
// NuxtLink wraps RouterLink.
```

```exercise
goal: "Turn both nav links into `NuxtLink`s, so navigation doesn't reload the page."
lang: vue
code: |-
  <template>
    <nav>
      <a href="/">Home</a>
      <a href="/tasks">Tasks</a>
    </nav>
  </template>
checks:
  - match: '<NuxtLink to="/">Home</NuxtLink>'
    message: 'Use <NuxtLink to="/">Home</NuxtLink>.'
  - match: '<NuxtLink to="/tasks">Tasks</NuxtLink>'
    message: 'Use <NuxtLink to="/tasks">Tasks</NuxtLink>.'
  - notMatch: '<a href'
    message: Replace both <a> tags.
solution: |-
  <template>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/tasks">Tasks</NuxtLink>
    </nav>
  </template>
```

```quiz
question: "A user is halfway through a form and clicks a plain `<a href=\"/help\">`. What happens to the typed text?"
options:
  - It's kept, because Vue saves all refs.
  - It's lost. The whole page reloads and the app starts over.
  - It's sent to /help as a query string.
answer: 1
explain: A plain link triggers a full document load. NuxtLink would keep the app, and app-level state, alive.
```
