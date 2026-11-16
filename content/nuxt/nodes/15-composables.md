---
title: Reusable composables
icon: "🧰"
branch: components
requires: [refs, computed]
summary: Move reactive logic out of components into useSomething functions you can share.
---
**Refactor time.** Two components each track whether the browser is online. Spot the duplication:

```vue title=app/components/SaveButton.vue
<script setup lang="ts">
const online = ref(true);
const update = () => (online.value = navigator.onLine);
onMounted(() => {
  update();
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
});
onUnmounted(() => {
  window.removeEventListener('online', update);
  window.removeEventListener('offline', update);
});
</script>
```

`StatusBar.vue` contains the exact same ten lines. In a regular function you can't share them, because they use `ref` and lifecycle hooks. Vue has a pattern for exactly this: the [[composable]].

**Step 1. Move the logic into a function in `app/composables/`.**

```typescript title=app/composables/useOnline.ts
export function useOnline() {
  const online = ref(true);
  const update = () => (online.value = navigator.onLine);

  onMounted(() => {
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
  });
  onUnmounted(() => {
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
  });

  return { online };
}
```

**Step 2. Replace the duplicates with a call.**

```vue title=app/components/SaveButton.vue
<script setup lang="ts">
const { online } = useOnline();
</script>

<template>
  <button :disabled="!online">Save</button>
</template>
```

No import needed: files in `app/composables/` are auto-imported.

**What makes this work?** Calling `useOnline()` inside a component's setup runs those `onMounted` and `onUnmounted` calls *for that component*. Each component gets its own `online` ref and its own listeners, cleaned up when it goes away.

**The conventions:**

- Name it `useSomething`. Readers then know it may use reactivity or lifecycle hooks.
- Call it at the **top level of `<script setup>`**, not inside a click handler or a `setTimeout`. Lifecycle hooks only attach during setup.
- Return refs inside an object, so callers can destructure without losing reactivity.

```compare typescript
// React custom hooks are the same idea:
// function useOnline() { useState + useEffect }
```

```compare python
# The closest cousin is a mixin or a context manager:
# reusable behavior with setup and teardown.
```

```exercise
goal: "Finish `useCounter`: return `count` and `increment` in an object."
lang: typescript
code: |-
  export function useCounter(start = 0) {
    const count = ref(start);
    const increment = () => count.value++;
  }
checks:
  - match: 'return\s*\{\s*count,\s*increment\s*,?\s*\}'
    message: "End with return { count, increment };"
solution: |-
  export function useCounter(start = 0) {
    const count = ref(start);
    const increment = () => count.value++;
    return { count, increment };
  }
```

```quiz
question: "Two components call `useCounter()`. One increments. What does the other one show?"
options:
  - The new value, because the count is shared.
  - Its own unchanged count. Each call creates a new ref.
  - An error, because composables can only be used once.
answer: 1
explain: Every call runs the function again and creates fresh refs. For shared state, see the useState lesson.
```
