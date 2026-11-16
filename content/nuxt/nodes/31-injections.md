---
title: Use injected helpers
icon: "💉"
branch: components
requires: [plugins]
summary: Reach provided helpers through useNuxtApp() in script, or directly as $name in templates.
---
**FAQ: using what a plugin provided.** The [previous lesson](node:plugins) made a `money` helper. Here's everything you'll want to know about using it.

**How do I use it in a template?**

Directly, with the `$`:

```vue
<template>
  <p>Total: {{ $money(order.totalCents) }}</p>
</template>
```

**And in `<script setup>`?**

Templates see `$money` automatically, but script code doesn't. Get it from the app instance with `useNuxtApp()`:

```vue
<script setup lang="ts">
const { $money } = useNuxtApp();
const label = computed(() => `Pay ${$money(cart.value.totalCents)}`);
</script>
```

**Is it typed?**

Yes. Nuxt generates types from the plugin's return value, so `$money` is known to take a number and return a string. Pass a string and your editor complains. If the type doesn't show up, restart the dev server so the types are generated again.

**Can I use it in a composable?**

Yes, as long as the composable is called during setup (or in a plugin or middleware). `useNuxtApp()` needs to know *which* app it belongs to, and on the server, there's one app per request. Calling it inside a `setTimeout` loses that context and throws *"A composable that requires access to the Nuxt instance was called outside of a plugin…"*.

**Why the `$`?**

It marks app-wide globals and stops them clashing with your own variable names. Vue itself uses the same convention, for `$router` and `$route`.

**Should every helper be a plugin?**

No! If a helper doesn't need setup at boot, a plain function in `app/utils/` is simpler, and it's auto-imported too:

```typescript title=app/utils/money.ts
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
});

export const formatMoney = (cents: number) =>
  formatter.format(cents / 100);
```

Plugins are for things that need the app instance, or that must run once at startup.

```compare typescript
// React: a Context provider plus useContext(MoneyContext).
```

```compare python
# Flask: current_app.extensions['money'],
# available while the app context is active.
```

```exercise
goal: "Get `$shout` from `useNuxtApp()` and use it to build `greeting`."
lang: typescript
code: |-
  const name = ref('fern');
  const greeting = computed(() => `Hi ${name.value}`);
checks:
  - match: 'const \{ \$shout \} = useNuxtApp\(\)'
    message: "Start with const { $shout } = useNuxtApp();"
  - match: '\$shout\(name\.value\)'
    message: Pass name.value through $shout(...).
solution: |-
  const { $shout } = useNuxtApp();
  const name = ref('fern');
  const greeting = computed(() => `Hi ${$shout(name.value)}`);
```

```quiz
question: "A plugin provides `analytics`. How do you call it inside `<script setup>`?"
options:
  - "analytics.track('x')"
  - "useNuxtApp().$analytics.track('x')"
  - "import { $analytics } from '#app'"
answer: 1
explain: Provided helpers live on the Nuxt app as $name; script code reaches it through useNuxtApp().
```
