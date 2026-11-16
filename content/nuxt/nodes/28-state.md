---
title: SSR-safe shared state
icon: "🤝"
branch: data
requires: [refs]
summary: useState shares a value across components and survives the trip from server to browser.
---
**A cautionary tale.** Sam needs the logged-in user in many components, so they make a shared ref in a module:

```typescript title=app/composables/user.ts
export const currentUser = ref<User | null>(null);
```

In a single-page app, that's fine. In Nuxt, it's a **data leak**. On the server, a module is loaded once and shared by *every request from every visitor*. Alice logs in, her request sets `currentUser`, and while it's rendering, Bob's request reads it. Bob's page says "Hi Alice".

**The fix: `useState`.**

```typescript title=app/composables/useCurrentUser.ts
export const useCurrentUser = () =>
  useState<User | null>('current-user', () => null);
```

```vue
<script setup lang="ts">
const user = useCurrentUser();
</script>

<template>
  <p v-if="user">Hi {{ user.name }}</p>
</template>
```

`useState` returns a ref, used like any other. The differences are in where it lives:

- **One per request on the server.** Alice and Bob each get their own.
- **Shared by key in the browser.** Every component calling `useState('current-user')` gets the *same* ref. Change it in the header, and the sidebar updates.
- **Carried over in the payload.** A value set during server rendering arrives in the browser, so the server and the browser agree.

The function `() => null` is the **initial value**. It only runs if the key doesn't exist yet.

**Wrap it in a composable**, as above. Then the key and type are written once, and a typo in a key string can't create a second, separate state.

```warn
`useState` values travel inside the HTML, so they must be serializable: plain objects, arrays, strings, numbers, dates. Class instances and functions won't survive the trip.
```

```compare typescript
// React: a Context provider per request on the server.
// Pinia is the bigger Vue option, with SSR support.
```

```compare python
# Like storing data on Flask's g or request object,
# not in a module-level global.
```

```exercise
goal: "Turn the leaky module-level ref into keyed state: `useState('theme', () => 'light')`."
lang: typescript
code: |-
  export const useTheme = () => ref('light');
checks:
  - match: 'useState\(\s*''theme'',\s*\(\)\s*=>\s*''light''\s*\)'
    message: "Return useState('theme', () => 'light')."
  - notMatch: '\bref\('
    message: Replace ref() with useState.
solution: |-
  export const useTheme = () => useState('theme', () => 'light');
```

```quiz
question: "Why is `export const count = ref(0)` in a module risky in a server-rendered Nuxt app?"
options:
  - It makes the bundle bigger.
  - The server shares one module across all requests, so different users can see each other's state.
  - Refs can't be exported.
answer: 1
explain: Module state lives for the whole server process. useState is created per request instead.
```
