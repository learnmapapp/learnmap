---
title: Client-only UI boundaries
icon: "🖥️"
branch: production
requires: [hydration]
summary: Wrap browser-only components in ClientOnly, or name them .client.vue, so the server skips them.
---
**It starts with an error message.** You add a map widget from npm, reload, and get:

```text
[nuxt] [request error] [unhandled] [500] window is not defined
  at node_modules/leaflet/dist/leaflet-src.js:230:17
```

**Reading it.** `[500]` and `request error` mean it happened during **server rendering**. `window is not defined` means some code used a browser global. And the stack trace points into `leaflet`, the map library, not your code. Many libraries assume they always run in a browser, and they touch `window` the moment they're imported or set up.

You can't edit the library. But you can tell Nuxt not to render that component on the server:

```vue title=app/pages/stores.vue
<template>
  <h1>Find a store</h1>
  <ClientOnly>
    <StoreMap :stores="stores" />
    <template #fallback>
      <div class="map-placeholder">Loading map…</div>
    </template>
  </ClientOnly>
</template>
```

**What happens now:**

1. The server renders the heading and the **fallback**, and skips `StoreMap` entirely.
2. The browser hydrates that HTML; nothing mismatches, because the fallback is what both sides render first.
3. After hydration, `ClientOnly` swaps the fallback for the real map.

Give the fallback the same size as the real component, so the page doesn't jump when the map appears.

**The file-name shortcut.** If a component should *never* render on the server, name it `StoreMap.client.vue`. It then behaves as if it were always wrapped in `ClientOnly`. (`.server.vue` exists too, for components that only render on the server.)

**When to reach for this,** from most to least preferred:

1. Code that touches the browser can go in `onMounted` ([hydration lesson](node:hydration)). Use that for a few lines.
2. A component that can't render on the server at all: `<ClientOnly>` or `.client.vue`.
3. A whole section of the site: `ssr: false` in [route rules](node:route-rules).

```compare typescript
// Next.js: dynamic(() => import('./Map'), { ssr: false })
// or 'use client' plus a mounted check.
```

```compare javascript
// Without SSR there's no server pass,
// so this problem never comes up.
```

```exercise
goal: "The chart crashes server rendering. Wrap `<SalesChart />` in `<ClientOnly>`."
lang: vue
code: |-
  <template>
    <h2>Sales</h2>
    <SalesChart :data="sales" />
  </template>
checks:
  - match: '<ClientOnly>\s*<SalesChart :data="sales" />\s*'
    message: Put <ClientOnly> right around <SalesChart :data="sales" />.
  - match: '</ClientOnly>'
    message: Close the </ClientOnly> tag.
solution: |-
  <template>
    <h2>Sales</h2>
    <ClientOnly>
      <SalesChart :data="sales" />
    </ClientOnly>
  </template>
```

```quiz
question: "What does the server render in place of a `<ClientOnly>` block?"
options:
  - The component, but without event handlers.
  - Its fallback slot, or nothing if there isn't one.
  - A loading spinner provided by Nuxt.
answer: 1
explain: The server skips the content and renders only the fallback; the browser fills in the real component.
```
