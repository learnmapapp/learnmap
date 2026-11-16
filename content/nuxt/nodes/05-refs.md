---
title: Reactive refs
icon: "📦"
branch: basics
requires: [templates]
summary: ref() makes a value reactive, so the page updates when it changes. Use .value in script.
---
**An experiment.** Here's a counter that doesn't work. Read it and guess why:

```vue
<script setup lang="ts">
let count = 0;
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>
```

Click it, and the label stays at 0. The variable *does* go up, but Vue has no way to know that it changed, so it never re-renders.

**The fix: put the value in a [[ref]].**

```vue
<script setup lang="ts">
const count = ref(0);
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>
```

Now it counts. `ref(0)` wraps the number in a small reactive box. Vue watches the box, and whenever its contents change, everything that displays it updates.

**The one rule to remember:**

| Where | How you read it | How you change it |
| --- | --- | --- |
| In `<script>` | `count.value` | `count.value++` |
| In `<template>` | `count` | `count++` |

The template unwraps refs for you; script code works with the box itself. Forgetting `.value` in script is the classic beginner mistake. TypeScript catches most of them, because `count + 1` on a ref is a type error.

```vue
<script setup lang="ts">
const count = ref(0);

function reset() {
  count.value = 0;
}
</script>
```

Notice that `ref` isn't imported: Nuxt [[auto-import|auto-imports]] Vue's core functions. In a plain Vue project, you'd write `import { ref } from 'vue'`.

```tip
`const count = ref(0)` is `const` because the box never changes. Only what's inside it does.
```

```compare javascript
// Plain JS has no reactivity: after changing a value
// you update the DOM yourself (el.textContent = ...).
```

```compare typescript
// React's useState is similar: [count, setCount].
// Vue lets you assign to count.value directly.
```

```exercise
goal: "Make `reset` work: in script, a ref is changed through `.value`."
lang: vue
code: |-
  <script setup lang="ts">
  const count = ref(5);

  function reset() {
    count = 0;
  }
  </script>

  <template>
    <p>{{ count }}</p>
    <button @click="reset">Reset</button>
  </template>
checks:
  - match: 'count\.value\s*=\s*0'
    message: Assign to count.value, not to count itself.
solution: |-
  <script setup lang="ts">
  const count = ref(5);

  function reset() {
    count.value = 0;
  }
  </script>

  <template>
    <p>{{ count }}</p>
    <button @click="reset">Reset</button>
  </template>
```

```quiz
question: "`const name = ref('Ada')`. Which line in `<script setup>` prints `Ada`?"
options:
  - console.log(name)
  - console.log(name.value)
  - console.log(name())
answer: 1
explain: In script, the value lives in .value. Only templates unwrap refs automatically.
```
