---
title: Turn on pages
icon: "🚪"
branch: routing
requires: [setup]
summary: Replace the single app.vue screen with NuxtPage, so files in app/pages become routes.
---
**"I added a pages folder and nothing happened."** This is one of the first Nuxt puzzles, so let's walk through it.

A new project shows one screen: whatever `app/app.vue` renders. Say you create `app/pages/index.vue` and `app/pages/about.vue`, then visit `/about`. You still see the same `app.vue` content. Why?

Because `app.vue` is the **root of the whole app**, and right now it doesn't say *where* the current page should go. Nuxt needs a placeholder for that:

```vue title=app/app.vue
<template>
  <NuxtPage />
</template>
```

`<NuxtPage />` means "render the page that matches the current URL here." Visit `/about`, and `app/pages/about.vue` appears in that spot. Visit `/`, and you get `index.vue`.

**Anything around `<NuxtPage />` shows on every page.** That makes `app.vue` a natural home for things like a site-wide header:

```vue title=app/app.vue
<template>
  <header>My site</header>
  <NuxtPage />
</template>
```

That works, but once you need different frames for different pages, [layouts](node:layouts) are the tidier tool. They plug in like this:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

```tip
Do you only need one screen, like a small widget? Then you can skip `app/pages/` entirely. Nuxt only adds the router when the folder exists.
```

```compare javascript
// vue-router: <RouterView /> plays the same role
// as <NuxtPage />.
```

```compare typescript
// Next.js: {children} in app/layout.tsx is where
// the page appears.
```

```exercise
goal: "The app still shows the welcome screen. Replace `<NuxtWelcome />` with the page outlet."
lang: vue
code: |-
  <template>
    <NuxtLayout>
      <NuxtWelcome />
    </NuxtLayout>
  </template>
checks:
  - match: '<NuxtPage\s*/>'
    message: Render <NuxtPage /> inside the layout.
  - notMatch: NuxtWelcome
    message: Remove <NuxtWelcome />.
solution: |-
  <template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </template>
```

```quiz
question: "app.vue contains `<nav>…</nav>` followed by `<NuxtPage />`. You visit `/about`. What do you see?"
options:
  - Only the about page.
  - The nav, with the about page below it.
  - The nav twice, once from app.vue and once from the page.
answer: 1
explain: app.vue wraps every page, and NuxtPage marks where the current one goes.
```
