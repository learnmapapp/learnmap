---
title: Consistent initial HTML
icon: "💧"
branch: data
requires: [state]
summary: Hydration needs the server and browser to render the same HTML; keep browser-only values out of the first render.
---
**Spot the mismatch.** One of these components causes a warning in the browser console. Which one?

```vue
<template>
  <p>Welcome back!</p>
</template>
```

```vue
<template>
  <p>Your lucky number is {{ Math.floor(Math.random() * 100) }}</p>
</template>
```

```vue
<script setup lang="ts">
const width = window.innerWidth;
</script>

<template>
  <p>Window width: {{ width }}px</p>
</template>
```

The first is safe. The second and third are both trouble, in different ways. To see why, you need to know what [[hydration]] is.

**What hydration does.** The server renders HTML and sends it. The browser shows it immediately. Then Vue starts up and renders the same components again, *without touching the page*. It walks through the existing HTML, checks that its own result matches, and attaches event listeners and state. After that, the page is interactive.

**Component 2:** the server picks 42, the browser picks 17. Vue finds `42` where it expected `17` and logs a *hydration mismatch*. The page may show the wrong number, or flicker as Vue fixes it.

**Component 3:** `window` doesn't exist on the server, so server rendering crashes with *window is not defined*.

**The fix for both: wait until after hydration.** `onMounted` runs only in the browser, after hydration:

```vue
<script setup lang="ts">
const width = ref<number | null>(null);
onMounted(() => {
  width.value = window.innerWidth;
});
</script>

<template>
  <p v-if="width">Window width: {{ width }}px</p>
</template>
```

Server and browser both render without the paragraph, so they match. Then `onMounted` fills it in.

**Common mismatch sources:** random numbers, `Date.now()` and formatted times (the server's time zone may differ), `window`, `localStorage`, and user-agent sniffing. For random values the server *should* choose, `useState` sends the server's choice along, so both sides agree. For whole components that only make sense in a browser, see [`<ClientOnly>`](node:client-only).

```compare typescript
// React has the same rule and the same warning:
// "Text content does not match server-rendered HTML".
```

```compare javascript
// Without SSR, there's nothing to match: the browser
// renders from scratch, so these bugs don't exist.
```

```exercise
goal: "Fix the mismatch: start `now` as `null` and set it in `onMounted`."
lang: vue
code: |-
  <script setup lang="ts">
  const now = ref(new Date().toLocaleTimeString());
  </script>

  <template>
    <p v-if="now">Loaded at {{ now }}</p>
  </template>
checks:
  - match: 'ref<string \| null>\(null\)'
    message: "Start with const now = ref<string | null>(null);"
  - match: 'onMounted\(\(\)\s*=>\s*\{?\s*now\.value\s*=\s*new Date\(\)\.toLocaleTimeString\(\)'
    message: Set now.value inside onMounted.
solution: |-
  <script setup lang="ts">
  const now = ref<string | null>(null);
  onMounted(() => {
    now.value = new Date().toLocaleTimeString();
  });
  </script>

  <template>
    <p v-if="now">Loaded at {{ now }}</p>
  </template>
```

```quiz
question: "Where does `onMounted` run in a server-rendered Nuxt page?"
options:
  - On the server, before the HTML is sent.
  - Only in the browser, after hydration.
  - Both, once on each side.
answer: 1
explain: Mounting only happens in the browser, which makes onMounted the safe place for browser-only code.
```
