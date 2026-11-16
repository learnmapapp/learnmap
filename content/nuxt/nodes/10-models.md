---
title: Form bindings
icon: "✍️"
branch: basics
requires: [refs]
summary: v-model keeps an input and a ref in sync in both directions.
---
**What does `v-model` actually do?** Let's translate it. These two inputs behave the same:

```vue
<script setup lang="ts">
const title = ref('');
</script>

<template>
  <input
    :value="title"
    @input="title = ($event.target as HTMLInputElement).value"
  />
  <input v-model="title" />
</template>
```

The long version shows the two halves:

1. `:value="title"`: the ref flows **into** the input. (A `:` before an attribute binds it to an expression; `:value` is short for `v-bind:value`.)
2. `@input="..."`: whatever you type flows **back** into the ref.

`v-model` writes both halves for you. That's what *two-way binding* means.

**It adapts to the input type:**

```vue
<template>
  <input v-model="title" />
  <textarea v-model="notes"></textarea>
  <input v-model="done" type="checkbox" />
  <select v-model="priority">
    <option value="low">Low</option>
    <option value="high">High</option>
  </select>
</template>
```

For a checkbox it binds `checked` to a boolean; for a select it binds the chosen option's `value`.

**Three useful modifiers:**

- `v-model.number`: inputs always give you strings. This converts to a number, so `age` is `30`, not `"30"`.
- `v-model.trim`: strips spaces from both ends.
- `v-model.lazy`: updates on `change` (when you leave the field) instead of on every keystroke.

```warn
Without `.number`, `<input type="number" v-model="qty">` still gives you a string. Then `qty.value + 1` is `"21"` instead of `3`.
```

```compare typescript
// React: value={title} plus onChange={e => setTitle(...)}.
// It's the same two halves, written by hand.
```

```compare python
# Django forms: the form reads request.POST after
# submission. There is no live two-way binding.
```

```exercise
goal: "Bind the quantity field with `v-model.number` so `quantity` stays a number."
lang: vue
code: |-
  <script setup lang="ts">
  const quantity = ref(1);
  </script>

  <template>
    <input type="number" />
    <p>Twice that is {{ quantity * 2 }}</p>
  </template>
checks:
  - match: '<input[^>]*v-model\.number="quantity"'
    message: Add v-model.number="quantity" to the input.
solution: |-
  <script setup lang="ts">
  const quantity = ref(1);
  </script>

  <template>
    <input v-model.number="quantity" type="number" />
    <p>Twice that is {{ quantity * 2 }}</p>
  </template>
```

```quiz
question: "`<input v-model.trim=\"name\">`. The user types `  Ada  `. What's in `name.value`?"
options:
  - "'  Ada  '"
  - "'Ada'"
  - "'ADA'"
answer: 1
explain: .trim removes whitespace from both ends before updating the ref.
```
